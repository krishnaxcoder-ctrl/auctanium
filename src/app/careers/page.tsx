"use client";

import Link from "next/link";
import { ArrowLeft, Users01, ChevronRight, Home05, MarkerPin01, Clock, ArrowRight } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const benefits = [
  "Competitive salary & equity",
  "Remote-first culture",
  "Unlimited PTO",
  "Health, dental & vision insurance",
  "401(k) matching",
  "Learning & development budget",
  "Home office stipend",
  "Annual team retreats",
];

const jobs = [
  {
    id: 1,
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Build beautiful, performant user interfaces for our auction platform.",
  },
  {
    id: 2,
    title: "Product Designer",
    department: "Design",
    location: "Remote",
    type: "Full-time",
    description: "Design intuitive experiences that delight our users.",
  },
  {
    id: 3,
    title: "Backend Engineer",
    department: "Engineering",
    location: "Remote",
    type: "Full-time",
    description: "Scale our infrastructure to handle millions of real-time bids.",
  },
  {
    id: 4,
    title: "Customer Success Manager",
    department: "Operations",
    location: "New York, NY",
    type: "Full-time",
    description: "Help our sellers succeed and grow their businesses.",
  },
  {
    id: 5,
    title: "Marketing Manager",
    department: "Marketing",
    location: "Remote",
    type: "Full-time",
    description: "Drive growth and build our brand presence globally.",
  },
];

export default function CareersPage() {
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
            <span className="text-white">Careers</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Users01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Careers
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Join our team and shape the future of auctions
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
        {/* Intro Section */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10 mb-8">
          <section>
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Work With Us</h2>
            <p className="mt-4 leading-relaxed text-tertiary">
              We&apos;re building the future of online auctions and we need talented people to help us get there.
              At our company, you&apos;ll work on challenging problems, collaborate with amazing teammates, and
              make a real impact on millions of users worldwide.
            </p>
          </section>
        </div>

        {/* Benefits Section */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10 mb-8">
          <h2 className="text-lg sm:text-2xl font-semibold text-primary mb-6">Why Join Us?</h2>
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((benefit, index) => (
              <div
                key={index}
                className="flex items-center gap-2 rounded-lg bg-secondary p-3"
              >
                <div className="size-2 rounded-full bg-brand-500" />
                <span className="text-sm text-primary">{benefit}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Open Positions */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary">Open Positions</h2>
            <Badge type="pill-color" color="success">{jobs.length} Openings</Badge>
          </div>

          <div className="space-y-4">
            {jobs.map((job) => (
              <div
                key={job.id}
                className="group rounded-xl border border-secondary p-4 sm:p-6 transition-all hover:border-brand-300 hover:shadow-md"
              >
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Badge type="pill-color" color="brand" size="sm">{job.department}</Badge>
                    </div>
                    <h3 className="text-lg font-semibold text-primary group-hover:text-brand-600">
                      {job.title}
                    </h3>
                    <p className="mt-1 text-sm text-tertiary">{job.description}</p>
                    <div className="mt-3 flex flex-wrap items-center gap-4 text-sm text-tertiary">
                      <span className="flex items-center gap-1">
                        <MarkerPin01 className="size-4" />
                        {job.location}
                      </span>
                      <span className="flex items-center gap-1">
                        <Clock className="size-4" />
                        {job.type}
                      </span>
                    </div>
                  </div>
                  <Button color="primary" size="md" iconTrailing={ArrowRight} className="shrink-0">
                    Apply Now
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
