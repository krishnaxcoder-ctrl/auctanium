"use client";

import { useEffect, useState, useRef, useCallback, memo } from "react";
import Link from "next/link";
import { ArrowRight, Clock, ChevronLeft, ChevronRight, RefreshCw01 } from "@untitledui/icons";
import { MarketplaceProductCard, MarketplaceProduct } from "@/components/marketplace/MarketplaceProductCard";
import { useProducts } from "@/hooks/use-products";

// Memoized countdown timer
const CountdownTimer = memo(function CountdownTimer() {
    const [timeLeft, setTimeLeft] = useState({
        hours: 23,
        minutes: 59,
        seconds: 59,
    });

    useEffect(() => {
        const timer = setInterval(() => {
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

export function DealsOfTheDaySection() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const { products, isLoading } = useProducts({ limit: 10, sort: "bids" });

    const checkScrollPosition = useCallback(() => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    const scrollLeftFn = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: -sliderRef.current.clientWidth, behavior: "smooth" });
        }
    }, []);

    const scrollRightFn = useCallback(() => {
        if (sliderRef.current) {
            sliderRef.current.scrollBy({ left: sliderRef.current.clientWidth, behavior: "smooth" });
        }
    }, []);

    if (isLoading) {
        return (
            <section className="bg-primary py-4 lg:py-6 border-y border-secondary">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-48">
                        <RefreshCw01 className="size-6 animate-spin text-brand-600" />
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="bg-primary py-4 lg:py-6 border-y border-secondary overflow-x-clip">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-visible">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-primary sm:text-xl">Deals of the Day</h2>
                        <div className="mt-2">
                            <CountdownTimer />
                        </div>
                    </div>
                    <Link href="/marketplace" className="shrink-0 flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
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
                        {products.map((product, index) => (
                            <div
                                key={product.id}
                                className={`flex-shrink-0 ${index % 2 === 0 ? "snap-start snap-always" : ""}`}
                                style={{ width: "calc((100% - 8px) / 2)" }}
                            >
                                <MarketplaceProductCard product={product} />
                            </div>
                        ))}
                    </div>
                    {canScrollLeft && (
                        <button onClick={scrollLeftFn} className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -left-4">
                            <ChevronLeft className="size-5 text-gray-700" />
                        </button>
                    )}
                    {canScrollRight && (
                        <button onClick={scrollRightFn} className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -right-4">
                            <ChevronRight className="size-5 text-gray-700" />
                        </button>
                    )}
                </div>

                {/* Desktop Grid */}
                <div className="mt-6 hidden sm:grid grid-cols-3 gap-4 lg:grid-cols-5">
                    {products.map((product) => (
                        <MarketplaceProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
}
