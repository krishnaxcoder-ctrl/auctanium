"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import {
    Users01,
    SearchLg,
    Plus,
    Globe02,
    Lock01,
    CheckVerified01,
    TrendUp01,
    Bookmark,
    ArrowRight,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const groupCategories = ["All", "Collectibles", "Electronics", "Fashion", "Art", "Jewelry", "Automotive"];

const groups = [
    {
        id: 1,
        name: "Vintage Watch Collectors",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=300&fit=crop",
        members: 12500,
        posts: 458,
        description: "A community for vintage watch enthusiasts. Share your collection, get authentication help, and connect with fellow collectors.",
        isPrivate: false,
        isJoined: true,
        category: "Collectibles",
    },
    {
        id: 2,
        name: "Rare Coin Traders India",
        image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=400&h=300&fit=crop",
        members: 8900,
        posts: 234,
        description: "Buy, sell, and discuss rare Indian coins. From ancient to modern numismatics.",
        isPrivate: false,
        isJoined: false,
        category: "Collectibles",
    },
    {
        id: 3,
        name: "Electronics Deals Hub",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=400&h=300&fit=crop",
        members: 25000,
        posts: 892,
        description: "Find the best deals on electronics. Members share exclusive discounts and auction tips.",
        isPrivate: false,
        isJoined: true,
        category: "Electronics",
    },
    {
        id: 4,
        name: "Designer Fashion Auctions",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=400&h=300&fit=crop",
        members: 15600,
        posts: 567,
        description: "Exclusive group for designer fashion auctions. Authenticated luxury items only.",
        isPrivate: true,
        isJoined: false,
        category: "Fashion",
    },
    {
        id: 5,
        name: "Art Collectors Society",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=300&fit=crop",
        members: 6700,
        posts: 189,
        description: "For serious art collectors. Discuss pieces, get valuations, and find rare artworks.",
        isPrivate: true,
        isJoined: true,
        category: "Art",
    },
    {
        id: 6,
        name: "Handmade Jewelry Makers",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=400&h=300&fit=crop",
        members: 9200,
        posts: 345,
        description: "Connect with artisan jewelry makers. Share techniques, sell creations, find materials.",
        isPrivate: false,
        isJoined: false,
        category: "Jewelry",
    },
];

const GroupCard = ({ group }: { group: typeof groups[0] }) => {
    const [isJoined, setIsJoined] = useState(group.isJoined);

    return (
        <div className="bg-primary border border-secondary rounded-2xl overflow-hidden transition-all hover:shadow-lg hover:-translate-y-1">
            {/* Cover Image */}
            <div className="relative h-32">
                <Image
                    src={group.image}
                    alt={group.name}
                    fill
                    className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                {group.isPrivate && (
                    <div className="absolute top-3 right-3">
                        <Badge type="pill-color" size="sm" color="gray">
                            <Lock01 className="size-3 mr-1" />
                            Private
                        </Badge>
                    </div>
                )}
            </div>

            {/* Content */}
            <div className="p-4">
                <h3 className="font-semibold text-primary text-lg">{group.name}</h3>
                <p className="text-sm text-tertiary mt-1 line-clamp-2">{group.description}</p>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-3 text-sm text-tertiary">
                    <span className="flex items-center gap-1">
                        <Users01 className="size-4" />
                        {group.members.toLocaleString()} members
                    </span>
                    <span>{group.posts} posts/week</span>
                </div>

                {/* Action */}
                <div className="mt-4">
                    <Button
                        color={isJoined ? "secondary" : "primary"}
                        size="sm"
                        className="w-full"
                        onClick={() => setIsJoined(!isJoined)}
                    >
                        {isJoined ? "Joined" : "Join Group"}
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default function GroupsPage() {
    const [activeCategory, setActiveCategory] = useState("All");
    const [searchQuery, setSearchQuery] = useState("");

    const filteredGroups = groups.filter((group) => {
        const matchesCategory = activeCategory === "All" || group.category === activeCategory;
        const matchesSearch = group.name.toLowerCase().includes(searchQuery.toLowerCase());
        return matchesCategory && matchesSearch;
    });

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
                                    <Link href="/community/groups" className="flex items-center gap-3 px-3 py-2 rounded-lg bg-brand-50 text-brand-600">
                                        <Users01 className="size-5" />
                                        <span className="font-medium">Groups</span>
                                    </Link>
                                    <Link href="/community/trending" className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <TrendUp01 className="size-5" />
                                        <span>Trending</span>
                                    </Link>
                                    <Link href="/community/saved" className="flex items-center gap-3 px-3 py-2 rounded-lg text-tertiary hover:bg-secondary transition-colors">
                                        <Bookmark className="size-5" />
                                        <span>Saved</span>
                                    </Link>
                                </nav>
                            </div>

                            {/* Create Group CTA */}
                            <div className="bg-gradient-to-br from-brand-600 to-brand-800 rounded-2xl p-4 text-white">
                                <h3 className="font-semibold mb-2">Start Your Own Group</h3>
                                <p className="text-sm text-brand-200 mb-4">Create a community around your passion and connect with like-minded collectors.</p>
                                <Button color="secondary" size="sm" className="w-full bg-white text-brand-700 hover:bg-brand-50">
                                    <Plus className="size-4 mr-2" />
                                    Create Group
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Main Content */}
                    <div className="lg:col-span-9 space-y-6">
                        {/* Header */}
                        <div className="bg-primary rounded-2xl border border-secondary p-6">
                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                                <div>
                                    <h1 className="text-xl font-semibold text-primary">Community Groups</h1>
                                    <p className="text-sm text-tertiary mt-1">Join groups to connect with collectors who share your interests</p>
                                </div>
                                <Button color="primary" size="sm">
                                    <Plus className="size-4 mr-2" />
                                    Create Group
                                </Button>
                            </div>

                            {/* Search */}
                            <div className="mt-4 flex items-center gap-2 bg-secondary rounded-lg px-3 py-2">
                                <SearchLg className="size-5 text-tertiary" />
                                <input
                                    type="text"
                                    placeholder="Search groups..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="flex-1 bg-transparent text-sm outline-none text-primary placeholder:text-tertiary"
                                />
                            </div>

                            {/* Categories */}
                            <div className="mt-4 flex items-center gap-2 overflow-x-auto pb-2">
                                {groupCategories.map((category) => (
                                    <button
                                        key={category}
                                        onClick={() => setActiveCategory(category)}
                                        className={cx(
                                            "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                            activeCategory === category
                                                ? "bg-brand-600 text-white"
                                                : "bg-secondary text-tertiary hover:bg-brand-50 hover:text-brand-600"
                                        )}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                        </div>

                        {/* Groups Grid */}
                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                            {filteredGroups.map((group) => (
                                <GroupCard key={group.id} group={group} />
                            ))}
                        </div>

                        {filteredGroups.length === 0 && (
                            <div className="text-center py-12">
                                <Users01 className="size-12 text-tertiary mx-auto mb-4" />
                                <h3 className="font-semibold text-primary">No groups found</h3>
                                <p className="text-sm text-tertiary mt-1">Try a different search or category</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}
