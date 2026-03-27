"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { FiArrowRight, FiCheck, FiChevronDown, FiClock, FiBriefcase, FiDollarSign, FiBookOpen, FiGlobe } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const keyReasons = [
  {
    title: "Globally Recognized Education System",
    description: "High-quality universities delivering internationally respected degrees.",
  },
  {
    title: "Affordable Tuition with High ROI",
    description: "Competitive tuition fees with strong long-term returns on investment.",
  },
  {
    title: "Post-Graduation Work Permit (PGWP)",
    description: "Generous post-study work rights with career stability for up to 3 years.",
  },
  {
    title: "Pathways to Permanent Residency",
    description: "Clear immigration routes supporting long-term settlement in Canada.",
  },
  {
    title: "Co-op & Industry Integration",
    description: "Paid internships integrated with academic programs for real-world experience.",
  },
  {
    title: "Research & Innovation Excellence",
    description: "Advanced research across technology, healthcare, and sustainability sectors.",
  },
  {
    title: "Safe & Multicultural Environment",
    description: "Inclusive society offering diversity, safety, and excellent quality of life.",
  },
  {
    title: "Wide Range of Career-Oriented Programs",
    description: "Diverse industry-aligned programs and skilled trades pathways ensuring employability.",
  },
];

const courses = [
  "Computer Science",
  "Information Technology (IT)",
  "Artificial Intelligence (AI)",
  "Data Science & Analytics",
  "Engineering (Civil, Mechanical, Electrical)",
  "Business Administration (MBA)",
  "Finance",
  "Health Sciences / Nursing",
  "Project Management",
  "Animation & Gaming",
];

const universities = [
  { name: "Lakehead University", initials: "LU", color: "bg-slate-800" },
  { name: "Ontario Tech University", initials: "OTU", color: "bg-slate-700" },
  { name: "Conestoga College", initials: "CC", color: "bg-slate-900" },
  { name: "George Brown College", initials: "GBC", color: "bg-brand" },
  { name: "Fanshawe College", initials: "FC", color: "bg-slate-700" },
  { name: "Durham College", initials: "DC", color: "bg-slate-600" },
  { name: "Lambton College", initials: "LC", color: "bg-accent" },
  { name: "University Canada West", initials: "UCW", color: "bg-slate-800" },
  { name: "University of Niagara Falls Canada", initials: "UNF", color: "bg-brand" },
  { name: "University of Regina", initials: "UoR", color: "bg-slate-700" },
  { name: "International Business University (IBU)", initials: "IBU", color: "bg-slate-600" },
  { name: "Crandall University - Canada", initials: "CU", color: "bg-slate-800" },
];

const scholarships = [
  {
    name: "Vanier Canada Graduate Scholarships",
    description: "A prestigious federal scholarship awarding CAD 50,000 per year for up to three years to exceptional doctoral students who demonstrate outstanding academic achievement, research potential, and leadership skills.",
    tag: "Doctoral",
    tagColor: "bg-accent-soft text-accent",
  },
  {
    name: "Ontario Graduate Scholarship (OGS)",
    description: "Funded by the Government of Ontario and participating universities, OGS supports Master's and PhD students with awards typically ranging from CAD 10,000 to CAD 15,000 per year.",
    tag: "Merit-Based",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "University of Regina International Entrance Scholarship",
    description: "Offered to strong international applicants, this entrance scholarship typically provides tuition fee reductions or first-year financial awards based on academic profile.",
    tag: "University Specific",
    tagColor: "bg-accent-soft text-accent",
  },
  {
    name: "Lakehead University International Entrance Scholarships",
    description: "Merit-based awards for international undergraduate and postgraduate students, with funding commonly ranging from CAD 4,000 to CAD 30,000 based on academic performance.",
    tag: "Entrance Award",
    tagColor: "bg-slate-100 text-slate-700",
  },
  {
    name: "Ontario Tech University International Scholarships",
    description: "International merit scholarships for high-achieving students enrolling in undergraduate or graduate programs, typically offering tuition fee reductions and financial grants.",
    tag: "International Merit",
    tagColor: "bg-brand-soft text-brand",
  },
  {
    name: "University Canada West Entrance Awards",
    description: "Entrance awards including leadership and academic excellence scholarships for students in business and management programs, typically offering partial tuition reductions.",
    tag: "Business Programs",
    tagColor: "bg-slate-100 text-slate-600",
  },
];

const supportServices = [
  {
    title: "Training for Standardized Tests",
    description: "We guide you for required English proficiency exams such as IELTS/PTE and other standardized tests needed for Canada university admissions.",
    icon: FiBookOpen,
    href: "/test-prep",
  },
  {
    title: "Personalized Counselling",
    description: "Our one-on-one counselling sessions focus on your academic background, career goals, and budget to create a clear Canada study plan.",
    icon: FiBriefcase,
    href: "/services/profile-evaluation",
  },
  {
    title: "Best-Fit University Selection",
    description: "We help you shortlist Canadian universities based on rankings, course structure, tuition fees, and post-study work opportunities.",
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
    description: "Before you fly, we assist with accommodation guidance, travel preparation, and important information to help you settle confidently in Canada.",
    icon: FiClock,
    href: "/services/accommodation",
  },
];

const otherDestinations = [
  { short: "UK", href: "/destinations/uk", flag: "https://flagcdn.com/w40/gb.png" },
  { short: "USA", href: "/destinations/usa", flag: "https://flagcdn.com/w40/us.png" },
  { short: "Australia", href: "/destinations/australia", flag: "https://flagcdn.com/w40/au.png" },
  { short: "Germany", href: "/destinations/germany", flag: "https://flagcdn.com/w40/de.png" },
  { short: "Ireland", href: "/destinations/ireland", flag: "https://flagcdn.com/w40/ie.png" },
];

const faqs = [
  {
    question: "What are the admission requirements and GPA for Master\u2019s programs?",
    answer: "Universities typically require a four-year bachelor\u2019s degree with a minimum GPA (often 3.0 on a 4.0 scale), IELTS/TOEFL scores, and sometimes GRE/GMAT, especially for business or engineering programs.",
  },
  {
    question: "How can I finance my studies and are there scholarships available?",
    answer: "No universities are tuition-free, but scholarships, assistantships, and bursaries are available based on merit and financial need. International students must show proof of funds for tuition and living expenses.",
  },
  {
    question: "What are the rules for working part-time while studying and after graduation?",
    answer: "Students can work on or off-campus (up to 24 hours/week during studies). The Post-Graduation Work Permit (PGWP) allows working for up to three years after graduation, depending on program length.",
  },
  {
    question: "What is the total cost of living and tuition?",
    answer: "Costs vary significantly by program and city. Expenses include tuition (CAD 24,000\u201342,000/year), accommodation, food, transportation, and health insurance. Cities like Toronto and Vancouver are more expensive.",
  },
  {
    question: "How do I apply for a Canadian student visa (Study Permit)?",
    answer: "You need an acceptance letter from a Designated Learning Institution (DLI), proof of funds (minimum CAD 22,895 for living), a GIC, biometrics and medical exam, and a Provincial Attestation Letter (PAL). Processing takes 6\u201310 weeks.",
  },
];

export default function CanadaPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Canadian mountains and lake"
            fill
            priority
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-20 left-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-20 right-20 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1.5s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-20 md:py-28 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <div className="flex items-center justify-center gap-4 mb-6">
              <Image src="https://flagcdn.com/w80/ca.png" alt="Canada Flag" width={64} height={44} className="rounded shadow-lg" />
            </div>
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-white/70 mb-4">
              Study Destination
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Study in <span className="text-accent">Canada</span>
            </h1>
            <p className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-3xl mx-auto">
              Canada is a top global study destination, hosting approximately 800,000 international
              students. It is highly favoured for its balance of high-quality education, safety, and
              a clear, stable path to permanent residency.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed mb-8 max-w-3xl mx-auto">
              At Stack Learn, we guide you with strategic university selection, application support,
              and complete Canadian student visa assistance &mdash; ensuring a confident start to
              your international journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2">
                Talk to Canada Expert
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
              <Link
                href="https://9356bd51-32b1-4639-9cc0-0661ac5d0a2d.usrfiles.com/ugd/9356bd_799cefe882b041269f51d9bc5ddfecd0.pdf"
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
              { label: "Tuition Range", value: "CAD 24K\u201360K/yr", sub: "Program dependent" },
              { label: "Living Cost", value: "CAD 1,100\u20132,400/mo", sub: "City dependent" },
              { label: "Visa Processing", value: "6\u201310 Weeks", sub: "Standard processing" },
              { label: "Post-Study Work", value: "Up to 3 Years", sub: "PGWP" },
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

      {/* Why Canada? */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why Study in <span className="gradient-text">Canada?</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-4">
              Canada is one of the world&apos;s most sought-after study destinations, offering
              globally recognized universities, strong academic standards, and research-driven
              programs aligned with industry needs. Its affordable tuition compared to other top
              destinations, combined with generous scholarships and co-op opportunities, makes it a
              high-value investment for international students.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-10">
              With the Post-Graduation Work Permit (PGWP) and clear pathways to permanent residency,
              Canada provides excellent post-study work and long-term settlement prospects. Home to
              over a million international students and known for its safe, inclusive, and
              multicultural society, Canada delivers a balanced blend of quality education, career
              growth, and quality of life.
            </p>

            <h3 className="text-xl md:text-2xl font-bold text-slate-900 mb-6 text-center">
              Key Reasons to Study in Canada
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
              Popular <span className="gradient-text">Courses</span> in Canada
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Canada offers diverse programs across technology, business, health, and creative
              fields, aligned with strong industry demand.
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
              We work with recognized Canadian institutions offering quality programs aligned with
              industry demands and career outcomes.
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
                The cost of studying in Canada depends on your chosen university, course, and city.
                Scholarships and co-op programs can reduce the overall investment.
              </p>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 overflow-hidden">
                <div className="bg-brand px-6 py-4">
                  <h3 className="text-lg font-bold text-white">Average Tuition Fees</h3>
                </div>
                <div className="px-6 py-5 space-y-4">
                  {[
                    { level: "Undergraduate Programs", range: "CAD 36,000 \u2013 42,000 / year" },
                    { level: "Master\u2019s Programs", range: "CAD 24,000 \u2013 30,000 / year" },
                    { level: "MBA & Specialized Courses", range: "CAD 30,000 \u2013 60,000+ / year" },
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
                    { city: "Vancouver, Toronto, Mississauga & Brampton", range: "CAD 1,600 \u2013 2,400+ / month" },
                    { city: "Other Cities", range: "CAD 1,100 \u2013 1,800 / month" },
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
              documentation clearly &mdash; so you can begin your Canada journey with confidence.
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
                Part-Time Work & <span className="gradient-text">Post-Study Work (PGWP)</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                International students in Canada have the opportunity to gain valuable work
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
                    "Up to 24 hours/week off-campus during regular academic sessions",
                    "Full-time (unlimited hours) during official school breaks",
                    "On-campus work: no hourly limit once program begins",
                    "Most part-time jobs pay CAD 15\u201320 per hour",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  Common roles: retail, caf\u00E9 staff, customer service, warehouse, delivery,
                  library/lab assistants, tutoring, and admin support.
                </p>
              </div>
              <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
                <div className="flex items-center gap-3 mb-4">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-accent text-white flex-shrink-0">
                    <FiClock className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold text-slate-900">Post-Graduation Work Permit</h3>
                </div>
                <ul className="space-y-3">
                  {[
                    "Programs of 2+ years: typically a 3-year PGWP",
                    "Shorter programs: permit matches study duration",
                    "Work full-time, switch employers freely, or become self-employed",
                    "No employer sponsorship required during PGWP",
                  ].map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-slate-700">
                      <span className="mt-1.5 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                      <span className="leading-relaxed">{item}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-4 rounded-xl bg-accent-soft border border-accent/20 px-4 py-3">
                  <p className="text-xs text-slate-800 leading-relaxed">
                    <strong>2026 Update:</strong> The Canadian government has frozen the
                    PGWP-eligible program list for 2026 &mdash; no new fields of study have been
                    added or removed. Must graduate from a Designated Learning Institution (DLI).
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Canadian Student Visa */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Canadian Student Visa &mdash;{" "}
                <span className="gradient-text">Requirements & Process</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Applying for a student visa to Canada is straightforward when all documents are
                prepared correctly. Once you receive your university admission, you can begin your
                visa application.
              </p>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7">
                <h3 className="text-lg font-bold text-slate-900 mb-5">Key Visa Requirements</h3>
                <ul className="space-y-3">
                  {[
                    "Acceptance Letter from a Designated Learning Institution (DLI)",
                    "Proof of Funds: tuition + living costs (min CAD 22,895 for living)",
                    "GIC (Guaranteed Investment Certificate) of CAD 22,895 recommended",
                    "English Proficiency: IELTS/TOEFL scores (varies by institution)",
                    "Biometrics & Medical Exam (required for most Indian applicants)",
                    "Provincial Attestation Letter (PAL/TAL) \u2014 mandatory for most applicants",
                    "Valid Passport, academic transcripts, SOP & supporting documents",
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
                    { type: "Standard Processing", time: "6\u201310 weeks", note: "Approximately 1.5\u20132.5 months" },
                    { type: "Biometric Appointment", time: "1\u20133 weeks", note: "Available in New Delhi, Mumbai, Bengaluru, Chennai, etc." },
                    { type: "Passport Stamping", time: "1\u20133 weeks", note: "After application approval" },
                  ].map((item) => (
                    <div key={item.type} className="rounded-xl bg-page-soft border border-slate-100 px-4 py-3">
                      <p className="text-sm font-bold text-slate-900">{item.type}</p>
                      <p className="text-sm text-brand font-bold">{item.time}</p>
                      <p className="text-xs text-slate-500">{item.note}</p>
                    </div>
                  ))}
                </div>
                <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                  No visa interview required in most cases. Apply at least 3\u20134 months before
                  your program start date. Peak season: May\u2013August.
                </p>
              </div>
            </div>

            <div className="mt-6 rounded-2xl bg-accent-soft border border-accent/20 px-6 py-5">
              <p className="text-sm text-slate-800 leading-relaxed">
                <strong>2026 Policy Updates:</strong> Study permit cap of ~408,000 students, SDS
                discontinued (all applications follow regular processing), PAL/TAL mandatory,
                minimum proof of funds increased to CAD 22,895, PGWP program list frozen, and formal
                IRCC approval required to change DLI.
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
                Scholarships to <span className="gradient-text">Study in Canada</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Scholarships for international students in Canada are offered by universities,
                provincial governments, private organizations, and federal-funded programs. Many
                provide merit-based entrance scholarships, research assistantships, and teaching
                assistantships.
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

      {/* How Stack Learn Supports Your Canada Journey */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                How Stack Learn Supports Your{" "}
                <span className="gradient-text">Canada Journey</span>
              </h2>
              <p className="text-base md:text-lg text-slate-700 leading-relaxed max-w-3xl mx-auto">
                Studying in Canada requires the right preparation and strategic planning. At Stack
                Learn, we provide end-to-end guidance tailored specifically for Canada admissions
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
              Canadian policies &mdash; helping you move forward with clarity and confidence.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Canada Study Abroad <span className="gradient-text">FAQs</span>
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
            src="https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Canadian mountains and lake"
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
            Start Your Journey to Study in Canada Today
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Get expert guidance on Canadian university admissions, visa applications, scholarships,
            and more. Take the first step toward your international education.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookConsultButton variant="white" className="text-base md:text-lg font-bold inline-flex items-center gap-2">
              Speak with Canada Expert
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
