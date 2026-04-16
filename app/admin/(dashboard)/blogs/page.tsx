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

type BlogBlock = {
  kind?: "heading" | "paragraph" | "image";
  heading: string;
  paragraph: string;
  imageUrl: string;
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
        className="hover:underline"
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

  const ensureBlocks = (b: Partial<Blog>): BlogBlock[] => {
    if (Array.isArray(b.blocks) && b.blocks.length > 0) {
      return b.blocks.map((blk) => ({
        kind:
          blk?.kind === "heading" || blk?.kind === "paragraph" || blk?.kind === "image"
            ? blk.kind
            : blk?.imageUrl && !blk?.heading && !blk?.paragraph
              ? "image"
              : blk?.heading && !blk?.paragraph && !blk?.imageUrl
                ? "heading"
                : "paragraph",
        heading: blk?.heading || "",
        paragraph: blk?.paragraph || "",
        imageUrl: blk?.imageUrl || "",
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
        align: "left",
        bold: false,
        italic: false,
        underline: false,
        color: "",
        linkUrl: "",
      },
    ];
  };

  const handleSave = async (mode: "save" | "publish" = "save") => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const payload = {
        ...editing,
        published: mode === "publish" ? true : Boolean(editing.published),
        blocks: ensureBlocks(editing),
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
    const blocks = ensureBlocks(editing);

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
                <div className="flex flex-wrap items-center gap-2">
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
                          align: "left",
                          bold: true,
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
                </div>
              </div>

              <div className="space-y-4">
                {blocks.map((blk, idx) => {
                  const kindLabel =
                    blk.kind === "heading" ? "Heading" : blk.kind === "image" ? "Image" : "Paragraph";
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

                        <div className="inline-flex items-center rounded-lg border border-border bg-surface p-1">
                          {([
                            { key: "bold", label: "B" },
                            { key: "italic", label: "I" },
                            { key: "underline", label: "U" },
                          ] as const).map((t) => (
                            <button
                              key={t.key}
                              type="button"
                              onClick={() => {
                                const next = [...blocks];
                                next[idx] = { ...next[idx], [t.key]: !Boolean(next[idx]?.[t.key]) };
                                setBlocks(next);
                              }}
                              className={`h-8 w-8 rounded-md text-xs font-bold transition-colors motion-reduce:transition-none ${
                                blk[t.key]
                                  ? "bg-brand text-white"
                                  : "text-foreground-muted hover:text-foreground hover:bg-page-soft"
                              }`}
                              aria-pressed={Boolean(blk[t.key])}
                              title={t.key}
                            >
                              {t.label}
                            </button>
                          ))}

                          <label className="ml-1 inline-flex items-center gap-2 px-2">
                            <span className="text-xs font-semibold text-foreground-muted">Color</span>
                            <input
                              type="color"
                              value={blk.color && blk.color.startsWith("#") ? blk.color : "#111827"}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[idx] = { ...next[idx], color: e.target.value };
                                setBlocks(next);
                              }}
                              className="h-8 w-10 rounded-md border border-border bg-surface p-1"
                              aria-label="Text color"
                            />
                          </label>
                        </div>

                        <div className="flex-1 min-w-[240px]">
                          <div className="grid grid-cols-1 gap-2 sm:grid-cols-[1fr_auto] sm:items-center">
                            <input
                              type="url"
                              value={blk.linkUrl || ""}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[idx] = { ...next[idx], linkUrl: e.target.value };
                                setBlocks(next);
                              }}
                              placeholder="https://example.com"
                              className="w-full px-3 h-9 border border-border rounded-lg text-sm bg-surface focus:ring-2 focus:ring-brand"
                            />
                            <button
                              type="button"
                              onClick={() => {
                                const next = [...blocks];
                                next[idx] = { ...next[idx], linkUrl: "" };
                                setBlocks(next);
                              }}
                              className="h-9 px-3 rounded-lg border border-border bg-surface text-sm font-semibold hover:bg-page-soft transition-colors motion-reduce:transition-none disabled:opacity-50"
                              disabled={!blk.linkUrl}
                              title="Clear link"
                            >
                              Clear Link
                            </button>
                          </div>
                          <p className="mt-2 text-xs text-foreground-muted">
                            Add a full URL (starts with http/https). In preview, the block becomes clickable.
                          </p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 gap-4">
                        {blk.kind === "heading" ? (
                          <div>
                            <label className="block text-sm font-semibold mb-1">Heading</label>
                            <input
                              type="text"
                              value={blk.heading}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[idx] = {
                                  ...next[idx],
                                  heading: e.target.value,
                                  paragraph: "",
                                  imageUrl: "",
                                  kind: "heading",
                                };
                                setBlocks(next);
                              }}
                              className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                            />
                          </div>
                        ) : null}

                        {blk.kind === "paragraph" ? (
                          <div>
                            <label className="block text-sm font-semibold mb-1">Paragraph</label>
                            <textarea
                              rows={6}
                              value={blk.paragraph}
                              onChange={(e) => {
                                const next = [...blocks];
                                next[idx] = {
                                  ...next[idx],
                                  paragraph: e.target.value,
                                  heading: "",
                                  imageUrl: "",
                                  kind: "paragraph",
                                };
                                setBlocks(next);
                              }}
                              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
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
                      </div>
                    </article>
                  );
                })}
              </div>

              <details className="rounded-lg border border-border bg-surface px-4 py-3">
                <summary className="cursor-pointer text-sm font-medium text-foreground flex items-center gap-2">
                  <FiUploadCloud className="w-4 h-4" />
                  Legacy content (optional)
                </summary>
                <div className="mt-3">
                  <label className="block text-xs font-semibold mb-1 text-foreground-muted">Content (text)</label>
                  <textarea
                    rows={6}
                    value={editing.content || ""}
                    onChange={(e) => setEditing({ ...editing, content: e.target.value })}
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand font-mono bg-surface"
                    placeholder="If you paste old content here, it will be used only when blocks are empty."
                  />
                </div>
              </details>

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
                    {b.heading ? (
                      <BlockTextPreview as="h2" block={b}>
                        {b.heading}
                      </BlockTextPreview>
                    ) : null}
                    {b.paragraph ? (
                      <BlockTextPreview as="p" block={b}>
                        {b.paragraph}
                      </BlockTextPreview>
                    ) : null}
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
