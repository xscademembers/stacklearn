"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const updates = [
  "Now accepting Jan 2026 applications!",
  "Join our Free Counselling Week this November!",
  "Apply for Canada Scholarships before 30th Nov!",
  "New IELTS batches starting next week!",
];

export default function DynamicScrollUpdates() {
  const [currentUpdate, setCurrentUpdate] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentUpdate((prev) => (prev + 1) % updates.length);
    }, 5000); // Change update every 5 seconds

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed top-20 left-0 right-0 bg-brand text-white py-3 z-40 overflow-hidden shadow-lg">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-6">
            <span className="text-yellow-300 animate-pulse">🔔</span>
            {updates.map((update, index) => (
              <div
                key={index}
                className={`flex items-center gap-6 whitespace-nowrap ${
                  index === currentUpdate ? "opacity-100 animate-fadeIn" : "opacity-0 absolute"
                } transition-opacity duration-500`}
              >
                <span className="text-sm font-bold">{update}</span>
                {index < updates.length - 1 && (
                  <span className="text-white/40 font-bold">|</span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
