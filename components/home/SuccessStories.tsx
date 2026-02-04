"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";

const stories = [
  {
    name: "Sai Kumar",
    destination: "UK",
    university: "University of Leeds",
    course: "MSc Computer Science",
    quote: "Stack Learn made my visa process completely stress-free — they took care of every document and step!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Priya Sharma",
    destination: "Canada",
    university: "University of Toronto",
    course: "MBA",
    quote: "The counselling team helped me find the perfect university match. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    name: "Rahul Patel",
    destination: "Australia",
    university: "University of Melbourne",
    course: "MEng Mechanical",
    quote: "From application to visa approval, Stack Learn guided me through everything seamlessly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    name: "Anjali Reddy",
    destination: "USA",
    university: "MIT",
    course: "MS Data Science",
    quote: "Their scholarship guidance helped me secure funding. Thank you Stack Learn!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
];

export default function SuccessStories() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % stories.length);
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + stories.length) % stories.length);
  };

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            Success <span className="gradient-text">Stories</span>
          </h2>
          <p className="text-xl text-slate-700 font-medium">
            Real students, real success stories
          </p>
        </div>
        <div className="relative max-w-6xl mx-auto px-8">
          <div className="overflow-hidden">
            <div
              className="flex transition-transform duration-500 ease-in-out"
              style={{ transform: `translateX(-${currentIndex * 100}%)` }}
            >
              {stories.map((story, index) => (
                <div
                  key={index}
                  className="min-w-full px-4"
                >
                  <div className="bg-white rounded-2xl shadow-md p-8 text-center border border-gray-100 transition-all duration-300 mb-4">
                    <div className="relative inline-block mb-6">
                      <div className="relative w-28 h-28 mx-auto">
                        <Image
                          src={story.image}
                          alt={story.name}
                          fill
                          className="rounded-full object-cover ring-4 ring-primary-100 group-hover:ring-primary-300 transition-all duration-300"
                          sizes="112px"
                        />
                      </div>
                      <div className="absolute -bottom-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center">
                        <span className="text-white text-xs font-bold">✓</span>
                      </div>
                    </div>
                    <h3 className="text-2xl font-extrabold text-slate-900 mb-2">
                      {story.name}
                    </h3>
                    <p className="text-primary-600 font-bold mb-4 text-lg">
                      {story.course} | {story.university}, {story.destination}
                    </p>
                    <p className="text-slate-700 italic text-lg mb-6 leading-relaxed">
                      &ldquo;{story.quote}&rdquo;
                    </p>
                    <Link
                      href="/success-stories"
                      className="inline-flex items-center gap-2 text-primary-600 font-bold hover:text-primary-700 hover:gap-3 transition-all duration-300"
                    >
                      Read Full Story
                      <span className="hover:translate-x-1 transition-transform duration-300">→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <button
            onClick={prevSlide}
            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-primary-50 transition-colors z-10"
            aria-label="Previous story"
          >
            <FiChevronLeft className="w-6 h-6 text-gray-700" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-12 bg-white rounded-full p-3 shadow-lg hover:bg-primary-50 transition-colors z-10"
            aria-label="Next story"
          >
            <FiChevronRight className="w-6 h-6 text-gray-700" />
          </button>
          <div className="flex justify-center gap-2 mt-6">
            {stories.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`w-2 h-2 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-primary-600 w-8"
                    : "bg-gray-300"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
