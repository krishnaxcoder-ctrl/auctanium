"use client";

import { memo, useRef, useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const categories = [
    { name: "Electronics", slug: "electronics", image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop" },
    { name: "Fashion", slug: "fashion", image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop" },
    { name: "Collectibles", slug: "collectibles", image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=300&fit=crop" },
    { name: "Home & Garden", slug: "home-garden", image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=300&fit=crop" },
    { name: "Sports", slug: "sports-outdoors", image: "https://images.unsplash.com/photo-1461896836934-108b94baa2d2?w=400&h=300&fit=crop" },
    { name: "Jewelry", slug: "jewelry-watches", image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop" },
    { name: "Art & Antiques", slug: "art-antiques", image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop" },
    { name: "Toys & Games", slug: "toys-games", image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=300&fit=crop" },
    { name: "Books & Media", slug: "books-media", image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=300&fit=crop" },
    { name: "Automotive", slug: "automotive", image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=300&fit=crop" },
    { name: "Music", slug: "music", image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=400&h=300&fit=crop" },
    { name: "Cameras", slug: "cameras", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=300&fit=crop" },
];

export { categories };

const ChevronLeft = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m15 18-6-6 6-6" />
    </svg>
);

const ChevronRight = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m9 18 6-6-6-6" />
    </svg>
);

export const TopCategoriesSection = memo(function TopCategoriesSection() {
    const scrollRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        const el = scrollRef.current;
        if (el) {
            setCanScrollLeft(el.scrollLeft > 0);
            setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener("resize", checkScroll);
        return () => window.removeEventListener("resize", checkScroll);
    }, []);

    const scroll = (dir: "left" | "right") => {
        const el = scrollRef.current;
        if (el) {
            el.scrollBy({ left: dir === "left" ? -400 : 400, behavior: "smooth" });
        }
    };

    return (
        <section className="bg-primary py-8 lg:py-12">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between mb-6">
                    <h2 className="text-xl lg:text-2xl font-semibold text-primary">
                        Browse by category
                    </h2>
                    <div className="flex gap-2">
                        <button
                            onClick={() => scroll("left")}
                            disabled={!canScrollLeft}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                                canScrollLeft ? "border-secondary hover:border-primary text-primary" : "border-secondary text-quaternary opacity-40"
                            }`}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </button>
                        <button
                            onClick={() => scroll("right")}
                            disabled={!canScrollRight}
                            className={`w-9 h-9 rounded-full border flex items-center justify-center transition-colors ${
                                canScrollRight ? "border-secondary hover:border-primary text-primary" : "border-secondary text-quaternary opacity-40"
                            }`}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>
                </div>

                {/* Categories */}
                <div
                    ref={scrollRef}
                    onScroll={checkScroll}
                    className="grid grid-cols-6 gap-4"
                >
                    {categories.slice(0, 6).map((cat) => (
                        <Link key={cat.slug} href={`/category/${cat.slug}`} className="group">
                            <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                                <Image src={cat.image} alt={cat.name} fill className="object-cover group-hover:scale-105 transition-transform duration-300" />
                            </div>
                            <p className="mt-2 text-sm font-medium text-primary text-center group-hover:text-brand-600 transition-colors">
                                {cat.name}
                            </p>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
});
