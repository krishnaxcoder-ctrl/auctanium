"use client";

import Link from "next/link";
import {
  Building07,
  ChevronRight,
  Home05,
  ArrowRight,
  CheckCircle,
  Users01,
  Globe01,
  Shield01,
  Zap,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const partnerCategories = [
  {
    title: "Payment Partners",
    description: "Secure and trusted payment processing",
    partners: [
      { name: "PayPal", logo: "https://upload.wikimedia.org/wikipedia/commons/b/b5/PayPal.svg" },
      { name: "Stripe", logo: "https://upload.wikimedia.org/wikipedia/commons/b/ba/Stripe_Logo%2C_revised_2016.svg" },
      { name: "Razorpay", logo: "https://razorpay.com/assets/razorpay-glyph.svg" },
    ],
  },
  {
    title: "Shipping Partners",
    description: "Reliable worldwide delivery",
    partners: [
      { name: "FedEx", logo: "fedex" },
      { name: "DHL", logo: "dhl" },
      { name: "Blue Dart", logo: "bluedart" },
    ],
  },
  {
    title: "Authentication Partners",
    description: "Expert verification services",
    partners: [
      { name: "PSA", logo: "psa" },
      { name: "BGS", logo: "bgs" },
      { name: "CGC", logo: "cgc" },
    ],
  },
];

const benefits = [
  {
    icon: Globe01,
    title: "Global Reach",
    description: "Access millions of buyers and sellers across 50+ countries worldwide.",
  },
  {
    icon: Shield01,
    title: "Trusted Platform",
    description: "Join a platform trusted by 50,000+ users with 99.9% uptime.",
  },
  {
    icon: Zap,
    title: "Advanced Technology",
    description: "Leverage our cutting-edge infrastructure and APIs for seamless integration.",
  },
  {
    icon: Users01,
    title: "Dedicated Support",
    description: "Get priority support and a dedicated partner success manager.",
  },
];

const partnershipTypes = [
  {
    title: "Technology Partners",
    description: "Integrate your services with our platform through our robust API ecosystem.",
    features: [
      "Full API access",
      "Developer documentation",
      "Sandbox environment",
      "Technical support",
    ],
  },
  {
    title: "Affiliate Partners",
    description: "Earn commissions by referring buyers and sellers to our marketplace.",
    features: [
      "Competitive commissions",
      "Real-time tracking",
      "Marketing materials",
      "Monthly payouts",
    ],
  },
  {
    title: "Enterprise Partners",
    description: "White-label solutions for businesses looking to launch their own auctions.",
    features: [
      "Custom branding",
      "Dedicated infrastructure",
      "SLA guarantees",
      "24/7 support",
    ],
  },
];

const testimonials = [
  {
    quote: "Partnering with Auctanium has opened new markets for our authentication services. Their platform is robust and their team is exceptional.",
    author: "James Wilson",
    role: "VP Partnerships",
    company: "AuthentiCo",
  },
  {
    quote: "The integration was seamless, and we've seen a 40% increase in transaction volume since launching on their platform.",
    author: "Sarah Chen",
    role: "CTO",
    company: "PayFlow",
  },
];

export default function PartnersPage() {
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
            <span className="text-white">Partners</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Building07 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Our Partners
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Trusted partners powering our platform
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Current Partners */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="brand" size="sm">Trusted Partners</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Industry Leaders Trust Us
            </h2>
            <p className="mt-2 text-tertiary max-w-2xl mx-auto">
              We partner with the best in the industry to provide a seamless experience.
            </p>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {partnerCategories.map((category, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-6">
                <h3 className="text-lg font-semibold text-primary mb-2">{category.title}</h3>
                <p className="text-sm text-tertiary mb-6">{category.description}</p>
                <div className="flex flex-wrap gap-4">
                  {category.partners.map((partner, i) => (
                    <div
                      key={i}
                      className="flex items-center justify-center h-12 px-4 rounded-lg bg-secondary"
                    >
                      <span className="text-sm font-medium text-primary">{partner.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Why Partner With Us */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="success" size="sm">Benefits</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Why Partner With Us
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6 text-center">
                <FeaturedIcon icon={benefit.icon} size="lg" color="brand" theme="light" className="mx-auto" />
                <h3 className="mt-4 font-semibold text-primary">{benefit.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Partnership Types */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="warning" size="sm">Partnership Options</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Choose Your Partnership
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {partnershipTypes.map((type, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-6">
                <h3 className="text-xl font-semibold text-primary">{type.title}</h3>
                <p className="mt-2 text-tertiary">{type.description}</p>
                <ul className="mt-6 space-y-3">
                  {type.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-primary">
                      <CheckCircle className="size-4 text-success-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
                <Button color="secondary" size="md" className="w-full mt-6">
                  Learn More
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-8">
                <p className="text-lg text-primary italic">&quot;{testimonial.quote}&quot;</p>
                <div className="mt-6">
                  <p className="font-semibold text-primary">{testimonial.author}</p>
                  <p className="text-sm text-tertiary">{testimonial.role}, {testimonial.company}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Users01 className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Become a Partner</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Join our partner ecosystem and grow your business with Auctanium.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                Get in Touch
              </Button>
            </Link>
            <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
              View Partner Portal
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
