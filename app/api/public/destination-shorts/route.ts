import { NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import {
  DEFAULT_DESTINATION_SHORT_URLS,
  DESTINATION_SHORT_KEYS,
} from "@/lib/destination-shorts-defaults";

export const dynamic = "force-dynamic";

export async function GET() {
  const merged: Record<string, string> = { ...DEFAULT_DESTINATION_SHORT_URLS };
  try {
    const db = await getDatabase();
    const doc = await db
      .collection(COLLECTIONS.SITE_SETTINGS)
      .findOne({ _key: "destination_shorts" });
    const urls = doc?.urls as Record<string, string> | undefined;
    if (urls && typeof urls === "object") {
      for (const key of DESTINATION_SHORT_KEYS) {
        const v = urls[key];
        if (typeof v === "string" && v.trim()) merged[key] = v.trim();
      }
    }
  } catch {
    /* use defaults */
  }
  return NextResponse.json({ urls: merged });
}
