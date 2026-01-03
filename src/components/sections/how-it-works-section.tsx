"use client";

import Link from "next/link";
import {
    ArrowRight,
    UserPlus01,
    SearchLg,
    CursorClick01,
    PackageCheck,
    Eye,
    Zap,
    Shield01,
    Heart,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const steps = [
    {
        icon: UserPlus01,
        title: "Create Your Account",
        description: "Sign up for free in seconds. No credit card required to start browsing amazing deals. Get instant access to thousands of auctions worldwide.",
        color: "brand" as const,
    },
    {
        icon: SearchLg,
        title: "Find Your Items",
        description: "Browse thousands of auctions across categories. Use advanced filters and search to find exactly what you want quickly and easily.",
        color: "success" as const,
    },
    {
        icon: CursorClick01,
        title: "Place Your Bid",
        description: "Set your maximum bid and let our smart system bid for you automatically, or compete in exciting real-time live auctions.",
        color: "warning" as const,
    },
    {
        icon: PackageCheck,
        title: "Win & Receive",
        description: "Win the auction, pay securely through our platform, and receive your item with our comprehensive buyer protection guarantee.",
        color: "error" as const,
    },
    {
        icon: Eye,
        title: "Track Your Auctions",
        description: "Monitor all your active bids and favorite items in real-time from your personalized dashboard. Never miss an opportunity.",
        color: "brand" as const,
    },
    {
        icon: Zap,
        title: "Get Instant Alerts",
        description: "Receive instant notifications when you're outbid or when auctions you're watching are ending soon. Stay ahead of the competition.",
        color: "success" as const,
    },
    {
        icon: Shield01,
        title: "Secure Payment",
        description: "Pay safely with our bank-level encrypted payment system. Your financial data is always protected with advanced security measures.",
        color: "warning" as const,
    },
    {
        icon: Heart,
        title: "Build Your Reputation",
        description: "Leave reviews, earn exclusive badges, and become a trusted member of our growing auction community. Build your seller profile.",
        color: "error" as const,
    },
];

export const HowItWorksSection = () => {
    return (
        <section id="how-it-works" className="bg-secondary py-8 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <div className="flex justify-center">
                        <Badge type="pill-color" size="md" color="brand">
                            How It Works
                        </Badge>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-primary sm:text-xl">
                        Start winning in 4 simple steps
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-tertiary">
                        Join thousands of happy bidders. Getting started is quick and easy.
                    </p>
                </div>

                {/* Steps */}
                <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
                    {steps.map((step, index) => (
                        <div key={index} className="relative">
                            <div className="group relative bg-primary p-6 border border-secondary transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:border-brand-300">
                                {/* Icon */}
                                <div className="mb-5">
                                    <FeaturedIcon
                                        icon={step.icon}
                                        size="lg"
                                        color={step.color}
                                        theme="modern"
                                    />
                                </div>

                                {/* Content */}
                                <h3 className="text-lg font-semibold text-primary group-hover:text-brand-600">
                                    {step.title}
                                </h3>
                                <p className="mt-2 text-sm text-tertiary leading-relaxed line-clamp-3">
                                    {step.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>

                {/* CTA */}
                <div className="mt-6 flex justify-center">
                    <Link href="/signup">
                        <Button color="primary" size="lg" iconTrailing={ArrowRight} className="px-16 sm:px-24">
                            Start Bidding
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
