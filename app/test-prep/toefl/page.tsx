import type { Metadata } from "next";
import Image from "next/image";
import BookConsultButton from "@/components/BookConsultButton";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "TOEFL Coaching | StackLearn Test Preparation",
  description:
    "TOEFL coaching focused on integrated reading, listening, speaking, and writing skills for admissions in the USA, Canada, and other destinations as part of your overall study abroad process.",
};

export default function TOEFLPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student preparing for TOEFL exam"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              TOEFL TEST PREPARATION
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
              TOEFL Coaching for Global Admissions
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Build strong academic English skills for universities worldwide, especially in the USA
              and Canada.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free TOEFL Consultation
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* What is TOEFL */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                What is the <span className="gradient-text">TOEFL?</span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                The TOEFL (Test of English as a Foreign Language) is an internationally recognized
                English proficiency exam accepted by universities worldwide, particularly in the USA
                and Canada. It measures your ability to use and understand English in an academic
                environment.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                TOEFL evaluates how well you can combine listening, reading, speaking, and writing
                skills in university‑level tasks. A strong TOEFL score strengthens your university
                application and improves your chances of admission and visa approval.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                For students aiming to study in English‑speaking countries, TOEFL demonstrates
                academic communication readiness. StackLearn helps you prepare with integrated skills
                practice and exam‑style tasks.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Score requirements */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-8 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                TOEFL Scores &amp; Requirements
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                TOEFL iBT is scored out of 120 points. Each section is scored out of 30:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700 mb-4">
                <li>• Reading: 0–30</li>
                <li>• Listening: 0–30</li>
                <li>• Speaking: 0–30</li>
                <li>• Writing: 0–30</li>
              </ul>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-3">
                Typical score expectations:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700">
                <li>• Standard universities: 80–90</li>
                <li>• Competitive universities: 90–100</li>
                <li>• Top universities: 100+</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Score Planning with StackLearn</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We help you understand the TOEFL requirements of your target programs and build a
                score‑focused preparation plan with full‑length mocks and speaking &amp; writing
                evaluations.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            TOEFL Sections Explained
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Reading",
                body:
                  "Tests comprehension of academic passages and ability to understand key ideas, supporting details, and vocabulary.",
              },
              {
                title: "Listening",
                body:
                  "Assesses understanding of lectures and campus conversations, including main ideas and speaker attitude.",
              },
              {
                title: "Speaking",
                body:
                  "Measures how clearly and coherently you can express ideas in English in academic and campus‑life contexts.",
              },
              {
                title: "Writing",
                body:
                  "Evaluates your ability to present well‑structured responses and academic arguments through integrated and independent tasks.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 hover-lift"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">{item.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mode of Training */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              TOEFL Coaching Modes
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Choose from online, offline, or hybrid coaching modes — all focused on integrated skills
              and exam strategies.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Online Coaching",
                body:
                  "Live sessions with structured speaking and writing practice, plus flexible schedules and recordings.",
              },
              {
                title: "Offline Coaching",
                body:
                  "In‑person training with focused attention, performance tracking, and regular practice tests.",
              },
              {
                title: "Hybrid Model",
                body:
                  "Blended learning option combining online convenience with classroom engagement.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 md:px-6 md:py-7 hover-lift text-left"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed mb-3">{item.body}</p>
                <ul className="space-y-1.5 text-xs md:text-sm text-slate-700">
                  <li>• Integrated practice exercises</li>
                  <li>• Mock tests with score feedback</li>
                  <li>• Speaking evaluation &amp; essay correction</li>
                  <li>• Time‑management strategies</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              TOEFL Success Stories
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Our TOEFL students have achieved competitive scores and admissions in universities across
              the USA and Canada.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Score 102 in 6 Weeks",
                body: "Student D improved from 78 to 102 with focused listening and speaking practice.",
              },
              {
                title: "105+ Score Achiever",
                body:
                  "Student E scored 105 and secured admission in a reputed US university.",
              },
              {
                title: "High Score with Scholarship",
                body:
                  "Student F achieved 98 and received scholarship consideration from multiple institutions.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-6 md:px-6 md:py-7 hover-lift"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              TOEFL FAQs
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "How long is TOEFL valid?",
                a: "TOEFL scores are valid for two years from the test date.",
              },
              {
                q: "Is TOEFL easier than IELTS?",
                a:
                  "Both exams assess English proficiency differently. The better option depends on university requirements and your comfort with the test format.",
              },
              {
                q: "Do you provide speaking feedback?",
                a:
                  "Yes. Personalized speaking feedback and essay evaluation are included in our TOEFL program.",
              },
            ].map((item) => (
              <div
                key={item.q}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 hover-lift"
              >
                <p className="font-semibold text-slate-900 mb-1 text-sm md:text-base">
                  {item.q}
                </p>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students preparing for TOEFL exam"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Start Your TOEFL Preparation with StackLearn
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6">
              Join our TOEFL coaching program to build strong academic English skills and achieve a
              competitive score.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Your Free TOEFL Consultation
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}

