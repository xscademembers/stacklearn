import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiTarget } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const gapProblems = [
  "Lack of practical skills",
  "No real project experience",
  "Difficulty competing in job markets",
];

const approach = [
  {
    title: "Clarity First",
    body: "We help you choose the right country, course, and path based on your goals — not trends.",
  },
  {
    title: "End-to-End Guidance",
    body: "From applications and SOPs to visa support, we guide you through every step.",
  },
  {
    title: "Skill Before You Go",
    body: "We train you in real-world, in-demand technologies so you’re ready before you land abroad.",
    bullets: ["Data Science", "AI & Machine Learning", "Software Development"],
  },
  {
    title: "Career-Focused Preparation",
    body: "We help you build projects, portfolios, and confidence so you’re ready for opportunities abroad.",
  },
];

const whoWeWorkWith = [
  "Students planning to study abroad",
  "Graduates who want to strengthen their profile",
  "Individuals aiming for global tech careers",
];

const makesUsDifferent = [
  { title: "Education guidance", body: "Right country, course, and university — with honest counselling." },
  { title: "Technical training", body: "In-demand skills and real project experience before you go." },
  { title: "Career readiness", body: "Portfolios, interview confidence, and a path to global opportunities." },
];

export default function AboutPage() {
  return (
    <main>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Global career guidance"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              About Us
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              More Than Just Study Abroad —{" "}
              <span className="text-accent">We Build Global Careers</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto">
              At StackLearn, we started with a simple observation: many students go abroad with big
              dreams — but without the right preparation to succeed once they get there. Getting into
              a university is only the first step. Building a career in a competitive global environment
              is the real challenge. That’s where we come in.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Start Your Journey
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
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
              We combine overseas education consultancy with practical technical training to help
              students not just study abroad — but actually thrive there. From choosing the right
              university to building job-ready skills, we support students through the complete journey.
            </p>
          </div>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We guide your overseas education decisions with clarity and transparency — so you pick
                what’s right for your long-term goals.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                We prepare you for global opportunities with hands-on skills, real projects, and
                career-ready confidence.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Why StackLearn Exists */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Why StackLearn <span className="gradient-text">Exists</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Traditional consultancies focus on applications, documentation, and visas. But students
                often struggle after reaching their destination. We created StackLearn to solve this gap.
              </p>
              <div className="space-y-3">
                {gapProblems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 hover-lift"
                  >
                    <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-7 md:px-8 md:py-8 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center text-white shadow-md">
                  <FiTarget className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand">
                    Our Promise
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    We prepare you for what happens after you land.
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Your admission is a milestone — not the finish line. Our support is designed to help
                you thrive academically, build real skills, and become competitive in global job markets.
              </p>
            </aside>
          </div>
        </div>
      </section>

      {/* Our Approach */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Our <span className="gradient-text">Approach</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              We don’t treat students as applications — we treat them as future professionals.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, idx) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-gray-50 px-5 py-6 md:px-6 md:py-7 hover-lift hover:border-brand transition-colors duration-300 flex flex-col"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {item.body}
                </p>
                {item.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Who We Work With */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Who We <span className="gradient-text">Work With</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            {whoWeWorkWith.map((item) => (
              <article
                key={item}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 text-center hover-lift"
              >
                <p className="text-sm md:text-base font-semibold text-slate-900">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* What Makes Us Different */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                What Makes Us <span className="gradient-text">Different</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We don’t stop at admissions. We focus on what truly matters: what happens after you land
                in a new country.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                That’s why we combine education guidance, technical training, and career readiness into
                one single journey.
              </p>
            </div>

            <div className="space-y-3">
              {makesUsDifferent.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-6 md:px-7 md:py-7 hover-lift"
                >
                  <p className="text-sm font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Our Goal */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Our <span className="gradient-text">Goal</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              To help students not just go abroad — but succeed, grow, and build meaningful careers
              globally.
            </p>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students preparing for global careers"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Let&apos;s Get Started
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              If you&apos;re serious about studying abroad and building a strong future, we&apos;re here to
              guide you. Start your journey with StackLearn.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free Counselling
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </main>
  );
}
