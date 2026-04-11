import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { clampStr } from "@/lib/api/submissionStrings";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const submittedFromPath = clampStr(body.submittedFromPath, 512) || null;
    const formSource = clampStr(body.formSource, 128) || "unknown";

    const name = clampStr(
      body.name ?? body.fullName ?? body.contactPersonName,
      200
    );
    const email = clampStr(body.email, 320).toLowerCase();
    const mobile = clampStr(body.mobile ?? body.phoneNumber, 40);
    const destination = clampStr(body.destination, 200) || null;
    const message = clampStr(body.message, 8000) || null;

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name, email, and mobile are required" },
        { status: 400 }
      );
    }

    const details: Record<string, string> = {};
    const copyIfPresent = (key: string, maxLen: number) => {
      const v = body[key];
      if (v === undefined || v === null) return;
      const s = clampStr(v, maxLen);
      if (s) details[key] = s;
    };

    for (const k of [
      "courseType",
      "courseName",
      "mode",
      "preferredBatch",
    ] as const) {
      copyIfPresent(k, 500);
    }
    for (const k of [
      "companyName",
      "trainingType",
      "numberOfEmployees",
      "preferredTimeline",
    ] as const) {
      copyIfPresent(k, 500);
    }
    copyIfPresent("trainingRequirement", 8000);
    const legacySource = clampStr(body.source, 120);
    if (legacySource) details.legacySource = legacySource;

    const db = await getDatabase();
    const collection = db.collection(COLLECTIONS.LEADS);

    const existingLead = await collection.findOne({
      $or: [{ email }, { mobile }],
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (existingLead) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have already submitted an enquiry. Our team will contact you soon.",
        },
        { status: 409 }
      );
    }

    const result = await collection.insertOne({
      name,
      email,
      mobile,
      destination,
      message,
      status: "new",
      submittedFromPath,
      formSource,
      ...(Object.keys(details).length > 0 ? { details } : {}),
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    console.log("Lead captured:", {
      name,
      mobile,
      destination,
      email,
      formSource,
      submittedFromPath,
      id: result.insertedId,
    });

    return NextResponse.json(
      {
        success: true,
        message: "Lead captured successfully",
        id: result.insertedId,
      },
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
