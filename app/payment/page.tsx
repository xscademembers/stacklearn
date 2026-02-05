"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiCreditCard, FiCheck } from "react-icons/fi";
import { FaWhatsapp } from "react-icons/fa";

export default function PaymentPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    purpose: "",
    amount: "",
    remarks: "",
  });
  const [paymentMethod, setPaymentMethod] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log("Payment submitted:", formData, paymentMethod);
    setIsSubmitted(true);
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center pb-0">
        <div className="max-w-md w-full bg-white rounded-xl shadow-lg p-8 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <FiCheck className="w-8 h-8 text-green-600" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Payment Successful ✅</h2>
          <p className="text-gray-600 mb-6">
            Thank you for your payment. A confirmation receipt has been sent to your registered email.
          </p>
          <div className="bg-gray-50 p-4 rounded-lg mb-6 text-left">
            <p className="text-sm text-gray-600 mb-1">Transaction ID</p>
            <p className="font-semibold text-gray-900 mb-4">TXN123456789</p>
            <p className="text-sm text-gray-600 mb-1">Amount Paid</p>
            <p className="font-semibold text-gray-900">₹{formData.amount}</p>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
              Download Receipt
            </button>
            <Link
              href="/"
              className="flex-1 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors text-center"
            >
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="pb-0">
      {/* Hero Section */}
      <section className="relative h-72 text-white flex items-center justify-center overflow-hidden">
        {/* Background: solid black + image with 50% opacity */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/4386431/pexels-photo-4386431.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Secure payment"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Make a Secure Payment</h1>
          <p className="text-xl max-w-2xl mx-auto">Pay your fees safely using our trusted payment gateway.</p>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-2xl mx-auto">

          {/* Payment Form */}
          <div className="bg-white rounded-xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">Payment Information</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Full Name *</label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email ID *</label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Mobile Number *</label>
                <input
                  type="tel"
                  required
                  value={formData.mobile}
                  onChange={(e) => setFormData({ ...formData, mobile: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Purpose of Payment *</label>
                <select
                  required
                  value={formData.purpose}
                  onChange={(e) => setFormData({ ...formData, purpose: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                >
                  <option value="">Select</option>
                  <option value="counselling">Counselling Fee</option>
                  <option value="application">Application Fee</option>
                  <option value="training">Training Program</option>
                  <option value="other">Other Services</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Amount (INR) *</label>
                <input
                  type="number"
                  required
                  value={formData.amount}
                  onChange={(e) => setFormData({ ...formData, amount: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                  placeholder="Enter amount"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Remarks / Notes</label>
                <textarea
                  value={formData.remarks}
                  onChange={(e) => setFormData({ ...formData, remarks: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <button
                type="submit"
                className="w-full px-6 py-4 bg-brand text-white rounded-lg font-semibold hover:shadow-lg transition-all"
              >
                Proceed to Payment
              </button>
            </form>
          </div>

          {/* Payment Options */}
          {formData.amount && (
            <div className="bg-white rounded-xl shadow-lg p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6">Select Payment Method</h2>
              <div className="grid md:grid-cols-3 gap-6">
                <button
                  onClick={() => setPaymentMethod("card")}
                  className={`p-6 border-2 rounded-xl text-center transition-all ${
                    paymentMethod === "card"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <FiCreditCard className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Credit / Debit Card</h3>
                  <p className="text-sm text-gray-600">Pay securely with Visa, MasterCard, or Rupay.</p>
                </button>
                <button
                  onClick={() => setPaymentMethod("upi")}
                  className={`p-6 border-2 rounded-xl text-center transition-all ${
                    paymentMethod === "upi"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <FaWhatsapp className="w-12 h-12 text-green-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">UPI Payment</h3>
                  <p className="text-sm text-gray-600">Pay instantly using Google Pay, PhonePe, or Paytm.</p>
                </button>
                <button
                  onClick={() => setPaymentMethod("netbanking")}
                  className={`p-6 border-2 rounded-xl text-center transition-all ${
                    paymentMethod === "netbanking"
                      ? "border-primary-600 bg-primary-50"
                      : "border-gray-300 hover:border-primary-300"
                  }`}
                >
                  <FiCreditCard className="w-12 h-12 text-primary-600 mx-auto mb-4" />
                  <h3 className="font-semibold text-gray-900 mb-2">Net Banking</h3>
                  <p className="text-sm text-gray-600">Transfer directly from your bank account.</p>
                </button>
              </div>
              {paymentMethod && (
                <button
                  onClick={handleSubmit}
                  className="w-full mt-6 px-6 py-4 bg-primary-600 text-white rounded-lg font-semibold hover:bg-primary-700 transition-colors"
                >
                  Proceed
                </button>
              )}
            </div>
          )}
        </div>
      </div>
      </div>
    </div>
  );
}
