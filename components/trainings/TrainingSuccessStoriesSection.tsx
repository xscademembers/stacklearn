"use client";

import { useEffect, useState } from "react";
import type { PublicSuccessStory } from "@/lib/success-story-public";
import CmsSuccessStoriesCarousel from "@/components/success-stories/CmsSuccessStoriesCarousel";

type Props =
  | { trainingTrack: "technical" | "non_technical"; courseSlug: string; contextLabel: string }
  | { trainingTrack: "study_abroad"; contextLabel: string }
  | { trainingTrack: "corporate"; contextLabel: string };

export default function TrainingSuccessStoriesSection(props: Props) {
  const [stories, setStories] = useState<PublicSuccessStory[] | null>(null);
  const trainingTrack = props.trainingTrack;
  const trainingCourse =
    trainingTrack === "technical" || trainingTrack === "non_technical" ? props.courseSlug : "";

  useEffect(() => {
    setStories(null);
    let cancelled = false;
    (async () => {
      try {
        const sp = new URLSearchParams({ trainingTrack });
        if (trainingCourse) sp.set("trainingCourse", trainingCourse);
        const res = await fetch(`/api/public/success-stories?${sp.toString()}`, { cache: "no-store" });
        const data = await res.json();
        if (!cancelled) setStories(Array.isArray(data.successStories) ? data.successStories : []);
      } catch {
        if (!cancelled) setStories([]);
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [trainingTrack, trainingCourse]);

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

  const sectionSuffix = trainingCourse ? `${trainingTrack}-${trainingCourse}` : trainingTrack;
  return (
    <CmsSuccessStoriesCarousel
      stories={stories}
      sectionId={`training-${sectionSuffix}`}
      subtitle={`Learners who chose Stack Learn for ${props.contextLabel}.`}
    />
  );
}
