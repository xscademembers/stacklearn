"use client";

import { useEffect, useState } from "react";
import type { PublicSuccessStory } from "@/lib/success-story-public";
import CmsSuccessStoriesCarousel from "@/components/success-stories/CmsSuccessStoriesCarousel";

type Props = {
  /** Segment after `/services/`, e.g. `profile-evaluation` */
  serviceSlug: string;
  /** Used in the section subheading, e.g. "Profile Evaluation" */
  serviceLabel: string;
};

export default function ServiceSuccessStoriesSection({ serviceSlug, serviceLabel }: Props) {
  const [stories, setStories] = useState<PublicSuccessStory[] | null>(null);

  useEffect(() => {
    setStories(null);
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch(`/api/public/success-stories?service=${encodeURIComponent(serviceSlug)}`, {
          cache: "no-store",
        });
        const data = await res.json();
        if (!cancelled) setStories(Array.isArray(data.successStories) ? data.successStories : []);
      } catch {
        if (!cancelled) setStories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [serviceSlug]);

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

  return (
    <CmsSuccessStoriesCarousel
      stories={stories}
      sectionId={`service-${serviceSlug}`}
      subtitle={`Students who chose Stack Learn for ${serviceLabel}.`}
    />
  );
}
