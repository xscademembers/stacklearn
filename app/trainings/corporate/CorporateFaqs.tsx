const faqs = [
  {
    q: "What is corporate training?",
    a: "Corporate training helps employees improve their technical and professional skills through structured learning programs.",
  },
  {
    q: "Who can attend corporate training?",
    a: "Corporate training is designed for employees, teams, and professionals working in organizations.",
  },
  {
    q: "Can the training be customized for our company?",
    a: "Yes, StackLearn provides customized training programs based on your company's requirements and team skill levels.",
  },
  {
    q: "What training formats do you offer?",
    a: "We offer online training, on-site corporate workshops, and hybrid learning programs.",
  },
  {
    q: "What technologies do you provide training in?",
    a: "We provide training in RPA (UiPath), Data Science, SQL, Power BI, Artificial Intelligence, QA Automation, Python, and Cybersecurity.",
  },
  {
    q: "How long are the corporate training programs?",
    a: "Training duration depends on the program and can range from a few days to several weeks.",
  },
  {
    q: "Will employees receive certification?",
    a: "Yes, participants receive a StackLearn certification after completing the training.",
  },
  {
    q: "How can our company request corporate training?",
    a: "You can contact StackLearn to discuss your training needs and schedule a consultation.",
  },
  {
    q: "Do you provide corporate training for small teams?",
    a: "Yes, StackLearn offers training programs for both small teams and large organizations.",
  },
  {
    q: "Is the training practical or theory-based?",
    a: "Our training focuses on hands-on learning, real-world examples, and practical exercises.",
  },
  {
    q: "Can training schedules be adjusted for our employees?",
    a: "Yes, training schedules can be customized based on your organization's availability.",
  },
  {
    q: "Do you offer both IT and non-IT corporate training?",
    a: "Yes, StackLearn provides training in both IT technologies and professional skill development.",
  },
];

export default function CorporateFaqs() {
  return (
    <section className="py-16 md:py-20 bg-white">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-3xl mx-auto text-center mb-10">
          <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
        </div>

        <div className="max-w-5xl mx-auto grid gap-4 md:grid-cols-2">
          {faqs.map((faq, idx) => (
            <article
              key={faq.q}
              className="rounded-2xl border border-slate-200 bg-page-soft px-5 py-5 md:px-6 md:py-6"
            >
              <h3 className="text-sm md:text-base font-bold text-slate-900 mb-2">
                {idx + 1}. {faq.q}
              </h3>
              <p className="text-xs md:text-sm text-slate-600 leading-relaxed">{faq.a}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
