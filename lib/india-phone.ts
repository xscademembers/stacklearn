export const INDIA_COUNTRY_CODE = "+91";

function digitsOnly(input: string) {
  return input.replace(/\D/g, "");
}

/**
 * Normalizes common user input to a 10-digit Indian mobile number (national part).
 * - Keeps only digits
 * - If input includes country code (91) and extra digits, keeps the last 10 digits
 */
export function normalizeIndianMobile10(raw: string) {
  const d = digitsOnly(raw || "");
  if (d.length <= 10) return d;
  return d.slice(-10);
}

export function isValidIndianMobile10(raw: string) {
  const d = normalizeIndianMobile10(raw);
  return /^\d{10}$/.test(d);
}

export function formatIndianMobileE164(raw: string) {
  const d = normalizeIndianMobile10(raw);
  if (d.length !== 10) return null;
  return `${INDIA_COUNTRY_CODE}${d}`;
}

