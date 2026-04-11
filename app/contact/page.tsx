import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { getCmsField } from "@/lib/cms-merge-sections";
import ContactPageClient from "./ContactPageClient";

export const dynamic = "force-dynamic";

const DEFAULT_HERO_IMAGE =
  "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default async function ContactPage() {
  const sections = await getMergedPageContent("contact");
  const heroHeading = getCmsField(sections, "hero", "heading") || "Contact Us";
  const heroSubheading =
    getCmsField(sections, "hero", "subheading") ||
    "We're here to help you plan your study abroad journey.";
  const fromCms = getCmsField(sections, "hero", "heroImage");
  const heroImageUrl = fromCms || DEFAULT_HERO_IMAGE;

  return (
    <ContactPageClient
      heroHeading={heroHeading}
      heroSubheading={heroSubheading}
      heroImageUrl={heroImageUrl}
    />
  );
}
