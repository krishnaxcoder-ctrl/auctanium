"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Users01, MessageCircle01, BookOpen02, Award01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

const communityStats = [
    { label: "Active Members", value: "50,000+" },
    { label: "Daily Discussions", value: "1,200+" },
    { label: "Expert Contributors", value: "500+" },
    { label: "Learning Resources", value: "2,000+" },
];

const communityFeatures = [
    {
        icon: MessageCircle01,
        title: "Discussion Forums",
        description: "Connect with fellow collectors and share insights",
    },
    {
        icon: BookOpen02,
        title: "Expert Guides",
        description: "Learn from industry professionals and experts",
    },
    {
        icon: Award01,
        title: "Earn Rewards",
        description: "Get badges and perks for active participation",
    },
];

export const JoinCommunitySection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-brand-800 py-8 lg:py-6">
            {/* Background Pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Glow Effects */}
            <div className="absolute -top-40 -right-40 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
                    {/* Left Content */}
                    <div>
                        <h2 className="text-lg font-semibold text-white sm:text-xl">
                            Join Our Thriving Community
                        </h2>
                        <p className="mt-2 text-sm text-brand-100">
                            Connect with thousands of collectors, investors, and enthusiasts. Share knowledge, discover opportunities, and grow your collection together.
                        </p>

                        {/* Stats */}
                        <div className="mt-4 grid grid-cols-2 gap-3">
                            {communityStats.map((stat) => (
                                <div key={stat.label} className="rounded-xl bg-white/10 p-4 backdrop-blur-sm">
                                    <p className="text-2xl font-bold text-white">{stat.value}</p>
                                    <p className="text-sm text-brand-200">{stat.label}</p>
                                </div>
                            ))}
                        </div>

                        {/* CTA */}
                        <div className="mt-5 flex flex-col gap-3 sm:flex-row">
                            <Link href="/community">
                                <Button
                                    size="md"
                                    iconTrailing={ArrowRight}
                                    className="w-full bg-white text-brand-700 hover:bg-brand-50 sm:w-auto text-sm"
                                >
                                    Join Community
                                </Button>
                            </Link>
                            <Link href="/learn">
                                <Button
                                    size="md"
                                    className="w-full border-white/30 bg-transparent text-white hover:bg-white/10 sm:w-auto text-sm"
                                >
                                    Explore Resources
                                </Button>
                            </Link>
                        </div>
                    </div>

                    {/* Right Content - Features */}
                    <div className="space-y-4">
                        {communityFeatures.map((feature) => (
                            <div
                                key={feature.title}
                                className="flex items-start gap-4 rounded-2xl bg-white/10 p-5 backdrop-blur-sm transition-all duration-300 hover:bg-white/20"
                            >
                                <div className="flex size-12 shrink-0 items-center justify-center rounded-xl bg-white/20">
                                    <feature.icon className="size-6 text-white" />
                                </div>
                                <div>
                                    <h3 className="text-lg font-semibold text-white">
                                        {feature.title}
                                    </h3>
                                    <p className="mt-1 text-brand-200">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        ))}

                        {/* Community Avatars */}
                        <div className="flex items-center gap-3 rounded-2xl bg-white/10 p-5 backdrop-blur-sm">
                            <div className="flex -space-x-3">
                                <Avatar
                                    size="md"
                                    src="https://randomuser.me/api/portraits/women/44.jpg"
                                    className="ring-2 ring-brand-600"
                                />
                                <Avatar
                                    size="md"
                                    src="https://randomuser.me/api/portraits/men/32.jpg"
                                    className="ring-2 ring-brand-600"
                                />
                                <Avatar
                                    size="md"
                                    src="https://randomuser.me/api/portraits/women/68.jpg"
                                    className="ring-2 ring-brand-600"
                                />
                                <Avatar
                                    size="md"
                                    src="https://randomuser.me/api/portraits/men/45.jpg"
                                    className="ring-2 ring-brand-600"
                                />
                                <Avatar
                                    size="md"
                                    initials="+5K"
                                    className="ring-2 ring-brand-600"
                                />
                            </div>
                            <p className="text-sm text-brand-100">
                                Join <span className="font-semibold text-white">5,000+</span> members who joined this month
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
