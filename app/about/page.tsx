import Image from "next/image";
import { FiArrowRight, FiCheckCircle, FiTarget } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";
import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { getCmsField, parseCmsJson } from "@/lib/cms-merge-sections";
import {
  DEFAULT_ABOUT_INTRO,
  ABOUT_GAP_PROBLEMS,
  ABOUT_APPROACH,
  ABOUT_WHO_WE_WORK_WITH,
  ABOUT_MAKES_US_DIFFERENT,
  type AboutApproachItem,
  type AboutDiffItem,
} from "@/lib/cms-about-content";

export const dynamic = "force-dynamic";

const DEFAULT_ABOUT_HERO =
  "https://images.pexels.com/photos/3184465/pexels-photo-3184465.jpeg?auto=compress&cs=tinysrgb&w=1600";

function headingBlackGradient(full: string) {
  const parts = full.trim().split(/\s+/).filter(Boolean);
  if (parts.length < 2) {
    return <span className="gradient-text">{full}</span>;
  }
  const last = parts.pop()!;
  return (
    <>
      {parts.join(" ")} <span className="gradient-text">{last}</span>
    </>
  );
}

export default async function AboutPage() {
  const sections = await getMergedPageContent("about");
  const kicker = getCmsField(sections, "hero", "kicker") || "About Us";
  const heading = getCmsField(sections, "hero", "heading");
  const desc =
    getCmsField(sections, "hero", "description").trim() ||
    getCmsField(sections, "hero", "fallbackIntro").trim() ||
    DEFAULT_ABOUT_INTRO;
  const heroImgRaw = getCmsField(sections, "hero", "heroImage");
  const heroImg = heroImgRaw || DEFAULT_ABOUT_HERO;
  const heroUnoptimized =
    !heroImg.includes("images.pexels.com") && !heroImg.includes("images.unsplash.com");
  const mission = getCmsField(sections, "mission", "mission");
  const vision = getCmsField(sections, "mission", "vision");
  const ctaText = getCmsField(sections, "hero", "ctaText") || "Start Your Journey";

  const whatHeading = getCmsField(sections, "whatWeDo", "heading");
  const whatIntro = getCmsField(sections, "whatWeDo", "intro");
  const whatCard1 = getCmsField(sections, "whatWeDo", "card1");
  const whatCard2 = getCmsField(sections, "whatWeDo", "card2");

  const whyHeading = getCmsField(sections, "whyExists", "heading");
  const whyIntro = getCmsField(sections, "whyExists", "intro");
  const promiseKicker = getCmsField(sections, "whyExists", "promiseKicker");
  const promiseTitle = getCmsField(sections, "whyExists", "promiseTitle");
  const promiseBody = getCmsField(sections, "whyExists", "promiseBody");
  const gapProblems = parseCmsJson<string[]>(
    getCmsField(sections, "whyExists", "gapProblemsJson"),
    ABOUT_GAP_PROBLEMS
  );

  const approachHeading = getCmsField(sections, "approach", "heading");
  const approachIntro = getCmsField(sections, "approach", "intro");
  const approach = parseCmsJson<AboutApproachItem[]>(
    getCmsField(sections, "approach", "itemsJson"),
    ABOUT_APPROACH
  );

  const whoHeading = getCmsField(sections, "whoWeWorkWith", "heading");
  const whoItems = parseCmsJson<string[]>(
    getCmsField(sections, "whoWeWorkWith", "itemsJson"),
    ABOUT_WHO_WE_WORK_WITH
  );

  const diffHeading = getCmsField(sections, "different", "heading");
  const diffPara1 = getCmsField(sections, "different", "para1");
  const diffPara2 = getCmsField(sections, "different", "para2");
  const diffItems = parseCmsJson<AboutDiffItem[]>(
    getCmsField(sections, "different", "itemsJson"),
    ABOUT_MAKES_US_DIFFERENT
  );

  const goalHeading = getCmsField(sections, "goal", "heading");
  const goalBody = getCmsField(sections, "goal", "body");

  const ctaHeading = getCmsField(sections, "cta", "heading");
  const ctaBody = getCmsField(sections, "cta", "body");
  const bottomCtaText = getCmsField(sections, "cta", "buttonText");
  const ctaBg = getCmsField(sections, "cta", "backgroundImage");
  const ctaBgFinal =
    ctaBg ||
    "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600";
  const ctaUnopt =
    !ctaBgFinal.includes("images.pexels.com") && !ctaBgFinal.includes("images.unsplash.com");

  return (
    <main>
      <section className="relative text-white overflow-hidden border-b border-brand/40">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={heroImg}
            alt="Global career guidance"
            fill
            priority
            unoptimized={heroUnoptimized}
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              {kicker}
            </p>
            {heading ? (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight whitespace-pre-line">
                {heading}
              </h1>
            ) : (
              <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4 leading-tight">
                More Than Just Study Abroad —{" "}
                <span className="text-accent">We Build Global Careers</span>
              </h1>
            )}
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-6 max-w-3xl mx-auto whitespace-pre-line">
              {desc}
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              {ctaText}
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>

      {mission || vision ? (
        <section className="py-16 md:py-20 bg-page-soft border-b border-border">
          <div className="container mx-auto px-6 md:px-8 max-w-5xl mx-auto grid gap-10 md:grid-cols-2">
            {mission ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Mission</h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {mission}
                </p>
              </div>
            ) : null}
            {vision ? (
              <div>
                <h2 className="text-xl font-bold text-slate-900 mb-3">Vision</h2>
                <p className="text-sm md:text-base text-slate-700 leading-relaxed whitespace-pre-line">
                  {vision}
                </p>
              </div>
            ) : null}
          </div>
        </section>
      ) : null}

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              {headingBlackGradient(whatHeading)}
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">{whatIntro}</p>
          </div>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">{whatCard1}</p>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-6 md:px-7 md:py-7 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">{whatCard2}</p>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                {headingBlackGradient(whyHeading)}
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                {whyIntro}
              </p>
              <div className="space-y-3">
                {gapProblems.map((item) => (
                  <div
                    key={item}
                    className="flex items-start gap-3 rounded-2xl border border-slate-200 bg-white px-5 py-4 hover-lift"
                  >
                    <FiCheckCircle className="w-5 h-5 text-brand flex-shrink-0 mt-0.5" />
                    <span className="text-sm md:text-base text-slate-800">{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <aside className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-7 md:px-8 md:py-8 hover-lift">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-11 h-11 rounded-xl bg-brand flex items-center justify-center text-white shadow-md">
                  <FiTarget className="w-5 h-5" />
                </div>
                <div>
                  <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand">
                    {promiseKicker}
                  </p>
                  <p className="text-sm md:text-base font-semibold text-slate-900">
                    {promiseTitle}
                  </p>
                </div>
              </div>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">{promiseBody}</p>
            </aside>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              {headingBlackGradient(approachHeading)}
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">{approachIntro}</p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {approach.map((item, idx) => (
              <article
                key={item.title}
                className="rounded-2xl border border-slate-200 bg-gray-50 px-5 py-6 md:px-6 md:py-7 hover-lift hover:border-brand transition-colors duration-300 flex flex-col"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold flex-shrink-0">
                    {idx + 1}
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900">
                    {item.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {item.body}
                </p>
                {item.bullets ? (
                  <ul className="mt-4 space-y-2">
                    {item.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-2 text-xs md:text-sm text-slate-700">
                        <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                        <span>{b}</span>
                      </li>
                    ))}
                  </ul>
                ) : null}
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              {headingBlackGradient(whoHeading)}
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-3">
            {whoItems.map((item) => (
              <article
                key={item}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 text-center hover-lift"
              >
                <p className="text-sm md:text-base font-semibold text-slate-900">{item}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                {headingBlackGradient(diffHeading)}
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                {diffPara1}
              </p>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed">{diffPara2}</p>
            </div>

            <div className="space-y-3">
              {diffItems.map((item) => (
                <article
                  key={item.title}
                  className="rounded-2xl border border-slate-200 bg-page-soft px-6 py-6 md:px-7 md:py-7 hover-lift"
                >
                  <p className="text-sm font-semibold text-slate-900 mb-1">{item.title}</p>
                  <p className="text-sm text-slate-700 leading-relaxed">{item.body}</p>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
              {headingBlackGradient(goalHeading)}
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">{goalBody}</p>
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={ctaBgFinal}
            alt="Students preparing for global careers"
            fill
            unoptimized={ctaUnopt}
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">{ctaHeading}</h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto whitespace-pre-line">
              {ctaBody}
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              {bottomCtaText}
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </main>
  );
}
