import { getDatabase, COLLECTIONS, isMongoConfigured } from "@/lib/mongodb";
import {
  CMS_PAGE_TEMPLATES,
  type CmsPageSection,
} from "@/lib/cms-page-templates";
import { mergeCmsSections } from "@/lib/cms-merge-sections";
import { getPageSectionsFromCmsStore } from "@/lib/cms-page-store";

function cloneDefaults(defaults: CmsPageSection[]): CmsPageSection[] {
  return JSON.parse(JSON.stringify(defaults)) as CmsPageSection[];
}

/**
 * Merged CMS: code templates + saved JSON (disk or Vercel Blob). MongoDB is optional legacy.
 */
export async function getMergedPageContent(
  pageKey: string
): Promise<CmsPageSection[]> {
  const template = CMS_PAGE_TEMPLATES.find((t) => t.key === pageKey);
  if (!template) return [];

  const defaults = template.defaultSections;

  try {
    const fromStore = await getPageSectionsFromCmsStore(pageKey);
    if (fromStore?.length) {
      return mergeCmsSections(defaults, fromStore);
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
