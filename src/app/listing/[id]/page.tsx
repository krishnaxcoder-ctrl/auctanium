"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useParams } from "next/navigation";
import {
  ChevronRight,
  ChevronDown,
  Heart,
  Share07,
  Star01,
  Check,
  Shield01,
  Truck01,
  MarkerPin01,
  User01,
  Eye,
  Globe01,
  ThumbsUp,
  MessageChatCircle,
  HelpCircle,
  ChevronLeft,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import {
  RelatedProductsBySeller,
  RelatedProductsByCategory,
  AllRelatedProducts,
} from "@/components/listing";

// Product type definition
interface Product {
  id: string;
  title: string;
  description: string;
  sellerDescription: string;
  currentBid: number;
  estimateLow: number;
  estimateHigh: number;
  noReserve: boolean;
  bidsCount: number;
  watchers: number;
  endDate: Date;
  images: string[];
  category: string;
  subcategory: string;
  lotNumber: string;
  bidHistory: { bidder: string; time: string; amount: number }[];
  specifications: { label: string; value: string }[];
  expert: {
    name: string;
    title: string;
    description: string;
    avatar: string;
  };
  seller: {
    name: string;
    country: string;
    verified: boolean;
    objectsSold: number;
    positiveRate: number;
    reviews: number;
    avatar: string;
  };
  shipping: {
    available: boolean;
    location: string;
  };
  buyerProtectionFee: number;
}

// Mock product data for auction
const mockProducts: Record<string, Product> = {
  "1": {
    id: "1",
    title: "Premium Wireless Noise-Canceling Headphones - AudioPro AP-500X",
    description:
      "Experience crystal-clear audio with our premium wireless headphones. Featuring advanced noise-canceling technology, 40-hour battery life, and ultra-comfortable memory foam ear cushions. Perfect for music lovers, gamers, and professionals who demand the best sound quality. This item comes with original packaging and all accessories included.",
    sellerDescription:
      "***This lot benefits from a reduced buyer's protection fee of 4.5% (instead of 9%), which will be arranged for the winning bidder after the auction closes. A sales team member will contact you one working day after the auction ends to assist you further with the discount.***",
    currentBid: 245,
    estimateLow: 300,
    estimateHigh: 400,
    noReserve: true,
    bidsCount: 12,
    watchers: 51,
    endDate: new Date(Date.now() + 9 * 24 * 60 * 60 * 1000 + 5 * 60 * 60 * 1000 + 7 * 60 * 1000),
    images: [
      "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=800&h=800&fit=crop",
    ],
    category: "Electronics",
    subcategory: "Audio Equipment",
    lotNumber: "99919171",
    bidHistory: [
      { bidder: "Bidder 2745", time: "11 min ago", amount: 245 },
      { bidder: "Bidder 5067", time: "1 h ago", amount: 220 },
      { bidder: "Bidder 5093", time: "1 h ago", amount: 195 },
      { bidder: "Bidder 1842", time: "2 h ago", amount: 175 },
      { bidder: "Bidder 3291", time: "3 h ago", amount: 150 },
      { bidder: "Bidder 7734", time: "5 h ago", amount: 125 },
    ],
    specifications: [
      { label: "Brand", value: "AudioPro" },
      { label: "Model", value: "AP-500X" },
      { label: "Condition", value: "New" },
      { label: "Color", value: "Matte Black" },
      { label: "Connectivity", value: "Bluetooth 5.2" },
      { label: "Battery Life", value: "40 hours" },
      { label: "Driver Size", value: "40mm" },
      { label: "Frequency Response", value: "20Hz - 20kHz" },
      { label: "Weight", value: "250g" },
      { label: "Noise Cancellation", value: "Active" },
      { label: "Country of Origin", value: "Japan" },
      { label: "Warranty", value: "2 years" },
    ],
    expert: {
      name: "Michael Chen",
      title: "Audio Equipment Specialist",
      description: "Professional audio engineer with 15 years experience in high-end audio equipment evaluation.",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    seller: {
      name: "TECHSTORE PREMIUM",
      country: "United States",
      verified: true,
      objectsSold: 4618,
      positiveRate: 99.05,
      reviews: 1259,
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    },
    shipping: {
      available: true,
      location: "San Francisco, CA",
    },
    buyerProtectionFee: 9,
  },
  "2": {
    id: "2",
    title: "Apple MacBook Pro 16\" M3 Max - Space Black - Professional Workstation",
    description:
      "The most powerful MacBook Pro ever. With M3 Max chip featuring up to 16-core CPU, 40-core GPU, and up to 128GB unified memory. The 16.2-inch Liquid Retina XDR display delivers stunning visuals with extreme dynamic range. Perfect for professionals in video editing, 3D rendering, and software development. Includes original box, charger, and documentation.",
    sellerDescription:
      "***Professionally tested and certified. This MacBook Pro has been thoroughly inspected and is in perfect working condition. Comes with 90-day warranty from our store. International shipping available with insurance.***",
    currentBid: 2850,
    estimateLow: 3200,
    estimateHigh: 3600,
    noReserve: false,
    bidsCount: 28,
    watchers: 124,
    endDate: new Date(Date.now() + 2 * 24 * 60 * 60 * 1000 + 14 * 60 * 60 * 1000 + 32 * 60 * 1000),
    images: [
      "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1541807084-5c52b6b3adef?w=800&h=800&fit=crop",
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=800&h=800&fit=crop",
    ],
    category: "Computers",
    subcategory: "Laptops",
    lotNumber: "99921847",
    bidHistory: [
      { bidder: "Bidder 8821", time: "5 min ago", amount: 2850 },
      { bidder: "Bidder 1923", time: "22 min ago", amount: 2800 },
      { bidder: "Bidder 4456", time: "1 h ago", amount: 2750 },
      { bidder: "Bidder 8821", time: "2 h ago", amount: 2700 },
      { bidder: "Bidder 6612", time: "3 h ago", amount: 2650 },
      { bidder: "Bidder 1923", time: "4 h ago", amount: 2600 },
    ],
    specifications: [
      { label: "Brand", value: "Apple" },
      { label: "Model", value: "MacBook Pro 16\"" },
      { label: "Condition", value: "Like New" },
      { label: "Processor", value: "M3 Max" },
      { label: "CPU Cores", value: "16-core" },
      { label: "GPU Cores", value: "40-core" },
      { label: "Memory", value: "48GB Unified" },
      { label: "Storage", value: "1TB SSD" },
      { label: "Display", value: "16.2\" Retina XDR" },
      { label: "Battery Life", value: "22 hours" },
      { label: "Weight", value: "2.14 kg" },
      { label: "Year", value: "2024" },
    ],
    expert: {
      name: "Sarah Johnson",
      title: "Apple Products Expert",
      description: "Certified Apple specialist with expertise in professional-grade Mac hardware evaluation.",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    seller: {
      name: "APPLE AUTHORIZED RESELLER",
      country: "United States",
      verified: true,
      objectsSold: 8421,
      positiveRate: 99.8,
      reviews: 3847,
      avatar: "https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=100&h=100&fit=crop",
    },
    shipping: {
      available: true,
      location: "New York, NY",
    },
    buyerProtectionFee: 9,
  },
};

const defaultProduct = mockProducts["1"];

// Countdown Timer Component
function CountdownTimer({ endDate }: { endDate: Date }) {
  // Assume auction duration is 14 days for progress calculation
  const auctionDuration = 14 * 24 * 60 * 60 * 1000;

  // Calculate initial values
  const getTimeAndProgress = () => {
    const now = new Date().getTime();
    const distance = endDate.getTime() - now;

    if (distance > 0) {
      return {
        timeLeft: {
          days: Math.floor(distance / (1000 * 60 * 60 * 24)),
          hours: Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60)),
          minutes: Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60)),
          seconds: Math.floor((distance % (1000 * 60)) / 1000),
        },
        progress: Math.min(100, (distance / auctionDuration) * 100),
      };
    }
    return {
      timeLeft: { days: 0, hours: 0, minutes: 0, seconds: 0 },
      progress: 0,
    };
  };

  const initial = getTimeAndProgress();
  const [timeLeft, setTimeLeft] = useState(initial.timeLeft);
  const [progress, setProgress] = useState(initial.progress);

  useEffect(() => {
    const timer = setInterval(() => {
      const { timeLeft: newTimeLeft, progress: newProgress } = getTimeAndProgress();
      setTimeLeft(newTimeLeft);
      setProgress(newProgress);
    }, 1000);

    return () => clearInterval(timer);
  }, [endDate]);

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
      {/* Progress Bar */}
      <div className="mt-4 h-1 w-full bg-secondary overflow-hidden">
        <div
          className="h-full bg-brand-300"
          style={{ width: `${progress}%` }}
        />
      </div>
    </div>
  );
}

export default function ListingPage() {
  const params = useParams();
  const id = params.id as string;
  const [selectedImage, setSelectedImage] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showAllBids, setShowAllBids] = useState(false);
  const [customBid, setCustomBid] = useState("");
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const product = mockProducts[id] || defaultProduct;
  const minBid = product.currentBid + 5;
  const quickBids = [minBid, minBid + 5, minBid + 10];

  return (
    <div className="min-h-screen bg-primary">
      {/* Breadcrumb - Hidden on mobile */}
      <div className="hidden sm:block border-b border-secondary">
        <div className="mx-auto max-w-8xl px-4 py-3 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <nav className="flex items-center gap-2 text-sm">
              <Link href="/" className="text-tertiary hover:text-brand-600 transition-colors">
                {product.category}
              </Link>
              <ChevronRight className="size-3.5 text-quaternary" />
              <Link href="/" className="text-tertiary hover:text-brand-600 transition-colors">
                {product.subcategory}
              </Link>
              <ChevronRight className="size-3.5 text-quaternary" />
              <span className="text-tertiary">No. {product.lotNumber}</span>
            </nav>
            <div className="flex items-center gap-4 text-sm text-tertiary">
              {isMounted && (
                <span className="text-xs text-tertiary bg-secondary px-2 py-1">
                  {product.endDate.toLocaleDateString("en-US", { month: "long", day: "numeric" })} {product.endDate.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" })}
                </span>
              )}
              <div className="flex items-center gap-2">
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <ChevronLeft className="size-4" />
                </button>
                <span>1/59</span>
                <button className="flex items-center gap-1 hover:text-primary transition-colors">
                  <ChevronRight className="size-4" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="mx-auto max-w-8xl px-4 py-3 sm:py-3 sm:px-6 lg:px-8">
        {/* Title Row */}
        <div className="flex items-start justify-between gap-4 mb-3 sm:mb-3">
          <h1 className="text-base font-semibold text-primary sm:text-xl leading-tight flex-1">
            {product.noReserve && <span className="text-tertiary">No reserve price - </span>}
            {product.title}
          </h1>
          {/* Like & Share - Hidden on mobile, shown on desktop */}
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={() => setIsWishlisted(!isWishlisted)}
              className="flex items-center gap-1.5 text-tertiary hover:text-primary transition-colors"
            >
              <Heart className={`size-5 ${isWishlisted ? "fill-error-500 text-error-500" : ""}`} />
              <span className="text-sm">{product.watchers}</span>
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
              {/* Main Image */}
              <div className="relative flex-1 aspect-[4/3] overflow-hidden border border-secondary bg-secondary rounded-sm order-1 sm:order-1">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.title}
                  fill
                  className="object-cover"
                  priority
                />
                {/* Floating Like & Share - Mobile only */}
                <div className="absolute top-3 right-3 flex items-center gap-2 sm:hidden">
                  <button
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className="flex items-center justify-center size-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-600 hover:text-primary transition-colors"
                  >
                    <Heart className={`size-5 ${isWishlisted ? "fill-error-500 text-error-500" : ""}`} />
                  </button>
                  <button className="flex items-center justify-center size-9 rounded-full bg-white/90 backdrop-blur-sm shadow-md text-gray-600 hover:text-primary transition-colors">
                    <Share07 className="size-5" />
                  </button>
                </div>
              </div>
              {/* Thumbnails - Horizontal on mobile, Vertical on desktop */}
              <div className="flex flex-row sm:flex-col gap-2 order-2 sm:order-2 sm:w-20 overflow-x-auto sm:overflow-visible">
                {product.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(index)}
                    className={`relative aspect-square overflow-hidden border-2 transition-all rounded-sm shrink-0 w-16 sm:w-auto ${
                      selectedImage === index
                        ? "border-brand-600"
                        : "border-secondary hover:border-tertiary"
                    }`}
                  >
                    <Image
                      src={image}
                      alt={`View ${index + 1}`}
                      fill
                      className="object-cover"
                    />
                  </button>
                ))}
              </div>
            </div>

            {/* Product Description */}
            <div>
              <p className="text-secondary leading-relaxed">{product.description}</p>
              <div className="mt-3 flex items-center gap-2 text-xs text-tertiary">
                <span className="inline-flex items-center gap-1 bg-secondary px-2 py-1">
                  <Star01 className="size-3" /> AI-assisted summary
                </span>
              </div>
            </div>

            {/* Description from Seller */}
            <div className="border-t border-secondary pt-6">
              <h2 className="text-lg font-semibold text-primary mb-4">Description from the seller</h2>
              <p className={`text-secondary leading-relaxed ${!showFullDescription ? "line-clamp-3" : ""}`}>
                {product.sellerDescription}
              </p>
              <div className="mt-3 flex items-center gap-4">
                <span className="text-xs text-tertiary flex items-center gap-1">
                  <Globe01 className="size-3" /> Translated
                  <button className="text-brand-600 hover:underline ml-1">Show original</button>
                </span>
              </div>
              <button
                onClick={() => setShowFullDescription(!showFullDescription)}
                className="mt-2 text-sm text-brand-600 hover:underline"
              >
                {showFullDescription ? "Show less" : "Show more"}
              </button>
            </div>

            {/* Details/Specifications */}
            <div className="border-t border-secondary pt-6">
              <h2 className="text-lg font-semibold text-primary mb-6">Details</h2>
              <div className="grid grid-cols-2 gap-x-8 gap-y-4">
                {product.specifications.map((spec, index) => (
                  <div key={index} className="flex flex-col">
                    <span className="text-xs text-tertiary uppercase tracking-wide">{spec.label}</span>
                    <span className="text-sm font-medium text-primary mt-0.5">{spec.value}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Shipping */}
            <div className="border-t border-secondary pt-6">
              <h2 className="text-lg font-semibold text-primary mb-4">Shipping</h2>
              <div className="space-y-2">
                <p className="text-sm font-medium text-primary">
                  {product.shipping.available ? "Available" : "Not available"}
                </p>
                <p className="text-sm text-tertiary">Location: {product.shipping.location}</p>
                {!product.shipping.available && (
                  <p className="text-sm text-tertiary">
                    Delivery and shipping is not available because bidding from your country is not possible at this moment.
                  </p>
                )}
                <button className="text-sm text-brand-600 hover:underline">Show more</button>
              </div>
            </div>

            {/* Seller Info - Bottom */}
            <div className="border-t border-secondary pt-6">
              <div className="flex items-center justify-between mb-4">
                <span className="text-sm text-tertiary">Sold by</span>
                <button className="flex items-center gap-1.5 text-sm text-tertiary hover:text-primary transition-colors">
                  <Heart className="size-4" /> Follow
                </button>
              </div>
              <div className="flex items-center gap-4">
                <h3 className="text-lg font-semibold text-primary">{product.seller.name}</h3>
                <ChevronRight className="size-4 text-tertiary" />
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span className="text-xs bg-secondary px-2 py-1 flex items-center gap-1">
                  🇺🇸 {product.seller.country}
                </span>
                {product.seller.verified && (
                  <span className="text-xs text-tertiary flex items-center gap-1">
                    <Check className="size-3" /> Verified
                  </span>
                )}
              </div>
              <div className="grid grid-cols-3 gap-4 mt-6 border border-secondary">
                <div className="p-4 text-center border-r border-secondary">
                  <div className="text-lg font-semibold text-primary">{product.seller.objectsSold.toLocaleString()}</div>
                  <div className="text-xs text-tertiary">Objects sold</div>
                </div>
                <div className="p-4 text-center border-r border-secondary">
                  <div className="text-lg font-semibold text-primary flex items-center justify-center gap-1">
                    <ThumbsUp className="size-4 text-success-500" /> {product.seller.positiveRate}%
                  </div>
                  <div className="text-xs text-tertiary">Positive</div>
                </div>
                <div className="p-4 text-center">
                  <div className="text-lg font-semibold text-primary">{product.seller.reviews.toLocaleString()}</div>
                  <div className="text-xs text-tertiary">Reviews</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Bidding Card */}
          <div className="lg:col-span-1">
            <div className="space-y-4">
              {/* Auction Timer Card */}
              <div className="border border-secondary bg-primary">
                <div className="p-4 border-b border-secondary">
                  {isMounted && <CountdownTimer endDate={product.endDate} />}
                </div>

                {/* Current Bid */}
                <div className="p-4 border-b border-secondary">
                  <div className="text-xs text-tertiary uppercase tracking-wide">CURRENT BID</div>
                  <div className="text-3xl font-semibold text-primary mt-1">$ {product.currentBid}</div>
                  {product.noReserve && (
                    <div className="text-sm text-success-600 mt-1">No reserve price</div>
                  )}
                </div>

                {/* Expert Selection */}
                <div className="p-4 border-b border-secondary">
                  <div className="flex items-start gap-3">
                    <div className="relative size-12 rounded-full overflow-hidden border border-secondary shrink-0">
                      <Image src={product.expert.avatar} alt={product.expert.name} fill className="object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-medium text-white bg-brand-600 px-1.5 py-0.5">Expert</span>
                        <span className="text-sm font-medium text-primary truncate">{product.expert.name}</span>
                        <ChevronRight className="size-4 text-tertiary shrink-0" />
                      </div>
                      <p className="text-xs text-tertiary mt-1 line-clamp-2">{product.expert.description}</p>
                    </div>
                  </div>
                </div>

                {/* Estimate */}
                <div className="p-4 border-b border-secondary">
                  <div className="flex items-center gap-2">
                    <span className="text-tertiary">💎</span>
                    <span className="text-sm text-tertiary">Estimate</span>
                  </div>
                  <div className="text-lg font-semibold text-primary mt-1">
                    $ {product.estimateLow.toLocaleString()} - $ {product.estimateHigh.toLocaleString()}
                  </div>
                </div>

                {/* Quick Bid Buttons */}
                <div className="p-4 border-b border-secondary">
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    {quickBids.map((bid) => (
                      <button
                        key={bid}
                        onClick={() => setCustomBid(String(bid))}
                        className="py-2 px-3 border border-secondary text-sm font-medium text-primary hover:border-primary transition-colors"
                      >
                        $ {bid}
                      </button>
                    ))}
                  </div>
                  <div className="relative">
                    <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
                    <input
                      type="text"
                      value={customBid}
                      onChange={(e) => setCustomBid(e.target.value)}
                      placeholder={`${minBid} or up`}
                      className="w-full py-2.5 pl-7 pr-3 border border-secondary text-sm text-primary bg-primary focus:outline-none focus:border-primary"
                    />
                  </div>
                </div>

                {/* Bid Buttons */}
                <div className="p-4 border-b border-secondary">
                  <div className="grid grid-cols-2 gap-3">
                    <button className="py-3 px-4 border border-secondary text-sm font-medium text-primary hover:border-primary transition-colors">
                      Place bid
                    </button>
                    <button className="py-3 px-4 bg-brand-600 text-sm font-medium text-white hover:bg-brand-700 transition-colors">
                      Set max bid
                    </button>
                  </div>
                </div>

                {/* Watchers */}
                <div className="p-4 border-b border-secondary">
                  <div className="flex items-center gap-2 text-sm text-tertiary">
                    <Eye className="size-4" />
                    <span>{product.watchers} other people are watching this object</span>
                  </div>
                </div>

                {/* Bid History */}
                <div className="p-4 border-b border-secondary">
                  <div className="space-y-3">
                    {(showAllBids ? product.bidHistory : product.bidHistory.slice(0, 3)).map((bid, index) => (
                      <div key={index} className="flex items-center justify-between text-sm">
                        <div className="flex items-center gap-2">
                          <div className={`w-1 h-4 ${index === 0 ? "bg-brand-600" : index === 1 ? "bg-warning-500" : "bg-error-500"}`} />
                          <span className="text-primary">{bid.bidder}</span>
                        </div>
                        <span className="text-tertiary">{bid.time}</span>
                        <span className="font-medium text-primary">${bid.amount}</span>
                      </div>
                    ))}
                  </div>
                  <button
                    onClick={() => setShowAllBids(!showAllBids)}
                    className="mt-4 text-sm text-brand-600 hover:underline flex items-center gap-1"
                  >
                    See all bids ({product.bidsCount})
                    <ChevronDown className={`size-4 transition-transform ${showAllBids ? "rotate-180" : ""}`} />
                  </button>
                </div>

                {/* Buyer Protection & Shipping */}
                <div className="p-4 border-b border-secondary space-y-3">
                  <div className="flex items-center gap-2 text-sm">
                    <Shield01 className="size-4 text-tertiary" />
                    <span className="text-tertiary">Buyer Protection fee: {product.buyerProtectionFee}% + $ 3</span>
                  </div>
                  <div className="flex items-center gap-2 text-sm">
                    <Truck01 className="size-4 text-tertiary" />
                    <span className="text-tertiary">
                      {product.shipping.available ? "Shipping available" : "Shipping unavailable"}
                    </span>
                  </div>
                </div>

                {/* Payment Options */}
                <div className="p-4 border-b border-secondary">
                  <div className="text-xs text-tertiary mb-3">Payment options</div>
                  <Image
                    src="/payments-icons/image.png"
                    alt="Payment options"
                    width={500}
                    height={70}
                    className="object-contain"
                  />
                </div>

                {/* Buyer Protection Info */}
                <div className="p-4 border-b border-secondary">
                  <div className="flex items-start gap-3">
                    <Shield01 className="size-5 text-brand-600 shrink-0 mt-0.5" />
                    <div>
                      <div className="text-sm font-medium text-primary">Buyer Protection</div>
                      <p className="text-xs text-tertiary mt-1">
                        Your payment's safe with us until you receive your object.{" "}
                        <button className="text-brand-600 hover:underline">View details</button>
                      </p>
                    </div>
                  </div>
                </div>

                {/* Trustpilot */}
                <div className="p-4 border-b border-secondary">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="flex items-center gap-2">
                        <Star01 className="size-4 fill-success-500 text-success-500" />
                        <span className="text-sm font-medium text-primary">Trustpilot 4.4</span>
                        <span className="text-sm text-tertiary">| 122713 reviews</span>
                      </div>
                      <p className="text-xs text-tertiary mt-1">
                        Rated <span className="text-success-600">Excellent</span> on{" "}
                        <button className="text-brand-600 hover:underline">Trustpilot</button>
                      </p>
                    </div>
                    <Image
                      src="/Trustpilot.png"
                      alt="Trustpilot"
                      width={80}
                      height={32}
                      className="object-contain"
                    />
                  </div>
                </div>

                {/* Help & Share */}
                <div className="p-4">
                  <div className="flex flex-col gap-4">
                    <div>
                      <div className="text-sm font-medium text-primary">Any questions?</div>
                      <button className="text-xs text-brand-600 hover:underline flex items-center gap-1 mt-1">
                        <HelpCircle className="size-3" /> Get in touch via our Help Centre
                      </button>
                    </div>
                    <div>
                      <div className="text-sm font-medium text-primary mb-2">Share this object with your friends</div>
                      <div className="flex items-center gap-3">
                        <button className="size-8 border border-secondary flex items-center justify-center text-tertiary hover:text-primary hover:border-primary transition-colors">
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                        </button>
                        <button className="size-8 border border-secondary flex items-center justify-center text-tertiary hover:text-primary hover:border-primary transition-colors">
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                        </button>
                        <button className="size-8 border border-secondary flex items-center justify-center text-tertiary hover:text-primary hover:border-primary transition-colors">
                          <svg className="size-4" fill="currentColor" viewBox="0 0 24 24"><path d="M12.017 0C5.396 0 .029 5.367.029 11.987c0 5.079 3.158 9.417 7.618 11.162-.105-.949-.199-2.403.041-3.439.219-.937 1.406-5.957 1.406-5.957s-.359-.72-.359-1.781c0-1.663.967-2.911 2.168-2.911 1.024 0 1.518.769 1.518 1.688 0 1.029-.653 2.567-.992 3.992-.285 1.193.6 2.165 1.775 2.165 2.128 0 3.768-2.245 3.768-5.487 0-2.861-2.063-4.869-5.008-4.869-3.41 0-5.409 2.562-5.409 5.199 0 1.033.394 2.143.889 2.741.099.12.112.225.085.345-.09.375-.293 1.199-.334 1.363-.053.225-.172.271-.401.165-1.495-.69-2.433-2.878-2.433-4.646 0-3.776 2.748-7.252 7.92-7.252 4.158 0 7.392 2.967 7.392 6.923 0 4.135-2.607 7.462-6.233 7.462-1.214 0-2.354-.629-2.758-1.379l-.749 2.848c-.269 1.045-1.004 2.352-1.498 3.146 1.123.345 2.306.535 3.55.535 6.607 0 11.985-5.365 11.985-11.987C23.97 5.39 18.592.026 11.985.026L12.017 0z"/></svg>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

            </div>
          </div>
        </div>

        {/* Related Products Sections */}
        <div className="mt-12 space-y-12">
          <RelatedProductsBySeller sellerName={product.seller.name} />
          <RelatedProductsByCategory category={product.subcategory} />
          <AllRelatedProducts />
        </div>
      </div>
    </div>
  );
}