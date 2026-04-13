import type { ProvenResult, MoreReason } from "@/lib/cms-home-content";

export type WhyChooseCms = {
  titleLead: string;
  titleGradient: string;
  intro1: string;
  intro2: string;
  provenHeading: string;
  provenResults: ProvenResult[];
  moreReasonsHeading: string;
  moreReasons: MoreReason[];
  closing: string;
};

export default function WhyChooseStackLearn({ content }: { content: WhyChooseCms }) {
  return (
    <section className="py-16 md:py-24 bg-[rgb(var(--color-bg-soft))]">
      <div className="container mx-auto px-6 md:px-8">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed mb-3">
            {content.intro1}
          </p>
          <p className="text-base md:text-lg text-slate-700 leading-relaxed">
            {content.intro2}
          </p>
        </div>

        <h3 className="mt-10 md:mt-12 text-center text-xl md:text-2xl font-bold text-slate-900">
          {content.provenHeading}
        </h3>

        <div className="mt-6 md:mt-8 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {content.provenResults.map((item) => (
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
            {content.moreReasonsHeading}
          </h3>
          <ul className="grid gap-3 md:grid-cols-2 text-sm md:text-base text-slate-700">
            {content.moreReasons.map((item) => (
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
          {content.closing}
        </p>
      </div>
    </section>
  );
}
