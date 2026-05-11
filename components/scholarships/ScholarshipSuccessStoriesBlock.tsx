"use client";

import Link from "next/link";
import CmsSuccessStoriesCarousel from "@/components/success-stories/CmsSuccessStoriesCarousel";
import type { PublicSuccessStory } from "@/lib/success-story-public";

type Props = {
  stories: PublicSuccessStory[];
};

export default function ScholarshipSuccessStoriesBlock({ stories }: Props) {
  return (
    <>
      <CmsSuccessStoriesCarousel
        stories={stories}
        sectionId="scholarships"
        subtitle="Students who won scholarships with guidance from Stack Learn."
      />
      {stories.length > 0 ? (
        <div className="border-t border-border bg-page-soft pb-16 pt-0 text-center md:pb-24">
          <div className="container mx-auto px-4 md:px-8">
            <Link href="/success-stories" className="text-brand font-semibold hover:underline">
              Read More Success Stories →
            </Link>
          </div>
        </div>
      ) : null}
    </>
  );
}
