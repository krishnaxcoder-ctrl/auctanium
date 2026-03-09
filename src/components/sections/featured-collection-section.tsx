"use client";

import Link from "next/link";
import { useRef, useState, useCallback } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw01 } from "@untitledui/icons";
import { MarketplaceProductCard } from "@/components/marketplace/MarketplaceProductCard";
import { useProducts } from "@/hooks/use-products";

export function FeaturedCollectionSection() {
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
            <section className="relative bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-8 lg:py-6">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center h-48">
                        <RefreshCw01 className="size-6 animate-spin text-white" />
                    </div>
                </div>
            </section>
        );
    }

    if (products.length === 0) return null;

    return (
        <section className="relative overflow-x-clip bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-8 lg:py-6">
            {/* Background Pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />
            <div className="absolute -top-40 -right-40 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-visible">
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">Featured Collection</h2>
                    <Link href="/marketplace" className="flex items-center gap-1 text-sm font-medium text-white hover:text-brand-200">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Mobile Slider */}
                <div className="mt-3 sm:hidden relative overflow-visible">
                    <div ref={sliderRef} onScroll={checkScrollPosition} className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory">
                        {products.map((product, index) => (
                            <div key={product.id} className={`flex-shrink-0 ${index % 2 === 0 ? "snap-start snap-always" : ""}`} style={{ width: "calc((100% - 8px) / 2)" }}>
                                <MarketplaceProductCard product={product} transparentBorder />
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
                        <MarketplaceProductCard key={product.id} product={product} transparentBorder />
                    ))}
                </div>
            </div>
        </section>
    );
}
