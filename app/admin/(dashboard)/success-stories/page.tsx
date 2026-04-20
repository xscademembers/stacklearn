"use client";

import { useCallback, useEffect, useState } from "react";
import { FiEdit2, FiPlus, FiSave, FiTrash2, FiX } from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";
import {
  SUCCESS_STORY_COUNTRY_OPTIONS,
  SUCCESS_STORY_COUNTRY_OTHER,
  countryFieldToSelectValue,
  resolveToCanonicalCountry,
} from "@/lib/success-story-country-options";

interface SuccessStory {
  _id: string;
  name: string;
  country: string;
  university: string;
  imageUrl: string;
  story: string;
  createdAt: string;
  updatedAt?: string;
}

function editingRecordKey(editing: Partial<SuccessStory> | null): string | null {
  if (!editing) return null;
  return typeof editing._id === "string" && editing._id ? editing._id : "__new__";
}

const emptyStory: Partial<SuccessStory> = {
  name: "",
  country: "",
  university: "",
  imageUrl: "",
  story: "",
};

export default function AdminSuccessStoriesPage() {
  const [items, setItems] = useState<SuccessStory[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<Partial<SuccessStory> | null>(null);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [listError, setListError] = useState("");
  const [countryMenu, setCountryMenu] = useState("");

  const recordKey = editingRecordKey(editing);

  useEffect(() => {
    if (recordKey === null) {
      setCountryMenu("");
      return;
    }
    if (!editing) return;
    setCountryMenu(countryFieldToSelectValue(editing.country));
    // Only re-sync when opening the editor or switching records (not on every keystroke).
    // eslint-disable-next-line react-hooks/exhaustive-deps -- intentionally omit `editing` identity
  }, [recordKey]);

  const fetchItems = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const res = await adminFetch("/api/admin/success-stories");
      const data = await res.json();
      if (!res.ok) {
        setListError(typeof data.message === "string" ? data.message : "Could not load success stories.");
        setItems([]);
        return;
      }
      setItems(data.successStories || []);
    } catch (e) {
      setListError(
        isAbortOrTimeoutError(e)
          ? "Request timed out — check MongoDB (MONGODB_URI, Atlas IP list) and restart the server."
          : "Could not load success stories."
      );
      setItems([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchItems();
  }, [fetchItems]);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const params = new URLSearchParams(window.location.search);
      if (params.get("action") === "new") setEditing({ ...emptyStory });
    }
  }, []);

  const handleSave = async () => {
    if (!editing) return;
    if (countryMenu === SUCCESS_STORY_COUNTRY_OTHER && !(editing.country || "").trim()) {
      setError('When "Other" is selected, enter the country name.');
      return;
    }
    setSaving(true);
    setError("");
    try {
      const method = editing._id ? "PUT" : "POST";
      const res = await adminFetch("/api/admin/success-stories", {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editing),
      });
      const data = await res.json().catch(() => ({}));
      if (!res.ok) {
        setError(typeof data.message === "string" ? data.message : "Failed to save");
        return;
      }
      setEditing(null);
      fetchItems();
    } catch (e) {
      setError(isAbortOrTimeoutError(e) ? "Save timed out — check MongoDB connection." : "Network error");
    } finally {
      setSaving(false);
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this success story?")) return;
    try {
      await adminFetch("/api/admin/success-stories", {
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
    const showOtherCountry = countryMenu === SUCCESS_STORY_COUNTRY_OTHER;

    return (
      <div className="max-w-2xl mx-auto space-y-6">
        <div className="flex items-center justify-between gap-4">
          <h2 className="text-xl font-bold text-foreground">
            {editing._id ? "Edit success story" : "New success story"}
          </h2>
          <button
            type="button"
            onClick={() => setEditing(null)}
            className="p-2 rounded-lg hover:bg-page-soft transition-colors motion-reduce:transition-none"
            aria-label="Close editor"
          >
            <FiX className="w-5 h-5" />
          </button>
        </div>

        <section className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="sm:col-span-2">
              <label htmlFor="ss-name" className="block text-sm font-semibold mb-2">
                Student name <span className="text-red-600">*</span>
              </label>
              <input
                id="ss-name"
                type="text"
                value={editing.name || ""}
                onChange={(e) => setEditing({ ...editing, name: e.target.value })}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                autoComplete="name"
              />
            </div>
            <div>
              <label htmlFor="ss-country" className="block text-sm font-semibold mb-2">
                Country
              </label>
              <select
                id="ss-country"
                value={countryMenu}
                onChange={(e) => {
                  const v = e.target.value;
                  if (v === "") {
                    setCountryMenu("");
                    setEditing({ ...editing, country: "" });
                    return;
                  }
                  if (v === SUCCESS_STORY_COUNTRY_OTHER) {
                    setCountryMenu(SUCCESS_STORY_COUNTRY_OTHER);
                    const prev = (editing.country || "").trim();
                    const canon = resolveToCanonicalCountry(prev);
                    setEditing({ ...editing, country: canon ? "" : prev });
                    return;
                  }
                  setCountryMenu(v);
                  setEditing({ ...editing, country: v });
                }}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
              >
                <option value="">Select country…</option>
                {SUCCESS_STORY_COUNTRY_OPTIONS.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
                <option value={SUCCESS_STORY_COUNTRY_OTHER}>Other (type below)</option>
              </select>
              {showOtherCountry ? (
                <div className="mt-3">
                  <label htmlFor="ss-country-other" className="block text-xs font-semibold text-foreground-muted mb-2">
                    Country name (custom)
                  </label>
                  <input
                    id="ss-country-other"
                    type="text"
                    value={editing.country || ""}
                    onChange={(e) => setEditing({ ...editing, country: e.target.value })}
                    className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                    placeholder="e.g. France, UAE"
                    autoComplete="off"
                  />
                </div>
              ) : null}
              <p className="mt-2 text-xs text-foreground-muted leading-relaxed">
                Pick a country so this story appears on the matching destination page. Use &ldquo;Other&rdquo; only if
                the study destination is not in the list.
              </p>
            </div>
            <div>
              <label htmlFor="ss-university" className="block text-sm font-semibold mb-2">
                University
              </label>
              <input
                id="ss-university"
                type="text"
                value={editing.university || ""}
                onChange={(e) => setEditing({ ...editing, university: e.target.value })}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
              />
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ss-image" className="block text-sm font-semibold mb-2">
                Photo URL
              </label>
              <input
                id="ss-image"
                type="url"
                inputMode="url"
                value={editing.imageUrl || ""}
                onChange={(e) => setEditing({ ...editing, imageUrl: e.target.value })}
                className="w-full px-4 h-11 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface"
                placeholder="https://example.com/photo.jpg"
              />
              <p className="mt-2 text-xs text-foreground-muted">
                Paste a direct image link. Only http(s) URLs are stored.
              </p>
            </div>
            <div className="sm:col-span-2">
              <label htmlFor="ss-story" className="block text-sm font-semibold mb-2">
                Story (about two lines) <span className="text-red-600">*</span>
              </label>
              <textarea
                id="ss-story"
                rows={2}
                maxLength={400}
                value={editing.story || ""}
                onChange={(e) => setEditing({ ...editing, story: e.target.value })}
                className="w-full px-4 py-3 min-h-[88px] border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand bg-surface resize-y"
              />
              <p className="mt-2 text-xs text-foreground-muted">{(editing.story || "").length}/400 characters</p>
            </div>
          </div>

          {editing.imageUrl && /^https?:\/\//i.test(editing.imageUrl.trim()) ? (
            <figure className="rounded-xl border border-border bg-page-soft overflow-hidden p-4">
              <figcaption className="text-xs font-semibold text-foreground-muted mb-3">Preview</figcaption>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={editing.imageUrl.trim()}
                alt=""
                className="w-full max-h-56 object-contain rounded-lg bg-surface"
              />
            </figure>
          ) : null}

          {error ? (
            <p className="text-sm text-red-600" role="alert">
              {error}
            </p>
          ) : null}

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={handleSave}
              disabled={saving}
              className="flex items-center gap-2 px-6 h-11 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60 motion-reduce:transition-none"
            >
              <FiSave className="w-4 h-4" aria-hidden />
              {saving ? "Saving…" : "Save story"}
            </button>
            <button
              type="button"
              onClick={() => setEditing(null)}
              className="px-6 h-11 border border-border rounded-lg font-medium hover:bg-page-soft transition-colors motion-reduce:transition-none"
            >
              Cancel
            </button>
          </div>
        </section>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {listError ? (
        <div
          className="rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {listError}
        </div>
      ) : null}

      <div className="flex flex-wrap items-center justify-between gap-4">
        <p className="text-sm text-foreground-muted">{items.length} success stor{items.length === 1 ? "y" : "ies"}</p>
        <button
          type="button"
          onClick={() => setEditing({ ...emptyStory })}
          className="flex items-center gap-2 px-4 h-10 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors motion-reduce:transition-none"
        >
          <FiPlus className="w-4 h-4" aria-hidden />
          New story
        </button>
      </div>

      {loading ? (
        <p className="text-center py-12 text-foreground-muted">Loading…</p>
      ) : items.length === 0 ? (
        <div className="text-center py-16 bg-surface rounded-xl border border-border">
          <p className="text-foreground-muted mb-4">No success stories yet.</p>
          <button
            type="button"
            onClick={() => setEditing({ ...emptyStory })}
            className="px-4 h-10 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors motion-reduce:transition-none"
          >
            Add first story
          </button>
        </div>
      ) : (
        <ul className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3 list-none p-0 m-0">
          {items.map((s) => (
            <li key={s._id}>
              <article className="bg-surface rounded-xl border border-border p-5 h-full flex flex-col gap-4">
                <div className="flex gap-4">
                  {s.imageUrl ? (
                    <div className="w-20 h-20 rounded-lg border border-border overflow-hidden flex-shrink-0 bg-page-soft">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                    </div>
                  ) : (
                    <div
                      className="w-20 h-20 rounded-lg border border-dashed border-border flex-shrink-0 flex items-center justify-center text-xs text-foreground-muted text-center px-1"
                      aria-hidden
                    >
                      No photo
                    </div>
                  )}
                  <div className="min-w-0 flex-1">
                    <h3 className="font-semibold text-foreground text-sm truncate">{s.name}</h3>
                    <p className="text-xs text-foreground-muted mt-1 line-clamp-2">
                      {[s.university, s.country].filter(Boolean).join(" · ") || "—"}
                    </p>
                  </div>
                </div>
                <blockquote className="text-sm text-foreground leading-relaxed line-clamp-3 m-0 border-l-2 border-brand pl-3">
                  {s.story}
                </blockquote>
                <div className="flex items-center gap-2 mt-auto pt-2 border-t border-border">
                  <button
                    type="button"
                    onClick={() => setEditing(s)}
                    className="p-2 rounded-lg hover:bg-page-soft transition-colors motion-reduce:transition-none text-foreground-muted hover:text-brand"
                    title="Edit"
                  >
                    <FiEdit2 className="w-4 h-4" aria-hidden />
                    <span className="sr-only">Edit {s.name}</span>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleDelete(s._id)}
                    className="p-2 rounded-lg hover:bg-page-soft transition-colors motion-reduce:transition-none text-foreground-muted hover:text-red-500"
                    title="Delete"
                  >
                    <FiTrash2 className="w-4 h-4" aria-hidden />
                    <span className="sr-only">Delete {s.name}</span>
                  </button>
                </div>
              </article>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
