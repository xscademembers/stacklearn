import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import {
  listPagesFromCmsStore,
  savePageToCmsStore,
  getCmsSaveTargetHint,
  describeCmsStorageForAdminUi,
  cmsUsesBlobStorage,
} from "@/lib/cms-page-store";
import { cloneSectionsForPersistence } from "@/lib/cms-file-store";
import type { CmsPageSection } from "@/lib/cms-page-templates";

export const dynamic = "force-dynamic";
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const pageKey = request.nextUrl.searchParams.get("page");

    const hint = describeCmsStorageForAdminUi();

    if (pageKey) {
      const storePages = await listPagesFromCmsStore();
      const hit = storePages.find((p) => p.pageKey === pageKey);
      if (hit) {
        return NextResponse.json({
          content: {
            pageKey: hit.pageKey,
            sections: hit.sections,
            updatedAt: hit.updatedAt,
          },
          cmsStorageHint: hint,
        });
      }
      if (isMongoConfigured()) {
        try {
          const db = await getDatabase();
          const doc = await db
            .collection(COLLECTIONS.PAGE_CONTENT)
            .findOne({ pageKey });
          return NextResponse.json({ content: doc, cmsStorageHint: hint });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ content: null, cmsStorageHint: hint });
    }

    const storePages = await listPagesFromCmsStore();
    if (storePages.length > 0) {
      return NextResponse.json({
        pages: storePages.map((p) => ({
          pageKey: p.pageKey,
          sections: p.sections,
          updatedAt: p.updatedAt,
        })),
        cmsStorageHint: hint,
      });
    }

    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        const allPages = await db
          .collection(COLLECTIONS.PAGE_CONTENT)
          .find()
          .sort({ pageKey: 1 })
          .toArray();
        return NextResponse.json({ pages: allPages, cmsStorageHint: hint });
      } catch {
        /* fall through */
      }
    }

    return NextResponse.json({ pages: [], cmsStorageHint: hint });
  } catch (error) {
    console.error("Admin content GET:", error);
    return NextResponse.json(
      {
        pages: [],
        message: "Could not load page content.",
        cmsStorageHint: describeCmsStorageForAdminUi(),
      },
      { status: 200 }
    );
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized — please log in again." }, { status: 401 });
    }

    let body: unknown;
    try {
      body = await request.json();
    } catch {
      return NextResponse.json(
        { success: false, message: "Invalid JSON in request body." },
        { status: 400 }
      );
    }

    if (!body || typeof body !== "object") {
      return NextResponse.json(
        { success: false, message: "Invalid request body." },
        { status: 400 }
      );
    }

    const { pageKey, sections } = body as { pageKey?: unknown; sections?: unknown };
    if (!pageKey || typeof pageKey !== "string" || !Array.isArray(sections)) {
      return NextResponse.json(
        { success: false, message: "pageKey and sections array are required" },
        { status: 400 }
      );
    }

    let normalized: CmsPageSection[];
    try {
      normalized = cloneSectionsForPersistence(sections);
    } catch (e) {
      const msg = e instanceof Error ? e.message : "Could not serialize sections.";
      return NextResponse.json({ success: false, message: msg }, { status: 400 });
    }

    try {
      await savePageToCmsStore(pageKey, normalized);
    } catch (err) {
      console.error("Admin content save:", err);
      const msg = err instanceof Error ? err.message : "Save failed.";
      const onVercelWithoutBlob =
        process.env.VERCEL === "1" && !cmsUsesBlobStorage();
      // On Vercel without Blob, msg already explains the fix — do not append /var/task paths.
      const message = onVercelWithoutBlob
        ? msg
        : `${msg}\n(Storage: ${getCmsSaveTargetHint()})`;
      return NextResponse.json(
        {
          success: false,
          message,
        },
        { status: 500 }
      );
    }

    if (isMongoConfigured()) {
      try {
        const db = await getDatabase();
        await db.collection(COLLECTIONS.PAGE_CONTENT).updateOne(
          { pageKey },
          { $set: { pageKey, sections: normalized, updatedAt: new Date() } },
          { upsert: true }
        );
      } catch {
        /* JSON store is source of truth */
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin content PUT:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          error instanceof Error
            ? error.message
            : "Save failed. Restart the dev server and try again.",
      },
      { status: 500 }
    );
  }
}
