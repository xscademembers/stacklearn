/** Parsed embed for a testimonial video URL (YouTube, Vimeo, or direct file). */
export type ParsedVideoEmbed =
  | { type: "youtube"; embedUrl: string; aspectHint: "vertical" | "horizontal" }
  | { type: "vimeo"; embedUrl: string }
  | { type: "direct"; src: string }
  | { type: "iframe"; embedUrl: string };

export function sanitizeVideoUrl(v: unknown): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s || !/^https?:\/\//i.test(s)) return "";
  return s.length > 2048 ? s.slice(0, 2048) : s;
}

function youtubeId(url: URL): { id: string; vertical: boolean } | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host === "youtu.be") {
    const id = url.pathname.slice(1).split("/")[0];
    return id ? { id, vertical: false } : null;
  }
  if (host === "youtube.com" || host === "m.youtube.com") {
    if (url.pathname.startsWith("/shorts/")) {
      const id = url.pathname.split("/")[2];
      return id ? { id, vertical: true } : null;
    }
    const v = url.searchParams.get("v");
    if (v) return { id: v, vertical: false };
    const embed = url.pathname.match(/^\/embed\/([^/?]+)/);
    if (embed?.[1]) return { id: embed[1], vertical: false };
  }
  return null;
}

function vimeoId(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "vimeo.com" && host !== "player.vimeo.com") return null;
  const parts = url.pathname.split("/").filter(Boolean);
  const id = parts.find((p) => /^\d+$/.test(p));
  return id ?? null;
}

function googleDriveFileId(url: URL): string | null {
  if (!url.hostname.includes("drive.google.com")) return null;
  const m = url.pathname.match(/\/file\/d\/([a-zA-Z0-9_-]+)/);
  return m?.[1] ?? null;
}

function dropboxDirectUrl(url: URL): string | null {
  const host = url.hostname.replace(/^www\./, "");
  if (host !== "dropbox.com" && host !== "dl.dropboxusercontent.com") return null;
  if (host === "dl.dropboxusercontent.com") return url.toString();
  const path = url.pathname;
  if (!path.includes("/s/") && !path.includes("/scl/")) return null;
  const direct = new URL(url.toString());
  direct.hostname = "dl.dropboxusercontent.com";
  direct.searchParams.set("raw", "1");
  return direct.toString();
}

const DIRECT_VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v|m3u8)(\?|#|$)/i;

function isLikelyDirectVideoFile(url: URL): boolean {
  if (DIRECT_VIDEO_EXT.test(url.pathname)) return true;
  if (url.hostname.includes("blob:")) return false;
  if (
    url.hostname.includes("cloudinary.com") &&
    (url.pathname.includes("/video/") || DIRECT_VIDEO_EXT.test(url.pathname))
  ) {
    return true;
  }
  if (url.hostname.includes("amazonaws.com") && DIRECT_VIDEO_EXT.test(url.pathname)) {
    return true;
  }
  return false;
}

export function parseVideoEmbedUrl(raw: string): ParsedVideoEmbed | null {
  const url = sanitizeVideoUrl(raw);
  if (!url) return null;

  try {
    const parsed = new URL(url);

    const yt = youtubeId(parsed);
    if (yt) {
      return {
        type: "youtube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${yt.id}?rel=0&modestbranding=1&autoplay=0`,
        aspectHint: yt.vertical ? "vertical" : "horizontal",
      };
    }

    const vimeo = vimeoId(parsed);
    if (vimeo) {
      return {
        type: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${vimeo}?title=0&byline=0&autoplay=0`,
      };
    }

    if (parsed.hostname.includes("loom.com")) {
      const share = parsed.pathname.match(/\/share\/([a-zA-Z0-9]+)/);
      const embed = parsed.pathname.match(/\/embed\/([a-zA-Z0-9]+)/);
      const id = share?.[1] || embed?.[1];
      if (id) {
        return {
          type: "iframe",
          embedUrl: `https://www.loom.com/embed/${id}`,
        };
      }
    }

    const driveId = googleDriveFileId(parsed);
    if (driveId) {
      return {
        type: "iframe",
        embedUrl: `https://drive.google.com/file/d/${driveId}/preview`,
      };
    }

    const dropbox = dropboxDirectUrl(parsed);
    if (dropbox && DIRECT_VIDEO_EXT.test(new URL(dropbox).pathname)) {
      return { type: "direct", src: dropbox };
    }

    if (isLikelyDirectVideoFile(parsed)) {
      return { type: "direct", src: url };
    }

    return null;
  } catch {
    return null;
  }
}

export function isValidVideoTestimonialUrl(v: unknown): boolean {
  const url = sanitizeVideoUrl(v);
  if (!url) return false;
  return parseVideoEmbedUrl(url) !== null;
}
