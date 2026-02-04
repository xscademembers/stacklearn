import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { name, mobile, destination, email } = body;

    // TODO: Save to database
    // TODO: Send email notification to admin
    // TODO: Send confirmation email to student

    console.log("Lead captured:", { name, mobile, destination, email });

    return NextResponse.json(
      { success: true, message: "Lead captured successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error capturing lead:", error);
    return NextResponse.json(
      { success: false, message: "Failed to capture lead" },
      { status: 500 }
    );
  }
}
