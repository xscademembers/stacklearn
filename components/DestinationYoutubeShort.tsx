"use client";

import { useEffect, useState } from "react";
import { extractYouTubeVideoId, youtubeEmbedUrl } from "@/lib/youtube";
import type { DestinationShortKey } from "@/lib/destination-shorts-defaults";

type Props = {
  destinationKey: DestinationShortKey;
  /** Visible section heading, e.g. "United Kingdom" */
  countryLabel: string;
};

export default function DestinationYoutubeShort({
  destinationKey,
  countryLabel,
}: Props) {
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
              className="text-sm font-semibold text-brand hover:text-brand-strong underline-offset-2 hover:underline"
            >
              Open in YouTube
            </a>
          </p>
        </div>
      </div>
    </section>
  );
}
