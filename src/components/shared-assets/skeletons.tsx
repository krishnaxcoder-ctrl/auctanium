import { memo } from "react";

// Shimmer skeleton element - shared across components
// Best practice: rendering-hoist-jsx - extract static elements
export const ShimmerBox = memo(function ShimmerBox({ className }: { className?: string }) {
    return (
        <div
            className={`relative overflow-hidden rounded bg-secondary ${className ?? ""}`}
        >
            <div className="absolute inset-0 animate-shimmer" />
        </div>
    );
});

// Trust strip skeleton with shimmer - memoized to prevent re-renders
export const TrustStripSkeleton = memo(function TrustStripSkeleton() {
    return (
        <section className="bg-secondary border-y border-secondary">
            <div className="mx-auto max-w-8xl px-0 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {Array.from({ length: 4 }, (_, i) => (
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
});

// Default section skeleton - memoized
export const SectionSkeleton = memo(function SectionSkeleton() {
    return (
        <div className="w-full py-16">
            <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                <ShimmerBox className="h-8 w-1/3 mx-auto mb-4" />
                <ShimmerBox className="h-4 w-2/3 mx-auto mb-8" />
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                    {Array.from({ length: 4 }, (_, i) => (
                        <div key={i} className="space-y-3">
                            <ShimmerBox className="aspect-square w-full" />
                            <ShimmerBox className="h-4 w-3/4" />
                            <ShimmerBox className="h-3 w-1/2" />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
});

// Placeholder for lazy sections - prevents layout shift
export const Placeholder = memo(function Placeholder({ minHeight }: { minHeight?: string }) {
    return (
        <div
            className="w-full"
            style={{
                minHeight: minHeight ?? "200px",
                // content-visibility: auto for better rendering performance
                contentVisibility: "auto",
                containIntrinsicSize: `0 ${minHeight ?? "200px"}`,
            } as React.CSSProperties}
            aria-hidden="true"
        />
    );
});
