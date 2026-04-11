import { NextRequest, NextResponse } from "next/server";
import {
  getDatabase,
  COLLECTIONS,
  isMongoConfigured,
  MONGODB_NOT_CONFIGURED_MESSAGE,
} from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  try {
    const session = await getAdminSession();
    if (!session) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    if (!isMongoConfigured()) {
      return NextResponse.json({
        pages: [],
        warning: MONGODB_NOT_CONFIGURED_MESSAGE,
      });
    }

    const pageKey = request.nextUrl.searchParams.get("page");
    const db = await getDatabase();

    if (pageKey) {
      const doc = await db.collection(COLLECTIONS.PAGE_CONTENT).findOne({ pageKey });
      return NextResponse.json({ content: doc });
    }

    const allPages = await db
      .collection(COLLECTIONS.PAGE_CONTENT)
      .find()
      .sort({ pageKey: 1 })
      .toArray();
    return NextResponse.json({ pages: allPages });
  } catch (error) {
    console.error("Admin content GET:", error);
    return NextResponse.json(
      {
        pages: [],
        message:
          "Could not load page content. Check MONGODB_URI and restart the server.",
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

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { success: false, message: MONGODB_NOT_CONFIGURED_MESSAGE },
        { status: 503 }
      );
    }

    const body = await request.json();
    const { pageKey, sections } = body;
    if (!pageKey || !Array.isArray(sections)) {
      return NextResponse.json(
        { success: false, message: "pageKey and sections array are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    await db.collection(COLLECTIONS.PAGE_CONTENT).updateOne(
      { pageKey },
      { $set: { pageKey, sections, updatedAt: new Date() } },
      { upsert: true }
    );
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Admin content PUT:", error);
    return NextResponse.json(
      {
        success: false,
        message:
          "Could not save. Check MongoDB connection and that sections are valid JSON.",
      },
      { status: 500 }
    );
  }
}
