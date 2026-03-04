import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Use | Stack Learn",
  description:
    "Read the terms and conditions that govern your use of Stack Learn's website, services, and online programs.",
};

export default function TermsOfUsePage() {
  return (
    <div className="pb-16">
      <section className="bg-black text-white py-16 md:py-20 border-b border-brand/40">
        <div className="container mx-auto px-6 md:px-8">
          <h1 className="text-3xl md:text-4xl lg:text-5xl font-extrabold mb-4">
            Terms of Use
          </h1>
          <p className="max-w-3xl text-slate-200 text-base md:text-lg">
            These Terms of Use (&quot;Terms&quot;) govern your access to and
            use of the Stack Learn website, counselling services, and online
            programs. By using our website or enrolling in any course, you agree
            to these Terms.
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
                1. Eligibility & Use of the Website
              </h2>
              <p>
                You must be at least 16 years old or using our services under
                the supervision of a parent or legal guardian. You agree to use
                this website only for lawful purposes and in accordance with
                these Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                2. Accuracy of Information
              </h2>
              <p className="mb-3">
                You are responsible for ensuring that all information you
                provide to Stack Learn is accurate, complete, and up to date,
                including details submitted in enquiry, counselling, and
                application forms.
              </p>
              <p>
                Stack Learn is not responsible for issues arising from incorrect
                or incomplete information provided by you (for example, delayed
                applications or rejected offers).
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                3. Courses, Fees & Refunds
              </h2>
              <p className="mb-3">
                Course structures, fees, and partner university offerings may
                change from time to time. While we make reasonable efforts to
                keep information current, final decisions about admissions,
                fees, and scholarships are always taken by the respective
                institutions.
              </p>
              <p>
                Refunds, if applicable, are governed by our separate{" "}
                <a
                  href="/refund-policy"
                  className="text-brand underline-offset-2 hover:underline"
                >
                  Refund Policy
                </a>
                . Please review that policy carefully before enrolling.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                4. Intellectual Property
              </h2>
              <p className="mb-3">
                All content on this website, including text, graphics, logos,
                icons, course materials, and branding, is owned by Stack Learn
                or its content providers and is protected by applicable
                copyright and trademark laws.
              </p>
              <p>
                You may not copy, reproduce, distribute, or create derivative
                works from our content without prior written permission from
                Stack Learn.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                5. Limitation of Liability
              </h2>
              <p className="mb-3">
                Stack Learn provides counselling and training services on a
                best-effort basis. While we aim to guide you towards the right
                programs and universities, we do not guarantee admissions,
                visas, scholarships, or specific outcomes.
              </p>
              <p>
                To the maximum extent permitted by law, Stack Learn will not be
                liable for any indirect, incidental, or consequential damages
                arising from your use of our website or services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                6. Third-Party Links
              </h2>
              <p>
                Our website may contain links to third-party websites (such as
                universities, payment gateways, or partners). These sites are
                not controlled by Stack Learn, and we are not responsible for
                their content, policies, or practices. Visiting such sites is at
                your own discretion.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                7. Changes to These Terms
              </h2>
              <p>
                We may update these Terms of Use from time to time. The most
                current version will always be available on this page with a
                revised &quot;Last updated&quot; date. By continuing to use our
                website or services after changes are posted, you agree to the
                updated Terms.
              </p>
            </section>

            <section>
              <h2 className="text-2xl md:text-3xl font-bold mb-3 text-slate-900">
                8. Contact Us
              </h2>
              <p className="mb-3">
                If you have any questions about these Terms, please contact us:
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

