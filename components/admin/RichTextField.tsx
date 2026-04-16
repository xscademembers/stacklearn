"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { FiBold, FiItalic, FiUnderline, FiLink, FiLink2 } from "react-icons/fi";

/** Body text default — matches app foreground (slate-900). */
const DEFAULT_TEXT_COLOR = "#0f172a";

type RichTextFieldProps = {
  value: string;
  onChange: (html: string) => void;
  multiline?: boolean;
  "aria-label"?: string;
  placeholder?: string;
};

function normalizeEmptyHtml(html: string) {
  const t = html.replace(/\u00a0/g, " ").trim();
  if (!t || t === "<br>" || t === "<br/>") return "";
  return html;
}

export default function RichTextField({
  value,
  onChange,
  multiline = true,
  "aria-label": ariaLabel,
  placeholder,
}: RichTextFieldProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const syncingRef = useRef(false);
  const [pickerColor, setPickerColor] = useState(DEFAULT_TEXT_COLOR);

  const emit = useCallback(() => {
    const el = editorRef.current;
    if (!el || syncingRef.current) return;
    onChange(normalizeEmptyHtml(el.innerHTML));
  }, [onChange]);

  const exec = useCallback(
    (command: string, valueArg?: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      // Use semantic <b>/<i>/<u> so formatting survives our HTML sanitizer (span-only color rules).
      if (command === "bold" || command === "italic" || command === "underline") {
        try {
          document.execCommand("styleWithCSS", false, "false");
        } catch {
          // ignore
        }
      }
      try {
        document.execCommand(command, false, valueArg);
      } catch {
        // execCommand can throw in some environments; ignore
      }
      emit();
    },
    [emit]
  );

  const applyForeColor = useCallback(
    (hex: string) => {
      const el = editorRef.current;
      if (!el) return;
      el.focus();
      try {
        document.execCommand("styleWithCSS", false, "true");
      } catch {
        // ignore
      }
      try {
        document.execCommand("foreColor", false, hex);
      } catch {
        // ignore
      }
      setPickerColor(hex);
      emit();
    },
    [emit]
  );

  const applyLink = useCallback(() => {
    const url = window.prompt("Link URL (https://…)", "https://");
    if (!url) return;
    const trimmed = url.trim();
    if (!/^https?:\/\//i.test(trimmed)) {
      window.alert("Please use a URL that starts with http:// or https://");
      return;
    }
    exec("createLink", trimmed);
  }, [exec]);

  useEffect(() => {
    try {
      document.execCommand("styleWithCSS", false, "false");
    } catch {
      // ignore
    }
  }, []);

  useEffect(() => {
    const el = editorRef.current;
    if (!el) return;
    const next = value || "";
    if (el.innerHTML === next) return;
    syncingRef.current = true;
    el.innerHTML = next || (multiline ? "<br>" : "<br>");
    syncingRef.current = false;
  }, [value, multiline]);

  return (
    <div className="rounded-xl border border-border bg-surface overflow-hidden">
      {placeholder ? (
        <p className="px-3 pt-3 text-xs text-foreground-muted">{placeholder}</p>
      ) : null}
      <div
        className="flex flex-wrap items-center gap-1 border-b border-border bg-page-soft px-2 py-2"
        role="toolbar"
        aria-label="Text formatting"
      >
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("bold")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-sm font-bold text-foreground hover:bg-surface hover:border-border transition-colors motion-reduce:transition-none"
          title="Bold"
          aria-label="Bold"
        >
          <FiBold className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("italic")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-sm font-bold text-foreground hover:bg-surface hover:border-border transition-colors motion-reduce:transition-none"
          title="Italic"
          aria-label="Italic"
        >
          <FiItalic className="w-4 h-4" />
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("underline")}
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-transparent text-sm font-bold text-foreground hover:bg-surface hover:border-border transition-colors motion-reduce:transition-none"
          title="Underline"
          aria-label="Underline"
        >
          <FiUnderline className="w-4 h-4" />
        </button>

        <span className="mx-1 h-6 w-px bg-border" aria-hidden />

        <label className="inline-flex items-center gap-2 px-2">
          <span className="text-xs font-semibold text-foreground-muted">Color</span>
          <input
            type="color"
            value={pickerColor}
            onChange={(e) => applyForeColor(e.target.value)}
            className="h-9 w-11 cursor-pointer rounded-lg border border-border bg-surface p-1"
            aria-label="Text color"
          />
        </label>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => applyForeColor(DEFAULT_TEXT_COLOR)}
          className="h-9 rounded-lg border border-border bg-surface px-2 text-xs font-semibold text-foreground hover:bg-page-soft transition-colors motion-reduce:transition-none"
          title="Apply default text color to selection"
          aria-label="Default text color"
        >
          Default
        </button>

        <span className="mx-1 h-6 w-px bg-border" aria-hidden />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={applyLink}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-transparent px-2 text-sm font-semibold text-foreground hover:bg-surface hover:border-border transition-colors motion-reduce:transition-none"
          title="Link selection"
          aria-label="Add link to selection"
        >
          <FiLink className="w-4 h-4" />
          <span className="hidden sm:inline">Link</span>
        </button>
        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("unlink")}
          className="inline-flex h-9 items-center gap-1 rounded-lg border border-transparent px-2 text-sm font-semibold text-foreground hover:bg-surface hover:border-border transition-colors motion-reduce:transition-none"
          title="Remove link"
          aria-label="Remove link"
        >
          <FiLink2 className="w-4 h-4" />
          <span className="hidden sm:inline">Unlink</span>
        </button>

        <span className="mx-1 h-6 w-px bg-border" aria-hidden />

        <button
          type="button"
          onMouseDown={(e) => e.preventDefault()}
          onClick={() => exec("removeFormat")}
          className="inline-flex h-9 items-center rounded-lg border border-transparent px-2 text-xs font-semibold text-foreground-muted hover:bg-surface hover:border-border hover:text-foreground transition-colors motion-reduce:transition-none"
          title="Clear formatting in selection"
          aria-label="Clear formatting in selection"
        >
          Clear
        </button>
      </div>

      <div
        ref={editorRef}
        role="textbox"
        aria-multiline={multiline}
        aria-label={ariaLabel || "Rich text"}
        contentEditable
        suppressContentEditableWarning
        onInput={emit}
        onBlur={emit}
        className={[
          "blog-rich px-4 py-3 text-sm text-foreground outline-none focus-visible:ring-2 focus-visible:ring-brand/40",
          multiline ? "min-h-[168px] max-h-[min(60vh,520px)] overflow-y-auto" : "min-h-[44px]",
        ].join(" ")}
      />
    </div>
  );
}
