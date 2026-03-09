"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw01 } from "@untitledui/icons";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { useProducts } from "@/hooks/use-products";

// Live activity indicator
const LiveIndicator = () => {
    const [viewerCount, setViewerCount] = useState(1247);

    useEffect(() => {
        const interval = setInterval(() => {
            setViewerCount((prev) => prev + Math.floor(Math.random() * 10) - 5);
        }, 3000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className="flex items-center gap-2 rounded-full bg-error-50 px-3 py-1.5">
            <span className="relative flex size-2">
                <span className="absolute inline-flex size-full animate-ping rounded-full bg-error-500 opacity-75" />
                <span className="relative inline-flex size-2 rounded-full bg-error-500" />
            </span>
            <span className="text-sm font-medium text-error-600">
                {viewerCount.toLocaleString()} people browsing
            </span>
        </div>
    );
};

export function LookingNowSection() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const { products, isLoading } = useProducts({ limit: 10 });

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
                <div className="flex items-start justify-between">
                    <div>
                        <LiveIndicator />
                        <h2 className="mt-2 text-lg font-semibold text-primary sm:text-xl">What People Are Looking At</h2>
                    </div>
                    <Link href="/marketplace" className="shrink-0 flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Mobile Slider */}
                <div className="mt-6 sm:hidden relative overflow-visible">
                    <div ref={sliderRef} onScroll={checkScrollPosition} className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                        {products.map((product, index) => (
                            <div key={product.id} className={`flex-shrink-0 ${index % 2 === 0 ? "snap-start snap-always" : ""}`} style={{ width: "calc((100% - 8px) / 2)" }}>
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
