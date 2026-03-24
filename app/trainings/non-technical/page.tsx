import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiClock, FiUsers, FiCheckCircle } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";
import { nonTechnicalCourses } from "@/lib/non-technical-courses-data";

export const metadata: Metadata = {
  title: "Non-Technical Training Courses | StackLearn",
  description:
    "Specialized non-technical training programs including VLSI Design Verification with hands-on projects, expert mentorship, and placement assistance.",
};

export default function NonTechnicalTrainingsPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students in a non-technical training session"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              Non-Technical Training Programs
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
              Specialized Non-Technical{" "}
              <span className="text-accent">Training Courses</span>
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto">
              Build domain expertise with hands-on, mentor-led training programs designed for
              freshers and working professionals. Advance your career in specialized engineering
              fields with industry-ready skills.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Explore Courses
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {/* Stats Bar */}
      <section className="py-8 bg-white border-b border-slate-200">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            {[
              { value: "200+", label: "Hours of Learning" },
              { value: "100+", label: "Live Sessions" },
              { value: "1:1", label: "Expert Mentorship" },
              { value: "100%", label: "Placement Support" },
            ].map((stat) => (
              <div key={stat.label}>
                <p className="text-2xl md:text-3xl font-extrabold text-brand">{stat.value}</p>
                <p className="text-xs md:text-sm text-slate-600 mt-1">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Course Cards */}
      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <header className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              Our Non-Technical <span className="gradient-text">Training Programs</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              Choose from our specialized training courses. Each program includes live mentoring,
              hands-on projects, and placement support.
            </p>
          </header>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {nonTechnicalCourses.map((course) => (
              <Link
                key={course.slug}
                href={`/trainings/non-technical/${course.slug}`}
                className="group relative rounded-2xl bg-white border border-slate-200 overflow-hidden hover-lift flex flex-col transition-colors duration-300 hover:border-brand"
              >
                {/* Card Image */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Image
                    src={course.heroImage}
                    alt={course.title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-3 left-4 right-4">
                    <h3 className="text-lg font-bold text-white">{course.shortTitle}</h3>
                  </div>
                </div>

                {/* Card Body */}
                <div className="flex flex-col flex-1 p-5 md:p-6">
                  <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1 mb-4">
                    {course.cardDescription}
                  </p>

                  {/* Meta */}
                  <div className="flex flex-wrap gap-3 mb-4">
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-page-soft rounded-full px-3 py-1">
                      <FiClock className="w-3.5 h-3.5" />
                      {course.duration}
                    </span>
                    <span className="inline-flex items-center gap-1.5 text-xs text-slate-600 bg-page-soft rounded-full px-3 py-1">
                      <FiUsers className="w-3.5 h-3.5" />
                      Max {course.maxStudents} Students
                    </span>
                  </div>

                  {/* Highlights Preview */}
                  <div className="space-y-1.5 mb-4">
                    {course.keyHighlights.slice(0, 3).map((highlight) => (
                      <div
                        key={highlight}
                        className="flex items-start gap-2 text-xs text-slate-600"
                      >
                        <FiCheckCircle className="w-3.5 h-3.5 text-brand flex-shrink-0 mt-0.5" />
                        <span>{highlight}</span>
                      </div>
                    ))}
                  </div>

                  {/* CTA */}
                  <span className="inline-flex items-center gap-2 text-brand font-semibold text-sm group-hover:gap-3 transition-all duration-300 mt-auto">
                    View Course Details
                    <FiArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" />
                  </span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Why Choose StackLearn */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                Why Train with <span className="gradient-text">StackLearn?</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                Our training programs are designed by industry practitioners who understand what
                employers actually look for. Every course balances theory with extensive hands-on
                practice.
              </p>
              <ul className="space-y-3 text-sm md:text-base text-slate-700">
                {[
                  "Live mentor-led sessions with real-time doubt solving",
                  "Hands-on projects mirroring actual industry challenges",
                  "Small batch sizes for personalized attention",
                  "Comprehensive placement assistance and career support",
                  "Flexible schedules designed for working professionals",
                  "Industry-recognized certifications upon completion",
                ].map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-7 md:px-8 md:py-8 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                From your first class to your first job offer, StackLearn stands with you at every
                step. Our placement cell works directly with hiring partners to ensure our students
                get the opportunities they deserve.
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand">1:1</p>
                  <p className="text-xs text-slate-600">Mentorship</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand">24/7</p>
                  <p className="text-xs text-slate-600">Learning Support</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Team collaborating on a project"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              Ready to Advance Your Career?
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              Join StackLearn&apos;s specialized training programs and gain the skills that
              employers are looking for. Get started with a free career consultation.
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              Book Free Career Consultation
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
