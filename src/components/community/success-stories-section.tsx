"use client";

import Link from "next/link";
import { ArrowRight, Star01, TrendUp01, CurrencyDollar } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";

const stories = [
    {
        id: 1,
        title: "From Novice to Power Collector: My Journey",
        excerpt: "Started with a $50 budget and now I've built a collection worth over $100k. Here's how I did it...",
        author: {
            name: "Sarah Mitchell",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            username: "@sarahcollects",
        },
        stats: {
            savings: "$45,000",
            auctions: 287,
            rating: 4.9,
        },
        category: "Vintage Watches",
        featured: true,
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=600&fit=crop",
    },
    {
        id: 2,
        title: "How I Found a Rare Picasso Print for 70% Off",
        excerpt: "Patience and research paid off when I discovered this authenticated piece at an estate auction...",
        author: {
            name: "Marcus Chen",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            username: "@marcusart",
        },
        stats: {
            savings: "$125,000",
            auctions: 445,
            rating: 5.0,
        },
        category: "Fine Art",
        featured: true,
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=800&h=600&fit=crop",
    },
    {
        id: 3,
        title: "Building My Dream Library One Auction at a Time",
        excerpt: "Collected over 500 rare first editions by being strategic and patient with my bidding...",
        author: {
            name: "Elena Rodriguez",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            username: "@elenafinds",
        },
        stats: {
            savings: "$32,000",
            auctions: 156,
            rating: 4.8,
        },
        category: "Rare Books",
        featured: false,
        image: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=800&h=600&fit=crop",
    },
];

export const SuccessStoriesSection = () => {
    return (
        <section className="bg-primary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                            Success Stories
                        </h2>
                        <p className="mt-3 text-lg text-tertiary">
                            Real wins from real collectors in our community
                        </p>
                    </div>
                    <Link href="/community/stories" className="hidden items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 lg:flex">
                        Read All Stories
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Stories Grid */}
                <div className="mt-12 grid grid-cols-1 gap-8 lg:grid-cols-3">
                    {stories.map((story) => (
                        <Link
                            key={story.id}
                            href={`/community/stories/${story.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary transition-all duration-300 hover:scale-[1.02] hover:border-brand-400 hover:shadow-xl"
                        >
                            {/* Image */}
                            <div className="relative aspect-[4/3] overflow-hidden">
                                <img
                                    src={story.image}
                                    alt={story.title}
                                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                                />
                                {story.featured && (
                                    <div className="absolute top-4 right-4">
                                        <Badge type="pill-color" size="md" color="warning">
                                            <Star01 className="size-3" />
                                            <span className="ml-1">Featured</span>
                                        </Badge>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </div>

                            {/* Content */}
                            <div className="p-6">
                                {/* Category */}
                                <Badge type="pill-color" size="sm" color="brand">
                                    {story.category}
                                </Badge>

                                {/* Title */}
                                <h3 className="mt-4 text-xl font-semibold text-primary line-clamp-2 group-hover:text-brand-600 transition-colors">
                                    {story.title}
                                </h3>

                                {/* Excerpt */}
                                <p className="mt-3 text-sm text-tertiary line-clamp-3">
                                    {story.excerpt}
                                </p>

                                {/* Stats */}
                                <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-secondary p-4">
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1 text-success-600">
                                            <CurrencyDollar className="size-4" />
                                            <span className="text-sm font-bold">{story.stats.savings}</span>
                                        </div>
                                        <div className="mt-1 text-xs text-tertiary">Saved</div>
                                    </div>
                                    <div className="text-center border-x border-tertiary">
                                        <div className="text-sm font-bold text-primary">{story.stats.auctions}</div>
                                        <div className="mt-1 text-xs text-tertiary">Wins</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="flex items-center justify-center gap-1">
                                            <Star01 className="size-3 text-warning-500" />
                                            <span className="text-sm font-bold text-primary">{story.stats.rating}</span>
                                        </div>
                                        <div className="mt-1 text-xs text-tertiary">Rating</div>
                                    </div>
                                </div>

                                {/* Author */}
                                <div className="mt-6 flex items-center gap-3 border-t border-secondary pt-4">
                                    <Avatar size="sm" src={story.author.avatar} />
                                    <div className="flex-1">
                                        <p className="text-sm font-medium text-primary">{story.author.name}</p>
                                        <p className="text-xs text-tertiary">{story.author.username}</p>
                                    </div>
                                    <ArrowRight className="size-4 text-brand-600 transition-transform duration-300 group-hover:translate-x-1" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
