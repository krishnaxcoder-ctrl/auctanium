"use client";

import Link from "next/link";
import { useRef, useState, useCallback, useEffect } from "react";
import { ArrowRight, ChevronLeft, ChevronRight, RefreshCw01 } from "@untitledui/icons";
import { MarketplaceProductCard, MarketplaceProduct } from "@/components/marketplace/MarketplaceProductCard";

// Helper to calculate time left
function calculateTimeLeft(endTime: string): string {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

// Transform API product to MarketplaceProduct
function transformProduct(product: any): MarketplaceProduct {
    const auction = product.auctions?.[0];

    return {
        id: product.slug || product.id,
        title: product.title,
        image: product.images?.[0] || "",
        images: product.images,
        currentBid: product.current_bid || undefined,
        buyNowPrice: product.buy_now_price || undefined,
        startingPrice: product.starting_price || undefined,
        timeLeft: auction?.end_time ? calculateTimeLeft(auction.end_time) : undefined,
        endTime: auction?.end_time ? new Date(auction.end_time) : undefined,
        bids: product.bids_count || 0,
        seller: {
            name: product.seller_name || "Seller",
            rating: 4.8,
            verified: product.seller_verified || false,
        },
        category: product.category,
        condition: product.condition || "new",
        watchers: product.watchers_count || 0,
        isHot: product.bids_count > 10,
        isFeatured: product.no_reserve,
        freeShipping: product.free_shipping || false,
        type: product.listing_type as "auction" | "buy-now" | "both",
    };
}

export function BestDealsSection() {
    const sliderRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);
    const [products, setProducts] = useState<MarketplaceProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    // Fetch products from API
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch("/api/products?limit=10");
                if (response.ok) {
                    const data = await response.json();
                    const transformed = data.products.map(transformProduct);
                    setProducts(transformed);
                }
            } catch (error) {
                console.error("Failed to fetch products:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, []);

    const checkScrollPosition = useCallback(() => {
        if (sliderRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, []);

    const scrollLeftFn = useCallback(() => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
        }
    }, []);

    const scrollRightFn = useCallback(() => {
        if (sliderRef.current) {
            const scrollAmount = sliderRef.current.clientWidth;
            sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
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

    if (products.length === 0) {
        return null;
    }

    return (
        <section className="bg-secondary py-4 lg:py-6 overflow-x-clip">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 overflow-visible">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary sm:text-xl">
                        Best Deals & Discounts
                    </h2>
                    <Link href="/marketplace" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
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

                    {/* Left Arrow */}
                    {canScrollLeft && (
                        <button
                            onClick={scrollLeftFn}
                            className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -left-4"
                        >
                            <ChevronLeft className="size-5 text-gray-700" />
                        </button>
                    )}

                    {/* Right Arrow */}
                    {canScrollRight && (
                        <button
                            onClick={scrollRightFn}
                            className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -right-4"
                        >
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
