import { NextRequest, NextResponse } from "next/server";
import { getDatabase, COLLECTIONS } from "@/lib/mongodb";
import { getAdminSession } from "@/lib/auth";

export const dynamic = "force-dynamic";

export async function GET(request: NextRequest) {
  const session = await getAdminSession();
  if (!session) return NextResponse.json({ message: "Unauthorized" }, { status: 401 });

  const url = request.nextUrl;
  const source = url.searchParams.get("source") || "all";
  const search = url.searchParams.get("q") || "";
  const page = parseInt(url.searchParams.get("page") || "1", 10);
  const limit = parseInt(url.searchParams.get("limit") || "50", 10);
  const format = url.searchParams.get("format");

  const db = await getDatabase();

  let collectionName: string;
  if (source === "contacts") collectionName = COLLECTIONS.CONTACTS;
  else if (source === "applications") collectionName = COLLECTIONS.APPLICATIONS;
  else if (source === "leads") collectionName = COLLECTIONS.LEADS;
  else collectionName = "";

  type DocType = Record<string, unknown>;

  const fetchFrom = async (col: string): Promise<DocType[]> => {
    const collection = db.collection(col);
    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
        { formSource: { $regex: search, $options: "i" } },
        { submittedFromPath: { $regex: search, $options: "i" } },
      ];
    }
    if (format === "csv") {
      return collection.find(filter).sort({ createdAt: -1 }).toArray() as unknown as DocType[];
    }
    return collection
      .find(filter)
      .sort({ createdAt: -1 })
      .skip((page - 1) * limit)
      .limit(limit)
      .toArray() as unknown as DocType[];
  };

  const countFrom = async (col: string): Promise<number> => {
    const collection = db.collection(col);
    const filter: Record<string, unknown> = {};
    if (search) {
      filter.$or = [
        { name: { $regex: search, $options: "i" } },
        { email: { $regex: search, $options: "i" } },
        { mobile: { $regex: search, $options: "i" } },
      ];
    }
    return collection.countDocuments(filter);
  };

  if (format === "csv") {
    const cols = collectionName
      ? [collectionName]
      : [COLLECTIONS.LEADS, COLLECTIONS.CONTACTS, COLLECTIONS.APPLICATIONS];
    const allDocs: DocType[] = [];
    for (const c of cols) {
      const docs = await fetchFrom(c);
      docs.forEach((d) => allDocs.push({ ...d, _collection: c }));
    }
    allDocs.sort(
      (a, b) =>
        new Date(b.createdAt as string).getTime() -
        new Date(a.createdAt as string).getTime()
    );

    const headers = [
      "Collection",
      "Name",
      "Email",
      "Mobile",
      "Form Source",
      "Submitted From Page",
      "Destination",
      "Service",
      "Message",
      "Status",
      "Created At",
    ];
    const escape = (v: unknown) => {
      const s = String(v ?? "");
      return s.includes(",") || s.includes('"') || s.includes("\n")
        ? `"${s.replace(/"/g, '""')}"`
        : s;
    };
    const rows = allDocs.map((d) =>
      [
        d._collection,
        d.name,
        d.email,
        d.mobile,
        d.formSource,
        d.submittedFromPath,
        d.destination,
        d.service,
        d.message,
        d.status,
        d.createdAt ? new Date(d.createdAt as string).toISOString() : "",
      ]
        .map(escape)
        .join(",")
    );

    const csv = [headers.join(","), ...rows].join("\n");
    return new NextResponse(csv, {
      headers: {
        "Content-Type": "text/csv",
        "Content-Disposition": `attachment; filename="leads-export-${Date.now()}.csv"`,
      },
    });
  }

  if (collectionName) {
    const [docs, total] = await Promise.all([
      fetchFrom(collectionName),
      countFrom(collectionName),
    ]);
    return NextResponse.json({ docs, total, page, limit });
  }

  const [leads, contacts, applications, leadsCount, contactsCount, appsCount] =
    await Promise.all([
      fetchFrom(COLLECTIONS.LEADS),
      fetchFrom(COLLECTIONS.CONTACTS),
      fetchFrom(COLLECTIONS.APPLICATIONS),
      countFrom(COLLECTIONS.LEADS),
      countFrom(COLLECTIONS.CONTACTS),
      countFrom(COLLECTIONS.APPLICATIONS),
    ]);

  const allDocs = [
    ...leads.map((d) => ({ ...d, _collection: "leads" as const })),
    ...contacts.map((d) => ({ ...d, _collection: "contacts" as const })),
    ...applications.map((d) => ({ ...d, _collection: "applications" as const })),
  ].sort(
    (a, b) =>
      new Date((b as DocType).createdAt as string).getTime() -
      new Date((a as DocType).createdAt as string).getTime()
  );

  return NextResponse.json({
    docs: allDocs.slice((page - 1) * limit, page * limit),
    total: leadsCount + contactsCount + appsCount,
    page,
    limit,
  });
}
