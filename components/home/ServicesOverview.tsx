"use client";

import { useId, useState } from "react";
import Link from "next/link";
import type { IconType } from "react-icons";
import {
  FiUser,
  FiFileText,
  FiEdit,
  FiShield,
  FiHome,
  FiDollarSign,
  FiCompass,
  FiCpu,
  FiBookOpen,
  FiLayers,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";
import type { ServiceCard } from "@/lib/cms-home-content";

const SERVICE_ICONS: Record<string, IconType> = {
  FiUser,
  FiFileText,
  FiEdit,
  FiShield,
  FiHome,
  FiDollarSign,
  FiCompass,
  FiCpu,
  FiBookOpen,
  FiLayers,
  FiAward,
  FiBriefcase,
};

function resolveIcon(key: string): IconType {
  return SERVICE_ICONS[key] ?? FiUser;
}

type TabId = "study-abroad" | "training";

export type ServicesOverviewCms = {
  titleLead: string;
  titleGradient: string;
  intro: string;
  tabStudyLabel: string;
  tabTrainingLabel: string;
  studyAbroadServices: ServiceCard[];
  trainingServices: ServiceCard[];
};

export default function ServicesOverview({ content }: { content: ServicesOverviewCms }) {
  const [activeTab, setActiveTab] = useState<TabId>("study-abroad");
  const baseId = useId();
  const panelId = `${baseId}-panel`;

  const tabs: { id: TabId; label: string }[] = [
    { id: "study-abroad", label: content.tabStudyLabel || "Study Abroad Services" },
    { id: "training", label: content.tabTrainingLabel || "Training Services" },
  ];

  const activeServices =
    activeTab === "study-abroad" ? content.studyAbroadServices : content.trainingServices;

  return (
    <section className="py-16 md:py-24 bg-[rgb(var(--color-surface))]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-10 md:mb-12">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-3xl mx-auto leading-relaxed">
            {content.intro}
          </p>
        </div>

        <div
          className="mb-10 md:mb-12 flex flex-wrap items-center justify-center gap-2 md:gap-3"
          role="tablist"
          aria-label="Service type"
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
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 motion-safe:animate-fadeInUp"
          key={activeTab}
        >
          {activeServices.map((service) => {
            const Icon = resolveIcon(service.icon);
            return (
              <Link
                key={service.title}
                href={service.href}
                className="group p-6 md:p-8 bg-[rgb(var(--color-surface))] border-2 border-[rgb(var(--color-border))] rounded-2xl hover:border-brand hover:shadow-2xl hover:shadow-brand/20 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0"
              >
                <div className="flex items-start gap-5">
                  <div className="p-4 bg-brand-soft rounded-xl motion-safe:transition-all motion-safe:duration-300 group-hover:bg-brand motion-safe:group-hover:scale-110 motion-safe:group-hover:rotate-3 motion-reduce:group-hover:scale-100 motion-reduce:group-hover:rotate-0">
                    <Icon className="w-7 h-7 text-brand group-hover:text-white motion-safe:transition-colors motion-safe:duration-300" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-3 group-hover:text-brand motion-safe:transition-colors motion-safe:duration-300">
                      {service.title}
                    </h3>
                    <p className="text-slate-600 leading-relaxed text-sm md:text-base">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-2 mt-5 text-brand font-semibold motion-safe:transition-all motion-safe:duration-300 motion-safe:group-hover:gap-3">
                      Learn More
                      <span className="motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1">
                        &rarr;
                      </span>
                    </span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
