"use client";

import Link from "next/link";
import {
  Lock01,
  ChevronRight,
  Home05,
  Shield01,
  Key01,
  Eye,
  Server01,
  CheckCircle,
  AlertTriangle,
  FileCheck02,
  Globe01,
  Fingerprint01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const securityFeatures = [
  {
    icon: Lock01,
    title: "256-bit SSL Encryption",
    description: "All data transmitted between your browser and our servers is protected with bank-level encryption.",
    color: "brand" as const,
  },
  {
    icon: Key01,
    title: "Two-Factor Authentication",
    description: "Add an extra layer of security to your account with SMS, authenticator apps, or hardware keys.",
    color: "success" as const,
  },
  {
    icon: Fingerprint01,
    title: "Biometric Login",
    description: "Use fingerprint or face recognition for secure and convenient access to your account.",
    color: "warning" as const,
  },
  {
    icon: Server01,
    title: "Secure Infrastructure",
    description: "Our servers are hosted in SOC 2 compliant data centers with 24/7 monitoring.",
    color: "error" as const,
  },
];

const certifications = [
  { name: "PCI DSS", description: "Payment Card Industry Data Security Standard" },
  { name: "SOC 2 Type II", description: "Service Organization Control compliance" },
  { name: "ISO 27001", description: "Information Security Management" },
  { name: "GDPR", description: "General Data Protection Regulation" },
];

const protections = [
  {
    title: "Payment Protection",
    items: [
      "Secure payment processing via certified gateways",
      "No storage of full credit card numbers",
      "Real-time fraud detection and prevention",
      "Chargeback protection for eligible transactions",
    ],
  },
  {
    title: "Account Protection",
    items: [
      "Automatic logout on suspicious activity",
      "Login notifications and activity logs",
      "Secure password requirements",
      "Account recovery verification",
    ],
  },
  {
    title: "Data Protection",
    items: [
      "End-to-end encryption for sensitive data",
      "Regular security audits and penetration testing",
      "Encrypted backups in multiple locations",
      "Right to data deletion (GDPR compliant)",
    ],
  },
];

const securityTips = [
  {
    title: "Use a Strong Password",
    description: "Create a unique password with at least 12 characters, including uppercase, lowercase, numbers, and symbols.",
  },
  {
    title: "Enable 2FA",
    description: "Two-factor authentication adds an extra layer of security even if your password is compromised.",
  },
  {
    title: "Beware of Phishing",
    description: "We never ask for your password via email. Always verify you're on auctanium.com before logging in.",
  },
  {
    title: "Keep Software Updated",
    description: "Regularly update your browser and operating system to protect against known vulnerabilities.",
  },
];

export default function SecurityPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white">
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Security</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Shield01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Security Center
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Your security is our top priority
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-success-600 to-success-700 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <Lock01 className="size-16 text-white" />
              <div>
                <h2 className="text-2xl font-bold text-white">Enterprise-Grade Security</h2>
                <p className="text-success-100 mt-1">
                  Protecting over 50,000 users and ₹15 Crore+ in transactions
                </p>
              </div>
            </div>
            <div className="flex flex-wrap gap-3">
              {certifications.map((cert, i) => (
                <div key={i} className="px-3 py-2 rounded-lg bg-white/20 text-white">
                  <p className="text-sm font-semibold">{cert.name}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Security Features */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="brand" size="sm">How We Protect You</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Security Features
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {securityFeatures.map((feature, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6 text-center">
                <FeaturedIcon icon={feature.icon} size="lg" color={feature.color} theme="light" className="mx-auto" />
                <h3 className="mt-4 font-semibold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Protection Details */}
        <div className="mb-12">
          <div className="grid gap-6 lg:grid-cols-3">
            {protections.map((protection, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-6">
                <h3 className="text-lg font-semibold text-primary mb-4">{protection.title}</h3>
                <ul className="space-y-3">
                  {protection.items.map((item, i) => (
                    <li key={i} className="flex items-start gap-2 text-sm text-primary">
                      <CheckCircle className="size-4 text-success-600 flex-shrink-0 mt-0.5" />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Certifications */}
        <div className="mb-12 rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
          <div className="flex items-center gap-3 mb-6">
            <FileCheck02 className="size-6 text-brand-600" />
            <h2 className="text-xl font-semibold text-primary">Compliance & Certifications</h2>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {certifications.map((cert, index) => (
              <div key={index} className="p-4 rounded-lg bg-secondary">
                <p className="font-semibold text-brand-600">{cert.name}</p>
                <p className="text-sm text-tertiary mt-1">{cert.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Security Tips */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="warning" size="sm">Stay Safe</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Security Tips
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {securityTips.map((tip, index) => (
              <div key={index} className="flex gap-4 rounded-xl border border-secondary bg-primary p-6">
                <div className="flex size-10 items-center justify-center rounded-lg bg-warning-100 flex-shrink-0">
                  <AlertTriangle className="size-5 text-warning-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{tip.title}</h3>
                  <p className="mt-1 text-sm text-tertiary">{tip.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Report Security Issue */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Eye className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Report a Security Issue</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Found a security vulnerability? We take security reports seriously and appreciate your help.
          </p>
          <Link href="/contact">
            <Button color="secondary" size="lg">
              Report Issue
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
