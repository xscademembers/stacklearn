import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import {
  CONTACT_SETTINGS_DEFAULTS,
  type ContactSiteSettings,
} from "@/lib/contact-settings-shared";

export type { ContactSiteSettings } from "@/lib/contact-settings-shared";
export { CONTACT_SETTINGS_DEFAULTS, phoneDigitsForUrl } from "@/lib/contact-settings-shared";

function sanitizeDoc(doc: Record<string, unknown>): Partial<ContactSiteSettings> {
  const keys: (keyof ContactSiteSettings)[] = [
    "phone",
    "phone2",
    "email",
    "whatsapp",
    "address",
    "officeHours",
    "instagram",
    "facebook",
    "linkedin",
    "youtube",
    "mapUrl",
  ];
  const out: Partial<ContactSiteSettings> = {};
  for (const k of keys) {
    const v = doc[k];
    if (typeof v === "string") out[k] = v;
  }
  return out;
}

export async function getContactSettings(): Promise<ContactSiteSettings> {
  if (!isMongoConfigured()) {
    return { ...CONTACT_SETTINGS_DEFAULTS };
  }
  try {
    const db = await getDatabase();
    const doc = await db.collection(COLLECTIONS.SITE_SETTINGS).findOne({ _key: "contact" });
    if (!doc) return { ...CONTACT_SETTINGS_DEFAULTS };
    const { _id: _omit, _key: _k, updatedAt: _u, ...rest } = doc as Record<string, unknown>;
    return { ...CONTACT_SETTINGS_DEFAULTS, ...sanitizeDoc(rest) };
  } catch {
    return { ...CONTACT_SETTINGS_DEFAULTS };
  }
}
