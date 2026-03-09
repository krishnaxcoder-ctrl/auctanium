"use client";

import { memo } from "react";
import Link from "next/link";
import Image from "next/image";

// Best practice: rendering-hoist-jsx - static data defined outside component with const assertion
const categories = [
    {
        name: "Electronics",
        slug: "electronics",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=400&fit=crop",
        itemCount: 4250,
        gradient: "from-blue-500/80 to-indigo-600/80",
    },
    {
        name: "Fashion",
        slug: "fashion",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=400&fit=crop",
        itemCount: 3820,
        gradient: "from-pink-500/80 to-rose-600/80",
    },
    {
        name: "Collectibles",
        slug: "collectibles",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
        itemCount: 2980,
        gradient: "from-amber-500/80 to-orange-600/80",
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=400&fit=crop",
        itemCount: 2540,
        gradient: "from-emerald-500/80 to-green-600/80",
    },
    {
        name: "Sports",
        slug: "sports-outdoors",
        image: "https://images.unsplash.com/photo-1461896836934-108b94baa2d2?w=400&h=400&fit=crop",
        itemCount: 1920,
        gradient: "from-red-500/80 to-rose-600/80",
    },
    {
        name: "Jewelry",
        slug: "jewelry-watches",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=400&fit=crop",
        itemCount: 3150,
        gradient: "from-purple-500/80 to-violet-600/80",
    },
    {
        name: "Art & Antiques",
        slug: "art-antiques",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop",
        itemCount: 2780,
        gradient: "from-fuchsia-500/80 to-pink-600/80",
    },
    {
        name: "Toys & Games",
        slug: "toys-games",
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=400&h=400&fit=crop",
        itemCount: 1850,
        gradient: "from-yellow-500/80 to-amber-600/80",
    },
    {
        name: "Books & Media",
        slug: "books-media",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=400&h=400&fit=crop",
        itemCount: 2340,
        gradient: "from-teal-500/80 to-cyan-600/80",
    },
    {
        name: "Automotive",
        slug: "automotive",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=400&h=400&fit=crop",
        itemCount: 1680,
        gradient: "from-slate-500/80 to-gray-600/80",
    },
];

// Export categories for use in other components
export { categories };

// Best practice: rerender-memo - memoize to prevent unnecessary re-renders
export const TopCategoriesSection = memo(function TopCategoriesSection() {
    return (
        <section className="bg-primary py-8 lg:py-12">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Horizontal scroll on mobile, grid on larger screens */}
                <div className="flex gap-4 overflow-x-auto pb-4 scrollbar-hide sm:grid sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 sm:gap-5 sm:overflow-visible sm:pb-0">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="group flex-shrink-0 w-36 sm:w-auto"
                        >
                            {/* Circular Image Container */}
                            <div className="relative mx-auto w-28 h-28 sm:w-32 sm:h-32 lg:w-36 lg:h-36 rounded-full overflow-hidden ring-4 ring-transparent group-hover:ring-brand-500/30 transition-all duration-300 group-hover:scale-105">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {/* Colored Overlay on Hover */}
                                <div className={`absolute inset-0 bg-gradient-to-br ${category.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300`} />
                                {/* Item Count Badge */}
                                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                                    <span className="text-white font-bold text-lg drop-shadow-lg">
                                        {(category.itemCount / 1000).toFixed(1)}k+
                                    </span>
                                </div>
                            </div>
                            {/* Category Name */}
                            <div className="mt-3 text-center">
                                <h3 className="text-sm font-semibold text-primary group-hover:text-brand-600 transition-colors line-clamp-1">
                                    {category.name}
                                </h3>
                                <p className="text-xs text-tertiary mt-0.5">
                                    {category.itemCount.toLocaleString()} items
                                </p>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
});
