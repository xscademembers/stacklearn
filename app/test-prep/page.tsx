import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiBookOpen } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const tests = [
  {
    name: "IELTS",
    description: "English proficiency test required for UK, Australia, Canada, and many other destinations.",
    href: "/test-prep/ielts",
  },
  {
    name: "TOEFL",
    description: "Widely accepted English test, especially for universities in the USA and Canada.",
    href: "/test-prep/toefl",
  },
  {
    name: "GRE",
    description: "Required for MS and graduate programs in the USA, Canada, and Europe.",
    href: "/test-prep/gre",
  },
  {
    name: "GMAT",
    description: "Mandatory for MBA and management programs at leading business schools worldwide.",
    href: "/test-prep/gmat",
  },
];

export default function TestPrepPage() {
  return (
    <div className="pb-0">
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students preparing for exams"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-20 relative z-10">
          <div className="max-w-5xl mx-auto text-center">
            <p className="text-sm md:text-base uppercase tracking-[0.2em] text-brand-soft mb-3">
              Test Preparation for Study Abroad
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-2 leading-tight">
              Test Preparation
            </h1>
            <p className="text-base md:text-2xl font-semibold text-white/90 mb-5">
              IELTS, GRE, TOEFL &amp; GMAT Coaching Tailored for Your Study Abroad Goals
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 mx-auto">
              A strong test score can open doors to top universities worldwide. Whether you are
              applying for undergraduate, postgraduate, or MBA programs, international universities
              rely on standardized test scores to assess your academic readiness and English
              proficiency.
            </p>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mx-auto">
              At StackLearn, we provide structured and result‑driven test preparation for IELTS,
              GRE, TOEFL, and GMAT. Our expert trainers, personalized learning plans, and
              real‑exam simulations help you achieve your target scores with confidence.
            </p>
            <div className="mt-8 flex flex-wrap gap-4 justify-center">
              <BookConsultButton className="inline-flex items-center gap-2 px-8 py-3" variant="primary">
                Book Free Test Strategy Session
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
              <Link
                href="#available-tests"
                className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-white/70 text-white font-semibold hover:bg-white/10 transition-all duration-300"
              >
                View Available Tests
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Test Preparation Matters */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid lg:grid-cols-[1.3fr_minmax(0,1fr)] gap-10 md:gap-14 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Why Test Preparation Matters
              </h2>
              <p className="text-slate-700 text-base md:text-lg leading-relaxed mb-4">
                Standardized exams like IELTS, GRE, TOEFL, and GMAT play a critical role in your
                study abroad journey. A competitive score:
              </p>
              <ul className="space-y-2 text-sm md:text-base text-slate-700">
                {[
                  "Strengthens your university application",
                  "Improves scholarship eligibility",
                  "Enhances visa approval chances",
                  "Increases admission opportunities in top‑ranked universities",
                  "Reflects your academic and communication skills",
                ].map((item) => (
                  <li key={item} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Without proper preparation, students often struggle with time management, test
                structure, and scoring strategies. Our coaching ensures you are fully prepared —
                academically and mentally — so you walk into the exam with clarity and confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Available Tests */}
      <section id="available-tests" className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center max-w-3xl mx-auto mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Available <span className="gradient-text">Test Preparation Programs</span>
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Each exam requires a different preparation strategy. Our trainers guide you with
              customized plans and focused practice for every test.
            </p>
          </div>

          <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-2">
            {tests.map((test) => (
              <Link
                key={test.name}
                href={test.href}
                className="group rounded-2xl bg-white border border-slate-200 px-6 py-6 flex flex-col h-full hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 transition-all duration-300"
              >
                <div className="flex items-center gap-3 mb-3">
                  <div className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand">
                    <FiBookOpen className="w-5 h-5" />
                  </div>
                  <h3 className="text-lg font-bold text-slate-900">{test.name}</h3>
                </div>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed flex-1 mb-4">
                  {test.description}
                </p>
                <span className="inline-flex items-center gap-2 text-sm font-semibold text-brand group-hover:gap-3 transition-all duration-300">
                  View {test.name} Coaching Details
                  <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Test vs Country Mapping */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Which Test Do You Need?
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed mb-6">
              The right exam depends on your destination country, course type, and university
              requirements. We help you map the correct test for your goals.
            </p>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-5">
                <h3 className="font-semibold text-slate-900 mb-2">Test &rarr; Countries</h3>
                <ul className="space-y-2 text-sm text-slate-700">
                  <li>
                    <strong>IELTS</strong> – UK, Australia, Canada, Ireland, New Zealand
                  </li>
                  <li>
                    <strong>TOEFL</strong> – USA, Canada, selected European universities
                  </li>
                  <li>
                    <strong>GRE</strong> – USA, Canada, Germany, Europe
                  </li>
                  <li>
                    <strong>GMAT</strong> – USA, UK, Canada, Australia, global MBA programs
                  </li>
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-5">
                <h3 className="font-semibold text-slate-900 mb-2">How We Help</h3>
                <p className="text-sm text-slate-700 leading-relaxed">
                  During your counselling session, we review your target course and country, then
                  recommend the right test and score range you should aim for. This ensures your
                  preparation is focused and aligned with admission requirements.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose StackLearn Coaching */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Why Choose <span className="gradient-text">StackLearn Coaching</span>
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Our goal is simple — help you achieve your target score and move confidently toward
              your dream university admission.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              "Experienced & certified trainers with real exam insights.",
              "Structured study plan covering concepts, practice, and mock tests.",
              "Regular mock exams with real‑test simulations.",
              "Personalized feedback to improve weak areas.",
              "Small batch training for more individual attention.",
              "Flexible learning modes – online, offline, and hybrid.",
            ].map((item) => (
              <div
                key={item}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-5 text-sm md:text-base text-slate-700 leading-relaxed flex gap-3"
              >
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                <span>{item}</span>
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
              Test Preparation Success Stories
            </h2>
            <p className="text-slate-700 text-sm md:text-base leading-relaxed">
              Our students have consistently achieved strong scores and secured admissions in top
              global universities.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-4">
            {[
              { label: "IELTS Band Achievers", value: "7.5+" },
              { label: "GRE Score Students", value: "320+" },
              { label: "TOEFL Score Achievers", value: "100+" },
              { label: "GMAT MBA Admissions", value: "650+" },
            ].map((item) => (
              <div
                key={item.label}
                className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-6 text-center"
              >
                <p className="text-2xl md:text-3xl font-extrabold text-brand mb-1">
                  {item.value}
                </p>
                <p className="text-xs md:text-sm text-slate-700 leading-snug">{item.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students taking exam"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
            Ready to Achieve Your Target Test Score?
          </h2>
          <p className="text-base md:text-xl mb-8 text-white/90">
            Start your preparation with the right strategy, expert trainers, and real‑exam practice.
          </p>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-brand rounded-full font-semibold hover:shadow-xl hover:shadow-brand/40 hover:scale-105 transition-all duration-300"
          >
            Book Your Free Test Strategy Session
            <FiArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
