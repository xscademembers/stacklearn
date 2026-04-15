import { NextRequest, NextResponse } from "next/server";
import {
  COLLECTIONS,
  getDatabase,
  isMongoConfigured,
} from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const url = request.nextUrl;
  const page = Math.max(1, parseInt(url.searchParams.get("page") || "1", 10));
  const limit = Math.min(50, Math.max(1, parseInt(url.searchParams.get("limit") || "12", 10)));

  if (!isMongoConfigured()) {
    return NextResponse.json({ blogs: [], total: 0, page, limit });
  }

  try {
    const db = await getDatabase();
    const filter = { published: true };
    const [blogs, total] = await Promise.all([
      db
        .collection(COLLECTIONS.BLOGS)
        .find(filter)
        .sort({ publishedAt: -1, createdAt: -1 })
        .skip((page - 1) * limit)
        .limit(limit)
        .toArray(),
      db.collection(COLLECTIONS.BLOGS).countDocuments(filter),
    ]);

    return NextResponse.json({ blogs, total, page, limit });
  } catch {
    return NextResponse.json({ blogs: [], total: 0, page, limit });
  }
}
