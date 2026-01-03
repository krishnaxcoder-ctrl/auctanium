"use client";

import { useEffect, useState } from "react";
import {
    ArrowRight,
    Play,
    Check,
    Zap,
    CurrencyDollar,
    Shield01,
    Clock,
    Star01,
    TrendUp01,
} from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Badge, BadgeWithDot, BadgeWithIcon } from "@/components/base/badges/badges";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";
import { Avatar } from "@/components/base/avatar/avatar";
import { RatingStars } from "@/components/foundations/rating-stars";
import { cx } from "@/utils/cx";

// Animated counter hook
const useAnimatedCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(0);

    useEffect(() => {
        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            setCount(Math.floor(progress * end));
            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            }
        };

        animationFrame = requestAnimationFrame(animate);
        return () => cancelAnimationFrame(animationFrame);
    }, [end, duration]);

    return count;
};

// Floating notification cards data
const notifications = [
    {
        icon: Check,
        iconColor: "success" as const,
        title: "Bid Placed!",
        subtitle: "Your bid of $250 was accepted",
        position: "top-right",
    },
    {
        icon: Zap,
        iconColor: "brand" as const,
        title: "Auction Ending Soon",
        subtitle: "5 minutes left to bid",
        position: "bottom-left",
    },
];

// Trust badges
const trustBadges = [
    { icon: Shield01, label: "Verified Sellers" },
    { icon: Clock, label: "Real-time Bidding" },
    { icon: TrendUp01, label: "Best Deals" },
];

export const HeroSection = () => {
    const userCount = useAnimatedCounter(50000, 2500);
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setIsVisible(true);
    }, []);

    return (
        <section className="relative overflow-hidden bg-primary pt-8 pb-16 lg:pt-16 lg:pb-24">
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

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    {/* Left Content */}
                    <div
                        className={cx(
                            "text-center transition-all duration-700",
                            isVisible ? "translate-y-0 opacity-100" : "translate-y-8 opacity-0"
                        )}
                    >
                        {/* Status Badge */}
                        <div className="mb-6 inline-flex">
                            <Badge type="pill-color" size="lg" color="success">
                                <span className="flex items-center gap-2">
                                    <span className="relative flex size-2">
                                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-success-500 opacity-75" />
                                        <span className="relative inline-flex size-2 rounded-full bg-success-500" />
                                    </span>
                                    {userCount.toLocaleString()}+ live auctions right now
                                </span>
                            </Badge>
                        </div>

                        {/* Main Heading */}
                        <h1 className="w-full font-semibold tracking-tight text-primary text-[7vw] sm:text-[5vw] lg:text-[4vw] leading-[1.2]">
                            <span className="block whitespace-nowrap">Discover Exclusive Auctions.</span>
                            <span className="block whitespace-nowrap bg-gradient-to-r from-brand-600 to-brand-400 bg-clip-text text-transparent">
                                Win Unbeatable Deals.
                            </span>
                        </h1>

                        {/* Subheading */}
                        <p className="mt-5 max-w-3xl text-base leading-relaxed text-tertiary lg:text-lg">
                            Discover amazing deals on premium items through live auctions. Bid on electronics,
                            collectibles, fashion, and more. Join{" "}
                            <span className="font-semibold text-primary">50,000+ bidders</span> winning great deals.
                        </p>

                        {/* CTA Buttons */}
                        <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center">
                            <Link href="/signup" className="w-full sm:w-64">
                                <Button
                                    color="primary"
                                    size="xl"
                                    iconTrailing={ArrowRight}
                                    className="w-full justify-center"
                                    aria-label="Start bidding for free - Sign up now"
                                >
                                    Start Bidding — It's Free
                                </Button>
                            </Link>
                            <Link href="#how-it-works" className="w-full sm:w-64">
                                <Button
                                    color="secondary"
                                    size="xl"
                                    iconLeading={Play}
                                    className="w-full justify-center"
                                    aria-label="Watch how our auction platform works"
                                >
                                    How It Works
                                </Button>
                            </Link>
                        </div>

                        {/* Trust Indicators */}
                        <div className="mt-10 flex flex-col gap-6">
                            {/* User Avatars & Rating */}
                            <div className="flex flex-wrap items-center justify-center gap-6">
                                <div className="flex items-center gap-3">
                                    <div className="group/avatars flex">
                                        <Avatar
                                            size="md"
                                            src="https://randomuser.me/api/portraits/women/44.jpg"
                                            alt="Happy customer testimonial"
                                            className="ring-2 ring-bg-primary transition-all duration-300 ease-out hover:z-10 hover:scale-125"
                                        />
                                        <Avatar
                                            size="md"
                                            src="https://randomuser.me/api/portraits/men/32.jpg"
                                            alt="Satisfied bidder"
                                            className="-ml-3 ring-2 ring-bg-primary transition-all duration-300 ease-out group-hover/avatars:ml-1 hover:z-10 hover:scale-125"
                                        />
                                        <Avatar
                                            size="md"
                                            src="https://randomuser.me/api/portraits/women/68.jpg"
                                            alt="Verified auction winner"
                                            className="-ml-3 ring-2 ring-bg-primary transition-all duration-300 ease-out group-hover/avatars:ml-1 hover:z-10 hover:scale-125"
                                        />
                                        <Avatar
                                            size="md"
                                            initials="+5K"
                                            alt="5000 more active bidders"
                                            className="-ml-3 ring-2 ring-bg-primary transition-all duration-300 ease-out group-hover/avatars:ml-1 hover:z-10 hover:scale-125"
                                        />
                                    </div>
                                    <div className="text-left">
                                        <div className="flex items-center gap-1">
                                            <RatingStars rating={5} starClassName="size-4" />
                                            <span className="text-sm font-semibold text-primary">4.9</span>
                                        </div>
                                        <p className="text-xs text-tertiary">from 2,000+ reviews</p>
                                    </div>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="flex flex-wrap items-center justify-center gap-4">
                                {trustBadges.map((badge) => (
                                    <div
                                        key={badge.label}
                                        className={cx(
                                            "flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 transition-all duration-200 hover:scale-105 cursor-pointer ring-1 ring-[#404040] hover:ring-brand-400",
                                            badge.label === "Best Deals" && "hidden sm:flex"
                                        )}
                                    >
                                        <badge.icon className="size-4 text-brand-secondary" />
                                        <span className="text-xs font-medium text-secondary">{badge.label}</span>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
