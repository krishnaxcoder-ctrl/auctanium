"use client";

import { useState } from "react";
import Link from "next/link";
import {
  ShoppingCart01,
  SearchLg,
  FilterLines,
  Download01,
  Eye,
  Edit02,
  ChevronLeft,
  ChevronRight,
  CurrencyDollar,
  Clock,
  CheckCircle,
  Truck01,
  Package,
  XCircle,
  AlertTriangle,
  RefreshCw01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Mock orders data
const ordersData = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    seller: "TechStore Pro",
    items: 3,
    total: 2499,
    status: "processing",
    payment: "completed",
    date: "Dec 18, 2024",
    shipping: "Express",
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    seller: "GadgetWorld",
    items: 2,
    total: 1249,
    status: "shipped",
    payment: "completed",
    date: "Dec 17, 2024",
    shipping: "Standard",
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    seller: "ElectroHub",
    items: 1,
    total: 249,
    status: "delivered",
    payment: "completed",
    date: "Dec 16, 2024",
    shipping: "Standard",
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "James Wilson",
      email: "j.wilson@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    seller: "TechStore Pro",
    items: 4,
    total: 899,
    status: "pending",
    payment: "pending",
    date: "Dec 18, 2024",
    shipping: "Express",
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    seller: "GadgetWorld",
    items: 2,
    total: 799,
    status: "disputed",
    payment: "refunded",
    date: "Dec 17, 2024",
    shipping: "Standard",
  },
  {
    id: "ORD-2024-006",
    customer: {
      name: "Robert Brown",
      email: "r.brown@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    seller: "DigitalZone",
    items: 1,
    total: 1599,
    status: "cancelled",
    payment: "refunded",
    date: "Dec 15, 2024",
    shipping: "Express",
  },
  {
    id: "ORD-2024-007",
    customer: {
      name: "Jennifer Martinez",
      email: "j.martinez@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    seller: "PremiumTech",
    items: 5,
    total: 3450,
    status: "processing",
    payment: "completed",
    date: "Dec 18, 2024",
    shipping: "Express",
  },
];

const statusConfig: Record<string, { color: "success" | "brand" | "warning" | "error" | "gray"; icon: typeof CheckCircle }> = {
  pending: { color: "gray", icon: Clock },
  processing: { color: "warning", icon: RefreshCw01 },
  shipped: { color: "brand", icon: Truck01 },
  delivered: { color: "success", icon: CheckCircle },
  cancelled: { color: "error", icon: XCircle },
  disputed: { color: "error", icon: AlertTriangle },
};

const paymentColors: Record<string, "success" | "warning" | "error"> = {
  completed: "success",
  pending: "warning",
  refunded: "error",
};

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [paymentFilter, setPaymentFilter] = useState<string>("all");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);

  const filteredOrders = ordersData.filter((order) => {
    const matchesSearch = order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.seller.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    const matchesPayment = paymentFilter === "all" || order.payment === paymentFilter;
    return matchesSearch && matchesStatus && matchesPayment;
  });

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectOrder = (orderId: string) => {
    if (selectedOrders.includes(orderId)) {
      setSelectedOrders(selectedOrders.filter((id) => id !== orderId));
    } else {
      setSelectedOrders([...selectedOrders, orderId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Orders</h1>
          <p className="text-sm text-gray-500">Manage and track all platform orders.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <ShoppingCart01 className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">8,492</div>
              <div className="text-xs text-gray-500">Total Orders</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">156</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50">
              <Truck01 className="size-5 text-blue-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">234</div>
              <div className="text-xs text-gray-500">Shipped</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">7,890</div>
              <div className="text-xs text-gray-500">Delivered</div>
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
              <div className="text-xs text-gray-500">Disputes</div>
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
              placeholder="Search orders..."
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
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="shipped">Shipped</option>
              <option value="delivered">Delivered</option>
              <option value="cancelled">Cancelled</option>
              <option value="disputed">Disputed</option>
            </select>
            <select
              value={paymentFilter}
              onChange={(e) => setPaymentFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Payments</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="refunded">Refunded</option>
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
                    checked={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Items</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Payment</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredOrders.map((order) => {
                const statusInfo = statusConfig[order.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelectOrder(order.id)}
                        className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                    </td>
                    <td className="px-4 py-4 text-sm font-medium text-brand-600">{order.id}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={order.customer.avatar} alt={order.customer.name} size="sm" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{order.customer.name}</div>
                          <div className="text-xs text-gray-500">{order.customer.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{order.seller}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{order.items}</td>
                    <td className="px-4 py-4 text-sm font-semibold text-gray-900">${order.total.toLocaleString()}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${
                          order.status === "delivered" ? "text-green-500" :
                          order.status === "shipped" ? "text-blue-500" :
                          order.status === "processing" ? "text-amber-500" :
                          order.status === "pending" ? "text-gray-400" :
                          "text-red-500"
                        }`} />
                        <Badge type="pill-color" size="sm" color={statusInfo.color}>
                          {order.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge type="pill-color" size="sm" color={paymentColors[order.payment]}>
                        {order.payment}
                      </Badge>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{order.date}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Eye className="size-4" />
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
            Showing <span className="font-medium text-gray-900">{filteredOrders.length}</span> of <span className="font-medium text-gray-900">8,492</span> orders
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
