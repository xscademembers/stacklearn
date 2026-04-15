import { NextResponse } from "next/server";
import {
  COLLECTIONS,
  getDatabase,
  isMongoConfigured,
  MONGODB_NOT_CONFIGURED_MESSAGE,
} from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

const DEFAULT_BLOGS = [
  {
    title: "Top 10 Universities in the UK for International Students",
    slug: "top-10-uk-universities",
    excerpt:
      "Discover the best universities in the UK and what makes them stand out for international students.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=1200",
    category: "Study Abroad Tips",
  },
  {
    title: "Complete Guide to Student Visa Process",
    slug: "student-visa-guide",
    excerpt:
      "Everything you need to know about applying for a student visa, required documents, and tips for success.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=1200",
    category: "Visa & Application Guidance",
  },
  {
    title: "How to Write a Winning Statement of Purpose",
    slug: "sop-writing-guide",
    excerpt:
      "Learn the secrets to crafting an impactful SOP that stands out to admission committees.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=1200",
    category: "Application Guidance",
  },
] as const;

export async function POST() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const db = await getDatabase();
  const existing = await db.collection(COLLECTIONS.BLOGS).countDocuments();
  if (existing > 0) {
    return NextResponse.json({ success: true, inserted: 0, message: "Blogs already exist." });
  }

  const now = new Date();
  const docs = DEFAULT_BLOGS.map((b) => ({
    ...b,
    content: "",
    blocks: [
      {
        heading: "Overview",
        paragraph: b.excerpt,
        imageUrl: "",
      },
    ],
    published: true,
    publishedAt: now,
    createdAt: now,
    updatedAt: now,
  }));

  const result = await db.collection(COLLECTIONS.BLOGS).insertMany(docs);
  return NextResponse.json({ success: true, inserted: result.insertedCount });
}

