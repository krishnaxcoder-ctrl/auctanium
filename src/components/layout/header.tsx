"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Menu01,
    X,
    ArrowRight,
    SearchLg,
    LogOut01,
    ChevronDown,
    Clock,
    TrendUp01,
    XClose,
    Microphone01,
    Tag01,
    ShoppingBag01,
    Star01,
    FilterLines
} from "@untitledui/icons";
import { useAuth, useClerk, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/base/buttons/button";
import { cx } from "@/utils/cx";

// Search categories for filtering
const searchCategories = [
    { id: "all", label: "All" },
    { id: "electronics", label: "Electronics" },
    { id: "fashion", label: "Fashion" },
    { id: "collectibles", label: "Collectibles" },
    { id: "home", label: "Home & Garden" },
    { id: "jewelry", label: "Jewelry" },
];

// Trending searches
const trendingSearches = [
    "Vintage Rolex",
    "iPhone 15 Pro",
    "Nike Air Jordan",
    "Antique Furniture",
    "Pokemon Cards",
    "Louis Vuitton Bag",
];

// Mock product results
const mockProducts = [
    {
        id: 1,
        title: "Vintage Rolex Submariner 1968",
        price: "₹2,45,000",
        image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&h=100&fit=crop",
        category: "jewelry",
        rating: 4.9,
        bids: 23,
    },
    {
        id: 2,
        title: "iPhone 15 Pro Max 256GB",
        price: "₹1,29,900",
        image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=100&h=100&fit=crop",
        category: "electronics",
        rating: 4.8,
        bids: 15,
    },
    {
        id: 3,
        title: "Nike Air Jordan 1 Retro High OG",
        price: "₹18,500",
        image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=100&h=100&fit=crop",
        category: "fashion",
        rating: 4.7,
        bids: 8,
    },
    {
        id: 4,
        title: "Antique Victorian Writing Desk",
        price: "₹85,000",
        image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=100&h=100&fit=crop",
        category: "home",
        rating: 4.6,
        bids: 12,
    },
    {
        id: 5,
        title: "Pokemon Charizard Holo 1st Edition",
        price: "₹3,50,000",
        image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=100&h=100&fit=crop",
        category: "collectibles",
        rating: 5.0,
        bids: 45,
    },
];

const Logo = () => (
    <Link href="/" className="flex items-center">
        <Image
            src="/sitelogo.png"
            alt="Nexpay"
            width={1000}
            height={20}
            className="h-8 w-auto"
            priority
        />
    </Link>
);

interface MegaMenuColumn {
    title: string;
    items: { label: string; href: string }[];
}

interface MegaMenu {
    columns: MegaMenuColumn[];
}

const megaMenus: Record<string, MegaMenu> = {
    marketplace: {
        columns: [
            {
                title: "Shop by Category",
                items: [
                    { label: "Browse All", href: "/marketplace" },
                    { label: "Art", href: "/marketplace?category=art" },
                    { label: "Fashion", href: "/marketplace?category=fashion" },
                    { label: "Jewellery & Precious Stones", href: "/marketplace?category=jewellery-precious-stones" },
                    { label: "Watches, Pens & Lighters", href: "/marketplace?category=watches-pens-lighters" },
                    { label: "Trading Cards", href: "/marketplace?category=trading-cards" },
                ]
            },
            {
                title: "Popular",
                items: [
                    { label: "Featured Auctions", href: "/marketplace?featured=true" },
                    { label: "Ending Soon", href: "/marketplace?sort=ending-soon" },
                    { label: "Trending Now", href: "/marketplace?sort=most-watched" },
                    { label: "Classic Cars & Motorcycles", href: "/marketplace?category=classic-cars-motorcycles" },
                    { label: "Wine, Whisky & Spirits", href: "/marketplace?category=wine-whisky-spirits" },
                    { label: "Comics & Animation", href: "/marketplace?category=comics-animation" },
                ]
            },
            {
                title: "New Arrivals",
                items: [
                    { label: "Just Listed", href: "/marketplace?sort=newest" },
                    { label: "This Week", href: "/marketplace?listed=week" },
                    { label: "Premium Listings", href: "/marketplace?premium=true" },
                    { label: "Verified Sellers", href: "/marketplace?verified=true" },
                    { label: "Local Pickup", href: "/marketplace?pickup=true" },
                ]
            },
            {
                title: "Price Range",
                items: [
                    { label: "Under ₹5,000", href: "/marketplace?price=0-5000" },
                    { label: "₹5,000 - ₹25,000", href: "/marketplace?price=5000-25000" },
                    { label: "₹25,000 - ₹1,00,000", href: "/marketplace?price=25000-100000" },
                    { label: "Above ₹1,00,000", href: "/marketplace?price=100000+" },
                    { label: "No Reserve", href: "/marketplace?reserve=none" },
                ]
            },
            {
                title: "Services",
                items: [
                    { label: "Authentication", href: "/services/authentication" },
                    { label: "Appraisal", href: "/services/appraisal" },
                    { label: "Shipping Calculator", href: "/services/shipping" },
                    { label: "Price Guide", href: "/services/price-guide" },
                    { label: "Insurance", href: "/services/insurance" },
                ]
            },
            {
                title: "Help",
                items: [
                    { label: "How to Buy", href: "/help/buying" },
                    { label: "Bidding Guide", href: "/help/bidding" },
                    { label: "Payment Options", href: "/help/payments" },
                    { label: "Shipping Info", href: "/help/shipping" },
                    { label: "Returns Policy", href: "/help/returns" },
                ]
            }
        ]
    },
    more: {
        columns: [
            {
                title: "Company",
                items: [
                    { label: "About Us", href: "/about" },
                    { label: "Careers", href: "/careers" },
                    { label: "Press & Media", href: "/press" },
                    { label: "Blog", href: "/blog" },
                    { label: "Contact Us", href: "/contact" },
                ]
            },
            {
                title: "Support",
                items: [
                    { label: "Help Center", href: "/help" },
                    { label: "FAQs", href: "/faq" },
                    { label: "Safety Center", href: "/safety" },
                    { label: "Buyer Protection", href: "/buyer-protection" },
                    { label: "Report an Issue", href: "/report" },
                ]
            },
            {
                title: "Legal",
                items: [
                    { label: "Terms of Service", href: "/terms" },
                    { label: "Privacy Policy", href: "/privacy" },
                    { label: "Cookie Policy", href: "/cookies" },
                    { label: "GDPR", href: "/gdpr" },
                    { label: "Licenses", href: "/licenses" },
                ]
            },
            {
                title: "Community",
                items: [
                    { label: "Forums", href: "/community/forums" },
                    { label: "Events", href: "/community/events" },
                    { label: "Newsletter", href: "/community/newsletter" },
                    { label: "Affiliate Program", href: "/affiliate" },
                    { label: "Partner With Us", href: "/partners" },
                ]
            },
            {
                title: "Resources",
                items: [
                    { label: "Collector Guides", href: "/resources/guides" },
                    { label: "Market Insights", href: "/resources/insights" },
                    { label: "Authentication Tips", href: "/resources/authentication" },
                    { label: "Investment Guide", href: "/resources/investment" },
                    { label: "Glossary", href: "/resources/glossary" },
                ]
            },
            {
                title: "Connect",
                items: [
                    { label: "Facebook", href: "https://facebook.com" },
                    { label: "Twitter", href: "https://twitter.com" },
                    { label: "Instagram", href: "https://instagram.com" },
                    { label: "YouTube", href: "https://youtube.com" },
                    { label: "LinkedIn", href: "https://linkedin.com" },
                ]
            }
        ]
    },
    categories: {
        columns: [
            {
                title: "Art & Collectibles",
                items: [
                    { label: "Art", href: "/marketplace?category=art" },
                    { label: "Asian & Tribal Art", href: "/marketplace?category=asian-tribal-art" },
                    { label: "Archaeology & Natural History", href: "/marketplace?category=archaeology-natural-history" },
                    { label: "Comics & Animation", href: "/marketplace?category=comics-animation" },
                    { label: "Trading Cards", href: "/marketplace?category=trading-cards" },
                ]
            },
            {
                title: "Luxury & Fashion",
                items: [
                    { label: "Fashion", href: "/marketplace?category=fashion" },
                    { label: "Jewellery & Precious Stones", href: "/marketplace?category=jewellery-precious-stones" },
                    { label: "Watches, Pens & Lighters", href: "/marketplace?category=watches-pens-lighters" },
                    { label: "Interiors & Decorations", href: "/marketplace?category=interiors-decorations" },
                    { label: "Designer Handbags", href: "/marketplace?category=designer-handbags" },
                ]
            },
            {
                title: "Hobbies & Entertainment",
                items: [
                    { label: "Music, Movies & Cameras", href: "/marketplace?category=music-movies-cameras" },
                    { label: "Sports", href: "/marketplace?category=sports" },
                    { label: "Toys & Models", href: "/marketplace?category=toys-models" },
                    { label: "Books & Historical Memorabilia", href: "/marketplace?category=books-historical-memorabilia" },
                    { label: "Coins & Stamps", href: "/marketplace?category=coins-stamps" },
                ]
            },
            {
                title: "Motors & Spirits",
                items: [
                    { label: "Classic Cars", href: "/marketplace?category=classic-cars" },
                    { label: "Motorcycles", href: "/marketplace?category=motorcycles" },
                    { label: "Automobilia", href: "/marketplace?category=automobilia" },
                    { label: "Wine & Champagne", href: "/marketplace?category=wine" },
                    { label: "Whisky & Spirits", href: "/marketplace?category=whisky-spirits" },
                ]
            },
            {
                title: "Electronics & Tech",
                items: [
                    { label: "Vintage Electronics", href: "/marketplace?category=vintage-electronics" },
                    { label: "Audio Equipment", href: "/marketplace?category=audio" },
                    { label: "Cameras & Photography", href: "/marketplace?category=cameras" },
                    { label: "Gaming Consoles", href: "/marketplace?category=gaming" },
                    { label: "Computers & Tech", href: "/marketplace?category=computers" },
                ]
            },
            {
                title: "Home & Garden",
                items: [
                    { label: "Antique Furniture", href: "/marketplace?category=antique-furniture" },
                    { label: "Rugs & Carpets", href: "/marketplace?category=rugs" },
                    { label: "Lighting & Lamps", href: "/marketplace?category=lighting" },
                    { label: "Garden & Outdoor", href: "/marketplace?category=garden" },
                    { label: "View All Categories", href: "/marketplace" },
                ]
            }
        ]
    },
    sellers: {
        columns: [
            {
                title: "For Sellers",
                items: [
                    { label: "Start Selling", href: "/sellers/start" },
                    { label: "Seller Dashboard", href: "/sellers/dashboard" },
                    { label: "List an Item", href: "/sellers/list" },
                    { label: "Pricing & Fees", href: "/sellers/pricing" },
                    { label: "Seller Protection", href: "/sellers/protection" },
                ]
            },
            {
                title: "Seller Tools",
                items: [
                    { label: "Shipping Labels", href: "/sellers/shipping" },
                    { label: "Inventory Manager", href: "/sellers/inventory" },
                    { label: "Analytics Dashboard", href: "/sellers/analytics" },
                    { label: "Bulk Upload", href: "/sellers/bulk-upload" },
                    { label: "Promotion Tools", href: "/sellers/promotions" },
                ]
            },
            {
                title: "Resources",
                items: [
                    { label: "Seller Guide", href: "/sellers/guide" },
                    { label: "Best Practices", href: "/sellers/best-practices" },
                    { label: "Photography Tips", href: "/sellers/photography" },
                    { label: "Pricing Strategy", href: "/sellers/pricing-strategy" },
                    { label: "Success Stories", href: "/sellers/success" },
                ]
            },
            {
                title: "Top Sellers",
                items: [
                    { label: "Featured Sellers", href: "/sellers/featured" },
                    { label: "Top Rated", href: "/sellers/top-rated" },
                    { label: "New Sellers", href: "/sellers/new" },
                    { label: "Verified Sellers", href: "/sellers/verified" },
                    { label: "Power Sellers", href: "/sellers/power-sellers" },
                ]
            },
            {
                title: "Support",
                items: [
                    { label: "Seller Help Center", href: "/sellers/help" },
                    { label: "Dispute Resolution", href: "/sellers/disputes" },
                    { label: "Tax Information", href: "/sellers/taxes" },
                    { label: "Seller Forums", href: "/sellers/forums" },
                    { label: "Contact Support", href: "/sellers/contact" },
                ]
            },
            {
                title: "Programs",
                items: [
                    { label: "Pro Seller Program", href: "/sellers/pro" },
                    { label: "Verified Badge", href: "/sellers/verification" },
                    { label: "Featured Listings", href: "/sellers/featured-listings" },
                    { label: "Referral Program", href: "/sellers/referral" },
                    { label: "Seller Academy", href: "/sellers/academy" },
                ]
            }
        ]
    },
};


export const Header = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { signOut } = useClerk();
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const searchInputRef = useRef<HTMLInputElement>(null);

    // Load recent searches from localStorage
    useEffect(() => {
        const saved = localStorage.getItem("recentSearches");
        if (saved) {
            setRecentSearches(JSON.parse(saved));
        }
    }, []);

    // Save search to recent searches
    const saveRecentSearch = useCallback((query: string) => {
        if (!query.trim()) return;
        setRecentSearches(prev => {
            const updated = [query, ...prev.filter(s => s !== query)].slice(0, 5);
            localStorage.setItem("recentSearches", JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Clear recent searches
    const clearRecentSearches = useCallback(() => {
        setRecentSearches([]);
        localStorage.removeItem("recentSearches");
    }, []);

    // Remove single recent search
    const removeRecentSearch = useCallback((search: string) => {
        setRecentSearches(prev => {
            const updated = prev.filter(s => s !== search);
            localStorage.setItem("recentSearches", JSON.stringify(updated));
            return updated;
        });
    }, []);

    // Voice search
    const startVoiceSearch = useCallback(() => {
        if (!('webkitSpeechRecognition' in window) && !('SpeechRecognition' in window)) {
            alert("Voice search is not supported in your browser");
            return;
        }

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const SpeechRecognitionAPI = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
        if (!SpeechRecognitionAPI) return;
        const recognition = new SpeechRecognitionAPI() as any;
        recognition.lang = 'en-IN';
        recognition.interimResults = false;

        recognition.onstart = () => setIsListening(true);
        recognition.onend = () => setIsListening(false);
        recognition.onerror = () => setIsListening(false);

        recognition.onresult = (event: any) => {
            const transcript = event.results[0][0].transcript;
            setSearchQuery(transcript);
            setShowResults(true);
        };

        recognition.start();
    }, []);

    // Filter products based on search query and category
    const filteredProducts = mockProducts.filter(product => {
        const matchesQuery = searchQuery === "" ||
            product.title.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesCategory = selectedCategory === "all" ||
            product.category === selectedCategory;
        return matchesQuery && matchesCategory;
    });

    // Get search suggestions based on query
    const suggestions = searchQuery.length > 0
        ? trendingSearches.filter(s =>
            s.toLowerCase().includes(searchQuery.toLowerCase())
          )
        : [];

    const handleMegaMenuToggle = (menu: string) => {
        setActiveMegaMenu(prev => prev === menu ? null : menu);
    };

    const closeMegaMenu = () => {
        setActiveMegaMenu(null);
    };

    const currentMegaMenu = activeMegaMenu ? megaMenus[activeMegaMenu as keyof typeof megaMenus] : null;

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    useEffect(() => {
        if (searchOpen && searchInputRef.current) {
            searchInputRef.current.focus();
        }
    }, [searchOpen]);

    // Handle keyboard shortcut (Cmd/Ctrl + K)
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if ((e.metaKey || e.ctrlKey) && e.key === "k") {
                e.preventDefault();
                setSearchOpen(true);
            }
            if (e.key === "Escape") {
                setSearchOpen(false);
                setSearchQuery("");
            }
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, []);

    // Prevent body scroll when mobile menu is open
    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    return (
        <>
            {/* Main Header */}
            <header
                className={cx(
                    "sticky top-0 z-50 border-b-2 border-brand-300 transition-all duration-300",
                    scrolled
                        ? "bg-primary/95 shadow-sm backdrop-blur-xl"
                        : "bg-primary"
                )}
            >
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex h-16 items-center justify-between gap-4 lg:h-18">
                        {/* Logo & Search */}
                        <div className="flex items-center gap-4 flex-1">
                            <Logo />

                            {/* Desktop Search Bar */}
                            <div className="relative hidden lg:block w-48">
                                <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                                <input
                                    type="text"
                                    placeholder="Search..."
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        if (e.target.value.length > 0) {
                                            setSearchOpen(true);
                                            setShowResults(true);
                                        }
                                    }}
                                    onFocus={() => setSearchOpen(true)}
                                    className="w-full pl-9 pr-3 py-2 bg-secondary/50 border-0 rounded-lg text-sm text-primary placeholder:text-tertiary focus:outline-none focus:ring-2 focus:ring-brand-500 transition-all"
                                />
                            </div>
                        </div>

                        {/* Desktop Navigation & Actions */}
                        <div className="hidden items-center gap-4 lg:flex">
                            {/* Desktop Navigation */}
                            <nav className="flex items-center gap-1">
                                {[
                                    { key: "marketplace", label: "Marketplace", href: "/marketplace" },
                                    { key: "categories", label: "Categories", href: "/marketplace" },
                                    { key: "more", label: "More", href: "/about" },
                                    { key: "sellers", label: "Sellers", href: "/seller" },
                                ].map((item) => (
                                    <div
                                        key={item.key}
                                        className="relative"
                                    >
                                        <button
                                            onClick={() => handleMegaMenuToggle(item.key)}
                                            className={cx(
                                                "flex cursor-pointer items-center gap-1 rounded-lg px-4 py-2 text-sm font-medium transition-all",
                                                activeMegaMenu === item.key
                                                    ? "bg-secondary text-primary"
                                                    : "text-secondary hover:bg-secondary hover:text-primary"
                                            )}
                                        >
                                            {item.label}
                                            <ChevronDown className={cx(
                                                "size-4 transition-transform duration-200",
                                                activeMegaMenu === item.key && "rotate-180"
                                            )} />
                                        </button>
                                    </div>
                                ))}
                                {/* Community Link */}
                                <Link
                                    href="/community"
                                    className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-primary"
                                >
                                    Community
                                </Link>
                            </nav>

                            {/* CTA Buttons */}
                            <div className="flex items-center gap-3">
                                {isLoaded && isSignedIn ? (
                                    <>
                                        <Link href="/dashboard">
                                            <Button color="tertiary" size="md">
                                                Dashboard
                                            </Button>
                                        </Link>
                                        <UserButton
                                            afterSignOutUrl="/"
                                            appearance={{
                                                elements: {
                                                    avatarBox: "w-9 h-9 rounded-full border border-secondary"
                                                }
                                            }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        <Link href="/login">
                                            <Button color="tertiary" size="md">
                                                Log In
                                            </Button>
                                        </Link>
                                        <Link href="/signup">
                                            <Button color="primary" size="md" iconTrailing={ArrowRight}>
                                                Sign Up Free
                                            </Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Mobile Right Section */}
                        <div className="flex items-center gap-2 lg:hidden">
                            {/* Mobile Search Button */}
                            <button
                                onClick={() => setSearchOpen(true)}
                                className="flex size-10 items-center justify-center rounded-lg text-tertiary transition-colors hover:bg-secondary hover:text-primary"
                                aria-label="Search"
                            >
                                <SearchLg className="size-5" />
                            </button>

                            {/* Mobile menu button */}
                            <button
                                type="button"
                                className={cx(
                                    "flex size-10 items-center justify-center rounded-lg transition-colors",
                                    mobileMenuOpen
                                        ? "bg-secondary text-primary"
                                        : "text-tertiary hover:bg-secondary hover:text-primary"
                                )}
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                aria-label="Toggle menu"
                            >
                                {mobileMenuOpen ? <X className="size-5" /> : <Menu01 className="size-5" />}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Navigation */}
                <div
                    className={cx(
                        "overflow-hidden border-t border-secondary bg-primary transition-all duration-300 ease-in-out lg:hidden",
                        mobileMenuOpen ? "max-h-[900px] opacity-100" : "max-h-0 opacity-0 border-transparent"
                    )}
                >
                    <div className="px-4 py-4">
                        {/* Mobile Nav Links */}
                        <div className="space-y-4">
                            {/* Marketplace */}
                            <div>
                                <p className="text-xs font-semibold uppercase tracking-wider text-tertiary mb-2 px-4">Marketplace</p>
                                {megaMenus.marketplace.columns[0].items.slice(0, 4).map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            {/* Categories */}
                            <div className="border-t border-secondary pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-tertiary mb-2 px-4">Categories</p>
                                {megaMenus.categories.columns[0].items.slice(0, 4).map((item) => (
                                    <Link
                                        key={item.label}
                                        href={item.href}
                                        className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                        onClick={() => setMobileMenuOpen(false)}
                                    >
                                        {item.label}
                                    </Link>
                                ))}
                            </div>
                            {/* Quick Links */}
                            <div className="border-t border-secondary pt-4">
                                <Link
                                    href="/marketplace"
                                    className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-primary hover:bg-secondary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Marketplace
                                </Link>
                                <Link
                                    href="/seller"
                                    className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-primary hover:bg-secondary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Sellers
                                </Link>
                                <Link
                                    href="/community"
                                    className="block cursor-pointer rounded-xl px-4 py-3 text-sm font-medium text-primary hover:bg-secondary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Community
                                </Link>
                            </div>
                            {/* More Pages */}
                            <div className="border-t border-secondary pt-4">
                                <p className="text-xs font-semibold uppercase tracking-wider text-tertiary mb-2 px-4">Company & Support</p>
                                <Link
                                    href="/about"
                                    className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    About Us
                                </Link>
                                <Link
                                    href="/blog"
                                    className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Blog
                                </Link>
                                <Link
                                    href="/careers"
                                    className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Careers
                                </Link>
                                <Link
                                    href="/contact"
                                    className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Contact
                                </Link>
                                <Link
                                    href="/help"
                                    className="block rounded-xl px-4 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Help Center
                                </Link>
                            </div>
                        </div>

                        {/* Mobile CTA */}
                        <div className="mt-4 grid gap-2 border-t border-secondary pt-4">
                            {isLoaded && isSignedIn ? (
                                <>
                                    <Link href="/dashboard" onClick={() => setMobileMenuOpen(false)}>
                                        <Button color="primary" size="lg" className="w-full justify-center">
                                            Dashboard
                                        </Button>
                                    </Link>
                                    <Button
                                        color="secondary"
                                        size="lg"
                                        className="w-full justify-center"
                                        iconLeading={LogOut01}
                                        onClick={() => {
                                            setMobileMenuOpen(false);
                                            signOut({ redirectUrl: "/" });
                                        }}
                                    >
                                        Sign Out
                                    </Button>
                                </>
                            ) : (
                                <>
                                    <Link href="/login" onClick={() => setMobileMenuOpen(false)}>
                                        <Button color="secondary" size="lg" className="w-full justify-center">
                                            Log In
                                        </Button>
                                    </Link>
                                    <Link href="/signup" onClick={() => setMobileMenuOpen(false)}>
                                        <Button color="primary" size="lg" className="w-full justify-center" iconTrailing={ArrowRight}>
                                            Sign Up Free
                                        </Button>
                                    </Link>
                                </>
                            )}
                        </div>
                    </div>
                </div>
            </header>

            {/* Categories Bar */}
            <div className="bg-primary border-b-2 border-brand-300">
                <div className="relative mx-auto max-w-8xl sm:px-2 lg:px-4">
                    {/* Left Fade Gradient */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-12 bg-gradient-to-r from-primary to-transparent z-10" />

                    <div
                        className="flex items-center gap-1 overflow-x-auto py-3 px-2 [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {[
                            { label: "Archaeology & Natural History", href: "/marketplace?category=archaeology-natural-history" },
                            { label: "Art", href: "/marketplace?category=art" },
                            { label: "Asian & Tribal Art", href: "/marketplace?category=asian-tribal-art" },
                            { label: "Books & Historical Memorabilia", href: "/marketplace?category=books-historical-memorabilia" },
                            { label: "Classic Cars, Motorcycles & Automobilia", href: "/marketplace?category=classic-cars-motorcycles" },
                            { label: "Coins & Stamps", href: "/marketplace?category=coins-stamps" },
                            { label: "Comics & Animation", href: "/marketplace?category=comics-animation" },
                            { label: "Fashion", href: "/marketplace?category=fashion" },
                            { label: "Interiors & Decorations", href: "/marketplace?category=interiors-decorations" },
                            { label: "Jewellery & Precious Stones", href: "/marketplace?category=jewellery-precious-stones" },
                            { label: "Music, Movies & Cameras", href: "/marketplace?category=music-movies-cameras" },
                            { label: "Sports", href: "/marketplace?category=sports" },
                            { label: "Toys & Models", href: "/marketplace?category=toys-models" },
                            { label: "Trading Cards", href: "/marketplace?category=trading-cards" },
                            { label: "Watches, Pens & Lighters", href: "/marketplace?category=watches-pens-lighters" },
                            { label: "Wine, Whisky & Spirits", href: "/marketplace?category=wine-whisky-spirits" },
                        ].map((category) => (
                            <Link
                                key={category.label}
                                href={category.href}
                                className="whitespace-nowrap rounded-full px-4 py-1.5 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-primary"
                            >
                                {category.label}
                            </Link>
                        ))}
                    </div>

                    {/* Right Fade Gradient */}
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-12 bg-gradient-to-l from-primary to-transparent z-10" />
                </div>
            </div>

            {/* Mega Menu */}
            <div
                className={cx(
                    "fixed left-0 right-0 z-40 bg-primary border-b border-secondary shadow-xl transition-all duration-300 ease-in-out",
                    activeMegaMenu
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-4 invisible"
                )}
                style={{ top: "64px" }}
            >
                {currentMegaMenu && (
                    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-8">
                        <div className="grid grid-cols-6 gap-6">
                            {/* Dynamic Columns */}
                            {currentMegaMenu.columns.map((column, index) => (
                                <div key={index}>
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-tertiary mb-4">
                                        {column.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {column.items.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="block rounded-lg px-3 py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                                onClick={closeMegaMenu}
                                            >
                                                {item.label}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Mega Menu Backdrop */}
            {activeMegaMenu && (
                <div
                    className="fixed inset-0 z-30 bg-overlay/40 backdrop-blur-sm transition-opacity"
                    onClick={closeMegaMenu}
                    style={{ top: "64px" }}
                />
            )}

            {/* Mobile Fixed Bottom Auth Buttons - Only when menu is open */}
            {isLoaded && !isSignedIn && mobileMenuOpen && (
                <div className="fixed bottom-0 left-0 right-0 z-50 bg-primary border-t border-secondary p-4 lg:hidden">
                    <div className="flex gap-3">
                        <Link href="/login" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                            <Button color="secondary" size="lg" className="w-full justify-center">
                                Log In
                            </Button>
                        </Link>
                        <Link href="/signup" className="flex-1" onClick={() => setMobileMenuOpen(false)}>
                            <Button color="primary" size="lg" className="w-full justify-center">
                                Sign Up
                            </Button>
                        </Link>
                    </div>
                </div>
            )}

            {/* Search Modal */}
            {searchOpen && (
                <div className="fixed inset-0 z-[100] overflow-hidden">
                    {/* Backdrop */}
                    <div
                        className="absolute inset-0 bg-overlay/60 backdrop-blur-sm"
                        onClick={() => {
                            setSearchOpen(false);
                            setSearchQuery("");
                            setShowResults(false);
                            setSelectedCategory("all");
                        }}
                    />

                    {/* Search Panel */}
                    <div className="relative mx-auto mt-16 max-w-3xl px-4 sm:mt-24">
                        <div className="overflow-hidden rounded-2xl border border-secondary bg-primary shadow-2xl max-h-[80vh] flex flex-col">
                            {/* Search Input */}
                            <div className="flex items-center gap-3 border-b border-secondary px-4 py-4">
                                <SearchLg className="size-5 text-tertiary flex-shrink-0" />
                                <input
                                    ref={searchInputRef}
                                    type="text"
                                    value={searchQuery}
                                    onChange={(e) => {
                                        setSearchQuery(e.target.value);
                                        setShowResults(e.target.value.length > 0);
                                    }}
                                    onKeyDown={(e) => {
                                        if (e.key === "Enter" && searchQuery.trim()) {
                                            saveRecentSearch(searchQuery);
                                            setShowResults(true);
                                        }
                                    }}
                                    placeholder="Search products, categories, sellers..."
                                    className="flex-1 bg-transparent text-primary placeholder:text-tertiary focus:outline-none text-base"
                                />
                                {/* Voice Search Button */}
                                <button
                                    onClick={startVoiceSearch}
                                    className={cx(
                                        "flex size-9 items-center justify-center rounded-lg transition-colors",
                                        isListening
                                            ? "bg-red-500 text-white animate-pulse"
                                            : "hover:bg-secondary text-tertiary hover:text-primary"
                                    )}
                                    title="Voice search"
                                >
                                    <Microphone01 className="size-5" />
                                </button>
                                <kbd className="rounded bg-secondary px-2 py-1 text-xs font-medium text-tertiary hidden sm:block">
                                    ESC
                                </kbd>
                            </div>

                            {/* Category Filters */}
                            <div className="flex items-center gap-2 px-4 py-3 border-b border-secondary overflow-x-auto scrollbar-hide">
                                <FilterLines className="size-4 text-tertiary flex-shrink-0" />
                                {searchCategories.map((cat) => (
                                    <button
                                        key={cat.id}
                                        onClick={() => setSelectedCategory(cat.id)}
                                        className={cx(
                                            "px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap transition-colors",
                                            selectedCategory === cat.id
                                                ? "bg-brand-600 text-white"
                                                : "bg-secondary text-secondary hover:bg-brand-100 hover:text-brand-700"
                                        )}
                                    >
                                        {cat.label}
                                    </button>
                                ))}
                            </div>

                            {/* Scrollable Content Area */}
                            <div className="flex-1 overflow-y-auto">
                                {/* Search Suggestions (when typing) */}
                                {searchQuery.length > 0 && suggestions.length > 0 && (
                                    <div className="p-4 border-b border-secondary">
                                        <p className="mb-2 text-xs font-medium uppercase tracking-wider text-tertiary flex items-center gap-2">
                                            <TrendUp01 className="size-3" />
                                            Suggestions
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {suggestions.map((suggestion) => (
                                                <button
                                                    key={suggestion}
                                                    onClick={() => {
                                                        setSearchQuery(suggestion);
                                                        saveRecentSearch(suggestion);
                                                        setShowResults(true);
                                                    }}
                                                    className="px-3 py-1.5 rounded-full text-sm bg-brand-50 text-brand-700 hover:bg-brand-100 transition-colors"
                                                >
                                                    {suggestion}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Product Results */}
                                {(showResults || searchQuery.length > 0) && (
                                    <div className="p-4">
                                        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-tertiary flex items-center gap-2">
                                            <ShoppingBag01 className="size-3" />
                                            Products ({filteredProducts.length})
                                        </p>
                                        {filteredProducts.length > 0 ? (
                                            <div className="space-y-2">
                                                {filteredProducts.map((product) => (
                                                    <Link
                                                        key={product.id}
                                                        href={`/listing/${product.id}`}
                                                        onClick={() => {
                                                            setSearchOpen(false);
                                                            setSearchQuery("");
                                                            saveRecentSearch(product.title);
                                                        }}
                                                        className="flex items-center gap-4 p-3 rounded-xl hover:bg-secondary transition-colors group"
                                                    >
                                                        <div className="relative size-16 rounded-lg overflow-hidden bg-secondary flex-shrink-0">
                                                            <Image
                                                                src={product.image}
                                                                alt={product.title}
                                                                fill
                                                                className="object-cover"
                                                            />
                                                        </div>
                                                        <div className="flex-1 min-w-0">
                                                            <h4 className="text-sm font-medium text-primary truncate group-hover:text-brand-600">
                                                                {product.title}
                                                            </h4>
                                                            <div className="flex items-center gap-2 mt-1">
                                                                <span className="text-sm font-semibold text-brand-600">{product.price}</span>
                                                                <span className="text-xs text-tertiary">•</span>
                                                                <span className="flex items-center gap-1 text-xs text-tertiary">
                                                                    <Star01 className="size-3 text-yellow-500" />
                                                                    {product.rating}
                                                                </span>
                                                                <span className="text-xs text-tertiary">•</span>
                                                                <span className="text-xs text-tertiary">{product.bids} bids</span>
                                                            </div>
                                                            <span className="inline-block mt-1 px-2 py-0.5 rounded text-xs bg-secondary text-tertiary capitalize">
                                                                {product.category}
                                                            </span>
                                                        </div>
                                                        <ArrowRight className="size-4 text-tertiary group-hover:text-brand-600 transition-colors" />
                                                    </Link>
                                                ))}
                                            </div>
                                        ) : (
                                            <p className="text-sm text-tertiary text-center py-8">
                                                No products found for &quot;{searchQuery}&quot;
                                            </p>
                                        )}
                                    </div>
                                )}

                                {/* Recent Searches (when not searching) */}
                                {!showResults && searchQuery.length === 0 && recentSearches.length > 0 && (
                                    <div className="p-4 border-b border-secondary">
                                        <div className="flex items-center justify-between mb-3">
                                            <p className="text-xs font-medium uppercase tracking-wider text-tertiary flex items-center gap-2">
                                                <Clock className="size-3" />
                                                Recent Searches
                                            </p>
                                            <button
                                                onClick={clearRecentSearches}
                                                className="text-xs text-tertiary hover:text-primary transition-colors"
                                            >
                                                Clear all
                                            </button>
                                        </div>
                                        <div className="space-y-1">
                                            {recentSearches.map((search) => (
                                                <div
                                                    key={search}
                                                    className="flex items-center justify-between group"
                                                >
                                                    <button
                                                        onClick={() => {
                                                            setSearchQuery(search);
                                                            setShowResults(true);
                                                        }}
                                                        className="flex items-center gap-3 flex-1 rounded-lg px-3 py-2 text-sm text-primary hover:bg-secondary transition-colors text-left"
                                                    >
                                                        <Clock className="size-4 text-tertiary" />
                                                        {search}
                                                    </button>
                                                    <button
                                                        onClick={() => removeRecentSearch(search)}
                                                        className="p-1.5 rounded-lg text-tertiary hover:text-primary hover:bg-secondary opacity-0 group-hover:opacity-100 transition-all"
                                                    >
                                                        <XClose className="size-4" />
                                                    </button>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Trending Searches (when not searching) */}
                                {!showResults && searchQuery.length === 0 && (
                                    <div className="p-4">
                                        <p className="mb-3 text-xs font-medium uppercase tracking-wider text-tertiary flex items-center gap-2">
                                            <TrendUp01 className="size-3" />
                                            Trending Searches
                                        </p>
                                        <div className="flex flex-wrap gap-2">
                                            {trendingSearches.map((search) => (
                                                <button
                                                    key={search}
                                                    onClick={() => {
                                                        setSearchQuery(search);
                                                        saveRecentSearch(search);
                                                        setShowResults(true);
                                                    }}
                                                    className="flex items-center gap-2 px-3 py-2 rounded-lg text-sm bg-secondary text-primary hover:bg-brand-50 hover:text-brand-700 transition-colors"
                                                >
                                                    <Tag01 className="size-3" />
                                                    {search}
                                                </button>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Search Footer */}
                            <div className="border-t border-secondary bg-secondary/30 px-4 py-3">
                                <div className="flex items-center justify-between text-xs text-tertiary">
                                    <div className="flex items-center gap-4">
                                        <span>Press <kbd className="rounded bg-secondary px-1.5 py-0.5 font-medium">Enter</kbd> to search</span>
                                        <span className="hidden sm:inline">Press <kbd className="rounded bg-secondary px-1.5 py-0.5 font-medium">ESC</kbd> to close</span>
                                    </div>
                                    <Link
                                        href="/marketplace"
                                        onClick={() => {
                                            setSearchOpen(false);
                                            setSearchQuery("");
                                        }}
                                        className="text-brand-600 hover:text-brand-700 font-medium"
                                    >
                                        Browse All →
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};
