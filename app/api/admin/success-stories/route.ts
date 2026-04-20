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

function clampStr(v: unknown, maxLen: number): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s) return "";
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function sanitizeImageUrl(v: unknown): string {
  const s = clampStr(v, 2048);
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  return "";
}

type StoryPayload = {
  name: string;
  country: string;
  university: string;
  imageUrl: string;
  story: string;
};

function parseBody(body: Record<string, unknown>): StoryPayload {
  return {
    name: clampStr(body.name, 120),
    country: clampStr(body.country, 80),
    university: clampStr(body.university, 160),
    imageUrl: sanitizeImageUrl(body.imageUrl),
    story: clampStr(body.story, 400),
  };
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: MONGODB_NOT_CONFIGURED_MESSAGE, successStories: [] },
      { status: 503 }
    );
  }

  const db = await getDatabase();
  const successStories = await db
    .collection(COLLECTIONS.SUCCESS_STORIES)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  return NextResponse.json({ successStories });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const body = (await request.json()) as Record<string, unknown>;
  const parsed = parseBody(body);
  if (!parsed.name) {
    return NextResponse.json({ message: "Student name is required" }, { status: 400 });
  }
  if (!parsed.story) {
    return NextResponse.json({ message: "Story (about two lines) is required" }, { status: 400 });
  }

  const db = await getDatabase();
  const now = new Date();
  const result = await db.collection(COLLECTIONS.SUCCESS_STORIES).insertOne({
    ...parsed,
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

  const body = (await request.json()) as Record<string, unknown> & { _id?: string };
  if (!body._id) return NextResponse.json({ message: "ID is required" }, { status: 400 });

  const parsed = parseBody(body);
  if (!parsed.name) {
    return NextResponse.json({ message: "Student name is required" }, { status: 400 });
  }
  if (!parsed.story) {
    return NextResponse.json({ message: "Story (about two lines) is required" }, { status: 400 });
  }

  const db = await getDatabase();
  await db.collection(COLLECTIONS.SUCCESS_STORIES).updateOne(
    { _id: new ObjectId(body._id) },
    { $set: { ...parsed, updatedAt: new Date() } }
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
  await db.collection(COLLECTIONS.SUCCESS_STORIES).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
