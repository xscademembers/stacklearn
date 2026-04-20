"use client";

import { useEffect, useState } from "react";
import type { PublicSuccessStory } from "@/lib/get-success-stories";

type Props = {
  destinationSlug: string;
  /** Used in the section heading, e.g. "United Kingdom" */
  countryLabel: string;
};

export default function DestinationSuccessStoriesSection({ destinationSlug, countryLabel }: Props) {
  const [stories, setStories] = useState<PublicSuccessStory[] | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/public/success-stories?destination=${encodeURIComponent(destinationSlug)}&limit=12`,
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

  if (stories === null) {
    return (
      <section
        className="py-16 md:py-24 bg-page-soft border-t border-border"
        aria-busy="true"
        aria-label="Success stories"
      >
        <div className="container mx-auto px-6 md:px-8">
          <div className="h-40 rounded-2xl border border-border bg-surface animate-pulse motion-reduce:animate-none" />
        </div>
      </section>
    );
  }

  if (stories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-page-soft border-t border-border" aria-labelledby={`success-stories-${destinationSlug}`}>
      <div className="container mx-auto px-6 md:px-8">
        <header className="text-center mb-10 md:mb-12 max-w-3xl mx-auto">
          <h2 id={`success-stories-${destinationSlug}`} className="text-3xl md:text-4xl font-extrabold text-foreground mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-base md:text-lg text-foreground-muted">
            Students who chose Stack Learn for study in {countryLabel}.
          </p>
        </header>

        <ul className="grid gap-4 md:gap-6 sm:grid-cols-2 lg:grid-cols-3 list-none p-0 m-0 max-w-6xl mx-auto">
          {stories.map((s) => (
            <li key={s._id}>
              <article className="h-full flex flex-col rounded-2xl border border-border bg-surface p-5 md:p-6 shadow-sm transition-shadow motion-reduce:transition-none hover:shadow-md">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative mb-4">
                    <div className="relative w-24 h-24 rounded-full overflow-hidden ring-4 ring-brand/15 bg-page-soft">
                      {s.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground-muted text-xs font-medium px-2">
                          No photo
                        </div>
                      )}
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-xs font-bold shadow"
                      aria-hidden
                    >
                      ✓
                    </span>
                  </div>
                  <h3 className="text-lg font-bold text-foreground">{s.name}</h3>
                  <p className="text-sm font-semibold text-brand mt-1">
                    {[s.university, s.country].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <blockquote className="text-sm text-foreground-muted italic leading-relaxed text-center m-0 flex-1 line-clamp-4">
                  &ldquo;{s.story}&rdquo;
                </blockquote>
              </article>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
