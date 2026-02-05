import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

const destinations = [
  {
    name: "United Kingdom",
    image: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?w=800",
    flag: "https://flagcdn.com/w40/gb.png",
    highlights: [
      "Post-study work visa up to 2 years",
      "Top-ranked universities globally",
      "One-year Master's programs",
    ],
    href: "/destinations/uk",
  },
  {
    name: "United States",
    image: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=800",
    flag: "https://flagcdn.com/w40/us.png",
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
    flag: "https://flagcdn.com/w40/ca.png",
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
    flag: "https://flagcdn.com/w40/au.png",
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
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            Explore top study destinations around the world
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
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
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                <div className="absolute bottom-6 left-6 right-6 flex items-center gap-3">
                  <Image src={destination.flag} alt="" width={32} height={22} className="rounded-sm shadow-md" />
                  <h3 className="text-white font-extrabold text-2xl drop-shadow-lg">
                    {destination.name}
                  </h3>
                </div>
              </div>
              <div className="p-6 md:p-8 bg-white">
                <ul className="space-y-3 mb-6">
                  {destination.highlights.map((highlight, i) => (
                    <li key={i} className="text-sm text-slate-700 flex items-start gap-3 font-medium">
                      <span className="text-brand mt-1.5 font-bold text-lg">•</span>
                      <span>{highlight}</span>
                    </li>
                  ))}
                </ul>
                <div className="flex items-center text-brand font-bold group-hover:gap-3 transition-all duration-300">
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
