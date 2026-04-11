import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const db = await getDatabase();
  const settings = await db.collection(COLLECTIONS.SITE_SETTINGS).findOne({ _key: "contact" });
  const defaults = {
    phone: "+91-9606031842",
    phone2: "",
    email: "info@stacklearn.com",
    whatsapp: "919606031840",
    address: "Stack Learn Overseas Consultancy No-374, 2nd floor 4th cross, 60 Feet Rd, above amogha child health care, Amruthahalli, Bengaluru, Karnataka-560092",
    officeHours: "Mon–Sat | 10:00 AM – 5:00 PM",
    instagram: "https://instagram.com/stacklearn",
    facebook: "https://facebook.com/stacklearn",
    linkedin: "https://linkedin.com/company/stacklearn",
    youtube: "https://youtube.com/@stacklearn",
    mapUrl: "https://maps.google.com",
  };
  return NextResponse.json({ settings: settings ? { ...defaults, ...settings } : defaults });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  const body = await request.json();
  const db = await getDatabase();
  await db.collection(COLLECTIONS.SITE_SETTINGS).updateOne(
    { _key: "contact" },
    { $set: { ...body, _key: "contact", updatedAt: new Date() } },
    { upsert: true }
  );
  return NextResponse.json({ success: true });
}
