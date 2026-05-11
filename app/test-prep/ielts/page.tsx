import type { Metadata } from "next";
import Image from "next/image";
import BookConsultButton from "@/components/BookConsultButton";
import TestPrepSuccessStoriesSection from "@/components/test-prep/TestPrepSuccessStoriesSection";
import { FiArrowRight } from "react-icons/fi";

export const metadata: Metadata = {
  title: "IELTS Coaching | StackLearn Test Preparation",
  description:
    "Expert IELTS coaching online and classroom programs with structured listening, reading, writing, and speaking preparation, mock tests, and personalized feedback for your target band score and overseas education goals.",
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
              IELTS Coaching for Study Abroad Success
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6">
              Achieve your target IELTS band with expert coaching, structured practice, and
              real-exam simulations at StackLearn — ideal for students planning to study in the UK, USA, Canada, Australia and other top destinations.
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
                What is the <span className="gradient-text">IELTS?</span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                IELTS (International English Language Testing System) is one of the most widely
                accepted English language proficiency tests for students planning to study abroad. It
                evaluates your ability to communicate in English across four key skills — listening,
                reading, writing, and speaking.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                Universities in countries like the UK, USA, Canada, Australia, and Europe accept
                IELTS scores as proof of English proficiency for admission into undergraduate,
                postgraduate, and professional programs.
              </p>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed">
                IELTS is designed to measure real-world communication skills and academic readiness.
                Whether you are preparing for university entry or student visa requirements, a strong
                IELTS score can significantly boost your chances of acceptance and increase
                scholarship eligibility.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                At StackLearn, we help you understand specific score requirements for your target
                universities and build a preparation plan to meet or exceed them. Our structured
                coaching covers all four IELTS modules with real-exam practice.
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
                IELTS Score <span className="gradient-text">Requirements</span>
              </h2>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-4">
                IELTS results are reported on a band scale from 0 to 9:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700 mb-4">
                <li>• Band 9: Expert user</li>
                <li>• Band 8: Very good user</li>
                <li>• Band 7: Good user</li>
                <li>• Band 6: Competent user</li>
                <li>• Band 5 and below: Modest or below</li>
              </ul>
              <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-3">
                Typical university requirements:
              </p>
              <ul className="space-y-1.5 text-sm md:text-base text-slate-700">
                <li>• Undergraduate programs: 6.0 to 6.5 bands</li>
                <li>• Postgraduate programs: 6.5 to 7.0 bands or higher</li>
                <li>• High-ranked universities: 7.0+ bands for competitive courses</li>
              </ul>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Score Planning with StackLearn</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We help you understand specific score requirements for your target universities and
                build a preparation plan to meet or exceed them. Our approach includes diagnostic
                tests, section-wise improvement plans, and regular mock assessments.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* IELTS Modules */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            IELTS Modules Explained
          </h2>
          <div className="grid gap-6 md:grid-cols-4">
            {[
              {
                title: "Listening",
                body:
                  "You will listen to recordings of conversations and lectures in English and answer questions that test your ability to understand detailed information, tone, and context in academic and social environments.",
              },
              {
                title: "Reading",
                body:
                  "Evaluates your comprehension of texts from books, magazines, and academic materials. You'll be tested on your ability to identify meaning, interpret ideas, and understand logical arguments.",
              },
              {
                title: "Writing",
                body:
                  "Complete two tasks: Task 1 (summarise a chart or graph) and Task 2 (write an essay expressing an opinion). Both assess your ability to present ideas clearly, logically, and accurately.",
              },
              {
                title: "Speaking",
                body:
                  "A face-to-face interview with an examiner assessing your ability to communicate fluently, express ideas confidently, demonstrate vocabulary range, and maintain clarity of thought.",
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
          <p className="text-center text-sm text-slate-600 mt-6">
            Each module is equally important. Your final IELTS band score is calculated as an
            average of all four.
          </p>
        </div>
      </section>

      {/* Mode of Training */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              IELTS Coaching Modes at StackLearn
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Choose a format that fits your learning style and schedule — all options include
              practice tests, personalized feedback, and strategy sessions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Online IELTS Coaching",
                body:
                  "Live interactive sessions you can join from anywhere in the world with real-time doubt resolution and flexible schedules.",
              },
              {
                title: "Offline Classroom Coaching",
                body:
                  "In-person classes led by experienced instructors who provide hands-on training and guidance with direct feedback.",
              },
              {
                title: "Hybrid Training Model",
                body:
                  "A mix of online and offline learning for students who want structured support with flexibility.",
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
                  <li>• Practice tests &amp; section-wise exercises</li>
                  <li>• Personalized feedback on weak areas</li>
                  <li>• Speaking evaluation &amp; essay correction</li>
                  <li>• Recorded sessions for revision</li>
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
              expert support. Our structured coaching and regular mock tests have helped students
              secure admissions and visas at top universities.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: "Band 7.5 in 8 Weeks",
                body:
                  "Student X improved from Band 6.0 to Band 7.5 within 8 weeks of focused coaching.",
              },
              {
                title: "Band 8.0 for UK Admit",
                body:
                  "Student Y scored Band 8.0 and received offers from top UK universities.",
              },
              {
                title: "Band 7.0 with Scholarship",
                body:
                  "Student Z achieved Band 7.0 and secured admission with scholarship support.",
              },
            ].map((item) => (
              <div
                key={item.title}
                className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-6 md:px-6 md:py-7 hover-lift"
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

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              IELTS <span className="gradient-text">FAQs</span>
            </h2>
          </div>
          <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2">
            {[
              {
                q: "What is the IELTS test format?",
                a: "IELTS consists of four sections: Listening, Reading, Writing, and Speaking. The total test duration is approximately 2 hours 45 minutes.",
              },
              {
                q: "How is the IELTS band score calculated?",
                a: "Each section is scored from 0 to 9. Your final band score is an average of the four sections rounded to the nearest whole or half band.",
              },
              {
                q: "How long is my IELTS score valid?",
                a: "Your IELTS score is valid for two years from the date of the test.",
              },
              {
                q: "How many times can I take the IELTS exam?",
                a: "You can take the IELTS exam as many times as you like to improve your score.",
              },
              {
                q: "Do you provide mock IELTS tests?",
                a: "Yes, StackLearn includes regular mock tests in the preparation program to help you track progress and build confidence.",
              },
            ].map((item, idx) => (
              <article
                key={item.q}
                className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-5 md:px-6 md:py-6"
              >
                <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2">
                  {idx + 1}. {item.q}
                </h3>
                <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{item.a}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <TestPrepSuccessStoriesSection testPrepSlug="ielts" />

      {/* CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student achieving IELTS success"
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
              Join StackLearn&apos;s IELTS preparation program today and benefit from expert
              coaching, personalized guidance, and a structured roadmap to your target band.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Your Free IELTS Consultation
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
