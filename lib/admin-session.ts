/**
 * Admin session cookie (no JWT). Value is a stable SHA-256 of env password + salt.
 * Uses Web Crypto so it works in Edge middleware and Node route handlers.
 */
export const ADMIN_SESSION_COOKIE = "admin_session";

export function getAdminPasswordFromEnv(): string {
  return (process.env.ADMIN_PASSWORD ?? "").trim();
}

export async function computeAdminSessionCookieValue(): Promise<string> {
  const pwd = getAdminPasswordFromEnv();
  const salt = (process.env.ADMIN_SESSION_SALT ?? "stacklearn-admin-session").trim();
  const data = new TextEncoder().encode(`${salt}:${pwd}`);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function isValidAdminSessionCookie(
  value: string | undefined
): Promise<boolean> {
  if (!value || !getAdminPasswordFromEnv()) return false;
  const expected = await computeAdminSessionCookieValue();
  return value.length === expected.length && value === expected;
}
