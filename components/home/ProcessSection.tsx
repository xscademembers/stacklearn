import Image from "next/image";
import { FiUser, FiSearch, FiFileText } from "react-icons/fi";
import type { IconType } from "react-icons";
import type { ProcessStep } from "@/lib/cms-home-content";

const STEP_ICONS: Record<string, IconType> = {
  FiUser,
  FiSearch,
  FiFileText,
};

function resolveStepIcon(key: string): IconType {
  return STEP_ICONS[key] ?? FiUser;
}

export type ProcessSectionCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
  backgroundImage: string;
  steps: ProcessStep[];
};

export default function ProcessSection({ content }: { content: ProcessSectionCms }) {
  const steps = content.steps;
  const bg = content.backgroundImage;

  return (
    <section className="py-16 md:py-24 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-white" />
        <Image
          src={bg}
          alt="Students working together"
          fill
          className="object-cover opacity-50"
        />
      </div>
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            {content.subheading}
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8 md:gap-12 max-w-5xl mx-auto">
          {steps.map((step, index) => {
            const StepIcon = resolveStepIcon(step.icon);
            return (
              <div key={step.title} className="text-center group">
                <div className="relative mb-8">
                  <div className="w-24 h-24 mx-auto bg-brand rounded-full flex items-center justify-center shadow-xl group-hover:shadow-2xl group-hover:shadow-brand/50 transition-all duration-300 group-hover:scale-110">
                    <StepIcon className="w-12 h-12 text-white group-hover:scale-110 transition-transform duration-300" />
                  </div>
                  {index < steps.length - 1 && (
                    <div className="hidden md:block absolute top-12 left-full w-full h-1 bg-brand-soft -z-10 transition-all duration-300" />
                  )}
                  <div className="absolute -top-2 -right-2 w-10 h-10 bg-accent rounded-full flex items-center justify-center text-white font-extrabold shadow-lg group-hover:scale-125 transition-transform duration-300">
                    {index + 1}
                  </div>
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-4 group-hover:text-brand transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-slate-700 leading-relaxed">{step.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
