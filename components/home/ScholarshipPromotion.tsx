import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";

export default function ScholarshipPromotion() {
  return (
    <section className="py-16 md:py-24 text-white relative overflow-hidden">
      {/* Background: solid black + image with 50% opacity */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-black" />
        <Image
          src="https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="Graduation celebration"
          fill
          className="object-cover opacity-50"
        />
      </div>
      <div className="container mx-auto px-6 md:px-8 relative z-10">
        <div className="max-w-4xl mx-auto text-center py-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8">
            Apply for Scholarships worth <span className="text-accent-soft">₹10L+</span>
          </h2>
          <p className="text-lg md:text-xl lg:text-2xl mb-12 opacity-95 font-medium leading-relaxed max-w-3xl mx-auto">
            Find scholarships that match your profile and make your study abroad
            journey affordable.
          </p>
          <Link
            href="/scholarships"
            className="group inline-flex items-center gap-3 px-10 py-5 bg-white text-brand rounded-full font-bold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:bg-gray-50"
          >
            Check Eligibility
            <FiArrowRight className="w-6 h-6 group-hover:translate-x-2 transition-transform duration-300" />
          </Link>
        </div>
      </div>
    </section>
  );
}
