"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";

const destinations = [
  {
    name: "United Kingdom",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    image:
      "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    image:
      "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1600",
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
    image:
      "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/au.png",
    highlights: [
      "Post-study work visa up to 4 years",
      "High quality of life",
      "Strong job market",
    ],
    href: "/destinations/australia",
  },
  {
    name: "Germany",
    image:
      "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/de.png",
    highlights: [
      "Tuition-free public universities",
      "Strong engineering & research",
      "Central European location",
    ],
    href: "/destinations/germany",
  },
  {
    name: "Ireland",
    image:
      "https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/ie.png",
    highlights: [
      "Europe's leading tech & pharma hub",
      "Two-year post-study work visa",
      "English-speaking EU country",
    ],
    href: "/destinations/ireland",
  },
];

const VISIBLE_CARDS = 4;

export default function PopularDestinations() {
  const [index, setIndex] = useState(0);
  const total = destinations.length;

  const showPrev = () => {
    setIndex((prev) => (prev - 1 + total) % total);
  };

  const showNext = () => {
    setIndex((prev) => (prev + 1) % total);
  };

  const visible = Array.from({ length: VISIBLE_CARDS }).map((_, i) => {
    const item = destinations[(index + i) % total];
    return { ...item, key: `${item.href}-${index}-${i}` };
  });

  return (
    <section
      className="py-16 md:py-24 bg-slate-50"
      aria-label="Popular study destinations"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            Popular <span className="gradient-text">Destinations</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            Explore top study destinations around the world
          </p>
        </div>

        <div className="space-y-8">
          {/* Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
            {visible.map((destination) => (
              <Link
                key={destination.key}
                href={destination.href}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={destination.image}
                    alt={destination.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <Image
                      src={destination.flag}
                      alt=""
                      width={28}
                      height={20}
                      className="rounded shadow-md flex-shrink-0"
                    />
                    <h3 className="text-white font-semibold text-xl drop-shadow-md truncate">
                      {destination.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-2.5 flex-1">
                    {destination.highlights.map((highlight, i) => (
                      <li
                        key={i}
                        className="text-sm text-slate-600 flex items-start gap-2"
                      >
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center text-brand font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                    <span>Explore more</span>
                    <FiArrowRight className="w-4 h-4 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>

          {/* Navigation arrows below cards so they never overlap */}
          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPrev}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              aria-label="Previous destinations"
            >
              <FiChevronLeft className="w-5 h-5 mr-1" />
              Prev
            </button>
            <button
              type="button"
              onClick={showNext}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2"
              aria-label="Next destinations"
            >
              Next
              <FiChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>

        </div>
      </div>
    </section>
  );
}

