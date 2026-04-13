"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiChevronLeft, FiChevronRight } from "react-icons/fi";
import type { TrainingProgramCard } from "@/lib/cms-home-content";

export type PopularTrainingCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
  programs: TrainingProgramCard[];
};

export default function PopularTrainingPrograms({ content }: { content: PopularTrainingCms }) {
  const programs = content.programs;
  const [index, setIndex] = useState(0);
  const [cardsPerView, setCardsPerView] = useState(4);
  const total = programs.length;
  const maxIndex = Math.max(0, total - cardsPerView);

  useEffect(() => {
    const updateCardsPerView = () => {
      if (window.innerWidth >= 1024) {
        setCardsPerView(4);
        return;
      }
      if (window.innerWidth >= 640) {
        setCardsPerView(2);
        return;
      }
      setCardsPerView(1);
    };

    updateCardsPerView();
    window.addEventListener("resize", updateCardsPerView);
    return () => window.removeEventListener("resize", updateCardsPerView);
  }, []);

  useEffect(() => {
    setIndex((prev) => Math.min(prev, maxIndex));
  }, [maxIndex]);

  const showPrev = () => {
    setIndex((prev) => Math.max(0, prev - 1));
  };

  const showNext = () => {
    setIndex((prev) => Math.min(maxIndex, prev + 1));
  };

  if (total === 0) return null;

  return (
    <section
      className="py-16 md:py-24 bg-slate-50"
      aria-labelledby="popular-training-programs-heading"
    >
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2
            id="popular-training-programs-heading"
            className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4"
          >
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-600 font-medium max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>

        <div className="space-y-8">
          <div className="overflow-hidden -mx-3">
            <div
              className="flex transition-transform duration-700 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none"
              style={{ transform: `translateX(-${index * (100 / cardsPerView)}%)` }}
            >
              {programs.map((program) => (
                <div
                  key={program.href}
                  className="px-3 shrink-0"
                  style={{ flex: `0 0 ${100 / cardsPerView}%` }}
                >
                  <Link
                    href={program.href}
                    className="group flex h-full flex-col bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-slate-100 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 motion-reduce:hover:translate-y-0"
                  >
                    <div className="relative h-48 overflow-hidden">
                      <Image
                        src={program.image}
                        alt=""
                        fill
                        className="object-cover motion-safe:transition-transform motion-safe:duration-500 motion-safe:group-hover:scale-105"
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
                      <div className="absolute bottom-4 left-4 right-4">
                        <h3 className="text-white font-semibold text-xl drop-shadow-md leading-snug">
                          {program.title}
                        </h3>
                      </div>
                    </div>
                    <div className="p-6 flex flex-col flex-1">
                      <p className="text-sm text-slate-600 leading-snug flex-1">
                        {program.description}
                      </p>
                      <div className="mt-5 flex items-center text-brand font-semibold text-sm motion-safe:transition-all motion-safe:duration-300 motion-safe:group-hover:gap-2">
                        <span>Learn More</span>
                        <FiArrowRight className="w-4 h-4 shrink-0 motion-safe:transition-transform motion-safe:duration-300 motion-safe:group-hover:translate-x-1" />
                      </div>
                    </div>
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div className="flex items-center justify-center gap-4">
            <button
              type="button"
              onClick={showPrev}
              disabled={index === 0}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
              aria-label="Previous training programs"
            >
              <FiChevronLeft className="w-5 h-5 mr-1" />
              Prev
            </button>
            <button
              type="button"
              onClick={showNext}
              disabled={index >= maxIndex}
              className="inline-flex items-center justify-center px-4 py-2 rounded-full border border-slate-200 bg-white text-slate-700 hover:bg-brand hover:text-white hover:border-brand shadow-sm transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-brand focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:bg-white disabled:hover:text-slate-700 disabled:hover:border-slate-200"
              aria-label="Next training programs"
            >
              Next
              <FiChevronRight className="w-5 h-5 ml-1" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
