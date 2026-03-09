"use client";

import { useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Clock,
    TrendUp01,
    ChevronRight,
    FilterLines,
    SearchSm,
    RefreshCw01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { useBids, type Bid } from "@/hooks/use-bids";
import { formatTimeRemaining } from "@/hooks/use-auction";

function formatRelativeTime(dateString: string): string {
    const date = new Date(dateString);
    const now = new Date();
    const diff = date.getTime() - now.getTime();

    if (diff < 0) return "Ended";

    const hours = Math.floor(diff / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 24) {
        const days = Math.floor(hours / 24);
        return `${days}d ${hours % 24}h`;
    }
    return `${hours}h ${minutes}m`;
}

function BidCard({ bid }: { bid: Bid }) {
    const product = bid.products;
    const auction = bid.auctions;
    const timeLeft = auction?.end_time ? formatRelativeTime(auction.end_time) : "N/A";
    const isWinning = bid.status === "winning";
    const isOutbid = bid.status === "outbid";
    const isWon = bid.status === "won";
    const isLost = bid.status === "lost";
    const isEnded = auction?.status !== "active";

    const getStatusBadge = () => {
        if (isWon) return { color: "success" as const, text: "Won" };
        if (isLost) return { color: "gray" as const, text: "Lost" };
        if (isWinning) return { color: "success" as const, text: "Winning" };
        if (isOutbid) return { color: "error" as const, text: "Outbid" };
        return { color: "gray" as const, text: bid.status };
    };

    const status = getStatusBadge();

    return (
        <Link
            href={isWon ? `/checkout?auction=${auction?.id}` : `/listing/${bid.product_id}`}
            className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
        >
            <div className="relative size-20 overflow-hidden rounded-lg bg-secondary">
                {product?.images?.[0] ? (
                    <Image src={product.images[0]} alt={product.title} fill className="object-cover" />
                ) : (
                    <div className="flex items-center justify-center h-full text-tertiary text-xs">
                        No image
                    </div>
                )}
            </div>
            <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary truncate">{product?.title || "Product"}</h3>
                <div className="mt-1 flex items-center gap-4 text-xs text-tertiary">
                    <span>
                        Your bid: <span className="font-medium text-primary">${bid.amount}</span>
                    </span>
                    <span>
                        Current: <span className="font-medium text-primary">${product?.current_bid || bid.amount}</span>
                    </span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                    <Badge type="pill-color" size="sm" color={status.color}>
                        {status.text}
                    </Badge>
                    {!isEnded && (
                        <span className="text-xs text-tertiary">
                            Ends: {new Date(auction?.end_time || "").toLocaleDateString()}
                        </span>
                    )}
                </div>
            </div>
            <div className="text-right">
                {!isEnded && (
                    <div className="flex items-center gap-1 text-sm font-medium text-primary">
                        <Clock className="size-4 text-tertiary" />
                        {timeLeft}
                    </div>
                )}
                {isOutbid && !isEnded && (
                    <Button color="primary" size="sm" className="mt-2">
                        Bid Again
                    </Button>
                )}
                {isWon && (
                    <Button color="primary" size="sm" className="mt-2">
                        Complete Purchase
                    </Button>
                )}
            </div>
            <ChevronRight className="size-5 text-tertiary" />
        </Link>
    );
}

export default function MyBidsPage() {
    const { bids, isLoading, error, refreshBids } = useBids();

    useEffect(() => {
        refreshBids();
    }, []);

    if (isLoading) {
        return (
            <div className="flex items-center justify-center h-64">
                <RefreshCw01 className="size-8 animate-spin text-brand-600" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex items-center justify-center h-64">
                <div className="text-center">
                    <p className="text-tertiary">{error}</p>
                    <Button color="secondary" size="sm" onClick={refreshBids} className="mt-4">
                        Retry
                    </Button>
                </div>
            </div>
        );
    }

    const allBids = bids?.bids || [];
    const activeBids = bids?.activeBids || [];
    const wonBids = bids?.wonBids || [];
    const counts = bids?.counts || { active: 0, won: 0, lost: 0, total: 0 };

    return (
        <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
                        <TrendUp01 className="size-7 text-brand-600" />
                        My Bids
                    </h1>
                    <p className="mt-1 text-tertiary">Track all your active bids and bidding history</p>
                </div>
                <div className="flex items-center gap-3">
                    <Button color="secondary" size="sm" iconLeading={FilterLines}>
                        Filter
                    </Button>
                    <Button color="secondary" size="sm" iconLeading={SearchSm}>
                        Search
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-4 gap-4">
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-primary">{counts.active}</div>
                    <div className="text-xs text-tertiary">Active Bids</div>
                </div>
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-success-600">
                        {activeBids.filter((b) => b.status === "winning").length}
                    </div>
                    <div className="text-xs text-tertiary">Winning</div>
                </div>
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-error-600">
                        {activeBids.filter((b) => b.status === "outbid").length}
                    </div>
                    <div className="text-xs text-tertiary">Outbid</div>
                </div>
                <div className="bg-primary border border-secondary rounded-xl p-4">
                    <div className="text-2xl font-semibold text-brand-600">{counts.won}</div>
                    <div className="text-xs text-tertiary">Won</div>
                </div>
            </div>

            {/* Won Auctions - Need to Complete Purchase */}
            {wonBids.length > 0 && (
                <div className="bg-success-50 border border-success-200 rounded-xl">
                    <div className="border-b border-success-200 px-4 py-3">
                        <h2 className="text-sm font-semibold text-success-700">
                            Auctions Won - Complete Your Purchase
                        </h2>
                    </div>
                    <div className="divide-y divide-success-200">
                        {wonBids.map((bid) => (
                            <BidCard key={bid.id} bid={bid} />
                        ))}
                    </div>
                </div>
            )}

            {/* All Bids List */}
            <div className="bg-primary border border-secondary rounded-xl">
                <div className="border-b border-secondary px-4 py-3">
                    <h2 className="text-sm font-semibold text-primary">All Bids</h2>
                </div>
                {allBids.length === 0 ? (
                    <div className="p-8 text-center">
                        <p className="text-tertiary">No bids yet</p>
                        <Link href="/marketplace">
                            <Button color="primary" size="sm" className="mt-4">
                                Browse Auctions
                            </Button>
                        </Link>
                    </div>
                ) : (
                    <div className="divide-y divide-secondary">
                        {allBids.map((bid) => (
                            <BidCard key={bid.id} bid={bid} />
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
