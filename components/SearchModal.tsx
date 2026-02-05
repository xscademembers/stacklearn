"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { FiSearch, FiX, FiArrowRight } from "react-icons/fi";

interface SearchResult {
  title: string;
  description: string;
  href: string;
  category: string;
}

// Define searchable content across the site
const searchableContent: SearchResult[] = [
  // Destinations
  { title: "Study in UK", description: "Top universities, post-study work visa up to 2 years", href: "/destinations/uk", category: "Destinations" },
  { title: "Study in USA", description: "World-class research opportunities and diverse courses", href: "/destinations/usa", category: "Destinations" },
  { title: "Study in Canada", description: "Post-graduation work permit and immigration pathways", href: "/destinations/canada", category: "Destinations" },
  { title: "Study in Australia", description: "High quality of life and strong job market", href: "/destinations/australia", category: "Destinations" },
  { title: "Study in Germany", description: "Tuition-free education at public universities", href: "/destinations/germany", category: "Destinations" },
  
  // Services
  { title: "Counselling & Admissions", description: "Expert guidance for university applications", href: "/services", category: "Services" },
  { title: "Visa Assistance", description: "Complete visa filing and documentation support", href: "/services", category: "Services" },
  { title: "SOP & LOR Writing", description: "Professional writing support for documents", href: "/services", category: "Services" },
  { title: "Accommodation Support", description: "Find verified student housing near universities", href: "/services", category: "Services" },
  { title: "Education Loan", description: "Financial assistance for your study abroad journey", href: "/services", category: "Services" },
  
  // Test Prep
  { title: "IELTS Preparation", description: "Comprehensive IELTS coaching and practice tests", href: "/test-prep", category: "Test Prep" },
  { title: "GRE Preparation", description: "Expert GRE coaching for graduate programs", href: "/test-prep", category: "Test Prep" },
  { title: "TOEFL Preparation", description: "TOEFL coaching and mock tests", href: "/test-prep", category: "Test Prep" },
  { title: "GMAT Preparation", description: "GMAT coaching for business school admissions", href: "/test-prep", category: "Test Prep" },
  
  // Pages
  { title: "Scholarships", description: "Find and apply for scholarships worldwide", href: "/scholarships", category: "Resources" },
  { title: "Success Stories", description: "Read about our students' achievements", href: "/success-stories", category: "Resources" },
  { title: "Study Abroad Steps", description: "Complete guide to studying abroad", href: "/study-abroad-steps", category: "Resources" },
  { title: "Blog & Resources", description: "Articles, guides, and FAQs", href: "/blog", category: "Resources" },
  { title: "Trainings", description: "Technical and non-technical training programs", href: "/trainings", category: "Services" },
  { title: "Contact Us", description: "Get in touch with our counsellors", href: "/contact", category: "Pages" },
  { title: "About Stack Learn", description: "Our mission, vision, and team", href: "/about", category: "Pages" },
  { title: "Our Branches", description: "Find your nearest Stack Learn office", href: "/branches", category: "Pages" },
  { title: "Certificate Verification", description: "Verify your training certificates", href: "/certificates", category: "Pages" },
  { title: "Apply Online", description: "Start your application process", href: "/apply", category: "Pages" },
  
  // Universities (sample)
  { title: "University of Manchester", description: "Top UK university for various programs", href: "/destinations/uk", category: "Universities" },
  { title: "University of Bristol", description: "Research-intensive UK university", href: "/destinations/uk", category: "Universities" },
  { title: "University of Toronto", description: "Leading Canadian university", href: "/destinations/canada", category: "Universities" },
  { title: "University of Melbourne", description: "Top Australian university", href: "/destinations/australia", category: "Universities" },
  
  // Keywords
  { title: "Post Study Work Visa", description: "Work opportunities after graduation", href: "/study-abroad-steps", category: "Information" },
  { title: "Student Visa", description: "Visa application guidance and support", href: "/services", category: "Services" },
  { title: "January Intake", description: "Applications for January semester", href: "/apply", category: "Information" },
  { title: "September Intake", description: "Applications for September semester", href: "/apply", category: "Information" },
];

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchModal({ isOpen, onClose }: SearchModalProps) {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<SearchResult[]>([]);
  const [showAll, setShowAll] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  useEffect(() => {
    if (query.trim().length < 2) {
      setResults([]);
      return;
    }

    const searchTerm = query.toLowerCase();
    const filtered = searchableContent.filter(
      (item) =>
        item.title.toLowerCase().includes(searchTerm) ||
        item.description.toLowerCase().includes(searchTerm) ||
        item.category.toLowerCase().includes(searchTerm)
    );
    setResults(filtered);
    setShowAll(false);
  }, [query]);

  const handleResultClick = (href: string) => {
    router.push(href);
    onClose();
    setQuery("");
  };

  const displayedResults = showAll ? results : results.slice(0, 3);
  const hasMoreResults = results.length > 3;

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = "";
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-start justify-center pt-20 p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full animate-fadeInUp">
        {/* Search Input */}
        <div className="relative p-4 border-b border-gray-200">
          <div className="flex items-center gap-3">
            <FiSearch className="w-6 h-6 text-gray-400" />
            <input
              ref={inputRef}
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search for destinations, services, universities..."
              className="flex-1 text-lg outline-none placeholder-gray-400"
            />
            <button
              onClick={() => {
                onClose();
                setQuery("");
              }}
              className="p-2 text-gray-400 hover:text-gray-600 transition-colors rounded-lg hover:bg-gray-100"
              aria-label="Close search"
            >
              <FiX className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="max-h-[60vh] overflow-y-auto">
          {query.trim().length < 2 ? (
            <div className="p-6 text-center text-gray-500">
              <FiSearch className="w-12 h-12 mx-auto mb-3 text-gray-300" />
              <p>Type at least 2 characters to search</p>
              <p className="text-sm mt-2">Try searching for &quot;UK&quot;, &quot;IELTS&quot;, &quot;Scholarship&quot;, etc.</p>
            </div>
          ) : results.length === 0 ? (
            <div className="p-6 text-center text-gray-500">
              <p>No results found for &quot;{query}&quot;</p>
              <p className="text-sm mt-2">Try different keywords or browse our pages</p>
            </div>
          ) : (
            <div className="p-2">
              {displayedResults.map((result, index) => (
                <button
                  key={index}
                  onClick={() => handleResultClick(result.href)}
                  className="w-full p-4 text-left rounded-xl hover:bg-brand-soft transition-colors group"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-1">
                        <span className="text-xs font-semibold px-2 py-0.5 bg-gray-100 text-gray-600 rounded-full">
                          {result.category}
                        </span>
                      </div>
                      <h4 className="font-semibold text-slate-900 group-hover:text-brand transition-colors">
                        {result.title}
                      </h4>
                      <p className="text-sm text-slate-600 mt-1">{result.description}</p>
                    </div>
                    <FiArrowRight className="w-5 h-5 text-gray-400 group-hover:text-brand group-hover:translate-x-1 transition-all mt-1" />
                  </div>
                </button>
              ))}

              {hasMoreResults && !showAll && (
                <button
                  onClick={() => setShowAll(true)}
                  className="w-full p-4 text-center text-brand font-semibold hover:bg-brand-soft rounded-xl transition-colors"
                >
                  See all {results.length} results
                </button>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 bg-gray-50 rounded-b-2xl">
          <p className="text-xs text-gray-500 text-center">
            Press <kbd className="px-2 py-1 bg-white rounded border text-xs">ESC</kbd> to close
          </p>
        </div>
      </div>
    </div>
  );
}
