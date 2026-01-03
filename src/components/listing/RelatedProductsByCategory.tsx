"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { ChevronRight, ChevronLeft } from "@untitledui/icons";
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
  const sliderRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScrollPosition = () => {
    if (sliderRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const scrollAmount = sliderRef.current.clientWidth;
      sliderRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    }
  };

  return (
    <div className="border-t border-secondary pt-8 overflow-x-clip">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h2 className="text-lg font-semibold text-primary">Similar in {category}</h2>
          <p className="text-sm text-tertiary mt-1">Browse more items in this category</p>
        </div>
        <Link href="/" className="text-sm text-brand-600 hover:underline flex items-center gap-1">
          View all <ChevronRight className="size-4" />
        </Link>
      </div>
      {/* Mobile Slider */}
      <div className="sm:hidden relative overflow-visible">
        <div
          ref={sliderRef}
          onScroll={checkScrollPosition}
          className="flex gap-2 pb-4 overflow-x-auto scrollbar-hide snap-x snap-mandatory"
        >
          {relatedProductsByCategory.map((product, index) => (
            <div
              key={product.id}
              className={`flex-shrink-0 ${index % 2 === 0 ? "snap-start snap-always" : ""}`}
              style={{ width: "calc((100% - 8px) / 2)" }}
            >
              <ProductCard product={product} showSeller />
            </div>
          ))}
        </div>

        {/* Left Arrow */}
        {canScrollLeft && (
          <button
            onClick={scrollLeft}
            className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -left-4"
          >
            <ChevronLeft className="size-5 text-gray-700" />
          </button>
        )}

        {/* Right Arrow */}
        {canScrollRight && (
          <button
            onClick={scrollRight}
            className="absolute top-1/2 -translate-y-1/2 z-10 p-2 bg-white rounded-full shadow-lg border border-gray-200 -right-4"
          >
            <ChevronRight className="size-5 text-gray-700" />
          </button>
        )}
      </div>

      {/* Desktop Grid */}
      <div className="hidden sm:grid grid-cols-3 lg:grid-cols-5 gap-4">
        {relatedProductsByCategory.map((product) => (
          <ProductCard key={product.id} product={product} showSeller />
        ))}
      </div>
    </div>
  );
}
