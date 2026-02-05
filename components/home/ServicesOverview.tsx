import Link from "next/link";
import {
  FiUser,
  FiFileText,
  FiEdit,
  FiDollarSign,
  FiHome,
  FiBook,
  FiCreditCard,
  FiSend,
} from "react-icons/fi";

const services = [
  {
    icon: FiUser,
    title: "Profile Evaluation",
    description: "Assess your academic background and goals.",
    href: "/services/counselling",
  },
  {
    icon: FiFileText,
    title: "Admissions Assistance",
    description: "End-to-end support for university applications.",
    href: "/services/counselling",
  },
  {
    icon: FiEdit,
    title: "SOP & LOR Writing",
    description: "Professional writing support for impactful documents.",
    href: "/services/sop-lor",
  },
  {
    icon: FiDollarSign,
    title: "Scholarship Guidance",
    description: "Find and apply for suitable funding opportunities.",
    href: "/scholarships",
  },
  {
    icon: FiHome,
    title: "Accommodation Support",
    description: "Find verified student housing near universities.",
    href: "/services/accommodation",
  },
  {
    icon: FiBook,
    title: "Test Preparation",
    description: "Coaching for IELTS, GRE, GMAT, and TOEFL.",
    href: "/test-prep",
  },
];

export default function ServicesOverview() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="text-center mb-12 md:mb-16">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-6">
            Our <span className="gradient-text">Services</span>
          </h2>
          <p className="text-lg md:text-xl text-slate-700 font-medium max-w-2xl mx-auto">
            Comprehensive support for your study abroad journey
          </p>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {services.map((service, index) => (
            <Link
              key={index}
              href={service.href}
              className="group p-6 md:p-8 bg-white border-2 border-gray-200 rounded-2xl hover:border-brand hover:shadow-2xl hover:shadow-brand/20 transition-all duration-300 hover-lift"
            >
              <div className="flex items-start gap-5">
                <div className="p-4 bg-brand-soft rounded-xl group-hover:bg-brand transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
                  <service.icon className="w-7 h-7 text-brand group-hover:text-white transition-colors duration-300" />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-bold text-slate-900 mb-3 group-hover:text-brand transition-colors duration-300">
                    {service.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">{service.description}</p>
                  <span className="inline-flex items-center gap-2 mt-5 text-brand font-semibold group-hover:gap-3 transition-all duration-300">
                    Learn More
                    <span className="group-hover:translate-x-1 transition-transform duration-300">→</span>
                  </span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
