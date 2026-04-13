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

export type CmsPersistedRoot = {
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

export async function readDiskRoot(): Promise<CmsPersistedRoot> {
  try {
    const raw = await fs.readFile(CMS_FILE, "utf-8");
    const parsed = JSON.parse(raw) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "pages" in parsed &&
      typeof (parsed as CmsPersistedRoot).pages === "object"
    ) {
      return parsed as CmsPersistedRoot;
    }
  } catch {
    /* missing or invalid */
  }
  return { pages: {} };
}

export async function writeDiskRoot(root: CmsPersistedRoot): Promise<void> {
  await fs.mkdir(CMS_DIR, { recursive: true });
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
