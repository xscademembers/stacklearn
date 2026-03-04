import type { Metadata } from "next";
import Image from "next/image";
import BookConsultButton from "@/components/BookConsultButton";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "IELTS Coaching | StackLearn Test Preparation",
  description:
    "Structured IELTS coaching with expert trainers, flexible modes, mock tests, and personalized feedback to help you achieve your target band score.",
};

export default function IELTSPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student preparing for IELTS exam"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              IELTS TEST PREPARATION
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3">
              IELTS Coaching for Study Abroad
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Build the English proficiency and confidence you need to secure admissions, scholarships,
              and student visas at top universities worldwide.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free IELTS Consultation
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* What is IELTS */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                What is <span className="gradient-text">IELTS?</span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                IELTS (International English Language Testing System) is one of the most widely
                accepted English language proficiency tests for students planning to study abroad. It
                evaluates your ability to communicate in English across four key skills — listening,
                reading, writing, and speaking.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                Universities in the UK, USA, Canada, Australia, and Europe accept IELTS scores as proof
                of English proficiency for admission into undergraduate, postgraduate, and professional
                programs. A strong IELTS score can boost your chances of acceptance and increase
                scholarship eligibility.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                IELTS is designed to measure real‑world communication skills and academic readiness.
                Whether you are preparing for university entry or student visa requirements, StackLearn
                helps you build the right strategy, practice plan, and confidence to reach your target
                band.
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
                IELTS Band Scores &amp; Requirements
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                IELTS results are reported on a band scale from 0 to 9, where each band corresponds to
                a level of English proficiency:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700 mb-4">
                <li>• Band 9: Expert user</li>
                <li>• Band 8: Very good user</li>
                <li>• Band 7: Good user</li>
                <li>• Band 6: Competent user</li>
                <li>• Band 5 and below: Modest or below</li>
              </ul>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-3">
                Typical university expectations:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700">
                <li>• Undergraduate programs: usually 6.0 – 6.5 bands</li>
                <li>• Postgraduate programs: usually 6.5 – 7.0 bands or higher</li>
                <li>• Highly ranked &amp; competitive courses: 7.0+ bands</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <h3 className="text-lg font-bold text-slate-900 mb-3">How StackLearn Helps</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We map IELTS requirements for each of your target universities, then design a
                personalized preparation plan to close the gap between your current level and your
                desired band score — with milestones, practice tests, and focused speaking &amp; writing
                improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Modules */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            IELTS Modules Explained
          </h2>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {[
              {
                title: "Listening",
                body:
                  "Listen to conversations and lectures, then answer questions to test your understanding of details, tone, and context.",
              },
              {
                title: "Reading",
                body:
                  "Comprehend academic and general texts, identify main ideas, interpret arguments, and understand vocabulary in context.",
              },
              {
                title: "Writing",
                body:
                  "Complete Task 1 (describe a chart/graph) and Task 2 (essay) to show clarity, coherence, and grammar accuracy.",
              },
              {
                title: "Speaking",
                body:
                  "Face‑to‑face interview with an examiner to assess fluency, pronunciation, vocabulary range, and ability to express ideas.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 hover-lift flex flex-col"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-xs md:text-sm text-slate-600">
            Your overall IELTS band score is the average of these four modules.
          </p>
        </div>
      </section>

      {/* Mode of Training */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Flexible <span className="gradient-text">IELTS Training Modes</span>
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Choose a mode that fits your schedule — every option includes practice tests,
              section‑wise exercises, personalized feedback, and strategy sessions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Online Coaching",
                body:
                  "Live interactive sessions from anywhere with real‑time doubt resolution and access to recordings.",
              },
              {
                title: "Offline Classroom",
                body:
                  "In‑person classes led by experienced trainers for focused classroom learning and peer interaction.",
              },
              {
                title: "Hybrid Model",
                body:
                  "A mix of online and offline sessions for students who need flexibility with structured support.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 md:px-6 md:py-7 hover-lift flex flex-col text-left"
              >
                <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {item.body}
                </p>
                <ul className="mt-3 space-y-1.5 text-xs md:text-sm text-slate-700">
                  <li>• Practice tests &amp; sectional exercises</li>
                  <li>• Personalized feedback on weak areas</li>
                  <li>• Strategy sessions before the exam</li>
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
              IELTS Success Stories
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Countless students have achieved their desired IELTS bands with StackLearn&apos;s
              expert support and structured preparation.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Band 7.5 in 8 Weeks",
                body:
                  "Student X improved from Band 6.0 to 7.5 through focused speaking and writing practice.",
              },
              {
                title: "Band 8.0 Achiever",
                body:
                  "Student Y scored Band 8.0 and received multiple offers from UK universities.",
              },
              {
                title: "Band 7.0 with Scholarship",
                body:
                  "Student Z achieved Band 7.0 and secured admission along with scholarship support.",
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
              IELTS FAQs
            </h2>
          </div>
          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                q: "What is the IELTS test format?",
                a:
                  "IELTS consists of four sections: Listening, Reading, Writing, and Speaking. The total test duration is approximately 2 hours 45 minutes.",
              },
              {
                q: "How is the IELTS band score calculated?",
                a:
                  "Each section is scored from 0 to 9. Your final band score is the average of the four sections, rounded to the nearest whole or half band.",
              },
              {
                q: "How long is my IELTS score valid?",
                a: "IELTS scores are valid for two years from the date of the test.",
              },
              {
                q: "How many times can I take the IELTS exam?",
                a:
                  "You can take the IELTS exam as many times as you like. We recommend structured preparation and mock tests before each attempt.",
              },
              {
                q: "Do you provide mock IELTS tests?",
                a:
                  "Yes, StackLearn includes regular mock tests and detailed feedback to help you track progress and build confidence.",
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
            src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating IELTS success"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Achieve Your Best IELTS Score?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6">
              Join StackLearn&apos;s IELTS preparation program and benefit from expert coaching,
              personalized guidance, and a clear roadmap to your target band.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Your Free IELTS Consultation Now
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}

