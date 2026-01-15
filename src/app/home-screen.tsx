"use client";

import { Suspense, lazy } from "react";
import { HeroSection } from "@/components/sections/hero-section";
import {
    LazySection,
    CriticalSection,
    StandardSection,
    DeferredSection,
} from "@/components/shared-assets/lazy-section";

// Only preload immediately visible sections (above the fold)
const TrustAssuranceStrip = lazy(() =>
    import("@/components/sections/trust-assurance-strip").then((mod) => ({
        default: mod.TrustAssuranceStrip,
    }))
);

// Shimmer skeleton element
const ShimmerBox = ({ className }: { className?: string }) => (
    <div
        className={`relative overflow-hidden rounded bg-secondary ${className}`}
    >
        <div className="absolute inset-0 animate-shimmer" />
    </div>
);

// Loading skeleton component with shimmer effect
const SectionSkeleton = () => (
    <div className="w-full py-16">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <ShimmerBox className="h-8 w-1/3 mx-auto mb-4" />
            <ShimmerBox className="h-4 w-2/3 mx-auto" />
        </div>
    </div>
);

// Trust strip skeleton with shimmer
const TrustStripSkeleton = () => (
    <section className="bg-secondary border-y border-secondary">
        <div className="mx-auto max-w-8xl px-0 sm:px-6 lg:px-8">
            <div className="grid grid-cols-2 lg:grid-cols-4">
                {[...Array(4)].map((_, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 sm:px-2 border-b sm:border-b-0 border-primary"
                    >
                        <ShimmerBox className="size-8 sm:size-10 shrink-0 rounded-full" />
                        <div className="min-w-0 flex-1 space-y-2">
                            <ShimmerBox className="h-3 sm:h-4 w-24" />
                            <ShimmerBox className="h-2 sm:h-3 w-32" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    </section>
);

// Section import factories - only loaded when in viewport
const sectionFactories = {
    topCategories: () =>
        import("@/components/sections/top-categories-section").then((mod) => ({
            default: mod.TopCategoriesSection,
        })),
    bestDeals: () =>
        import("@/components/sections/best-deals-section").then((mod) => ({
            default: mod.BestDealsSection,
        })),
    mostViewed: () =>
        import("@/components/sections/most-viewed-section").then((mod) => ({
            default: mod.MostViewedSection,
        })),
    featuredPromotions: () =>
        import("@/components/sections/featured-promotions-banner").then((mod) => ({
            default: mod.FeaturedPromotionsBanner,
        })),
    dealsOfTheDay: () =>
        import("@/components/sections/deals-of-the-day-section").then((mod) => ({
            default: mod.DealsOfTheDaySection,
        })),
    premiumCollection: () =>
        import("@/components/sections/premium-collection-section").then((mod) => ({
            default: mod.PremiumCollectionSection,
        })),
    trendingProducts: () =>
        import("@/components/sections/trending-products-section").then((mod) => ({
            default: mod.TrendingProductsSection,
        })),
    certifiedItems: () =>
        import("@/components/sections/certified-items-section").then((mod) => ({
            default: mod.CertifiedItemsSection,
        })),
    staffPicks: () =>
        import("@/components/sections/staff-picks-section").then((mod) => ({
            default: mod.StaffPicksSection,
        })),
    featuredCollection: () =>
        import("@/components/sections/featured-collection-section").then((mod) => ({
            default: mod.FeaturedCollectionSection,
        })),
    featuredSellers: () =>
        import("@/components/sections/featured-sellers-section").then((mod) => ({
            default: mod.FeaturedSellersSection,
        })),
    lookingNow: () =>
        import("@/components/sections/looking-now-section").then((mod) => ({
            default: mod.LookingNowSection,
        })),
    latestFromCommunity: () =>
        import("@/components/sections/latest-from-community-section").then((mod) => ({
            default: mod.LatestFromCommunitySection,
        })),
    howItWorks: () =>
        import("@/components/sections/how-it-works-section").then((mod) => ({
            default: mod.HowItWorksSection,
        })),
    testimonials: () =>
        import("@/components/sections/testimonials-section").then((mod) => ({
            default: mod.TestimonialsSection,
        })),
    cta: () =>
        import("@/components/sections/cta-section").then((mod) => ({
            default: mod.CTASection,
        })),
};

// Main Home Screen Component with viewport-aware lazy loading
export const HomeScreen = () => {
    return (
        <div className="bg-primary">
            {/* Hero - Eagerly loaded for fastest LCP */}
            <HeroSection />

            {/* Trust Strip - Eagerly loaded as it's immediately visible */}
            <Suspense fallback={<TrustStripSkeleton />}>
                <TrustAssuranceStrip />
            </Suspense>

            {/* Critical sections - Load slightly earlier (800px before viewport) */}
            <CriticalSection
                factory={sectionFactories.topCategories}
                minHeight="400px"
            />
            <CriticalSection
                factory={sectionFactories.bestDeals}
                minHeight="500px"
            />

            {/* Standard sections - Load at 400px before viewport */}
            <StandardSection
                factory={sectionFactories.mostViewed}
                minHeight="400px"
            />
            <StandardSection
                factory={sectionFactories.featuredPromotions}
                minHeight="300px"
            />
            <StandardSection
                factory={sectionFactories.dealsOfTheDay}
                minHeight="500px"
            />
            <StandardSection
                factory={sectionFactories.premiumCollection}
                minHeight="400px"
            />
            <StandardSection
                factory={sectionFactories.trendingProducts}
                minHeight="400px"
            />
            <StandardSection
                factory={sectionFactories.certifiedItems}
                minHeight="400px"
            />
            <StandardSection
                factory={sectionFactories.staffPicks}
                minHeight="400px"
            />
            <StandardSection
                factory={sectionFactories.featuredCollection}
                minHeight="400px"
            />
            <StandardSection
                factory={sectionFactories.featuredSellers}
                minHeight="400px"
            />

            {/* Deferred sections - Load closer to viewport (100px) */}
            <DeferredSection
                factory={sectionFactories.lookingNow}
                minHeight="300px"
            />
            <DeferredSection
                factory={sectionFactories.latestFromCommunity}
                minHeight="400px"
            />
            <DeferredSection
                factory={sectionFactories.testimonials}
                minHeight="400px"
            />
            <DeferredSection
                factory={sectionFactories.howItWorks}
                minHeight="400px"
            />
            <DeferredSection
                factory={sectionFactories.cta}
                minHeight="300px"
            />
        </div>
    );
};
