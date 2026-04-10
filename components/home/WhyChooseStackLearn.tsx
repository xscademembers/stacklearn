const provenResults = [
  {
    heading: "98% Student Visa Success Rate",
    body:
      "Our structured documentation process and mock interview preparation significantly improve your chances of visa approval.",
  },
  {
    heading: "5000+ Students Successfully Guided",
    body:
      "From global university admissions to career-focused training, we have helped hundreds of students achieve their goals.",
  },
  {
    heading: "1000+ Students Trained",
    body:
      "We have successfully trained students in industry-relevant skills, helping them become job-ready and confident.",
  },
  {
    heading: "97% Admission and Career Success Rate",
    body:
      "With strategic guidance, strong applications, and practical training, our students achieve real results in both academics and professional careers.",
  },
];

const moreReasons = [
  {
    strong: "Complete support under one roof",
    rest:
      "From study abroad services to job-oriented training programs, we provide everything you need in one place.",
  },
  {
    strong: "Personalized guidance",
    rest:
      "Our approach is tailored based on your academic background, career goals, and interests.",
  },
  {
    strong: "Industry-relevant training programs",
    rest:
      "Our courses are designed based on current market demand to ensure better job opportunities.",
  },
  {
    strong: "End-to-end journey support",
    rest:
      "From your first counselling session to your final success, whether it is university admission or job placement, we support you at every step.",
  },
  {
    strong: "Experienced counsellors and expert trainers",
    rest:
      "Learn and get guided by professionals who understand both global education systems and industry requirements.",
  },
  {
    strong: "Proven track record",
    rest:
      "Trusted by hundreds of students who have successfully started their study abroad journey or built their careers through our training programs.",
  },
];

export default function WhyChooseStackLearn() {
  return (
    <section className="py-16 md:py-24 bg-[rgb(var(--color-bg-soft))]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            Why Choose <span className="gradient-text">StackLearn</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3">
            Choosing the right partner for your education and career journey can make all the
            difference. Whether you&apos;re planning to study abroad or build in-demand skills through
            training, the process can feel overwhelming, but you don&apos;t have to do it alone.
          </p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            At StackLearn, we provide complete support for both international education and
            job-oriented training, helping students confidently achieve their academic and career
            goals.
          </p>
        </div>

        <h3 className="mt-10 md:mt-12 text-center text-xl md:text-2xl font-bold text-slate-900">
          Proven Results You Can Trust
        </h3>

        <div className="mt-6 md:mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {provenResults.map((item) => (
            <div
              key={item.heading}
              className="rounded-2xl bg-[rgb(var(--color-surface))] shadow-sm border border-[rgb(var(--color-border))] px-6 py-7 flex flex-col text-left motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 motion-reduce:hover:translate-y-0"
            >
              <p className="text-base md:text-lg font-extrabold text-brand mb-2">{item.heading}</p>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed flex-1">{item.body}</p>
            </div>
          ))}
        </div>

        <div className="mt-10 mx-auto rounded-2xl bg-[rgb(var(--color-surface))] shadow-sm border border-[rgb(var(--color-border))] px-6 py-7 md:px-8 md:py-8 motion-safe:transition-all motion-safe:duration-300 motion-safe:hover:-translate-y-1 hover:shadow-lg hover:shadow-brand/15 motion-reduce:hover:translate-y-0 max-w-5xl">
          <h3 className="text-lg md:text-xl font-bold text-slate-900 mb-4 text-center md:text-left">
            More Reasons Students Choose StackLearn
          </h3>
          <ul className="grid gap-3 md:grid-cols-2 text-sm md:text-base text-slate-700">
            {moreReasons.map((item) => (
              <li key={item.strong} className="flex gap-2">
                <span
                  className="mt-1.5 h-1.5 w-1.5 rounded-full bg-brand shrink-0"
                  aria-hidden
                />
                <span>
                  <strong>{item.strong}</strong> – {item.rest}
                </span>
              </li>
            ))}
          </ul>
        </div>

        <p className="mt-10 text-center text-sm md:text-base text-slate-600 max-w-3xl mx-auto leading-relaxed">
          From choosing the right path to achieving your final goal, StackLearn stands as your
          trusted partner in building a successful future.
        </p>
      </div>
    </section>
  );
}
