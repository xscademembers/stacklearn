import { NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";

export const dynamic = "force-dynamic";

export async function GET() {
  try {
    const db = await getDatabase();
    const testimonials = await db
      .collection(COLLECTIONS.TESTIMONIALS)
      .find({ visible: true })
      .sort({ createdAt: -1 })
      .toArray();
    return NextResponse.json({ testimonials });
  } catch {
    return NextResponse.json({ testimonials: [] });
  }
}
