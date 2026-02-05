"use client";

import { useState } from "react";
import Link from "next/link";
import { FiChevronDown, FiChevronUp } from "react-icons/fi";

const faqs = [
  {
    question: "What documents do I need to apply for study abroad?",
    answer:
      "Typically, you’ll need academic transcripts, English proficiency test scores (IELTS/TOEFL), Statement of Purpose (SOP), Letters of Recommendation (LOR), passport copy, and financial proof. Requirements may vary by country and university.",
  },
  {
    question: "How long does the visa process take?",
    answer:
      "Visa processing times vary by country. Generally, UK visas take 3-4 weeks, USA takes 2-3 months, Canada takes 4-6 weeks, and Australia takes 4-8 weeks. Processing times can be longer during peak seasons.",
  },
  {
    question: "Can I work while studying abroad?",
    answer:
      "Yes, most countries allow international students to work part-time (usually 20 hours per week) during studies and full-time during breaks. Post-study work permits are also available in most countries, allowing you to work after graduation.",
  },
  {
    question: "What is the minimum IELTS score required?",
    answer:
      "IELTS requirements vary by university and course. Generally, undergraduate programs require 6.0-6.5, while postgraduate programs require 6.5-7.0. Some competitive programs may require 7.5 or higher.",
  },
  {
    question: "How much does it cost to study abroad?",
    answer:
      "Costs vary significantly by country and course. On average, tuition fees range from ₹10-25L per year, and living expenses range from ₹5-15L per year. Scholarships and financial aid can significantly reduce these costs.",
  },
  {
    question: "Do I need to show proof of funds for visa?",
    answer:
      "Yes, most countries require proof of sufficient funds to cover tuition fees and living expenses for at least the first year. This typically includes bank statements, education loans, or scholarship letters.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="py-16 md:py-24 bg-gray-50">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            Find answers to the most common queries students ask before studying
            abroad.
          </p>
        </div>
        <div className="max-w-3xl mx-auto space-y-5">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl shadow-lg hover:shadow-xl overflow-hidden border-2 border-transparent hover:border-brand-soft transition-all duration-300"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full px-6 py-5 flex items-center justify-between text-left hover:bg-page-soft transition-all duration-300"
              >
                <span className="font-bold text-slate-900 pr-4 text-lg">
                  {index + 1}. {faq.question}
                </span>
                {openIndex === index ? (
                  <FiChevronUp className="w-6 h-6 text-brand flex-shrink-0 transform transition-transform duration-300" />
                ) : (
                  <FiChevronDown className="w-6 h-6 text-gray-400 flex-shrink-0 transform transition-transform duration-300" />
                )}
              </button>
              {openIndex === index && (
                <div className="px-6 pb-5 text-slate-700 leading-relaxed animate-fadeIn">
                  {faq.answer}
                </div>
              )}
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
