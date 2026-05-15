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

const DIRECT_VIDEO_EXT = /\.(mp4|webm|ogg|mov|m4v)(\?|$)/i;

export function parseVideoEmbedUrl(raw: string): ParsedVideoEmbed | null {
  const url = sanitizeVideoUrl(raw);
  if (!url) return null;

  try {
    const parsed = new URL(url);

    const yt = youtubeId(parsed);
    if (yt) {
      return {
        type: "youtube",
        embedUrl: `https://www.youtube-nocookie.com/embed/${yt.id}?rel=0&modestbranding=1`,
        aspectHint: yt.vertical ? "vertical" : "horizontal",
      };
    }

    const vimeo = vimeoId(parsed);
    if (vimeo) {
      return {
        type: "vimeo",
        embedUrl: `https://player.vimeo.com/video/${vimeo}?title=0&byline=0`,
      };
    }

    if (parsed.hostname.includes("loom.com")) {
      const share = parsed.pathname.match(/\/share\/([a-zA-Z0-9]+)/);
      if (share?.[1]) {
        return {
          type: "iframe",
          embedUrl: `https://www.loom.com/embed/${share[1]}`,
        };
      }
    }

    if (DIRECT_VIDEO_EXT.test(parsed.pathname) || parsed.pathname.includes("/video/")) {
      return { type: "direct", src: url };
    }

    if (
      parsed.hostname.includes("drive.google.com") ||
      parsed.hostname.includes("dropbox.com") ||
      parsed.hostname.includes("cloudinary.com") ||
      parsed.hostname.includes("amazonaws.com")
    ) {
      return { type: "direct", src: url };
    }

    return { type: "direct", src: url };
  } catch {
    return null;
  }
}

export function isValidVideoTestimonialUrl(v: unknown): boolean {
  const url = sanitizeVideoUrl(v);
  if (!url) return false;
  return parseVideoEmbedUrl(url) !== null;
}
