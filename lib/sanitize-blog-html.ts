import sanitizeHtml from "sanitize-html";

type SanitizeOptions = NonNullable<Parameters<typeof sanitizeHtml>[1]>;

/** Reject dangerous CSS / schemes inside a `color:` value (font tag + inline styles). */
function isSafeCssColorValue(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (/url\s*\(|expression\s*\(|@import|javascript\s*:/i.test(v)) return false;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return true;
  if (/^rgba?\([^)]*\)$/i.test(v)) return true;
  if (/^hsla?\([^)]*\)$/i.test(v)) return true;
  if (/^currentcolor$/i.test(v)) return true;
  if (/^[a-z]+$/i.test(v) && v.length <= 40) return true;
  return false;
}

/** Last-resort if sanitization throws (should be rare with sanitize-html). */
function stripHtmlFallback(input: string): string {
  return String(input || "")
    .replace(/\0/g, "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
}

/**
 * Style allowlist for `<span style="...">`. Keys match the fake selector sanitize-html uses per tag (see postcssParse in sanitize-html).
 */
const SPAN_STYLE_RULES: Record<string, RegExp[]> = {
  color: [
    /^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i,
    /^rgba?\([^)]*\)$/i,
    /^hsla?\([^)]*\)$/i,
    /^currentcolor$/i,
    /^var\(--[a-z0-9-_]+\)$/i,
    /^[a-z]{1,40}$/i,
  ],
  "font-weight": [/^[1-9]00$/, /^(bold|bolder|normal)$/i],
  "font-style": [/^(italic|normal|oblique)$/i],
  "text-decoration": [/underline/i, /^none$/i],
  "text-decoration-line": [/underline/i, /^none$/i],
};

const BLOG_SANITIZE_OPTIONS: SanitizeOptions = {
  allowedTags: ["b", "strong", "i", "em", "u", "span", "br", "a", "font"],
  allowedAttributes: {
    a: ["href", "target", "rel"],
    span: ["style"],
    font: ["color"],
  },
  allowedStyles: {
    span: SPAN_STYLE_RULES,
    "*": SPAN_STYLE_RULES,
  },
  allowedSchemes: ["http", "https"],
  allowedSchemesAppliedToAttributes: ["href"],
  transformTags: {
    a: (tagName, attribs) => {
      const href = String(attribs.href || "").trim();
      if (!/^https?:\/\//i.test(href)) {
        return { tagName: "span", attribs: {} as Record<string, string> };
      }
      return {
        tagName: "a",
        attribs: {
          href,
          target: "_blank",
          rel: "noopener noreferrer",
        },
      };
    },
    font: (_tagName, attribs) => {
      const next = { ...attribs };
      const raw = String(next.color || "").trim();
      if (raw && !isSafeCssColorValue(raw)) {
        delete next.color;
      }
      return { tagName: "font", attribs: next };
    },
  },
};

/**
 * Sanitize inline HTML used inside blog heading/paragraph blocks.
 * Uses `sanitize-html` (htmlparser2) — no JSDOM — so it is safe on Vercel serverless.
 * Allowed: basic inline formatting + links (http/https only).
 */
export function sanitizeBlogHtml(dirty: string): string {
  const input = typeof dirty === "string" ? dirty.replace(/\0/g, "") : "";
  try {
    return sanitizeHtml(input, BLOG_SANITIZE_OPTIONS);
  } catch {
    return stripHtmlFallback(input);
  }
}

export function looksLikeHtml(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(String(value || "").trim());
}
