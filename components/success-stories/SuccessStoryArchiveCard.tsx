"use client";

import { isVideoSuccessStory, successStoryMetaLine, type PublicSuccessStory } from "@/lib/success-story-public";
import SuccessStoryVideoPlayer from "@/components/success-stories/SuccessStoryVideoPlayer";

type Props = {
  story: PublicSuccessStory;
};

export default function SuccessStoryArchiveCard({ story }: Props) {
  const isVideo = isVideoSuccessStory(story);

  return (
    <article className="flex h-full flex-col overflow-hidden rounded-xl border border-border bg-page-soft shadow-sm transition-shadow motion-reduce:transition-none hover:shadow-md">
      <div className={`relative w-full bg-surface ${isVideo ? "p-4" : "aspect-[4/3]"}`}>
        {isVideo ? (
          <SuccessStoryVideoPlayer videoUrl={story.videoUrl} studentName={story.name} />
        ) : story.imageUrl ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img src={story.imageUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
        ) : (
          <div className="flex aspect-[4/3] items-center justify-center text-sm text-foreground-muted">
            No photo
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-6">
        <h3 className="mb-2 text-xl font-bold text-foreground">{story.name}</h3>
        <p className="mb-4 text-sm font-semibold text-brand">{successStoryMetaLine(story)}</p>
        {!isVideo && story.story ? (
          <blockquote className="m-0 flex-1 text-sm italic leading-relaxed text-foreground-muted">
            &ldquo;{story.story}&rdquo;
          </blockquote>
        ) : null}
      </div>
    </article>
  );
}
