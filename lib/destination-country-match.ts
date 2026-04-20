/**
 * Maps `/destinations/{slug}` pages to country strings admins may enter in success stories.
 * Matching is case-insensitive; short codes (e.g. UK, US) use word-style boundaries to reduce false positives.
 */

const ALIASES: Record<string, string[]> = {
  uk: [
    "united kingdom",
    "great britain",
    "britain",
    "england",
    "scotland",
    "wales",
    "northern ireland",
    "uk",
    "u.k.",
    "gb",
    "british",
  ],
  usa: [
    "united states",
    "united states of america",
    "usa",
    "u.s.a",
    "america",
    "us",
    "u.s",
  ],
  canada: ["canada"],
  australia: ["australia"],
  ireland: ["ireland", "republic of ireland", "eire", "éire"],
  germany: ["germany", "deutschland"],
};

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

export function normalizeCountryInput(s: string): string {
  return s
    .toLowerCase()
    .normalize("NFKD")
    .replace(/\p{M}/gu, "")
    .replace(/[^a-z0-9\s,|/&.-]+/g, " ")
    .trim()
    .replace(/\s+/g, " ");
}

function matchesAlias(countryNorm: string, aliasNorm: string): boolean {
  if (!aliasNorm) return false;
  if (countryNorm === aliasNorm) return true;
  if (aliasNorm.length <= 3) {
    const re = new RegExp(`(?:^|[^a-z0-9])${escapeRe(aliasNorm)}(?:$|[^a-z0-9])`, "i");
    return re.test(countryNorm);
  }
  return countryNorm.includes(aliasNorm);
}

export const DESTINATION_SUCCESS_STORY_SLUGS = ["uk", "usa", "canada", "australia", "ireland", "germany"] as const;
export type DestinationSuccessStorySlug = (typeof DESTINATION_SUCCESS_STORY_SLUGS)[number];

export function isDestinationSuccessStorySlug(slug: string): slug is DestinationSuccessStorySlug {
  return (DESTINATION_SUCCESS_STORY_SLUGS as readonly string[]).includes(slug);
}

/** Returns true when `country` should appear on `/destinations/{slug}`. */
export function countryMatchesDestinationSlug(country: string, slug: string): boolean {
  const key = slug.toLowerCase().trim();
  const aliases = ALIASES[key];
  if (!aliases?.length) return false;
  const c = normalizeCountryInput(country);
  if (!c) return false;
  return aliases.some((alias) => matchesAlias(c, normalizeCountryInput(alias)));
}
