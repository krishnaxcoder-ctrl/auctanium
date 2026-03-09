"use client";

import { memo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

// Best practice: rendering-hoist-jsx - static data defined outside component with const assertion
const categories = [
    {
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
    },
    {
        name: "Fashion",
        slug: "fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
    },
    {
        name: "Collectibles",
        slug: "collectibles",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop",
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop",
    },
    {
        name: "Sports",
        slug: "sports-outdoors",
        image: "https://images.unsplash.com/photo-1461896836934-108b94baa2d2?w=400&h=300&fit=crop",
    },
    {
        name: "Jewelry",
        slug: "jewelry-watches",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
    },
    {
        name: "Art & Antiques",
        slug: "art-antiques",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop",
    },
    {
        name: "Toys & Games",
        slug: "toys-games",
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop",
    },
    {
        name: "Books & Media",
        slug: "books-media",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop",
    },
    {
        name: "Automotive",
        slug: "automotive",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop",
    },
    {
        name: "Music",
        slug: "music",
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop",
    },
    {
        name: "Cameras",
        slug: "cameras",
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop",
    },
];

// Export categories for use in other components
export { categories };

// Chevron icons
const ChevronLeft = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

// Best practice: rerender-memo - memoize to prevent unnecessary re-renders
export const TopCategoriesSection = memo(function TopCategoriesSection() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScrollability = () => {
        const container = scrollContainerRef.current;
        if (container) {
            setCanScrollLeft(container.scrollLeft > 0);
            setCanScrollRight(container.scrollLeft < container.scrollWidth - container.clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScrollability();
        window.addEventListener("resize", checkScrollability);
        return () => window.removeEventListener("resize", checkScrollability);
    }, []);

    const scroll = (direction: "left" | "right") => {
        const container = scrollContainerRef.current;
        if (container) {
            const scrollAmount = container.clientWidth * 0.8;
            container.scrollBy({
                left: direction === "left" ? -scrollAmount : scrollAmount,
                behavior: "smooth",
            });
        }
    };

    return (
        <section className="bg-primary py-8 lg:py-12">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl lg:text-2xl font-bold text-primary">
                        Browse by category
                    </h2>
                    {/* Navigation Arrows */}
                    <div className="flex items-center gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            aria-label="Scroll left"
                            className={`w-10 h-10 rounded-full border border-secondary flex items-center justify-center transition-all duration-200 ${
                                canScrollLeft
                                    ? "bg-primary hover:bg-secondary hover:border-brand-500 text-primary cursor-pointer"
                                    : "bg-secondary text-quaternary cursor-not-allowed opacity-50"
                            }`}
                        >
                            <ChevronLeft className="w-5 h-5" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            aria-label="Scroll right"
                            className={`w-10 h-10 rounded-full border border-secondary flex items-center justify-center transition-all duration-200 ${
                                canScrollRight
                                    ? "bg-primary hover:bg-secondary hover:border-brand-500 text-primary cursor-pointer"
                                    : "bg-secondary text-quaternary cursor-not-allowed opacity-50"
                            }`}
                        >
                            <ChevronRight className="w-5 h-5" />
                        </button>
                    </div>
                </div>

                {/* Scrollable Categories */}
                <div className="relative">
                    {/* Left Fade */}
                    {canScrollLeft && (
                        <div className="absolute left-0 top-0 bottom-0 w-16 bg-gradient-to-r from-primary to-transparent z-10 pointer-events-none" />
                    )}
                    {/* Right Fade */}
                    {canScrollRight && (
                        <div className="absolute right-0 top-0 bottom-0 w-16 bg-gradient-to-l from-primary to-transparent z-10 pointer-events-none" />
                    )}

                    <div
                        ref={scrollContainerRef}
                        onScroll={checkScrollability}
                        className="flex gap-4 overflow-x-auto scrollbar-hide scroll-smooth pb-2"
                        style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
                    >
                        {categories.map((category) => (
                            <Link
                                key={category.slug}
                                href={`/category/${category.slug}`}
                                className="group flex-shrink-0 w-[140px] sm:w-[160px] lg:w-[180px]"
                            >
                                {/* Image Card */}
                                <div className="relative aspect-[4/3] rounded-xl lg:rounded-2xl overflow-hidden bg-secondary">
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-cover transition-transform duration-500 group-hover:scale-110"
                                    />
                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-brand-600/0 group-hover:bg-brand-600/20 transition-colors duration-300" />
                                </div>
                                {/* Category Name */}
                                <h3 className="mt-3 text-sm lg:text-base font-semibold text-primary text-center group-hover:text-brand-600 transition-colors">
                                    {category.name}
                                </h3>
                            </Link>
                        ))}
                    </div>
                </div>
            </div>
        </section>
    );
});
