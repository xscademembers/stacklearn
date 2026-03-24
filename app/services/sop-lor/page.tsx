import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const sopHighlights = [
  "Academic journey",
  "Career goals",
  "Reason for choosing course & country",
  "Skills, projects & achievements",
];

const lorHighlights = [
  "Academic or professional strengths",
  "Work ethic & performance",
  "Leadership & teamwork skills",
  "Overall credibility",
];

const sopBenefits = [
  "Demonstrates clarity of goals",
  "Shows alignment with the chosen course",
  "Highlights your unique strengths",
  "Explains gaps or career transitions properly",
  "Builds confidence in your profile",
  "Differentiates your application from other candidates",
];

const processSteps = [
  "One-on-one brainstorming session",
  "Understanding your academic & career journey",
  "Draft preparation by experts",
  "Multiple revisions & refinements",
  "Final plagiarism check & formatting",
];

const countryFactors = [
  "Country-specific admission standards",
  "Word limits & formatting guidelines",
  "Research-focused vs coursework-based programs",
  "Visa interview alignment",
];

const mistakes = [
  "Copying sample SOPs from the internet",
  "Writing generic or vague statements",
  "Lack of clear career goals",
  "Over-exaggeration or false information",
  "Ignoring country-specific requirements",
];

const faqs = [
  { q: "Do you write SOP completely or guide only?", a: "We provide complete drafting support along with revisions based on your input." },
  { q: "Is the SOP plagiarism-free?", a: "Yes, every SOP is written from scratch and checked for originality." },
  { q: "How many revisions are provided?", a: "We offer multiple revisions to ensure the final version meets your expectations." },
  { q: "Can you help explain education gaps or career changes?", a: "Yes, we strategically present such situations in a positive and logical manner." },
];

export default function SopLorPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184454/pexels-photo-3184454.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student writing SOP"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">SOP &amp; LOR Writing</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Craft a Powerful Story That Secures Your Admission
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Your Statement of Purpose (SOP) and Letters of Recommendation (LOR) are more than just documents &mdash; they represent your vision, achievements, and potential. At StackLearn, we help you present your story in a clear, compelling, and university-focused manner.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              A well-written SOP can significantly increase your chances of admission, even in competitive universities.
            </p>
            <div className="mt-8">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                Get Expert SOP &amp; LOR Support Today <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* What is SOP and LOR */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              What is <span className="gradient-text">SOP &amp; LOR</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              An SOP is a personal statement that explains your academic background, career goals, achievements, and reasons for choosing a particular course and university. An LOR is a recommendation letter written by a professor or employer that validates your skills, performance, and character. Together, these documents play a crucial role in admission decisions.
            </p>
          </div>
          <div className="grid gap-6 md:grid-cols-2 max-w-4xl mx-auto">
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 hover-lift">
              <h3 className="text-base md:text-lg font-extrabold text-brand mb-3">SOP Highlights</h3>
              <ul className="space-y-2">
                {sopHighlights.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm md:text-base text-slate-800">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 hover-lift">
              <h3 className="text-base md:text-lg font-extrabold text-brand mb-3">LOR Highlights</h3>
              <ul className="space-y-2">
                {lorHighlights.map((item) => (
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

      {/* Why SOP Matters */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Why SOP <span className="gradient-text">Matters</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Universities receive thousands of applications with similar academic scores. Your SOP is what differentiates you from other applicants. Even with average marks, a powerful SOP can strengthen your application significantly.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {sopBenefits.map((item) => (
              <div key={item} className="rounded-2xl bg-white border border-slate-200 px-5 py-4 hover-lift text-center">
                <p className="text-sm md:text-base font-semibold text-slate-900">{item}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Process */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              SOP &amp; LOR <span className="gradient-text">Process</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              At StackLearn, we follow a structured and personalized approach to ensure your documents are authentic and impactful. We ensure your SOP is original, professional, and tailored to each university.
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

      {/* Country Specific + Mistakes */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Country Specific <span className="gradient-text">Strategy</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Different countries have different expectations for SOP and LOR formats. What works for the UK may not work for the USA or Canada. We customize your documents based on:
              </p>
              <ul className="space-y-2">
                {countryFactors.map((item) => (
                  <li key={item} className="flex items-start gap-2 text-sm md:text-base text-slate-800">
                    <FiCheckCircle className="w-4 h-4 text-brand flex-shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Common <span className="gradient-text">Mistakes</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Many students lose opportunities due to avoidable errors in their SOP or LOR. We help you avoid these mistakes and present your profile confidently.
              </p>
              <ul className="space-y-2">
                {mistakes.map((item) => (
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
            src="https://images.pexels.com/photos/4145153/pexels-photo-4145153.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Expert writing support"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              Your Story Deserves to Be Told the Right Way
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Don&apos;t let a weak SOP or generic LOR reduce your admission chances.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
              Get Your SOP &amp; LOR Crafted by Experts <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
