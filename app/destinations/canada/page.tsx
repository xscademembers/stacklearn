import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";

const universities = [
  { name: "University of Toronto", info: "Top-ranked for Research & Innovation", initials: "UT", color: "bg-blue-700" },
  { name: "University of British Columbia", info: "Excellent for Engineering & Sciences", initials: "UBC", color: "bg-blue-600" },
  { name: "McGill University", info: "Renowned for Medicine & Law", initials: "MG", color: "bg-red-600" },
  { name: "University of Alberta", info: "Strong in Engineering Programs", initials: "UA", color: "bg-green-600" },
  { name: "McMaster University", info: "Top for Health Sciences", initials: "MM", color: "bg-red-700" },
  { name: "University of Waterloo", info: "Excellent for Computer Science", initials: "UW", color: "bg-yellow-600" },
];

const courses = [
  { name: "Engineering", duration: "2-4 years", fee: "CAD $20,000-$35,000/year" },
  { name: "Computer Science", duration: "2-4 years", fee: "CAD $22,000-$40,000/year" },
  { name: "Business Administration", duration: "2 years", fee: "CAD $25,000-$45,000/year" },
  { name: "Healthcare & Nursing", duration: "2-4 years", fee: "CAD $20,000-$35,000/year" },
  { name: "Data Analytics", duration: "1-2 years", fee: "CAD $22,000-$38,000/year" },
];

const scholarships = [
  { name: "Vanier Canada Graduate Scholarship", eligibility: "PhD students", amount: "$50,000/year", deadline: "November 2025" },
  { name: "Canada-ASEAN Scholarships", eligibility: "ASEAN students", amount: "Full funding", deadline: "March 2025" },
];

export default function CanadaPage() {
  return (
    <div className="pb-0">
      {/* Hero Banner */}
      <section className="relative h-[480px] text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600"
            alt="Canadian city skyline"
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Image src="https://flagcdn.com/w80/ca.png" alt="Canada Flag" width={64} height={44} className="rounded shadow-lg" />
          </div>
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">Study in Canada</h1>
          <p className="text-xl md:text-2xl mb-10 font-medium max-w-3xl mx-auto">Affordable education with excellent post-graduation work opportunities.</p>
          <BookConsultButton variant="white" className="text-lg font-bold">
            Talk to Canada Expert
          </BookConsultButton>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid md:grid-cols-4 gap-6 md:gap-8">
            {[
              { label: "Tuition Range", value: "CAD $15,000–$30,000/year" },
              { label: "Living Cost", value: "CAD $10,000–$15,000/year" },
              { label: "Visa Processing", value: "4–6 weeks" },
              { label: "Post-Study Work", value: "Up to 3 years" },
            ].map((fact, index) => (
              <div key={index} className="bg-brand-soft p-8 rounded-xl text-center border border-brand-soft hover:shadow-lg transition-all duration-300">
                <div className="text-2xl font-bold text-brand mb-3">{fact.value}</div>
                <div className="text-slate-700 font-medium">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Study in Canada */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Why Study in <span className="gradient-text">Canada</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-5">
            {[
              "Post-graduation work permit up to 3 years",
              "Affordable tuition fees compared to other countries",
              "High quality of life and safety",
              "Immigration pathways after graduation",
              "Multicultural and welcoming environment",
            ].map((point, index) => (
              <div key={index} className="flex items-center gap-5 bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-12 h-12 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                  <FiCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg text-slate-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Top <span className="gradient-text">Universities</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {universities.map((uni, index) => (
              <div key={index} className="bg-white p-8 rounded-xl border border-gray-200 hover:border-brand hover:shadow-xl transition-all duration-300 hover-lift">
                <div className={`h-16 w-16 mb-6 rounded-xl ${uni.color} flex items-center justify-center text-white font-bold text-lg mx-auto`}>
                  {uni.initials}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3 text-center">{uni.name}</h3>
                <p className="text-slate-600 mb-6 text-center">{uni.info}</p>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 text-brand font-bold hover:gap-3 transition-all duration-300 w-full justify-center"
                >
                  Apply Now
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-16 md:py-24 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {courses.map((course, index) => (
              <div key={index} className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-primary-200 transition-all duration-300 hover-lift">
                <h3 className="text-xl font-bold text-slate-900 mb-4">{course.name}</h3>
                <p className="text-slate-600 mb-3"><strong>Duration:</strong> {course.duration}</p>
                <p className="text-slate-600 mb-6"><strong>Average Fee:</strong> {course.fee}</p>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all duration-300"
                >
                  Learn More
                  <FiArrowRight className="w-5 h-5" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Scholarships */}
      <section className="py-16 md:py-24 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Scholarships for <span className="gradient-text">Canada Students</span>
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="p-5 text-left font-bold">Scholarship Name</th>
                  <th className="p-5 text-left font-bold">Eligibility</th>
                  <th className="p-5 text-left font-bold">Amount</th>
                  <th className="p-5 text-left font-bold">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship, index) => (
                  <tr key={index} className="border-b hover:bg-primary-50 transition-colors">
                    <td className="p-5 font-bold text-slate-900">{scholarship.name}</td>
                    <td className="p-5 text-slate-700">{scholarship.eligibility}</td>
                    <td className="p-5 text-slate-700">{scholarship.amount}</td>
                    <td className="p-5 text-slate-700">{scholarship.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-10">
            <Link
              href="/scholarships"
              className="inline-block px-10 py-5 bg-brand text-white rounded-full font-bold hover:shadow-xl hover:shadow-brand/40 hover:scale-105 transition-all duration-300 transform"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-16 md:py-24 text-white overflow-hidden">
        {/* Background: solid black + image with 50% opacity */}
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Toronto skyline at night"
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-6 md:px-8 text-center relative z-10 py-8">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-10 drop-shadow-2xl leading-tight">
            Start Your Journey to Study in Canada Today
          </h2>
          <BookConsultButton variant="white" className="text-lg md:text-xl font-bold">
            Speak with Canada Expert
          </BookConsultButton>
        </div>
      </section>
    </div>
  );
}
