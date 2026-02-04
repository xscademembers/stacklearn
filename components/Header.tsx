"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  FiMenu,
  FiX,
  FiSearch,
  FiMessageCircle,
  FiChevronDown,
  FiChevronRight,
} from "react-icons/fi";

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileOpenDropdown, setMobileOpenDropdown] = useState<string | null>(null);
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
    { name: "Study in UK", href: "/destinations/uk" },
    { name: "Study in USA", href: "/destinations/usa" },
    { name: "Study in Australia", href: "/destinations/australia" },
    { name: "Study in Canada", href: "/destinations/canada" },
    { name: "Study in Germany", href: "/destinations/germany" },
  ];

  const services = [
    { name: "Counselling & Admissions", href: "/services/counselling" },
    { name: "Visa Assistance", href: "/services/visa" },
    { name: "SOP / LOR Writing", href: "/services/sop-lor" },
    { name: "Accommodation", href: "/services/accommodation" },
    { name: "Loan Assistance", href: "/services/loan" },
  ];

  const testPrep = [
    { name: "IELTS", href: "/test-prep/ielts" },
    { name: "GRE", href: "/test-prep/gre" },
    { name: "TOEFL", href: "/test-prep/toefl" },
    { name: "GMAT", href: "/test-prep/gmat" },
  ];

  const studyAbroadSteps = [
    { name: "Why Study Abroad", href: "/study-abroad-steps#why" },
    { name: "What & Where", href: "/study-abroad-steps#what-where" },
    { name: "How Do I Apply", href: "/study-abroad-steps#how-apply" },
    { name: "After Offer Letter", href: "/study-abroad-steps#after-offer" },
    { name: "Prepare to Depart", href: "/study-abroad-steps#prepare" },
    { name: "Arrive & Thrive", href: "/study-abroad-steps#arrive" },
  ];

  const trainings = [
    { name: "Technical Trainings", href: "/trainings#technical" },
    { name: "Non-Technical Trainings", href: "/trainings#non-technical" },
    { name: "Study Abroad Trainings", href: "/trainings#study-abroad" },
    { name: "Corporate Trainings", href: "/trainings#corporate" },
  ];

  const resources = [
    { name: "Scholarships", href: "/scholarships" },
    { name: "Success Stories", href: "/success-stories" },
    { name: "Blog", href: "/blog" },
    { name: "Branches", href: "/branches" },
    { name: "Contact Us", href: "/contact" },
  ];

  const toggleDropdown = (menu: string) => {
    setOpenDropdown(openDropdown === menu ? null : menu);
  };

  const toggleMobileDropdown = (menu: string) => {
    setMobileOpenDropdown(mobileOpenDropdown === menu ? null : menu);
  };

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname.startsWith(href);
  };

  return (
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
            <div className="text-2xl lg:text-3xl font-extrabold text-brand group-hover:scale-105 transition-transform duration-300">
              Stack Learn
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden xl:flex items-center space-x-1 flex-1 justify-center max-w-5xl mx-8">
            <Link
              href="/"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive("/")
                  ? "text-primary-600 bg-primary-50"
                  : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
              }`}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                isActive("/about")
                  ? "text-primary-600 bg-primary-50"
                  : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
              }`}
            >
              About Us
            </Link>

            {/* Destinations Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/destinations")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
                onClick={() => toggleDropdown("destinations")}
                onMouseEnter={() => setOpenDropdown("destinations")}
              >
                Destinations
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "destinations" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                  openDropdown === "destinations"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {destinations.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/services")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
                onClick={() => toggleDropdown("services")}
                onMouseEnter={() => setOpenDropdown("services")}
              >
                Services
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "services" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                  openDropdown === "services"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {services.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Test Prep Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/test-prep")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
                onClick={() => toggleDropdown("testprep")}
                onMouseEnter={() => setOpenDropdown("testprep")}
              >
                Test Prep
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "testprep" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-48 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                  openDropdown === "testprep"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {testPrep.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Study Abroad Steps Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/study-abroad-steps")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
                onClick={() => toggleDropdown("steps")}
                onMouseEnter={() => setOpenDropdown("steps")}
              >
                Study Steps
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "steps" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-64 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                  openDropdown === "steps"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {studyAbroadSteps.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Trainings Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/trainings")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
                onClick={() => toggleDropdown("trainings")}
                onMouseEnter={() => setOpenDropdown("trainings")}
              >
                Trainings
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "trainings" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                  openDropdown === "trainings"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {trainings.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>

            {/* Resources Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                className={`flex items-center px-3 py-2 rounded-lg text-sm font-semibold transition-all duration-300 ${
                  isActive("/scholarships") || isActive("/success-stories") || isActive("/blog") || isActive("/branches") || isActive("/contact")
                    ? "text-primary-600 bg-primary-50"
                    : "text-slate-700 hover:text-primary-600 hover:bg-primary-50/50"
                }`}
                onClick={() => toggleDropdown("resources")}
                onMouseEnter={() => setOpenDropdown("resources")}
              >
                Resources
                <FiChevronDown className={`ml-1 w-4 h-4 transition-transform duration-300 ${openDropdown === "resources" ? "rotate-180" : ""}`} />
              </button>
              <div
                className={`absolute top-full left-0 mt-1 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 py-2 transition-all duration-300 ${
                  openDropdown === "resources"
                    ? "opacity-100 visible translate-y-0"
                    : "opacity-0 invisible -translate-y-2"
                }`}
                onMouseLeave={() => setOpenDropdown(null)}
              >
                {resources.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    className="block px-4 py-2.5 text-sm text-slate-700 hover:bg-primary-50 hover:text-primary-600 transition-colors duration-200 font-medium"
                    onClick={() => setOpenDropdown(null)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            </div>
          </nav>

          {/* Right Side Utilities */}
          <div className="hidden lg:flex items-center space-x-3 flex-shrink-0">
            <button 
              className="p-2.5 text-slate-700 hover:text-brand hover:bg-brand-soft rounded-lg transition-all duration-300"
              aria-label="Search"
            >
              <FiSearch className="w-5 h-5" />
            </button>
            <Link
              href="/contact"
              className="px-5 py-2.5 bg-brand text-white rounded-full font-bold text-sm hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 hover:scale-105 transform whitespace-nowrap"
            >
              Book Free Counselling
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="lg:hidden p-2 text-slate-700 hover:text-primary-600 transition-colors"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <FiX className="w-6 h-6" /> : <FiMenu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="lg:hidden bg-white border-t shadow-xl max-h-[calc(100vh-5rem)] overflow-y-auto">
          <nav className="container mx-auto px-4 py-4 space-y-1">
            <Link
              href="/"
              className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                isActive("/")
                  ? "text-primary-600 bg-primary-50"
                  : "text-slate-700 hover:bg-primary-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              href="/about"
              className={`block px-4 py-3 rounded-lg font-semibold transition-colors ${
                isActive("/about")
                  ? "text-primary-600 bg-primary-50"
                  : "text-slate-700 hover:bg-primary-50"
              }`}
              onClick={() => setIsMenuOpen(false)}
            >
              About Us
            </Link>

            {/* Mobile Destinations Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("destinations")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-primary-50 transition-colors"
              >
                Destinations
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileOpenDropdown === "destinations" ? "rotate-90" : ""}`} />
              </button>
              {mobileOpenDropdown === "destinations" && (
                <div className="pl-4 space-y-1">
                  {destinations.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Services Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("services")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-primary-50 transition-colors"
              >
                Services
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileOpenDropdown === "services" ? "rotate-90" : ""}`} />
              </button>
              {mobileOpenDropdown === "services" && (
                <div className="pl-4 space-y-1">
                  {services.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Test Prep Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("testprep")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-primary-50 transition-colors"
              >
                Test Prep
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileOpenDropdown === "testprep" ? "rotate-90" : ""}`} />
              </button>
              {mobileOpenDropdown === "testprep" && (
                <div className="pl-4 space-y-1">
                  {testPrep.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Study Abroad Steps Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("steps")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-primary-50 transition-colors"
              >
                Study Abroad Steps
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileOpenDropdown === "steps" ? "rotate-90" : ""}`} />
              </button>
              {mobileOpenDropdown === "steps" && (
                <div className="pl-4 space-y-1">
                  {studyAbroadSteps.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Trainings Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("trainings")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-primary-50 transition-colors"
              >
                Trainings
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileOpenDropdown === "trainings" ? "rotate-90" : ""}`} />
              </button>
              {mobileOpenDropdown === "trainings" && (
                <div className="pl-4 space-y-1">
                  {trainings.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className="block px-4 py-2.5 text-sm text-slate-600 hover:bg-primary-50 rounded-lg transition-colors"
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Mobile Resources Dropdown */}
            <div>
              <button
                onClick={() => toggleMobileDropdown("resources")}
                className="w-full flex items-center justify-between px-4 py-3 rounded-lg font-semibold text-slate-700 hover:bg-primary-50 transition-colors"
              >
                Resources
                <FiChevronRight className={`w-5 h-5 transition-transform duration-300 ${mobileOpenDropdown === "resources" ? "rotate-90" : ""}`} />
              </button>
              {mobileOpenDropdown === "resources" && (
                <div className="pl-4 space-y-1">
                  {resources.map((item) => (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`block px-4 py-2.5 text-sm rounded-lg transition-colors ${
                        isActive(item.href)
                          ? "text-primary-600 bg-primary-50 font-semibold"
                          : "text-slate-600 hover:bg-primary-50"
                      }`}
                      onClick={() => {
                        setIsMenuOpen(false);
                        setMobileOpenDropdown(null);
                      }}
                    >
                      {item.name}
                    </Link>
                  ))}
                </div>
              )}
            </div>
            <Link
              href="/contact"
              className="block px-4 py-3 bg-brand text-white rounded-lg text-center font-bold mt-4 hover:shadow-lg transition-all"
              onClick={() => setIsMenuOpen(false)}
            >
              Book Free Counselling
            </Link>
          </nav>
        </div>
      )}
    </header>
  );
}
