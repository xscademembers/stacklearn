import { NextRequest, NextResponse } from "next/server";
import { isValidAdminSessionCookie, ADMIN_SESSION_COOKIE } from "@/lib/admin-session";

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (pathname.startsWith("/admin") && pathname !== "/admin/login") {
    const cookie = request.cookies.get(ADMIN_SESSION_COOKIE)?.value;
    if (!(await isValidAdminSessionCookie(cookie))) {
      const loginUrl = new URL("/admin/login", request.url);
      loginUrl.searchParams.set("redirect", pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
