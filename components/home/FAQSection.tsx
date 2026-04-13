"use client";

import Link from "next/link";
import type { FaqItem } from "@/lib/cms-home-content";

export type FaqSectionCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
  notFoundPrompt: string;
  counsellorCta: string;
  faqs: FaqItem[];
};

export default function FAQSection({ content }: { content: FaqSectionCms }) {
  const faqs = content.faqs.slice(0, 10);
  const leftFaqs = faqs.slice(0, 5);
  const rightFaqs = faqs.slice(5, 10);

  if (faqs.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="hidden md:grid md:grid-cols-2 gap-6 md:gap-8 auto-rows-fr">
          {leftFaqs.map((faq, rowIndex) => (
            <div
              key={`left-${faq.question}`}
              style={{ gridColumn: 1, gridRow: rowIndex + 1 }}
              className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10 flex flex-col"
            >
              <p className="font-semibold text-slate-900 mb-2 text-sm md:text-base">
                {rowIndex + 1}. {faq.question}
              </p>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                {faq.answer}
              </p>
            </div>
          ))}
          {rightFaqs.map((faq, rowIndex) => (
            <div
              key={`right-${faq.question}`}
              style={{ gridColumn: 2, gridRow: rowIndex + 1 }}
              className="h-full bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 md:px-6 md:py-5 text-left transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/10 flex flex-col"
            >
              <p className="font-semibold text-slate-900 mb-2 text-sm md:text-base">
                {rowIndex + 1 + leftFaqs.length}. {faq.question}
              </p>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                {faq.answer}
              </p>
            </div>
          ))}
        </div>

        <div className="md:hidden space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={`mobile-${faq.question}`}
              className="bg-white rounded-2xl shadow-sm border border-slate-200 px-5 py-4 text-left"
            >
              <p className="font-semibold text-slate-900 mb-2 text-sm">
                {index + 1}. {faq.question}
              </p>
              <p className="text-xs text-slate-700 leading-relaxed">{faq.answer}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <p className="text-gray-600 mb-4">{content.notFoundPrompt}</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-brand text-white rounded-full font-bold hover:shadow-xl hover:shadow-brand/40 hover:scale-105 transition-all duration-300 transform"
          >
            {content.counsellorCta}
          </Link>
        </div>
      </div>
    </section>
  );
}
