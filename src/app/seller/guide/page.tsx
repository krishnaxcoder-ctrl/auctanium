"use client";

import Link from "next/link";
import {
  CheckCircle,
  Circle,
  Play,
  File02,
  Image01,
  Tag01,
  Truck01,
  Star01,
  TrendUp01,
  ChevronRight,
  Clock,
  BookOpen02,
} from "@untitledui/icons";
import { ProgressBarBase } from "@/components/base/progress-indicators/progress-indicators";
import { Button } from "@/components/base/buttons/button";

const gettingStartedSteps = [
  {
    title: "Complete your profile",
    description: "Add your store name, logo, and description to build trust with buyers.",
    completed: true,
  },
  {
    title: "Verify your identity",
    description: "Submit required documents for account verification.",
    completed: true,
  },
  {
    title: "Set up payment method",
    description: "Link your bank account or payment provider to receive payouts.",
    completed: false,
  },
  {
    title: "List your first product",
    description: "Create your first listing and start selling.",
    completed: false,
  },
  {
    title: "Configure shipping",
    description: "Set up your shipping rates and delivery options.",
    completed: false,
  },
];

const guides = [
  {
    title: "Product Photography",
    description: "Learn how to take professional photos that sell",
    icon: Image01,
    duration: "15 min read",
    href: "#",
  },
  {
    title: "Writing Descriptions",
    description: "Create compelling product descriptions that convert",
    icon: File02,
    duration: "10 min read",
    href: "#",
  },
  {
    title: "Pricing Strategy",
    description: "Set competitive prices to maximize your profits",
    icon: Tag01,
    duration: "12 min read",
    href: "#",
  },
  {
    title: "Shipping Best Practices",
    description: "Ship faster and reduce costs with these tips",
    icon: Truck01,
    duration: "8 min read",
    href: "#",
  },
  {
    title: "Getting 5-Star Reviews",
    description: "Deliver exceptional service to earn top ratings",
    icon: Star01,
    duration: "10 min read",
    href: "#",
  },
  {
    title: "Growing Your Sales",
    description: "Strategies to increase visibility and conversions",
    icon: TrendUp01,
    duration: "20 min read",
    href: "#",
  },
];

const videoTutorials = [
  {
    title: "Complete Seller Onboarding",
    description: "Step-by-step guide to setting up your store",
    duration: "12:34",
    thumbnail: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=400&h=225&fit=crop",
  },
  {
    title: "Listing Your First Product",
    description: "How to create listings that attract buyers",
    duration: "8:45",
    thumbnail: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=400&h=225&fit=crop",
  },
  {
    title: "Processing Orders",
    description: "Managing orders from sale to delivery",
    duration: "10:22",
    thumbnail: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?w=400&h=225&fit=crop",
  },
];

export default function SellerGuidePage() {
  const completedSteps = gettingStartedSteps.filter((s) => s.completed).length;
  const progress = (completedSteps / gettingStartedSteps.length) * 100;

  return (
    <div className="space-y-8 overflow-x-hidden max-w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-primary">Seller Guide</h1>
        <p className="mt-2 text-tertiary">Everything you need to become a successful seller</p>
      </div>

      {/* Getting Started Checklist */}
      <div className="rounded-xl border border-secondary bg-primary p-6">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-lg font-semibold text-primary">Getting Started</h2>
            <p className="text-sm text-tertiary">{completedSteps} of {gettingStartedSteps.length} steps completed</p>
          </div>
          <div className="text-right">
            <span className="text-2xl font-bold text-brand-600">{Math.round(progress)}%</span>
          </div>
        </div>

        {/* Progress Bar */}
        <div className="mb-6">
          <ProgressBarBase value={progress} />
        </div>

        {/* Steps */}
        <div className="space-y-4">
          {gettingStartedSteps.map((step, index) => (
            <div
              key={step.title}
              className={`flex items-start gap-4 rounded-lg p-3 ${
                step.completed ? "bg-success-50" : "bg-secondary/50"
              }`}
            >
              {step.completed ? (
                <CheckCircle className="size-5 text-success-600 mt-0.5" />
              ) : (
                <Circle className="size-5 text-tertiary mt-0.5" />
              )}
              <div className="flex-1">
                <h3 className={`text-sm font-medium ${step.completed ? "text-success-700" : "text-primary"}`}>
                  {step.title}
                </h3>
                <p className="text-xs text-tertiary">{step.description}</p>
              </div>
              {!step.completed && (
                <Link
                  href="#"
                  className="text-xs font-medium text-brand-600 hover:underline"
                >
                  Start
                </Link>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Video Tutorials */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Video Tutorials</h2>
          <Link href="#" className="text-sm font-medium text-brand-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {videoTutorials.map((video) => (
            <div
              key={video.title}
              className="group rounded-xl border border-secondary bg-primary overflow-hidden hover:border-brand-300 transition-colors"
            >
              <div className="relative aspect-video">
                <img
                  src={video.thumbnail}
                  alt={video.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 flex items-center justify-center bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="flex size-12 items-center justify-center rounded-full bg-white">
                    <Play className="size-5 text-primary ml-1" />
                  </div>
                </div>
                <div className="absolute bottom-2 right-2 rounded bg-black/70 px-2 py-1 text-xs text-white">
                  {video.duration}
                </div>
              </div>
              <div className="p-4">
                <h3 className="font-medium text-primary">{video.title}</h3>
                <p className="mt-1 text-sm text-tertiary">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Guides */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-primary">Seller Guides</h2>
          <Link href="#" className="text-sm font-medium text-brand-600 hover:underline">
            View all
          </Link>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {guides.map((guide) => (
            <Link
              key={guide.title}
              href={guide.href}
              className="flex items-start gap-4 rounded-xl border border-secondary bg-primary p-4 hover:border-brand-300 transition-colors"
            >
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
                <guide.icon className="size-5 text-brand-600" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-medium text-primary">{guide.title}</h3>
                <p className="mt-1 text-sm text-tertiary line-clamp-2">{guide.description}</p>
                <div className="mt-2 flex items-center gap-1 text-xs text-tertiary">
                  <Clock className="size-3" />
                  {guide.duration}
                </div>
              </div>
              <ChevronRight className="size-5 text-tertiary" />
            </Link>
          ))}
        </div>
      </div>

      {/* Resources CTA */}
      <div className="rounded-xl border border-secondary bg-gradient-to-r from-brand-50 to-brand-100 p-6">
        <div className="flex flex-col items-center text-center sm:flex-row sm:text-left sm:justify-between">
          <div className="flex items-center gap-4">
            <div className="flex size-12 items-center justify-center rounded-full bg-brand-600">
              <BookOpen02 className="size-6 text-white" />
            </div>
            <div>
              <h3 className="font-semibold text-primary">Download Seller Handbook</h3>
              <p className="text-sm text-tertiary">Complete PDF guide with all seller resources</p>
            </div>
          </div>
          <Button color="primary" size="md" className="mt-4 sm:mt-0">
            Download PDF
          </Button>
        </div>
      </div>
    </div>
  );
}
