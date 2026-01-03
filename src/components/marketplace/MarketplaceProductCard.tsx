"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import {
    Clock,
    Heart,
    Eye,
    ShoppingCart01,
    Zap,
    TrendUp01,
    Star01,
    Check,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";
import { Badge, BadgeWithIcon } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";

export interface MarketplaceProduct {
    id: string;
    title: string;
    image: string;
    images?: string[];
    currentBid?: number;
    buyNowPrice?: number;
    startingPrice?: number;
    timeLeft?: string;
    endTime?: Date;
    bids?: number;
    seller: {
        name: string;
        rating: number;
        verified?: boolean;
    };
    category: string;
    condition: "new" | "like-new" | "good" | "fair";
    watchers?: number;
    isHot?: boolean;
    isFeatured?: boolean;
    freeShipping?: boolean;
    type: "auction" | "buy-now" | "both";
}

interface Props {
    product: MarketplaceProduct;
    view?: "grid" | "list";
    transparentBorder?: boolean;
}

const conditionLabels = {
    new: { label: "New", color: "success" as const },
    "like-new": { label: "Like New", color: "blue" as const },
    good: { label: "Good", color: "warning" as const },
    fair: { label: "Fair", color: "gray" as const },
};

export function MarketplaceProductCard({ product, view = "grid", transparentBorder = false }: Props) {
    const [isWishlisted, setIsWishlisted] = useState(false);
    const [isHovered, setIsHovered] = useState(false);

    const handleWishlist = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
        setIsWishlisted(!isWishlisted);
    };

    const preventLinkClick = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        e.nativeEvent.stopImmediatePropagation();
    };

    const handleQuickBid = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Quick bid logic
    };

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        // Add to cart logic
    };

    if (view === "list") {
        return (
            <Link
                href={`/listing/${product.id}`}
                className="group flex gap-4 bg-primary border border-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
                {/* Image with heart icon */}
                <div className="relative w-48 h-48 flex-shrink-0 overflow-hidden bg-secondary">
                    <Image
                        src={product.image}
                        alt={product.title}
                        fill
                        className="object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <button
                        onClick={handleWishlist}
                        onMouseDown={preventLinkClick}
                        className={cx(
                            "absolute top-3 right-3 p-2.5 rounded-full shadow-md cursor-pointer",
                            isWishlisted ? "bg-red-50" : "bg-white/95 backdrop-blur-sm"
                        )}
                    >
                        <Heart
                            className={cx(
                                "size-5",
                                isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
                            )}
                        />
                    </button>
                </div>

                <div className="flex-1 flex flex-col justify-center py-4 pr-4">
                    {/* Title - 2 lines limit */}
                    <h3 className="text-base font-semibold text-primary line-clamp-2 group-hover:text-brand-600 transition-colors">
                        {product.title}
                    </h3>

                    {/* Price and Time row */}
                    <div className="flex items-end justify-between mt-2">
                        {/* Left: Current bid */}
                        <div>
                            <p className="text-xs text-tertiary">Current bid</p>
                            <p className="text-xl font-bold text-primary">
                                ${(product.currentBid || product.buyNowPrice || 0).toLocaleString()}
                            </p>
                        </div>

                        {/* Right: Days left */}
                        {product.timeLeft && (
                            <p className="text-xs text-tertiary">
                                {product.timeLeft} left
                            </p>
                        )}
                    </div>
                </div>
            </Link>
        );
    }

    return (
        <Link
            href={`/listing/${product.id}`}
            className={cx(
                "group block w-full rounded-lg overflow-hidden hover:shadow-xl transition-shadow",
                transparentBorder ? "bg-white/10 border border-white/20" : "bg-primary border border-secondary"
            )}
        >
            {/* Image with heart icon */}
            <div className={cx("relative w-full aspect-[4/5] overflow-hidden", transparentBorder ? "bg-white/5" : "bg-secondary")}>
                <Image
                    src={product.image}
                    alt={product.title}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                    onClick={handleWishlist}
                    onMouseDown={preventLinkClick}
                    className={cx(
                        "absolute top-2 right-2 p-2 rounded-full shadow-md cursor-pointer",
                        isWishlisted ? "bg-red-50" : "bg-white/95 backdrop-blur-sm"
                    )}
                >
                    <Heart
                        className={cx(
                            "size-4",
                            isWishlisted ? "text-red-500 fill-red-500" : "text-gray-400"
                        )}
                    />
                </button>
            </div>

            <div className="p-2">
                {/* Title - 2 lines limit */}
                <h3 className={cx(
                    "text-sm font-semibold line-clamp-2 transition-colors min-h-[2.5rem]",
                    transparentBorder ? "text-white group-hover:text-brand-200" : "text-primary group-hover:text-brand-600"
                )}>
                    {product.title}
                </h3>

                {/* Price and Time row */}
                <div className="flex items-end justify-between mt-2">
                    {/* Left: Current bid */}
                    <div>
                        <p className={cx("text-xs", transparentBorder ? "text-white/70" : "text-tertiary")}>Current bid</p>
                        <p className={cx("text-sm sm:text-lg font-bold", transparentBorder ? "text-white" : "text-primary")}>
                            ${(product.currentBid || product.buyNowPrice || 0).toLocaleString()}
                        </p>
                    </div>

                    {/* Right: Days left */}
                    {product.timeLeft && (
                        <p className={cx("text-xs", transparentBorder ? "text-white/70" : "text-tertiary")}>
                            {product.timeLeft} left
                        </p>
                    )}
                </div>
            </div>
        </Link>
    );
}
