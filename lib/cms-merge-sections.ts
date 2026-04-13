import type { CmsPageSection } from "@/lib/cms-page-templates";

function cloneSections(sections: CmsPageSection[]): CmsPageSection[] {
  return JSON.parse(JSON.stringify(sections)) as CmsPageSection[];
}

/** Merge saved CMS sections onto template defaults (admin editor + public site). */
export function mergeCmsSections(
  templateSections: CmsPageSection[],
  savedSections: CmsPageSection[] | undefined | null
): CmsPageSection[] {
  if (!savedSections?.length) return cloneSections(templateSections);

  const savedMap = new Map(savedSections.map((s) => [s.sectionKey, s]));
  const merged: CmsPageSection[] = templateSections.map((template) => {
    const saved = savedMap.get(template.sectionKey);
    if (!saved) return { ...template, fields: template.fields.map((f) => ({ ...f })) };

    const savedFieldMap = new Map(saved.fields.map((f) => [f.key, f]));
    const mergedFields = template.fields.map((tf) => {
      const sf = savedFieldMap.get(tf.key);
      return sf ? { ...tf, ...sf, value: sf.value ?? tf.value } : { ...tf };
    });
    for (const sf of saved.fields) {
      if (!mergedFields.some((f) => f.key === sf.key)) {
        mergedFields.push({ ...sf });
      }
    }
    return {
      sectionKey: template.sectionKey,
      sectionLabel: saved.sectionLabel || template.sectionLabel,
      fields: mergedFields,
    };
  });

  const templateKeys = new Set(templateSections.map((s) => s.sectionKey));
  for (const s of savedSections) {
    if (!templateKeys.has(s.sectionKey)) {
      merged.push(JSON.parse(JSON.stringify(s)) as CmsPageSection);
    }
  }
  return merged;
}

export function getCmsField(
  sections: CmsPageSection[],
  sectionKey: string,
  fieldKey: string
): string {
  const sec = sections.find((s) => s.sectionKey === sectionKey);
  const f = sec?.fields.find((x) => x.key === fieldKey);
  return (f?.value ?? "").trim();
}

/** Parse JSON from a CMS textarea; invalid or empty values fall back to defaults. */
export function parseCmsJson<T>(raw: string, fallback: T): T {
  const t = raw?.trim();
  if (!t) return fallback;
  try {
    return JSON.parse(t) as T;
  } catch {
    return fallback;
  }
}
