import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const db = await getDatabase();
  const blogs = await db.collection(COLLECTIONS.BLOGS).find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { title, excerpt, category, image, content, slug } = body;
  if (!title || !slug) {
    return NextResponse.json({ message: "Title and slug are required" }, { status: 400 });
  }
  const db = await getDatabase();
  const result = await db.collection(COLLECTIONS.BLOGS).insertOne({
    title,
    slug: slug.toLowerCase().replace(/\s+/g, "-"),
    excerpt: excerpt || "",
    category: category || "",
    image: image || "",
    content: content || "",
    published: true,
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { _id, ...updates } = body;
  if (!_id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const db = await getDatabase();
  await db.collection(COLLECTIONS.BLOGS).updateOne(
    { _id: new ObjectId(_id) },
    { $set: { ...updates, updatedAt: new Date() } }
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const { id } = await request.json();
  if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const db = await getDatabase();
  await db.collection(COLLECTIONS.BLOGS).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
