"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Trash01,
    Plus,
    Minus,
    ShoppingCart01,
    Lock01,
    Truck01,
    RefreshCw01,
    ChevronRight,
    Tag01,
    XClose,
    Shield01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { useCart } from "@/hooks/use-cart";

export default function CartPage() {
    const { cart, isLoading, updateQuantity, removeItem, clearCart } = useCart();

    const [promoCode, setPromoCode] = useState("");
    const [promoApplied, setPromoApplied] = useState(false);
    const [promoDiscount, setPromoDiscount] = useState(0);

    const handleUpdateQuantity = async (itemId: string, newQuantity: number) => {
        if (newQuantity < 1) return;
        await updateQuantity(itemId, newQuantity);
    };

    const handleRemoveItem = async (itemId: string) => {
        await removeItem(itemId);
    };

    const handleClearCart = async () => {
        await clearCart();
    };

    const applyPromoCode = () => {
        if (promoCode.toLowerCase() === "save10") {
            setPromoApplied(true);
            setPromoDiscount(10);
        }
    };

    const removePromoCode = () => {
        setPromoApplied(false);
        setPromoDiscount(0);
        setPromoCode("");
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    // Loading state
    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <RefreshCw01 className="size-8 animate-spin text-brand-600" />
            </div>
        );
    }

    // Empty cart
    if (!cart || cart.items.length === 0) {
        return (
            <div className="min-h-screen bg-primary">
                <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
                    <div className="text-center">
                        <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-secondary">
                            <ShoppingCart01 className="size-12 text-tertiary" />
                        </div>
                        <h1 className="mt-6 text-2xl font-semibold text-primary">Your cart is empty</h1>
                        <p className="mt-2 text-tertiary">
                            Looks like you haven't added anything to your cart yet.
                        </p>
                        <Link href="/marketplace">
                            <Button color="primary" size="lg" className="mt-8">
                                Continue Shopping
                            </Button>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = cart.subtotal;
    const promoDiscountAmount = promoApplied ? (subtotal * promoDiscount) / 100 : 0;
    const shipping = cart.shippingTotal;
    const buyerProtectionFee = 9; // Fixed fee
    const tax = (subtotal - promoDiscountAmount) * 0.08; // 8% tax
    const total = subtotal - promoDiscountAmount + shipping + buyerProtectionFee + tax;

    return (
        <div className="min-h-screen bg-secondary">
            {/* Header */}
            <div className="border-b border-secondary bg-primary">
                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <h1 className="text-2xl font-semibold text-primary">Shopping Cart</h1>
                        <span className="text-sm text-tertiary">
                            {cart.items.reduce((sum, item) => sum + item.quantity, 0)} items
                        </span>
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-4">
                        {/* Free Shipping Banner */}
                        {subtotal < 100 && (
                            <div className="flex items-center gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4">
                                <Truck01 className="size-5 text-brand-600" />
                                <p className="text-sm text-brand-700">
                                    Add <span className="font-semibold">{formatCurrency(100 - subtotal)}</span> more to
                                    qualify for <span className="font-semibold">FREE shipping!</span>
                                </p>
                            </div>
                        )}

                        {/* Cart Items List */}
                        <div className="rounded-xl border border-secondary bg-primary divide-y divide-secondary">
                            {cart.items.map((item) => (
                                <div key={item.id} className="p-4 sm:p-6">
                                    <div className="flex gap-4">
                                        {/* Product Image */}
                                        <Link href={`/listing/${item.product_id}`} className="shrink-0">
                                            <div className="relative size-24 sm:size-28 overflow-hidden rounded-lg border border-secondary bg-secondary">
                                                {item.products.images && item.products.images.length > 0 ? (
                                                    <Image
                                                        src={item.products.images[0]}
                                                        alt={item.products.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-tertiary text-xs">
                                                        No image
                                                    </div>
                                                )}
                                            </div>
                                        </Link>

                                        {/* Product Details */}
                                        <div className="flex-1 min-w-0">
                                            <div className="flex items-start justify-between gap-4">
                                                <div>
                                                    <Link
                                                        href={`/listing/${item.product_id}`}
                                                        className="text-sm sm:text-base font-medium text-primary hover:text-brand-600 transition-colors line-clamp-2"
                                                    >
                                                        {item.products.title}
                                                    </Link>
                                                    <p className="mt-1 text-xs text-tertiary">
                                                        Sold by: {item.products.seller_name || "Seller"}
                                                    </p>
                                                    {item.quantity <= item.products.stock_quantity ? (
                                                        <p className="mt-1 text-xs text-success-600">In stock</p>
                                                    ) : (
                                                        <p className="mt-1 text-xs text-error-600">
                                                            Only {item.products.stock_quantity} left
                                                        </p>
                                                    )}
                                                </div>
                                                <button
                                                    onClick={() => handleRemoveItem(item.id)}
                                                    className="text-tertiary hover:text-error-600 transition-colors p-1"
                                                >
                                                    <Trash01 className="size-5" />
                                                </button>
                                            </div>

                                            {/* Price & Quantity */}
                                            <div className="mt-4 flex items-center justify-between">
                                                {/* Quantity Controls */}
                                                <div className="flex items-center gap-2">
                                                    <div className="flex items-center border border-secondary rounded-lg">
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity - 1)}
                                                            disabled={item.quantity <= 1}
                                                            className="p-2 text-tertiary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Minus className="size-4" />
                                                        </button>
                                                        <span className="w-10 text-center text-sm font-medium text-primary">
                                                            {item.quantity}
                                                        </span>
                                                        <button
                                                            onClick={() => handleUpdateQuantity(item.id, item.quantity + 1)}
                                                            disabled={item.quantity >= item.products.stock_quantity}
                                                            className="p-2 text-tertiary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                                                        >
                                                            <Plus className="size-4" />
                                                        </button>
                                                    </div>
                                                </div>

                                                {/* Price */}
                                                <div className="text-right">
                                                    <div className="text-base sm:text-lg font-semibold text-primary">
                                                        {formatCurrency(item.products.buy_now_price * item.quantity)}
                                                    </div>
                                                    {item.quantity > 1 && (
                                                        <div className="text-sm text-tertiary">
                                                            {formatCurrency(item.products.buy_now_price)} each
                                                        </div>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        {/* Continue Shopping */}
                        <div className="flex items-center justify-between pt-4">
                            <Link
                                href="/marketplace"
                                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition-colors"
                            >
                                <ChevronRight className="size-4 rotate-180" />
                                Continue Shopping
                            </Link>
                            <button
                                onClick={handleClearCart}
                                className="text-sm text-tertiary hover:text-error-600 transition-colors"
                            >
                                Clear Cart
                            </button>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-4">
                            {/* Summary Card */}
                            <div className="rounded-xl border border-secondary bg-primary p-6">
                                <h2 className="text-lg font-semibold text-primary mb-4">Order Summary</h2>

                                {/* Promo Code */}
                                <div className="mb-6">
                                    {promoApplied ? (
                                        <div className="flex items-center justify-between p-3 rounded-lg bg-success-50 border border-success-200">
                                            <div className="flex items-center gap-2">
                                                <Tag01 className="size-4 text-success-600" />
                                                <span className="text-sm font-medium text-success-700">
                                                    {promoCode.toUpperCase()} applied
                                                </span>
                                            </div>
                                            <button
                                                onClick={removePromoCode}
                                                className="text-success-600 hover:text-success-700"
                                            >
                                                <XClose className="size-4" />
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex gap-2">
                                            <input
                                                type="text"
                                                value={promoCode}
                                                onChange={(e) => setPromoCode(e.target.value)}
                                                placeholder="Promo code"
                                                className="flex-1 px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                                            />
                                            <Button
                                                color="secondary"
                                                size="sm"
                                                onClick={applyPromoCode}
                                                isDisabled={!promoCode}
                                            >
                                                Apply
                                            </Button>
                                        </div>
                                    )}
                                </div>

                                {/* Price Breakdown */}
                                <div className="space-y-3 text-sm">
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Subtotal</span>
                                        <span className="text-primary">{formatCurrency(subtotal)}</span>
                                    </div>
                                    {promoApplied && (
                                        <div className="flex items-center justify-between text-success-600">
                                            <span>Promo discount ({promoDiscount}%)</span>
                                            <span>-{formatCurrency(promoDiscountAmount)}</span>
                                        </div>
                                    )}
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Shipping</span>
                                        <span className="text-primary">
                                            {shipping === 0 ? (
                                                <span className="text-success-600">FREE</span>
                                            ) : (
                                                formatCurrency(shipping)
                                            )}
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Buyer Protection</span>
                                        <span className="text-primary">{formatCurrency(buyerProtectionFee)}</span>
                                    </div>
                                    <div className="flex items-center justify-between">
                                        <span className="text-tertiary">Tax (8%)</span>
                                        <span className="text-primary">{formatCurrency(tax)}</span>
                                    </div>
                                    <div className="border-t border-secondary pt-3 mt-3">
                                        <div className="flex items-center justify-between">
                                            <span className="text-base font-semibold text-primary">Total</span>
                                            <span className="text-xl font-semibold text-primary">
                                                {formatCurrency(total)}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Checkout Button */}
                                <Link href="/checkout" className="block mt-6">
                                    <Button color="primary" size="lg" className="w-full">
                                        Proceed to Checkout
                                    </Button>
                                </Link>

                                {/* Secure Checkout */}
                                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-tertiary">
                                    <Lock01 className="size-3.5" />
                                    <span>Secure checkout</span>
                                </div>
                            </div>

                            {/* Trust Badges */}
                            <div className="rounded-xl border border-secondary bg-primary p-4">
                                <div className="grid grid-cols-3 gap-4 text-center">
                                    <div>
                                        <Truck01 className="size-6 mx-auto text-tertiary" />
                                        <p className="mt-2 text-xs text-tertiary">Free Shipping</p>
                                        <p className="text-xs text-quaternary">Orders $100+</p>
                                    </div>
                                    <div>
                                        <RefreshCw01 className="size-6 mx-auto text-tertiary" />
                                        <p className="mt-2 text-xs text-tertiary">Easy Returns</p>
                                        <p className="text-xs text-quaternary">7-day policy</p>
                                    </div>
                                    <div>
                                        <Shield01 className="size-6 mx-auto text-tertiary" />
                                        <p className="mt-2 text-xs text-tertiary">Protected</p>
                                        <p className="text-xs text-quaternary">Buyer guarantee</p>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Methods */}
                            <div className="text-center">
                                <p className="text-xs text-tertiary mb-2">We accept</p>
                                <div className="flex items-center justify-center gap-2 flex-wrap">
                                    {["Visa", "Mastercard", "Amex", "PayPal"].map((method) => (
                                        <span
                                            key={method}
                                            className="text-xs border border-secondary px-2 py-1 text-tertiary rounded"
                                        >
                                            {method}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
