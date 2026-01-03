"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Sale02,
  ChevronRight,
  Home05,
  Clock,
  Percent03,
  ArrowRight,
  Tag01,
  Gift01,
  Zap,
  Copy01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useState } from "react";

const featuredPromo = {
  title: "New Year Sale",
  subtitle: "Up to 50% Off on Premium Items",
  description: "Start the year with amazing deals on watches, jewelry, art, and more. Limited time only!",
  code: "NEWYEAR2026",
  discount: "50%",
  endsIn: "2d 14h 32m",
  image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=800&h=400&fit=crop",
};

const activePromos = [
  {
    id: 1,
    title: "First Purchase Discount",
    description: "Get ₹500 off your first winning bid",
    code: "FIRSTWIN",
    discount: "₹500 Off",
    validUntil: "Ongoing",
    category: "New Users",
    color: "brand" as const,
  },
  {
    id: 2,
    title: "Free Shipping Weekend",
    description: "Free shipping on all orders over ₹5,000",
    code: "FREESHIP",
    discount: "Free Shipping",
    validUntil: "This Weekend",
    category: "Shipping",
    color: "success" as const,
  },
  {
    id: 3,
    title: "Watch Lovers Special",
    description: "Extra 10% off on all authenticated watches",
    code: "WATCH10",
    discount: "10% Off",
    validUntil: "Jan 15, 2026",
    category: "Watches",
    color: "warning" as const,
  },
  {
    id: 4,
    title: "Bulk Buyer Bonus",
    description: "Win 3+ auctions this month, get ₹2,000 credit",
    code: "BULK3",
    discount: "₹2,000 Credit",
    validUntil: "Jan 31, 2026",
    category: "Loyalty",
    color: "error" as const,
  },
];

const upcomingPromos = [
  {
    title: "Valentine's Day Special",
    description: "20% off jewelry and watches",
    startDate: "Feb 7, 2026",
  },
  {
    title: "Spring Collection Launch",
    description: "Early access for members",
    startDate: "Mar 1, 2026",
  },
  {
    title: "Collector's Week",
    description: "Exclusive auctions for rare items",
    startDate: "Mar 15, 2026",
  },
];

const categories = [
  { name: "All Categories", icon: Tag01, active: true },
  { name: "Watches", icon: Clock },
  { name: "Fashion", icon: Gift01 },
  { name: "New Users", icon: Zap },
];

export default function PromotionsPage() {
  const [copiedCode, setCopiedCode] = useState<string | null>(null);

  const copyCode = (code: string) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-error-600 to-orange-600">
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
            <span className="text-white">Promotions</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Sale02 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Promotions & Deals
              </h1>
              <p className="mt-2 hidden text-white/80 sm:block">
                Save big on your favorite items
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Featured Promotion */}
        <div className="mb-12 rounded-2xl overflow-hidden">
          <div className="relative">
            <Image
              src={featuredPromo.image}
              alt={featuredPromo.title}
              width={1200}
              height={400}
              className="w-full h-64 sm:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-transparent" />
            <div className="absolute inset-0 p-6 sm:p-10 flex flex-col justify-center">
              <Badge type="pill-color" color="error" size="lg" className="w-fit mb-3">
                <Percent03 className="size-4 mr-1" />
                {featuredPromo.discount} OFF
              </Badge>
              <h2 className="text-2xl sm:text-4xl font-bold text-white mb-2">
                {featuredPromo.title}
              </h2>
              <p className="text-lg text-white/80 mb-4">{featuredPromo.subtitle}</p>
              <p className="text-white/70 max-w-lg mb-6 hidden sm:block">{featuredPromo.description}</p>
              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2 bg-white/20 rounded-lg px-4 py-2">
                  <span className="text-white font-mono font-bold">{featuredPromo.code}</span>
                  <button onClick={() => copyCode(featuredPromo.code)} className="text-white/80 hover:text-white">
                    <Copy01 className="size-4" />
                  </button>
                </div>
                <div className="flex items-center gap-2 text-white">
                  <Clock className="size-4" />
                  <span className="text-sm">Ends in {featuredPromo.endsIn}</span>
                </div>
                <Link href="/marketplace">
                  <Button color="secondary" size="md" iconTrailing={ArrowRight}>
                    Shop Now
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>

        {/* Active Promotions */}
        <div className="mb-12">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-xl font-semibold text-primary">Active Promotions</h2>
            <div className="flex gap-2">
              {categories.map((cat, i) => (
                <button
                  key={i}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-all ${
                    cat.active
                      ? "bg-brand-600 text-white"
                      : "bg-secondary text-secondary hover:bg-brand-100 hover:text-brand-700"
                  }`}
                >
                  {cat.name}
                </button>
              ))}
            </div>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {activePromos.map((promo) => (
              <div
                key={promo.id}
                className="rounded-2xl border border-secondary bg-primary p-6 hover:border-brand-300 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <Badge type="pill-color" color={promo.color} size="sm" className="mb-3">
                      {promo.category}
                    </Badge>
                    <h3 className="text-lg font-semibold text-primary">{promo.title}</h3>
                    <p className="text-sm text-tertiary mt-1">{promo.description}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xl font-bold text-brand-600">{promo.discount}</p>
                  </div>
                </div>
                <div className="mt-4 pt-4 border-t border-secondary flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-sm bg-secondary px-2 py-1 rounded">{promo.code}</span>
                    <button
                      onClick={() => copyCode(promo.code)}
                      className="p-1.5 rounded-lg text-tertiary hover:text-brand-600 hover:bg-brand-100 transition-colors"
                    >
                      {copiedCode === promo.code ? (
                        <span className="text-xs text-success-600">Copied!</span>
                      ) : (
                        <Copy01 className="size-4" />
                      )}
                    </button>
                  </div>
                  <span className="text-sm text-tertiary">Valid until {promo.validUntil}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Promotions */}
        <div className="mb-12">
          <h2 className="text-xl font-semibold text-primary mb-6">Coming Soon</h2>
          <div className="grid gap-4 lg:grid-cols-3">
            {upcomingPromos.map((promo, index) => (
              <div
                key={index}
                className="rounded-xl border border-secondary bg-secondary/30 p-6"
              >
                <p className="text-sm text-brand-600 font-medium mb-1">Starts {promo.startDate}</p>
                <h3 className="font-semibold text-primary">{promo.title}</h3>
                <p className="text-sm text-tertiary mt-1">{promo.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Newsletter CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Zap className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Never Miss a Deal</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Subscribe to get exclusive promotions and early access to sales.
          </p>
          <Link href="/newsletter">
            <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
              Subscribe Now
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
