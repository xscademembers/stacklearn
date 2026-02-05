import Link from "next/link";
import Image from "next/image";

const stories = [
  {
    name: "Sai Kumar",
    country: "UK",
    university: "University of Leeds",
    course: "MSc Computer Science",
    quote: "Stack Learn helped me get into the University of Leeds!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
    year: "2025",
  },
  {
    name: "Priya Sharma",
    country: "Canada",
    university: "University of Toronto",
    course: "MBA",
    quote: "The counselling team helped me find the perfect university match.",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
    year: "2024",
  },
  {
    name: "Rahul Patel",
    country: "Australia",
    university: "University of Melbourne",
    course: "MEng Mechanical",
    quote: "From application to visa approval, Stack Learn guided me through everything.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
    year: "2024",
  },
];

export default function SuccessStoriesPage() {
  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/7944099/pexels-photo-7944099.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating achievement"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        {/* Soft light blobs */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Real Students, Real Success</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Meet our students who turned their study abroad dreams into reality.
          </p>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Countries</option>
              <option>UK</option>
              <option>USA</option>
              <option>Canada</option>
              <option>Australia</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Courses</option>
              <option>Engineering</option>
              <option>Business</option>
              <option>IT</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Years</option>
              <option>2024</option>
              <option>2025</option>
            </select>
            <input
              type="text"
              placeholder="Search by name or university"
              className="px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors">
              Apply Filter
            </button>
          </div>
        </div>
      </section>

      {/* Stories Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {stories.map((story, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md overflow-hidden">
                <div className="relative w-full h-64 overflow-hidden">
                  <Image
                    src={story.image}
                    alt={story.name}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{story.name}</h3>
                  <p className="text-primary-600 font-semibold mb-4">
                    {story.course} | {story.university}, {story.country}
                  </p>
                  <p className="text-gray-600 italic mb-6">
                    &ldquo;{story.quote}&rdquo;
                  </p>
                  <Link
                    href={`/success-stories/${story.name.toLowerCase().replace(/\s+/g, "-")}`}
                    className="inline-block text-primary-600 font-semibold hover:underline"
                  >
                    Read Full Story →
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            {[
              { label: "Successful Admissions", value: "500+" },
              { label: "Scholarships Secured", value: "100+" },
              { label: "Visa Success Rate", value: "97%" },
              { label: "Partner Universities", value: "30+" },
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-brand mb-2">{stat.value}</div>
                <div className="text-gray-600">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Video Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Video Testimonials</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Arjun Mehta", info: "MSc Data Science • University of Edinburgh, UK", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400" },
              { name: "Sneha Reddy", info: "MBA • University of Toronto, Canada", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400" },
              { name: "Vikram Singh", info: "MEng • University of Melbourne, Australia", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=400" },
              { name: "Priya Nair", info: "MS Computer Science • Columbia University, USA", img: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400" },
            ].map((testimonial, i) => (
              <div key={i} className="bg-white rounded-xl shadow-md overflow-hidden group cursor-pointer hover:shadow-xl transition-all">
                <div className="relative h-40 overflow-hidden">
                  <Image
                    src={testimonial.img}
                    alt={testimonial.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                    <div className="w-14 h-14 bg-white/90 rounded-full flex items-center justify-center">
                      <svg className="w-6 h-6 text-brand ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                <div className="p-4">
                  <p className="font-semibold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-gray-600">{testimonial.info}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Submit Your Story */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-gray-50 p-8 rounded-xl shadow-md">
            <h2 className="text-3xl font-bold text-gray-900 mb-4 text-center">Submit Your Story</h2>
            <p className="text-gray-600 mb-8 text-center">
              Share your Stack Learn journey and inspire other students planning to study abroad.
            </p>
            <form className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <input
                  type="text"
                  placeholder="Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="text"
                  placeholder="University / Country"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
              </div>
              <input
                type="text"
                placeholder="Course"
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <textarea
                placeholder="Your Experience"
                rows={4}
                className="w-full px-4 py-3 border border-gray-300 rounded-lg"
              />
              <button className="w-full px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors">
                Submit Your Story
              </button>
            </form>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student success celebration"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Start Your Success Story Today</h2>
          <p className="text-xl mb-8">Join thousands of students who achieved their study abroad goals with Stack Learn.</p>
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
