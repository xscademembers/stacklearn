"use client";

import { useEffect, useState, useCallback } from "react";
import {
  FiPlus,
  FiEdit2,
  FiTrash2,
  FiSave,
  FiX,
  FiUploadCloud,
  FiChevronUp,
  FiChevronDown,
} from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";
import RichTextField from "@/components/admin/RichTextField";
import { looksLikeHtml, sanitizeBlogHtml } from "@/lib/sanitize-blog-html";

type BlogBlock = {
  kind?: "heading" | "paragraph" | "image" | "table";
  heading: string;
  paragraph: string;
  imageUrl: string;
  table?: {
    caption?: string;
    columns: string[];
    rows: string[][];
  };
  align?: "left" | "center" | "right";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  linkUrl?: string;
};

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
  blocks?: BlogBlock[];
  published: boolean;
  createdAt: string;
  updatedAt?: string;
  publishedAt?: string | null;
}

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  image: "",
  content: "",
  blocks: [
    {
      kind: "paragraph",
      heading: "",
      paragraph: "",
      imageUrl: "",
      table: undefined,
      align: "left",
      bold: false,
      italic: false,
      underline: false,
      color: "",
      linkUrl: "",
    },
  ],
  published: false,
} satisfies Partial<Blog>;

function toTextAlign(align?: BlogBlock["align"]): React.CSSProperties["textAlign"] {
  if (align === "center") return "center";
  if (align === "right") return "right";
  return "left";
}

function isValidHttpUrl(url?: string) {
  return typeof url === "string" && /^https?:\/\//i.test(url.trim());
}

function clampText(v: unknown, maxLen: number): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s) return "";
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function coerceTable(v: unknown): NonNullable<BlogBlock["table"]> | undefined {
  if (!v || typeof v !== "object") return undefined;
  const t = v as Record<string, unknown>;

  const columnsRaw = Array.isArray(t.columns) ? (t.columns as unknown[]) : [];
  const rowsRaw = Array.isArray(t.rows) ? (t.rows as unknown[]) : [];

  const columns = columnsRaw.map((c) => clampText(c, 80));
  const rows = rowsRaw
    .map((r) => (Array.isArray(r) ? (r as unknown[]) : []))
    .map((r) => r.map((cell) => clampText(cell, 400)));

  const safeColumns = columns.filter((c) => c.length > 0);
  const hasAnyCell = rows.some((r) => r.some((cell) => cell.length > 0));
  if (safeColumns.length === 0 && !hasAnyCell) return undefined;

  const width = Math.max(
    safeColumns.length,
    rows.reduce((m, r) => Math.max(m, r.length), 0)
  );
  const normalizedColumns =
    safeColumns.length > 0 ? [...safeColumns, ...Array.from({ length: Math.max(0, width - safeColumns.length) }, () => "")] : Array.from({ length: width }, () => "");
  const normalizedRows = rows.map((r) => [...r, ...Array.from({ length: Math.max(0, width - r.length) }, () => "")]);

  return {
    caption: clampText(t.caption, 160),
    columns: normalizedColumns,
    rows: normalizedRows,
  };
}

function TablePreview({ table }: { table: NonNullable<BlogBlock["table"]> }) {
  const columns = table.columns ?? [];
  const rows = table.rows ?? [];
  const hasHeader = columns.some((c) => c.trim().length > 0);
  const width = Math.max(
    columns.length,
    rows.reduce((m, r) => Math.max(m, r.length), 0)
  );
  if (width === 0) return null;

  const normalizedColumns = [...columns, ...Array.from({ length: Math.max(0, width - columns.length) }, () => "")];
  const normalizedRows = rows.map((r) => [...r, ...Array.from({ length: Math.max(0, width - r.length) }, () => "")]);

  return (
    <div className="rounded-xl border border-border bg-page-soft overflow-hidden">
      <div className="w-full overflow-x-auto">
        <table className="min-w-[32rem] w-full text-sm">
          {table.caption ? (
            <caption className="text-left px-4 py-3 text-xs font-semibold text-foreground-muted">
              {table.caption}
            </caption>
          ) : null}
          {hasHeader ? (
            <thead>
              <tr className="border-b border-border bg-surface">
                {normalizedColumns.map((c, i) => (
                  <th key={i} scope="col" className="px-4 py-3 text-left font-semibold text-foreground">
                    {c || "—"}
                  </th>
                ))}
              </tr>
            </thead>
          ) : null}
          <tbody>
            {normalizedRows.length === 0 ? (
              <tr>
                <td
                  colSpan={width}
                  className="px-4 py-4 text-foreground-muted"
                >
                  No rows yet.
                </td>
              </tr>
            ) : (
              normalizedRows.map((r, ri) => (
                <tr key={ri} className="border-b border-border last:border-b-0">
                  {r.slice(0, width).map((cell, ci) => (
                    <td key={ci} className="px-4 py-3 text-foreground whitespace-pre-wrap break-words">
                      {cell || "—"}
                    </td>
                  ))}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function TableEditor({
  block,
  onChange,
}: {
  block: BlogBlock;
  onChange: (next: BlogBlock) => void;
}) {
  const table = block.table ?? { caption: "", columns: ["", ""], rows: [["", ""]] };
  const columns = table.columns.length > 0 ? table.columns : ["", ""];
  const rows = table.rows.length > 0 ? table.rows : [["", ""]];
  const width = Math.max(
    columns.length,
    rows.reduce((m, r) => Math.max(m, r.length), 0),
    1
  );
  const safeColumns = [...columns, ...Array.from({ length: Math.max(0, width - columns.length) }, () => "")];
  const safeRows = rows.map((r) => [...r, ...Array.from({ length: Math.max(0, width - r.length) }, () => "")]);

  const setTable = (next: NonNullable<BlogBlock["table"]>) =>
    onChange({
      ...block,
      kind: "table",
      table: next,
      heading: "",
      paragraph: "",
      imageUrl: "",
    });

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-semibold mb-1">Table caption (optional)</label>
        <input
          type="text"
          value={table.caption || ""}
          onChange={(e) => setTable({ ...table, caption: e.target.value })}
          className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
          placeholder="e.g. Course fee comparison"
        />
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">Columns</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => {
                const nextCols = [...safeColumns, ""];
                const nextRows = safeRows.map((r) => [...r, ""]);
                setTable({ ...table, columns: nextCols, rows: nextRows });
              }}
              className="px-3 h-9 rounded-lg border border-border bg-surface text-sm font-medium hover:bg-page-soft transition-colors motion-reduce:transition-none"
            >
              + Column
            </button>
            <button
              type="button"
              onClick={() => {
                if (safeColumns.length <= 1) return;
                const nextCols = safeColumns.slice(0, -1);
                const nextRows = safeRows.map((r) => r.slice(0, -1));
                setTable({ ...table, columns: nextCols, rows: nextRows });
              }}
              disabled={safeColumns.length <= 1}
              className="px-3 h-9 rounded-lg border border-border bg-surface text-sm font-medium hover:bg-page-soft transition-colors disabled:opacity-60 motion-reduce:transition-none"
            >
              − Column
            </button>
          </div>
        </div>

        <div className="grid gap-2">
          {safeColumns.map((c, i) => (
            <div key={i} className="grid grid-cols-[6rem_1fr] items-center gap-3">
              <span className="text-xs font-semibold text-foreground-muted">Col {i + 1}</span>
              <input
                type="text"
                value={c}
                onChange={(e) => {
                  const next = [...safeColumns];
                  next[i] = e.target.value;
                  setTable({ ...table, columns: next, rows: safeRows });
                }}
                className="w-full px-4 h-10 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                placeholder={`Header ${i + 1}`}
              />
            </div>
          ))}
        </div>
      </div>

      <div className="grid gap-3">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <p className="text-sm font-semibold text-foreground">Rows</p>
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={() => setTable({ ...table, columns: safeColumns, rows: [...safeRows, Array.from({ length: safeColumns.length }, () => "")] })}
              className="px-3 h-9 rounded-lg border border-border bg-surface text-sm font-medium hover:bg-page-soft transition-colors motion-reduce:transition-none"
            >
              + Row
            </button>
            <button
              type="button"
              onClick={() => {
                if (safeRows.length <= 1) return;
                setTable({ ...table, columns: safeColumns, rows: safeRows.slice(0, -1) });
              }}
              disabled={safeRows.length <= 1}
              className="px-3 h-9 rounded-lg border border-border bg-surface text-sm font-medium hover:bg-page-soft transition-colors disabled:opacity-60 motion-reduce:transition-none"
            >
              − Row
            </button>
          </div>
        </div>

        <div className="rounded-xl border border-border bg-surface overflow-hidden">
          <div className="w-full overflow-x-auto">
            <table className="min-w-[32rem] w-full text-sm">
              <thead>
                <tr className="border-b border-border bg-page-soft">
                  {safeColumns.map((c, i) => (
                    <th key={i} className="px-3 py-2 text-left text-xs font-semibold text-foreground-muted">
                      {c || `Col ${i + 1}`}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {safeRows.map((r, ri) => (
                  <tr key={ri} className="border-b border-border last:border-b-0">
                    {r.slice(0, safeColumns.length).map((cell, ci) => (
                      <td key={ci} className="px-3 py-2">
                        <input
                          type="text"
                          value={cell}
                          onChange={(e) => {
                            const nextRows = safeRows.map((row) => [...row]);
                            nextRows[ri][ci] = e.target.value;
                            setTable({ ...table, columns: safeColumns, rows: nextRows });
                          }}
                          className="w-full px-3 h-10 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                          placeholder={`R${ri + 1}C${ci + 1}`}
                        />
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

function BlockTextPreview({
  as,
  block,
  children,
}: {
  as: "h2" | "p";
  block: BlogBlock;
  children: string;
}) {
  const style: React.CSSProperties = {
    textAlign: toTextAlign(block.align),
    fontWeight: block.bold ? 700 : undefined,
    fontStyle: block.italic ? "italic" : undefined,
    textDecoration: block.underline ? "underline" : undefined,
    color: block.color || undefined,
  };

  const content =
    isValidHttpUrl(block.linkUrl) ? (
      <a
        href={block.linkUrl}
        target="_blank"
        rel="noreferrer noopener"
        className="no-underline hover:no-underline"
      >
        {children}
      </a>
    ) : (
      children
    );

  if (as === "h2") {
    return (
      <h2 style={style} className="text-xl md:text-2xl font-bold text-foreground leading-snug">
        {content}
      </h2>
    );
  }
  return (
    <p style={style} className="text-foreground leading-relaxed whitespace-pre-wrap">
      {content}
    </p>
  );
}

function BlockMixedPreview({
  variant,
  block,
  text,
}: {
  variant: "heading" | "paragraph";
  block: BlogBlock;
  text: string;
}) {
  if (!text) return null;
  if (looksLikeHtml(text)) {
    const safe = sanitizeBlogHtml(text);
    const align = toTextAlign(block.align);
    if (variant === "heading") {
      return (
        <h2
          className="blog-rich text-xl md:text-2xl font-bold text-foreground leading-snug"
          style={{ textAlign: align }}
          dangerouslySetInnerHTML={{ __html: safe }}
        />
      );
    }
    return (
      <div
        className="blog-rich text-foreground leading-relaxed whitespace-pre-wrap break-words"
        style={{ textAlign: align }}
        dangerouslySetInnerHTML={{ __html: safe }}
      />
    );
  }
  return (
    <BlockTextPreview as={variant === "heading" ? "h2" : "p"} block={block}>
      {text}
    </BlockTextPreview>
  );
}

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Blog> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [seeding, setSeeding] = useState(false);

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const res = await adminFetch("/api/admin/blogs");
      const data = await res.json();
      if (!res.ok) {
        setListError(typeof data.message === "string" ? data.message : "Could not load blogs.");
        setBlogs([]);
        return;
      }
      setBlogs(data.blogs || []);
    } catch (e) {
      if (isAbortOrTimeoutError(e)) {
        setListError("Request timed out — check MongoDB (MONGODB_URI, Atlas IP list) and restart the server.");
      } else {
        setListError("Could not load blogs.");
      }
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "new") setEditing({ ...emptyBlog });
    }
  }, []);

  const autoSlug = (title: string) =>
    title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");

  const coerceBlogBlocks = (b: Partial<Blog>): BlogBlock[] => {
    if (Array.isArray(b.blocks) && b.blocks.length > 0) {
      return b.blocks.map((blk) => ({
        kind:
          blk?.kind === "heading" || blk?.kind === "paragraph" || blk?.kind === "image" || blk?.kind === "table"
            ? blk.kind
            : blk?.table && !blk?.imageUrl && !blk?.heading && !blk?.paragraph
              ? "table"
              : blk?.imageUrl && !blk?.heading && !blk?.paragraph
              ? "image"
              : blk?.heading && !blk?.paragraph && !blk?.imageUrl
                ? "heading"
                : "paragraph",
        heading: typeof blk?.heading === "string" ? blk.heading : "",
        paragraph: typeof blk?.paragraph === "string" ? blk.paragraph : "",
        imageUrl: blk?.imageUrl || "",
        table: coerceTable(blk?.table),
        align: blk?.align === "left" || blk?.align === "center" || blk?.align === "right" ? blk.align : "left",
        bold: Boolean(blk?.bold),
        italic: Boolean(blk?.italic),
        underline: Boolean(blk?.underline),
        color: typeof blk?.color === "string" ? blk.color : "",
        linkUrl: typeof blk?.linkUrl === "string" ? blk.linkUrl : "",
      }));
    }
    if (typeof b.content === "string" && b.content.trim()) {
      return [
        {
          kind: "paragraph",
          heading: "",
          paragraph: b.content,
          imageUrl: "",
          table: undefined,
          align: "left",
          bold: false,
          italic: false,
          underline: false,
          color: "",
          linkUrl: "",
        },
      ];
    }
    return [
      {
        kind: "paragraph",
        heading: "",
        paragraph: "",
        imageUrl: "",
        table: undefined,
        align: "left",
        bold: false,
        italic: false,
        underline: false,
        color: "",
        linkUrl: "",
      },
    ];
  };

  const persistBlogBlocks = (b: Partial<Blog>): BlogBlock[] =>
    coerceBlogBlocks(b).map((blk) => {
      if (blk.kind === "heading" || blk.kind === "paragraph") {
        return {
          ...blk,
          heading: sanitizeBlogHtml(blk.heading),
          paragraph: sanitizeBlogHtml(blk.paragraph),
          bold: false,
          italic: false,
          underline: false,
          color: "",
          linkUrl: "",
        };
      }
      if (blk.kind === "table") {
        return {
          ...blk,
          heading: "",
          paragraph: "",
          imageUrl: "",
          table: coerceTable(blk.table),
          bold: false,
          italic: false,
          underline: false,
          color: "",
          linkUrl: "",
        };
      }
      return blk;
    });

  const handleSave = async (mode: "save" | "publish" = "save") => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...editing,
        published: mode === "publish" ? true : Boolean(editing.published),
        blocks: persistBlogBlocks(editing),
      };
      const method = editing._id ? "PUT" : "POST";
      const res = await adminFetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.message || "Failed to save");
        return;
      }
      setEditing(null);
      fetchBlogs();
    } catch (e) {
      setError(
        isAbortOrTimeoutError(e)
          ? "Save timed out — check MongoDB connection."
          : "Network error"
      );
    } finally {
      setSaving(false);
    }
  };

  const handleSeed = async () => {
    setSeeding(true);
    setListError("");
    try {
      const res = await adminFetch("/api/admin/blogs/seed", { method: "POST" });
      const data = await res.json();
      if (!res.ok) {
        setListError(typeof data.message === "string" ? data.message : "Could not import defaults.");
        return;
      }
      await fetchBlogs();
    } catch (e) {
      setListError(isAbortOrTimeoutError(e) ? "Import timed out." : "Could not import defaults.");
    } finally {
      setSeeding(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    try {
      await adminFetch("/api/admin/blogs", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      setListError("Delete failed or timed out.");
    }
    fetchBlogs();
  };

  if (editing) {
    const blocks = coerceBlogBlocks(editing);

    const setBlocks = (next: BlogBlock[]) => setEditing({ ...editing, blocks: next });

    const moveBlock = (from: number, to: number) => {
      if (to < 0 || to >= blocks.length) return;
      const next = [...blocks];
      const [item] = next.splice(from, 1);
      next.splice(to, 0, item);
      setBlocks(next);
    };

    return (
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {editing._id ? "Edit Blog Post" : "New Blog Post"}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="p-2 hover:bg-page-soft rounded-lg transition-colors"
            aria-label="Close editor"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="grid gap-6 lg:grid-cols-2 lg:items-start">
          {/* Editor */}
          <section className="bg-surface rounded-xl border border-border p-6 space-y-5">
            <header className="flex items-start justify-between gap-4">
              <div>
                <h3 className="text-sm font-semibold text-foreground">Editor</h3>
                <p className="mt-1 text-xs text-foreground-muted">
                  Changes are saved as blocks. Preview updates live on the right.
                </p>
              </div>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Title *</label>
                <input
                  type="text"
                  value={editing.title || ""}
                  onChange={(e) =>
                    setEditing({
                      ...editing,
                      title: e.target.value,
                      slug: editing._id ? editing.slug : autoSlug(e.target.value),
                    })
                  }
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Slug *</label>
                <input
                  type="text"
                  value={editing.slug || ""}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={editing.category || ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editing.image || ""}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Excerpt</label>
                <textarea
                  rows={3}
                  value={editing.excerpt || ""}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                />
              </div>
            </div>

            <div className="space-y-3">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <h4 className="text-sm font-semibold text-foreground">Content Blocks</h4>
              </div>

              <div className="space-y-4">
                {blocks.map((blk, idx) => {
                  const kindLabel =
                    blk.kind === "heading"
                      ? "Heading"
                      : blk.kind === "image"
                        ? "Image"
                        : blk.kind === "table"
                          ? "Table"
                          : "Paragraph";
                  return (
                    <article key={idx} className="rounded-xl border border-border bg-page-soft p-4 space-y-4">
                      <header className="flex items-center justify-between gap-3">
                        <div className="flex items-center gap-2">
                          <span className="inline-flex items-center rounded-full border border-border bg-surface px-2.5 py-1 text-xs font-semibold text-foreground">
                            {kindLabel}
                          </span>
                          <span className="text-xs text-foreground-muted">Block {idx + 1} of {blocks.length}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, idx - 1)}
                            disabled={idx === 0}
                            className="p-2 rounded-lg hover:bg-surface transition-colors disabled:opacity-40"
                            title="Move up"
                            aria-label="Move block up"
                          >
                            <FiChevronUp className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() => moveBlock(idx, idx + 1)}
                            disabled={idx === blocks.length - 1}
                            className="p-2 rounded-lg hover:bg-surface transition-colors disabled:opacity-40"
                            title="Move down"
                            aria-label="Move block down"
                          >
                            <FiChevronDown className="w-4 h-4" />
                          </button>
                          <button
                            type="button"
                            onClick={() =>
                              setBlocks(
                                blocks.length === 1
                                  ? [
                                      {
                                        kind: "paragraph",
                                        heading: "",
                                        paragraph: "",
                                        imageUrl: "",
                                        align: "left",
                                        bold: false,
                                        italic: false,
                                        underline: false,
                                        color: "",
                                        linkUrl: "",
                                      },
                                    ]
                                  : blocks.filter((_, i) => i !== idx)
                              )
                            }
                            className="p-2 rounded-lg hover:bg-surface transition-colors text-foreground-muted hover:text-red-500"
                            aria-label="Remove block"
                            title="Remove block"
                          >
                            <FiTrash2 className="w-4 h-4" />
                          </button>
                        </div>
                      </header>

                      <div className="flex flex-wrap items-center gap-2">
                        <div className="inline-flex items-center rounded-lg border border-border bg-surface p-1">
                          {(["left", "center", "right"] as const).map((a) => (
                            <button
                              key={a}
                              type="button"
                              onClick={() => {
                                const next = [...blocks];
                                next[idx] = { ...next[idx], align: a };
                                setBlocks(next);
                              }}
                              className={`h-8 px-3 rounded-md text-xs font-semibold transition-colors motion-reduce:transition-none ${
                                (blk.align || "left") === a
                                  ? "bg-brand text-white"
                                  : "text-foreground-muted hover:text-foreground hover:bg-page-soft"
                              }`}
                              aria-pressed={(blk.align || "left") === a}
                              title={`Align ${a}`}
                            >
                              {a === "left" ? "Left" : a === "center" ? "Center" : "Right"}
                            </button>
                          ))}
                        </div>
                        {(blk.kind === "heading" || blk.kind === "paragraph") && (
                          <p className="text-xs text-foreground-muted">
                            Select words or letters, then use the toolbar for bold, color, links, and more.
                          </p>
                        )}
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {blk.kind === "heading" ? (
                          <div>
                            <label className="block text-sm font-semibold mb-2">Heading</label>
                            <RichTextField
                              aria-label="Heading content"
                              multiline={false}
                              value={blk.heading}
                              onChange={(html) => {
                                const next = [...blocks];
                                next[idx] = {
                                  ...next[idx],
                                  heading: html,
                                  paragraph: "",
                                  imageUrl: "",
                                  kind: "heading",
                                };
                                setBlocks(next);
                              }}
                            />
                          </div>
                        ) : null}

                        {blk.kind === "paragraph" ? (
                          <div>
                            <label className="block text-sm font-semibold mb-2">Paragraph</label>
                            <RichTextField
                              aria-label="Paragraph content"
                              multiline
                              value={blk.paragraph}
                              onChange={(html) => {
                                const next = [...blocks];
                                next[idx] = {
                                  ...next[idx],
                                  paragraph: html,
                                  heading: "",
                                  imageUrl: "",
                                  kind: "paragraph",
                                };
                                setBlocks(next);
                              }}
                            />
                          </div>
                        ) : null}

                        {blk.kind === "image" ? (
                          <div>
                            <label className="block text-sm font-semibold mb-1">Image URL</label>
                            <input
                              type="text"
                              value={blk.imageUrl}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[idx] = {
                                  ...next[idx],
                                  imageUrl: e.target.value,
                                  heading: "",
                                  paragraph: "",
                                  kind: "image",
                                };
                                setBlocks(next);
                              }}
                              className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                              placeholder="https://..."
                            />
                            <p className="mt-2 text-xs text-foreground-muted">
                              Tip: paste a direct image URL (ends with .jpg/.png/.webp).
                            </p>
                          </div>
                        ) : null}

                        {blk.kind === "table" ? (
                          <div>
                            <label className="block text-sm font-semibold mb-2">Table</label>
                            <TableEditor
                              block={blk}
                              onChange={(nextBlk) => {
                                const next = [...blocks];
                                next[idx] = nextBlk;
                                setBlocks(next);
                              }}
                            />
                          </div>
                        ) : null}
                      </div>
                    </article>
                  );
                })}
              </div>

              <div className="flex flex-wrap items-center justify-end gap-2 pt-1">
                <button
                  type="button"
                  onClick={() =>
                    setBlocks([
                      ...blocks,
                      {
                        kind: "heading",
                        heading: "",
                        paragraph: "",
                        imageUrl: "",
                        table: undefined,
                        align: "left",
                        bold: false,
                        italic: false,
                        underline: false,
                        color: "",
                        linkUrl: "",
                      },
                    ])
                  }
                  className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-page-soft text-sm font-medium hover:bg-border transition-colors motion-reduce:transition-none"
                >
                  <FiPlus className="w-4 h-4" />
                  Heading
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setBlocks([
                      ...blocks,
                      {
                        kind: "paragraph",
                        heading: "",
                        paragraph: "",
                        imageUrl: "",
                        table: undefined,
                        align: "left",
                        bold: false,
                        italic: false,
                        underline: false,
                        color: "",
                        linkUrl: "",
                      },
                    ])
                  }
                  className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-page-soft text-sm font-medium hover:bg-border transition-colors motion-reduce:transition-none"
                >
                  <FiPlus className="w-4 h-4" />
                  Paragraph
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setBlocks([
                      ...blocks,
                      {
                        kind: "image",
                        heading: "",
                        paragraph: "",
                        imageUrl: "",
                        table: undefined,
                        align: "left",
                        bold: false,
                        italic: false,
                        underline: false,
                        color: "",
                        linkUrl: "",
                      },
                    ])
                  }
                  className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-page-soft text-sm font-medium hover:bg-border transition-colors motion-reduce:transition-none"
                >
                  <FiPlus className="w-4 h-4" />
                  Image
                </button>
                <button
                  type="button"
                  onClick={() =>
                    setBlocks([
                      ...blocks,
                      {
                        kind: "table",
                        heading: "",
                        paragraph: "",
                        imageUrl: "",
                        table: { caption: "", columns: ["", ""], rows: [["", ""]] },
                        align: "left",
                        bold: false,
                        italic: false,
                        underline: false,
                        color: "",
                        linkUrl: "",
                      },
                    ])
                  }
                  className="flex items-center gap-2 px-3 h-9 rounded-lg border border-border bg-page-soft text-sm font-medium hover:bg-border transition-colors motion-reduce:transition-none"
                >
                  <FiPlus className="w-4 h-4" />
                  Table
                </button>
              </div>

              <div className="flex items-center justify-between gap-4 pt-1">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={Boolean(editing.published)}
                    onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
                    className="w-4 h-4 accent-brand"
                  />
                  Published
                </label>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => handleSave("save")}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 h-11 border border-border rounded-lg font-medium hover:bg-page-soft transition-colors disabled:opacity-60 motion-reduce:transition-none"
                  >
                    <FiSave className="w-4 h-4" />
                    {saving ? "Saving…" : "Save"}
                  </button>
                  <button
                    type="button"
                    onClick={() => handleSave("publish")}
                    disabled={saving}
                    className="flex items-center gap-2 px-5 h-11 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60 motion-reduce:transition-none"
                  >
                    <FiUploadCloud className="w-4 h-4" />
                    {saving ? "Publishing…" : "Publish"}
                  </button>
                </div>
              </div>

              {error && <p className="text-sm text-red-600">{error}</p>}
            </div>
          </section>

          {/* Live preview */}
          <aside className="bg-surface rounded-xl border border-border p-6 space-y-5 lg:sticky lg:top-6">
            <header>
              <h3 className="text-sm font-semibold text-foreground">Live Preview</h3>
              <p className="mt-1 text-xs text-foreground-muted">
                This preview matches how blocks render on the public blog page.
              </p>
            </header>

            <div className="rounded-xl border border-border bg-page-soft p-5">
              <p className="text-xs font-semibold tracking-wide text-brand">
                {editing.category || "Blog"}
              </p>
              <h1 className="mt-2 text-2xl font-bold text-foreground leading-tight">
                {editing.title || "Untitled post"}
              </h1>
              {editing.excerpt ? (
                <p className="mt-3 text-sm leading-relaxed text-foreground-muted">
                  {editing.excerpt}
                </p>
              ) : null}
            </div>

            {editing.image ? (
              <div className="rounded-xl border border-border bg-page-soft overflow-hidden">
                {/* Using plain img in preview avoids next/image config issues for arbitrary URLs */}
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={editing.image}
                  alt={editing.title || "Blog cover"}
                  className="w-full h-56 object-cover"
                />
              </div>
            ) : null}

            <article className="space-y-8">
              {blocks.length === 0 ? (
                <div className="rounded-xl border border-border bg-page-soft px-4 py-5 text-sm text-foreground-muted">
                  No blocks yet.
                </div>
              ) : (
                blocks.map((b, idx) => (
                  <section key={idx} className="space-y-4">
                    {b.heading ? <BlockMixedPreview variant="heading" block={b} text={b.heading} /> : null}
                    {b.paragraph ? <BlockMixedPreview variant="paragraph" block={b} text={b.paragraph} /> : null}
                    {b.imageUrl ? (
                      <div className="rounded-xl border border-border bg-page-soft overflow-hidden">
                        {/* eslint-disable-next-line @next/next/no-img-element */}
                        <img
                          src={b.imageUrl}
                          alt={b.heading || editing.title || "Blog image"}
                          className="w-full h-56 object-cover"
                        />
                      </div>
                    ) : null}
                    {b.kind === "table" && b.table ? <TablePreview table={b.table} /> : null}
                  </section>
                ))
              )}
            </article>
          </aside>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {listError ? (
        <div className="rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-foreground" role="alert">
          {listError}
        </div>
      ) : null}
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground-muted">{blogs.length} blog posts</p>
        <div className="flex items-center gap-2">
          {blogs.length === 0 ? (
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 h-10 border border-border bg-page-soft rounded-lg text-sm font-medium hover:bg-border transition-colors disabled:opacity-60"
              title="Imports the 3 default blog posts into MongoDB (only if empty)"
            >
              <FiUploadCloud className="w-4 h-4" />
              {seeding ? "Importing…" : "Import Defaults"}
            </button>
          ) : null}
          <button
            onClick={() => setEditing({ ...emptyBlog })}
            className="flex items-center gap-2 px-4 h-10 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors"
          >
            <FiPlus className="w-4 h-4" />
            New Post
          </button>
        </div>
      </div>

      {loading ? (
        <p className="text-center py-12 text-foreground-muted">Loading…</p>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-foreground-muted mb-4">No blog posts yet.</p>
          <div className="flex items-center justify-center gap-2">
            <button
              onClick={handleSeed}
              disabled={seeding}
              className="flex items-center gap-2 px-4 h-10 border border-border bg-page-soft rounded-lg text-sm font-medium hover:bg-border transition-colors disabled:opacity-60"
            >
              <FiUploadCloud className="w-4 h-4" />
              {seeding ? "Importing…" : "Import Defaults"}
            </button>
            <button
              onClick={() => setEditing({ ...emptyBlog })}
              className="px-4 h-10 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors"
            >
              Create New Post
            </button>
          </div>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-page-soft">
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-4 py-3 font-semibold">Category</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-left px-4 py-3 font-semibold">Date</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blogs.map((blog) => (
                <tr key={blog._id} className="border-b border-border hover:bg-page-soft transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{blog.title}</td>
                  <td className="px-4 py-3 text-foreground-muted">{blog.category || "—"}</td>
                  <td className="px-4 py-3">
                    <span className={`text-xs px-2 py-1 rounded-full font-medium ${blog.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>
                      {blog.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-4 py-3 text-foreground-muted text-xs">
                    {new Date(blog.publishedAt || blog.createdAt).toLocaleDateString("en-IN")}
                  </td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button
                        onClick={() => setEditing(blog)}
                        className="p-2 hover:bg-page-soft rounded-lg transition-colors text-foreground-muted hover:text-brand"
                        title="Edit"
                      >
                        <FiEdit2 className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() => handleDelete(blog._id)}
                        className="p-2 hover:bg-page-soft rounded-lg transition-colors text-foreground-muted hover:text-red-500"
                        title="Delete"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
