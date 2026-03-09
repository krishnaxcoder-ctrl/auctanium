"use client";

import { useState } from "react";
import { useAuth, useSignIn } from "@clerk/nextjs";
import { ShoppingCart01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useCart } from "@/hooks/use-cart";
import { cx } from "@/utils/cx";

interface AddToCartButtonProps {
    productId: string;
    productTitle: string;
    maxQuantity?: number;
    disabled?: boolean;
    size?: "sm" | "md" | "lg" | "xl";
    className?: string;
    showQuantity?: boolean;
    onSuccess?: () => void;
    onError?: (message: string) => void;
}

export function AddToCartButton({
    productId,
    productTitle,
    maxQuantity = 10,
    disabled = false,
    size = "lg",
    className,
    showQuantity = true,
    onSuccess,
    onError,
}: AddToCartButtonProps) {
    const { isSignedIn } = useAuth();
    const { addToCart } = useCart();

    const [quantity, setQuantity] = useState(1);
    const [isLoading, setIsLoading] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);

    const handleAddToCart = async () => {
        if (!isSignedIn) {
            onError?.("Please sign in to add items to your cart");
            return;
        }

        setIsLoading(true);
        const result = await addToCart(productId, quantity);
        setIsLoading(false);

        if (result.success) {
            setShowSuccess(true);
            setTimeout(() => setShowSuccess(false), 2000);
            onSuccess?.();
        } else {
            onError?.(result.message || "Failed to add to cart");
        }
    };

    const decrementQuantity = () => {
        setQuantity((prev) => Math.max(1, prev - 1));
    };

    const incrementQuantity = () => {
        setQuantity((prev) => Math.min(maxQuantity, prev + 1));
    };

    return (
        <div className={cx("flex flex-col gap-3", className)}>
            {showQuantity && (
                <div className="flex items-center gap-3">
                    <span className="text-sm font-medium text-secondary">Quantity:</span>
                    <div className="flex items-center rounded-lg border border-primary">
                        <button
                            type="button"
                            onClick={decrementQuantity}
                            disabled={quantity <= 1 || disabled}
                            className="px-3 py-2 text-lg font-medium text-secondary transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            -
                        </button>
                        <span className="min-w-[3rem] text-center font-medium text-primary">
                            {quantity}
                        </span>
                        <button
                            type="button"
                            onClick={incrementQuantity}
                            disabled={quantity >= maxQuantity || disabled}
                            className="px-3 py-2 text-lg font-medium text-secondary transition-colors hover:bg-secondary disabled:cursor-not-allowed disabled:opacity-50"
                        >
                            +
                        </button>
                    </div>
                </div>
            )}

            <Button
                color={showSuccess ? "secondary" : "primary"}
                size={size}
                onClick={handleAddToCart}
                isLoading={isLoading}
                isDisabled={disabled || showSuccess}
                iconLeading={ShoppingCart01}
                className={cx(
                    "w-full",
                    showSuccess && "bg-success-primary text-white hover:bg-success-primary"
                )}
            >
                {showSuccess ? "Added to Cart!" : "Add to Cart"}
            </Button>
        </div>
    );
}
