"use client";

import Link from "next/link";

const updates = [
  { text: "Now accepting Jan 2026 applications!", href: "/apply" },
  { text: "Join our Free Counselling Week this November!", href: "/contact" },
  { text: "Apply for Canada Scholarships before 30th Nov!", href: "/destinations/canada" },
  { text: "New IELTS batches starting next week!", href: "/test-prep" },
  { text: "Study in UK - Post-study work visa up to 2 years!", href: "/destinations/uk" },
  { text: "Explore USA universities with 100% Scholarships!", href: "/destinations/usa" },
  { text: "Australia - High visa success rate!", href: "/destinations/australia" },
  { text: "Germany - Tuition-free education available!", href: "/destinations/germany" },
];

export default function DynamicScrollUpdates() {
  return (
    <div className="fixed top-20 left-0 right-0 bg-brand text-white py-2.5 z-40 overflow-hidden shadow-lg">
      <div className="relative flex overflow-hidden">
        {/* Continuous scrolling marquee */}
        <div className="flex animate-marquee whitespace-nowrap">
          {updates.map((update, index) => (
            <Link
              key={index}
              href={update.href}
              className="inline-flex items-center mx-4 hover:text-yellow-300 transition-colors group"
            >
              <span className="text-yellow-300 mr-2 group-hover:scale-125 transition-transform">★</span>
              <span className="text-sm font-semibold">{update.text}</span>
              <span className="text-white/30 mx-4">|</span>
            </Link>
          ))}
        </div>
        {/* Duplicate for seamless loop */}
        <div className="flex animate-marquee2 whitespace-nowrap absolute top-0">
          {updates.map((update, index) => (
            <Link
              key={`dup-${index}`}
              href={update.href}
              className="inline-flex items-center mx-4 hover:text-yellow-300 transition-colors group"
            >
              <span className="text-yellow-300 mr-2 group-hover:scale-125 transition-transform">★</span>
              <span className="text-sm font-semibold">{update.text}</span>
              <span className="text-white/30 mx-4">|</span>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
