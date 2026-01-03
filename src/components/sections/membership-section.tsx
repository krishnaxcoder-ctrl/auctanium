"use client";

import Image from "next/image";
import { Check, Clock, Zap, TrendUp01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const tiers = [
    {
        name: "Basic",
        price: "Free",
        period: "",
        icon: Clock,
        highlight: false,
        features: [
            "Browse all auctions",
            "Place up to 10 bids/day",
            "Basic notifications",
            "Standard support",
        ]
    },
    {
        name: "Premium",
        price: "$9.99",
        period: "/month",
        icon: Zap,
        highlight: true,
        features: [
            "Unlimited bidding",
            "Early access to auctions",
            "Priority notifications",
            "Bid analytics",
            "No buyer fees",
            "24/7 priority support",
        ]
    },
    {
        name: "Pro Seller",
        price: "$29.99",
        period: "/month",
        icon: TrendUp01,
        highlight: false,
        features: [
            "Everything in Premium",
            "Create unlimited auctions",
            "Featured listings",
            "Advanced analytics",
            "Reduced seller fees",
            "Dedicated account manager",
            "Promotional tools",
        ]
    },
];

export const MembershipSection = () => {
    return (
        <section id="earnings" className="relative py-8 lg:py-6 overflow-hidden">
            {/* Background Image */}
            <Image
                src="/MembershipPlansbg.png"
                alt="Membership Plans Background"
                fill
                className="object-cover"
            />

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center mb-6">
                    <div className="flex justify-center">
                        <Badge type="pill-color" size="md" color="brand">
                            Membership Plans
                        </Badge>
                    </div>
                    <h2
                        className="mt-3 text-lg font-semibold text-white sm:text-xl"
                        style={{ WebkitTextStroke: '0.5px #7F56D9 ' }}
                    >
                        Choose your bidding power
                    </h2>
                    <p className="mt-2 max-w-xl mx-auto text-sm text-white">
                        Whether you're a casual bidder or a power seller, we have a plan that fits your needs.
                        Upgrade anytime.
                    </p>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Membership Tiers */}
                    {tiers.map((tier, index) => (
                        <div
                            key={index}
                            className={cx(
                                "relative rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1",
                                tier.highlight
                                    ? "bg-brand-solid text-white shadow-xl shadow-brand-500/20 ring-2 ring-brand-400"
                                    : "bg-secondary ring-1 ring-purple-300 hover:ring-purple-400"
                            )}
                        >
                            {tier.highlight && (
                                <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                                    <Badge type="pill-color" size="sm" color="warning">
                                        Most Popular
                                    </Badge>
                                </div>
                            )}

                            <div className={cx(
                                "w-12 h-12 rounded-xl flex items-center justify-center mb-4",
                                tier.highlight ? "bg-white/20" : "bg-brand-100"
                            )}>
                                <tier.icon className={cx("size-6", tier.highlight ? "text-white" : "text-brand-600")} />
                            </div>

                            <p className={cx("text-sm font-medium mb-2", tier.highlight ? "text-brand-100" : "text-tertiary")}>
                                {tier.name}
                            </p>

                            <div className="flex items-baseline gap-1">
                                <span className={cx("text-display-sm font-bold", tier.highlight ? "text-white" : "text-primary")}>
                                    {tier.price}
                                </span>
                                <span className={cx("text-sm", tier.highlight ? "text-brand-200" : "text-tertiary")}>
                                    {tier.period}
                                </span>
                            </div>

                            <div className={cx("mt-4 pt-4 border-t", tier.highlight ? "border-white/20" : "border-secondary")}>
                                <ul className="space-y-3">
                                    {tier.features.map((feature, featureIndex) => (
                                        <li key={featureIndex} className={cx("flex items-center gap-2 text-sm", tier.highlight ? "text-brand-100" : "text-secondary")}>
                                            <Check className={cx("size-4 shrink-0", tier.highlight ? "text-brand-200" : "text-brand-500")} />
                                            {feature}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
