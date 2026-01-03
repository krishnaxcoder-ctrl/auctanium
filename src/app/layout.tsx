import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { RouteProvider } from "@/providers/router-provider";
import { Theme } from "@/providers/theme";
import { ClarityProvider } from "@/providers/clarity-provider";
import { LayoutWrapper } from "@/components/layout/layout-wrapper";
import NextTopLoader from "nextjs-toploader";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/next";
import "@/styles/globals.css";
import { cx } from "@/utils/cx";

const inter = Inter({
    subsets: ["latin"],
    display: "swap",
    variable: "--font-inter",
    preload: true,
    fallback: ["system-ui", "arial"],
    adjustFontFallback: true,
});

export const metadata: Metadata = {
    title: "Auctanium - Online Auctions & Bidding Platform | Win Amazing Deals",
    description: "Discover incredible deals on Auctanium, the trusted online auction platform. Bid on electronics, collectibles, fashion & more. Join 50,000+ users winning auctions daily.",
    keywords: ["online auctions", "bidding platform", "auction website", "bid online", "win deals", "Auctanium", "live auctions"],
    authors: [{ name: "Auctanium" }],
    icons: {
        icon: "/favicon.ico",
        shortcut: "/favicon.ico",
        apple: "/favicon.ico",
    },
    openGraph: {
        title: "Auctanium - Online Auctions & Bidding Platform",
        description: "Discover incredible deals on Auctanium. Bid on electronics, collectibles, fashion & more. Join 50,000+ users winning auctions daily.",
        siteName: "Auctanium",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Auctanium - Online Auctions & Bidding Platform",
        description: "Discover incredible deals on Auctanium. Bid on electronics, collectibles, fashion & more. Join 50,000+ users winning auctions daily.",
    },
};

export const viewport: Viewport = {
    themeColor: "#7F56D9",
    colorScheme: "light",
    viewportFit: "cover",
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <html lang="en" suppressHydrationWarning>
            <head>
                {/* Preconnect to external domains for faster resource loading */}
                <link rel="preconnect" href="https://randomuser.me" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://images.unsplash.com" crossOrigin="anonymous" />
                <link rel="preconnect" href="https://img.clerk.com" crossOrigin="anonymous" />
                <link rel="dns-prefetch" href="https://randomuser.me" />
                <link rel="dns-prefetch" href="https://images.unsplash.com" />
            </head>
            <body className={cx(inter.variable, "bg-primary antialiased")} suppressHydrationWarning>
                <NextTopLoader
                    color="#7F56D9"
                    height={3}
                    crawlSpeed={50}
                    initialPosition={0.3}
                    showSpinner={false}
                    easing="ease-out"
                    speed={100}
                    shadow="0 0 10px #7F56D9, 0 0 5px #7F56D9"
                    zIndex={1600}
                />
                <ClarityProvider>
                    <ClerkProvider dynamic>
                        <RouteProvider>
                            <Theme>
                                <LayoutWrapper>{children}</LayoutWrapper>
                            </Theme>
                        </RouteProvider>
                    </ClerkProvider>
                </ClarityProvider>
                <SpeedInsights />
                <Analytics />
            </body>
        </html>
    );
}
