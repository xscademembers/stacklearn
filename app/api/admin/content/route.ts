import { NextRequest, NextResponse } from "next/server";
import {
  getDatabase,
  COLLECTIONS,
  isMongoConfigured,
} from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import {
  listPagesFromFile,
  savePageSectionsToFile,
} from "@/lib/cms-file-store";
import type { CmsPageSection } from "@/lib/cms-page-templates";

export const dynamic = "force-dynamic";

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

    const body = await request.json();
    const { pageKey, sections } = body;
    if (!pageKey || typeof pageKey !== "string" || !Array.isArray(sections)) {
      return NextResponse.json(
        { success: false, message: "pageKey and sections array are required" },
        { status: 400 }
      );
    }

    let normalized: CmsPageSection[];
    try {
      normalized = JSON.parse(JSON.stringify(sections)) as CmsPageSection[];
    } catch {
      return NextResponse.json(
        {
          success: false,
          message: "Sections must be JSON-serializable. Check JSON-type fields for invalid syntax.",
        },
        { status: 400 }
      );
    }

    try {
      await savePageSectionsToFile(pageKey, normalized);
    } catch (err) {
      console.error("Admin content file save:", err);
      return NextResponse.json(
        {
          success: false,
          message:
            "Could not save to data/cms/page-content.json. Check that the project folder is writable.",
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
        /* file is source of truth; Mongo sync is best-effort */
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin content PUT:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Could not save. Ensure sections are valid and the data/cms folder is writable.",
      },
      { status: 500 }
    );
  }
}
