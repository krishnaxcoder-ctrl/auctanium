/** @type {import('next').NextConfig} */
const nextConfig = {
    // Enable React strict mode for better error handling
    reactStrictMode: true,

    // Compress responses
    compress: true,

    // Experimental features for performance
    experimental: {
        optimizePackageImports: ["@untitledui/icons", "@clerk/nextjs", "motion"],
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
        // Optimize image formats
        formats: ["image/avif", "image/webp"],
        // Enable image optimization
        deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
        imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
        // Minimize layout shift
        minimumCacheTTL: 60,
    },

    // Turbopack configuration (Next.js 16 default)
    turbopack: {},

    // Production optimizations
    poweredByHeader: false,

    // Webpack optimizations
    webpack: (config, { isServer }) => {
        // Optimize bundle size
        if (!isServer) {
            config.optimization = {
                ...config.optimization,
                splitChunks: {
                    chunks: 'all',
                    cacheGroups: {
                        default: false,
                        vendors: false,
                        // Vendor chunk
                        vendor: {
                            name: 'vendor',
                            chunks: 'all',
                            test: /node_modules/,
                            priority: 20,
                        },
                        // Common chunk
                        common: {
                            name: 'common',
                            minChunks: 2,
                            chunks: 'all',
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
