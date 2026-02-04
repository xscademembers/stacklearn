"use client";

import { useState } from "react";
import Image from "next/image";
import { FiSearch, FiDownload, FiCheck } from "react-icons/fi";

export default function CertificatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isAdmin, setIsAdmin] = useState(false);

  const handleSearch = () => {
    // Simulate search
    if (searchQuery) {
      setSearchResults([
        {
          name: "John Doe",
          course: "Python for Beginners",
          date: "2025-01-15",
          certificateId: "CERT123456",
        },
      ]);
    }
  };

  return (
    <div className="pb-0">
      {/* Hero Section */}
      <section className="relative h-72 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/5427868/pexels-photo-5427868.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Certificate and achievement"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">Certificate Verification & Download</h1>
          <p className="text-xl max-w-2xl mx-auto">Search and download your verified training certificates in seconds.</p>
        </div>
      </section>

      <div className="bg-gray-50 py-12">
      <div className="container mx-auto px-4">

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto mb-12">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Enter Student Name or Certificate ID"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
            />
            <button
              onClick={handleSearch}
              className="px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors flex items-center gap-2"
            >
              <FiSearch className="w-5 h-5" />
              Search
            </button>
          </div>
        </div>

        {/* Search Results */}
        {searchResults.length > 0 && (
          <div className="max-w-2xl mx-auto mb-12">
            {searchResults.map((result, index) => (
              <div key={index} className="bg-white rounded-xl shadow-md p-6 mb-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">{result.name}</h3>
                    <p className="text-gray-600 mb-1">
                      <strong>Course:</strong> {result.course}
                    </p>
                    <p className="text-gray-600 mb-1">
                      <strong>Date of Issue:</strong> {result.date}
                    </p>
                    <p className="text-gray-600">
                      <strong>Certificate ID:</strong> {result.certificateId}
                    </p>
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    <FiDownload className="w-5 h-5" />
                    Download Certificate
                  </button>
                  <button className="flex items-center gap-2 px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    <FiCheck className="w-5 h-5" />
                    Verify QR
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Admin Panel */}
        <div className="max-w-4xl mx-auto">
          <div className="bg-white rounded-xl shadow-md p-8">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-900">Admin Certificate Management</h2>
              <button
                onClick={() => setIsAdmin(!isAdmin)}
                className="px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
              >
                {isAdmin ? "Hide" : "Show"} Admin Panel
              </button>
            </div>
            {isAdmin && (
              <form className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Student Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Course Name *</label>
                    <input
                      type="text"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Issue Date *</label>
                    <input
                      type="date"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Certificate File *</label>
                    <input
                      type="file"
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500"
                    />
                  </div>
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors">
                    Generate Certificate
                  </button>
                  <button className="px-6 py-3 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
                    Update Record
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
      </div>
    </div>
  );
}
