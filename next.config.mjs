/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better error handling
    reactStrictMode: true,

    // Compress responses
    compress: true,

    // Experimental features for performance
    experimental: {
        // Tree-shake heavy packages - key optimization for Turbopack
        // Note: @untitledui/icons excluded - incompatible with optimizePackageImports
        optimizePackageImports: [
            "@clerk/nextjs",
            "motion",
            "react-aria",
            "react-aria-components",
            "@supabase/supabase-js",
            "zod",
            "tailwind-merge",
        ],
    },

    // Server-only packages - not bundled, resolved at runtime (faster builds)
    serverExternalPackages: ["resend"],


    // Image optimization settings
    images: {
        remotePatterns: [
            {
                protocol: "https",
                hostname: "images.unsplash.com",
            },
            {
                protocol: "https",
                hostname: "randomuser.me",
            },
            {
                protocol: "https",
                hostname: "framerusercontent.com",
            },
            {
                protocol: "https",
                hostname: "logo.clearbit.com",
            },
            {
                protocol: "https",
                hostname: "cdn.builder.io",
            },
            {
                protocol: "https",
                hostname: "img.clerk.com",
            },
            {
                protocol: "https",
                hostname: "*.supabase.co",
            },
        ],
        // Optimize image formats - AVIF first for better compression
        formats: ["image/avif", "image/webp"],
        // Device-specific sizes for responsive images
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Longer cache for better performance
        minimumCacheTTL: 31536000, // 1 year
        // Reduce quality slightly for faster loads (still looks great)
        dangerouslyAllowSVG: true,
        contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    },

    // Production optimizations
    poweredByHeader: false,

    // Cache headers for static assets
    headers: async () => [
        {
            source: "/:all*(svg|jpg|jpeg|png|webp|avif|gif|ico|woff|woff2)",
            headers: [
                {
                    key: "Cache-Control",
                    value: "public, max-age=31536000, immutable",
                },
            ],
        },
        {
            source: "/:path*",
            headers: [
                {
                    key: "X-DNS-Prefetch-Control",
                    value: "on",
                },
            ],
        },
    ],
};

export default nextConfig;
