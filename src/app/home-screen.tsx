"use client";

import { lazy, Suspense } from "react";
import { HeroSection } from "@/components/sections/hero-section";

// Lazy load all sections except hero for better initial load performance
const TrustAssuranceStrip = lazy(() => import("@/components/sections/trust-assurance-strip").then(mod => ({ default: mod.TrustAssuranceStrip })));
const TopCategoriesSection = lazy(() => import("@/components/sections/top-categories-section").then(mod => ({ default: mod.TopCategoriesSection })));
const BestDealsSection = lazy(() => import("@/components/sections/best-deals-section").then(mod => ({ default: mod.BestDealsSection })));
const MostViewedSection = lazy(() => import("@/components/sections/most-viewed-section").then(mod => ({ default: mod.MostViewedSection })));
const FeaturedPromotionsBanner = lazy(() => import("@/components/sections/featured-promotions-banner").then(mod => ({ default: mod.FeaturedPromotionsBanner })));
const DealsOfTheDaySection = lazy(() => import("@/components/sections/deals-of-the-day-section").then(mod => ({ default: mod.DealsOfTheDaySection })));
const PremiumCollectionSection = lazy(() => import("@/components/sections/premium-collection-section").then(mod => ({ default: mod.PremiumCollectionSection })));
const TrendingProductsSection = lazy(() => import("@/components/sections/trending-products-section").then(mod => ({ default: mod.TrendingProductsSection })));
const CertifiedItemsSection = lazy(() => import("@/components/sections/certified-items-section").then(mod => ({ default: mod.CertifiedItemsSection })));
const StaffPicksSection = lazy(() => import("@/components/sections/staff-picks-section").then(mod => ({ default: mod.StaffPicksSection })));
const FeaturedCollectionSection = lazy(() => import("@/components/sections/featured-collection-section").then(mod => ({ default: mod.FeaturedCollectionSection })));
const FeaturedSellersSection = lazy(() => import("@/components/sections/featured-sellers-section").then(mod => ({ default: mod.FeaturedSellersSection })));
const BuyerProtectionSection = lazy(() => import("@/components/sections/buyer-protection-section").then(mod => ({ default: mod.BuyerProtectionSection })));
const JoinCommunitySection = lazy(() => import("@/components/sections/join-community-section").then(mod => ({ default: mod.JoinCommunitySection })));
const LookingNowSection = lazy(() => import("@/components/sections/looking-now-section").then(mod => ({ default: mod.LookingNowSection })));
const LearningArticlesSection = lazy(() => import("@/components/sections/learning-articles-section").then(mod => ({ default: mod.LearningArticlesSection })));
const LatestFromCommunitySection = lazy(() => import("@/components/sections/latest-from-community-section").then(mod => ({ default: mod.LatestFromCommunitySection })));
const HowItWorksSection = lazy(() => import("@/components/sections/how-it-works-section").then(mod => ({ default: mod.HowItWorksSection })));
const FeaturesSection = lazy(() => import("@/components/sections/features-section").then(mod => ({ default: mod.FeaturesSection })));
const TestimonialsSection = lazy(() => import("@/components/sections/testimonials-section").then(mod => ({ default: mod.TestimonialsSection })));
const MembershipSection = lazy(() => import("@/components/sections/membership-section").then(mod => ({ default: mod.MembershipSection })));
const CTASection = lazy(() => import("@/components/sections/cta-section").then(mod => ({ default: mod.CTASection })));

// Loading skeleton component
const SectionSkeleton = () => (
    <div className="w-full py-16 animate-pulse">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4"></div>
            <div className="h-4 bg-secondary rounded w-2/3 mx-auto"></div>
        </div>
    </div>
);

// Main Home Screen Component
export const HomeScreen = () => {
    return (
        <div className="bg-primary">
            {/* Hero */}
            <HeroSection />

            {/* Trust & Assurance Strip */}
            <Suspense fallback={<SectionSkeleton />}>
                <TrustAssuranceStrip />
            </Suspense>

            {/* Top Categories - Electronics, Fashion, Collectibles, etc. */}
            <Suspense fallback={<SectionSkeleton />}>
                <TopCategoriesSection />
            </Suspense>

            {/* Best Deals & Discounts */}
            <Suspense fallback={<SectionSkeleton />}>
                <BestDealsSection />
            </Suspense>

            {/* Most Viewed Products */}
            <Suspense fallback={<SectionSkeleton />}>
                <MostViewedSection />
            </Suspense>

            {/* Featured Promotions / Mid-Page Banner */}
            <Suspense fallback={<SectionSkeleton />}>
                <FeaturedPromotionsBanner />
            </Suspense>

            {/* Deals of the Day - Time-sensitive offers */}
            <Suspense fallback={<SectionSkeleton />}>
                <DealsOfTheDaySection />
            </Suspense>

            {/* Premium Collection - Luxury & High-Value Items */}
            <Suspense fallback={<SectionSkeleton />}>
                <PremiumCollectionSection />
            </Suspense>

            {/* Trending Products */}
            <Suspense fallback={<SectionSkeleton />}>
                <TrendingProductsSection />
            </Suspense>

            {/* Certified & Authenticated Items */}
            <Suspense fallback={<SectionSkeleton />}>
                <CertifiedItemsSection />
            </Suspense>

            {/* Staff Picks / Editor's Choice */}
            <Suspense fallback={<SectionSkeleton />}>
                <StaffPicksSection />
            </Suspense>

            {/* Featured Collection */}
            <Suspense fallback={<SectionSkeleton />}>
                <FeaturedCollectionSection />
            </Suspense>

            {/* Featured Sellers */}
            <Suspense fallback={<SectionSkeleton />}>
                <FeaturedSellersSection />
            </Suspense>

            {/* Buyer Protection Highlights */}
            <Suspense fallback={<SectionSkeleton />}>
                <BuyerProtectionSection />
            </Suspense>

            {/* Join the Community / Educational CTA */}
            <Suspense fallback={<SectionSkeleton />}>
                <JoinCommunitySection />
            </Suspense>

            {/* Looking Now - Live Activity / Recently Viewed */}
            <Suspense fallback={<SectionSkeleton />}>
                <LookingNowSection />
            </Suspense>

            {/* Learning Articles / Educational Content */}
            <Suspense fallback={<SectionSkeleton />}>
                <LearningArticlesSection />
            </Suspense>

            {/* Latest from Our Community */}
            <Suspense fallback={<SectionSkeleton />}>
                <LatestFromCommunitySection />
            </Suspense>

            {/* Customer Reviews & Ratings (Testimonials) */}
            <Suspense fallback={<SectionSkeleton />}>
                <TestimonialsSection />
            </Suspense>

            {/* How It Works */}
            <Suspense fallback={<SectionSkeleton />}>
                <HowItWorksSection />
            </Suspense>

            {/* Features */}
            <Suspense fallback={<SectionSkeleton />}>
                <FeaturesSection />
            </Suspense>

            {/* Membership Plans */}
            <Suspense fallback={<SectionSkeleton />}>
                <MembershipSection />
            </Suspense>

            {/* Final CTA */}
            <Suspense fallback={<SectionSkeleton />}>
                <CTASection />
            </Suspense>
        </div>
    );
};
