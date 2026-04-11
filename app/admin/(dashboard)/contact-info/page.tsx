"use client";

import { useEffect, useState, useCallback } from "react";
import { FiSave, FiCheck } from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";

interface ContactSettings {
  phone: string;
  phone2: string;
  email: string;
  whatsapp: string;
  address: string;
  officeHours: string;
  instagram: string;
  facebook: string;
  linkedin: string;
  youtube: string;
  mapUrl: string;
}

const FALLBACK_SETTINGS: ContactSettings = {
  phone: "+91-9606031842",
  phone2: "",
  email: "info@stacklearn.com",
  whatsapp: "919606031840",
  address:
    "Stack Learn Overseas Consultancy No-374, 2nd floor 4th cross, 60 Feet Rd, above amogha child health care, Amruthahalli, Bengaluru, Karnataka-560092",
  officeHours: "Mon–Sat | 10:00 AM – 5:00 PM",
  instagram: "https://instagram.com/stacklearn",
  facebook: "https://facebook.com/stacklearn",
  linkedin: "https://linkedin.com/company/stacklearn",
  youtube: "https://youtube.com/@stacklearn",
  mapUrl: "https://maps.google.com",
};

export default function ContactInfoPage() {
  const [settings, setSettings] = useState<ContactSettings | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");
  const [loadError, setLoadError] = useState("");

  const fetchSettings = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    try {
      const res = await adminFetch("/api/admin/settings");
      const data = await res.json();
      if (!res.ok) {
        setLoadError(typeof data.message === "string" ? data.message : "Could not load settings.");
        setSettings(FALLBACK_SETTINGS);
        return;
      }
      setSettings(data.settings as ContactSettings);
    } catch (e) {
      setLoadError(
        isAbortOrTimeoutError(e)
          ? "Request timed out — check MongoDB (MONGODB_URI, Atlas IP list)."
          : "Could not load settings."
      );
      setSettings(FALLBACK_SETTINGS);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => { fetchSettings(); }, [fetchSettings]);

  const handleSave = async () => {
    if (!settings) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await adminFetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(settings),
      });
      if (!res.ok) { setError("Failed to save"); return; }
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      setError(
        isAbortOrTimeoutError(e) ? "Save timed out — check MongoDB connection." : "Network error"
      );
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return <p className="text-center py-12 text-foreground-muted">Loading…</p>;
  }
  if (!settings) {
    return <p className="text-center py-12 text-foreground-muted">No settings loaded.</p>;
  }

  const field = (label: string, key: keyof ContactSettings, type = "text", rows?: number) => (
    <div key={key}>
      <label className="block text-sm font-semibold text-foreground mb-1">{label}</label>
      {rows ? (
        <textarea
          rows={rows}
          value={settings[key]}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
          className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
        />
      ) : (
        <input
          type={type}
          value={settings[key]}
          onChange={(e) => setSettings({ ...settings, [key]: e.target.value })}
          className="w-full px-4 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
        />
      )}
    </div>
  );

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      {loadError ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950" role="alert">
          {loadError} You can still edit below; saving requires a working database connection.
        </div>
      ) : null}
      <div className="bg-surface rounded-xl border border-border p-6 space-y-5">
        <h2 className="text-lg font-bold text-foreground">Contact Information</h2>
        <p className="text-sm text-foreground-muted">
          These details appear in the footer, contact page, and other places across the site.
        </p>

        <div className="grid gap-4 sm:grid-cols-2">
          {field("Primary Phone", "phone")}
          {field("Secondary Phone", "phone2")}
          {field("Email", "email", "email")}
          {field("WhatsApp Number (with country code, no +)", "whatsapp")}
        </div>
        {field("Office Address", "address", "text", 3)}
        {field("Office Hours", "officeHours")}

        <hr className="border-border" />
        <h3 className="font-bold text-foreground">Social Links</h3>
        <div className="grid gap-4 sm:grid-cols-2">
          {field("Instagram URL", "instagram")}
          {field("Facebook URL", "facebook")}
          {field("LinkedIn URL", "linkedin")}
          {field("YouTube URL", "youtube")}
          {field("Google Maps URL", "mapUrl")}
        </div>

        {error && <p className="text-sm text-red-600">{error}</p>}
        <button
          onClick={handleSave}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60"
        >
          {saved ? <FiCheck className="w-4 h-4" /> : <FiSave className="w-4 h-4" />}
          {saving ? "Saving…" : saved ? "Saved!" : "Save Changes"}
        </button>
      </div>
    </div>
  );
}
