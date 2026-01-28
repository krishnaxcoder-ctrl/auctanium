"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "@untitledui/icons";

// Best practice: rendering-hoist-jsx - static data defined outside component with const assertion
const categories = [
    {
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
        itemCount: 4250,
    },
    {
        name: "Fashion",
        slug: "fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
        itemCount: 3820,
    },
    {
        name: "Collectibles",
        slug: "collectibles",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        itemCount: 2980,
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        itemCount: 2540,
    },
    {
        name: "Sports",
        slug: "sports-outdoors",
        image: "https://images.unsplash.com/photo-1461896836934-108b94baa2d2?w=400&h=400&fit=crop",
        itemCount: 1920,
    },
    {
        name: "Jewelry",
        slug: "jewelry-watches",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        itemCount: 3150,
    },
    {
        name: "Art & Antiques",
        slug: "art-antiques",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
        itemCount: 2780,
    },
    {
        name: "Toys & Games",
        slug: "toys-games",
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop",
        itemCount: 1850,
    },
    {
        name: "Books & Media",
        slug: "books-media",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
        itemCount: 2340,
    },
    {
        name: "Automotive",
        slug: "automotive",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
        itemCount: 1680,
    },
];

// Export categories for use in other components
export { categories };

// Best practice: rerender-memo - memoize to prevent unnecessary re-renders
export const TopCategoriesSection = memo(function TopCategoriesSection() {
    return (
        <section className="bg-primary py-4 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary sm:text-xl">
                        Shop by Category
                    </h2>
                    <Link href="/categories" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Categories Grid */}
                <div className="mt-6 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="group relative overflow-hidden bg-primary border border-secondary hover:border-brand-300 transition-all duration-300 hover:shadow-xl hover:-translate-y-1"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Gradient Overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                                {/* Category Name */}
                                <div className="absolute bottom-0 left-0 right-0 p-4">
                                    <h3 className="text-base font-semibold text-white group-hover:text-brand-200 transition-colors">
                                        {category.name}
                                    </h3>
                                    <div className="flex items-center gap-1 mt-1 text-white/80 text-xs">
                                        <span>Shop Now</span>
                                        <ArrowRight className="size-3 transition-transform group-hover:translate-x-1" />
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
});
