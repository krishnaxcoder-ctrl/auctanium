"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, MessageCircle01, ThumbsUp } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { RatingStars } from "@/components/foundations/rating-stars";

const communityPosts = [
    {
        id: "post-1",
        type: "review",
        author: {
            name: "James Wilson",
            avatar: "https://randomuser.me/api/portraits/men/52.jpg",
            verified: true,
        },
        content: "Just received my MacBook Pro from TechDeals Pro. Exactly as described, fast shipping, and great packaging! Saved $400 compared to retail.",
        image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=300&fit=crop",
        rating: 5,
        likes: 67,
        comments: 18,
        timeAgo: "2 hours ago",
    },
    {
        id: "post-2",
        type: "discussion",
        author: {
            name: "Anna Schmidt",
            avatar: "https://randomuser.me/api/portraits/women/33.jpg",
            verified: false,
        },
        content: "What's the best strategy for sniping auctions in the last few seconds? I keep getting outbid at the last moment!",
        image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=400&h=300&fit=crop",
        likes: 129,
        comments: 54,
        timeAgo: "4 hours ago",
    },
    {
        id: "post-3",
        type: "showcase",
        author: {
            name: "Carlos Martinez",
            avatar: "https://randomuser.me/api/portraits/men/67.jpg",
            verified: true,
        },
        content: "Finally completed my vintage watch collection! Won this 1969 Omega Speedmaster for 40% below market value. Thanks to this amazing community!",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=300&fit=crop",
        likes: 334,
        comments: 76,
        timeAgo: "6 hours ago",
    },
    {
        id: "post-4",
        type: "tip",
        author: {
            name: "Priya Sharma",
            avatar: "https://randomuser.me/api/portraits/women/55.jpg",
            verified: true,
        },
        content: "Pro tip: Set up alerts for your favorite categories. I've snagged 3 designer bags this month just by being first to bid on new listings!",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&h=300&fit=crop",
        likes: 256,
        comments: 33,
        timeAgo: "8 hours ago",
    },
];

const postTypeColors = {
    review: "success" as const,
    discussion: "brand" as const,
    showcase: "warning" as const,
    tip: "blue" as const,
};

const postTypeLabels = {
    review: "Review",
    discussion: "Discussion",
    showcase: "Showcase",
    tip: "Pro Tip",
};

export const LatestFromCommunitySection = () => {
    return (
        <section className="bg-primary py-4 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary sm:text-xl">
                        Latest from Our Community
                    </h2>
                    <Link href="/community" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Posts Grid */}
                <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                    {communityPosts.map((post) => (
                        <Link
                            key={post.id}
                            href={`/community/post/${post.id}`}
                            className="group flex flex-col rounded-2xl border border-secondary bg-primary transition-all duration-300 hover:border-brand-300 hover:shadow-lg"
                        >
                            {/* Image (if exists) */}
                            {post.image && (
                                <div className="relative aspect-[4/3] overflow-hidden rounded-t-2xl">
                                    <Image
                                        src={post.image}
                                        alt=""
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                    />
                                </div>
                            )}

                            <div className="flex flex-1 flex-col p-4">
                                {/* Post Type Badge */}
                                <Badge
                                    type="pill-color"
                                    size="sm"
                                    color={postTypeColors[post.type as keyof typeof postTypeColors]}
                                    className="w-fit"
                                >
                                    {postTypeLabels[post.type as keyof typeof postTypeLabels]}
                                </Badge>

                                {/* Content */}
                                <p className="mt-3 flex-1 text-sm text-secondary line-clamp-3">
                                    {post.content}
                                </p>

                                {/* Rating (for reviews) */}
                                {post.rating && (
                                    <div className="mt-3">
                                        <RatingStars rating={post.rating} starClassName="size-4" />
                                    </div>
                                )}

                                {/* Author */}
                                <div className="mt-4 flex items-center gap-2 border-t border-secondary pt-4">
                                    <Avatar size="sm" src={post.author.avatar} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium text-primary truncate">
                                            {post.author.name}
                                        </p>
                                        <p className="text-xs text-tertiary">{post.timeAgo}</p>
                                    </div>
                                </div>

                                {/* Engagement Stats */}
                                <div className="mt-3 flex items-center gap-4 text-xs text-tertiary">
                                    <span className="flex items-center gap-1">
                                        <ThumbsUp className="size-3.5" />
                                        {post.likes}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <MessageCircle01 className="size-3.5" />
                                        {post.comments}
                                    </span>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
