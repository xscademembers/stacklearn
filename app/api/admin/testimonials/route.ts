import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const db = await getDatabase();
  const testimonials = await db.collection(COLLECTIONS.TESTIMONIALS).find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ testimonials });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const { name, country, university, course, quote, image, year } = body;
  if (!name || !quote) {
    return NextResponse.json({ message: "Name and quote are required" }, { status: 400 });
  }
  const db = await getDatabase();
  const result = await db.collection(COLLECTIONS.TESTIMONIALS).insertOne({
    name, country: country || "", university: university || "", course: course || "",
    quote, image: image || "", year: year || "", visible: true,
    createdAt: new Date(), updatedAt: new Date(),
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
  await db.collection(COLLECTIONS.TESTIMONIALS).updateOne(
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
  await db.collection(COLLECTIONS.TESTIMONIALS).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
