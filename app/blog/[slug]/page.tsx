import Link from "next/link";
import Image from "next/image";
import { notFound } from "next/navigation";
import { COLLECTIONS, getDatabase, isMongoConfigured } from "@/lib/mongodb";

type BlogBlock = {
  heading?: string;
  paragraph?: string;
  imageUrl?: string;
};

type BlogDoc = {
  title: string;
  slug: string;
  excerpt?: string;
  category?: string;
  image?: string;
  blocks?: BlogBlock[];
  content?: string;
  publishedAt?: string | Date | null;
  createdAt?: string | Date;
};

export const dynamic = "force-dynamic";

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  if (!slug) notFound();

  if (!isMongoConfigured()) notFound();

  const db = await getDatabase();
  const blog = (await db
    .collection(COLLECTIONS.BLOGS)
    .findOne({ slug, published: true })) as unknown as BlogDoc | null;

  if (!blog) notFound();

  const dateValue = blog.publishedAt || blog.createdAt;
  const date = dateValue ? new Date(dateValue).toLocaleDateString("en-IN") : "";
  const blocks: BlogBlock[] =
    Array.isArray(blog.blocks) && blog.blocks.length > 0
      ? blog.blocks
      : blog.content
        ? [{ paragraph: String(blog.content) }]
        : [];

  return (
    <div className="bg-white">
      <section className="border-b">
        <div className="container mx-auto px-4 py-10">
          <nav className="text-sm text-gray-500">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-gray-700">{blog.title}</span>
          </nav>

          <header className="mt-4 max-w-3xl">
            <p className="text-sm font-semibold text-brand">{blog.category || "Blog"}</p>
            <h1 className="mt-2 text-3xl md:text-4xl font-bold text-gray-900">{blog.title}</h1>
            <div className="mt-3 flex flex-wrap items-center gap-3 text-sm text-gray-500">
              {date ? <span>{date}</span> : null}
              {blog.excerpt ? <span className="text-gray-400">•</span> : null}
              {blog.excerpt ? <span className="max-w-2xl">{blog.excerpt}</span> : null}
            </div>
          </header>
        </div>
      </section>

      {blog.image ? (
        <section className="container mx-auto px-4 py-8">
          <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden bg-gray-100">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 900px"
            />
          </div>
        </section>
      ) : null}

      <main className="container mx-auto px-4 pb-16">
        <article className="max-w-3xl mx-auto space-y-10">
          {blocks.length === 0 ? (
            <p className="text-gray-600">This post doesn’t have content yet.</p>
          ) : (
            blocks.map((b, idx) => (
              <section key={idx} className="space-y-4">
                {b.heading ? (
                  <h2 className="text-2xl font-bold text-gray-900">{b.heading}</h2>
                ) : null}
                {b.paragraph ? (
                  <p className="text-gray-700 leading-relaxed whitespace-pre-wrap">{b.paragraph}</p>
                ) : null}
                {b.imageUrl ? (
                  <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden bg-gray-100">
                    <Image
                      src={b.imageUrl}
                      alt={b.heading || blog.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 768px"
                    />
                  </div>
                ) : null}
              </section>
            ))
          )}

          <footer className="pt-6 border-t">
            <Link href="/blog" className="text-brand font-semibold hover:underline">
              ← Back to all posts
            </Link>
          </footer>
        </article>
      </main>
    </div>
  );
}

