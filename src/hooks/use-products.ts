import { useState, useEffect } from "react";
import { MarketplaceProduct } from "@/components/marketplace/MarketplaceProductCard";

// Helper to calculate time left
function calculateTimeLeft(endTime: string): string {
    const now = new Date().getTime();
    const end = new Date(endTime).getTime();
    const diff = end - now;

    if (diff <= 0) return "Ended";

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));

    if (days > 0) return `${days}d ${hours}h`;
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    return `${hours}h ${minutes}m`;
}

// Transform API product to MarketplaceProduct
export function transformProduct(product: any): MarketplaceProduct {
    const auction = product.auctions?.[0];

    return {
        id: product.slug || product.id,
        title: product.title,
        image: product.images?.[0] || "",
        images: product.images,
        currentBid: product.current_bid || undefined,
        buyNowPrice: product.buy_now_price || undefined,
        startingPrice: product.starting_price || undefined,
        timeLeft: auction?.end_time ? calculateTimeLeft(auction.end_time) : undefined,
        endTime: auction?.end_time ? new Date(auction.end_time) : undefined,
        bids: product.bids_count || 0,
        seller: {
            name: product.seller_name || "Seller",
            rating: 4.8,
            verified: product.seller_verified || false,
        },
        category: product.category,
        condition: product.condition || "new",
        watchers: product.watchers_count || 0,
        isHot: product.bids_count > 10,
        isFeatured: product.no_reserve,
        freeShipping: product.free_shipping || false,
        type: product.listing_type as "auction" | "buy-now" | "both",
    };
}

interface UseProductsOptions {
    limit?: number;
    category?: string;
    listingType?: string;
    sort?: string;
}

export function useProducts(options: UseProductsOptions = {}) {
    const [products, setProducts] = useState<MarketplaceProduct[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        async function fetchProducts() {
            try {
                setIsLoading(true);
                const params = new URLSearchParams();
                if (options.limit) params.set("limit", options.limit.toString());
                if (options.category) params.set("category", options.category);
                if (options.listingType) params.set("listingType", options.listingType);
                if (options.sort) params.set("sort", options.sort);

                const response = await fetch(`/api/products?${params.toString()}`);
                if (response.ok) {
                    const data = await response.json();
                    const transformed = data.products.map(transformProduct);
                    setProducts(transformed);
                } else {
                    setError("Failed to fetch products");
                }
            } catch (err) {
                console.error("Failed to fetch products:", err);
                setError("Failed to fetch products");
            } finally {
                setIsLoading(false);
            }
        }

        fetchProducts();
    }, [options.limit, options.category, options.listingType, options.sort]);

    return { products, isLoading, error };
}
