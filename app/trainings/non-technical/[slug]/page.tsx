"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
  FiArrowRight,
  FiArrowLeft,
  FiClock,
  FiUsers,
  FiCheckCircle,
  FiChevronDown,
  FiBookOpen,
  FiAward,
  FiBriefcase,
} from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";
import { getNonTechnicalCourseBySlug } from "@/lib/non-technical-courses-data";

type TabId = "overview" | "curriculum" | "faqs";

export default function NonTechnicalCourseDetailPage() {
  const params = useParams();
  const slug = typeof params.slug === "string" ? params.slug : "";
  const course = getNonTechnicalCourseBySlug(slug);
  const [activeTab, setActiveTab] = useState<TabId>("overview");
  const [expandedModules, setExpandedModules] = useState<Set<number>>(new Set([0]));

  if (!course) {
    notFound();
  }

  const toggleModule = (index: number) => {
    setExpandedModules((prev) => {
      const next = new Set(prev);
      if (next.has(index)) {
        next.delete(index);
      } else {
        next.add(index);
      }
      return next;
    });
  };

  const tabs: { id: TabId; label: string; icon: React.ReactNode }[] = [
    { id: "overview", label: "Overview", icon: <FiBookOpen className="w-4 h-4" /> },
    { id: "curriculum", label: "Curriculum", icon: <FiAward className="w-4 h-4" /> },
    { id: "faqs", label: "FAQs", icon: <FiBriefcase className="w-4 h-4" /> },
  ];

  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={course.heroImage}
            alt={course.title}
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto">
            {/* Breadcrumb */}
            <nav className="flex items-center gap-2 text-xs md:text-sm text-white/70 mb-6">
              <Link href="/trainings/non-technical" className="hover:text-white transition-colors">
                Non-Technical Trainings
              </Link>
              <span>/</span>
              <span className="text-white">{course.shortTitle}</span>
            </nav>

            <div className="text-center">
              <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
                Non-Technical Training Program
              </p>
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
                {course.title}
              </h1>
              <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto">
                {course.tagline}
              </p>

              {/* Quick Stats */}
              <div className="flex flex-wrap justify-center gap-4 mb-8">
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <FiClock className="w-4 h-4" />
                  {course.duration}
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <FiUsers className="w-4 h-4" />
                  Max {course.maxStudents} Students
                </span>
                <span className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2 text-sm">
                  <FiBookOpen className="w-4 h-4" />
                  {course.quizzes} Quizzes
                </span>
              </div>

              <div className="flex flex-wrap justify-center gap-4">
                <BookConsultButton
                  variant="white"
                  className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
                >
                  Apply Now
                  <FiArrowRight className="w-4 h-4" />
                </BookConsultButton>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Tab Navigation */}
      <nav className="sticky top-24 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/85">
        <div className="container mx-auto px-6 py-4 md:px-8">
          <div
            className="mx-auto grid w-full max-w-5xl grid-cols-3 overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 p-1"
            role="tablist"
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                role="tab"
                aria-selected={activeTab === tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`
                  flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold whitespace-nowrap transition-all duration-200 motion-reduce:transition-none
                  ${
                    activeTab === tab.id
                      ? "bg-white text-brand shadow-sm"
                      : "text-slate-600 hover:text-slate-900"
                  }
                `}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </nav>

      {/* Tab Content */}
      <div className="min-h-[60vh] bg-slate-50">
        {/* ===== OVERVIEW TAB ===== */}
        {activeTab === "overview" && (
          <div>
            {/* About Course */}
            <section className="py-16 md:py-20">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto max-w-5xl rounded-3xl border border-slate-200 bg-white px-6 py-8 shadow-sm md:px-10 md:py-10">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-6 md:mb-8">
                    About This <span className="gradient-text">Course</span>
                  </h2>
                  <div className="space-y-4 md:space-y-5">
                    {course.overview.aboutCourse.map((para, i) => (
                      <p key={i} className="text-sm md:text-base text-slate-700 leading-7">
                        {para}
                      </p>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Content Sections */}
            <section className="pb-16 md:pb-20">
              <div className="container mx-auto px-6 md:px-8">
                <div className="mx-auto flex max-w-5xl flex-col gap-6 md:gap-8">
                  {[
                    course.overview.whyItMatters,
                    course.overview.whatYouGain,
                    course.overview.realWorldApplications,
                    course.overview.certification,
                    course.overview.enrollCTA,
                  ].map((section) => (
                    <div
                      key={section.heading}
                      className="rounded-3xl border border-slate-200 bg-white px-6 py-7 shadow-sm md:px-10 md:py-9"
                    >
                      <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-4">
                        {section.heading}
                      </h2>
                      <div className="space-y-3 md:space-y-4">
                        {section.paragraphs.map((para, i) => (
                          <p key={i} className="text-sm md:text-base text-slate-700 leading-7">
                            {para}
                          </p>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* Key Highlights */}
            <section className="py-16 md:py-20 bg-white">
              <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
                    Key <span className="gradient-text">Highlights</span>
                  </h2>
                  <div className="grid gap-3 sm:grid-cols-2">
                    {course.keyHighlights.map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-center gap-3 rounded-xl border border-slate-200 bg-page-soft px-4 py-3 hover-lift"
                      >
                        <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0" />
                        <span className="text-sm md:text-base text-slate-700">{highlight}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Who Can Apply */}
            <section className="py-16 md:py-20 bg-gray-50">
              <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
                    Who Can <span className="gradient-text">Apply?</span>
                  </h2>
                  <div className="space-y-3">
                    {course.whoCanApply.map((item) => (
                      <div
                        key={item}
                        className="flex items-start gap-3 rounded-xl bg-white border border-slate-200 px-5 py-4 hover-lift"
                      >
                        <span className="mt-0.5 inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-brand text-xs font-bold flex-shrink-0">
                          ✓
                        </span>
                        <span className="text-sm md:text-base text-slate-700">{item}</span>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </section>

            {/* Career Roles */}
            <section className="py-16 md:py-20 bg-white">
              <div className="container mx-auto px-6 md:px-8">
                <div className="max-w-5xl mx-auto">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3 text-center">
                    Where Will Your Career <span className="gradient-text">Take Off?</span>
                  </h2>
                  <p className="text-sm md:text-base text-slate-700 text-center mb-8">
                    Upon completing this course, you will acquire the skills required for various
                    roles in the industry:
                  </p>
                  <div className="flex flex-wrap justify-center gap-3">
                    {course.careerRoles.map((role) => (
                      <span
                        key={role}
                        className="rounded-full border border-brand/30 bg-brand-soft px-5 py-2.5 text-sm font-semibold text-slate-800 hover-lift"
                      >
                        {role}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ===== CURRICULUM TAB ===== */}
        {activeTab === "curriculum" && (
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                    Course <span className="gradient-text">Curriculum</span>
                  </h2>
                  <p className="text-sm md:text-base text-slate-700">
                    A comprehensive, module-by-module breakdown of everything you will learn.
                  </p>
                </header>

                <div className="space-y-3">
                  {course.curriculum.map((mod, idx) => {
                    const isOpen = expandedModules.has(idx);
                    return (
                      <div
                        key={mod.module}
                        className="rounded-2xl bg-white border border-slate-200 overflow-hidden hover-lift"
                      >
                        <button
                          onClick={() => toggleModule(idx)}
                          className="w-full flex items-center gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                          aria-expanded={isOpen}
                        >
                          <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand text-white text-sm font-bold flex-shrink-0">
                            {String(idx + 1).padStart(2, "0")}
                          </span>
                          <span className="flex-1 text-sm md:text-base font-semibold text-slate-900">
                            {mod.module}
                          </span>
                          <FiChevronDown
                            className={`w-5 h-5 text-slate-500 transition-transform duration-200 ${
                              isOpen ? "rotate-180" : ""
                            }`}
                          />
                        </button>
                        {isOpen && (
                          <div className="px-5 pb-4 md:px-6 md:pb-5 pt-0">
                            <div className="ml-12 border-l-2 border-brand-soft pl-4 space-y-2">
                              {mod.topics.map((topic) => (
                                <div
                                  key={topic}
                                  className="flex items-start gap-2 text-sm text-slate-700"
                                >
                                  <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                                  <span>{topic}</span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>

                <div className="mt-10 text-center">
                  <BookConsultButton className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                    Download Detailed Brochure
                    <FiArrowRight className="w-4 h-4" />
                  </BookConsultButton>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ===== FAQS TAB ===== */}
        {activeTab === "faqs" && (
          <section className="py-16 md:py-20 bg-gray-50">
            <div className="container mx-auto px-6 md:px-8">
              <div className="max-w-5xl mx-auto">
                <header className="text-center mb-12">
                  <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
                    Frequently Asked <span className="gradient-text">Questions</span>
                  </h2>
                  <p className="text-sm md:text-base text-slate-700">
                    Find answers to common questions about the {course.shortTitle} course.
                  </p>
                </header>

                <div className="grid gap-4 md:grid-cols-2">
                  {course.faqs.map((faq, idx) => (
                    <article
                      key={faq.q}
                      className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-5 md:px-6 md:py-6"
                    >
                      <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2">
                        {idx + 1}. {faq.q}
                      </h3>
                      <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                        {faq.a}
                      </p>
                    </article>
                  ))}
                </div>

                <div className="mt-10 rounded-2xl border border-brand/20 bg-brand-soft p-6 md:p-8 text-center">
                  <h3 className="text-lg font-bold text-slate-900 mb-2">
                    Still have questions?
                  </h3>
                  <p className="text-sm text-slate-700 mb-4">
                    Our course advisors are happy to help you find the right training program.
                  </p>
                  <BookConsultButton className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                    Talk to a Course Advisor
                    <FiArrowRight className="w-4 h-4" />
                  </BookConsultButton>
                </div>
              </div>
            </div>
          </section>
        )}
      </div>

      {/* Bottom CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={course.heroImage}
            alt={course.title}
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Start Your {course.shortTitle} Journey?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Enroll in Stack Learn&apos;s {course.title} and take the first step towards a
              rewarding career.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <BookConsultButton
                variant="white"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
              >
                Apply Now
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
              <Link
                href="/trainings/non-technical"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base font-semibold border-2 border-white/40 rounded-full text-white hover:bg-white/10 transition-colors duration-300"
              >
                <FiArrowLeft className="w-4 h-4" />
                All Non-Technical Courses
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
