import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const whyHelp = [
  "Understand loan eligibility clearly",
  "Compare interest rates and repayment options",
  "Identify collateral vs non-collateral loans",
  "Prepare proper financial documentation",
  "Improve chances of faster approval",
];

const loanTypes = [
  { name: "Secured Loans", desc: "With collateral, lower interest rates" },
  { name: "Unsecured Loans", desc: "Without collateral, based on profile strength" },
  { name: "Government Bank Loans", desc: "Education loans from public sector banks" },
  { name: "Private Institution Loans", desc: "Loans from private financial institutions" },
  { name: "Tuition + Living Coverage", desc: "Comprehensive loans covering all expenses" },
];

const eligibility = [
  "Confirmed admission offer",
  "Academic track record",
  "Co-applicant income stability",
  "Credit score (if applicable)",
];

const documents = [
  "Offer letter from university",
  "Academic transcripts",
  "Identity & address proof",
  "Income proof of co-applicant",
  "Bank statements",
  "Collateral documents (if applicable)",
];

const processSteps = [
  "Loan eligibility assessment",
  "Lender comparison & selection",
  "Document preparation & submission",
  "Financial verification",
  "Sanction letter issuance",
  "Loan disbursement",
];

const partners = [
  "Avanse Financial Services",
  "Credila",
  "HDFC Bank",
  "Union Bank of India",
  "State Bank of India (SBI)",
  "ICICI Bank (iSMART Education Loans)",
];

const supportPoints = [
  "Loan eligibility evaluation",
  "Guidance on collateral & non-collateral options",
  "Document preparation assistance",
  "Application tracking",
  "Sanction letter coordination",
];

const faqs = [
  { q: "Can I get a loan without collateral?", a: "Yes, unsecured loans are available based on profile strength and co-applicant eligibility." },
  { q: "Does the loan cover living expenses?", a: "Most lenders provide coverage for tuition and living costs." },
  { q: "How long does loan approval take?", a: "Approval timelines vary but typically range from 7\u201320 working days." },
  { q: "Can I apply before receiving admission?", a: "Most lenders require a confirmed offer letter before processing." },
];

export default function EducationLoanPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Education loan guidance"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">Education Loan Assistance</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Fund Your Study Abroad Dream With Confidence
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Financing your international education can feel overwhelming, but the right education loan makes it achievable. At StackLearn, we guide you through the complete loan process &mdash; from understanding eligibility to securing approval &mdash; so you can focus on your academic goals.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              We help you explore the best loan options with clarity and confidence.
            </p>
            <div className="mt-8">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                Get Expert Education Loan Guidance <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Loan Assistance */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Why Education Loan <span className="gradient-text">Assistance</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Many students and parents are unsure about loan eligibility, collateral requirements, interest rates, and repayment terms. Without proper guidance, the process can become confusing and time-consuming. Early financial planning ensures smoother visa processing and admission confirmation.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {whyHelp.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-page-soft border border-slate-200 px-4 py-3 hover-lift">
                <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Types of Education Loans */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Types of Education <span className="gradient-text">Loans</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Education loans are available through banks and financial institutions, depending on your country of study and profile. Each option differs in interest rates, processing time, and approval criteria.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
            {loanTypes.map((item) => (
              <div key={item.name} className="rounded-2xl bg-white border border-slate-200 px-5 py-5 hover-lift">
                <p className="text-sm md:text-base font-extrabold text-brand mb-1">{item.name}</p>
                <p className="text-xs md:text-sm text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Eligibility & Documents */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Eligibility <span className="gradient-text">Factors</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Loan approval depends on academic profile, chosen country, university, and financial background of the co-applicant.
              </p>
              <ul className="space-y-2">
                {eligibility.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm md:text-base text-slate-800">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Required <span className="gradient-text">Documents</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Proper documentation speeds up approval. Common documents include:
              </p>
              <ul className="space-y-2">
                {documents.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm md:text-base text-slate-800">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Loan Process */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Loan <span className="gradient-text">Process</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              The loan process involves multiple verification steps and financial assessments. We guide you through each stage to ensure smooth approval. Timely coordination ensures your admission and visa timelines are not affected.
            </p>
          </div>
          <div className="max-w-2xl mx-auto grid gap-4">
            {processSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl bg-white border border-slate-200 px-5 py-4 hover-lift">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partner Network */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Our Global Financial <span className="gradient-text">Network</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              At StackLearn, we have established strong collaborations with leading education loan providers and national banks to help students secure funding with confidence. Our network ensures competitive interest rates, faster approvals, and flexible repayment options.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 grid-cols-2 md:grid-cols-3">
            {partners.map((p) => (
              <div key={p} className="rounded-2xl bg-page-soft border border-slate-200 px-5 py-4 text-center hover-lift">
                <p className="text-sm md:text-base font-semibold text-slate-900">{p}</p>
              </div>
            ))}
          </div>
          <p className="mt-6 text-center text-sm text-slate-600 max-w-3xl mx-auto">
            With our structured documentation support and direct coordination, we help accelerate loan processing timelines and improve approval outcomes.
          </p>
        </div>
      </section>

      {/* How StackLearn Helps */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              How StackLearn <span className="gradient-text">Helps</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              We simplify the loan process by connecting you with suitable financial institutions and guiding you step-by-step. Our goal is to make your study abroad investment financially manageable and stress-free.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {supportPoints.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 px-4 py-3 hover-lift">
                <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                <span className="text-sm md:text-base text-slate-800">{item}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

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
            src="https://images.pexels.com/photos/4386476/pexels-photo-4386476.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Education loan consultation"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              Ready to Secure Your Education Loan?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Don&apos;t let finances delay your study abroad plans. Get expert guidance and choose the right loan option confidently.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
              Talk to Our Loan Support Team <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
