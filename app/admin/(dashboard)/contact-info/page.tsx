"use client";

import LeadsPage from "../leads/page";

export default function ContactInfoPage() {
  return (
    <main className="space-y-6">
      <header className="rounded-2xl border border-border bg-gradient-to-br from-surface to-page-soft p-6 md:p-8">
        <div className="max-w-4xl">
          <h2 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
            Leads Dashboard
          </h2>
          <p className="mt-2 text-sm md:text-base text-foreground-muted">
            A single place to review all submissions captured across the site.
          </p>
        </div>
      </header>

      <section className="bg-surface rounded-2xl border border-border p-4 md:p-6">
        <LeadsPage />
      </section>
    </main>
  );
}
