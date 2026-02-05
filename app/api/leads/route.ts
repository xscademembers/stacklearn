import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, destination, email, message } = body;

    // Validate required fields
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name, email, and mobile are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection(COLLECTIONS.LEADS);

    // Check for duplicate (same email or mobile within last 24 hours)
    const existingLead = await collection.findOne({
      $or: [{ email }, { mobile }],
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) }
    });

    if (existingLead) {
      return NextResponse.json(
        { success: false, message: "You have already submitted an enquiry. Our team will contact you soon." },
        { status: 409 }
      );
    }

    // Save to database
    const result = await collection.insertOne({
      name,
      email: email.toLowerCase(),
      mobile,
      destination: destination || null,
      message: message || null,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Lead captured:", { name, mobile, destination, email, id: result.insertedId });

    return NextResponse.json(
      { success: true, message: "Lead captured successfully", id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture lead. Please try again." },
      { status: 500 }
    );
  }
}
