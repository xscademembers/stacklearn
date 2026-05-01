import ScholarshipsPageClient from "./ScholarshipsPageClient";
import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { getCmsField } from "@/lib/cms-merge-sections";

/** CDN ISR — scholarships CMS. */
export const revalidate = 60;

const DEFAULT_HERO_IMAGE =
  "https://images.pexels.com/photos/7092614/pexels-photo-7092614.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default async function ScholarshipsPage() {
  const sections = await getMergedPageContent("scholarships");
  const hero = {
    heading: getCmsField(sections, "hero", "heading"),
    description: getCmsField(sections, "hero", "description"),
    ctaText: getCmsField(sections, "hero", "ctaText") || "Check Eligibility",
    heroImage: getCmsField(sections, "hero", "heroImage") || DEFAULT_HERO_IMAGE,
  };

  return <ScholarshipsPageClient hero={hero} />;
}
