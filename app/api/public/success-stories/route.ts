import { NextRequest, NextResponse } from "next/server";
import {
  getLatestSuccessStoriesForHome,
  getSuccessStoriesForDestinationSlug,
} from "@/lib/get-success-stories";
import { isMongoConfigured, MONGODB_NOT_CONFIGURED_MESSAGE } from "@/lib/mongodb";
import { isDestinationSuccessStorySlug } from "@/lib/destination-country-match";

export const dynamic = "force-dynamic";

function clampLimit(v: string | null, max: number, fallback: number): number {
  const n = v ? Number.parseInt(v, 10) : fallback;
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}

export async function GET(request: NextRequest) {
  const dest = request.nextUrl.searchParams.get("destination")?.trim().toLowerCase() || "";

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: MONGODB_NOT_CONFIGURED_MESSAGE, successStories: [] },
      { status: 503 }
    );
  }

  if (dest) {
    const limit = clampLimit(request.nextUrl.searchParams.get("limit"), 24, 12);
    if (!isDestinationSuccessStorySlug(dest)) {
      return NextResponse.json({ successStories: [] });
    }
    const successStories = await getSuccessStoriesForDestinationSlug(dest, limit);
    return NextResponse.json({ successStories });
  }

  const limit = clampLimit(request.nextUrl.searchParams.get("limit"), 8, 4);
  const successStories = await getLatestSuccessStoriesForHome(limit);
  return NextResponse.json({ successStories });
}
