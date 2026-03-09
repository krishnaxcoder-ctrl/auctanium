"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";
import { Dialog, DialogTrigger, Modal, ModalOverlay } from "@/components/application/modals/modal";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";
import { useBids } from "@/hooks/use-bids";
import { formatTimeRemaining, calculateMinimumBid, generateQuickBidAmounts } from "@/hooks/use-auction";

interface BidModalProps {
    productId: string;
    productTitle: string;
    productImage?: string;
    currentBid: number;
    startingPrice: number;
    minimumIncrement?: number;
    timeRemaining: number;
    auctionId?: string;
    onBidPlaced?: (amount: number) => void;
    trigger?: React.ReactNode;
}

export function BidModal({
    productId,
    productTitle,
    productImage,
    currentBid,
    startingPrice,
    minimumIncrement = 5,
    timeRemaining,
    onBidPlaced,
    trigger,
}: BidModalProps) {
    const { isSignedIn } = useAuth();
    const { placeBid } = useBids();

    const [isOpen, setIsOpen] = useState(false);
    const [bidAmount, setBidAmount] = useState("");
    const [maxBidAmount, setMaxBidAmount] = useState("");
    const [useMaxBid, setUseMaxBid] = useState(false);
    const [agreedToTerms, setAgreedToTerms] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState(false);

    const minBid = calculateMinimumBid(currentBid, startingPrice, minimumIncrement);
    const quickBids = generateQuickBidAmounts(currentBid, startingPrice, minimumIncrement);
    const timeInfo = formatTimeRemaining(timeRemaining);

    // Reset state when modal opens
    useEffect(() => {
        if (isOpen) {
            setBidAmount(minBid.toString());
            setMaxBidAmount("");
            setUseMaxBid(false);
            setAgreedToTerms(false);
            setError(null);
            setSuccess(false);
        }
    }, [isOpen, minBid]);

    const handleQuickBid = useCallback((amount: number) => {
        setBidAmount(amount.toString());
    }, []);

    const handleSubmit = async () => {
        if (!isSignedIn) {
            setError("Please sign in to place a bid");
            return;
        }

        if (!agreedToTerms) {
            setError("Please agree to the terms and conditions");
            return;
        }

        const amount = parseFloat(bidAmount);
        if (isNaN(amount) || amount < minBid) {
            setError(`Minimum bid is $${minBid.toFixed(2)}`);
            return;
        }

        const maxBid = useMaxBid ? parseFloat(maxBidAmount) : undefined;
        if (useMaxBid && maxBid && maxBid < amount) {
            setError("Max bid must be greater than or equal to your bid");
            return;
        }

        setIsSubmitting(true);
        setError(null);

        const result = await placeBid(productId, amount, maxBid);

        setIsSubmitting(false);

        if (result.success) {
            setSuccess(true);
            onBidPlaced?.(amount);
            // Close modal after a short delay
            setTimeout(() => {
                setIsOpen(false);
            }, 1500);
        } else {
            setError(result.message || "Failed to place bid");
        }
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    return (
        <DialogTrigger isOpen={isOpen} onOpenChange={setIsOpen}>
            {trigger || (
                <Button color="primary" size="lg">
                    Place Bid
                </Button>
            )}

            <ModalOverlay>
                <Modal className="max-w-md">
                    <Dialog>
                        <div className="w-full rounded-xl bg-primary p-6 shadow-xl">
                            {/* Header */}
                            <div className="mb-6 flex items-start gap-4">
                                {productImage && (
                                    <img
                                        src={productImage}
                                        alt={productTitle}
                                        className="h-16 w-16 rounded-lg object-cover"
                                    />
                                )}
                                <div className="flex-1">
                                    <h2 className="text-lg font-semibold text-primary">{productTitle}</h2>
                                    <div className="mt-1 flex items-center gap-3">
                                        <span className="text-sm text-tertiary">Current Bid:</span>
                                        <span className="text-lg font-bold text-brand-primary">
                                            {formatCurrency(currentBid > 0 ? currentBid : startingPrice)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            {/* Time Remaining */}
                            <div
                                className={cx(
                                    "mb-6 rounded-lg p-3 text-center",
                                    timeInfo.isUrgent ? "bg-error-primary text-white" : "bg-secondary"
                                )}
                            >
                                <span className="text-sm font-medium">
                                    {timeInfo.isUrgent ? "Ending Soon: " : "Time Remaining: "}
                                </span>
                                <span className="font-bold">{timeInfo.formatted}</span>
                            </div>

                            {success ? (
                                <div className="rounded-lg bg-success-primary p-4 text-center text-white">
                                    <svg
                                        className="mx-auto mb-2 h-12 w-12"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M5 13l4 4L19 7"
                                        />
                                    </svg>
                                    <p className="font-semibold">Bid Placed Successfully!</p>
                                    <p className="mt-1 text-sm opacity-90">
                                        Your bid of {formatCurrency(parseFloat(bidAmount))} has been placed.
                                    </p>
                                </div>
                            ) : (
                                <>
                                    {/* Quick Bid Buttons */}
                                    <div className="mb-4">
                                        <label className="mb-2 block text-sm font-medium text-secondary">
                                            Quick Bid
                                        </label>
                                        <div className="grid grid-cols-3 gap-2">
                                            {quickBids.map((amount) => (
                                                <button
                                                    key={amount}
                                                    type="button"
                                                    onClick={() => handleQuickBid(amount)}
                                                    className={cx(
                                                        "rounded-lg border py-2 text-sm font-medium transition-colors",
                                                        bidAmount === amount.toString()
                                                            ? "border-brand-600 bg-brand-600 text-white"
                                                            : "border-secondary bg-primary text-primary hover:border-brand-600 hover:text-brand-600"
                                                    )}
                                                >
                                                    {formatCurrency(amount)}
                                                </button>
                                            ))}
                                        </div>
                                    </div>

                                    {/* Custom Bid Amount */}
                                    <div className="mb-4">
                                        <Input
                                            label="Your Bid"
                                            type="number"
                                            value={bidAmount}
                                            onChange={(e) => setBidAmount(e.target.value)}
                                            placeholder={`Min: ${formatCurrency(minBid)}`}
                                            isInvalid={!!error && error.includes("Minimum")}
                                            hint={`Minimum bid: ${formatCurrency(minBid)}`}
                                        />
                                    </div>

                                    {/* Max Bid Toggle */}
                                    <div className="mb-4">
                                        <label className="flex cursor-pointer items-center gap-3">
                                            <input
                                                type="checkbox"
                                                checked={useMaxBid}
                                                onChange={(e) => setUseMaxBid(e.target.checked)}
                                                className="h-4 w-4 rounded border-primary text-brand-primary focus:ring-brand-primary"
                                            />
                                            <span className="text-sm text-secondary">
                                                Set maximum bid (auto-bid)
                                            </span>
                                        </label>

                                        {useMaxBid && (
                                            <div className="mt-3">
                                                <Input
                                                    label="Maximum Bid"
                                                    type="number"
                                                    value={maxBidAmount}
                                                    onChange={(e) => setMaxBidAmount(e.target.value)}
                                                    placeholder="Enter your maximum"
                                                    hint="We'll bid for you up to this amount"
                                                />
                                            </div>
                                        )}
                                    </div>

                                    {/* Terms Agreement */}
                                    <div className="mb-6">
                                        <label className="flex cursor-pointer items-start gap-3">
                                            <input
                                                type="checkbox"
                                                checked={agreedToTerms}
                                                onChange={(e) => setAgreedToTerms(e.target.checked)}
                                                className="mt-1 h-4 w-4 rounded border-primary text-brand-primary focus:ring-brand-primary"
                                            />
                                            <span className="text-sm text-tertiary">
                                                I understand that placing a bid creates a binding contract to
                                                purchase this item if I win. By bidding, I agree to the{" "}
                                                <a href="/terms" className="text-brand-primary hover:underline">
                                                    Terms of Service
                                                </a>
                                                .
                                            </span>
                                        </label>
                                    </div>

                                    {/* Error Message */}
                                    {error && (
                                        <div className="mb-4 rounded-lg bg-error-primary p-3 text-sm text-white">
                                            {error}
                                        </div>
                                    )}

                                    {/* Action Buttons */}
                                    <div className="flex gap-3">
                                        <Button
                                            color="secondary"
                                            size="lg"
                                            className="flex-1"
                                            onClick={() => setIsOpen(false)}
                                            isDisabled={isSubmitting}
                                        >
                                            Cancel
                                        </Button>
                                        <Button
                                            color="primary"
                                            size="lg"
                                            className="flex-1"
                                            onClick={handleSubmit}
                                            isLoading={isSubmitting}
                                            isDisabled={!agreedToTerms || timeRemaining <= 0}
                                        >
                                            {useMaxBid ? "Set Max Bid" : "Place Bid"}
                                        </Button>
                                    </div>
                                </>
                            )}
                        </div>
                    </Dialog>
                </Modal>
            </ModalOverlay>
        </DialogTrigger>
    );
}
