"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw01 } from "@untitledui/icons";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { useProducts } from "@/hooks/use-products";

export function TrendingProductsSection() {
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
            <section className="bg-secondary py-4 lg:py-6">
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
        <section className="bg-secondary py-4 lg:py-6 overflow-x-clip">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-visible">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary sm:text-xl">Trending Products</h2>
                    <Link href="/marketplace" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Mobile Slider */}
                <div className="mt-3 sm:hidden relative overflow-visible">
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
