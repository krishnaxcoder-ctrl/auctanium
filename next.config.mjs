/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better error handling
    reactStrictMode: true,

    // Compress responses
    compress: true,

    // Experimental features for performance
    experimental: {
        // Tree-shake heavy packages
        optimizePackageImports: [
            "@untitledui/icons",
            "@clerk/nextjs",
            "motion",
            "react-aria-components",
        ],
    },


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

    // Turbopack configuration (Next.js 16 default)
    turbopack: {},

    // Production optimizations
    poweredByHeader: false,

    // Enable gzip/brotli headers
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

    // Webpack optimizations
    webpack: (config, { isServer }) => {
        // Optimize bundle size
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: "all",
                    minSize: 20000,
                    maxSize: 244000, // Target ~240KB chunks for better caching
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        // Framework chunk (React, Next.js core)
                        framework: {
                            name: "framework",
                            chunks: "all",
                            test: /[\\/]node_modules[\\/](react|react-dom|scheduler|next)[\\/]/,
                            priority: 40,
                            enforce: true,
                        },
                        // UI Library chunk
                        ui: {
                            name: "ui",
                            chunks: "all",
                            test: /[\\/]node_modules[\\/](@untitledui|react-aria|motion)[\\/]/,
                            priority: 30,
                        },
                        // Vendor chunk (other node_modules)
                        vendor: {
                            name: "vendor",
                            chunks: "all",
                            test: /[\\/]node_modules[\\/]/,
                            priority: 20,
                        },
                        // Common chunk for shared code
                        common: {
                            name: "common",
                            minChunks: 2,
                            chunks: "all",
                            priority: 10,
                            reuseExistingChunk: true,
                            enforce: true,
                        },
                    },
                },
            };
        }
        return config;
    },
};

export default nextConfig;
