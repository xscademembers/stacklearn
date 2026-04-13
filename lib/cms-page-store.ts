/**
 * Page Content CMS — no MongoDB. Plain JSON, editable from Admin → Page Content.
 *
 * • **Your laptop / Node server**: saves to `data/cms/page-content.json`.
 * • **Vercel**: the server filesystem is read-only. Add **Vercel Blob** and set
 *   `BLOB_READ_WRITE_TOKEN` (per environment: Production / Preview) after linking the store.
 *   Private Blob stores: set `CMS_BLOB_ACCESS=private`.
 */

import path from "path";
import type { CmsPageSection } from "@/lib/cms-page-templates";
import {
  readDiskRoot,
  writeDiskRoot,
  type CmsFilePageDoc,
  type CmsPersistedRoot,
} from "@/lib/cms-file-store";
import { getCmsBlobReadWriteToken } from "@/lib/cms-blob-env";
import { readRootFromBlob, writeRootToBlob } from "@/lib/cms-blob-store";

export type { CmsFilePageDoc };

export function cmsUsesBlobStorage(): boolean {
  return Boolean(getCmsBlobReadWriteToken());
}

function isVercelDeployment(): boolean {
  return process.env.VERCEL === "1";
}

export function describeCmsStorageForAdminUi(): string {
  if (cmsUsesBlobStorage()) {
    return "Saving to Vercel Blob (file cms/page-content.json).";
  }
  if (isVercelDeployment()) {
    return "Vercel detected but BLOB_READ_WRITE_TOKEN is missing — saves will fail until you add Vercel Blob.";
  }
  return `Saving to ${path.join("data", "cms", "page-content.json")} on this machine.`;
}

/** For error messages — never show /var/task paths on Vercel (misleading; disk is not used). */
export function getCmsSaveTargetHint(): string {
  if (cmsUsesBlobStorage()) {
    return "Vercel Blob file cms/page-content.json";
  }
  if (isVercelDeployment()) {
    return "Vercel Blob (set BLOB_READ_WRITE_TOKEN — not a path on disk)";
  }
  return path.join(process.cwd(), "data", "cms", "page-content.json");
}

async function loadRoot(): Promise<CmsPersistedRoot> {
  if (cmsUsesBlobStorage()) {
    return readRootFromBlob();
  }
  return readDiskRoot();
}

async function persistRoot(root: CmsPersistedRoot): Promise<void> {
  if (cmsUsesBlobStorage()) {
    await writeRootToBlob(root);
    return;
  }
  if (isVercelDeployment()) {
    throw new Error(
      "Vercel cannot write to disk. Link a Blob store to this project (adds BLOB_READ_WRITE_TOKEN), then in Settings → Environment Variables confirm that variable exists for the environment you are running (Production vs Preview), and redeploy. Private stores: also set CMS_BLOB_ACCESS=private. CMS is stored as one JSON file in Blob, not MongoDB."
    );
  }
  await writeDiskRoot(root);
}

export async function listPagesFromCmsStore(): Promise<CmsFilePageDoc[]> {
  const root = await loadRoot();
  return Object.entries(root.pages).map(([pageKey, v]) => ({
    pageKey,
    sections: Array.isArray(v.sections) ? v.sections : [],
    updatedAt: v.updatedAt,
  }));
}

export async function getPageSectionsFromCmsStore(
  pageKey: string
): Promise<CmsPageSection[] | undefined> {
  const root = await loadRoot();
  const doc = root.pages[pageKey];
  if (!doc?.sections || !Array.isArray(doc.sections)) return undefined;
  return doc.sections;
}

export async function savePageToCmsStore(
  pageKey: string,
  sections: CmsPageSection[]
): Promise<void> {
  const root = await loadRoot();
  root.pages[pageKey] = {
    sections,
    updatedAt: new Date().toISOString(),
  };
  await persistRoot(root);
}
