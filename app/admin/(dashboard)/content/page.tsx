"use client";

import { useEffect, useState, useCallback } from "react";
import { FiSave, FiCheck, FiChevronDown, FiChevronRight, FiPlus, FiTrash2 } from "react-icons/fi";

interface SectionField {
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "image";
}

interface PageSection {
  sectionKey: string;
  sectionLabel: string;
  fields: SectionField[];
}

interface PageContent {
  pageKey: string;
  sections: PageSection[];
  updatedAt?: string;
}

const PAGE_TEMPLATES: { key: string; label: string; defaultSections: PageSection[] }[] = [
  {
    key: "home",
    label: "Home Page",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Main Heading", value: "", type: "text" },
        { key: "subheading", label: "Sub Heading", value: "", type: "text" },
        { key: "description", label: "Description", value: "", type: "textarea" },
        { key: "ctaText", label: "CTA Button Text", value: "", type: "text" },
        { key: "heroImage", label: "Hero Background Image URL", value: "", type: "image" },
      ]},
      { sectionKey: "stats", sectionLabel: "Statistics Bar", fields: [
        { key: "stat1Label", label: "Stat 1 Label", value: "", type: "text" },
        { key: "stat1Value", label: "Stat 1 Value", value: "", type: "text" },
        { key: "stat2Label", label: "Stat 2 Label", value: "", type: "text" },
        { key: "stat2Value", label: "Stat 2 Value", value: "", type: "text" },
        { key: "stat3Label", label: "Stat 3 Label", value: "", type: "text" },
        { key: "stat3Value", label: "Stat 3 Value", value: "", type: "text" },
      ]},
    ],
  },
  {
    key: "about",
    label: "About Us",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "description", label: "Description", value: "", type: "textarea" },
        { key: "heroImage", label: "Hero Image URL", value: "", type: "image" },
      ]},
      { sectionKey: "mission", sectionLabel: "Mission & Vision", fields: [
        { key: "mission", label: "Mission Statement", value: "", type: "textarea" },
        { key: "vision", label: "Vision Statement", value: "", type: "textarea" },
      ]},
    ],
  },
  {
    key: "destinations",
    label: "Destinations Page",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "subheading", label: "Sub Heading", value: "", type: "text" },
      ]},
    ],
  },
  {
    key: "services",
    label: "Services Page",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "description", label: "Description", value: "", type: "textarea" },
      ]},
    ],
  },
  {
    key: "trainings",
    label: "Trainings Page",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "description", label: "Description", value: "", type: "textarea" },
      ]},
    ],
  },
  {
    key: "scholarships",
    label: "Scholarships Page",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "description", label: "Description", value: "", type: "textarea" },
      ]},
    ],
  },
  {
    key: "contact",
    label: "Contact Page",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "subheading", label: "Sub Heading", value: "", type: "text" },
      ]},
    ],
  },
  {
    key: "test-prep",
    label: "Test Preparation",
    defaultSections: [
      { sectionKey: "hero", sectionLabel: "Hero Section", fields: [
        { key: "heading", label: "Page Heading", value: "", type: "text" },
        { key: "description", label: "Description", value: "", type: "textarea" },
      ]},
    ],
  },
];

export default function ContentPage() {
  const [pages, setPages] = useState<PageContent[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedPage, setSelectedPage] = useState<string | null>(null);
  const [sections, setSections] = useState<PageSection[]>([]);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState("");

  const fetchPages = useCallback(async () => {
    setLoading(true);
    const res = await fetch("/api/admin/content");
    const data = await res.json();
    setPages(data.pages || []);
    setLoading(false);
  }, []);

  useEffect(() => { fetchPages(); }, [fetchPages]);

  const selectPage = (pageKey: string) => {
    setSelectedPage(pageKey);
    setSaved(false);
    setError("");
    const existing = pages.find((p) => p.pageKey === pageKey);
    if (existing) {
      setSections(existing.sections);
    } else {
      const tpl = PAGE_TEMPLATES.find((t) => t.key === pageKey);
      setSections(tpl ? tpl.defaultSections : []);
    }
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
      const res = await fetch("/api/admin/content", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pageKey: selectedPage, sections }),
      });
      if (!res.ok) { setError("Failed to save"); return; }
      setSaved(true);
      fetchPages();
      setTimeout(() => setSaved(false), 3000);
    } catch { setError("Network error"); } finally { setSaving(false); }
  };

  if (loading) return <p className="text-center py-12 text-foreground-muted">Loading…</p>;

  return (
    <div className="space-y-6">
      <p className="text-sm text-foreground-muted">
        Select a page to edit its content. Changes here let non-technical users update
        headings, descriptions, images, and text across the site.
      </p>

      {/* Page selector */}
      <div className="flex flex-wrap gap-2">
        {PAGE_TEMPLATES.map((tpl) => {
          const hasContent = pages.some((p) => p.pageKey === tpl.key);
          return (
            <button
              key={tpl.key}
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
              {hasContent && selectedPage !== tpl.key && <span className="ml-1 text-xs">✓</span>}
            </button>
          );
        })}
      </div>

      {/* Editor */}
      {selectedPage && (
        <div className="bg-surface rounded-xl border border-border p-6 space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-lg font-bold text-foreground">
              {PAGE_TEMPLATES.find((t) => t.key === selectedPage)?.label || selectedPage}
            </h2>
            <button
              onClick={addSection}
              className="flex items-center gap-1 px-3 py-1 text-xs bg-page-soft rounded-lg hover:bg-border transition-colors font-medium"
            >
              <FiPlus className="w-3 h-3" /> Add Section
            </button>
          </div>

          {sections.map((section, sIdx) => (
            <div key={section.sectionKey} className="border border-border rounded-lg">
              <button
                onClick={() => setExpanded(expanded === section.sectionKey ? null : section.sectionKey)}
                className="flex items-center justify-between w-full px-4 py-3 text-left hover:bg-page-soft transition-colors"
              >
                <div className="flex items-center gap-2">
                  {expanded === section.sectionKey ? <FiChevronDown className="w-4 h-4" /> : <FiChevronRight className="w-4 h-4" />}
                  <span className="font-semibold text-sm text-foreground">{section.sectionLabel}</span>
                  <span className="text-xs text-foreground-muted">({section.fields.length} fields)</span>
                </div>
                <button
                  onClick={(e) => { e.stopPropagation(); removeSection(sIdx); }}
                  className="p-1 text-red-400 hover:text-red-600 transition-colors"
                  title="Remove section"
                >
                  <FiTrash2 className="w-4 h-4" />
                </button>
              </button>

              {expanded === section.sectionKey && (
                <div className="px-4 pb-4 space-y-3 border-t border-border pt-3">
                  <div>
                    <label className="block text-xs font-semibold mb-1 text-foreground-muted">Section Label</label>
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
                            updated[sIdx].fields[fIdx] = { ...field, type: e.target.value as SectionField["type"] };
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
                    onClick={() => addField(sIdx)}
                    className="flex items-center gap-1 text-xs text-brand font-medium hover:underline"
                  >
                    <FiPlus className="w-3 h-3" /> Add Field
                  </button>
                </div>
              )}
            </div>
          ))}

          {error && <p className="text-sm text-red-600">{error}</p>}
          <button
            onClick={handleSave}
            disabled={saving}
            className="flex items-center gap-2 px-6 py-2 bg-brand text-white rounded-lg font-medium hover:bg-brand-strong transition-colors disabled:opacity-60"
          >
            {saved ? <FiCheck className="w-4 h-4" /> : <FiSave className="w-4 h-4" />}
            {saving ? "Saving…" : saved ? "Saved!" : "Save Content"}
          </button>
        </div>
      )}
    </div>
  );
}
