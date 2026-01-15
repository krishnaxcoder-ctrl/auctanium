"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
    Menu01,
    X,
    ArrowRight,
    ArrowLeft,
    SearchLg,
    LogOut01,
    ChevronDown,
    ChevronRight,
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

// Parent categories with mega menu content
const categoryMegaMenus: Record<string, { title: string; subcategories: { name: string; href: string }[] }[]> = {
    "art-culture": [
        {
            title: "Fine Art",
            subcategories: [
                { name: "Paintings", href: "/marketplace?category=paintings" },
                { name: "Sculptures", href: "/marketplace?category=sculptures" },
                { name: "Prints & Multiples", href: "/marketplace?category=prints" },
                { name: "Photography", href: "/marketplace?category=photography" },
                { name: "Mixed Media", href: "/marketplace?category=mixed-media" },
            ]
        },
        {
            title: "Asian & Tribal Art",
            subcategories: [
                { name: "Chinese Art", href: "/marketplace?category=chinese-art" },
                { name: "Japanese Art", href: "/marketplace?category=japanese-art" },
                { name: "Indian Art", href: "/marketplace?category=indian-art" },
                { name: "African Art", href: "/marketplace?category=african-art" },
                { name: "Oceanic Art", href: "/marketplace?category=oceanic-art" },
            ]
        },
        {
            title: "Antiques",
            subcategories: [
                { name: "Archaeology", href: "/marketplace?category=archaeology" },
                { name: "Natural History", href: "/marketplace?category=natural-history" },
                { name: "Ancient Artifacts", href: "/marketplace?category=ancient-artifacts" },
                { name: "Maps & Globes", href: "/marketplace?category=maps-globes" },
                { name: "Manuscripts", href: "/marketplace?category=manuscripts" },
            ]
        },
        {
            title: "Books & Literature",
            subcategories: [
                { name: "Rare Books", href: "/marketplace?category=rare-books" },
                { name: "First Editions", href: "/marketplace?category=first-editions" },
                { name: "Signed Books", href: "/marketplace?category=signed-books" },
                { name: "Historical Documents", href: "/marketplace?category=historical-documents" },
                { name: "Autographs", href: "/marketplace?category=autographs" },
            ]
        },
        {
            title: "Religious & Spiritual",
            subcategories: [
                { name: "Religious Art", href: "/marketplace?category=religious-art" },
                { name: "Icons & Statues", href: "/marketplace?category=icons-statues" },
                { name: "Sacred Texts", href: "/marketplace?category=sacred-texts" },
                { name: "Ritual Objects", href: "/marketplace?category=ritual-objects" },
                { name: "Meditation Art", href: "/marketplace?category=meditation-art" },
            ]
        },
        {
            title: "Contemporary",
            subcategories: [
                { name: "Street Art", href: "/marketplace?category=street-art" },
                { name: "Digital Art", href: "/marketplace?category=digital-art" },
                { name: "Pop Art", href: "/marketplace?category=pop-art" },
                { name: "Emerging Artists", href: "/marketplace?category=emerging-artists" },
                { name: "Art Installations", href: "/marketplace?category=art-installations" },
            ]
        },
    ],
    "fashion-luxury": [
        {
            title: "Designer Fashion",
            subcategories: [
                { name: "Women's Clothing", href: "/marketplace?category=womens-clothing" },
                { name: "Men's Clothing", href: "/marketplace?category=mens-clothing" },
                { name: "Vintage Fashion", href: "/marketplace?category=vintage-fashion" },
                { name: "Streetwear", href: "/marketplace?category=streetwear" },
                { name: "Haute Couture", href: "/marketplace?category=haute-couture" },
            ]
        },
        {
            title: "Handbags & Accessories",
            subcategories: [
                { name: "Designer Handbags", href: "/marketplace?category=designer-handbags" },
                { name: "Luxury Wallets", href: "/marketplace?category=luxury-wallets" },
                { name: "Belts & Scarves", href: "/marketplace?category=belts-scarves" },
                { name: "Sunglasses", href: "/marketplace?category=sunglasses" },
                { name: "Hats & Headwear", href: "/marketplace?category=hats" },
            ]
        },
        {
            title: "Jewelry",
            subcategories: [
                { name: "Fine Jewelry", href: "/marketplace?category=fine-jewelry" },
                { name: "Diamonds", href: "/marketplace?category=diamonds" },
                { name: "Gemstones", href: "/marketplace?category=gemstones" },
                { name: "Vintage Jewelry", href: "/marketplace?category=vintage-jewelry" },
                { name: "Costume Jewelry", href: "/marketplace?category=costume-jewelry" },
            ]
        },
        {
            title: "Watches",
            subcategories: [
                { name: "Luxury Watches", href: "/marketplace?category=luxury-watches" },
                { name: "Vintage Watches", href: "/marketplace?category=vintage-watches" },
                { name: "Smart Watches", href: "/marketplace?category=smart-watches" },
                { name: "Watch Accessories", href: "/marketplace?category=watch-accessories" },
                { name: "Pocket Watches", href: "/marketplace?category=pocket-watches" },
            ]
        },
        {
            title: "Shoes & Footwear",
            subcategories: [
                { name: "Designer Heels", href: "/marketplace?category=designer-heels" },
                { name: "Luxury Sneakers", href: "/marketplace?category=luxury-sneakers" },
                { name: "Boots", href: "/marketplace?category=boots" },
                { name: "Loafers & Flats", href: "/marketplace?category=loafers-flats" },
                { name: "Vintage Shoes", href: "/marketplace?category=vintage-shoes" },
            ]
        },
        {
            title: "Pens & Writing",
            subcategories: [
                { name: "Fountain Pens", href: "/marketplace?category=fountain-pens" },
                { name: "Luxury Pens", href: "/marketplace?category=luxury-pens" },
                { name: "Vintage Pens", href: "/marketplace?category=vintage-pens" },
                { name: "Pen Sets", href: "/marketplace?category=pen-sets" },
                { name: "Writing Accessories", href: "/marketplace?category=writing-accessories" },
            ]
        },
    ],
    "home-interiors": [
        {
            title: "Furniture",
            subcategories: [
                { name: "Antique Furniture", href: "/marketplace?category=antique-furniture" },
                { name: "Modern Furniture", href: "/marketplace?category=modern-furniture" },
                { name: "Mid-Century", href: "/marketplace?category=mid-century" },
                { name: "Outdoor Furniture", href: "/marketplace?category=outdoor-furniture" },
                { name: "Office Furniture", href: "/marketplace?category=office-furniture" },
            ]
        },
        {
            title: "Decor",
            subcategories: [
                { name: "Rugs & Carpets", href: "/marketplace?category=rugs-carpets" },
                { name: "Lighting", href: "/marketplace?category=lighting" },
                { name: "Mirrors", href: "/marketplace?category=mirrors" },
                { name: "Clocks", href: "/marketplace?category=clocks" },
                { name: "Vases & Ceramics", href: "/marketplace?category=vases-ceramics" },
            ]
        },
        {
            title: "Tableware",
            subcategories: [
                { name: "Fine China", href: "/marketplace?category=fine-china" },
                { name: "Silverware", href: "/marketplace?category=silverware" },
                { name: "Crystal & Glass", href: "/marketplace?category=crystal-glass" },
                { name: "Porcelain", href: "/marketplace?category=porcelain" },
                { name: "Flatware Sets", href: "/marketplace?category=flatware" },
            ]
        },
        {
            title: "Garden & Outdoor",
            subcategories: [
                { name: "Garden Sculptures", href: "/marketplace?category=garden-sculptures" },
                { name: "Planters", href: "/marketplace?category=planters" },
                { name: "Fountains", href: "/marketplace?category=fountains" },
                { name: "Patio Decor", href: "/marketplace?category=patio-decor" },
                { name: "Garden Tools", href: "/marketplace?category=garden-tools" },
            ]
        },
        {
            title: "Textiles",
            subcategories: [
                { name: "Curtains & Drapes", href: "/marketplace?category=curtains-drapes" },
                { name: "Bed Linens", href: "/marketplace?category=bed-linens" },
                { name: "Tapestries", href: "/marketplace?category=tapestries" },
                { name: "Throw Pillows", href: "/marketplace?category=throw-pillows" },
                { name: "Table Linens", href: "/marketplace?category=table-linens" },
            ]
        },
        {
            title: "Art & Wall Decor",
            subcategories: [
                { name: "Wall Art", href: "/marketplace?category=wall-art" },
                { name: "Picture Frames", href: "/marketplace?category=picture-frames" },
                { name: "Wall Sculptures", href: "/marketplace?category=wall-sculptures" },
                { name: "Tapestry Art", href: "/marketplace?category=tapestry-art" },
                { name: "Wall Clocks", href: "/marketplace?category=wall-clocks" },
            ]
        },
    ],
    "collectibles": [
        {
            title: "Trading Cards",
            subcategories: [
                { name: "Pokemon Cards", href: "/marketplace?category=pokemon-cards" },
                { name: "Sports Cards", href: "/marketplace?category=sports-cards" },
                { name: "Magic: The Gathering", href: "/marketplace?category=mtg-cards" },
                { name: "Yu-Gi-Oh!", href: "/marketplace?category=yugioh-cards" },
                { name: "Vintage Cards", href: "/marketplace?category=vintage-cards" },
            ]
        },
        {
            title: "Comics & Animation",
            subcategories: [
                { name: "Vintage Comics", href: "/marketplace?category=vintage-comics" },
                { name: "Manga", href: "/marketplace?category=manga" },
                { name: "Animation Cels", href: "/marketplace?category=animation-cels" },
                { name: "Graphic Novels", href: "/marketplace?category=graphic-novels" },
                { name: "Comic Art", href: "/marketplace?category=comic-art" },
            ]
        },
        {
            title: "Coins & Stamps",
            subcategories: [
                { name: "Rare Coins", href: "/marketplace?category=rare-coins" },
                { name: "Ancient Coins", href: "/marketplace?category=ancient-coins" },
                { name: "Stamp Collections", href: "/marketplace?category=stamp-collections" },
                { name: "Banknotes", href: "/marketplace?category=banknotes" },
                { name: "Medallions", href: "/marketplace?category=medallions" },
            ]
        },
        {
            title: "Memorabilia",
            subcategories: [
                { name: "Celebrity Memorabilia", href: "/marketplace?category=celebrity-memorabilia" },
                { name: "Historical Memorabilia", href: "/marketplace?category=historical-memorabilia" },
                { name: "Music Memorabilia", href: "/marketplace?category=music-memorabilia" },
                { name: "Movie Props", href: "/marketplace?category=movie-props" },
                { name: "Signed Items", href: "/marketplace?category=signed-items" },
            ]
        },
        {
            title: "Figurines & Statues",
            subcategories: [
                { name: "Anime Figures", href: "/marketplace?category=anime-figures" },
                { name: "Superhero Statues", href: "/marketplace?category=superhero-statues" },
                { name: "Movie Figures", href: "/marketplace?category=movie-figures" },
                { name: "Gaming Figures", href: "/marketplace?category=gaming-figures" },
                { name: "Limited Editions", href: "/marketplace?category=limited-editions" },
            ]
        },
        {
            title: "Vintage Advertising",
            subcategories: [
                { name: "Enamel Signs", href: "/marketplace?category=enamel-signs" },
                { name: "Posters", href: "/marketplace?category=posters" },
                { name: "Neon Signs", href: "/marketplace?category=neon-signs" },
                { name: "Tin Signs", href: "/marketplace?category=tin-signs" },
                { name: "Promotional Items", href: "/marketplace?category=promotional-items" },
            ]
        },
    ],
    "vehicles-sports": [
        {
            title: "Classic Cars",
            subcategories: [
                { name: "Vintage Cars", href: "/marketplace?category=vintage-cars" },
                { name: "Muscle Cars", href: "/marketplace?category=muscle-cars" },
                { name: "European Classics", href: "/marketplace?category=european-classics" },
                { name: "American Classics", href: "/marketplace?category=american-classics" },
                { name: "Project Cars", href: "/marketplace?category=project-cars" },
            ]
        },
        {
            title: "Motorcycles",
            subcategories: [
                { name: "Classic Motorcycles", href: "/marketplace?category=classic-motorcycles" },
                { name: "Vintage Bikes", href: "/marketplace?category=vintage-bikes" },
                { name: "Custom Motorcycles", href: "/marketplace?category=custom-motorcycles" },
                { name: "Racing Bikes", href: "/marketplace?category=racing-bikes" },
                { name: "Scooters", href: "/marketplace?category=scooters" },
            ]
        },
        {
            title: "Sports Equipment",
            subcategories: [
                { name: "Golf Equipment", href: "/marketplace?category=golf-equipment" },
                { name: "Tennis Equipment", href: "/marketplace?category=tennis-equipment" },
                { name: "Cycling", href: "/marketplace?category=cycling" },
                { name: "Water Sports", href: "/marketplace?category=water-sports" },
                { name: "Winter Sports", href: "/marketplace?category=winter-sports" },
            ]
        },
        {
            title: "Automobilia",
            subcategories: [
                { name: "Car Parts", href: "/marketplace?category=car-parts" },
                { name: "Vintage Signs", href: "/marketplace?category=vintage-signs" },
                { name: "Racing Memorabilia", href: "/marketplace?category=racing-memorabilia" },
                { name: "License Plates", href: "/marketplace?category=license-plates" },
                { name: "Model Cars", href: "/marketplace?category=model-cars" },
            ]
        },
        {
            title: "Boats & Marine",
            subcategories: [
                { name: "Sailboats", href: "/marketplace?category=sailboats" },
                { name: "Yachts", href: "/marketplace?category=yachts" },
                { name: "Vintage Boats", href: "/marketplace?category=vintage-boats" },
                { name: "Marine Equipment", href: "/marketplace?category=marine-equipment" },
                { name: "Nautical Decor", href: "/marketplace?category=nautical-decor" },
            ]
        },
        {
            title: "Aviation",
            subcategories: [
                { name: "Aircraft Models", href: "/marketplace?category=aircraft-models" },
                { name: "Aviation Memorabilia", href: "/marketplace?category=aviation-memorabilia" },
                { name: "Pilot Gear", href: "/marketplace?category=pilot-gear" },
                { name: "Vintage Aviation", href: "/marketplace?category=vintage-aviation" },
                { name: "Flight Instruments", href: "/marketplace?category=flight-instruments" },
            ]
        },
    ],
    "lifestyle": [
        {
            title: "Wine & Spirits",
            subcategories: [
                { name: "Fine Wine", href: "/marketplace?category=fine-wine" },
                { name: "Whisky", href: "/marketplace?category=whisky" },
                { name: "Champagne", href: "/marketplace?category=champagne" },
                { name: "Rare Spirits", href: "/marketplace?category=rare-spirits" },
                { name: "Wine Accessories", href: "/marketplace?category=wine-accessories" },
            ]
        },
        {
            title: "Music & Audio",
            subcategories: [
                { name: "Vinyl Records", href: "/marketplace?category=vinyl-records" },
                { name: "Musical Instruments", href: "/marketplace?category=musical-instruments" },
                { name: "Vintage Audio", href: "/marketplace?category=vintage-audio" },
                { name: "Guitars", href: "/marketplace?category=guitars" },
                { name: "DJ Equipment", href: "/marketplace?category=dj-equipment" },
            ]
        },
        {
            title: "Toys & Games",
            subcategories: [
                { name: "Vintage Toys", href: "/marketplace?category=vintage-toys" },
                { name: "Action Figures", href: "/marketplace?category=action-figures" },
                { name: "Board Games", href: "/marketplace?category=board-games" },
                { name: "LEGO", href: "/marketplace?category=lego" },
                { name: "Dolls", href: "/marketplace?category=dolls" },
            ]
        },
        {
            title: "Cameras & Tech",
            subcategories: [
                { name: "Vintage Cameras", href: "/marketplace?category=vintage-cameras" },
                { name: "Film Cameras", href: "/marketplace?category=film-cameras" },
                { name: "Camera Lenses", href: "/marketplace?category=camera-lenses" },
                { name: "Gaming Consoles", href: "/marketplace?category=gaming-consoles" },
                { name: "Retro Tech", href: "/marketplace?category=retro-tech" },
            ]
        },
        {
            title: "Cigars & Smoking",
            subcategories: [
                { name: "Premium Cigars", href: "/marketplace?category=premium-cigars" },
                { name: "Humidors", href: "/marketplace?category=humidors" },
                { name: "Lighters", href: "/marketplace?category=lighters" },
                { name: "Pipes", href: "/marketplace?category=pipes" },
                { name: "Smoking Accessories", href: "/marketplace?category=smoking-accessories" },
            ]
        },
        {
            title: "Outdoor & Travel",
            subcategories: [
                { name: "Luxury Luggage", href: "/marketplace?category=luxury-luggage" },
                { name: "Camping Gear", href: "/marketplace?category=camping-gear" },
                { name: "Binoculars", href: "/marketplace?category=binoculars" },
                { name: "Travel Accessories", href: "/marketplace?category=travel-accessories" },
                { name: "Hiking Equipment", href: "/marketplace?category=hiking-equipment" },
            ]
        },
    ],
    "electronics": [
        {
            title: "Audio & Sound",
            subcategories: [
                { name: "Hi-Fi Systems", href: "/marketplace?category=hifi-systems" },
                { name: "Speakers", href: "/marketplace?category=speakers" },
                { name: "Headphones", href: "/marketplace?category=headphones" },
                { name: "Turntables", href: "/marketplace?category=turntables" },
                { name: "Amplifiers", href: "/marketplace?category=amplifiers" },
            ]
        },
        {
            title: "Computers",
            subcategories: [
                { name: "Vintage Computers", href: "/marketplace?category=vintage-computers" },
                { name: "Apple Products", href: "/marketplace?category=apple-products" },
                { name: "Gaming PCs", href: "/marketplace?category=gaming-pcs" },
                { name: "Laptops", href: "/marketplace?category=laptops" },
                { name: "Computer Parts", href: "/marketplace?category=computer-parts" },
            ]
        },
        {
            title: "Gaming",
            subcategories: [
                { name: "Retro Consoles", href: "/marketplace?category=retro-consoles" },
                { name: "Modern Consoles", href: "/marketplace?category=modern-consoles" },
                { name: "Handheld Gaming", href: "/marketplace?category=handheld-gaming" },
                { name: "Video Games", href: "/marketplace?category=video-games" },
                { name: "Gaming Accessories", href: "/marketplace?category=gaming-accessories" },
            ]
        },
        {
            title: "Photography",
            subcategories: [
                { name: "DSLR Cameras", href: "/marketplace?category=dslr-cameras" },
                { name: "Mirrorless Cameras", href: "/marketplace?category=mirrorless-cameras" },
                { name: "Medium Format", href: "/marketplace?category=medium-format" },
                { name: "Camera Accessories", href: "/marketplace?category=camera-accessories" },
                { name: "Studio Equipment", href: "/marketplace?category=studio-equipment" },
            ]
        },
        {
            title: "Home Theater",
            subcategories: [
                { name: "Projectors", href: "/marketplace?category=projectors" },
                { name: "TVs & Displays", href: "/marketplace?category=tvs-displays" },
                { name: "Receivers", href: "/marketplace?category=receivers" },
                { name: "Streaming Devices", href: "/marketplace?category=streaming-devices" },
                { name: "Sound Bars", href: "/marketplace?category=sound-bars" },
            ]
        },
        {
            title: "Wearables",
            subcategories: [
                { name: "Smartwatches", href: "/marketplace?category=smartwatches" },
                { name: "Fitness Trackers", href: "/marketplace?category=fitness-trackers" },
                { name: "VR Headsets", href: "/marketplace?category=vr-headsets" },
                { name: "Smart Glasses", href: "/marketplace?category=smart-glasses" },
                { name: "Health Monitors", href: "/marketplace?category=health-monitors" },
            ]
        },
    ],
    "services": [
        {
            title: "Authentication",
            subcategories: [
                { name: "Art Authentication", href: "/services/art-authentication" },
                { name: "Watch Authentication", href: "/services/watch-authentication" },
                { name: "Jewelry Appraisal", href: "/services/jewelry-appraisal" },
                { name: "Coin Grading", href: "/services/coin-grading" },
                { name: "Card Grading", href: "/services/card-grading" },
            ]
        },
        {
            title: "Shipping & Logistics",
            subcategories: [
                { name: "International Shipping", href: "/services/international-shipping" },
                { name: "Insurance", href: "/services/insurance" },
                { name: "White Glove Delivery", href: "/services/white-glove" },
                { name: "Packaging Services", href: "/services/packaging" },
                { name: "Customs Assistance", href: "/services/customs" },
            ]
        },
        {
            title: "Restoration",
            subcategories: [
                { name: "Art Restoration", href: "/services/art-restoration" },
                { name: "Furniture Restoration", href: "/services/furniture-restoration" },
                { name: "Watch Repair", href: "/services/watch-repair" },
                { name: "Jewelry Repair", href: "/services/jewelry-repair" },
                { name: "Book Conservation", href: "/services/book-conservation" },
            ]
        },
        {
            title: "Consulting",
            subcategories: [
                { name: "Collection Management", href: "/services/collection-management" },
                { name: "Investment Advice", href: "/services/investment-advice" },
                { name: "Estate Planning", href: "/services/estate-planning" },
                { name: "Tax Guidance", href: "/services/tax-guidance" },
                { name: "Auction Strategy", href: "/services/auction-strategy" },
            ]
        },
        {
            title: "Storage",
            subcategories: [
                { name: "Climate Controlled", href: "/services/climate-storage" },
                { name: "Art Storage", href: "/services/art-storage" },
                { name: "Wine Storage", href: "/services/wine-storage" },
                { name: "Vehicle Storage", href: "/services/vehicle-storage" },
                { name: "Document Archiving", href: "/services/document-archiving" },
            ]
        },
        {
            title: "Events",
            subcategories: [
                { name: "Live Auctions", href: "/events/live-auctions" },
                { name: "Exhibition Tours", href: "/events/exhibitions" },
                { name: "Collector Meetups", href: "/events/meetups" },
                { name: "Workshops", href: "/events/workshops" },
                { name: "Private Viewings", href: "/events/private-viewings" },
            ]
        },
    ],
};

const parentCategories = [
    { key: "art-culture", label: "Art & Culture" },
    { key: "fashion-luxury", label: "Fashion & Personal Luxury" },
    { key: "home-interiors", label: "Home & Interiors" },
    { key: "collectibles", label: "Collectibles & Memorabilia" },
    { key: "vehicles-sports", label: "Vehicles & Sports" },
    { key: "lifestyle", label: "Lifestyle & Entertainment" },
    { key: "electronics", label: "Electronics & Tech" },
    { key: "services", label: "Services" },
];


export const Header = () => {
    const { isSignedIn, isLoaded } = useAuth();
    const { signOut } = useClerk();
    const pathname = usePathname();
    const isCommunityPage = pathname?.startsWith("/community");
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [scrolled, setScrolled] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const [activeMegaMenu, setActiveMegaMenu] = useState<string | null>(null);
    const [selectedCategory, setSelectedCategory] = useState("all");
    const [recentSearches, setRecentSearches] = useState<string[]>([]);
    const [isListening, setIsListening] = useState(false);
    const [showResults, setShowResults] = useState(false);
    const [activeCategoryMenu, setActiveCategoryMenu] = useState<string | null>(null);
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

    // Prevent body scroll when mobile menu or category menu is open
    useEffect(() => {
        if (mobileMenuOpen || activeCategoryMenu) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }
        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen, activeCategoryMenu]);

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
                    <div className="flex h-16 items-center justify-between gap-4 lg:h-16">
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
                                    { key: "sellers", label: "Sellers", href: "/seller" },
                                    { key: "more", label: "More", href: "/about" },
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
                                {/* Additional Links */}
                                <Link
                                    href="/community"
                                    className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-primary"
                                >
                                    Community
                                </Link>
                                <Link
                                    href="/deals"
                                    className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-primary"
                                >
                                    Deals
                                </Link>
                                <Link
                                    href="/auctions"
                                    className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-primary"
                                >
                                    Auctions
                                </Link>
                                <Link
                                    href="/blog"
                                    className="flex cursor-pointer items-center rounded-lg px-4 py-2 text-sm font-medium text-secondary transition-all hover:bg-secondary hover:text-primary"
                                >
                                    Blog
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
            {!isCommunityPage && (
            <div className="bg-primary border-b-2 border-brand-300 hidden lg:block">
                <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-center gap-1 py-2">
                        {parentCategories.map((category) => (
                            <button
                                key={category.key}
                                onClick={() => setActiveCategoryMenu(prev => prev === category.key ? null : category.key)}
                                className={cx(
                                    "relative flex items-center gap-1 whitespace-nowrap px-4 py-2 text-sm font-medium transition-all cursor-pointer",
                                    activeCategoryMenu === category.key
                                        ? "text-brand-600"
                                        : "text-secondary hover:text-primary"
                                )}
                            >
                                {category.label}
                                <ChevronDown className={cx(
                                    "size-4 transition-transform duration-200",
                                    activeCategoryMenu === category.key && "rotate-180"
                                )} />
                                {activeCategoryMenu === category.key && (
                                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-purple-500 z-50" />
                                )}
                            </button>
                        ))}
                    </div>
                </div>
            </div>
            )}

            {/* Mobile Categories Bar */}
            {!isCommunityPage && (
            <div className="bg-primary border-b-2 border-brand-300 lg:hidden">
                <div className="relative">
                    {/* Left Fade Gradient */}
                    <div className="pointer-events-none absolute left-0 top-0 bottom-0 w-8 bg-gradient-to-r from-primary to-transparent z-10" />

                    <div
                        className="flex items-center gap-1 py-2 px-1 overflow-x-auto [&::-webkit-scrollbar]:hidden"
                        style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                    >
                        {parentCategories.map((category) => (
                            <button
                                key={category.key}
                                onClick={() => setActiveCategoryMenu(prev => prev === category.key ? null : category.key)}
                                className={cx(
                                    "relative flex items-center gap-1 whitespace-nowrap px-3 py-1.5 text-xs font-medium transition-all cursor-pointer",
                                    activeCategoryMenu === category.key
                                        ? "text-brand-600"
                                        : "text-secondary hover:text-primary"
                                )}
                            >
                                {category.label}
                                <ChevronDown className={cx(
                                    "size-3 transition-transform duration-200",
                                    activeCategoryMenu === category.key && "rotate-180"
                                )} />
                                {activeCategoryMenu === category.key && (
                                    <span className="absolute -bottom-2 left-0 right-0 h-[2px] bg-purple-500 z-50" />
                                )}
                            </button>
                        ))}
                    </div>

                    {/* Right Fade Gradient */}
                    <div className="pointer-events-none absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-primary to-transparent z-10" />
                </div>
            </div>
            )}

            {/* Category Mega Menu - Desktop */}
            <div
                className={cx(
                    "fixed left-0 right-0 z-40 bg-primary shadow-sm transition-all duration-200 ease-out hidden lg:block",
                    activeCategoryMenu
                        ? "opacity-100 translate-y-0 visible"
                        : "opacity-0 -translate-y-2 invisible"
                )}
                style={{ top: "116px" }}
            >
                {activeCategoryMenu && categoryMegaMenus[activeCategoryMenu] && (
                    <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8 py-5">
                        <div className="grid grid-cols-6 gap-6">
                            {categoryMegaMenus[activeCategoryMenu].map((section, index) => (
                                <div key={index}>
                                    <h3 className="text-sm font-semibold text-primary mb-3">
                                        {section.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {section.subcategories.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block rounded-lg py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
                                                onClick={() => setActiveCategoryMenu(null)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Category Mega Menu - Mobile */}
            <div
                className={cx(
                    "fixed inset-0 z-50 bg-primary lg:hidden overflow-hidden",
                    activeCategoryMenu
                        ? "visible"
                        : "invisible"
                )}
            >
                {activeCategoryMenu && categoryMegaMenus[activeCategoryMenu] && (
                    <div className="flex flex-col h-full">
                        {/* Header */}
                        <div className="flex items-center justify-between px-4 py-3 border-b border-secondary">
                            <button
                                onClick={() => setActiveCategoryMenu(null)}
                                className="p-2 -ml-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                                <ArrowLeft className="size-5 text-primary" />
                            </button>
                            <h2 className="text-base font-semibold text-primary">
                                {parentCategories.find(c => c.key === activeCategoryMenu)?.label}
                            </h2>
                            <button
                                onClick={() => setActiveCategoryMenu(null)}
                                className="p-2 -mr-2 rounded-lg hover:bg-secondary transition-colors"
                            >
                                <X className="size-5 text-secondary" />
                            </button>
                        </div>
                        {/* Scrollable Content */}
                        <div className="flex-1 overflow-y-auto px-4 py-6">
                            {categoryMegaMenus[activeCategoryMenu].map((section, index) => (
                                <div key={index} className="mb-6">
                                    <Link
                                        href={`/category/${activeCategoryMenu}`}
                                        className="inline-flex items-center gap-1 text-sm font-semibold text-primary mb-3 hover:text-brand-600 transition-colors"
                                        onClick={() => setActiveCategoryMenu(null)}
                                    >
                                        {section.title}
                                        <ArrowRight className="size-4" />
                                    </Link>
                                    <div className="space-y-0.5">
                                        {section.subcategories.map((item) => (
                                            <Link
                                                key={item.name}
                                                href={item.href}
                                                className="block py-2 text-sm text-secondary hover:text-primary transition-colors"
                                                onClick={() => setActiveCategoryMenu(null)}
                                            >
                                                {item.name}
                                            </Link>
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>

            {/* Category Menu Backdrop - Desktop */}
            {activeCategoryMenu && (
                <div
                    className="fixed inset-0 z-30 bg-overlay/40 backdrop-blur-sm transition-opacity hidden lg:block"
                    onClick={() => setActiveCategoryMenu(null)}
                    style={{ top: "116px" }}
                />
            )}

            {/* Category Menu Backdrop - Mobile */}
            {activeCategoryMenu && (
                <div
                    className="fixed inset-0 z-30 bg-overlay/60 backdrop-blur-sm transition-opacity lg:hidden"
                    onClick={() => setActiveCategoryMenu(null)}
                />
            )}

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
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-tertiary mb-2">
                                        {column.title}
                                    </h3>
                                    <div className="space-y-1">
                                        {column.items.map((item) => (
                                            <Link
                                                key={item.label}
                                                href={item.href}
                                                className="block rounded-lg py-2 text-sm text-secondary hover:bg-secondary hover:text-primary transition-colors"
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
