"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Clock,
    ChevronLeft,
    ChevronRight,
    Heart,
    Eye,
    Users01,
    ArrowRight,
    Zap,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

interface FeaturedAuction {
    id: string;
    title: string;
    image: string;
    currentBid: number;
    nextMinBid: number;
    endTime: Date;
    totalBids: number;
    watchers: number;
    isHot?: boolean;
    seller: {
        name: string;
        avatar: string;
    };
}

interface CountdownTimerProps {
    endTime: Date;
    size?: "sm" | "lg";
}

function CountdownTimer({ endTime, size = "lg" }: CountdownTimerProps) {
    const [timeLeft, setTimeLeft] = useState({
        days: 0,
        hours: 0,
        minutes: 0,
        seconds: 0,
    });

    useEffect(() => {
        const calculateTimeLeft = () => {
            const now = new Date().getTime();
            const end = new Date(endTime).getTime();
            const difference = end - now;

            if (difference > 0) {
                setTimeLeft({
                    days: Math.floor(difference / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((difference % (1000 * 60)) / 1000),
                });
            }
        };

        calculateTimeLeft();
        const timer = setInterval(calculateTimeLeft, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    if (size === "sm") {
        return (
            <div className="flex items-center gap-1 text-sm font-mono">
                <span className="text-primary font-semibold">
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                </span>
            </div>
        );
    }

    return (
        <div className="flex items-center gap-2">
            {timeLeft.days > 0 && (
                <div className="flex flex-col items-center bg-[#000080]/10 rounded-lg px-3 py-2">
                    <span className="text-2xl font-bold text-[#000080]">
                        {String(timeLeft.days).padStart(2, "0")}
                    </span>
                    <span className="text-xs text-[#898989] uppercase">Days</span>
                </div>
            )}
            <div className="flex flex-col items-center bg-[#000080]/10 rounded-lg px-3 py-2">
                <span className="text-2xl font-bold text-[#000080]">
                    {String(timeLeft.hours).padStart(2, "0")}
                </span>
                <span className="text-xs text-[#898989] uppercase">Hours</span>
            </div>
            <span className="text-xl font-bold text-[#000080]">:</span>
            <div className="flex flex-col items-center bg-[#000080]/10 rounded-lg px-3 py-2">
                <span className="text-2xl font-bold text-[#000080]">
                    {String(timeLeft.minutes).padStart(2, "0")}
                </span>
                <span className="text-xs text-[#898989] uppercase">Min</span>
            </div>
            <span className="text-xl font-bold text-[#000080]">:</span>
            <div className="flex flex-col items-center bg-[#000080]/10 rounded-lg px-3 py-2">
                <span className="text-2xl font-bold text-[#000080]">
                    {String(timeLeft.seconds).padStart(2, "0")}
                </span>
                <span className="text-xs text-[#898989] uppercase">Sec</span>
            </div>
        </div>
    );
}

// Sample featured auctions data
const sampleFeaturedAuctions: FeaturedAuction[] = [
    {
        id: "1",
        title: "Vintage Rolex Submariner 1968 - Rare Collector's Edition",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800",
        currentBid: 12500,
        nextMinBid: 12750,
        endTime: new Date(Date.now() + 3600000 * 5), // 5 hours
        totalBids: 47,
        watchers: 234,
        isHot: true,
        seller: {
            name: "LuxuryWatches",
            avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100",
        },
    },
    {
        id: "2",
        title: "Apple MacBook Pro M3 Max 16\" - Brand New Sealed",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800",
        currentBid: 3200,
        nextMinBid: 3300,
        endTime: new Date(Date.now() + 3600000 * 12), // 12 hours
        totalBids: 28,
        watchers: 156,
        seller: {
            name: "TechDeals",
            avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100",
        },
    },
    {
        id: "3",
        title: "Air Jordan 1 Retro High OG Chicago - DS Size 10",
        image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800",
        currentBid: 890,
        nextMinBid: 920,
        endTime: new Date(Date.now() + 3600000 * 2), // 2 hours
        totalBids: 35,
        watchers: 89,
        isHot: true,
        seller: {
            name: "SneakerVault",
            avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100",
        },
    },
    {
        id: "4",
        title: "Pokemon Base Set Charizard 1st Edition PSA 9",
        image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=800",
        currentBid: 45000,
        nextMinBid: 46000,
        endTime: new Date(Date.now() + 3600000 * 24), // 24 hours
        totalBids: 89,
        watchers: 567,
        isHot: true,
        seller: {
            name: "CardCollectors",
            avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100",
        },
    },
];

export function FeaturedAuctions() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollButtons = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    const scroll = (direction: "left" | "right") => {
        if (scrollRef.current) {
            const scrollAmount = 400;
            scrollRef.current.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    useEffect(() => {
        const ref = scrollRef.current;
        if (ref) {
            ref.addEventListener("scroll", checkScrollButtons);
            checkScrollButtons();
        }
        return () => ref?.removeEventListener("scroll", checkScrollButtons);
    }, []);

    return (
        <section className="py-8 lg:py-12 bg-primary">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8">
                {/* Section Header */}
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <div className="flex items-center gap-2 mb-1">
                            <Zap className="size-5 text-[#000080]" />
                            <h2 className="text-xl lg:text-2xl font-bold text-primary">
                                Featured Auctions
                            </h2>
                        </div>
                        <p className="text-[#898989]">Hot items ending soon - Don't miss out!</p>
                    </div>
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={cx(
                                "p-2 rounded-lg border border-secondary transition-colors",
                                canScrollLeft
                                    ? "hover:bg-secondary text-primary"
                                    : "text-tertiary cursor-not-allowed"
                            )}
                        >
                            <ChevronLeft className="size-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={cx(
                                "p-2 rounded-lg border border-secondary transition-colors",
                                canScrollRight
                                    ? "hover:bg-secondary text-primary"
                                    : "text-tertiary cursor-not-allowed"
                            )}
                        >
                            <ChevronRight className="size-5" />
                        </button>
                    </div>
                </div>

                {/* Carousel */}
                <div
                    ref={scrollRef}
                    className="flex gap-6 overflow-x-auto scrollbar-hide pb-4 -mx-4 px-4 lg:mx-0 lg:px-0"
                >
                    {sampleFeaturedAuctions.map((auction) => (
                        <Link
                            key={auction.id}
                            href={`/listing/${auction.id}`}
                            className="group flex-shrink-0 w-[320px] lg:w-[360px] bg-primary border border-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] bg-secondary overflow-hidden">
                                <Image
                                    src={auction.image}
                                    alt={auction.title}
                                    fill
                                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                                />
                                {auction.isHot && (
                                    <div className="absolute top-3 left-3">
                                        <BadgeWithIcon color="error" iconLeading={Zap} size="md">
                                            Hot Auction
                                        </BadgeWithIcon>
                                    </div>
                                )}
                                <div className="absolute bottom-3 left-3 right-3 bg-black/80 backdrop-blur-sm rounded-xl p-3">
                                    <div className="flex items-center gap-1.5 text-white/80 text-xs mb-1">
                                        <Clock className="size-3.5" />
                                        Ends in
                                    </div>
                                    <CountdownTimer endTime={auction.endTime} size="sm" />
                                </div>
                            </div>

                            {/* Content */}
                            <div className="p-4">
                                <h3 className="text-base font-semibold text-primary line-clamp-2 group-hover:text-[#000080] transition-colors min-h-[3rem]">
                                    {auction.title}
                                </h3>

                                {/* Seller */}
                                <div className="flex items-center gap-2 mt-3">
                                    <Image
                                        src={auction.seller.avatar}
                                        alt={auction.seller.name}
                                        width={24}
                                        height={24}
                                        className="rounded-full"
                                    />
                                    <span className="text-sm text-tertiary">{auction.seller.name}</span>
                                </div>

                                {/* Bid info */}
                                <div className="mt-4 pt-4 border-t border-secondary">
                                    <div className="flex items-baseline justify-between">
                                        <div>
                                            <p className="text-xs text-tertiary">Current Bid</p>
                                            <p className="text-xl font-bold text-[#000080]">
                                                ${auction.currentBid.toLocaleString()}
                                            </p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-xs text-tertiary">Next Min Bid</p>
                                            <p className="text-sm font-semibold text-primary">
                                                ${auction.nextMinBid.toLocaleString()}
                                            </p>
                                        </div>
                                    </div>

                                    {/* Stats */}
                                    <div className="flex items-center gap-4 mt-3 text-[#898989]">
                                        <div className="flex items-center gap-1 text-xs">
                                            <Users01 className="size-3.5" />
                                            {auction.totalBids} bids
                                        </div>
                                        <div className="flex items-center gap-1 text-xs">
                                            <Eye className="size-3.5" />
                                            {auction.watchers} watching
                                        </div>
                                    </div>

                                    {/* CTA */}
                                    <Button
                                        size="md"
                                        color="primary"
                                        className="w-full mt-4 !bg-[#000080] hover:!bg-[#000060]"
                                    >
                                        Place Bid
                                    </Button>
                                </div>
                            </div>
                        </Link>
                    ))}

                    {/* View All Card */}
                    <Link
                        href="/marketplace?featured=true"
                        className="flex-shrink-0 w-[320px] lg:w-[360px] bg-gradient-to-br from-[#000080]/10 to-[#000080]/5 border border-secondary rounded-2xl overflow-hidden hover:shadow-xl transition-all duration-300 flex flex-col items-center justify-center"
                    >
                        <div className="text-center p-8">
                            <div className="w-16 h-16 rounded-full bg-[#000080]/10 flex items-center justify-center mx-auto mb-4">
                                <ArrowRight className="size-8 text-[#000080]" />
                            </div>
                            <h3 className="text-lg font-semibold text-primary mb-2">
                                View All Featured
                            </h3>
                            <p className="text-sm text-[#898989]">
                                Discover more hot auctions
                            </p>
                        </div>
                    </Link>
                </div>
            </div>
        </section>
    );
}

export { CountdownTimer };
