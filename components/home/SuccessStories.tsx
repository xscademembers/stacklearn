import Link from "next/link";
import { FiArrowRight } from "react-icons/fi";
import type { PublicSuccessStory } from "@/lib/get-success-stories";

export type SuccessStoriesCms = {
  titleLead: string;
  titleGradient: string;
  subheading: string;
};

type Props = {
  content: SuccessStoriesCms;
  stories: PublicSuccessStory[];
};

export default function SuccessStories({ content, stories }: Props) {
  if (stories.length === 0) return null;

  return (
    <section className="py-16 md:py-24 bg-page-soft" aria-labelledby="home-success-stories-heading">
      <div className="container mx-auto px-4 md:px-8">
        <header className="text-center mb-10 md:mb-14 max-w-3xl mx-auto">
          <h2 id="home-success-stories-heading" className="text-3xl md:text-5xl font-extrabold text-foreground mb-4 text-balance">
            {content.titleLead}{" "}
            <span className="gradient-text">{content.titleGradient}</span>
          </h2>
          <p className="text-base md:text-xl text-foreground-muted font-medium">{content.subheading}</p>
        </header>

        <ul className="grid gap-4 md:gap-6 grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 list-none p-0 m-0 max-w-7xl mx-auto">
          {stories.map((s) => (
            <li key={s._id}>
              <article className="h-full flex flex-col rounded-2xl border border-border bg-surface p-6 shadow-sm transition-shadow motion-reduce:transition-none hover:shadow-md">
                <div className="flex flex-col items-center text-center mb-4">
                  <div className="relative mb-4">
                    <div className="relative w-28 h-28 rounded-full overflow-hidden ring-4 ring-brand/15 bg-page-soft">
                      {s.imageUrl ? (
                        // eslint-disable-next-line @next/next/no-img-element
                        <img src={s.imageUrl} alt="" className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-foreground-muted text-xs font-medium px-2">
                          No photo
                        </div>
                      )}
                    </div>
                    <span
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full bg-accent text-white text-xs font-bold shadow"
                      aria-hidden
                    >
                      ✓
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-foreground">{s.name}</h3>
                  <p className="text-sm md:text-base font-bold text-brand mt-2 leading-snug">
                    {[s.university, s.country].filter(Boolean).join(" · ") || "—"}
                  </p>
                </div>
                <blockquote className="text-foreground-muted italic text-base leading-relaxed text-center m-0 flex-1 line-clamp-4">
                  &ldquo;{s.story}&rdquo;
                </blockquote>
                <div className="mt-6 text-center">
                  <Link
                    href="/success-stories"
                    className="group inline-flex items-center gap-2 text-brand font-bold hover:text-brand-strong transition-colors motion-reduce:transition-none"
                  >
                    Read full story
                    <FiArrowRight className="w-4 h-4 transition-transform motion-reduce:transition-none group-hover:translate-x-0.5 motion-reduce:group-hover:translate-x-0" aria-hidden />
                  </Link>
                </div>
              </article>
            </li>
          ))}
        </ul>

        <p className="text-center mt-10">
          <Link
            href="/success-stories"
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand hover:text-brand-strong transition-colors motion-reduce:transition-none"
          >
            View all success stories
            <FiArrowRight className="w-4 h-4" aria-hidden />
          </Link>
        </p>
      </div>
    </section>
  );
}
