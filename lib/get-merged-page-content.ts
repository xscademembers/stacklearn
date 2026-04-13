import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import {
  CMS_PAGE_TEMPLATES,
  type CmsPageSection,
} from "@/lib/cms-page-templates";
import { mergeCmsSections } from "@/lib/cms-merge-sections";
import { getPageSectionsFromFile } from "@/lib/cms-file-store";

function cloneDefaults(defaults: CmsPageSection[]): CmsPageSection[] {
  return JSON.parse(JSON.stringify(defaults)) as CmsPageSection[];
}

/**
 * Merged CMS content for a page: template defaults + saved overrides.
 * Saved data is read from `data/cms/page-content.json` first; if a page has no file entry,
 * MongoDB is used only when configured (legacy). No database is required for the dashboard to work.
 */
export async function getMergedPageContent(
  pageKey: string
): Promise<CmsPageSection[]> {
  const template = CMS_PAGE_TEMPLATES.find((t) => t.key === pageKey);
  if (!template) return [];

  const defaults = template.defaultSections;

  try {
    const fromFile = await getPageSectionsFromFile(pageKey);
    if (fromFile?.length) {
      return mergeCmsSections(defaults, fromFile);
    }
  } catch {
    /* fall through */
  }

  if (isMongoConfigured()) {
    try {
      const db = await getDatabase();
      const doc = await db
        .collection(COLLECTIONS.PAGE_CONTENT)
        .findOne({ pageKey });
      const saved = doc?.sections as CmsPageSection[] | undefined;
      return mergeCmsSections(defaults, saved);
    } catch {
      return cloneDefaults(defaults);
    }
  }

  return cloneDefaults(defaults);
}
