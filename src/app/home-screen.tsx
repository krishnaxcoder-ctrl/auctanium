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

// Loading skeleton component
const SectionSkeleton = () => (
    <div className="w-full py-16 animate-pulse">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-secondary rounded w-2/3 mx-auto" />
        </div>
    </div>
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
    buyerProtection: () =>
        import("@/components/sections/buyer-protection-section").then((mod) => ({
            default: mod.BuyerProtectionSection,
        })),
    joinCommunity: () =>
        import("@/components/sections/join-community-section").then((mod) => ({
            default: mod.JoinCommunitySection,
        })),
    lookingNow: () =>
        import("@/components/sections/looking-now-section").then((mod) => ({
            default: mod.LookingNowSection,
        })),
    learningArticles: () =>
        import("@/components/sections/learning-articles-section").then((mod) => ({
            default: mod.LearningArticlesSection,
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
            <Suspense fallback={<SectionSkeleton />}>
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
                factory={sectionFactories.buyerProtection}
                minHeight="300px"
            />
            <DeferredSection
                factory={sectionFactories.joinCommunity}
                minHeight="300px"
            />
            <DeferredSection
                factory={sectionFactories.lookingNow}
                minHeight="300px"
            />
            <DeferredSection
                factory={sectionFactories.learningArticles}
                minHeight="400px"
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
