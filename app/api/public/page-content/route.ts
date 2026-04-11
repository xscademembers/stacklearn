import { NextRequest, NextResponse } from "next/server";
import { getMergedPageContent } from "@/lib/get-merged-page-content";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const key = request.nextUrl.searchParams.get("key");
  if (!key || typeof key !== "string") {
    return NextResponse.json({ message: "Missing key query param" }, { status: 400 });
  }
  const safeKey = key.replace(/[^a-z0-9-]/gi, "").slice(0, 64);
  if (safeKey !== key) {
    return NextResponse.json({ message: "Invalid page key" }, { status: 400 });
  }

  try {
    const sections = await getMergedPageContent(safeKey);
    return NextResponse.json({ pageKey: safeKey, sections });
  } catch (e) {
    console.error("Public page-content:", e);
    return NextResponse.json(
      { pageKey: safeKey, sections: [], error: "unavailable" },
      { status: 200 }
    );
  }
}
