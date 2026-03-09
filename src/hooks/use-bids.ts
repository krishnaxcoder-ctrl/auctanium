"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

export interface Bid {
    id: string;
    amount: number;
    max_bid: number | null;
    is_auto_bid: boolean;
    status: "active" | "outbid" | "winning" | "won" | "lost";
    created_at: string;
    product_id: string;
    auction_id: string;
    products: {
        id: string;
        title: string;
        images: string[];
        current_bid: number;
        status: string;
    };
    auctions: {
        id: string;
        end_time: string;
        status: string;
        winner_id: string | null;
    };
}

export interface BidsData {
    bids: Bid[];
    activeBids: Bid[];
    wonBids: Bid[];
    lostBids: Bid[];
    counts: {
        active: number;
        won: number;
        lost: number;
        total: number;
    };
}

export interface BidHistoryItem {
    id: string;
    amount: number;
    bidder_display_name: string;
    is_auto_bid: boolean;
    status: string;
    created_at: string;
}

interface UseBidsReturn {
    bids: BidsData | null;
    isLoading: boolean;
    error: string | null;
    placeBid: (
        productId: string,
        amount: number,
        maxBid?: number
    ) => Promise<{ success: boolean; message?: string; currentBid?: number; requiresAuth?: boolean }>;
    refreshBids: () => Promise<void>;
}

export function useBids(): UseBidsReturn {
    const { isSignedIn, isLoaded } = useAuth();
    const [bids, setBids] = useState<BidsData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchBids = useCallback(async () => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            setBids(null);
            setIsLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await fetch("/api/bids");
            if (response.ok) {
                const data = await response.json();
                setBids(data);
            } else {
                setError("Failed to fetch bids");
            }
        } catch (err) {
            console.error("Failed to fetch bids:", err);
            setError("Failed to fetch bids");
        } finally {
            setIsLoading(false);
        }
    }, [isSignedIn, isLoaded]);

    useEffect(() => {
        fetchBids();
    }, [fetchBids]);

    const placeBid = useCallback(
        async (
            productId: string,
            amount: number,
            maxBid?: number
        ): Promise<{ success: boolean; message?: string; currentBid?: number; requiresAuth?: boolean }> => {
            if (!isSignedIn) {
                return { success: false, message: "Please sign in to place a bid", requiresAuth: true };
            }

            try {
                const response = await fetch("/api/bids", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, amount, maxBid }),
                });

                const data = await response.json();

                if (!response.ok) {
                    return {
                        success: false,
                        message: data.error || "Failed to place bid",
                        currentBid: data.minimumBid,
                    };
                }

                // Refresh bids after placing
                await fetchBids();

                return {
                    success: true,
                    message: "Bid placed successfully!",
                    currentBid: data.currentBid,
                };
            } catch (err) {
                console.error("Failed to place bid:", err);
                return { success: false, message: "Failed to place bid" };
            }
        },
        [isSignedIn, fetchBids]
    );

    return {
        bids,
        isLoading,
        error,
        placeBid,
        refreshBids: fetchBids,
    };
}

// Hook for fetching bid history of a specific product
export function useBidHistory(productId: string | null) {
    const [bidHistory, setBidHistory] = useState<BidHistoryItem[]>([]);
    const [totalBids, setTotalBids] = useState(0);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchBidHistory = useCallback(async () => {
        if (!productId) return;

        setIsLoading(true);
        setError(null);

        try {
            const response = await fetch(`/api/bids/${productId}`);
            if (response.ok) {
                const data = await response.json();
                setBidHistory(data.bids || []);
                setTotalBids(data.totalBids || 0);
            } else {
                setError("Failed to fetch bid history");
            }
        } catch (err) {
            console.error("Failed to fetch bid history:", err);
            setError("Failed to fetch bid history");
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    useEffect(() => {
        fetchBidHistory();
    }, [fetchBidHistory]);

    return {
        bidHistory,
        totalBids,
        isLoading,
        error,
        refreshBidHistory: fetchBidHistory,
    };
}
