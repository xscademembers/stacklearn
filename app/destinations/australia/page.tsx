"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiChevronDown, FiClock, FiBriefcase, FiDollarSign, FiBookOpen, FiGlobe } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";
import { DestinationYoutubeEmbed } from "@/components/DestinationYoutubeShort";

const keyReasons = [
  {
    title: "High Academic Standards",
    description: "Australia maintains a globally recognized education system regulated by strict quality assurance frameworks.",
  },
  {
    title: "Globally Ranked Universities",
    description: "Home to leading institutions, including the prestigious Group of Eight (Go8), with degrees valued worldwide.",
  },
  {
    title: "No Mandatory GRE/GMAT for Many Programs",
    description: "Most universities do not require GRE/GMAT scores for admission to several Master\u2019s programs.",
  },
  {
    title: "Strong Research & Innovation Focus",
    description: "Cutting-edge research in healthcare, environmental sciences, engineering, and technology.",
  },
  {
    title: "Work While You Study",
    description: "Students can work part-time during academic sessions and full-time during scheduled breaks.",
  },
  {
    title: "Post-Study Work Opportunities",
    description: "Graduates can benefit from Temporary Graduate Visa (Subclass 485) for up to 4 years of work experience.",
  },
  {
    title: "IELTS Waiver Options",
    description: "Many universities may consider MOI certificates or alternative English proficiency proofs in select cases.",
  },
  {
    title: "Excellent Quality of Life & Student-Friendly Cities",
    description: "Safe environment, high living standards, and a multicultural society with strong lifestyle and career opportunities.",
  },
];

const courses = [
  "Information Technology (AI & Cybersecurity)",
  "Computer Science",
  "Nursing & Healthcare",
  "MBA (Master of Business Administration)",
  "Business Analytics / Data Analytics",
  "Civil Engineering",
  "Mechanical Engineering",
  "Accounting (Accountancy)",
  "Psychology",
  "Social Work",
];

const universities = [
  { name: "University of Western Australia", initials: "UWA", color: "bg-slate-800" },
  { name: "University of Wollongong", initials: "UOW", color: "bg-slate-700" },
  { name: "Deakin University", initials: "DU", color: "bg-slate-600" },
  { name: "University of Tasmania", initials: "UTAS", color: "bg-brand" },
  { name: "Flinders University", initials: "FU", color: "bg-accent" },
  { name: "Western Sydney University", initials: "WSU", color: "bg-slate-900" },
  { name: "La Trobe University", initials: "LTU", color: "bg-slate-700" },
  { name: "James Cook University", initials: "JCU", color: "bg-brand" },
  { name: "Charles Darwin University", initials: "CDU", color: "bg-accent" },
  { name: "Central Queensland University", initials: "CQU", color: "bg-slate-800" },
  { name: "Southern Cross University", initials: "SCU", color: "bg-slate-500" },
  { name: "Federation University Australia", initials: "FED", color: "bg-slate-800" },
];

const scholarships = [
  {
    name: "Australia Awards Scholarships",
    description: "Funded by the Australian Government, this prestigious fully funded scholarship supports undergraduate or postgraduate studies and generally covers tuition, living expenses, travel, and health insurance.",
    tag: "Government Funded",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "Destination Australia Scholarship",
    description: "An Australian Government initiative encouraging study in regional Australia, typically offering financial support of up to AUD 15,000 per year for eligible students.",
    tag: "Regional Focus",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "Australian Government Research Training Program (RTP)",
    description: "Supports international students in research-based Master's and PhD programs with tuition coverage, living stipend, and research-related funding support.",
    tag: "Research",
    tagColor: "bg-slate-100 text-slate-700",
  },
  {
    name: "University of Western Australia Global Excellence Scholarship",
    description: "Merit-based scholarship for high-achieving international students, with tuition fee reductions that can range from AUD 5,000 to AUD 48,000 depending on program duration.",
    tag: "University Specific",
    tagColor: "bg-accent-soft text-accent",
  },
  {
    name: "Deakin Vice-Chancellor's International Scholarship",
    description: "Awarded to outstanding international students, this scholarship can cover 50% to 100% of tuition fees for selected programs based on academic and leadership profile.",
    tag: "High Achievers",
    tagColor: "bg-slate-100 text-slate-600",
  },
  {
    name: "La Trobe International Scholarship",
    description: "Merit-based scholarship for international students offering tuition fee reductions typically between 15% and 25%, depending on academic performance.",
    tag: "Merit Based",
    tagColor: "bg-slate-100 text-slate-600",
  },
];

const supportServices = [
  {
    title: "Training for Standardized Tests",
    description: "We guide you for required English proficiency exams such as IELTS/PTE and other standardized tests needed for Australian university admissions.",
    icon: FiBookOpen,
    href: "/test-prep",
  },
  {
    title: "Personalized Counselling",
    description: "Our one-on-one counselling sessions focus on your academic background, career goals, and budget to create a clear Australian study plan.",
    icon: FiBriefcase,
    href: "/services/profile-evaluation",
  },
  {
    title: "Best-Fit University Selection",
    description: "We help you shortlist Australian universities based on rankings, course structure, tuition fees, and post-study work opportunities.",
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
    description: "Before you fly, we assist with accommodation guidance, travel preparation, and important information to help you settle confidently in Australia.",
    icon: FiClock,
    href: "/services/accommodation",
  },
];

const otherDestinations = [
  { short: "UK", href: "/destinations/uk", flag: "https://flagcdn.com/w40/gb.png" },
  { short: "USA", href: "/destinations/usa", flag: "https://flagcdn.com/w40/us.png" },
  { short: "Canada", href: "/destinations/canada", flag: "https://flagcdn.com/w40/ca.png" },
  { short: "Germany", href: "/destinations/germany", flag: "https://flagcdn.com/w40/de.png" },
  { short: "Ireland", href: "/destinations/ireland", flag: "https://flagcdn.com/w40/ie.png" },
];

const faqs = [
  {
    question: "What is the total cost of a Master\u2019s degree, including living expenses, and are there scholarships available?",
    answer: "Students need to budget for tuition fees (AUD 22,000\u201350,000/year) and living costs (approx. AUD 25,000/year). Scholarships from the Australian government, universities, and private bodies are available to help offset costs. Stack Learn assesses your profile and guides you toward the most suitable scholarship opportunities.",
  },
  {
    question: "What are the post-study work rights (PSW) and prospects for permanent residency (PR)?",
    answer: "Graduates can stay to work for 2\u20134 years under the Temporary Graduate Visa (Subclass 485), depending on the qualification level. Australia operates a points-based immigration system, and gaining work experience during your PSW can strengthen your eligibility for skilled migration pathways.",
  },
  {
    question: "How many hours can I work while studying to support my living expenses?",
    answer: "Students are permitted to work up to 48 hours per fortnight (24 hours per week) during term time and full-time during official semester breaks. Common roles include retail, hospitality, campus positions, and entry-level industry roles.",
  },
  {
    question: "Are three-year Indian Bachelor\u2019s degrees accepted for Master\u2019s admission?",
    answer: "Yes, many Australian universities accept 3-year undergraduate degrees from recognized Indian universities, making it easier for Indian students to transition into Australian Master\u2019s programs compared to some other countries.",
  },
  {
    question: "What are the requirements for the Australian student visa (Subclass 500)?",
    answer: "You need a Confirmation of Enrolment (CoE), valid passport, proof of financial capacity, IELTS/PTE/TOEFL scores, Overseas Student Health Cover (OSHC), a Genuine Student (GS) requirement statement, and health examination and police clearance certificates. Processing typically takes 4\u20138 weeks.",
  },
];

export default function AustraliaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Sydney Opera House and Harbour Bridge"
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
                <Image src="https://flagcdn.com/w80/au.png" alt="Australia Flag" width={64} height={44} className="rounded shadow-lg" />
              </div>
              <p className="mb-4 text-xs uppercase tracking-[0.25em] text-white/70 md:text-sm">
                Study Destination
              </p>
              <h1 className="mb-6 text-3xl font-extrabold leading-tight md:text-4xl lg:text-5xl">
                Study in <span className="text-accent">Australia</span>
              </h1>
              <p className="mb-8 max-w-2xl text-base leading-relaxed text-white/85 md:text-lg">
                Australia is a top-3 global study destination offering world-class education, high
                living standards, and a welcoming, multicultural environment. With 95% of universities
                globally ranked and over 22,000 courses available, it is ideal for diverse academic
                pursuits. Key advantages include post-study work rights (Subclass 485), safe cities,
                and pathways to permanent residency.
              </p>
              <p className="mb-8 max-w-2xl text-sm leading-relaxed text-white/80 md:text-base">
                At Stack Learn, we guide you with strategic university selection, application support,
                and complete Australia student visa assistance &mdash; ensuring a confident start to
                your international journey.
              </p>
              <div className="flex flex-col gap-4 sm:flex-row sm:flex-wrap sm:justify-start">
                <BookConsultButton variant="white" className="inline-flex items-center gap-2">
                  Talk to Australia Expert
                  <FiArrowRight className="h-4 w-4" />
                </BookConsultButton>
                <Link
                  href="https://9356bd51-32b1-4639-9cc0-0661ac5d0a2d.usrfiles.com/ugd/9356bd_b6b995f87bf94938a94db8ec3c04a642.pdf"
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
              <DestinationYoutubeEmbed destinationKey="australia" countryLabel="Australia" />
            </div>
          </div>
        </div>
      </section>

      {/* Quick Facts Bar */}
      <section className="py-10 md:py-12 bg-white border-b border-slate-100">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
            {[
              { label: "Tuition Range", value: "AUD 20K\u201365K/yr", sub: "Program dependent" },
              { label: "Living Cost", value: "AUD 1,400\u20133,800/mo", sub: "City dependent" },
              { label: "Visa Processing", value: "4\u20138 Weeks", sub: "Subclass 500" },
              { label: "Post-Study Work", value: "Up to 4 Years", sub: "Subclass 485" },
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

      {/* Why Australia? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why Study in <span className="gradient-text">Australia?</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              Australia remains one of the top three global study destinations after the US and UK,
              known for excellent placement opportunities and strong graduate employability outcomes.
              Home to the prestigious Group of Eight (Go8) universities and top institutions,
              Australia offers globally recognized qualifications with strong quality assurance
              standards.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-10">
              Students benefit from the ability to work while studying, extensive campus support
              services, and a diverse, multicultural society with a high standard of living. With a
              streamlined student visa process and no mandatory GRE/GMAT requirement for most
              programs, Australia continues to be a preferred choice for international students.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
              Key Reasons to Study in Australia &mdash; 2026
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
              Popular <span className="gradient-text">Courses</span> in Australia
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Australia offers diverse programs across IT, healthcare, business, engineering, and
              social sciences, aligned with strong industry demand and graduate employability.
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

      {/* Partner Universities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Partner <span className="gradient-text">Universities</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              We work with recognized Australian institutions offering quality programs with strong
              graduate outcomes and post-study work pathways.
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
                The cost of studying in Australia depends on your chosen university, course, and
                city. Scholarships can reduce the overall investment significantly.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-brand px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Average Tuition Fees</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { level: "Undergraduate Programs", range: "AUD 20,000 \u2013 45,000 / year" },
                    { level: "Master\u2019s Programs", range: "AUD 22,000 \u2013 50,000 / year" },
                    { level: "MBA & Specialized Courses", range: "AUD 40,000 \u2013 65,000+ / year" },
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
                    { city: "Sydney & Melbourne", range: "AUD 2,000 \u2013 3,800+ / month" },
                    { city: "Other Cities", range: "AUD 1,400 \u2013 2,500 / month" },
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
              documentation clearly &mdash; so you can begin your Australia journey with confidence.
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
                Part-Time Work & <span className="gradient-text">Post-Study Work (Subclass 485)</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                International students in Australia have the opportunity to gain valuable work
                experience alongside their academic journey, helping manage expenses and build
                professional skills.
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
                    "Up to 48 hours per fortnight (24 hrs/week) during term time",
                    "Unlimited work hours during official semester breaks",
                    "Common roles: retail, hospitality, campus jobs, delivery services",
                    "Builds employability and local professional networks",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Temporary Graduate Visa (485)</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Bachelor\u2019s graduates: 2\u20133 years",
                    "Master\u2019s by coursework graduates: 2\u20133 years",
                    "Master\u2019s by research graduates: 3\u20134 years",
                    "PhD graduates: up to 4 years",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-brand-soft border border-brand/20 px-4 py-3">
                  <p className="text-xs text-slate-800 leading-relaxed">
                    During this period, graduates can work full-time, switch employers freely, gain
                    professional experience, and strengthen eligibility for skilled migration
                    pathways &mdash; without requiring immediate employer sponsorship.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Australia Student Visa */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Australia Student Visa &mdash;{" "}
                <span className="gradient-text">Requirements & Process</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Applying for a student visa to Australia is a straightforward process when all
                documents are prepared correctly. Once you receive your university admission, you can
                begin your visa application under the Subclass 500 category.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Key Visa Requirements (2026)</h3>
                <ul className="space-y-3">
                  {[
                    "Confirmation of Enrolment (CoE) from an Australian institution",
                    "Valid Passport",
                    "Proof of Financial Capacity (tuition + living expenses + travel)",
                    "English Language Proficiency (IELTS/PTE/TOEFL or equivalent)",
                    "Overseas Student Health Cover (OSHC) for full duration of stay",
                    "Genuine Student (GS) Requirement Statement",
                    "Health Examination & Police Clearance Certificate (if applicable)",
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
                <h3 className="text-lg font-bold text-slate-900 mb-5">Visa Processing Time (2026)</h3>
                <div className="space-y-4">
                  {[
                    { type: "Standard Processing", time: "4\u20138 weeks", note: "May vary by sector and volume" },
                    { type: "Application Window", time: "Up to 124 days", note: "~4 months before course start date" },
                    { type: "Priority Service", time: "Not officially available", note: "Processing varies by profile completeness" },
                  ].map((item) => (
                    <div key={item.type} className="rounded-xl bg-page-soft border border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-slate-900">{item.type}</p>
                      <p className="text-sm text-brand font-bold">{item.time}</p>
                      <p className="text-xs text-slate-500">{item.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Students must complete the online Subclass 500 application, upload required
                  documents (CoE, OSHC, financial proof, GS statement), and attend biometric
                  collection if requested.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-brand-soft border border-brand/20 px-6 py-5">
              <p className="text-sm text-slate-800 leading-relaxed">
                <strong>Important:</strong> Recent Australian regulations emphasize genuine student
                intent, financial evidence, and English language requirements. Australia continues to
                remain a popular destination for Indian students, with streamlined online visa
                processing under Subclass 500.
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
                Scholarships to <span className="gradient-text">Study in Australia</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Students planning to study in Australia can explore a variety of scholarship
                opportunities offered by the Australian Government and individual universities. Some
                awards provide partial tuition fee waivers, while select programs may cover up to
                100% of tuition fees along with living expense support.
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

      {/* How Stack Learn Supports Your Australia Journey */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                How Stack Learn Supports Your{" "}
                <span className="gradient-text">Australia Journey</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Studying in Australia requires the right preparation and strategic planning. At Stack
                Learn, we provide end-to-end guidance tailored specifically for Australia admissions
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
              Australian policies &mdash; helping you move forward with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Australia Study Abroad <span className="gradient-text">FAQs</span>
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
            <Link href="/destinations" className="inline-flex items-center gap-2 text-brand font-semibold hover:gap-3 transition-all duration-300">
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
            src="https://images.pexels.com/photos/2193300/pexels-photo-2193300.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Sydney Opera House at night"
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
            Start Your Journey to Study in Australia Today
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get expert guidance on Australian university admissions, visa applications, scholarships,
            and more. Take the first step toward your international education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookConsultButton variant="white" className="text-base md:text-lg font-bold inline-flex items-center gap-2">
              Speak with Australia Expert
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
