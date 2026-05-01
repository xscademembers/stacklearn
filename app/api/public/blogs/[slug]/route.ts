import { NextRequest, NextResponse } from "next/server";
import { COLLECTIONS, getDatabase, isMongoConfigured } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(
  _request: NextRequest,
  context: { params: Promise<{ slug?: string | string[] }> }
) {
  const resolved = await context.params;
  const raw = resolved.slug;
  const slug =
    typeof raw === "string" ? raw : Array.isArray(raw) && raw[0] ? raw[0] : "";
  if (!slug) return NextResponse.json({ message: "Not found" }, { status: 404 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }

  try {
    const db = await getDatabase();
    const slugTrim = slug.trim();
    const slugNormalized = slugTrim.toLowerCase();
    const blog = await db.collection(COLLECTIONS.BLOGS).findOne({
      published: true,
      $or: [{ slug: slugNormalized }, { slug: slugTrim }],
    });
    if (!blog) return NextResponse.json({ message: "Not found" }, { status: 404 });
    return NextResponse.json({ blog });
  } catch {
    return NextResponse.json({ message: "Not found" }, { status: 404 });
  }
}

