"use client";

import { Suspense, lazy, ComponentType, ReactNode, memo } from "react";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

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

// Default skeleton that matches SectionSkeleton in home-screen
const DefaultSkeleton = () => (
    <div className="w-full py-16 animate-pulse">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
            <div className="h-8 bg-secondary rounded w-1/3 mx-auto mb-4" />
            <div className="h-4 bg-secondary rounded w-2/3 mx-auto" />
        </div>
    </div>
);

// Placeholder shown before section comes into view
const Placeholder = ({ minHeight }: { minHeight?: string }) => (
    <div
        className="w-full"
        style={{ minHeight: minHeight || "200px" }}
        aria-hidden="true"
    />
);

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

    // Only create the lazy component when in viewport
    const LazyComponent = isIntersecting ? lazy(factory) : null;

    return (
        <div ref={ref} className={className}>
            {isIntersecting && LazyComponent ? (
                <Suspense fallback={fallback || <DefaultSkeleton />}>
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
