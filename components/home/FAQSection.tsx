"use client";

import Link from "next/link";

const faqs = [
  {
    question: "How can StackLearn help me choose the right university and course?",
    answer:
      "We provide personalized study abroad counselling to match your academic profile, career goals, budget, and preferred country. Our experts shortlist the right universities and courses to maximize your admission success.",
  },
  {
    question: "Does StackLearn assist with student visa applications and documentation?",
    answer:
      "Yes. We offer complete student visa assistance including documentation guidance, financial proof preparation, and interview support to improve your visa approval chances.",
  },
  {
    question: "What services does StackLearn provide for studying abroad?",
    answer:
      "We offer end to end study abroad services including profile evaluation, university shortlisting, SOP and LOR guidance, application submission, education loan assistance, visa processing, and pre departure support.",
  },
  {
    question: "Do you help with scholarships and education loans?",
    answer:
      "Yes. We guide students in identifying scholarship opportunities and securing suitable education loans to make international education financially manageable.",
  },
  {
    question: "When should I start planning my study abroad journey?",
    answer:
      "Ideally, start 8 to 12 months before your intake to allow time for test preparation, university applications, and student visa processing.",
  },
  {
    question: "What exams are required to study abroad?",
    answer:
      "Most universities require IELTS or TOEFL for English proficiency. Some programs may also require GRE or GMAT depending on the course and country.",
  },
  {
    question: "Which countries does StackLearn support?",
    answer:
      "We support students planning to study in top destinations including the UK, USA, Canada, Australia, Germany, Ireland, and other leading global education hubs.",
  },
  {
    question: "Do you provide accommodation and post arrival support?",
    answer:
      "Yes. We guide students with accommodation options, pre departure planning, and basic settlement support for a smooth transition abroad.",
  },
  {
    question: "Is counselling at StackLearn free?",
    answer:
      "We offer an initial free counselling session and profile evaluation to help you plan your study abroad journey confidently.",
  },
  {
    question: "How long does the student visa process take?",
    answer:
      "Student visa processing times vary by country, but with proper documentation and structured guidance, most visas are processed within a few weeks.",
  },
];

export default function FAQSection() {
  const leftFaqs = faqs.slice(0, 5);
  const rightFaqs = faqs.slice(5, 10);

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            Find answers to the most common queries students ask before studying abroad.
          </p>
        </div>

        {/* Desktop: 5 left + 5 right, perfectly aligned by row */}
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

        {/* Mobile: single column for readability */}
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
          <p className="text-gray-600 mb-4">Didn’t find your question?</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-brand text-white rounded-full font-bold hover:shadow-xl hover:shadow-brand/40 hover:scale-105 transition-all duration-300 transform"
          >
            Talk to a Counsellor
          </Link>
        </div>
      </div>
    </section>
  );
}
