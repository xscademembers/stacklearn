import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getDatabase,
  COLLECTIONS,
  isMongoConfigured,
  MONGODB_NOT_CONFIGURED_MESSAGE,
} from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

type BlogBlock = {
  heading?: string;
  paragraph?: string;
  imageUrl?: string;
};

function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: MONGODB_NOT_CONFIGURED_MESSAGE, blogs: [] },
      { status: 503 }
    );
  }

  const db = await getDatabase();
  const blogs = await db.collection(COLLECTIONS.BLOGS).find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const body = await request.json();
  const { title, excerpt, category, image, content, slug, blocks, published } = body;
  if (!title || !slug) {
    return NextResponse.json({ message: "Title and slug are required" }, { status: 400 });
  }
  const db = await getDatabase();
  const normalizedSlug = toSlug(String(slug));
  const existing = await db.collection(COLLECTIONS.BLOGS).findOne({ slug: normalizedSlug });
  if (existing) {
    return NextResponse.json({ message: "Slug already exists. Use a unique slug." }, { status: 409 });
  }

  const cleanBlocks: BlogBlock[] = Array.isArray(blocks)
    ? (blocks as BlogBlock[])
        .map((b) => ({
          heading: typeof b?.heading === "string" ? b.heading : "",
          paragraph: typeof b?.paragraph === "string" ? b.paragraph : "",
          imageUrl: typeof b?.imageUrl === "string" ? b.imageUrl : "",
        }))
        .filter((b) => (b.heading || b.paragraph || b.imageUrl))
    : [];

  const isPublished = Boolean(published);
  const now = new Date();
  const result = await db.collection(COLLECTIONS.BLOGS).insertOne({
    title,
    slug: normalizedSlug,
    excerpt: excerpt || "",
    category: category || "",
    image: image || "",
    content: content || "", // legacy freeform field (kept for backwards compatibility)
    blocks: cleanBlocks,
    published: isPublished,
    publishedAt: isPublished ? now : null,
    createdAt: now,
    updatedAt: now,
  });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const body = await request.json();
  const { _id, ...updates } = body;
  if (!_id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const db = await getDatabase();

  if (typeof updates.slug === "string" && updates.slug.trim()) {
    updates.slug = toSlug(updates.slug);
    const dup = await db.collection(COLLECTIONS.BLOGS).findOne({
      slug: updates.slug,
      _id: { $ne: new ObjectId(_id) },
    });
    if (dup) {
      return NextResponse.json({ message: "Slug already exists. Use a unique slug." }, { status: 409 });
    }
  }

  if (Array.isArray(updates.blocks)) {
    updates.blocks = (updates.blocks as BlogBlock[])
      .map((b) => ({
        heading: typeof b?.heading === "string" ? b.heading : "",
        paragraph: typeof b?.paragraph === "string" ? b.paragraph : "",
        imageUrl: typeof b?.imageUrl === "string" ? b.imageUrl : "",
      }))
      .filter((b) => (b.heading || b.paragraph || b.imageUrl));
  }

  const now = new Date();
  if (typeof updates.published === "boolean") {
    if (updates.published) {
      updates.publishedAt = updates.publishedAt ? new Date(updates.publishedAt) : now;
    } else {
      updates.publishedAt = null;
    }
  }

  await db.collection(COLLECTIONS.BLOGS).updateOne(
    { _id: new ObjectId(_id) },
    { $set: { ...updates, updatedAt: now } }
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const db = await getDatabase();
  await db.collection(COLLECTIONS.BLOGS).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
