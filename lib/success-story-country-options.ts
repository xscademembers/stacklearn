import {
  type DestinationSuccessStorySlug,
  countryMatchesDestinationSlug,
} from "@/lib/destination-country-match";

const ORDER: { slug: DestinationSuccessStorySlug; value: string; label: string }[] = [
  { slug: "uk", value: "United Kingdom", label: "United Kingdom (UK)" },
  { slug: "usa", value: "United States", label: "United States (USA)" },
  { slug: "canada", value: "Canada", label: "Canada" },
  { slug: "australia", value: "Australia", label: "Australia" },
  { slug: "ireland", value: "Ireland", label: "Ireland" },
  { slug: "germany", value: "Germany", label: "Germany" },
];

/** Stored in Mongo `country` when using the dropdown. */
export const SUCCESS_STORY_COUNTRY_OPTIONS = ORDER.map(({ value, label }) => ({ value, label }));

export const SUCCESS_STORY_COUNTRY_OTHER = "__other__";

const CANONICAL_SET = new Set(ORDER.map((o) => o.value));

/** Map free-text / legacy values to a canonical dropdown value, or null if not a known destination. */
export function resolveToCanonicalCountry(stored: string): string | null {
  const s = stored.trim();
  if (!s) return null;
  if (CANONICAL_SET.has(s)) return s;
  for (const row of ORDER) {
    if (countryMatchesDestinationSlug(s, row.slug)) return row.value;
  }
  return null;
}

/** Value for `<select>`: canonical label, empty, or `SUCCESS_STORY_COUNTRY_OTHER`. */
export function countryFieldToSelectValue(country: string | undefined): string {
  const s = (country ?? "").trim();
  if (!s) return "";
  const canon = resolveToCanonicalCountry(s);
  if (canon) return canon;
  return SUCCESS_STORY_COUNTRY_OTHER;
}
