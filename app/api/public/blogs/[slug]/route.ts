import { NextRequest, NextResponse } from "next/server";
import { COLLECTIONS, getDatabase, isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(_request: NextRequest, context: { params: Promise<{ slug: string }> }) {
  const { slug } = await context.params;
  if (!slug) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  try {
    const db = await getDatabase();
    const blog = await db.collection(COLLECTIONS.BLOGS).findOne({ slug, published: true });
    if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}

