"use client";

import { useEffect, useState } from "react";
import type { PublicSuccessStory } from "@/lib/success-story-public";
import { testPrepLabelForSlug } from "@/lib/success-story-test-prep-options";
import CmsSuccessStoriesCarousel from "@/components/success-stories/CmsSuccessStoriesCarousel";

type Props = {
  testPrepSlug: string;
};

export default function TestPrepSuccessStoriesSection({ testPrepSlug }: Props) {
  const [stories, setStories] = useState<PublicSuccessStory[] | null>(null);

  useEffect(() => {
    setStories(null);
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(
          `/api/public/success-stories?testPrep=${encodeURIComponent(testPrepSlug)}`,
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
  }, [testPrepSlug]);

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

  const label = testPrepLabelForSlug(testPrepSlug);
  return (
    <CmsSuccessStoriesCarousel
      stories={stories}
      sectionId={`test-prep-${testPrepSlug}`}
      subtitle={`Students who prepared for ${label} with Stack Learn.`}
    />
  );
}
