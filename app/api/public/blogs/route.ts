import { NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const blogs = await db
      .collection(COLLECTIONS.BLOGS)
      .find({ published: true })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ blogs });
  } catch {
    return NextResponse.json({ blogs: [] });
  }
}
