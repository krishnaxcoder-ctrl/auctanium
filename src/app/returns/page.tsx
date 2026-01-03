"use client";

import Link from "next/link";
import {
  RefreshCw05,
  ChevronRight,
  Home05,
  CheckCircle,
  XCircle,
  Clock,
  Package,
  CreditCard02,
  MessageChatCircle,
  ArrowRight,
  AlertCircle,
  Shield01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const returnSteps = [
  {
    step: 1,
    title: "Request Return",
    description: "Go to your order page and click 'Request Return' within 30 days of delivery.",
    icon: MessageChatCircle,
  },
  {
    step: 2,
    title: "Await Approval",
    description: "The seller reviews your request within 48 hours. You'll receive an email notification.",
    icon: Clock,
  },
  {
    step: 3,
    title: "Ship Item Back",
    description: "Once approved, you'll receive a prepaid shipping label. Pack the item securely.",
    icon: Package,
  },
  {
    step: 4,
    title: "Receive Refund",
    description: "Your refund is processed within 5-7 business days after the seller receives the item.",
    icon: CreditCard02,
  },
];

const eligibleReasons = [
  "Item not as described in listing",
  "Item arrived damaged",
  "Wrong item received",
  "Item is defective or doesn't work",
  "Missing parts or accessories",
  "Item is counterfeit or fake",
];

const nonEligibleReasons = [
  "Changed mind about purchase",
  "Found item cheaper elsewhere",
  "No longer need the item",
  "Item has been used or altered",
  "Beyond 30-day return window",
  "Custom or personalized items",
];

const refundTimelines = [
  { method: "Credit/Debit Card", time: "5-7 business days" },
  { method: "PayPal", time: "3-5 business days" },
  { method: "Bank Transfer", time: "7-10 business days" },
  { method: "UPI", time: "1-3 business days" },
  { method: "Store Credit", time: "Instant" },
];

export default function ReturnsPage() {
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
            <span className="text-white">Returns & Refunds</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <RefreshCw05 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Returns & Refunds
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Easy returns with our 30-day policy
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Overview Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-success-50 to-success-100 border border-success-200 p-6 sm:p-8">
          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
            <div className="flex size-14 items-center justify-center rounded-xl bg-success-600">
              <Shield01 className="size-7 text-white" />
            </div>
            <div className="flex-1">
              <h2 className="text-xl font-bold text-success-900">30-Day Return Policy</h2>
              <p className="mt-1 text-success-700">
                Shop with confidence. If your item doesn&apos;t match the description or arrives damaged,
                you&apos;re covered by our Buyer Protection guarantee.
              </p>
            </div>
            <Link href="/buyer-protection">
              <Button color="primary" size="md" iconTrailing={ArrowRight}>
                Learn More
              </Button>
            </Link>
          </div>
        </div>

        {/* Return Process Steps */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="brand" size="sm">Simple Process</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              How Returns Work
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {returnSteps.map((step, index) => (
              <div key={index} className="relative">
                <div className="rounded-xl border border-secondary bg-primary p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white font-bold">
                      {step.step}
                    </div>
                    <step.icon className="size-5 text-brand-600" />
                  </div>
                  <h3 className="font-semibold text-primary">{step.title}</h3>
                  <p className="mt-2 text-sm text-tertiary">{step.description}</p>
                </div>
                {index < returnSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 size-6 text-tertiary -translate-y-1/2" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Eligibility */}
        <div className="grid gap-6 lg:grid-cols-2 mb-12">
          {/* Eligible */}
          <div className="rounded-2xl border border-success-200 bg-success-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <CheckCircle className="size-6 text-success-600" />
              <h2 className="text-xl font-semibold text-primary">Eligible for Return</h2>
            </div>
            <ul className="space-y-3">
              {eligibleReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <CheckCircle className="size-5 text-success-600 flex-shrink-0 mt-0.5" />
                  <span className="text-primary">{reason}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Not Eligible */}
          <div className="rounded-2xl border border-error-200 bg-error-50/50 p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <XCircle className="size-6 text-error-600" />
              <h2 className="text-xl font-semibold text-primary">Not Eligible for Return</h2>
            </div>
            <ul className="space-y-3">
              {nonEligibleReasons.map((reason, index) => (
                <li key={index} className="flex items-start gap-3">
                  <XCircle className="size-5 text-error-600 flex-shrink-0 mt-0.5" />
                  <span className="text-primary">{reason}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Refund Timelines */}
        <div className="mb-12 rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-primary mb-6">Refund Processing Times</h2>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary">
                  <th className="py-3 px-4 text-left text-sm font-semibold text-primary">Payment Method</th>
                  <th className="py-3 px-4 text-left text-sm font-semibold text-primary">Refund Time</th>
                </tr>
              </thead>
              <tbody>
                {refundTimelines.map((item, index) => (
                  <tr key={index} className="border-b border-secondary last:border-0">
                    <td className="py-4 px-4 text-sm text-primary">{item.method}</td>
                    <td className="py-4 px-4 text-sm text-tertiary">{item.time}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Important Notes */}
        <div className="mb-12 rounded-2xl border border-warning-200 bg-warning-50/50 p-6 sm:p-8">
          <div className="flex items-start gap-3">
            <AlertCircle className="size-6 text-warning-600 flex-shrink-0 mt-0.5" />
            <div>
              <h2 className="text-lg font-semibold text-primary mb-3">Important Information</h2>
              <ul className="space-y-2 text-sm text-tertiary">
                <li>• Items must be returned in their original condition with all tags and packaging</li>
                <li>• Return shipping is free for items that don&apos;t match the description or arrive damaged</li>
                <li>• Buyer pays return shipping for change-of-mind returns (where applicable)</li>
                <li>• High-value items (over ₹50,000) may require additional verification</li>
                <li>• Refunds for partial returns are calculated based on returned items only</li>
              </ul>
            </div>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 text-center">
          <h2 className="text-2xl font-bold text-white mb-2">Need to Return an Item?</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Start your return request through your order page or contact our support team for assistance.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/orders">
              <Button color="secondary" size="lg">
                View My Orders
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
                Contact Support
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
