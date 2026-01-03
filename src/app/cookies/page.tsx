"use client";

import Link from "next/link";
import { ArrowLeft, Settings01, ChevronRight, Home05 } from "@untitledui/icons";

export default function CookiePolicyPage() {
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
            <span className="text-white">Cookie Policy</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Settings01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Cookie Policy
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
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">1. What Are Cookies?</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences, keeping you logged in, and understanding how you use our platform.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">2. Types of Cookies We Use</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We use the following types of cookies on our platform:
            </p>

            <div className="mt-6 space-y-4">
              <div className="rounded-xl border border-secondary bg-secondary p-6">
                <div className="flex items-start justify-between">
                  <h3 className="text-lg font-semibold text-primary">Essential Cookies</h3>
                  <span className="rounded-full bg-green-100 px-3 py-1 text-sm font-medium text-green-800">
                    Always Active
                  </span>
                </div>
                <p className="mt-2 text-tertiary">
                  These cookies are necessary for the website to function properly. They enable basic functions like page navigation, secure areas access, and remembering your login status.
                </p>
              </div>

              <div className="rounded-xl border border-secondary bg-secondary p-6">
                <h3 className="text-lg font-semibold text-primary">Performance Cookies</h3>
                <p className="mt-2 text-tertiary">
                  These cookies help us understand how visitors interact with our website by collecting and reporting information anonymously. This helps us improve our platform&apos;s performance.
                </p>
              </div>

              <div className="rounded-xl border border-secondary bg-secondary p-6">
                <h3 className="text-lg font-semibold text-primary">Functionality Cookies</h3>
                <p className="mt-2 text-tertiary">
                  These cookies allow the website to remember choices you make (such as your language preference or region) and provide enhanced, more personalized features.
                </p>
              </div>

              <div className="rounded-xl border border-secondary bg-secondary p-6">
                <h3 className="text-lg font-semibold text-primary">Advertising Cookies</h3>
                <p className="mt-2 text-tertiary">
                  These cookies are used to deliver advertisements relevant to you and your interests. They also help limit the number of times you see an ad and measure the effectiveness of advertising campaigns.
                </p>
              </div>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">3. Third-Party Cookies</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We may use third-party services that place cookies on your device. These include:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li><strong className="text-primary">Google Analytics:</strong> For website analytics and performance monitoring</li>
              <li><strong className="text-primary">Payment Processors:</strong> For secure payment processing</li>
              <li><strong className="text-primary">Advertising Partners:</strong> For delivering relevant advertisements</li>
              <li><strong className="text-primary">Social Media:</strong> For social sharing functionality</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">4. Cookie Duration</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Cookies can be classified by how long they remain on your device:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li><strong className="text-primary">Session Cookies:</strong> These are temporary and are deleted when you close your browser.</li>
              <li><strong className="text-primary">Persistent Cookies:</strong> These remain on your device until they expire or you delete them. They can last from a few days to several years.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">5. Managing Cookies</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              You can control and manage cookies in several ways:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li><strong className="text-primary">Browser Settings:</strong> Most browsers allow you to refuse or accept cookies through their settings menu.</li>
              <li><strong className="text-primary">Cookie Preferences:</strong> Use our cookie consent banner to manage your preferences.</li>
              <li><strong className="text-primary">Third-Party Tools:</strong> Various online tools allow you to opt out of certain cookies.</li>
            </ul>
            <p className="mt-4 leading-relaxed text-tertiary">
              Please note that disabling certain cookies may affect the functionality of our website and limit your user experience.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">6. How to Delete Cookies</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              You can delete cookies from your browser at any time. Here&apos;s how to do it in popular browsers:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li><strong className="text-primary">Chrome:</strong> Settings → Privacy and Security → Clear browsing data</li>
              <li><strong className="text-primary">Firefox:</strong> Settings → Privacy & Security → Cookies and Site Data → Clear Data</li>
              <li><strong className="text-primary">Safari:</strong> Preferences → Privacy → Manage Website Data</li>
              <li><strong className="text-primary">Edge:</strong> Settings → Privacy, search, and services → Clear browsing data</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">7. Updates to This Policy</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We may update this Cookie Policy from time to time to reflect changes in technology, legislation, or our data practices. We encourage you to periodically review this page for the latest information on our cookie practices.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">8. Contact Us</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              If you have any questions about our use of cookies, please contact us at:
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
