"use client";

import { useState } from "react";
import { useAuth } from "@clerk/nextjs";
import { useRouter } from "next/navigation";
import { ShoppingCart01, Zap, Minus, Plus, Check, Truck01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { BidModal } from "@/components/bidding/bid-modal";
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
        free_shipping?: boolean;
    };
    auctionEndTime?: string;
    minimumBidIncrement?: number;
    className?: string;
    onBidPlaced?: (amount: number) => void;
    onAddToCart?: () => void;
    onBuyNow?: () => void;
    showPriceSection?: boolean;
}

export function ProductActions({
    product,
    auctionEndTime,
    minimumBidIncrement = 5,
    className,
    onBidPlaced,
    onAddToCart,
    onBuyNow,
    showPriceSection = true,
}: ProductActionsProps) {
    const { isSignedIn } = useAuth();
    const router = useRouter();
    const { addToCart, isLoading: isCartLoading } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [isBuyingNow, setIsBuyingNow] = useState(false);
    const [isAddingToCart, setIsAddingToCart] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [successMessage, setSuccessMessage] = useState<string | null>(null);

    // For auction products, use the auction hook
    const { auctionStatus, timeRemaining, isEnded } = useAuction(
        product.listing_type !== "buy-now" ? product.id : null
    );

    const isAuction = product.listing_type === "auction" || product.listing_type === "both";
    const isBuyNow = product.listing_type === "buy-now" || product.listing_type === "both";
    const isAvailable = product.status === "active";
    const maxQuantity = product.stock_quantity ?? 1;
    const hasStock = maxQuantity > 0;

    const currentBid = auctionStatus?.currentBid || product.current_bid || product.starting_price || 0;
    const buyNowPrice = product.buy_now_price;
    const timeInfo = auctionStatus ? formatTimeRemaining(timeRemaining) : null;

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    const handleQuantityChange = (delta: number) => {
        const newQty = quantity + delta;
        if (newQty >= 1 && newQty <= maxQuantity) {
            setQuantity(newQty);
        }
    };

    const handleAddToCart = async () => {
        if (!isSignedIn) {
            router.push("/login");
            return;
        }

        setIsAddingToCart(true);
        setError(null);
        setSuccessMessage(null);

        try {
            const result = await addToCart(product.id, quantity);
            if (result.success) {
                setSuccessMessage("Added to cart!");
                onAddToCart?.();
                setTimeout(() => setSuccessMessage(null), 2000);
            } else {
                setError(result.message || "Failed to add to cart");
            }
        } catch (err) {
            setError("Something went wrong");
        } finally {
            setIsAddingToCart(false);
        }
    };

    const handleBuyNow = async () => {
        if (!isSignedIn) {
            router.push("/login");
            return;
        }

        if (!buyNowPrice) {
            setError("Buy Now is not available for this item");
            return;
        }

        setIsBuyingNow(true);
        setError(null);

        try {
            const result = await addToCart(product.id, quantity);
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

    if (!isAvailable) {
        return (
            <div className={cx("rounded-xl bg-secondary p-6 text-center", className)}>
                <p className="font-medium text-tertiary">This item is no longer available</p>
            </div>
        );
    }

    // Pure Buy Now Product UI
    if (!isAuction && isBuyNow) {
        return (
            <div className={cx("space-y-5", className)}>
                {/* Stock Status */}
                {hasStock && (
                    <div className="flex items-center gap-2">
                        <div className="flex items-center justify-center size-5 rounded-full bg-success-100">
                            <Check className="size-3 text-success-600" />
                        </div>
                        <span className="text-sm font-medium text-success-600">
                            In Stock {maxQuantity > 1 && `(${maxQuantity} available)`}
                        </span>
                    </div>
                )}

                {/* Quantity Selector */}
                {hasStock && maxQuantity > 1 && (
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-primary">Quantity</label>
                        <div className="flex items-center gap-3">
                            <div className="flex items-center border border-secondary rounded-lg">
                                <button
                                    onClick={() => handleQuantityChange(-1)}
                                    disabled={quantity <= 1}
                                    className="p-3 text-tertiary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Minus className="size-4" />
                                </button>
                                <span className="w-12 text-center text-base font-semibold text-primary">
                                    {quantity}
                                </span>
                                <button
                                    onClick={() => handleQuantityChange(1)}
                                    disabled={quantity >= maxQuantity}
                                    className="p-3 text-tertiary hover:text-primary disabled:opacity-40 disabled:cursor-not-allowed transition-colors"
                                >
                                    <Plus className="size-4" />
                                </button>
                            </div>
                            {quantity > 1 && buyNowPrice && (
                                <span className="text-sm text-tertiary">
                                    Total: <span className="font-semibold text-primary">{formatCurrency(buyNowPrice * quantity)}</span>
                                </span>
                            )}
                        </div>
                    </div>
                )}

                {/* Error/Success Messages */}
                {error && (
                    <div className="rounded-lg bg-error-50 border border-error-200 p-3 text-sm text-error-700">
                        {error}
                    </div>
                )}
                {successMessage && (
                    <div className="rounded-lg bg-success-50 border border-success-200 p-3 text-sm text-success-700 flex items-center gap-2">
                        <Check className="size-4" />
                        {successMessage}
                    </div>
                )}

                {/* Action Buttons */}
                {hasStock ? (
                    <div className="flex gap-3">
                        <Button
                            color="primary"
                            size="lg"
                            className="flex-1"
                            onClick={handleBuyNow}
                            isLoading={isBuyingNow}
                            iconLeading={Zap}
                        >
                            Buy Now
                        </Button>
                        <Button
                            color="secondary"
                            size="lg"
                            className="flex-1"
                            onClick={handleAddToCart}
                            isLoading={isAddingToCart}
                            iconLeading={ShoppingCart01}
                        >
                            Add to Cart
                        </Button>
                    </div>
                ) : (
                    <Button color="secondary" size="xl" className="w-full" isDisabled>
                        Out of Stock
                    </Button>
                )}
            </div>
        );
    }

    // Auction or Both (Auction + Buy Now) UI
    return (
        <div className={cx("space-y-4", className)}>
            {/* Error Message */}
            {error && (
                <div className="rounded-lg bg-error-50 border border-error-200 p-3 text-sm text-error-700">
                    {error}
                </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3">
                {/* Both Auction + Buy Now - Side by Side */}
                {isAuction && !isEnded && isBuyNow && buyNowPrice && hasStock && (
                    <div className="flex gap-3">
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
                                <Button color="primary" size="lg" className="flex-1">
                                    Place Bid
                                </Button>
                            }
                        />
                        <Button
                            color="secondary"
                            size="lg"
                            className="flex-1"
                            onClick={handleBuyNow}
                            isLoading={isBuyingNow}
                            iconLeading={Zap}
                        >
                            Buy Now - {formatCurrency(buyNowPrice)}
                        </Button>
                    </div>
                )}

                {/* Auction Only - Full Width */}
                {isAuction && !isEnded && !(isBuyNow && buyNowPrice && hasStock) && (
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
                            <Button color="primary" size="xl" className="w-full">
                                Place Bid
                            </Button>
                        }
                    />
                )}

                {/* Buy Now Only (no auction or auction ended) - Full Width */}
                {(!isAuction || isEnded) && isBuyNow && buyNowPrice && hasStock && (
                    <Button
                        color="primary"
                        size="xl"
                        className="w-full"
                        onClick={handleBuyNow}
                        isLoading={isBuyingNow}
                        iconLeading={Zap}
                    >
                        Buy Now - {formatCurrency(buyNowPrice)}
                    </Button>
                )}

                {/* Out of Stock */}
                {isBuyNow && !hasStock && (
                    <Button color="secondary" size="xl" className="w-full" isDisabled>
                        Out of Stock
                    </Button>
                )}
            </div>

            {/* Bid Count (for auctions) */}
            {isAuction && auctionStatus && (
                <div className="flex items-center justify-center gap-4 text-sm text-tertiary pt-2">
                    <span>{auctionStatus.totalBids} bids</span>
                    <span className="text-quaternary">•</span>
                    <span>{auctionStatus.uniqueBidders} bidders</span>
                </div>
            )}
        </div>
    );
}
