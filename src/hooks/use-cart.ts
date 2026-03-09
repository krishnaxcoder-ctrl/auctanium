"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

export interface CartItem {
    id: string;
    quantity: number;
    product_id: string;
    products: {
        id: string;
        title: string;
        images: string[];
        buy_now_price: number;
        stock_quantity: number;
        shipping_cost: number;
        free_shipping: boolean;
        seller_id: string;
        seller_name: string;
        status: string;
    };
}

export interface CartData {
    items: CartItem[];
    itemCount: number;
    subtotal: number;
    shippingTotal: number;
    total: number;
}

interface UseCartReturn {
    cart: CartData | null;
    isLoading: boolean;
    error: string | null;
    addToCart: (productId: string, quantity?: number) => Promise<{ success: boolean; message?: string; requiresAuth?: boolean }>;
    updateQuantity: (itemId: string, quantity: number) => Promise<{ success: boolean; message?: string }>;
    removeItem: (itemId: string) => Promise<{ success: boolean; message?: string }>;
    clearCart: () => Promise<{ success: boolean; message?: string }>;
    refreshCart: () => Promise<void>;
    getItemCount: () => number;
}

export function useCart(): UseCartReturn {
    const { isSignedIn, isLoaded } = useAuth();
    const [cart, setCart] = useState<CartData | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const fetchCart = useCallback(async () => {
        if (!isLoaded) return;

        if (!isSignedIn) {
            setCart({ items: [], itemCount: 0, subtotal: 0, shippingTotal: 0, total: 0 });
            setIsLoading(false);
            return;
        }

        try {
            setError(null);
            const response = await fetch("/api/cart");
            if (response.ok) {
                const data = await response.json();
                setCart(data);
            } else {
                setError("Failed to fetch cart");
            }
        } catch (err) {
            console.error("Failed to fetch cart:", err);
            setError("Failed to fetch cart");
        } finally {
            setIsLoading(false);
        }
    }, [isSignedIn, isLoaded]);

    useEffect(() => {
        fetchCart();
    }, [fetchCart]);

    const addToCart = useCallback(
        async (productId: string, quantity: number = 1): Promise<{ success: boolean; message?: string; requiresAuth?: boolean }> => {
            if (!isSignedIn) {
                return { success: false, message: "Please sign in to add items to cart", requiresAuth: true };
            }

            try {
                const response = await fetch("/api/cart", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ productId, quantity }),
                });

                const data = await response.json();

                if (!response.ok) {
                    return { success: false, message: data.error || "Failed to add to cart" };
                }

                // Refresh cart after adding
                await fetchCart();
                return { success: true, message: data.message };
            } catch (err) {
                console.error("Failed to add to cart:", err);
                return { success: false, message: "Failed to add to cart" };
            }
        },
        [isSignedIn, fetchCart]
    );

    const updateQuantity = useCallback(
        async (itemId: string, quantity: number): Promise<{ success: boolean; message?: string }> => {
            if (!isSignedIn) {
                return { success: false, message: "Please sign in" };
            }

            // Optimistic update
            setCart((prev) => {
                if (!prev) return prev;
                const updatedItems = prev.items.map((item) =>
                    item.id === itemId ? { ...item, quantity } : item
                );
                const subtotal = updatedItems.reduce(
                    (sum, item) => sum + item.products.buy_now_price * item.quantity,
                    0
                );
                const shippingTotal = updatedItems.reduce(
                    (sum, item) => (item.products.free_shipping ? sum : sum + item.products.shipping_cost),
                    0
                );
                return {
                    ...prev,
                    items: updatedItems,
                    subtotal,
                    shippingTotal,
                    total: subtotal + shippingTotal,
                };
            });

            try {
                const response = await fetch("/api/cart", {
                    method: "PATCH",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ itemId, quantity }),
                });

                const data = await response.json();

                if (!response.ok) {
                    // Revert on failure
                    await fetchCart();
                    return { success: false, message: data.error || "Failed to update quantity" };
                }

                return { success: true, message: data.message };
            } catch (err) {
                console.error("Failed to update quantity:", err);
                await fetchCart();
                return { success: false, message: "Failed to update quantity" };
            }
        },
        [isSignedIn, fetchCart]
    );

    const removeItem = useCallback(
        async (itemId: string): Promise<{ success: boolean; message?: string }> => {
            if (!isSignedIn) {
                return { success: false, message: "Please sign in" };
            }

            // Optimistic update
            setCart((prev) => {
                if (!prev) return prev;
                const updatedItems = prev.items.filter((item) => item.id !== itemId);
                const subtotal = updatedItems.reduce(
                    (sum, item) => sum + item.products.buy_now_price * item.quantity,
                    0
                );
                const shippingTotal = updatedItems.reduce(
                    (sum, item) => (item.products.free_shipping ? sum : sum + item.products.shipping_cost),
                    0
                );
                return {
                    ...prev,
                    items: updatedItems,
                    itemCount: updatedItems.length,
                    subtotal,
                    shippingTotal,
                    total: subtotal + shippingTotal,
                };
            });

            try {
                const response = await fetch(`/api/cart?itemId=${itemId}`, {
                    method: "DELETE",
                });

                const data = await response.json();

                if (!response.ok) {
                    await fetchCart();
                    return { success: false, message: data.error || "Failed to remove item" };
                }

                return { success: true, message: data.message };
            } catch (err) {
                console.error("Failed to remove item:", err);
                await fetchCart();
                return { success: false, message: "Failed to remove item" };
            }
        },
        [isSignedIn, fetchCart]
    );

    const clearCart = useCallback(async (): Promise<{ success: boolean; message?: string }> => {
        if (!isSignedIn) {
            return { success: false, message: "Please sign in" };
        }

        try {
            const response = await fetch("/api/cart?clearAll=true", {
                method: "DELETE",
            });

            const data = await response.json();

            if (!response.ok) {
                return { success: false, message: data.error || "Failed to clear cart" };
            }

            setCart({ items: [], itemCount: 0, subtotal: 0, shippingTotal: 0, total: 0 });
            return { success: true, message: data.message };
        } catch (err) {
            console.error("Failed to clear cart:", err);
            return { success: false, message: "Failed to clear cart" };
        }
    }, [isSignedIn]);

    const getItemCount = useCallback(() => {
        return cart?.items.reduce((sum, item) => sum + item.quantity, 0) || 0;
    }, [cart]);

    return {
        cart,
        isLoading,
        error,
        addToCart,
        updateQuantity,
        removeItem,
        clearCart,
        refreshCart: fetchCart,
        getItemCount,
    };
}
