"use client";

import Link from "next/link";
import { ArrowRight, Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { MarketplaceProductCard, MarketplaceProduct } from "@/components/marketplace/MarketplaceProductCard";

const featuredProducts: MarketplaceProduct[] = [
    {
        id: "featured-1",
        title: "Authenticated Banksy Print - Girl with Balloon",
        image: "https://images.unsplash.com/photo-1541961017774-22349e4a1262?w=400&h=500&fit=crop",
        currentBid: 15000,
        startingPrice: 12000,
        timeLeft: "5d 8h",
        bids: 18,
        seller: { name: "CertifiedArt", rating: 5.0, verified: true },
        category: "Art",
        condition: "like-new",
        watchers: 656,
        isFeatured: true,
        type: "auction",
    },
    {
        id: "featured-2",
        title: "PSA 10 Gem Mint 1st Edition Charizard",
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=400&h=500&fit=crop",
        currentBid: 28000,
        startingPrice: 22000,
        timeLeft: "7d 12h",
        bids: 25,
        seller: { name: "GradedCards", rating: 4.9, verified: true },
        category: "Trading Cards",
        condition: "new",
        watchers: 989,
        isHot: true,
        type: "auction",
    },
    {
        id: "featured-3",
        title: "CGC 9.8 Amazing Spider-Man #300 - Signed",
        image: "https://images.unsplash.com/photo-1612036782180-6f0b6cd846fe?w=400&h=500&fit=crop",
        currentBid: 4200,
        startingPrice: 3500,
        timeLeft: "3d 4h",
        bids: 34,
        seller: { name: "ComicVault", rating: 4.8, verified: true },
        category: "Comics",
        condition: "like-new",
        watchers: 445,
        type: "auction",
    },
    {
        id: "featured-4",
        title: "GIA Certified 2ct Diamond Engagement Ring",
        image: "https://images.unsplash.com/photo-1605100804763-247f67b3557e?w=400&h=500&fit=crop",
        currentBid: 18500,
        buyNowPrice: 22000,
        startingPrice: 15000,
        timeLeft: "4d 16h",
        bids: 11,
        seller: { name: "CertifiedGems", rating: 5.0, verified: true },
        category: "Jewelry",
        condition: "new",
        watchers: 378,
        freeShipping: true,
        type: "both",
    },
    {
        id: "featured-5",
        title: "Authenticated Signed Michael Jackson Thriller LP",
        image: "https://images.unsplash.com/photo-1514924013411-cbf25faa35bb?w=400&h=500&fit=crop",
        currentBid: 5500,
        startingPrice: 4000,
        timeLeft: "2d 8h",
        bids: 29,
        seller: { name: "MusicMemorabilia", rating: 4.7, verified: true },
        category: "Music",
        condition: "good",
        watchers: 256,
        isHot: true,
        type: "auction",
    },
];

export const FeaturedCollectionSection = () => {
    return (
        <section className="relative overflow-hidden bg-gradient-to-br from-brand-700 via-brand-600 to-brand-800 py-8 lg:py-6">
            {/* Background Pattern */}
            <div
                className="pointer-events-none absolute inset-0 opacity-10"
                style={{
                    backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%23ffffff' fill-opacity='0.4'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
                }}
            />

            {/* Glow Effects */}
            <div className="absolute -top-40 -right-40 size-96 rounded-full bg-white/10 blur-3xl" />
            <div className="absolute -bottom-40 -left-40 size-96 rounded-full bg-white/10 blur-3xl" />

            <div className="relative mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-center justify-between">
                    <h2 className="text-lg font-semibold text-white sm:text-xl">
                        Featured Collection
                    </h2>
                    <Link href="/featured" className="flex items-center gap-1 text-sm font-medium text-white hover:text-brand-200">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {featuredProducts.map((product) => (
                        <MarketplaceProductCard key={product.id} product={product} transparentBorder />
                    ))}
                </div>
            </div>
        </section>
    );
};
