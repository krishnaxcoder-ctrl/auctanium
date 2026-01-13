"use client";

import { useState } from "react";
import {
    SearchLg,
    Monitor01,
    ShoppingBag01,
    Star01,
    Home01,
    Settings01,
    Gift01,
    Diamond01,
    BookOpen01,
    Zap,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

interface MarketplaceHeroProps {
    onSearch: (query: string) => void;
    onCategorySelect: (category: string) => void;
    selectedCategory?: string;
}

const quickCategories = [
    { id: "all", label: "All Items", icon: Zap },
    { id: "electronics", label: "Electronics", icon: Monitor01 },
    { id: "fashion", label: "Fashion", icon: ShoppingBag01 },
    { id: "collectibles", label: "Collectibles", icon: Star01 },
    { id: "home", label: "Home", icon: Home01 },
    { id: "automotive", label: "Auto", icon: Settings01 },
    { id: "toys", label: "Toys", icon: Gift01 },
    { id: "jewelry", label: "Jewelry", icon: Diamond01 },
    { id: "books", label: "Books", icon: BookOpen01 },
];

const trendingSearches = [
    "iPhone 15 Pro",
    "Samsung S24",
    "PS5 Console",
    "OnePlus 12",
    "boAt Earbuds",
    "MacBook Air",
];

export function MarketplaceHero({
    onSearch,
    onCategorySelect,
    selectedCategory = "all",
}: MarketplaceHeroProps) {
    const [searchQuery, setSearchQuery] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        onSearch(searchQuery);
    };

    const handleTrendingClick = (term: string) => {
        setSearchQuery(term);
        onSearch(term);
    };

    return (
        <div className="bg-gradient-to-br from-[#000080]/5 via-white to-[#898989]/5 border-b border-secondary">
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-8 lg:py-12">
                {/* Title */}
                <div className="text-center mb-8">
                    <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-2">
                        Discover <span className="text-[#000080]">Amazing Deals</span>
                    </h1>
                    <p className="text-[#898989] text-lg">
                        Bid, buy, and win from millions of unique items
                    </p>
                </div>

                {/* Search Bar */}
                <form onSubmit={handleSearch} className="max-w-2xl mx-auto mb-8">
                    <div
                        className={cx(
                            "relative flex items-center bg-white rounded-2xl transition-all duration-300",
                            isFocused
                                ? "shadow-xl ring-2 ring-[#000080]/20"
                                : "shadow-lg hover:shadow-xl"
                        )}
                    >
                        <SearchLg className="absolute left-4 size-5 text-[#898989]" />
                        <input
                            type="text"
                            placeholder="Search for anything..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full py-4 pl-12 pr-32 text-base bg-transparent rounded-2xl focus:outline-none text-primary placeholder:text-[#898989]"
                        />
                        <button
                            type="submit"
                            className="absolute right-2 px-6 py-2.5 bg-[#000080] text-white font-semibold rounded-xl hover:bg-[#000060] transition-colors"
                        >
                            Search
                        </button>
                    </div>
                </form>

                {/* Trending Searches */}
                <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
                    <span className="text-sm text-[#898989]">Trending:</span>
                    {trendingSearches.map((term) => (
                        <button
                            key={term}
                            onClick={() => handleTrendingClick(term)}
                            className="px-3 py-1.5 text-sm text-secondary bg-white border border-secondary rounded-full hover:border-[#000080] hover:text-[#000080] transition-colors"
                        >
                            {term}
                        </button>
                    ))}
                </div>

                {/* Quick Categories */}
                <div className="flex flex-wrap justify-center gap-2 lg:gap-3">
                    {quickCategories.map((category) => {
                        const Icon = category.icon;
                        const isSelected = selectedCategory === category.id;
                        return (
                            <button
                                key={category.id}
                                onClick={() => onCategorySelect(category.id)}
                                className={cx(
                                    "flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium text-sm transition-all duration-200",
                                    isSelected
                                        ? "bg-[#000080] text-white shadow-lg shadow-[#000080]/25"
                                        : "bg-white text-secondary hover:bg-[#000080]/5 hover:text-[#000080] border border-secondary"
                                )}
                            >
                                <Icon className="size-4" />
                                {category.label}
                            </button>
                        );
                    })}
                </div>

                {/* Stats */}
                <div className="flex justify-center gap-8 lg:gap-16 mt-10 pt-8 border-t border-secondary/50">
                    <div className="text-center">
                        <p className="text-2xl lg:text-3xl font-bold text-[#000080]">50K+</p>
                        <p className="text-sm text-[#898989]">Active Listings</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl lg:text-3xl font-bold text-[#000080]">12K+</p>
                        <p className="text-sm text-[#898989]">Verified Sellers</p>
                    </div>
                    <div className="text-center">
                        <p className="text-2xl lg:text-3xl font-bold text-[#000080]">100K+</p>
                        <p className="text-sm text-[#898989]">Happy Buyers</p>
                    </div>
                    <div className="text-center hidden sm:block">
                        <p className="text-2xl lg:text-3xl font-bold text-[#000080]">₹50Cr+</p>
                        <p className="text-sm text-[#898989]">Items Sold</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
