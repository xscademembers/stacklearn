import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Stack Learn",
  description:
    "Learn how Stack Learn collects, uses, and protects your personal information across our website and online services.",
};

export default function PrivacyPolicyPage() {
  return (
    <div className="pb-16">
      <section className="bg-black text-white py-16 md:py-20 border-b border-brand/40">
        <div className="container mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Privacy Policy
          </h1>
          <p className="max-w-3xl text-slate-200 text-base md:text-lg">
            This Privacy Policy explains how Stack Learn (&quot;we&quot;,
            &quot;us&quot;, &quot;our&quot;) collects, uses, and protects your
            personal information when you visit our website, interact with our
            counsellors, or enroll in our programs.
          </p>
          <p className="mt-3 text-sm text-slate-300">
            Last updated: March 2026
          </p>
        </div>
      </section>

      <section className="bg-white">
        <div className="container mx-auto px-6 md:px-8 py-12 md:py-16 max-w-4xl">
          <div className="space-y-10 text-slate-800 leading-relaxed">
            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                1. Information We Collect
              </h2>
              <p className="mb-3">
                We collect information that you provide directly to us and data
                that is generated when you use our website and services.
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  <strong>Contact details</strong>: name, email address, phone
                  number, preferred destination country.
                </li>
                <li>
                  <strong>Application information</strong>: academic
                  qualifications, work experience, course preferences, and other
                  details you share in enquiry or application forms.
                </li>
                <li>
                  <strong>Technical data</strong>: IP address, device and
                  browser information, and basic analytics (e.g. pages viewed).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                2. How We Use Your Information
              </h2>
              <p className="mb-3">We use your information to:</p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Respond to your enquiries and counselling requests.</li>
                <li>
                  Help you evaluate programs, universities, and destinations
                  that match your profile.
                </li>
                <li>
                  Process your applications and keep you informed about their
                  status.
                </li>
                <li>
                  Improve our website, services, and communication based on
                  aggregated usage data.
                </li>
                <li>
                  Send important updates about your course or application
                  (non-promotional).
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                3. Sharing Your Information
              </h2>
              <p className="mb-3">
                We do <strong>not</strong> sell your personal data. We may share
                your information only in the following situations:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>
                  With trusted partner institutions or service providers involved
                  in processing your application, strictly on a
                  need-to-know basis.
                </li>
                <li>
                  To comply with legal obligations, court orders, or government
                  requests where required by law.
                </li>
                <li>
                  To protect the rights, property, or safety of Stack Learn,
                  our students, or the public.
                </li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                4. Data Retention & Security
              </h2>
              <p className="mb-3">
                We retain your information only for as long as it is necessary
                for the purposes described in this policy, or as required by
                law or for legitimate business interests (such as handling
                disputes or audit requirements).
              </p>
              <p>
                We use reasonable technical and organisational safeguards to
                protect your data. However, no method of transmission or storage
                is 100% secure, and we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                5. Your Rights
              </h2>
              <p className="mb-3">
                Depending on your local laws, you may have the right to:
              </p>
              <ul className="list-disc pl-6 space-y-2">
                <li>Access the personal data we hold about you.</li>
                <li>
                  Request corrections to inaccurate or incomplete information.
                </li>
                <li>
                  Request deletion of your data, subject to legal or contractual
                  obligations.
                </li>
                <li>
                  Withdraw consent for marketing communications at any time.
                </li>
              </ul>
              <p className="mt-3">
                To exercise these rights, please contact us using the details
                below.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                6. Updates to This Policy
              </h2>
              <p>
                We may update this Privacy Policy from time to time to reflect
                changes in our services or applicable laws. The updated version
                will always be available on this page with a revised &quot;Last
                updated&quot; date.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                7. Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions about how we handle your personal
                data, or if you wish to exercise your rights, please reach out
                to us:
              </p>
              <ul className="list-none space-y-2 text-sm md:text-base">
                <li>
                  Email:{" "}
                  <a
                    href="mailto:info@stacklearn.com"
                    className="text-brand underline-offset-2 hover:underline"
                  >
                    info@stacklearn.com
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

