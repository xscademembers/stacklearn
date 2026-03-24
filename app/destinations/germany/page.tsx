"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiChevronDown, FiClock, FiBriefcase, FiDollarSign, FiBookOpen, FiGlobe } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const keyReasons = [
  {
    title: "World-Class Public Universities",
    description: "Globally ranked institutions known for strong academic standards, especially in engineering, technology, and applied sciences.",
  },
  {
    title: "Low or No Tuition Fees",
    description: "Most public universities charge no tuition fees (only semester contributions of \u20AC250\u2013\u20AC400).",
  },
  {
    title: "English-Taught Programs",
    description: "Numerous Master\u2019s programs offered in English, particularly in STEM and business-related fields.",
  },
  {
    title: "Practice-Oriented Education",
    description: "Strong focus on internships, industry projects, and applied learning through Universities of Applied Sciences.",
  },
  {
    title: "Research & Innovation Leader",
    description: "Global hub for automotive, AI, renewable energy, robotics, and manufacturing industries.",
  },
  {
    title: "Strong Job Market",
    description: "Excellent career prospects in Europe\u2019s largest economy with global companies and long-term settlement pathways.",
  },
  {
    title: "18-Month Post-Study Job Seeker Visa",
    description: "Provides ample time to secure jobs in Germany's strong economy and pursue long-term work opportunities.",
  },
];

const courses = [
  "Mechanical Engineering",
  "Automotive Engineering",
  "Electrical Engineering",
  "Computer Science",
  "Artificial Intelligence & Data Science",
  "Renewable Energy Engineering",
  "Civil Engineering",
  "MBA (Master of Business Administration)",
  "Business Administration & Management",
  "Finance & Economics",
];

const universities = [
  { name: "SRH Berlin University of Applied Sciences", initials: "SRH", color: "bg-slate-800" },
  { name: "Hochschule Fresenius", initials: "HF", color: "bg-slate-800" },
  { name: "International School of Management (ISM)", initials: "ISM", color: "bg-slate-700" },
  { name: "PFH \u2013 Private University of Applied Sciences", initials: "PFH", color: "bg-slate-900" },
  { name: "IU International University", initials: "IU", color: "bg-slate-600" },
  { name: "University of Europe for Applied Sciences", initials: "UE", color: "bg-brand" },
  { name: "Macromedia University", initials: "MU", color: "bg-accent" },
  { name: "FOM University", initials: "FOM", color: "bg-brand" },
  { name: "Steinbeis University", initials: "SU", color: "bg-accent" },
  { name: "Steinbeis School of Management & Innovation", initials: "SMI", color: "bg-slate-800" },
  { name: "GISMA Business School", initials: "GBS", color: "bg-slate-500" },
  { name: "FHM University", initials: "FHM", color: "bg-slate-700" },
];

const scholarships = [
  {
    name: "DAAD Scholarships",
    description: "One of the most prestigious German government-funded programs, DAAD offers fully and partially funded scholarships for Master\u2019s, PhD, and research programs, covering monthly stipends, health insurance, travel allowance, and sometimes tuition support.",
    tag: "Government Funded",
    tagColor: "bg-accent-soft text-accent",
  },
  {
    name: "Deutschlandstipendium",
    description: "Co-funded by the German Federal Government and private sponsors, this merit-based scholarship provides financial support to high-achieving students enrolled at participating German universities, regardless of nationality.",
    tag: "Merit-Based",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "Erasmus+ Programme (Germany)",
    description: "Funded by the European Union, Erasmus+ supports international students pursuing joint Master\u2019s degrees or exchange programs in Germany, offering tuition support, travel grants, and monthly stipends.",
    tag: "EU Program",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    name: "Heinrich B\u00F6ll Foundation Scholarships",
    description: "Supported by a German political foundation, this scholarship assists international Master\u2019s and PhD students with strong academic records and social engagement, providing monthly financial aid and additional allowances.",
    tag: "Foundation",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "Konrad-Adenauer-Stiftung (KAS) Scholarships",
    description: "Funded by a German political foundation, KAS offers financial and mentoring support to international postgraduate and doctoral students who demonstrate academic excellence, leadership potential, and interest in public policy.",
    tag: "Leadership",
    tagColor: "bg-slate-100 text-slate-700",
  },
  {
    name: "University Merit-Based Scholarships",
    description: "Many institutions such as IU International University of Applied Sciences, SRH Berlin University of Applied Sciences, and University of Europe for Applied Sciences offer merit-based tuition scholarships, typically with 10% to 50% fee reductions.",
    tag: "University Specific",
    tagColor: "bg-slate-100 text-slate-600",
  },
];

const supportServices = [
  {
    title: "Training for Standardized Tests",
    description: "We guide you for required English proficiency exams such as IELTS and other standardized tests needed for German university admissions.",
    icon: FiBookOpen,
    href: "/test-prep",
  },
  {
    title: "Personalized Counselling",
    description: "Our one-on-one counselling sessions focus on your academic background, career goals, and budget to create a clear Germany study plan.",
    icon: FiBriefcase,
    href: "/services/profile-evaluation",
  },
  {
    title: "Best-Fit University Selection",
    description: "We help you shortlist German universities based on rankings, course structure, tuition fees, and post-study work opportunities.",
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
    description: "Before you fly, we assist with accommodation guidance, travel preparation, and important information to help you settle confidently in Germany.",
    icon: FiClock,
    href: "/services/accommodation",
  },
];

const otherDestinations = [
  { short: "UK", href: "/destinations/uk", flag: "https://flagcdn.com/w40/gb.png" },
  { short: "USA", href: "/destinations/usa", flag: "https://flagcdn.com/w40/us.png" },
  { short: "Canada", href: "/destinations/canada", flag: "https://flagcdn.com/w40/ca.png" },
  { short: "Australia", href: "/destinations/australia", flag: "https://flagcdn.com/w40/au.png" },
  { short: "Ireland", href: "/destinations/ireland", flag: "https://flagcdn.com/w40/ie.png" },
];

const faqs = [
  {
    question: "Is tuition really free, and what are the total living costs?",
    answer: "While public universities charge no tuition, students pay semester contributions (\u20AC250\u2013\u20AC400). Total expenses often require a blocked account, typically around \u20AC11,904 per year to cover accommodation, food, and insurance.",
  },
  {
    question: "Do I need to know German for an English-taught Master\u2019s?",
    answer: "Not for admission to international programs, but basic German (A1/A2) is essential for daily life, and B1/B2 level drastically improves part-time job prospects.",
  },
  {
    question: "How can I work part-time to fund my studies?",
    answer: "International students can work 120 full days or 240 half days per year. Common jobs include student assistantships at universities, tutoring, or service industry roles.",
  },
  {
    question: "What are the admission requirements and application process?",
    answer: "A minimum of 7.0 CGPA (or high percentage), IELTS/TOEFL scores, and an APS certificate (mandatory for Indian students) are crucial. Applications are often through uni-assist or directly to universities.",
  },
  {
    question: "What are the job prospects and stay-back options after graduation?",
    answer: "Graduates can get an 18-month residence permit to search for jobs in their field. Germany has high demand for STEM professionals, often offering good salary prospects and pathways to an EU Blue Card.",
  },
];

export default function GermanyPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Brandenburg Gate in Berlin, Germany"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-brand rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="https://flagcdn.com/w80/de.png" alt="Germany Flag" width={64} height={44} className="rounded shadow-lg" />
            </div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/70 mb-4">
              Study Destination
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Study in <span className="text-accent">Germany</span>
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-3xl mx-auto">
              Germany is a top-tier, affordable study abroad destination known for its high-quality
              public education, low or zero tuition fees, and strong English-taught,
              research-oriented, and industry-linked programs. It is a safe, multicultural, and
              economically stable country offering excellent post-study work opportunities.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
              At Stack Learn, we guide you with strategic university selection, application support,
              and complete German student visa assistance &mdash; ensuring a smooth and confident
              start to your study journey in Germany.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2">
                Talk to Germany Expert
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
              <Link
                href="https://9356bd51-32b1-4639-9cc0-0661ac5d0a2d.usrfiles.com/ugd/9356bd_3f6565fc887047a9bcaf9cf4bedf4bfb.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 justify-center"
              >
                Download Brochure
                <FiArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Tuition Range", value: "\u20AC0\u2013\u20AC40K/yr", sub: "Public often free" },
              { label: "Living Cost", value: "\u20AC800\u2013\u20AC1,600/mo", sub: "City dependent" },
              { label: "Visa Processing", value: "6\u201312 Weeks", sub: "Standard processing" },
              { label: "Post-Study Work", value: "18 Months", sub: "Job seeker permit" },
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

      {/* Why Germany? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why Study in <span className="gradient-text">Germany?</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              Germany ranks among the world&apos;s top study destinations, attracting international
              students for its high academic standards and strong career prospects. Public
              universities offer low or no tuition fees, while private institutions provide
              comparatively affordable programs.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-10">
              Its practice-oriented education system emphasizes industry exposure, research, and
              real-world learning. With strong post-study work opportunities and global industry
              presence, Germany offers excellent long-term career potential.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
              Key Reasons to Study in Germany
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
              Popular <span className="gradient-text">Courses</span> in Germany
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Germany excels in engineering, technology, and business programs, aligned with its
              industry-leading economy.
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
              We work with recognized German institutions offering quality programs aligned with
              industry demands and career outcomes.
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
                <p className="text-xs md:text-sm font-semibold text-slate-900 leading-snug">
                  {uni.name}
                </p>
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
                The cost of studying in Germany depends on your chosen university, course, and city.
                Many public universities charge no tuition fees, making Germany one of the most
                affordable study destinations globally.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-brand px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Average Tuition Fees</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { level: "Undergraduate Programs", range: "\u20AC0 \u2013 \u20AC20,000 / year", note: "Most public universities: free" },
                    { level: "Master\u2019s Programs", range: "\u20AC0 \u2013 \u20AC25,000 / year", note: "Consecutive Master\u2019s often tuition-free" },
                    { level: "MBA & Specialized Courses", range: "\u20AC20,000 \u2013 \u20AC40,000+ / year", note: "Private universities / business schools" },
                  ].map((item) => (
                    <div key={item.level} className="flex items-start gap-3">
                      <span className="mt-1.5 h-2 w-2 rounded-full bg-brand flex-shrink-0" />
                      <div>
                        <p className="text-sm font-semibold text-slate-900">{item.level}</p>
                        <p className="text-sm text-brand font-bold">{item.range}</p>
                        <p className="text-xs text-slate-500">{item.note}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-accent px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Monthly Living Expenses</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { city: "Munich, Frankfurt, Hamburg, Berlin", range: "\u20AC1,100 \u2013 \u20AC1,600 / month" },
                    { city: "Other Cities", range: "\u20AC800 \u2013 \u20AC1,100 / month" },
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
                    Living costs typically include accommodation, food, transportation, utilities,
                    and personal expenses.
                  </p>
                </div>
              </div>
            </div>

            <p className="mt-8 text-center text-sm md:text-base text-slate-600">
              At Stack Learn, we guide you in planning your tuition, living costs, and financial
              documentation clearly &mdash; so you can begin your Germany journey with confidence.
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
                Part-Time Work & <span className="gradient-text">Post-Study Work</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                International students in Germany have the opportunity to gain valuable work
                experience alongside their academic journey, helping manage expenses and build
                professional skills in Europe&apos;s largest economy.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white flex-shrink-0">
                    <FiBriefcase className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Part-Time Work Rights (2026)</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "120 full days or 240 half days per year (~20 hrs/week during term)",
                    "Full-time during semester breaks (within annual limit)",
                    "Roles in retail, restaurants, warehouses, research, campus jobs & internships",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Work experience enhances practical exposure and strengthens career prospects in
                  Germany&apos;s competitive job market.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Post-Study Job Seeker Permit</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "18 months for Bachelor\u2019s and Master\u2019s graduates",
                    "18 months for PhD graduates (strong research & skilled employment pathways)",
                    "Work full-time in any job while searching for a qualified position",
                    "Transition to EU Blue Card or long-term residence once employed",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-accent-soft border border-accent/20 px-4 py-3">
                  <p className="text-xs text-slate-800 leading-relaxed">
                    <strong>High Demand Sectors:</strong> Engineering, IT, healthcare, and renewable
                    energy offer strong career opportunities for international graduates planning
                    long-term careers in Europe.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* German Student Visa */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                German Student Visa &mdash;{" "}
                <span className="gradient-text">Requirements & Process</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Applying for a student visa to Germany is straightforward when all documents are
                prepared correctly. Once you receive your university admission, you can begin your
                visa application.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Key Visa Requirements (2026)</h3>
                <ul className="space-y-3">
                  {[
                    "Admission Letter from a recognized German university",
                    "Blocked Account (~\u20AC11,208/year or as per 2026 requirement)",
                    "Valid Passport",
                    "German-approved student health insurance",
                    "Academic documents & APS certificate (mandatory for Indian students)",
                    "Language proficiency (IELTS/TOEFL or German certificate)",
                    "Visa Application Form & Biometric Appointment Confirmation",
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

              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">
                  Visa Processing Time (2026)
                </h3>
                <div className="space-y-4">
                  {[
                    { type: "Standard Processing", time: "6\u201312 weeks", note: "From biometric submission at VFS centre" },
                    { type: "Application Window", time: "Up to 6 months before start", note: "Submit well in advance" },
                    { type: "Priority Service", time: "Not available", note: "No priority for Type D national visas" },
                  ].map((item) => (
                    <div key={item.type} className="rounded-xl bg-page-soft border border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-slate-900">{item.type}</p>
                      <p className="text-sm text-brand font-bold">{item.time}</p>
                      <p className="text-xs text-slate-500">{item.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Students must complete the long-term national visa application, schedule an
                  appointment at the designated VFS centre, submit biometric data and required
                  documents, and attend an in-person visa interview.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-accent-soft border border-accent/20 px-6 py-5">
              <p className="text-sm text-slate-800 leading-relaxed">
                German regulations emphasize strict financial proof through the blocked account
                system and mandatory APS verification for Indian applicants. Germany maintains
                steady student visa approval rates for genuine applicants who meet academic and
                financial criteria.
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
                Scholarships to <span className="gradient-text">Study in Germany</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Students planning to study in Germany can explore a wide range of scholarship
                opportunities offered by the German Government, public institutions, and
                universities. Many awards provide monthly stipends, while select research-based
                scholarships may cover tuition, health insurance, and travel allowance.
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
            <p className="mt-3 text-center text-xs md:text-sm text-slate-600">
              At Stack Learn, we assess your academic profile and guide you toward the most suitable
              scholarship opportunities to improve your chances of financial support.
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

      {/* How Stack Learn Supports Your Germany Journey */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                How Stack Learn Supports Your{" "}
                <span className="gradient-text">Germany Journey</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Studying in Germany requires the right preparation and strategic planning. At Stack
                Learn, we provide end-to-end guidance tailored specifically for Germany admissions
                and visa requirements.
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
              German policies &mdash; helping you move forward with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Germany Study Abroad <span className="gradient-text">FAQs</span>
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
            src="https://images.pexels.com/photos/1128408/pexels-photo-1128408.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Berlin at night"
            fill
            className="object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-brand rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Start Your Journey to Study in Germany Today
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get expert guidance on German university admissions, visa applications, scholarships,
            and more. Take the first step toward your European education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookConsultButton variant="white" className="text-base md:text-lg font-bold inline-flex items-center gap-2">
              Speak with Germany Expert
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
