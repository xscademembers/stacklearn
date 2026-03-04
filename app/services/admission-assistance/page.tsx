import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const supportIncludes = [
  "Personalized university & course selection",
  "Application form filling guidance",
  "SOP & LOR coordination",
  "Document verification & formatting",
  "Application submission & tracking",
  "Continuous follow-up with universities",
];

const universityTiers = [
  { tier: "Safe Options", desc: "High acceptance probability" },
  { tier: "Moderate Options", desc: "Balanced profile match" },
  { tier: "Ambitious Options", desc: "Competitive universities" },
];

const submissionHelp = [
  "Online application portals",
  "Document uploads & formatting",
  "Application fee guidance",
  "Deadline management",
  "Offer letter tracking & follow-up",
];

const countries = ["United Kingdom", "United States", "Canada", "Australia", "Germany", "Ireland"];

const faqs = [
  { q: "How many universities should I apply to?", a: "We typically recommend 4\u20136 universities with a balanced strategy." },
  { q: "Do you help with application fee payments?", a: "Yes, we guide you through secure and proper payment processes." },
  { q: "Can I apply without IELTS/GRE?", a: "Some universities allow conditional admissions. We advise based on your chosen country." },
  { q: "How long does the admission process take?", a: "Processing time usually ranges between 2\u20138 weeks after submission." },
];

export default function AdmissionAssistancePage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="University admission counselling"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">Admission Assistance</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Complete Admission Support &mdash; From Shortlisting to Offer Letter
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Applying to international universities can feel overwhelming, especially when every country and university has different requirements, deadlines, and document standards. At StackLearn, we simplify the entire admission process and guide you step-by-step &mdash; ensuring your application is accurate, competitive, and submitted on time.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              From choosing the right universities to securing your offer letter, we handle the complexities so you can focus on preparing for your future.
            </p>
            <div className="mt-8">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                Start Your Admission Process With Experts <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* What We Do */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              What We <span className="gradient-text">Do</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Our Admission Assistance service covers the complete university application journey &mdash; from initial planning to final offer confirmation. We ensure your profile is positioned correctly and your applications are submitted professionally.
            </p>
          </div>
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {supportIncludes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-page-soft px-4 py-3 hover-lift">
                <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-slate-800">{item}</span>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm md:text-base text-slate-600 max-w-3xl mx-auto">
            We make sure nothing is missed and every application reflects your strengths clearly.
          </p>
        </div>
      </section>

      {/* University Shortlisting */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              University <span className="gradient-text">Shortlisting</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Selecting the right universities is not just about rankings &mdash; it&apos;s about finding the best fit for your academic profile, career goals, and budget. We analyze admission trends and shortlist universities strategically to maximize your acceptance rate.
            </p>
          </div>
          <div className="max-w-2xl mx-auto grid gap-4 md:grid-cols-3">
            {universityTiers.map((item) => (
              <div key={item.tier} className="rounded-2xl bg-white border border-slate-200 px-5 py-6 text-center hover-lift">
                <p className="text-base md:text-lg font-extrabold text-brand mb-1">{item.tier}</p>
                <p className="text-xs md:text-sm text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Application Submission */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Application <span className="gradient-text">Submission</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Each university has different application portals, documentation standards, and deadlines. Even minor errors in forms or missing documents can delay decisions or lead to rejection. Our team carefully reviews every detail before submission and keeps track of all deadlines and communications.
              </p>
            </div>
            <div className="space-y-3">
              {submissionHelp.map((item) => (
                <div key={item} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-page-soft px-4 py-3 hover-lift">
                  <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-slate-800">{item}</span>
                </div>
              ))}
              <p className="text-sm text-slate-600 pt-2">You&apos;ll always know the status of your applications.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Countries Supported */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Countries <span className="gradient-text">Supported</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              We provide admission assistance for leading global education destinations. Each country has its own admission process and documentation requirements &mdash; and we guide you accordingly.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 grid-cols-2 md:grid-cols-3">
            {countries.map((c) => (
              <div key={c} className="rounded-2xl bg-white border border-slate-200 px-5 py-4 text-center hover-lift">
                <p className="text-sm md:text-base font-semibold text-slate-900">{c}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-600">Our country-specific expertise ensures accurate and up-to-date guidance.</p>
        </div>
      </section>

      {/* Success Stories */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Success <span className="gradient-text">Stories</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Over the years, we have helped students secure admissions in reputed universities across multiple countries. Whether a student has strong academics or needs strategic planning to overcome challenges like backlogs or career shifts &mdash; we create customized admission strategies. Our focus is not just admission, but the right admission for your long-term success.
            </p>
          </div>
        </div>
      </section>

      {/* FAQs */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-8 text-center">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            {faqs.map((item) => (
              <div key={item.q} className="rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 hover-lift">
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
            src="https://images.pexels.com/photos/3184296/pexels-photo-3184296.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students receiving offer letters"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              Ready to Secure Your Admission?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Avoid unnecessary rejections and application mistakes. Let experts manage your university applications with precision and strategy.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
              Book Your Free Admission Consultation <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
