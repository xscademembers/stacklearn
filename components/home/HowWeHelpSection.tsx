"use client";

import { useId, useState } from "react";

const studyAbroadPoints = [
  {
    title: "Personalized Profile Evaluation",
    body:
      "We carefully assess your academics, career goals, and budget to create a customized study abroad plan.",
  },
  {
    title: "Strategic University Shortlisting",
    body:
      "We help you select universities and courses that align with your long-term career objectives.",
  },
  {
    title: "Complete Application Support",
    body:
      "From SOP and LOR guidance to accurate documentation, we ensure your application stands out.",
  },
  {
    title: "Loan & Scholarship Guidance",
    body:
      "We assist you in exploring education loans and scholarships to make studying abroad affordable.",
  },
  {
    title: "Student Visa Assistance",
    body:
      "Our structured documentation process and visa preparation support improve your chances of approval.",
  },
  {
    title: "Pre Departure Support",
    body:
      "We guide you with travel planning, documentation checks, and everything you need before you fly.",
  },
  {
    title: "Accommodation Assistance",
    body:
      "We help you identify safe and suitable housing options close to your university campus.",
  },
  {
    title: "Post-Arrival Guidance",
    body:
      "Our support continues with basic settlement advice so you can start your academic journey confidently.",
  },
];

const trainingPoints = [
  {
    title: "Personalized Career Guidance",
    body:
      "We understand your background and career goals to recommend the right course for your growth.",
  },
  {
    title: "Industry-Relevant Course Curriculum",
    body:
      "Our training programs are designed based on current market demand and job trends.",
  },
  {
    title: "Hands-on Practical Training",
    body:
      "We focus on real-time projects and practical learning to give you actual working experience.",
  },
  {
    title: "Expert Trainers & Mentorship",
    body:
      "Learn from experienced professionals who guide you with practical insights and continuous support.",
  },
  {
    title: "Flexible Learning Options",
    body:
      "We offer flexible schedules suitable for students, freshers, and working professionals.",
  },
  {
    title: "Certification Support",
    body:
      "Earn recognized certifications that strengthen your profile and improve job opportunities.",
  },
  {
    title: "Placement Assistance",
    body:
      "We provide job support, interview preparation, and career guidance to help you get placed.",
  },
  {
    title: "Resume & Interview Preparation",
    body:
      "We help you build strong resumes and prepare for real-world interview scenarios.",
  },
];

type TabId = "study-abroad" | "training";

const tabs: { id: TabId; label: string }[] = [
  { id: "study-abroad", label: "Study Abroad Support" },
  { id: "training", label: "Training Support" },
];

export default function HowWeHelpSection() {
  const [activeTab, setActiveTab] = useState<TabId>("study-abroad");
  const baseId = useId();
  const panelId = `${baseId}-panel`;

  const activePoints = activeTab === "study-abroad" ? studyAbroadPoints : trainingPoints;

  return (
    <section className="py-16 md:py-24 bg-[rgb(var(--color-surface))]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            How <span className="gradient-text">We Help You</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3">
            Planning your future—whether it&apos;s studying abroad or building a successful
            career—can feel overwhelming. From choosing the right university or course to gaining
            practical skills and securing opportunities, the process requires the right guidance at
            every step.
          </p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            At StackLearn, we provide structured, end-to-end support for both international
            education and job-oriented training, making your journey simple, clear, and
            result-driven.
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
          From your first counselling session to your first day on campus, StackLearn stands as
          your trusted study abroad consultancy partner at every step.
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
