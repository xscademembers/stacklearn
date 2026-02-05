"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import BookConsultButton from "../BookConsultButton";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

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
        setSuccess(true);
        setFormData({ name: "", email: "", mobile: "", destination: "" });
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      setError("Network error. Please check your connection.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section className="relative pt-20 pb-24 md:pt-24 md:pb-32 overflow-hidden">
      {/* Hero background: solid black + image at 50% opacity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <Image
          src="https://images.pexels.com/photos/3184396/pexels-photo-3184396.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Diverse students studying together in bright environment"
          fill
          priority
          className="object-cover opacity-50"
        />
      </div>

      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 md:gap-16 items-center">
          {/* Left Content */}
          <div className="space-y-8 md:space-y-10 animate-fadeInUp">
            <h1 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight drop-shadow-lg">
              Study Abroad Made <span className="text-accent">Simple</span>
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl text-white/90 leading-relaxed font-medium max-w-xl">
              Expert guidance, global partnerships, and transparent support at
              every step of your international education journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 md:gap-6">
              <BookConsultButton className="flex items-center justify-center gap-2">
                Book Free Counselling
                <FiArrowRight className="w-5 h-5" />
              </BookConsultButton>
              <Link
                href="/destinations"
                className="px-8 py-4 border-2 border-brand text-brand rounded-full font-semibold hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 hover:scale-105 transform text-center"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-surface rounded-3xl shadow-2xl p-8 md:p-10 lg:p-12 border border-border hover-lift animate-slideInRight">
            <h2 className="text-2xl md:text-3xl font-bold text-slate-900 mb-3">
              Get Started Today
            </h2>
            <p className="text-slate-600 mb-6">Fill in your details and we’ll get back to you</p>
            {success ? (
              <div className="text-center py-8">
                <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">Thank You!</h3>
                <p className="text-slate-600 mb-4">Our counsellors will contact you shortly.</p>
                <button
                  onClick={() => setSuccess(false)}
                  className="px-6 py-2 bg-brand text-white rounded-lg font-semibold hover:shadow-lg transition-all"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                    placeholder="Enter your full name"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                    placeholder="your.email@example.com"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                    placeholder="+91 9876543210"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-700 mb-1">
                    Destination Country
                  </label>
                  <select
                    value={formData.destination}
                    onChange={(e) =>
                      setFormData({ ...formData, destination: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                  >
                    <option value="">Select a country</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                  </select>
                </div>
                {error && (
                  <div className="p-3 bg-red-50 border border-red-200 rounded-lg text-red-600 text-sm">
                    {error}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full px-6 py-4 bg-brand text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 hover:scale-105 transform disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {isLoading ? "Submitting..." : "Get Started"}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
