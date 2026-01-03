"use client";

import Link from "next/link";
import {
  ShieldTick,
  ChevronRight,
  Home05,
  CheckCircle,
  Package,
  CreditCard02,
  Clock,
  AlertTriangle,
  MessageChatCircle,
  ArrowRight,
  Lock01,
  Eye,
  RefreshCw05,
  ThumbsUp,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const protectionFeatures = [
  {
    icon: Package,
    title: "Item Not Received",
    description: "If your item never arrives, you'll get a full refund including any shipping costs you paid.",
    color: "brand" as const,
  },
  {
    icon: Eye,
    title: "Not As Described",
    description: "If the item significantly differs from the listing description or photos, you're covered.",
    color: "success" as const,
  },
  {
    icon: AlertTriangle,
    title: "Counterfeit Items",
    description: "Receive a fake or counterfeit item? Get a full refund plus we'll take action against the seller.",
    color: "warning" as const,
  },
  {
    icon: RefreshCw05,
    title: "Damaged in Transit",
    description: "Items damaged during shipping are fully covered. Document damage upon arrival for quick resolution.",
    color: "error" as const,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Shop with Confidence",
    description: "Every eligible purchase on Auctanium is automatically covered by Buyer Protection at no extra cost.",
  },
  {
    step: 2,
    title: "Report an Issue",
    description: "If something goes wrong, report it through your order page within 30 days of delivery (or expected delivery).",
  },
  {
    step: 3,
    title: "We Investigate",
    description: "Our Trust & Safety team reviews your case, communicates with the seller, and gathers evidence.",
  },
  {
    step: 4,
    title: "Resolution & Refund",
    description: "If your claim is valid, you'll receive a full refund within 5-7 business days.",
  },
];

const coverageLevels = [
  {
    tier: "Standard",
    coverage: "Up to ₹50,000",
    features: [
      "Item not received protection",
      "Not as described claims",
      "30-day coverage window",
      "Basic support",
    ],
    included: true,
  },
  {
    tier: "Premium",
    coverage: "Up to ₹5,00,000",
    features: [
      "Everything in Standard",
      "Extended 60-day window",
      "Priority support",
      "Expedited refunds",
      "Authentication services",
    ],
    highlight: true,
  },
  {
    tier: "Collector",
    coverage: "Unlimited",
    features: [
      "Everything in Premium",
      "90-day coverage window",
      "Dedicated account manager",
      "White-glove shipping",
      "Full authentication",
      "Insurance included",
    ],
  },
];

const testimonials = [
  {
    quote: "When my watch arrived damaged, the Buyer Protection team resolved it within 48 hours. Full refund, no questions asked.",
    author: "Rahul M.",
    location: "Mumbai",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "I was worried about buying high-value items online, but knowing I'm protected gives me peace of mind.",
    author: "Priya S.",
    location: "Bangalore",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function BuyerProtectionPage() {
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
            <span className="text-white">Buyer Protection</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <ShieldTick className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Buyer Protection
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Shop with complete confidence and peace of mind
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-success-600 to-success-700 p-8 sm:p-12 text-center">
          <ShieldTick className="size-16 text-white mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
            100% Money-Back Guarantee
          </h2>
          <p className="text-success-100 max-w-2xl mx-auto text-lg">
            Every purchase on Auctanium is protected. If something goes wrong, we&apos;ve got you covered.
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-4">
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Lock01 className="size-4 text-white" />
              <span className="text-sm text-white font-medium">Secure Payments</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <ThumbsUp className="size-4 text-white" />
              <span className="text-sm text-white font-medium">Verified Sellers</span>
            </div>
            <div className="flex items-center gap-2 bg-white/20 rounded-full px-4 py-2">
              <Clock className="size-4 text-white" />
              <span className="text-sm text-white font-medium">30-Day Coverage</span>
            </div>
          </div>
        </div>

        {/* What's Covered */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="brand" size="sm">What&apos;s Covered</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Protection That Covers You
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {protectionFeatures.map((feature, index) => (
              <div
                key={index}
                className="rounded-xl border border-secondary bg-primary p-6"
              >
                <FeaturedIcon icon={feature.icon} size="lg" color={feature.color} theme="light" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="success" size="sm">Simple Process</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              How Buyer Protection Works
            </h2>
          </div>

          <div className="relative">
            <div className="absolute left-8 top-0 bottom-0 w-px bg-border-secondary hidden sm:block" />
            <div className="space-y-6">
              {howItWorks.map((step, index) => (
                <div key={index} className="relative flex gap-6">
                  <div className="flex size-16 items-center justify-center rounded-full bg-brand-600 text-white font-bold text-xl flex-shrink-0 relative z-10">
                    {step.step}
                  </div>
                  <div className="flex-1 rounded-xl border border-secondary bg-primary p-6">
                    <h3 className="text-lg font-semibold text-primary">{step.title}</h3>
                    <p className="mt-2 text-tertiary">{step.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Coverage Tiers */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="warning" size="sm">Coverage Levels</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Choose Your Protection Level
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {coverageLevels.map((level, index) => (
              <div
                key={index}
                className={`rounded-2xl border p-6 ${
                  level.highlight
                    ? "border-brand-500 bg-brand-50/50 ring-1 ring-brand-500"
                    : "border-secondary bg-primary"
                }`}
              >
                {level.highlight && (
                  <Badge type="pill-color" color="brand" size="sm" className="mb-4">
                    Recommended
                  </Badge>
                )}
                <h3 className="text-xl font-bold text-primary">{level.tier}</h3>
                <p className="text-2xl font-bold text-brand-600 mt-2">{level.coverage}</p>
                <ul className="mt-6 space-y-3">
                  {level.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-primary">
                      <CheckCircle className="size-4 text-success-600 flex-shrink-0" />
                      {feature}
                    </li>
                  ))}
                </ul>
                {level.included ? (
                  <div className="mt-6 text-center">
                    <span className="text-sm font-medium text-success-600">Included Free</span>
                  </div>
                ) : (
                  <Button color={level.highlight ? "primary" : "secondary"} size="md" className="w-full mt-6">
                    Upgrade
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-12">
          <div className="grid gap-6 sm:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6">
                <p className="text-primary italic">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-4 flex items-center gap-3">
                  <img
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    className="size-10 rounded-full object-cover"
                  />
                  <div>
                    <p className="font-medium text-primary">{testimonial.author}</p>
                    <p className="text-sm text-tertiary">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <MessageChatCircle className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Need Help with a Claim?</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Our Trust & Safety team is here to help you resolve any issues quickly.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                Contact Support
              </Button>
            </Link>
            <Link href="/faq">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
                Read FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
