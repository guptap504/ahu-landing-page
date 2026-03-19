import { Link } from "react-router-dom";

const Privacy = () => {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-3xl mx-auto px-6 py-16 sm:py-24">
        <Link
          to="/"
          className="inline-block text-sm text-gray-500 hover:text-gray-900 transition-colors duration-200 mb-12"
        >
          &larr; Back to Home
        </Link>

        <h1 className="font-serif text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
          Privacy Policy
        </h1>
        <p className="text-sm text-gray-500 mb-12">
          Last updated: March 19, 2026
        </p>

        <div className="space-y-10 text-gray-600 leading-relaxed">
          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Overview
            </h2>
            <p>
              GarvataAI ("we", "us", "our") operates the website at garvata.com.
              This policy describes what information we collect, how we use it,
              and the choices you have. We are committed to protecting the
              privacy of our visitors and customers.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Information We Collect
            </h2>
            <p className="mb-3">
              We collect information that you provide directly and information
              gathered automatically when you visit our site.
            </p>
            <h3 className="font-semibold text-gray-900 mb-2">
              Information you provide
            </h3>
            <p className="mb-3">
              When you submit our contact form, we collect your name, email
              address, company name, and message. When you schedule a call
              through our Calendly integration, Calendly collects the
              information you provide during booking.
            </p>
            <h3 className="font-semibold text-gray-900 mb-2">
              Information collected automatically
            </h3>
            <p>
              We use PostHog, a product analytics platform, to understand how
              visitors interact with our site. This includes page views, device
              type, browser information, approximate geographic location, and
              general usage patterns. This data helps us improve the site
              experience. PostHog may use cookies or similar technologies for
              this purpose.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              How We Use Your Information
            </h2>
            <ul className="list-disc pl-5 space-y-2">
              <li>To respond to your inquiries submitted through our contact form</li>
              <li>To schedule and manage meetings requested through Calendly</li>
              <li>To analyze site usage and improve our website</li>
              <li>To send follow-up communications related to your inquiry</li>
              <li>To comply with legal obligations</li>
            </ul>
            <p className="mt-3">
              We do not sell your personal information to third parties.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Third-Party Services
            </h2>
            <p className="mb-3">
              We use the following third-party services that may process your
              data:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>
                <span className="text-gray-900 font-medium">PostHog</span> --
                Product analytics to understand site usage. See{" "}
                <a
                  href="https://posthog.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:text-cyan-900 underline"
                >
                  PostHog's privacy policy
                </a>
                .
              </li>
              <li>
                <span className="text-gray-900 font-medium">Calendly</span> --
                Meeting scheduling. See{" "}
                <a
                  href="https://calendly.com/privacy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:text-cyan-900 underline"
                >
                  Calendly's privacy policy
                </a>
                .
              </li>
              <li>
                <span className="text-gray-900 font-medium">Resend</span> --
                Transactional email delivery for contact form submissions. See{" "}
                <a
                  href="https://resend.com/legal/privacy-policy"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:text-cyan-900 underline"
                >
                  Resend's privacy policy
                </a>
                .
              </li>
              <li>
                <span className="text-gray-900 font-medium">Netlify</span> --
                Website hosting and serverless functions. See{" "}
                <a
                  href="https://www.netlify.com/privacy/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-cyan-700 hover:text-cyan-900 underline"
                >
                  Netlify's privacy policy
                </a>
                .
              </li>
            </ul>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Cookies
            </h2>
            <p>
              Our site may use cookies and similar tracking technologies through
              PostHog for analytics purposes. These help us understand how
              visitors use the site so we can improve the experience. You can
              control cookies through your browser settings. Disabling cookies
              may limit our ability to analyze site usage but will not affect
              core site functionality.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Data Retention
            </h2>
            <p>
              Contact form submissions and related communications are retained
              for as long as necessary to fulfill your request and maintain our
              business relationship. Analytics data is retained in accordance
              with PostHog's data retention policies. You may request deletion of
              your personal data at any time by contacting us.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Your Rights
            </h2>
            <p className="mb-3">
              Depending on your jurisdiction, you may have the right to:
            </p>
            <ul className="list-disc pl-5 space-y-2">
              <li>Access the personal data we hold about you</li>
              <li>Request correction of inaccurate data</li>
              <li>Request deletion of your personal data</li>
              <li>Object to or restrict processing of your data</li>
              <li>Request a portable copy of your data</li>
            </ul>
            <p className="mt-3">
              To exercise any of these rights, please contact us using the
              details below.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Data Security
            </h2>
            <p>
              We implement appropriate technical and organizational measures to
              protect your personal information. However, no method of
              transmission over the Internet is completely secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Changes to This Policy
            </h2>
            <p>
              We may update this privacy policy from time to time. Changes will
              be posted on this page with an updated revision date. We encourage
              you to review this policy periodically.
            </p>
          </section>

          <section>
            <h2 className="font-serif text-xl font-semibold text-gray-900 mb-3">
              Contact Us
            </h2>
            <p>
              If you have questions about this privacy policy or how we handle
              your data, contact us at{" "}
              <a
                href="mailto:hello@garvata.com"
                className="text-cyan-700 hover:text-cyan-900 underline"
              >
                hello@garvata.com
              </a>
              .
            </p>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Privacy;
