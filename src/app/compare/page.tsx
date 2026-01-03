"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SwitchHorizontal01,
  Plus,
  X,
  Star01,
  CheckCircle,
  XCircle,
  ArrowRight,
  SearchLg,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

interface CompareItem {
  id: string;
  title: string;
  image: string;
  currentBid: string;
  buyNow?: string;
  endTime: string;
  seller: {
    name: string;
    rating: number;
    reviews: number;
  };
  condition: string;
  shipping: string;
  authenticity: boolean;
  returns: boolean;
  bids: number;
  watchers: number;
  features: string[];
}

const sampleItems: CompareItem[] = [
  {
    id: "1",
    title: "Vintage Rolex Submariner 1968",
    image: "https://images.unsplash.com/photo-1523170335258-f5ed11844a49?w=400&h=400&fit=crop",
    currentBid: "₹2,45,000",
    buyNow: "₹3,50,000",
    endTime: "2d 5h",
    seller: { name: "Vintage Treasures", rating: 4.9, reviews: 1250 },
    condition: "Excellent",
    shipping: "Free Express",
    authenticity: true,
    returns: true,
    bids: 23,
    watchers: 156,
    features: ["Original Box", "Papers", "Service History", "Authenticated"],
  },
  {
    id: "2",
    title: "Rolex Submariner Date 2019",
    image: "https://images.unsplash.com/photo-1548169874-53e85f753f1e?w=400&h=400&fit=crop",
    currentBid: "₹8,75,000",
    buyNow: "₹9,50,000",
    endTime: "1d 12h",
    seller: { name: "Luxury Watches Co", rating: 4.8, reviews: 890 },
    condition: "Like New",
    shipping: "₹499 Insured",
    authenticity: true,
    returns: true,
    bids: 45,
    watchers: 289,
    features: ["Original Box", "Papers", "Warranty Card", "Authenticated", "Full Set"],
  },
  {
    id: "3",
    title: "Omega Seamaster Vintage 1970",
    image: "https://images.unsplash.com/photo-1587836374828-4dbafa94cf0e?w=400&h=400&fit=crop",
    currentBid: "₹1,25,000",
    endTime: "3d 8h",
    seller: { name: "Classic Collections", rating: 4.7, reviews: 567 },
    condition: "Good",
    shipping: "₹299 Standard",
    authenticity: true,
    returns: false,
    bids: 12,
    watchers: 78,
    features: ["No Box", "No Papers", "Serviced 2023"],
  },
  {
    id: "4",
    title: "Tag Heuer Carrera Chronograph",
    image: "https://images.unsplash.com/photo-1542496658-e33a6d0d50f6?w=400&h=400&fit=crop",
    currentBid: "₹1,85,000",
    buyNow: "₹2,20,000",
    endTime: "4d 2h",
    seller: { name: "Premium Watch Store", rating: 4.6, reviews: 432 },
    condition: "Excellent",
    shipping: "Free Standard",
    authenticity: true,
    returns: true,
    bids: 18,
    watchers: 95,
    features: ["Original Box", "Papers", "Authenticated"],
  },
  {
    id: "5",
    title: "Cartier Tank Francaise Gold",
    image: "https://images.unsplash.com/photo-1522312346375-d1a52e2b99b3?w=400&h=400&fit=crop",
    currentBid: "₹4,50,000",
    buyNow: "₹5,25,000",
    endTime: "1d 8h",
    seller: { name: "Luxury Vault", rating: 5.0, reviews: 2100 },
    condition: "Like New",
    shipping: "Free Express",
    authenticity: true,
    returns: true,
    bids: 67,
    watchers: 312,
    features: ["Original Box", "Papers", "Full Set", "Warranty"],
  },
  {
    id: "6",
    title: "Patek Philippe Calatrava",
    image: "https://images.unsplash.com/photo-1508685096489-7aacd43bd3b1?w=400&h=400&fit=crop",
    currentBid: "₹15,00,000",
    buyNow: "₹18,50,000",
    endTime: "5d 12h",
    seller: { name: "Elite Timepieces", rating: 4.9, reviews: 876 },
    condition: "Mint",
    shipping: "₹999 Insured",
    authenticity: true,
    returns: true,
    bids: 34,
    watchers: 445,
    features: ["Original Box", "Papers", "Service History", "Authenticated", "Full Set"],
  },
  {
    id: "7",
    title: "Audemars Piguet Royal Oak",
    image: "https://images.unsplash.com/photo-1547996160-81dfa63595aa?w=400&h=400&fit=crop",
    currentBid: "₹22,00,000",
    endTime: "2d 18h",
    seller: { name: "Watch Connoisseur", rating: 4.8, reviews: 654 },
    condition: "Excellent",
    shipping: "Free Express",
    authenticity: true,
    returns: false,
    bids: 28,
    watchers: 523,
    features: ["Original Box", "Papers", "Authenticated"],
  },
  {
    id: "8",
    title: "IWC Portugieser Automatic",
    image: "https://images.unsplash.com/photo-1612817159949-195b6eb9e31a?w=400&h=400&fit=crop",
    currentBid: "₹3,75,000",
    buyNow: "₹4,50,000",
    endTime: "3d 6h",
    seller: { name: "Time Gallery", rating: 4.7, reviews: 389 },
    condition: "Very Good",
    shipping: "₹399 Standard",
    authenticity: true,
    returns: true,
    bids: 15,
    watchers: 187,
    features: ["Original Box", "Papers", "Serviced 2024"],
  },
];

const comparisonRows = [
  { label: "Current Bid", key: "currentBid" },
  { label: "Buy Now Price", key: "buyNow" },
  { label: "Time Left", key: "endTime" },
  { label: "Condition", key: "condition" },
  { label: "Shipping", key: "shipping" },
  { label: "Number of Bids", key: "bids" },
  { label: "Watchers", key: "watchers" },
];

export default function ComparePage() {
  const [compareItems, setCompareItems] = useState<CompareItem[]>(sampleItems.slice(0, 2));
  const [showAddModal, setShowAddModal] = useState(false);

  const addItem = (item: CompareItem) => {
    if (compareItems.length < 4 && !compareItems.find(i => i.id === item.id)) {
      setCompareItems([...compareItems, item]);
    }
    setShowAddModal(false);
  };

  const removeItem = (id: string) => {
    setCompareItems(compareItems.filter(item => item.id !== id));
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Content */}
      <div className="px-4 py-4 sm:px-6">
        {compareItems.length === 0 ? (
          <div className="text-center py-8">
            <SwitchHorizontal01 className="size-10 text-tertiary mx-auto mb-3" />
            <h2 className="text-base font-semibold text-primary mb-1">No items to compare</h2>
            <p className="text-sm text-tertiary mb-4 max-w-sm mx-auto">
              Add items from the marketplace to compare their features and prices.
            </p>
            <Link href="/marketplace">
              <Button color="primary" size="sm" iconTrailing={ArrowRight}>
                Browse Marketplace
              </Button>
            </Link>
          </div>
        ) : (
          <>
            {/* Compare Grid */}
            <div className="overflow-x-auto">
              <div className="min-w-[600px]">
                {/* Header Row - Items */}
                <div className="grid grid-cols-4 gap-3">
                  {compareItems.map((item) => (
                    <div key={item.id} className="relative rounded-lg border border-secondary bg-primary p-2">
                      <button
                        onClick={() => removeItem(item.id)}
                        className="absolute top-1 right-1 p-0.5 rounded-full bg-secondary hover:bg-error-100 text-tertiary hover:text-error-600 transition-colors"
                      >
                        <X className="size-3" />
                      </button>
                      <div className="aspect-[4/3] relative rounded overflow-hidden mb-1.5">
                        <Image
                          src={item.image}
                          alt={item.title}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <h3 className="font-medium text-primary text-xs line-clamp-1">{item.title}</h3>
                      <div className="flex items-center gap-0.5 mt-0.5">
                        <Star01 className="size-2.5 text-yellow-500" />
                        <span className="text-[10px] font-medium">{item.seller.rating}</span>
                      </div>
                      <Link href={`/listing/${item.id}`} className="block mt-1.5">
                        <span className="block w-full text-center text-[10px] font-medium text-brand-600 hover:text-brand-700 py-1 rounded bg-brand-50 hover:bg-brand-100 transition-colors">
                          View
                        </span>
                      </Link>
                    </div>
                  ))}
                  {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                    <button
                      key={i}
                      onClick={() => setShowAddModal(true)}
                      className="flex flex-col items-center justify-center rounded-lg border-2 border-dashed border-secondary bg-secondary/30 p-2 transition-colors hover:border-brand-300 hover:bg-brand-50 min-h-[120px]"
                    >
                      <Plus className="size-5 text-tertiary mb-0.5" />
                      <span className="text-[10px] font-medium text-tertiary">Add</span>
                    </button>
                  ))}
                </div>

                {/* Comparison Rows */}
                <div className="mt-4 space-y-1">
                  {comparisonRows.map((row) => (
                    <div
                      key={row.key}
                      className="grid grid-cols-4 gap-3 py-2 px-2 rounded bg-secondary/30"
                    >
                      {compareItems.map((item) => (
                        <div key={item.id} className="text-primary text-xs">
                          <span className="text-xs font-medium text-tertiary block">{row.label}</span>
                          <span>{(item as any)[row.key] || "N/A"}</span>
                        </div>
                      ))}
                      {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                        <span key={i} />
                      ))}
                    </div>
                  ))}

                  {/* Seller */}
                  <div className="grid grid-cols-4 gap-3 py-2 px-2 rounded bg-secondary/30">
                    {compareItems.map((item) => (
                      <div key={item.id} className="text-xs">
                        <span className="text-xs font-medium text-tertiary block">Seller</span>
                        <div className="flex items-center gap-0.5">
                          <Star01 className="size-3 text-yellow-500" />
                          <span>{item.seller.rating}</span>
                        </div>
                      </div>
                    ))}
                    {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>

                  {/* Authenticity */}
                  <div className="grid grid-cols-4 gap-3 py-2 px-2 rounded bg-secondary/30">
                    {compareItems.map((item) => (
                      <div key={item.id} className="text-xs">
                        <span className="text-xs font-medium text-tertiary block">Authenticated</span>
                        <span className="flex items-center gap-1">
                          {item.authenticity ? (
                            <><CheckCircle className="size-3 text-success-600" /> Yes</>
                          ) : (
                            <><XCircle className="size-3 text-tertiary" /> No</>
                          )}
                        </span>
                      </div>
                    ))}
                    {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>

                  {/* Returns */}
                  <div className="grid grid-cols-4 gap-3 py-2 px-2 rounded bg-secondary/30">
                    {compareItems.map((item) => (
                      <div key={item.id} className="text-xs">
                        <span className="text-xs font-medium text-tertiary block">Returns</span>
                        <span className="flex items-center gap-1">
                          {item.returns ? (
                            <><CheckCircle className="size-3 text-success-600" /> Yes</>
                          ) : (
                            <><XCircle className="size-3 text-tertiary" /> No</>
                          )}
                        </span>
                      </div>
                    ))}
                    {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>

                  {/* Features */}
                  <div className="grid grid-cols-4 gap-3 py-2 px-2 rounded bg-secondary/30">
                    {compareItems.map((item) => (
                      <div key={item.id}>
                        <span className="text-xs font-medium text-tertiary block mb-0.5">Included</span>
                        <div className="flex flex-wrap gap-0.5">
                          {item.features.slice(0, 3).map((feature, i) => (
                            <span key={i} className="px-1.5 py-0.5 rounded-full text-[10px] bg-secondary text-tertiary">
                              {feature}
                            </span>
                          ))}
                          {item.features.length > 3 && (
                            <span className="text-[10px] text-tertiary">+{item.features.length - 3}</span>
                          )}
                        </div>
                      </div>
                    ))}
                    {Array.from({ length: 4 - compareItems.length }).map((_, i) => (
                      <span key={i} />
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Info */}
            <div className="mt-4 p-2 rounded bg-brand-50 border border-brand-200">
              <p className="text-[10px] text-brand-700">
                <strong>Tip:</strong> Compare up to 4 items. Click any item to view details.
              </p>
            </div>
          </>
        )}
      </div>

      {/* Add Item Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-overlay/60 backdrop-blur-sm p-4">
          <div className="w-full max-w-sm rounded-xl border border-secondary bg-primary p-4">
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-sm font-semibold text-primary">Add Item</h2>
              <button onClick={() => setShowAddModal(false)} className="p-0.5 text-tertiary hover:text-primary">
                <X className="size-4" />
              </button>
            </div>
            <Input placeholder="Search..." icon={SearchLg} size="sm" className="mb-3" />
            <div className="space-y-1 max-h-60 overflow-y-auto">
              {sampleItems.filter(item => !compareItems.find(i => i.id === item.id)).map((item) => (
                <button
                  key={item.id}
                  onClick={() => addItem(item)}
                  className="flex w-full items-center gap-2 p-2 rounded hover:bg-secondary transition-colors text-left"
                >
                  <Image
                    src={item.image}
                    alt={item.title}
                    width={36}
                    height={36}
                    className="rounded object-cover"
                  />
                  <div className="flex-1 min-w-0">
                    <p className="text-xs font-medium text-primary truncate">{item.title}</p>
                    <p className="text-[10px] text-tertiary">{item.currentBid}</p>
                  </div>
                  <Plus className="size-4 text-brand-600" />
                </button>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
