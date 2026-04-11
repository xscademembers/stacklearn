"use client";

import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX } from "react-icons/fi";

interface Course {
  _id: string;
  title: string;
  slug: string;
  shortTitle: string;
  type: string;
  tagline: string;
  duration: string;
  maxStudents: number;
  heroImage: string;
  cardDescription: string;
  keyHighlights: string[];
  whoCanApply: string[];
  careerRoles: string[];
  published: boolean;
  createdAt: string;
}

const emptyCourse: Partial<Course> = {
  title: "", slug: "", shortTitle: "", type: "technical", tagline: "", duration: "",
  maxStudents: 20, heroImage: "", cardDescription: "", keyHighlights: [],
  whoCanApply: [], careerRoles: [], published: true,
};

export default function CoursesPage() {
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Course> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [filter, setFilter] = useState("all");

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/courses");
    const data = await res.json();
    setCourses(data.courses || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchCourses(); }, [fetchCourses]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "new") setEditing({ ...emptyCourse });
    }
  }, []);

  const autoSlug = (t: string) => t.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const method = editing._id ? "PUT" : "POST";
      const res = await fetch("/api/admin/courses", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) { const d = await res.json(); setError(d.message || "Failed to save"); return; }
      setEditing(null);
      fetchCourses();
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this course?")) return;
    await fetch("/api/admin/courses", {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id }),
    });
    fetchCourses();
  };

  const listToText = (arr?: string[]) => (arr || []).join("\n");
  const textToList = (text: string) => text.split("\n").map((s) => s.trim()).filter(Boolean);

  const filtered = filter === "all" ? courses : courses.filter((c) => c.type === filter);

  if (editing) {
    return (
      <div className="max-w-3xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">{editing._id ? "Edit Course" : "New Course"}</h2>
          <button onClick={() => setEditing(null)} className="p-2 hover:bg-page-soft rounded-lg"><FiX className="w-5 h-5" /></button>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Title *</label>
              <input type="text" value={editing.title || ""} onChange={(e) => setEditing({ ...editing, title: e.target.value, slug: editing._id ? editing.slug : autoSlug(e.target.value) })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Slug *</label>
              <input type="text" value={editing.slug || ""} onChange={(e) => setEditing({ ...editing, slug: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Type *</label>
              <select value={editing.type || "technical"} onChange={(e) => setEditing({ ...editing, type: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm">
                <option value="technical">Technical</option>
                <option value="non-technical">Non-Technical</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Duration</label>
              <input type="text" value={editing.duration || ""} onChange={(e) => setEditing({ ...editing, duration: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm" placeholder="12 Weeks" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Max Students</label>
              <input type="number" value={editing.maxStudents ?? ""} onChange={(e) => setEditing({ ...editing, maxStudents: parseInt(e.target.value) || 0 })} className="w-full px-4 py-2 border border-border rounded-lg text-sm" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Short Title</label>
            <input type="text" value={editing.shortTitle || ""} onChange={(e) => setEditing({ ...editing, shortTitle: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Tagline</label>
            <input type="text" value={editing.tagline || ""} onChange={(e) => setEditing({ ...editing, tagline: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Hero Image URL</label>
            <input type="text" value={editing.heroImage || ""} onChange={(e) => setEditing({ ...editing, heroImage: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Card Description</label>
            <textarea rows={3} value={editing.cardDescription || ""} onChange={(e) => setEditing({ ...editing, cardDescription: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Key Highlights (one per line)</label>
            <textarea rows={4} value={listToText(editing.keyHighlights)} onChange={(e) => setEditing({ ...editing, keyHighlights: textToList(e.target.value) })} className="w-full px-4 py-2 border border-border rounded-lg text-sm font-mono" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Who Can Apply (one per line)</label>
            <textarea rows={3} value={listToText(editing.whoCanApply)} onChange={(e) => setEditing({ ...editing, whoCanApply: textToList(e.target.value) })} className="w-full px-4 py-2 border border-border rounded-lg text-sm font-mono" />
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Career Roles (one per line)</label>
            <textarea rows={3} value={listToText(editing.careerRoles)} onChange={(e) => setEditing({ ...editing, careerRoles: textToList(e.target.value) })} className="w-full px-4 py-2 border border-border rounded-lg text-sm font-mono" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={editing.published ?? true} onChange={(e) => setEditing({ ...editing, published: e.target.checked })} className="w-4 h-4 accent-brand" />
            <label className="text-sm">Published</label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60">
            <FiSave className="w-4 h-4" />{saving ? "Saving…" : "Save Course"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex gap-2">
          {["all", "technical", "non-technical"].map((f) => (
            <button key={f} onClick={() => setFilter(f)} className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${filter === f ? "bg-brand text-white" : "bg-page-soft text-foreground hover:bg-border"}`}>
              {f === "all" ? "All" : f === "technical" ? "Technical" : "Non-Technical"}
            </button>
          ))}
        </div>
        <button onClick={() => setEditing({ ...emptyCourse })} className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors">
          <FiPlus className="w-4 h-4" />New Course
        </button>
      </div>
      <p className="text-sm text-foreground-muted">{filtered.length} courses</p>
      {loading ? (
        <p className="text-center py-12 text-foreground-muted">Loading…</p>
      ) : filtered.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-foreground-muted mb-4">No courses found.</p>
          <button onClick={() => setEditing({ ...emptyCourse })} className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium">Add First Course</button>
        </div>
      ) : (
        <div className="bg-surface rounded-xl border border-border overflow-hidden">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border bg-page-soft">
                <th className="text-left px-4 py-3 font-semibold">Title</th>
                <th className="text-left px-4 py-3 font-semibold">Type</th>
                <th className="text-left px-4 py-3 font-semibold">Duration</th>
                <th className="text-left px-4 py-3 font-semibold">Status</th>
                <th className="text-right px-4 py-3 font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((c) => (
                <tr key={c._id} className="border-b border-border hover:bg-page-soft transition-colors">
                  <td className="px-4 py-3 font-medium text-foreground">{c.title}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${c.type === "technical" ? "bg-blue-100 text-blue-700" : "bg-orange-100 text-orange-700"}`}>{c.type}</span></td>
                  <td className="px-4 py-3 text-foreground-muted">{c.duration || "—"}</td>
                  <td className="px-4 py-3"><span className={`text-xs px-2 py-1 rounded-full font-medium ${c.published ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-600"}`}>{c.published ? "Published" : "Draft"}</span></td>
                  <td className="px-4 py-3 text-right">
                    <div className="flex justify-end gap-2">
                      <button onClick={() => setEditing(c)} className="p-2 hover:bg-page-soft rounded-lg text-foreground-muted hover:text-brand" title="Edit"><FiEdit2 className="w-4 h-4" /></button>
                      <button onClick={() => handleDelete(c._id)} className="p-2 hover:bg-page-soft rounded-lg text-foreground-muted hover:text-red-500" title="Delete"><FiTrash2 className="w-4 h-4" /></button>
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
