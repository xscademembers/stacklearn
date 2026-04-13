import fs from "fs/promises";
import path from "path";
import type { CmsPageSection } from "@/lib/cms-page-templates";

const CMS_DIR = path.join(process.cwd(), "data", "cms");
const CMS_FILE = path.join(CMS_DIR, "page-content.json");

export type CmsFilePageDoc = {
  pageKey: string;
  sections: CmsPageSection[];
  updatedAt?: string;
};

type CmsFileRoot = {
  pages: Record<string, { sections: CmsPageSection[]; updatedAt?: string }>;
};

async function readRoot(): Promise<CmsFileRoot> {
  try {
    const raw = await fs.readFile(CMS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "pages" in parsed &&
      typeof (parsed as CmsFileRoot).pages === "object"
    ) {
      return parsed as CmsFileRoot;
    }
  } catch {
    /* missing or invalid — start empty */
  }
  return { pages: {} };
}

export async function getPageSectionsFromFile(
  pageKey: string
): Promise<CmsPageSection[] | undefined> {
  const root = await readRoot();
  const doc = root.pages[pageKey];
  if (!doc?.sections || !Array.isArray(doc.sections)) return undefined;
  return doc.sections;
}

export async function listPagesFromFile(): Promise<CmsFilePageDoc[]> {
  const root = await readRoot();
  return Object.entries(root.pages).map(([pageKey, v]) => ({
    pageKey,
    sections: Array.isArray(v.sections) ? v.sections : [],
    updatedAt: v.updatedAt,
  }));
}

export async function savePageSectionsToFile(
  pageKey: string,
  sections: CmsPageSection[]
): Promise<void> {
  await fs.mkdir(CMS_DIR, { recursive: true });
  const root = await readRoot();
  root.pages[pageKey] = {
    sections,
    updatedAt: new Date().toISOString(),
  };
  await fs.writeFile(CMS_FILE, `${JSON.stringify(root, null, 2)}\n`, "utf-8");
}
