"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Heart,
  Clock,
  ChevronRight,
  Trash01,
  Eye,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

const recommendedItems = [
  {
    id: "r1",
    title: "Sony WH-1000XM5 Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    currentBid: 280,
    timeLeft: "5h 20m",
    bids: 18,
  },
  {
    id: "r2",
    title: "MacBook Air M3 15\"",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
    currentBid: 1150,
    timeLeft: "1d 4h",
    bids: 25,
  },
  {
    id: "r3",
    title: "Canon EOS R6 Mark II",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    currentBid: 1890,
    timeLeft: "2d 8h",
    bids: 14,
  },
  {
    id: "r4",
    title: "Nintendo Switch OLED",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&h=200&fit=crop",
    currentBid: 275,
    timeLeft: "7h 45m",
    bids: 32,
  },
  {
    id: "r5",
    title: "Apple Watch Ultra 2",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
    currentBid: 620,
    timeLeft: "12h 30m",
    bids: 21,
  },
  {
    id: "r6",
    title: "LG 34\" UltraWide Monitor",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
    currentBid: 450,
    timeLeft: "3d 2h",
    bids: 9,
  },
  {
    id: "r7",
    title: "Sonos Arc Soundbar",
    image: "https://images.unsplash.com/photo-1545454675-3531b543be5d?w=200&h=200&fit=crop",
    currentBid: 580,
    timeLeft: "18h 15m",
    bids: 16,
  },
  {
    id: "r8",
    title: "Razer Blade 16 Gaming Laptop",
    image: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=200&h=200&fit=crop",
    currentBid: 2100,
    timeLeft: "4d 6h",
    bids: 11,
  },
  {
    id: "r9",
    title: "GoPro Hero 12 Black",
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=200&h=200&fit=crop",
    currentBid: 320,
    timeLeft: "9h 50m",
    bids: 27,
  },
  {
    id: "r10",
    title: "Kindle Scribe 64GB",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=200&h=200&fit=crop",
    currentBid: 280,
    timeLeft: "1d 16h",
    bids: 13,
  },
];

const watchlist = [
  {
    id: "1",
    title: "Bose QuietComfort Ultra Headphones",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop",
    currentBid: 320,
    timeLeft: "3h 45m",
    bids: 15,
    watchers: 42,
  },
  {
    id: "2",
    title: "iPad Pro 12.9\" M2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
    currentBid: 890,
    timeLeft: "8h 12m",
    bids: 22,
    watchers: 67,
  },
  {
    id: "3",
    title: "DJI Mavic 3 Pro Drone",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop",
    currentBid: 1650,
    timeLeft: "2d 5h",
    bids: 31,
    watchers: 89,
  },
  {
    id: "4",
    title: "Samsung 65\" OLED 4K Smart TV",
    image: "https://images.unsplash.com/photo-1593359677879-a4bb92f829d1?w=200&h=200&fit=crop",
    currentBid: 1200,
    timeLeft: "1d 8h",
    bids: 18,
    watchers: 54,
  },
  {
    id: "5",
    title: "Dyson V15 Detect Vacuum",
    image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=200&h=200&fit=crop",
    currentBid: 450,
    timeLeft: "6h 30m",
    bids: 12,
    watchers: 28,
  },
  {
    id: "6",
    title: "Herman Miller Aeron Chair",
    image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=200&h=200&fit=crop",
    currentBid: 780,
    timeLeft: "4d 12h",
    bids: 8,
    watchers: 35,
  },
];

export default function WatchlistPage() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <Heart className="size-7 text-error-500" />
            My Watchlist
          </h1>
          <p className="mt-1 text-tertiary">
            Items you're watching - {watchlist.length} items saved
          </p>
        </div>
        <Link href="/">
          <Button color="primary" size="sm">
            Browse More
          </Button>
        </Link>
      </div>

      {/* Watchlist Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {watchlist.map((item) => (
          <div
            key={item.id}
            className="bg-primary border border-secondary rounded-xl overflow-hidden group"
          >
            <Link href={`/listing/${item.id}`} className="block">
              <div className="relative aspect-[4/3] overflow-hidden bg-secondary">
                <Image src={item.image} alt={item.title} fill className="object-cover" />
                <div className="absolute top-2 right-2">
                  <button className="flex size-8 items-center justify-center rounded-full bg-white/90 text-error-500 hover:bg-white transition-colors">
                    <Heart className="size-4 fill-current" />
                  </button>
                </div>
                <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/70 text-white text-xs px-2 py-1 rounded">
                  <Clock className="size-3" />
                  {item.timeLeft}
                </div>
              </div>
            </Link>
            <div className="p-4">
              <Link href={`/listing/${item.id}`}>
                <h3 className="text-sm font-medium text-primary line-clamp-2 hover:text-brand-600 transition-colors">
                  {item.title}
                </h3>
              </Link>
              <div className="mt-2 flex items-center justify-between">
                <div>
                  <p className="text-xs text-tertiary">Current Bid</p>
                  <p className="text-lg font-semibold text-primary">${item.currentBid}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs text-tertiary">{item.bids} bids</p>
                  <p className="text-xs text-tertiary flex items-center gap-1">
                    <Eye className="size-3" />
                    {item.watchers}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                <Link href={`/listing/${item.id}`} className="flex-1">
                  <Button color="primary" size="sm" className="w-full">
                    Place Bid
                  </Button>
                </Link>
                <button className="flex size-9 items-center justify-center rounded-lg border border-secondary text-tertiary hover:text-error-500 hover:border-error-300 transition-colors">
                  <Trash01 className="size-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
