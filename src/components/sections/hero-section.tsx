"use client";

import { useEffect, useState, memo } from "react";
import {
    ArrowRight,
    Play,
    Shield01,
    Clock,
    TrendUp01,
} from "@untitledui/icons";
import Link from "next/link";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";
import { RatingStars } from "@/components/foundations/rating-stars";
import { cx } from "@/utils/cx";

// Animated counter hook - starts after hydration
const useAnimatedCounter = (end: number, duration: number = 2000) => {
    const [count, setCount] = useState(end); // Start at end value to avoid layout shift

    useEffect(() => {
        // Reset to 0 and animate after mount
        setCount(0);
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

        // Small delay to prioritize LCP
        const timeoutId = setTimeout(() => {
            animationFrame = requestAnimationFrame(animate);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [end, duration]);

    return count;
};

// Trust badges - memoized to prevent re-renders
const trustBadges = [
    { icon: Shield01, label: "Verified Sellers" },
    { icon: Clock, label: "Real-time Bidding" },
    { icon: TrendUp01, label: "Best Deals" },
] as const;

// Memoized trust badge component
const TrustBadge = memo(function TrustBadge({
    icon: Icon,
    label,
    hidden,
}: {
    icon: typeof Shield01;
    label: string;
    hidden?: boolean;
}) {
    return (
        <div
            className={cx(
                "flex items-center gap-2 rounded-full bg-secondary px-3 py-1.5 transition-all duration-200 hover:scale-105 cursor-pointer ring-1 ring-[#404040] hover:ring-brand-400",
                hidden && "hidden sm:flex"
            )}
        >
            <Icon className="size-4 text-brand-secondary" />
            <span className="text-xs font-medium text-secondary">{label}</span>
        </div>
    );
});

// Main hero section - optimized for LCP
export const HeroSection = memo(function HeroSection() {
    const userCount = useAnimatedCounter(50000, 2500);

    return (
        <section
            className="relative overflow-hidden bg-primary pt-8 pb-16 lg:pt-16 lg:pb-24"
            style={{ contain: "layout style" }}
        >
            {/* Simplified background - uses CSS instead of multiple divs */}
            <div
                className="pointer-events-none absolute inset-0"
                style={{
                    background: `
                        radial-gradient(ellipse 80% 50% at 90% 10%, rgba(127, 86, 217, 0.15) 0%, transparent 50%),
                        radial-gradient(ellipse 60% 40% at 10% 50%, rgba(16, 185, 129, 0.08) 0%, transparent 50%),
                        radial-gradient(ellipse 50% 30% at 60% 90%, rgba(245, 158, 11, 0.08) 0%, transparent 50%)
                    `,
                }}
            />

            {/* Dot pattern - simplified with CSS */}
            <div
                className="pointer-events-none absolute inset-0 opacity-[0.15]"
                style={{
                    backgroundImage: `radial-gradient(circle at center, #7F56D9 1px, transparent 1px)`,
                    backgroundSize: "24px 24px",
                    maskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
                    WebkitMaskImage: "radial-gradient(ellipse 70% 60% at 50% 50%, black 20%, transparent 70%)",
                }}
            />

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-col items-center">
                    {/* Content - no hydration-dependent animations */}
                    <div className="text-center animate-fade-in">
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

                        {/* Main Heading - prioritized for LCP */}
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
                            <Link href="/signup" className="w-full sm:w-64" prefetch>
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
                                    <TrustBadge
                                        key={badge.label}
                                        icon={badge.icon}
                                        label={badge.label}
                                        hidden={badge.label === "Best Deals"}
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
});
