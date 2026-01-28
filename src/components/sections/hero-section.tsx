"use client";

import { useEffect, useRef, useState, memo, useCallback } from "react";
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

// Best practice: rerender-use-ref-transient-values
// Use refs for animation values to avoid re-renders during animation
// Only update state at key points (start and end)
const useAnimatedCounter = (end: number, duration: number = 2000) => {
    const [displayCount, setDisplayCount] = useState(end); // Start at end for SSR
    const countRef = useRef<HTMLSpanElement>(null);
    const hasAnimatedRef = useRef(false);

    useEffect(() => {
        // Only animate once
        if (hasAnimatedRef.current) return;
        hasAnimatedRef.current = true;

        const element = countRef.current;
        if (!element) {
            setDisplayCount(end);
            return;
        }

        let startTime: number;
        let animationFrame: number;

        const animate = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const currentCount = Math.floor(progress * end);

            // Best practice: rerender-use-ref-transient-values
            // Update DOM directly instead of triggering re-renders
            element.textContent = currentCount.toLocaleString();

            if (progress < 1) {
                animationFrame = requestAnimationFrame(animate);
            } else {
                // Final state update for consistency
                setDisplayCount(end);
            }
        };

        // Small delay to prioritize LCP
        const timeoutId = setTimeout(() => {
            // Reset to 0 and start animation
            element.textContent = "0";
            animationFrame = requestAnimationFrame(animate);
        }, 100);

        return () => {
            clearTimeout(timeoutId);
            if (animationFrame) cancelAnimationFrame(animationFrame);
        };
    }, [end, duration]);

    return { countRef, displayCount };
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
    const { countRef, displayCount } = useAnimatedCounter(50000, 2500);

    return (
        <section
            className="relative overflow-hidden bg-primary pt-8 pb-16 lg:pt-16 lg:pb-24"
            style={{ contain: "layout style" }}
        >
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
                                    <span ref={countRef}>{displayCount.toLocaleString()}</span>+ live auctions right now
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
