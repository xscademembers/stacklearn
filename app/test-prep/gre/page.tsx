import type { Metadata } from "next";
import Image from "next/image";
import BookConsultButton from "@/components/BookConsultButton";
import TestPrepSuccessStoriesSection from "@/components/test-prep/TestPrepSuccessStoriesSection";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "GRE Coaching | StackLearn Test Preparation",
  description:
    "Focused GRE coaching with structured concepts, problem-solving practice, mock exams, and performance analysis for competitive scores for MS, MBA and other graduate programs abroad.",
};

export default function GREPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184644/pexels-photo-3184644.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student preparing for GRE exam"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              GRE TEST PREPARATION
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
              GRE Coaching for Global Graduate Programs
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Strengthen your profile for MS, MBA, and other graduate programs abroad with structured
              GRE preparation and expert mentoring.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free GRE Strategy Session
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* What is GRE */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                What is the <span className="gradient-text">GRE?</span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                The GRE (Graduate Record Examination) is a globally recognized standardized test
                required for admission into many postgraduate and master&apos;s programs, especially
                in the USA, Canada, Germany, and other European destinations.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                It evaluates your readiness for advanced academic study by assessing analytical
                writing, quantitative reasoning, and verbal reasoning skills. A strong GRE score
                enhances your chances of securing admission into competitive universities and can
                improve scholarship opportunities.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                For students planning to pursue MS, MBA (in select universities), or other graduate
                programs abroad, the GRE plays a crucial role in strengthening the overall
                application profile. StackLearn helps you build a targeted plan that aligns with your
                dream universities.
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
                GRE Scores &amp; University Expectations
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                GRE scores are reported as:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700 mb-4">
                <li>• Verbal Reasoning: 130–170</li>
                <li>• Quantitative Reasoning: 130–170</li>
                <li>• Analytical Writing: 0–6</li>
              </ul>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-3">
                Typical total score expectations (Verbal + Quant):
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700">
                <li>• Average universities: 295–310</li>
                <li>• Competitive universities: 310–320</li>
                <li>• Top‑ranked universities: 320+</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Our Score Strategy</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We review your target universities and design a GRE preparation roadmap to help you
                achieve or exceed the required scores. This includes concept building, problem‑solving
                drills, sectional tests, and full‑length mocks with detailed analysis.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Sections */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            GRE Sections Explained
          </h2>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Verbal Reasoning",
                body:
                  "Tests your ability to understand written material, analyze word relationships, and evaluate arguments using reading comprehension, text completion, and sentence equivalence questions.",
              },
              {
                title: "Quantitative Reasoning",
                body:
                  "Evaluates arithmetic, algebra, geometry, and data analysis skills while measuring numerical reasoning and problem‑solving ability.",
              },
              {
                title: "Analytical Writing",
                body:
                  "Assesses your capacity to articulate complex ideas clearly and effectively through issue and argument essays.",
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
              GRE Coaching Modes at StackLearn
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Choose a format that fits your learning style — all options include concept teaching,
              practice sets, and mock exams.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Online GRE Coaching",
                body:
                  "Interactive live sessions with real‑time doubt solving, flexible timing, and access to recorded classes.",
              },
              {
                title: "Offline Classroom Coaching",
                body:
                  "Focused classroom environment with personalized mentoring, concept clarity, and group problem solving.",
              },
              {
                title: "Hybrid Model",
                body:
                  "Combination of online and offline sessions for maximum flexibility without losing structure.",
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
                  <li>• Concept‑based teaching</li>
                  <li>• Advanced problem‑solving practice</li>
                  <li>• Section‑wise tests &amp; full‑length mocks</li>
                  <li>• Detailed performance analysis</li>
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      <TestPrepSuccessStoriesSection testPrepSlug="gre" />

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              GRE FAQs
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "What is the validity of GRE scores?",
                a: "GRE scores are valid for five years from the test date.",
              },
              {
                q: "Is GRE required for all master’s programs?",
                a:
                  "No. GRE requirements depend on the course and university. Many technical and research‑oriented programs prefer GRE.",
              },
              {
                q: "How long is the GRE exam?",
                a:
                  "The updated GRE General Test duration is approximately 1 hour 58 minutes. It includes verbal, quant, and analytical writing sections.",
              },
              {
                q: "Do you provide full‑length GRE mock tests?",
                a:
                  "Yes. We conduct regular full‑length mock tests with detailed score reports and improvement plans.",
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
            src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student achieving high GRE score"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Improve Your GRE Score?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6">
              Join StackLearn&apos;s GRE preparation program and build a strong academic profile for
              top global universities.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Your Free GRE Strategy Session
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}

