"use client";

import { isVideoSuccessStory, successStoryMetaLine, type PublicSuccessStory } from "@/lib/success-story-public";
import SuccessStoryVideoPlayer from "@/components/success-stories/SuccessStoryVideoPlayer";

type Props = {
  story: PublicSuccessStory;
  /** Slightly wider card for video slides */
  variant?: "carousel" | "compact";
};

export default function SuccessStorySlideCard({ story, variant = "carousel" }: Props) {
  const isVideo = isVideoSuccessStory(story);
  const maxWidth = isVideo ? "max-w-3xl" : "max-w-2xl";

  return (
    <article
      className={`mx-auto ${maxWidth} rounded-2xl border border-border bg-surface p-6 text-center shadow-sm md:p-10 ${
        variant === "compact" ? "p-5 md:p-6" : ""
      }`}
    >
      {isVideo ? (
        <>
          <h3 className="mb-2 text-2xl font-extrabold text-foreground">{story.name}</h3>
          <p className="mb-6 text-lg font-bold text-brand">{successStoryMetaLine(story)}</p>
          <SuccessStoryVideoPlayer
            videoUrl={story.videoUrl}
            studentName={story.name}
            posterUrl={story.imageUrl || undefined}
          />
        </>
      ) : (
        <>
          <div className="relative mb-6 inline-block">
            <div className="relative mx-auto h-28 w-28">
              {story.imageUrl ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={story.imageUrl}
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
          <h3 className="mb-2 text-2xl font-extrabold text-foreground">{story.name}</h3>
          <p className="mb-4 text-lg font-bold text-brand">{successStoryMetaLine(story)}</p>
          <blockquote className="m-0 whitespace-pre-wrap text-lg italic leading-relaxed text-foreground-muted">
            &ldquo;{story.story}&rdquo;
          </blockquote>
        </>
      )}
    </article>
  );
}
