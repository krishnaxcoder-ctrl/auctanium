"use client";

import Link from "next/link";
import { ArrowRight, CheckVerified01, Award01 } from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { MarketplaceProductCard, MarketplaceProduct } from "@/components/marketplace/MarketplaceProductCard";

const certifiedItems: MarketplaceProduct[] = [
    {
        id: "cert-1",
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
        id: "cert-2",
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
        id: "cert-3",
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
        id: "cert-4",
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
        id: "cert-5",
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

export const CertifiedItemsSection = () => {
    return (
        <section className="bg-primary py-8 lg:py-6">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                {/* Header */}
                <div className="flex items-start justify-between">
                    <div>
                        <h2 className="text-lg font-semibold text-primary sm:text-xl">
                            Certified & Authenticated Items
                        </h2>
                        <div className="mt-2 hidden sm:flex items-center gap-4">
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Award01 className="size-4 text-brand-500" />
                                <span>PSA Certified</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Award01 className="size-4 text-brand-500" />
                                <span>CGC Graded</span>
                            </div>
                            <div className="flex items-center gap-2 text-sm text-secondary">
                                <Award01 className="size-4 text-brand-500" />
                                <span>GIA Certified</span>
                            </div>
                        </div>
                    </div>
                    <Link href="/certified" className="flex items-center gap-1 text-sm font-medium text-brand-600 hover:text-brand-700">
                        See All
                        <ArrowRight className="size-4" />
                    </Link>
                </div>

                {/* Products Grid */}
                <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
                    {certifiedItems.map((product) => (
                        <MarketplaceProductCard key={product.id} product={product} />
                    ))}
                </div>
            </div>
        </section>
    );
};
