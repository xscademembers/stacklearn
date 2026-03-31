import type { Metadata } from "next";
import Image from "next/image";
import { FiArrowRight, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

export const metadata: Metadata = {
  title: "Study Abroad Training | StackLearn",
  description:
    "End-to-end overseas education support from one of the best study abroad consultants in India — university shortlisting, application submissions, IELTS coaching online, visa support, SOP guidance, and dedicated counselling for Study in UK, USA, Canada, Australia and more.",
};

const services = [
  {
    title: "Universities Shortlisting",
    body: "We assist in selecting the best-fit universities based on your academic goals and preferences.",
  },
  {
    title: "Application Submissions",
    body: "We streamline the application process, ensuring all required documents are submitted accurately and on time.",
  },
  {
    title: "IELTS Preparation",
    body: "We offer specialized IELTS preparation to help you achieve your desired score and meet language proficiency requirements.",
  },
  {
    title: "Visa Support",
    body: "We guide you through the visa application process, helping you navigate the complexities and increase your chances of approval.",
  },
  {
    title: "SOP Support",
    body: "Our experts provide valuable guidance and support to craft a compelling Statement of Purpose (SOP) that highlights your strengths and aspirations.",
  },
  {
    title: "Dedicated Counselor",
    body: "You'll have a dedicated counselor who will provide personalized guidance and support throughout your educational journey.",
  },
];

export default function StudyAbroadTrainingsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184394/pexels-photo-3184394.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students preparing to study abroad"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              Study Abroad
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
              We Make Your Dream of{" "}
              <span className="text-accent">Studying Abroad</span> a Reality
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto">
              Our team of experienced overseas education consultants will guide you every step of the way,
              ensuring a smooth and successful study abroad journey to your ideal university with clear
              study visa guidance and country-specific support.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Let&apos;s Get Started
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* About the Counsellor */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-[1.4fr_minmax(0,1fr)] items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                About the <span className="gradient-text">Counsellor</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                At Stack Learn Private Limited, we are a group of people passionate about helping
                students embark on their global education journey. We are a premier study abroad
                consultancy offering expert guidance and support to students who aspire to pursue higher
                education abroad with the help of experienced overseas education consultants.
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">
                Our goal is to simplify the overseas education process and ensure that students are
                equipped with all the necessary tools and information to make informed decisions for
                their future.
              </p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">500+</p>
                  <p className="text-xs text-slate-600 mt-1">Students Guided</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">98%</p>
                  <p className="text-xs text-slate-600 mt-1">Visa Success</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">6+</p>
                  <p className="text-xs text-slate-600 mt-1">Countries</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-5 text-center">
                  <p className="text-2xl font-extrabold text-brand">1:1</p>
                  <p className="text-xs text-slate-600 mt-1">Dedicated Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Your End-to-End Overseas Education Solution */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Your End-to-End Overseas{" "}
              <span className="gradient-text">Education Solution</span>
            </h2>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-5xl mx-auto">
            {services.map((service) => (
              <article
                key={service.title}
                className="rounded-2xl border border-slate-200 bg-white px-5 py-6 md:px-6 md:py-7 hover-lift hover:border-brand transition-colors duration-300 flex flex-col"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold flex-shrink-0">
                    <FiCheckCircle className="w-4 h-4" />
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900">
                    {service.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {service.body}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/901964/pexels-photo-901964.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Graduation celebration"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Begin Your Study Abroad Journey?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Connect with our expert counsellors today and take the first step towards studying at
              your dream university abroad.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free Counselling Session
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
