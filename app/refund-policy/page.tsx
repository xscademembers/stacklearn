import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Refund Policy | Stack Learn",
  description:
    "Read Stack Learn's detailed refund policy for online career, professional development, and enrichment courses.",
};

export default function RefundPolicyPage() {
  return (
    <div className="pb-16">
      {/* Hero / Heading */}
      <section className="bg-black text-white py-16 md:py-20 border-b border-brand/40">
        <div className="container mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Refund Policy
          </h1>
          <p className="max-w-3xl text-slate-200 text-base md:text-lg">
            This policy explains how refunds are handled for Stack Learn&apos;s
            online programs, including career, professional development, and
            enrichment courses.
          </p>
        </div>
      </section>

      {/* Content */}
      <section className="bg-white">
        <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 max-w-4xl">
          <div className="space-y-10 text-slate-800 leading-relaxed">
            {/* Online Career Course Refund Policy */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                Online Career Course Refund Policy
              </h2>
              <p className="mb-4">
                Students who enroll in a training course may sometimes alter
                their decision due to various factors. Irrespective of the
                rationale behind their change of mind, we firmly advocate for
                the existence of a clear-cut refund policy for those students
                who opt not to pursue the course. Refunds for online courses
                are solely granted in specific situations:
              </p>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  The student/user must submit a written refund request via
                  email within <strong>three business days</strong> of
                  registering for the online course, provided that{" "}
                  <strong>no portion of the course has been accessed</strong>.
                  Once a course has been accessed, no refunds will be granted.
                </li>
                <li>
                  If the refund request meets the criteria, a{" "}
                  <strong>full refund</strong> will be issued, with an{" "}
                  <strong>administrative fee deducted</strong>.
                </li>
                <li>
                  If any course materials were shipped, they must be returned{" "}
                  <strong>unopened and unused</strong> at the student/user&apos;s
                  expense. Refunds for videos or e-books are{" "}
                  <strong>not available</strong>.
                </li>
              </ul>
              <p className="mt-4">
                By enrolling and accessing your online course, you acknowledge
                and agree to this refund policy. There will be{" "}
                <strong>no extensions</strong> granted for your course. If you
                are unable to finish your course by the designated end date
                indicated in your welcome letter, supplementary fees will apply
                for extended access.
              </p>
            </section>

            {/* Online Professional Development Refund Policy */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                Online Professional Development Refund Policy
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  If the student/user has not accessed any section of the
                  online course and wishes to request a refund, they must do so
                  in writing via email within{" "}
                  <strong>72 hours of enrolling</strong>.
                </li>
                <li>
                  Refunds will <strong>not</strong> be provided once the course
                  has been started or any part of the content has been
                  accessed.
                </li>
              </ul>
            </section>

            {/* Online Enrichment Course Refund Policy */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                Online Enrichment Course Refund Policy
              </h2>
              <ul className="list-disc pl-6 space-y-3">
                <li>
                  The student/user has not accessed any section of the online
                  course and has formally requested a refund via email within{" "}
                  <strong>72 hours of enrolling</strong> in the course.
                </li>
                <li>
                  Refunds will <strong>not</strong> be granted after the course
                  has been started or accessed.
                </li>
                <li>
                  The refund amount will be reduced by the{" "}
                  <strong>materials fee</strong> associated with the course, if
                  applicable.
                </li>
              </ul>
            </section>

            {/* Contact */}
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-4 text-slate-900">
                Questions About This Policy
              </h2>
              <p className="mb-3">
                If you have any questions about this refund policy or need
                clarification before enrolling, please contact us:
              </p>
              <ul className="list-none space-y-2 text-sm md:text-base">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:sales@stack-learn.com"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    sales@stack-learn.com
                  </a>
                </li>
                <li>
                  Phone:{" "}
                  <a
                    href="tel:+919606031842"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    +91 96060 31842
                  </a>
                </li>
              </ul>
            </section>
          </div>
        </div>
      </section>
    </div>
  );
}

