"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Trophy01,
  ChevronRight,
  FilterLines,
  Package,
  Check,
  Truck01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const wonAuctions = [
  {
    id: "1",
    title: "Sony PlayStation 5 Console Bundle",
    image: "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=200&h=200&fit=crop",
    finalPrice: 485,
    wonDate: "Dec 15, 2024",
    status: "delivered",
    orderNumber: "ORD-2024-001",
  },
  {
    id: "2",
    title: "Canon EOS R5 Camera Body",
    image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=200&h=200&fit=crop",
    finalPrice: 2890,
    wonDate: "Dec 12, 2024",
    status: "shipped",
    orderNumber: "ORD-2024-002",
  },
  {
    id: "3",
    title: "Apple AirPods Max",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop",
    finalPrice: 420,
    wonDate: "Dec 10, 2024",
    status: "delivered",
    orderNumber: "ORD-2024-003",
  },
  {
    id: "4",
    title: "Nintendo Switch OLED",
    image: "https://images.unsplash.com/photo-1578303512597-81e6cc155b3e?w=200&h=200&fit=crop",
    finalPrice: 295,
    wonDate: "Dec 8, 2024",
    status: "delivered",
    orderNumber: "ORD-2024-004",
  },
  {
    id: "5",
    title: "DJI Mini 3 Pro Drone",
    image: "https://images.unsplash.com/photo-1473968512647-3e447244af8f?w=200&h=200&fit=crop",
    finalPrice: 680,
    wonDate: "Dec 5, 2024",
    status: "processing",
    orderNumber: "ORD-2024-005",
  },
];

const getStatusIcon = (status: string) => {
  switch (status) {
    case "delivered":
      return <Check className="size-4" />;
    case "shipped":
      return <Truck01 className="size-4" />;
    default:
      return <Package className="size-4" />;
  }
};

const getStatusColor = (status: string) => {
  switch (status) {
    case "delivered":
      return "success";
    case "shipped":
      return "brand";
    default:
      return "warning";
  }
};

export default function WonAuctionsPage() {
  const totalSpent = wonAuctions.reduce((sum, a) => sum + a.finalPrice, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <Trophy01 className="size-7 text-brand-600" />
            Won Auctions
          </h1>
          <p className="mt-1 text-tertiary">
            View all your winning auctions and order status
          </p>
        </div>
        <Button color="secondary" size="sm" iconLeading={FilterLines}>
          Filter
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4">
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-primary">{wonAuctions.length}</div>
          <div className="text-xs text-tertiary">Total Won</div>
        </div>
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-success-600">
            {wonAuctions.filter(a => a.status === "delivered").length}
          </div>
          <div className="text-xs text-tertiary">Delivered</div>
        </div>
        <div className="bg-primary border border-secondary rounded-xl p-4">
          <div className="text-2xl font-semibold text-primary">${totalSpent.toLocaleString()}</div>
          <div className="text-xs text-tertiary">Total Spent</div>
        </div>
      </div>

      {/* Won Auctions List */}
      <div className="bg-primary border border-secondary rounded-xl">
        <div className="border-b border-secondary px-4 py-3">
          <h2 className="text-sm font-semibold text-primary">All Won Auctions</h2>
        </div>
        <div className="divide-y divide-secondary">
          {wonAuctions.map((auction) => (
            <Link
              key={auction.id}
              href={`/listing/${auction.id}`}
              className="flex items-center gap-4 p-4 transition-colors hover:bg-secondary"
            >
              <div className="relative size-20 overflow-hidden rounded-lg bg-secondary">
                <Image src={auction.image} alt={auction.title} fill className="object-cover" />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm font-medium text-primary truncate">{auction.title}</h3>
                <div className="mt-1 flex items-center gap-4 text-xs text-tertiary">
                  <span>Won for: <span className="font-medium text-primary">${auction.finalPrice}</span></span>
                  <span>Order: {auction.orderNumber}</span>
                </div>
                <div className="mt-2 flex items-center gap-2">
                  <Badge
                    type="pill-color"
                    size="sm"
                    color={getStatusColor(auction.status) as "success" | "brand" | "warning"}
                  >
                    <span className="flex items-center gap-1">
                      {getStatusIcon(auction.status)}
                      {auction.status.charAt(0).toUpperCase() + auction.status.slice(1)}
                    </span>
                  </Badge>
                  <span className="text-xs text-tertiary">Won: {auction.wonDate}</span>
                </div>
              </div>
              <div className="text-right">
                <Button color="secondary" size="sm">
                  Track Order
                </Button>
              </div>
              <ChevronRight className="size-5 text-tertiary" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
