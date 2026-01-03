"use client";

import { TrendUp01, Users01, MessageCircle01, Award01, Heart, Eye } from "@untitledui/icons";

const stats = [
    {
        icon: Users01,
        value: "50,000+",
        label: "Active Members",
        change: "+12% this month",
        trend: "up",
    },
    {
        icon: MessageCircle01,
        value: "1.2M",
        label: "Total Discussions",
        change: "+8% this month",
        trend: "up",
    },
    {
        icon: Award01,
        value: "15,000+",
        label: "Success Stories",
        change: "+15% this month",
        trend: "up",
    },
    {
        icon: Heart,
        value: "98%",
        label: "Satisfaction Rate",
        change: "Consistently high",
        trend: "stable",
    },
];

export const CommunityStatsSection = () => {
    return (
        <section className="bg-secondary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="text-center">
                    <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                        Community by the Numbers
                    </h2>
                    <p className="mt-4 text-lg text-tertiary">
                        See how our community is growing and thriving every day
                    </p>
                </div>

                {/* Stats Grid */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {stats.map((stat) => (
                        <div
                            key={stat.label}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-8 transition-all duration-300 hover:scale-105 hover:border-brand-400 hover:shadow-xl"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative">
                                {/* Icon */}
                                <div className="inline-flex rounded-xl bg-brand-primary p-3 transition-all duration-300 group-hover:scale-110">
                                    <stat.icon className="size-6 text-brand-600" />
                                </div>

                                {/* Value */}
                                <div className="mt-6 text-4xl font-bold text-primary">{stat.value}</div>

                                {/* Label */}
                                <div className="mt-2 text-sm font-medium text-secondary">{stat.label}</div>

                                {/* Change indicator */}
                                <div className="mt-4 flex items-center gap-2">
                                    {stat.trend === "up" && (
                                        <TrendUp01 className="size-4 text-success-600" />
                                    )}
                                    <span className={`text-xs font-medium ${stat.trend === "up" ? "text-success-600" : "text-tertiary"}`}>
                                        {stat.change}
                                    </span>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
