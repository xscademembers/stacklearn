import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiCheck } from "react-icons/fi";

const universities = [
  { name: "MIT", info: "Top-ranked for Engineering & Technology" },
  { name: "Harvard University", info: "Renowned for Business & Law" },
  { name: "Stanford University", info: "Excellent for Computer Science" },
  { name: "University of California", info: "Strong in Research Programs" },
  { name: "Columbia University", info: "Top for Business & Journalism" },
  { name: "Yale University", info: "Renowned for Liberal Arts" },
];

const courses = [
  { name: "Engineering", duration: "2-4 years", fee: "$30,000-$50,000/year" },
  { name: "Computer Science", duration: "2-4 years", fee: "$35,000-$55,000/year" },
  { name: "Business Administration (MBA)", duration: "2 years", fee: "$40,000-$70,000/year" },
  { name: "Medicine", duration: "4 years", fee: "$50,000-$80,000/year" },
  { name: "Data Science", duration: "1-2 years", fee: "$35,000-$60,000/year" },
];

const scholarships = [
  { name: "Fulbright Scholarship", eligibility: "Graduate students", amount: "Full funding", deadline: "October 2025" },
  { name: "Hubert H. Humphrey Fellowship", eligibility: "Mid-career professionals", amount: "Full funding", deadline: "Varies" },
];

export default function USAPage() {
  return (
    <div className="pb-0">
      {/* Hero Banner */}
      <section className="relative h-96 text-white flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="City skyline in the United States"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/60" />
        </div>
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 drop-shadow-lg">Study in the United States</h1>
          <p className="text-xl md:text-2xl mb-8 font-medium">World-class research opportunities and diverse course options.</p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 transform"
          >
            Talk to USA Expert
          </Link>
        </div>
      </section>

      {/* Quick Facts */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { label: "Tuition Range", value: "$20,000–$60,000/year" },
              { label: "Living Cost", value: "$12,000–$18,000/year" },
              { label: "Visa Processing", value: "2–3 months" },
              { label: "Post-Study Work", value: "OPT up to 3 years" },
            ].map((fact, index) => (
              <div key={index} className="bg-brand-soft p-6 rounded-xl text-center border border-brand-soft hover:shadow-lg transition-all duration-300">
                <div className="text-2xl font-bold text-brand mb-2">{fact.value}</div>
                <div className="text-slate-700 font-medium">{fact.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Why Study in USA */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-8 text-center">
            Why Study in the <span className="gradient-text">United States</span>
          </h2>
          <div className="max-w-3xl mx-auto space-y-4">
            {[
              "World-class research opportunities and facilities",
              "Diverse course options across all fields",
              "Strong career prospects and networking",
              "Flexible education system",
              "Global recognition and prestige",
            ].map((point, index) => (
              <div key={index} className="flex items-center gap-4 bg-white p-5 rounded-xl shadow-md hover:shadow-lg transition-all duration-300">
                <div className="w-10 h-10 bg-brand rounded-full flex items-center justify-center flex-shrink-0">
                  <FiCheck className="w-6 h-6 text-white" />
                </div>
                <span className="text-lg text-slate-700 font-medium">{point}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top Universities */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Top <span className="gradient-text">Universities</span>
          </h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {universities.map((uni, index) => (
              <div key={index} className="bg-white p-6 rounded-xl border border-gray-200 hover:border-brand hover:shadow-xl transition-all duration-300 hover-lift">
                <h3 className="text-xl font-bold text-slate-900 mb-2">{uni.name}</h3>
                <p className="text-slate-600 mb-4">{uni.info}</p>
                <Link
                  href="/apply"
                  className="inline-flex items-center gap-2 text-primary-600 font-bold hover:gap-3 transition-all duration-300"
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
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Popular <span className="gradient-text">Courses</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-6">
            {courses.map((course, index) => (
              <div key={index} className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl border border-gray-100 hover:border-primary-200 transition-all duration-300 hover-lift">
                <h3 className="text-xl font-bold text-slate-900 mb-3">{course.name}</h3>
                <p className="text-slate-600 mb-2"><strong>Duration:</strong> {course.duration}</p>
                <p className="text-slate-600 mb-4"><strong>Average Fee:</strong> {course.fee}</p>
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
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-12 text-center">
            Scholarships for <span className="gradient-text">USA Students</span>
          </h2>
          <div className="max-w-4xl mx-auto overflow-x-auto">
            <table className="w-full border-collapse rounded-xl overflow-hidden shadow-lg">
              <thead>
                <tr className="bg-brand text-white">
                  <th className="p-4 text-left font-bold">Scholarship Name</th>
                  <th className="p-4 text-left font-bold">Eligibility</th>
                  <th className="p-4 text-left font-bold">Amount</th>
                  <th className="p-4 text-left font-bold">Deadline</th>
                </tr>
              </thead>
              <tbody>
                {scholarships.map((scholarship, index) => (
                  <tr key={index} className="border-b hover:bg-primary-50 transition-colors">
                    <td className="p-4 font-bold text-slate-900">{scholarship.name}</td>
                    <td className="p-4 text-slate-700">{scholarship.eligibility}</td>
                    <td className="p-4 text-slate-700">{scholarship.amount}</td>
                    <td className="p-4 text-slate-700">{scholarship.deadline}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <div className="text-center mt-8">
            <Link
              href="/scholarships"
              className="inline-block px-8 py-4 bg-brand text-white rounded-full font-bold hover:shadow-xl hover:shadow-brand/40 hover:scale-110 transition-all duration-300 transform"
            >
              Check Your Eligibility
            </Link>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="relative py-20 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Graduation celebration"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>
        <div className="absolute inset-0 z-[1] opacity-20 pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-72 h-72 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10 py-12">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold mb-8 drop-shadow-2xl leading-tight">
            Start Your Journey to Study in the USA Today
          </h2>
          <Link
            href="/contact"
            className="inline-block mt-4 px-12 py-4 bg-white text-primary-600 rounded-full font-bold text-lg md:text-xl hover:shadow-2xl hover:scale-105 transition-all duration-300 transform hover:bg-gray-50"
          >
            Speak with USA Expert
          </Link>
        </div>
      </section>
    </div>
  );
}
