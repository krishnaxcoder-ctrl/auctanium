"use client";

import Link from "next/link";
import { ArrowLeft, File02, ChevronRight, Home05, Download01, Image01, File01, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const pressReleases = [
  {
    date: "December 10, 2025",
    title: "Company Reaches 50,000 Active Users Milestone",
    description: "We celebrate a major milestone as our community grows to over 50,000 active bidders worldwide.",
  },
  {
    date: "November 15, 2025",
    title: "Series B Funding Announcement",
    description: "We've raised $25 million in Series B funding to accelerate growth and expand internationally.",
  },
  {
    date: "October 1, 2025",
    title: "Launch of Mobile App for iOS and Android",
    description: "Bidders can now participate in auctions on-the-go with our new mobile applications.",
  },
  {
    date: "August 20, 2025",
    title: "Partnership with Major Retail Brands",
    description: "Announcing partnerships with leading retail brands to bring exclusive items to our platform.",
  },
];

const mediaAssets = [
  {
    icon: Image01,
    title: "Logo Pack",
    description: "High-resolution logos in PNG, SVG, and EPS formats",
    size: "2.4 MB",
  },
  {
    icon: Image01,
    title: "Product Screenshots",
    description: "Screenshots of our platform and mobile apps",
    size: "8.1 MB",
  },
  {
    icon: File01,
    title: "Brand Guidelines",
    description: "Colors, typography, and usage guidelines",
    size: "1.2 MB",
  },
  {
    icon: File01,
    title: "Company Fact Sheet",
    description: "Key facts and figures about our company",
    size: "245 KB",
  },
];

const stats = [
  { value: "50K+", label: "Active Users" },
  { value: "$15M+", label: "Items Sold" },
  { value: "100K+", label: "Auctions Completed" },
  { value: "50+", label: "Countries" },
];

export default function PressPage() {
  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Press Kit</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <File02 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Press Kit
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Media resources and company information
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="group mt-3 hidden items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Company Stats */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10 mb-8">
          <h2 className="text-lg sm:text-2xl font-semibold text-primary mb-6">Company at a Glance</h2>
          <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
            {stats.map((stat, index) => (
              <div key={index} className="text-center p-4 rounded-xl bg-secondary">
                <p className="text-2xl sm:text-3xl font-bold text-brand-600">{stat.value}</p>
                <p className="mt-1 text-sm text-tertiary">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Assets */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Media Assets</h2>
            <Button color="primary" size="md" iconLeading={Download01}>
              Download All
            </Button>
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            {mediaAssets.map((asset, index) => (
              <div
                key={index}
                className="flex items-center justify-between rounded-xl border border-secondary p-4 transition-all hover:border-brand-300"
              >
                <div className="flex items-center gap-4">
                  <div className="flex size-12 items-center justify-center rounded-lg bg-brand-100">
                    <asset.icon className="size-6 text-brand-600" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-primary">{asset.title}</h3>
                    <p className="text-sm text-tertiary">{asset.description}</p>
                    <p className="text-xs text-tertiary mt-1">{asset.size}</p>
                  </div>
                </div>
                <Button color="secondary" size="sm" iconLeading={Download01}>
                  Download
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* Press Releases */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10 mb-8">
          <h2 className="text-lg sm:text-2xl font-semibold text-primary mb-6">Press Releases</h2>
          <div className="space-y-4">
            {pressReleases.map((release, index) => (
              <div
                key={index}
                className="group rounded-xl border border-secondary p-4 sm:p-6 transition-all hover:border-brand-300 cursor-pointer"
              >
                <Badge type="pill-color" color="gray" size="sm">{release.date}</Badge>
                <h3 className="mt-3 text-lg font-semibold text-primary group-hover:text-brand-600">
                  {release.title}
                </h3>
                <p className="mt-2 text-sm text-tertiary">{release.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Media Contact */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10">
          <h2 className="text-lg sm:text-2xl font-semibold text-primary mb-4">Media Contact</h2>
          <p className="text-tertiary mb-6">
            For press inquiries, interviews, or additional information, please contact our media relations team.
          </p>
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="flex items-center gap-3 rounded-xl bg-secondary p-4">
              <Mail01 className="size-5 text-brand-600" />
              <div>
                <p className="text-sm text-tertiary">Email</p>
                <p className="font-semibold text-primary">press@company.com</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
