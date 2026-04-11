import { NextRequest, NextResponse } from "next/server";
import {
  getDatabase,
  COLLECTIONS,
  isMongoConfigured,
  MONGODB_NOT_CONFIGURED_MESSAGE,
} from "@/lib/mongodb";
import { clampStr } from "@/lib/api/submissionStrings";

export async function POST(request: NextRequest) {
  try {
    const body = (await request.json()) as Record<string, unknown>;

    const submittedFromPath = clampStr(body.submittedFromPath, 512) || null;
    const formSource = clampStr(body.formSource, 128) || "contact_page";

    const name = clampStr(body.name, 200);
    const email = clampStr(body.email, 320).toLowerCase();
    const mobile = clampStr(body.mobile, 40);
    const service = clampStr(body.service, 500) || null;
    const message = clampStr(body.message, 8000) || null;

    const meetingDate = clampStr(body.meetingDate, 64) || null;
    const meetingTime = clampStr(body.meetingTime, 64) || null;
    const meetingPurpose = clampStr(body.meetingPurpose, 200) || null;
    const meetingMode = clampStr(body.meetingMode, 120) || null;

    const paymentPurpose = clampStr(body.paymentPurpose, 200) || null;
    const paymentAmount = clampStr(body.paymentAmount, 32) || null;
    const paymentMethod = clampStr(body.paymentMethod, 64) || null;
    const paymentRemarks = clampStr(body.paymentRemarks, 8000) || null;

    if (!name || !email || !mobile) {
      return NextResponse.json(
        { success: false, message: "Name, email, and mobile are required" },
        { status: 400 }
      );
    }

    if (!isMongoConfigured()) {
      return NextResponse.json(
        { success: false, message: MONGODB_NOT_CONFIGURED_MESSAGE },
        { status: 503 }
      );
    }

    const db = await getDatabase();
    const collection = db.collection(COLLECTIONS.CONTACTS);

    const existingContact = await collection.findOne({
      email: email.toLowerCase(),
      formSource,
      createdAt: { $gte: new Date(Date.now() - 24 * 60 * 60 * 1000) },
    });

    if (existingContact) {
      return NextResponse.json(
        {
          success: false,
          message:
            "You have already sent this type of request recently. Our team will get back to you soon.",
        },
        { status: 409 }
      );
    }

    const doc: Record<string, unknown> = {
      name,
      email: email.toLowerCase(),
      mobile,
      service,
      message,
      formSource,
      submittedFromPath,
      status: "new",
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    if (meetingDate) doc.meetingDate = meetingDate;
    if (meetingTime) doc.meetingTime = meetingTime;
    if (meetingPurpose) doc.meetingPurpose = meetingPurpose;
    if (meetingMode) doc.meetingMode = meetingMode;

    if (paymentPurpose) doc.paymentPurpose = paymentPurpose;
    if (paymentAmount) doc.paymentAmount = paymentAmount;
    if (paymentMethod) doc.paymentMethod = paymentMethod;
    if (paymentRemarks) doc.paymentRemarks = paymentRemarks;

    const result = await collection.insertOne(doc);

    console.log("Contact / inquiry submitted:", {
      name,
      email,
      mobile,
      service,
      formSource,
      submittedFromPath,
      id: result.insertedId,
    });

    return NextResponse.json(
      {
        success: true,
        message:
          "Thank you for contacting Stack Learn! Our counsellors will get in touch shortly.",
        id: result.insertedId,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Error submitting contact form:", error);
    const errMsg = error instanceof Error ? error.message : "";
    const configIssue =
      errMsg.includes("MongoDB") || errMsg.includes("MONGODB_URI");
    return NextResponse.json(
      {
        success: false,
        message: configIssue
          ? MONGODB_NOT_CONFIGURED_MESSAGE
          : "Failed to submit contact form. Check the database connection and try again.",
      },
      { status: configIssue ? 503 : 500 }
    );
  }
}
