"use client";

import { memo, useMemo, useCallback, ComponentType } from "react";
import {
    CriticalSection,
    StandardSection,
    DeferredSection,
} from "@/components/shared-assets/lazy-section";

// Section configuration type
interface SectionConfig {
    key: string;
    factory: () => Promise<{ default: ComponentType<object> }>;
    minHeight: string;
    priority: "critical" | "standard" | "deferred";
}

// Best practice: bundle-dynamic-imports & bundle-barrel-imports
// Each section is dynamically imported only when needed
// Factories are defined once at module level to avoid recreation (rerender-lazy-state-init)
const createSectionFactory = <T extends Record<string, unknown>>(
    importFn: () => Promise<T>,
    exportName: keyof T
) => {
    // Cache the promise to avoid duplicate imports
    let cachedPromise: Promise<{ default: ComponentType<object> }> | null = null;
    return () => {
        if (!cachedPromise) {
            cachedPromise = importFn().then((mod) => ({
                default: mod[exportName] as ComponentType<object>,
            }));
        }
        return cachedPromise;
    };
};

// Section factories - created once at module level
// Best practice: Avoid creating these in render to prevent unnecessary re-imports
const sectionFactories = {
    topCategories: createSectionFactory(
        () => import("@/components/sections/top-categories-section"),
        "TopCategoriesSection"
    ),
    bestDeals: createSectionFactory(
        () => import("@/components/sections/best-deals-section"),
        "BestDealsSection"
    ),
    mostViewed: createSectionFactory(
        () => import("@/components/sections/most-viewed-section"),
        "MostViewedSection"
    ),
    featuredPromotions: createSectionFactory(
        () => import("@/components/sections/featured-promotions-banner"),
        "FeaturedPromotionsBanner"
    ),
    dealsOfTheDay: createSectionFactory(
        () => import("@/components/sections/deals-of-the-day-section"),
        "DealsOfTheDaySection"
    ),
    premiumCollection: createSectionFactory(
        () => import("@/components/sections/premium-collection-section"),
        "PremiumCollectionSection"
    ),
    trendingProducts: createSectionFactory(
        () => import("@/components/sections/trending-products-section"),
        "TrendingProductsSection"
    ),
    certifiedItems: createSectionFactory(
        () => import("@/components/sections/certified-items-section"),
        "CertifiedItemsSection"
    ),
    staffPicks: createSectionFactory(
        () => import("@/components/sections/staff-picks-section"),
        "StaffPicksSection"
    ),
    featuredCollection: createSectionFactory(
        () => import("@/components/sections/featured-collection-section"),
        "FeaturedCollectionSection"
    ),
    featuredSellers: createSectionFactory(
        () => import("@/components/sections/featured-sellers-section"),
        "FeaturedSellersSection"
    ),
    lookingNow: createSectionFactory(
        () => import("@/components/sections/looking-now-section"),
        "LookingNowSection"
    ),
    howItWorks: createSectionFactory(
        () => import("@/components/sections/how-it-works-section"),
        "HowItWorksSection"
    ),
    testimonials: createSectionFactory(
        () => import("@/components/sections/testimonials-section"),
        "TestimonialsSection"
    ),
    cta: createSectionFactory(
        () => import("@/components/sections/cta-section"),
        "CTASection"
    ),
} as const;

// Section configurations - defined once at module level
// Best practice: rendering-hoist-jsx - avoid recreating this array on every render
const SECTION_CONFIGS: readonly SectionConfig[] = [
    // Critical sections - Load at 800px before viewport
    { key: "topCategories", factory: sectionFactories.topCategories, minHeight: "400px", priority: "critical" },
    { key: "bestDeals", factory: sectionFactories.bestDeals, minHeight: "500px", priority: "critical" },
    // Standard sections - Load at 400px before viewport
    { key: "mostViewed", factory: sectionFactories.mostViewed, minHeight: "400px", priority: "standard" },
    { key: "featuredPromotions", factory: sectionFactories.featuredPromotions, minHeight: "300px", priority: "standard" },
    { key: "dealsOfTheDay", factory: sectionFactories.dealsOfTheDay, minHeight: "500px", priority: "standard" },
    { key: "premiumCollection", factory: sectionFactories.premiumCollection, minHeight: "400px", priority: "standard" },
    { key: "trendingProducts", factory: sectionFactories.trendingProducts, minHeight: "400px", priority: "standard" },
    { key: "certifiedItems", factory: sectionFactories.certifiedItems, minHeight: "400px", priority: "standard" },
    { key: "staffPicks", factory: sectionFactories.staffPicks, minHeight: "400px", priority: "standard" },
    { key: "featuredCollection", factory: sectionFactories.featuredCollection, minHeight: "400px", priority: "standard" },
    { key: "featuredSellers", factory: sectionFactories.featuredSellers, minHeight: "400px", priority: "standard" },
    // Deferred sections - Load at 100px before viewport
    { key: "lookingNow", factory: sectionFactories.lookingNow, minHeight: "300px", priority: "deferred" },
    { key: "testimonials", factory: sectionFactories.testimonials, minHeight: "400px", priority: "deferred" },
    { key: "howItWorks", factory: sectionFactories.howItWorks, minHeight: "400px", priority: "deferred" },
    { key: "cta", factory: sectionFactories.cta, minHeight: "300px", priority: "deferred" },
] as const;

// Map priority to component
const priorityComponents = {
    critical: CriticalSection,
    standard: StandardSection,
    deferred: DeferredSection,
} as const;

// Memoized section renderer to prevent unnecessary re-renders
const SectionRenderer = memo(function SectionRenderer({ config }: { config: SectionConfig }) {
    const SectionComponent = priorityComponents[config.priority];
    return (
        <SectionComponent
            key={config.key}
            factory={config.factory}
            minHeight={config.minHeight}
        />
    );
});

// Main lazy sections container - client component boundary
// Best practice: bundle-dynamic-imports - All heavy sections are loaded on demand
export const LazySectionsClient = memo(function LazySectionsClient() {
    return (
        <>
            {SECTION_CONFIGS.map((config) => (
                <SectionRenderer key={config.key} config={config} />
            ))}
        </>
    );
});
