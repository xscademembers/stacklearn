import { NextRequest, NextResponse } from "next/server";
import { timingSafeEqual } from "crypto";
import {
  ADMIN_SESSION_COOKIE,
  computeAdminSessionCookieValue,
} from "@/lib/admin-session";

function passwordsMatch(input: string, expected: string): boolean {
  const a = Buffer.from(input, "utf8");
  const b = Buffer.from(expected, "utf8");
  if (a.length !== b.length) return false;
  return timingSafeEqual(a, b);
}

export async function POST(request: NextRequest) {
  try {
    const envPassword = process.env.ADMIN_PASSWORD;
    if (!envPassword) {
      return NextResponse.json(
        { success: false, message: "Admin login is not configured. Set ADMIN_PASSWORD in .env.local." },
        { status: 503 }
      );
    }

    const { password } = await request.json();
    if (typeof password !== "string" || !password) {
      return NextResponse.json(
        { success: false, message: "Password is required" },
        { status: 400 }
      );
    }

    if (!passwordsMatch(password, envPassword)) {
      return NextResponse.json(
        { success: false, message: "Invalid password" },
        { status: 401 }
      );
    }

    const sessionValue = await computeAdminSessionCookieValue();

    const response = NextResponse.json({
      success: true,
      name: process.env.ADMIN_NAME || "Admin",
    });
    response.cookies.set(ADMIN_SESSION_COOKIE, sessionValue, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      maxAge: 60 * 60 * 24 * 7,
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json({ success: false, message: "Server error" }, { status: 500 });
  }
}
