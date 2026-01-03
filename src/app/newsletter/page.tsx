"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Mail01,
  ChevronRight,
  Home05,
  CheckCircle,
  Zap,
  Bell03,
  Gift01,
  TrendUp01,
  Star01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { Checkbox } from "@/components/base/checkbox/checkbox";

const benefits = [
  {
    icon: Zap,
    title: "Early Access",
    description: "Be the first to know about new auctions and exclusive drops",
  },
  {
    icon: Gift01,
    title: "Exclusive Deals",
    description: "Subscriber-only discounts and promotional codes",
  },
  {
    icon: TrendUp01,
    title: "Market Insights",
    description: "Weekly trends and price guides for collectors",
  },
  {
    icon: Bell03,
    title: "Auction Alerts",
    description: "Get notified about items matching your interests",
  },
];

const testimonials = [
  {
    quote: "The weekly newsletter helped me find a rare Rolex at 20% below market value!",
    author: "Rahul S.",
    role: "Watch Collector",
  },
  {
    quote: "I love getting early access to new listings. Saved me thousands!",
    author: "Priya P.",
    role: "Art Enthusiast",
  },
];

const topics = [
  { id: "watches", label: "Watches & Jewelry" },
  { id: "art", label: "Art & Collectibles" },
  { id: "fashion", label: "Fashion & Accessories" },
  { id: "cars", label: "Classic Cars" },
  { id: "cards", label: "Trading Cards" },
  { id: "all", label: "All Categories" },
];

export default function NewsletterPage() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [selectedTopics, setSelectedTopics] = useState<string[]>(["all"]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
    }
  };

  const toggleTopic = (topicId: string) => {
    setSelectedTopics((prev) =>
      prev.includes(topicId)
        ? prev.filter((t) => t !== topicId)
        : [...prev, topicId]
    );
  };

  if (submitted) {
    return (
      <div className="min-h-screen bg-primary flex items-center justify-center">
        <div className="max-w-md text-center p-8">
          <div className="size-16 rounded-full bg-success-100 flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="size-8 text-success-600" />
          </div>
          <h1 className="text-2xl font-bold text-primary mb-2">You&apos;re Subscribed!</h1>
          <p className="text-tertiary mb-6">
            Thank you for subscribing to our newsletter. Check your inbox for a confirmation email.
          </p>
          <Link href="/">
            <Button color="primary" size="lg">
              Back to Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 to-purple-700">
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
            <span className="text-white">Newsletter</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Mail01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Newsletter
              </h1>
              <p className="mt-2 hidden text-white/80 sm:block">
                Stay updated with the latest auctions and deals
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-12 lg:grid-cols-2">
          {/* Sign Up Form */}
          <div>
            <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
              <Badge type="pill-color" color="brand" size="sm" className="mb-4">
                <Star01 className="size-3 mr-1" />
                50,000+ Subscribers
              </Badge>
              <h2 className="text-2xl font-bold text-primary mb-2">
                Join Our Newsletter
              </h2>
              <p className="text-tertiary mb-8">
                Get exclusive access to deals, market insights, and early notifications for rare items.
              </p>

              <form onSubmit={handleSubmit} className="space-y-6">
                <Input
                  label="Email Address"
                  placeholder="your@email.com"
                  type="email"
                  size="md"
                  icon={Mail01}
                  value={email}
                  onChange={(value) => setEmail(value)}
                  isRequired
                />

                <div>
                  <label className="block text-sm font-medium text-primary mb-3">
                    I&apos;m interested in
                  </label>
                  <div className="grid grid-cols-2 gap-3">
                    {topics.map((topic) => (
                      <label
                        key={topic.id}
                        className="flex items-center gap-2 cursor-pointer"
                      >
                        <Checkbox
                          isSelected={selectedTopics.includes(topic.id)}
                          onChange={() => toggleTopic(topic.id)}
                        />
                        <span className="text-sm text-primary">{topic.label}</span>
                      </label>
                    ))}
                  </div>
                </div>

                <Button color="primary" size="lg" className="w-full" type="submit">
                  Subscribe Now
                </Button>

                <p className="text-xs text-tertiary text-center">
                  By subscribing, you agree to our{" "}
                  <Link href="/privacy" className="text-brand-600 hover:underline">
                    Privacy Policy
                  </Link>
                  . You can unsubscribe at any time.
                </p>
              </form>
            </div>
          </div>

          {/* Benefits & Social Proof */}
          <div className="space-y-8">
            {/* Benefits */}
            <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-primary mb-6">What You&apos;ll Get</h2>
              <div className="space-y-6">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-100 flex-shrink-0">
                      <benefit.icon className="size-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{benefit.title}</h3>
                      <p className="text-sm text-tertiary mt-1">{benefit.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Testimonials */}
            <div className="space-y-4">
              {testimonials.map((testimonial, index) => (
                <div key={index} className="rounded-xl border border-secondary bg-primary p-6">
                  <p className="text-primary italic">&quot;{testimonial.quote}&quot;</p>
                  <div className="mt-3">
                    <p className="font-medium text-primary">{testimonial.author}</p>
                    <p className="text-sm text-tertiary">{testimonial.role}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Sample Newsletter Preview */}
            <div className="rounded-2xl border border-secondary bg-secondary/30 p-6">
              <p className="text-sm font-medium text-tertiary mb-2">Sample Newsletter</p>
              <div className="rounded-xl bg-primary border border-secondary p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Mail01 className="size-5 text-brand-600" />
                  <span className="font-semibold text-primary">This Week at Auctanium</span>
                </div>
                <div className="space-y-2 text-sm text-tertiary">
                  <p>📈 Top Trending: Vintage Rolex up 15%</p>
                  <p>🎁 Exclusive: 20% off authenticated watches</p>
                  <p>⚡ New Listings: 234 items added today</p>
                  <p>🔥 Ending Soon: 12 auctions in 24 hours</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
