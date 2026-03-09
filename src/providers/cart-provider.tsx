"use client";

import { createContext, useContext, type ReactNode } from "react";
import { useCart, type CartData } from "@/hooks/use-cart";

interface CartContextType {
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

const CartContext = createContext<CartContextType | null>(null);

export function CartProvider({ children }: { children: ReactNode }) {
    const cartState = useCart();

    return <CartContext.Provider value={cartState}>{children}</CartContext.Provider>;
}

export function useCartContext() {
    const context = useContext(CartContext);
    if (!context) {
        throw new Error("useCartContext must be used within a CartProvider");
    }
    return context;
}
