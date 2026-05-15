import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import {
  countryMatchesDestinationSlug,
  isDestinationSuccessStorySlug,
} from "@/lib/destination-country-match";
import { isSuccessStoryServiceSlug } from "@/lib/success-story-service-options";
import { isSuccessStoryTestPrepSlug } from "@/lib/success-story-test-prep-options";
import {
  computeTrainingDisplayLabel,
  isTrainingTrack,
  type TrainingTrack,
} from "@/lib/success-story-training-options";
import {
  isSuccessStoryMainPageHub,
  mongoFilterForMainPageHub,
  storyMatchesMainPageHub,
  type SuccessStoryMainPageHub,
} from "@/lib/success-story-main-page";
import type { PublicSuccessStory, SuccessStoryKind } from "@/lib/success-story-public";

export type { PublicSuccessStory, SuccessStoryKind } from "@/lib/success-story-public";
export { successStoryMetaLine } from "@/lib/success-story-public";

function toIso(d: unknown): string | undefined {
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "string") return d;
  return undefined;
}

function readShowOnMainPage(doc: Record<string, unknown>): boolean {
  const v = doc.showOnMainPage;
  if (v === true || v === 1) return true;
  if (typeof v === "string") {
    const s = v.trim().toLowerCase();
    return s === "true" || s === "1" || s === "on" || s === "yes";
  }
  return false;
}

function parseDocKind(doc: Record<string, unknown>): SuccessStoryKind {
  const k = typeof doc.kind === "string" ? doc.kind.trim().toLowerCase() : "";
  if (k === "service" || k === "services") return "service";
  if (k === "test_prep" || k === "test-prep" || k === "test preparation") return "test_prep";
  if (k === "home") return "home";
  if (k === "scholarships" || k === "scholarship") return "scholarships";
  if (k === "training") return "training";
  if (k === "destination" || k === "destinations") return "destination";
  return "destination";
}

function parseDocTrainingTrack(doc: Record<string, unknown>): string {
  const raw = typeof doc.trainingTrack === "string" ? doc.trainingTrack.trim().toLowerCase() : "";
  if (raw === "technical") return "technical";
  if (raw === "non_technical" || raw === "non-technical" || raw === "non technical") return "non_technical";
  if (raw === "study_abroad" || raw === "study-abroad") return "study_abroad";
  if (raw === "corporate") return "corporate";
  return raw;
}

function serialize(doc: Record<string, unknown>): PublicSuccessStory {
  const kind = parseDocKind(doc);
  const serviceSlug =
    kind === "service" && typeof doc.serviceSlug === "string" && isSuccessStoryServiceSlug(doc.serviceSlug)
      ? doc.serviceSlug
      : "";
  const testPrepSlug =
    kind === "test_prep" && typeof doc.testPrepSlug === "string" && isSuccessStoryTestPrepSlug(doc.testPrepSlug)
      ? doc.testPrepSlug
      : "";

  let trainingTrack = "";
  let trainingCourseSlug = "";
  let trainingDisplayLabel = "";
  if (kind === "training") {
    const tt = parseDocTrainingTrack(doc);
    if (isTrainingTrack(tt)) {
      trainingTrack = tt;
      const rawCourse =
        tt === "technical" || tt === "non_technical"
          ? typeof doc.trainingCourseSlug === "string"
            ? doc.trainingCourseSlug.trim()
            : ""
          : "";
      trainingCourseSlug = rawCourse;
      trainingDisplayLabel =
        typeof doc.trainingDisplayLabel === "string" ? doc.trainingDisplayLabel.trim() : "";
      if (!trainingDisplayLabel) {
        trainingDisplayLabel = computeTrainingDisplayLabel(tt as TrainingTrack, trainingCourseSlug);
      }
    }
  }

  return {
    _id: String(doc._id),
    name: typeof doc.name === "string" ? doc.name : "",
    country: typeof doc.country === "string" ? doc.country : "",
    university: typeof doc.university === "string" ? doc.university : "",
    imageUrl: typeof doc.imageUrl === "string" ? doc.imageUrl : "",
    story: typeof doc.story === "string" ? doc.story : "",
    kind,
    serviceSlug,
    testPrepSlug,
    trainingTrack,
    trainingCourseSlug,
    trainingDisplayLabel,
    showOnMainPage: readShowOnMainPage(doc),
    createdAt: toIso(doc.createdAt),
    updatedAt: toIso(doc.updatedAt),
  };
}

/** All stories, newest first (dashboard updates). */
export async function getAllSuccessStoriesSorted(): Promise<PublicSuccessStory[]> {
  if (!isMongoConfigured()) return [];
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();
    return docs.map((d) => serialize(d as Record<string, unknown>));
  } catch {
    return [];
  }
}

/** Stories tagged for the main home page carousel (`kind: home`), newest first. */
export async function getLatestSuccessStoriesForHome(limit = 24): Promise<PublicSuccessStory[]> {
  if (!isMongoConfigured()) return [];
  const cap = typeof limit === "number" && limit > 0 ? limit : 24;
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();
    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (row.kind !== "home") continue;
      out.push(row);
      if (out.length >= cap) break;
    }
    return out;
  } catch {
    return [];
  }
}

/** Stories tagged for `/scholarships`, newest first. */
export async function getSuccessStoriesForScholarshipsPage(limit?: number): Promise<PublicSuccessStory[]> {
  if (!isMongoConfigured()) return [];
  const max = typeof limit === "number" && limit > 0 ? limit : Number.POSITIVE_INFINITY;
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();
    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (row.kind !== "scholarships") continue;
      out.push(row);
      if (out.length >= max) break;
    }
    return out;
  } catch {
    return [];
  }
}

/**
 * Stories for a destination hub page, newest first.
 * Scans all stories and filters by `country` vs destination slug aliases.
 * Pass `limit` > 0 to cap count; omit or use 0 for every matching story.
 */
export async function getSuccessStoriesForDestinationSlug(
  slug: string,
  limit?: number
): Promise<PublicSuccessStory[]> {
  if (!isDestinationSuccessStorySlug(slug)) return [];
  if (!isMongoConfigured()) return [];
  const max = typeof limit === "number" && limit > 0 ? limit : Number.POSITIVE_INFINITY;
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();

    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (row.kind !== "destination") continue;
      if (!countryMatchesDestinationSlug(row.country, slug)) continue;
      out.push(row);
      if (out.length >= max) break;
    }
    return out;
  } catch {
    return [];
  }
}

/** Stories for a service page (`/services/{slug}`), newest first. */
export async function getSuccessStoriesForServiceSlug(
  slug: string,
  limit?: number
): Promise<PublicSuccessStory[]> {
  if (!isSuccessStoryServiceSlug(slug)) return [];
  if (!isMongoConfigured()) return [];
  const max = typeof limit === "number" && limit > 0 ? limit : Number.POSITIVE_INFINITY;
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();

    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (row.kind !== "service" || row.serviceSlug !== slug) continue;
      out.push(row);
      if (out.length >= max) break;
    }
    return out;
  } catch {
    return [];
  }
}

/** Stories for `/test-prep/{slug}` (ielts, gre, toefl, gmat). */
export async function getSuccessStoriesForTestPrepSlug(
  slug: string,
  limit?: number
): Promise<PublicSuccessStory[]> {
  if (!isSuccessStoryTestPrepSlug(slug)) return [];
  if (!isMongoConfigured()) return [];
  const max = typeof limit === "number" && limit > 0 ? limit : Number.POSITIVE_INFINITY;
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();

    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (row.kind !== "test_prep" || row.testPrepSlug !== slug) continue;
      out.push(row);
      if (out.length >= max) break;
    }
    return out;
  } catch {
    return [];
  }
}

/** Training stories for hub or course pages (`kind: training`). */
export async function getSuccessStoriesForTrainingPlacement(
  track: TrainingTrack,
  courseSlug: string | undefined,
  limit?: number
): Promise<PublicSuccessStory[]> {
  if (!isMongoConfigured()) return [];
  const max = typeof limit === "number" && limit > 0 ? limit : Number.POSITIVE_INFINITY;
  const course = (courseSlug ?? "").trim();
  if (track === "technical" || track === "non_technical") {
    if (!course) return [];
  } else if (course) {
    return [];
  }

  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
      ])
      .toArray();

    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (row.kind !== "training" || row.trainingTrack !== track) continue;
      if (track === "technical" || track === "non_technical") {
        if (row.trainingCourseSlug !== course) continue;
      }
      out.push(row);
      if (out.length >= max) break;
    }
    return out;
  } catch {
    return [];
  }
}

/** Stories flagged for a hub/main listing page (`showOnMainPage: true`), newest first. */
export async function getSuccessStoriesForMainPage(
  hub: SuccessStoryMainPageHub,
  limit = 24
): Promise<PublicSuccessStory[]> {
  if (!isSuccessStoryMainPageHub(hub)) return [];
  if (!isMongoConfigured()) return [];
  const max = typeof limit === "number" && limit > 0 ? limit : 24;
  try {
    const db = await getDatabase();
    const docs = await db
      .collection(COLLECTIONS.SUCCESS_STORIES)
      .aggregate([
        { $match: mongoFilterForMainPageHub(hub) },
        {
          $addFields: {
            _sortAt: { $ifNull: ["$updatedAt", "$createdAt"] },
          },
        },
        { $sort: { _sortAt: -1 } },
        { $limit: max },
      ])
      .toArray();

    const out: PublicSuccessStory[] = [];
    for (const d of docs) {
      const row = serialize(d as Record<string, unknown>);
      if (!storyMatchesMainPageHub(row, hub)) continue;
      out.push(row);
    }
    return out;
  } catch {
    return [];
  }
}
