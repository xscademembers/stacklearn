/** Extract 11-char YouTube video id from common URL shapes (watch, shorts, embed, youtu.be). */
export function extractYouTubeVideoId(input: string): string | null {
  if (!input?.trim()) return null;
  const u = input.trim();
  const shorts = u.match(/\/shorts\/([a-zA-Z0-9_-]{11})/);
  if (shorts) return shorts[1];
  const watch = u.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
  if (watch) return watch[1];
  const youtu = u.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
  if (youtu) return youtu[1];
  const embed = u.match(/\/embed\/([a-zA-Z0-9_-]{11})/);
  if (embed) return embed[1];
  return null;
}

export function youtubeEmbedUrl(videoId: string): string {
  return `https://www.youtube.com/embed/${encodeURIComponent(videoId)}`;
}
