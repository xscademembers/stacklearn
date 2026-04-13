import fs from "fs/promises";
import path from "path";
import type { CmsPageSection } from "@/lib/cms-page-templates";

function resolveCmsDir(): string {
  const override = process.env.CMS_DATA_DIR?.trim();
  if (override) return path.resolve(override);
  return path.join(process.cwd(), "data", "cms");
}

const CMS_DIR = resolveCmsDir();
const CMS_FILE = path.join(CMS_DIR, "page-content.json");

export type CmsFilePageDoc = {
  pageKey: string;
  sections: CmsPageSection[];
  updatedAt?: string;
};

type CmsFileRoot = {
  pages: Record<string, { sections: CmsPageSection[]; updatedAt?: string }>;
};

/** Deep clone via JSON; throws with a clear message if sections are not serializable. */
export function cloneSectionsForPersistence(sections: unknown): CmsPageSection[] {
  let raw: string;
  try {
    raw = JSON.stringify(sections, (_, v) => (v === undefined ? null : v));
  } catch (e) {
    const msg = e instanceof Error ? e.message : String(e);
    throw new Error(
      `Content could not be serialized (${msg}). Try reloading the editor, or shorten JSON fields.`
    );
  }
  try {
    const parsed = JSON.parse(raw) as unknown;
    if (!Array.isArray(parsed)) {
      throw new Error("Sections must be an array.");
    }
    return parsed as CmsPageSection[];
  } catch (e) {
    if (e instanceof SyntaxError) {
      throw new Error("Internal parse error after clone.");
    }
    throw e;
  }
}

export function getCmsStoragePathForLogs(): string {
  return CMS_FILE;
}

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
  const payload = `${JSON.stringify(root, null, 2)}\n`;
  const tmp = path.join(CMS_DIR, `.page-content.${process.pid}.tmp`);
  try {
    await fs.writeFile(tmp, payload, "utf-8");
    await fs.rename(tmp, CMS_FILE);
  } catch (err) {
    try {
      await fs.unlink(tmp);
    } catch {
      /* ignore */
    }
    throw err;
  }
}
