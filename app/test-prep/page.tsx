import Link from "next/link";
import Image from "next/image";
import { FiBook, FiArrowRight } from "react-icons/fi";

const tests = [
  {
    name: "IELTS",
    description: "International English Language Testing System for university admissions and immigration.",
    purpose: "Essential for university admissions abroad",
    href: "/test-prep/ielts",
  },
  {
    name: "GRE",
    description: "Graduate Record Examination for graduate school admissions.",
    purpose: "Required for Master’s and PhD programs",
    href: "/test-prep/gre",
  },
  {
    name: "TOEFL",
    description: "Test of English as a Foreign Language for academic English proficiency.",
    purpose: "Accepted by universities worldwide",
    href: "/test-prep/toefl",
  },
  {
    name: "GMAT",
    description: "Graduate Management Admission Test for business school admissions.",
    purpose: "Required for MBA programs",
    href: "/test-prep/gmat",
  },
];

export default function TestPrepPage() {
  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student studying for exam"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        {/* Soft light blobs */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Test Preparation</h1>
          <p className="text-xl mb-8">Train with expert mentors to achieve your target scores.</p>
          <div className="flex gap-4 justify-center">
            <Link
              href="/test-prep"
              className="px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
            >
              View All Courses
            </Link>
            <Link
              href="/contact"
              className="px-8 py-4 border-2 border-white text-white rounded-full font-semibold hover:bg-white/10 transition-all"
            >
              Join Free Demo
            </Link>
          </div>
        </div>
      </section>

      {/* Test Programs */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {tests.map((test, index) => (
              <Link
                key={index}
                href={test.href}
                className="group p-6 bg-gray-50 rounded-xl hover:shadow-lg transition-all"
              >
                <div className="text-center">
                  <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4 group-hover:bg-brand transition-colors">
                    <FiBook className="w-8 h-8 text-brand group-hover:text-white transition-colors" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{test.name}</h3>
                  <p className="text-gray-600 mb-4 text-sm">{test.description}</p>
                  <p className="text-brand font-semibold text-sm mb-4">{test.purpose}</p>
                  <span className="inline-flex items-center text-brand font-semibold group-hover:gap-2 transition-all">
                    View Details
                    <FiArrowRight className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose Stack Learn */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">Why Choose Stack Learn for Test Preparation</h2>
              <div className="space-y-4">
                {[
                  "Certified and Experienced Trainers",
                  "Personalized Learning Approach",
                  "Mock Tests with Real-Time Feedback",
                  "Proven Record of High Scores",
                ].map((point, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="w-6 h-6 bg-brand rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                      <span className="text-white text-sm">✓</span>
                    </div>
                    <p className="text-lg text-gray-700">{point}</p>
                  </div>
                ))}
              </div>
              <p className="mt-6 text-gray-600">Thousands of students have improved their scores with our guidance.</p>
            </div>
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <div className="text-center">
                <div className="text-5xl font-bold text-brand mb-2">95%+</div>
                <p className="text-gray-600 mb-6">Students achieve target scores</p>
                <div className="text-5xl font-bold text-brand mb-2">5000+</div>
                <p className="text-gray-600">Students trained</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4144222/pexels-photo-4144222.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students in exam preparation"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Start Your Test Prep Journey Today</h2>
          <p className="text-xl mb-8">Achieve your target score with expert guidance.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Join Free Demo
          </Link>
        </div>
      </section>
    </div>
  );
}
