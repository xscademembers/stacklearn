"use client";

import { useEffect, useState, useCallback } from "react";
import { FiPlus, FiEdit2, FiTrash2, FiSave, FiX, FiEye, FiEyeOff } from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";

interface Testimonial {
  _id: string;
  name: string;
  country: string;
  university: string;
  course: string;
  quote: string;
  image: string;
  year: string;
  visible: boolean;
  createdAt: string;
}

const emptyTestimonial = {
  name: "", country: "", university: "", course: "", quote: "", image: "", year: "", visible: true,
};

export default function TestimonialsPage() {
  const [items, setItems] = useState<Testimonial[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<Testimonial> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const res = await adminFetch("/api/admin/testimonials");
      const data = await res.json();
      if (!res.ok) {
        setListError(typeof data.message === "string" ? data.message : "Could not load testimonials.");
        setItems([]);
        return;
      }
      setItems(data.testimonials || []);
    } catch (e) {
      setListError(
        isAbortOrTimeoutError(e)
          ? "Request timed out — check MongoDB connection."
          : "Could not load testimonials."
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchItems(); }, [fetchItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "new") setEditing({ ...emptyTestimonial });
    }
  }, []);

  const toggleVisibility = async (item: Testimonial) => {
    try {
      await adminFetch("/api/admin/testimonials", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ _id: item._id, visible: !item.visible }),
      });
    } catch {
      setListError("Could not update visibility.");
    }
    fetchItems();
  };

  const handleSave = async () => {
    if (!editing) return;
    setSaving(true);
    setError("");
    try {
      const method = editing._id ? "PUT" : "POST";
      const res = await adminFetch("/api/admin/testimonials", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      if (!res.ok) { setError("Failed to save"); return; }
      setEditing(null);
      fetchItems();
    } catch (e) {
      setError(isAbortOrTimeoutError(e) ? "Save timed out — check MongoDB." : "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this testimonial?")) return;
    try {
      await adminFetch("/api/admin/testimonials", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id }),
      });
    } catch {
      setListError("Delete failed or timed out.");
    }
    fetchItems();
  };

  if (editing) {
    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between">
          <h2 className="text-xl font-bold text-foreground">
            {editing._id ? "Edit Testimonial" : "New Testimonial"}
          </h2>
          <button onClick={() => setEditing(null)} className="p-2 hover:bg-page-soft rounded-lg"><FiX className="w-5 h-5" /></button>
        </div>
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Student Name *</label>
              <input type="text" value={editing.name || ""} onChange={(e) => setEditing({ ...editing, name: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Year</label>
              <input type="text" value={editing.year || ""} onChange={(e) => setEditing({ ...editing, year: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" placeholder="2025" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Country</label>
              <input type="text" value={editing.country || ""} onChange={(e) => setEditing({ ...editing, country: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">University</label>
              <input type="text" value={editing.university || ""} onChange={(e) => setEditing({ ...editing, university: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold mb-1">Course</label>
              <input type="text" value={editing.course || ""} onChange={(e) => setEditing({ ...editing, course: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
            <div>
              <label className="block text-sm font-semibold mb-1">Image URL</label>
              <input type="text" value={editing.image || ""} onChange={(e) => setEditing({ ...editing, image: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-semibold mb-1">Quote / Testimonial *</label>
            <textarea rows={4} value={editing.quote || ""} onChange={(e) => setEditing({ ...editing, quote: e.target.value })} className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand" />
          </div>
          <div className="flex items-center gap-2">
            <input type="checkbox" checked={editing.visible ?? true} onChange={(e) => setEditing({ ...editing, visible: e.target.checked })} className="w-4 h-4 accent-brand" />
            <label className="text-sm">Visible on website</label>
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <button onClick={handleSave} disabled={saving} className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60">
            <FiSave className="w-4 h-4" />{saving ? "Saving…" : "Save Testimonial"}
          </button>
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
        <p className="text-sm text-foreground-muted">{items.length} testimonials</p>
        <button onClick={() => setEditing({ ...emptyTestimonial })} className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors">
          <FiPlus className="w-4 h-4" />New Testimonial
        </button>
      </div>
      {loading ? (
        <p className="text-center py-12 text-foreground-muted">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-foreground-muted mb-4">No testimonials yet.</p>
          <button onClick={() => setEditing({ ...emptyTestimonial })} className="px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium">Add First Testimonial</button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {items.map((t) => (
            <div key={t._id} className={`bg-surface rounded-xl border p-5 ${t.visible ? "border-border" : "border-dashed border-gray-300 opacity-60"}`}>
              <p className="text-sm text-foreground italic mb-3">&ldquo;{t.quote}&rdquo;</p>
              <p className="font-semibold text-foreground text-sm">{t.name}</p>
              <p className="text-xs text-foreground-muted">{[t.course, t.university, t.country].filter(Boolean).join(" · ")}</p>
              {t.year && <p className="text-xs text-foreground-muted mt-1">Class of {t.year}</p>}
              <div className="flex items-center gap-2 mt-4 pt-3 border-t border-border">
                <button onClick={() => toggleVisibility(t)} className="p-2 hover:bg-page-soft rounded-lg transition-colors" title={t.visible ? "Hide" : "Show"}>
                  {t.visible ? <FiEye className="w-4 h-4 text-brand" /> : <FiEyeOff className="w-4 h-4 text-gray-400" />}
                </button>
                <button onClick={() => setEditing(t)} className="p-2 hover:bg-page-soft rounded-lg transition-colors" title="Edit"><FiEdit2 className="w-4 h-4" /></button>
                <button onClick={() => handleDelete(t._id)} className="p-2 hover:bg-page-soft rounded-lg transition-colors text-red-400" title="Delete"><FiTrash2 className="w-4 h-4" /></button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
