"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users01,
  ChevronRight,
  Home05,
  SearchLg,
  Star01,
  CheckVerified01,
  Package,
  ThumbsUp,
  ArrowRight,
  FilterLines,
  MarkerPin01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

const filterOptions = [
  { id: "all", label: "All Sellers" },
  { id: "verified", label: "Verified" },
  { id: "top-rated", label: "Top Rated" },
  { id: "new", label: "New Sellers" },
];

const sellers = [
  {
    id: "1",
    name: "Vintage Treasures",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4.9,
    reviews: 1250,
    sold: 3400,
    verified: true,
    topRated: true,
    location: "Mumbai, India",
    specialties: ["Watches", "Jewelry", "Art"],
    banner: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=800&h=300&fit=crop",
  },
  {
    id: "2",
    name: "Classic Collections",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 4.8,
    reviews: 890,
    sold: 2100,
    verified: true,
    topRated: true,
    location: "Delhi, India",
    specialties: ["Fashion", "Accessories", "Bags"],
    banner: "https://images.unsplash.com/photo-1558171813-01342daa54d6?w=800&h=300&fit=crop",
  },
  {
    id: "3",
    name: "Art & Antiques Hub",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4.7,
    reviews: 567,
    sold: 1200,
    verified: true,
    topRated: false,
    location: "Bangalore, India",
    specialties: ["Paintings", "Sculptures", "Decor"],
    banner: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=800&h=300&fit=crop",
  },
  {
    id: "4",
    name: "Card Kingdom",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5.0,
    reviews: 2340,
    sold: 8900,
    verified: true,
    topRated: true,
    location: "Chennai, India",
    specialties: ["Pokemon", "Sports Cards", "Collectibles"],
    banner: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=800&h=300&fit=crop",
  },
  {
    id: "5",
    name: "Luxury Motors",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 4.9,
    reviews: 156,
    sold: 89,
    verified: true,
    topRated: true,
    location: "Pune, India",
    specialties: ["Classic Cars", "Motorcycles", "Automobilia"],
    banner: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=300&fit=crop",
  },
  {
    id: "6",
    name: "BookWorm Paradise",
    avatar: "https://randomuser.me/api/portraits/women/68.jpg",
    rating: 4.6,
    reviews: 445,
    sold: 1890,
    verified: false,
    topRated: false,
    location: "Kolkata, India",
    specialties: ["Rare Books", "Manuscripts", "Maps"],
    banner: "https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800&h=300&fit=crop",
  },
];

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeFilter, setActiveFilter] = useState("all");

  const filteredSellers = sellers.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.specialties.some(s => s.toLowerCase().includes(searchQuery.toLowerCase()));

    if (activeFilter === "verified") return matchesSearch && seller.verified;
    if (activeFilter === "top-rated") return matchesSearch && seller.topRated;
    if (activeFilter === "new") return matchesSearch && seller.reviews < 500;
    return matchesSearch;
  });

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
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
            <span className="text-white">Sellers</span>
          </nav>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Users01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Discover Sellers
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Find trusted sellers for unique items
                </p>
              </div>
            </div>
            <Link href="/sell">
              <Button color="secondary" size="md" iconTrailing={ArrowRight}>
                Become a Seller
              </Button>
            </Link>
          </div>

          {/* Search */}
          <div className="mt-6 max-w-xl">
            <Input
              placeholder="Search sellers by name or specialty..."
              icon={SearchLg}
              size="md"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              className="bg-white/10 border-white/20 text-white placeholder:text-white/60"
            />
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Filters */}
        <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
          <div className="flex flex-wrap gap-2">
            {filterOptions.map((filter) => (
              <button
                key={filter.id}
                onClick={() => setActiveFilter(filter.id)}
                className={cx(
                  "px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeFilter === filter.id
                    ? "bg-brand-600 text-white"
                    : "bg-secondary text-secondary hover:bg-brand-100 hover:text-brand-700"
                )}
              >
                {filter.label}
              </button>
            ))}
          </div>
          <div className="flex items-center gap-2 text-sm text-tertiary">
            <FilterLines className="size-4" />
            <span>{filteredSellers.length} sellers found</span>
          </div>
        </div>

        {/* Sellers Grid */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filteredSellers.map((seller) => (
            <Link
              key={seller.id}
              href={`/seller/${seller.id}`}
              className="group rounded-2xl border border-secondary bg-primary overflow-hidden transition-all hover:border-brand-300 hover:shadow-lg"
            >
              {/* Banner */}
              <div className="aspect-[8/3] relative">
                <Image
                  src={seller.banner}
                  alt={seller.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
              </div>

              {/* Content */}
              <div className="p-5 -mt-10 relative">
                {/* Avatar */}
                <div className="relative">
                  <Image
                    src={seller.avatar}
                    alt={seller.name}
                    width={64}
                    height={64}
                    className="rounded-full border-4 border-primary object-cover"
                  />
                  {seller.verified && (
                    <div className="absolute -bottom-1 -right-1 size-6 rounded-full bg-brand-600 flex items-center justify-center">
                      <CheckVerified01 className="size-4 text-white" />
                    </div>
                  )}
                </div>

                {/* Info */}
                <div className="mt-3">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-primary group-hover:text-brand-600">
                      {seller.name}
                    </h3>
                    {seller.topRated && (
                      <Badge type="pill-color" color="warning" size="sm">Top Rated</Badge>
                    )}
                  </div>
                  <div className="flex items-center gap-1 mt-1">
                    <MarkerPin01 className="size-3 text-tertiary" />
                    <span className="text-sm text-tertiary">{seller.location}</span>
                  </div>
                </div>

                {/* Stats */}
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-secondary">
                  <div className="flex items-center gap-1">
                    <Star01 className="size-4 text-yellow-500" />
                    <span className="font-medium text-primary">{seller.rating}</span>
                    <span className="text-sm text-tertiary">({seller.reviews})</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Package className="size-4 text-tertiary" />
                    <span className="text-sm text-tertiary">{seller.sold} sold</span>
                  </div>
                </div>

                {/* Specialties */}
                <div className="flex flex-wrap gap-1.5 mt-3">
                  {seller.specialties.map((specialty, i) => (
                    <span
                      key={i}
                      className="px-2 py-0.5 rounded text-xs bg-secondary text-tertiary"
                    >
                      {specialty}
                    </span>
                  ))}
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Empty State */}
        {filteredSellers.length === 0 && (
          <div className="text-center py-12">
            <Users01 className="size-12 text-tertiary mx-auto mb-4" />
            <h3 className="text-lg font-semibold text-primary">No sellers found</h3>
            <p className="text-tertiary mt-1">Try adjusting your search or filters</p>
          </div>
        )}

        {/* CTA */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <h2 className="text-2xl font-bold text-white">Want to sell on Auctanium?</h2>
              <p className="mt-2 text-brand-100 max-w-xl">
                Join thousands of sellers reaching millions of buyers. Start selling today with low fees and powerful tools.
              </p>
            </div>
            <div className="flex gap-3">
              <Link href="/sell">
                <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                  Start Selling
                </Button>
              </Link>
              <Link href="/seller/pricing">
                <Button size="lg" className="bg-white/20 text-white hover:bg-white/30">
                  View Pricing
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
