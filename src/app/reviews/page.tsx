"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Star01,
  ChevronRight,
  Home05,
  ThumbsUp,
  ThumbsDown,
  CheckVerified01,
  FilterLines,
  MessageChatCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { cx } from "@/utils/cx";

const stats = {
  totalReviews: "25,847",
  averageRating: 4.8,
  recommendRate: "98%",
  responseRate: "99%",
};

const ratingBreakdown = [
  { stars: 5, count: 20150, percentage: 78 },
  { stars: 4, count: 3875, percentage: 15 },
  { stars: 3, count: 1162, percentage: 4.5 },
  { stars: 2, count: 517, percentage: 2 },
  { stars: 1, count: 143, percentage: 0.5 },
];

const filterOptions = [
  { id: "all", label: "All Reviews" },
  { id: "5", label: "5 Stars" },
  { id: "4", label: "4 Stars" },
  { id: "verified", label: "Verified Purchases" },
  { id: "photos", label: "With Photos" },
];

const reviews = [
  {
    id: 1,
    author: "Rahul Sharma",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 5,
    date: "December 28, 2025",
    verified: true,
    helpful: 156,
    title: "Exceptional experience from start to finish",
    content: "I've been collecting vintage watches for years, and Auctanium has become my go-to platform. The authentication service gave me complete confidence in my ₹3L purchase. The watch arrived exactly as described, and the seller communication was excellent. Highly recommended!",
    product: "Vintage Rolex Submariner 1968",
    productImage: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=100&h=100&fit=crop",
  },
  {
    id: 2,
    author: "Priya Patel",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "December 25, 2025",
    verified: true,
    helpful: 89,
    title: "Best platform for authenticated luxury goods",
    content: "The buyer protection gave me confidence to make my first high-value purchase. The Hermès bag I bought was authenticated and arrived in perfect condition. Customer support was responsive and helpful throughout the process.",
    product: "Hermès Birkin 30 Togo",
    productImage: "https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=100&h=100&fit=crop",
  },
  {
    id: 3,
    author: "Amit Verma",
    avatar: "https://randomuser.me/api/portraits/men/45.jpg",
    rating: 4,
    date: "December 22, 2025",
    verified: true,
    helpful: 45,
    title: "Great selection and fair prices",
    content: "Found some amazing Pokemon cards that I couldn't find anywhere else. The bidding process was straightforward and exciting. Only giving 4 stars because shipping took a bit longer than expected, but the card arrived in perfect condition.",
    product: "Pokemon Charizard Holo 1st Edition",
    productImage: "https://images.unsplash.com/photo-1613771404784-3a5686aa2be3?w=100&h=100&fit=crop",
  },
  {
    id: 4,
    author: "Sneha Reddy",
    avatar: "https://randomuser.me/api/portraits/women/33.jpg",
    rating: 5,
    date: "December 20, 2025",
    verified: true,
    helpful: 72,
    title: "Sold my collection quickly and at great prices",
    content: "As a seller, I've been impressed with the platform. My vintage jewelry collection sold faster than expected, and the fees are very reasonable. The seller dashboard is intuitive and provides great analytics.",
    product: "Seller Review",
    productImage: null,
  },
  {
    id: 5,
    author: "Karthik Nair",
    avatar: "https://randomuser.me/api/portraits/men/52.jpg",
    rating: 5,
    date: "December 18, 2025",
    verified: true,
    helpful: 34,
    title: "Trust and transparency at its best",
    content: "Was initially skeptical about buying art online, but the detailed photos, seller history, and authentication service convinced me. The painting I purchased is now proudly displayed in my living room. Will definitely buy again!",
    product: "Contemporary Abstract Painting",
    productImage: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=100&h=100&fit=crop",
  },
];

export default function ReviewsPage() {
  const [activeFilter, setActiveFilter] = useState("all");

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
            <span className="text-white">Reviews</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Star01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Customer Reviews
              </h1>
              <p className="mt-2 hidden text-brand-200 sm:block">
                See what our community says about us
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div className="bg-brand-50 border-b border-brand-200 py-8">
        <div className="mx-auto max-w-8xl px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-6 lg:grid-cols-4">
            <div className="text-center">
              <p className="text-3xl font-bold text-brand-600">{stats.totalReviews}</p>
              <p className="text-sm text-tertiary mt-1">Total Reviews</p>
            </div>
            <div className="text-center">
              <div className="flex items-center justify-center gap-1">
                <p className="text-3xl font-bold text-brand-600">{stats.averageRating}</p>
                <Star01 className="size-6 text-yellow-500" />
              </div>
              <p className="text-sm text-tertiary mt-1">Average Rating</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success-600">{stats.recommendRate}</p>
              <p className="text-sm text-tertiary mt-1">Would Recommend</p>
            </div>
            <div className="text-center">
              <p className="text-3xl font-bold text-success-600">{stats.responseRate}</p>
              <p className="text-sm text-tertiary mt-1">Response Rate</p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Rating Breakdown */}
          <div className="lg:col-span-1">
            <div className="sticky top-24 rounded-2xl border border-secondary bg-primary p-6">
              <h2 className="text-lg font-semibold text-primary mb-6">Rating Breakdown</h2>
              <div className="space-y-3">
                {ratingBreakdown.map((item) => (
                  <div key={item.stars} className="flex items-center gap-3">
                    <div className="flex items-center gap-1 w-16">
                      <span className="text-sm font-medium">{item.stars}</span>
                      <Star01 className="size-4 text-yellow-500" />
                    </div>
                    <div className="flex-1 h-2 bg-secondary rounded-full overflow-hidden">
                      <div
                        className="h-full bg-yellow-500 rounded-full"
                        style={{ width: `${item.percentage}%` }}
                      />
                    </div>
                    <span className="text-sm text-tertiary w-16 text-right">
                      {item.percentage}%
                    </span>
                  </div>
                ))}
              </div>

              <div className="mt-6 pt-6 border-t border-secondary">
                <div className="flex items-center gap-2 text-success-600">
                  <CheckVerified01 className="size-5" />
                  <span className="text-sm font-medium">All reviews are verified</span>
                </div>
              </div>
            </div>
          </div>

          {/* Reviews List */}
          <div className="lg:col-span-2">
            {/* Filters */}
            <div className="flex flex-wrap gap-2 mb-6">
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

            {/* Reviews */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div
                  key={review.id}
                  className="rounded-2xl border border-secondary bg-primary p-6"
                >
                  <div className="flex items-start justify-between gap-4">
                    <div className="flex items-center gap-3">
                      <Image
                        src={review.avatar}
                        alt={review.author}
                        width={48}
                        height={48}
                        className="rounded-full"
                      />
                      <div>
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-primary">{review.author}</span>
                          {review.verified && (
                            <Badge type="pill-color" color="success" size="sm">
                              <CheckVerified01 className="size-3 mr-1" />
                              Verified
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-tertiary">{review.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star01
                          key={i}
                          className={cx(
                            "size-4",
                            i < review.rating ? "text-yellow-500" : "text-gray-300"
                          )}
                        />
                      ))}
                    </div>
                  </div>

                  <h3 className="mt-4 font-semibold text-primary">{review.title}</h3>
                  <p className="mt-2 text-tertiary leading-relaxed">{review.content}</p>

                  {review.productImage && (
                    <div className="mt-4 flex items-center gap-3 p-3 rounded-lg bg-secondary">
                      <Image
                        src={review.productImage}
                        alt={review.product}
                        width={48}
                        height={48}
                        className="rounded-lg object-cover"
                      />
                      <span className="text-sm font-medium text-primary">{review.product}</span>
                    </div>
                  )}

                  <div className="mt-4 pt-4 border-t border-secondary flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <button className="flex items-center gap-1.5 text-sm text-tertiary hover:text-brand-600">
                        <ThumbsUp className="size-4" />
                        Helpful ({review.helpful})
                      </button>
                      <button className="flex items-center gap-1.5 text-sm text-tertiary hover:text-error-600">
                        <ThumbsDown className="size-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button color="secondary" size="lg">Load More Reviews</Button>
            </div>
          </div>
        </div>

        {/* Featured Quote */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12 text-center">
          <MessageChatCircle className="size-12 text-white/30 mx-auto mb-4" />
          <p className="text-xl sm:text-2xl font-medium text-white max-w-3xl mx-auto italic">
            &quot;Auctanium has transformed how I collect vintage watches. The authentication service and buyer protection give me complete confidence in every purchase.&quot;
          </p>
          <div className="mt-6 flex items-center justify-center gap-3">
            <Image
              src="https://randomuser.me/api/portraits/men/32.jpg"
              alt="Rahul S."
              width={48}
              height={48}
              className="rounded-full border-2 border-white"
            />
            <div className="text-left">
              <p className="font-medium text-white">Rahul S.</p>
              <p className="text-sm text-brand-200">Watch Collector since 2020</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
