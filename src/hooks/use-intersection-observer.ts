"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface UseIntersectionObserverOptions {
    threshold?: number | number[];
    rootMargin?: string;
    triggerOnce?: boolean;
}

export function useIntersectionObserver<T extends HTMLElement = HTMLDivElement>(
    options: UseIntersectionObserverOptions = {}
) {
    const { threshold = 0, rootMargin = "200px", triggerOnce = true } = options;
    const [isIntersecting, setIsIntersecting] = useState(false);
    const [hasIntersected, setHasIntersected] = useState(false);
    const ref = useRef<T>(null);

    useEffect(() => {
        const element = ref.current;
        if (!element) return;

        // Skip if already intersected and triggerOnce is true
        if (triggerOnce && hasIntersected) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                const intersecting = entry.isIntersecting;
                setIsIntersecting(intersecting);

                if (intersecting && triggerOnce) {
                    setHasIntersected(true);
                    observer.unobserve(element);
                }
            },
            { threshold, rootMargin }
        );

        observer.observe(element);

        return () => {
            observer.unobserve(element);
        };
    }, [threshold, rootMargin, triggerOnce, hasIntersected]);

    return { ref, isIntersecting: triggerOnce ? hasIntersected : isIntersecting };
}
