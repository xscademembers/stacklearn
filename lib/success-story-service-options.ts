export const SUCCESS_STORY_SERVICE_SLUGS = [
  "profile-evaluation",
  "admission-assistance",
  "sop-lor",
  "visa-assistance",
  "accommodation",
  "education-loan",
] as const;

export type SuccessStoryServiceSlug = (typeof SUCCESS_STORY_SERVICE_SLUGS)[number];

/** Admin labels and URL segments under `/services/{slug}`. */
export const SUCCESS_STORY_SERVICE_OPTIONS: { slug: SuccessStoryServiceSlug; label: string }[] = [
  { slug: "profile-evaluation", label: "Profile Evaluation" },
  { slug: "admission-assistance", label: "University Admission Assistance" },
  { slug: "sop-lor", label: "SOP & LOR Writing Support" },
  { slug: "visa-assistance", label: "Student Visa Assistance" },
  { slug: "accommodation", label: "Accommodation Assistance" },
  { slug: "education-loan", label: "Education Loan Assistance" },
];

const SLUG_SET = new Set<string>(SUCCESS_STORY_SERVICE_SLUGS);

export function isSuccessStoryServiceSlug(slug: string): slug is SuccessStoryServiceSlug {
  return SLUG_SET.has(slug);
}

export function serviceLabelForSlug(slug: string): string {
  const row = SUCCESS_STORY_SERVICE_OPTIONS.find((o) => o.slug === slug);
  return row?.label ?? slug;
}
