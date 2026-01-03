"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Zap,
  ChevronRight,
  Home05,
  Clock,
  Eye,
  Heart,
  ArrowRight,
  Star01,
  FilterLines,
  Stars01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const timeFilters = [
  { id: "today", label: "Listed Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
];

const categoryFilters = [
  { id: "all", label: "All" },
  { id: "watches", label: "Watches" },
  { id: "art", label: "Art" },
  { id: "fashion", label: "Fashion" },
  { id: "collectibles", label: "Collectibles" },
];

const newListings = [
  {
    id: "1",
    title: "Brand New Omega Speedmaster Moonwatch Professional",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=600&h=600&fit=crop",
    startingBid: "₹3,25,000",
    currentBid: "₹3,45,000",
    timeLeft: "6d 23h",
    bids: 5,
    watchers: 89,
    listedAgo: "2 hours ago",
    seller: { name: "Luxury Watches Co", rating: 4.8 },
    category: "watches",
  },
  {
    id: "2",
    title: "Contemporary Abstract Oil Painting - Original Artwork",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=600&h=600&fit=crop",
    startingBid: "₹45,000",
    currentBid: null,
    timeLeft: "7d 0h",
    bids: 0,
    watchers: 23,
    listedAgo: "4 hours ago",
    seller: { name: "Art Gallery Direct", rating: 4.9 },
    category: "art",
  },
  {
    id: "3",
    title: "Gucci Horsebit 1955 Shoulder Bag - New With Tags",
    image: "https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=600&h=600&fit=crop",
    startingBid: "₹1,15,000",
    currentBid: "₹1,25,000",
    timeLeft: "6d 20h",
    bids: 8,
    watchers: 156,
    listedAgo: "6 hours ago",
    seller: { name: "Designer Resale", rating: 4.7 },
    category: "fashion",
  },
  {
    id: "4",
    title: "Sealed Pokemon Evolving Skies Booster Box",
    image: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=600&h=600&fit=crop",
    startingBid: "₹18,000",
    currentBid: "₹22,000",
    timeLeft: "6d 18h",
    bids: 12,
    watchers: 234,
    listedAgo: "8 hours ago",
    seller: { name: "Card Kingdom", rating: 5.0 },
    category: "collectibles",
  },
  {
    id: "5",
    title: "Patek Philippe Calatrava 5196G - White Gold",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=600&h=600&fit=crop",
    startingBid: "₹15,00,000",
    currentBid: null,
    timeLeft: "6d 16h",
    bids: 0,
    watchers: 78,
    listedAgo: "12 hours ago",
    seller: { name: "Vintage Treasures", rating: 4.9 },
    category: "watches",
  },
  {
    id: "6",
    title: "Banksy Print - Girl With Balloon - Numbered Edition",
    image: "https://images.unsplash.com/photo-1578662996442-48f60103fc96?w=600&h=600&fit=crop",
    startingBid: "₹2,50,000",
    currentBid: "₹2,75,000",
    timeLeft: "6d 14h",
    bids: 3,
    watchers: 167,
    listedAgo: "18 hours ago",
    seller: { name: "Urban Art Dealers", rating: 4.6 },
    category: "art",
  },
  {
    id: "7",
    title: "Hermès Birkin 30 Togo Leather - Gold Hardware",
    image: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=600&h=600&fit=crop",
    startingBid: "₹8,50,000",
    currentBid: "₹9,25,000",
    timeLeft: "6d 12h",
    bids: 15,
    watchers: 345,
    listedAgo: "1 day ago",
    seller: { name: "Luxury Resale Co", rating: 4.9 },
    category: "fashion",
  },
  {
    id: "8",
    title: "Vintage Star Wars Action Figure Collection - 1977",
    image: "https://images.unsplash.com/photo-1608889825205-eebdb9fc5806?w=600&h=600&fit=crop",
    startingBid: "₹75,000",
    currentBid: "₹85,000",
    timeLeft: "6d 10h",
    bids: 7,
    watchers: 98,
    listedAgo: "1 day ago",
    seller: { name: "Retro Collectibles", rating: 4.7 },
    category: "collectibles",
  },
];

export default function NewAuctionsPage() {
  const [activeTimeFilter, setActiveTimeFilter] = useState("today");
  const [activeCategory, setActiveCategory] = useState("all");

  const filteredListings = newListings.filter((listing) => {
    if (activeCategory === "all") return true;
    return listing.category === activeCategory;
  });

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-success-600 to-brand-600">
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
            <span className="text-white">Newly Listed</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Stars01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Newly Listed
              </h1>
              <p className="mt-2 hidden text-white/80 sm:block">
                Be the first to bid on fresh listings
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Filters */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {timeFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveTimeFilter(filter.id)}
                className={cx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeTimeFilter === filter.id
                    ? "bg-success-600 text-white"
                    : "bg-secondary text-secondary hover:bg-success-100 hover:text-success-700"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex flex-wrap gap-2">
            {categoryFilters.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveCategory(filter.id)}
                className={cx(
                  "px-3 py-1.5 rounded-lg text-sm font-medium transition-all",
                  activeCategory === filter.id
                    ? "bg-brand-600 text-white"
                    : "bg-secondary text-secondary hover:bg-brand-100 hover:text-brand-700"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          <div className="rounded-xl border border-secondary bg-primary p-4 text-center">
            <p className="text-2xl font-bold text-brand-600">{newListings.length}</p>
            <p className="text-sm text-tertiary">New Today</p>
          </div>
          <div className="rounded-xl border border-secondary bg-primary p-4 text-center">
            <p className="text-2xl font-bold text-success-600">{newListings.filter(l => l.bids === 0).length}</p>
            <p className="text-sm text-tertiary">No Bids Yet</p>
          </div>
          <div className="rounded-xl border border-secondary bg-primary p-4 text-center">
            <p className="text-2xl font-bold text-warning-600">₹50L+</p>
            <p className="text-sm text-tertiary">Total Value</p>
          </div>
          <div className="rounded-xl border border-secondary bg-primary p-4 text-center">
            <p className="text-2xl font-bold text-error-600">1.2K</p>
            <p className="text-sm text-tertiary">Total Watchers</p>
          </div>
        </div>

        {/* Listings Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {filteredListings.map((listing) => (
            <Link
              key={listing.id}
              href={`/listing/${listing.id}`}
              className="group rounded-2xl border border-secondary bg-primary overflow-hidden transition-all hover:border-brand-300 hover:shadow-lg"
            >
              <div className="aspect-square relative">
                <Image
                  src={listing.image}
                  alt={listing.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                />
                {/* Badges */}
                <div className="absolute top-3 left-3 flex flex-col gap-2">
                  <Badge type="pill-color" color="success" size="sm">
                    <Stars01 className="size-3 mr-1" />
                    New
                  </Badge>
                  {listing.bids === 0 && (
                    <Badge type="pill-color" color="brand" size="sm">
                      <Zap className="size-3 mr-1" />
                      No Bids
                    </Badge>
                  )}
                </div>
                {/* Wishlist */}
                <button className="absolute top-3 right-3 p-2 rounded-full bg-white/80 backdrop-blur-sm text-tertiary hover:text-error-600 transition-colors">
                  <Heart className="size-4" />
                </button>
              </div>

              <div className="p-4">
                <p className="text-xs text-success-600 mb-1">{listing.listedAgo}</p>
                <h3 className="font-semibold text-primary line-clamp-2 group-hover:text-brand-600">
                  {listing.title}
                </h3>

                <div className="mt-3">
                  <p className="text-xs text-tertiary">
                    {listing.currentBid ? "Current Bid" : "Starting Bid"}
                  </p>
                  <p className="text-lg font-bold text-brand-600">
                    {listing.currentBid || listing.startingBid}
                  </p>
                </div>

                <div className="mt-3 flex items-center justify-between text-sm text-tertiary">
                  <div className="flex items-center gap-1">
                    <Clock className="size-3" />
                    {listing.timeLeft}
                  </div>
                  <div className="flex items-center gap-3">
                    <span>{listing.bids} bids</span>
                    <div className="flex items-center gap-1">
                      <Eye className="size-3" />
                      {listing.watchers}
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-secondary flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    <Star01 className="size-4 text-yellow-500" />
                    <span className="text-sm font-medium">{listing.seller.rating}</span>
                  </div>
                  <span className="text-xs text-tertiary">{listing.seller.name}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <Zap className="size-12 text-white mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-white mb-2">Get First Dibs on New Listings</h2>
          <p className="text-brand-100 mb-6 max-w-md mx-auto">
            Sign up for alerts and be the first to know when items you&apos;re interested in are listed.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/dashboard/notifications">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                Set Up Alerts
              </Button>
            </Link>
            <Link href="/marketplace">
              <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
                Browse All
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
