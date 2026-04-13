"use client";

import { useId, useState } from "react";

type TabId = "study-abroad" | "training";

export type HowWeHelpCms = {
  titleLead: string;
  titleGradient: string;
  intro1: string;
  intro2: string;
  tabStudyLabel: string;
  tabTrainingLabel: string;
  footer: string;
  studyAbroadPoints: { title: string; body: string }[];
  trainingPoints: { title: string; body: string }[];
};

const defaultTabs = (c: HowWeHelpCms): { id: TabId; label: string }[] => [
  { id: "study-abroad", label: c.tabStudyLabel || "Study Abroad Support" },
  { id: "training", label: c.tabTrainingLabel || "Training Support" },
];

export default function HowWeHelpSection({ content }: { content: HowWeHelpCms }) {
  const [activeTab, setActiveTab] = useState<TabId>("study-abroad");
  const baseId = useId();
  const panelId = `${baseId}-panel`;
  const tabs = defaultTabs(content);

  const activePoints =
    activeTab === "study-abroad" ? content.studyAbroadPoints : content.trainingPoints;

  return (
    <section className="py-16 md:py-24 bg-[rgb(var(--color-surface))]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3">
            {content.intro1}
          </p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            {content.intro2}
          </p>
        </div>

        <div
          className="mt-10 flex flex-wrap items-center justify-center gap-2 md:gap-3"
          role="tablist"
          aria-label="Support type"
        >
          {tabs.map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                role="tab"
                id={`${baseId}-tab-${tab.id}`}
                aria-selected={isActive}
                aria-controls={panelId}
                tabIndex={isActive ? 0 : -1}
                onClick={() => setActiveTab(tab.id)}
                onKeyDown={(e) => {
                  if (e.key !== "ArrowRight" && e.key !== "ArrowLeft") return;
                  e.preventDefault();
                  const idx = tabs.findIndex((t) => t.id === tab.id);
                  const delta = e.key === "ArrowRight" ? 1 : -1;
                  const next = tabs[(idx + delta + tabs.length) % tabs.length];
                  setActiveTab(next.id);
                  requestAnimationFrame(() => {
                    document.getElementById(`${baseId}-tab-${next.id}`)?.focus();
                  });
                }}
                className={[
                  "rounded-full px-5 py-2.5 md:px-6 md:py-3 text-sm md:text-base font-semibold",
                  "border-2 motion-safe:transition-colors motion-safe:duration-200",
                  "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2",
                  "focus-visible:outline-[rgb(var(--color-brand))]",
                  isActive
                    ? "border-transparent bg-brand text-white shadow-md shadow-brand/25"
                    : "border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-soft))] text-slate-800 hover:border-brand/40 hover:bg-brand-soft/50",
                ].join(" ")}
              >
                {tab.label}
              </button>
            );
          })}
        </div>

        <div
          id={panelId}
          role="tabpanel"
          aria-labelledby={`${baseId}-tab-${activeTab}`}
          className="mt-10"
        >
          <PointsGrid key={activeTab} points={activePoints} />
        </div>

        <p className="mt-10 text-center text-sm md:text-base text-slate-600">
          {content.footer}
        </p>
      </div>
    </section>
  );
}

function PointsGrid({ points }: { points: { title: string; body: string }[] }) {
  return (
    <div className="grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-4 motion-safe:animate-fadeInUp">
      {points.map((item) => (
        <article
          key={item.title}
          className="h-full rounded-2xl border border-[rgb(var(--color-border))] bg-[rgb(var(--color-bg-soft))] px-5 py-6 md:px-6 md:py-7 flex flex-col motion-safe:transition-all motion-safe:duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 motion-reduce:hover:translate-y-0"
        >
          <div className="mb-3 flex items-center gap-2">
            <span
              className="inline-flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold"
              aria-hidden
            >
              ✓
            </span>
            <h3 className="text-sm md:text-base font-semibold text-slate-900">{item.title}</h3>
          </div>
          <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">{item.body}</p>
        </article>
      ))}
    </div>
  );
}
