"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiChevronDown, FiClock, FiBriefcase, FiDollarSign, FiBookOpen, FiGlobe } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";
import { DestinationYoutubeEmbed } from "@/components/DestinationYoutubeShort";
import DestinationSuccessStoriesSection from "@/components/destinations/DestinationSuccessStoriesSection";

const keyReasons = [
  {
    title: "Globally Recognized Education System",
    description: "Irish universities ranked globally with strong academic credibility.",
  },
  {
    title: "European Tech & Pharma Hub",
    description: "Home to leading multinational companies and innovation-driven industries.",
  },
  {
    title: "One-Year Master\u2019s Programs",
    description: "Fast-track degrees saving time and overall costs.",
  },
  {
    title: "Two-Year Post-Study Work Visa",
    description: "Master\u2019s graduates eligible for extended stay under the Third Level Graduate Programme.",
  },
  {
    title: "Strong Industry Integration",
    description: "Internship-focused programs with high graduate employability rates.",
  },
  {
    title: "English-Speaking EU Country",
    description: "Study in Europe with no language barrier for Indian students.",
  },
  {
    title: "Safe & Welcoming Environment",
    description: "Friendly multicultural society with excellent quality of life.",
  },
  {
    title: "Gateway to the European Union Job Market",
    description: "Provides graduates access to the wider European Union employment market.",
  },
];

const courses = [
  "Computer Science",
  "Information Technology (IT)",
  "Data Science & Analytics",
  "Cybersecurity",
  "Pharmaceutical Sciences",
  "Business Management",
  "Management (General / International Management)",
  "Civil Engineering",
  "Economics",
  "Artificial Intelligence & Emerging Tech",
];

const universities = [
  { name: "Trinity College Dublin", initials: "TCD", color: "bg-slate-800" },
  { name: "University College Dublin", initials: "UCD", color: "bg-slate-700" },
  { name: "University College Cork", initials: "UCC", color: "bg-slate-900" },
  { name: "University of Galway", initials: "UoG", color: "bg-slate-700" },
  { name: "University of Limerick", initials: "UL", color: "bg-brand" },
  { name: "Dublin City University", initials: "DCU", color: "bg-slate-600" },
  { name: "Maynooth University", initials: "MU", color: "bg-slate-800" },
  { name: "Technological University Dublin", initials: "TUD", color: "bg-brand" },
  { name: "Munster Technological University", initials: "MTU", color: "bg-accent" },
  { name: "Atlantic Technological University", initials: "ATU", color: "bg-slate-500" },
  { name: "South East Technological University", initials: "SETU", color: "bg-slate-800" },
  { name: "Technological University of the Shannon", initials: "TUS", color: "bg-accent" },
];

const scholarships = [
  {
    name: "Government of Ireland International Education Scholarship (GOI-IES)",
    description: "Funded by the Government of Ireland, this prestigious scholarship supports high-achieving international students pursuing Master's or PhD programs and provides a \u20AC10,000 stipend with full tuition fee waiver at participating institutions.",
    tag: "Government Funded",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "Centenary Scholarship Programme",
    description: "A collaborative initiative between the Government of Ireland and leading universities, this scholarship supports Indian students in postgraduate programs with partial or full tuition support in selected courses.",
    tag: "Postgraduate",
    tagColor: "bg-slate-100 text-slate-700",
  },
  {
    name: "Irish Research Council Scholarships",
    description: "Supports outstanding international students in research-based Master's and PhD programs with tuition coverage, annual stipend, and research funding support for strong proposals.",
    tag: "Research",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "Trinity College Dublin Global Excellence Scholarships",
    description: "Merit-based awards for high-achieving international postgraduate students, typically offering tuition fee reductions ranging from \u20AC2,000 to \u20AC5,000.",
    tag: "University Specific",
    tagColor: "bg-accent-soft text-accent",
  },
  {
    name: "UCD Global Excellence Scholarships",
    description: "University College Dublin scholarships for top international talent that may cover 50% to 100% of tuition fees based on academic excellence and profile strength.",
    tag: "Top Talent",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    name: "University of Limerick International Scholarships",
    description: "Merit-based scholarships for international students in selected Master's programs, typically providing tuition fee reductions between \u20AC1,500 and \u20AC4,000.",
    tag: "Merit Based",
    tagColor: "bg-slate-100 text-slate-600",
  },
];

const supportServices = [
  {
    title: "Training for Standardized Tests",
    description: "We guide you for required English proficiency exams such as IELTS/PTE and other standardized tests needed for Ireland university admissions.",
    icon: FiBookOpen,
    href: "/test-prep",
  },
  {
    title: "Personalized Counselling",
    description: "Our one-on-one counselling sessions focus on your academic background, career goals, and budget to create a clear Ireland study plan.",
    icon: FiBriefcase,
    href: "/services/profile-evaluation",
  },
  {
    title: "Best-Fit University Selection",
    description: "We help you shortlist Ireland universities based on rankings, course structure, tuition fees, and post-study work opportunities.",
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
    description: "Before you fly, we assist with accommodation guidance, travel preparation, and important information to help you settle confidently in Ireland.",
    icon: FiClock,
    href: "/services/accommodation",
  },
];

const otherDestinations = [
  { name: "United Kingdom", short: "UK", href: "/destinations/uk", flag: "https://flagcdn.com/w40/gb.png" },
  { name: "United States", short: "USA", href: "/destinations/usa", flag: "https://flagcdn.com/w40/us.png" },
  { name: "Canada", short: "Canada", href: "/destinations/canada", flag: "https://flagcdn.com/w40/ca.png" },
  { name: "Australia", short: "Australia", href: "/destinations/australia", flag: "https://flagcdn.com/w40/au.png" },
  { name: "Germany", short: "Germany", href: "/destinations/germany", flag: "https://flagcdn.com/w40/de.png" },
];

const faqs = [
  {
    question: "What are the total costs, including tuition and living expenses?",
    answer: "Tuition generally ranges from \u20AC10,000 to \u20AC30,000 annually. Living expenses are higher in Dublin at \u20AC2,300+ per month, while cities like Cork or Limerick are slightly more affordable. At Stack Learn, we provide transparent cost breakdowns and help you plan finances, scholarships, and education loan options.",
  },
  {
    question: "What are the part-time work opportunities for international students?",
    answer: "Students can work up to 20 hours per week during term time and up to 40 hours during holidays under the Stamp 2 visa conditions. Common roles include retail, hospitality, customer service, and entry-level positions in tech, pharma, and business sectors.",
  },
  {
    question: "What is the 2-year post-study work visa (stay-back option)?",
    answer: "A Master\u2019s (Level 9) graduate is eligible for a 24-month post-study work permit under the Third Level Graduate Programme. This is a major advantage for gaining experience and potentially securing a Critical Skills Employment Permit for long-term stay.",
  },
  {
    question: "What are the entry requirements and language scores for Indian students?",
    answer: "Requirements typically include a Bachelor\u2019s degree from a recognized university (55\u201375%+ marks), a Statement of Purpose (SOP), and Letters of Recommendation. A minimum IELTS score of 6.0\u20136.5 (overall) is generally required.",
  },
  {
    question: "How bad is the accommodation crisis in Ireland?",
    answer: "Accommodation can be challenging, especially in Dublin. Many students report shortages and high rent, with on-campus or nearby accommodation costing \u20AC800+ per month. We recommend starting your housing search early and exploring university-supported accommodation options.",
  },
];

export default function IrelandPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Ireland countryside and cliffs"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-brand rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10">
          <div className="grid grid-cols-1 gap-10 lg:grid-cols-2 lg:items-center lg:gap-12">
            <div className="max-w-2xl text-left">
              <div className="mb-6 flex items-center justify-start gap-4">
                <Image src="https://flagcdn.com/w80/ie.png" alt="Ireland Flag" width={64} height={44} className="rounded shadow-lg" />
              </div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/70 md:text-sm">
                Study Destination
              </p>
              <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                Study in <span className="text-accent">Ireland</span>
              </h1>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Ireland is a fast-growing study destination known for its globally recognized education
                system, strong industry connections, and one-year Master&apos;s programs. As a major
                European hub for technology, pharmaceuticals, and finance, it offers excellent
                internship opportunities and a two-year post-study work visa for master&apos;s
                graduates. With high employability, competitive salaries, and a safe English-speaking
                environment, Ireland is an attractive choice for Indian students seeking global career
                growth.
              </p>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                At Stack Learn, we guide you with strategic university selection, application support,
                and complete Ireland student visa assistance &mdash; ensuring a confident start to your
                international journey.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-start">
                <BookConsultButton variant="white" className="inline-flex items-center gap-2">
                  Talk to Ireland Expert
                  <FiArrowRight className="h-4 w-4" />
                </BookConsultButton>
                <Link
                  href="https://9356bd51-32b1-4639-9cc0-0661ac5d0a2d.usrfiles.com/ugd/9356bd_d6712f17e2cc45fe877581d1e99172ab.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center gap-2 rounded-full border-2 border-white/40 px-8 py-4 font-semibold text-white transition-all duration-300 hover:bg-white/10 motion-reduce:transition-none"
                >
                  Download Brochure
                  <FiArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
            <div className="flex justify-center lg:justify-end">
              <DestinationYoutubeEmbed destinationKey="ireland" countryLabel="Ireland" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Tuition Range", value: "\u20AC10K\u2013\u20AC35K/yr", sub: "Program dependent" },
              { label: "Living Cost", value: "\u20AC700\u2013\u20AC1,440/mo", sub: "City dependent" },
              { label: "Visa Processing", value: "4\u20138 Weeks", sub: "Standard processing" },
              { label: "Post-Study Work", value: "1\u20132 Years", sub: "Graduate Programme" },
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

      {/* Why Ireland? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why Study in <span className="gradient-text">Ireland?</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              Ireland has rapidly established itself as a globally respected destination for
              high-quality education and research excellence. Its universities are internationally
              recognized for industry-aligned programs, particularly in technology, pharmaceuticals,
              business, and data science.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-10">
              For Indian students, studying in Ireland means earning a globally valued qualification
              while gaining exposure to a dynamic European economy that hosts leading multinational
              companies. With one-year Master&apos;s programs, strong internship pathways, and
              generous post-study work options, Ireland offers a flexible and career-focused education
              system designed for global success.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
              Key Reasons to Study in Ireland
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
              Popular <span className="gradient-text">Courses</span> in Ireland
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Ireland offers strong programs in tech, pharma, business, and engineering &mdash;
              aligned with its thriving industry ecosystem.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 md:gap-5">
            {courses.map((course, index) => (
              <div
                key={course}
                className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-page-soft/80 px-4 py-5 text-left shadow-sm transition-all duration-300 hover:border-brand/40 hover:shadow-lg hover:shadow-brand/10 motion-reduce:transition-none"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-xs font-bold">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <span className="h-2 w-2 rounded-full bg-brand/60 transition-colors duration-300 group-hover:bg-brand motion-reduce:transition-none" />
                </div>
                <p className="text-sm md:text-[15px] font-semibold text-slate-900 leading-snug">{course}</p>
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
              We work with recognized Irish institutions offering quality programs aligned with
              industry demands and global career outcomes.
            </p>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 md:gap-5 max-w-5xl mx-auto">
            {universities.slice(0, 12).map((uni) => (
              <div
                key={uni.name}
                className="group rounded-2xl bg-page-soft border border-slate-200 px-4 py-5 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 hover:border-brand"
              >
                <div className="h-12 w-12 mb-3 rounded-xl bg-brand flex items-center justify-center text-white font-bold text-xs mx-auto group-hover:scale-110 transition-transform duration-300">
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
                The cost of studying in Ireland depends on your chosen university, course, and city.
                Scholarships can reduce the overall investment. Students should also budget for
                accommodation, food, and transportation.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-brand px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Average Tuition Fees</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { level: "Undergraduate Programs", range: "\u20AC10,000 \u2013 \u20AC25,000 / year" },
                    { level: "Master\u2019s Programs", range: "\u20AC13,000 \u2013 \u20AC35,000 / year" },
                    { level: "MBA & Specialized Courses", range: "\u20AC15,000 \u2013 \u20AC35,000+ / year" },
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

              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-accent px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Monthly Living Expenses</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { city: "Dublin", range: "\u20AC990 \u2013 \u20AC1,440 / month" },
                    { city: "Cork, Galway, Limerick", range: "\u20AC700 \u2013 \u20AC1,150 / month" },
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
              documentation clearly &mdash; so you can begin your Ireland journey with confidence.
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
                International students in Ireland have the opportunity to gain valuable work
                experience alongside their academic journey, helping manage expenses and build
                professional skills in a strong European job market.
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
                    "Up to 20 hours per week during academic term time",
                    "Up to 40 hours per week during scheduled holidays (Stamp 2 visa)",
                    "Roles in retail, hospitality, caf\u00E9s, campus, customer service, tech & pharma sectors",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Part-time roles help manage living expenses while gaining valuable international
                  work exposure in a strong European job market.
                </p>
              </div>

              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Third Level Graduate Programme</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "1 year for Bachelor\u2019s (Level 8) graduates",
                    "2 years for Master\u2019s (Level 9) graduates",
                    "2 years for PhD (Level 10) graduates",
                    "Work full-time (up to 40 hours/week) across tech, pharma, finance & engineering",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-brand-soft border border-brand/20 px-4 py-3">
                  <p className="text-xs text-slate-800 leading-relaxed">
                    <strong>Career Pathway:</strong> Graduates can transition to a Critical Skills
                    Employment Permit without requiring immediate sponsorship at the time of
                    stay-back approval, making Ireland attractive for long-term European career
                    opportunities.
                  </p>
                </div>
                <p className="mt-3 text-xs text-slate-600 leading-relaxed">
                  As of 2026, Ireland continues to maintain these post-study work durations for
                  eligible graduates.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Ireland Student Visa */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Ireland Student Visa &mdash;{" "}
                <span className="gradient-text">Requirements & Process</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Applying for a student visa to Ireland is a clear and structured process when
                documentation is prepared accurately. Once you receive your Letter of Acceptance,
                you can proceed with your visa application online.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Key Visa Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "Letter of Acceptance from a recognized Irish institution",
                    "Proof of Tuition Fee Payment (full or partial as required)",
                    "Proof of Funds (\u20AC10,000/year minimum for living expenses + tuition)",
                    "English Language Proficiency (IELTS/PTE/Duolingo)",
                    "Private Medical Insurance",
                    "Valid Passport",
                    "Statement of Purpose and Academic Documents",
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
                    { type: "Standard Processing", time: "4\u20138 weeks", note: "From application submission and biometric enrolment" },
                    { type: "Application Window", time: "3 months before start", note: "Submit well in advance" },
                    { type: "Peak Season (May\u2013Sep)", time: "May extend", note: "Higher student volumes during this period" },
                    { type: "Priority Service", time: "Typically not available", note: "No formal priority/super-priority route in India" },
                  ].map((item) => (
                    <div key={item.type} className="rounded-xl bg-page-soft border border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-slate-900">{item.type}</p>
                      <p className="text-sm text-brand font-bold">{item.time}</p>
                      <p className="text-xs text-slate-500">{item.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Students must complete the online visa application (AVATS system), submit supporting
                  documents, and attend a biometric appointment at a designated Visa Application
                  Centre (VAC).
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-brand-soft border border-brand/20 px-6 py-5">
              <p className="text-sm text-slate-800 leading-relaxed">
                Recent Irish regulations emphasize stronger financial documentation and genuine
                student intent verification. However, Ireland continues to welcome Indian students,
                offering positive visa outcomes and a streamlined process for eligible applicants
                pursuing recognized programs.
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
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Scholarships to <span className="gradient-text">Study in Ireland</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Students planning to study in Ireland can explore a range of scholarship
                opportunities offered by the Irish Government and individual universities. Many
                awards provide partial tuition fee reductions, while select government-funded
                scholarships offer maximum tuition fee reduction along with living expense support.
              </p>
            </div>

            <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
              {scholarships.map((scholarship, index) => (
                <article
                  key={scholarship.name}
                  className="group rounded-2xl border border-slate-200 bg-gradient-to-b from-white to-page-soft/80 px-5 py-6 transition-all duration-300 hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-brand/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
                >
                  <div className="mb-3 flex items-center justify-between gap-3">
                    <span className="inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-brand-soft text-brand">
                      {scholarship.tag}
                    </span>
                    <span className="inline-flex h-7 min-w-7 items-center justify-center rounded-full border border-brand/20 bg-brand-soft px-2 text-[11px] font-bold text-brand">
                      {String(index + 1).padStart(2, "0")}
                    </span>
                  </div>
                  <h3 className="text-base md:text-lg font-bold text-slate-900 mb-2 leading-snug">
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

      {/* How Stack Learn Supports Your Ireland Journey */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                How Stack Learn Supports Your{" "}
                <span className="gradient-text">Ireland Journey</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Studying in Ireland requires the right preparation and strategic planning. At Stack
                Learn, we provide end-to-end guidance tailored specifically for Ireland admissions
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
              Ireland policies &mdash; helping you move forward with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      <DestinationSuccessStoriesSection destinationSlug="ireland" countryLabel="Ireland" />

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Ireland Study Abroad <span className="gradient-text">FAQs</span>
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
            src="https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Ireland cliffs and coastline"
            fill
            className="object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Start Your Journey to Study in Ireland Today
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get expert guidance on Irish university admissions, visa applications, scholarships, and
            more. Take the first step toward your European education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookConsultButton variant="white" className="text-base md:text-lg font-bold inline-flex items-center gap-2">
              Speak with Ireland Expert
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
