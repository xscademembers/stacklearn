import { list, put } from "@vercel/blob";
import type { CmsPersistedRoot } from "@/lib/cms-file-store";

const BLOB_PATHNAME = "cms/page-content.json";

function emptyRoot(): CmsPersistedRoot {
  return { pages: {} };
}

async function findBlobUrlForStore(): Promise<string | null> {
  let cursor: string | undefined;
  do {
    const res = await list({
      prefix: "cms/",
      limit: 100,
      cursor,
    });
    const hit = res.blobs.find((b) => b.pathname === BLOB_PATHNAME);
    if (hit) return hit.url;
    cursor = res.hasMore ? res.cursor : undefined;
  } while (cursor);
  return null;
}

export async function readRootFromBlob(): Promise<CmsPersistedRoot> {
  const url = await findBlobUrlForStore();
  if (!url) return emptyRoot();
  try {
    const r = await fetch(url, { cache: "no-store" });
    if (!r.ok) return emptyRoot();
    const parsed = (await r.json()) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "pages" in parsed &&
      typeof (parsed as CmsPersistedRoot).pages === "object"
    ) {
      return parsed as CmsPersistedRoot;
    }
  } catch {
    /* ignore */
  }
  return emptyRoot();
}

export async function writeRootToBlob(root: CmsPersistedRoot): Promise<void> {
  const body = `${JSON.stringify(root, null, 2)}\n`;
  await put(BLOB_PATHNAME, body, {
    access: "public",
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
