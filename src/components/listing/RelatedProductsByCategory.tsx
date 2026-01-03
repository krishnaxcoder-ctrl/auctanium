"use client";

import Link from "next/link";
import { ChevronRight } from "@untitledui/icons";
import { ProductCard, ProductCardProps } from "./ProductCard";

const relatedProductsByCategory: ProductCardProps[] = [
  {
    id: "201",
    title: "Bang & Olufsen Beoplay H95",
    image: "https://images.unsplash.com/photo-1545127398-14699f92334b?w=400&h=400&fit=crop",
    currentBid: 650,
    timeLeft: "4d 18h",
    bids: 22,
    seller: "AudioPhile Store",
  },
  {
    id: "202",
    title: "Focal Bathys Wireless ANC",
    image: "https://images.unsplash.com/photo-1484704849700-f032a568e944?w=400&h=400&fit=crop",
    currentBid: 520,
    timeLeft: "2d 6h",
    bids: 9,
    seller: "Premium Audio",
  },
  {
    id: "203",
    title: "Shure AONIC 50 Gen 2",
    image: "https://images.unsplash.com/photo-1524678606370-a47ad25cb82a?w=400&h=400&fit=crop",
    currentBid: 275,
    timeLeft: "6d 14h",
    bids: 4,
    seller: "Sound Masters",
  },
  {
    id: "204",
    title: "Beyerdynamic DT 1990 Pro",
    image: "https://images.unsplash.com/photo-1558756520-22cfe5d382ca?w=400&h=400&fit=crop",
    currentBid: 445,
    timeLeft: "1d 3h",
    bids: 18,
    seller: "Studio Gear Co",
  },
  {
    id: "205",
    title: "Audeze Maxwell Wireless",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
    currentBid: 325,
    timeLeft: "3d 15h",
    bids: 11,
    seller: "HeadFi Central",
  },
];

interface Props {
  category: string;
}

export function RelatedProductsByCategory({ category }: Props) {
  return (
    <div className="border-t border-secondary pt-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">Similar in {category}</h2>
          <p className="text-sm text-tertiary mt-1">Browse more items in this category</p>
        </div>
        <Link href="/" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
          View all <ChevronRight className="size-4" />
        </Link>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
        {relatedProductsByCategory.map((product) => (
          <ProductCard key={product.id} product={product} showSeller />
        ))}
      </div>
    </div>
  );
}
