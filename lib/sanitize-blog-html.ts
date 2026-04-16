import DOMPurify from "isomorphic-dompurify";

let hooksInstalled = false;

/** Reject dangerous CSS / schemes inside a `color:` value. */
function isSafeCssColorValue(value: string): boolean {
  const v = value.trim();
  if (!v) return false;
  if (/url\s*\(|expression\s*\(|@import|javascript\s*:/i.test(v)) return false;
  if (/^#([0-9a-f]{3}|[0-9a-f]{6}|[0-9a-f]{8})$/i.test(v)) return true;
  if (/^rgba?\([^)]*\)$/i.test(v)) return true;
  if (/^hsla?\([^)]*\)$/i.test(v)) return true;
  if (/^currentcolor$/i.test(v)) return true;
  // Named colors (e.g. gold, tomato) — conservative: letters only, reasonable length
  if (/^[a-z]+$/i.test(v) && v.length <= 40) return true;
  return false;
}

function installSanitizeHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (!(node instanceof Element)) return;
    const el = node;

    if (data.attrName === "color") {
      if (el.tagName === "FONT") {
        const raw = String(data.attrValue || "").trim();
        if (!isSafeCssColorValue(raw)) {
          data.attrValue = "";
        }
        return;
      }
      data.keepAttr = false;
      return;
    }

    if (data.attrName === "style" && el.tagName === "SPAN") {
      const m = String(data.attrValue || "").match(/color\s*:\s*([^;]+)/i);
      if (m) {
        const c = m[1].trim();
        if (isSafeCssColorValue(c)) {
          data.attrValue = `color: ${c}`;
          return;
        }
      }
      data.attrValue = "";
    }

    if (data.attrName === "href" && el.tagName === "A") {
      const v = String(data.attrValue || "").trim();
      if (!/^https?:\/\//i.test(v)) {
        data.attrValue = "";
      }
    }
  });

  DOMPurify.addHook("afterSanitizeAttributes", (node) => {
    if (!(node instanceof Element)) return;
    if (node.tagName === "A") {
      node.setAttribute("rel", "noopener noreferrer");
      node.setAttribute("target", "_blank");
    }
  });
}

/**
 * Sanitize inline HTML used inside blog heading/paragraph blocks.
 * Allowed: basic inline formatting + links (http/https only).
 * Supports `<font color>` from legacy execCommand output as well as `<span style="color:...">`.
 */
export function sanitizeBlogHtml(dirty: string): string {
  installSanitizeHooks();
  const input = typeof dirty === "string" ? dirty : "";
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "span", "br", "a", "font"],
    ALLOWED_ATTR: ["href", "rel", "target", "style", "color"],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    KEEP_CONTENT: true,
  });
}

export function looksLikeHtml(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(String(value || "").trim());
}
