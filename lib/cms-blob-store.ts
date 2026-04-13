import { get, put } from "@vercel/blob";
import type { CmsPersistedRoot } from "@/lib/cms-file-store";
import { getCmsBlobAccess, getCmsBlobReadWriteToken } from "@/lib/cms-blob-env";

const BLOB_PATHNAME = "cms/page-content.json";

function emptyRoot(): CmsPersistedRoot {
  return { pages: {} };
}

export async function readRootFromBlob(): Promise<CmsPersistedRoot> {
  const token = getCmsBlobReadWriteToken();
  if (!token) return emptyRoot();
  const access = getCmsBlobAccess();
  try {
    const res = await get(BLOB_PATHNAME, {
      access,
      token,
      useCache: false,
    });
    if (!res || res.statusCode !== 200 || !res.stream) return emptyRoot();
    const text = await new Response(res.stream).text();
    const parsed = JSON.parse(text) as unknown;
    if (
      parsed &&
      typeof parsed === "object" &&
      "pages" in parsed &&
      typeof (parsed as CmsPersistedRoot).pages === "object"
    ) {
      return parsed as CmsPersistedRoot;
    }
  } catch {
    /* missing file, parse error, or network */
  }
  return emptyRoot();
}

export async function writeRootToBlob(root: CmsPersistedRoot): Promise<void> {
  const token = getCmsBlobReadWriteToken();
  if (!token) {
    throw new Error("BLOB_READ_WRITE_TOKEN is not set");
  }
  const access = getCmsBlobAccess();
  const body = `${JSON.stringify(root, null, 2)}\n`;
  await put(BLOB_PATHNAME, body, {
    access,
    token,
    addRandomSuffix: false,
    allowOverwrite: true,
    contentType: "application/json",
  });
}
