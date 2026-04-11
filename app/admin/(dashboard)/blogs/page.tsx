"use client";

import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

interface Blog {
  _id: string;
  title: string;
  slug: string;
  excerpt: string;
  category: string;
  image: string;
  content: string;
  published: boolean;
  createdAt: string;
}

const emptyBlog = {
  title: "",
  slug: "",
  excerpt: "",
  category: "",
  image: "",
  content: "",
  published: true,
};

export default function BlogsPage() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Blog> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");

  const fetchBlogs = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/blogs");
    const data = await res.json();
    setBlogs(data.blogs || []);
    setLoading(false);
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

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const method = editing._id ? "PUT" : "POST";
      const res = await fetch("/api/admin/blogs", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.message || "Failed to save");
        return;
      }
      setEditing(null);
      fetchBlogs();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this blog post?")) return;
    await fetch("/api/admin/blogs", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchBlogs();
  };

  if (editing) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {editing._id ? "Edit Blog Post" : "New Blog Post"}
          </h2>
          <button
            onClick={() => setEditing(null)}
            className="p-2 hover:bg-page-soft rounded-lg transition-colors"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div>
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
              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Slug *</label>
            <input
              type="text"
              value={editing.slug || ""}
              onChange={(e) => setEditing({ ...editing, slug: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Category</label>
              <input
                type="text"
                value={editing.category || ""}
                onChange={(e) => setEditing({ ...editing, category: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
              />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Image URL</label>
              <input
                type="text"
                value={editing.image || ""}
                onChange={(e) => setEditing({ ...editing, image: e.target.value })}
                className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Excerpt</label>
            <textarea
              rows={2}
              value={editing.excerpt || ""}
              onChange={(e) => setEditing({ ...editing, excerpt: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
            />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Content</label>
            <textarea
              rows={12}
              value={editing.content || ""}
              onChange={(e) => setEditing({ ...editing, content: e.target.value })}
              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand font-mono"
              placeholder="Write your blog content here. HTML and markdown supported."
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={editing.published ?? true}
              onChange={(e) => setEditing({ ...editing, published: e.target.checked })}
              className="w-4 h-4 accent-brand"
            />
            <label className="text-sm">Published</label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60"
          >
            <FiSave className="w-4 h-4" />
            {saving ? "Saving…" : "Save Blog Post"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground-muted">{blogs.length} blog posts</p>
        <button
          onClick={() => setEditing({ ...emptyBlog })}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors"
        >
          <FiPlus className="w-4 h-4" />
          New Post
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-foreground-muted">Loading…</p>
      ) : blogs.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-foreground-muted mb-4">No blog posts yet.</p>
          <button
            onClick={() => setEditing({ ...emptyBlog })}
            className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors"
          >
            Create Your First Post
          </button>
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
                    {new Date(blog.createdAt).toLocaleDateString("en-IN")}
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
