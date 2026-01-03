"use client";

import Link from "next/link";
import { ArrowRight, CheckVerified01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Avatar } from "@/components/base/avatar/avatar";
import { RatingStars } from "@/components/foundations/rating-stars";

const featuredSellers = [
    {
        id: "seller-1",
        name: "TechDeals Pro",
        avatar: "https://randomuser.me/api/portraits/men/32.jpg",
        rating: 4.9,
        reviews: 3456,
        sales: 15500,
        specialty: "Electronics",
        verified: true,
        topSeller: true,
    },
    {
        id: "seller-2",
        name: "Fashion Forward",
        avatar: "https://randomuser.me/api/portraits/women/44.jpg",
        rating: 5.0,
        reviews: 4892,
        sales: 22900,
        specialty: "Designer Fashion",
        verified: true,
        topSeller: true,
    },
    {
        id: "seller-3",
        name: "Vintage Treasures",
        avatar: "https://randomuser.me/api/portraits/men/45.jpg",
        rating: 4.8,
        reviews: 2567,
        sales: 9700,
        specialty: "Collectibles",
        verified: true,
        topSeller: false,
    },
    {
        id: "seller-4",
        name: "Luxury Timepieces",
        avatar: "https://randomuser.me/api/portraits/women/68.jpg",
        rating: 4.9,
        reviews: 1287,
        sales: 5500,
        specialty: "Watches",
        verified: true,
        topSeller: true,
    },
    {
        id: "seller-5",
        name: "Home Essentials",
        avatar: "https://randomuser.me/api/portraits/men/52.jpg",
        rating: 4.7,
        reviews: 3134,
        sales: 11800,
        specialty: "Home & Garden",
        verified: true,
        topSeller: false,
    },
    {
        id: "seller-6",
        name: "Sports Memorabilia",
        avatar: "https://randomuser.me/api/portraits/women/33.jpg",
        rating: 4.9,
        reviews: 5521,
        sales: 28600,
        specialty: "Sports",
        verified: true,
        topSeller: true,
    },
];

export const FeaturedSellersSection = () => {
    return (
        <section className="bg-primary py-8 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-primary sm:text-xl">
                        Featured Sellers
                    </h2>
                    <Link href="/sellers" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Sellers Grid */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-6">
                    {featuredSellers.map((seller) => (
                        <Link
                            key={seller.id}
                            href={`/seller/${seller.id}`}
                            className="group relative rounded-2xl border border-secondary bg-primary p-4 text-center transition-all duration-300 hover:border-brand-300 hover:shadow-lg"
                        >
                            {/* Top Seller Badge */}
                            {seller.topSeller && (
                                <div className="absolute -top-2 left-1/2 -translate-x-1/2">
                                    <Badge type="pill-color" size="sm" color="warning">
                                        Top Seller
                                    </Badge>
                                </div>
                            )}

                            {/* Avatar */}
                            <div className="relative mx-auto mt-2">
                                <Avatar
                                    size="xl"
                                    src={seller.avatar}
                                    className="ring-2 ring-secondary group-hover:ring-brand-300"
                                />
                                {seller.verified && (
                                    <div className="absolute -bottom-1 -right-1 rounded-full bg-success-500 p-1">
                                        <CheckVerified01 className="size-3 text-white" />
                                    </div>
                                )}
                            </div>

                            {/* Name */}
                            <h3 className="mt-3 text-sm font-semibold text-primary line-clamp-1 group-hover:text-brand-600">
                                {seller.name}
                            </h3>

                            {/* Specialty */}
                            <p className="text-xs text-tertiary">{seller.specialty}</p>

                            {/* Rating */}
                            <div className="mt-2 flex items-center justify-center gap-1">
                                <RatingStars rating={seller.rating} starClassName="size-3" />
                                <span className="text-xs font-medium text-primary">
                                    {seller.rating}
                                </span>
                            </div>

                            {/* Stats */}
                            <div className="mt-3 flex items-center justify-center gap-3 text-xs text-tertiary">
                                <span>{seller.reviews.toLocaleString()} reviews</span>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
};
