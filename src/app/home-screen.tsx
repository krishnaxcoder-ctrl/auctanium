"use client";

import { Suspense } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustAssuranceStrip } from "@/components/sections/trust-assurance-strip";
import { TrustStripSkeleton } from "@/components/shared-assets/skeletons";
import { LazySectionsClient } from "@/components/sections/lazy-sections-client";

// Main Home Screen Component - Optimized with React best practices
// Best practices applied:
// - bundle-dynamic-imports: Heavy sections loaded on demand via viewport detection
// - rerender-memo: Components memoized to prevent unnecessary re-renders
// - rendering-hoist-jsx: Static elements hoisted outside render
// - rerender-lazy-state-init: Lazy components cached to avoid recreation
export const HomeScreen = () => {
    return (
        <div className="bg-primary">
            {/* Hero - Eagerly loaded for fastest LCP */}
            <HeroSection />

            {/* Trust Strip - Directly rendered (no lazy needed, it's small) */}
            <Suspense fallback={<TrustStripSkeleton />}>
                <TrustAssuranceStrip />
            </Suspense>

            {/* All lazy sections in a single client boundary for viewport-aware loading */}
            <LazySectionsClient />
        </div>
    );
};
