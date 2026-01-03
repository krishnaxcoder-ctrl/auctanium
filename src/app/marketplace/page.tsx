"use client";

import { useState, useMemo, useEffect } from "react";
import {
    Grid01,
    List,
    ChevronDown,
    FilterLines,
    X,
    Sliders04,
    SearchLg,
    Check,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import {
    MarketplaceProductCard,
    FilterSidebar,
} from "@/components/marketplace";
import type { MarketplaceProduct, FilterState } from "@/components/marketplace";

// Filter Dropdown Component
interface FilterDropdownProps {
    label: string;
    options: { id: string; label: string }[];
    selected: string[];
    onChange: (selected: string[]) => void;
    multiple?: boolean;
}

function FilterDropdown({ label, options, selected, onChange, multiple = false }: FilterDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    const handleSelect = (id: string) => {
        if (multiple) {
            if (selected.includes(id)) {
                onChange(selected.filter((s) => s !== id));
            } else {
                onChange([...selected, id]);
            }
        } else {
            onChange(selected.includes(id) ? [] : [id]);
            setIsOpen(false);
        }
    };

    return (
        <div className="relative">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={cx(
                    "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                    selected.length > 0
                        ? "bg-brand-50 border-brand-600 text-brand-700"
                        : "border-secondary text-secondary hover:bg-secondary"
                )}
            >
                {label}
                {selected.length > 0 && (
                    <span className="px-1.5 py-0.2 text-xs bg-brand-600 text-white rounded-full">
                        {selected.length}
                    </span>
                )}
                <ChevronDown className={cx("size-4 transition-transform", isOpen && "rotate-180")} />
            </button>

            {isOpen && (
                <>
                    <div className="fixed inset-0 z-10" onClick={() => setIsOpen(false)} />
                    <div className="absolute top-full left-0 mt-2 w-56 bg-primary border border-secondary rounded-lg shadow-lg z-20 py-2 max-h-64 overflow-y-auto">
                        {options.map((option) => (
                            <button
                                key={option.id}
                                onClick={() => handleSelect(option.id)}
                                className="w-full flex items-center gap-3 px-4 py-2 text-sm text-left hover:bg-secondary transition-colors"
                            >
                                <div
                                    className={cx(
                                        "size-4 rounded border-2 flex items-center justify-center transition-colors",
                                        selected.includes(option.id)
                                            ? "bg-brand-600 border-brand-600"
                                            : "border-gray-300"
                                    )}
                                >
                                    {selected.includes(option.id) && (
                                        <Check className="size-3 text-white" />
                                    )}
                                </div>
                                <span className="text-secondary">{option.label}</span>
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    );
}

// Sample products data
const sampleProducts: MarketplaceProduct[] = [
    {
        id: "1",
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
        id: "2",
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
        id: "3",
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
        id: "4",
        title: "Sony PlayStation 5 Disc Edition Console Bundle with 2 Controllers",
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
        id: "5",
        title: "Vintage Rolex Datejust 36mm Two-Tone Gold - 1985",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600",
        currentBid: 8500,
        timeLeft: "6h 30m",
        bids: 67,
        seller: { name: "LuxuryWatches", rating: 5.0, verified: true },
        category: "Jewelry",
        condition: "good",
        watchers: 445,
        isFeatured: true,
        type: "auction",
    },
    {
        id: "6",
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
        id: "7",
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
        id: "8",
        title: "Herman Miller Aeron Chair Size B - Fully Loaded",
        image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=600",
        buyNowPrice: 899,
        seller: { name: "OfficeFurniture", rating: 4.6 },
        category: "Home",
        condition: "like-new",
        watchers: 45,
        freeShipping: false,
        type: "buy-now",
    },
    {
        id: "9",
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
        id: "10",
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
        id: "11",
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
        id: "12",
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
        id: "13",
        title: "Tag Heuer Carrera Chronograph - Excellent Condition",
        image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=600",
        currentBid: 1850,
        buyNowPrice: 2200,
        timeLeft: "4d 2h",
        bids: 18,
        seller: { name: "Premium Watch Store", rating: 4.6, verified: true },
        category: "Jewelry",
        condition: "good",
        watchers: 95,
        freeShipping: true,
        type: "both",
    },
    {
        id: "14",
        title: "Cartier Tank Francaise Gold - Like New",
        image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=600",
        currentBid: 4500,
        buyNowPrice: 5250,
        timeLeft: "1d 8h",
        bids: 67,
        seller: { name: "Luxury Vault", rating: 5.0, verified: true },
        category: "Jewelry",
        condition: "like-new",
        watchers: 312,
        isFeatured: true,
        freeShipping: true,
        type: "both",
    },
    {
        id: "15",
        title: "Patek Philippe Calatrava - Mint Condition with Box",
        image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=600",
        currentBid: 15000,
        buyNowPrice: 18500,
        timeLeft: "5d 12h",
        bids: 34,
        seller: { name: "Elite Timepieces", rating: 4.9, verified: true },
        category: "Jewelry",
        condition: "new",
        watchers: 445,
        isHot: true,
        isFeatured: true,
        type: "both",
    },
    {
        id: "16",
        title: "Audemars Piguet Royal Oak - Excellent",
        image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=600",
        currentBid: 22000,
        timeLeft: "2d 18h",
        bids: 28,
        seller: { name: "Watch Connoisseur", rating: 4.8, verified: true },
        category: "Jewelry",
        condition: "good",
        watchers: 523,
        isHot: true,
        freeShipping: true,
        type: "auction",
    },
    {
        id: "17",
        title: "IWC Portugieser Automatic - Very Good Condition",
        image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=600",
        currentBid: 3750,
        buyNowPrice: 4500,
        timeLeft: "3d 6h",
        bids: 15,
        seller: { name: "Time Gallery", rating: 4.7, verified: true },
        category: "Jewelry",
        condition: "good",
        watchers: 187,
        type: "both",
    },
    {
        id: "18",
        title: "Omega Seamaster Professional 300M - Blue Dial",
        image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600",
        currentBid: 4200,
        buyNowPrice: 4800,
        timeLeft: "2d 4h",
        bids: 22,
        seller: { name: "Dive Watch Co", rating: 4.8, verified: true },
        category: "Jewelry",
        condition: "like-new",
        watchers: 156,
        freeShipping: true,
        type: "both",
    },
    {
        id: "19",
        title: "Breitling Navitimer Chronograph - Full Set",
        image: "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=600",
        currentBid: 5800,
        timeLeft: "4d 15h",
        bids: 19,
        seller: { name: "Aviation Watches", rating: 4.7, verified: true },
        category: "Jewelry",
        condition: "good",
        watchers: 134,
        isFeatured: true,
        type: "auction",
    },
    {
        id: "20",
        title: "Tudor Black Bay 58 - Navy Blue",
        image: "https://images.unsplash.com/photo-1548171915-e79a380a2a4b?w=600",
        buyNowPrice: 3200,
        seller: { name: "Heritage Watches", rating: 4.9, verified: true },
        category: "Jewelry",
        condition: "new",
        watchers: 98,
        freeShipping: true,
        type: "buy-now",
    },
];

const sortOptions = [
    { id: "ending-soon", label: "Ending Soon" },
    { id: "newly-listed", label: "Newly Listed" },
    { id: "price-low", label: "Price: Low to High" },
    { id: "price-high", label: "Price: High to Low" },
    { id: "most-bids", label: "Most Bids" },
    { id: "most-watched", label: "Most Watched" },
];

const defaultFilters: FilterState = {
    categories: [],
    priceRange: [0, Infinity],
    condition: [],
    listingType: [],
    sellerRating: null,
    freeShipping: false,
    endingSoon: false,
    newlyListed: false,
};

export default function MarketplacePage() {
    const [filters, setFilters] = useState<FilterState>(defaultFilters);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [sortBy, setSortBy] = useState("ending-soon");
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
    const [showFilters, setShowFilters] = useState(false);
    const [showSortDropdown, setShowSortDropdown] = useState(false);

    // Lock body scroll when mobile filter is open
    useEffect(() => {
        if (showFilters) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [showFilters]);

    // Filter and sort products
    const filteredProducts = useMemo(() => {
        let result = [...sampleProducts];

        // Search filter
        if (searchQuery) {
            result = result.filter(
                (p) =>
                    p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                    p.category.toLowerCase().includes(searchQuery.toLowerCase())
            );
        }

        // Category filter (from hero)
        if (selectedCategory !== "all") {
            result = result.filter(
                (p) => p.category.toLowerCase() === selectedCategory.toLowerCase()
            );
        }

        // Category filter (from sidebar)
        if (filters.categories.length > 0) {
            result = result.filter((p) =>
                filters.categories.includes(p.category.toLowerCase())
            );
        }

        // Price range filter
        if (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity) {
            result = result.filter((p) => {
                const price = p.currentBid || p.buyNowPrice || 0;
                return price >= filters.priceRange[0] && price <= filters.priceRange[1];
            });
        }

        // Condition filter
        if (filters.condition.length > 0) {
            result = result.filter((p) => filters.condition.includes(p.condition));
        }

        // Listing type filter
        if (filters.listingType.length > 0) {
            result = result.filter((p) => filters.listingType.includes(p.type));
        }

        // Seller rating filter
        if (filters.sellerRating) {
            result = result.filter((p) => p.seller.rating >= filters.sellerRating!);
        }

        // Free shipping filter
        if (filters.freeShipping) {
            result = result.filter((p) => p.freeShipping);
        }

        // Sort
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
    }, [filters, searchQuery, selectedCategory, sortBy]);

    const handleClearFilters = () => {
        setFilters(defaultFilters);
        setSelectedCategory("all");
        setSearchQuery("");
    };

    const activeFilterCount =
        filters.categories.length +
        filters.condition.length +
        filters.listingType.length +
        (filters.priceRange[0] > 0 || filters.priceRange[1] < Infinity ? 1 : 0) +
        (filters.sellerRating ? 1 : 0) +
        (filters.freeShipping ? 1 : 0);

    return (
        <div className="min-h-screen bg-primary">
            {/* Main Content */}
            <div className="max-w-8xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
                {/* Toolbar */}
                <div className="flex items-center gap-4 mb-2 pb-2 border-b border-secondary">
                    {/* Search */}
                    <div className="relative flex-1 max-w-full sm:max-w-xs">
                        <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                        <input
                            type="text"
                            placeholder="Search..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full pl-9 pr-3 py-2 bg-secondary/50 border-0 rounded-lg text-sm text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                        />
                    </div>

                    {/* Spacer */}
                    <div className="hidden sm:block flex-1" />

                    {/* Actions */}
                    <div className="flex items-center gap-2">
                        {activeFilterCount > 0 && (
                            <button
                                onClick={handleClearFilters}
                                className="hidden sm:flex items-center gap-1 text-sm text-tertiary hover:text-primary transition-colors"
                            >
                                <X className="size-3.5" />
                                Clear
                            </button>
                        )}

                        {/* Mobile filter */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className={cx(
                                "lg:hidden p-2 rounded-lg transition-colors",
                                activeFilterCount > 0
                                    ? "bg-brand-50 text-brand-600"
                                    : "text-tertiary hover:bg-secondary"
                            )}
                        >
                            <Sliders04 className="size-5" />
                        </button>

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

                        {/* Divider */}
                        <div className="hidden sm:block h-5 w-px bg-secondary" />

                        {/* View toggle */}
                        <div className="hidden sm:flex items-center gap-1">
                            <button
                                onClick={() => setViewMode("grid")}
                                className={cx(
                                    "p-1.5 rounded transition-colors",
                                    viewMode === "grid" ? "text-primary" : "text-tertiary hover:text-secondary"
                                )}
                            >
                                <Grid01 className="size-5" />
                            </button>
                            <button
                                onClick={() => setViewMode("list")}
                                className={cx(
                                    "p-1.5 rounded transition-colors",
                                    viewMode === "list" ? "text-primary" : "text-tertiary hover:text-secondary"
                                )}
                            >
                                <List className="size-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Horizontal Filter Bar for Desktop */}
                <div className="hidden lg:block mb-4">
                    <div className="flex flex-wrap items-center gap-2">
                        {/* Filter Button */}
                        <button
                            onClick={() => setShowFilters(true)}
                            className={cx(
                                "flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-lg border transition-colors",
                                activeFilterCount > 0
                                    ? "bg-brand-50 border-brand-600 text-brand-700"
                                    : "border-secondary text-secondary hover:bg-secondary"
                            )}
                        >
                            <Sliders04 className="size-4" />
                            Filters
                            {activeFilterCount > 0 && (
                                <span className="px-1.5 py-0.3 text-xs bg-brand-600 text-white rounded-full">
                                    {activeFilterCount}
                                </span>
                            )}
                        </button>

                        {/* Category Dropdown */}
                        <FilterDropdown
                            label="Category"
                            options={[
                                { id: "electronics", label: "Electronics" },
                                { id: "fashion", label: "Fashion & Apparel" },
                                { id: "collectibles", label: "Collectibles & Art" },
                                { id: "home", label: "Home & Garden" },
                                { id: "sports", label: "Sports & Outdoors" },
                                { id: "jewelry", label: "Jewelry & Watches" },
                                { id: "art", label: "Art" },
                                { id: "antiques", label: "Antiques" },
                                { id: "watches", label: "Watches" },
                                { id: "coins", label: "Coins & Stamps" },
                            ]}
                            selected={filters.categories}
                            onChange={(selected) => setFilters({ ...filters, categories: selected })}
                            multiple
                        />

                        {/* Reserve Price Dropdown */}
                        <FilterDropdown
                            label="Reserve price"
                            options={[
                                { id: "0-100", label: "Under $100" },
                                { id: "100-500", label: "$100 - $500" },
                                { id: "500-1000", label: "$500 - $1,000" },
                                { id: "1000-5000", label: "$1,000 - $5,000" },
                                { id: "5000-inf", label: "$5,000+" },
                                { id: "no-reserve", label: "No Reserve" },
                            ]}
                            selected={
                                filters.priceRange[0] === 0 && filters.priceRange[1] === Infinity
                                    ? []
                                    : [`${filters.priceRange[0]}-${filters.priceRange[1] === Infinity ? 'inf' : filters.priceRange[1]}`]
                            }
                            onChange={(selected) => {
                                if (selected.length === 0) {
                                    setFilters({ ...filters, priceRange: [0, Infinity] });
                                } else {
                                    const [min, max] = selected[0].split('-');
                                    setFilters({
                                        ...filters,
                                        priceRange: [parseInt(min) || 0, max === 'inf' ? Infinity : parseInt(max)],
                                    });
                                }
                            }}
                        />

                        {/* Closing Date Dropdown */}
                        <FilterDropdown
                            label="Closing date"
                            options={[
                                { id: "today", label: "Ending Today" },
                                { id: "24h", label: "Next 24 Hours" },
                                { id: "3days", label: "Next 3 Days" },
                                { id: "7days", label: "Next 7 Days" },
                                { id: "30days", label: "Next 30 Days" },
                            ]}
                            selected={filters.endingSoon ? ["today"] : []}
                            onChange={(selected) => setFilters({ ...filters, endingSoon: selected.length > 0 })}
                        />

                        {/* Condition Dropdown */}
                        <FilterDropdown
                            label="Condition"
                            options={[
                                { id: "new", label: "New" },
                                { id: "like-new", label: "Like New" },
                                { id: "good", label: "Good" },
                                { id: "fair", label: "Fair" },
                                { id: "restored", label: "Restored" },
                                { id: "vintage", label: "Vintage" },
                            ]}
                            selected={filters.condition}
                            onChange={(selected) => setFilters({ ...filters, condition: selected })}
                            multiple
                        />

                        {/* Location Dropdown */}
                        <FilterDropdown
                            label="Location"
                            options={[
                                { id: "us", label: "United States" },
                                { id: "uk", label: "United Kingdom" },
                                { id: "eu", label: "Europe" },
                                { id: "asia", label: "Asia" },
                                { id: "au", label: "Australia" },
                                { id: "worldwide", label: "Worldwide" },
                            ]}
                            selected={[]}
                            onChange={() => {}}
                            multiple
                        />

                        {/* Brand Dropdown */}
                        <FilterDropdown
                            label="Brand"
                            options={[
                                { id: "rolex", label: "Rolex" },
                                { id: "cartier", label: "Cartier" },
                                { id: "omega", label: "Omega" },
                                { id: "patek", label: "Patek Philippe" },
                                { id: "chanel", label: "Chanel" },
                                { id: "hermes", label: "Hermès" },
                                { id: "louis-vuitton", label: "Louis Vuitton" },
                                { id: "other", label: "Other" },
                            ]}
                            selected={[]}
                            onChange={() => {}}
                            multiple
                        />

                        {/* Clear Filters */}
                        {activeFilterCount > 0 && (
                            <button
                                onClick={handleClearFilters}
                                className="px-3 py-2 text-sm font-medium text-brand-600 hover:text-brand-700 transition-colors"
                            >
                                Clear All
                            </button>
                        )}
                    </div>
                </div>

                {/* Product Grid */}
                <main className="w-full">
                    {filteredProducts.length > 0 ? (
                        <div
                            className={cx(
                                viewMode === "grid"
                                    ? "grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4"
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
                                Try adjusting your filters or search terms to find what you're looking for.
                            </p>
                            <Button
                                color="secondary"
                                onClick={handleClearFilters}
                            >
                                Clear all filters
                            </Button>
                        </div>
                    )}
                </main>
            </div>

            {/* Filter Drawer - Full screen on mobile, Right sidebar on PC */}
            {showFilters && (
                <>
                    <div
                        className="fixed inset-0 bg-overlay/50 z-40 backdrop-blur-sm"
                        onClick={() => setShowFilters(false)}
                    />
                    {/* Mobile: Full screen */}
                    <div className="fixed inset-0 bg-primary z-50 lg:hidden flex flex-col">
                        <div className="flex-1 overflow-y-auto">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={setFilters}
                                onClearFilters={handleClearFilters}
                                isMobile
                                onClose={() => setShowFilters(false)}
                            />
                        </div>
                        <div className="flex-shrink-0 p-4 border-t border-secondary bg-primary">
                            <Button
                                size="lg"
                                color="primary"
                                className="w-full"
                                onClick={() => setShowFilters(false)}
                            >
                                Show {filteredProducts.length} Results
                            </Button>
                        </div>
                    </div>
                    {/* PC: Right sidebar */}
                    <div className="hidden lg:flex fixed inset-y-0 right-0 w-96 bg-primary z-50 flex-col shadow-xl border-l border-secondary">
                        <div className="flex-1 overflow-y-auto">
                            <FilterSidebar
                                filters={filters}
                                onFilterChange={setFilters}
                                onClearFilters={handleClearFilters}
                                isMobile
                                onClose={() => setShowFilters(false)}
                            />
                        </div>
                        <div className="flex-shrink-0 p-4 border-t border-secondary bg-primary">
                            <Button
                                size="lg"
                                color="primary"
                                className="w-full"
                                onClick={() => setShowFilters(false)}
                            >
                                Show {filteredProducts.length} Results
                            </Button>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
}
