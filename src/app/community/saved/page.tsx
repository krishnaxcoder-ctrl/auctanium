"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Bookmark,
    Users01,
    Globe02,
    TrendUp01,
    Heart,
    MessageCircle01,
    Share07,
    CheckVerified01,
    Trash01,
    FolderPlus,
    Grid01,
    List,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const savedCollections = [
    { id: "all", name: "All Saved", count: 24, icon: Bookmark },
    { id: "products", name: "Products to Buy", count: 12, icon: Bookmark },
    { id: "tips", name: "Collecting Tips", count: 8, icon: Bookmark },
    { id: "inspiration", name: "Inspiration", count: 4, icon: Bookmark },
];

const savedPosts = [
    {
        id: 1,
        user: {
            name: "Rahul Verma",
            avatar: "/face1.png",
            username: "@rahulverma",
            verified: true,
        },
        content: "Pro tip: Always use a loupe when examining coins for authenticity. Here are the 5 key markers to look for...",
        image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600&h=400&fit=crop",
        savedAt: "2 days ago",
        likes: 567,
        comments: 89,
        collection: "tips",
    },
    {
        id: 2,
        user: {
            name: "Priya Sharma",
            avatar: "/face4.png",
            username: "@priyasharma",
            verified: true,
        },
        content: "This vintage Omega Seamaster is going up for auction next week. Estimated value: Rs. 2-3 lakhs. Who else is bidding?",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=400&fit=crop",
        savedAt: "3 days ago",
        likes: 892,
        comments: 156,
        collection: "products",
    },
    {
        id: 3,
        user: {
            name: "Vikram Singh",
            avatar: "/face5.png",
            username: "@vikramsingh",
            verified: true,
        },
        content: "My complete guide to building a watch collection on a budget. Took me 5 years to learn these lessons!",
        image: null,
        savedAt: "1 week ago",
        likes: 1234,
        comments: 234,
        collection: "tips",
    },
    {
        id: 4,
        user: {
            name: "Sneha Reddy",
            avatar: "/face6.png",
            username: "@snehareddy",
            verified: true,
        },
        content: "Just finished restoring this 1920s Art Deco necklace. The detail work took over 40 hours. What do you think?",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=600&h=400&fit=crop",
        savedAt: "1 week ago",
        likes: 2100,
        comments: 312,
        collection: "inspiration",
    },
    {
        id: 5,
        user: {
            name: "Amit Patel",
            avatar: "/face3.png",
            username: "@amitpatel",
            verified: false,
        },
        content: "Found this rare painting at a local market for just Rs. 5000. Got it authenticated - it's worth Rs. 2 lakhs!",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=400&fit=crop",
        savedAt: "2 weeks ago",
        likes: 3456,
        comments: 456,
        collection: "inspiration",
    },
];

export default function SavedPage() {
    const [activeCollection, setActiveCollection] = useState("all");
    const [viewMode, setViewMode] = useState<"grid" | "list">("list");

    const filteredPosts = activeCollection === "all"
        ? savedPosts
        : savedPosts.filter(post => post.collection === activeCollection);

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
                                    <Link href="/community/trending" className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <TrendUp01 className="size-5" />
                                        <span>Trending</span>
                                    </Link>
                                    <Link href="/community/saved" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-600">
                                        <Bookmark className="size-5" />
                                        <span className="font-medium">Saved</span>
                                    </Link>
                                </nav>
                            </div>

                            {/* Collections */}
                            <div className="bg-primary rounded-2xl border border-secondary p-4">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="font-semibold text-primary">Collections</h3>
                                    <button className="text-brand-600 hover:text-brand-700">
                                        <FolderPlus className="size-5" />
                                    </button>
                                </div>
                                <div className="space-y-1">
                                    {savedCollections.map((collection) => (
                                        <button
                                            key={collection.id}
                                            onClick={() => setActiveCollection(collection.id)}
                                            className={cx(
                                                "w-full flex items-center justify-between px-3 py-2 rounded-lg transition-colors",
                                                activeCollection === collection.id
                                                    ? "bg-brand-50 text-brand-600"
                                                    : "text-tertiary hover:bg-secondary"
                                            )}
                                        >
                                            <div className="flex items-center gap-3">
                                                <collection.icon className="size-5" />
                                                <span className="text-sm">{collection.name}</span>
                                            </div>
                                            <span className="text-xs bg-secondary px-2 py-0.5 rounded-full">
                                                {collection.count}
                                            </span>
                                        </button>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Header */}
                        <div className="bg-primary rounded-2xl border border-secondary p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div className="flex items-center gap-3">
                                    <div className="size-12 rounded-full bg-brand-100 flex items-center justify-center">
                                        <Bookmark className="size-6 text-brand-600" />
                                    </div>
                                    <div>
                                        <h1 className="text-xl font-semibold text-primary">Saved Posts</h1>
                                        <p className="text-sm text-tertiary">{filteredPosts.length} items saved</p>
                                    </div>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button
                                        color={viewMode === "list" ? "primary" : "secondary"}
                                        size="sm"
                                        onClick={() => setViewMode("list")}
                                    >
                                        <List className="size-4" />
                                    </Button>
                                    <Button
                                        color={viewMode === "grid" ? "primary" : "secondary"}
                                        size="sm"
                                        onClick={() => setViewMode("grid")}
                                    >
                                        <Grid01 className="size-4" />
                                    </Button>
                                </div>
                            </div>

                            {/* Mobile Collections */}
                            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2 lg:hidden">
                                {savedCollections.map((collection) => (
                                    <button
                                        key={collection.id}
                                        onClick={() => setActiveCollection(collection.id)}
                                        className={cx(
                                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                            activeCollection === collection.id
                                                ? "bg-brand-600 text-white"
                                                : "bg-secondary text-tertiary"
                                        )}
                                    >
                                        {collection.name} ({collection.count})
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Saved Posts */}
                        {viewMode === "list" ? (
                            <div className="space-y-4">
                                {filteredPosts.map((post) => (
                                    <div key={post.id} className="bg-primary border border-secondary rounded-2xl p-6 transition-all hover:shadow-md">
                                        <div className="flex items-start justify-between">
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
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs text-tertiary">Saved {post.savedAt}</span>
                                                <button className="p-2 rounded-full hover:bg-red-50 text-tertiary hover:text-red-500 transition-colors">
                                                    <Trash01 className="size-4" />
                                                </button>
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
                                        </div>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                                {filteredPosts.map((post) => (
                                    <div key={post.id} className="bg-primary border border-secondary rounded-2xl overflow-hidden transition-all hover:shadow-md">
                                        {post.image ? (
                                            <div className="relative aspect-video">
                                                <Image src={post.image} alt="" fill className="object-cover" />
                                            </div>
                                        ) : (
                                            <div className="aspect-video bg-secondary flex items-center justify-center">
                                                <Bookmark className="size-12 text-tertiary" />
                                            </div>
                                        )}
                                        <div className="p-4">
                                            <div className="flex items-center gap-2 mb-2">
                                                <Avatar size="sm" src={post.user.avatar} />
                                                <span className="text-sm font-medium text-primary">{post.user.name}</span>
                                            </div>
                                            <p className="text-sm text-tertiary line-clamp-2">{post.content}</p>
                                            <div className="mt-3 flex items-center justify-between text-xs text-tertiary">
                                                <span>{post.likes.toLocaleString()} likes</span>
                                                <span>{post.savedAt}</span>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}

                        {filteredPosts.length === 0 && (
                            <div className="text-center py-12 bg-primary rounded-2xl border border-secondary">
                                <Bookmark className="size-12 text-tertiary mx-auto mb-4" />
                                <h3 className="font-semibold text-primary">No saved posts</h3>
                                <p className="text-sm text-tertiary mt-1">Posts you save will appear here</p>
                                <Link href="/community">
                                    <Button color="primary" size="sm" className="mt-4">
                                        Explore Feed
                                    </Button>
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
