import { cookies } from "next/headers";
import { ADMIN_SESSION_COOKIE, isValidAdminSessionCookie } from "@/lib/admin-session";

export async function getAdminSession(): Promise<{ email: string; name: string } | null> {
  const cookieStore = await cookies();
  const value = cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
  if (!(await isValidAdminSessionCookie(value))) return null;
  return {
    email: process.env.ADMIN_EMAIL || "admin",
    name: process.env.ADMIN_NAME || "Admin",
  };
}
