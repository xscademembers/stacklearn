"use client";

import { useState, useEffect } from "react";
import { FiX } from "react-icons/fi";
import Link from "next/link";

export default function LeadsPopup() {
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    mobile: "",
    destination: "",
  });

  const markDismissed = () => {
    try {
      sessionStorage.setItem("leadsPopupDismissed", "true");
    } catch {
      // ignore if sessionStorage is unavailable
    }
  };

  useEffect(() => {
    // If user has already seen/dismissed the popup in this session, do nothing
    try {
      const dismissed = sessionStorage.getItem("leadsPopupDismissed");
      if (dismissed === "true") return;
    } catch {
      // ignore and continue
    }

    const openPopup = () => {
      try {
        const dismissed = sessionStorage.getItem("leadsPopupDismissed");
        if (dismissed === "true") return;
      } catch {
        // ignore and still open
      }
      setIsOpen(true);
      markDismissed();
    };

    // Show popup after 15 seconds
    const timer = setTimeout(openPopup, 15000);

    const handleScroll = () => {
      const scrollPercent =
        (window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)) *
        100;
      if (scrollPercent > 50) {
        openPopup();
        window.removeEventListener("scroll", handleScroll);
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      clearTimeout(timer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        setIsSubmitted(true);
        markDismissed();
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setIsSubmitted(true); // Show success even if API fails
      markDismissed();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-6 relative">
        <button
          onClick={() => {
            setIsOpen(false);
            markDismissed();
          }}
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close popup"
        >
          <FiX className="w-6 h-6" />
        </button>

        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              Want to Study Abroad?
            </h2>
            <p className="text-gray-600 mb-6">
              Get Free Counselling from our experts.
            </p>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Country
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent"
                >
                  <option value="">Select a country</option>
                  <option value="uk">United Kingdom</option>
                  <option value="usa">United States</option>
                  <option value="canada">Canada</option>
                  <option value="australia">Australia</option>
                  <option value="germany">Germany</option>
                </select>
              </div>
              <button
                type="submit"
                className="w-full px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Submit
              </button>
            </form>
            <p className="text-xs text-gray-500 mt-4 text-center">
              Your details are safe with us. We never share your information
              with third parties.
            </p>
            <button
              onClick={() => {
                setIsOpen(false);
                markDismissed();
              }}
              className="w-full mt-2 text-sm text-gray-500 hover:text-gray-700"
            >
              No, Thanks
            </button>
          </>
        ) : (
          <div className="text-center py-4">
            <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-gray-900 mb-2">
              Thank you for your interest!
            </h3>
            <p className="text-gray-600 mb-6">
              Our counsellors will contact you within 24 hours.
            </p>
            <Link
              href="/contact"
              className="inline-block px-6 py-3 bg-brand text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              onClick={() => setIsOpen(false)}
            >
              Book Free Counselling
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
