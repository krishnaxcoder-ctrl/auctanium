"use client";

import Link from "next/link";
import { ArrowRight, Award01, CheckVerified03, TrendUp01 } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

const featuredMembers = [
    {
        id: 1,
        name: "Sarah Mitchell",
        username: "@sarahcollects",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        role: "Top Collector",
        badge: "Diamond Member",
        stats: {
            auctions: 342,
            wins: 287,
            rating: 4.9,
        },
        specialty: "Vintage Watches",
        verified: true,
    },
    {
        id: 2,
        name: "Marcus Chen",
        username: "@marcusart",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        role: "Art Expert",
        badge: "Platinum Member",
        stats: {
            auctions: 521,
            wins: 445,
            rating: 5.0,
        },
        specialty: "Contemporary Art",
        verified: true,
    },
    {
        id: 3,
        name: "Elena Rodriguez",
        username: "@elenafinds",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        role: "Community Leader",
        badge: "Gold Member",
        stats: {
            auctions: 198,
            wins: 156,
            rating: 4.8,
        },
        specialty: "Rare Books",
        verified: true,
    },
    {
        id: 4,
        name: "James Wilson",
        username: "@jameswins",
        avatar: "https://randomuser.me/api/portraits/men/22.jpg",
        role: "Power Bidder",
        badge: "Diamond Member",
        stats: {
            auctions: 612,
            wins: 534,
            rating: 4.9,
        },
        specialty: "Sports Memorabilia",
        verified: true,
    },
];

export const FeaturedMembersSection = () => {
    return (
        <section className="bg-primary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                            Featured Community Members
                        </h2>
                        <p className="mt-3 text-lg text-tertiary">
                            Meet our most active and successful community members
                        </p>
                    </div>
                    <Link href="/community/members" className="hidden items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 lg:flex">
                        View All Members
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Members Grid */}
                <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    {featuredMembers.map((member) => (
                        <div
                            key={member.id}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-6 transition-all duration-300 hover:scale-105 hover:border-brand-400 hover:shadow-xl"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative">
                                {/* Avatar with badge */}
                                <div className="flex items-start justify-between">
                                    <div className="relative">
                                        <Avatar
                                            size="xl"
                                            src={member.avatar}
                                            className="ring-2 ring-bg-primary transition-all duration-300 group-hover:ring-brand-400"
                                        />
                                        {member.verified && (
                                            <div className="absolute -bottom-1 -right-1 rounded-full bg-success-500 p-1 ring-2 ring-bg-primary">
                                                <CheckVerified03 className="size-4 text-white" />
                                            </div>
                                        )}
                                    </div>
                                    <Badge type="pill-color" size="sm" color="brand">
                                        {member.badge}
                                    </Badge>
                                </div>

                                {/* Member info */}
                                <div className="mt-4">
                                    <h3 className="text-lg font-semibold text-primary">{member.name}</h3>
                                    <p className="text-sm text-tertiary">{member.username}</p>
                                    <div className="mt-2 flex items-center gap-2">
                                        <Award01 className="size-4 text-brand-600" />
                                        <span className="text-sm font-medium text-secondary">{member.role}</span>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-6 grid grid-cols-3 gap-4 rounded-xl bg-secondary p-4">
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">{member.stats.auctions}</div>
                                        <div className="text-xs text-tertiary">Auctions</div>
                                    </div>
                                    <div className="text-center border-x border-tertiary">
                                        <div className="text-lg font-bold text-primary">{member.stats.wins}</div>
                                        <div className="text-xs text-tertiary">Wins</div>
                                    </div>
                                    <div className="text-center">
                                        <div className="text-lg font-bold text-primary">{member.stats.rating}</div>
                                        <div className="text-xs text-tertiary">Rating</div>
                                    </div>
                                </div>

                                {/* Specialty */}
                                <div className="mt-4 rounded-lg bg-brand-primary px-3 py-2 text-center">
                                    <span className="text-xs font-medium text-brand-700">
                                        Specializes in {member.specialty}
                                    </span>
                                </div>

                                {/* View Profile Button */}
                                <Link href={`/profile/${member.username}`} className="mt-4 block">
                                    <Button color="tertiary" size="md" className="w-full justify-center">
                                        View Profile
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* Mobile View All Link */}
                <div className="mt-8 flex justify-center lg:hidden">
                    <Link href="/community/members">
                        <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                            View All Members
                        </Button>
                    </Link>
                </div>
            </div>
        </section>
    );
};
