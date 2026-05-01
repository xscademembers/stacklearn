import Link from "next/link";
import Image from "next/image";
import {
  COLLECTIONS,
  getDatabase,
  isMongoConfigured,
} from "@/lib/mongodb";

/** CDN ISR — blog listing (Mongo). */
export const revalidate = 60;

type BlogListItem = {
  _id: string;
  title: string;
  slug: string;
  excerpt?: string;
  image?: string;
  category?: string;
  createdAt?: string | Date;
  publishedAt?: string | Date | null;
};

export default function BlogPage() {
  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-64 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.unsplash.com/photo-1456513080510-7bf3a84b82f8?w=1600"
            alt="Students studying and reading"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Resources & Insights</h1>
          <p className="text-xl mb-8">Your guide to studying abroad — expert tips, student experiences, and global education updates.</p>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-page-soft">
        <div className="container mx-auto px-4">
          <BlogGrid />
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184328/pexels-photo-3184328.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students discussing ideas"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Study Abroad Journey?</h2>
          <p className="text-xl mb-8">Book a free session with our counsellors and plan your next step.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-brand rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}

async function BlogGrid() {
  let blogs: BlogListItem[] = [];
  let hint = "";

  if (!isMongoConfigured()) {
    hint = "MongoDB is not configured. Add MONGODB_URI in .env.local to load blogs.";
  } else {
    try {
      const db = await getDatabase();
      const docs = await db
        .collection(COLLECTIONS.BLOGS)
        .find({ published: true })
        .sort({ publishedAt: -1, createdAt: -1 })
        .limit(60)
        .toArray();
      blogs = docs as unknown as BlogListItem[];
    } catch {
      hint = "Could not load blogs right now. Please try again later.";
    }
  }

  if (hint) {
    return (
      <div className="rounded-xl border border-border bg-white px-6 py-5 text-sm text-foreground-muted">
        {hint}
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="rounded-xl border border-border bg-white px-6 py-10 text-center">
        <p className="text-foreground-muted">No published blog posts yet.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
      {blogs.map((blog) => {
        const dateValue = blog.publishedAt || blog.createdAt;
        const date = dateValue ? new Date(dateValue).toLocaleDateString("en-IN") : "";
        return (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="group h-full rounded-2xl border border-border bg-surface overflow-hidden hover:border-brand/40 hover:shadow-lg transition-all motion-reduce:transition-none"
          >
            <article className="flex h-full flex-col">
              <header className="relative h-52 overflow-hidden bg-page-soft">
                {blog.image ? (
                  // eslint-disable-next-line @next/next/no-img-element -- cover URLs come from admin / any host
                  <img
                    src={blog.image}
                    alt={blog.title}
                    className="absolute inset-0 h-full w-full object-cover transition-transform duration-300 group-hover:scale-[1.03] motion-reduce:transition-none motion-reduce:group-hover:scale-100"
                  />
                ) : (
                  <div className="absolute inset-0 bg-gradient-to-br from-brand/10 via-transparent to-accent/10" />
                )}
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                <div className="absolute left-4 right-4 bottom-4 flex items-end justify-between gap-3">
                  <div className="min-w-0">
                    <p className="text-xs font-semibold text-white/90 truncate">
                      {blog.category || "Blog"}
                    </p>
                    <h3 className="mt-1 text-lg font-bold text-white leading-snug line-clamp-2">
                      {blog.title}
                    </h3>
                  </div>
                  {date ? (
                    <span className="shrink-0 rounded-full bg-white/10 px-3 py-1 text-[11px] font-medium text-white/90 backdrop-blur">
                      {date}
                    </span>
                  ) : null}
                </div>
              </header>
              <div className="p-6 flex-1 flex flex-col">
                {blog.excerpt ? (
                  <p className="text-sm leading-relaxed text-foreground-muted line-clamp-3">
                    {blog.excerpt}
                  </p>
                ) : (
                  <p className="text-sm leading-relaxed text-foreground-muted">
                    Read the full article for tips, insights, and guidance.
                  </p>
                )}
                <footer className="mt-6 flex items-center justify-between">
                  <span className="text-sm font-semibold text-brand group-hover:underline">
                    Read article
                  </span>
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full border border-border bg-page-soft text-foreground-muted group-hover:text-brand group-hover:border-brand/40 transition-colors motion-reduce:transition-none">
                    →
                  </span>
                </footer>
              </div>
            </article>
          </Link>
        );
      })}
    </div>
  );
}
