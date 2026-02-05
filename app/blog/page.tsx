import Link from "next/link";
import Image from "next/image";

const blogs = [
  {
    title: "Top 10 Universities in the UK for International Students",
    excerpt: "Discover the best universities in the UK and what makes them stand out for international students.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
    category: "Study Abroad Tips",
    date: "November 15, 2025",
    href: "/blog/top-10-uk-universities",
  },
  {
    title: "Complete Guide to Student Visa Process",
    excerpt: "Everything you need to know about applying for a student visa, required documents, and tips for success.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    category: "Visa & Application Guidance",
    date: "November 10, 2025",
    href: "/blog/student-visa-guide",
  },
  {
    title: "How to Write a Winning Statement of Purpose",
    excerpt: "Learn the secrets to crafting an impactful SOP that stands out to admission committees.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    category: "Application Guidance",
    date: "November 5, 2025",
    href: "/blog/sop-writing-guide",
  },
];

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
                className="px-6 py-2 border border-gray-300 rounded-full hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-colors"
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
          <div className="grid md:grid-cols-3 gap-8">
            {blogs.map((blog, index) => (
              <Link
                key={index}
                href={blog.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={blog.image}
                    alt={blog.title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <span className="text-sm text-primary-600 font-semibold">{blog.category}</span>
                  <h3 className="text-xl font-bold text-gray-900 mt-2 mb-3 group-hover:text-primary-600 transition-colors line-clamp-2">
                    {blog.title}
                  </h3>
                  <p className="text-gray-600 mb-4 line-clamp-2">{blog.excerpt}</p>
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-500">{blog.date}</span>
                    <span className="text-primary-600 font-semibold group-hover:underline">
                      Read More →
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-2xl mx-auto text-center bg-gray-50 p-8 rounded-xl">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Stay Updated with Study Abroad Insights</h2>
            <p className="text-gray-600 mb-6">Get tips, news, and updates delivered directly to your inbox.</p>
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Your Name"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              />
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg"
              />
              <button className="px-8 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors">
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
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}
