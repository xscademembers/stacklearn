import type { Metadata } from "next";
import Image from "next/image";
import BookConsultButton from "@/components/BookConsultButton";
import TestPrepSuccessStoriesSection from "@/components/test-prep/TestPrepSuccessStoriesSection";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "GMAT Coaching | StackLearn Test Preparation",
  description:
    "GMAT coaching focused on quantitative, verbal, and data insights sections to help you target competitive MBA programs worldwide.",
};

export default function GMATPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Professional preparing for GMAT exam"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              GMAT TEST PREPARATION
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
              GMAT Coaching for Global MBA Admissions
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Prepare for top international business schools with targeted GMAT coaching and
              score‑boosting strategies.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free GMAT Strategy Session
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* What is GMAT */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                What is the <span className="gradient-text">GMAT?</span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                The GMAT (Graduate Management Admission Test) is a standardized entrance exam
                required for MBA and management programs worldwide. It evaluates analytical
                reasoning, quantitative skills, verbal reasoning, and data interpretation.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Business schools use GMAT scores to assess a candidate&apos;s ability to handle
                rigorous management education. A competitive GMAT score significantly enhances your
                chances of securing admission into reputed global business schools.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                StackLearn&apos;s GMAT coaching focuses on building strong fundamentals, exam
                strategies, and time management techniques to help you achieve a score that matches
                your dream MBA program.
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
                GMAT Scores &amp; Target Ranges
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                GMAT is scored out of 800. Typical expectations include:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700 mb-4">
                <li>• Standard MBA programs: 550–650</li>
                <li>• Competitive B‑schools: 650–700</li>
                <li>• Top global B‑schools: 700+</li>
              </ul>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                We align your preparation with target schools so that every mock and practice
                session moves you closer to your goal score.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Score Planning with StackLearn</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Through diagnostic tests and performance analysis, we create a personalized GMAT
                study plan that prioritizes your weak areas while sharpening your strengths in
                quant, verbal, and data insights.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            GMAT Sections Explained
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Quantitative",
                body:
                  "Measures mathematical reasoning and problem‑solving skills using arithmetic, algebra, and data analysis questions.",
              },
              {
                title: "Verbal",
                body:
                  "Tests reading comprehension, critical reasoning, and sentence correction skills to assess verbal reasoning strength.",
              },
              {
                title: "Data Insights",
                body:
                  "Assesses your ability to interpret and analyze data using charts, tables, and multi‑source information for business decisions.",
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
              GMAT Coaching Modes
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Choose the most convenient format — every mode focuses on concept clarity, strategy,
              and timed practice.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Online GMAT Coaching",
                body:
                  "Live sessions with advanced problem‑solving strategies, flexible schedules, and recordings for revision.",
              },
              {
                title: "Offline Coaching",
                body:
                  "Classroom training with expert mentorship, group discussions, and regular assessments.",
              },
              {
                title: "Hybrid Training",
                body:
                  "Blend of online convenience and offline depth for working professionals and final‑year students.",
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
                  <li>• Concept clarity sessions</li>
                  <li>• Section‑wise drills</li>
                  <li>• Advanced‑level mock exams</li>
                  <li>• Score improvement strategies</li>
                  <li>• Personalized performance tracking</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestPrepSuccessStoriesSection testPrepSlug="gmat" />

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              GMAT FAQs
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "How long is GMAT valid?",
                a: "GMAT scores are valid for five years from the test date.",
              },
              {
                q: "Is GMAT mandatory for MBA abroad?",
                a:
                  "Most reputed MBA programs require GMAT, though some schools may offer waivers based on work experience or alternative tests.",
              },
              {
                q: "Do you provide advanced‑level mock exams?",
                a:
                  "Yes. We provide structured mock exams aligned with the latest GMAT format, along with detailed score analysis.",
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
            src="https://images.pexels.com/photos/3184298/pexels-photo-3184298.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Professional preparing for GMAT exam"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Achieve a Competitive GMAT Score?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6">
              Join StackLearn&apos;s GMAT coaching and take the next step toward your global MBA
              aspirations.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Your Free GMAT Strategy Session
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}

