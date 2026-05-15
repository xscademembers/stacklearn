"use client";

import type { SuccessStoryMainPageHub } from "@/lib/success-story-main-page";
import { mainPageCarouselSubtitle } from "@/lib/success-story-main-page";
import type { PublicSuccessStory } from "@/lib/success-story-public";
import CmsSuccessStoriesCarousel from "@/components/success-stories/CmsSuccessStoriesCarousel";

type Props = {
  mainPage: SuccessStoryMainPageHub;
  stories: PublicSuccessStory[];
};

/** Renders hub/main-page success stories passed from the server (no client fetch). */
export default function MainPageSuccessStoriesSection({ mainPage, stories }: Props) {
  return (
    <CmsSuccessStoriesCarousel
      stories={stories}
      sectionId={`main-${mainPage}`}
      subtitle={mainPageCarouselSubtitle(mainPage)}
    />
  );
}
