import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const whyHelp = [
  "Choose accommodation near your university",
  "Avoid rental scams or unreliable listings",
  "Understand lease terms and deposit policies",
  "Plan accommodation within your budget",
  "Secure housing before travel",
];

const types = [
  { name: "University On-Campus Accommodation", desc: "Managed housing within the university campus" },
  { name: "Private Student Residences", desc: "Purpose-built student living spaces" },
  { name: "Shared Apartments / Flats", desc: "Cost-effective shared housing with other students" },
  { name: "Studio Apartments", desc: "Private living spaces for independent students" },
  { name: "Homestay Options", desc: "Living with a local host family" },
];

const processSteps = [
  "Understanding your budget & preferences",
  "Shortlisting suitable accommodation options",
  "Reviewing lease terms & policies",
  "Booking confirmation & deposit guidance",
  "Pre-arrival accommodation planning",
];

const supportPoints = [
  "Budget-based accommodation suggestions",
  "Location guidance near university",
  "Lease agreement understanding",
  "Deposit and payment guidance",
  "Pre-departure housing support",
];

const faqs = [
  { q: "When should I book my accommodation?", a: "It\u2019s advisable to book at least 1\u20132 months before your travel date." },
  { q: "Is on-campus accommodation better than private housing?", a: "It depends on your budget and lifestyle preference. We help you compare both." },
  { q: "How much is the deposit amount?", a: "Deposit requirements vary by country and accommodation type." },
  { q: "Can I change accommodation after arrival?", a: "Yes, but it depends on the lease agreement terms." },
];

export default function AccommodationPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/1571460/pexels-photo-1571460.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student accommodation"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">Accommodation Assistance</p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
              Find Safe, Comfortable &amp; Budget-Friendly Student Accommodation
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              Securing the right accommodation is an important part of your study abroad journey. A comfortable living environment helps you focus on academics and settle smoothly in a new country. At StackLearn, we guide you in choosing safe, convenient, and budget-friendly housing options near your university.
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              We ensure your transition to a new country is smooth and stress-free.
            </p>
            <div className="mt-8">
              <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
                Get Help Finding Your Student Accommodation <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      {/* Why Accommodation Assistance */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Why Accommodation <span className="gradient-text">Assistance</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Many students struggle to understand rental contracts, deposits, and location advantages when booking accommodation from abroad. Making the wrong choice can lead to higher expenses or inconvenience. Early planning ensures peace of mind before departure.
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

      {/* Types of Accommodation */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              Types of Student <span className="gradient-text">Accommodation</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Different countries offer multiple housing options based on budget and lifestyle preferences. Each option has its own advantages in terms of cost, privacy, and location.
            </p>
          </div>
          <div className="max-w-3xl mx-auto grid gap-4 md:grid-cols-2">
            {types.map((item) => (
              <div key={item.name} className="rounded-2xl bg-white border border-slate-200 px-5 py-5 hover-lift">
                <p className="text-sm md:text-base font-extrabold text-brand mb-1">{item.name}</p>
                <p className="text-xs md:text-sm text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Process + How We Help */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Accommodation <span className="gradient-text">Process</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Booking accommodation requires careful planning and timely confirmation. We guide you through the process to avoid last-minute stress. This ensures you have a confirmed place to stay before you land.
              </p>
              <div className="space-y-3">
                {processSteps.map((step, i) => (
                  <div key={step} className="flex items-center gap-3 rounded-xl bg-page-soft border border-slate-200 px-4 py-3 hover-lift">
                    <div className="w-8 h-8 rounded-full bg-brand text-white font-extrabold text-xs flex items-center justify-center flex-shrink-0">
                      {i + 1}
                    </div>
                    <p className="text-sm md:text-base font-semibold text-slate-900">{step}</p>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                How StackLearn <span className="gradient-text">Helps</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                We assist you in identifying reliable housing options aligned with your university location and financial plan. We make sure you don&apos;t face unnecessary stress while planning your stay.
              </p>
              <div className="space-y-3">
                {supportPoints.map((item) => (
                  <div key={item} className="flex items-start gap-3 rounded-xl bg-page-soft border border-slate-200 px-4 py-3 hover-lift">
                    <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>
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
            src="https://images.pexels.com/photos/1643383/pexels-photo-1643383.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Safe student accommodation"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-3">
              Ready to Secure Your Accommodation?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Start your journey with a confirmed, safe, and comfortable place to stay.
            </p>
            <BookConsultButton variant="white" className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base">
              Get Accommodation Guidance Today <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
