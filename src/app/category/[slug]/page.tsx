"use client";

import { useState, useMemo, useEffect } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import {
    ChevronRight,
    Home05,
    Grid01,
    List,
    ChevronDown,
    SearchLg,
    Sliders04,
    X,
    TrendUp01,
    Clock,
    ArrowRight,
    Check,
    Monitor01,
    ShoppingBag01,
    Palette,
    Home01,
    Trophy01,
    Diamond01,
    Star01,
    GamingPad02,
    BookOpen01,
    Truck01,
    FilterLines,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { MarketplaceProductCard } from "@/components/marketplace";
import type { MarketplaceProduct } from "@/components/marketplace";

// Category configuration with metadata
const categoryConfig: Record<string, {
    name: string;
    icon: typeof Monitor01;
    description: string;
    image: string;
    color: string;
    subcategories: { name: string; slug: string; count: number }[];
}> = {
    electronics: {
        name: "Electronics",
        icon: Monitor01,
        description: "Discover the latest gadgets, vintage tech, and cutting-edge electronics from trusted sellers worldwide.",
        image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=1200&h=400&fit=crop",
        color: "from-blue-600 to-indigo-700",
        subcategories: [
            { name: "Smartphones", slug: "smartphones", count: 1250 },
            { name: "Laptops & Computers", slug: "laptops", count: 890 },
            { name: "Cameras & Photography", slug: "cameras", count: 560 },
            { name: "Audio & Headphones", slug: "audio", count: 720 },
            { name: "Gaming Consoles", slug: "gaming", count: 430 },
            { name: "Wearables", slug: "wearables", count: 380 },
            { name: "Vintage Electronics", slug: "vintage", count: 290 },
            { name: "Accessories", slug: "accessories", count: 1100 },
        ],
    },
    fashion: {
        name: "Fashion",
        icon: ShoppingBag01,
        description: "Shop designer clothing, vintage fashion, luxury accessories, and rare streetwear from verified sellers.",
        image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&h=400&fit=crop",
        color: "from-pink-600 to-rose-700",
        subcategories: [
            { name: "Designer Clothing", slug: "designer", count: 980 },
            { name: "Vintage Fashion", slug: "vintage", count: 760 },
            { name: "Streetwear", slug: "streetwear", count: 540 },
            { name: "Handbags & Purses", slug: "handbags", count: 890 },
            { name: "Shoes & Sneakers", slug: "shoes", count: 1200 },
            { name: "Watches", slug: "watches", count: 650 },
            { name: "Sunglasses", slug: "sunglasses", count: 320 },
            { name: "Accessories", slug: "accessories", count: 480 },
        ],
    },
    collectibles: {
        name: "Collectibles",
        icon: Palette,
        description: "Find rare collectibles, trading cards, memorabilia, and unique items for passionate collectors.",
        image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=1200&h=400&fit=crop",
        color: "from-amber-600 to-orange-700",
        subcategories: [
            { name: "Trading Cards", slug: "trading-cards", count: 2100 },
            { name: "Coins & Currency", slug: "coins", count: 890 },
            { name: "Stamps", slug: "stamps", count: 450 },
            { name: "Sports Memorabilia", slug: "sports-memorabilia", count: 670 },
            { name: "Movie & TV Props", slug: "props", count: 340 },
            { name: "Vintage Toys", slug: "vintage-toys", count: 520 },
            { name: "Comic Books", slug: "comics", count: 780 },
            { name: "Autographs", slug: "autographs", count: 290 },
        ],
    },
    "home-garden": {
        name: "Home & Garden",
        icon: Home01,
        description: "Transform your space with furniture, decor, garden essentials, and unique home finds.",
        image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=1200&h=400&fit=crop",
        color: "from-green-600 to-emerald-700",
        subcategories: [
            { name: "Furniture", slug: "furniture", count: 780 },
            { name: "Home Decor", slug: "decor", count: 1200 },
            { name: "Kitchen & Dining", slug: "kitchen", count: 560 },
            { name: "Bedding & Bath", slug: "bedding", count: 420 },
            { name: "Garden & Outdoor", slug: "garden", count: 650 },
            { name: "Lighting", slug: "lighting", count: 380 },
            { name: "Storage & Organization", slug: "storage", count: 290 },
            { name: "Vintage & Antique", slug: "vintage", count: 440 },
        ],
    },
    "sports-outdoors": {
        name: "Sports",
        icon: Trophy01,
        description: "Gear up with sports equipment, outdoor gear, fitness essentials, and athletic memorabilia.",
        image: "https://images.unsplash.com/photo-1461896836934-108b94baa2d2?w=1200&h=400&fit=crop",
        color: "from-red-600 to-rose-700",
        subcategories: [
            { name: "Exercise & Fitness", slug: "fitness", count: 560 },
            { name: "Cycling", slug: "cycling", count: 340 },
            { name: "Golf", slug: "golf", count: 420 },
            { name: "Water Sports", slug: "water-sports", count: 280 },
            { name: "Winter Sports", slug: "winter-sports", count: 190 },
            { name: "Team Sports", slug: "team-sports", count: 450 },
            { name: "Camping & Hiking", slug: "camping", count: 380 },
            { name: "Fishing", slug: "fishing", count: 220 },
        ],
    },
    "jewelry-watches": {
        name: "Jewelry",
        icon: Diamond01,
        description: "Discover fine jewelry, luxury watches, vintage pieces, and precious gemstones from verified sellers.",
        image: "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?w=1200&h=400&fit=crop",
        color: "from-purple-600 to-violet-700",
        subcategories: [
            { name: "Fine Jewelry", slug: "fine-jewelry", count: 890 },
            { name: "Luxury Watches", slug: "luxury-watches", count: 650 },
            { name: "Vintage Jewelry", slug: "vintage", count: 540 },
            { name: "Diamonds", slug: "diamonds", count: 320 },
            { name: "Gold & Silver", slug: "precious-metals", count: 480 },
            { name: "Fashion Jewelry", slug: "fashion", count: 720 },
            { name: "Men's Jewelry", slug: "mens", count: 290 },
            { name: "Watches Accessories", slug: "accessories", count: 180 },
        ],
    },
    "art-antiques": {
        name: "Art & Antiques",
        icon: Star01,
        description: "Explore fine art, antique furniture, rare artifacts, and unique pieces from collectors worldwide.",
        image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=1200&h=400&fit=crop",
        color: "from-slate-600 to-zinc-700",
        subcategories: [
            { name: "Paintings", slug: "paintings", count: 1200 },
            { name: "Sculptures", slug: "sculptures", count: 340 },
            { name: "Prints & Posters", slug: "prints", count: 780 },
            { name: "Antique Furniture", slug: "furniture", count: 450 },
            { name: "Ceramics & Glass", slug: "ceramics", count: 560 },
            { name: "Asian Art", slug: "asian-art", count: 380 },
            { name: "Photography", slug: "photography", count: 290 },
            { name: "Textiles", slug: "textiles", count: 220 },
        ],
    },
    "toys-games": {
        name: "Toys & Games",
        icon: GamingPad02,
        description: "Find vintage toys, board games, video games, and collectible figures for enthusiasts of all ages.",
        image: "https://images.unsplash.com/photo-1558060370-d644479cb6f7?w=1200&h=400&fit=crop",
        color: "from-cyan-600 to-teal-700",
        subcategories: [
            { name: "Action Figures", slug: "action-figures", count: 890 },
            { name: "Board Games", slug: "board-games", count: 560 },
            { name: "Video Games", slug: "video-games", count: 1100 },
            { name: "LEGO & Building", slug: "lego", count: 720 },
            { name: "Dolls & Plush", slug: "dolls", count: 480 },
            { name: "Vintage Toys", slug: "vintage", count: 340 },
            { name: "Die-Cast & Models", slug: "models", count: 290 },
            { name: "Puzzles", slug: "puzzles", count: 180 },
        ],
    },
    "books-media": {
        name: "Books & Media",
        icon: BookOpen01,
        description: "Discover rare books, vinyl records, vintage media, and collectible publications.",
        image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=1200&h=400&fit=crop",
        color: "from-yellow-600 to-amber-700",
        subcategories: [
            { name: "Rare Books", slug: "rare-books", count: 450 },
            { name: "First Editions", slug: "first-editions", count: 280 },
            { name: "Vinyl Records", slug: "vinyl", count: 890 },
            { name: "CDs & DVDs", slug: "cds-dvds", count: 340 },
            { name: "Magazines", slug: "magazines", count: 220 },
            { name: "Comics & Manga", slug: "comics", count: 560 },
            { name: "Sheet Music", slug: "sheet-music", count: 140 },
            { name: "Manuscripts", slug: "manuscripts", count: 90 },
        ],
    },
    automotive: {
        name: "Automotive",
        icon: Truck01,
        description: "Shop classic cars, auto parts, motorcycles, and automotive memorabilia from trusted sellers.",
        image: "https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=1200&h=400&fit=crop",
        color: "from-gray-700 to-slate-800",
        subcategories: [
            { name: "Classic Cars", slug: "classic-cars", count: 180 },
            { name: "Motorcycles", slug: "motorcycles", count: 240 },
            { name: "Parts & Accessories", slug: "parts", count: 890 },
            { name: "Tools & Equipment", slug: "tools", count: 340 },
            { name: "Memorabilia", slug: "memorabilia", count: 220 },
            { name: "Wheels & Tires", slug: "wheels", count: 180 },
            { name: "Electronics", slug: "electronics", count: 290 },
            { name: "Vintage Auto", slug: "vintage", count: 150 },
        ],
    },
};

// Sample products for each category
const generateProducts = (category: string): MarketplaceProduct[] => {
    const categoryProducts: Record<string, MarketplaceProduct[]> = {
        electronics: [
            {
                id: "e1",
                title: "Apple iPhone 15 Pro Max 256GB - Titanium Blue - Factory Unlocked",
                image: "https://images.unsplash.com/photo-1592750475338-74b7b21085ab?w=600",
                currentBid: 1150,
                buyNowPrice: 1299,
                timeLeft: "2h 34m",
                bids: 23,
                seller: { name: "TechDeals", rating: 4.9, verified: true },
                category: "Electronics",
                condition: "new",
                watchers: 156,
                isHot: true,
                freeShipping: true,
                type: "both",
            },
            {
                id: "e2",
                title: "Vintage Leica M6 35mm Film Camera - Excellent Condition",
                image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=600",
                currentBid: 2800,
                timeLeft: "4h 12m",
                bids: 45,
                seller: { name: "CameraVintage", rating: 4.8, verified: true },
                category: "Electronics",
                condition: "good",
                watchers: 89,
                isFeatured: true,
                type: "auction",
            },
            {
                id: "e3",
                title: "Sony PlayStation 5 Disc Edition Console Bundle",
                image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=600",
                buyNowPrice: 549,
                seller: { name: "GameZone", rating: 4.9, verified: true },
                category: "Electronics",
                condition: "new",
                watchers: 78,
                freeShipping: true,
                type: "buy-now",
            },
            {
                id: "e4",
                title: "MacBook Pro 16\" M3 Max 48GB RAM 1TB SSD - Space Black",
                image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=600",
                currentBid: 3100,
                buyNowPrice: 3499,
                timeLeft: "8h 15m",
                bids: 19,
                seller: { name: "AppleReseller", rating: 4.8, verified: true },
                category: "Electronics",
                condition: "new",
                watchers: 167,
                freeShipping: true,
                type: "both",
            },
            {
                id: "e5",
                title: "Bose QuietComfort Ultra Headphones - Black - Brand New",
                image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=600",
                currentBid: 320,
                buyNowPrice: 429,
                timeLeft: "3h 20m",
                bids: 12,
                seller: { name: "AudioWorld", rating: 4.7, verified: true },
                category: "Electronics",
                condition: "new",
                watchers: 67,
                freeShipping: true,
                type: "both",
            },
            {
                id: "e6",
                title: "DJI Mavic 3 Pro Fly More Combo - 4K Drone",
                image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=600",
                buyNowPrice: 2199,
                seller: { name: "DroneWorld", rating: 4.8 },
                category: "Electronics",
                condition: "new",
                watchers: 89,
                freeShipping: true,
                type: "buy-now",
            },
            {
                id: "e7",
                title: "Samsung Galaxy S24 Ultra 512GB - Titanium Black",
                image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=600",
                currentBid: 980,
                buyNowPrice: 1199,
                timeLeft: "5h 45m",
                bids: 18,
                seller: { name: "MobileHub", rating: 4.9, verified: true },
                category: "Electronics",
                condition: "new",
                watchers: 134,
                freeShipping: true,
                type: "both",
            },
            {
                id: "e8",
                title: "Nintendo Switch OLED Model - White",
                image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=600",
                buyNowPrice: 349,
                seller: { name: "GameStation", rating: 4.7 },
                category: "Electronics",
                condition: "new",
                watchers: 56,
                freeShipping: true,
                type: "buy-now",
            },
        ],
        fashion: [
            {
                id: "f1",
                title: "Nike Air Jordan 1 Retro High OG 'Chicago' Size 10 - Deadstock",
                image: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=600",
                currentBid: 580,
                buyNowPrice: 750,
                timeLeft: "1h 45m",
                bids: 31,
                seller: { name: "SneakerVault", rating: 4.7 },
                category: "Fashion",
                condition: "new",
                watchers: 234,
                isHot: true,
                type: "both",
            },
            {
                id: "f2",
                title: "Vintage Chanel Classic Flap Bag Medium - Black Lambskin",
                image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600",
                currentBid: 5200,
                timeLeft: "5h 10m",
                bids: 34,
                seller: { name: "LuxuryBags", rating: 4.9, verified: true },
                category: "Fashion",
                condition: "good",
                watchers: 234,
                isFeatured: true,
                type: "auction",
            },
            {
                id: "f3",
                title: "Gucci GG Marmont Matelassé Shoulder Bag - Dusty Pink",
                image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600",
                currentBid: 1850,
                buyNowPrice: 2200,
                timeLeft: "6h 30m",
                bids: 22,
                seller: { name: "DesignerCloset", rating: 4.8, verified: true },
                category: "Fashion",
                condition: "like-new",
                watchers: 178,
                type: "both",
            },
            {
                id: "f4",
                title: "Louis Vuitton Neverfull MM - Monogram Canvas",
                image: "https://images.unsplash.com/photo-1594223274512-ad4803739b7c?w=600",
                buyNowPrice: 1650,
                seller: { name: "LuxuryFinds", rating: 4.9, verified: true },
                category: "Fashion",
                condition: "good",
                watchers: 145,
                freeShipping: true,
                type: "buy-now",
            },
            {
                id: "f5",
                title: "Yeezy Boost 350 V2 'Zebra' Size 11 - Brand New",
                image: "https://images.unsplash.com/photo-1587563871167-1ee9c731aefb?w=600",
                currentBid: 320,
                buyNowPrice: 420,
                timeLeft: "2h 15m",
                bids: 15,
                seller: { name: "SneakerWorld", rating: 4.6 },
                category: "Fashion",
                condition: "new",
                watchers: 98,
                type: "both",
            },
            {
                id: "f6",
                title: "Hermès Birkin 25 - Togo Leather Gold Hardware",
                image: "https://images.unsplash.com/photo-1566150905458-1bf1fc113f0d?w=600",
                currentBid: 12500,
                timeLeft: "3d 8h",
                bids: 67,
                seller: { name: "HermèsCollector", rating: 5.0, verified: true },
                category: "Fashion",
                condition: "like-new",
                watchers: 567,
                isHot: true,
                isFeatured: true,
                type: "auction",
            },
            {
                id: "f7",
                title: "Rolex Submariner Date - Black Dial Steel",
                image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
                currentBid: 9800,
                buyNowPrice: 12500,
                timeLeft: "4d 2h",
                bids: 45,
                seller: { name: "WatchLuxury", rating: 4.9, verified: true },
                category: "Fashion",
                condition: "good",
                watchers: 345,
                type: "both",
            },
            {
                id: "f8",
                title: "Prada Re-Edition 2005 Nylon Bag - Black",
                image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=600",
                buyNowPrice: 1290,
                seller: { name: "PradaVintage", rating: 4.7 },
                category: "Fashion",
                condition: "new",
                watchers: 89,
                freeShipping: true,
                type: "buy-now",
            },
        ],
        collectibles: [
            {
                id: "c1",
                title: "Pokemon Base Set Booster Box - Factory Sealed 1999",
                image: "https://images.unsplash.com/photo-1613771404721-1f92d799e49f?w=600",
                currentBid: 28000,
                timeLeft: "12h 45m",
                bids: 89,
                seller: { name: "CardCollectors", rating: 4.9, verified: true },
                category: "Collectibles",
                condition: "new",
                watchers: 890,
                isHot: true,
                isFeatured: true,
                type: "auction",
            },
            {
                id: "c2",
                title: "Signed Michael Jordan Rookie Card PSA 10 - 1986 Fleer",
                image: "https://images.unsplash.com/photo-1546519638-68e109498ffc?w=600",
                currentBid: 156000,
                timeLeft: "24h 0m",
                bids: 156,
                seller: { name: "SportsCards", rating: 5.0, verified: true },
                category: "Collectibles",
                condition: "new",
                watchers: 2340,
                isHot: true,
                isFeatured: true,
                type: "auction",
            },
            {
                id: "c3",
                title: "1st Edition Charizard Holo - PSA 9 Mint",
                image: "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=600",
                currentBid: 45000,
                timeLeft: "6h 30m",
                bids: 78,
                seller: { name: "PokemonMaster", rating: 4.9, verified: true },
                category: "Collectibles",
                condition: "new",
                watchers: 1200,
                isHot: true,
                type: "auction",
            },
            {
                id: "c4",
                title: "Vintage Star Wars Action Figure Set - 1977 Original",
                image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600",
                currentBid: 3500,
                buyNowPrice: 4500,
                timeLeft: "2d 4h",
                bids: 34,
                seller: { name: "VintageVault", rating: 4.8 },
                category: "Collectibles",
                condition: "good",
                watchers: 234,
                type: "both",
            },
            {
                id: "c5",
                title: "1964 Kennedy Half Dollar - Proof Set",
                image: "https://images.unsplash.com/photo-1621155346337-1d19476ba7d6?w=600",
                currentBid: 890,
                timeLeft: "8h 15m",
                bids: 23,
                seller: { name: "CoinDealer", rating: 4.7 },
                category: "Collectibles",
                condition: "new",
                watchers: 78,
                type: "auction",
            },
            {
                id: "c6",
                title: "Magic The Gathering Black Lotus - Alpha Edition",
                image: "https://images.unsplash.com/photo-1614680376739-414d95ff43df?w=600",
                currentBid: 125000,
                timeLeft: "5d 12h",
                bids: 234,
                seller: { name: "MTGCollector", rating: 5.0, verified: true },
                category: "Collectibles",
                condition: "good",
                watchers: 3400,
                isFeatured: true,
                type: "auction",
            },
            {
                id: "c7",
                title: "Babe Ruth Signed Baseball - PSA Authenticated",
                image: "https://images.unsplash.com/photo-1471295253337-3ceaaedca402?w=600",
                currentBid: 18500,
                timeLeft: "3d 6h",
                bids: 56,
                seller: { name: "SportsMemorabilia", rating: 4.9, verified: true },
                category: "Collectibles",
                condition: "good",
                watchers: 567,
                type: "auction",
            },
            {
                id: "c8",
                title: "Rare Penny Black Stamp - 1840 First Edition",
                image: "https://images.unsplash.com/photo-1578926078693-4eb3d4499e43?w=600",
                currentBid: 7800,
                buyNowPrice: 9500,
                timeLeft: "4d 18h",
                bids: 28,
                seller: { name: "StampCollector", rating: 4.8 },
                category: "Collectibles",
                condition: "good",
                watchers: 189,
                type: "both",
            },
        ],
    };

    // Default products for categories without specific data
    const defaultProducts: MarketplaceProduct[] = [
        {
            id: "d1",
            title: `Premium ${categoryConfig[category]?.name || 'Item'} - Excellent Condition`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            currentBid: 450,
            buyNowPrice: 599,
            timeLeft: "3h 45m",
            bids: 18,
            seller: { name: "TopSeller", rating: 4.8, verified: true },
            category: categoryConfig[category]?.name || "General",
            condition: "good",
            watchers: 89,
            type: "both",
        },
        {
            id: "d2",
            title: `Vintage ${categoryConfig[category]?.name || 'Item'} - Rare Find`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            currentBid: 780,
            timeLeft: "6h 20m",
            bids: 34,
            seller: { name: "VintageFinds", rating: 4.9, verified: true },
            category: categoryConfig[category]?.name || "General",
            condition: "good",
            watchers: 156,
            isFeatured: true,
            type: "auction",
        },
        {
            id: "d3",
            title: `Brand New ${categoryConfig[category]?.name || 'Item'} - Factory Sealed`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            buyNowPrice: 299,
            seller: { name: "NewItems", rating: 4.7 },
            category: categoryConfig[category]?.name || "General",
            condition: "new",
            watchers: 45,
            freeShipping: true,
            type: "buy-now",
        },
        {
            id: "d4",
            title: `Limited Edition ${categoryConfig[category]?.name || 'Item'} - Collector's Choice`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            currentBid: 1200,
            buyNowPrice: 1500,
            timeLeft: "1d 4h",
            bids: 45,
            seller: { name: "CollectorPro", rating: 4.9, verified: true },
            category: categoryConfig[category]?.name || "General",
            condition: "new",
            watchers: 234,
            isHot: true,
            type: "both",
        },
        {
            id: "d5",
            title: `Professional ${categoryConfig[category]?.name || 'Item'} - Top Quality`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            currentBid: 560,
            timeLeft: "8h 30m",
            bids: 22,
            seller: { name: "ProDeals", rating: 4.6 },
            category: categoryConfig[category]?.name || "General",
            condition: "like-new",
            watchers: 78,
            type: "auction",
        },
        {
            id: "d6",
            title: `Authentic ${categoryConfig[category]?.name || 'Item'} - Verified Seller`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            buyNowPrice: 425,
            seller: { name: "AuthenticGoods", rating: 4.8, verified: true },
            category: categoryConfig[category]?.name || "General",
            condition: "new",
            watchers: 67,
            freeShipping: true,
            type: "buy-now",
        },
        {
            id: "d7",
            title: `Rare ${categoryConfig[category]?.name || 'Item'} - One of a Kind`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            currentBid: 2100,
            timeLeft: "2d 12h",
            bids: 67,
            seller: { name: "RareFinds", rating: 5.0, verified: true },
            category: categoryConfig[category]?.name || "General",
            condition: "good",
            watchers: 345,
            isFeatured: true,
            isHot: true,
            type: "auction",
        },
        {
            id: "d8",
            title: `Premium ${categoryConfig[category]?.name || 'Item'} Bundle - Best Value`,
            image: categoryConfig[category]?.image || "https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=600",
            buyNowPrice: 799,
            seller: { name: "BundleDeals", rating: 4.7 },
            category: categoryConfig[category]?.name || "General",
            condition: "new",
            watchers: 98,
            freeShipping: true,
            type: "buy-now",
        },
    ];

    return categoryProducts[category] || defaultProducts;
};

const sortOptions = [
    { id: "ending-soon", label: "Ending Soon" },
    { id: "newly-listed", label: "Newly Listed" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "most-bids", label: "Most Bids" },
    { id: "most-watched", label: "Most Watched" },
];

export default function CategoryPage() {
    const params = useParams();
    const slug = params.slug as string;
    const category = categoryConfig[slug];

    const [searchQuery, setSearchQuery] = useState("");
    const [sortBy, setSortBy] = useState("ending-soon");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showSortDropdown, setShowSortDropdown] = useState(false);
    const [selectedSubcategory, setSelectedSubcategory] = useState<string | null>(null);

    const products = useMemo(() => generateProducts(slug), [slug]);

    const filteredProducts = useMemo(() => {
        let result = [...products];

        if (searchQuery) {
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        switch (sortBy) {
            case "price-low":
                result.sort(
                    (a, b) =>
                        (a.currentBid || a.buyNowPrice || 0) -
                        (b.currentBid || b.buyNowPrice || 0)
                );
                break;
            case "price-high":
                result.sort(
                    (a, b) =>
                        (b.currentBid || b.buyNowPrice || 0) -
                        (a.currentBid || a.buyNowPrice || 0)
                );
                break;
            case "most-bids":
                result.sort((a, b) => (b.bids || 0) - (a.bids || 0));
                break;
            case "most-watched":
                result.sort((a, b) => (b.watchers || 0) - (a.watchers || 0));
                break;
            default:
                break;
        }

        return result;
    }, [products, searchQuery, sortBy]);

    if (!category) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-bold text-primary mb-4">Category Not Found</h1>
                    <p className="text-tertiary mb-6">The category you're looking for doesn't exist.</p>
                    <Link href="/categories">
                        <Button color="primary">Browse All Categories</Button>
                    </Link>
                </div>
            </div>
        );
    }

    const IconComponent = category.icon;
    const totalItems = category.subcategories.reduce((sum, sub) => sum + sub.count, 0);

    return (
        <div className="min-h-screen bg-primary">
            {/* Subcategories Strip */}
            <div className="border-b border-secondary bg-secondary/30">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center gap-2 py-3 overflow-x-auto scrollbar-hide">
                        <button
                            onClick={() => setSelectedSubcategory(null)}
                            className={cx(
                                "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                !selectedSubcategory
                                    ? "bg-brand-600 text-white"
                                    : "bg-primary border border-secondary text-secondary hover:border-brand-300 hover:text-brand-600"
                            )}
                        >
                            All {category.name}
                        </button>
                        {category.subcategories.map((sub) => (
                            <button
                                key={sub.slug}
                                onClick={() => setSelectedSubcategory(sub.slug)}
                                className={cx(
                                    "px-4 py-2 rounded-full text-sm font-medium whitespace-nowrap transition-all",
                                    selectedSubcategory === sub.slug
                                        ? "bg-brand-600 text-white"
                                        : "bg-primary border border-secondary text-secondary hover:border-brand-300 hover:text-brand-600"
                                )}
                            >
                                {sub.name}
                                <span className="ml-1.5 text-xs opacity-70">({sub.count})</span>
                            </button>
                        ))}
                    </div>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-4">
                    {/* Sidebar */}
                    <div className="hidden lg:block lg:col-span-1">
                        <div className="sticky top-24 space-y-6">
                            {/* Subcategories Card */}
                            <div className="rounded-2xl border border-secondary bg-primary p-5">
                                <h3 className="font-semibold text-primary mb-4">Browse {category.name}</h3>
                                <div className="space-y-1">
                                    {category.subcategories.map((sub) => (
                                        <button
                                            key={sub.slug}
                                            onClick={() => setSelectedSubcategory(sub.slug === selectedSubcategory ? null : sub.slug)}
                                            className={cx(
                                                "w-full flex items-center justify-between px-3 py-2 rounded-lg text-sm transition-colors",
                                                selectedSubcategory === sub.slug
                                                    ? "bg-brand-50 text-brand-700"
                                                    : "text-secondary hover:bg-secondary hover:text-primary"
                                            )}
                                        >
                                            <span>{sub.name}</span>
                                            <span className="text-xs text-tertiary">{sub.count}</span>
                                        </button>
                                    ))}
                                </div>
                            </div>

                            {/* Trending in Category */}
                            <div className="rounded-2xl border border-secondary bg-primary p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <TrendUp01 className="size-5 text-brand-600" />
                                    <h3 className="font-semibold text-primary">Trending Now</h3>
                                </div>
                                <div className="space-y-3">
                                    {category.subcategories.slice(0, 5).map((sub, index) => (
                                        <div key={sub.slug} className="flex items-center justify-between">
                                            <div className="flex items-center gap-2">
                                                <span className="text-xs font-medium text-tertiary w-4">{index + 1}</span>
                                                <span className="text-sm text-primary">{sub.name}</span>
                                            </div>
                                            <span className="text-xs text-success-600">+{Math.floor(Math.random() * 30 + 10)}%</span>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Ending Soon */}
                            <div className="rounded-2xl border border-secondary bg-primary p-5">
                                <div className="flex items-center gap-2 mb-4">
                                    <Clock className="size-5 text-warning-600" />
                                    <h3 className="font-semibold text-primary">Ending Soon</h3>
                                </div>
                                <p className="text-sm text-tertiary mb-4">
                                    Don&apos;t miss out on {category.name.toLowerCase()} auctions ending soon!
                                </p>
                                <Link href={`/auctions/ending-soon?category=${slug}`}>
                                    <Button color="primary" size="md" className="w-full" iconTrailing={ArrowRight}>
                                        View Auctions
                                    </Button>
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Products Grid */}
                    <div className="lg:col-span-3">
                        {/* Toolbar */}
                        <div className="flex items-center gap-4 mb-6 pb-4 border-b border-secondary">
                            {/* Search */}
                            <div className="relative flex-1 max-w-xs">
                                <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                                <input
                                    type="text"
                                    placeholder={`Search ${category.name.toLowerCase()}...`}
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-9 pr-3 py-2 bg-secondary/50 border-0 rounded-lg text-sm text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                />
                            </div>

                            <div className="flex-1" />

                            {/* Results Count */}
                            <span className="hidden sm:block text-sm text-tertiary">
                                {filteredProducts.length} results
                            </span>

                            {/* Sort */}
                            <div className="relative">
                                <button
                                    onClick={() => setShowSortDropdown(!showSortDropdown)}
                                    className="flex items-center gap-1.5 text-sm transition-colors"
                                >
                                    <span className="text-tertiary">Sort:</span>
                                    <span className="text-secondary hover:text-primary">{sortOptions.find((o) => o.id === sortBy)?.label}</span>
                                    <ChevronDown className={cx("size-4 text-tertiary transition-transform", showSortDropdown && "rotate-180")} />
                                </button>
                                {showSortDropdown && (
                                    <>
                                        <div className="fixed inset-0 z-10" onClick={() => setShowSortDropdown(false)} />
                                        <div className="absolute right-0 mt-2 w-44 bg-primary border border-secondary rounded-lg shadow-lg z-20 py-1">
                                            {sortOptions.map((option) => (
                                                <button
                                                    key={option.id}
                                                    onClick={() => {
                                                        setSortBy(option.id);
                                                        setShowSortDropdown(false);
                                                    }}
                                                    className={cx(
                                                        "w-full text-left px-3 py-2 text-sm transition-colors",
                                                        sortBy === option.id
                                                            ? "bg-brand-50 text-brand-600"
                                                            : "text-secondary hover:bg-secondary"
                                                    )}
                                                >
                                                    {option.label}
                                                </button>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* View Toggle */}
                            <div className="hidden sm:flex items-center gap-1 border-l border-secondary pl-4">
                                <button
                                    onClick={() => setViewMode("grid")}
                                    className={cx(
                                        "p-1.5 rounded transition-colors",
                                        viewMode === "grid" ? "text-primary bg-secondary" : "text-tertiary hover:text-secondary"
                                    )}
                                >
                                    <Grid01 className="size-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode("list")}
                                    className={cx(
                                        "p-1.5 rounded transition-colors",
                                        viewMode === "list" ? "text-primary bg-secondary" : "text-tertiary hover:text-secondary"
                                    )}
                                >
                                    <List className="size-5" />
                                </button>
                            </div>
                        </div>

                        {/* Products */}
                        {filteredProducts.length > 0 ? (
                            <div
                                className={cx(
                                    viewMode === "grid"
                                        ? "grid grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-4"
                                        : "flex flex-col gap-4"
                                )}
                            >
                                {filteredProducts.map((product) => (
                                    <MarketplaceProductCard
                                        key={product.id}
                                        product={product}
                                        view={viewMode}
                                    />
                                ))}
                            </div>
                        ) : (
                            <div className="text-center py-20">
                                <div className="w-16 h-16 rounded-full bg-brand-50 flex items-center justify-center mx-auto mb-4">
                                    <FilterLines className="size-8 text-brand-600" />
                                </div>
                                <h3 className="text-lg font-semibold text-primary mb-2">
                                    No results found
                                </h3>
                                <p className="text-tertiary mb-6 max-w-sm mx-auto">
                                    Try adjusting your search to find what you&apos;re looking for.
                                </p>
                                <Button color="secondary" onClick={() => setSearchQuery("")}>
                                    Clear search
                                </Button>
                            </div>
                        )}

                        {/* Load More */}
                        {filteredProducts.length > 0 && (
                            <div className="mt-8 text-center">
                                <Button color="secondary" size="lg">
                                    Load More {category.name}
                                </Button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Related Categories */}
            <div className="relative overflow-hidden border-t border-secondary bg-gradient-to-b from-secondary/30 to-primary">
                {/* Background decoration */}
                <div className="absolute inset-0 pointer-events-none">
                    <div className="absolute top-0 left-1/4 w-96 h-96 bg-brand-500/5 rounded-full blur-3xl" />
                    <div className="absolute bottom-0 right-1/4 w-80 h-80 bg-purple-500/5 rounded-full blur-3xl" />
                </div>

                <div className="relative mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20">
                    {/* Section Header */}
                    <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
                        <div>
                            <p className="text-sm font-medium text-brand-600 mb-2">Discover More</p>
                            <h2 className="text-2xl sm:text-3xl font-bold text-primary">
                                Explore More Categories
                            </h2>
                            <p className="mt-2 text-tertiary max-w-lg">
                                Browse our curated selection of categories and find your next treasure
                            </p>
                        </div>
                        <Link href="/categories">
                            <Button color="secondary" size="md" iconTrailing={ArrowRight}>
                                View All Categories
                            </Button>
                        </Link>
                    </div>

                    {/* Categories Grid */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
                        {Object.entries(categoryConfig)
                            .filter(([key]) => key !== slug)
                            .slice(0, 5)
                            .map(([key, cat]) => {
                                const CatIcon = cat.icon;
                                const catTotalItems = cat.subcategories.reduce((sum, sub) => sum + sub.count, 0);
                                return (
                                    <Link
                                        key={key}
                                        href={`/category/${key}`}
                                        className="group relative overflow-hidden rounded-2xl border border-secondary bg-primary hover:border-brand-300 hover:shadow-xl transition-all duration-300"
                                    >
                                        {/* Background Image */}
                                        <div className="absolute inset-0">
                                            <Image
                                                src={cat.image}
                                                alt={cat.name}
                                                fill
                                                className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                            />
                                            <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/80 to-gray-900/60 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                                        </div>

                                        <div className="relative p-6">
                                            {/* Icon */}
                                            <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${cat.color} flex items-center justify-center mb-4 shadow-lg group-hover:scale-110 transition-transform duration-300`}>
                                                <CatIcon className="size-7 text-white" />
                                            </div>

                                            {/* Content */}
                                            <h3 className="text-lg font-semibold text-primary group-hover:text-white transition-colors duration-300">
                                                {cat.name}
                                            </h3>
                                            <p className="mt-1 text-sm text-tertiary group-hover:text-white/70 transition-colors duration-300">
                                                {catTotalItems.toLocaleString()}+ items
                                            </p>

                                            {/* Arrow indicator */}
                                            <div className="mt-4 flex items-center gap-2 text-sm font-medium text-brand-600 group-hover:text-white transition-colors duration-300">
                                                <span>Browse</span>
                                                <ArrowRight className="size-4 group-hover:translate-x-1 transition-transform" />
                                            </div>

                                            {/* Hover ring effect */}
                                            <div className="absolute inset-0 rounded-2xl ring-2 ring-brand-500 opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
                                        </div>
                                    </Link>
                                );
                            })}
                    </div>

                    {/* Bottom CTA */}
                    <div className="mt-12 text-center">
                        <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-secondary/50 border border-secondary">
                            <span className="text-sm text-tertiary">Looking for something specific?</span>
                            <Link href="/categories" className="text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors">
                                Browse all {Object.keys(categoryConfig).length} categories
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
