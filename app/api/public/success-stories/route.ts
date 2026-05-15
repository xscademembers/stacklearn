import { NextRequest, NextResponse } from "next/server";
import {
  getLatestSuccessStoriesForHome,
  getSuccessStoriesForDestinationSlug,
  getSuccessStoriesForServiceSlug,
  getSuccessStoriesForScholarshipsPage,
  getSuccessStoriesForTestPrepSlug,
  getSuccessStoriesForTrainingPlacement,
  getSuccessStoriesForMainPage,
} from "@/lib/get-success-stories";
import { isSuccessStoryMainPageHub } from "@/lib/success-story-main-page";
import { isMongoConfigured, MONGODB_NOT_CONFIGURED_MESSAGE } from "@/lib/mongodb";
import { isDestinationSuccessStorySlug } from "@/lib/destination-country-match";
import { isSuccessStoryServiceSlug } from "@/lib/success-story-service-options";
import { isSuccessStoryTestPrepSlug } from "@/lib/success-story-test-prep-options";
import { isTrainingTrack } from "@/lib/success-story-training-options";

export const dynamic = "force-dynamic";

function clampLimit(v: string | null, max: number, fallback: number): number {
  const n = v ? Number.parseInt(v, 10) : fallback;
  if (!Number.isFinite(n) || n < 1) return fallback;
  return Math.min(n, max);
}

function parseCap(request: NextRequest): number | undefined {
  const limParam = request.nextUrl.searchParams.get("limit");
  if (limParam == null || limParam === "") return undefined;
  const n = Number.parseInt(limParam, 10);
  if (!Number.isFinite(n) || n < 1) return undefined;
  return Math.min(n, 500);
}

export async function GET(request: NextRequest) {
  const dest = request.nextUrl.searchParams.get("destination")?.trim().toLowerCase() || "";
  const serviceRaw = request.nextUrl.searchParams.get("service")?.trim() || "";
  const service = serviceRaw.toLowerCase();
  const testPrepRaw = request.nextUrl.searchParams.get("testPrep")?.trim().toLowerCase() || "";
  const scholarshipsRaw = request.nextUrl.searchParams.get("scholarships")?.trim().toLowerCase() || "";

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: MONGODB_NOT_CONFIGURED_MESSAGE, successStories: [] },
      { status: 503 }
    );
  }

  const cap = parseCap(request);

  const mainPageRaw = request.nextUrl.searchParams.get("mainPage")?.trim() || "";
  if (mainPageRaw && isSuccessStoryMainPageHub(mainPageRaw)) {
    const successStories = await getSuccessStoriesForMainPage(mainPageRaw, cap);
    return NextResponse.json({ successStories });
  }

  if (service) {
    if (!isSuccessStoryServiceSlug(service)) {
      return NextResponse.json({ successStories: [] });
    }
    const successStories = await getSuccessStoriesForServiceSlug(service, cap);
    return NextResponse.json({ successStories });
  }

  if (dest) {
    if (!isDestinationSuccessStorySlug(dest)) {
      return NextResponse.json({ successStories: [] });
    }
    const successStories = await getSuccessStoriesForDestinationSlug(dest, cap);
    return NextResponse.json({ successStories });
  }

  if (testPrepRaw) {
    if (!isSuccessStoryTestPrepSlug(testPrepRaw)) {
      return NextResponse.json({ successStories: [] });
    }
    const successStories = await getSuccessStoriesForTestPrepSlug(testPrepRaw, cap);
    return NextResponse.json({ successStories });
  }

  const trainingTrackRaw = request.nextUrl.searchParams.get("trainingTrack")?.trim() || "";
  if (trainingTrackRaw && isTrainingTrack(trainingTrackRaw)) {
    const trainingCourse = request.nextUrl.searchParams.get("trainingCourse")?.trim() || "";
    const successStories = await getSuccessStoriesForTrainingPlacement(
      trainingTrackRaw,
      trainingCourse || undefined,
      cap
    );
    return NextResponse.json({ successStories });
  }

  if (scholarshipsRaw === "1" || scholarshipsRaw === "true") {
    const successStories = await getSuccessStoriesForScholarshipsPage(cap);
    return NextResponse.json({ successStories });
  }

  const limit = clampLimit(request.nextUrl.searchParams.get("limit"), 8, 4);
  const successStories = await getLatestSuccessStoriesForHome(limit);
  return NextResponse.json({ successStories });
}
