"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Clock,
  TrendUp01,
  ChevronRight,
  FilterLines,
  SearchSm,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const bids = [
  {
    id: "1",
    title: "Premium Wireless Noise-Canceling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    currentBid: 245,
    yourBid: 245,
    status: "winning",
    timeLeft: "2h 15m",
    bids: 12,
    endDate: "Dec 20, 2024",
  },
  {
    id: "2",
    title: "Apple MacBook Pro 16\" M3 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
    currentBid: 2850,
    yourBid: 2800,
    status: "outbid",
    timeLeft: "5h 32m",
    bids: 28,
    endDate: "Dec 21, 2024",
  },
  {
    id: "3",
    title: "Vintage Rolex Submariner Watch",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=200&h=200&fit=crop",
    currentBid: 8500,
    yourBid: 8500,
    status: "winning",
    timeLeft: "1d 4h",
    bids: 45,
    endDate: "Dec 22, 2024",
  },
  {
    id: "4",
    title: "Sony PlayStation 5 Pro Console",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
    currentBid: 650,
    yourBid: 600,
    status: "outbid",
    timeLeft: "8h 45m",
    bids: 18,
    endDate: "Dec 20, 2024",
  },
  {
    id: "5",
    title: "Canon EOS R5 Mirrorless Camera",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    currentBid: 2400,
    yourBid: 2400,
    status: "winning",
    timeLeft: "3d 12h",
    bids: 22,
    endDate: "Dec 25, 2024",
  },
];

export default function MyBidsPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <TrendUp01 className="size-7 text-brand-600" />
            My Bids
          </h1>
          <p className="mt-1 text-tertiary">
            Track all your active bids and bidding history
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={FilterLines}>
            Filter
          </Button>
          <Button color="secondary" size="sm" iconLeading={SearchSm}>
            Search
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-primary">{bids.length}</div>
          <div className="text-xs text-tertiary">Active Bids</div>
        </div>
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-success-600">
            {bids.filter(b => b.status === "winning").length}
          </div>
          <div className="text-xs text-tertiary">Winning</div>
        </div>
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-error-600">
            {bids.filter(b => b.status === "outbid").length}
          </div>
          <div className="text-xs text-tertiary">Outbid</div>
        </div>
      </div>

      {/* Bids List */}
      <div className="bg-primary border border-secondary rounded-xl">
        <div className="border-b border-secondary px-4 py-3">
          <h2 className="text-sm font-semibold text-primary">All Bids</h2>
        </div>
        <div className="divide-y divide-secondary">
          {bids.map((bid) => (
            <Link
              key={bid.id}
              href={`/listing/${bid.id}`}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
            >
              <div className="relative size-20 overflow-hidden rounded-lg bg-secondary">
                <Image src={bid.image} alt={bid.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary truncate">{bid.title}</h3>
                <div className="mt-1 flex items-center gap-4 text-xs text-tertiary">
                  <span>Your bid: <span className="font-medium text-primary">${bid.yourBid}</span></span>
                  <span>Current: <span className="font-medium text-primary">${bid.currentBid}</span></span>
                  <span>{bid.bids} bids</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    type="pill-color"
                    size="sm"
                    color={bid.status === "winning" ? "success" : "error"}
                  >
                    {bid.status === "winning" ? "Winning" : "Outbid"}
                  </Badge>
                  <span className="text-xs text-tertiary">Ends: {bid.endDate}</span>
                </div>
              </div>
              <div className="text-right">
                <div className="flex items-center gap-1 text-sm font-medium text-primary">
                  <Clock className="size-4 text-tertiary" />
                  {bid.timeLeft}
                </div>
                {bid.status === "outbid" && (
                  <Button color="primary" size="sm" className="mt-2">
                    Bid Again
                  </Button>
                )}
              </div>
              <ChevronRight className="size-5 text-tertiary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
