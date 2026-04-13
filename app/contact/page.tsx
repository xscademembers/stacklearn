import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { getCmsField } from "@/lib/cms-merge-sections";
import { getContactSettings } from "@/lib/contact-settings";
import ContactPageClient from "./ContactPageClient";

export const dynamic = "force-dynamic";

const DEFAULT_HERO_IMAGE =
  "https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg?auto=compress&cs=tinysrgb&w=1600";

export default async function ContactPage() {
  const [sections, settings] = await Promise.all([
    getMergedPageContent("contact"),
    getContactSettings(),
  ]);

  const heroHeading = getCmsField(sections, "hero", "heading") || "Contact Us";
  const heroSubheading =
    getCmsField(sections, "hero", "subheading") ||
    "We're here to help you plan your study abroad journey.";
  const fromCms = getCmsField(sections, "hero", "heroImage");
  const heroImageUrl = fromCms || DEFAULT_HERO_IMAGE;

  const copy = {
    callTitle: getCmsField(sections, "cards", "callTitle") || "Call Us",
    callButton: getCmsField(sections, "cards", "callButton") || "Call Now",
    emailTitle: getCmsField(sections, "cards", "emailTitle") || "Email",
    emailButton: getCmsField(sections, "cards", "emailButton") || "Send Mail",
    officeTitle: getCmsField(sections, "cards", "officeTitle") || "Our Office",
    mapButton: getCmsField(sections, "cards", "mapButton") || "View on Map",
    formHeading: getCmsField(sections, "form", "formHeading") || "Send Us a Message",
    officeColumnHeading:
      getCmsField(sections, "form", "officeColumnHeading") || "Office Information",
    hoursPrefix: getCmsField(sections, "form", "hoursPrefix") || "Office Hours:",
    addressPrefix: getCmsField(sections, "form", "addressPrefix") || "Address:",
    whatsappLabel: getCmsField(sections, "form", "whatsappLabel") || "WhatsApp",
    mapsCta: getCmsField(sections, "form", "mapsCta") || "View on Google Maps",
    officePhotoUrl:
      getCmsField(sections, "form", "officePhotoUrl") ||
      "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
    submitSuccessMessage:
      getCmsField(sections, "form", "submitSuccessMessage") ||
      "Thank you for contacting Stack Learn! Our counsellors will get in touch shortly.",
    bottomHeading:
      getCmsField(sections, "bottomCta", "heading") ||
      "Need Help Choosing the Right Country or Course?",
    bottomSubheading:
      getCmsField(sections, "bottomCta", "subheading") ||
      "Book a free session with our counsellors today.",
    bottomButtonText:
      getCmsField(sections, "bottomCta", "buttonText") || "Book Free Counselling",
    bottomBackgroundImage:
      getCmsField(sections, "bottomCta", "backgroundImage") ||
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600",
  };

  return (
    <ContactPageClient
      heroHeading={heroHeading}
      heroSubheading={heroSubheading}
      heroImageUrl={heroImageUrl}
      settings={settings}
      copy={copy}
    />
  );
}
