const points = [
  {
    title: "Personalized Profile Evaluation",
    body:
      "We carefully assess your academics, career goals, and budget to create a customized study abroad plan.",
  },
  {
    title: "Strategic University Shortlisting",
    body:
      "We help you select universities and courses that align with your long‑term career objectives.",
  },
  {
    title: "Complete Application Support",
    body:
      "From SOP and LOR guidance to accurate documentation, we make sure your application stands out.",
  },
  {
    title: "Loan & Scholarship Guidance",
    body:
      "We assist you in exploring education loans and scholarships so studying abroad stays affordable.",
  },
  {
    title: "Student Visa Assistance",
    body:
      "Our structured documentation process and visa preparation support improve your chances of approval.",
  },
  {
    title: "Pre‑Departure Support",
    body:
      "We guide you with travel planning, documentation checks, and everything you need before you fly.",
  },
  {
    title: "Accommodation Assistance",
    body:
      "We help you identify safe and suitable housing options close to your university campus.",
  },
  {
    title: "Post‑Arrival Guidance",
    body:
      "Our support continues with basic settlement advice so you can start your academic journey confidently.",
  },
];

export default function HowWeHelpSection() {
  return (
    <section className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            How <span className="gradient-text">We Help You</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3">
            Planning to study abroad can feel complex — from choosing the right university and
            course to arranging finances and managing student visa documentation.
          </p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            At StackLearn, we provide structured, end‑to‑end support designed to make your
            international education journey simple, clear, and successful.
          </p>
        </div>

        <div className="mt-10 grid gap-6 md:gap-8 md:grid-cols-2 xl:grid-cols-4">
          {points.map((item) => (
            <div
              key={item.title}
              className="h-full rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 flex flex-col transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15"
            >
              <div className="mb-3 flex items-center gap-2">
                <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold">
                  ✓
                </span>
                <h3 className="text-sm md:text-base font-semibold text-slate-900">
                  {item.title}
                </h3>
              </div>
              <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        <p className="mt-10 text-center text-sm md:text-base text-slate-600">
          From your first counselling session to your first day on campus, StackLearn stands as
          your trusted study abroad consultancy partner at every step.
        </p>
      </div>
    </section>
  );
}

