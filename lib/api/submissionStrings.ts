/** Sanitize string fields from JSON bodies (length-capped). */
export function clampStr(v: unknown, max: number): string {
  if (typeof v !== "string") return "";
  return v.trim().slice(0, max);
}
