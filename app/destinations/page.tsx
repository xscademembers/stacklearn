import DestinationsPageClient from "./DestinationsPageClient";
import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { getCmsField } from "@/lib/cms-merge-sections";

/** CDN ISR — destinations CMS. */
export const revalidate = 60;

const DEFAULT_HERO_IMAGE =
  "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default async function DestinationsPage() {
  const sections = await getMergedPageContent("destinations");
  const hero = {
    kicker: getCmsField(sections, "hero", "kicker") || "Study Destinations",
    heading: getCmsField(sections, "hero", "heading"),
    quote: getCmsField(sections, "hero", "quote"),
    heroImage: getCmsField(sections, "hero", "heroImage") || DEFAULT_HERO_IMAGE,
  };

  return <DestinationsPageClient hero={hero} />;
}
