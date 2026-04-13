import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import {
  listPagesFromFile,
  savePageSectionsToFile,
  cloneSectionsForPersistence,
  getCmsStoragePathForLogs,
} from "@/lib/cms-file-store";
import type { CmsPageSection } from "@/lib/cms-page-templates";

export const dynamic = "force-dynamic";
/** File system writes require Node (not Edge). */
export const runtime = "nodejs";

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const pageKey = request.nextUrl.searchParams.get("page");

    if (pageKey) {
      const filePages = await listPagesFromFile();
      const hit = filePages.find((p) => p.pageKey === pageKey);
      if (hit) {
        return NextResponse.json({
          content: {
            pageKey: hit.pageKey,
            sections: hit.sections,
            updatedAt: hit.updatedAt,
          },
        });
      }
      if (isMongoConfigured()) {
        try {
          const db = await getDatabase();
          const doc = await db
            .collection(COLLECTIONS.PAGE_CONTENT)
            .findOne({ pageKey });
          return NextResponse.json({ content: doc });
        } catch {
          /* fall through */
        }
      }
      return NextResponse.json({ content: null });
    }

    const filePages = await listPagesFromFile();
    if (filePages.length > 0) {
      return NextResponse.json({
        pages: filePages.map((p) => ({
          pageKey: p.pageKey,
          sections: p.sections,
          updatedAt: p.updatedAt,
        })),
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
        return NextResponse.json({ pages: allPages });
      } catch {
        /* fall through */
      }
    }

    return NextResponse.json({ pages: [] });
  } catch (error) {
    console.error("Admin content GET:", error);
    return NextResponse.json(
      {
        pages: [],
        message: "Could not load page content from disk.",
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
      await savePageSectionsToFile(pageKey, normalized);
    } catch (err) {
      console.error("Admin content file save:", err);
      const dest = getCmsStoragePathForLogs();
      const code = err && typeof err === "object" && "code" in err ? String((err as NodeJS.ErrnoException).code) : "";
      return NextResponse.json(
        {
          success: false,
          message:
            code === "EACCES" || code === "EPERM"
              ? `Permission denied writing CMS file. Try running the dev server as a user that can write to:\n${dest}`
              : `Could not save to ${dest}. Check disk space and folder permissions.`,
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
        /* file is source of truth */
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
