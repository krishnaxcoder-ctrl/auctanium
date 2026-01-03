"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Package,
  SearchLg,
  Plus,
  Edit02,
  Trash01,
  Eye,
  Download01,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  XCircle,
  Clock,
  Star01,
  Tag01,
  Image01,
  AlertTriangle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Mock listings data
const listingsData = [
  {
    id: "LST-001",
    title: "MacBook Pro 16\" M3 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
    seller: "TechStore Pro",
    category: "Laptops",
    price: 2499,
    stock: 12,
    status: "active",
    views: 1245,
    sales: 24,
    rating: 4.9,
    created: "Dec 10, 2024",
  },
  {
    id: "LST-002",
    title: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
    seller: "GadgetWorld",
    category: "Smartphones",
    price: 1199,
    stock: 45,
    status: "active",
    views: 2340,
    sales: 89,
    rating: 4.8,
    created: "Nov 25, 2024",
  },
  {
    id: "LST-003",
    title: "AirPods Pro 2nd Generation",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop",
    seller: "ElectroHub",
    category: "Audio",
    price: 249,
    stock: 0,
    status: "out_of_stock",
    views: 890,
    sales: 156,
    rating: 4.7,
    created: "Oct 15, 2024",
  },
  {
    id: "LST-004",
    title: "Apple Watch Ultra 2",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
    seller: "DigitalZone",
    category: "Wearables",
    price: 799,
    stock: 23,
    status: "pending",
    views: 456,
    sales: 0,
    rating: 0,
    created: "Dec 18, 2024",
  },
  {
    id: "LST-005",
    title: "iPad Pro 12.9\" M2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
    seller: "TechStore Pro",
    category: "Tablets",
    price: 1099,
    stock: 18,
    status: "active",
    views: 678,
    sales: 32,
    rating: 4.6,
    created: "Nov 30, 2024",
  },
  {
    id: "LST-006",
    title: "Sony WH-1000XM5",
    image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=200&h=200&fit=crop",
    seller: "PremiumTech",
    category: "Audio",
    price: 349,
    stock: 8,
    status: "flagged",
    views: 234,
    sales: 12,
    rating: 4.5,
    created: "Dec 5, 2024",
  },
  {
    id: "LST-007",
    title: "Samsung Galaxy S24 Ultra",
    image: "https://images.unsplash.com/photo-1610945265064-0e34e5519bbf?w=200&h=200&fit=crop",
    seller: "GadgetWorld",
    category: "Smartphones",
    price: 1299,
    stock: 34,
    status: "active",
    views: 1890,
    sales: 67,
    rating: 4.7,
    created: "Dec 12, 2024",
  },
];

const statusConfig: Record<string, { color: "success" | "warning" | "error" | "gray"; icon: typeof CheckCircle; label: string }> = {
  active: { color: "success", icon: CheckCircle, label: "Active" },
  pending: { color: "warning", icon: Clock, label: "Pending Review" },
  out_of_stock: { color: "gray", icon: Package, label: "Out of Stock" },
  flagged: { color: "error", icon: AlertTriangle, label: "Flagged" },
};

const categories = ["All", "Laptops", "Smartphones", "Tablets", "Audio", "Wearables", "Accessories"];

export default function ListingsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [categoryFilter, setCategoryFilter] = useState<string>("All");
  const [selectedListings, setSelectedListings] = useState<string[]>([]);
  const [viewMode, setViewMode] = useState<"table" | "grid">("table");

  const filteredListings = listingsData.filter((listing) => {
    const matchesSearch = listing.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      listing.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || listing.status === statusFilter;
    const matchesCategory = categoryFilter === "All" || listing.category === categoryFilter;
    return matchesSearch && matchesStatus && matchesCategory;
  });

  const toggleSelectAll = () => {
    if (selectedListings.length === filteredListings.length) {
      setSelectedListings([]);
    } else {
      setSelectedListings(filteredListings.map((l) => l.id));
    }
  };

  const toggleSelectListing = (listingId: string) => {
    if (selectedListings.includes(listingId)) {
      setSelectedListings(selectedListings.filter((id) => id !== listingId));
    } else {
      setSelectedListings([...selectedListings, listingId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Listings</h1>
          <p className="text-sm text-[#898989]">Manage all product listings on the platform.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
          <Button color="primary" size="sm" iconLeading={Plus} className="bg-[#000080] hover:bg-[#000080]/90">
            Add Listing
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#000080]/10">
              <Package className="size-5 text-[#000080]" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">4,892</div>
              <div className="text-xs text-[#898989]">Total Listings</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">4,234</div>
              <div className="text-xs text-[#898989]">Active</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">89</div>
              <div className="text-xs text-[#898989]">Pending Review</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
              <Package className="size-5 text-gray-500" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">234</div>
              <div className="text-xs text-[#898989]">Out of Stock</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-50">
              <AlertTriangle className="size-5 text-red-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">12</div>
              <div className="text-xs text-[#898989]">Flagged</div>
            </div>
          </div>
        </div>
      </div>

      {/* Category Tabs */}
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setCategoryFilter(category)}
            className={`rounded-lg px-4 py-2 text-sm font-medium transition-colors ${
              categoryFilter === category
                ? "bg-[#000080] text-white"
                : "bg-white border border-gray-200 text-gray-600 hover:bg-gray-50"
            }`}
          >
            {category}
          </button>
        ))}
      </div>

      {/* Filters and Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#898989]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search listings..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-[#898989] focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-[#000080] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="out_of_stock">Out of Stock</option>
              <option value="flagged">Flagged</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedListings.length > 0 && (
          <div className="flex items-center gap-4 border-t border-gray-200 bg-[#000080]/5 px-4 py-3">
            <span className="text-sm text-gray-600">
              {selectedListings.length} listing{selectedListings.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <Button color="secondary" size="sm" iconLeading={CheckCircle}>
                Approve
              </Button>
              <Button color="secondary" size="sm" iconLeading={XCircle}>
                Reject
              </Button>
              <Button color="secondary" size="sm" iconLeading={Trash01} className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedListings.length === filteredListings.length && filteredListings.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-gray-300 text-[#000080] focus:ring-[#000080]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Product</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Price</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Stock</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Performance</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#898989] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredListings.map((listing) => {
                const statusInfo = statusConfig[listing.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={listing.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedListings.includes(listing.id)}
                        onChange={() => toggleSelectListing(listing.id)}
                        className="size-4 rounded border-gray-300 text-[#000080] focus:ring-[#000080]"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="relative size-12 overflow-hidden rounded-lg bg-gray-100">
                          <Image src={listing.image} alt={listing.title} fill className="object-cover" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900 line-clamp-1">{listing.title}</div>
                          <div className="text-xs text-[#898989]">{listing.id}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{listing.seller}</td>
                    <td className="px-4 py-4">
                      <Badge type="pill-color" size="sm" color="gray">
                        {listing.category}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">${listing.price.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-medium ${listing.stock === 0 ? "text-red-600" : listing.stock <= 10 ? "text-amber-600" : "text-gray-900"}`}>
                        {listing.stock}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${
                          listing.status === "active" ? "text-green-500" :
                          listing.status === "pending" ? "text-amber-500" :
                          listing.status === "flagged" ? "text-red-500" :
                          "text-gray-400"
                        }`} />
                        <Badge type="pill-color" size="sm" color={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-[#898989]">
                          <Eye className="size-3" />
                          {listing.views.toLocaleString()} views
                        </div>
                        <div className="flex items-center gap-2 text-xs text-[#898989]">
                          <Package className="size-3" />
                          {listing.sales} sales
                        </div>
                        {listing.rating > 0 && (
                          <div className="flex items-center gap-1 text-xs">
                            <Star01 className="size-3 text-amber-500 fill-amber-500" />
                            <span className="text-gray-900">{listing.rating}</span>
                          </div>
                        )}
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Edit02 className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-[#898989] hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Trash01 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
          <div className="text-sm text-[#898989]">
            Showing <span className="font-medium text-gray-900">{filteredListings.length}</span> of <span className="font-medium text-gray-900">4,892</span> listings
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <ChevronLeft className="size-4" />
              Previous
            </button>
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
