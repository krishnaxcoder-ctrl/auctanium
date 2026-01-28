"use client";

import { Suspense, lazy, ComponentType, ReactNode, memo, useMemo, useRef } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { SectionSkeleton, Placeholder } from "@/components/shared-assets/skeletons";

interface LazySectionProps {
    /** Factory function that returns a dynamic import */
    factory: () => Promise<{ default: ComponentType<object> }>;
    /** Fallback shown while loading */
    fallback?: ReactNode;
    /** Root margin for intersection observer - higher values preload earlier */
    rootMargin?: string;
    /** Minimum height to prevent layout shift */
    minHeight?: string;
    /** Additional className for the container */
    className?: string;
}

// Cache for lazy components to prevent recreation
// Best practice: rerender-lazy-state-init - avoid expensive operations on every render
const lazyComponentCache = new WeakMap<
    () => Promise<{ default: ComponentType<object> }>,
    React.LazyExoticComponent<ComponentType<object>>
>();

// Get or create cached lazy component
function getCachedLazyComponent(
    factory: () => Promise<{ default: ComponentType<object> }>
): React.LazyExoticComponent<ComponentType<object>> {
    let cached = lazyComponentCache.get(factory);
    if (!cached) {
        cached = lazy(factory);
        lazyComponentCache.set(factory, cached);
    }
    return cached;
}

export const LazySection = memo(function LazySection({
    factory,
    fallback,
    rootMargin = "400px",
    minHeight = "200px",
    className = "",
}: LazySectionProps) {
    const { ref, isIntersecting } = useIntersectionObserver<HTMLDivElement>({
        rootMargin,
        triggerOnce: true,
    });

    // Best practice: rerender-lazy-state-init
    // Get cached lazy component only once per factory
    // This prevents creating a new lazy component on every render
    const LazyComponent = useMemo(() => {
        if (!isIntersecting) return null;
        return getCachedLazyComponent(factory);
    }, [isIntersecting, factory]);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                // Best practice: rendering-content-visibility
                // Improves rendering performance for off-screen content
                contentVisibility: isIntersecting ? "visible" : "auto",
                containIntrinsicSize: isIntersecting ? "auto" : `0 ${minHeight}`,
            } as React.CSSProperties}
        >
            {LazyComponent ? (
                <Suspense fallback={fallback ?? <SectionSkeleton />}>
                    <LazyComponent />
                </Suspense>
            ) : (
                <Placeholder minHeight={minHeight} />
            )}
        </div>
    );
});

// Pre-configured variants for different section priorities
export const CriticalSection = memo(function CriticalSection(
    props: Omit<LazySectionProps, "rootMargin">
) {
    return <LazySection {...props} rootMargin="800px" />;
});

export const StandardSection = memo(function StandardSection(
    props: Omit<LazySectionProps, "rootMargin">
) {
    return <LazySection {...props} rootMargin="400px" />;
});

export const DeferredSection = memo(function DeferredSection(
    props: Omit<LazySectionProps, "rootMargin">
) {
    return <LazySection {...props} rootMargin="100px" />;
});
