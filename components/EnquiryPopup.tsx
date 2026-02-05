"use client";

import { useState } from "react";
import { FiX } from "react-icons/fi";

interface EnquiryPopupProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EnquiryPopup({ isOpen, onClose }: EnquiryPopupProps) {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: "",
    message: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setError(data.message || "Failed to submit. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting lead:", error);
      setError("Network error. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleClose = () => {
    setIsSubmitted(false);
    setFormData({ name: "", email: "", mobile: "", destination: "", message: "" });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-[100] flex items-center justify-center p-4">
      <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full p-5 relative animate-fadeInUp max-h-[90vh] overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute top-3 right-3 text-gray-400 hover:text-gray-600 transition-colors z-10"
          aria-label="Close popup"
        >
          <FiX className="w-5 h-5" />
        </button>

        {!isSubmitted ? (
          <>
            <div className="text-center mb-4">
              <h2 className="text-xl font-bold text-slate-900">
                Book Free Counselling
              </h2>
              <p className="text-slate-600 text-sm mt-1">
                Get expert guidance for your study abroad journey
              </p>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-3">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                    placeholder="Your name"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                    placeholder="email@example.com"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-700 mb-1">
                    Destination Country
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) => setFormData({ ...formData, destination: e.target.value })}
                    className="w-full px-3 py-2 border border-border rounded-lg focus:ring-2 focus:ring-brand focus:border-brand transition-all text-sm"
                  >
                    <option value="">Select country</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                  </select>
                </div>
              </div>
              {error && (
                <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                  {error}
                </div>
              )}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full px-4 py-3 bg-brand text-white rounded-lg font-semibold hover:shadow-lg hover:shadow-brand/40 transition-all duration-300 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Submitting..." : "Get Free Consultation"}
              </button>
            </form>
            
            <p className="text-xs text-slate-400 mt-3 text-center">
              Your details are safe with us.
            </p>
          </>
        ) : (
          <div className="text-center py-6">
            <div className="w-14 h-14 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-7 h-7 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-2">
              Thank You!
            </h3>
            <p className="text-slate-600 text-sm mb-4">
              Our counsellors will contact you within 24 hours.
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
}
