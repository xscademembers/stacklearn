import Link from "next/link";
import {
  FiUser,
  FiFileText,
  FiEdit,
  FiDollarSign,
  FiHome,
  FiShield,
} from "react-icons/fi";

const services = [
  {
    icon: FiUser,
    title: "Profile Evaluation",
    description: "Detailed academic and career assessment to identify the best countries and universities for your profile.",
    href: "/services/profile-evaluation",
  },
  {
    icon: FiFileText,
    title: "Admission Assistance",
    description: "Strategic university shortlisting, complete application submission, and offer letter tracking for top global universities.",
    href: "/services/admission-assistance",
  },
  {
    icon: FiEdit,
    title: "SOP & LOR Writing",
    description: "Professionally structured Statement of Purpose and Letter of Recommendation assistance to strengthen your application.",
    href: "/services/sop-lor",
  },
  {
    icon: FiShield,
    title: "Student Visa Assistance",
    description: "Complete student visa documentation support, financial guidance, and interview preparation.",
    href: "/services/visa-assistance",
  },
  {
    icon: FiHome,
    title: "Accommodation Assistance",
    description: "Safe and affordable student accommodation guidance near your university campus.",
    href: "/services/accommodation",
  },
  {
    icon: FiDollarSign,
    title: "Education Loan Assistance",
    description: "Guidance on secured and unsecured education loans to fund your study abroad dream.",
    href: "/services/education-loan",
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
            Complete overseas education services designed to support you at every stage
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
                    <span className="group-hover:translate-x-1 transition-transform duration-300">&rarr;</span>
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
