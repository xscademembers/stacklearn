"use client";

import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiUploadCloud } from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";

type BlogBlock = {
  heading: string;
  paragraph: string;
  imageUrl: string;
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
  blocks: [{ heading: "", paragraph: "", imageUrl: "" }],
  published: false,
};

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
        heading: blk?.heading || "",
        paragraph: blk?.paragraph || "",
        imageUrl: blk?.imageUrl || "",
      }));
    }
    if (typeof b.content === "string" && b.content.trim()) {
      return [{ heading: "", paragraph: b.content, imageUrl: "" }];
    }
    return [{ heading: "", paragraph: "", imageUrl: "" }];
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
    return (
      <div className="max-w-3xl mx-auto space-y-6">
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

        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <main className="space-y-4">
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Slug *</label>
                <input
                  type="text"
                  value={editing.slug || ""}
                  onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Category</label>
                <input
                  type="text"
                  value={editing.category || ""}
                  onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold mb-1">Cover Image URL</label>
                <input
                  type="text"
                  value={editing.image || ""}
                  onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                  className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-semibold mb-1">Excerpt</label>
                <textarea
                  rows={3}
                  value={editing.excerpt || ""}
                  onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
                  className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                />
              </div>
            </section>

            <section className="space-y-3">
              <header className="flex items-center justify-between">
                <h3 className="text-sm font-semibold text-foreground">Content Blocks</h3>
                <button
                  type="button"
                  onClick={() =>
                    setEditing({
                      ...editing,
                      blocks: [...blocks, { heading: "", paragraph: "", imageUrl: "" }],
                    })
                  }
                  className="flex items-center gap-2 px-3 py-2 rounded-lg border border-border bg-page-soft text-sm font-medium hover:bg-border transition-colors"
                >
                  <FiPlus className="w-4 h-4" />
                  Add Block
                </button>
              </header>

              <div className="space-y-4">
                {blocks.map((blk, idx) => (
                  <article key={idx} className="rounded-xl border border-border bg-page-soft p-4 space-y-3">
                    <div className="flex items-center justify-between gap-4">
                      <p className="text-xs font-semibold text-foreground-muted">Block {idx + 1}</p>
                      <button
                        type="button"
                        onClick={() =>
                          setEditing({
                            ...editing,
                            blocks: blocks.length === 1 ? [{ heading: "", paragraph: "", imageUrl: "" }] : blocks.filter((_, i) => i !== idx),
                          })
                        }
                        className="p-2 rounded-lg hover:bg-surface transition-colors text-foreground-muted hover:text-red-500"
                        aria-label="Remove block"
                        title="Remove block"
                      >
                        <FiTrash2 className="w-4 h-4" />
                      </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Heading</label>
                        <input
                          type="text"
                          value={blk.heading}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[idx] = { ...next[idx], heading: e.target.value };
                            setEditing({ ...editing, blocks: next });
                          }}
                          className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Paragraph</label>
                        <textarea
                          rows={5}
                          value={blk.paragraph}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[idx] = { ...next[idx], paragraph: e.target.value };
                            setEditing({ ...editing, blocks: next });
                          }}
                          className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                        />
                      </div>
                      <div className="md:col-span-2">
                        <label className="block text-sm font-semibold mb-1">Image URL (optional)</label>
                        <input
                          type="text"
                          value={blk.imageUrl}
                          onChange={(e) => {
                            const next = [...blocks];
                            next[idx] = { ...next[idx], imageUrl: e.target.value };
                            setEditing({ ...editing, blocks: next });
                          }}
                          className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                          placeholder="https://..."
                        />
                      </div>
                    </div>
                  </article>
                ))}
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
                    className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand font-mono"
                    placeholder="If you paste old content here, it will be used only when blocks are empty."
                  />
                </div>
              </details>
            </section>

            <section className="flex items-center justify-between gap-4">
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
                  className="flex items-center gap-2 px-5 h-11 border border-border rounded-lg font-medium hover:bg-page-soft transition-colors disabled:opacity-60"
                >
                  <FiSave className="w-4 h-4" />
                  {saving ? "Saving…" : "Save"}
                </button>
                <button
                  type="button"
                  onClick={() => handleSave("publish")}
                  disabled={saving}
                  className="flex items-center gap-2 px-5 h-11 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60"
                >
                  <FiUploadCloud className="w-4 h-4" />
                  {saving ? "Publishing…" : "Publish"}
                </button>
              </div>
            </section>

            {error && <p className="text-sm text-red-600">{error}</p>}
          </main>
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
