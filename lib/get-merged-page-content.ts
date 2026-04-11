import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import {
  CMS_PAGE_TEMPLATES,
  type CmsPageSection,
} from "@/lib/cms-page-templates";
import { mergeCmsSections } from "@/lib/cms-merge-sections";

export async function getMergedPageContent(
  pageKey: string
): Promise<CmsPageSection[]> {
  const template = CMS_PAGE_TEMPLATES.find((t) => t.key === pageKey);
  if (!template) return [];

  const defaults = template.defaultSections;
  if (!isMongoConfigured()) {
    return JSON.parse(JSON.stringify(defaults)) as CmsPageSection[];
  }

  try {
    const db = await getDatabase();
    const doc = await db
      .collection(COLLECTIONS.PAGE_CONTENT)
      .findOne({ pageKey });
    const saved = doc?.sections as CmsPageSection[] | undefined;
    return mergeCmsSections(defaults, saved);
  } catch {
    return JSON.parse(JSON.stringify(defaults)) as CmsPageSection[];
  }
}
