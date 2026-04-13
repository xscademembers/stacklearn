/**
 * Vercel injects `BLOB_READ_WRITE_TOKEN` when you link a Blob store to the project.
 * In the Storage UI, enable the token for each environment you use (Production, Preview,
 * Development), then redeploy — otherwise the variable is missing at runtime.
 *
 * Private Blob stores: set `CMS_BLOB_ACCESS=private` so uploads and reads use the same
 * access level as the store (public is the default for backwards compatibility).
 */

export function getCmsBlobReadWriteToken(): string | undefined {
  const t = process.env.BLOB_READ_WRITE_TOKEN?.trim();
  return t || undefined;
}

export type CmsBlobAccess = "public" | "private";

export function getCmsBlobAccess(): CmsBlobAccess {
  const v = process.env.CMS_BLOB_ACCESS?.trim().toLowerCase();
  return v === "private" ? "private" : "public";
}
