"use client";

import {
    Shield01,
    Lock01,
    RefreshCcw01,
    CheckCircle,
    CreditCard02,
    Truck01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const protectionFeatures = [
    {
        icon: Shield01,
        title: "Buyer Protection Guarantee",
        description: "Every purchase is protected. If your item doesn't arrive or isn't as described, we'll refund you in full.",
        color: "brand" as const,
    },
    {
        icon: CheckCircle,
        title: "Authenticity Verified",
        description: "All items are verified for authenticity by our expert team before they're listed on our platform.",
        color: "success" as const,
    },
    {
        icon: CreditCard02,
        title: "Secure Payments",
        description: "Your payment information is encrypted with bank-level security. We never store your card details.",
        color: "warning" as const,
    },
    {
        icon: Lock01,
        title: "Data Privacy",
        description: "Your personal information is protected with industry-leading security protocols and never shared.",
        color: "error" as const,
    },
    {
        icon: RefreshCcw01,
        title: "Easy Returns",
        description: "Changed your mind? Return eligible items within 14 days for a full refund, no questions asked.",
        color: "brand" as const,
    },
    {
        icon: Truck01,
        title: "Insured Shipping",
        description: "All shipments are fully insured. Your precious metals are protected from the moment they leave the seller.",
        color: "success" as const,
    },
];

export const BuyerProtectionSection = () => {
    return (
        <section className="bg-secondary py-8 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <Badge type="pill-color" size="md" color="brand">
                        Platform Guarantees
                    </Badge>
                    <h2 className="mt-3 text-lg font-semibold text-primary sm:text-xl">
                        Your Security is Our Priority
                    </h2>
                    <p className="mx-auto mt-2 max-w-2xl text-sm text-tertiary">
                        Shop with complete confidence. We've built multiple layers of protection to keep your transactions safe.
                    </p>
                </div>

                {/* Features Grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                    {protectionFeatures.map((feature) => (
                        <div
                            key={feature.title}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-6 transition-all duration-300 hover:border-brand-300 hover:shadow-lg"
                        >
                            {/* Hover gradient */}
                            <div className="pointer-events-none absolute inset-0 bg-gradient-to-br from-brand-50/50 to-transparent opacity-0 transition-opacity group-hover:opacity-100" />

                            <div className="relative">
                                <FeaturedIcon
                                    icon={feature.icon}
                                    size="lg"
                                    color={feature.color}
                                    theme="modern"
                                    className="mb-4"
                                />
                                <h3 className="text-lg font-semibold text-primary">
                                    {feature.title}
                                </h3>
                                <p className="mt-2 text-sm text-secondary leading-relaxed">
                                    {feature.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
