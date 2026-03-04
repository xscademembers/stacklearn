"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiChevronDown, FiCheck } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const countries = [
  {
    name: "United States",
    short: "USA",
    href: "/destinations/usa",
    image: "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=800",
    flag: "https://flagcdn.com/w40/us.png",
    highlights: [
      "World-class research infrastructure",
      "Flexible study pathways & OPT",
      "Strong internship opportunities",
    ],
  },
  {
    name: "United Kingdom",
    short: "UK",
    href: "/destinations/uk",
    image: "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=800",
    flag: "https://flagcdn.com/w40/gb.png",
    highlights: [
      "One-year Master's programs",
      "Globally ranked universities",
      "Post-study work visa up to 2 years",
    ],
  },
  {
    name: "Canada",
    short: "Canada",
    href: "/destinations/canada",
    image: "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=800",
    flag: "https://flagcdn.com/w40/ca.png",
    highlights: [
      "Affordable quality education",
      "Co-op programs & PR pathways",
      "Post-graduation work permit",
    ],
  },
  {
    name: "Australia",
    short: "Australia",
    href: "/destinations/australia",
    image: "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=800",
    flag: "https://flagcdn.com/w40/au.png",
    highlights: [
      "Industry-aligned practical education",
      "Post-study work visa up to 4 years",
      "High quality of life",
    ],
  },
  {
    name: "Germany",
    short: "Germany",
    href: "/destinations/germany",
    image: "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=800",
    flag: "https://flagcdn.com/w40/de.png",
    highlights: [
      "Low or no tuition fees",
      "World-class technical education",
      "Strong engineering programs",
    ],
  },
  {
    name: "Ireland",
    short: "Ireland",
    href: "/destinations/ireland",
    image: "https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&w=800",
    flag: "https://flagcdn.com/w40/ie.png",
    highlights: [
      "Europe's leading tech hub",
      "Strong pharma & finance sectors",
      "Multinational career opportunities",
    ],
  },
];

const countryBenefits = [
  {
    country: "UK",
    color: "bg-blue-50 border-blue-200",
    accent: "text-blue-700",
    tag: "bg-blue-100 text-blue-700",
    title: "Accelerated Academic Excellence",
    description: "One-year master\u2019s programs and industry-focused curricula enable faster career entry with globally respected qualifications.",
  },
  {
    country: "USA",
    color: "bg-red-50 border-red-200",
    accent: "text-red-700",
    tag: "bg-red-100 text-red-700",
    title: "Innovation & Research Leadership",
    description: "Access to cutting-edge research infrastructure, flexible study pathways, and strong internship/OPT opportunities enhances employability.",
  },
  {
    country: "Australia",
    color: "bg-amber-50 border-amber-200",
    accent: "text-amber-700",
    tag: "bg-amber-100 text-amber-700",
    title: "Industry-Aligned Learning",
    description: "Practical education models with strong post-study work rights support long-term career progression.",
  },
  {
    country: "Canada",
    color: "bg-rose-50 border-rose-200",
    accent: "text-rose-700",
    tag: "bg-rose-100 text-rose-700",
    title: "Career & Immigration Pathways",
    description: "Affordable education combined with co-op programs and PR-friendly policies strengthens global career prospects.",
  },
  {
    country: "Germany",
    color: "bg-yellow-50 border-yellow-200",
    accent: "text-yellow-700",
    tag: "bg-yellow-100 text-yellow-700",
    title: "High-Quality, Cost-Efficient Education",
    description: "Public universities offer world-class technical education with low or no tuition fees, particularly in engineering and technology.",
  },
  {
    country: "Ireland",
    color: "bg-emerald-50 border-emerald-200",
    accent: "text-emerald-700",
    tag: "bg-emerald-100 text-emerald-700",
    title: "Gateway to Europe\u2019s Tech Hub",
    description: "Strong presence of multinational corporations provides excellent opportunities in technology, pharma, and finance.",
  },
];

const supportServices = [
  {
    num: "01",
    title: "Student Profile Evaluation",
    description: "We conduct a comprehensive assessment of your academic records, test scores, work experience, financial capacity, and career aspirations to determine your eligibility and identify the most suitable study destinations and programs.",
  },
  {
    num: "02",
    title: "Personalized University Shortlisting",
    description: "We evaluate your academic profile, career objectives, budget, and preferred destination to shortlist best-fit universities \u2014 ensuring strong admission probability and long-term career alignment.",
  },
  {
    num: "03",
    title: "Expert SOP & Application Support",
    description: "Our specialists assist in crafting a compelling, country-specific Statement of Purpose (SOP), refining LORs, and reviewing documentation to ensure your application meets university standards and submission deadlines.",
  },
  {
    num: "04",
    title: "Specialized Test Preparation",
    description: "We provide focused training for IELTS, PTE, and other required standardized tests, helping you achieve competitive scores required for admissions and visa success.",
  },
  {
    num: "05",
    title: "Dedicated Visa Guidance",
    description: "Each country has distinct visa policies and financial requirements. We offer step-by-step support for documentation, financial proof preparation, visa filing, and interview readiness to maximize approval rates.",
  },
  {
    num: "06",
    title: "Dedicated Counsellor \u2013 End-to-End",
    description: "You are assigned a personal study abroad advisor who guides you from initial counselling and university selection to visa approval and pre-departure planning \u2014 ensuring a smooth, transparent journey.",
  },
];

const whyChoosePoints = [
  {
    title: "Outstanding Visa & Admission Success",
    description: "With a 98% student visa success rate and 97% admission success rate, our country-specific documentation strategy significantly improves approval outcomes.",
  },
  {
    title: "Access to 500+ Global Universities",
    description: "Our strong network connects students to 500+ recognized universities across leading study destinations \u2014 globally ranked, research-driven, and industry-aligned institutions.",
  },
  {
    title: "Complete End-to-End Services",
    description: "From profile evaluation and university shortlisting to SOP drafting, visa filing, education loan guidance, and accommodation assistance \u2014 we manage the entire journey under one roof.",
  },
  {
    title: "Personalized & Strategic Counselling",
    description: "We provide tailored course and university recommendations aligned with your academic background, career objectives, financial planning, and preferred destination.",
  },
  {
    title: "Dedicated Support from Application to Arrival",
    description: "Our structured approach ensures continuous guidance at every stage \u2014 admission processing, visa preparation, pre-departure orientation, and settlement support.",
  },
  {
    title: "Trusted by 500+ Successful Students",
    description: "With 500+ successful placements across top universities in the UK, USA, Canada, Australia, Germany, and Ireland, Stack Learn is recognized for transparency and measurable outcomes.",
  },
];

const faqs = [
  {
    question: "What documents are required to apply for study abroad?",
    answer: "At The Stack Learn Consultancy, we guide students applying to the USA, UK, Germany, Australia, Canada, and Ireland with complete document support. Typically, you will need academic transcripts, passport copy, SOP, LORs (if required), CV (for PG programs), English test scores (IELTS/TOEFL/PTE), and proof of funds. Our team ensures every document meets university and visa standards before submission.",
  },
  {
    question: "How long does the visa process take?",
    answer: "Visa processing usually takes 3\u201312 weeks depending on the country and intake season. Our team monitors timelines closely, prepares you for interviews (where applicable), and ensures your financial and documentation compliance to avoid unnecessary delays for 2026 intakes.",
  },
  {
    question: "Can I work while studying abroad?",
    answer: "Yes. Students in the USA, UK, Germany, Australia, Canada, and Ireland are generally allowed to work up to 20 hours per week during academic sessions and full-time during breaks. We provide clear guidance on work regulations and post-study work opportunities in each destination country.",
  },
  {
    question: "What is the minimum IELTS score required?",
    answer: "Most universities require IELTS 6.0\u20136.5 for undergraduate programs and 6.5\u20137.0 for postgraduate programs. The Stack Learn Consultancy helps you understand the exact requirement for your chosen university and guides you toward the right preparation strategy.",
  },
  {
    question: "How much does it cost to study abroad?",
    answer: "Costs vary by country and program. Tuition may range between \u20B910\u201330 lakhs per year depending on destination, while living expenses typically range \u20B98\u201315 lakhs annually. Our counsellors provide transparent cost breakdowns and help you plan finances, scholarships, and education loan options.",
  },
  {
    question: "Is proof of funds required for a student visa?",
    answer: "Yes. All major study destinations require proof of sufficient funds covering tuition and living expenses. Whether it is a blocked account (Germany), GIC (Canada), or bank statements/education loans (USA, UK, Australia, Ireland), we ensure your financial documents meet embassy requirements.",
  },
  {
    question: "What if my visa is rejected?",
    answer: "In case of refusal, The Stack Learn Consultancy conducts a detailed refusal analysis, identifies gaps (financial, documentation, interview performance), and prepares a stronger reapplication strategy to improve your approval chances.",
  },
  {
    question: "How long does a preparation or pathway course take?",
    answer: "Preparation programs such as Foundation or Pre-Master\u2019s typically take 6\u201312 months, while English language improvement may take 2\u20136 months depending on your target band. We assess your academic profile and recommend the most suitable pathway.",
  },
  {
    question: "How can I track my application status?",
    answer: "We provide structured application tracking support. While universities and visa authorities offer online tracking portals, our team also keeps you updated at every stage \u2014 from application submission to final visa decision \u2014 ensuring complete transparency.",
  },
];

export default function DestinationsPage() {
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  return (
    <div>
      {/* Hero Section */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Global study destinations"
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
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-4">
              Study Destinations
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-6 leading-tight">
              Choose Your <span className="text-accent">Study Destination</span>
            </h1>
            <blockquote className="text-base md:text-lg text-white/85 leading-relaxed mb-8 max-w-3xl mx-auto italic border-l-4 border-accent pl-5 text-left">
              &ldquo;Our goal is to simplify the overseas education process and ensure that students are equipped with all the necessary tools and information to make informed decisions for their future.&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2">
                Talk to a Country Expert
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
              <Link
                href="#destinations"
                className="px-8 py-4 border-2 border-white/40 text-white rounded-full font-semibold hover:bg-white/10 transition-all duration-300 inline-flex items-center gap-2 justify-center"
              >
                Explore Destinations
                <FiChevronDown className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Study Abroad */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
                Why <span className="gradient-text">Study Abroad?</span>
              </h2>
            </div>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-6">
              Choosing the right country shapes your academic growth, global exposure, and long-term
              career trajectory. From the UK to Australia, each destination provides distinct
              advantages &mdash; whether it&apos;s accelerated master&apos;s programs,
              innovation-driven ecosystems, affordable tuition structures, or strong post-study work
              and PR pathways.
            </p>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-8">
              Studying abroad fosters independence, cross-cultural competence, and access to
              specialized, flexible learning models aligned with industry demand.
            </p>

            <div className="grid gap-4 sm:grid-cols-2 mb-8">
              <div className="rounded-2xl bg-brand-soft/50 border border-brand/20 px-6 py-5 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-brand mb-1">1.3M+</p>
                <p className="text-sm md:text-base text-slate-700">Students pursuing international education annually</p>
              </div>
              <div className="rounded-2xl bg-accent-soft/50 border border-accent/20 px-6 py-5 text-center">
                <p className="text-3xl md:text-4xl font-extrabold text-accent mb-1">90%</p>
                <p className="text-sm md:text-base text-slate-700">Report improved career prospects & earning potential</p>
              </div>
            </div>

            <p className="text-sm md:text-base text-slate-600 leading-relaxed text-center">
              At Stack Learn, we guide you toward destinations that offer superior, practical-oriented
              education, advanced research infrastructure, and strong global employment outcomes.
            </p>
          </div>
        </div>
      </section>

      {/* Popular Destinations */}
      <section id="destinations" className="py-16 md:py-24 bg-gray-50 scroll-mt-28">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Popular <span className="gradient-text">Destinations</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Explore top study destinations around the world and find the perfect fit for your
              academic goals and career aspirations.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {countries.map((country) => (
              <Link
                key={country.href}
                href={country.href}
                className="group flex flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 transition-all duration-300 hover:-translate-y-1"
              >
                <div className="relative h-48 overflow-hidden">
                  <Image
                    src={country.image}
                    alt={`Study in ${country.name}`}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4 flex items-center gap-3">
                    <Image
                      src={country.flag}
                      alt=""
                      width={28}
                      height={20}
                      className="rounded-sm shadow-md flex-shrink-0"
                    />
                    <h3 className="text-white font-bold text-xl drop-shadow-md">
                      Study in {country.name}
                    </h3>
                  </div>
                </div>
                <div className="p-6 flex flex-col flex-1">
                  <ul className="space-y-2.5 flex-1">
                    {country.highlights.map((highlight, i) => (
                      <li key={i} className="text-sm text-slate-600 flex items-start gap-2">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                        <span className="leading-snug">{highlight}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-5 flex items-center text-brand font-semibold text-sm group-hover:gap-2 transition-all duration-300">
                    <span>Explore {country.short}</span>
                    <FiArrowRight className="w-4 h-4 ml-1 flex-shrink-0 group-hover:translate-x-1 transition-transform" />
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Study Abroad Benefits Across Destinations */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Study Abroad Benefits Across{" "}
              <span className="gradient-text">Key Destinations</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-3xl mx-auto">
              Each destination offers unique advantages tailored to different academic and career
              goals. Discover what makes each country stand out.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3 mb-8">
            {countryBenefits.map((item) => (
              <article
                key={item.country}
                className={`rounded-2xl border px-5 py-6 md:px-6 md:py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg ${item.color}`}
              >
                <span className={`inline-block text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full mb-3 ${item.tag}`}>
                  {item.country}
                </span>
                <h3 className={`text-base md:text-lg font-bold mb-2 ${item.accent}`}>
                  {item.title}
                </h3>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                  {item.description}
                </p>
              </article>
            ))}
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold">
                  <FiCheck className="w-4 h-4" />
                </span>
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  Personal Transformation & Independence
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                Living abroad develops adaptability, cultural intelligence, problem-solving ability,
                and language proficiency.
              </p>
            </div>
            <div className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
              <div className="flex items-center gap-2 mb-3">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold">
                  <FiCheck className="w-4 h-4" />
                </span>
                <h3 className="text-base md:text-lg font-bold text-slate-900">
                  Global Network & Competitive Edge
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed">
                Exposure to international peers and faculty builds lifelong global connections,
                giving graduates a distinct advantage in an interconnected job market.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How Stack Learn Supports Your Journey */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              How Stack Learn <span className="gradient-text">Supports Your Journey</span>
            </h2>
            <p className="text-base md:text-lg text-slate-700 leading-relaxed">
              Studying in leading destinations requires precise planning, accurate documentation, and
              strategic decision-making. We provide structured, end-to-end guidance tailored to each
              country&apos;s admission framework and visa regulations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {supportServices.map((service) => (
              <article
                key={service.num}
                className="group rounded-2xl bg-white border border-slate-200 px-5 py-6 md:px-6 md:py-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 hover:border-brand"
              >
                <div className="flex items-start gap-4 mb-3">
                  <span className="inline-flex h-10 w-10 items-center justify-center rounded-full bg-brand text-white text-sm font-extrabold flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                    {service.num}
                  </span>
                  <h3 className="text-sm md:text-base font-bold text-slate-900 pt-2">
                    {service.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {service.description}
                </p>
              </article>
            ))}
          </div>

          <p className="mt-10 text-center text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            At Stack Learn, our approach is strategic, compliant with current immigration policies,
            and fully focused on delivering measurable outcomes for your global academic success.
          </p>
        </div>
      </section>

      {/* Why Choose Stack Learn */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Why Choose <span className="gradient-text">Stack Learn</span>
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-8">
            <div className="rounded-2xl bg-brand-soft/50 border border-brand/20 px-6 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
              <p className="text-3xl md:text-4xl font-extrabold text-brand mb-1">98%</p>
              <p className="text-sm font-semibold text-slate-900">Student Visa Success Rate</p>
            </div>
            <div className="rounded-2xl bg-accent-soft/50 border border-accent/20 px-6 py-6 text-center transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <p className="text-3xl md:text-4xl font-extrabold text-accent mb-1">97%</p>
              <p className="text-sm font-semibold text-slate-900">Admission Success Rate</p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 text-center sm:col-span-2 md:col-span-1 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
              <p className="text-3xl md:text-4xl font-extrabold text-brand mb-1">500+</p>
              <p className="text-sm font-semibold text-slate-900">Successful Student Placements</p>
            </div>
          </div>

          <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
            {whyChoosePoints.map((point) => (
              <article
                key={point.title}
                className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15"
              >
                <div className="flex items-center gap-2 mb-3">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold flex-shrink-0">
                    <FiCheck className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900">
                    {point.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {point.description}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Success Stories CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/1438072/pexels-photo-1438072.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Successful students celebrating"
            fill
            className="object-cover opacity-35"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-brand rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-accent rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Success Stories
            </h2>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-8">
              Hundreds of students have achieved their dream of studying abroad with Stack Learn.
              From securing admissions at top-ranked universities to receiving visas with ease &mdash;
              their journeys inspire the next generation.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                href="/success-stories"
                className="px-8 py-4 bg-white text-brand rounded-full font-semibold hover:shadow-xl transition-all duration-300 hover:scale-105 inline-flex items-center gap-2 justify-center"
              >
                View Success Stories
                <FiArrowRight className="w-4 h-4" />
              </Link>
              <BookConsultButton variant="secondary" className="border-white/40 text-white hover:bg-white/10 hover:text-white">
                Start Your Journey
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="text-center mb-12 md:mb-16">
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
              Frequently Asked <span className="gradient-text">Questions</span>
            </h2>
            <p className="text-base md:text-lg text-slate-600 max-w-2xl mx-auto">
              Find answers to the most common queries about studying abroad.
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={index}
                className="rounded-2xl bg-white border border-slate-200 overflow-hidden transition-all duration-300 hover:shadow-md"
              >
                <button
                  type="button"
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 md:px-6 md:py-5 text-left"
                  aria-expanded={openFaq === index}
                >
                  <span className="font-semibold text-slate-900 text-sm md:text-base">
                    {index + 1}. {faq.question}
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

          <div className="text-center mt-12">
            <p className="text-slate-600 mb-4">Didn&apos;t find your question?</p>
            <BookConsultButton className="inline-flex items-center gap-2">
              Talk to a Counsellor
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-slate-900" />
          <Image
            src="https://images.pexels.com/photos/2774556/pexels-photo-2774556.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students planning their journey"
            fill
            className="object-cover opacity-40"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-15 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" />
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
            Confused About Which Country to Choose?
          </h2>
          <p className="text-base md:text-lg text-white/90 mb-8 max-w-2xl mx-auto">
            Speak with our expert counsellors to find the best fit for your goals. Get personalized
            guidance based on your profile, budget, and career aspirations.
          </p>
          <BookConsultButton variant="white" className="text-base md:text-lg font-bold">
            Book Free Counselling
          </BookConsultButton>
        </div>
      </section>
    </div>
  );
}
