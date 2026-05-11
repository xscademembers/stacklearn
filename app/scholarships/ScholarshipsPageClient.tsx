"use client";

import { useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import BookConsultButton from "@/components/BookConsultButton";
import ScholarshipInterestPopup from "@/components/ScholarshipInterestPopup";
import { allScholarships, scholarshipsByCountry } from "@/lib/scholarships-data";
import ScholarshipSuccessStoriesBlock from "@/components/scholarships/ScholarshipSuccessStoriesBlock";
import type { PublicSuccessStory } from "@/lib/success-story-public";

export type ScholarshipsHeroCms = {
  heading: string;
  description: string;
  ctaText: string;
  heroImage: string;
};

export default function ScholarshipsPageClient({
  hero,
  successStories = [],
}: {
  hero: ScholarshipsHeroCms;
  successStories?: PublicSuccessStory[];
}) {
  const router = useRouter();
  const [filters, setFilters] = useState({
    country: "",
    search: "",
  });
  const [selectedScholarshipSlug, setSelectedScholarshipSlug] = useState<string | null>(null);

  const selectedScholarship = allScholarships.find((item) => item.slug === selectedScholarshipSlug) ?? null;
  const filteredScholarships = allScholarships.filter((item) => {
    const countryMatch = !filters.country || item.country === filters.country;
    const searchMatch =
      !filters.search ||
      item.name.toLowerCase().includes(filters.search.toLowerCase()) ||
      item.countryLabel.toLowerCase().includes(filters.search.toLowerCase());
    return countryMatch && searchMatch;
  });

  const heroUnopt =
    !hero.heroImage.includes("images.pexels.com") &&
    !hero.heroImage.includes("images.unsplash.com");

  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={hero.heroImage}
            alt="Student studying with books"
            fill
            priority
            unoptimized={heroUnopt}
            className="object-cover opacity-50"
          />
        </div>
        {/* Soft light blobs */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4 whitespace-pre-line">
            {hero.heading || "Find Scholarships That Fit You"}
          </h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto whitespace-pre-line">
            {hero.description ||
              "Explore top global scholarships to make your study abroad journey affordable."}
          </p>
          <BookConsultButton variant="white">{hero.ctaText || "Check Eligibility"}</BookConsultButton>
        </div>
      </section>

      {/* Filters */}
      <section className="py-12 bg-white border-b">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap gap-4" role="search">
            <select
              value={filters.country}
              onChange={(e) => setFilters({ ...filters, country: e.target.value })}
              className="px-4 py-2 border border-gray-300 rounded-lg"
            >
              <option value="">All Countries</option>
              {scholarshipsByCountry.map((countryItem) => (
                <option key={countryItem.country} value={countryItem.country}>
                  {countryItem.countryLabel}
                </option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Search by scholarship or country"
              value={filters.search}
              onChange={(e) => setFilters({ ...filters, search: e.target.value })}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg"
            />
          </div>
        </div>
      </section>

      {/* Scholarships Grid */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <header className="mb-8 text-center">
            <h2 className="text-3xl font-bold text-gray-900">Scholarships Available in Various Countries</h2>
            <p className="mt-2 text-gray-600">
              View scholarship expertise points and open full details for each option.
            </p>
          </header>
          <div className="grid md:grid-cols-2 gap-8">
            {filteredScholarships.map((scholarship) => (
              <article key={scholarship.slug} className="bg-white rounded-xl shadow-md p-6">
                <h3 className="text-2xl font-bold text-gray-900 mb-2">{scholarship.name}</h3>
                <p className="text-brand font-semibold mb-4">{scholarship.countryLabel}</p>
                <p className="text-gray-600 mb-4">{scholarship.details}</p>
                <button
                  type="button"
                  onClick={() => setSelectedScholarshipSlug(scholarship.slug)}
                  className="inline-block w-full text-center px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors"
                >
                  View Details
                </button>
              </article>
            ))}
          </div>
        </div>
      </section>

      {selectedScholarship ? (
        <ScholarshipInterestPopup
          key={selectedScholarship.slug}
          isOpen
          scholarshipName={selectedScholarship.name}
          countryLabel={selectedScholarship.countryLabel}
          onContinue={() => {
            const targetSlug = selectedScholarship.slug;
            setSelectedScholarshipSlug(null);
            router.push(`/scholarships/${targetSlug}`);
          }}
        />
      ) : null}

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

      <ScholarshipSuccessStoriesBlock stories={successStories} />

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
