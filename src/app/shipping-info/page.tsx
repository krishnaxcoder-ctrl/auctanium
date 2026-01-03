"use client";

import Link from "next/link";
import {
  Truck01,
  ChevronRight,
  Home05,
  Globe01,
  Clock,
  Package,
  CheckCircle,
  AlertCircle,
  Calculator,
  MarkerPin01,
  Shield01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const shippingOptions = [
  {
    name: "Standard Shipping",
    time: "5-7 business days",
    price: "₹99 - ₹299",
    description: "Reliable delivery for non-urgent items",
    features: ["Tracking included", "Insurance up to ₹5,000", "Signature not required"],
  },
  {
    name: "Express Shipping",
    time: "2-3 business days",
    price: "₹299 - ₹599",
    description: "Faster delivery for time-sensitive purchases",
    features: ["Priority handling", "Real-time tracking", "Insurance up to ₹25,000", "SMS updates"],
    popular: true,
  },
  {
    name: "Overnight Shipping",
    time: "Next business day",
    price: "₹599 - ₹1,499",
    description: "Guaranteed next-day delivery",
    features: ["Guaranteed delivery", "Full tracking", "Insurance up to ₹50,000", "Signature required"],
  },
];

const internationalZones = [
  {
    zone: "Zone 1",
    regions: "USA, Canada, UK, EU",
    time: "7-14 business days",
    startingPrice: "₹1,999",
  },
  {
    zone: "Zone 2",
    regions: "Australia, Japan, Singapore",
    time: "10-18 business days",
    startingPrice: "₹2,499",
  },
  {
    zone: "Zone 3",
    regions: "Middle East, Africa, South America",
    time: "14-21 business days",
    startingPrice: "₹2,999",
  },
];

const packagingGuidelines = [
  {
    icon: Package,
    title: "Secure Packaging",
    description: "All items are professionally packaged with appropriate cushioning materials.",
  },
  {
    icon: Shield01,
    title: "Insurance Coverage",
    description: "Shipping insurance is included for items up to ₹50,000. Higher values require additional coverage.",
  },
  {
    icon: CheckCircle,
    title: "Quality Checks",
    description: "Items are inspected before shipping to ensure they match the listing description.",
  },
  {
    icon: Clock,
    title: "Handling Time",
    description: "Sellers have 2-3 business days to ship after payment confirmation.",
  },
];

const faqs = [
  {
    question: "How is shipping cost calculated?",
    answer: "Shipping costs are based on package weight, dimensions, destination, and selected speed. You'll see the exact cost before placing a bid or purchasing.",
  },
  {
    question: "Can I change my shipping address after purchase?",
    answer: "Contact the seller immediately if you need to change your address. Changes must be requested before the item ships. Address changes may affect shipping costs.",
  },
  {
    question: "What if my package is lost or damaged?",
    answer: "All shipments include basic insurance. File a claim within 7 days of expected delivery. Our Buyer Protection covers lost or damaged items for full refund.",
  },
  {
    question: "Do you ship to PO boxes?",
    answer: "Standard shipping can deliver to PO boxes. Express and overnight options require a physical address for signature confirmation.",
  },
];

export default function ShippingInfoPage() {
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
            <span className="text-white">Shipping Information</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Truck01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Shipping Information
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Fast, reliable, and secure delivery options
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Domestic Shipping Options */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="brand" size="sm">Domestic Shipping</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Shipping Options Within India
            </h2>
            <p className="mt-2 text-tertiary max-w-2xl mx-auto">
              Choose the shipping speed that works best for you. All options include tracking.
            </p>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {shippingOptions.map((option, index) => (
              <div
                key={index}
                className={`relative rounded-xl border p-6 ${
                  option.popular
                    ? "border-brand-500 bg-brand-50/50 ring-1 ring-brand-500"
                    : "border-secondary bg-primary"
                }`}
              >
                {option.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge type="pill-color" color="brand" size="sm">Most Popular</Badge>
                  </div>
                )}
                <h3 className="text-lg font-semibold text-primary">{option.name}</h3>
                <div className="mt-2 flex items-center gap-2">
                  <Clock className="size-4 text-tertiary" />
                  <span className="text-sm text-tertiary">{option.time}</span>
                </div>
                <p className="mt-3 text-2xl font-bold text-brand-600">{option.price}</p>
                <p className="mt-2 text-sm text-tertiary">{option.description}</p>
                <ul className="mt-4 space-y-2">
                  {option.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2 text-sm text-primary">
                      <CheckCircle className="size-4 text-success-600" />
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* International Shipping */}
        <div className="mb-12">
          <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Globe01 className="size-6 text-brand-600" />
              <h2 className="text-xl font-semibold text-primary">International Shipping</h2>
            </div>
            <p className="text-tertiary mb-6">
              We ship to 50+ countries worldwide. Delivery times and costs vary by destination.
            </p>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-secondary">
                    <th className="py-3 px-4 text-left text-sm font-semibold text-primary">Zone</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-primary">Regions</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-primary">Delivery Time</th>
                    <th className="py-3 px-4 text-left text-sm font-semibold text-primary">Starting At</th>
                  </tr>
                </thead>
                <tbody>
                  {internationalZones.map((zone, index) => (
                    <tr key={index} className="border-b border-secondary last:border-0">
                      <td className="py-4 px-4 text-sm font-medium text-brand-600">{zone.zone}</td>
                      <td className="py-4 px-4 text-sm text-primary">{zone.regions}</td>
                      <td className="py-4 px-4 text-sm text-tertiary">{zone.time}</td>
                      <td className="py-4 px-4 text-sm font-semibold text-primary">{zone.startingPrice}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="mt-4 flex items-start gap-2 p-3 rounded-lg bg-warning-50 border border-warning-200">
              <AlertCircle className="size-5 text-warning-600 flex-shrink-0 mt-0.5" />
              <p className="text-sm text-warning-700">
                International buyers are responsible for customs duties and import taxes which vary by country.
              </p>
            </div>
          </div>
        </div>

        {/* Packaging & Handling */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="success" size="sm">Quality Assured</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Packaging & Handling
            </h2>
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {packagingGuidelines.map((item, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6 text-center">
                <FeaturedIcon icon={item.icon} size="lg" color="brand" theme="light" className="mx-auto" />
                <h3 className="mt-4 font-semibold text-primary">{item.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{item.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Shipping Calculator CTA */}
        <div className="mb-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-4">
              <div className="flex size-16 items-center justify-center rounded-xl bg-white/20">
                <Calculator className="size-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-white">Shipping Calculator</h2>
                <p className="text-brand-100">Get an instant quote for your shipping costs</p>
              </div>
            </div>
            <Button color="secondary" size="lg" iconTrailing={MarkerPin01}>
              Calculate Shipping
            </Button>
          </div>
        </div>

        {/* FAQ */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
          <h2 className="text-xl font-semibold text-primary mb-6">Frequently Asked Questions</h2>
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="border-b border-secondary pb-4 last:border-0 last:pb-0">
                <h3 className="font-medium text-primary">{faq.question}</h3>
                <p className="mt-2 text-sm text-tertiary">{faq.answer}</p>
              </div>
            ))}
          </div>
          <Link href="/faq" className="block mt-6">
            <Button color="secondary" size="md">View All FAQs</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
