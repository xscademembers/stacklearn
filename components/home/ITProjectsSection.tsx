import Link from "next/link";

const projects = [
  {
    title: "Study Abroad Lead Management Portal",
    tech: "Next.js · TypeScript · Tailwind CSS",
    description:
      "End-to-end portal to capture enquiries, manage leads, and track counselling stages for students planning to study abroad.",
    highlights: [
      "Lead capture forms with validation and API integration",
      "Pipeline-style status tracking for each student",
      "Responsive, minimal UI using your green and orange theme",
    ],
  },
  {
    title: "IELTS & Test Prep Booking System",
    tech: "React · Node.js · REST API",
    description:
      "Scheduling system for students to book IELTS / GRE / TOEFL batches with automated slot management.",
    highlights: [
      "Time-slot selection and basic availability logic",
      "Email-style confirmation flow (ready for real integration)",
      "Clean card-based layout for batches and timings",
    ],
  },
  {
    title: "Scholarship Finder Mini-App",
    tech: "Next.js · Server Components",
    description:
      "Frontend to browse and filter scholarships by country, degree level, and deadline, inspired by real study-abroad portals.",
    highlights: [
      "Filter controls with instant UI updates",
      "Accessible, table-based listing for scholarship details",
      "Flat design with balanced green and orange accents",
    ],
  },
  {
    title: "Branches & Counsellor Locator",
    tech: "React · Map Embed · Tailwind CSS",
    description:
      "Section to showcase different branches and allow students to quickly find the nearest counselling centre.",
    highlights: [
      "Branch cards with contact links and directions",
      "Map placeholder ready for Google Maps integration",
      "Consistent spacing and semantic HTML structure",
    ],
  },
];

export default function ITProjectsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-5xl font-extrabold text-slate-900 mb-4">
            IT <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-xl text-slate-700 font-medium max-w-3xl mx-auto">
            A quick look at the practical projects I have built around study
            abroad, counselling and training workflows.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 lg:gap-10">
          {projects.map((project, index) => (
            <article
              key={project.title}
              className="bg-white border border-border rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover-lift flex flex-col h-full"
            >
              <div className="p-6 lg:p-7 flex flex-col gap-4 flex-1">
                <header>
                  <h3 className="text-2xl font-bold text-slate-900 mb-1">
                    {project.title}
                  </h3>
                  <p className="text-sm font-semibold text-brand">
                    {project.tech}
                  </p>
                </header>
                <p className="text-slate-700 leading-relaxed">
                  {project.description}
                </p>
                <ul className="mt-2 space-y-2">
                  {project.highlights.map((item) => (
                    <li
                      key={item}
                      className="flex items-start gap-2 text-sm text-slate-700"
                    >
                      <span className="mt-1 h-2 w-2 rounded-full bg-accent flex-shrink-0" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-10">
          <Link
            href="/contact"
            className="inline-block px-8 py-4 bg-brand text-white rounded-full font-semibold hover:shadow-xl hover:shadow-brand/40 transition-all"
          >
            Discuss These Projects
          </Link>
        </div>
      </div>
    </section>
  );
}
