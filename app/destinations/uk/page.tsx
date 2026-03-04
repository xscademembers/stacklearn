"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiChevronDown, FiClock, FiBriefcase, FiDollarSign, FiBookOpen, FiGlobe } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const keyReasons = [
  {
    title: "High Academic Standards",
    description: "Consistently ranked among the world\u2019s best education systems.",
  },
  {
    title: "Globally Recognized Universities",
    description: "Degrees respected by employers worldwide.",
  },
  {
    title: "No Mandatory GRE/GMAT",
    description: "Simplified admission process for many university programs.",
  },
  {
    title: "Research & Innovation Hub",
    description: "Access to advanced research facilities and global collaborations.",
  },
  {
    title: "Cost-Effective One-Year Master\u2019s",
    description: "Save time and living expenses with accelerated programs.",
  },
  {
    title: "Post-Study Work Opportunities",
    description: "Stay back and gain international work experience after graduation.",
  },
  {
    title: "IELTS Waiver Available",
    description: "Many reputed universities offer programs on MOI Certificate.",
  },
];

const courses = [
  "Business Management",
  "Computer Science",
  "Data Science",
  "Global Business",
  "Engineering & Technology",
  "Finance",
  "Nursing",
  "Law",
  "Social Sciences",
  "Media & Communication",
];

const universities = [
  { name: "Greenwich University", initials: "GU", color: "bg-blue-600" },
  { name: "Coventry University", initials: "CU", color: "bg-indigo-600" },
  { name: "Buckinghamshire New University", initials: "BNU", color: "bg-purple-600" },
  { name: "University of Roehampton", initials: "UR", color: "bg-pink-600" },
  { name: "University of Leicester", initials: "UL", color: "bg-red-600" },
  { name: "University of Wolverhampton", initials: "UW", color: "bg-orange-600" },
  { name: "University of Hull", initials: "UH", color: "bg-amber-600" },
  { name: "Aston London Campus", initials: "ALC", color: "bg-yellow-600" },
  { name: "University of East London", initials: "UEL", color: "bg-lime-600" },
  { name: "Edinburgh Napier University", initials: "ENU", color: "bg-emerald-600" },
  { name: "Anglia Ruskin University", initials: "ARU", color: "bg-teal-600" },
  { name: "University of Law", initials: "UoL", color: "bg-cyan-600" },
  { name: "De Montfort University", initials: "DMU", color: "bg-sky-600" },
  { name: "Teesside University", initials: "TU", color: "bg-blue-700" },
  { name: "University of Sunderland", initials: "US", color: "bg-violet-600" },
  { name: "Aston University", initials: "AU", color: "bg-fuchsia-600" },
];

const scholarships = [
  {
    name: "Chevening Scholarship",
    description: "A prestigious UK government scholarship awarded to outstanding professionals with strong leadership potential. It supports one-year Master\u2019s programs and is managed through British embassies and high commissions worldwide.",
    tag: "Government Funded",
    tagColor: "bg-blue-100 text-blue-700",
  },
  {
    name: "Commonwealth Scholarship",
    description: "Designed for students from Commonwealth countries, this scholarship supports postgraduate studies in the UK and focuses on academic excellence and development impact.",
    tag: "Postgraduate",
    tagColor: "bg-purple-100 text-purple-700",
  },
  {
    name: "GREAT Scholarship",
    description: "Jointly funded by the UK Government and the British Council, this program offers postgraduate scholarships across multiple UK universities in various disciplines.",
    tag: "British Council",
    tagColor: "bg-emerald-100 text-emerald-700",
  },
  {
    name: "Charles Wallace India Trust (CWIT)",
    description: "Supports Indian students in the early or mid-stage of their careers, particularly in arts, heritage conservation, and humanities fields.",
    tag: "Arts & Humanities",
    tagColor: "bg-amber-100 text-amber-700",
  },
  {
    name: "Scotland\u2019s Saltire Scholarships",
    description: "Funded by the Scottish Government in partnership with Scottish universities, this scholarship supports students in technology, healthcare, renewable energy, science, and creative industries.",
    tag: "Scotland",
    tagColor: "bg-sky-100 text-sky-700",
  },
];

const supportServices = [
  {
    title: "Training for Standardized Tests",
    description: "We guide you for required English proficiency exams such as IELTS/PTE and other standardized tests needed for UK university admissions.",
    icon: FiBookOpen,
    href: "/test-prep",
  },
  {
    title: "Personalized Counselling",
    description: "Our one-on-one counselling sessions focus on your academic background, career goals, and budget to create a clear UK study plan.",
    icon: FiBriefcase,
    href: "/services/profile-evaluation",
  },
  {
    title: "Best-Fit University Selection",
    description: "We help you shortlist UK universities based on rankings, course structure, tuition fees, and post-study work opportunities.",
    icon: FiGlobe,
    href: "/services/admission-assistance",
  },
  {
    title: "Application & Financial Aid Support",
    description: "From SOP preparation to document review and scholarship guidance, we ensure your application is complete and competitive.",
    icon: FiDollarSign,
    href: "/services/sop-lor",
  },
  {
    title: "Visa Counselling & Interview Prep",
    description: "We provide detailed visa guidance, financial documentation support, and mock interview training to strengthen your approval chances.",
    icon: FiCheck,
    href: "/services/visa-assistance",
  },
  {
    title: "Pre-Departure Orientation",
    description: "Before you fly, we assist with accommodation guidance, travel preparation, and important information to help you settle confidently in the UK.",
    icon: FiClock,
    href: "/services/accommodation",
  },
];

const otherDestinations = [
  { name: "United States", short: "USA", href: "/destinations/usa", flag: "https://flagcdn.com/w40/us.png" },
  { name: "Canada", short: "Canada", href: "/destinations/canada", flag: "https://flagcdn.com/w40/ca.png" },
  { name: "Australia", short: "Australia", href: "/destinations/australia", flag: "https://flagcdn.com/w40/au.png" },
  { name: "Germany", short: "Germany", href: "/destinations/germany", flag: "https://flagcdn.com/w40/de.png" },
  { name: "Ireland", short: "Ireland", href: "/destinations/ireland", flag: "https://flagcdn.com/w40/ie.png" },
];

const faqs = [
  {
    question: "Is a 3-year Indian Bachelor\u2019s degree accepted?",
    answer: "Yes, degrees such as BA, BSc, or BCom from recognized Indian universities are widely accepted for UK Master\u2019s programs.",
  },
  {
    question: "What are the minimum marks required?",
    answer: "Most universities require 55\u201360%, though competitive programs may demand 65\u201375% (equivalent to a UK 2:1).",
  },
  {
    question: "What is the required bank balance for a visa?",
    answer: "You must show funds for remaining tuition plus 9 months of living expenses. As of late 2025, these are approximately \u00A31,334/month in London and \u00A31,023/month outside London.",
  },
  {
    question: "Can I bring my family (dependents)?",
    answer: "As of 2025, only students on research-based postgraduate programs or PhDs can bring partners or children.",
  },
];

export default function UKPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="London cityscape with landmark buildings"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="https://flagcdn.com/w80/gb.png" alt="UK Flag" width={64} height={44} className="rounded shadow-lg" />
            </div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-blue-200 mb-4">
              Study Destination
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Study in the <span className="text-accent">United Kingdom</span>
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-3xl mx-auto">
              The United Kingdom is a globally respected destination known for academic excellence,
              one-year Master&apos;s programs, sandwich programs, and strong post-study work
              opportunities. With industry-focused courses and internationally recognized degrees, it
              remains a top choice for Indian students seeking global career growth.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2">
              Talk to UK Expert
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Tuition Range", value: "\u00A311K\u2013\u00A335K/yr", sub: "Program dependent" },
              { label: "Living Cost", value: "\u00A3900\u2013\u00A31,750/mo", sub: "City dependent" },
              { label: "Visa Processing", value: "~3 Weeks", sub: "Priority available" },
              { label: "Post-Study Work", value: "2\u20133 Years", sub: "Graduate Route" },
            ].map((fact, index) => (
              <div
                key={index}
                className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15"
              >
                <p className="text-xl md:text-2xl font-extrabold text-brand mb-1">{fact.value}</p>
                <p className="text-sm font-semibold text-slate-900">{fact.label}</p>
                <p className="text-xs text-slate-500 mt-0.5">{fact.sub}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why UK? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why Study in the <span className="gradient-text">United Kingdom?</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              The United Kingdom has built a global reputation for academic excellence over centuries.
              Its universities are recognized worldwide for quality education, strong research
              foundations, and industry-driven programs.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-10">
              For Indian students, studying in the UK means gaining a globally respected qualification
              while experiencing a culturally diverse and academically enriching environment. With a
              wide range of Bachelor&apos;s, Master&apos;s, and Ph.D. programs across disciplines, the UK
              offers flexible and career-focused education pathways designed to prepare students for
              international opportunities.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
              Key Reasons to Study in the UK
            </h3>
            <div className="grid gap-4 md:grid-cols-2">
              {keyReasons.map((reason) => (
                <article
                  key={reason.title}
                  className="flex items-start gap-4 rounded-2xl border border-slate-200 bg-page-soft px-5 py-5 transition-all duration-300 hover:-translate-y-0.5 hover:shadow-lg hover:shadow-brand/15"
                >
                  <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-brand text-white flex-shrink-0 mt-0.5">
                    <FiCheck className="w-4 h-4" />
                  </span>
                  <div>
                    <h4 className="text-sm md:text-base font-bold text-slate-900 mb-1">
                      {reason.title}
                    </h4>
                    <p className="text-xs md:text-sm text-slate-600 leading-relaxed">
                      {reason.description}
                    </p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Popular <span className="gradient-text">Courses</span> in the UK
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              The UK offers diverse programs across disciplines, designed for global career readiness.
            </p>
          </div>

          <div className="max-w-3xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3 md:gap-4">
            {courses.map((course) => (
              <div
                key={course}
                className="rounded-2xl bg-white border border-slate-200 px-4 py-4 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 hover:border-brand"
              >
                <p className="text-sm md:text-base font-semibold text-slate-900">{course}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Universities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Partner <span className="gradient-text">Universities</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              We work with recognized UK institutions offering quality programs aligned with career outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5">
            {universities.map((uni) => (
              <div
                key={uni.name}
                className="group rounded-2xl bg-page-soft border border-slate-200 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 hover:border-brand"
              >
                <div className={`h-12 w-12 mb-3 rounded-xl ${uni.color} flex items-center justify-center text-white font-bold text-xs mx-auto group-hover:scale-110 transition-transform duration-300`}>
                  {uni.initials}
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-900 leading-snug">{uni.name}</p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <BookConsultButton variant="secondary" className="inline-flex items-center gap-2 text-sm">
              Explore More Universities
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* Tuition Fees & Living Costs */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Tuition Fees & <span className="gradient-text">Living Costs</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                The cost of studying in the UK depends on your chosen university, course, and city.
                Scholarships can reduce the overall investment. Students should also budget for
                accommodation, food, and transportation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Tuition Fees */}
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-brand px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Average Tuition Fees</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { level: "Undergraduate Programs", range: "\u00A311,000 \u2013 \u00A320,000 / year" },
                    { level: "Master\u2019s Programs", range: "\u00A312,000 \u2013 \u00A325,000 / year" },
                    { level: "MBA & Specialized Courses", range: "\u00A320,000 \u2013 \u00A335,000 / year" },
                  ].map((item) => (
                    <div key={item.level} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-brand flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.level}</p>
                        <p className="text-sm text-brand font-bold">{item.range}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Living Expenses */}
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-accent px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Monthly Living Expenses</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { city: "London", range: "\u00A31,400 \u2013 \u00A31,750 / month" },
                    { city: "Other Cities", range: "\u00A3900 \u2013 \u00A31,400 / month" },
                  ].map((item) => (
                    <div key={item.city} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.city}</p>
                        <p className="text-sm text-accent font-bold">{item.range}</p>
                      </div>
                    </div>
                  ))}
                  <p className="text-xs text-slate-500 leading-relaxed pt-2 border-t border-slate-100">
                    Living costs typically include accommodation, food, transportation, utilities, and personal expenses.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm md:text-base text-slate-600">
              At Stack Learn, we guide you in planning your tuition, living costs, and financial
              documentation clearly &mdash; so you can begin your UK journey with confidence.
              <Link href="/services/education-loan" className="text-brand font-semibold hover:underline ml-1">
                Explore education loan options &rarr;
              </Link>
            </p>
          </div>
        </div>
      </section>

      {/* Part-Time Work & Post-Study Work */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Part-Time Work & <span className="gradient-text">Post-Study Work (PSW)</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                International students in the UK have the opportunity to gain valuable work
                experience alongside their academic journey, helping manage expenses and build
                professional skills.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Part-Time Work */}
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white flex-shrink-0">
                    <FiBriefcase className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Part-Time Work Rights (2026)</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Up to 20 hours per week during academic term time",
                    "Full-time work during official university holidays",
                    "Roles in retail, hospitality, campus, internships, and industry",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Part-time experience supports finances and strengthens your CV for future career opportunities.
                </p>
              </div>

              {/* Post-Study Work */}
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Graduate Route (PSW) Visa</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "2 years for Bachelor\u2019s and Master\u2019s graduates (if applied before Dec 31, 2026)",
                    "3 years for PhD graduates",
                    "Work full-time, switch employers, or become self-employed",
                    "No employer sponsorship required",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-amber-50 border border-amber-200 px-4 py-3">
                  <p className="text-xs text-amber-800 leading-relaxed">
                    <strong>Note:</strong> From January 1, 2027, the duration for non-PhD graduates is
                    expected to reduce to 18 months. PhD graduates will continue to receive 3 years.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* UK Student Visa */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                UK Student Visa &mdash; <span className="gradient-text">Requirements & Process</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Applying for a student visa to the UK is straightforward when all documents are
                prepared correctly. Once you receive your university admission, you can begin your
                visa application.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {/* Visa Requirements */}
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Key Visa Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "Unconditional Offer Letter from a UK university",
                    "CAS (Confirmation of Acceptance for Studies) number",
                    "Proof of Funds (as per 2025/2026 requirements)",
                    "English Language Proficiency (SELT/IELTS or equivalent)",
                    "Tuberculosis (TB) Test certificate",
                    "Valid Passport",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-sm text-slate-700">
                      <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-brand-soft text-brand flex-shrink-0 mt-0.5">
                        <FiCheck className="w-3.5 h-3.5" />
                      </span>
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Processing Time */}
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Visa Processing Time (2026)</h3>
                <div className="space-y-4">
                  {[
                    { type: "Standard Processing", time: "~3 weeks (15 working days)", note: "From biometric appointment" },
                    { type: "Priority Service", time: "~5 working days", note: "Faster turnaround" },
                    { type: "Super Priority Service", time: "Next working day", note: "Decision within 24 hours" },
                  ].map((item) => (
                    <div key={item.type} className="rounded-xl bg-page-soft border border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-slate-900">{item.type}</p>
                      <p className="text-sm text-brand font-bold">{item.time}</p>
                      <p className="text-xs text-slate-500">{item.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Applications can be submitted up to 6 months before your course start date.
                  Students must complete the online application and attend a biometric appointment at
                  a designated visa centre.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-blue-50 border border-blue-200 px-6 py-5">
              <p className="text-sm text-blue-800 leading-relaxed">
                Recent UK regulations have strengthened financial proof and English language
                requirements. Additionally, dependent visa rules have changed for certain courses.
                However, India continues to remain one of the largest student markets for the UK,
                with strong visa approval rates.
              </p>
            </div>

            <div className="text-center mt-8">
              <Link
                href="/services/visa-assistance"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300"
              >
                Learn about our visa assistance services
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Scholarships to <span className="gradient-text">Study in the UK</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Students planning to study in the UK can explore various scholarship opportunities
                offered by the UK Government and universities. Some awards provide partial tuition
                fee waivers, while select programs may cover up to 100% of tuition fees.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2">
              {scholarships.map((scholarship) => (
                <article
                  key={scholarship.name}
                  className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15"
                >
                  <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${scholarship.tagColor}`}>
                    {scholarship.tag}
                  </span>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2">
                    {scholarship.name}
                  </h3>
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                    {scholarship.description}
                  </p>
                </article>
              ))}
            </div>

            <p className="mt-6 text-center text-xs text-slate-500">
              Note: Scholarship availability, eligibility, and funding amounts may change annually.
            </p>

            <div className="text-center mt-8 flex flex-col sm:flex-row gap-4 justify-center">
              <BookConsultButton variant="secondary" className="inline-flex items-center gap-2 text-sm">
                Check Your Scholarship Eligibility
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
              <Link
                href="/scholarships"
                className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300 justify-center px-8 py-4"
              >
                View All Scholarships
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* How Stack Learn Supports Your UK Journey */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                How Stack Learn Supports Your{" "}
                <span className="gradient-text">UK Journey</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Studying in the United Kingdom requires the right preparation and strategic planning.
                At Stack Learn, we provide end-to-end guidance tailored specifically for UK
                admissions and visa requirements.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {supportServices.map((service) => {
                const Icon = service.icon;
                return (
                  <Link
                    key={service.title}
                    href={service.href}
                    className="group rounded-2xl bg-white border border-slate-200 px-5 py-6 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 hover:border-brand"
                  >
                    <div className="flex items-center gap-3 mb-3">
                      <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand-soft text-brand flex-shrink-0 group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                        <Icon className="w-5 h-5" />
                      </span>
                      <h3 className="text-sm md:text-base font-bold text-slate-900">
                        {service.title}
                      </h3>
                    </div>
                    <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                      {service.description}
                    </p>
                    <span className="inline-flex items-center gap-1 mt-3 text-brand font-semibold text-xs group-hover:gap-2 transition-all duration-300">
                      Learn more <FiArrowRight className="w-3.5 h-3.5 group-hover:translate-x-0.5 transition-transform" />
                    </span>
                  </Link>
                );
              })}
            </div>

            <p className="mt-10 text-center text-sm md:text-base text-slate-600">
              At Stack Learn, our approach is structured, transparent, and fully aligned with current
              UK policies &mdash; helping you move forward with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              UK Study Abroad <span className="gradient-text">FAQs</span>
            </h2>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-page-soft border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-slate-900 text-sm md:text-base">
                    {faq.question}
                  </span>
                  <FiChevronDown
                    className={`w-5 h-5 text-brand flex-shrink-0 transition-transform duration-300 ${
                      openFaq === index ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <div
                  className={`grid transition-all duration-300 ${
                    openFaq === index ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
                  }`}
                >
                  <div className="overflow-hidden">
                    <p className="px-5 pb-4 md:px-6 md:pb-5 text-xs md:text-sm text-slate-700 leading-relaxed">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Explore Other Destinations */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Explore Other <span className="gradient-text">Destinations</span>
            </h2>
            <p className="text-sm md:text-base text-slate-600">
              Considering other countries? Compare study options across our key destinations.
            </p>
          </div>

          <div className="flex flex-wrap gap-3 md:gap-4 justify-center">
            {otherDestinations.map((dest) => (
              <Link
                key={dest.href}
                href={dest.href}
                className="group inline-flex items-center gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-4 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 hover:border-brand"
              >
                <Image src={dest.flag} alt="" width={24} height={16} className="rounded-sm shadow-sm flex-shrink-0" />
                <span className="text-sm font-semibold text-slate-900 group-hover:text-brand transition-colors duration-300">
                  Study in {dest.short}
                </span>
                <FiArrowRight className="w-4 h-4 text-slate-400 group-hover:text-brand group-hover:translate-x-0.5 transition-all duration-300" />
              </Link>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              href="/destinations"
              className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300"
            >
              View All Destinations
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/1595391/pexels-photo-1595391.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="London Big Ben at sunset"
            fill
            className="object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-blue-400 rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Start Your Journey to Study in the UK Today
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get expert guidance on UK university admissions, visa applications, scholarships, and
            more. Take the first step toward your international education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookConsultButton variant="white" className="text-base md:text-lg font-bold inline-flex items-center gap-2">
              Speak with UK Expert
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
            <Link
              href="/apply"
              className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 justify-center"
            >
              Apply Now
              <FiArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
