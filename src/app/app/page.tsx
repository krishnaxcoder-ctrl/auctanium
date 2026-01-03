"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Phone01,
  ChevronRight,
  Home05,
  CheckCircle,
  Bell03,
  Zap,
  Shield01,
  Camera01,
  Star01,
  Download01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const features = [
  {
    icon: Bell03,
    title: "Real-Time Notifications",
    description: "Get instant alerts when you're outbid or when items you're watching are ending soon.",
  },
  {
    icon: Zap,
    title: "Quick Bidding",
    description: "Place bids in seconds with one-tap bidding and saved payment methods.",
  },
  {
    icon: Camera01,
    title: "List Items Easily",
    description: "Snap photos and list items for auction directly from your phone.",
  },
  {
    icon: Shield01,
    title: "Secure & Private",
    description: "Biometric login and end-to-end encryption keep your data safe.",
  },
];

const reviews = [
  {
    rating: 5,
    text: "Best auction app I've used. The notifications are incredibly helpful!",
    author: "Rahul M.",
    platform: "iOS",
  },
  {
    rating: 5,
    text: "Seamless experience. Won my first auction within minutes of installing.",
    author: "Priya S.",
    platform: "Android",
  },
  {
    rating: 5,
    text: "The photo listing feature made selling my collection so easy.",
    author: "Amit K.",
    platform: "iOS",
  },
];

const stats = [
  { value: "4.8", label: "App Store Rating" },
  { value: "500K+", label: "Downloads" },
  { value: "50K+", label: "Active Users" },
  { value: "99.9%", label: "Uptime" },
];

export default function AppPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800">
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
            <span className="text-white">Mobile App</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 items-center py-8 sm:py-12">
            {/* Content */}
            <div>
              <Badge type="pill-color" color="warning" size="lg" className="mb-4">
                <Download01 className="size-4 mr-1" />
                Download Free
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Bid Anytime,<br />Anywhere
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Download the Auctanium app and never miss an auction. Real-time notifications,
                one-tap bidding, and secure payments—all in your pocket.
              </p>

              {/* Download Buttons */}
              <div className="flex flex-wrap gap-4 mb-8">
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M18.71 19.5c-.83 1.24-1.71 2.45-3.05 2.47-1.34.03-1.77-.79-3.29-.79-1.53 0-2 .77-3.27.82-1.31.05-2.3-1.32-3.14-2.53C4.25 17 2.94 12.45 4.7 9.39c.87-1.52 2.43-2.48 4.12-2.51 1.28-.02 2.5.87 3.29.87.78 0 2.26-1.07 3.81-.91.65.03 2.47.26 3.64 1.98-.09.06-2.17 1.28-2.15 3.81.03 3.02 2.65 4.03 2.68 4.04-.03.07-.42 1.44-1.38 2.83M13 3.5c.73-.83 1.94-1.46 2.94-1.5.13 1.17-.34 2.35-1.04 3.19-.69.85-1.83 1.51-2.95 1.42-.15-1.15.41-2.35 1.05-3.11z"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs">Download on the</p>
                    <p className="text-lg font-semibold">App Store</p>
                  </div>
                </a>
                <a
                  href="#"
                  className="inline-flex items-center gap-3 bg-black text-white px-6 py-3 rounded-xl hover:bg-gray-800 transition-colors"
                >
                  <svg className="size-8" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M3 20.5v-17c0-.83.67-1.5 1.5-1.5.34 0 .67.11.95.32l12.06 8.5c.67.47.67 1.45 0 1.93l-12.06 8.5c-.28.21-.61.32-.95.32-.83 0-1.5-.67-1.5-1.5v-.07z"/>
                    <path d="M14.5 12l-7.5 5.25V6.75L14.5 12z" fill="#34A853"/>
                    <path d="M3 6.75l11.5 5.25-3.5 2.45L3 20.5V6.75z" fill="#4285F4"/>
                    <path d="M3 6.75l8 5.7-8 5.55V6.75z" fill="#FBBC04"/>
                    <path d="M3 6.75l8 5.7v7.05L3 20.5V6.75z" fill="#EA4335"/>
                  </svg>
                  <div className="text-left">
                    <p className="text-xs">Get it on</p>
                    <p className="text-lg font-semibold">Google Play</p>
                  </div>
                </a>
              </div>

              {/* Stats */}
              <div className="flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Phone Mockup */}
            <div className="relative flex justify-center lg:justify-end">
              <div className="relative w-64 sm:w-80">
                <div className="relative rounded-[3rem] border-8 border-gray-800 bg-gray-800 shadow-2xl overflow-hidden">
                  <div className="aspect-[9/19] bg-gradient-to-b from-brand-600 to-brand-800 flex items-center justify-center">
                    <div className="text-center p-6">
                      <div className="size-20 rounded-2xl bg-white/20 flex items-center justify-center mx-auto mb-4">
                        <Phone01 className="size-10 text-white" />
                      </div>
                      <p className="text-white font-bold text-xl">AUCTANIUM</p>
                      <p className="text-white/60 text-sm mt-1">Mobile App</p>
                    </div>
                  </div>
                </div>
                {/* Decorative elements */}
                <div className="absolute -top-4 -right-4 size-20 rounded-full bg-warning-500 blur-2xl opacity-50" />
                <div className="absolute -bottom-4 -left-4 size-20 rounded-full bg-brand-500 blur-2xl opacity-50" />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Features */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="brand" size="sm">Features</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Everything You Need On The Go
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {features.map((feature, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6 text-center">
                <div className="flex size-14 items-center justify-center rounded-xl bg-brand-100 mx-auto mb-4">
                  <feature.icon className="size-7 text-brand-600" />
                </div>
                <h3 className="font-semibold text-primary">{feature.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* App Screenshots - Placeholder */}
        <div className="mb-16 rounded-2xl bg-gradient-to-r from-brand-50 to-purple-50 border border-brand-200 p-8 sm:p-12 text-center">
          <h2 className="text-2xl font-bold text-primary mb-4">See It In Action</h2>
          <p className="text-tertiary mb-8 max-w-lg mx-auto">
            Browse listings, place bids, track auctions, and manage your collection—all from your phone.
          </p>
          <div className="flex justify-center gap-4 flex-wrap">
            <div className="w-48 h-96 rounded-2xl bg-gradient-to-b from-brand-600 to-brand-800 flex items-center justify-center">
              <p className="text-white/60 text-sm">Home Screen</p>
            </div>
            <div className="w-48 h-96 rounded-2xl bg-gradient-to-b from-purple-600 to-purple-800 flex items-center justify-center hidden sm:flex">
              <p className="text-white/60 text-sm">Auction View</p>
            </div>
            <div className="w-48 h-96 rounded-2xl bg-gradient-to-b from-success-600 to-success-800 flex items-center justify-center hidden md:flex">
              <p className="text-white/60 text-sm">My Bids</p>
            </div>
          </div>
        </div>

        {/* Reviews */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="success" size="sm">Reviews</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Loved by Collectors
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {reviews.map((review, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6">
                <div className="flex items-center gap-0.5 mb-3">
                  {Array.from({ length: review.rating }).map((_, i) => (
                    <Star01 key={i} className="size-4 text-yellow-500" />
                  ))}
                </div>
                <p className="text-primary italic">&quot;{review.text}&quot;</p>
                <div className="mt-4 flex items-center justify-between">
                  <p className="font-medium text-primary">{review.author}</p>
                  <span className="px-2 py-0.5 rounded-full text-xs bg-secondary text-tertiary ring-1 ring-inset ring-border-secondary">{review.platform}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Phone01 className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Download Now</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Join 500,000+ users who never miss an auction.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-6 py-3 rounded-xl font-medium hover:bg-brand-50 transition-colors"
            >
              <Download01 className="size-5" />
              App Store
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 bg-white text-brand-600 px-6 py-3 rounded-xl font-medium hover:bg-brand-50 transition-colors"
            >
              <Download01 className="size-5" />
              Google Play
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
