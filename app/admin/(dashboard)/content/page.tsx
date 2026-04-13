"use client";

import { useEffect, useState, useCallback } from "react";
import { FiSave, FiCheck, FiChevronDown, FiChevronRight, FiPlus, FiTrash2 } from "react-icons/fi";
import {
  CMS_PAGE_TEMPLATES,
  type CmsPageSection,
  type CmsSectionField,
} from "@/lib/cms-page-templates";
import { mergeCmsSections } from "@/lib/cms-merge-sections";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";

interface PageContent {
  pageKey: string;
  sections: CmsPageSection[];
  updatedAt?: string;
}

async function parseJsonResponse(res: Response): Promise<Record<string, unknown>> {
  const text = await res.text();
  if (!text.trim()) return {};
  try {
    return JSON.parse(text) as Record<string, unknown>;
  } catch {
    return { _parseError: true };
  }
}

export default function ContentPage() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [loadError, setLoadError] = useState("");
  const [warning, setWarning] = useState("");
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [sections, setSections] = useState<CmsPageSection[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fetchPages = useCallback(async () => {
    setLoading(true);
    setLoadError("");
    setWarning("");
    try {
      const res = await adminFetch("/api/admin/content");
      const data = await parseJsonResponse(res);
      if (data._parseError) {
        setLoadError("Could not read the server response. Try refreshing the page.");
        setPages([]);
        return;
      }
      if (!res.ok) {
        setLoadError(
          typeof data.message === "string"
            ? data.message
            : `Could not load content (${res.status}).`
        );
        setPages((Array.isArray(data.pages) ? data.pages : []) as PageContent[]);
        return;
      }
      if (typeof data.warning === "string" && data.warning) {
        setWarning(data.warning);
      }
      setPages((Array.isArray(data.pages) ? data.pages : []) as PageContent[]);
    } catch (e) {
      if (isAbortOrTimeoutError(e)) {
        setLoadError(
          "Request timed out. Restart the dev server and try again."
        );
      } else {
        setLoadError("Network error. Check your connection and that the dev server is running.");
      }
      setPages([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPages();
  }, [fetchPages]);

  const selectPage = (pageKey: string) => {
    setSelectedPage(pageKey);
    setSaved(false);
    setError("");
    const tpl = CMS_PAGE_TEMPLATES.find((t) => t.key === pageKey);
    const defaults = tpl?.defaultSections ?? [];
    const existing = pages.find((p) => p.pageKey === pageKey);
    setSections(mergeCmsSections(defaults, existing?.sections));
    setExpanded(null);
  };

  const updateField = (sectionIdx: number, fieldIdx: number, value: string) => {
    const updated = [...sections];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      fields: updated[sectionIdx].fields.map((f, i) => (i === fieldIdx ? { ...f, value } : f)),
    };
    setSections(updated);
  };

  const addSection = () => {
    const newKey = `custom_${Date.now()}`;
    setSections([
      ...sections,
      {
        sectionKey: newKey,
        sectionLabel: "New Section",
        fields: [{ key: "content", label: "Content", value: "", type: "textarea" }],
      },
    ]);
    setExpanded(newKey);
  };

  const removeSection = (idx: number) => {
    if (!confirm("Remove this section?")) return;
    setSections(sections.filter((_, i) => i !== idx));
  };

  const addField = (sectionIdx: number) => {
    const updated = [...sections];
    updated[sectionIdx] = {
      ...updated[sectionIdx],
      fields: [
        ...updated[sectionIdx].fields,
        { key: `field_${Date.now()}`, label: "New Field", value: "", type: "text" },
      ],
    };
    setSections(updated);
  };

  const handleSave = async () => {
    if (!selectedPage) return;
    setSaving(true);
    setError("");
    setSaved(false);
    try {
      const res = await adminFetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: selectedPage, sections }),
      });
      const data = await parseJsonResponse(res);
      if (data._parseError) {
        setError("Invalid response from server. Save may have failed.");
        return;
      }
      if (!res.ok) {
        setError(
          typeof data.message === "string"
            ? data.message
            : `Save failed (${res.status}).`
        );
        return;
      }
      if (data.success === false) {
        setError(
          typeof data.message === "string" ? data.message : "Save was rejected by the server."
        );
        return;
      }
      setSaved(true);
      await fetchPages();
      setTimeout(() => setSaved(false), 3000);
    } catch (e) {
      if (isAbortOrTimeoutError(e)) {
        setError("Save timed out. Check your connection and try again.");
      } else {
        setError("Network error. Check your connection and try again.");
      }
    } finally {
      setSaving(false);
    }
  };

  if (loading) {
    return (
      <div className="py-12 text-center space-y-2">
        <p className="text-foreground-muted">Loading page content…</p>
        <p className="text-xs text-foreground-muted">If this stays here, check the browser console and dev server logs.</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {loadError ? (
        <div className="rounded-lg border border-accent/30 bg-accent-soft px-4 py-3 text-sm text-foreground" role="alert">
          {loadError}
        </div>
      ) : null}
      {warning ? (
        <div className="rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900" role="status">
          {warning}
        </div>
      ) : null}

      <p className="text-sm text-foreground-muted">
        Select a page to edit its content. Saves are stored in{" "}
        <code className="text-xs bg-page-soft px-1 rounded">data/cms/page-content.json</code>{" "}
        on the server (no database required). After you save, refresh the public page to see
        updates. JSON-type fields must stay valid JSON.
      </p>

      <div className="flex flex-wrap gap-2">
        {CMS_PAGE_TEMPLATES.map((tpl) => {
          const hasContent = pages.some((p) => p.pageKey === tpl.key);
          return (
            <button
              key={tpl.key}
              type="button"
              onClick={() => selectPage(tpl.key)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors border ${
                selectedPage === tpl.key
                  ? "bg-brand text-white border-brand"
                  : hasContent
                    ? "bg-green-50 text-green-700 border-green-200 hover:bg-green-100"
                    : "bg-surface text-foreground border-border hover:bg-page-soft"
              }`}
            >
              {tpl.label}
              {hasContent && selectedPage !== tpl.key ? <span className="ml-1 text-xs">✓</span> : null}
            </button>
          );
        })}
      </div>

      {selectedPage ? (
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              {CMS_PAGE_TEMPLATES.find((t) => t.key === selectedPage)?.label || selectedPage}
            </h2>
            <button
              type="button"
              onClick={addSection}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-page-soft rounded-lg hover:bg-border transition-colors font-medium"
            >
              <FiPlus className="w-3 h-3" /> Add Section
            </button>
          </div>

          {sections.map((section, sIdx) => (
            <div key={section.sectionKey} className="border border-border rounded-lg">
              <button
                type="button"
                onClick={() =>
                  setExpanded(expanded === section.sectionKey ? null : section.sectionKey)
                }
                className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-page-soft transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expanded === section.sectionKey ? (
                    <FiChevronDown className="w-4 h-4" />
                  ) : (
                    <FiChevronRight className="w-4 h-4" />
                  )}
                  <span className="font-semibold text-sm text-foreground">{section.sectionLabel}</span>
                  <span className="text-xs text-foreground-muted">({section.fields.length} fields)</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    removeSection(sIdx);
                  }}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  title="Remove section"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </button>

              {expanded === section.sectionKey ? (
                <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-foreground-muted">
                      Section Label
                    </label>
                    <input
                      type="text"
                      value={section.sectionLabel}
                      onChange={(e) => {
                        const updated = [...sections];
                        updated[sIdx] = { ...updated[sIdx], sectionLabel: e.target.value };
                        setSections(updated);
                      }}
                      className="w-full px-3 py-1.5 border border-border rounded-lg text-sm"
                    />
                  </div>

                  {section.fields.map((field, fIdx) => (
                    <div key={field.key}>
                      <div className="flex items-center justify-between mb-1">
                        <input
                          type="text"
                          value={field.label}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[sIdx].fields[fIdx] = { ...field, label: e.target.value };
                            setSections(updated);
                          }}
                          className="text-xs font-semibold text-foreground bg-transparent border-none p-0 focus:outline-none focus:ring-0"
                        />
                        <select
                          value={field.type}
                          onChange={(e) => {
                            const updated = [...sections];
                            updated[sIdx].fields[fIdx] = {
                              ...field,
                              type: e.target.value as CmsSectionField["type"],
                            };
                            setSections(updated);
                          }}
                          className="text-xs border border-border rounded px-1 py-0.5"
                        >
                          <option value="text">Text</option>
                          <option value="textarea">Textarea</option>
                          <option value="image">Image URL</option>
                        </select>
                      </div>
                      {field.type === "textarea" ? (
                        <textarea
                          rows={3}
                          value={field.value}
                          onChange={(e) => updateField(sIdx, fIdx, e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                        />
                      ) : (
                        <input
                          type="text"
                          value={field.value}
                          onChange={(e) => updateField(sIdx, fIdx, e.target.value)}
                          className="w-full px-3 py-2 border border-border rounded-lg text-sm focus:ring-2 focus:ring-brand"
                          placeholder={field.type === "image" ? "https://..." : ""}
                        />
                      )}
                    </div>
                  ))}

                  <button
                    type="button"
                    onClick={() => addField(sIdx)}
                    className="flex items-center gap-1 text-xs text-brand font-medium hover:underline"
                  >
                    <FiPlus className="w-3 h-3" /> Add Field
                  </button>
                </div>
              ) : null}
            </div>
          ))}

          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <button
            type="button"
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60"
          >
            {saved ? <FiCheck className="w-4 h-4" /> : <FiSave className="w-4 h-4" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Content"}
          </button>
        </div>
      ) : null}
    </div>
  );
}
