import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

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
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { pageKey, sections } = body;
  if (!pageKey || !sections) {
    return NextResponse.json({ message: "pageKey and sections are required" }, { status: 400 });
  }
  const db = await getDatabase();
  await db.collection(COLLECTIONS.PAGE_CONTENT).updateOne(
    { pageKey },
    { $set: { pageKey, sections, updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
