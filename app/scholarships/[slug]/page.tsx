import Link from "next/link";
import { notFound } from "next/navigation";
import { getScholarshipBySlug } from "@/lib/scholarships-data";

interface ScholarshipDetailPageProps {
  params: Promise<{ slug: string }>;
}

export default async function ScholarshipDetailPage({ params }: ScholarshipDetailPageProps) {
  const { slug } = await params;
  const scholarship = getScholarshipBySlug(slug);

  if (!scholarship) {
    notFound();
  }

  return (
    <main className="bg-gray-50 py-16">
      <section className="container mx-auto px-4">
        <article className="mx-auto max-w-4xl rounded-2xl bg-white p-8 shadow-sm">
          <p className="text-sm font-semibold text-brand">{scholarship.countryLabel}</p>
          <h1 className="mt-2 text-3xl font-bold text-gray-900">{scholarship.name}</h1>
          <p className="mt-4 text-gray-700 leading-7">{scholarship.details}</p>

          <section className="mt-8">
            <h2 className="text-xl font-bold text-gray-900">Full Scholarship Details</h2>
            <ul className="mt-4 space-y-3 text-gray-700">
              {scholarship.expertise.map((point) => (
                <li key={point} className="rounded-lg border border-gray-200 bg-gray-50 p-3">
                  {point}
                </li>
              ))}
            </ul>
          </section>

          <section className="mt-8 rounded-xl border border-brand/20 bg-brand-soft p-5">
            <h3 className="text-lg font-semibold text-gray-900">Need help choosing the right scholarship?</h3>
            <p className="mt-2 text-gray-700">{scholarship.closingNote}</p>
          </section>

          <nav className="mt-8 flex flex-wrap gap-4">
            <Link
              href="/scholarships"
              className="rounded-lg border border-gray-300 px-5 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-100"
            >
              Back to Scholarships
            </Link>
            <Link
              href="/schedule-meeting"
              className="rounded-lg bg-brand px-5 py-3 font-semibold text-white transition-colors hover:bg-brand-strong"
            >
              Talk to an Expert
            </Link>
          </nav>
        </article>
      </section>
    </main>
  );
}
