import Link from "next/link";
import Image from "next/image";
import {
  COLLECTIONS,
  getDatabase,
  isMongoConfigured,
} from "@/lib/mongodb";

export const dynamic = "force-dynamic";

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

const categories = [
  "Study Abroad Tips",
  "Test Preparation",
  "Visa & Application Guidance",
  "Scholarships",
  "Student Life Abroad",
  "News & Updates",
];

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
          <div className="max-w-md mx-auto">
            <input
              type="text"
              placeholder="Search Articles..."
              className="w-full px-6 py-3 rounded-full text-gray-900"
            />
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {categories.map((category, index) => (
              <button
                key={index}
                className="px-6 py-2 border border-gray-300 rounded-full hover:bg-brand hover:text-white hover:border-brand transition-colors"
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Blog Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <BlogGrid />
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated with Study Abroad Insights</h2>
            <p className="text-gray-600 mb-6">Get tips, news, and updates delivered directly to your inbox.</p>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
              <input
                type="text"
                placeholder="Your Name"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="w-full h-12 px-4 border border-gray-300 rounded-lg"
              />
              <button className="w-full h-12 px-6 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors whitespace-nowrap motion-reduce:transition-none">
                Subscribe Now
              </button>
            </div>
          </div>
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
    <div className="grid md:grid-cols-3 gap-8">
      {blogs.map((blog) => {
        const dateValue = blog.publishedAt || blog.createdAt;
        const date = dateValue ? new Date(dateValue).toLocaleDateString("en-IN") : "";
        return (
          <Link
            key={blog._id}
            href={`/blog/${blog.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all motion-reduce:transition-none"
          >
            <div className="relative h-48 overflow-hidden bg-gray-100">
              {blog.image ? (
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-300 motion-reduce:transition-none"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              ) : null}
            </div>
            <div className="p-6">
              <span className="text-sm text-brand font-semibold">{blog.category || "Blog"}</span>
              <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-brand transition-colors line-clamp-2 motion-reduce:transition-none">
                {blog.title}
              </h3>
              {blog.excerpt ? <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p> : null}
              <div className="flex justify-between items-center">
                <span className="text-sm text-gray-500">{date}</span>
                <span className="text-brand font-semibold group-hover:underline">
                  Read More →
                </span>
              </div>
            </div>
          </Link>
        );
      })}
    </div>
  );
}
