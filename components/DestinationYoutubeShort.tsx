"use client";

import { useEffect, useState } from "react";
import { extractYouTubeVideoId, youtubeEmbedUrl } from "@/lib/youtube";
import type { DestinationShortKey } from "@/lib/destination-shorts-defaults";

type Props = {
  destinationKey: DestinationShortKey;
  /** Accessible title context, e.g. "United Kingdom" */
  countryLabel: string;
};

export function useDestinationShortVideoId(destinationKey: DestinationShortKey): string | null {
  const [videoId, setVideoId] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    (async () => {
      try {
        const res = await fetch("/api/public/destination-shorts", { cache: "no-store" });
        const data = await res.json();
        const url = data.urls?.[destinationKey] as string | undefined;
        if (cancelled || !url) return;
        const id = extractYouTubeVideoId(url);
        if (!cancelled && id) setVideoId(id);
      } catch {
        /* silent */
      }
    })();
    return () => {
      cancelled = true;
    };
  }, [destinationKey]);

  return videoId;
}

/** Video only — for hero right column (no headings or extra copy). */
export function DestinationYoutubeEmbed({ destinationKey, countryLabel }: Props) {
  const videoId = useDestinationShortVideoId(destinationKey);
  if (!videoId) return null;

  const embedSrc = youtubeEmbedUrl(videoId);

  return (
    <div className="relative w-full aspect-[9/16] max-h-[min(72vh,560px)] max-w-[min(100%,380px)] mx-auto lg:mx-0 lg:ml-auto rounded-2xl overflow-hidden border border-white/25 bg-black shadow-2xl ring-1 ring-white/10 motion-reduce:transition-none">
      <iframe
        src={embedSrc}
        title={`YouTube Short: Study in ${countryLabel}`}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
        className="absolute inset-0 h-full w-full"
      />
    </div>
  );
}

/** Full-width section with title + embed (kept for any page that still wants a standalone block). */
export default function DestinationYoutubeShort({ destinationKey, countryLabel }: Props) {
  const videoId = useDestinationShortVideoId(destinationKey);

  if (!videoId) return null;

  const embedSrc = youtubeEmbedUrl(videoId);
  const watchHref = `https://www.youtube.com/shorts/${videoId}`;

  return (
    <section
      className="py-12 md:py-16 bg-page-soft border-y border-border"
      aria-labelledby={`destination-short-heading-${destinationKey}`}
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto">
          <h2
            id={`destination-short-heading-${destinationKey}`}
            className="text-2xl md:text-3xl font-extrabold text-foreground text-center mb-2"
          >
            Watch: Study in {countryLabel}
          </h2>
          <p className="text-center text-sm text-foreground-muted mb-8 max-w-xl mx-auto">
            Short overview from our team. Open on YouTube for the full experience.
          </p>
          <div className="relative w-full aspect-[9/16] max-h-[min(70vh,640px)] mx-auto max-w-[360px] rounded-2xl overflow-hidden border border-border shadow-lg bg-black">
            <iframe
              src={embedSrc}
              title={`YouTube Short: Study in ${countryLabel}`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
              className="absolute inset-0 w-full h-full"
            />
          </div>
          <p className="text-center mt-6">
            <a
              href={watchHref}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm font-semibold text-brand hover:text-brand-strong underline-offset-2 hover:underline motion-reduce:transition-none"
            >
              Open in YouTube
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
