import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, email, mobile, service, message } = body;

    // TODO: Save to database
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to user

    console.log("Contact form submitted:", { name, email, mobile, service, message });

    return NextResponse.json(
      { success: true, message: "Thank you for contacting Stack Learn! Our counsellors will get in touch shortly." },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    return NextResponse.json(
      { success: false, message: "Failed to submit contact form" },
      { status: 500 }
    );
  }
}
