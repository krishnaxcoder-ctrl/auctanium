"use client";

import Link from "next/link";
import { ArrowLeft, Globe01, ChevronRight, Home05, Check } from "@untitledui/icons";

export default function GDPRPage() {
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
            <span className="text-white">GDPR Compliance</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Globe01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  GDPR Compliance
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
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">1. Our Commitment to GDPR</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              AdView is committed to protecting the privacy and security of personal data in accordance with the General Data Protection Regulation (GDPR). This page outlines how we comply with GDPR requirements and how you can exercise your rights.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">2. Data Controller Information</h2>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <p className="font-semibold text-primary">Data Controller:</p>
              <p className="text-tertiary">AdView Inc.</p>
              <p className="text-tertiary">San Francisco, CA, USA</p>
              <p className="mt-4 font-semibold text-primary">Data Protection Officer:</p>
              <p className="text-tertiary">Email: dpo@adview.com</p>
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">3. Your GDPR Rights</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              Under GDPR, you have the following rights regarding your personal data:
            </p>

            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {[
                { title: "Right to Access", desc: "You have the right to request a copy of the personal data we hold about you." },
                { title: "Right to Rectification", desc: "You can request correction of inaccurate or incomplete personal data." },
                { title: "Right to Erasure", desc: "You can request deletion of your personal data under certain circumstances." },
                { title: "Right to Restrict Processing", desc: "You can request restriction of processing of your personal data." },
                { title: "Right to Data Portability", desc: "You can request to receive your data in a structured, commonly used format." },
                { title: "Right to Object", desc: "You can object to processing based on legitimate interests or direct marketing." },
                { title: "Right to Withdraw Consent", desc: "You can withdraw your consent at any time where processing is based on consent." },
              ].map((right) => (
                <div key={right.title} className="flex items-start gap-4 rounded-xl border border-secondary bg-secondary p-4">
                  <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-brand-100">
                    <Check className="size-5 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{right.title}</h3>
                    <p className="mt-1 text-sm text-tertiary">{right.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">4. Legal Basis for Processing</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We process personal data based on the following legal grounds:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li><strong className="text-primary">Consent:</strong> Where you have given clear consent for us to process your data.</li>
              <li><strong className="text-primary">Contract:</strong> Processing necessary for the performance of a contract with you.</li>
              <li><strong className="text-primary">Legal Obligation:</strong> Processing necessary for compliance with legal obligations.</li>
              <li><strong className="text-primary">Legitimate Interests:</strong> Processing necessary for our legitimate business interests.</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">5. Data Retention</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We retain personal data only for as long as necessary to fulfill the purposes for which it was collected, including:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Account data: Retained while your account is active and for 3 years after closure</li>
              <li>Transaction data: Retained for 7 years for legal and tax purposes</li>
              <li>Marketing data: Retained until you unsubscribe or withdraw consent</li>
              <li>Analytics data: Retained for 26 months</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">6. International Data Transfers</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              When we transfer personal data outside the European Economic Area (EEA), we ensure appropriate safeguards are in place:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Standard Contractual Clauses (SCCs) approved by the European Commission</li>
              <li>Transfers to countries with adequate data protection laws</li>
              <li>Binding Corporate Rules where applicable</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">7. Data Security Measures</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We implement robust technical and organizational measures to protect your data:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Encryption of data in transit and at rest</li>
              <li>Regular security assessments and penetration testing</li>
              <li>Access controls and authentication mechanisms</li>
              <li>Employee training on data protection</li>
              <li>Incident response procedures</li>
            </ul>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">8. How to Exercise Your Rights</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              To exercise any of your GDPR rights, you can:
            </p>
            <ul className="mt-4 list-disc space-y-2 pl-6 text-tertiary">
              <li>Email our Data Protection Officer at dpo@adview.com</li>
              <li>Use the data management tools in your account settings</li>
              <li>Submit a written request to our registered address</li>
            </ul>
            <p className="mt-4 leading-relaxed text-tertiary">
              We will respond to your request within 30 days. In complex cases, we may extend this by an additional 60 days, and we will inform you of any extension.
            </p>
          </section>

          <section className="mb-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">9. Complaints</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              If you believe we have not handled your data correctly, you have the right to lodge a complaint with a supervisory authority. For EU residents, you can contact your local Data Protection Authority.
            </p>
          </section>

          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">10. Contact Us</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              For any GDPR-related inquiries, please contact our Data Protection Officer:
            </p>
            <div className="mt-4 rounded-xl border border-secondary bg-secondary p-6">
              <p className="font-semibold text-primary">Data Protection Officer</p>
              <p className="text-tertiary">AdView Inc.</p>
              <p className="mt-1 text-tertiary">Email: dpo@adview.com</p>
              <p className="text-tertiary">Address: San Francisco, CA, USA</p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
