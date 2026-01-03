"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    TrendUp01,
    Hash02,
    Users01,
    Globe02,
    Bookmark,
    Heart,
    MessageCircle01,
    Share07,
    CheckVerified01,
    Zap,
    ArrowUp,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const trendingTabs = ["Posts", "Topics", "People"];

const trendingPosts = [
    {
        id: 1,
        rank: 1,
        user: {
            name: "Rahul Verma",
            avatar: "/face1.png",
            username: "@rahulverma",
            verified: true,
        },
        content: "Just sold my 1947 commemorative coin collection for 3x the expected price! This platform is incredible for serious collectors. The authentication service gave buyers confidence.",
        image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600&h=400&fit=crop",
        likes: 2456,
        comments: 342,
        shares: 189,
        trendingScore: 98,
    },
    {
        id: 2,
        rank: 2,
        user: {
            name: "Priya Sharma",
            avatar: "/face4.png",
            username: "@priyasharma",
            verified: true,
        },
        content: "ALERT: Fake designer bags flooding the market! Here's how to spot them - a thread for all fashion collectors. Please share to spread awareness!",
        image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=400&fit=crop",
        likes: 1892,
        comments: 567,
        shares: 423,
        trendingScore: 95,
    },
    {
        id: 3,
        rank: 3,
        user: {
            name: "Vikram Singh",
            avatar: "/face5.png",
            username: "@vikramsingh",
            verified: true,
        },
        content: "My ultimate guide to starting your vintage watch collection with just Rs. 50,000. Yes, it's possible! Save this post for later.",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
        likes: 1654,
        comments: 234,
        shares: 567,
        trendingScore: 92,
    },
];

const trendingTopics = [
    { tag: "VintageWatches", posts: 12345, growth: 45 },
    { tag: "RareCoins", posts: 8920, growth: 32 },
    { tag: "DesignerBags", posts: 7654, growth: 28 },
    { tag: "AntiqueFurniture", posts: 5432, growth: 22 },
    { tag: "ArtCollection", posts: 4321, growth: 18 },
    { tag: "JewelryDeals", posts: 3987, growth: 15 },
    { tag: "ElectronicsAuction", posts: 3456, growth: 12 },
    { tag: "SportsMemorabilities", posts: 2890, growth: 10 },
];

const trendingPeople = [
    {
        name: "Arjun Mehta",
        avatar: "/face2.png",
        username: "@arjunmehta",
        verified: true,
        followers: "125K",
        growth: 2500,
        specialty: "Watch Expert",
    },
    {
        name: "Sneha Reddy",
        avatar: "/face6.png",
        username: "@snehareddy",
        verified: true,
        followers: "98K",
        growth: 1800,
        specialty: "Jewelry Seller",
    },
    {
        name: "Amit Patel",
        avatar: "/face3.png",
        username: "@amitpatel",
        verified: true,
        followers: "75K",
        growth: 1200,
        specialty: "Art Collector",
    },
    {
        name: "Kavitha Nair",
        avatar: "https://randomuser.me/api/portraits/women/45.jpg",
        username: "@kavithanair",
        verified: true,
        followers: "62K",
        growth: 950,
        specialty: "Antique Dealer",
    },
];

export default function TrendingPage() {
    const [activeTab, setActiveTab] = useState("Posts");

    return (
        <div className="bg-secondary min-h-screen">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-6">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
                    {/* Left Sidebar */}
                    <div className="hidden lg:block lg:col-span-3">
                        <div className="sticky top-24 space-y-6">
                            {/* Navigation */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <h3 className="font-semibold text-primary mb-4">Explore</h3>
                                <nav className="space-y-1">
                                    <Link href="/community" className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Globe02 className="size-5" />
                                        <span>Feed</span>
                                    </Link>
                                    <Link href="/community/groups" className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Users01 className="size-5" />
                                        <span>Groups</span>
                                    </Link>
                                    <Link href="/community/trending" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-600">
                                        <TrendUp01 className="size-5" />
                                        <span className="font-medium">Trending</span>
                                    </Link>
                                    <Link href="/community/saved" className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Bookmark className="size-5" />
                                        <span>Saved</span>
                                    </Link>
                                </nav>
                            </div>

                            {/* Top Topics Today */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center gap-2 mb-4">
                                    <Zap className="size-5 text-orange-500" />
                                    <h3 className="font-semibold text-primary">Hot Right Now</h3>
                                </div>
                                <div className="space-y-3">
                                    {trendingTopics.slice(0, 5).map((topic, index) => (
                                        <Link
                                            key={topic.tag}
                                            href={`/community/tag/${topic.tag}`}
                                            className="flex items-center justify-between group"
                                        >
                                            <div className="flex items-center gap-2">
                                                <span className="text-sm font-bold text-tertiary w-4">{index + 1}</span>
                                                <Hash02 className="size-4 text-brand-600" />
                                                <span className="text-sm text-primary group-hover:text-brand-600 transition-colors">
                                                    {topic.tag}
                                                </span>
                                            </div>
                                            <span className="flex items-center gap-1 text-xs text-success-600">
                                                <ArrowUp className="size-3" />
                                                {topic.growth}%
                                            </span>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Header */}
                        <div className="bg-primary rounded-2xl border border-secondary p-6">
                            <div className="flex items-center gap-3">
                                <div className="size-12 rounded-full bg-gradient-to-br from-orange-400 to-red-500 flex items-center justify-center">
                                    <TrendUp01 className="size-6 text-white" />
                                </div>
                                <div>
                                    <h1 className="text-xl font-semibold text-primary">Trending Now</h1>
                                    <p className="text-sm text-tertiary">See what's popular in the community right now</p>
                                </div>
                            </div>

                            {/* Tabs */}
                            <div className="mt-6 flex items-center gap-2">
                                {trendingTabs.map((tab) => (
                                    <button
                                        key={tab}
                                        onClick={() => setActiveTab(tab)}
                                        className={cx(
                                            "px-6 py-2 rounded-full text-sm font-medium transition-all",
                                            activeTab === tab
                                                ? "bg-brand-600 text-white"
                                                : "bg-secondary text-tertiary hover:bg-brand-50 hover:text-brand-600"
                                        )}
                                    >
                                        {tab}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Trending Posts */}
                        {activeTab === "Posts" && (
                            <div className="space-y-4">
                                {trendingPosts.map((post) => (
                                    <div key={post.id} className="bg-primary border border-secondary rounded-2xl p-6 transition-all hover:shadow-md">
                                        <div className="flex items-start gap-4">
                                            {/* Rank */}
                                            <div className="flex flex-col items-center">
                                                <div className={cx(
                                                    "size-10 rounded-full flex items-center justify-center font-bold text-white",
                                                    post.rank === 1 && "bg-yellow-500",
                                                    post.rank === 2 && "bg-gray-400",
                                                    post.rank === 3 && "bg-amber-600"
                                                )}>
                                                    #{post.rank}
                                                </div>
                                                <div className="mt-2 flex items-center gap-1 text-xs text-success-600">
                                                    <Zap className="size-3" />
                                                    {post.trendingScore}
                                                </div>
                                            </div>

                                            {/* Content */}
                                            <div className="flex-1">
                                                <div className="flex items-center gap-3">
                                                    <Avatar size="md" src={post.user.avatar} />
                                                    <div>
                                                        <div className="flex items-center gap-1.5">
                                                            <span className="font-semibold text-primary">{post.user.name}</span>
                                                            {post.user.verified && (
                                                                <CheckVerified01 className="size-4 text-brand-600" />
                                                            )}
                                                        </div>
                                                        <span className="text-sm text-tertiary">{post.user.username}</span>
                                                    </div>
                                                </div>

                                                <p className="mt-3 text-primary">{post.content}</p>

                                                {post.image && (
                                                    <div className="mt-3 relative aspect-video rounded-xl overflow-hidden">
                                                        <Image src={post.image} alt="" fill className="object-cover" />
                                                    </div>
                                                )}

                                                <div className="mt-4 flex items-center gap-6 text-sm text-tertiary">
                                                    <span className="flex items-center gap-1">
                                                        <Heart className="size-4" />
                                                        {post.likes.toLocaleString()}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <MessageCircle01 className="size-4" />
                                                        {post.comments}
                                                    </span>
                                                    <span className="flex items-center gap-1">
                                                        <Share07 className="size-4" />
                                                        {post.shares}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {/* Trending Topics */}
                        {activeTab === "Topics" && (
                            <div className="bg-primary border border-secondary rounded-2xl divide-y divide-secondary">
                                {trendingTopics.map((topic, index) => (
                                    <Link
                                        key={topic.tag}
                                        href={`/community/tag/${topic.tag}`}
                                        className="flex items-center justify-between p-4 hover:bg-secondary transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <span className="text-lg font-bold text-tertiary w-6">{index + 1}</span>
                                            <div>
                                                <div className="flex items-center gap-2">
                                                    <Hash02 className="size-5 text-brand-600" />
                                                    <span className="font-semibold text-primary">{topic.tag}</span>
                                                </div>
                                                <span className="text-sm text-tertiary">{topic.posts.toLocaleString()} posts</span>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1 text-success-600 bg-success-50 px-3 py-1 rounded-full">
                                            <ArrowUp className="size-4" />
                                            <span className="text-sm font-medium">{topic.growth}%</span>
                                        </div>
                                    </Link>
                                ))}
                            </div>
                        )}

                        {/* Trending People */}
                        {activeTab === "People" && (
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                {trendingPeople.map((person, index) => (
                                    <div key={person.username} className="bg-primary border border-secondary rounded-2xl p-4 transition-all hover:shadow-md">
                                        <div className="flex items-start justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="relative">
                                                    <Avatar size="lg" src={person.avatar} />
                                                    <div className={cx(
                                                        "absolute -top-1 -right-1 size-6 rounded-full flex items-center justify-center text-xs font-bold text-white",
                                                        index === 0 && "bg-yellow-500",
                                                        index === 1 && "bg-gray-400",
                                                        index === 2 && "bg-amber-600",
                                                        index > 2 && "bg-brand-600"
                                                    )}>
                                                        {index + 1}
                                                    </div>
                                                </div>
                                                <div>
                                                    <div className="flex items-center gap-1.5">
                                                        <span className="font-semibold text-primary">{person.name}</span>
                                                        {person.verified && (
                                                            <CheckVerified01 className="size-4 text-brand-600" />
                                                        )}
                                                    </div>
                                                    <span className="text-sm text-tertiary">{person.username}</span>
                                                    <Badge type="pill-color" size="sm" color="brand" className="mt-1">
                                                        {person.specialty}
                                                    </Badge>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="mt-4 flex items-center justify-between">
                                            <div className="text-sm">
                                                <span className="font-semibold text-primary">{person.followers}</span>
                                                <span className="text-tertiary"> followers</span>
                                                <span className="ml-2 text-success-600">+{person.growth.toLocaleString()} this week</span>
                                            </div>
                                            <Button color="primary" size="sm">Follow</Button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
