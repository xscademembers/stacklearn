import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getDatabase,
  COLLECTIONS,
  isMongoConfigured,
  MONGODB_NOT_CONFIGURED_MESSAGE,
} from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";
import { isSuccessStoryServiceSlug } from "@/lib/success-story-service-options";
import { isSuccessStoryTestPrepSlug } from "@/lib/success-story-test-prep-options";
import { supportsShowOnMainPageCheckbox } from "@/lib/success-story-main-page";
import { parseSuccessStoryMediaType, type SuccessStoryMediaType } from "@/lib/success-story-public";
import { isValidVideoTestimonialUrl, sanitizeVideoUrl } from "@/lib/success-story-video";
import {
  computeTrainingDisplayLabel,
  isTrainingTrack,
  isValidTrainingCourseForTrack,
  normalizeTrainingTrack,
  type TrainingTrack,
} from "@/lib/success-story-training-options";

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

type StoryKind = "destination" | "service" | "test_prep" | "home" | "scholarships" | "training";

function parseShowOnMainPage(body: Record<string, unknown>): boolean {
  const v = body.showOnMainPage;
  if (v === true) return true;
  if (v === "true" || v === "on" || v === "1") return true;
  return false;
}

type StoryPayload = {
  name: string;
  country: string;
  university: string;
  imageUrl: string;
  story: string;
  mediaType: SuccessStoryMediaType;
  videoUrl: string;
  kind: StoryKind;
  serviceSlug: string;
  testPrepSlug: string;
  trainingTrack: string;
  trainingCourseSlug: string;
  trainingDisplayLabel: string;
  showOnMainPage: boolean;
};

function parseKind(body: Record<string, unknown>): StoryKind {
  const k = typeof body.kind === "string" ? body.kind.trim().toLowerCase() : "";
  if (k === "service") return "service";
  if (k === "test_prep" || k === "test-prep") return "test_prep";
  if (k === "home") return "home";
  if (k === "scholarships" || k === "scholarship") return "scholarships";
  if (k === "training") return "training";
  return "destination";
}

function parseBody(body: Record<string, unknown>): StoryPayload {
  const mediaType = parseSuccessStoryMediaType(body.mediaType);
  const kind = parseKind(body);
  const serviceRaw = clampStr(body.serviceSlug, 64);
  const serviceSlug =
    kind === "service" && isSuccessStoryServiceSlug(serviceRaw) ? serviceRaw : "";
  const testPrepRaw = clampStr(body.testPrepSlug, 32).toLowerCase();
  const testPrepSlug =
    kind === "test_prep" && isSuccessStoryTestPrepSlug(testPrepRaw) ? testPrepRaw : "";
  const country = kind === "destination" ? clampStr(body.country, 80) : "";
  const university = kind === "destination" ? clampStr(body.university, 160) : "";

  let trainingTrack = "";
  let trainingCourseSlug = "";
  let trainingDisplayLabel = "";
  if (kind === "training") {
    const tr = normalizeTrainingTrack(clampStr(body.trainingTrack, 32));
    if (tr) {
      trainingTrack = tr;
      const cs = clampStr(body.trainingCourseSlug, 120);
      if (tr === "technical" || tr === "non_technical") {
        if (isValidTrainingCourseForTrack(tr, cs)) {
          trainingCourseSlug = cs.trim();
        }
      }
      trainingDisplayLabel = computeTrainingDisplayLabel(tr as TrainingTrack, trainingCourseSlug);
    }
  }

  const videoUrl = mediaType === "video" ? sanitizeVideoUrl(body.videoUrl) : "";

  return {
    name: clampStr(body.name, 120),
    country,
    university,
    imageUrl: sanitizeImageUrl(body.imageUrl),
    story: mediaType === "video" ? "" : clampStr(body.story, 400),
    mediaType: mediaType === "video" && videoUrl ? "video" : "story",
    videoUrl,
    kind,
    serviceSlug,
    testPrepSlug,
    trainingTrack,
    trainingCourseSlug,
    trainingDisplayLabel,
    showOnMainPage: parseShowOnMainPage(body),
  };
}

function validatePlacement(parsed: StoryPayload): string | null {
  if (parsed.mediaType === "video") {
    if (!parsed.videoUrl) return "Video URL is required for video testimonials.";
    if (!isValidVideoTestimonialUrl(parsed.videoUrl)) {
      return "Enter a valid video URL (YouTube, Vimeo, Loom, or a direct mp4/webm link).";
    }
  } else if (!parsed.story) {
    return "Story (about two lines) is required.";
  }
  if (parsed.kind === "destination" && !parsed.country) {
    return "Country is required for destination stories.";
  }
  if (parsed.kind === "service" && !parsed.serviceSlug) {
    return "Service is required for service stories.";
  }
  if (parsed.kind === "test_prep" && !parsed.testPrepSlug) {
    return "Test preparation exam is required.";
  }
  if (parsed.kind === "training") {
    if (!parsed.trainingTrack) return "Training category is required.";
    if (parsed.trainingTrack === "technical" || parsed.trainingTrack === "non_technical") {
      if (!parsed.trainingCourseSlug) {
        return "Course is required for technical or non-technical training stories.";
      }
    }
  }
  return null;
}

function mongoPlacementFields(parsed: StoryPayload) {
  return {
    mediaType: parsed.mediaType,
    videoUrl: parsed.mediaType === "video" ? parsed.videoUrl : "",
    kind: parsed.kind,
    country: parsed.kind === "destination" ? parsed.country : "",
    university: parsed.kind === "destination" ? parsed.university : "",
    serviceSlug: parsed.kind === "service" ? parsed.serviceSlug : "",
    testPrepSlug: parsed.kind === "test_prep" ? parsed.testPrepSlug : "",
    trainingTrack: parsed.kind === "training" ? parsed.trainingTrack : "",
    trainingCourseSlug: parsed.kind === "training" ? parsed.trainingCourseSlug : "",
    trainingDisplayLabel: parsed.kind === "training" ? parsed.trainingDisplayLabel : "",
    showOnMainPage:
      supportsShowOnMainPageCheckbox(parsed.kind, parsed.trainingTrack) && parsed.showOnMainPage,
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
  const docs = await db
    .collection(COLLECTIONS.SUCCESS_STORIES)
    .find()
    .sort({ createdAt: -1 })
    .toArray();
  const successStories = docs.map((doc) => ({
    ...doc,
    _id: String(doc._id),
  }));
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
  const placementErr = validatePlacement(parsed);
  if (placementErr) return NextResponse.json({ message: placementErr }, { status: 400 });

  const db = await getDatabase();
  const now = new Date();
  const placement = mongoPlacementFields(parsed);
  const result = await db.collection(COLLECTIONS.SUCCESS_STORIES).insertOne({
    name: parsed.name,
    imageUrl: parsed.imageUrl,
    story: parsed.story,
    ...placement,
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
  const idRaw = body._id != null ? String(body._id).trim() : "";
  if (!idRaw) return NextResponse.json({ message: "ID is required" }, { status: 400 });

  let objectId: ObjectId;
  try {
    objectId = new ObjectId(idRaw);
  } catch {
    return NextResponse.json({ message: "Invalid story id" }, { status: 400 });
  }

  const parsed = parseBody(body);
  if (!parsed.name) {
    return NextResponse.json({ message: "Student name is required" }, { status: 400 });
  }
  const placementErr = validatePlacement(parsed);
  if (placementErr) return NextResponse.json({ message: placementErr }, { status: 400 });

  const db = await getDatabase();
  const placement = mongoPlacementFields(parsed);
  const result = await db.collection(COLLECTIONS.SUCCESS_STORIES).updateOne(
    { _id: objectId },
    {
      $set: {
        name: parsed.name,
        imageUrl: parsed.imageUrl,
        story: parsed.story,
        ...placement,
        updatedAt: new Date(),
      },
    }
  );
  if (result.matchedCount === 0) {
    return NextResponse.json({ message: "Story not found" }, { status: 404 });
  }
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
