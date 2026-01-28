"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, Zap, ChevronLeft, ChevronRight } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { MarketplaceProductCard, MarketplaceProduct } from "@/components/marketplace/MarketplaceProductCard";

// Best practice: rendering-hoist-jsx - static data defined outside component
const dealsOfTheDay: readonly MarketplaceProduct[] = [
    {
        id: "dotd-1",
        title: "Authenticated Banksy Print - Girl with Balloon",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
        currentBid: 15000,
        startingPrice: 12000,
        timeLeft: "5d 8h",
        bids: 18,
        seller: { name: "CertifiedArt", rating: 5.0, verified: true },
        category: "Art",
        condition: "like-new",
        watchers: 656,
        isFeatured: true,
        type: "auction",
    },
    {
        id: "dotd-2",
        title: "PSA 10 Gem Mint 1st Edition Charizard",
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop",
        currentBid: 28000,
        startingPrice: 22000,
        timeLeft: "7d 12h",
        bids: 25,
        seller: { name: "GradedCards", rating: 4.9, verified: true },
        category: "Trading Cards",
        condition: "new",
        watchers: 989,
        isHot: true,
        type: "auction",
    },
    {
        id: "dotd-3",
        title: "CGC 9.8 Amazing Spider-Man #300 - Signed",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=500&fit=crop",
        currentBid: 4200,
        startingPrice: 3500,
        timeLeft: "3d 4h",
        bids: 34,
        seller: { name: "ComicVault", rating: 4.8, verified: true },
        category: "Comics",
        condition: "like-new",
        watchers: 445,
        type: "auction",
    },
    {
        id: "dotd-4",
        title: "GIA Certified 2ct Diamond Engagement Ring",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
        currentBid: 18500,
        buyNowPrice: 22000,
        startingPrice: 15000,
        timeLeft: "4d 16h",
        bids: 11,
        seller: { name: "CertifiedGems", rating: 5.0, verified: true },
        category: "Jewelry",
        condition: "new",
        watchers: 378,
        freeShipping: true,
        type: "both",
    },
    {
        id: "dotd-5",
        title: "Authenticated Signed Michael Jackson Thriller LP",
        image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=500&fit=crop",
        currentBid: 5500,
        startingPrice: 4000,
        timeLeft: "2d 8h",
        bids: 29,
        seller: { name: "MusicMemorabilia", rating: 4.7, verified: true },
        category: "Music",
        condition: "good",
        watchers: 256,
        isHot: true,
        type: "auction",
    },
];

// Best practice: rerender-memo - memoize countdown timer to isolate re-renders
const CountdownTimer = memo(function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59,
    });

    useEffect(() => {
        const timer = setInterval(() => {
            // Best practice: rerender-functional-setstate - use functional update
            setTimeLeft((prev) => {
                if (prev.seconds > 0) {
                    return { ...prev, seconds: prev.seconds - 1 };
                } else if (prev.minutes > 0) {
                    return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                } else if (prev.hours > 0) {
                    return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
                }
                return { hours: 23, minutes: 59, seconds: 59 };
            });
        }, 1000);

        return () => clearInterval(timer);
    }, []);

    return (
        <div className="flex items-center gap-2">
            <div className="flex items-center gap-1 rounded-lg bg-error-50 px-3 py-2">
                <Clock className="size-4 text-error-600" />
                <span className="font-mono text-sm font-bold text-error-600">
                    {String(timeLeft.hours).padStart(2, "0")}:
                    {String(timeLeft.minutes).padStart(2, "0")}:
                    {String(timeLeft.seconds).padStart(2, "0")}
                </span>
            </div>
            <span className="text-sm text-tertiary">until deals expire</span>
        </div>
    );
});

// Best practice: rerender-memo - memoize to prevent unnecessary re-renders
export const DealsOfTheDaySection = memo(function DealsOfTheDaySection() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    // Best practice: useCallback for stable references
    const checkScrollPosition = useCallback(() => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    const scrollLeft = useCallback(() => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    }, []);

    const scrollRight = useCallback(() => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
        }
    }, []);

    return (
        <section className="bg-primary py-4 lg:py-6 border-y border-secondary overflow-x-clip">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-visible">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-primary sm:text-xl">
                            Deals of the Day
                        </h2>
                        <div className="mt-2">
                            <CountdownTimer />
                        </div>
                    </div>
                    <Link href="/deals-of-the-day" className="shrink-0 flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Mobile Slider */}
                <div className="mt-3 sm:hidden relative overflow-visible">
                    <div
                        ref={sliderRef}
                        onScroll={checkScrollPosition}
                        className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
                    >
                        {dealsOfTheDay.map((product, index) => (
                            <div
                                key={product.id}
                                className={`flex-shrink-0 ${index % 2 === 0 ? "snap-start snap-always" : ""}`}
                                style={{ width: "calc((100% - 8px) / 2)" }}
                            >
                                <MarketplaceProductCard product={product} />
                            </div>
                        ))}
                    </div>

                    {/* Left Arrow */}
                    {canScrollLeft && (
                        <button
                            onClick={scrollLeft}
                            className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -left-4"
                        >
                            <ChevronLeft className="size-5 text-gray-700" />
                        </button>
                    )}

                    {/* Right Arrow */}
                    {canScrollRight && (
                        <button
                            onClick={scrollRight}
                            className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -right-4"
                        >
                            <ChevronRight className="size-5 text-gray-700" />
                        </button>
                    )}
                </div>

                {/* Desktop Grid */}
                <div className="mt-6 hidden sm:grid grid-cols-3 gap-4 lg:grid-cols-5">
                    {dealsOfTheDay.map((product) => (
                        <MarketplaceProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
});
