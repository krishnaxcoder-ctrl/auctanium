"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams, useRouter } from "next/navigation";
import { useAuth } from "@clerk/nextjs";
import {
    ChevronRight,
    ChevronDown,
    Heart,
    Share07,
    Star01,
    Check,
    Shield01,
    Truck01,
    Eye,
    Globe01,
    ThumbsUp,
    HelpCircle,
    ChevronLeft,
    RefreshCw01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import {
    RelatedProductsBySeller,
    RelatedProductsByCategory,
    AllRelatedProducts,
} from "@/components/listing";
import { useWishlistContext } from "@/providers/wishlist-provider";
import { ProductActions } from "@/components/product/product-actions";
import { useAuction, formatTimeRemaining } from "@/hooks/use-auction";
import { useBidHistory } from "@/hooks/use-bids";

// Product type definition
interface Product {
    id: string;
    title: string;
    description: string;
    seller_description: string;
    current_bid: number;
    starting_price: number;
    estimate_low: number;
    estimate_high: number;
    no_reserve: boolean;
    bids_count: number;
    watchers_count: number;
    images: string[];
    category: string;
    subcategory: string;
    lot_number: string;
    listing_type: "auction" | "buy-now" | "both";
    buy_now_price: number | null;
    stock_quantity: number;
    condition: string;
    specifications: { label: string; value: string }[];
    seller_id: string;
    seller_name: string;
    seller_verified: boolean;
    shipping_available: boolean;
    shipping_location: string;
    shipping_cost: number;
    free_shipping: boolean;
    buyer_protection_fee: number;
    status: string;
}

interface Auction {
    id: string;
    start_time: string;
    end_time: string;
    status: string;
    minimum_bid_increment: number;
    winner_id: string | null;
    winning_bid: number | null;
}

// Countdown Timer Component
function CountdownTimer({ endTime }: { endTime: string }) {
    const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
    const [progress, setProgress] = useState(100);

    useEffect(() => {
        const auctionDuration = 14 * 24 * 60 * 60 * 1000;

        const calculateTime = () => {
            const now = new Date().getTime();
            const end = new Date(endTime).getTime();
            const distance = end - now;

            if (distance > 0) {
                setTimeLeft({
                    days: Math.floor(distance / (1000 * 60 * 60 * 24)),
                    hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
                    minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
                    seconds: Math.floor((distance % (1000 * 60)) / 1000),
                });
                setProgress(Math.min(100, (distance / auctionDuration) * 100));
            } else {
                setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
                setProgress(0);
            }
        };

        calculateTime();
        const timer = setInterval(calculateTime, 1000);
        return () => clearInterval(timer);
    }, [endTime]);

    return (
        <div>
            <div className="grid grid-cols-4 gap-2 text-center">
                {[
                    { value: timeLeft.days, label: "DAYS" },
                    { value: timeLeft.hours, label: "HOURS" },
                    { value: timeLeft.minutes, label: "MINUTES" },
                    { value: timeLeft.seconds, label: "SECONDS" },
                ].map((item) => (
                    <div key={item.label}>
                        <div className="text-2xl font-semibold text-primary">{String(item.value).padStart(2, "0")}</div>
                        <div className="text-[10px] text-tertiary tracking-wide">{item.label}</div>
                    </div>
                ))}
            </div>
            <div className="mt-4 h-1 w-full bg-secondary overflow-hidden">
                <div className="h-full bg-brand-300" style={{ width: `${progress}%` }} />
            </div>
        </div>
    );
}

export default function ListingPage() {
    const params = useParams();
    const router = useRouter();
    const { isSignedIn } = useAuth();
    const id = params.id as string;

    const [product, setProduct] = useState<Product | null>(null);
    const [auction, setAuction] = useState<Auction | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    const [selectedImage, setSelectedImage] = useState(0);
    const [showAllBids, setShowAllBids] = useState(false);
    const [showFullDescription, setShowFullDescription] = useState(false);
    const [isTogglingWishlist, setIsTogglingWishlist] = useState(false);

    // Wishlist context
    const { isWishlisted, toggleWishlist, isLoading: isWishlistLoading } = useWishlistContext();
    const isProductWishlisted = isWishlisted(id);

    // Bid history
    const { bidHistory, totalBids, refreshBidHistory } = useBidHistory(id);

    // Fetch product data
    useEffect(() => {
        async function fetchProduct() {
            try {
                setIsLoading(true);
                const response = await fetch(`/api/products/${id}`);

                if (!response.ok) {
                    if (response.status === 404) {
                        setError("Product not found");
                    } else {
                        setError("Failed to load product");
                    }
                    return;
                }

                const data = await response.json();
                setProduct(data.product);
                setAuction(data.auction);
            } catch (err) {
                console.error("Failed to fetch product:", err);
                setError("Failed to load product");
            } finally {
                setIsLoading(false);
            }
        }

        if (id) {
            fetchProduct();
        }
    }, [id]);

    const handleToggleWishlist = async () => {
        if (!isSignedIn) {
            router.push("/login");
            return;
        }

        setIsTogglingWishlist(true);
        try {
            await toggleWishlist(id);
        } finally {
            setIsTogglingWishlist(false);
        }
    };

    const handleBidPlaced = () => {
        refreshBidHistory();
        // Refresh product data to get updated bid count
        fetch(`/api/products/${id}`)
            .then((res) => res.json())
            .then((data) => {
                setProduct(data.product);
                setAuction(data.auction);
            });
    };

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
        }).format(amount);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <RefreshCw01 className="size-8 animate-spin text-brand-600" />
            </div>
        );
    }

    if (error || !product) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-primary mb-2">{error || "Product not found"}</h1>
                    <Link href="/marketplace" className="text-brand-600 hover:underline">
                        Browse marketplace
                    </Link>
                </div>
            </div>
        );
    }

    const isAuction = product.listing_type === "auction" || product.listing_type === "both";
    const isBuyNow = product.listing_type === "buy-now" || product.listing_type === "both";
    const currentBid = product.current_bid || product.starting_price || 0;

    return (
        <div className="min-h-screen bg-primary">
            {/* Breadcrumb */}
            <div className="hidden sm:block border-b border-secondary">
                <div className="mx-auto max-w-8xl px-4 py-3 sm:px-6 lg:px-8">
                    <nav className="flex items-center gap-2 text-sm">
                        <Link href="/marketplace" className="text-tertiary hover:text-brand-600 transition-colors">
                            {product.category}
                        </Link>
                        {product.subcategory && (
                            <>
                                <ChevronRight className="size-3.5 text-quaternary" />
                                <Link href={`/marketplace?category=${product.subcategory}`} className="text-tertiary hover:text-brand-600 transition-colors">
                                    {product.subcategory}
                                </Link>
                            </>
                        )}
                        <ChevronRight className="size-3.5 text-quaternary" />
                        <span className="text-tertiary">No. {product.lot_number}</span>
                    </nav>
                </div>
            </div>

            {/* Main Content */}
            <div className="mx-auto max-w-8xl px-4 py-3 sm:py-3 sm:px-6 lg:px-8">
                {/* Title Row */}
                <div className="flex items-start justify-between gap-4 mb-3 sm:mb-3">
                    <h1 className="text-base font-semibold text-primary sm:text-xl leading-tight flex-1">
                        {product.no_reserve && <span className="text-tertiary">No reserve price - </span>}
                        {product.title}
                    </h1>
                    <div className="hidden sm:flex items-center gap-3">
                        <button
                            onClick={handleToggleWishlist}
                            disabled={isTogglingWishlist || isWishlistLoading}
                            className="flex items-center gap-1.5 text-tertiary hover:text-primary transition-colors disabled:opacity-50"
                        >
                            {isTogglingWishlist ? (
                                <RefreshCw01 className="size-5 animate-spin" />
                            ) : (
                                <Heart className={`size-5 ${isProductWishlisted ? "fill-error-500 text-error-500" : ""}`} />
                            )}
                            <span className="text-sm">{product.watchers_count || 0}</span>
                        </button>
                        <button className="text-tertiary hover:text-primary transition-colors">
                            <Share07 className="size-5" />
                        </button>
                    </div>
                </div>

                <div className="grid gap-8 lg:grid-cols-3">
                    {/* Left Column - Images & Description */}
                    <div className="lg:col-span-2 space-y-6">
                        {/* Image Gallery */}
                        <div className="flex flex-col sm:flex-row gap-4">
                            <div className="relative flex-1 aspect-[4/3] overflow-hidden border border-secondary bg-secondary rounded-sm order-1 sm:order-1">
                                {product.images && product.images.length > 0 ? (
                                    <Image
                                        src={product.images[selectedImage]}
                                        alt={product.title}
                                        fill
                                        className="object-cover"
                                        priority
                                    />
                                ) : (
                                    <div className="flex items-center justify-center h-full text-tertiary">
                                        No image available
                                    </div>
                                )}
                                {/* Floating Like & Share - Mobile only */}
                                <div className="absolute top-3 right-3 flex items-center gap-2 sm:hidden">
                                    <button
                                        onClick={handleToggleWishlist}
                                        disabled={isTogglingWishlist || isWishlistLoading}
                                        className="flex items-center justify-center size-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-600 hover:text-primary transition-colors disabled:opacity-50"
                                    >
                                        {isTogglingWishlist ? (
                                            <RefreshCw01 className="size-5 animate-spin" />
                                        ) : (
                                            <Heart className={`size-5 ${isProductWishlisted ? "fill-error-500 text-error-500" : ""}`} />
                                        )}
                                    </button>
                                    <button className="flex items-center justify-center size-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-600 hover:text-primary transition-colors">
                                        <Share07 className="size-5" />
                                    </button>
                                </div>
                            </div>
                            {/* Thumbnails */}
                            {product.images && product.images.length > 1 && (
                                <div className="flex flex-row sm:flex-col gap-2 order-2 sm:order-2 sm:w-20 overflow-x-auto sm:overflow-visible">
                                    {product.images.map((image, index) => (
                                        <button
                                            key={index}
                                            onClick={() => setSelectedImage(index)}
                                            className={`relative aspect-square overflow-hidden border-2 transition-all rounded-sm shrink-0 w-16 sm:w-auto ${
                                                selectedImage === index ? "border-brand-600" : "border-secondary hover:border-tertiary"
                                            }`}
                                        >
                                            <Image src={image} alt={`View ${index + 1}`} fill className="object-cover" />
                                        </button>
                                    ))}
                                </div>
                            )}
                        </div>

                        {/* Product Description */}
                        {product.description && (
                            <div>
                                <p className="text-secondary leading-relaxed">{product.description}</p>
                            </div>
                        )}

                        {/* Description from Seller */}
                        {product.seller_description && (
                            <div className="border-t border-secondary pt-6">
                                <h2 className="text-lg font-semibold text-primary mb-4">Description from the seller</h2>
                                <p className={`text-secondary leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}>
                                    {product.seller_description}
                                </p>
                                <button
                                    onClick={() => setShowFullDescription(!showFullDescription)}
                                    className="mt-2 text-sm text-brand-600 hover:underline"
                                >
                                    {showFullDescription ? "Show less" : "Show more"}
                                </button>
                            </div>
                        )}

                        {/* Details/Specifications */}
                        {product.specifications && product.specifications.length > 0 && (
                            <div className="border-t border-secondary pt-6">
                                <h2 className="text-lg font-semibold text-primary mb-6">Details</h2>
                                <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                                    {product.specifications.map((spec: any, index: number) => (
                                        <div key={index} className="flex flex-col">
                                            <span className="text-xs text-tertiary uppercase tracking-wide">{spec.label}</span>
                                            <span className="text-sm font-medium text-primary mt-0.5">{spec.value}</span>
                                        </div>
                                    ))}
                                    {/* Add condition */}
                                    <div className="flex flex-col">
                                        <span className="text-xs text-tertiary uppercase tracking-wide">Condition</span>
                                        <span className="text-sm font-medium text-primary mt-0.5 capitalize">{product.condition}</span>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Shipping */}
                        <div className="border-t border-secondary pt-6">
                            <h2 className="text-lg font-semibold text-primary mb-4">Shipping</h2>
                            <div className="space-y-2">
                                <p className="text-sm font-medium text-primary">
                                    {product.shipping_available ? "Available" : "Not available"}
                                </p>
                                {product.shipping_location && (
                                    <p className="text-sm text-tertiary">Location: {product.shipping_location}</p>
                                )}
                                {product.free_shipping ? (
                                    <p className="text-sm text-success-600">Free shipping</p>
                                ) : product.shipping_cost > 0 ? (
                                    <p className="text-sm text-tertiary">Shipping cost: {formatCurrency(product.shipping_cost)}</p>
                                ) : null}
                            </div>
                        </div>

                        {/* Seller Info */}
                        <div className="border-t border-secondary pt-6">
                            <div className="flex items-center justify-between mb-4">
                                <span className="text-sm text-tertiary">Sold by</span>
                            </div>
                            <div className="flex items-center gap-4">
                                <h3 className="text-lg font-semibold text-primary">{product.seller_name || "Seller"}</h3>
                                {product.seller_verified && (
                                    <span className="text-xs text-tertiary flex items-center gap-1">
                                        <Check className="size-3" /> Verified
                                    </span>
                                )}
                            </div>
                        </div>
                    </div>

                    {/* Right Column - Bidding/Purchase Card */}
                    <div className="lg:col-span-1">
                        <div className="sticky top-4 space-y-4">
                            <div className="border border-secondary rounded-xl bg-primary overflow-hidden">
                                {/* Auction Timer (if auction) */}
                                {isAuction && auction && (
                                    <div className="p-5 border-b border-secondary bg-gradient-to-r from-brand-50 to-transparent">
                                        <div className="text-xs font-medium text-brand-600 uppercase tracking-wide mb-3">Auction Ends In</div>
                                        <CountdownTimer endTime={auction.end_time} />
                                    </div>
                                )}

                                {/* Pricing Section - Only for auctions */}
                                {isAuction && (
                                    <div className="p-5 border-b border-secondary">
                                        <div className="text-xs text-tertiary uppercase tracking-wide">Current Bid</div>
                                        <div className="text-3xl font-bold text-primary mt-1">
                                            {formatCurrency(currentBid)}
                                        </div>
                                        {product.no_reserve && (
                                            <div className="inline-flex items-center gap-1.5 mt-2 px-2 py-1 rounded-full bg-success-50 text-success-700 text-xs font-medium">
                                                <Check className="size-3" />
                                                No Reserve
                                            </div>
                                        )}
                                        {isBuyNow && product.buy_now_price && (
                                            <div className="mt-4 pt-4 border-t border-secondary flex items-baseline justify-between">
                                                <span className="text-sm text-tertiary">Buy Now Price</span>
                                                <span className="text-xl font-semibold text-primary">{formatCurrency(product.buy_now_price)}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Price Section - Buy Now Only Products */}
                                {!isAuction && isBuyNow && product.buy_now_price && (
                                    <div className="p-5 border-b border-secondary">
                                        <div className="flex items-baseline justify-between">
                                            <div>
                                                <div className="text-3xl font-bold text-primary">
                                                    {formatCurrency(product.buy_now_price)}
                                                </div>
                                                {product.free_shipping && (
                                                    <div className="flex items-center gap-1.5 mt-2 text-sm text-success-600">
                                                        <Truck01 className="size-4" />
                                                        <span>Free Shipping</span>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {/* Estimate (for auctions) */}
                                {isAuction && product.estimate_low && product.estimate_high && (
                                    <div className="px-5 py-3 border-b border-secondary bg-secondary/30">
                                        <div className="flex items-center justify-between text-sm">
                                            <span className="text-tertiary">Estimate</span>
                                            <span className="font-medium text-primary">
                                                {formatCurrency(product.estimate_low)} – {formatCurrency(product.estimate_high)}
                                            </span>
                                        </div>
                                    </div>
                                )}

                                {/* Product Actions (Bid/Buy Now buttons) */}
                                <div className="p-5 border-b border-secondary">
                                    <ProductActions
                                        product={{
                                            id: product.id,
                                            title: product.title,
                                            images: product.images,
                                            listing_type: product.listing_type,
                                            starting_price: product.starting_price,
                                            current_bid: product.current_bid,
                                            buy_now_price: product.buy_now_price || undefined,
                                            stock_quantity: product.stock_quantity,
                                            status: product.status,
                                            free_shipping: product.free_shipping,
                                        }}
                                        auctionEndTime={auction?.end_time}
                                        minimumBidIncrement={auction?.minimum_bid_increment}
                                        onBidPlaced={handleBidPlaced}
                                    />
                                </div>

                                {/* Watchers - More prominent */}
                                {product.watchers_count > 0 && (
                                    <div className="px-5 py-3 border-b border-secondary bg-warning-50/50">
                                        <div className="flex items-center gap-2 text-sm">
                                            <Eye className="size-4 text-warning-600" />
                                            <span className="text-warning-700 font-medium">{product.watchers_count} people watching</span>
                                        </div>
                                    </div>
                                )}

                                {/* Bid History (for auctions) */}
                                {isAuction && bidHistory.length > 0 && (
                                    <div className="p-5 border-b border-secondary">
                                        <div className="text-xs font-medium text-tertiary uppercase tracking-wide mb-3">Recent Bids</div>
                                        <div className="space-y-2.5">
                                            {(showAllBids ? bidHistory : bidHistory.slice(0, 3)).map((bid, index) => (
                                                <div key={bid.id} className="flex items-center justify-between text-sm">
                                                    <div className="flex items-center gap-2">
                                                        <div className={`size-2 rounded-full ${index === 0 ? "bg-brand-600" : index === 1 ? "bg-warning-500" : "bg-gray-300"}`} />
                                                        <span className="text-primary">{bid.bidder_display_name}</span>
                                                    </div>
                                                    <span className="font-semibold text-primary">{formatCurrency(bid.amount)}</span>
                                                </div>
                                            ))}
                                        </div>
                                        {totalBids > 3 && (
                                            <button
                                                onClick={() => setShowAllBids(!showAllBids)}
                                                className="mt-3 text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1"
                                            >
                                                {showAllBids ? "Show less" : `View all ${totalBids} bids`}
                                                <ChevronDown className={`size-4 transition-transform ${showAllBids ? "rotate-180" : ""}`} />
                                            </button>
                                        )}
                                    </div>
                                )}

                                {/* Trust Badges */}
                                <div className="p-5 space-y-4">
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-full bg-brand-50">
                                            <Shield01 className="size-5 text-brand-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-primary">Buyer Protection</div>
                                            <p className="text-xs text-tertiary mt-0.5">
                                                Money-back guarantee if item not as described
                                            </p>
                                        </div>
                                    </div>
                                    <div className="flex items-start gap-3">
                                        <div className="flex items-center justify-center size-10 rounded-full bg-success-50">
                                            <Truck01 className="size-5 text-success-600" />
                                        </div>
                                        <div className="flex-1">
                                            <div className="text-sm font-semibold text-primary">
                                                {product.free_shipping ? "Free Shipping" : "Shipping Available"}
                                            </div>
                                            <p className="text-xs text-tertiary mt-0.5">
                                                {product.free_shipping
                                                    ? "This item ships free"
                                                    : product.shipping_available
                                                      ? `Shipping cost: ${formatCurrency(product.shipping_cost)}`
                                                      : "Pickup only"}
                                            </p>
                                        </div>
                                    </div>
                                </div>

                                {/* Help */}
                                <div className="px-5 py-4 bg-secondary/30 border-t border-secondary">
                                    <div className="flex items-center justify-between">
                                        <span className="text-sm text-tertiary">Need help?</span>
                                        <Link href="/contact" className="text-sm text-brand-600 hover:text-brand-700 font-medium flex items-center gap-1">
                                            Contact Us
                                            <HelpCircle className="size-3.5" />
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Related Products Sections */}
                <div className="mt-12 space-y-12">
                    <RelatedProductsBySeller sellerName={product.seller_name || ""} />
                    <RelatedProductsByCategory category={product.subcategory || product.category} />
                    <AllRelatedProducts />
                </div>
            </div>
        </div>
    );
}
