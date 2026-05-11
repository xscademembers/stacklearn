import type { Metadata } from "next";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiChevronDown } from "react-icons/fi";
import CorporateTrainingButton from "@/components/CorporateTrainingButton";
import CorporateFaqs from "./CorporateFaqs";
import TrainingSuccessStoriesSection from "@/components/trainings/TrainingSuccessStoriesSection";

export const metadata: Metadata = {
  title: "Corporate Training Programs | StackLearn",
  description:
    "Customized corporate training programs in RPA, Data Science, Power BI, AI/ML, QA Automation, Python, and more. Upskill your workforce with StackLearn.",
};

const trainingPrograms = [
  "Robotic Process Automation (RPA – UiPath)",
  "Data Science and Data Analytics",
  "SQL and Database Management",
  "Power BI and Business Intelligence",
  "Artificial Intelligence and Machine Learning",
  "Software Testing and QA Automation",
  "Cybersecurity Fundamentals",
  "Python Programming",
];

const industries = [
  "Information Technology (IT)",
  "Banking and Financial Services",
  "Healthcare and Pharmaceuticals",
  "Manufacturing",
  "E-commerce and Retail",
  "Startups and Technology Companies",
];

const processSteps = [
  {
    num: "01",
    title: "Training Needs Analysis",
    body: "We understand your company's skill gaps and training objectives.",
  },
  {
    num: "02",
    title: "Custom Training Plan",
    body: "Our experts design a training program tailored to your organization.",
  },
  {
    num: "03",
    title: "Trainer Assignment",
    body: "Industry experts deliver the training with practical insights.",
  },
  {
    num: "04",
    title: "Training Delivery",
    body: "Hands-on sessions, projects, and real-world case studies.",
  },
  {
    num: "05",
    title: "Assessment & Certification",
    body: "Employees are evaluated and receive certification after completion.",
  },
];

const deliveryOptions = [
  "Online instructor-led training",
  "On-site corporate workshops",
  "Hybrid learning programs",
  "Hands-on practical sessions",
  "Real-world project training",
];

const businessBenefits = [
  "Increased employee productivity",
  "Improved technical expertise",
  "Faster technology adoption",
  "Stronger problem-solving capabilities",
  "Better team collaboration",
];

const whyChoosePoints = [
  "Experienced industry trainers",
  "Practical hands-on training",
  "Customized corporate training programs",
  "Real-world case studies and projects",
  "Flexible learning options",
];

const whyTrainingMatters = [
  "Improve employee productivity",
  "Reduce skill gaps within teams",
  "Accelerate technology adoption",
  "Increase innovation and efficiency",
  "Strengthen long-term business growth",
];

export default function CorporateTrainingsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Corporate training session in progress"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              Corporate Training Programs
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
              Corporate Training Programs for{" "}
              <span className="text-accent">Modern Businesses</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-3xl mx-auto">
              Empower your workforce with the skills required to succeed in today&apos;s
              fast-evolving technology landscape. StackLearn provides customized corporate training
              programs designed to help organizations upskill their teams and improve productivity.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              Our expert trainers deliver practical, hands-on learning that enables employees to
              apply new knowledge directly in their work environment.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-4">
              <CorporateTrainingButton
                variant="white"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
              >
                Request Corporate Training
                <FiArrowRight className="w-4 h-4" />
              </CorporateTrainingButton>
              <CorporateTrainingButton
                variant="secondary"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base !border-white/40 !text-white hover:!bg-white/10"
              >
                Schedule Consultation
              </CorporateTrainingButton>
            </div>
          </div>
        </div>
      </section>

      {/* Corporate Training Overview */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Corporate Training <span className="gradient-text">Overview</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                StackLearn offers professional corporate training programs designed to help
                organizations build highly skilled and future-ready teams. Our training programs
                focus on real-world applications, practical knowledge, and industry-relevant
                technologies.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We work closely with companies to understand their business goals and deliver
                customized training solutions that improve employee performance and technical
                expertise.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <h3 className="text-lg font-bold text-slate-900 mb-3">Why Corporate Training Matters</h3>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                In today&apos;s competitive market, organizations must continuously upgrade employee
                skills to stay ahead of technological changes.
              </p>
              <ul className="space-y-2">
                {whyTrainingMatters.map((point) => (
                  <li key={point} className="flex items-start gap-2 text-sm text-slate-700">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-4 leading-relaxed">
                Organizations that invest in employee development create stronger and more
                competitive teams.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Training Programs We Offer */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Training Programs <span className="gradient-text">We Offer</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              StackLearn provides corporate training across a wide range of modern technologies and
              professional skills.
            </p>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
            {trainingPrograms.map((program) => (
              <div
                key={program}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-5 text-center hover-lift hover:border-brand transition-colors duration-300"
              >
                <FiCheckCircle className="w-6 h-6 text-brand mx-auto mb-3" />
                <p className="text-sm font-semibold text-slate-900">{program}</p>
              </div>
            ))}
          </div>
          <p className="text-center text-sm text-slate-600 mt-6">
            Programs can be customized according to your organization&apos;s technical requirements.
          </p>
        </div>
      </section>

      {/* Industries We Support */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Industries We <span className="gradient-text">Support</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Our corporate training programs are designed to support organizations across multiple
              industries.
            </p>
          </div>
          <div className="flex flex-wrap justify-center gap-3 max-w-4xl mx-auto">
            {industries.map((industry) => (
              <span
                key={industry}
                className="rounded-full border border-brand/30 bg-brand-soft px-6 py-3 text-sm font-semibold text-slate-800 hover-lift"
              >
                {industry}
              </span>
            ))}
          </div>
          <p className="text-center text-sm text-slate-600 mt-6">
            Each program is tailored to address real-world challenges faced by professionals in
            these industries.
          </p>
        </div>
      </section>

      {/* Corporate Training Process */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Corporate Training <span className="gradient-text">Process</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Our structured training process ensures effective learning and measurable results.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5 max-w-5xl mx-auto">
            {processSteps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-brand text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <h3 className="text-sm font-bold text-slate-900 mb-2">{step.title}</h3>
                <p className="text-xs text-slate-600 leading-relaxed">{step.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Training Delivery Options + Business Benefits */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 max-w-5xl mx-auto">
            {/* Delivery Options */}
            <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 md:px-8 md:py-8 hover-lift">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
                Training Delivery Options
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                StackLearn offers multiple training delivery formats:
              </p>
              <ul className="space-y-2.5">
                {deliveryOptions.map((option) => (
                  <li key={option} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{option}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-4">
                Training schedules can be customized according to your team&apos;s availability.
              </p>
            </div>

            {/* Business Benefits */}
            <div className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-7 md:px-8 md:py-8 hover-lift">
              <h2 className="text-xl md:text-2xl font-extrabold text-slate-900 mb-3">
                Business Benefits
              </h2>
              <p className="text-sm text-slate-700 leading-relaxed mb-4">
                Corporate training programs help organizations achieve measurable business benefits.
              </p>
              <ul className="space-y-2.5">
                {businessBenefits.map((benefit) => (
                  <li key={benefit} className="flex items-start gap-2.5 text-sm text-slate-700">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{benefit}</span>
                  </li>
                ))}
              </ul>
              <p className="text-xs text-slate-500 mt-4">
                Training empowers employees to contribute more effectively to business success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose StackLearn */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start max-w-5xl mx-auto">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Why Choose <span className="gradient-text">StackLearn?</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Organizations choose StackLearn for corporate training because of our practical
                learning approach and industry expertise.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-slate-700">
                {whyChoosePoints.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
              <p className="text-sm text-slate-600 mt-4">
                Our goal is to help organizations build skilled professionals who drive innovation
                and growth.
              </p>
            </div>
            <div className="rounded-2xl bg-white border border-slate-200 px-6 py-7 md:px-8 md:py-8 hover-lift">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-page-soft border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">100+</p>
                  <p className="text-xs text-slate-600 mt-1">Companies Trained</p>
                </div>
                <div className="rounded-xl bg-page-soft border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">8+</p>
                  <p className="text-xs text-slate-600 mt-1">Technology Tracks</p>
                </div>
                <div className="rounded-xl bg-page-soft border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">6+</p>
                  <p className="text-xs text-slate-600 mt-1">Industries Covered</p>
                </div>
                <div className="rounded-xl bg-page-soft border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">Flexible</p>
                  <p className="text-xs text-slate-600 mt-1">Delivery Options</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <TrainingSuccessStoriesSection
        trainingTrack="corporate"
        contextLabel="Corporate Trainings"
      />

      {/* FAQs */}
      <CorporateFaqs />

      {/* Final CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184306/pexels-photo-3184306.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Team collaborating on corporate training"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Upskill Your Workforce with StackLearn Corporate Training
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Equip your employees with the skills required to succeed in today&apos;s
              technology-driven business environment.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <CorporateTrainingButton
                variant="white"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
              >
                Request Proposal
                <FiArrowRight className="w-4 h-4" />
              </CorporateTrainingButton>
              <CorporateTrainingButton
                variant="secondary"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base !border-white/40 !text-white hover:!bg-white/10"
              >
                Talk to Our Training Experts
              </CorporateTrainingButton>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
