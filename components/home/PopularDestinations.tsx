"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { DestinationCard } from "@/lib/cms-home-content";

export type PopularDestinationsCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
  destinations: DestinationCard[];
};

export default function PopularDestinations({ content }: { content: PopularDestinationsCms }) {
  const destinations = content.destinations;
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const total = destinations.length;
  const maxIndex = Math.max(0, total - cardsPerView);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
        return;
      }
      if (window.innerWidth >= 640) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const showPrev = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const showNext = () => {
    setIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (total === 0) return null;

  return (
    <section
      className="py-16 md:py-24 bg-slate-50"
      aria-label="Popular study destinations"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden -mx-3">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * (100 / cardsPerView)}%)` }}
            >
              {destinations.map((destination) => (
                <div
                  key={destination.href}
                  className="px-3 shrink-0"
                  style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                >
                  <Link
                    href={destination.href}
                    className="group flex h-full flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
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
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPrev}
              disabled={index === 0}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
              aria-label="Previous destinations"
            >
              <FiChevronLeft className="w-5 h-5 mr-1" />
              Prev
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={index >= maxIndex}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
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
