import { NextRequest, NextResponse } from "next/server";
import { ObjectId } from "mongodb";
import {
  getDatabase,
  COLLECTIONS,
  isMongoConfigured,
  MONGODB_NOT_CONFIGURED_MESSAGE,
} from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

type BlogBlock = {
  kind?: "heading" | "paragraph" | "image" | "table" | "checklist";
  heading?: string;
  paragraph?: string;
  imageUrl?: string;
  table?: {
    caption?: string;
    columns?: string[];
    rows?: string[][];
  };
  checklist?: string;
  align?: "left" | "center" | "right";
  bold?: boolean;
  italic?: boolean;
  underline?: boolean;
  color?: string;
  linkUrl?: string;
};

function clampStr(v: unknown, maxLen: number): string {
  if (typeof v !== "string") return "";
  const s = v.trim();
  if (!s) return "";
  return s.length > maxLen ? s.slice(0, maxLen) : s;
}

function sanitizeColor(v: unknown): string {
  const s = clampStr(v, 32);
  if (!s) return "";
  // allow hex, rgb/rgba, hsl/hsla, and CSS variables (e.g. var(--brand))
  if (
    /^#([0-9a-f]{3}|[0-9a-f]{6})$/i.test(s) ||
    /^(rgb|rgba|hsl|hsla)\([^)]*\)$/i.test(s) ||
    /^var\(--[a-z0-9-_]+\)$/i.test(s)
  ) {
    return s;
  }
  return "";
}

function sanitizeAlign(v: unknown): "left" | "center" | "right" | undefined {
  if (v === "left" || v === "center" || v === "right") return v;
  return undefined;
}

function sanitizeLinkUrl(v: unknown): string {
  const s = clampStr(v, 2048);
  if (!s) return "";
  // only allow http(s) links
  if (/^https?:\/\//i.test(s)) return s;
  return "";
}

function sanitizeTable(v: unknown): BlogBlock["table"] | undefined {
  if (!v || typeof v !== "object") return undefined;
  const t = v as Record<string, unknown>;
  const caption = clampStr(t.caption, 160);
  const columnsRaw = Array.isArray(t.columns) ? (t.columns as unknown[]) : [];
  const rowsRaw = Array.isArray(t.rows) ? (t.rows as unknown[]) : [];

  const columns = columnsRaw.map((c) => clampStr(c, 80));
  const rows = rowsRaw
    .map((r) => (Array.isArray(r) ? (r as unknown[]) : []))
    .map((r) => r.map((cell) => clampStr(cell, 400)));

  const safeColumns = columns.filter((c) => c.length > 0);
  const hasAnyCell = rows.some((r) => r.some((cell) => cell.length > 0));
  if (safeColumns.length === 0 && !hasAnyCell) return undefined;

  const width = Math.max(
    safeColumns.length,
    rows.reduce((m, r) => Math.max(m, r.length), 0)
  );

  const normalizedColumns =
    safeColumns.length > 0
      ? [...safeColumns, ...Array.from({ length: Math.max(0, width - safeColumns.length) }, () => "")]
      : Array.from({ length: width }, () => "");
  const normalizedRows = rows.map((r) => [...r, ...Array.from({ length: Math.max(0, width - r.length) }, () => "")]);

  return { caption, columns: normalizedColumns, rows: normalizedRows };
}

function sanitizeBlock(b: unknown): BlogBlock {
  const blk = (b ?? {}) as Record<string, unknown>;
  const kind =
    blk.kind === "heading" || blk.kind === "paragraph" || blk.kind === "image" || blk.kind === "table" || blk.kind === "checklist"
      ? blk.kind
      : undefined;

  const heading = clampStr(blk.heading, 300);
  const paragraph = clampStr(blk.paragraph, 20000);
  const imageUrl = clampStr(blk.imageUrl, 2048);
  const table = sanitizeTable(blk.table);
  const checklist = clampStr(blk.checklist, 10000);
  const align = sanitizeAlign(blk.align);
  const bold = typeof blk.bold === "boolean" ? blk.bold : undefined;
  const italic = typeof blk.italic === "boolean" ? blk.italic : undefined;
  const underline = typeof blk.underline === "boolean" ? blk.underline : undefined;
  const color = sanitizeColor(blk.color);
  const linkUrl = sanitizeLinkUrl(blk.linkUrl);

  return {
    kind,
    heading,
    paragraph,
    imageUrl,
    table,
    checklist,
    align,
    bold,
    italic,
    underline,
    color,
    linkUrl,
  };
}

function toSlug(input: string): string {
  return input
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export async function GET() {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json(
      { message: MONGODB_NOT_CONFIGURED_MESSAGE, blogs: [] },
      { status: 503 }
    );
  }

  const db = await getDatabase();
  const blogs = await db.collection(COLLECTIONS.BLOGS).find().sort({ createdAt: -1 }).toArray();
  return NextResponse.json({ blogs });
}

export async function POST(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const body = await request.json();
  const { title, excerpt, category, image, content, slug, blocks, published } = body;
  if (!title || !slug) {
    return NextResponse.json({ message: "Title and slug are required" }, { status: 400 });
  }
  const db = await getDatabase();
  const normalizedSlug = toSlug(String(slug));
  const existing = await db.collection(COLLECTIONS.BLOGS).findOne({ slug: normalizedSlug });
  if (existing) {
    return NextResponse.json({ message: "Slug already exists. Use a unique slug." }, { status: 409 });
  }

  const cleanBlocks: BlogBlock[] = Array.isArray(blocks)
    ? (blocks as unknown[])
        .map(sanitizeBlock)
        .filter((b) => (b.heading || b.paragraph || b.imageUrl || b.table || b.checklist))
    : [];

  const isPublished = Boolean(published);
  const now = new Date();
  const result = await db.collection(COLLECTIONS.BLOGS).insertOne({
    title,
    slug: normalizedSlug,
    excerpt: excerpt || "",
    category: category || "",
    image: image || "",
    content: content || "", // legacy freeform field (kept for backwards compatibility)
    blocks: cleanBlocks,
    published: isPublished,
    publishedAt: isPublished ? now : null,
    createdAt: now,
    updatedAt: now,
  });
  return NextResponse.json({ success: true, id: result.insertedId });
}

export async function PUT(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const body = await request.json();
  const { _id, ...updates } = body;
  if (!_id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const db = await getDatabase();

  if (typeof updates.slug === "string" && updates.slug.trim()) {
    updates.slug = toSlug(updates.slug);
    const dup = await db.collection(COLLECTIONS.BLOGS).findOne({
      slug: updates.slug,
      _id: { $ne: new ObjectId(_id) },
    });
    if (dup) {
      return NextResponse.json({ message: "Slug already exists. Use a unique slug." }, { status: 409 });
    }
  }

  if (Array.isArray(updates.blocks)) {
    updates.blocks = (updates.blocks as unknown[])
      .map(sanitizeBlock)
      .filter((b) => (b.heading || b.paragraph || b.imageUrl || b.table || b.checklist));
  }

  const now = new Date();
  if (typeof updates.published === "boolean") {
    if (updates.published) {
      updates.publishedAt = updates.publishedAt ? new Date(updates.publishedAt) : now;
    } else {
      updates.publishedAt = null;
    }
  }

  await db.collection(COLLECTIONS.BLOGS).updateOne(
    { _id: new ObjectId(_id) },
    { $set: { ...updates, updatedAt: now } }
  );
  return NextResponse.json({ success: true });
}

export async function DELETE(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  if (!isMongoConfigured()) {
    return NextResponse.json({ message: MONGODB_NOT_CONFIGURED_MESSAGE }, { status: 503 });
  }

  const { id } = await request.json();
  if (!id) return NextResponse.json({ message: "ID is required" }, { status: 400 });
  const db = await getDatabase();
  await db.collection(COLLECTIONS.BLOGS).deleteOne({ _id: new ObjectId(id) });
  return NextResponse.json({ success: true });
}
