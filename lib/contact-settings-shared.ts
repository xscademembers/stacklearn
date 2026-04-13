/** Safe for client components — no MongoDB imports. */

export type ContactSiteSettings = {
  phone: string;
  phone2: string;
  email: string;
  whatsapp: string;
  address: string;
  officeHours: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  mapUrl: string;
};

export const CONTACT_SETTINGS_DEFAULTS: ContactSiteSettings = {
  phone: "+91-9606031842",
  phone2: "",
  email: "info@stacklearn.com",
  whatsapp: "919606031840",
  address:
    "Stack Learn Overseas Consultancy No-374, 2nd floor 4th cross, 60 Feet Rd, above amogha child health care, Amruthahalli, Bengaluru, Karnataka-560092",
  officeHours: "Mon–Sat | 10:00 AM – 5:00 PM",
  instagram: "https://instagram.com/stacklearn",
  facebook: "https://facebook.com/stacklearn",
  linkedin: "https://linkedin.com/company/stacklearn",
  youtube: "https://youtube.com/@stacklearn",
  mapUrl: "https://maps.google.com",
};

export function phoneDigitsForUrl(phone: string): string {
  return phone.replace(/\D/g, "");
}
