import DOMPurify from "isomorphic-dompurify";

let hooksInstalled = false;

function installSanitizeHooks() {
  if (hooksInstalled) return;
  hooksInstalled = true;

  DOMPurify.addHook("uponSanitizeAttribute", (node, data) => {
    if (!(node instanceof Element)) return;
    const el = node;
    if (data.attrName === "style" && el.tagName === "SPAN") {
      const m = String(data.attrValue || "").match(/color\s*:\s*([^;]+)/i);
      if (m) {
        const c = m[1].trim();
        if (/^#[0-9a-f]{3,8}$/i.test(c) || /^rgba?\(/i.test(c)) {
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
 */
export function sanitizeBlogHtml(dirty: string): string {
  installSanitizeHooks();
  const input = typeof dirty === "string" ? dirty : "";
  return DOMPurify.sanitize(input, {
    ALLOWED_TAGS: ["b", "strong", "i", "em", "u", "span", "br", "a"],
    ALLOWED_ATTR: ["href", "rel", "target", "style"],
    ALLOW_DATA_ATTR: false,
    ALLOW_ARIA_ATTR: false,
    KEEP_CONTENT: true,
  });
}

export function looksLikeHtml(value: string): boolean {
  return /<[a-z][\s\S]*>/i.test(String(value || "").trim());
}
