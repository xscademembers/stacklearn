export const SUCCESS_STORY_TEST_PREP_SLUGS = ["ielts", "gre", "toefl", "gmat"] as const;

export type SuccessStoryTestPrepSlug = (typeof SUCCESS_STORY_TEST_PREP_SLUGS)[number];

export const SUCCESS_STORY_TEST_PREP_OPTIONS: { slug: SuccessStoryTestPrepSlug; label: string }[] = [
  { slug: "ielts", label: "IELTS" },
  { slug: "gre", label: "GRE" },
  { slug: "toefl", label: "TOEFL" },
  { slug: "gmat", label: "GMAT" },
];

const SLUG_SET = new Set<string>(SUCCESS_STORY_TEST_PREP_SLUGS);

export function isSuccessStoryTestPrepSlug(slug: string): slug is SuccessStoryTestPrepSlug {
  return SLUG_SET.has(slug);
}

export function testPrepLabelForSlug(slug: string): string {
  const row = SUCCESS_STORY_TEST_PREP_OPTIONS.find((o) => o.slug === slug);
  return row?.label ?? slug;
}
