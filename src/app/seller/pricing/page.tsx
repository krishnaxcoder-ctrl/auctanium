"use client";

import Link from "next/link";
import {
  CurrencyRupee,
  ChevronRight,
  Home05,
  CheckCircle,
  ArrowRight,
  HelpCircle,
  Zap,
  Star01,
  Shield01,
  TrendUp01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const pricingTiers = [
  {
    name: "Basic",
    description: "Perfect for casual sellers",
    monthlyFee: "Free",
    finalValueFee: "8%",
    features: [
      "Up to 10 listings/month",
      "Standard listing duration (7 days)",
      "Basic seller analytics",
      "Email support",
      "Buyer protection included",
    ],
    notIncluded: [
      "Featured listings",
      "Priority support",
      "Authentication services",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Professional",
    description: "For serious sellers",
    monthlyFee: "₹999",
    finalValueFee: "5%",
    features: [
      "Unlimited listings",
      "Extended listing duration (14 days)",
      "Advanced seller analytics",
      "Priority email & chat support",
      "5 featured listings/month",
      "Seller badge",
      "Bulk listing tools",
      "Custom store page",
    ],
    notIncluded: [
      "Dedicated account manager",
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Enterprise",
    description: "For high-volume sellers",
    monthlyFee: "₹4,999",
    finalValueFee: "3%",
    features: [
      "Everything in Professional",
      "Unlimited featured listings",
      "Dedicated account manager",
      "Phone support",
      "Authentication credits",
      "API access",
      "Custom integrations",
      "Lowest fees guaranteed",
    ],
    notIncluded: [],
    cta: "Contact Sales",
    popular: false,
  },
];

const additionalFees = [
  {
    name: "Listing Fee",
    description: "Charged when listing an item",
    fee: "Free for first 50 listings/month, then ₹10/listing",
  },
  {
    name: "Final Value Fee",
    description: "Percentage of final sale price",
    fee: "3% - 8% (varies by plan)",
  },
  {
    name: "Payment Processing",
    description: "Credit/debit card processing",
    fee: "2% + ₹3 per transaction",
  },
  {
    name: "Featured Listing",
    description: "Promote your listing",
    fee: "₹49 - ₹199 per listing",
  },
  {
    name: "Authentication",
    description: "Expert item verification",
    fee: "₹499 - ₹2,999 per item",
  },
];

const faqs = [
  {
    question: "When am I charged the final value fee?",
    answer: "The final value fee is charged only when your item sells. It's automatically deducted from your earnings before payout.",
  },
  {
    question: "Can I change my plan anytime?",
    answer: "Yes! You can upgrade or downgrade your plan at any time. Changes take effect immediately, and we'll prorate any charges.",
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts. All paid plans are month-to-month. Cancel anytime with no cancellation fees.",
  },
  {
    question: "What payment methods do you accept?",
    answer: "We accept all major credit/debit cards, UPI, net banking, and PayPal for subscription payments.",
  },
];

const benefits = [
  { icon: Shield01, title: "Secure Payments", description: "Protected by bank-level encryption" },
  { icon: TrendUp01, title: "Sales Analytics", description: "Track your performance" },
  { icon: Star01, title: "Seller Support", description: "Help when you need it" },
  { icon: Zap, title: "Fast Payouts", description: "Get paid within 2-3 days" },
];

export default function SellerPricingPage() {
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
            <Link href="/sell" className="text-white/70 hover:text-white">Sell</Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Pricing</span>
          </nav>

          <div className="text-center py-8">
            <Badge type="pill-color" color="warning" size="lg" className="mb-4">
              <CurrencyRupee className="size-4 mr-1" />
              Simple, Transparent Pricing
            </Badge>
            <h1 className="text-2xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Choose the Plan That&apos;s Right for You
            </h1>
            <p className="text-lg text-white/80 max-w-2xl mx-auto">
              Start for free and upgrade as you grow. Only pay when you sell.
            </p>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Pricing Cards */}
        <div className="grid gap-6 lg:grid-cols-3 mb-16">
          {pricingTiers.map((tier, index) => (
            <div
              key={index}
              className={`relative rounded-2xl border p-6 sm:p-8 ${
                tier.popular
                  ? "border-brand-500 bg-brand-50/50 ring-1 ring-brand-500"
                  : "border-secondary bg-primary"
              }`}
            >
              {tier.popular && (
                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                  <Badge type="pill-color" color="brand" size="md">Most Popular</Badge>
                </div>
              )}

              <div className="mb-6">
                <h3 className="text-xl font-bold text-primary">{tier.name}</h3>
                <p className="text-sm text-tertiary mt-1">{tier.description}</p>
              </div>

              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-3xl font-bold text-primary">{tier.monthlyFee}</span>
                  {tier.monthlyFee !== "Free" && <span className="text-tertiary">/month</span>}
                </div>
                <p className="text-sm text-tertiary mt-2">
                  + {tier.finalValueFee} final value fee
                </p>
              </div>

              <Link href={tier.name === "Enterprise" ? "/contact" : "/signup"}>
                <Button
                  color={tier.popular ? "primary" : "secondary"}
                  size="lg"
                  className="w-full mb-6"
                  iconTrailing={ArrowRight}
                >
                  {tier.cta}
                </Button>
              </Link>

              <div className="space-y-3">
                {tier.features.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <CheckCircle className="size-5 text-success-600 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-primary">{feature}</span>
                  </div>
                ))}
                {tier.notIncluded.map((feature, i) => (
                  <div key={i} className="flex items-start gap-2 opacity-50">
                    <CheckCircle className="size-5 text-tertiary flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-tertiary line-through">{feature}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Benefits */}
        <div className="grid gap-6 sm:grid-cols-4 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center">
              <FeaturedIcon icon={benefit.icon} size="lg" color="brand" theme="light" className="mx-auto mb-3" />
              <h3 className="font-semibold text-primary">{benefit.title}</h3>
              <p className="text-sm text-tertiary">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Additional Fees */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Additional Fees</h2>
          <div className="rounded-2xl border border-secondary bg-primary overflow-hidden">
            <table className="w-full">
              <thead>
                <tr className="bg-secondary">
                  <th className="py-4 px-6 text-left text-sm font-semibold text-primary">Fee Type</th>
                  <th className="py-4 px-6 text-left text-sm font-semibold text-primary hidden sm:table-cell">Description</th>
                  <th className="py-4 px-6 text-right text-sm font-semibold text-primary">Amount</th>
                </tr>
              </thead>
              <tbody>
                {additionalFees.map((fee, index) => (
                  <tr key={index} className="border-t border-secondary">
                    <td className="py-4 px-6">
                      <p className="font-medium text-primary">{fee.name}</p>
                      <p className="text-sm text-tertiary sm:hidden">{fee.description}</p>
                    </td>
                    <td className="py-4 px-6 text-sm text-tertiary hidden sm:table-cell">{fee.description}</td>
                    <td className="py-4 px-6 text-right text-sm text-primary">{fee.fee}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* FAQ */}
        <div className="mb-16">
          <h2 className="text-2xl font-bold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="grid gap-6 sm:grid-cols-2">
            {faqs.map((faq, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6">
                <div className="flex items-start gap-3">
                  <HelpCircle className="size-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div>
                    <h3 className="font-semibold text-primary mb-2">{faq.question}</h3>
                    <p className="text-sm text-tertiary">{faq.answer}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Zap className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Ready to Start Selling?</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Join 50,000+ sellers. Start with our free plan—no credit card required.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                Start Selling Free
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
                Talk to Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
