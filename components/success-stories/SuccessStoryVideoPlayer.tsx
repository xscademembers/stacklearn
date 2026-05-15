"use client";

import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { FiPlay } from "react-icons/fi";
import {
  embedAspectPadding,
  embedShellClass,
  getEmbedPlayUrl,
  getVideoPosterUrl,
  parseVideoEmbedUrl,
  sanitizeVideoUrl,
  type ParsedVideoEmbed,
} from "@/lib/success-story-video";

type Props = {
  videoUrl: string;
  studentName: string;
  /** Optional poster (e.g. student photo) shown before play */
  posterUrl?: string;
};

/** Fixed-height frame so overlays/iframes never collapse to 0px. */
function VideoAspectFrame({
  embed,
  className = "",
  children,
}: {
  embed: ParsedVideoEmbed;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div
      className={`relative mx-auto overflow-hidden rounded-2xl border border-border bg-black shadow-lg ${embedShellClass(embed)} ${className}`}
    >
      <div className={`relative w-full ${embedAspectPadding(embed)}`} aria-hidden />
      <div className="absolute inset-0">{children}</div>
    </div>
  );
}

function VideoPlayOverlay({
  posterUrl,
  studentName,
  onPlay,
}: {
  posterUrl: string | null;
  studentName: string;
  onPlay: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onPlay}
      className="group absolute inset-0 flex h-full w-full cursor-pointer flex-col items-center justify-center border-0 bg-transparent p-0 motion-reduce:transition-none"
      aria-label={`Play video testimonial from ${studentName}`}
    >
      {posterUrl ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={posterUrl}
          alt=""
          className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 motion-reduce:transition-none group-hover:scale-[1.02]"
        />
      ) : (
        <div
          className="absolute inset-0 bg-gradient-to-br from-brand/40 via-brand/20 to-accent/35"
          aria-hidden
        />
      )}
      <div
        className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20 motion-reduce:transition-none"
        aria-hidden
      />
      <span className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand text-white shadow-[0_8px_32px_rgba(0,0,0,0.35)] ring-4 ring-white/40 transition-transform duration-300 motion-reduce:transition-none group-hover:scale-110 group-focus-visible:scale-110 md:h-20 md:w-20">
        <FiPlay className="ml-1 h-8 w-8 md:h-9 md:w-9" aria-hidden />
      </span>
      <span className="relative z-10 mt-6 px-6 text-center text-sm font-semibold text-white drop-shadow-md md:text-base">
        Watch {studentName}&apos;s testimonial
      </span>
    </button>
  );
}

function DirectFilePlayer({
  src,
  studentName,
  posterUrl,
}: {
  src: string;
  studentName: string;
  posterUrl: string | null;
}) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const probeRef = useRef<HTMLVideoElement>(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [framePoster, setFramePoster] = useState<string | null>(null);
  const [loadError, setLoadError] = useState(false);

  const displayPoster = posterUrl || framePoster;
  const embed: ParsedVideoEmbed = { type: "direct", src };

  useEffect(() => {
    if (posterUrl || isPlaying) return;
    const probe = probeRef.current;
    if (!probe) return;

    const onSeeked = () => {
      try {
        if (probe.videoWidth < 1 || probe.videoHeight < 1) return;
        const canvas = document.createElement("canvas");
        canvas.width = probe.videoWidth;
        canvas.height = probe.videoHeight;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(probe, 0, 0);
        setFramePoster(canvas.toDataURL("image/jpeg", 0.85));
      } catch {
        /* cross-origin poster capture may fail */
      }
    };

    const onLoadedMetadata = () => {
      probe.currentTime = Math.min(0.5, probe.duration > 0 ? probe.duration * 0.05 : 0.1);
    };

    probe.addEventListener("loadedmetadata", onLoadedMetadata);
    probe.addEventListener("seeked", onSeeked);
    probe.preload = "metadata";
    probe.muted = true;
    probe.src = src;

    return () => {
      probe.removeEventListener("loadedmetadata", onLoadedMetadata);
      probe.removeEventListener("seeked", onSeeked);
      probe.removeAttribute("src");
      probe.load();
    };
  }, [src, posterUrl, isPlaying]);

  const handlePlay = useCallback(() => {
    setIsPlaying(true);
    requestAnimationFrame(() => {
      void videoRef.current?.play();
    });
  }, []);

  if (loadError) {
    return (
      <div className="rounded-2xl border border-border bg-page-soft px-4 py-8 text-center text-sm text-foreground-muted">
        <p className="m-0 mb-3">This video could not be played here.</p>
        <a href={src} target="_blank" rel="noopener noreferrer" className="font-semibold text-brand hover:underline">
          Open video in new tab
        </a>
      </div>
    );
  }

  return (
    <VideoAspectFrame embed={embed}>
      {!posterUrl && !isPlaying ? (
        <video ref={probeRef} className="pointer-events-none absolute h-0 w-0 opacity-0" muted playsInline preload="metadata" />
      ) : null}
      {isPlaying ? (
        <video
          ref={videoRef}
          src={src}
          controls
          playsInline
          preload="auto"
          className="h-full w-full object-contain"
          aria-label={`Video testimonial from ${studentName}`}
          onError={() => setLoadError(true)}
        />
      ) : (
        <VideoPlayOverlay posterUrl={displayPoster} studentName={studentName} onPlay={handlePlay} />
      )}
    </VideoAspectFrame>
  );
}

function EmbedPlayer({
  embed,
  studentName,
  posterUrl,
}: {
  embed: ParsedVideoEmbed;
  studentName: string;
  posterUrl: string | null;
}) {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumb = posterUrl ?? getVideoPosterUrl(embed);

  return (
    <VideoAspectFrame embed={embed}>
      {isPlaying ? (
        <iframe
          src={getEmbedPlayUrl(embed)}
          title={`Video testimonial from ${studentName}`}
          allow="accelerometer; autoplay; fullscreen; encrypted-media; picture-in-picture"
          allowFullScreen
          className="h-full w-full border-0"
        />
      ) : (
        <VideoPlayOverlay posterUrl={thumb} studentName={studentName} onPlay={() => setIsPlaying(true)} />
      )}
    </VideoAspectFrame>
  );
}

function UnembeddableFallback({
  cleanUrl,
  studentName,
  posterUrl,
}: {
  cleanUrl: string;
  studentName: string;
  posterUrl: string | null;
}) {
  return (
    <div className="relative mx-auto w-full overflow-hidden rounded-2xl border border-border bg-black shadow-lg">
      <div className="relative w-full pt-[56.25%]" aria-hidden />
      <div className="absolute inset-0">
        {cleanUrl ? (
          <a
            href={cleanUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="group absolute inset-0 flex h-full w-full flex-col items-center justify-center no-underline motion-reduce:transition-none"
          >
            {posterUrl ? (
              // eslint-disable-next-line @next/next/no-img-element
              <img src={posterUrl} alt="" className="absolute inset-0 h-full w-full object-cover" />
            ) : (
              <div className="absolute inset-0 bg-gradient-to-br from-brand/40 via-brand/20 to-accent/35" aria-hidden />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/35 to-black/20" aria-hidden />
            <span className="relative z-10 flex h-[72px] w-[72px] items-center justify-center rounded-full bg-brand text-white shadow-lg ring-4 ring-white/40">
              <FiPlay className="ml-1 h-8 w-8" aria-hidden />
            </span>
            <span className="relative z-10 mt-6 px-6 text-center text-sm font-semibold text-white drop-shadow-md">
              Watch {studentName}&apos;s testimonial
            </span>
          </a>
        ) : (
          <div className="flex h-full flex-col items-center justify-center px-4 text-center text-sm text-white/90">
            <p className="m-0">Video URL is missing. Add a link in admin and save again.</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default function SuccessStoryVideoPlayer({ videoUrl, studentName, posterUrl }: Props) {
  const cleanUrl = sanitizeVideoUrl(videoUrl);
  const embed = useMemo(() => parseVideoEmbedUrl(cleanUrl), [cleanUrl]);
  const optionalPoster = posterUrl?.trim() && /^https?:\/\//i.test(posterUrl.trim()) ? posterUrl.trim() : null;

  if (!embed) {
    return (
      <div className="w-full">
        <UnembeddableFallback cleanUrl={cleanUrl} studentName={studentName} posterUrl={optionalPoster} />
        {cleanUrl ? (
          <p className="mt-3 text-center text-xs text-foreground-muted">
            Opens in a new tab if embedded playback is not supported for this link.
          </p>
        ) : null}
      </div>
    );
  }

  if (embed.type === "direct") {
    return <DirectFilePlayer src={embed.src} studentName={studentName} posterUrl={optionalPoster} />;
  }

  return <EmbedPlayer embed={embed} studentName={studentName} posterUrl={optionalPoster} />;
}
