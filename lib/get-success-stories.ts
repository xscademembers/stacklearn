import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import {
  countryMatchesDestinationSlug,
  isDestinationSuccessStorySlug,
} from "@/lib/destination-country-match";

export type PublicSuccessStory = {
  _id: string;
  name: string;
  country: string;
  university: string;
  imageUrl: string;
  story: string;
  createdAt?: string;
  updatedAt?: string;
};

function toIso(d: unknown): string | undefined {
  if (d instanceof Date) return d.toISOString();
  if (typeof d === "string") return d;
  return undefined;
}

function serialize(doc: Record<string, unknown>): PublicSuccessStory {
  return {
    _id: String(doc._id),
    name: typeof doc.name === "string" ? doc.name : "",
    country: typeof doc.country === "string" ? doc.country : "",
    university: typeof doc.university === "string" ? doc.university : "",
    imageUrl: typeof doc.imageUrl === "string" ? doc.imageUrl : "",
    story: typeof doc.story === "string" ? doc.story : "",
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

/** Latest stories by most recently updated (fallback: created). */
export async function getLatestSuccessStoriesForHome(limit = 4): Promise<PublicSuccessStory[]> {
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
        { $limit: limit },
      ])
      .toArray();
    return docs.map((d) => serialize(d as Record<string, unknown>));
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
      if (!countryMatchesDestinationSlug(row.country, slug)) continue;
      out.push(row);
      if (out.length >= max) break;
    }
    return out;
  } catch {
    return [];
  }
}
