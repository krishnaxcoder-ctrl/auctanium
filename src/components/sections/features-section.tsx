"use client";

import {
    CurrencyDollar,
    Shield01,
    Clock,
    Zap,
    Globe01,
    Gift01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const features = [
    {
        icon: CurrencyDollar,
        title: "Best Prices",
        description: "Win items at prices far below retail. Our auction system ensures you always get the best deals.",
        color: "success" as const,
    },
    {
        icon: Shield01,
        title: "Verified Sellers",
        description: "All sellers are verified and items are authenticated. Buy with confidence every time.",
        color: "brand" as const,
    },
    {
        icon: Clock,
        title: "Real-time Bidding",
        description: "Experience the thrill of live auctions. Bid in real-time and watch prices update instantly.",
        color: "warning" as const,
    },
    {
        icon: Zap,
        title: "Quick & Easy",
        description: "Simple bidding process with instant notifications. Never miss an auction with our smart alerts.",
        color: "error" as const,
    },
    {
        icon: Globe01,
        title: "Global Marketplace",
        description: "Access auctions from sellers worldwide. Find unique items you won't find anywhere else.",
        color: "brand" as const,
    },
    {
        icon: Gift01,
        title: "Buyer Protection",
        description: "Full money-back guarantee on all purchases. Your satisfaction is our top priority.",
        color: "success" as const,
    },
];

export const FeaturesSection = () => {
    return (
        <section id="features" className="relative bg-primary py-4 lg:py-6 overflow-hidden">
            {/* Background decoration */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-40 -right-40 w-80 h-80 bg-brand-100 rounded-full blur-3xl opacity-50" />
                <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-brand-100 rounded-full blur-3xl opacity-50" />

                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%237F56D9'/%3E%3C/svg%3E")`,
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Radial gradient overlay to fade dots at edges */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 15%, var(--color-bg-primary) 60%)',
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="text-center">
                    <div className="flex justify-center">
                        <Badge type="pill-color" size="md" color="brand">
                            Features
                        </Badge>
                    </div>
                    <h2 className="mt-3 text-lg font-semibold text-primary sm:text-xl">
                        Everything you need to win auctions
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-tertiary">
                        The most trusted auction platform for finding amazing deals. Join thousands of satisfied bidders
                        today.
                    </p>
                </div>

                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-6 transition-all hover:border-brand hover:shadow-lg"
                        >
                            {/* Hover gradient */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                            <div className="relative">
                                <FeaturedIcon
                                    icon={feature.icon}
                                    size="lg"
                                    color={feature.color}
                                    theme="modern"
                                    className="mb-5"
                                />
                                <h3 className="text-lg font-semibold text-primary">{feature.title}</h3>
                                <p className="mt-2 text-secondary">{feature.description}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
