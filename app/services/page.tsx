import Link from "next/link";
import Image from "next/image";
import { FiArrowRight } from "react-icons/fi";
import BookConsultButton from "@/components/BookConsultButton";
import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { getCmsField, parseCmsJson } from "@/lib/cms-merge-sections";
import {
  DEFAULT_SERVICES_PAGE_BODY,
  type ServicesPageBodyCms,
} from "@/lib/cms-services-content";

export const dynamic = "force-dynamic";

const DEFAULT_HERO = {
  kicker: "Study Abroad Services",
  heading: "End-to-End Study Abroad Services for International Education",
  paragraph1:
    "Looking for trusted Top Study Abroad Consultants to guide your overseas education journey? At StackLearn, we provide complete study abroad services including profile evaluation, university admission assistance, SOP & LOR writing, student visa process guidance, accommodation support, and education loan assistance.",
  paragraph2:
    "As a professional overseas education consultancy, we help students plan, apply, and secure admission to top universities in the UK, USA, Canada, Australia, and other leading destinations, with clear breakdowns of the cost of studying abroad and funding options.",
  heroImage:
    "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
  ctaText: "Book Your Free Study Abroad Consultation",
};

export default async function ServicesPage() {
  const sections = await getMergedPageContent("services");
  const kicker = getCmsField(sections, "hero", "kicker") || DEFAULT_HERO.kicker;
  const heading = getCmsField(sections, "hero", "heading") || DEFAULT_HERO.heading;
  const paragraph1 = getCmsField(sections, "hero", "paragraph1") || DEFAULT_HERO.paragraph1;
  const paragraph2 = getCmsField(sections, "hero", "paragraph2") || DEFAULT_HERO.paragraph2;
  const heroImage = getCmsField(sections, "hero", "heroImage") || DEFAULT_HERO.heroImage;
  const ctaText = getCmsField(sections, "hero", "ctaText") || DEFAULT_HERO.ctaText;
  const heroUnopt =
    !heroImage.includes("images.pexels.com") && !heroImage.includes("images.unsplash.com");

  const body = parseCmsJson<ServicesPageBodyCms>(
    getCmsField(sections, "body", "pageJson"),
    DEFAULT_SERVICES_PAGE_BODY
  );

  const ctaImg = body.bottomCta.imageUrl;
  const ctaUnopt =
    !ctaImg.includes("images.pexels.com") && !ctaImg.includes("images.unsplash.com");

  return (
    <div>
      <section className="relative text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={heroImage}
            alt="Students in counselling session"
            fill
            priority
            unoptimized={heroUnopt}
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 py-16 md:py-24 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <p className="text-xs md:text-sm uppercase tracking-[0.25em] text-brand-soft mb-3">
              {kicker}
            </p>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-3 leading-tight">
              {heading}
            </h1>
            <p className="text-base md:text-lg text-white/90 leading-relaxed mb-4 max-w-4xl mx-auto">
              {paragraph1}
            </p>
            <p className="text-sm md:text-base text-white/80 leading-relaxed max-w-3xl mx-auto">
              {paragraph2}
            </p>
            <div className="mt-8">
              <BookConsultButton
                variant="white"
                className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
              >
                {ctaText}
                <FiArrowRight className="w-4 h-4" />
              </BookConsultButton>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              {body.ourServices.headingMain}{" "}
              <span className="gradient-text">{body.ourServices.headingAccent}</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {body.ourServices.intro}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {body.ourServices.items.map((service) => (
              <Link
                key={service.title}
                href={service.href}
                className="group rounded-2xl border border-slate-200 bg-page-soft px-5 py-6 md:px-6 md:py-7 hover-lift flex flex-col hover:border-brand transition-colors duration-300"
              >
                <div className="mb-3 flex items-center gap-2">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full bg-brand-soft text-brand text-sm font-bold group-hover:bg-brand group-hover:text-white transition-colors duration-300">
                    ✓
                  </span>
                  <h3 className="text-sm md:text-base font-semibold text-slate-900 group-hover:text-brand transition-colors duration-300">
                    {service.title}
                  </h3>
                </div>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed flex-1">
                  {service.body}
                </p>
                <span className="inline-flex items-center gap-2 mt-3 text-brand font-semibold text-sm group-hover:gap-3 transition-all duration-300">
                  Learn More{" "}
                  <span className="group-hover:translate-x-1 transition-transform duration-300">
                    &rarr;
                  </span>
                </span>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-sm md:text-base text-slate-600">
            {body.ourServices.footerNote}
          </p>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-10">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              {body.process.headingMain}{" "}
              <span className="gradient-text">{body.process.headingAccent}</span>
            </h2>
            <p className="text-sm md:text-base text-slate-700 leading-relaxed">
              {body.process.intro}
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-5">
            {body.process.steps.map((step) => (
              <div
                key={step.num}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-6 text-center hover-lift"
              >
                <div className="w-12 h-12 rounded-full bg-brand text-white font-extrabold text-lg flex items-center justify-center mx-auto mb-3">
                  {step.num}
                </div>
                <p className="text-xs md:text-sm font-semibold text-slate-900 leading-snug">
                  {step.title}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-white">
        <div className="container mx-auto px-6 md:px-8">
          <div className="grid gap-10 lg:grid-cols-2 items-start">
            <div>
              <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-4">
                {body.why.headingMain}{" "}
                <span className="gradient-text">{body.why.headingAccent}</span>
              </h2>
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                {body.why.intro}
              </p>
              <ul className="space-y-3 text-sm md:text-base text-slate-700">
                {body.why.points.map((point) => (
                  <li key={point} className="flex gap-2">
                    <span className="mt-1 h-1.5 w-1.5 rounded-full bg-brand flex-shrink-0" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-page-soft border border-slate-200 px-6 py-7 md:px-8 md:py-8 hover-lift">
              <p className="text-sm md:text-base text-slate-700 leading-relaxed mb-4">
                {body.why.sidebarBody}
              </p>
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand">{body.why.stat1Value}</p>
                  <p className="text-xs text-slate-600">{body.why.stat1Label}</p>
                </div>
                <div className="rounded-xl bg-white border border-slate-100 px-4 py-4 text-center">
                  <p className="text-2xl font-extrabold text-brand">{body.why.stat2Value}</p>
                  <p className="text-xs text-slate-600">{body.why.stat2Label}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 md:py-20 bg-gray-50">
        <div className="container mx-auto px-6 md:px-8">
          <div className="max-w-3xl mx-auto text-center mb-8">
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-900 mb-3">
              {body.faq.headingMain}{" "}
              <span className="gradient-text">{body.faq.headingAccent}</span>
            </h2>
          </div>
          <div className="max-w-4xl mx-auto grid gap-4 md:grid-cols-2">
            {body.faq.items.map((item) => (
              <div
                key={item.q}
                className="rounded-2xl bg-white border border-slate-200 px-5 py-4 md:px-6 md:py-5 hover-lift"
              >
                <p className="font-semibold text-slate-900 mb-1 text-sm md:text-base">
                  {item.q}
                </p>
                <p className="text-xs md:text-sm text-slate-700 leading-relaxed">{item.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="relative py-16 md:py-20 text-white overflow-hidden">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src={ctaImg}
            alt="Team helping students plan study abroad"
            fill
            unoptimized={ctaUnopt}
            className="object-cover opacity-50"
          />
        </div>
        <div className="container mx-auto px-6 md:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-extrabold mb-4">
              {body.bottomCta.heading}
            </h2>
            <p className="text-sm md:text-base text-white/90 mb-6 max-w-2xl mx-auto">
              {body.bottomCta.body}
            </p>
            <BookConsultButton
              variant="white"
              className="inline-flex items-center gap-2 px-8 py-3 text-sm md:text-base"
            >
              {body.bottomCta.buttonText}
              <FiArrowRight className="w-4 h-4" />
            </BookConsultButton>
          </div>
        </div>
      </section>
    </div>
  );
}
