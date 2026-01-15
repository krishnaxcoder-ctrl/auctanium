"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ShoppingBag01,
  Heart,
  Clock,
  TrendUp01,
  Trophy01,
  Settings01,
  ChevronRight,
  CreditCard01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Customer Stats
const stats = [
  { label: "Active Bids", value: "12", icon: TrendUp01, color: "brand" },
  { label: "Won Auctions", value: "8", icon: Trophy01, color: "success" },
  { label: "Watchlist", value: "24", icon: Heart, color: "error" },
  { label: "Total Spent", value: "$4,250", icon: CreditCard01, color: "warning" },
];

const activeBids = [
  {
    id: "1",
    title: "Premium Wireless Noise-Canceling Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    currentBid: 245,
    yourBid: 245,
    status: "winning",
    timeLeft: "2h 15m",
    bids: 12,
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
  },
];

const wonAuctions = [
  {
    id: "4",
    title: "Sony PlayStation 5 Console Bundle",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
    finalPrice: 485,
    wonDate: "Dec 15, 2024",
    status: "shipped",
  },
  {
    id: "5",
    title: "Canon EOS R5 Camera Body",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    finalPrice: 2890,
    wonDate: "Dec 12, 2024",
    status: "delivered",
  },
];

const watchlist = [
  {
    id: "6",
    title: "Bose QuietComfort Ultra Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop",
    currentBid: 320,
    timeLeft: "3h 45m",
  },
  {
    id: "7",
    title: "iPad Pro 12.9\" M2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
    currentBid: 890,
    timeLeft: "8h 12m",
  },
  {
    id: "8",
    title: "DJI Mavic 3 Pro Drone",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop",
    currentBid: 1650,
    timeLeft: "2d 5h",
  },
];

const recentActivity = [
  { action: "You placed a bid of $245", item: "Premium Wireless Headphones", time: "2 hours ago", type: "bid" },
  { action: "You were outbid on", item: "MacBook Pro 16\"", time: "5 hours ago", type: "outbid" },
  { action: "New message from", item: "TechStore Premium", time: "6 hours ago", type: "message" },
  { action: "Auction won!", item: "PlayStation 5 Bundle", time: "2 days ago", type: "won" },
  { action: "Item delivered", item: "Canon EOS R5", time: "3 days ago", type: "delivered" },
];

export default function DashboardPage() {
  const [activeTab, setActiveTab] = useState<"bids" | "won" | "watchlist">("bids");

  return (
    <div className="space-y-6">
      {/* Stats Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4">
        {stats.map((stat) => (
          <div
            key={stat.label}
            className="bg-primary border border-secondary p-4"
          >
            <div className="flex items-center justify-between">
              <stat.icon className="size-5 text-brand-600" />
            </div>
            <div className="mt-3">
              <div className="text-2xl font-semibold text-primary">{stat.value}</div>
              <div className="text-xs text-tertiary">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Tabs */}
      <div className="bg-primary border border-secondary rounded-xl">
        <div className="border-b border-secondary overflow-x-auto">
          <div className="flex min-w-max">
            {[
              { id: "bids", label: "Active Bids", count: activeBids.length },
              { id: "won", label: "Won Auctions", count: wonAuctions.length },
              { id: "watchlist", label: "Watchlist", count: watchlist.length },
            ].map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as typeof activeTab)}
                className={`flex items-center gap-2 px-4 sm:px-6 py-3 sm:py-4 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                  activeTab === tab.id
                    ? "border-brand-600 text-brand-600"
                    : "border-transparent text-tertiary hover:text-primary"
                }`}
              >
                {tab.label}
                <span className={`rounded-full px-2 py-0.5 text-xs ${
                  activeTab === tab.id ? "bg-brand-50 text-brand-600" : "bg-secondary text-tertiary"
                }`}>
                  {tab.count}
                </span>
              </button>
            ))}
          </div>
        </div>

        {/* Tab Content */}
        <div className="p-4">
          {activeTab === "bids" && (
            <div className="space-y-3">
              {activeBids.map((bid) => (
                <Link
                  key={bid.id}
                  href={`/listing/${bid.id}`}
                  className="flex items-center gap-4 rounded-lg border border-secondary p-3 transition-colors hover:bg-secondary"
                >
                  <div className="relative size-16 overflow-hidden rounded-lg bg-secondary">
                    <Image src={bid.image} alt={bid.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-primary truncate">{bid.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-tertiary">
                      <span>Your bid: ${bid.yourBid}</span>
                      <span>Current: ${bid.currentBid}</span>
                      <span>{bid.bids} bids</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={bid.status === "winning" ? "success" : "error"}
                    >
                      {bid.status === "winning" ? "Winning" : "Outbid"}
                    </Badge>
                    <div className="mt-1 flex items-center gap-1 text-xs text-tertiary">
                      <Clock className="size-3" />
                      {bid.timeLeft}
                    </div>
                  </div>
                  <ChevronRight className="size-5 text-tertiary" />
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/dashboard/bids">
                  <Button color="secondary" size="sm" className="w-full">
                    View All Bids
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "won" && (
            <div className="space-y-3">
              {wonAuctions.map((auction) => (
                <Link
                  key={auction.id}
                  href={`/listing/${auction.id}`}
                  className="flex items-center gap-4 rounded-lg border border-secondary p-3 transition-colors hover:bg-secondary"
                >
                  <div className="relative size-16 overflow-hidden rounded-lg bg-secondary">
                    <Image src={auction.image} alt={auction.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-primary truncate">{auction.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-tertiary">
                      <span>Won for: ${auction.finalPrice}</span>
                      <span>{auction.wonDate}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={auction.status === "delivered" ? "success" : "brand"}
                    >
                      {auction.status === "delivered" ? "Delivered" : "Shipped"}
                    </Badge>
                  </div>
                  <ChevronRight className="size-5 text-tertiary" />
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/dashboard/won">
                  <Button color="secondary" size="sm" className="w-full">
                    View All Won Auctions
                  </Button>
                </Link>
              </div>
            </div>
          )}

          {activeTab === "watchlist" && (
            <div className="space-y-3">
              {watchlist.map((item) => (
                <Link
                  key={item.id}
                  href={`/listing/${item.id}`}
                  className="flex items-center gap-4 rounded-lg border border-secondary p-3 transition-colors hover:bg-secondary"
                >
                  <div className="relative size-16 overflow-hidden rounded-lg bg-secondary">
                    <Image src={item.image} alt={item.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-primary truncate">{item.title}</h3>
                    <div className="mt-1 flex items-center gap-3 text-xs text-tertiary">
                      <span>Current bid: ${item.currentBid}</span>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1 text-xs text-tertiary">
                      <Clock className="size-3" />
                      {item.timeLeft}
                    </div>
                    <Button color="primary" size="sm" className="mt-2">
                      Place Bid
                    </Button>
                  </div>
                </Link>
              ))}
              <div className="pt-2">
                <Link href="/dashboard/watchlist">
                  <Button color="secondary" size="sm" className="w-full">
                    View Full Watchlist
                  </Button>
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="bg-primary border border-secondary rounded-xl">
        <div className="border-b border-secondary px-4 py-3">
          <h2 className="text-sm font-semibold text-primary">Recent Activity</h2>
        </div>
        <div className="divide-y divide-secondary">
          {recentActivity.map((activity, index) => (
            <div key={index} className="flex items-center gap-4 px-4 py-3">
              <div className={`size-2 rounded-full ${
                activity.type === "won" ? "bg-success-500" :
                activity.type === "outbid" ? "bg-error-500" :
                activity.type === "delivered" ? "bg-success-500" :
                activity.type === "message" ? "bg-brand-500" :
                "bg-tertiary"
              }`} />
              <div className="flex-1 min-w-0">
                <p className="text-sm text-primary">
                  {activity.action} <span className="font-medium">{activity.item}</span>
                </p>
              </div>
              <span className="text-xs text-tertiary">{activity.time}</span>
            </div>
          ))}
        </div>
        <div className="border-t border-secondary px-4 py-3">
          <Link href="/dashboard/activity" className="text-sm font-medium text-brand-600 hover:underline">
            View all activity
          </Link>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-3">
        <Link
          href="/"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
            <ShoppingBag01 className="size-5 text-brand-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Browse Auctions</h3>
            <p className="text-xs text-tertiary">Find new items</p>
          </div>
        </Link>
        <Link
          href="/dashboard/watchlist"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-error-50">
            <Heart className="size-5 text-error-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">My Watchlist</h3>
            <p className="text-xs text-tertiary">{watchlist.length} items saved</p>
          </div>
        </Link>
        <Link
          href="/dashboard/settings"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
            <Settings01 className="size-5 text-tertiary" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Settings</h3>
            <p className="text-xs text-tertiary">Manage account</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
