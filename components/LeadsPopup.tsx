"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { FiX } from "react-icons/fi";
import Link from "next/link";
import { withSubmissionContext } from "@/lib/submissionPayload";
import IndiaPhoneInput from "@/components/forms/IndiaPhoneInput";
import DestinationCountryFields from "@/components/forms/DestinationCountryFields";
import { destinationFieldPayload } from "@/lib/destination-form-options";

export default function LeadsPopup() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destinationSelect: "",
    otherDestinationName: "",
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
        body: JSON.stringify(
          withSubmissionContext(
            {
              name: formData.name,
              email: formData.email,
              mobile: formData.mobile,
              destination: destinationFieldPayload(
                formData.destinationSelect,
                formData.otherDestinationName
              ),
            },
            pathname,
            "leads_popup"
          )
        ),
      });
      if (response.ok) {
        setIsSubmitted(true);
        markDismissed();
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setIsSubmitted(true);
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
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="Enter your name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mobile Number *
                </label>
                <IndiaPhoneInput
                  required
                  value={formData.mobile}
                  onChange={(next) => setFormData({ ...formData, mobile: next })}
                  className="w-full"
                  fieldClassName="[&>span]:py-3 [&>input]:py-3 [&>input]:px-4"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  placeholder="you@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Destination Country
                </label>
                <DestinationCountryFields
                  selectValue={formData.destinationSelect}
                  otherDestinationName={formData.otherDestinationName}
                  onSelectChange={(destinationSelect) =>
                    setFormData((prev) => ({ ...prev, destinationSelect }))
                  }
                  onOtherChange={(otherDestinationName) =>
                    setFormData((prev) => ({ ...prev, otherDestinationName }))
                  }
                  selectClassName="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  otherInputClassName="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  emptyOptionLabel="Select a country"
                  otherInputId="leads-popup-destination-other"
                />
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
            <div className="w-16 h-16 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-8 h-8 text-brand"
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
