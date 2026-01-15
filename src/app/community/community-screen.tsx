"use client";

import React, { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Home01,
    TrendUp01,
    Compass03,
    Globe02,
    Plus,
    ChevronDown,
    ChevronUp,
    Settings01,
    MessageCircle01,
    Share07,
    Bookmark,
    DotsHorizontal,
    ArrowUp,
    ArrowDown,
    Clock,
    Zap,
    Award01,
    ShieldTick,
    HelpCircle,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// Navigation items for left sidebar
const mainNavItems = [
    { icon: Home01, label: "Home", href: "/community", active: true },
    { icon: TrendUp01, label: "Popular", href: "/community/popular" },
    { icon: Compass03, label: "Explore", href: "/community/explore" },
    { icon: Globe02, label: "All", href: "/community/all" },
];

// Communities the user has joined
const joinedCommunities = [
    { name: "r/VintageWatches", avatar: "/face1.png", members: "45.2K" },
    { name: "r/RareCoins", avatar: "/face2.png", members: "32.1K" },
    { name: "r/ArtCollectors", avatar: "/face3.png", members: "28.9K" },
    { name: "r/AntiqueJewelry", avatar: "/face4.png", members: "19.5K" },
];

// Recent communities visited
const recentCommunities = [
    { name: "r/AuctionTips", avatar: "/face5.png" },
    { name: "r/EstateFinds", avatar: "/face6.png" },
];

// Sort options
const sortOptions = [
    { label: "Best", icon: Award01 },
    { label: "Hot", icon: Zap },
    { label: "New", icon: Clock },
    { label: "Top", icon: TrendUp01 },
];

// Posts data
const posts = [
    {
        id: 1,
        community: {
            name: "r/VintageWatches",
            avatar: "/face1.png",
            verified: true,
        },
        author: "rahulverma",
        timestamp: "2 days ago",
        title: "Finally found my grail watch - 1968 Rolex Submariner in near mint condition!",
        content: "After 3 years of searching, I finally found it at an estate sale. The seller had no idea what they had. Got it authenticated last week and it's 100% original!",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=500&fit=crop",
        upvotes: 2847,
        comments: 342,
        isUpvoted: null as boolean | null,
    },
    {
        id: 2,
        community: {
            name: "r/RareCoins",
            avatar: "/face2.png",
            verified: false,
        },
        author: "coinmaster_india",
        timestamp: "5 hours ago",
        title: "Is this 1947 Indian Independence coin authentic? Need help from experts",
        content: "Found this at a local antique shop. The patina looks original but I'm not 100% sure about the mint mark. Can anyone help verify?",
        image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=800&h=500&fit=crop",
        upvotes: 156,
        comments: 89,
        isUpvoted: null as boolean | null,
    },
    {
        id: 3,
        community: {
            name: "r/ArtCollectors",
            avatar: "/face3.png",
            verified: true,
        },
        author: "artlover_delhi",
        timestamp: "12 hours ago",
        title: "PSA: Always get authentication before bidding on high-value paintings",
        content: "I almost lost ₹5 lakhs on a fake last month. The forgery was incredibly good - even fooled two dealers. Only when I sent it to a proper lab did they catch it. Here's what to look for...\n\n1. Check the canvas age with UV light\n2. Verify provenance documentation\n3. Compare brushwork under magnification\n4. Request a certificate from accredited experts",
        image: "",
        upvotes: 1203,
        comments: 167,
        isUpvoted: true,
    },
    {
        id: 4,
        community: {
            name: "r/AntiqueJewelry",
            avatar: "/face4.png",
            verified: true,
        },
        author: "jewelqueen",
        timestamp: "1 day ago",
        title: "My grandmother's Art Deco emerald ring - finally got it appraised!",
        content: "She always said it was costume jewelry. Turns out it's a genuine 3.2 carat Colombian emerald from the 1920s. Appraised at ₹18 lakhs!",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=800&h=500&fit=crop",
        upvotes: 4521,
        comments: 523,
        isUpvoted: null as boolean | null,
    },
    {
        id: 5,
        community: {
            name: "r/AuctionTips",
            avatar: "/face5.png",
            verified: false,
        },
        author: "bidmaster",
        timestamp: "3 days ago",
        title: "How I won a ₹2L item for ₹45K - timing is everything",
        content: "Most people don't realize that auction timing matters more than your maximum bid. Here's my strategy for getting deals...",
        image: "",
        upvotes: 892,
        comments: 234,
        isUpvoted: false,
    },
];

// Sidebar section component
const SidebarSection = ({
    title,
    children,
    defaultOpen = true,
}: {
    title: string;
    children: React.ReactNode;
    defaultOpen?: boolean;
}) => {
    const [isOpen, setIsOpen] = useState(defaultOpen);

    return (
        <div className="border-t border-secondary pt-3">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center justify-between w-full px-3 py-2 text-xs font-semibold text-tertiary uppercase tracking-wider hover:bg-secondary/50 rounded-lg transition-colors"
            >
                {title}
                {isOpen ? (
                    <ChevronUp className="size-4" />
                ) : (
                    <ChevronDown className="size-4" />
                )}
            </button>
            {isOpen && <div className="mt-1">{children}</div>}
        </div>
    );
};

// Post card component (Reddit style)
const PostCard = ({ post }: { post: typeof posts[0] }) => {
    const [votes, setVotes] = useState(post.upvotes);
    const [voteState, setVoteState] = useState<boolean | null>(post.isUpvoted);

    const handleVote = (isUpvote: boolean) => {
        if (voteState === isUpvote) {
            // Remove vote
            setVotes(post.upvotes);
            setVoteState(null);
        } else if (voteState === null) {
            // New vote
            setVotes(isUpvote ? post.upvotes + 1 : post.upvotes - 1);
            setVoteState(isUpvote);
        } else {
            // Change vote
            setVotes(isUpvote ? post.upvotes + 2 : post.upvotes - 2);
            setVoteState(isUpvote);
        }
    };

    const formatVotes = (num: number) => {
        if (num >= 1000) {
            return (num / 1000).toFixed(1) + "K";
        }
        return num.toString();
    };

    return (
        <div className="bg-primary border border-secondary rounded-lg hover:border-tertiary/30 transition-colors">
            <div className="flex">
                {/* Vote column */}
                <div className="flex flex-col items-center gap-1 p-2 bg-secondary/30 rounded-l-lg">
                    <button
                        onClick={() => handleVote(true)}
                        className={cx(
                            "p-1 rounded hover:bg-secondary transition-colors",
                            voteState === true ? "text-brand-600" : "text-tertiary hover:text-primary"
                        )}
                    >
                        <ArrowUp className="size-5" />
                    </button>
                    <span className={cx(
                        "text-xs font-bold",
                        voteState === true ? "text-brand-600" : voteState === false ? "text-blue-600" : "text-primary"
                    )}>
                        {formatVotes(votes)}
                    </span>
                    <button
                        onClick={() => handleVote(false)}
                        className={cx(
                            "p-1 rounded hover:bg-secondary transition-colors",
                            voteState === false ? "text-blue-600" : "text-tertiary hover:text-primary"
                        )}
                    >
                        <ArrowDown className="size-5" />
                    </button>
                </div>

                {/* Content */}
                <div className="flex-1 p-3">
                    {/* Header */}
                    <div className="flex items-center gap-2 text-xs">
                        <div className="relative size-5 rounded-full overflow-hidden">
                            <Image
                                src={post.community.avatar}
                                alt={post.community.name}
                                fill
                                className="object-cover"
                            />
                        </div>
                        <Link
                            href={`/community/${post.community.name.slice(2)}`}
                            className="font-bold text-primary hover:underline"
                        >
                            {post.community.name}
                        </Link>
                        {post.community.verified && (
                            <ShieldTick className="size-3.5 text-brand-600" />
                        )}
                        <span className="text-tertiary">•</span>
                        <span className="text-tertiary">Posted by u/{post.author}</span>
                        <span className="text-tertiary">•</span>
                        <span className="text-tertiary">{post.timestamp}</span>
                        <Button color="primary" size="sm" className="ml-auto">
                            Join
                        </Button>
                    </div>

                    {/* Title */}
                    <h3 className="mt-2 text-lg font-medium text-primary hover:text-brand-600 cursor-pointer">
                        {post.title}
                    </h3>

                    {/* Content */}
                    {post.content && (
                        <p className="mt-2 text-sm text-secondary line-clamp-3">
                            {post.content}
                        </p>
                    )}

                    {/* Image */}
                    {post.image && (
                        <div className="mt-3 relative aspect-video max-h-[400px] rounded-lg overflow-hidden bg-secondary">
                            <Image
                                src={post.image}
                                alt=""
                                fill
                                className="object-cover"
                            />
                        </div>
                    )}

                    {/* Actions */}
                    <div className="mt-3 flex items-center gap-1">
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-tertiary hover:bg-secondary transition-colors">
                            <MessageCircle01 className="size-4" />
                            <span className="text-xs font-medium">{post.comments} Comments</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-tertiary hover:bg-secondary transition-colors">
                            <Share07 className="size-4" />
                            <span className="text-xs font-medium">Share</span>
                        </button>
                        <button className="flex items-center gap-2 px-3 py-1.5 rounded-full text-tertiary hover:bg-secondary transition-colors">
                            <Bookmark className="size-4" />
                            <span className="text-xs font-medium">Save</span>
                        </button>
                        <button className="p-1.5 rounded-full text-tertiary hover:bg-secondary transition-colors ml-auto">
                            <DotsHorizontal className="size-4" />
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export const CommunityScreen = () => {
    const [activeSort, setActiveSort] = useState("Best");
    const [expandedSections, setExpandedSections] = useState({
        communities: true,
        recent: true,
        resources: false,
    });

    return (
        <div className="bg-secondary min-h-screen">
            <div className="mx-auto max-w-[1400px] px-4 py-4">
                <div className="flex gap-6">
                    {/* Left Sidebar */}
                    <aside className="hidden lg:block w-[270px] flex-shrink-0">
                        <div className="sticky top-20">
                            <nav className="space-y-1">
                                {/* Main Navigation */}
                                {mainNavItems.map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className={cx(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg transition-colors",
                                            item.active
                                                ? "bg-secondary text-primary font-medium"
                                                : "text-secondary hover:bg-secondary/50"
                                        )}
                                    >
                                        <item.icon className="size-5" />
                                        <span>{item.label}</span>
                                    </Link>
                                ))}

                                {/* Start Community */}
                                <button className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-secondary hover:bg-secondary/50 transition-colors w-full">
                                    <Plus className="size-5" />
                                    <span>Start a community</span>
                                </button>
                            </nav>

                            {/* Communities Section */}
                            <SidebarSection title="Communities" defaultOpen={expandedSections.communities}>
                                <div className="space-y-0.5">
                                    {joinedCommunities.map((community) => (
                                        <Link
                                            key={community.name}
                                            href={`/community/${community.name.slice(2)}`}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-secondary/50 transition-colors"
                                        >
                                            <div className="relative size-6 rounded-full overflow-hidden">
                                                <Image
                                                    src={community.avatar}
                                                    alt={community.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-sm truncate">{community.name}</span>
                                        </Link>
                                    ))}
                                    <button className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary/50 transition-colors w-full">
                                        <Settings01 className="size-5" />
                                        <span className="text-sm">Manage Communities</span>
                                    </button>
                                </div>
                            </SidebarSection>

                            {/* Recent Section */}
                            <SidebarSection title="Recent" defaultOpen={expandedSections.recent}>
                                <div className="space-y-0.5">
                                    {recentCommunities.map((community) => (
                                        <Link
                                            key={community.name}
                                            href={`/community/${community.name.slice(2)}`}
                                            className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-secondary/50 transition-colors"
                                        >
                                            <div className="relative size-6 rounded-full overflow-hidden">
                                                <Image
                                                    src={community.avatar}
                                                    alt={community.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <span className="text-sm truncate">{community.name}</span>
                                        </Link>
                                    ))}
                                </div>
                            </SidebarSection>

                            {/* Resources Section */}
                            <SidebarSection title="Resources" defaultOpen={expandedSections.resources}>
                                <div className="space-y-0.5">
                                    <Link
                                        href="/about"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-secondary/50 transition-colors"
                                    >
                                        <Globe02 className="size-5" />
                                        <span className="text-sm">About Auctanium</span>
                                    </Link>
                                    <Link
                                        href="/help"
                                        className="flex items-center gap-3 px-3 py-2 rounded-lg text-secondary hover:bg-secondary/50 transition-colors"
                                    >
                                        <HelpCircle className="size-5" />
                                        <span className="text-sm">Help Center</span>
                                    </Link>
                                </div>
                            </SidebarSection>
                        </div>
                    </aside>

                    {/* Main Content */}
                    <main className="flex-1 min-w-0 max-w-[700px]">
                        {/* Sort Bar */}
                        <div className="bg-primary border border-secondary rounded-lg p-2 mb-4">
                            <div className="flex items-center gap-2">
                                {sortOptions.map((option) => (
                                    <button
                                        key={option.label}
                                        onClick={() => setActiveSort(option.label)}
                                        className={cx(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-colors",
                                            activeSort === option.label
                                                ? "bg-secondary text-primary"
                                                : "text-tertiary hover:bg-secondary/50"
                                        )}
                                    >
                                        <option.icon className="size-4" />
                                        {option.label}
                                    </button>
                                ))}
                                <div className="ml-auto flex items-center gap-2">
                                    <button className="flex items-center gap-2 px-3 py-2 rounded-full text-sm text-tertiary hover:bg-secondary/50 transition-colors">
                                        <span>Card</span>
                                        <ChevronDown className="size-4" />
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Posts Feed */}
                        <div className="space-y-3">
                            {posts.map((post) => (
                                <PostCard key={post.id} post={post} />
                            ))}
                        </div>

                        {/* Load More */}
                        <div className="mt-6 text-center">
                            <Button color="secondary" size="md">
                                Load More Posts
                            </Button>
                        </div>
                    </main>

                    {/* Right Sidebar */}
                    <aside className="hidden xl:block w-[300px] flex-shrink-0">
                        <div className="sticky top-20 space-y-4">
                            {/* Create Post Card */}
                            <div className="bg-primary border border-secondary rounded-lg p-4">
                                <div className="flex items-center gap-3 mb-3">
                                    <Avatar size="md" src="/face1.png" />
                                    <input
                                        type="text"
                                        placeholder="Create Post"
                                        className="flex-1 bg-secondary rounded-full px-4 py-2 text-sm text-primary placeholder:text-tertiary outline-none focus:ring-2 focus:ring-brand-500"
                                    />
                                </div>
                                <div className="flex items-center gap-2">
                                    <Button color="secondary" size="sm" className="flex-1">
                                        <Plus className="size-4 mr-1" />
                                        Create Post
                                    </Button>
                                </div>
                            </div>

                            {/* Popular Communities */}
                            <div className="bg-primary border border-secondary rounded-lg overflow-hidden">
                                <div className="bg-gradient-to-r from-brand-600 to-purple-600 p-4">
                                    <h3 className="font-semibold text-white">Popular Communities</h3>
                                </div>
                                <div className="p-2">
                                    {joinedCommunities.slice(0, 5).map((community, index) => (
                                        <Link
                                            key={community.name}
                                            href={`/community/${community.name.slice(2)}`}
                                            className="flex items-center gap-3 p-2 rounded-lg hover:bg-secondary transition-colors"
                                        >
                                            <span className="text-sm font-medium text-tertiary w-4">{index + 1}</span>
                                            <div className="relative size-8 rounded-full overflow-hidden">
                                                <Image
                                                    src={community.avatar}
                                                    alt={community.name}
                                                    fill
                                                    className="object-cover"
                                                />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-sm font-medium text-primary truncate">{community.name}</p>
                                                <p className="text-xs text-tertiary">{community.members} members</p>
                                            </div>
                                            <Button color="primary" size="sm">
                                                Join
                                            </Button>
                                        </Link>
                                    ))}
                                </div>
                                <div className="p-2 border-t border-secondary">
                                    <Link
                                        href="/community/all"
                                        className="block text-center text-sm text-brand-600 hover:text-brand-700 font-medium py-2"
                                    >
                                        View All Communities
                                    </Link>
                                </div>
                            </div>

                            {/* Footer Links */}
                            <div className="text-xs text-tertiary space-y-3 px-2">
                                <div className="flex flex-wrap gap-x-2 gap-y-1">
                                    <Link href="/terms" className="hover:underline">User Agreement</Link>
                                    <Link href="/privacy" className="hover:underline">Privacy Policy</Link>
                                    <Link href="/content-policy" className="hover:underline">Content Policy</Link>
                                </div>
                                <div className="flex flex-wrap gap-x-2 gap-y-1">
                                    <Link href="/help" className="hover:underline">Help</Link>
                                    <Link href="/about" className="hover:underline">About</Link>
                                    <Link href="/careers" className="hover:underline">Careers</Link>
                                    <Link href="/contact" className="hover:underline">Contact</Link>
                                </div>
                                <p className="pt-2">
                                    Auctanium, Inc. © 2026. All rights reserved.
                                </p>
                            </div>
                        </div>
                    </aside>
                </div>
            </div>
        </div>
    );
};
