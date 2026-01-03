"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CheckVerified01,
  ChevronRight,
  Home05,
  Shield01,
  SearchLg,
  Package,
  CheckCircle,
  Clock,
  Star01,
  ArrowRight,
  Award01,
  FileCheck02,
  Eye,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const processSteps = [
  {
    step: 1,
    title: "Item Submission",
    description: "Seller ships the item to our authentication center before it reaches you.",
    icon: Package,
  },
  {
    step: 2,
    title: "Expert Inspection",
    description: "Our certified authenticators examine every detail using specialized equipment.",
    icon: SearchLg,
  },
  {
    step: 3,
    title: "Verification",
    description: "Item passes our comprehensive checklist and receives authentication certificate.",
    icon: FileCheck02,
  },
  {
    step: 4,
    title: "Secure Delivery",
    description: "Authenticated item is sealed and shipped directly to you with full documentation.",
    icon: CheckVerified01,
  },
];

const categories = [
  {
    name: "Luxury Watches",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop",
    brands: ["Rolex", "Patek Philippe", "Omega", "Audemars Piguet"],
  },
  {
    name: "Designer Handbags",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=400&h=300&fit=crop",
    brands: ["Hermès", "Louis Vuitton", "Chanel", "Gucci"],
  },
  {
    name: "Fine Jewelry",
    image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    brands: ["Cartier", "Tiffany & Co.", "Van Cleef", "Bulgari"],
  },
  {
    name: "Trading Cards",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=300&fit=crop",
    brands: ["Pokemon", "Magic: The Gathering", "Sports Cards", "Yu-Gi-Oh!"],
  },
  {
    name: "Sneakers",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400&h=300&fit=crop",
    brands: ["Nike", "Jordan", "Yeezy", "New Balance"],
  },
  {
    name: "Fine Art",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop",
    brands: ["Original Paintings", "Limited Prints", "Sculptures"],
  },
];

const experts = [
  {
    name: "Dr. Rajesh Kumar",
    specialty: "Luxury Watches",
    experience: "25+ years",
    image: "https://randomuser.me/api/portraits/men/32.jpg",
    certifications: ["Swiss Watch Academy", "WOSTEP Certified"],
  },
  {
    name: "Priya Malhotra",
    specialty: "Designer Handbags",
    experience: "15+ years",
    image: "https://randomuser.me/api/portraits/women/44.jpg",
    certifications: ["Entrupy Certified", "LVMH Expert"],
  },
  {
    name: "Amit Sharma",
    specialty: "Trading Cards",
    experience: "12+ years",
    image: "https://randomuser.me/api/portraits/men/45.jpg",
    certifications: ["PSA Certified", "BGS Expert"],
  },
];

const guarantees = [
  {
    icon: Shield01,
    title: "100% Money-Back Guarantee",
    description: "If an authenticated item is later found to be inauthentic, you get a full refund.",
  },
  {
    icon: Clock,
    title: "Lifetime Authenticity",
    description: "Our authentication is valid for the lifetime of the item with proper documentation.",
  },
  {
    icon: Award01,
    title: "Industry-Leading Accuracy",
    description: "99.98% accuracy rate verified by independent third-party audits.",
  },
];

export default function AuthenticityGuaranteePage() {
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
            <span className="text-white">Authenticity Guarantee</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <CheckVerified01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Authenticity Guarantee
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                Every item verified by experts, guaranteed authentic
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-brand-600 to-brand-800 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
            <div className="text-center lg:text-left">
              <Badge type="pill-color" color="warning" size="md" className="mb-4">
                Trusted by 50,000+ Buyers
              </Badge>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Buy With Complete Confidence
              </h2>
              <p className="text-brand-100 max-w-xl">
                Our team of expert authenticators verifies every eligible item before it reaches you.
                100% authenticity guaranteed or your money back.
              </p>
              <div className="mt-6 flex flex-wrap gap-4 justify-center lg:justify-start">
                {guarantees.map((guarantee, i) => (
                  <div key={i} className="flex items-center gap-2 text-white">
                    <CheckCircle className="size-5" />
                    <span className="text-sm font-medium">{guarantee.title}</span>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex-shrink-0">
              <div className="size-48 rounded-full bg-white/20 flex items-center justify-center">
                <CheckVerified01 className="size-24 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="brand" size="sm">Our Process</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              How Authentication Works
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {processSteps.map((step, index) => (
              <div key={index} className="relative rounded-xl border border-secondary bg-primary p-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-brand-600 text-white font-bold">
                    {step.step}
                  </div>
                  <step.icon className="size-5 text-brand-600" />
                </div>
                <h3 className="font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{step.description}</p>
                {index < processSteps.length - 1 && (
                  <ArrowRight className="hidden lg:block absolute top-1/2 -right-3 size-6 text-tertiary -translate-y-1/2 z-10" />
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Categories */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="success" size="sm">What We Authenticate</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Covered Categories
            </h2>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((category, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary overflow-hidden group">
                <div className="aspect-video relative">
                  <Image
                    src={category.image}
                    alt={category.name}
                    fill
                    className="object-cover transition-transform duration-300 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-4 left-4">
                    <h3 className="font-semibold text-white">{category.name}</h3>
                  </div>
                </div>
                <div className="p-4">
                  <div className="flex flex-wrap gap-1.5">
                    {category.brands.map((brand, i) => (
                      <span key={i} className="px-2 py-1 rounded text-xs bg-secondary text-tertiary">
                        {brand}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Expert Team */}
        <div className="mb-16">
          <div className="text-center mb-12">
            <Badge type="pill-color" color="warning" size="sm">Meet the Experts</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Our Authentication Team
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {experts.map((expert, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-6 text-center">
                <Image
                  src={expert.image}
                  alt={expert.name}
                  width={96}
                  height={96}
                  className="rounded-full mx-auto mb-4"
                />
                <h3 className="font-semibold text-primary">{expert.name}</h3>
                <p className="text-sm text-brand-600 font-medium">{expert.specialty}</p>
                <p className="text-sm text-tertiary mt-1">{expert.experience} experience</p>
                <div className="mt-4 flex flex-wrap justify-center gap-1.5">
                  {expert.certifications.map((cert, i) => (
                    <span key={i} className="px-2 py-1 rounded-full text-xs bg-brand-100 text-brand-700">
                      {cert}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Guarantees */}
        <div className="mb-16">
          <div className="grid gap-6 lg:grid-cols-3">
            {guarantees.map((guarantee, index) => (
              <div key={index} className="rounded-2xl border border-secondary bg-primary p-6">
                <FeaturedIcon icon={guarantee.icon} size="lg" color="brand" theme="light" />
                <h3 className="mt-4 text-lg font-semibold text-primary">{guarantee.title}</h3>
                <p className="mt-2 text-tertiary">{guarantee.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* CTA */}
        <div className="rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Eye className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Look for the Authenticated Badge</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Items with the blue checkmark have been verified by our expert team.
          </p>
          <Link href="/marketplace?authenticated=true">
            <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
              Browse Authenticated Items
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
