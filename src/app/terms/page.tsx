"use client";

import Link from "next/link";
import { ArrowLeft, File06, ChevronRight, Home05 } from "@untitledui/icons";

export default function TermsOfServicePage() {
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
            <span className="text-white">Terms of Service</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <File06 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Terms of Service
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
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">1. Agreement to Terms</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              By accessing or using AdView&apos;s services, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our services.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">2. Eligibility</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              To use our services, you must:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Be at least 18 years of age</li>
              <li>Have the legal capacity to enter into a binding agreement</li>
              <li>Not be prohibited from using our services under applicable laws</li>
              <li>Provide accurate and complete registration information</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">3. Account Registration</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              When you create an account with us, you agree to:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Provide accurate, current, and complete information</li>
              <li>Maintain and promptly update your account information</li>
              <li>Maintain the security of your password and account</li>
              <li>Accept responsibility for all activities under your account</li>
              <li>Notify us immediately of any unauthorized access</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">4. How AdView Works</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              AdView is a platform that allows users to earn money by watching advertisements. By using our service:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>You agree to watch advertisements in their entirety as required</li>
              <li>You understand that earnings are based on completed ad views</li>
              <li>You acknowledge that ad availability may vary</li>
              <li>You agree not to use automated tools or bots to watch ads</li>
              <li>You understand that we may modify earning rates at any time</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">5. Payments and Withdrawals</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Regarding payments and withdrawals:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Minimum withdrawal amount: $10.00 USD</li>
              <li>Payment processing time: 1-3 business days</li>
              <li>Supported payment methods: PayPal, Bank Transfer, Crypto</li>
              <li>You are responsible for any taxes on your earnings</li>
              <li>We reserve the right to withhold payments for suspected fraud</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">6. Prohibited Activities</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              You agree not to engage in any of the following prohibited activities:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Using automated scripts, bots, or other software to interact with ads</li>
              <li>Creating multiple accounts to increase earnings</li>
              <li>Providing false or misleading information</li>
              <li>Attempting to circumvent security measures</li>
              <li>Interfering with the proper working of the platform</li>
              <li>Engaging in any fraudulent or deceptive practices</li>
              <li>Violating any applicable laws or regulations</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">7. Intellectual Property</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              All content, features, and functionality of our platform are owned by AdView and are protected by international copyright, trademark, and other intellectual property laws. You may not reproduce, distribute, modify, or create derivative works without our prior written consent.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">8. Termination</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We may terminate or suspend your account and access to our services immediately, without prior notice, for any reason, including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Violation of these Terms of Service</li>
              <li>Fraudulent or suspicious activity</li>
              <li>Request by law enforcement or government agencies</li>
              <li>Discontinuation of service</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">9. Disclaimer of Warranties</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Our services are provided &quot;as is&quot; and &quot;as available&quot; without warranties of any kind, either express or implied. We do not guarantee that our services will be uninterrupted, secure, or error-free.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">10. Limitation of Liability</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              To the maximum extent permitted by law, AdView shall not be liable for any indirect, incidental, special, consequential, or punitive damages, including loss of profits, data, or other intangible losses.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">11. Governing Law</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              These Terms shall be governed by and construed in accordance with the laws of the State of California, United States, without regard to its conflict of law provisions.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">12. Changes to Terms</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We reserve the right to modify these terms at any time. We will notify users of any material changes by posting the new Terms of Service on this page. Your continued use of the platform after changes constitutes acceptance of the new terms.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">13. Contact Us</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <p className="font-semibold text-primary">AdView Inc.</p>
              <p className="mt-1 text-tertiary">Email: legal@adview.com</p>
              <p className="text-tertiary">Address: San Francisco, CA, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
