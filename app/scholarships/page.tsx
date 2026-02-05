"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiSearch, FiArrowRight } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const scholarships = [
  {
    title: "Chevening Scholarship",
    provider: "UK Government",
    eligibility: "Master’s students from eligible countries",
    amount: "Full tuition + living expenses",
    deadline: "June 2025",
    country: "uk",
  },
  {
    title: "GREAT Scholarship",
    provider: "British Council",
    eligibility: "Indian students pursuing Master’s",
    amount: "£10,000",
    deadline: "May 2025",
    country: "uk",
  },
  {
    title: "Fulbright Scholarship",
    provider: "US Government",
    eligibility: "Graduate students and researchers",
    amount: "Full funding",
    deadline: "October 2025",
    country: "usa",
  },
  {
    title: "Vanier Canada Graduate Scholarship",
    provider: "Government of Canada",
    eligibility: "PhD students",
    amount: "$50,000/year",
    deadline: "November 2025",
    country: "canada",
  },
];

export default function ScholarshipsPage() {
  const [filters, setFilters] = useState({
    country: "",
    degree: "",
    deadline: "",
    funding: "",
    search: "",
  });

  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/7092614/pexels-photo-7092614.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student studying with books"
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
          <h1 className="text-5xl font-bold mb-4">Find Scholarships That Fit You</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            Explore top global scholarships to make your study abroad journey affordable.
          </p>
          <BookConsultButton variant="white">
            Check Eligibility
          </BookConsultButton>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4">
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Countries</option>
              <option value="uk">UK</option>
              <option value="usa">USA</option>
              <option value="canada">Canada</option>
              <option value="australia">Australia</option>
            </select>
            <select
              value={filters.degree}
              onChange={(e) => setFilters({ ...filters, degree: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Degree Levels</option>
              <option value="bachelor">Bachelor’s</option>
              <option value="master">Master’s</option>
              <option value="phd">PhD</option>
            </select>
            <select
              value={filters.deadline}
              onChange={(e) => setFilters({ ...filters, deadline: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Deadlines</option>
              <option value="ongoing">Ongoing</option>
              <option value="upcoming">Upcoming</option>
            </select>
            <input
              type="text"
              placeholder="Search by scholarship name"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
            <button className="px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors">
              Apply Filters
            </button>
          </div>
        </div>
      </section>

      {/* Scholarships Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {scholarships.map((scholarship, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{scholarship.title}</h3>
                <p className="text-primary-600 font-semibold mb-4">{scholarship.provider}</p>
                <p className="text-gray-600 mb-4">{scholarship.eligibility}</p>
                <div className="flex justify-between items-center mb-4">
                  <div>
                    <p className="text-sm text-gray-500">Funding Amount</p>
                    <p className="text-lg font-semibold text-gray-900">{scholarship.amount}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Deadline</p>
                    <p className="text-lg font-semibold text-gray-900">{scholarship.deadline}</p>
                  </div>
                </div>
                <Link
                  href={`/scholarships/${scholarship.title.toLowerCase().replace(/\s+/g, "-")}`}
                  className="inline-block w-full text-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How to Apply for Scholarships */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-8">How to Apply for Scholarships</h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "Research scholarships that match your destination and course.",
              "Check eligibility carefully and prepare all required documents.",
              "Write a strong SOP or essay tailored to each scholarship.",
              "Submit your application before the deadline.",
              "Track your application status and await results.",
            ].map((step, index) => (
              <div key={index} className="flex items-start gap-4 bg-gray-50 p-4 rounded-xl">
                <div className="w-8 h-8 rounded-full bg-brand text-white flex items-center justify-center text-sm font-bold flex-shrink-0 mt-1">
                  {index + 1}
                </div>
                <p className="text-gray-700">{step}</p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <BookConsultButton>
              Get Expert Help with Your Application
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* Tips for Applying */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-6 text-center">Tips for Applying</h2>
          <div className="max-w-2xl mx-auto space-y-3 text-gray-700">
            <p>• Apply early to avoid missing deadlines.</p>
            <p>• Tailor your SOP to each scholarship’s requirements and goals.</p>
            <p>• Maintain a strong academic and extracurricular record.</p>
          </div>
        </div>
      </section>

      {/* Scholarship Success Stories */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Scholarship Success Stories</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Ananya",
                country: "UK",
                scholarship: "Chevening Scholarship",
                university: "University of Leeds",
              },
              {
                name: "Rohit",
                country: "Canada",
                scholarship: "Vanier Graduate Scholarship",
                university: "University of Toronto",
              },
              {
                name: "Meera",
                country: "USA",
                scholarship: "Fulbright Scholarship",
                university: "University of California",
              },
            ].map((s, index) => (
              <div key={index} className="bg-gray-50 rounded-2xl p-6 shadow-md">
                <h3 className="text-xl font-bold text-gray-900 mb-1">{s.name}</h3>
                <p className="text-brand font-semibold mb-2">
                  {s.scholarship} – {s.country}
                </p>
                <p className="text-gray-600 mb-2">{s.university}</p>
                <p className="text-sm text-gray-700">
                  “Stack Learn helped me identify the right scholarship and submit a strong application.”
                </p>
              </div>
            ))}
          </div>
          <div className="text-center mt-8">
            <Link href="/success-stories" className="text-primary-600 font-semibold hover:underline">
              Read More Success Stories →
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/901964/pexels-photo-901964.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Graduation celebration"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Need Help Finding the Right Scholarship?</h2>
          <p className="text-xl mb-8">
            Connect with Stack Learn experts to discover scholarships that match your academic profile and goals.
          </p>
          <BookConsultButton variant="white">
            Get Scholarship Help
          </BookConsultButton>
        </div>
      </section>
    </div>
  );
}
