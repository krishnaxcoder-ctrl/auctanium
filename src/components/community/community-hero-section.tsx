"use client";

import { useEffect, useState } from "react";
import { Users01, MessageCircle01, Calendar, Star01, TrendUp01, Award01 } from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const stats = [
    { icon: Users01, value: "50K+", label: "Active Members", color: "brand" },
    { icon: MessageCircle01, value: "1.2M+", label: "Discussions", color: "success" },
    { icon: Calendar, value: "500+", label: "Events Hosted", color: "warning" },
];

export const CommunityHeroSection = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative overflow-hidden bg-primary pt-16 pb-20 lg:pt-24 lg:pb-28">
            {/* Background Elements */}
            <div className="pointer-events-none absolute inset-0">
                {/* Gradient orbs */}
                <div className="absolute -top-40 -right-40 size-96 rounded-full bg-brand-primary/20 blur-3xl" />
                <div className="absolute top-1/2 -left-40 size-96 rounded-full bg-success-primary/10 blur-3xl" />
                <div className="absolute -bottom-40 right-1/4 size-64 rounded-full bg-warning-primary/10 blur-3xl" />

                {/* Dot pattern */}
                <div
                    className="absolute inset-0 opacity-[0.15]"
                    style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='2' fill='%237F56D9'/%3E%3C/svg%3E")`,
                        backgroundSize: '24px 24px',
                    }}
                />

                {/* Radial gradient overlay */}
                <div
                    className="absolute inset-0"
                    style={{
                        background: 'radial-gradient(circle at 50% 50%, transparent 0%, transparent 20%, var(--color-bg-primary) 70%)',
                    }}
                />
            </div>

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center text-center">
                    {/* Badge */}
                    <div
                        className={cx(
                            "mb-6 transition-all duration-700",
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}
                    >
                        <Badge type="pill-color" size="lg" color="brand">
                            <span className="flex items-center gap-2">
                                <Users01 className="size-4" />
                                Join 50,000+ Community Members
                            </span>
                        </Badge>
                    </div>

                    {/* Main Heading */}
                    <h1
                        className={cx(
                            "max-w-4xl text-display-md font-semibold tracking-tight text-primary transition-all duration-700 delay-100 sm:text-display-lg lg:text-display-xl",
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}
                    >
                        Connect, Share, and Grow with{" "}
                        <span className="bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                            Fellow Collectors
                        </span>
                    </h1>

                    {/* Subheading */}
                    <p
                        className={cx(
                            "mt-6 max-w-3xl text-lg leading-relaxed text-tertiary transition-all duration-700 delay-200 lg:text-xl",
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}
                    >
                        Join a vibrant community of passionate collectors, sellers, and enthusiasts. Share your wins,
                        learn from experts, and discover exclusive opportunities.
                    </p>

                    {/* CTA Buttons */}
                    <div
                        className={cx(
                            "mt-10 flex flex-col items-center gap-4 sm:flex-row transition-all duration-700 delay-300",
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}
                    >
                        <Link href="/signup">
                            <Button color="primary" size="xl" className="w-full sm:w-auto">
                                Join the Community
                            </Button>
                        </Link>
                        <Link href="#forums">
                            <Button color="secondary" size="xl" className="w-full sm:w-auto">
                                Explore Forums
                            </Button>
                        </Link>
                    </div>

                    {/* Stats */}
                    <div
                        className={cx(
                            "mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3 transition-all duration-700 delay-500",
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}
                    >
                        {stats.map((stat, index) => (
                            <div
                                key={stat.label}
                                className="flex flex-col items-center gap-3 rounded-2xl border border-secondary bg-secondary/30 p-6 backdrop-blur-sm transition-all duration-300 hover:scale-105 hover:border-brand-400 hover:shadow-lg"
                            >
                                <div className={`rounded-xl bg-${stat.color}-primary p-3`}>
                                    <stat.icon className={`size-6 text-${stat.color}-600`} />
                                </div>
                                <div className="text-center">
                                    <div className="text-3xl font-bold text-primary">{stat.value}</div>
                                    <div className="mt-1 text-sm text-tertiary">{stat.label}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
};
