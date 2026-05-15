"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import {
  isVideoSuccessStory,
  successStorySectionHeading,
  type PublicSuccessStory,
} from "@/lib/success-story-public";
import SuccessStorySlideCard from "@/components/success-stories/SuccessStorySlideCard";

type Props = {
  stories: PublicSuccessStory[];
  /** Stable id fragment for `aria-labelledby`, e.g. `service-profile-evaluation` */
  sectionId: string;
  /** Line below the heading */
  subtitle: string;
};

export default function CmsSuccessStoriesCarousel({ stories, sectionId, subtitle }: Props) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  const hasVideo = stories.some(isVideoSuccessStory);
  const heading = successStorySectionHeading(hasVideo);

  useEffect(() => {
    setCurrentIndex(0);
  }, [stories]);

  useEffect(() => {
    if (!stories.length) return;
    setCurrentIndex((i) => Math.min(i, Math.max(0, stories.length - 1)));
  }, [stories]);

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
    <section
      className="border-t border-border bg-page-soft py-16 md:py-24"
      aria-labelledby={`success-stories-${sectionId}`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 id={`success-stories-${sectionId}`} className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">
            {heading.lead} <span className="gradient-text">{heading.gradient}</span>
          </h2>
          <p className="text-base text-foreground-muted md:text-lg">{subtitle}</p>
        </header>

        <div className="relative mx-auto max-w-6xl px-10 md:px-14">
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
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface p-3 shadow-md transition-colors motion-reduce:transition-none hover:bg-page-soft"
            aria-label="Previous testimonial"
          >
            <FiChevronLeft className="h-6 w-6 text-foreground" aria-hidden />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface p-3 shadow-md transition-colors motion-reduce:transition-none hover:bg-page-soft"
            aria-label="Next testimonial"
          >
            <FiChevronRight className="h-6 w-6 text-foreground" aria-hidden />
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
