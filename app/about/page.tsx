import Link from "next/link";
import Image from "next/image";
import { FiArrowRight, FiUsers, FiTarget, FiAward, FiGlobe } from "react-icons/fi";
import ITProjectsSection from "@/components/home/ITProjectsSection";

export default function AboutPage() {
  return (
    <div className="pb-0">
      {/* Hero Banner */}
      <section className="relative h-[500px] text-white flex items-center justify-center overflow-hidden">
        {/* Background image for visual interest */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating graduation abroad"
            fill
            priority
            className="object-cover"
          />
          <div className="absolute inset-0 bg-brand/60" />
        </div>

        {/* Soft light blobs on top of image */}
        <div className="absolute inset-0 z-[1] opacity-25 pointer-events-none">
          <div className="absolute top-20 left-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-20 right-20 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1.5s' }}></div>
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <h1 className="text-6xl md:text-7xl font-extrabold mb-6 drop-shadow-lg">Turning Global Dreams Into Reality</h1>
          <p className="text-xl md:text-2xl mb-10 font-medium max-w-3xl mx-auto leading-relaxed">
            At Stack Learn, we guide students to achieve their international education goals through expert counselling, transparent processes, and personalized training.
          </p>
          <Link
            href="/contact"
            className="inline-block px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 transform"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>

      {/* Our Journey (Timeline) */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">
            Our <span className="gradient-text">Journey</span>
          </h2>
          <div className="max-w-4xl mx-auto border-l-2 border-brand-soft pl-6 space-y-8 md:space-y-10">
            {[
              {
                year: "2020",
                title: "Founded with a vision",
                desc: "Started Stack Learn to simplify and personalize study abroad guidance.",
              },
              {
                year: "2021",
                title: "Global university partnerships",
                desc: "Partnered with leading universities across the UK and USA.",
              },
              {
                year: "2022",
                title: "Test prep launched",
                desc: "Introduced IELTS and GRE test preparation programs for ambitious students.",
              },
              {
                year: "2023",
                title: "Expanded into trainings",
                desc: "Launched corporate and technical trainings to bridge the skill gap.",
              },
              {
                year: "2024",
                title: "Global branches & success tracking",
                desc: "Set up global branches and introduced a visa success tracking system.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="relative pl-6 pb-2 group"
              >
                <div className="absolute -left-[9px] top-1 w-4 h-4 rounded-full bg-white border-2 border-primary-500 group-hover:bg-primary-500 transition-all" />
                <div className="flex flex-col md:flex-row md:items-baseline md:gap-6">
                  <span className="text-sm font-semibold uppercase tracking-wide text-primary-600">
                    {item.year}
                  </span>
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 mb-1">
                      {item.title}
                    </h3>
                    <p className="text-slate-700">
                      {item.desc}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-soft p-10 rounded-2xl border-2 border-brand-soft hover:shadow-2xl hover:shadow-brand/20 transition-all duration-300 hover-lift">
              <div className="w-16 h-16 bg-brand rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <FiTarget className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Mission</h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                To empower students with authentic guidance, personalized learning, and trusted global opportunities.
              </p>
            </div>
            <div className="bg-accent-soft p-10 rounded-2xl border-2 border-accent-soft hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 hover-lift">
              <div className="w-16 h-16 bg-accent rounded-xl flex items-center justify-center mb-6 shadow-lg">
                <FiGlobe className="w-8 h-8 text-white" />
              </div>
              <h2 className="text-3xl font-extrabold text-slate-900 mb-4">Our Vision</h2>
              <p className="text-slate-700 text-lg leading-relaxed">
                To become India’s most trusted study abroad and training partner, enabling 10,000+ students to achieve global success.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-5xl font-extrabold text-center text-slate-900 mb-16">
            Our Core <span className="gradient-text">Values</span>
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            {[
              { title: "Integrity", desc: "Transparent process in every step" },
              { title: "Commitment", desc: "100% student-first approach" },
              { title: "Innovation", desc: "Continuous improvement through digital tools" },
              { title: "Success", desc: "Student achievements define our growth" },
            ].map((value, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl text-center shadow-lg hover:shadow-2xl border-2 border-transparent hover:border-brand-soft transition-all duration-300 hover-lift group">
                <div className="w-16 h-16 bg-brand rounded-xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <FiAward className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-2xl font-bold text-slate-900 mb-3 group-hover:text-primary-600 transition-colors duration-300">{value.title}</h3>
                <p className="text-slate-700 leading-relaxed">{value.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IT Projects Showcase */}
      <ITProjectsSection />

      {/* Meet the Team */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">
            Meet the <span className="gradient-text">Team</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-center mb-12">
            A passionate group of counsellors, trainers, and visa experts dedicated to guiding you at every step of your global journey.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                name: "Ananya Sharma",
                role: "Senior Study Abroad Counsellor",
              },
              {
                name: "Rahul Verma",
                role: "Visa & Compliance Specialist",
              },
              {
                name: "Meera Iyer",
                role: "Test Prep Head (IELTS & GRE)",
              },
              {
                name: "Aditya Rao",
                role: "Corporate Training Lead",
              },
            ].map((member, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-6 text-center shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-24 h-24 rounded-full bg-brand mx-auto mb-4 flex items-center justify-center text-white text-2xl font-bold">
                  {member.name.charAt(0)}
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-1">{member.name}</h3>
                <p className="text-sm font-medium text-primary-600 mb-3">{member.role}</p>
                <button
                  type="button"
                  className="inline-flex items-center justify-center text-sm font-semibold text-slate-700 hover:text-primary-600 transition-colors"
                >
                  View LinkedIn
                </button>
              </div>
            ))}
          </div>
          <div className="text-center mt-10">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-8 py-4 bg-brand text-white rounded-full font-semibold hover:shadow-xl transition-all"
            >
              Meet Our Counsellors
            </Link>
          </div>
        </div>
      </section>

      {/* Partners & Collaborations */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-6">
            Our <span className="gradient-text">Global Network</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-3xl mx-auto text-center mb-12">
            We proudly collaborate with leading universities, language test providers, and training partners across the UK, USA, Canada, Australia, and beyond.
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-6 items-center justify-items-center">
            {[
              "UK Universities",
              "USA Universities",
              "Canada Universities",
              "Australia Universities",
              "IELTS Partner",
              "TOEFL Partner",
            ].map((partner, index) => (
              <div
                key={index}
                className="w-full h-20 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-sm font-semibold text-slate-700 hover:border-primary-400 hover:shadow-md transition-all duration-300"
              >
                {partner}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Achievements & Recognitions (Future) */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl md:text-5xl font-extrabold text-center text-slate-900 mb-12">
            Achievements & <span className="gradient-text">Recognitions</span>
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "Top Rated Agency – 2024",
                desc: "Recognized for student satisfaction, transparency, and successful admissions.",
              },
              {
                title: "High Visa Success",
                desc: "Consistently strong visa outcomes for students heading to Canada, UK, USA, and more.",
              },
              {
                title: "100+ Global Partners",
                desc: "A growing network of universities, colleges, and training organizations worldwide.",
              },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-gray-50 rounded-2xl p-8 shadow-md hover:shadow-2xl hover:-translate-y-2 transition-all duration-300"
              >
                <div className="w-12 h-12 rounded-full bg-brand flex items-center justify-center mb-4">
                  <FiAward className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-slate-700">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Corporate & Training Divisions */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-gray-900 mb-6">
                Corporate & Training Divisions
              </h2>
              <p className="text-lg text-gray-600 mb-6">
                Stack Learn now offers career-oriented Technical, Non-Technical, and Corporate Training programs designed to prepare students for global job markets.
              </p>
              <Link
                href="/trainings"
                className="inline-block px-8 py-4 bg-brand text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Explore Trainings
              </Link>
            </div>
            <div className="relative rounded-xl h-64 overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"
                alt="Corporate training session"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Global Presence & Branches */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-4xl font-bold text-slate-900 mb-6">
                Global Presence & Branches
              </h2>
              <p className="text-lg text-slate-600 mb-6">
                Stack Learn operates across multiple Indian cities, connecting students to experts nationwide and enabling access to global universities.
              </p>
              <p className="text-slate-600 mb-6">
                Whether you are in a metro city or a growing town, our counsellors and digital platforms ensure you receive the same high-quality guidance.
              </p>
              <Link
                href="/branches"
                className="inline-block px-8 py-4 bg-brand text-white rounded-full font-semibold hover:shadow-lg transition-all"
              >
                Find Your Nearest Branch
              </Link>
            </div>
            <div className="relative h-72 rounded-2xl overflow-hidden">
              <Image
                src="https://images.unsplash.com/photo-1526778548025-fa2f459cd5c1?w=800"
                alt="Global presence map"
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-brand/60 flex items-center justify-center">
                <FiGlobe className="w-24 h-24 text-white opacity-90" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="relative pt-20 pb-0 text-white overflow-hidden">
        {/* Background image */}
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.pexels.com/photos/267885/pexels-photo-267885.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt="Students celebrating graduation success"
            fill
            className="object-cover"
          />
          <div className="absolute inset-0 bg-accent/70" />
        </div>
        <div className="absolute inset-0 z-[1] opacity-10 pointer-events-none">
          <div className="absolute top-10 left-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float"></div>
          <div className="absolute bottom-10 right-10 w-64 h-64 bg-white rounded-full blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
        </div>
        <div className="container mx-auto px-4 text-center relative z-10">
          <h2 className="text-5xl md:text-6xl font-extrabold mb-6 drop-shadow-lg">
            Join thousands of successful students who trusted Stack Learn
          </h2>
          <Link
            href="/contact"
            className="inline-block mt-6 px-10 py-5 bg-white text-primary-600 rounded-full font-bold text-lg hover:shadow-2xl hover:scale-110 transition-all duration-300 transform"
          >
            Work With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
