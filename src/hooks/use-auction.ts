"use client";

import { useState, useEffect, useCallback, useRef } from "react";

export interface AuctionStatus {
    auction: {
        id: string;
        productId: string;
        startTime: string;
        endTime: string;
        status: "scheduled" | "active" | "ended" | "sold" | "cancelled";
        minimumBidIncrement: number;
        winnerId: string | null;
        winningBid: number | null;
    };
    product: {
        id: string;
        title: string;
        images: string[];
        current_bid: number;
        starting_price: number;
        bids_count: number;
        status: string;
    };
    timeRemaining: number;
    timeRemainingFormatted: string;
    topBids: Array<{
        id: string;
        amount: number;
        bidder_display_name: string;
        created_at: string;
    }>;
    totalBids: number;
    uniqueBidders: number;
    currentBid: number;
    isEnded: boolean;
}

interface UseAuctionReturn {
    auctionStatus: AuctionStatus | null;
    isLoading: boolean;
    error: string | null;
    refreshAuction: () => Promise<void>;
    timeRemaining: number;
    isEnded: boolean;
}

export function useAuction(productId: string | null, pollInterval: number = 5000): UseAuctionReturn {
    const [auctionStatus, setAuctionStatus] = useState<AuctionStatus | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [timeRemaining, setTimeRemaining] = useState(0);
    const intervalRef = useRef<NodeJS.Timeout | null>(null);
    const countdownRef = useRef<NodeJS.Timeout | null>(null);

    const fetchAuctionStatus = useCallback(async () => {
        if (!productId) {
            setAuctionStatus(null);
            setIsLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await fetch(`/api/auctions/${productId}`);

            if (response.ok) {
                const data = await response.json();
                setAuctionStatus(data);
                setTimeRemaining(data.timeRemaining);
            } else if (response.status === 404) {
                // Not an auction product
                setAuctionStatus(null);
            } else {
                setError("Failed to fetch auction status");
            }
        } catch (err) {
            console.error("Failed to fetch auction status:", err);
            setError("Failed to fetch auction status");
        } finally {
            setIsLoading(false);
        }
    }, [productId]);

    // Initial fetch and polling
    useEffect(() => {
        fetchAuctionStatus();

        // Set up polling for auction updates
        if (productId && pollInterval > 0) {
            intervalRef.current = setInterval(fetchAuctionStatus, pollInterval);
        }

        return () => {
            if (intervalRef.current) {
                clearInterval(intervalRef.current);
            }
        };
    }, [fetchAuctionStatus, productId, pollInterval]);

    // Countdown timer
    useEffect(() => {
        if (timeRemaining <= 0) return;

        countdownRef.current = setInterval(() => {
            setTimeRemaining((prev) => {
                const newTime = prev - 1000;
                if (newTime <= 0) {
                    if (countdownRef.current) {
                        clearInterval(countdownRef.current);
                    }
                    // Fetch latest status when auction ends
                    fetchAuctionStatus();
                    return 0;
                }
                return newTime;
            });
        }, 1000);

        return () => {
            if (countdownRef.current) {
                clearInterval(countdownRef.current);
            }
        };
    }, [timeRemaining, fetchAuctionStatus]);

    return {
        auctionStatus,
        isLoading,
        error,
        refreshAuction: fetchAuctionStatus,
        timeRemaining,
        isEnded: timeRemaining <= 0 || auctionStatus?.isEnded || false,
    };
}

// Format time remaining for display
export function formatTimeRemaining(ms: number): {
    days: number;
    hours: number;
    minutes: number;
    seconds: number;
    formatted: string;
    isUrgent: boolean;
} {
    if (ms <= 0) {
        return { days: 0, hours: 0, minutes: 0, seconds: 0, formatted: "Ended", isUrgent: false };
    }

    const seconds = Math.floor(ms / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    const isUrgent = hours < 1; // Less than 1 hour remaining

    let formatted: string;
    if (days > 0) {
        formatted = `${days}d ${hours % 24}h`;
    } else if (hours > 0) {
        formatted = `${hours}h ${minutes % 60}m`;
    } else if (minutes > 0) {
        formatted = `${minutes}m ${seconds % 60}s`;
    } else {
        formatted = `${seconds}s`;
    }

    return {
        days,
        hours: hours % 24,
        minutes: minutes % 60,
        seconds: seconds % 60,
        formatted,
        isUrgent,
    };
}

// Calculate minimum bid
export function calculateMinimumBid(
    currentBid: number,
    startingPrice: number,
    minimumIncrement: number = 5
): number {
    const baseBid = currentBid > 0 ? currentBid : startingPrice;
    return baseBid + minimumIncrement;
}

// Generate quick bid amounts
export function generateQuickBidAmounts(
    currentBid: number,
    startingPrice: number,
    minimumIncrement: number = 5
): number[] {
    const minBid = calculateMinimumBid(currentBid, startingPrice, minimumIncrement);

    // Generate 3 quick bid options
    return [
        minBid,
        minBid + minimumIncrement,
        minBid + minimumIncrement * 2,
    ];
}
