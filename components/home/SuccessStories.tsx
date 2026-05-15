"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  isVideoSuccessStory,
  successStorySectionHeading,
  type PublicSuccessStory,
} from "@/lib/success-story-public";
import SuccessStorySlideCard from "@/components/success-stories/SuccessStorySlideCard";

export type SuccessStoriesCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
};

type Props = {
  content: SuccessStoriesCms;
  stories: PublicSuccessStory[];
};

export default function SuccessStories({ content, stories }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  if (stories.length === 0) return null;

  const hasVideo = stories.some(isVideoSuccessStory);
  const heading = successStorySectionHeading(hasVideo);
  const useCmsTitle = !hasVideo;

  const nextSlide = () => {
    setDirection("next");
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setDirection("prev");
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-16 md:py-24 bg-page-soft" aria-labelledby="home-success-stories-heading">
      <div className="container mx-auto px-4 md:px-8">
        <header className="text-center mb-10 md:mb-16 max-w-3xl mx-auto">
          <h2 id="home-success-stories-heading" className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
            {useCmsTitle ? (
              <>
                {content.titleLead} <span className="gradient-text">{content.titleGradient}</span>
              </>
            ) : (
              <>
                {heading.lead} <span className="gradient-text">{heading.gradient}</span>
              </>
            )}
          </h2>
          <p className="text-base md:text-xl text-foreground-muted font-medium">{content.subheading}</p>
        </header>

        <div className="relative max-w-6xl mx-auto px-10 md:px-14">
          <div className="overflow-hidden rounded-2xl">
            <div
              className={`flex will-change-transform transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none motion-reduce:duration-0 ${
                direction === "next" ? "animate-carousel-track-next" : "animate-carousel-track-prev"
              }`}
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((s) => (
                <div key={s._id} className="min-w-full shrink-0 px-2 md:px-4">
                  <SuccessStorySlideCard story={s} />
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface p-3 shadow-md hover:bg-page-soft transition-colors motion-reduce:transition-none"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="w-6 h-6 text-foreground" aria-hidden />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface p-3 shadow-md hover:bg-page-soft transition-colors motion-reduce:transition-none"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="w-6 h-6 text-foreground" aria-hidden />
          </button>

          <div className="mt-8 flex justify-center gap-2" aria-label="Testimonial slides">
            {stories.map((s, index) => (
              <button
                key={s._id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                  index === currentIndex ? "w-8 bg-brand" : "w-2 bg-border hover:bg-foreground-muted/50"
                }`}
                aria-label={`Go to testimonial ${index + 1}`}
                aria-pressed={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
