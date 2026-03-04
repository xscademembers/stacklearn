import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const evaluationPoints = [
  "Academic performance & backlogs",
  "Work experience & internships",
  "Projects, certifications & technical skills",
  "Education gaps or career switches",
  "IELTS / GRE / GMAT requirements",
  "Budget & financial capacity",
  "Long-term career objectives",
];

const benefits = [
  "Identify realistic & ambitious universities",
  "Avoid common application mistakes",
  "Improve weak areas before applying",
  "Understand country-wise eligibility",
  "Plan finances effectively",
];

const processSteps = [
  "One-on-one consultation session",
  "Detailed profile analysis",
  "Strength & gap identification",
  "Country and university mapping",
  "Clear action plan for next steps",
];

const outcomes = [
  "Recommended countries",
  "Shortlisted universities (Safe / Moderate / Ambitious)",
  "Exam and improvement strategy",
  "Scholarship possibilities",
  "Step-by-step application roadmap",
];

const faqs = [
  { q: "Can I apply with low grades or backlogs?", a: "Yes. Many universities consider work experience, projects, and skillsets along with academics." },
  { q: "What if I have an education gap?", a: "Education gaps can be justified with proper explanation and documentation. We guide you on how to present it correctly." },
  { q: "Is profile evaluation mandatory before applying?", a: "It\u2019s highly recommended to avoid rejections and save time." },
  { q: "How long does the evaluation take?", a: "Usually 1\u20132 working days after receiving complete details." },
];

export default function ProfileEvaluationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student career counselling session"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">Profile Evaluation</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Build the Right Strategy Before You Apply
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Every successful study abroad journey starts with a clear understanding of your profile. At StackLearn, we analyze your academic background, experience, and career goals to design a personalized admission strategy that improves your chances of success.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              Many students are unsure about their eligibility, country options, or whether their marks are enough. Our profile evaluation removes that uncertainty and gives you a clear direction before you invest time and money.
            </p>
            <div className="mt-8">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                Get Your Profile Evaluated Today <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* What We Evaluate */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                What We <span className="gradient-text">Evaluate</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We conduct a complete 360&deg; assessment to understand your strengths, gaps, and overall admission potential. Our evaluation goes beyond just GPA &mdash; we look at your complete academic and professional journey.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-2 font-medium">We assess:</p>
            </div>
            <div className="space-y-3">
              {evaluationPoints.map((point) => (
                <div key={point} className="flex items-start gap-3 rounded-xl border border-slate-200 bg-page-soft px-4 py-3 hover-lift">
                  <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                  <span className="text-sm md:text-base text-slate-800">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <p className="mt-6 text-sm md:text-base text-slate-600 text-center max-w-3xl mx-auto">
            This helps us position your profile strategically for the right universities and countries.
          </p>
        </div>
      </section>

      {/* Why Profile Evaluation */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Why <span className="gradient-text">Profile Evaluation</span> Matters
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Many students apply randomly without understanding their chances, which often leads to rejections or wasted application fees. A proper evaluation helps you apply smartly and confidently. It also gives you clarity on whether you need to improve your test scores, gain experience, or adjust your university choices.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {benefits.map((item) => (
              <div key={item} className="rounded-2xl bg-white border border-slate-200 px-5 py-4 hover-lift text-center">
                <p className="text-sm md:text-base font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How StackLearn Does It */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              How StackLearn <span className="gradient-text">Does It</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Our approach is structured, personalized, and practical. We don&apos;t give generic suggestions &mdash; we create a roadmap based on your specific profile and career vision. We also explain university flexibility, admission trends, and realistic acceptance chances so you make informed decisions.
            </p>
          </div>
          <div className="max-w-2xl mx-auto grid gap-4">
            {processSteps.map((step, i) => (
              <div key={step} className="flex items-center gap-4 rounded-2xl bg-page-soft border border-slate-200 px-5 py-4 hover-lift">
                <div className="w-10 h-10 rounded-full bg-brand text-white font-extrabold text-sm flex items-center justify-center flex-shrink-0">
                  {i + 1}
                </div>
                <p className="text-sm md:text-base font-semibold text-slate-900">{step}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Evaluation Outcome */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Evaluation <span className="gradient-text">Outcome</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              After the evaluation, you won&apos;t feel confused about where to apply or what to do next. You will have clarity, direction, and confidence. You&apos;ll clearly understand your strong points, improvement areas, and realistic admission possibilities.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
            {outcomes.map((item) => (
              <div key={item} className="flex items-start gap-3 rounded-2xl bg-white border border-slate-200 px-5 py-4 hover-lift">
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
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students planning study abroad journey"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              Don&apos;t Apply Blindly. Apply Strategically.
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Get clarity on your eligibility, country options, and admission chances before you start applying.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
              Book Your Personalized Profile Evaluation Now <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
