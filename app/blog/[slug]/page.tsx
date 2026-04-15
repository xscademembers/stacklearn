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
    <div className="bg-surface">
      <header className="border-b border-border">
        <div className="container mx-auto px-4 py-10">
          <nav className="text-sm text-foreground-muted">
            <Link href="/blog" className="hover:underline">
              Blog
            </Link>
            <span className="mx-2">/</span>
            <span className="text-foreground">{blog.title}</span>
          </nav>

          <div className="mt-6 grid gap-8 lg:grid-cols-[1.25fr_0.75fr] lg:items-end">
            <div className="min-w-0">
              <p className="text-xs font-semibold tracking-wide text-brand">
                {blog.category || "Blog"}
              </p>
              <h1 className="mt-3 text-3xl md:text-4xl font-bold text-foreground leading-tight">
                {blog.title}
              </h1>
              {blog.excerpt ? (
                <p className="mt-4 text-base md:text-lg leading-relaxed text-foreground-muted max-w-2xl">
                  {blog.excerpt}
                </p>
              ) : null}

              <div className="mt-6 flex flex-wrap items-center gap-3">
                {date ? (
                  <span className="inline-flex items-center rounded-full border border-border bg-page-soft px-3 py-1 text-xs font-medium text-foreground-muted">
                    {date}
                  </span>
                ) : null}
                <span className="inline-flex items-center rounded-full border border-border bg-page-soft px-3 py-1 text-xs font-medium text-foreground-muted">
                  {blocks.length > 0 ? `${blocks.length} section${blocks.length === 1 ? "" : "s"}` : "No content"}
                </span>
              </div>
            </div>

            <aside className="rounded-2xl border border-border bg-page-soft p-6">
              <p className="text-sm font-semibold text-foreground">Need help with your next step?</p>
              <p className="mt-2 text-sm text-foreground-muted">
                Book a free counselling call and get a personalized plan.
              </p>
              <Link
                href="/contact"
                className="mt-4 inline-flex h-11 items-center justify-center rounded-lg bg-brand px-5 text-sm font-semibold text-white hover:bg-brand-strong transition-colors motion-reduce:transition-none"
              >
                Book free counselling
              </Link>
            </aside>
          </div>
        </div>
      </header>

      <main className="bg-page-soft">
        <div className="container mx-auto px-4 py-10">
          {blog.image ? (
            <section className="mb-10">
              <div className="relative w-full h-64 md:h-96 rounded-2xl overflow-hidden border border-border bg-surface">
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

          <article className="max-w-3xl mx-auto">
            {blocks.length === 0 ? (
              <section className="rounded-2xl border border-border bg-surface p-8">
                <p className="text-foreground-muted">This post doesn’t have content yet.</p>
              </section>
            ) : (
              <div className="space-y-10">
                {blocks.map((b, idx) => (
                  <section key={idx} className="rounded-2xl border border-border bg-surface p-8 space-y-5">
                    {b.heading ? (
                      <h2 className="text-2xl font-bold text-foreground leading-snug">
                        {b.heading}
                      </h2>
                    ) : null}
                    {b.paragraph ? (
                      <p className="text-foreground leading-relaxed whitespace-pre-wrap">
                        {b.paragraph}
                      </p>
                    ) : null}
                    {b.imageUrl ? (
                      <div className="relative w-full h-60 md:h-80 rounded-xl overflow-hidden border border-border bg-page-soft">
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
                ))}
              </div>
            )}

            <footer className="mt-12 pt-8 border-t border-border">
              <Link
                href="/blog"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:underline"
              >
                <span aria-hidden>←</span>
                Back to all posts
              </Link>
            </footer>
          </article>
        </div>
      </main>
    </div>
  );
}

