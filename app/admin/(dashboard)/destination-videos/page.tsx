"use client";

import { useCallback, useEffect, useState } from "react";
import { FiSave, FiCheck } from "react-icons/fi";
import { DESTINATION_SHORT_KEYS } from "@/lib/destination-shorts-defaults";

const LABELS: Record<string, string> = {
  uk: "United Kingdom",
  usa: "United States",
  australia: "Australia",
  canada: "Canada",
  germany: "Germany",
  ireland: "Ireland",
};

export default function DestinationVideosPage() {
  const [urls, setUrls] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const load = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/destination-shorts");
    const data = await res.json();
    const next: Record<string, string> = {};
    for (const key of DESTINATION_SHORT_KEYS) {
      next[key] = typeof data.urls?.[key] === "string" ? data.urls[key] : "";
    }
    setUrls(next);
    setLoading(false);
  }, []);

  useEffect(() => {
    load();
  }, [load]);

  const save = async () => {
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await fetch("/api/admin/destination-shorts", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ urls }),
      });
      if (!res.ok) {
        const d = await res.json();
        setError(d.message || "Failed to save");
        return;
      }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
      load();
    } catch {
      setError("Network error");
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-foreground-muted">Loading…</p>;
  }

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <p className="text-sm text-foreground-muted">
        Paste a full YouTube Shorts or watch URL for each destination. Leave a field empty to use
        the built-in default link for that country.
      </p>

      <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
        {DESTINATION_SHORT_KEYS.map((key) => (
          <div key={key}>
            <label className="block text-sm font-semibold text-foreground mb-1">
              {LABELS[key] || key}
            </label>
            <input
              type="url"
              value={urls[key] ?? ""}
              onChange={(e) => setUrls((prev) => ({ ...prev, [key]: e.target.value }))}
              placeholder="https://youtube.com/shorts/…"
              className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
            />
          </div>
        ))}

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          type="button"
          onClick={save}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60"
        >
          {saved ? <FiCheck className="w-4 h-4" /> : <FiSave className="w-4 h-4" />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save videos"}
        </button>
      </div>
    </div>
  );
}
