import Link from "next/link";
import Image from "next/image";

const blogs = [
  {
    title: "Top 10 Universities in the UK for International Students",
    excerpt: "Discover the best universities in the UK and what makes them stand out for international students.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
    href: "/blog/top-10-uk-universities",
  },
  {
    title: "Complete Guide to Student Visa Process",
    excerpt: "Everything you need to know about applying for a student visa, required documents, and tips for success.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    href: "/blog/student-visa-guide",
  },
  {
    title: "How to Write a Winning Statement of Purpose",
    excerpt: "Learn the secrets to crafting an impactful SOP that stands out to admission committees.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    href: "/blog/sop-writing-guide",
  },
];

export default function BlogHighlights() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            Latest Resources & <span className="gradient-text">Insights</span>
          </h2>
          <p className="text-xl text-slate-700 font-medium">
            Expert tips, student experiences, and global education updates
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {blogs.map((blog, index) => (
            <Link
              key={index}
              href={blog.href}
              className="group bg-white border-2 border-gray-200 rounded-2xl overflow-hidden hover:border-brand hover:shadow-2xl transition-all duration-300 hover-lift"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={blog.image}
                  alt={blog.title}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors duration-300 line-clamp-2">
                  {blog.title}
                </h3>
                <p className="text-slate-700 mb-4 line-clamp-2 leading-relaxed">{blog.excerpt}</p>
                <span className="inline-flex items-center gap-2 text-brand font-bold group-hover:gap-3 transition-all duration-300">
                  Read More
                  <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                </span>
              </div>
            </Link>
          ))}
        </div>
        <div className="text-center mt-8">
          <Link
            href="/blog"
            className="inline-block px-8 py-3 border-2 border-primary-600 text-primary-600 rounded-full font-semibold hover:bg-primary-600 hover:text-white transition-all"
          >
            View All Articles
          </Link>
        </div>
      </div>
    </section>
  );
}
