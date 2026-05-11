"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { successStoryMetaLine, type PublicSuccessStory } from "@/lib/success-story-public";

type Props = {
  destinationSlug: string;
  /** Used in the section heading, e.g. "United Kingdom" */
  countryLabel: string;
};

export default function DestinationSuccessStoriesSection({ destinationSlug, countryLabel }: Props) {
  const [stories, setStories] = useState<PublicSuccessStory[] | null>(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState<"next" | "prev">("next");

  useEffect(() => {
    setStories(null);
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/public/success-stories?destination=${encodeURIComponent(destinationSlug)}`,
          { cache: "no-store" }
        );
        const data = await res.json();
        if (!cancelled) setStories(Array.isArray(data.successStories) ? data.successStories : []);
      } catch {
        if (!cancelled) setStories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [destinationSlug]);

  useEffect(() => {
    setCurrentIndex(0);
  }, [destinationSlug]);

  useEffect(() => {
    if (!stories?.length) return;
    setCurrentIndex((i) => Math.min(i, Math.max(0, stories.length - 1)));
  }, [stories]);

  if (stories === null) {
    return (
      <section
        className="border-t border-border bg-page-soft py-16 md:py-24"
        aria-busy="true"
        aria-label="Success stories"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="h-40 animate-pulse rounded-2xl border border-border bg-surface motion-reduce:animate-none" />
        </div>
      </section>
    );
  }

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
      aria-labelledby={`success-stories-${destinationSlug}`}
    >
      <div className="container mx-auto px-4 md:px-8">
        <header className="mx-auto mb-10 max-w-3xl text-center md:mb-14">
          <h2 id={`success-stories-${destinationSlug}`} className="mb-4 text-3xl font-extrabold text-foreground md:text-4xl">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-base text-foreground-muted md:text-lg">
            Students who chose Stack Learn for study in {countryLabel}.
          </p>
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
                  <article className="mx-auto max-w-2xl rounded-2xl border border-border bg-surface p-8 text-center shadow-sm md:p-10">
                    <div className="relative mb-6 inline-block">
                      <div className="relative mx-auto h-28 w-28">
                        {s.imageUrl ? (
                          // eslint-disable-next-line @next/next/no-img-element
                          <img
                            src={s.imageUrl}
                            alt=""
                            className="h-full w-full rounded-full object-cover ring-4 ring-brand/15"
                          />
                        ) : (
                          <div className="flex h-full w-full items-center justify-center rounded-full bg-page-soft px-2 text-xs font-medium text-foreground-muted ring-4 ring-brand/15">
                            No photo
                          </div>
                        )}
                      </div>
                      <span
                        className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-xs font-bold text-white shadow"
                        aria-hidden
                      >
                        ✓
                      </span>
                    </div>
                    <h3 className="mb-2 text-2xl font-extrabold text-foreground">{s.name}</h3>
                    <p className="mb-4 text-lg font-bold text-brand">{successStoryMetaLine(s)}</p>
                    <blockquote className="m-0 whitespace-pre-wrap text-lg italic leading-relaxed text-foreground-muted">
                      &ldquo;{s.story}&rdquo;
                    </blockquote>
                  </article>
                </div>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={prevSlide}
            className="absolute left-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface p-3 shadow-md transition-colors motion-reduce:transition-none hover:bg-page-soft"
            aria-label="Previous story"
          >
            <FiChevronLeft className="h-6 w-6 text-foreground" aria-hidden />
          </button>
          <button
            type="button"
            onClick={nextSlide}
            className="absolute right-0 top-1/2 z-10 -translate-y-1/2 rounded-full border border-border bg-surface p-3 shadow-md transition-colors motion-reduce:transition-none hover:bg-page-soft"
            aria-label="Next story"
          >
            <FiChevronRight className="h-6 w-6 text-foreground" aria-hidden />
          </button>

          <div className="mt-8 flex justify-center gap-2" aria-label="Story slides">
            {stories.map((s, index) => (
              <button
                key={s._id}
                type="button"
                onClick={() => setCurrentIndex(index)}
                className={`h-2 rounded-full transition-all motion-reduce:transition-none ${
                  index === currentIndex ? "w-8 bg-brand" : "w-2 bg-border hover:bg-foreground-muted/50"
                }`}
                aria-label={`Go to story ${index + 1}`}
                aria-pressed={index === currentIndex}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
