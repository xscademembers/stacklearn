"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { SuccessStory } from "@/lib/cms-home-content";

export type SuccessStoriesCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
  stories: SuccessStory[];
};

export default function SuccessStories({ content }: { content: SuccessStoriesCms }) {
  const stories = content.stories;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  if (stories.length === 0) return null;

  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-xl text-slate-700 font-medium">
            {content.subheading}
          </p>
        </div>
        <div className="relative max-w-6xl mx-auto px-8">
          <div className="overflow-hidden">
            <div
              className={`flex will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                direction === "next" ? "animate-carousel-track-next" : "animate-carousel-track-prev"
              }`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((story, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100 transition-all duration-300 mb-4">
                    <div className="relative inline-block mb-6">
                      <div className="relative w-28 h-28 mx-auto">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="rounded-full object-cover ring-4 ring-brand-soft group-hover:ring-brand/30 transition-all duration-300"
                          sizes="112px"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                      {story.name}
                    </h3>
                    <p className="text-brand font-bold mb-4 text-lg">
                      {story.course} | {story.university}, {story.destination}
                    </p>
                    <p className="text-slate-700 italic text-lg mb-6 leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    <Link
                      href="/success-stories"
                      className="inline-flex items-center gap-2 text-brand font-bold hover:text-brand-strong hover:gap-3 transition-all duration-300"
                    >
                      Read Full Story
                      <span className="hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-brand-soft transition-colors z-10"
            aria-label="Previous story"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-brand-soft transition-colors z-10"
            aria-label="Next story"
          >
            <FiChevronRight className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-brand w-8"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
