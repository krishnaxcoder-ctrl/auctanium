"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Shield01,
  SearchLg,
  Plus,
  Edit02,
  Eye,
  Download01,
  ChevronLeft,
  ChevronRight,
  CurrencyDollar,
  Package,
  Star01,
  CheckCircle,
  XCircle,
  Clock,
  SlashCircle01,
  MessageSquare01,
  TrendUp01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Mock sellers data
const sellersData = [
  {
    id: "SLR-001",
    name: "TechStore Pro",
    owner: "Michael Chen",
    email: "contact@techstorepro.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    status: "verified",
    joined: "Mar 15, 2024",
    totalProducts: 156,
    totalSales: 2340,
    revenue: 425890,
    rating: 4.9,
    commission: 8,
  },
  {
    id: "SLR-002",
    name: "GadgetWorld",
    owner: "James Wilson",
    email: "sales@gadgetworld.com",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    status: "verified",
    joined: "Apr 20, 2024",
    totalProducts: 89,
    totalSales: 1890,
    revenue: 312450,
    rating: 4.8,
    commission: 10,
  },
  {
    id: "SLR-003",
    name: "ElectroHub",
    owner: "David Kim",
    email: "info@electrohub.com",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    status: "pending",
    joined: "Dec 10, 2024",
    totalProducts: 23,
    totalSales: 45,
    revenue: 18750,
    rating: 4.5,
    commission: 12,
  },
  {
    id: "SLR-004",
    name: "DigitalZone",
    owner: "Robert Brown",
    email: "support@digitalzone.com",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop",
    status: "verified",
    joined: "Jun 5, 2024",
    totalProducts: 234,
    totalSales: 3450,
    revenue: 567890,
    rating: 4.7,
    commission: 8,
  },
  {
    id: "SLR-005",
    name: "SmartDeals",
    owner: "Amanda White",
    email: "hello@smartdeals.com",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    status: "suspended",
    joined: "Aug 1, 2024",
    totalProducts: 45,
    totalSales: 890,
    revenue: 78900,
    rating: 3.2,
    commission: 15,
  },
  {
    id: "SLR-006",
    name: "PremiumTech",
    owner: "Lisa Anderson",
    email: "contact@premiumtech.com",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    status: "verified",
    joined: "Sep 12, 2024",
    totalProducts: 178,
    totalSales: 2100,
    revenue: 389450,
    rating: 4.6,
    commission: 9,
  },
];

const statusColors: Record<string, "success" | "warning" | "error"> = {
  verified: "success",
  pending: "warning",
  suspended: "error",
};

const statusIcons: Record<string, typeof CheckCircle> = {
  verified: CheckCircle,
  pending: Clock,
  suspended: SlashCircle01,
};

export default function SellersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedSellers, setSelectedSellers] = useState<string[]>([]);

  const filteredSellers = sellersData.filter((seller) => {
    const matchesSearch = seller.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.owner.toLowerCase().includes(searchQuery.toLowerCase()) ||
      seller.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || seller.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedSellers.length === filteredSellers.length) {
      setSelectedSellers([]);
    } else {
      setSelectedSellers(filteredSellers.map((s) => s.id));
    }
  };

  const toggleSelectSeller = (sellerId: string) => {
    if (selectedSellers.includes(sellerId)) {
      setSelectedSellers(selectedSellers.filter((id) => id !== sellerId));
    } else {
      setSelectedSellers([...selectedSellers, sellerId]);
    }
  };

  return (
    <div className="space-y-6 ">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Sellers</h1>
          <p className="text-sm text-gray-500">Manage seller accounts, verify new applications, and monitor performance.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
          <Button color="primary" size="sm" iconLeading={Plus} className="bg-brand-600 hover:bg-brand-700">
            Invite Seller
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <Shield01 className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,234</div>
              <div className="text-xs text-gray-500">Total Sellers</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">1,089</div>
              <div className="text-xs text-gray-500">Verified</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">87</div>
              <div className="text-xs text-gray-500">Pending Approval</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50">
              <CurrencyDollar className="size-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$1.8M</div>
              <div className="text-xs text-gray-500">Total GMV</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search sellers..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="verified">Verified</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedSellers.length > 0 && (
          <div className="flex items-center gap-4 border-t border-gray-200 bg-brand-50 px-4 py-3">
            <span className="text-sm text-gray-600">
              {selectedSellers.length} seller{selectedSellers.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <Button color="secondary" size="sm" iconLeading={CheckCircle}>
                Verify
              </Button>
              <Button color="secondary" size="sm" iconLeading={SlashCircle01}>
                Suspend
              </Button>
              <Button color="secondary" size="sm" iconLeading={MessageSquare01}>
                Message
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
                    checked={selectedSellers.length === filteredSellers.length && filteredSellers.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Sales</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Commission</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredSellers.map((seller) => {
                const StatusIcon = statusIcons[seller.status];
                return (
                  <tr key={seller.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedSellers.includes(seller.id)}
                        onChange={() => toggleSelectSeller(seller.id)}
                        className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={seller.avatar} alt={seller.name} size="sm" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                          <div className="text-xs text-gray-500">{seller.owner}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${
                          seller.status === "verified" ? "text-green-500" :
                          seller.status === "pending" ? "text-amber-500" :
                          "text-red-500"
                        }`} />
                        <Badge type="pill-color" size="sm" color={statusColors[seller.status]}>
                          {seller.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1 text-sm text-gray-900">
                        <Package className="size-4 text-gray-500" />
                        {seller.totalProducts}
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{seller.totalSales.toLocaleString()}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">${seller.revenue.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-1">
                        <Star01 className="size-4 text-amber-500 fill-amber-500" />
                        <span className="text-sm font-medium text-gray-900">{seller.rating}</span>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{seller.commission}%</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <TrendUp01 className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Edit02 className="size-4" />
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
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredSellers.length}</span> of <span className="font-medium text-gray-900">1,234</span> sellers
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
