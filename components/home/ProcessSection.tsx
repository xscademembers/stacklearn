import Image from "next/image";
import { FiUser, FiSearch, FiFileText } from "react-icons/fi";

const steps = [
  {
    icon: FiUser,
    title: "Free Counselling",
    description: "Understanding your goals and academic history with expert guidance.",
  },
  {
    icon: FiSearch,
    title: "Shortlisting Universities",
    description: "Matching courses and countries based on your profile and preferences.",
  },
  {
    icon: FiFileText,
    title: "Visa & Departure Support",
    description: "Ensuring successful visa filing and smooth transition abroad.",
  },
];

export default function ProcessSection() {
  return (
    <section className="py-20 relative overflow-hidden">
      {/* Subtle background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Students working together"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-white/95" />
      </div>
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            How It <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-slate-700 font-medium">
            Simple steps to your study abroad journey
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              <div className="relative mb-6">
                <div className="w-24 h-24 mx-auto bg-brand rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-brand/50 transition-all duration-300 group-hover:scale-110">
                  <step.icon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-brand-soft -z-10 transition-all duration-300" />
                )}
                <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-extrabold shadow-lg group-hover:scale-125 transition-transform duration-300">
                  {index + 1}
                </div>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors duration-300">
                {step.title}
              </h3>
              <p className="text-slate-700 leading-relaxed">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
