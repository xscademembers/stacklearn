"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiBook, FiArrowRight } from "react-icons/fi";

const trainings = [
  {
    title: "Python for Beginners",
    duration: "4 Weeks",
    mode: "Online",
    description: "Learn Python programming from scratch with hands-on projects.",
    category: "technical",
  },
  {
    title: "Advanced Excel Training",
    duration: "3 Weeks",
    mode: "Hybrid",
    description: "Master Excel for business and analytics.",
    category: "non-technical",
  },
  {
    title: "IELTS Preparation",
    duration: "6 Weeks",
    mode: "Offline",
    description: "Comprehensive IELTS coaching with mock tests.",
    category: "study-abroad",
  },
  {
    title: "Corporate Communication",
    duration: "2 Weeks",
    mode: "Online",
    description: "Enhance professional communication skills.",
    category: "corporate",
  },
];

export default function TrainingsPage() {
  const [activeTab, setActiveTab] = useState("technical");

  useEffect(() => {
    // Check URL hash on mount and when hash changes
    const handleHashChange = () => {
      const hash = window.location.hash.replace("#", "");
      if (hash && ["technical", "non-technical", "study-abroad", "corporate"].includes(hash)) {
        setActiveTab(hash);
        // Scroll to tabs section smoothly
        setTimeout(() => {
          const tabsSection = document.getElementById("trainings-tabs");
          if (tabsSection) {
            tabsSection.scrollIntoView({ behavior: "smooth", block: "start" });
          }
        }, 100);
      }
    };

    // Check hash on mount
    handleHashChange();

    // Listen for hash changes
    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  const tabs = [
    { id: "technical", label: "Technical Trainings" },
    { id: "non-technical", label: "Non-Technical Trainings" },
    { id: "study-abroad", label: "Study Abroad Trainings" },
    { id: "corporate", label: "Corporate Trainings" },
  ];

  const filteredTrainings = trainings.filter((t) => t.category === activeTab);

  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Training workshop session"
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
          <h1 className="text-5xl font-bold mb-4">Explore Our Trainings</h1>
          <p className="text-xl mb-8">Learn from industry experts and upskill for your future.</p>
        </div>
      </section>

      {/* Tabs */}
      <section id="trainings-tabs" className="py-8 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4 justify-center">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => {
                  setActiveTab(tab.id);
                  // Update URL hash without scrolling
                  window.history.replaceState(null, "", `#${tab.id}`);
                }}
                className={`px-6 py-3 rounded-full font-semibold transition-colors ${
                  activeTab === tab.id
                    ? "bg-brand text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Training Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {filteredTrainings.map((training, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-12 h-12 bg-brand-soft rounded-lg flex items-center justify-center">
                    <FiBook className="w-6 h-6 text-brand" />
                  </div>
                  <div>
                    <span className="text-sm text-gray-500">{training.duration}</span>
                    <span className="text-sm text-gray-500 mx-2">•</span>
                    <span className="text-sm text-gray-500">{training.mode}</span>
                  </div>
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-2">{training.title}</h3>
                <p className="text-gray-600 mb-4">{training.description}</p>
                <Link
                  href={`/trainings/${training.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-flex items-center text-primary-600 font-semibold hover:gap-2 transition-all"
                >
                  View Details
                  <FiArrowRight className="ml-2" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Need Help Choosing a Course?</h2>
              <p className="text-gray-600 mb-6">Talk to our training advisors for personalized guidance.</p>
              <div className="space-y-3">
                <p className="text-gray-700">
                  <strong>Phone:</strong> +91 9606031842
                </p>
                <p className="text-gray-700">
                  <strong>Email:</strong> info@stacklearn.com
                </p>
              </div>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl">
              <h3 className="text-xl font-semibold text-gray-900 mb-4">Quick Enquiry</h3>
              <form className="space-y-4">
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <input
                  type="tel"
                  placeholder="Your Phone"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <textarea
                  placeholder="Your Message"
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg"
                />
                <button className="w-full px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors">
                  Submit Enquiry
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Training workshop session"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Upgrade Your Skills Today</h2>
          <p className="text-xl mb-8">Join thousands of professionals who have transformed their careers with Stack Learn.</p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Enroll Now
          </Link>
        </div>
      </section>
    </div>
  );
}
