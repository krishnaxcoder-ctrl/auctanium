"use client";

import Link from "next/link";
import { ArrowRight, MessageCircle01, Users01, Eye, MessageSquare01, ThumbsUp } from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Badge } from "@/components/base/badges/badges";

const forums = [
    {
        id: 1,
        title: "General Discussion",
        description: "Talk about anything auction-related",
        icon: MessageCircle01,
        color: "brand",
        stats: {
            topics: 1234,
            posts: 45678,
            members: 12500,
        },
        latestPost: {
            title: "Best strategies for last-minute bidding?",
            author: "Sarah M.",
            avatar: "https://randomuser.me/api/portraits/women/44.jpg",
            time: "5 min ago",
            replies: 23,
        },
        trending: true,
    },
    {
        id: 2,
        title: "Collector's Corner",
        description: "Share your collections and finds",
        icon: Users01,
        color: "success",
        stats: {
            topics: 892,
            posts: 23456,
            members: 8900,
        },
        latestPost: {
            title: "My vintage watch collection - 20 years in the making",
            author: "Marcus C.",
            avatar: "https://randomuser.me/api/portraits/men/32.jpg",
            time: "12 min ago",
            replies: 45,
        },
        trending: false,
    },
    {
        id: 3,
        title: "Authentication & Grading",
        description: "Get help verifying your items",
        icon: Eye,
        color: "warning",
        stats: {
            topics: 567,
            posts: 12345,
            members: 5600,
        },
        latestPost: {
            title: "How to spot fake designer handbags",
            author: "Elena R.",
            avatar: "https://randomuser.me/api/portraits/women/68.jpg",
            time: "1 hour ago",
            replies: 67,
        },
        trending: true,
    },
    {
        id: 4,
        title: "Success Stories",
        description: "Share your winning moments",
        icon: ThumbsUp,
        color: "purple",
        stats: {
            topics: 423,
            posts: 8901,
            members: 7800,
        },
        latestPost: {
            title: "Won my dream guitar for 60% off retail!",
            author: "James W.",
            avatar: "https://randomuser.me/api/portraits/men/22.jpg",
            time: "2 hours ago",
            replies: 89,
        },
        trending: false,
    },
];

export const CommunityForumsSection = () => {
    return (
        <section id="forums" className="bg-secondary py-16 lg:py-20">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-end justify-between">
                    <div>
                        <h2 className="text-display-xs font-semibold text-primary sm:text-display-sm">
                            Community Forums
                        </h2>
                        <p className="mt-3 text-lg text-tertiary">
                            Join discussions, ask questions, and share your expertise
                        </p>
                    </div>
                    <Link href="/community/forums" className="hidden items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700 lg:flex">
                        View All Forums
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Forums Grid */}
                <div className="mt-12 grid grid-cols-1 gap-6 lg:grid-cols-2">
                    {forums.map((forum) => (
                        <Link
                            key={forum.id}
                            href={`/community/forums/${forum.id}`}
                            className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary p-6 transition-all duration-300 hover:scale-[1.02] hover:border-brand-400 hover:shadow-xl"
                        >
                            {/* Background gradient on hover */}
                            <div className="absolute inset-0 bg-gradient-to-br from-brand-50 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

                            <div className="relative">
                                {/* Header */}
                                <div className="flex items-start justify-between">
                                    <div className="flex items-center gap-4">
                                        <div className={`rounded-xl bg-${forum.color}-primary p-3`}>
                                            <forum.icon className={`size-6 text-${forum.color}-600`} />
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2">
                                                <h3 className="text-lg font-semibold text-primary">{forum.title}</h3>
                                                {forum.trending && (
                                                    <Badge type="pill-color" size="sm" color="error">
                                                        Hot
                                                    </Badge>
                                                )}
                                            </div>
                                            <p className="mt-1 text-sm text-tertiary">{forum.description}</p>
                                        </div>
                                    </div>
                                </div>

                                {/* Stats */}
                                <div className="mt-6 flex items-center gap-6 rounded-xl bg-secondary p-4">
                                    <div>
                                        <div className="text-lg font-bold text-primary">{forum.stats.topics.toLocaleString()}</div>
                                        <div className="text-xs text-tertiary">Topics</div>
                                    </div>
                                    <div className="h-8 w-px bg-tertiary" />
                                    <div>
                                        <div className="text-lg font-bold text-primary">{forum.stats.posts.toLocaleString()}</div>
                                        <div className="text-xs text-tertiary">Posts</div>
                                    </div>
                                    <div className="h-8 w-px bg-tertiary" />
                                    <div>
                                        <div className="text-lg font-bold text-primary">{forum.stats.members.toLocaleString()}</div>
                                        <div className="text-xs text-tertiary">Members</div>
                                    </div>
                                </div>

                                {/* Latest Post */}
                                <div className="mt-6 rounded-xl border border-secondary bg-secondary/50 p-4">
                                    <div className="flex items-start gap-3">
                                        <Avatar size="sm" src={forum.latestPost.avatar} />
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-primary line-clamp-1">
                                                {forum.latestPost.title}
                                            </p>
                                            <div className="mt-1 flex items-center gap-2 text-xs text-tertiary">
                                                <span>{forum.latestPost.author}</span>
                                                <span>•</span>
                                                <span>{forum.latestPost.time}</span>
                                                <span>•</span>
                                                <div className="flex items-center gap-1">
                                                    <MessageSquare01 className="size-3" />
                                                    <span>{forum.latestPost.replies}</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Arrow indicator */}
                                <div className="mt-4 flex items-center justify-end text-sm font-medium text-brand-600 transition-transform duration-300 group-hover:translate-x-1">
                                    <span>Browse Forum</span>
                                    <ArrowRight className="ml-1 size-4" />
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
