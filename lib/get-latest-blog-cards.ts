import type { BlogCard } from "@/lib/cms-home-content";
import { COLLECTIONS, getDatabase, isMongoConfigured } from "@/lib/mongodb";

type BlogDoc = {
  title?: string;
  slug?: string;
  excerpt?: string;
  image?: string;
};

const FALLBACK_IMAGE =
  "https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=800&q=80";

function stripHtml(input: string): string {
  return String(input || "")
    .replace(/<[^>]*>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Latest published blog posts for the home page (newest first).
 * Returns [] if MongoDB is not configured or the query fails.
 */
export async function getLatestPublishedBlogCards(limit: number): Promise<BlogCard[]> {
  if (!isMongoConfigured() || limit < 1) return [];

  try {
    const db = await getDatabase();
    const docs = (await db
      .collection(COLLECTIONS.BLOGS)
      .find({ published: true })
      .sort({ publishedAt: -1, createdAt: -1 })
      .limit(limit)
      .project({ title: 1, slug: 1, excerpt: 1, image: 1 })
      .toArray()) as unknown as BlogDoc[];

    return docs
      .filter((d) => typeof d.slug === "string" && d.slug.trim().length > 0)
      .map((doc) => {
        const excerptRaw = typeof doc.excerpt === "string" ? doc.excerpt : "";
        const excerpt = stripHtml(excerptRaw);
        return {
          title: typeof doc.title === "string" && doc.title.trim() ? doc.title.trim() : "Blog post",
          excerpt: excerpt || "Read the full article for tips, insights, and guidance.",
          image: typeof doc.image === "string" && doc.image.trim() ? doc.image.trim() : FALLBACK_IMAGE,
          href: `/blog/${doc.slug!.trim()}`,
        };
      });
  } catch {
    return [];
  }
}
