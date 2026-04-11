import { NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

const DEFAULTS = {
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

export async function GET() {
  try {
    const db = await getDatabase();
    const doc = await db.collection(COLLECTIONS.SITE_SETTINGS).findOne({ _key: "contact" });
    return NextResponse.json({ settings: doc ? { ...DEFAULTS, ...doc } : DEFAULTS });
  } catch {
    return NextResponse.json({ settings: DEFAULTS });
  }
}
