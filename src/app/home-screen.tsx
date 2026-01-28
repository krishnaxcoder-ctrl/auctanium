import { Suspense } from "react";
import dynamic from "next/dynamic";
import { HeroSection } from "@/components/sections/hero-section";
import { TrustAssuranceStrip } from "@/components/sections/trust-assurance-strip";
import { ShimmerBox, TrustStripSkeleton } from "@/components/shared-assets/skeletons";

// Dynamically import the client-side lazy sections container
// This keeps the homepage as a Server Component for faster initial paint
const LazySectionsClient = dynamic(
    () => import("@/components/sections/lazy-sections-client").then((mod) => mod.LazySectionsClient),
    {
        ssr: false,
        loading: () => <SectionsSkeleton />,
    }
);

// Hoisted static skeleton - avoids recreation on every render (rendering-hoist-jsx)
const SectionsSkeleton = () => (
    <div className="space-y-8">
        {Array.from({ length: 3 }, (_, i) => (
            <div key={i} className="w-full py-16">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <ShimmerBox className="h-8 w-1/3 mx-auto mb-4" />
                    <ShimmerBox className="h-4 w-2/3 mx-auto mb-8" />
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                        {Array.from({ length: 4 }, (_, j) => (
                            <div key={j} className="space-y-3">
                                <ShimmerBox className="aspect-square w-full" />
                                <ShimmerBox className="h-4 w-3/4" />
                                <ShimmerBox className="h-3 w-1/2" />
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        ))}
    </div>
);

// Main Home Screen Component - Server Component for optimal streaming
// Best practices applied:
// - server-parallel-fetching: Hero and TrustStrip render in parallel as RSC
// - bundle-dynamic-imports: Heavy sections loaded on demand
// - async-suspense-boundaries: Strategic Suspense for streaming
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
