import Image from "next/image";
import Link from "next/link";
import { isMongoConfigured, MONGODB_NOT_CONFIGURED_MESSAGE } from "@/lib/mongodb";
import { getAllSuccessStoriesSorted } from "@/lib/get-success-stories";
import SuccessStoryArchiveCard from "@/components/success-stories/SuccessStoryArchiveCard";

/** CDN ISR — success stories list (Mongo). */
export const revalidate = 60;

export default async function SuccessStoriesPage() {
  const mongoOk = isMongoConfigured();
  const stories = mongoOk ? await getAllSuccessStoriesSorted() : [];

  return (
    <div className="pb-0">
      <section className="relative flex min-h-[280px] md:min-h-[360px] items-center justify-center overflow-hidden text-white">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/7944099/pexels-photo-7944099.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            fill
            priority
            className="object-cover opacity-50"
          />
        </div>
        <div className="pointer-events-none absolute inset-0 z-[1] opacity-20">
          <div className="absolute left-20 top-20 h-64 w-64 animate-float rounded-full bg-white blur-3xl motion-reduce:animate-none" />
          <div
            className="absolute bottom-20 right-20 h-64 w-64 animate-float rounded-full bg-white blur-3xl motion-reduce:animate-none"
            style={{ animationDelay: "1.5s" }}
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center md:px-6">
          <h1 className="mb-4 text-3xl font-bold md:text-4xl lg:text-5xl">Real Students, Real Success</h1>
          <p className="mx-auto mb-0 max-w-3xl text-base md:text-xl text-white/90">
            Meet our students who turned their study abroad dreams into reality — every story below is managed from
            your admin dashboard.
          </p>
        </div>
      </section>

      <section className="border-b border-border bg-surface py-12 md:py-16">
        <div className="container mx-auto px-4 md:px-6">
          {!mongoOk ? (
            <p className="text-center text-foreground-muted" role="status">
              {MONGODB_NOT_CONFIGURED_MESSAGE}
            </p>
          ) : stories.length === 0 ? (
            <p className="text-center text-foreground-muted">No success stories yet. Add some from the admin dashboard.</p>
          ) : (
            <ul className="m-0 grid list-none gap-6 p-0 sm:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <li key={story._id}>
                  <SuccessStoryArchiveCard story={story} />
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>

      <section className="bg-page-soft py-16 md:py-20">
        <div className="container mx-auto px-4 md:px-6">
          <div className="mx-auto max-w-3xl rounded-xl border border-border bg-surface p-6 shadow-md md:p-8">
            <h2 className="mb-4 text-center text-2xl font-bold text-foreground md:text-3xl">Submit Your Story</h2>
            <p className="mb-8 text-center text-foreground-muted">
              Share your Stack Learn journey and inspire other students planning to study abroad.
            </p>
            <form className="space-y-4">
              <div className="grid gap-4 md:grid-cols-2">
                <input
                  type="text"
                  name="name"
                  placeholder="Name"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-foreground-muted"
                />
                <input
                  type="text"
                  name="university-country"
                  placeholder="University / Country"
                  className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-foreground-muted"
                />
              </div>
              <input
                type="text"
                name="course"
                placeholder="Course"
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-foreground-muted"
              />
              <textarea
                name="experience"
                placeholder="Your experience"
                rows={4}
                className="w-full rounded-lg border border-border bg-surface px-4 py-3 text-foreground placeholder:text-foreground-muted"
              />
              <button
                type="button"
                className="w-full rounded-lg bg-brand px-6 py-3 font-semibold text-white transition-colors motion-reduce:transition-none hover:bg-brand-strong"
              >
                Submit Your Story
              </button>
            </form>
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden py-16 text-white md:py-20">
        <div className="absolute inset-0 z-0">
          <div className="absolute inset-0 bg-black" />
          <Image
            src="https://images.pexels.com/photos/8199562/pexels-photo-8199562.jpeg?auto=compress&cs=tinysrgb&w=1600"
            alt=""
            fill
            className="object-cover opacity-50"
          />
        </div>
        <div className="container relative z-10 mx-auto px-4 text-center">
          <h2 className="mb-4 text-3xl font-bold md:text-4xl">Start Your Success Story Today</h2>
          <p className="mx-auto mb-8 max-w-2xl text-lg text-white/90">
            Join students who achieved their study abroad goals with Stack Learn.
          </p>
          <Link
            href="/contact"
            className="inline-block rounded-full bg-surface px-8 py-4 font-semibold text-brand transition-shadow motion-reduce:transition-none hover:shadow-xl"
          >
            Book Free Counselling
          </Link>
        </div>
      </section>
    </div>
  );
}
