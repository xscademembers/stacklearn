"use client";

import { useCallback, useEffect, useRef } from "react";
import { FiBold, FiItalic, FiUnderline, FiLink, FiLink2 } from "react-icons/fi";

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
      try {
        document.execCommand(command, false, valueArg);
      } catch {
        // execCommand can throw in some environments; ignore
      }
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
            defaultValue="#111827"
            onMouseDown={(e) => e.preventDefault()}
            onChange={(e) => exec("foreColor", e.target.value)}
            className="h-9 w-11 cursor-pointer rounded-lg border border-border bg-surface p-1"
            aria-label="Text color"
          />
        </label>

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
