"use client";

import Link from "next/link";
import { ArrowLeft, Shield01, ChevronRight, Home05 } from "@untitledui/icons";

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Privacy Policy</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Shield01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Privacy Policy
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Last updated: December 16, 2025
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="group mt-3 hidden items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10">
          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">1. Introduction</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Welcome to AdView (&quot;we,&quot; &quot;our,&quot; or &quot;us&quot;). We are committed to protecting your personal information and your right to privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you use our platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">2. Information We Collect</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We collect information that you provide directly to us, including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Personal identification information (name, email address, phone number)</li>
              <li>Account credentials (username and password)</li>
              <li>Payment information (bank account details, payment method preferences)</li>
              <li>Profile information (profile picture, preferences)</li>
              <li>Communication data (messages, feedback, support requests)</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">3. How We Use Your Information</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We use the information we collect to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Provide, maintain, and improve our services</li>
              <li>Process transactions and send related information</li>
              <li>Send you technical notices, updates, and support messages</li>
              <li>Respond to your comments, questions, and requests</li>
              <li>Monitor and analyze trends, usage, and activities</li>
              <li>Detect, investigate, and prevent fraudulent transactions</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">4. Information Sharing</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We may share your information in the following situations:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li><strong className="text-primary">With Service Providers:</strong> We may share your information with third-party vendors who provide services on our behalf.</li>
              <li><strong className="text-primary">For Business Transfers:</strong> We may share or transfer your information in connection with a merger, acquisition, or sale of assets.</li>
              <li><strong className="text-primary">With Your Consent:</strong> We may disclose your information for any other purpose with your consent.</li>
              <li><strong className="text-primary">Legal Requirements:</strong> We may disclose your information where required by law or to protect our rights.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">5. Data Security</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We implement appropriate technical and organizational security measures to protect your personal information. However, no method of transmission over the Internet or electronic storage is 100% secure, and we cannot guarantee absolute security.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">6. Your Rights</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Depending on your location, you may have the following rights:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Access to your personal information</li>
              <li>Correction of inaccurate or incomplete data</li>
              <li>Deletion of your personal information</li>
              <li>Data portability</li>
              <li>Withdrawal of consent</li>
              <li>Objection to processing</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">7. Cookies and Tracking</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We use cookies and similar tracking technologies to collect and track information about your activity on our platform. For more information, please see our <Link href="/cookies" className="text-brand-600 hover:underline">Cookie Policy</Link>.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">8. Children&apos;s Privacy</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have collected personal information from a child, we will take steps to delete such information.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">9. Changes to This Policy</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &quot;Last updated&quot; date.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">10. Contact Us</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              If you have any questions about this Privacy Policy, please contact us at:
            </p>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <p className="font-semibold text-primary">AdView Inc.</p>
              <p className="mt-1 text-tertiary">Email: privacy@adview.com</p>
              <p className="text-tertiary">Address: San Francisco, CA, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
