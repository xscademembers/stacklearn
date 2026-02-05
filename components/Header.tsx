"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";
import SearchModal from "./SearchModal";
import EnquiryPopup from "./EnquiryPopup";

// Country flag image URLs (using flagcdn.com)
const flags: Record<string, string> = {
  uk: "https://flagcdn.com/w40/gb.png",
  usa: "https://flagcdn.com/w40/us.png",
  australia: "https://flagcdn.com/w40/au.png",
  canada: "https://flagcdn.com/w40/ca.png",
  germany: "https://flagcdn.com/w40/de.png",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isEnquiryOpen, setIsEnquiryOpen] = useState(false);
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setOpenDropdown(null);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const destinations = [
    { name: "Study in UK", href: "/destinations/uk", flag: flags.uk },
    { name: "Study in USA", href: "/destinations/usa", flag: flags.usa },
    { name: "Study in Australia", href: "/destinations/australia", flag: flags.australia },
    { name: "Study in Canada", href: "/destinations/canada", flag: flags.canada },
    { name: "Study in Germany", href: "/destinations/germany", flag: flags.germany },
  ];

  const services = [
    { name: "Counselling & Admissions", href: "/services" },
    { name: "Visa Assistance", href: "/services" },
    { name: "SOP / LOR Writing", href: "/services" },
    { name: "Accommodation", href: "/services" },
    { name: "Loan Assistance", href: "/services" },
  ];

  const trainings = [
    { name: "Technical Trainings", href: "/trainings#technical" },
    { name: "Non-Technical Trainings", href: "/trainings#non-technical" },
    { name: "Study Abroad Trainings", href: "/trainings#study-abroad" },
    { name: "Corporate Trainings", href: "/trainings#corporate" },
  ];

  const studyAbroadSteps = [
    { name: "Why Study Abroad", href: "/study-abroad-steps#why" },
    { name: "What & Where", href: "/study-abroad-steps#what-where" },
    { name: "How Do I Apply", href: "/study-abroad-steps#how-apply" },
    { name: "After Offer Letter", href: "/study-abroad-steps#after-offer" },
    { name: "Prepare to Depart", href: "/study-abroad-steps#prepare" },
    { name: "Arrive & Thrive", href: "/study-abroad-steps#arrive" },
  ];

  const testPrep = [
    { name: "IELTS Preparation", href: "/test-prep#ielts" },
    { name: "GRE Preparation", href: "/test-prep#gre" },
    { name: "TOEFL Preparation", href: "/test-prep#toefl" },
    { name: "GMAT Preparation", href: "/test-prep#gmat" },
  ];


  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? "bg-white shadow-lg shadow-gray-200/50"
            : "bg-white"
        }`}
      >
        <div className="container mx-auto px-4 lg:px-6">
          <div className="flex items-center justify-between h-20">
            {/* Logo */}
            <Link href="/" className="flex items-center group flex-shrink-0">
              <Image
                src="https://storage.googleapis.com/new_client_files/stack%20learn/StackLearn%20-%20%E1%8F%9A%E1%B4%80%C9%AA%20%EA%80%A4%E1%B4%84%E1%B4%8F%C9%B4!!.png"
                alt="Stack Learn Logo"
                width={160}
                height={50}
                className="h-12 w-auto group-hover:scale-105 transition-transform duration-300"
                priority
              />
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-4xl mx-6" ref={dropdownRef}>
              <Link
                href="/"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:text-brand hover:bg-brand-soft/50"
                }`}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/about")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:text-brand hover:bg-brand-soft/50"
                }`}
              >
                About Us
              </Link>

              {/* Destinations Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown("destinations")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href="/destinations"
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive("/destinations")
                      ? "text-brand bg-brand-soft"
                      : "text-slate-700 hover:text-brand hover:bg-brand-soft/50"
                  }`}
                >
                  Destinations
                  <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "destinations" ? "rotate-180" : ""}`} />
                </Link>
                <div
                  className={`absolute top-full left-0 mt-1 w-60 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                    openDropdown === "destinations"
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {destinations.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                      onClick={() => setOpenDropdown(null)}
                    >
                      <Image src={item.flag} alt="" width={24} height={16} className="rounded-sm shadow-sm" />
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Services Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown("services")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href="/services"
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive("/services")
                      ? "text-brand bg-brand-soft"
                      : "text-slate-700 hover:text-brand hover:bg-brand-soft/50"
                  }`}
                >
                  Services
                  <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`} />
                </Link>
                <div
                  className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                    openDropdown === "services"
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {services.map((item) => (
                    <Link
                      key={item.href + item.name}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                      onClick={() => setOpenDropdown(null)}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Resources Dropdown */}
              <div 
                className="relative"
                onMouseEnter={() => setOpenDropdown("resources")}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                <Link
                  href="/trainings"
                  className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                    isActive("/trainings") || isActive("/study-abroad-steps") || isActive("/test-prep") || isActive("/scholarships") || isActive("/success-stories") || isActive("/blog") || isActive("/branches") || isActive("/contact")
                      ? "text-brand bg-brand-soft"
                      : "text-slate-700 hover:text-brand hover:bg-brand-soft/50"
                  }`}
                >
                  Resources
                  <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "resources" ? "rotate-180" : ""}`} />
                </Link>
                <div
                  className={`absolute top-full right-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                    openDropdown === "resources"
                      ? "opacity-100 visible translate-y-0"
                      : "opacity-0 invisible -translate-y-2"
                  }`}
                >
                  {/* Trainings with submenu */}
                  <div className="relative group/trainings">
                    <Link
                      href="/trainings"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-semibold"
                    >
                      <span>Trainings</span>
                      <FiChevronRight className="w-4 h-4" />
                    </Link>
                    <div className="absolute left-full top-0 ml-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover/trainings:opacity-100 group-hover/trainings:visible transition-all duration-200">
                      {trainings.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Study Abroad Steps with submenu */}
                  <div className="relative group/steps">
                    <Link
                      href="/study-abroad-steps"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-semibold"
                    >
                      <span>Study Abroad Steps</span>
                      <FiChevronRight className="w-4 h-4" />
                    </Link>
                    <div className="absolute left-full top-0 ml-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover/steps:opacity-100 group-hover/steps:visible transition-all duration-200">
                      {studyAbroadSteps.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {/* Test Preparation with submenu */}
                  <div className="relative group/test">
                    <Link
                      href="/test-prep"
                      className="flex items-center justify-between px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-semibold"
                    >
                      <span>Test Preparation</span>
                      <FiChevronRight className="w-4 h-4" />
                    </Link>
                    <div className="absolute left-full top-0 ml-1 w-52 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 opacity-0 invisible group-hover/test:opacity-100 group-hover/test:visible transition-all duration-200">
                      {testPrep.map((item) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                          onClick={() => setOpenDropdown(null)}
                        >
                          {item.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  <div className="border-t border-gray-100 my-2"></div>
                  <Link
                    href="/scholarships"
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Scholarships
                  </Link>
                  <Link
                    href="/success-stories"
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Success Stories
                  </Link>
                  <Link
                    href="/blog"
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Blog
                  </Link>
                  <Link
                    href="/branches"
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Our Branches
                  </Link>
                  <Link
                    href="/contact"
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-brand-soft hover:text-brand transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    Contact Us
                  </Link>
                </div>
              </div>
            </nav>

            {/* Right Side Utilities */}
            <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
              <button 
                className="p-2.5 text-slate-700 hover:text-brand hover:bg-brand-soft rounded-lg transition-all duration-300"
                aria-label="Search"
                onClick={() => setIsSearchOpen(true)}
              >
                <FiSearch className="w-5 h-5" />
              </button>
              <button
                onClick={() => setIsEnquiryOpen(true)}
                className="px-5 py-2.5 bg-brand text-white rounded-full font-bold text-sm hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 hover:scale-105 transform whitespace-nowrap"
              >
                Book Free Counselling
              </button>
            </div>

            {/* Mobile Menu Button */}
            <button
              className="xl:hidden p-2 text-slate-700 hover:text-brand transition-colors"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              aria-label="Toggle menu"
            >
              {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="xl:hidden bg-white border-t shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
            <nav className="container mx-auto px-4 py-4 space-y-1">
              {/* Mobile Search */}
              <button
                onClick={() => {
                  setIsSearchOpen(true);
                  setIsMenuOpen(false);
                }}
                className="w-full flex items-center gap-3 px-4 py-3 bg-gray-50 rounded-lg text-slate-600 mb-4"
              >
                <FiSearch className="w-5 h-5" />
                <span>Search...</span>
              </button>

              <Link
                href="/"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                href="/about"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/about")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                About Us
              </Link>

              {/* Mobile Direct Links - No Dropdowns */}
              <Link
                href="/destinations"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/destinations")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Destinations
              </Link>
              <Link
                href="/services"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/services")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Services
              </Link>
              <Link
                href="/trainings"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/trainings")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Trainings
              </Link>
              <Link
                href="/study-abroad-steps"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/study-abroad-steps")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Study Abroad Steps
              </Link>
              <Link
                href="/test-prep"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/test-prep")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Test Preparation
              </Link>
              <Link
                href="/scholarships"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/scholarships")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Scholarships
              </Link>
              <Link
                href="/success-stories"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/success-stories")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Success Stories
              </Link>
              <Link
                href="/blog"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/blog")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Blog
              </Link>
              <Link
                href="/branches"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/branches")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Our Branches
              </Link>
              <Link
                href="/contact"
                className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                  isActive("/contact")
                    ? "text-brand bg-brand-soft"
                    : "text-slate-700 hover:bg-brand-soft"
                }`}
                onClick={() => setIsMenuOpen(false)}
              >
                Contact Us
              </Link>

              <button
                onClick={() => {
                  setIsEnquiryOpen(true);
                  setIsMenuOpen(false);
                }}
                className="block w-full px-4 py-3 bg-brand text-white rounded-lg text-center font-bold mt-4 hover:shadow-lg transition-all"
              >
                Book Free Counselling
              </button>
            </nav>
          </div>
        )}
      </header>

      {/* Search Modal */}
      <SearchModal isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />

      {/* Enquiry Popup */}
      <EnquiryPopup isOpen={isEnquiryOpen} onClose={() => setIsEnquiryOpen(false)} />
    </>
  );
}
