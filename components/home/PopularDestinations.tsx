import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const destinations = [
  {
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    highlights: [
      "Post-study work visa up to 2 years",
      "Top-ranked universities globally",
      "One-year Master’s programs",
    ],
    href: "/destinations/uk",
  },
  {
    name: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    highlights: [
      "World-class research opportunities",
      "Diverse course options",
      "Strong career prospects",
    ],
    href: "/destinations/usa",
  },
  {
    name: "Canada",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    highlights: [
      "Post-graduation work permit",
      "Affordable education",
      "Immigration pathways",
    ],
    href: "/destinations/canada",
  },
  {
    name: "Australia",
    image: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800",
    highlights: [
      "Post-study work visa up to 4 years",
      "High quality of life",
      "Strong job market",
    ],
    href: "/destinations/australia",
  },
];

export default function PopularDestinations() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-xl text-slate-700 font-medium">
            Explore top study destinations around the world
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {destinations.map((destination, index) => (
            <Link
              key={index}
              href={destination.href}
              className="group bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover-lift"
            >
              <div className="relative h-56 overflow-hidden">
                <Image
                  src={destination.image}
                  alt={destination.name}
                  fill
                  className="object-cover group-hover:scale-125 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-black/50" />
                <h3 className="absolute bottom-6 left-6 right-6 text-white font-extrabold text-2xl drop-shadow-lg">
                  {destination.name}
                </h3>
              </div>
              <div className="p-6 bg-white">
                <ul className="space-y-3 mb-6">
                  {destination.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-start gap-3 font-medium">
                      <span className="text-primary-600 mt-1.5 font-bold text-lg">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-primary-600 font-bold group-hover:gap-3 transition-all duration-300">
                  Explore
                  <FiArrowRight className="ml-2 group-hover:translate-x-2 transition-transform duration-300" />
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
