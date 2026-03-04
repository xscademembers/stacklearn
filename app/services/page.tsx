import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const services = [
  {
    title: "Profile Evaluation",
    body: "Detailed academic and career assessment to identify the best countries and universities for your profile.",
    href: "/services/profile-evaluation",
  },
  {
    title: "University Admission Assistance",
    body: "Strategic university shortlisting, complete application submission, and offer letter tracking for top global universities.",
    href: "/services/admission-assistance",
  },
  {
    title: "SOP & LOR Writing Support",
    body: "Professionally structured Statement of Purpose and Letter of Recommendation assistance to strengthen your application.",
    href: "/services/sop-lor",
  },
  {
    title: "Student Visa Assistance",
    body: "Complete student visa documentation support, financial guidance, and interview preparation.",
    href: "/services/visa-assistance",
  },
  {
    title: "Accommodation Assistance",
    body: "Safe and affordable student accommodation guidance near your university campus.",
    href: "/services/accommodation",
  },
  {
    title: "Education Loan Assistance",
    body: "Guidance on secured and unsecured education loans to fund your study abroad dream.",
    href: "/services/education-loan",
  },
];

const steps = [
  { num: "01", title: "Free Profile Evaluation & Career Discussion" },
  { num: "02", title: "University & Course Shortlisting" },
  { num: "03", title: "Application & Documentation Support" },
  { num: "04", title: "Student Visa & Financial Assistance" },
  { num: "05", title: "Pre-Departure & Accommodation Guidance" },
];

const whyPoints = [
  "Personalized study abroad guidance",
  "Strong knowledge of international admission processes",
  "Strategic university selection approach",
  "Transparent communication at every step",
  "Complete support from admission to visa",
];

const faqs = [
  {
    q: "Which countries do you provide study abroad services for?",
    a: "We support students planning to study in the UK, USA, Canada, Australia, Germany, Ireland, and selected European countries.",
  },
  {
    q: "Do you provide complete admission and visa support?",
    a: "Yes, we offer end-to-end overseas education services including admission assistance and student visa guidance.",
  },
  {
    q: "Can I apply for education loans through StackLearn?",
    a: "We provide complete education loan assistance and guide you through the documentation process.",
  },
  {
    q: "When should I start my study abroad process?",
    a: "Ideally, students should begin 6–8 months before their intended intake to allow sufficient time for test prep, applications, and visa processing.",
  },
];

export default function ServicesPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students in counselling session"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              Study Abroad Services
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
              End-to-End Study Abroad Services for International Education
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Looking for trusted study abroad consultants to guide your overseas education journey?
              At StackLearn, we provide complete study abroad services including profile evaluation,
              university admission assistance, SOP &amp; LOR writing, student visa support,
              accommodation guidance, and education loan assistance.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              As a professional overseas education consultancy, we help students plan, apply, and
              secure admission to top universities in the UK, USA, Canada, Australia, and other
              leading destinations.
            </p>
            <div className="mt-8">
              <BookConsultButton
                variant="white"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
              >
                Book Your Free Study Abroad Consultation
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* Our Services */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Our Study Abroad <span className="gradient-text">Services</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              We offer comprehensive overseas education services designed to support students at
              every stage of their international education journey.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 hover-lift flex flex-col hover:border-brand transition-colors duration-300"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                    ✓
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 group-hover:text-brand transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {service.body}
                </p>
                <span className="inline-flex items-center gap-2 mt-3 text-brand font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Learn More <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-sm md:text-base text-slate-600">
            Our services are tailored for students planning to study in the UK, USA, Canada,
            Australia, Ireland, and Europe.
          </p>
        </div>
      </section>

      {/* How Our Process Works */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              How Our Study Abroad <span className="gradient-text">Process Works</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              As experienced overseas education consultants, we follow a structured and transparent
              process to ensure higher admission success rates and smoother visa approvals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-brand text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-900 leading-snug">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose StackLearn */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Why Choose StackLearn as Your{" "}
                <span className="gradient-text">Study Abroad Consultants?</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Choosing the right overseas education consultancy can significantly impact your
                admission and visa success.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-slate-700">
                {whyPoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-7 md:px-8 md:py-8 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We don&apos;t just help you apply — we help you build a successful international
                academic pathway. From your first counselling session to your first day on campus,
                StackLearn stands as your trusted study abroad consultancy partner.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand">98%</p>
                  <p className="text-xs text-slate-600">Visa Success Rate</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand">500+</p>
                  <p className="text-xs text-slate-600">Students Guided</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Study Abroad Services <span className="gradient-text">FAQs</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
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
            src="https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Team helping students plan study abroad"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Start Your Study Abroad Journey with Expert Guidance
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Take the first step toward studying abroad with a trusted overseas education
              consultancy. Talk to our study abroad experts today.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Schedule Your Free Study Abroad Consultation
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
