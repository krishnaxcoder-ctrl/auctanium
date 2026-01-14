"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Building07,
  Users01,
  Target04,
  Heart,
  Globe01,
  Zap,
  Shield01,
  TrendUp01,
  Award01,
  CheckCircle,
  ArrowRight,
  Link01,
  MessageChatCircle,
  Star01,
  Lightbulb01,
  Rocket01,
  Flag01,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { CTASection } from "@/components/sections/cta-section";

const stats = [
  { value: "50K+", label: "Active Users", description: "Worldwide bidders" },
  { value: "$15M+", label: "Total Sales", description: "Completed auctions" },
  { value: "100K+", label: "Auctions", description: "Successfully held" },
  { value: "99.9%", label: "Uptime", description: "Platform reliability" },
];

const values = [
  {
    icon: Users01,
    title: "Community First",
    description: "We believe in building a strong community of buyers and sellers who trust and support each other in every transaction.",
    color: "brand" as const,
  },
  {
    icon: Shield01,
    title: "Trust & Security",
    description: "Every transaction is protected. We verify sellers, secure payments, and offer buyer guarantees on all purchases.",
    color: "success" as const,
  },
  {
    icon: Target04,
    title: "Transparency",
    description: "No hidden fees, no surprises. Every bid and transaction is completely transparent and traceable.",
    color: "warning" as const,
  },
  {
    icon: Globe01,
    title: "Global Reach",
    description: "Connecting bidders and sellers from 50+ countries, operating 24/7 across all time zones.",
    color: "error" as const,
  },
  {
    icon: Zap,
    title: "Innovation",
    description: "Constantly improving our platform with cutting-edge technology to deliver the best auction experience.",
    color: "brand" as const,
  },
  {
    icon: Heart,
    title: "Customer Focus",
    description: "Your satisfaction is our priority. Our dedicated support team is always here to help you succeed.",
    color: "error" as const,
  },
];

const timeline = [
  {
    year: "2020",
    title: "The Beginning",
    description: "Founded by two friends with a vision to revolutionize online auctions.",
    icon: Lightbulb01,
  },
  {
    year: "2021",
    title: "Rapid Growth",
    description: "Reached 10,000 users and facilitated our first $1M in auction sales.",
    icon: TrendUp01,
  },
  {
    year: "2022",
    title: "Series A Funding",
    description: "Raised $10M to expand our team and enhance platform capabilities.",
    icon: Rocket01,
  },
  {
    year: "2023",
    title: "Global Expansion",
    description: "Launched in 50+ countries with multi-currency and language support.",
    icon: Globe01,
  },
  {
    year: "2024",
    title: "Mobile Launch",
    description: "Released iOS and Android apps, reaching 50K+ active users.",
    icon: Zap,
  },
  {
    year: "2025",
    title: "Industry Leader",
    description: "Recognized as the most trusted auction platform worldwide.",
    icon: Flag01,
  },
];

const team = [
  {
    name: "Sarah Johnson",
    role: "CEO & Co-Founder",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    bio: "Former VP at eBay, 15+ years in e-commerce",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Michael Chen",
    role: "CTO & Co-Founder",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    bio: "Ex-Google engineer, distributed systems expert",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Emily Rodriguez",
    role: "Chief Operating Officer",
    image: "https://randomuser.me/api/portraits/women/68.jpg",
    bio: "Former Amazon operations lead, MBA Stanford",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "David Park",
    role: "Chief Product Officer",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    bio: "Product visionary, ex-Airbnb design lead",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "Anna Schmidt",
    role: "VP of Engineering",
    image: "https://randomuser.me/api/portraits/women/33.jpg",
    bio: "Built scalable systems at Stripe & Netflix",
    linkedin: "#",
    twitter: "#",
  },
  {
    name: "James Wilson",
    role: "VP of Marketing",
    image: "https://randomuser.me/api/portraits/men/52.jpg",
    bio: "Growth marketing expert, scaled 3 startups",
    linkedin: "#",
    twitter: "#",
  },
];

const achievements = [
  { icon: Award01, title: "Best Auction Platform 2024", source: "TechCrunch" },
  { icon: Star01, title: "4.9/5 User Rating", source: "Trustpilot" },
  { icon: Shield01, title: "SOC 2 Certified", source: "Security Compliance" },
  { icon: CheckCircle, title: "99.9% Uptime SLA", source: "Enterprise Grade" },
];

const partners = [
  "PayPal",
  "Stripe",
  "Visa",
  "Mastercard",
  "Apple Pay",
  "Google Pay",
];

export default function AboutPage() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <div className="min-h-screen bg-primary">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-primary min-h-[calc(100vh-80px)] flex flex-col justify-center py-8">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute -top-40 -right-40 size-96 rounded-full bg-brand-primary/20 blur-3xl" />
          <div className="absolute top-1/2 -left-40 size-96 rounded-full bg-success-primary/10 blur-3xl" />
          <div className="absolute -bottom-40 right-1/4 size-64 rounded-full bg-warning-primary/10 blur-3xl" />

          {/* Dot pattern */}
          <div
            className="absolute inset-0 opacity-[0.2]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='2' fill='%237F56D9'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />

          {/* Radial gradient overlay to fade dots at edges */}
          <div
            className="absolute inset-0"
            style={{
              background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, var(--color-bg-primary) 70%)',
            }}
          />
        </div>

        <div className="relative max-w-8xl px-4 mx-auto sm:px-6 ">
          <div className="flex flex-col items-center">
            {/* Content */}
            <div
              className={cx(
                "text-center transition-all duration-700",
                isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
              )}
            >
              {/* Badge */}
              <div className="mb-6 inline-flex">
                <Badge type="pill-color" size="lg" color="brand">
                  <span className="flex items-center gap-2">
                    <Building07 className="size-4" />
                    Our Story
                  </span>
                </Badge>
              </div>

              {/* Main Heading */}
              <h1 className="text-display-md font-semibold tracking-tight text-primary sm:text-display-lg lg:text-display-xl">
                Building the Future of
                <br />
                <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                  Online Auctions.
                </span>
              </h1>

              {/* Subheading */}
              <p className="mt-5 max-w-3xl text-base leading-relaxed text-tertiary lg:text-lg">
                We're on a mission to create the most transparent, secure, and exciting auction platform.
                Join <span className="font-semibold text-primary">50,000+ users</span> who trust us for amazing deals.
              </p>

              {/* CTA Buttons */}
              <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                <Link href="/">
                  <Button color="primary" size="xl" iconTrailing={ArrowRight} className="w-full sm:w-auto">
                    Start Bidding
                  </Button>
                </Link>
                <Link href="/contact">
                  <Button color="secondary" size="xl" iconLeading={MessageChatCircle} className="w-full sm:w-auto">
                    Contact Us
                  </Button>
                </Link>
              </div>

              {/* Trust Badges */}
              <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 ring-1 ring-[#404040]">
                  <Shield01 className="size-4 text-brand-secondary" />
                  <span className="text-xs font-medium text-secondary">Trusted Platform</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 ring-1 ring-[#404040]">
                  <Globe01 className="size-4 text-brand-secondary" />
                  <span className="text-xs font-medium text-secondary">50+ Countries</span>
                </div>
                <div className="flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 ring-1 ring-[#404040]">
                  <Award01 className="size-4 text-brand-secondary" />
                  <span className="text-xs font-medium text-secondary">Award Winning</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Stats Section - full width */}
        <div className="relative w-full max-w-8xl mx-auto px-4 sm:px-6 mt-10">
          <div className="grid grid-cols-2 gap-0 lg:grid-cols-4">
            {stats.map((stat, index) => (
              <div
                key={index}
                className={cx(
                  "border border-secondary bg-primary p-4 sm:p-6 text-center transition-all duration-700 hover:bg-secondary hover:scale-[1.02] hover:z-10",
                  isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                )}
                style={{ transitionDelay: `${index * 100}ms` }}
              >
                <p className="text-2xl sm:text-4xl font-bold text-brand-600 transition-transform duration-300 group-hover:scale-110">{stat.value}</p>
                <p className="mt-1 font-semibold text-primary">{stat.label}</p>
                <p className="text-xs sm:text-sm text-tertiary">{stat.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-8 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Timeline Section */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8 lg:p-10 mb-12 shadow-sm">
          <div className="text-center mb-10">
            <Badge type="pill-color" color="brand" size="sm">Our Journey</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Milestones That Define Us
            </h2>
            <p className="mt-2 text-tertiary max-w-2xl mx-auto">
              From a small startup to a global platform, here&apos;s how we&apos;ve grown over the years.
            </p>
          </div>

          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-px bg-border-secondary sm:-translate-x-px" />

            <div className="space-y-8 sm:space-y-12">
              {timeline.map((item, index) => (
                <div
                  key={index}
                  className={`relative flex items-start gap-6 sm:gap-0 ${
                    index % 2 === 0 ? 'sm:flex-row' : 'sm:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`flex-1 ${index % 2 === 0 ? 'sm:pr-12 sm:text-right' : 'sm:pl-12'}`}>
                    <div className={`rounded-xl border border-secondary bg-secondary p-4 sm:p-6 ${
                      index % 2 === 0 ? 'sm:ml-auto' : ''
                    } sm:max-w-md`}>
                      <span className="text-sm font-bold text-brand-600">{item.year}</span>
                      <h3 className="mt-1 text-lg font-semibold text-primary">{item.title}</h3>
                      <p className="mt-2 text-sm text-tertiary">{item.description}</p>
                    </div>
                  </div>

                  {/* Icon */}
                  <div className="absolute left-0 sm:left-1/2 sm:-translate-x-1/2 flex size-8 items-center justify-center rounded-full border-4 border-primary bg-brand-600 text-white">
                    <item.icon className="size-4" />
                  </div>

                  {/* Spacer for alternating layout */}
                  <div className="hidden sm:block flex-1" />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Values Section */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8 lg:p-10 mb-12 shadow-sm">
          <div className="text-center mb-10">
            <Badge type="pill-color" color="brand" size="sm">What We Stand For</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Our Core Values
            </h2>
            <p className="mt-2 text-tertiary max-w-2xl mx-auto">
              These principles guide everything we do, from product decisions to customer interactions.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {values.map((value, index) => (
              <div
                key={index}
                className="group rounded-xl border border-secondary p-6 transition-all hover:border-brand-300 hover:shadow-md"
              >
                <FeaturedIcon icon={value.icon} size="lg" color={value.color} theme="light" />
                <h3 className="mt-4 text-lg font-semibold text-primary group-hover:text-brand-600">
                  {value.title}
                </h3>
                <p className="mt-2 text-sm text-tertiary leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Achievements Section - Hero Style */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          {/* Background */}
          <div className="absolute inset-0 bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800" />

          {/* Background Pattern */}
          <div className="pointer-events-none absolute inset-0">
            <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
            <div
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
              }}
            />
          </div>

          {/* Content */}
          <div className="relative z-10 px-6 py-16 sm:px-8 sm:py-20 lg:px-10 lg:py-24">
            <div className="text-center mb-12">
              <Badge type="pill-color" color="warning" size="md">
                <span className="flex items-center gap-2">
                  <Award01 className="size-4" />
                  Recognized Excellence
                </span>
              </Badge>
              <h2 className="mt-6 text-display-sm font-semibold text-white sm:text-display-md">
                Recognition & Achievements
              </h2>
              <p className="mt-4 text-lg text-brand-100 max-w-2xl mx-auto">
                Our commitment to excellence has been recognized by industry leaders worldwide.
              </p>
            </div>

            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4 max-w-5xl mx-auto">
              {achievements.map((achievement, index) => (
                <div
                  key={index}
                  className="group flex flex-col items-center text-center gap-4 rounded-2xl bg-white/10 backdrop-blur-sm border border-white/20 p-6 transition-all duration-300 hover:bg-white/20 hover:scale-105"
                >
                  <div className="flex size-14 items-center justify-center rounded-xl bg-white/20">
                    <achievement.icon className="size-7 text-white" />
                  </div>
                  <div>
                    <p className="font-semibold text-white">{achievement.title}</p>
                    <p className="text-sm text-brand-200 mt-1">{achievement.source}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Team Section */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8 lg:p-10 mb-12 shadow-sm">
          <div className="text-center mb-10">
            <Badge type="pill-color" color="brand" size="sm">The People Behind</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Our Leadership Team
            </h2>
            <p className="mt-2 text-tertiary max-w-2xl mx-auto">
              Meet the experienced team driving our vision forward.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {team.map((member, index) => (
              <div
                key={index}
                className="group rounded-xl border border-secondary p-6 text-center transition-all hover:border-brand-300 hover:shadow-md"
              >
                <div className="relative mx-auto size-24 overflow-hidden rounded-full ring-4 ring-secondary group-hover:ring-brand-200 transition-all">
                  <Image
                    src={member.image}
                    alt={member.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-4 text-lg font-semibold text-primary">{member.name}</h3>
                <p className="text-sm font-medium text-brand-600">{member.role}</p>
                <p className="mt-2 text-xs text-tertiary">{member.bio}</p>
                <div className="mt-4 flex justify-center gap-3">
                  <a
                    href={member.linkedin}
                    className="rounded-full p-2 text-tertiary transition-colors hover:bg-brand-100 hover:text-brand-600"
                  >
                    <Link01 className="size-4" />
                  </a>
                  <a
                    href={member.twitter}
                    className="rounded-full p-2 text-tertiary transition-colors hover:bg-brand-100 hover:text-brand-600"
                  >
                    <MessageChatCircle className="size-4" />
                  </a>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-8 text-center">
            <Link href="/careers">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                View Open Positions
              </Button>
            </Link>
          </div>
        </div>

        {/* Partners Section */}
        <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8 lg:p-10 mb-12 shadow-sm">
          <div className="text-center mb-8">
            <h2 className="text-xl sm:text-2xl font-bold text-primary">
              Trusted Payment Partners
            </h2>
            <p className="mt-2 text-tertiary">
              We partner with the world&apos;s leading payment providers for secure transactions.
            </p>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-10 lg:gap-14">
            {/* PayPal */}
            <div className="group transition-all duration-300 hover:scale-110">
              <svg className="h-6 sm:h-7 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" viewBox="0 0 124 33" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M46.211 6.749h-6.839a.95.95 0 0 0-.939.802l-2.766 17.537a.57.57 0 0 0 .564.658h3.265a.95.95 0 0 0 .939-.803l.746-4.73a.95.95 0 0 1 .938-.803h2.165c4.505 0 7.105-2.18 7.784-6.5.306-1.89.013-3.375-.872-4.415-.972-1.142-2.696-1.746-4.985-1.746zM46.952 13.684c-.374 2.454-2.249 2.454-4.062 2.454h-1.032l.724-4.583a.57.57 0 0 1 .563-.481h.473c1.235 0 2.4 0 3.002.704.359.42.468 1.044.332 1.906zM66.654 13.544h-3.275a.57.57 0 0 0-.563.481l-.145.916-.229-.332c-.709-1.029-2.29-1.373-3.868-1.373-3.619 0-6.71 2.741-7.312 6.586-.313 1.918.132 3.752 1.22 5.031.998 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .562.66h2.95a.95.95 0 0 0 .939-.803l1.77-11.209a.568.568 0 0 0-.561-.658zm-4.565 6.374c-.316 1.871-1.801 3.127-3.695 3.127-.951 0-1.711-.305-2.199-.883-.484-.574-.668-1.391-.514-2.301.295-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.499.589.697 1.411.554 2.317zM84.096 13.544h-3.291a.954.954 0 0 0-.787.417l-4.539 6.686-1.924-6.425a.953.953 0 0 0-.912-.678h-3.234a.57.57 0 0 0-.541.754l3.625 10.638-3.408 4.811a.57.57 0 0 0 .465.9h3.287a.949.949 0 0 0 .781-.408l10.946-15.8a.57.57 0 0 0-.468-.895z" fill="#253B80"/>
                <path d="M94.992 6.749h-6.84a.95.95 0 0 0-.938.802l-2.766 17.537a.569.569 0 0 0 .562.658h3.51a.665.665 0 0 0 .656-.562l.785-4.971a.95.95 0 0 1 .938-.803h2.164c4.506 0 7.105-2.18 7.785-6.5.307-1.89.012-3.375-.873-4.415-.971-1.142-2.694-1.746-4.983-1.746zm.742 6.935c-.373 2.454-2.248 2.454-4.062 2.454h-1.031l.725-4.583a.568.568 0 0 1 .562-.481h.473c1.234 0 2.4 0 3.002.704.359.42.468 1.044.331 1.906zM115.434 13.544h-3.273a.567.567 0 0 0-.562.481l-.145.916-.23-.332c-.709-1.029-2.289-1.373-3.867-1.373-3.619 0-6.709 2.741-7.311 6.586-.312 1.918.131 3.752 1.219 5.031 1 1.176 2.426 1.666 4.125 1.666 2.916 0 4.533-1.875 4.533-1.875l-.146.91a.57.57 0 0 0 .564.66h2.949a.95.95 0 0 0 .938-.803l1.771-11.209a.571.571 0 0 0-.565-.658zm-4.565 6.374c-.314 1.871-1.801 3.127-3.695 3.127-.949 0-1.711-.305-2.199-.883-.484-.574-.666-1.391-.514-2.301.297-1.855 1.805-3.152 3.67-3.152.93 0 1.686.309 2.184.892.501.589.699 1.411.554 2.317zM119.295 7.23l-2.807 17.858a.569.569 0 0 0 .562.658h2.822a.949.949 0 0 0 .939-.803l2.768-17.536a.57.57 0 0 0-.562-.659h-3.16a.571.571 0 0 0-.562.482z" fill="#179BD7"/>
                <path d="M7.266 29.154l.523-3.322-1.165-.027H1.061L4.927 1.292a.316.316 0 0 1 .314-.268h9.38c3.114 0 5.263.648 6.385 1.927.526.6.861 1.227 1.023 1.917.17.724.173 1.589.007 2.644l-.012.077v.676l.526.298a3.69 3.69 0 0 1 1.065.812c.45.513.741 1.165.864 1.938.127.795.085 1.741-.123 2.812-.24 1.232-.628 2.305-1.152 3.183a6.547 6.547 0 0 1-1.825 2c-.696.494-1.523.869-2.458 1.109-.906.236-1.939.355-3.072.355h-.73c-.522 0-1.029.188-1.427.525a2.21 2.21 0 0 0-.744 1.328l-.055.299-.924 5.855-.042.215c-.011.068-.03.102-.058.125a.155.155 0 0 1-.096.035H7.266z" fill="#253B80"/>
                <path d="M23.048 7.667c-.028.179-.06.362-.096.55-1.237 6.351-5.469 8.545-10.874 8.545H9.326c-.661 0-1.218.48-1.321 1.132L6.596 26.83l-.399 2.533a.704.704 0 0 0 .695.814h4.881c.578 0 1.069-.42 1.16-.99l.048-.248.919-5.832.059-.32c.09-.572.582-.992 1.16-.992h.73c4.729 0 8.431-1.92 9.513-7.476.452-2.321.218-4.259-.978-5.622a4.667 4.667 0 0 0-1.336-1.03z" fill="#179BD7"/>
                <path d="M21.754 7.151a9.757 9.757 0 0 0-1.203-.267 15.284 15.284 0 0 0-2.426-.177h-7.352a1.172 1.172 0 0 0-1.159.992L8.05 17.605l-.045.289a1.336 1.336 0 0 1 1.321-1.132h2.752c5.405 0 9.637-2.195 10.874-8.545.037-.188.068-.371.096-.55a6.594 6.594 0 0 0-1.017-.429 9.045 9.045 0 0 0-.277-.087z" fill="#222D65"/>
                <path d="M9.614 7.699a1.169 1.169 0 0 1 1.159-.991h7.352c.871 0 1.684.057 2.426.177a9.757 9.757 0 0 1 1.481.353c.365.121.704.264 1.017.429.368-2.347-.003-3.945-1.272-5.392C20.378.682 17.853 0 14.622 0h-9.38c-.66 0-1.223.48-1.325 1.133L.01 25.898a.806.806 0 0 0 .795.932h5.791l1.454-9.225 1.564-9.906z" fill="#253B80"/>
              </svg>
            </div>

            {/* Stripe */}
            <div className="group transition-all duration-300 hover:scale-110">
              <svg className="h-6 sm:h-7 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" viewBox="0 0 60 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M59.64 12.98c0-4.28-2.07-7.65-6.04-7.65-3.98 0-6.4 3.37-6.4 7.62 0 5.03 2.85 7.58 6.93 7.58 1.99 0 3.5-.45 4.64-1.09v-3.34c-1.14.57-2.45.92-4.11.92-1.63 0-3.07-.57-3.25-2.55h8.19c0-.22.04-1.08.04-1.49zm-8.28-1.59c0-1.89 1.16-2.68 2.21-2.68 1.02 0 2.11.79 2.11 2.68h-4.32zM40.95 5.33c-1.64 0-2.69.77-3.28 1.3l-.22-1.04h-3.68v19.51l4.18-.89.01-4.74c.6.43 1.47.89 2.93.89 2.96 0 5.66-2.38 5.66-7.62-.01-4.79-2.75-7.41-5.6-7.41zm-.99 11.4c-.97 0-1.55-.35-1.95-.78l-.02-6.13c.43-.48 1.03-.81 1.97-.81 1.51 0 2.55 1.69 2.55 3.87 0 2.22-1.02 3.85-2.55 3.85zM28.24 4.34l4.2-.89V.11l-4.2.89v3.34zM28.24 5.59h4.2v14.51h-4.2V5.59zM23.79 6.83l-.27-1.24h-3.62v14.51h4.18V10c.99-1.29 2.66-1.05 3.18-.87V5.59c-.54-.2-2.5-.57-3.47 1.24zM15.43 1.93l-4.08.87-.02 13.28c0 2.45 1.84 4.26 4.29 4.26 1.36 0 2.35-.25 2.9-.54v-3.4c-.53.21-3.15.97-3.15-1.46V9.01h3.15V5.59h-3.15l.06-3.66zM4.32 9.68c0-.65.53-.9 1.42-.9 1.27 0 2.87.38 4.14 1.07V6.09c-1.39-.55-2.76-.77-4.14-.77C2.26 5.32 0 7.1 0 10.02c0 4.51 6.21 3.79 6.21 5.74 0 .77-.67 1.02-1.6 1.02-1.39 0-3.16-.57-4.57-1.35v3.79c1.56.67 3.13.96 4.57.96 3.54 0 5.98-1.75 5.98-4.72-.01-4.87-6.27-4-6.27-5.78z" fill="#635BFF"/>
              </svg>
            </div>

            {/* Visa */}
            <div className="group transition-all duration-300 hover:scale-110">
              <svg className="h-6 sm:h-7 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" viewBox="0 0 60 20" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M25.924 19.268h-4.937l3.088-19.07h4.936l-3.087 19.07zM42.398.614L37.72.198h-.14c-2.662 0-4.448 1.434-4.588 3.479-.14 1.503 1.34 2.337 2.359 2.893 1.04.556 1.39.926 1.39 1.434 0 .787-.834 1.135-1.599 1.135-1.739 0-2.569-.231-3.867-.81l-.556-.278-.557 3.572c.973.417 2.778.787 4.657.81 4.448 0 7.321-2.17 7.391-4.402.07-1.48-.834-2.614-2.639-3.526-1.11-.602-1.809-.973-1.809-1.574.024-.555.602-1.11 1.88-1.11.764-.023 1.53.07 2.27.255l.277.07.557-3.131h-.348zM51.527.198h-3.47c-1.064 0-1.878.301-2.361 1.434l-6.698 15.683h4.657l.95-2.614h5.724l.555 2.614h4.17L51.526.198zM46.72 11.84l1.738-4.703 1.018 4.703H46.72zM20.85.198l-4.727 12.997-.485-2.614c-.903-2.984-3.66-6.18-6.717-7.8l3.87 15.497h4.726l7.047-18.08h-3.714z" fill="#1434CB"/>
                <path d="M9.83.198H2.37l-.069.301c5.587 1.411 9.316 4.89 10.822 9.085L11.564 1.61c-.209-1.088-.973-1.389-1.734-1.412z" fill="#F9A533"/>
              </svg>
            </div>

            {/* Mastercard */}
            <div className="group transition-all duration-300 hover:scale-110">
              <svg className="h-6 sm:h-7 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" viewBox="0 0 60 37" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M38.013 3.244h-16.02v30.507h16.02V3.244z" fill="#FF5F00"/>
                <path d="M23.1 18.498c0-6.202 2.9-11.728 7.398-15.254A19.213 19.213 0 0 0 18.487 0C8.272 0 0 8.28 0 18.498c0 10.222 8.272 18.498 18.487 18.498a19.213 19.213 0 0 0 12.01-4.244c-4.499-3.526-7.398-9.052-7.398-15.254z" fill="#EB001B"/>
                <path d="M60 18.498c0 10.222-8.273 18.498-18.487 18.498a19.213 19.213 0 0 1-12.01-3.244c4.498-3.526 7.397-9.052 7.397-15.254s-2.899-11.728-7.397-15.254A19.213 19.213 0 0 1 41.513 0C51.727 0 60 8.28 60 18.498z" fill="#F79E1B"/>
              </svg>
            </div>

            {/* Apple Pay */}
            <div className="group transition-all duration-300 hover:scale-110">
              <svg className="h-6 sm:h-7 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" viewBox="0 0 50 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.365 2.756c.61-.78 1.024-1.843.912-2.925-.889.037-1.982.607-2.611 1.369-.573.665-1.08 1.758-.949 2.783.996.074 2.019-.518 2.648-1.227zm.893.635c-1.466-.085-2.716.833-3.414.833-.699 0-1.768-.796-2.924-.777-1.504.02-2.897.877-3.67 2.223-1.578 2.721-.407 6.766 1.115 8.989.74 1.092 1.633 2.295 2.807 2.258 1.115-.037 1.559-.722 2.916-.722 1.355 0 1.762.722 2.933.703 1.21-.02 1.973-1.092 2.714-2.184.852-1.24 1.194-2.443 1.212-2.517-.019-.019-2.343-.907-2.362-3.572-.019-2.24 1.823-3.313 1.916-3.386-1.051-1.555-2.68-1.729-3.243-1.768v-.08zM21.72 1.194c3.01 0 5.11 2.08 5.11 5.1 0 3.028-2.138 5.12-5.185 5.12h-3.327v5.299h-2.382V1.195H21.72zm-3.402 8.183h2.761c2.1 0 3.29-1.134 3.29-3.074 0-1.941-1.19-3.066-3.28-3.066h-2.77v6.14zM27.603 13.71c0-1.98 1.522-3.198 4.21-3.35l3.1-.179v-.87c0-1.256-.84-2.005-2.25-2.005-1.333 0-2.175.655-2.382 1.677h-2.156c.113-2.08 1.903-3.614 4.614-3.614 2.686 0 4.425 1.45 4.425 3.689v7.722h-2.194v-1.846h-.056c-.647 1.237-2.063 2.024-3.533 2.024-2.194 0-3.778-1.36-3.778-3.247zm7.31-.974v-.889l-2.79.17c-1.39.095-2.176.702-2.176 1.668 0 .984.823 1.63 2.081 1.63 1.636 0 2.885-1.124 2.885-2.579zM39.15 20.678v-1.893c.17.039.557.039.746.039 1.068 0 1.654-.454 2.007-1.62l.217-.7-4.04-11.227h2.496l2.78 9.172h.037l2.78-9.172h2.44l-4.202 11.833c-.966 2.73-2.081 3.606-4.426 3.606-.19 0-.654-.02-.835-.038z" fill="currentColor"/>
              </svg>
            </div>

            {/* Google Pay */}
            <div className="group transition-all duration-300 hover:scale-110">
              <svg className="h-6 sm:h-7 w-auto opacity-50 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0" viewBox="0 0 62 25" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M29.764 12.392v7.234h-2.298V1.234h6.099c1.47 0 2.717.498 3.74 1.494a4.891 4.891 0 0 1 1.536 3.675c0 1.515-.512 2.768-1.536 3.758-1.017 1.002-2.258 1.494-3.74 1.494h-3.801v.737zm0-8.88v5.865h3.842c.87 0 1.6-.307 2.2-.92.605-.615.908-1.354.908-2.213 0-.847-.303-1.574-.908-2.178-.594-.614-1.324-.914-2.2-.914h-3.842v.36zM42.084 6.086c1.693 0 3.028.454 4.006 1.36.978.909 1.467 2.148 1.467 3.718v7.462h-2.194v-1.68h-.1c-.948 1.381-2.206 2.072-3.774 2.072-1.337 0-2.451-.392-3.343-1.177-.892-.784-1.337-1.779-1.337-2.984 0-1.262.476-2.267 1.427-3.015.95-.749 2.221-1.123 3.813-1.123 1.36 0 2.48.249 3.362.746v-.525c0-.75-.3-1.387-.899-1.912-.599-.525-1.309-.788-2.128-.788-1.229 0-2.202.52-2.92 1.558l-2.02-1.273c1.065-1.534 2.649-2.3 4.752-2.3l-.112-.139zm-2.96 9.48c0 .567.234 1.04.702 1.418.468.378 1.02.567 1.655.567.897 0 1.71-.337 2.439-1.01.728-.674 1.093-1.47 1.093-2.386-.714-.567-1.71-.851-2.99-.851-.933 0-1.71.219-2.33.657-.623.438-.934.964-.934 1.578l.365.027zM61.614 6.479l-7.632 17.547h-2.372l2.834-6.115-5.021-11.432h2.499l3.622 8.735h.05l3.521-8.735h2.499z" fill="#5F6368"/>
                <path d="M20.384 10.518c0-.651-.058-1.302-.173-1.941H10.41v3.675h5.61c-.242 1.302-.977 2.441-2.085 3.189v2.652h3.376c1.976-1.82 3.113-4.502 3.113-7.575h-.04z" fill="#4285F4"/>
                <path d="M10.41 21.074c2.823 0 5.191-.935 6.921-2.532l-3.381-2.621c-.936.627-2.132.998-3.54.998-2.726 0-5.032-1.84-5.856-4.315H1.09v2.707c1.729 3.436 5.277 5.763 9.32 5.763z" fill="#34A853"/>
                <path d="M4.554 12.604c-.209-.627-.328-1.296-.328-1.977 0-.68.119-1.35.328-1.976V5.944H1.09A10.583 10.583 0 0 0 0 10.627c0 1.709.41 3.328 1.132 4.764l3.422-2.787z" fill="#FBBC04"/>
                <path d="M10.41 4.336c1.535 0 2.913.528 3.997 1.565l2.998-2.998C15.596 1.144 13.227.18 10.41.18c-4.043 0-7.591 2.327-9.32 5.764L4.554 8.65c.818-2.475 3.124-4.315 5.856-4.315z" fill="#EA4335"/>
              </svg>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <CTASection />
      </div>
    </div>
  );
}
