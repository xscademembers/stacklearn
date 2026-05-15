"use client";

import { parseVideoEmbedUrl } from "@/lib/success-story-video";

type Props = {
  videoUrl: string;
  studentName: string;
};

/**
 * Responsive player — supports portrait (9:16), landscape (16:9), and square via object-contain / flexible frame.
 */
export default function SuccessStoryVideoPlayer({ videoUrl, studentName }: Props) {
  const embed = parseVideoEmbedUrl(videoUrl);
  const label = `Video testimonial from ${studentName}`;

  if (!embed) {
    return (
      <p className="rounded-xl border border-border bg-page-soft px-4 py-6 text-sm text-foreground-muted">
        Video URL could not be loaded. Check the link in admin.
      </p>
    );
  }

  if (embed.type === "direct") {
    return (
      <div className="mx-auto flex w-full max-w-3xl justify-center">
        <video
          src={embed.src}
          controls
          playsInline
          preload="metadata"
          className="max-h-[min(80vh,720px)] w-full max-w-full rounded-xl border border-border bg-black object-contain motion-reduce:transition-none"
          aria-label={label}
        />
      </div>
    );
  }

  const isVertical = embed.type === "youtube" && embed.aspectHint === "vertical";
  const frameClass = isVertical
    ? "mx-auto w-full max-w-[min(100%,360px)]"
    : "mx-auto w-full max-w-3xl";

  return (
    <div className={frameClass}>
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-border bg-black ${
          isVertical ? "aspect-[9/16] max-h-[min(80vh,720px)]" : "aspect-video max-h-[min(80vh,720px)]"
        }`}
      >
        <iframe
          src={embed.embedUrl}
          title={label}
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
    </div>
  );
}
