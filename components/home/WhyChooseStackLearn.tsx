const highlights = [
  {
    heading: "98% Student Visa Success Rate",
    body:
      "Structured documentation guidance and mock interview preparation improve your chances of visa approval.",
  },
  {
    heading: "500+ Global University Network",
    body:
      "Connections with recognized universities across the UK, USA, Canada, Australia, Germany, and more.",
  },
  {
    heading: "97% Admission Success Rate",
    body:
      "Strategic profile positioning and strong applications help students secure admission into preferred universities.",
  },
];

export default function WhyChooseStackLearn() {
  return (
    <section className="py-16 md:py-24 bg-page-soft">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Why Choose <span className="gradient-text">StackLearn</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3">
            Finding the right country, selecting the best university, arranging education loans, and
            managing student visa documentation can feel overwhelming — but you don&apos;t need to
            do it alone.
          </p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            As a trusted study abroad consultancy, StackLearn has helped{" "}
            <strong>500+ students</strong> secure admissions in top universities across the UK,
            USA, Canada, Australia, and Germany.
          </p>
        </div>

        {/* Stats row */}
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.heading}
              className="rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-7 flex flex-col text-left transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15"
            >
              <p className="text-base md:text-lg font-extrabold text-brand mb-2">
                {item.heading}
              </p>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed flex-1">
                {item.body}
              </p>
            </div>
          ))}
        </div>

        {/* Supporting reasons */}
        <div className="mt-10 mx-auto rounded-2xl bg-white shadow-sm border border-slate-200 px-6 py-7 md:px-8 md:py-8 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4">
            More reasons students trust StackLearn
          </h3>
          <ul className="grid gap-3 md:grid-cols-2 text-sm md:text-base text-slate-700">
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
              <span>
                <strong>Complete services under one roof</strong> – profile evaluation, shortlisting,
                test prep, loan assistance, accommodation, and more.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
              <span>
                <strong>Personalized counselling</strong> – guidance tailored to your academics,
                career goals, and financial planning.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
              <span>
                <strong>End‑to‑end journey support</strong> – from your first counselling session to
                pre‑departure and post‑arrival guidance.
              </span>
            </li>
            <li className="flex gap-2">
              <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
              <span>
                <strong>Trusted by 500+ students</strong> – hundreds of learners have already
                started their global education journey with StackLearn.
              </span>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
}

