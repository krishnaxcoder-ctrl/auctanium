"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  ChevronRight,
  Home05,
  Zap,
  Eye,
  Heart,
  ArrowRight,
  Star01,
  Users01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const timeFilters = [
  { id: "1h", label: "< 1 Hour" },
  { id: "6h", label: "< 6 Hours" },
  { id: "24h", label: "< 24 Hours" },
  { id: "3d", label: "< 3 Days" },
];

const auctions = [
  {
    id: "1",
    title: "Vintage Rolex Submariner 1968 - Rare Collector's Edition",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
    currentBid: "₹2,45,000",
    timeLeft: "45m",
    timeLeftMinutes: 45,
    bids: 23,
    watchers: 156,
    hot: true,
    seller: { name: "Vintage Treasures", rating: 4.9 },
  },
  {
    id: "2",
    title: "Pokemon Charizard Holo 1st Edition PSA 10",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=600&fit=crop",
    currentBid: "₹3,50,000",
    timeLeft: "1h 20m",
    timeLeftMinutes: 80,
    bids: 45,
    watchers: 289,
    hot: true,
    seller: { name: "Card Kingdom", rating: 5.0 },
  },
  {
    id: "3",
    title: "Louis Vuitton Keepall 55 Monogram - Vintage 1990",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
    currentBid: "₹85,000",
    timeLeft: "2h 45m",
    timeLeftMinutes: 165,
    bids: 12,
    watchers: 78,
    hot: false,
    seller: { name: "Classic Collections", rating: 4.8 },
  },
  {
    id: "4",
    title: "Antique Victorian Writing Desk - Mahogany",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600&h=600&fit=crop",
    currentBid: "₹1,25,000",
    timeLeft: "4h 15m",
    timeLeftMinutes: 255,
    bids: 8,
    watchers: 45,
    hot: false,
    seller: { name: "Art & Antiques Hub", rating: 4.7 },
  },
  {
    id: "5",
    title: "Nike Air Jordan 1 Retro High OG 'Chicago' - Deadstock",
    image: "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=600&h=600&fit=crop",
    currentBid: "₹45,000",
    timeLeft: "5h 30m",
    timeLeftMinutes: 330,
    bids: 34,
    watchers: 198,
    hot: true,
    seller: { name: "SneakerVault", rating: 4.9 },
  },
  {
    id: "6",
    title: "Rare First Edition Harry Potter Book Set - Signed",
    image: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=600&h=600&fit=crop",
    currentBid: "₹2,80,000",
    timeLeft: "8h 15m",
    timeLeftMinutes: 495,
    bids: 19,
    watchers: 134,
    hot: true,
    seller: { name: "BookWorm Paradise", rating: 4.6 },
  },
  {
    id: "7",
    title: "1967 Ford Mustang Fastback - Fully Restored",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&h=600&fit=crop",
    currentBid: "₹35,00,000",
    timeLeft: "12h 45m",
    timeLeftMinutes: 765,
    bids: 7,
    watchers: 456,
    hot: true,
    seller: { name: "Luxury Motors", rating: 4.9 },
  },
  {
    id: "8",
    title: "Château Margaux 1982 - Case of 6 Bottles",
    image: "https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?w=600&h=600&fit=crop",
    currentBid: "₹4,50,000",
    timeLeft: "18h 30m",
    timeLeftMinutes: 1110,
    bids: 11,
    watchers: 89,
    hot: false,
    seller: { name: "Fine Wine Cellar", rating: 4.8 },
  },
];

export default function EndingSoonPage() {
  const [activeFilter, setActiveFilter] = useState("24h");

  const filteredAuctions = auctions.filter((auction) => {
    if (activeFilter === "1h") return auction.timeLeftMinutes <= 60;
    if (activeFilter === "6h") return auction.timeLeftMinutes <= 360;
    if (activeFilter === "24h") return auction.timeLeftMinutes <= 1440;
    return true;
  });

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-warning-600 to-error-600">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white">
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <Link href="/marketplace" className="text-white/70 hover:text-white">Auctions</Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Ending Soon</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Clock className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Ending Soon
              </h1>
              <p className="mt-2 hidden text-white/80 sm:block">
                Don&apos;t miss out on these auctions ending soon!
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Live Counter */}
      <div className="bg-error-50 border-b border-error-200 py-3">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-center gap-2 text-sm">
            <span className="relative flex size-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-error-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full size-2 bg-error-500"></span>
            </span>
            <span className="font-medium text-error-700">
              {auctions.filter(a => a.timeLeftMinutes <= 60).length} auctions ending in the next hour
            </span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === filter.id
                    ? "bg-error-600 text-white"
                    : "bg-secondary text-secondary hover:bg-error-100 hover:text-error-700"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <span className="text-sm text-tertiary">{filteredAuctions.length} auctions found</span>
        </div>

        {/* Auctions Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredAuctions.map((auction) => (
            <Link
              key={auction.id}
              href={`/listing/${auction.id}`}
              className="group rounded-2xl border border-secondary bg-primary overflow-hidden transition-all hover:border-brand-300 hover:shadow-lg"
            >
              <div className="aspect-square relative">
                <Image
                  src={auction.image}
                  alt={auction.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge type="pill-color" color="error" size="sm">
                    <Clock className="size-3 mr-1" />
                    {auction.timeLeft}
                  </Badge>
                  {auction.hot && (
                    <Badge type="pill-color" color="warning" size="sm">
                      <Zap className="size-3 mr-1" />
                      Hot
                    </Badge>
                  )}
                </div>
                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-tertiary hover:text-error-600 transition-colors">
                  <Heart className="size-4" />
                </button>
              </div>

              <div className="p-4">
                <h3 className="font-semibold text-primary line-clamp-2 group-hover:text-brand-600">
                  {auction.title}
                </h3>

                <div className="mt-3 flex items-center justify-between">
                  <div>
                    <p className="text-xs text-tertiary">Current Bid</p>
                    <p className="text-lg font-bold text-brand-600">{auction.currentBid}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-xs text-tertiary">{auction.bids} bids</p>
                    <div className="flex items-center gap-1 text-sm text-tertiary">
                      <Eye className="size-3" />
                      {auction.watchers}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-secondary flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star01 className="size-4 text-yellow-500" />
                    <span className="text-sm font-medium">{auction.seller.rating}</span>
                  </div>
                  <span className="text-xs text-tertiary">{auction.seller.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredAuctions.length === 0 && (
          <div className="text-center py-12">
            <Clock className="size-12 text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary">No auctions ending soon</h3>
            <p className="text-tertiary mt-1">Check back later or adjust your filters</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Users01 className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Browse All Auctions</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Discover thousands of unique items across all categories.
          </p>
          <Link href="/marketplace">
            <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
              View Marketplace
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
