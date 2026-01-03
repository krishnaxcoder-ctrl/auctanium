"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowRight, Play, Headphones02, BookOpen02, Users01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

export const FeaturedPromotionsBanner = () => {
    return (
        <section className="bg-secondary py-8 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {/* Podcast Promotion */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-6 lg:p-8">
                        {/* Background Pattern */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        <div className="relative flex flex-col h-full">
                            <Badge type="pill-color" size="sm" color="warning" className="w-fit">
                                <span className="flex items-center gap-1.5">
                                    <Headphones02 className="size-3.5" />
                                    Podcast
                                </span>
                            </Badge>

                            <h3 className="mt-3 text-lg font-semibold text-white lg:text-xl">
                                The Precious Metals Hour
                            </h3>
                            <p className="mt-2 text-sm text-brand-100 max-w-md">
                                Join our weekly podcast where experts discuss market trends, investment strategies, and collector tips.
                            </p>

                            <div className="mt-4 flex items-center gap-3">
                                <Link href="/podcast">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        iconLeading={Play}
                                        className="bg-white text-brand-700 hover:bg-brand-50 text-sm"
                                    >
                                        Listen Now
                                    </Button>
                                </Link>
                                <span className="text-sm text-brand-200">
                                    New episode every Friday
                                </span>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-8 -right-8 size-40 rounded-full bg-white/10 blur-2xl" />
                        </div>
                    </div>

                    {/* Education Spotlight */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-success-600 to-success-800 p-6 lg:p-8">
                        {/* Background Pattern */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        <div className="relative flex flex-col h-full">
                            <Badge type="pill-color" size="sm" color="brand" className="w-fit">
                                <span className="flex items-center gap-1.5">
                                    <BookOpen02 className="size-3.5" />
                                    Learn
                                </span>
                            </Badge>

                            <h3 className="mt-3 text-lg font-semibold text-white lg:text-xl">
                                Collector's Academy
                            </h3>
                            <p className="mt-2 text-sm text-success-100 max-w-md">
                                Master the art of coin collecting with our comprehensive guides, video tutorials, and expert advice.
                            </p>

                            <div className="mt-4 flex items-center gap-3">
                                <Link href="/learn">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        iconTrailing={ArrowRight}
                                        className="bg-white text-success-700 hover:bg-success-50 text-sm"
                                    >
                                        Start Learning
                                    </Button>
                                </Link>
                                <span className="text-sm text-success-200">
                                    50+ free courses
                                </span>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-8 -right-8 size-40 rounded-full bg-white/10 blur-2xl" />
                        </div>
                    </div>

                    {/* Community Events */}
                    <div className="group relative overflow-hidden rounded-2xl bg-gradient-to-br from-warning-600 to-warning-800 p-6 lg:p-8">
                        {/* Background Pattern */}
                        <div
                            className="pointer-events-none absolute inset-0 opacity-10"
                            style={{
                                backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                            }}
                        />

                        <div className="relative flex flex-col h-full">
                            <Badge type="pill-color" size="sm" color="error" className="w-fit">
                                <span className="flex items-center gap-1.5">
                                    <Users01 className="size-3.5" />
                                    Community
                                </span>
                            </Badge>

                            <h3 className="mt-3 text-lg font-semibold text-white lg:text-xl">
                                Live Auction Events
                            </h3>
                            <p className="mt-2 text-sm text-warning-100 max-w-md">
                                Join exclusive live auction events with rare collectibles, special guests, and amazing deals you won't find anywhere else.
                            </p>

                            <div className="mt-4 flex items-center gap-3">
                                <Link href="/events">
                                    <Button
                                        color="secondary"
                                        size="md"
                                        iconTrailing={ArrowRight}
                                        className="bg-white text-warning-700 hover:bg-warning-50 text-sm"
                                    >
                                        View Events
                                    </Button>
                                </Link>
                                <span className="text-sm text-warning-200">
                                    Next event in 3 days
                                </span>
                            </div>

                            {/* Decorative Element */}
                            <div className="absolute -bottom-8 -right-8 size-40 rounded-full bg-white/10 blur-2xl" />
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
};
