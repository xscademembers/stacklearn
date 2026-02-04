"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function HeroSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    destination: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await fetch("/api/leads", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      if (response.ok) {
        alert("Thank you! Our counsellors will contact you shortly.");
        setFormData({ name: "", email: "", mobile: "", destination: "" });
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Thank you! Our counsellors will contact you shortly.");
    }
  };

  return (
    <section className="relative pt-16 pb-20 overflow-hidden">
      {/* Hero background image for a professional study-abroad feel */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Students celebrating graduation abroad"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/85" />
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8 animate-fadeInUp">
            <h1 className="text-5xl lg:text-7xl font-extrabold text-slate-900 leading-tight">
              Study Abroad Made <span className="gradient-text">Simple</span>
            </h1>
            <p className="text-xl lg:text-2xl text-slate-700 leading-relaxed font-medium">
              Expert guidance, global partnerships, and transparent support at
              every step of your international education journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/contact"
                className="group px-8 py-4 bg-brand text-white rounded-full font-semibold hover:shadow-2xl hover:shadow-brand/40 transition-all duration-300 flex items-center justify-center gap-2 hover:scale-105 transform"
              >
                Book Free Counselling
                <FiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Link>
              <Link
                href="/destinations"
                className="px-8 py-4 border-2 border-brand text-brand rounded-full font-semibold hover:bg-brand hover:text-white hover:border-brand transition-all duration-300 hover:scale-105 transform"
              >
                Explore Destinations
              </Link>
            </div>
          </div>

          {/* Right Content - Form */}
          <div className="bg-surface rounded-3xl shadow-2xl p-8 lg:p-10 border border-border hover-lift animate-slideInRight">
            <h2 className="text-3xl font-bold text-slate-900 mb-2">
              Get Started Today
            </h2>
            <p className="text-slate-600 mb-6">Fill in your details and we’ll get back to you</p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Full Name *
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full px-4 py-3.5 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Email *
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full px-4 py-3.5 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                  placeholder="your.email@example.com"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Mobile Number *
                </label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) =>
                    setFormData({ ...formData, mobile: e.target.value })
                  }
                  className="w-full px-4 py-3.5 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
                  placeholder="+91 9876543210"
                />
              </div>
              <div>
                <label className="block text-sm font-semibold text-slate-700 mb-2">
                  Destination Country
                </label>
                <select
                  value={formData.destination}
                  onChange={(e) =>
                    setFormData({ ...formData, destination: e.target.value })
                  }
                  className="w-full px-4 py-3.5 border-2 border-border rounded-xl focus:ring-2 focus:ring-brand focus:border-brand transition-all bg-page-soft hover:bg-surface"
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
                className="w-full px-6 py-4 bg-brand text-white rounded-xl font-semibold hover:shadow-xl hover:shadow-brand/40 transition-all duration-300 hover:scale-105 transform"
              >
                Get Started
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
