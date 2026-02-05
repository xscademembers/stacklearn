import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, service, message } = body;

    // Validate required fields
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name, email, and mobile are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection(COLLECTIONS.CONTACTS);

    // Check for duplicate (same email within last 24 hours)
    const existingContact = await collection.findOne({
      email: email.toLowerCase(),
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (existingContact) {
      return NextResponse.json(
        { success: false, message: "You have already contacted us recently. Our team will get back to you soon." },
        { status: 409 }
      );
    }

    // Save to database
    const result = await collection.insertOne({
      name,
      email: email.toLowerCase(),
      mobile,
      service: service || null,
      message: message || null,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Contact form submitted:", { name, email, mobile, service, id: result.insertedId });

    return NextResponse.json(
      { success: true, message: "Thank you for contacting Stack Learn! Our counsellors will get in touch shortly.", id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit contact form. Please try again." },
      { status: 500 }
    );
  }
}
