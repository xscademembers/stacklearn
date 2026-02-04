"use client";

import { useEffect, useState } from "react";
import Image from "next/image";

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
      className="py-20 text-white relative overflow-hidden"
    >
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Students celebrating graduation"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-brand/70" />
      </div>
      {/* Animated background */}
      <div className="absolute inset-0 z-[1] opacity-10">
        <div className="absolute top-0 left-0 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
        <div className="absolute bottom-0 right-0 w-72 h-72 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div
              key={index}
              className="text-center transform hover:scale-110 transition-transform duration-300"
            >
              <div className="text-5xl md:text-6xl font-extrabold mb-3 drop-shadow-lg">
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
