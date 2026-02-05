import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, preferredCountry, course, level, qualification, institution } = body;

    // Validate required fields
    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name, email, and mobile are required" },
        { status: 400 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection(COLLECTIONS.APPLICATIONS);

    // Check for duplicate application (same email and course)
    const existingApplication = await collection.findOne({
      email: email.toLowerCase(),
      preferredCountry,
      course,
      level,
    });

    if (existingApplication) {
      return NextResponse.json(
        { success: false, message: "You have already submitted an application for this course. Our team will review it and contact you soon." },
        { status: 409 }
      );
    }

    // Generate application ID
    const applicationId = "APP" + Date.now();

    // Save to database
    const result = await collection.insertOne({
      applicationId,
      ...body,
      email: email.toLowerCase(),
      status: "pending",
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Application submitted:", { name, email, applicationId, id: result.insertedId });

    return NextResponse.json(
      { success: true, message: "Application submitted successfully", applicationId, id: result.insertedId },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting application:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit application. Please try again." },
      { status: 500 }
    );
  }
}
