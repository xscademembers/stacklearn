"use client";

import { useEffect, useMemo, useState } from "react";
import type { CmsPageSection } from "@/lib/cms-page-templates";
import { getCmsField } from "@/lib/cms-merge-sections";

const DEFAULT_STATS = [
  { label: "Students Assisted", value: "5000+" },
  { label: "Partner Universities", value: "100+" },
  { label: "Countries Supported", value: "15+" },
  { label: "Visa Success Rate", value: "97" },
];

function buildStats(sections: CmsPageSection[] | null | undefined) {
  if (!sections?.length) return DEFAULT_STATS;
  return [1, 2, 3, 4].map((i) => ({
    label:
      getCmsField(sections, "stats", `stat${i}Label`) || DEFAULT_STATS[i - 1].label,
    value:
      getCmsField(sections, "stats", `stat${i}Value`) || DEFAULT_STATS[i - 1].value,
  }));
}

type StatisticsBarProps = {
  cmsSections?: CmsPageSection[] | null;
};

export default function StatisticsBar({ cmsSections }: StatisticsBarProps) {
  const [isVisible, setIsVisible] = useState(false);
  const stats = useMemo(() => buildStats(cmsSections), [cmsSections]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-bar");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="stats-bar"
      className="py-16 md:py-24 text-white relative overflow-hidden bg-brand"
    >
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-transform duration-300 py-4"
            >
              <div className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                {isVisible ? stat.value : "0"}
              </div>
              <div className="text-base md:text-lg font-semibold opacity-95">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
