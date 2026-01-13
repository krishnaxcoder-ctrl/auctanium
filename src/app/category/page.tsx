"use client";

import Link from "next/link";
import Image from "next/image";
import {
    ArrowRight,
    Monitor01,
    ShoppingBag01,
    Palette,
    Home01,
    Trophy01,
    Diamond01,
    Star01,
    GamingPad02,
    BookOpen01,
    Truck01,
    Camera01,
    Globe01,
    Heart,
    Gift01,
    MusicNote01,
    Briefcase01,
    Tool01,
    Sun,
} from "@untitledui/icons";

const categories = [
    {
        name: "Electronics",
        slug: "electronics",
        icon: Monitor01,
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=600&h=400&fit=crop",
        count: "4,250+",
        color: "from-blue-600 to-indigo-700",
    },
    {
        name: "Fashion",
        slug: "fashion",
        icon: ShoppingBag01,
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=600&h=400&fit=crop",
        count: "3,820+",
        color: "from-pink-600 to-rose-700",
    },
    {
        name: "Collectibles",
        slug: "collectibles",
        icon: Palette,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        count: "2,980+",
        color: "from-amber-600 to-orange-700",
    },
    {
        name: "Home & Garden",
        slug: "home-garden",
        icon: Home01,
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=600&h=400&fit=crop",
        count: "2,540+",
        color: "from-green-600 to-emerald-700",
    },
    {
        name: "Sports",
        slug: "sports-outdoors",
        icon: Trophy01,
        image: "https://images.unsplash.com/photo-1461896836934-108b94baa2d2?w=600&h=400&fit=crop",
        count: "1,920+",
        color: "from-red-600 to-rose-700",
    },
    {
        name: "Jewelry",
        slug: "jewelry-watches",
        icon: Diamond01,
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
        count: "3,150+",
        color: "from-purple-600 to-violet-700",
    },
    {
        name: "Art & Antiques",
        slug: "art-antiques",
        icon: Star01,
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
        count: "2,780+",
        color: "from-slate-600 to-zinc-700",
    },
    {
        name: "Toys & Games",
        slug: "toys-games",
        icon: GamingPad02,
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=600&h=400&fit=crop",
        count: "1,850+",
        color: "from-cyan-600 to-teal-700",
    },
    {
        name: "Books & Media",
        slug: "books-media",
        icon: BookOpen01,
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=400&fit=crop",
        count: "2,340+",
        color: "from-yellow-600 to-amber-700",
    },
    {
        name: "Automotive",
        slug: "automotive",
        icon: Truck01,
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop",
        count: "1,680+",
        color: "from-gray-700 to-slate-800",
    },
    {
        name: "Cameras",
        slug: "cameras",
        icon: Camera01,
        image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600&h=400&fit=crop",
        count: "1,450+",
        color: "from-indigo-600 to-blue-700",
    },
    {
        name: "Travel & Luggage",
        slug: "travel",
        icon: Globe01,
        image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600&h=400&fit=crop",
        count: "980+",
        color: "from-sky-600 to-cyan-700",
    },
    {
        name: "Health & Beauty",
        slug: "health-beauty",
        icon: Heart,
        image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=600&h=400&fit=crop",
        count: "2,120+",
        color: "from-rose-500 to-pink-600",
    },
    {
        name: "Gifts & Occasions",
        slug: "gifts",
        icon: Gift01,
        image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=600&h=400&fit=crop",
        count: "1,340+",
        color: "from-fuchsia-600 to-purple-700",
    },
    {
        name: "Music & Instruments",
        slug: "music",
        icon: MusicNote01,
        image: "https://images.unsplash.com/photo-1511379938547-c1f69419868d?w=600&h=400&fit=crop",
        count: "1,780+",
        color: "from-violet-600 to-indigo-700",
    },
    {
        name: "Business & Office",
        slug: "business",
        icon: Briefcase01,
        image: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=600&h=400&fit=crop",
        count: "890+",
        color: "from-slate-700 to-gray-800",
    },
    {
        name: "Tools & Hardware",
        slug: "tools",
        icon: Tool01,
        image: "https://images.unsplash.com/photo-1581147036324-c17ac41f3e20?w=600&h=400&fit=crop",
        count: "1,560+",
        color: "from-orange-600 to-red-700",
    },
    {
        name: "Garden & Outdoor",
        slug: "garden",
        icon: Sun,
        image: "https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=600&h=400&fit=crop",
        count: "1,230+",
        color: "from-lime-600 to-green-700",
    },
    {
        name: "Watches",
        slug: "watches",
        icon: Diamond01,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
        count: "2,890+",
        color: "from-amber-700 to-yellow-800",
    },
    {
        name: "Vintage & Retro",
        slug: "vintage",
        icon: Star01,
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=400&fit=crop",
        count: "1,670+",
        color: "from-stone-600 to-neutral-700",
    },
];

export default function CategoriesPage() {
    return (
        <div className="min-h-screen bg-primary">
            {/* Categories Grid */}
            <div className="mx-auto max-w-8xl">
                {/* Grid - No gap, no border radius */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-1">
                    {categories.map((category) => (
                        <Link
                            key={category.slug}
                            href={`/category/${category.slug}`}
                            className="group relative overflow-hidden transition-all duration-500 hover:z-10"
                        >
                            {/* Image */}
                            <div className="aspect-square relative overflow-hidden">
                                <Image
                                    src={category.image}
                                    alt={category.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />

                                {/* Gradient overlay */}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-black/20 transition-all duration-500" />

                                {/* Brand color overlay on hover */}
                                <div className="absolute inset-0 bg-brand-600 opacity-0 group-hover:opacity-60 transition-opacity duration-500" />

                                {/* Item count badge */}
                                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                                    <div className="px-3 py-1.5 rounded-full bg-white/20 backdrop-blur-md border border-white/30">
                                        <span className="text-xs font-semibold text-white">{category.count}</span>
                                    </div>
                                </div>

                                {/* Content overlay */}
                                <div className="absolute bottom-0 left-0 right-0 p-5">
                                    {/* Category name */}
                                    <h3 className="text-lg font-bold text-white mb-1 transition-colors">
                                        {category.name}
                                    </h3>

                                    {/* Subtitle */}
                                    <p className="text-sm text-white/60 group-hover:text-white/80 mb-4 line-clamp-1 transition-colors">
                                        Discover amazing deals
                                    </p>

                                    {/* Shop Now button */}
                                    <div className="flex items-center gap-2 text-sm font-semibold text-white transition-colors">
                                        <span>Shop Now</span>
                                        <ArrowRight className="size-4 group-hover:translate-x-2 transition-transform duration-300" />
                                    </div>
                                </div>

                                {/* Bottom accent line - brand color */}
                                <div className="absolute bottom-0 left-0 right-0 h-1 bg-brand-500 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-left" />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
