"use client";

import Link from "next/link";
import Image from "next/image";
import { Clock } from "@untitledui/icons";

export interface ProductCardProps {
  id: string;
  title: string;
  image: string;
  currentBid: number;
  timeLeft: string;
  bids: number;
  seller?: string;
}

interface Props {
  product: ProductCardProps;
  showSeller?: boolean;
}

export function ProductCard({ product, showSeller = false }: Props) {
  return (
    <Link
      href={`/listing/${product.id}`}
      className="group block bg-primary border border-secondary rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
    >
      <div className="relative aspect-square overflow-hidden bg-secondary">
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute top-2 right-2 bg-black/70 text-white text-xs px-2 py-1 rounded flex items-center gap-1">
          <Clock className="size-3" />
          {product.timeLeft}
        </div>
      </div>
      <div className="p-3">
        <h3 className="text-sm font-medium text-primary line-clamp-2 group-hover:text-brand-600 transition-colors">
          {product.title}
        </h3>
        {showSeller && product.seller && (
          <p className="text-xs text-tertiary mt-1">{product.seller}</p>
        )}
        <div className="mt-2 flex items-center justify-between">
          <div>
            <p className="text-xs text-tertiary">Current bid</p>
            <p className="text-sm font-semibold text-primary">${product.currentBid}</p>
          </div>
          <p className="text-xs text-tertiary">{product.bids} bids</p>
        </div>
      </div>
    </Link>
  );
}
