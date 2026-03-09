"use client";

import { useState, useEffect, useCallback } from "react";
import { useAuth } from "@clerk/nextjs";

interface UseWishlistReturn {
    wishlistedIds: Set<string>;
    isLoading: boolean;
    isWishlisted: (productId: string) => boolean;
    toggleWishlist: (productId: string) => Promise<{ success: boolean; added: boolean; requiresAuth?: boolean }>;
}

export function useWishlist(): UseWishlistReturn {
    const { isSignedIn, isLoaded } = useAuth();
    const [wishlistedIds, setWishlistedIds] = useState<Set<string>>(new Set());
    const [isLoading, setIsLoading] = useState(true);

    // Fetch user's wishlist on mount
    useEffect(() => {
        async function fetchWishlist() {
            if (!isLoaded) return;

            if (!isSignedIn) {
                setWishlistedIds(new Set());
                setIsLoading(false);
                return;
            }

            try {
                const response = await fetch("/api/wishlist");
                if (response.ok) {
                    const data = await response.json();
                    setWishlistedIds(new Set(data.productIds || []));
                }
            } catch (error) {
                console.error("Failed to fetch wishlist:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchWishlist();
    }, [isSignedIn, isLoaded]);

    const isWishlisted = useCallback(
        (productId: string) => wishlistedIds.has(productId),
        [wishlistedIds]
    );

    const toggleWishlist = useCallback(
        async (productId: string): Promise<{ success: boolean; added: boolean; requiresAuth?: boolean }> => {
            if (!isSignedIn) {
                return { success: false, added: false, requiresAuth: true };
            }

            const currentlyWishlisted = wishlistedIds.has(productId);

            // Optimistic update
            setWishlistedIds((prev) => {
                const newSet = new Set(prev);
                if (currentlyWishlisted) {
                    newSet.delete(productId);
                } else {
                    newSet.add(productId);
                }
                return newSet;
            });

            try {
                const response = currentlyWishlisted
                    ? await fetch(`/api/wishlist?productId=${productId}`, { method: "DELETE" })
                    : await fetch("/api/wishlist", {
                          method: "POST",
                          headers: { "Content-Type": "application/json" },
                          body: JSON.stringify({ productId }),
                      });

                if (!response.ok) {
                    // Revert optimistic update on failure
                    setWishlistedIds((prev) => {
                        const newSet = new Set(prev);
                        if (currentlyWishlisted) {
                            newSet.add(productId);
                        } else {
                            newSet.delete(productId);
                        }
                        return newSet;
                    });
                    return { success: false, added: false };
                }

                return { success: true, added: !currentlyWishlisted };
            } catch (error) {
                console.error("Failed to toggle wishlist:", error);
                // Revert optimistic update
                setWishlistedIds((prev) => {
                    const newSet = new Set(prev);
                    if (currentlyWishlisted) {
                        newSet.add(productId);
                    } else {
                        newSet.delete(productId);
                    }
                    return newSet;
                });
                return { success: false, added: false };
            }
        },
        [isSignedIn, wishlistedIds]
    );

    return {
        wishlistedIds,
        isLoading,
        isWishlisted,
        toggleWishlist,
    };
}
