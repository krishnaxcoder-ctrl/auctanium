"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    Heart,
    Clock,
    Trash01,
    ArrowRight,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

const tabs = [
    { id: "all", label: "All" },
    { id: "objects", label: "Objects" },
    { id: "searches", label: "Searches" },
    { id: "collections", label: "Collections" },
    { id: "auctions", label: "Auctions" },
    { id: "sellers", label: "Sellers" },
];

interface WishlistItem {
    id: string;
    title: string;
    image: string;
    currentBid?: number;
    buyNowPrice?: number;
    timeLeft?: string;
    bids?: number;
    seller: {
        name: string;
        rating: number;
    };
}

const initialWishlist: WishlistItem[] = [
    {
        id: "1",
        title: "Bose QuietComfort Ultra Headphones - Premium Sound",
        image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=500&fit=crop",
        currentBid: 320,
        timeLeft: "3h 45m",
        bids: 15,
        seller: { name: "AudioWorld", rating: 4.9 },
    },
    {
        id: "2",
        title: "iPad Pro 12.9\" M2 256GB - Space Gray",
        image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=400&h=500&fit=crop",
        currentBid: 890,
        timeLeft: "8h 12m",
        bids: 22,
        seller: { name: "TechDeals", rating: 4.8 },
    },
    {
        id: "3",
        title: "DJI Mavic 3 Pro Drone - Fly More Combo",
        image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=400&h=500&fit=crop",
        currentBid: 1650,
        timeLeft: "2d 5h",
        bids: 31,
        seller: { name: "DroneWorld", rating: 4.7 },
    },
    {
        id: "4",
        title: "Samsung 65\" OLED 4K Smart TV",
        image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=400&h=500&fit=crop",
        currentBid: 1200,
        timeLeft: "1d 8h",
        bids: 18,
        seller: { name: "ElectroHub", rating: 4.9 },
    },
    {
        id: "5",
        title: "Vintage Rolex Datejust 36mm - 1985",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=500&fit=crop",
        currentBid: 8500,
        timeLeft: "6h 30m",
        bids: 67,
        seller: { name: "LuxuryWatches", rating: 5.0 },
    },
    {
        id: "6",
        title: "Herman Miller Aeron Chair - Size B",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=500&fit=crop",
        buyNowPrice: 780,
        bids: 8,
        seller: { name: "OfficePro", rating: 4.6 },
    },
];

export default function WishlistPage() {
    const [activeTab, setActiveTab] = useState("all");
    const [wishlist, setWishlist] = useState(initialWishlist);

    const removeFromWishlist = (id: string) => {
        setWishlist(wishlist.filter((item) => item.id !== id));
    };

    return (
        <div className="min-h-screen bg-primary">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
                {/* Header */}
                <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
                    <div className="flex items-center gap-3">
                        <div className="p-3 bg-red-50 rounded-full">
                            <Heart className="size-6 text-red-500" />
                        </div>
                        <div>
                            <h1 className="text-lg font-semibold text-primary">My bids & favourites</h1>
                            <p className="text-sm text-tertiary">
                                {wishlist.length} {wishlist.length === 1 ? "item" : "items"} saved
                            </p>
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="flex items-center gap-2 overflow-x-auto scrollbar-hide">
                        {tabs.map((tab) => (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={cx(
                                    "px-4 py-2 text-sm font-medium whitespace-nowrap rounded-full transition-all",
                                    activeTab === tab.id
                                        ? "bg-gray-900 text-white"
                                        : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                                )}
                            >
                                {tab.label}
                            </button>
                        ))}
                    </div>
                </div>

                {/* Wishlist Grid */}
                {wishlist.length > 0 ? (
                    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-2">
                        {wishlist.map((item) => (
                            <div
                                key={item.id}
                                className="group bg-primary border border-secondary rounded-xl overflow-hidden"
                            >
                                <Link href={`/listing/${item.id}`} className="block">
                                    <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                                        <Image
                                            src={item.image}
                                            alt={item.title}
                                            fill
                                            className="object-cover group-hover:scale-105 transition-transform duration-300"
                                        />
                                        {/* Time badge */}
                                        {item.timeLeft && (
                                            <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                                                <Clock className="size-3" />
                                                {item.timeLeft}
                                            </div>
                                        )}
                                        {/* Remove button */}
                                        <button
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                removeFromWishlist(item.id);
                                            }}
                                            className="absolute top-2 right-2 p-2 rounded-full bg-red-50 cursor-pointer"
                                        >
                                            <Heart className="size-4 text-red-500 fill-red-500" />
                                        </button>
                                    </div>
                                </Link>

                                <div className="p-3">
                                    <Link href={`/listing/${item.id}`}>
                                        <h3 className="text-sm font-medium text-primary line-clamp-2 hover:text-brand-600 min-h-[2.5rem]">
                                            {item.title}
                                        </h3>
                                    </Link>

                                    <div className="mt-2 flex items-end justify-between">
                                        <div>
                                            <p className="text-xs text-tertiary">
                                                {item.currentBid ? "Current Bid" : "Buy Now"}
                                            </p>
                                            <p className="text-lg font-bold text-primary">
                                                ${(item.currentBid || item.buyNowPrice || 0).toLocaleString()}
                                            </p>
                                        </div>
                                        {item.bids && (
                                            <p className="text-xs text-tertiary">{item.bids} bids</p>
                                        )}
                                    </div>

                                    <div className="mt-3 flex gap-2">
                                        <Link href={`/listing/${item.id}`} className="flex-1">
                                            <Button color="primary" size="sm" className="w-full">
                                                {item.currentBid ? "Bid Now" : "Buy Now"}
                                            </Button>
                                        </Link>
                                        <button
                                            onClick={() => removeFromWishlist(item.id)}
                                            className="flex items-center justify-center size-9 rounded-lg border border-secondary text-tertiary hover:text-red-500 hover:border-red-300"
                                        >
                                            <Trash01 className="size-4" />
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    /* Empty State */
                    <div className="text-center py-20">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center mx-auto mb-6">
                            <Heart className="size-10 text-gray-400" />
                        </div>
                        <h2 className="text-xl font-semibold text-primary mb-2">
                            Your wishlist is empty
                        </h2>
                        <p className="text-tertiary mb-6 max-w-sm mx-auto">
                            Start adding items you love by clicking the heart icon on products.
                        </p>
                        <Link href="/marketplace">
                            <Button color="primary" size="lg">
                                Explore Marketplace
                                <ArrowRight className="size-5 ml-2" />
                            </Button>
                        </Link>
                    </div>
                )}
            </div>
        </div>
    );
}
