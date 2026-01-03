"use client";

import Link from "next/link";
import {
  BookOpen02,
  ChevronRight,
  Home05,
  SearchLg,
  ShoppingCart01,
  CreditCard02,
  Truck01,
  Shield01,
  Users01,
  Settings01,
  MessageChatCircle,
  ArrowRight,
  Phone01,
  Mail01,
  Play,
  File06,
  Zap,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const categories = [
  {
    icon: ShoppingCart01,
    title: "Buying Guide",
    description: "Learn how to bid, win auctions, and make purchases",
    articles: 24,
    href: "/help-center/buying",
    color: "brand" as const,
  },
  {
    icon: Users01,
    title: "Selling Guide",
    description: "Start selling, manage listings, and grow your business",
    articles: 18,
    href: "/help-center/selling",
    color: "success" as const,
  },
  {
    icon: CreditCard02,
    title: "Payments & Billing",
    description: "Payment methods, invoices, and transaction help",
    articles: 15,
    href: "/help-center/payments",
    color: "warning" as const,
  },
  {
    icon: Truck01,
    title: "Shipping & Delivery",
    description: "Shipping options, tracking, and delivery issues",
    articles: 12,
    href: "/help-center/shipping",
    color: "error" as const,
  },
  {
    icon: Shield01,
    title: "Trust & Safety",
    description: "Buyer protection, fraud prevention, and security",
    articles: 20,
    href: "/help-center/safety",
    color: "brand" as const,
  },
  {
    icon: Settings01,
    title: "Account Settings",
    description: "Profile, notifications, and account management",
    articles: 10,
    href: "/help-center/account",
    color: "success" as const,
  },
];

const popularArticles = [
  {
    title: "How to place your first bid",
    category: "Buying",
    readTime: "3 min read",
    href: "/help-center/articles/first-bid",
  },
  {
    title: "Understanding proxy bidding",
    category: "Buying",
    readTime: "5 min read",
    href: "/help-center/articles/proxy-bidding",
  },
  {
    title: "Getting started as a seller",
    category: "Selling",
    readTime: "7 min read",
    href: "/help-center/articles/start-selling",
  },
  {
    title: "Payment methods explained",
    category: "Payments",
    readTime: "4 min read",
    href: "/help-center/articles/payment-methods",
  },
  {
    title: "How Buyer Protection works",
    category: "Safety",
    readTime: "6 min read",
    href: "/help-center/articles/buyer-protection",
  },
  {
    title: "Tracking your shipment",
    category: "Shipping",
    readTime: "2 min read",
    href: "/help-center/articles/track-shipment",
  },
];

const quickActions = [
  {
    icon: MessageChatCircle,
    title: "Live Chat",
    description: "Chat with our support team",
    action: "Start Chat",
    href: "#",
  },
  {
    icon: Phone01,
    title: "Call Us",
    description: "Mon-Fri, 8am-6pm EST",
    action: "+1 (555) 123-4567",
    href: "tel:+15551234567",
  },
  {
    icon: Mail01,
    title: "Email Support",
    description: "Response within 24 hours",
    action: "Send Email",
    href: "/contact",
  },
];

const videoTutorials = [
  {
    title: "Complete Beginner's Guide",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=400&h=225&fit=crop",
  },
  {
    title: "How to Win Auctions",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1553729459-efe14ef6055d?w=400&h=225&fit=crop",
  },
  {
    title: "Seller Success Tips",
    duration: "15:20",
    thumbnail: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=400&h=225&fit=crop",
  },
];

export default function HelpCenterPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Help Center</span>
          </nav>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <BookOpen02 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Help Center
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Everything you need to know about Auctanium
                </p>
              </div>
            </div>
          </div>

          {/* Search */}
          <div className="mt-8 mx-auto max-w-2xl">
            <Input
              placeholder="Search for help articles, guides, tutorials..."
              icon={SearchLg}
              size="md"
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Quick Actions */}
        <div className="grid gap-4 sm:grid-cols-3 mb-12">
          {quickActions.map((action, index) => (
            <a
              key={index}
              href={action.href}
              className="flex items-center gap-4 rounded-xl border border-secondary bg-primary p-4 transition-all hover:border-brand-300 hover:shadow-md"
            >
              <div className="flex size-12 items-center justify-center rounded-lg bg-brand-100">
                <action.icon className="size-6 text-brand-600" />
              </div>
              <div>
                <h3 className="font-semibold text-primary">{action.title}</h3>
                <p className="text-sm text-tertiary">{action.description}</p>
                <p className="text-sm font-medium text-brand-600 mt-1">
                  {action.action}
                </p>
              </div>
            </a>
          ))}
        </div>

        {/* Categories */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="brand" size="sm">
              Browse by Topic
            </Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              How can we help you?
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <Link
                key={index}
                href={category.href}
                className="group rounded-xl border border-secondary bg-primary p-6 transition-all hover:border-brand-300 hover:shadow-md"
              >
                <FeaturedIcon
                  icon={category.icon}
                  size="lg"
                  color={category.color}
                  theme="light"
                />
                <h3 className="mt-4 text-lg font-semibold text-primary group-hover:text-brand-600">
                  {category.title}
                </h3>
                <p className="mt-2 text-sm text-tertiary">
                  {category.description}
                </p>
                <div className="mt-4 flex items-center justify-between">
                  <span className="text-sm text-tertiary">
                    {category.articles} articles
                  </span>
                  <ArrowRight className="size-4 text-brand-600 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Popular Articles & Video Tutorials */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Popular Articles */}
          <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <File06 className="size-5 text-brand-600" />
              <h2 className="text-xl font-semibold text-primary">
                Popular Articles
              </h2>
            </div>
            <div className="space-y-3">
              {popularArticles.map((article, index) => (
                <Link
                  key={index}
                  href={article.href}
                  className="flex items-center justify-between p-3 rounded-lg hover:bg-secondary transition-colors group"
                >
                  <div>
                    <h3 className="font-medium text-primary group-hover:text-brand-600">
                      {article.title}
                    </h3>
                    <div className="flex items-center gap-2 mt-1">
                      <span className="text-xs text-brand-600 font-medium">
                        {article.category}
                      </span>
                      <span className="text-xs text-tertiary">•</span>
                      <span className="text-xs text-tertiary">
                        {article.readTime}
                      </span>
                    </div>
                  </div>
                  <ArrowRight className="size-4 text-tertiary group-hover:text-brand-600" />
                </Link>
              ))}
            </div>
            <Link href="/faq" className="block mt-4">
              <Button color="secondary" size="md" className="w-full">
                View All Articles
              </Button>
            </Link>
          </div>

          {/* Video Tutorials */}
          <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
            <div className="flex items-center gap-3 mb-6">
              <Play className="size-5 text-brand-600" />
              <h2 className="text-xl font-semibold text-primary">
                Video Tutorials
              </h2>
            </div>
            <div className="space-y-4">
              {videoTutorials.map((video, index) => (
                <div
                  key={index}
                  className="group relative rounded-lg overflow-hidden cursor-pointer"
                >
                  <div className="aspect-video relative">
                    <img
                      src={video.thumbnail}
                      alt={video.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center group-hover:bg-black/50 transition-colors">
                      <div className="size-12 rounded-full bg-white/90 flex items-center justify-center">
                        <Play className="size-5 text-brand-600 ml-1" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 px-2 py-1 rounded bg-black/70 text-white text-xs">
                      {video.duration}
                    </div>
                  </div>
                  <h3 className="mt-2 font-medium text-primary group-hover:text-brand-600">
                    {video.title}
                  </h3>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Still need help */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Zap className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">
            Can&apos;t find what you&apos;re looking for?
          </h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Our support team is available 24/7 to help you with any questions.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button color="secondary" size="lg">
                Contact Support
              </Button>
            </Link>
            <Link href="/faq">
              <Button
                size="lg"
                className="bg-white/20 text-white hover:bg-white/30"
              >
                Browse FAQ
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
