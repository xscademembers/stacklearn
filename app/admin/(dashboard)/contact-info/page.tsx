"use client";

import LeadsPage from "../leads/page";

export default function ContactInfoPage() {
  return (
    <div className="space-y-6">
      <div className="bg-surface rounded-xl border border-border p-6">
        <h2 className="text-lg font-bold text-foreground mb-1">
          Leads / Submissions
        </h2>
        <p className="text-sm text-foreground-muted mb-4">
          All form submissions stored in MongoDB (includes the page they were submitted from).
        </p>
        <LeadsPage />
      </div>
    </div>
  );
}
