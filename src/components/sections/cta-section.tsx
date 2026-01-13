"use client";

import Image from "next/image";
import { ArrowRight, Play, Shield01, Clock, TrendUp01, Gift01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const trustBadges = [
    { icon: Shield01, label: "Secure Payments" },
    { icon: Clock, label: "24/7 Auctions" },
    { icon: TrendUp01, label: "Best Deals" },
];

export const CTASection = () => {
    return (
        <section className="relative overflow-hidden py-4 lg:py-4">
            {/* Background Image */}
            <Image
                src="/background.jpg"
                alt="Background"
                fill
                className="object-cover"
                priority
            />
            {/* Dark overlay for better text readability */}
            <div className="absolute inset-0" />
            {/* Dot pattern */}
            <div
                className="absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
                    backgroundSize: '24px 24px',
                }}
            />

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div className="mb-6 inline-flex">
                        <span className="inline-flex items-center gap-2 rounded-full bg-white px-4 py-2 text-sm font-semibold text-[#000080] shadow-lg ring-2 ring-white/20">
                            <Gift01 className="size-4" />
                            New Users: First Bid Free!
                        </span>
                    </div>

                    {/* Main heading */}
                    <h2 className="text-lg font-semibold tracking-tight text-white sm:text-xl lg:text-2xl">
                        Ready to start bidding?
                    </h2>

                    {/* Subheading */}
                    <p className="mt-2 max-w-2xl text-sm leading-relaxed text-brand-100 lg:text-base">
                        Join over <span className="font-semibold text-white">50,000+ bidders</span> winning amazing deals.
                        Sign up free and start bidding in seconds.
                    </p>

                    {/* CTA Buttons */}
                    <div className="mt-5 flex flex-col items-center gap-3 sm:flex-row">
                        <Button color="secondary" size="md" iconTrailing={ArrowRight} className="w-full sm:w-auto text-sm">
                            Start Bidding — It's Free
                        </Button>
                        <Button
                            size="md"
                            iconLeading={Play}
                            className="w-full sm:w-auto bg-white/20 text-white hover:bg-white/30 text-sm"
                        >
                            How It Works
                        </Button>
                    </div>

                    {/* Trust Badges */}
                    <div className="mt-6 flex flex-wrap items-center justify-center gap-4">
                        {trustBadges.map((badge) => (
                            <div
                                key={badge.label}
                                className="flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 transition-all duration-200 hover:bg-white/20"
                            >
                                <badge.icon className="size-4 text-brand-200" />
                                <span className="text-xs font-medium text-brand-100">{badge.label}</span>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
