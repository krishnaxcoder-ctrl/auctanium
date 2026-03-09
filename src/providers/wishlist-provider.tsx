"use client";

import { createContext, useContext, ReactNode } from "react";
import { useWishlist } from "@/hooks/use-wishlist";

interface WishlistContextType {
    wishlistedIds: Set<string>;
    isLoading: boolean;
    isWishlisted: (productId: string) => boolean;
    toggleWishlist: (productId: string) => Promise<{ success: boolean; added: boolean; requiresAuth?: boolean }>;
}

const WishlistContext = createContext<WishlistContextType | undefined>(undefined);

export function useWishlistContext() {
    const context = useContext(WishlistContext);
    if (!context) {
        throw new Error("useWishlistContext must be used within a WishlistProvider");
    }
    return context;
}

export function WishlistProvider({ children }: { children: ReactNode }) {
    const wishlist = useWishlist();

    return (
        <WishlistContext.Provider value={wishlist}>
            {children}
        </WishlistContext.Provider>
    );
}
