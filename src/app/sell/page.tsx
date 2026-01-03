"use client";

import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag01,
  ChevronRight,
  Home05,
  CheckCircle,
  ArrowRight,
  CurrencyRupee,
  Users01,
  Shield01,
  TrendUp01,
  Zap,
  Camera01,
  Tag01,
  Package,
  Star01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const benefits = [
  {
    icon: Users01,
    title: "Reach 50,000+ Buyers",
    description: "Access a global community of collectors and enthusiasts actively searching for unique items.",
    color: "brand" as const,
  },
  {
    icon: CurrencyRupee,
    title: "Competitive Fees",
    description: "Only 5% final value fee. No hidden charges. Keep more of what you earn.",
    color: "success" as const,
  },
  {
    icon: Shield01,
    title: "Seller Protection",
    description: "We've got your back with fraud prevention, secure payments, and dispute resolution.",
    color: "warning" as const,
  },
  {
    icon: TrendUp01,
    title: "Powerful Analytics",
    description: "Track views, bids, and sales with our comprehensive seller dashboard.",
    color: "error" as const,
  },
];

const howItWorks = [
  {
    step: 1,
    title: "Create Your Account",
    description: "Sign up for free and complete a quick verification process.",
    icon: Users01,
  },
  {
    step: 2,
    title: "List Your Items",
    description: "Upload photos, write descriptions, and set your prices or auction terms.",
    icon: Camera01,
  },
  {
    step: 3,
    title: "Get Discovered",
    description: "Your items appear in search, categories, and recommendations to millions.",
    icon: Tag01,
  },
  {
    step: 4,
    title: "Ship & Get Paid",
    description: "Ship securely and receive payment directly to your bank account.",
    icon: Package,
  },
];

const categories = [
  { name: "Watches", image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=200&h=200&fit=crop" },
  { name: "Art", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=200&fit=crop" },
  { name: "Fashion", image: "https://images.unsplash.com/photo-1558171813-01342daa54d6?w=200&h=200&fit=crop" },
  { name: "Collectibles", image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=200&h=200&fit=crop" },
  { name: "Jewelry", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=200&h=200&fit=crop" },
  { name: "Vintage", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=200&h=200&fit=crop" },
];

const stats = [
  { value: "₹15Cr+", label: "Total Sales" },
  { value: "50K+", label: "Active Sellers" },
  { value: "95%", label: "Seller Satisfaction" },
  { value: "24hrs", label: "Avg. Time to First Sale" },
];

const testimonials = [
  {
    quote: "Sold my entire watch collection in just 2 weeks. The platform makes it incredibly easy to reach serious buyers.",
    author: "Vikram Mehta",
    role: "Watch Collector",
    sales: "₹45L+ in sales",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
  },
  {
    quote: "As an art dealer, this platform has expanded my reach globally. The authentication service adds credibility.",
    author: "Ananya Sharma",
    role: "Art Gallery Owner",
    sales: "₹1.2Cr+ in sales",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
  },
];

export default function SellPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-purple-800">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.15]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white">
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Start Selling</span>
          </nav>

          <div className="grid gap-8 lg:grid-cols-2 items-center py-8 sm:py-16">
            <div>
              <Badge type="pill-color" color="warning" size="lg" className="mb-4">
                <Zap className="size-4 mr-1" />
                Start Selling Today
              </Badge>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold tracking-tight text-white mb-4">
                Turn Your Items Into Cash
              </h1>
              <p className="text-lg text-white/80 mb-8 max-w-lg">
                Join 50,000+ sellers reaching millions of buyers worldwide. List for free and only pay when you sell.
              </p>

              <div className="flex flex-wrap gap-4 mb-8">
                <Link href="/signup">
                  <Button color="secondary" size="xl" iconTrailing={ArrowRight}>
                    Start Selling Free
                  </Button>
                </Link>
                <Link href="/seller/pricing">
                  <Button size="xl" className="bg-white/20 text-white hover:bg-white/30">
                    View Pricing
                  </Button>
                </Link>
              </div>

              <div className="flex flex-wrap gap-6">
                {stats.map((stat, index) => (
                  <div key={index}>
                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                    <p className="text-sm text-white/60">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Categories Grid */}
            <div className="grid grid-cols-3 gap-3">
              {categories.map((category, index) => (
                <div
                  key={index}
                  className="relative aspect-square rounded-xl overflow-hidden group"
                >
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  <p className="absolute bottom-2 left-2 text-sm font-medium text-white">
                    {category.name}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Benefits */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="brand" size="sm">Why Sell With Us</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Built for Sellers Like You
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6">
                <FeaturedIcon icon={benefit.icon} size="lg" color={benefit.color} theme="light" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{benefit.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{benefit.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="success" size="sm">How It Works</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Start Selling in 4 Easy Steps
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative rounded-xl border border-secondary bg-primary p-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <step.icon className="size-8 text-brand-600 mx-auto mb-3" />
                <h3 className="font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{step.description}</p>
                {index < howItWorks.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 size-6 text-tertiary -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Testimonials */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="warning" size="sm">Success Stories</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Sellers Love Us
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-2">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
                <div className="flex items-center gap-0.5 mb-4">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star01 key={i} className="size-5 text-yellow-500" />
                  ))}
                </div>
                <p className="text-lg text-primary italic mb-6">&quot;{testimonial.quote}&quot;</p>
                <div className="flex items-center gap-4">
                  <Image
                    src={testimonial.avatar}
                    alt={testimonial.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                  />
                  <div>
                    <p className="font-semibold text-primary">{testimonial.author}</p>
                    <p className="text-sm text-tertiary">{testimonial.role}</p>
                  </div>
                  <Badge type="pill-color" color="success" size="sm" className="ml-auto">
                    {testimonial.sales}
                  </Badge>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-6 text-center">
            <Link href="/seller/success-stories">
              <Button color="secondary" size="md" iconTrailing={ArrowRight}>
                Read More Stories
              </Button>
            </Link>
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <ShoppingBag01 className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
            Ready to Start Selling?
          </h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Create your free account today and reach millions of buyers.
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <Link href="/signup">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                Create Seller Account
              </Button>
            </Link>
            <Link href="/seller/pricing">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="text-sm text-brand-200 mt-4">
            No credit card required. Free to list. Only pay when you sell.
          </p>
        </div>
      </div>
    </div>
  );
}
