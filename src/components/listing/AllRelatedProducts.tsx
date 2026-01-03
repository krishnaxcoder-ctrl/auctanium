"use client";

import Link from "next/link";
import { ChevronRight } from "@untitledui/icons";
import { ProductCard, ProductCardProps } from "./ProductCard";

const allRelatedProducts: ProductCardProps[] = [
  {
    id: "301",
    title: "Marshall Major IV Bluetooth",
    image: "https://images.unsplash.com/photo-1577174881658-0f30ed549adc?w=400&h=400&fit=crop",
    currentBid: 125,
    timeLeft: "8h 45m",
    bids: 14,
    seller: "Vintage Audio",
  },
  {
    id: "302",
    title: "Audio-Technica ATH-M50xBT2",
    image: "https://images.unsplash.com/photo-1613040809024-b4ef7ba99bc3?w=400&h=400&fit=crop",
    currentBid: 165,
    timeLeft: "3d 22h",
    bids: 7,
    seller: "Pro Audio Shop",
  },
  {
    id: "303",
    title: "JBL Tour One M2",
    image: "https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=400&h=400&fit=crop",
    currentBid: 210,
    timeLeft: "5d 11h",
    bids: 3,
    seller: "TechStore Premium",
  },
  {
    id: "304",
    title: "Denon PerL Pro Earbuds",
    image: "https://images.unsplash.com/photo-1606220588913-b3aacb4d2f46?w=400&h=400&fit=crop",
    currentBid: 295,
    timeLeft: "2d 16h",
    bids: 11,
    seller: "Hi-Fi Haven",
  },
  {
    id: "305",
    title: "Philips Fidelio L4",
    image: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
    currentBid: 185,
    timeLeft: "4d 7h",
    bids: 5,
    seller: "Audio Experts",
  },
  {
    id: "306",
    title: "AKG N9 Hybrid Wireless",
    image: "https://images.unsplash.com/photo-1618366712010-f4ae9c647dcb?w=400&h=400&fit=crop",
    currentBid: 240,
    timeLeft: "1d 19h",
    bids: 9,
    seller: "Sound Wave",
  },
  {
    id: "307",
    title: "Skullcandy Crusher ANC 2",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    currentBid: 175,
    timeLeft: "6h 30m",
    bids: 16,
    seller: "Bass Masters",
  },
  {
    id: "308",
    title: "Jabra Elite 85h",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    currentBid: 195,
    timeLeft: "2d 8h",
    bids: 12,
    seller: "Office Audio",
  },
  {
    id: "309",
    title: "Anker Soundcore Space Q45",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop",
    currentBid: 95,
    timeLeft: "1d 14h",
    bids: 22,
    seller: "Budget Audio",
  },
  {
    id: "310",
    title: "Bowers & Wilkins Px8",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    currentBid: 545,
    timeLeft: "5d 3h",
    bids: 8,
    seller: "Luxury Sound",
  },
];

export function AllRelatedProducts() {
  return (
    <div className="border-t border-secondary pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">You may also like</h2>
          <p className="text-sm text-tertiary mt-1">Recommended items based on your interests</p>
        </div>
        <Link href="/" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
          View all <ChevronRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {allRelatedProducts.map((product) => (
          <ProductCard key={product.id} product={product} showSeller />
        ))}
      </div>
    </div>
  );
}
