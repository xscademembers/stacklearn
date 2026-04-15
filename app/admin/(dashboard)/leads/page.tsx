"use client";

import { Fragment, useEffect, useMemo, useState, useCallback } from "react";
import { FiSearch, FiDownload, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { adminFetch, isAbortOrTimeoutError } from "@/lib/admin-fetch";

interface LeadDoc {
  _id: string;
  _collection?: string;
  name?: string;
  email?: string;
  mobile?: string;
  formSource?: string;
  submittedFromPath?: string;
  destination?: string;
  service?: string;
  message?: string;
  status?: string;
  createdAt?: string;
  details?: Record<string, string>;
  [key: string]: unknown;
}

export default function LeadsPage() {
  const [docs, setDocs] = useState<LeadDoc[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [expanded, setExpanded] = useState<string | null>(null);
  const [listError, setListError] = useState("");
  const limit = 25;

  const fetchLeads = useCallback(async () => {
    setLoading(true);
    setListError("");
    try {
      const params = new URLSearchParams({
        source: "all",
        q: search,
        page: String(page),
        limit: String(limit),
      });
      const res = await adminFetch(`/api/admin/leads?${params}`);
      const data = await res.json();
      if (!res.ok) {
        setListError(
          typeof data.message === "string"
            ? data.message
            : "Could not load submissions."
        );
        setDocs([]);
        setTotal(0);
        return;
      }
      setDocs(data.docs || []);
      setTotal(data.total || 0);
    } catch (e) {
      if (isAbortOrTimeoutError(e)) {
        setListError(
          "Request timed out — MongoDB may be unreachable. Check MONGODB_URI and Atlas IP access, then restart the server."
        );
      } else {
        setListError("Could not load submissions. Check your connection.");
      }
      setDocs([]);
      setTotal(0);
    } finally {
      setLoading(false);
    }
  }, [search, page]);

  useEffect(() => {
    fetchLeads();
  }, [fetchLeads]);

  const totalPages = Math.ceil(total / limit) || 1;

  const exportCSV = () => {
    const params = new URLSearchParams({ source: "all", q: search, format: "csv" });
    window.open(`/api/admin/leads?${params}`, "_blank");
  };

  const formatDate = (d?: string) => {
    if (!d) return "—";
    return new Date(d).toLocaleString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const pageSummary = useMemo(() => {
    const from = total === 0 ? 0 : (page - 1) * limit + 1;
    const to = Math.min(page * limit, total);
    return { from, to, total };
  }, [page, limit, total]);

  return (
    <div className="space-y-6">
      {listError ? (
        <div
          className="rounded-xl border border-accent/40 bg-accent-soft px-4 py-3 text-sm text-foreground"
          role="alert"
        >
          {listError}
        </div>
      ) : null}
      {/* Controls */}
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div className="flex flex-wrap gap-3 items-center">
          <div className="relative">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted w-4 h-4" />
            <input
              type="text"
              placeholder="Search name, email, phone, page…"
              value={search}
              onChange={(e) => {
                setSearch(e.target.value);
                setPage(1);
              }}
              className="pl-10 pr-4 py-2 border border-border rounded-lg text-sm w-72 focus:ring-2 focus:ring-brand"
            />
          </div>
        </div>
        <button
          onClick={exportCSV}
          className="flex items-center gap-2 px-4 py-2 bg-brand text-white rounded-lg text-sm font-medium hover:bg-brand-strong transition-colors"
        >
          <FiDownload className="w-4 h-4" />
          Export CSV
        </button>
      </div>

      {/* Count */}
      <p className="text-sm text-foreground-muted">
        Showing {pageSummary.from}-{pageSummary.to} of {pageSummary.total} records
      </p>

      {/* Table */}
      <div className="bg-surface rounded-xl border border-border overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-border bg-page-soft">
              <th className="text-left px-4 py-3 font-semibold text-foreground">Name</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Email</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Mobile</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Page</th>
              <th className="text-left px-4 py-3 font-semibold text-foreground">Date</th>
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-foreground-muted">
                  Loading…
                </td>
              </tr>
            ) : docs.length === 0 ? (
              <tr>
                <td colSpan={5} className="text-center py-12 text-foreground-muted">
                  No records found.
                </td>
              </tr>
            ) : (
              docs.map((doc) => (
                <Fragment key={String(doc._id)}>
                  <tr
                    className="border-b border-border hover:bg-page-soft cursor-pointer transition-colors"
                    onClick={() =>
                      setExpanded(expanded === doc._id ? null : doc._id)
                    }
                  >
                    <td className="px-4 py-3 font-medium text-foreground">{doc.name || "—"}</td>
                    <td className="px-4 py-3 text-foreground-muted">{doc.email || "—"}</td>
                    <td className="px-4 py-3 text-foreground-muted">{doc.mobile || "—"}</td>
                    <td className="px-4 py-3 text-foreground-muted text-xs max-w-[180px] truncate">
                      {doc.submittedFromPath || "—"}
                    </td>
                    <td className="px-4 py-3 text-foreground-muted text-xs whitespace-nowrap">
                      {formatDate(doc.createdAt)}
                    </td>
                  </tr>
                  {expanded === doc._id && (
                    <tr key={`${doc._id}-detail`} className="bg-page-soft">
                      <td colSpan={5} className="px-6 py-4">
                        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 text-sm">
                          <div className="sm:col-span-2 lg:col-span-3">
                            <span className="font-semibold text-foreground">Submitted from page:</span>{" "}
                            <span className="text-foreground-muted">
                              {doc.submittedFromPath || "—"}
                            </span>
                          </div>
                          {doc.destination && (
                            <div>
                              <span className="font-semibold text-foreground">Destination:</span>{" "}
                              <span className="text-foreground-muted">{doc.destination}</span>
                            </div>
                          )}
                          {doc.service && (
                            <div>
                              <span className="font-semibold text-foreground">Service:</span>{" "}
                              <span className="text-foreground-muted">{doc.service}</span>
                            </div>
                          )}
                          {doc.message && (
                            <div className="sm:col-span-2 lg:col-span-3">
                              <span className="font-semibold text-foreground">Message:</span>{" "}
                              <span className="text-foreground-muted">{doc.message}</span>
                            </div>
                          )}
                          {doc.details &&
                            Object.entries(doc.details).map(([k, v]) => (
                              <div key={k}>
                                <span className="font-semibold text-foreground">{k}:</span>{" "}
                                <span className="text-foreground-muted">{v}</span>
                              </div>
                            ))}
                          {Object.entries(doc)
                            .filter(
                              ([k]) =>
                                ![
                                  "_id",
                                  "_collection",
                                  "name",
                                  "email",
                                  "mobile",
                                  "formSource",
                                  "submittedFromPath",
                                  "destination",
                                  "service",
                                  "message",
                                  "status",
                                  "createdAt",
                                  "updatedAt",
                                  "details",
                                  "password",
                                ].includes(k)
                            )
                            .map(([k, v]) => (
                              <div key={k}>
                                <span className="font-semibold text-foreground">{k}:</span>{" "}
                                <span className="text-foreground-muted">
                                  {typeof v === "object" ? JSON.stringify(v) : String(v ?? "")}
                                </span>
                              </div>
                            ))}
                        </div>
                      </td>
                    </tr>
                  )}
                </Fragment>
              ))
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between">
        <p className="text-sm text-foreground-muted">
          Page {page} of {totalPages}
        </p>
        <div className="flex gap-2">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page <= 1}
            className="p-2 border border-border rounded-lg disabled:opacity-40 hover:bg-page-soft transition-colors"
          >
            <FiChevronLeft className="w-4 h-4" />
          </button>
          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page >= totalPages}
            className="p-2 border border-border rounded-lg disabled:opacity-40 hover:bg-page-soft transition-colors"
          >
            <FiChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
