import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";

export default function StudyAbroadStepsPage() {
  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600"
            alt="Airplane travel representing study abroad journey"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/60" />
        </div>
        {/* Soft light blobs */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Your Study Abroad Steps</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            A complete guide to your international education journey — simplified step by step.
          </p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/contact"
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              Book Free Counselling
            </Link>
            <Link
              href="/destinations"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Explore Destinations
            </Link>
          </div>
        </div>
      </section>

      {/* Why Study Abroad */}
      <section id="why" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Study Abroad?</h2>
              <p className="text-lg text-gray-600 mb-6">
                Studying abroad offers unparalleled opportunities for personal growth, career advancement, and global exposure.
              </p>
              <div className="grid grid-cols-2 gap-4">
                {[
                  "Global exposure",
                  "Quality education",
                  "Career opportunities",
                  "Personal growth",
                ].map((point, index) => (
                  <div key={index} className="bg-gray-50 p-4 rounded-lg">
                    <h3 className="font-semibold text-gray-900">{point}</h3>
                  </div>
                ))}
              </div>
              <Link
                href="/destinations"
                className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Explore Destinations
              </Link>
            </div>
            <div className="relative rounded-xl h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=800"
                alt="Students studying abroad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* What and Where */}
      <section id="what-where" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-4">What and Where to Study</h2>
          <p className="text-center text-gray-600 mb-12">Find the right course and destination that fits your career goals.</p>
          <div className="grid md:grid-cols-4 gap-6">
            {["UK", "USA", "Canada", "Australia"].map((country, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-md text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{country}</h3>
                <p className="text-gray-600 text-sm mb-4">Top-ranked universities and diverse course options.</p>
                <Link
                  href={`/destinations/${country.toLowerCase()}`}
                  className="text-primary-600 font-semibold hover:underline"
                >
                  View Details →
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Do I Apply */}
      <section id="how-apply" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">How Do I Apply?</h2>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              { title: "Free Counselling", desc: "Understanding your goals" },
              { title: "Shortlist Universities", desc: "Matching courses and countries" },
              { title: "Prepare Documents", desc: "SOP, LOR, transcripts" },
              { title: "Submit Applications", desc: "Complete application process" },
              { title: "Track Results", desc: "Monitor application status" },
            ].map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link
              href="/apply"
              className="inline-block px-8 py-4 bg-brand text-white rounded-full font-semibold hover:shadow-lg transition-all"
            >
              Start Application Process
            </Link>
          </div>
        </div>
      </section>

      {/* After Offer Letter */}
      <section id="after-offer" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="relative rounded-xl h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=800"
                alt="Student with offer letter"
                fill
                className="object-cover"
              />
            </div>
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">After Receiving Your Offer Letter</h2>
              <div className="space-y-4">
                {[
                  "Accept Offer",
                  "Pay Initial Deposit",
                  "Arrange Finances",
                  "Confirm Accommodation",
                ].map((item, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <FiCheck className="w-6 h-6 text-green-600" />
                    <span className="text-lg text-gray-700">{item}</span>
                  </div>
                ))}
              </div>
              <Link
                href="/services/visa"
                className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Get Visa Assistance
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Prepare to Depart */}
      <section id="prepare" className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Prepare to Depart</h2>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {[
              "Orientation Session",
              "Travel Checklist",
              "Health Insurance",
              "Currency Exchange",
              "Emergency Contacts",
            ].map((item, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <div className="w-12 h-12 bg-primary-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <span className="text-primary-600 font-bold">{index + 1}</span>
                </div>
                <h3 className="font-semibold text-gray-900">{item}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Arrive & Thrive */}
      <section id="arrive" className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Arrive & Thrive Abroad</h2>
              <p className="text-lg text-gray-600 mb-6">
                Stack Learn supports students even after arrival — local guidance, community, and orientation.
              </p>
              <ul className="space-y-3">
                {[
                  "Attend campus orientation",
                  "Set up bank account and SIM card",
                  "Get involved in student networks",
                  "Stay in touch with Stack Learn support teams",
                ].map((point, index) => (
                  <li key={index} className="flex items-start gap-3">
                    <FiCheck className="w-6 h-6 text-green-600 flex-shrink-0 mt-1" />
                    <span className="text-gray-700">{point}</span>
                  </li>
                ))}
              </ul>
              <Link
                href="/contact"
                className="inline-block mt-6 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
              >
                Stay Connected
              </Link>
            </div>
            <div className="relative rounded-xl h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=800"
                alt="Students studying abroad"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating graduation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Your Global Education Journey Starts Here</h2>
          <Link
            href="/contact"
            className="inline-block mt-6 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}
