"use client";

import { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { FiX } from "react-icons/fi";

interface TrainingEnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
  defaultCourseType?: "Technical" | "Non-Technical";
  defaultCourseName?: string;
}

export default function TrainingEnquiryPopup({
  isOpen,
  onClose,
  defaultCourseType,
  defaultCourseName,
}: TrainingEnquiryPopupProps) {
  const [mounted, setMounted] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    courseType: defaultCourseType ?? "",
    courseName: defaultCourseName ?? "",
    mode: "",
    preferredBatch: "",
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!isOpen || !mounted) return null;

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          source: "training-enquiry",
          ...formData,
        }),
      });

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError("Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({
      fullName: "",
      phoneNumber: "",
      email: "",
      courseType: defaultCourseType ?? "",
      courseName: defaultCourseName ?? "",
      mode: "",
      preferredBatch: "",
    });
    onClose();
  };

  const modal = (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[1000] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-6 relative animate-fadeInUp motion-reduce:animate-none max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors"
          aria-label="Close training enquiry form"
        >
          <FiX className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">Enroll in a Training Program</h2>
              <p className="text-slate-600 text-sm mt-1">
                Share your details and our team will help you with enrolment and batch options.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    required
                    value={formData.fullName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    required
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-700 mb-1">
                  Email Address *
                </label>
                <input
                  type="email"
                  name="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Type *
                  </label>
                  <select
                    name="courseType"
                    required
                    value={formData.courseType}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm bg-white text-slate-900"
                  >
                    <option value="">Select type</option>
                    <option value="Technical">Technical</option>
                    <option value="Non-Technical">Non-Technical</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Course Name *
                  </label>
                  <input
                    type="text"
                    name="courseName"
                    required
                    value={formData.courseName}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                    placeholder="e.g. Azure Data Engineer"
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mode *
                  </label>
                  <select
                    name="mode"
                    required
                    value={formData.mode}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm bg-white text-slate-900"
                  >
                    <option value="">Select mode</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Hybrid">Hybrid</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Preferred Batch *
                  </label>
                  <select
                    name="preferredBatch"
                    required
                    value={formData.preferredBatch}
                    onChange={handleChange}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm bg-white text-slate-900"
                  >
                    <option value="">Select batch</option>
                    <option value="Morning">Morning</option>
                    <option value="Evening">Evening</option>
                  </select>
                </div>
              </div>

              {error && (
                <div className="p-3 bg-accent-soft border border-accent/20 rounded-lg text-accent text-sm">
                  {error}
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-brand text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-brand/40 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Enroll Now"}
              </button>
            </form>

            <p className="text-xs text-slate-400 mt-3 text-center">
              Your details are safe with us.
            </p>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-brand-soft rounded-full flex items-center justify-center mx-auto mb-4">
              <svg
                className="w-7 h-7 text-brand"
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
            <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
            <p className="text-slate-600 text-sm mb-4">
              Our training team will contact you shortly with batch details and next steps.
            </p>
            <button
              onClick={handleClose}
              className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:shadow-lg transition-all text-sm"
            >
              Close
            </button>
          </div>
        )}
      </div>
    </div>
  );

  return createPortal(modal, document.body);
}

