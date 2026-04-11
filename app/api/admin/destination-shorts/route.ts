import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import {
  DEFAULT_DESTINATION_SHORT_URLS,
  DESTINATION_SHORT_KEYS,
} from "@/lib/destination-shorts-defaults";

export const dynamic = "force-dynamic";

function mergeWithDefaults(urls: Record<string, string> | undefined) {
  const merged: Record<string, string> = { ...DEFAULT_DESTINATION_SHORT_URLS };
  if (urls && typeof urls === "object") {
    for (const key of DESTINATION_SHORT_KEYS) {
      const v = urls[key];
      if (typeof v === "string" && v.trim()) merged[key] = v.trim();
    }
  }
  return merged;
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  try {
    const db = await getDatabase();
    const doc = await db
      .collection(COLLECTIONS.SITE_SETTINGS)
      .findOne({ _key: "destination_shorts" });
    const stored = (doc?.urls as Record<string, string> | undefined) || {};
    const urls: Record<string, string> = {};
    for (const key of DESTINATION_SHORT_KEYS) {
      urls[key] = typeof stored[key] === "string" ? stored[key] : "";
    }
    return NextResponse.json({ urls, effective: mergeWithDefaults(stored) });
  } catch {
    const urls: Record<string, string> = {};
    for (const key of DESTINATION_SHORT_KEYS) urls[key] = "";
    return NextResponse.json({ urls, effective: mergeWithDefaults({}) });
  }
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const incoming = body.urls as Record<string, string> | undefined;
  if (!incoming || typeof incoming !== "object") {
    return NextResponse.json({ message: "urls object required" }, { status: 400 });
  }
  const urls: Record<string, string> = {};
  for (const key of DESTINATION_SHORT_KEYS) {
    const v = incoming[key];
    urls[key] = typeof v === "string" ? v.trim() : "";
  }
  const db = await getDatabase();
  await db.collection(COLLECTIONS.SITE_SETTINGS).updateOne(
    { _key: "destination_shorts" },
    { $set: { _key: "destination_shorts", urls, updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true, urls });
}
