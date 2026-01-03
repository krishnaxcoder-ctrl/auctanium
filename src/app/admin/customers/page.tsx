"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Building07,
  SearchLg,
  FilterLines,
  Plus,
  Edit02,
  Trash01,
  Eye,
  Mail01,
  Download01,
  ChevronLeft,
  ChevronRight,
  ShoppingCart01,
  CurrencyDollar,
  Star01,
  Phone,
  MarkerPin01,
  CalendarDate,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Mock customers data
const customersData = [
  {
    id: "CUS-001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    location: "New York, USA",
    status: "active",
    joined: "Dec 18, 2024",
    totalOrders: 24,
    totalSpent: 12450,
    avgOrderValue: 518.75,
    lastOrder: "2 days ago",
    tier: "gold",
  },
  {
    id: "CUS-002",
    name: "Emily Davis",
    email: "emily.d@example.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    location: "Los Angeles, USA",
    status: "active",
    joined: "Nov 10, 2024",
    totalOrders: 45,
    totalSpent: 28900,
    avgOrderValue: 642.22,
    lastOrder: "1 week ago",
    tier: "platinum",
  },
  {
    id: "CUS-003",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    location: "Chicago, USA",
    status: "inactive",
    joined: "Oct 5, 2024",
    totalOrders: 8,
    totalSpent: 2340,
    avgOrderValue: 292.50,
    lastOrder: "1 month ago",
    tier: "silver",
  },
  {
    id: "CUS-004",
    name: "Jennifer Martinez",
    email: "j.martinez@example.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    location: "Miami, USA",
    status: "active",
    joined: "Sep 20, 2024",
    totalOrders: 67,
    totalSpent: 45600,
    avgOrderValue: 680.60,
    lastOrder: "Today",
    tier: "platinum",
  },
  {
    id: "CUS-005",
    name: "Amanda White",
    email: "a.white@example.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?w=100&h=100&fit=crop",
    location: "Seattle, USA",
    status: "active",
    joined: "Dec 1, 2024",
    totalOrders: 5,
    totalSpent: 1890,
    avgOrderValue: 378.00,
    lastOrder: "3 days ago",
    tier: "bronze",
  },
  {
    id: "CUS-006",
    name: "Rachel Green",
    email: "r.green@example.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
    location: "Boston, USA",
    status: "active",
    joined: "Aug 15, 2024",
    totalOrders: 32,
    totalSpent: 18750,
    avgOrderValue: 585.94,
    lastOrder: "5 days ago",
    tier: "gold",
  },
];

const tierColors: Record<string, "gray" | "warning" | "brand" | "success"> = {
  bronze: "gray",
  silver: "gray",
  gold: "warning",
  platinum: "brand",
};

const statusColors: Record<string, "success" | "error"> = {
  active: "success",
  inactive: "error",
};

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [tierFilter, setTierFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);

  const filteredCustomers = customersData.filter((customer) => {
    const matchesSearch = customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesTier = tierFilter === "all" || customer.tier === tierFilter;
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    return matchesSearch && matchesTier && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((c) => c.id));
    }
  };

  const toggleSelectCustomer = (customerId: string) => {
    if (selectedCustomers.includes(customerId)) {
      setSelectedCustomers(selectedCustomers.filter((id) => id !== customerId));
    } else {
      setSelectedCustomers([...selectedCustomers, customerId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Customers</h1>
          <p className="text-sm text-gray-500">Manage customer accounts and view their purchase history.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
          <Button color="primary" size="sm" iconLeading={Plus} className="bg-brand-600 hover:bg-brand-700">
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <Building07 className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">8,492</div>
              <div className="text-xs text-gray-500">Total Customers</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <CurrencyDollar className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$892K</div>
              <div className="text-xs text-gray-500">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <ShoppingCart01 className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">$485</div>
              <div className="text-xs text-gray-500">Avg. Order Value</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50">
              <Star01 className="size-5 text-purple-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">234</div>
              <div className="text-xs text-gray-500">Platinum Members</div>
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
              placeholder="Search customers..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={tierFilter}
              onChange={(e) => setTierFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Tiers</option>
              <option value="bronze">Bronze</option>
              <option value="silver">Silver</option>
              <option value="gold">Gold</option>
              <option value="platinum">Platinum</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedCustomers.length === filteredCustomers.length && filteredCustomers.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-gray-300 text-brand-600 focus:ring-[#000080]"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Tier</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Order</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCustomers.map((customer) => (
                <tr key={customer.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <input
                      type="checkbox"
                      checked={selectedCustomers.includes(customer.id)}
                      onChange={() => toggleSelectCustomer(customer.id)}
                      className="size-4 rounded border-gray-300 text-brand-600 focus:ring-[#000080]"
                    />
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <Avatar src={customer.avatar} alt={customer.name} size="sm" />
                      <div>
                        <div className="text-sm font-medium text-gray-900">{customer.name}</div>
                        <div className="text-xs text-gray-500">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-1 text-sm text-gray-500">
                      <MarkerPin01 className="size-3" />
                      {customer.location}
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge type="pill-color" size="sm" color={tierColors[customer.tier]}>
                      {customer.tier}
                    </Badge>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{customer.totalOrders}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">${customer.totalSpent.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm text-gray-500">{customer.lastOrder}</td>
                  <td className="px-4 py-4">
                    <Badge type="pill-color" size="sm" color={statusColors[customer.status]}>
                      {customer.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Mail01 className="size-4" />
                      </button>
                      <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Edit02 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredCustomers.length}</span> of <span className="font-medium text-gray-900">8,492</span> customers
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
