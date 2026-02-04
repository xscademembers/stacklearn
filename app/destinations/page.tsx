import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const countries = [
  {
    name: "United Kingdom",
    href: "/destinations/uk",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    highlights: [
      "Post-study work visa up to 2 years",
      "Globally ranked universities",
      "One-year Master's programs",
    ],
  },
  {
    name: "United States",
    href: "/destinations/usa",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    highlights: [
      "World-class research opportunities",
      "Diverse course options",
      "Strong career prospects",
    ],
  },
  {
    name: "Canada",
    href: "/destinations/canada",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    highlights: [
      "Post-graduation work permit",
      "Affordable education",
      "Immigration pathways",
    ],
  },
  {
    name: "Australia",
    href: "/destinations/australia",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    highlights: [
      "Post-study work visa up to 4 years",
      "High quality of life",
      "Strong job market",
    ],
  },
  {
    name: "Germany",
    href: "/destinations/germany",
    image: "https://images.unsplash.com/photo-1467269204594-9661b134dd2b?w=800",
    highlights: [
      "Low or no tuition fees",
      "Excellent engineering programs",
      "Strong economy",
    ],
  },
];

export default function DestinationsPage() {
  return (
    <div className="pb-0">
      {/* Hero Banner */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="World travel and destinations"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/60" />
        </div>
        {/* Soft light blobs */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Choose Your Study Destination</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Discover the best countries to pursue your higher education. Compare study options, tuition costs, post-study work opportunities, and choose the perfect destination for your goals.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Talk to a Country Expert
          </Link>
        </div>
      </section>

      {/* Filter & Search Bar */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Regions</option>
              <option>Europe</option>
              <option>North America</option>
              <option>Asia</option>
              <option>Oceania</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Degree Levels</option>
              <option>Bachelor’s</option>
              <option>Master’s</option>
              <option>PhD</option>
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg">
              <option>All Budgets</option>
              <option>Under ₹10L</option>
              <option>₹10L–₹25L</option>
              <option>Above ₹25L</option>
            </select>
            <button className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Country Cards Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {countries.map((country, index) => (
              <Link
                key={index}
                href={country.href}
                className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={country.name}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/60" />
                  <h3 className="absolute bottom-4 left-4 right-4 text-white font-bold text-xl">
                    Study in {country.name}
                  </h3>
                </div>
                <div className="p-6">
                  <ul className="space-y-2 mb-4">
                    {country.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-gray-600 flex items-start gap-2">
                        <span className="text-primary-600 mt-1">•</span>
                        {highlight}
                      </li>
                    ))}
                  </ul>
                  <div className="flex items-center text-primary-600 font-semibold group-hover:gap-2 transition-all">
                    Explore Country
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students planning their journey"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 py-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-4 drop-shadow-2xl leading-tight">
            Confused About Which Country to Choose?
          </h2>
          <p className="text-xl md:text-2xl mb-8 opacity-95">Speak with our expert counsellors to find the best fit for your goals.</p>
          <Link
            href="/contact"
            className="inline-block mt-4 px-12 py-4 bg-white text-primary-600 rounded-full font-bold text-lg md:text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:bg-gray-50"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}
