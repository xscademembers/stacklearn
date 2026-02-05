"use client";

import { useState } from "react";
import Image from "next/image";
import { FiArrowRight, FiArrowLeft, FiCheck } from "react-icons/fi";

const steps = [
  "Personal Details",
  "Education",
  "Preferences",
  "Upload Documents",
  "Review & Submit",
];

export default function ApplyPage() {
  const [currentStep, setCurrentStep] = useState(1);
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [formData, setFormData] = useState({
    // Step 1
    name: "",
    dob: "",
    gender: "",
    email: "",
    mobile: "",
    city: "",
    country: "",
    // Step 2
    qualification: "",
    institution: "",
    year: "",
    gpa: "",
    englishTest: "",
    score: "",
    // Step 3
    preferredCountry: "",
    course: "",
    level: "",
    intake: "",
    universities: "",
    budget: "",
    // Step 4
    documents: [] as File[],
  });

  // Validate step before proceeding
  const validateStep = (step: number): boolean => {
    const newErrors: Record<string, string> = {};

    if (step === 1) {
      if (!formData.name.trim()) newErrors.name = "Full name is required";
      if (!formData.email.trim()) newErrors.email = "Email is required";
      else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = "Invalid email format";
      if (!formData.mobile.trim()) newErrors.mobile = "Mobile number is required";
      if (!formData.gender) newErrors.gender = "Please select gender";
    } else if (step === 2) {
      if (!formData.qualification) newErrors.qualification = "Qualification is required";
      if (!formData.institution.trim()) newErrors.institution = "Institution name is required";
      if (!formData.year) newErrors.year = "Passing year is required";
    } else if (step === 3) {
      if (!formData.preferredCountry) newErrors.preferredCountry = "Please select a country";
      if (!formData.course.trim()) newErrors.course = "Course preference is required";
      if (!formData.level) newErrors.level = "Please select study level";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      if (currentStep < 5) setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setErrors({});
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setSubmitError("");
    
    try {
      const response = await fetch("/api/applications", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      
      const data = await response.json();
      
      if (response.ok) {
        alert("Thank you for applying! Your application ID: " + data.applicationId + ". Our counsellors will review your application and contact you shortly.");
        window.location.href = "/";
      } else {
        setSubmitError(data.message || "Failed to submit application. Please try again.");
      }
    } catch (error) {
      console.error("Error submitting application:", error);
      setSubmitError("Network error. Please check your connection and try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="pb-0">
      {/* Hero Section */}
      <section className="relative h-72 text-white flex items-center justify-center overflow-hidden">
        {/* Background: solid black + image with 50% opacity */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/7092477/pexels-photo-7092477.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Student filling application"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Apply Now</h1>
          <p className="text-xl max-w-2xl mx-auto">
            Start your application process for your dream university today.
          </p>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">

        {/* Progress Bar */}
        <div className="max-w-4xl mx-auto mb-12">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={index} className="flex items-center flex-1">
                <div className="flex flex-col items-center flex-1">
                  <div
                    className={`w-10 h-10 rounded-full flex items-center justify-center font-semibold ${
                      currentStep > index + 1
                        ? "bg-green-500 text-white"
                        : currentStep === index + 1
                        ? "bg-primary-600 text-white"
                        : "bg-gray-300 text-gray-600"
                    }`}
                  >
                    {currentStep > index + 1 ? (
                      <FiCheck className="w-6 h-6" />
                    ) : (
                      index + 1
                    )}
                  </div>
                  <span className="mt-2 text-sm text-gray-600 text-center hidden md:block">
                    {step}
                  </span>
                </div>
                {index < steps.length - 1 && (
                  <div
                    className={`h-1 flex-1 mx-2 ${
                      currentStep > index + 1 ? "bg-green-500" : "bg-gray-300"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Form Steps */}
        <div className="max-w-3xl mx-auto bg-white rounded-xl shadow-lg p-8">
          {/* Step 1: Personal Details */}
          {currentStep === 1 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Personal Details</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => { setFormData({ ...formData, name: e.target.value }); setErrors({ ...errors, name: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.name ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.name && <p className="text-red-500 text-sm mt-1">{errors.name}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    value={formData.dob}
                    onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    required
                    value={formData.gender}
                    onChange={(e) => { setFormData({ ...formData, gender: e.target.value }); setErrors({ ...errors, gender: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.gender ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="male">Male</option>
                    <option value="female">Female</option>
                    <option value="other">Other</option>
                  </select>
                  {errors.gender && <p className="text-red-500 text-sm mt-1">{errors.gender}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Email ID *
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => { setFormData({ ...formData, email: e.target.value }); setErrors({ ...errors, email: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.email ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Mobile Number *
                  </label>
                  <input
                    type="tel"
                    required
                    value={formData.mobile}
                    onChange={(e) => { setFormData({ ...formData, mobile: e.target.value }); setErrors({ ...errors, mobile: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.mobile ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.mobile && <p className="text-red-500 text-sm mt-1">{errors.mobile}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current City & Country
                  </label>
                  <input
                    type="text"
                    value={formData.city}
                    onChange={(e) => setFormData({ ...formData, city: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    placeholder="City, Country"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Education */}
          {currentStep === 2 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Education Details</h2>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Highest Qualification *
                  </label>
                  <select
                    required
                    value={formData.qualification}
                    onChange={(e) => { setFormData({ ...formData, qualification: e.target.value }); setErrors({ ...errors, qualification: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.qualification ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="12th">12th</option>
                    <option value="diploma">Diploma</option>
                    <option value="bachelor">Bachelor’s</option>
                    <option value="master">Master’s</option>
                  </select>
                  {errors.qualification && <p className="text-red-500 text-sm mt-1">{errors.qualification}</p>}
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Institution / University Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.institution}
                      onChange={(e) => { setFormData({ ...formData, institution: e.target.value }); setErrors({ ...errors, institution: "" }); }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.institution ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.institution && <p className="text-red-500 text-sm mt-1">{errors.institution}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Year of Passing *
                    </label>
                    <input
                      type="number"
                      required
                      value={formData.year}
                      onChange={(e) => { setFormData({ ...formData, year: e.target.value }); setErrors({ ...errors, year: "" }); }}
                      className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.year ? 'border-red-500' : 'border-gray-300'}`}
                    />
                    {errors.year && <p className="text-red-500 text-sm mt-1">{errors.year}</p>}
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GPA / Percentage *
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.gpa}
                      onChange={(e) => setFormData({ ...formData, gpa: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      English Proficiency Test
                    </label>
                    <select
                      value={formData.englishTest}
                      onChange={(e) => setFormData({ ...formData, englishTest: e.target.value })}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    >
                      <option value="">Select</option>
                      <option value="ielts">IELTS</option>
                      <option value="toefl">TOEFL</option>
                      <option value="pte">PTE</option>
                      <option value="none">None</option>
                    </select>
                  </div>
                  {formData.englishTest && formData.englishTest !== "none" && (
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Score
                      </label>
                      <input
                        type="text"
                        value={formData.score}
                        onChange={(e) => setFormData({ ...formData, score: e.target.value })}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Preferences */}
          {currentStep === 3 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Study Preferences</h2>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Country *
                  </label>
                  <select
                    required
                    value={formData.preferredCountry}
                    onChange={(e) => { setFormData({ ...formData, preferredCountry: e.target.value }); setErrors({ ...errors, preferredCountry: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.preferredCountry ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="uk">United Kingdom</option>
                    <option value="usa">United States</option>
                    <option value="canada">Canada</option>
                    <option value="australia">Australia</option>
                    <option value="germany">Germany</option>
                  </select>
                  {errors.preferredCountry && <p className="text-red-500 text-sm mt-1">{errors.preferredCountry}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Course / Field of Study *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.course}
                    onChange={(e) => { setFormData({ ...formData, course: e.target.value }); setErrors({ ...errors, course: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.course ? 'border-red-500' : 'border-gray-300'}`}
                  />
                  {errors.course && <p className="text-red-500 text-sm mt-1">{errors.course}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Level of Study *
                  </label>
                  <select
                    required
                    value={formData.level}
                    onChange={(e) => { setFormData({ ...formData, level: e.target.value }); setErrors({ ...errors, level: "" }); }}
                    className={`w-full px-4 py-3 border rounded-lg focus:ring-2 focus:ring-primary-500 ${errors.level ? 'border-red-500' : 'border-gray-300'}`}
                  >
                    <option value="">Select</option>
                    <option value="undergraduate">Undergraduate</option>
                    <option value="postgraduate">Postgraduate</option>
                    <option value="diploma">Diploma</option>
                    <option value="phd">PhD</option>
                  </select>
                  {errors.level && <p className="text-red-500 text-sm mt-1">{errors.level}</p>}
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Expected Intake *
                  </label>
                  <select
                    required
                    value={formData.intake}
                    onChange={(e) => setFormData({ ...formData, intake: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select</option>
                    <option value="jan-2026">January 2026</option>
                    <option value="may-2026">May 2026</option>
                    <option value="sep-2026">September 2026</option>
                  </select>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Preferred Universities (Optional)
                  </label>
                  <input
                    type="text"
                    value={formData.universities}
                    onChange={(e) => setFormData({ ...formData, universities: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Budget Range *
                  </label>
                  <select
                    required
                    value={formData.budget}
                    onChange={(e) => setFormData({ ...formData, budget: e.target.value })}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  >
                    <option value="">Select</option>
                    <option value="below-10l">Below ₹10L</option>
                    <option value="10-20l">₹10–20L</option>
                    <option value="above-20l">Above ₹20L</option>
                  </select>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents */}
          {currentStep === 4 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Upload Documents</h2>
              <div className="space-y-4">
                {[
                  "Passport Copy",
                  "Academic Transcripts",
                  "English Test Scorecard",
                  "Statement of Purpose (SOP)",
                  "Resume / CV",
                ].map((doc, index) => (
                  <div key={index}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      {doc} {index < 3 && "*"}
                    </label>
                    <input
                      type="file"
                      required={index < 3}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Step 5: Review */}
          {currentStep === 5 && (
            <div className="space-y-4">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Review & Submit</h2>
              <div className="bg-gray-50 p-6 rounded-lg space-y-4">
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Personal Details</h3>
                  <p className="text-gray-600">Name: {formData.name}</p>
                  <p className="text-gray-600">Email: {formData.email}</p>
                  <p className="text-gray-600">Mobile: {formData.mobile}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Education</h3>
                  <p className="text-gray-600">Qualification: {formData.qualification}</p>
                  <p className="text-gray-600">Institution: {formData.institution}</p>
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-2">Preferences</h3>
                  <p className="text-gray-600">Country: {formData.preferredCountry}</p>
                  <p className="text-gray-600">Course: {formData.course}</p>
                  <p className="text-gray-600">Level: {formData.level}</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <input type="checkbox" required className="w-4 h-4" />
                <label className="text-sm text-gray-700">
                  I confirm that all information provided is accurate.
                </label>
              </div>
            </div>
          )}

          {/* Error Display */}
          {submitError && (
            <div className="p-4 bg-red-50 border border-red-200 rounded-lg text-red-600 mt-4">
              {submitError}
            </div>
          )}

          {/* Navigation Buttons */}
          <div className="flex justify-between mt-8">
            <button
              onClick={handleBack}
              disabled={currentStep === 1 || isSubmitting}
              className="px-6 py-3 border border-gray-300 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-50 transition-colors flex items-center gap-2"
            >
              <FiArrowLeft className="w-5 h-5" />
              Back
            </button>
            {currentStep < 5 ? (
              <button
                onClick={handleNext}
                className="px-6 py-3 bg-brand text-white rounded-lg hover:shadow-lg transition-all flex items-center gap-2"
              >
                Next Step
                <FiArrowRight className="w-5 h-5" />
              </button>
            ) : (
              <button
                onClick={handleSubmit}
                disabled={isSubmitting}
                className="px-6 py-3 bg-brand text-white rounded-lg hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? "Submitting..." : "Submit Application"}
              </button>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
