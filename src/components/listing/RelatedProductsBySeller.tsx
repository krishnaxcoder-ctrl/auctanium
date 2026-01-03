"use client";

import Link from "next/link";
import { ChevronRight } from "@untitledui/icons";
import { ProductCard, ProductCardProps } from "./ProductCard";

const relatedProductsBySeller: ProductCardProps[] = [
  {
    id: "101",
    title: "Sony WH-1000XM5 Wireless Headphones",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    currentBid: 285,
    timeLeft: "2d 5h",
    bids: 8,
  },
  {
    id: "102",
    title: "Apple AirPods Max - Space Gray",
    image: "https://images.unsplash.com/photo-1625245488600-f03fef636a3c?w=400&h=400&fit=crop",
    currentBid: 420,
    timeLeft: "1d 12h",
    bids: 15,
  },
  {
    id: "103",
    title: "Bose QuietComfort Ultra Earbuds",
    image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
    currentBid: 195,
    timeLeft: "3d 8h",
    bids: 6,
  },
  {
    id: "104",
    title: "Sennheiser HD 660S2 Open-Back",
    image: "https://images.unsplash.com/photo-1583394838336-acd977736f90?w=400&h=400&fit=crop",
    currentBid: 380,
    timeLeft: "5d 2h",
    bids: 12,
  },
  {
    id: "105",
    title: "Beats Studio Pro Wireless",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    currentBid: 265,
    timeLeft: "4d 9h",
    bids: 19,
  },
];

interface Props {
  sellerName: string;
}

export function RelatedProductsBySeller({ sellerName }: Props) {
  return (
    <div className="border-t border-secondary pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">More from this seller</h2>
          <p className="text-sm text-tertiary mt-1">Other items from {sellerName}</p>
        </div>
        <Link href="/" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
          View all <ChevronRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {relatedProductsBySeller.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
}
