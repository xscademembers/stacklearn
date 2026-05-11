import Image from "next/image";
import ServiceSuccessStoriesSection from "@/components/services/ServiceSuccessStoriesSection";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const countries = ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Ireland"];

const visaSupport = [
  "Complete document checklist",
  "Financial documentation guidance",
  "Visa application form filling",
  "CAS / I-20 / Offer verification",
  "Biometric appointment guidance",
  "Visa file review before submission",
];

const strategy = [
  "Financial proof verification",
  "Course and university alignment review",
  "Clear study plan explanation",
  "Mock interview preparation (if required)",
  "Rechecking all supporting documents",
];

const rejectionReasons = [
  "Insufficient financial proof",
  "Incomplete or incorrect documentation",
  "Weak explanation of study purpose",
  "Inconsistent information",
  "Lack of genuine student intent",
];

const faqs = [
  { q: "How long does visa processing take?", a: "Processing times vary by country, typically between 2\u20136 weeks." },
  { q: "What financial documents are required?", a: "Requirements depend on the country. We provide a customized checklist." },
  { q: "Do you provide visa interview training?", a: "Yes, we conduct mock sessions for countries that require interviews." },
  { q: "What if my visa gets rejected?", a: "We analyze the reason and guide you on reapplication strategy." },
];

export default function VisaAssistancePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184311/pexels-photo-3184311.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student visa application process"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">Visa Assistance</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Secure Your Student Visa With Confidence
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Getting admission is only half the journey &mdash; securing your student visa is equally important. At StackLearn, we provide complete visa guidance to ensure your documentation, financial proofs, and interview preparation are handled accurately.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              We simplify complex visa procedures and help you apply with clarity and confidence.
            </p>
            <div className="mt-8">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                Start Your Visa Process With Expert Support <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Supported */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Countries <span className="gradient-text">Supported</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              We provide visa assistance for major international study destinations. Each country has different visa rules, documentation standards, and financial requirements &mdash; and we guide you accordingly.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 grid-cols-2 md:grid-cols-3">
            {countries.map((c) => (
              <div key={c} className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-4 text-center hover-lift">
                <p className="text-sm md:text-base font-semibold text-slate-900">{c}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">Our country-specific expertise ensures accurate and up-to-date visa guidance.</p>
        </div>
      </section>

      {/* Visa Process */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Visa <span className="gradient-text">Process</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                The visa process requires careful documentation and financial clarity. Even small errors can lead to delays or rejections. We guide you step-by-step to ensure everything is properly prepared.
              </p>
              <p className="text-sm md:text-base text-slate-700 mb-4 font-medium">We ensure your visa file is accurate, organized, and strong.</p>
            </div>
            <div className="space-y-3">
              {visaSupport.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-white px-4 py-3 hover-lift">
                  <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-slate-800">{item}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Strategy + Rejection Reasons */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Visa Success <span className="gradient-text">Strategy</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Visa approval depends on strong documentation, genuine intent, and financial transparency. We prepare you not just to apply &mdash; but to succeed.
              </p>
              <ul className="space-y-2">
                {strategy.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm md:text-base text-slate-800">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Common Rejection <span className="gradient-text">Reasons</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Many student visas get rejected due to avoidable mistakes. We carefully review your file to minimize such risks.
              </p>
              <ul className="space-y-2">
                {rejectionReasons.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm md:text-base text-slate-800">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-accent flex-shrink-0" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <ServiceSuccessStoriesSection
        serviceSlug="visa-assistance"
        serviceLabel="Student Visa Assistance"
      />

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-4 md:px-6 md:py-5 hover-lift">
                <p className="font-semibold text-slate-900 mb-1 text-sm md:text-base">{item.q}</p>
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
            src="https://images.pexels.com/photos/3184405/pexels-photo-3184405.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Visa guidance support"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              Ready to Secure Your Student Visa?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Don&apos;t leave your visa approval to chance. Apply with expert guidance and complete confidence.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
              Book Your Visa Consultation Today <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
