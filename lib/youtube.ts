const YT_ID = "[a-zA-Z0-9_-]{11}";

/** Add https:// when users paste youtube.com/shorts/… without a scheme. */
export function normalizeYouTubeUrlInput(input: string): string {
  const s = input.trim();
  if (!s) return "";
  if (/^https?:\/\//i.test(s)) return s;
  if (/^(www\.|m\.)?(youtube\.com|youtu\.be)\//i.test(s) || /^youtu\.be\//i.test(s)) {
    return `https://${s}`;
  }
  return s;
}

/** True when the link is a YouTube Shorts page (used for hints only; embed is same as watch). */
export function isYouTubeShortsUrl(input: string): boolean {
  return /\/shorts\//i.test(input.trim());
}

/** Extract 11-char YouTube video id from watch, Shorts, embed, and youtu.be links. */
export function extractYouTubeVideoId(input: string): string | null {
  const u = normalizeYouTubeUrlInput(input);
  if (!u) return null;

  const patterns = [
    new RegExp(`/shorts/(${YT_ID})`, "i"),
    new RegExp(`[?&]v=(${YT_ID})`, "i"),
    new RegExp(`youtu\\.be/(${YT_ID})`, "i"),
    new RegExp(`/embed/(${YT_ID})`, "i"),
    new RegExp(`/v/(${YT_ID})`, "i"),
    new RegExp(`/live/(${YT_ID})`, "i"),
  ];

  for (const re of patterns) {
    const m = u.match(re);
    if (m?.[1]) return m[1];
  }

  try {
    const parsed = new URL(u);
    const host = parsed.hostname.replace(/^www\./, "").toLowerCase();
    if (host === "youtube.com" || host === "m.youtube.com" || host === "youtube-nocookie.com") {
      if (parsed.pathname.startsWith("/shorts/")) {
        const id = parsed.pathname.split("/").filter(Boolean)[1];
        if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
      }
      const v = parsed.searchParams.get("v");
      if (v && /^[a-zA-Z0-9_-]{11}$/.test(v)) return v;
      const embed = parsed.pathname.match(/^\/embed\/([a-zA-Z0-9_-]{11})/);
      if (embed?.[1]) return embed[1];
    }
    if (host === "youtu.be") {
      const id = parsed.pathname.split("/").filter(Boolean)[0];
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id)) return id;
    }
  } catch {
    /* ignore */
  }

  return null;
}

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
}

export function youtubeNocookieEmbedUrl(videoId: string, autoplay = false): string {
  const params = new URLSearchParams({
    rel: "0",
    modestbranding: "1",
    ...(autoplay ? { autoplay: "1" } : {}),
  });
  return `https://www.youtube-nocookie.com/embed/${encodeURIComponent(videoId)}?${params}`;
}
