"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ShoppingBag01, Zap } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BidModal } from "@/components/bidding/bid-modal";
import { AddToCartButton } from "@/components/cart/add-to-cart-button";
import { useAuction, formatTimeRemaining } from "@/hooks/use-auction";
import { useCart } from "@/hooks/use-cart";
import { cx } from "@/utils/cx";

interface ProductActionsProps {
    product: {
        id: string;
        title: string;
        images?: string[];
        listing_type: "auction" | "buy-now" | "both";
        starting_price?: number;
        current_bid?: number;
        buy_now_price?: number;
        stock_quantity?: number;
        status: string;
    };
    auctionEndTime?: string;
    minimumBidIncrement?: number;
    className?: string;
    onBidPlaced?: (amount: number) => void;
    onAddToCart?: () => void;
    onBuyNow?: () => void;
}

export function ProductActions({
    product,
    auctionEndTime,
    minimumBidIncrement = 5,
    className,
    onBidPlaced,
    onAddToCart,
    onBuyNow,
}: ProductActionsProps) {
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const { addToCart } = useCart();

    const [isBuyingNow, setIsBuyingNow] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // For auction products, use the auction hook
    const { auctionStatus, timeRemaining, isEnded } = useAuction(
        product.listing_type !== "buy-now" ? product.id : null
    );

    const isAuction = product.listing_type === "auction" || product.listing_type === "both";
    const isBuyNow = product.listing_type === "buy-now" || product.listing_type === "both";
    const isAvailable = product.status === "active";
    const hasStock = (product.stock_quantity ?? 1) > 0;

    const currentBid = auctionStatus?.currentBid || product.current_bid || product.starting_price || 0;
    const buyNowPrice = product.buy_now_price;
    const timeInfo = auctionStatus ? formatTimeRemaining(timeRemaining) : null;

    const handleBuyNow = async () => {
        if (!isSignedIn) {
            setError("Please sign in to purchase");
            return;
        }

        if (!buyNowPrice) {
            setError("Buy Now is not available for this item");
            return;
        }

        setIsBuyingNow(true);
        setError(null);

        try {
            // Add to cart and redirect to checkout
            const result = await addToCart(product.id, 1);

            if (result.success) {
                onBuyNow?.();
                router.push("/checkout");
            } else {
                setError(result.message || "Failed to process");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsBuyingNow(false);
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    if (!isAvailable) {
        return (
            <div className={cx("rounded-lg bg-secondary p-4 text-center", className)}>
                <p className="font-medium text-tertiary">This item is no longer available</p>
            </div>
        );
    }

    return (
        <div className={cx("space-y-4", className)}>
            {/* Price Display */}
            <div className="space-y-2">
                {isAuction && (
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm text-tertiary">Current Bid:</span>
                        <span className="text-2xl font-bold text-primary">
                            {formatCurrency(currentBid)}
                        </span>
                    </div>
                )}

                {isBuyNow && buyNowPrice && (
                    <div className="flex items-baseline justify-between">
                        <span className="text-sm text-tertiary">
                            {isAuction ? "Buy Now Price:" : "Price:"}
                        </span>
                        <span
                            className={cx(
                                "font-bold",
                                isAuction ? "text-lg text-secondary" : "text-2xl text-primary"
                            )}
                        >
                            {formatCurrency(buyNowPrice)}
                        </span>
                    </div>
                )}
            </div>

            {/* Auction Time Remaining */}
            {isAuction && timeInfo && (
                <div
                    className={cx(
                        "rounded-lg p-3 text-center",
                        timeInfo.isUrgent && !isEnded
                            ? "bg-error-primary text-white"
                            : isEnded
                              ? "bg-secondary"
                              : "bg-warning-primary text-warning-primary"
                    )}
                >
                    {isEnded ? (
                        <span className="font-medium text-tertiary">Auction Ended</span>
                    ) : (
                        <>
                            <span className="text-sm font-medium">
                                {timeInfo.isUrgent ? "Ending Soon: " : "Time Left: "}
                            </span>
                            <span className="font-bold">{timeInfo.formatted}</span>
                        </>
                    )}
                </div>
            )}

            {/* Error Message */}
            {error && (
                <div className="rounded-lg bg-error-primary p-3 text-center text-sm text-white">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Bid Button (for auctions) */}
                {isAuction && !isEnded && (
                    <BidModal
                        productId={product.id}
                        productTitle={product.title}
                        productImage={product.images?.[0]}
                        currentBid={currentBid}
                        startingPrice={product.starting_price || 0}
                        minimumIncrement={minimumBidIncrement}
                        timeRemaining={timeRemaining}
                        onBidPlaced={onBidPlaced}
                        trigger={
                            <Button color="primary" size="lg" className="w-full">
                                Place Bid
                            </Button>
                        }
                    />
                )}

                {/* Buy Now Button */}
                {isBuyNow && buyNowPrice && hasStock && (
                    <Button
                        color={isAuction ? "secondary" : "primary"}
                        size="lg"
                        className="w-full"
                        onClick={handleBuyNow}
                        isLoading={isBuyingNow}
                        iconLeading={Zap}
                    >
                        Buy Now - {formatCurrency(buyNowPrice)}
                    </Button>
                )}

                {/* Add to Cart Button (for buy-now items) */}
                {isBuyNow && !isAuction && hasStock && (
                    <AddToCartButton
                        productId={product.id}
                        productTitle={product.title}
                        maxQuantity={product.stock_quantity}
                        onSuccess={onAddToCart}
                        onError={(msg) => setError(msg)}
                    />
                )}

                {/* Out of Stock */}
                {isBuyNow && !hasStock && (
                    <Button color="secondary" size="lg" className="w-full" isDisabled>
                        Out of Stock
                    </Button>
                )}
            </div>

            {/* Bid Count (for auctions) */}
            {isAuction && auctionStatus && (
                <div className="flex items-center justify-center gap-4 text-sm text-tertiary">
                    <span>{auctionStatus.totalBids} bids</span>
                    <span className="text-quaternary">|</span>
                    <span>{auctionStatus.uniqueBidders} bidders</span>
                </div>
            )}
        </div>
    );
}
