"use client";

import { useMemo, useState } from "react";
import { parseVideoEmbedUrl, sanitizeVideoUrl } from "@/lib/success-story-video";

type Props = {
  videoUrl: string;
  studentName: string;
};

/**
 * Responsive player — no autoplay; user must press play.
 * Supports YouTube, Vimeo, Loom, Google Drive preview, and direct mp4/webm files.
 */
export default function SuccessStoryVideoPlayer({ videoUrl, studentName }: Props) {
  const [loadError, setLoadError] = useState(false);
  const cleanUrl = sanitizeVideoUrl(videoUrl);
  const embed = useMemo(() => parseVideoEmbedUrl(cleanUrl), [cleanUrl]);
  const label = `Video testimonial from ${studentName}`;

  if (!embed) {
    return (
      <div className="rounded-xl border border-border bg-page-soft px-4 py-6 text-center text-sm text-foreground-muted">
        <p className="m-0 mb-3">This video link could not be embedded.</p>
        <p className="m-0 text-xs">
          Use a YouTube, Vimeo, Loom, or Google Drive link, or a direct .mp4 / .webm URL.
        </p>
        {cleanUrl ? (
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="mt-4 inline-block text-brand font-semibold hover:underline"
          >
            Open video link in new tab
          </a>
        ) : null}
      </div>
    );
  }

  if (embed.type === "direct") {
    if (loadError) {
      return (
        <div className="rounded-xl border border-border bg-page-soft px-4 py-6 text-center text-sm text-foreground-muted">
          <p className="m-0 mb-3">This video file could not be played in the browser.</p>
          <a
            href={embed.src}
            target="_blank"
            rel="noopener noreferrer"
            className="text-brand font-semibold hover:underline"
          >
            Open video in new tab
          </a>
        </div>
      );
    }

    return (
      <div className="mx-auto w-full max-w-3xl">
        <video
          key={embed.src}
          src={embed.src}
          controls
          playsInline
          preload="none"
          className="mx-auto block max-h-[min(80vh,720px)] w-full max-w-full rounded-xl border border-border bg-black object-contain motion-reduce:transition-none"
          aria-label={label}
          onError={() => setLoadError(true)}
        >
          <track kind="captions" />
        </video>
        <p className="mt-2 text-center text-xs text-foreground-muted">
          Press play to start the video (playback does not start automatically).
        </p>
      </div>
    );
  }

  const isVertical = embed.type === "youtube" && embed.aspectHint === "vertical";
  const frameClass = isVertical
    ? "mx-auto w-full max-w-[min(100%,360px)]"
    : "mx-auto w-full max-w-3xl";
  const iframeSrc = embed.type === "youtube" || embed.type === "vimeo" || embed.type === "iframe" ? embed.embedUrl : "";

  return (
    <div className={frameClass}>
      <div
        className={`relative w-full overflow-hidden rounded-xl border border-border bg-black ${
          isVertical ? "aspect-[9/16] max-h-[min(80vh,720px)]" : "aspect-video max-h-[min(80vh,720px)]"
        }`}
      >
        <iframe
          src={iframeSrc}
          title={label}
          loading="lazy"
          allow="fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          className="absolute inset-0 h-full w-full border-0"
        />
      </div>
      <p className="mt-2 text-center text-xs text-foreground-muted">
        Press play in the player to watch (no autoplay).
      </p>
    </div>
  );
}

