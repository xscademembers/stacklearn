import Link from "next/link";
import Image from "next/image";
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
    title: "Admissions Assistance",
    description: "End-to-end support for university applications, documentation, and communication.",
    href: "/services/counselling",
  },
  {
    icon: FiFileText,
    title: "Visa Assistance",
    description: "Expert guidance for visa documentation, interview preparation, and approvals.",
    href: "/services/visa",
  },
  {
    icon: FiEdit,
    title: "SOP & LOR Writing",
    description: "Professional writing support to create impactful Statements of Purpose and Letters of Recommendation.",
    href: "/services/sop-lor",
  },
  {
    icon: FiDollarSign,
    title: "Scholarship Guidance",
    description: "Personalized help in finding and applying for suitable scholarships and funding opportunities.",
    href: "/scholarships",
  },
  {
    icon: FiHome,
    title: "Accommodation Support",
    description: "Assistance in finding affordable and verified student housing near the university.",
    href: "/services/accommodation",
  },
  {
    icon: FiBook,
    title: "Test Preparation",
    description: "Comprehensive coaching for IELTS, GRE, GMAT, and TOEFL exams.",
    href: "/test-prep",
  },
  {
    icon: FiCreditCard,
    title: "Education Loan Assistance",
    description: "Guidance in securing education loans with trusted financial partners.",
    href: "/services/loan",
  },
  {
    icon: FiSend,
    title: "Pre-Departure Counselling",
    description: "Travel, insurance, and cultural orientation support before students fly abroad.",
    href: "/services/pre-departure",
  },
];

const processSteps = [
  { title: "Profile Counselling", desc: "Understanding goals and academic history." },
  { title: "University Shortlisting", desc: "Matching courses and countries." },
  { title: "Application Process", desc: "Guiding document preparation and submissions." },
  { title: "Visa Assistance", desc: "Ensuring successful visa filing and interviews." },
  { title: "Post-Departure Support", desc: "Helping with accommodation and transition abroad." },
];

export default function ServicesPage() {
  return (
    <div className="pb-0">
      {/* Hero */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1600"
            alt="Students in counselling session"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/60" />
        </div>
        {/* Soft light blobs */}
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl font-bold mb-4">We Guide You Through Every Step</h1>
          <p className="text-xl mb-8 max-w-3xl mx-auto">
            From course selection to visa success, Stack Learn provides complete study abroad assistance under one roof.
          </p>
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {services.map((service, index) => (
              <Link
                key={index}
                href={service.href}
                className="group p-6 bg-white border-2 border-gray-200 rounded-xl hover:border-primary-500 hover:shadow-lg transition-all text-center"
              >
                <div className="flex justify-center mb-4">
                  <div className="p-3 bg-primary-100 rounded-lg group-hover:bg-primary-600 transition-colors">
                    <service.icon className="w-8 h-8 text-primary-600 group-hover:text-white transition-colors" />
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors">
                  {service.title}
                </h3>
                <p className="text-gray-600 text-sm">{service.description}</p>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Process Overview */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">Our Process</h2>
          <div className="grid md:grid-cols-5 gap-6 max-w-6xl mx-auto">
            {processSteps.map((step, index) => (
              <div key={index} className="text-center">
                <div className="w-16 h-16 bg-brand rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
                  {index + 1}
                </div>
                <h3 className="font-semibold text-gray-900 mb-2">{step.title}</h3>
                <p className="text-sm text-gray-600">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Value Highlights */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "One-to-One Counselling", desc: "Dedicated mentor for every student" },
              { title: "Global University Partnerships", desc: "Direct tie-ups with leading institutions" },
              { title: "High Visa Success Rate", desc: "97% approval record" },
              { title: "Affordable Service Packages", desc: "Transparent pricing, no hidden costs" },
            ].map((highlight, index) => (
              <div key={index} className="bg-gray-50 p-6 rounded-xl text-center">
                <h3 className="text-xl font-semibold text-gray-900 mb-2">{highlight.title}</h3>
                <p className="text-gray-600">{highlight.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Student Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-12">What Our Students Say</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sai Kumar",
                destination: "MSc in Computer Science, UK",
                quote:
                  "Stack Learn made my visa process completely stress-free — they took care of every document and step.",
              },
              {
                name: "Priya Sharma",
                destination: "MBA, Canada",
                quote:
                  "From shortlisting universities to getting my offer letter, the team guided me like a mentor.",
              },
              {
                name: "Rahul Patel",
                destination: "MEng, Australia",
                quote:
                  "Their one-to-one counselling and transparent support helped me choose the right course and country.",
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="bg-white p-8 rounded-2xl shadow-md hover:shadow-2xl transition-all duration-300 flex flex-col justify-between"
              >
                <p className="text-gray-700 italic mb-6">
                  &ldquo;{testimonial.quote}&rdquo;
                </p>
                <div>
                  <p className="font-bold text-gray-900">{testimonial.name}</p>
                  <p className="text-sm text-primary-600">{testimonial.destination}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating graduation"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-4xl font-bold mb-4">Get Expert Support for Every Step</h2>
          <Link
            href="/contact"
            className="inline-block mt-6 px-8 py-4 bg-white text-primary-600 rounded-full font-semibold hover:shadow-xl transition-all"
          >
            Talk to Our Counsellors
          </Link>
        </div>
      </section>
    </div>
  );
}
