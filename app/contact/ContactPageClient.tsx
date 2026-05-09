"use client";

import { useState } from "react";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { FiPhone, FiMail, FiMapPin, FiSend } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";
import { withSubmissionContext } from "@/lib/submissionPayload";
import type { ContactSiteSettings } from "@/lib/contact-settings-shared";
import { phoneDigitsForUrl } from "@/lib/contact-settings-shared";
import IndiaPhoneInput from "@/components/forms/IndiaPhoneInput";

export type ContactPageClientProps = {
  heroHeading: string;
  heroSubheading: string;
  heroImageUrl: string;
  settings: ContactSiteSettings;
  copy: {
    callTitle: string;
    callButton: string;
    emailTitle: string;
    emailButton: string;
    officeTitle: string;
    mapButton: string;
    formHeading: string;
    officeColumnHeading: string;
    hoursPrefix: string;
    addressPrefix: string;
    whatsappLabel: string;
    mapsCta: string;
    officePhotoUrl: string;
    submitSuccessMessage: string;
    bottomHeading: string;
    bottomSubheading: string;
    bottomButtonText: string;
    bottomBackgroundImage: string;
  };
};

export default function ContactPageClient({
  heroHeading,
  heroSubheading,
  heroImageUrl,
  settings,
  copy,
}: ContactPageClientProps) {
  const pathname = usePathname();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    service: "",
    message: "",
  });
  const [submitError, setSubmitError] = useState("");

  const heroUnoptimized =
    !heroImageUrl.includes("images.pexels.com") &&
    !heroImageUrl.includes("images.unsplash.com");

  const officeUnopt =
    !copy.officePhotoUrl.includes("images.pexels.com") &&
    !copy.officePhotoUrl.includes("images.unsplash.com");

  const bottomUnopt =
    !copy.bottomBackgroundImage.includes("images.pexels.com") &&
    !copy.bottomBackgroundImage.includes("images.unsplash.com");

  const telHref = `tel:${phoneDigitsForUrl(settings.phone)}`;
  const waHref = `https://wa.me/${phoneDigitsForUrl(settings.whatsapp)}`;
  const mapHref = settings.mapUrl || "https://maps.google.com";

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitError("");
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(
          withSubmissionContext({ ...formData }, pathname, "contact_page")
        ),
      });
      const data = await response.json().catch(() => ({}));
      if (response.ok) {
        alert(copy.submitSuccessMessage);
        setFormData({
          name: "",
          email: "",
          mobile: "",
          service: "",
          message: "",
        });
      } else {
        setSubmitError(
          typeof data.message === "string"
            ? data.message
            : "Something went wrong. Please try again."
        );
      }
    } catch (error) {
      console.error("Error submitting contact form:", error);
      setSubmitError("Network error. Please try again.");
    }
  };

  return (
    <div className="pb-0">
      <section className="relative h-60 md:h-64 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={heroImageUrl}
            alt=""
            fill
            priority
            unoptimized={heroUnoptimized}
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4 whitespace-pre-line">
            {heroHeading}
          </h1>
          <p className="text-base md:text-xl whitespace-pre-line">{heroSubheading}</p>
        </div>
      </section>

      <section className="py-12 bg-white">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-6 md:grid-cols-3 md:gap-8">
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <FiPhone className="w-12 h-12 text-brand mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{copy.callTitle}</h3>
              <a href={telHref} className="text-brand hover:underline text-lg">
                {settings.phone}
              </a>
              <a
                href={telHref}
                className="block mt-4 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors"
              >
                {copy.callButton}
              </a>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <FiMail className="w-12 h-12 text-brand mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{copy.emailTitle}</h3>
              <a
                href={`mailto:${settings.email}`}
                className="text-brand hover:underline text-lg"
              >
                {settings.email}
              </a>
              <a
                href={`mailto:${settings.email}`}
                className="block mt-4 px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors"
              >
                {copy.emailButton}
              </a>
            </div>
            <div className="bg-gray-50 p-6 rounded-xl text-center">
              <FiMapPin className="w-12 h-12 text-brand mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">{copy.officeTitle}</h3>
              <p className="text-gray-600 mb-4">{settings.address}</p>
              <a
                href={mapHref}
                target="_blank"
                rel="noopener noreferrer"
                className="block px-6 py-2 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors"
              >
                {copy.mapButton}
              </a>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4 md:px-6">
          <div className="grid gap-10 lg:grid-cols-2 lg:gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{copy.formHeading}</h2>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
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
                    className="w-full border border-gray-300 rounded-lg focus-within:ring-2 focus-within:ring-brand focus-within:border-transparent"
                    inputClassName="w-full px-4 py-3 outline-none"
                    placeholder="10-digit mobile number"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Select Service *
                  </label>
                  <select
                    required
                    value={formData.service}
                    onChange={(e) => setFormData({ ...formData, service: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  >
                    <option value="">Select a service</option>
                    <option value="study-abroad">Study Abroad</option>
                    <option value="training">Training</option>
                    <option value="visa">Visa</option>
                    <option value="other">Others</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Message / Query
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    rows={5}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand focus:border-transparent"
                  />
                </div>
                {submitError ? (
                  <p className="text-sm text-accent" role="alert">
                    {submitError}
                  </p>
                ) : null}
                <button
                  type="submit"
                  className="w-full px-6 py-4 bg-brand text-white rounded-lg font-semibold hover:shadow-lg transition-all flex items-center justify-center gap-2"
                >
                  Submit Enquiry
                  <FiSend className="w-5 h-5" />
                </button>
              </form>
            </div>

            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">{copy.officeColumnHeading}</h2>
              <div className="bg-white p-6 rounded-xl shadow-md mb-6">
                <p className="text-gray-600 mb-4">
                  <strong>{copy.hoursPrefix}</strong> {settings.officeHours}
                </p>
                <p className="text-gray-600 mb-4">
                  <strong>{copy.addressPrefix}</strong> {settings.address}
                </p>
                <div className="flex gap-4 mt-6">
                  <a
                    href={waHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-6 py-3 bg-brand text-white rounded-lg hover:bg-brand-strong transition-colors"
                  >
                    <FaWhatsapp className="w-5 h-5" />
                    {copy.whatsappLabel}
                  </a>
                </div>
              </div>
              <div className="relative rounded-xl h-64 overflow-hidden">
                <Image
                  src={copy.officePhotoUrl}
                  alt="Office location"
                  fill
                  unoptimized={officeUnopt}
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
                  <a
                    href={mapHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:shadow-xl transition-all"
                  >
                    {copy.mapsCta}
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="relative py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={copy.bottomBackgroundImage}
            alt="Team collaboration"
            fill
            unoptimized={bottomUnopt}
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">{copy.bottomHeading}</h2>
          <p className="text-base md:text-xl mb-8">{copy.bottomSubheading}</p>
          <a
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-brand rounded-full font-semibold hover:shadow-xl transition-all"
          >
            {copy.bottomButtonText}
          </a>
        </div>
      </section>
    </div>
  );
}
