"use client";

import { useEffect, useState } from "react";

const stats = [
  { label: "Students Assisted", value: "5000+", suffix: "+" },
  { label: "Partner Universities", value: "100+", suffix: "+" },
  { label: "Countries Supported", value: "15+", suffix: "+" },
  { label: "Visa Success Rate", value: "97", suffix: "%" },
];

export default function StatisticsBar() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById("stats-bar");
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section
      id="stats-bar"
      className="py-16 md:py-24 text-white relative overflow-hidden bg-brand"
    >
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-transform duration-300 py-4"
            >
              <div className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">
                {isVisible ? stat.value : "0"}
              </div>
              <div className="text-base md:text-lg font-semibold opacity-95">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
