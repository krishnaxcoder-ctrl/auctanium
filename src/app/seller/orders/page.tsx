"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SearchLg,
  FilterLines,
  DotsVertical,
  Eye,
  Truck01,
  XClose,
  CheckCircle,
  Clock,
  Package,
  RefreshCw01,
  Download01,
  Mail01,
  ShoppingCart01,
  AlertCircle,
  ChevronDown,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Select } from "@/components/base/select/select";
import { Avatar } from "@/components/base/avatar/avatar";

const orders = [
  {
    id: "ORD-2024-001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    products: [
      { name: "MacBook Pro 16\"", quantity: 1, price: 2499 },
    ],
    status: "processing",
    paymentStatus: "paid",
    total: 2499,
    date: "Dec 18, 2024",
    time: "10:34 AM",
    shippingAddress: "123 Main St, New York, NY 10001",
  },
  {
    id: "ORD-2024-002",
    customer: {
      name: "Michael Chen",
      email: "m.chen@email.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    products: [
      { name: "iPhone 15 Pro", quantity: 1, price: 1199 },
      { name: "Leather Case", quantity: 1, price: 50 },
    ],
    status: "shipped",
    paymentStatus: "paid",
    total: 1249,
    date: "Dec 17, 2024",
    time: "2:15 PM",
    shippingAddress: "456 Oak Ave, Los Angeles, CA 90001",
  },
  {
    id: "ORD-2024-003",
    customer: {
      name: "Emily Davis",
      email: "emily.d@email.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    products: [
      { name: "AirPods Pro 2", quantity: 1, price: 249 },
    ],
    status: "delivered",
    paymentStatus: "paid",
    total: 249,
    date: "Dec 16, 2024",
    time: "9:00 AM",
    shippingAddress: "789 Pine Rd, Chicago, IL 60601",
  },
  {
    id: "ORD-2024-004",
    customer: {
      name: "James Wilson",
      email: "james.w@email.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    products: [
      { name: "iPad Air", quantity: 1, price: 799 },
      { name: "Magic Keyboard", quantity: 1, price: 299 },
    ],
    status: "pending",
    paymentStatus: "pending",
    total: 1098,
    date: "Dec 18, 2024",
    time: "11:45 AM",
    shippingAddress: "321 Elm St, Houston, TX 77001",
  },
  {
    id: "ORD-2024-005",
    customer: {
      name: "Lisa Anderson",
      email: "lisa.a@email.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    products: [
      { name: "Apple Watch Ultra", quantity: 1, price: 799 },
    ],
    status: "processing",
    paymentStatus: "paid",
    total: 799,
    date: "Dec 17, 2024",
    time: "4:30 PM",
    shippingAddress: "654 Maple Dr, Phoenix, AZ 85001",
  },
  {
    id: "ORD-2024-006",
    customer: {
      name: "Robert Brown",
      email: "r.brown@email.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    },
    products: [
      { name: "MacBook Air M3", quantity: 1, price: 1099 },
    ],
    status: "cancelled",
    paymentStatus: "refunded",
    total: 1099,
    date: "Dec 15, 2024",
    time: "1:20 PM",
    shippingAddress: "987 Cedar Ln, Seattle, WA 98101",
  },
  {
    id: "ORD-2024-007",
    customer: {
      name: "Jennifer Martinez",
      email: "jen.m@email.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    products: [
      { name: "Studio Display", quantity: 1, price: 1599 },
    ],
    status: "shipped",
    paymentStatus: "paid",
    total: 1599,
    date: "Dec 16, 2024",
    time: "10:00 AM",
    shippingAddress: "147 Birch St, Denver, CO 80201",
  },
  {
    id: "ORD-2024-008",
    customer: {
      name: "David Lee",
      email: "d.lee@email.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    },
    products: [
      { name: "HomePod mini", quantity: 2, price: 99 },
      { name: "AirTag 4-pack", quantity: 1, price: 99 },
    ],
    status: "delivered",
    paymentStatus: "paid",
    total: 297,
    date: "Dec 14, 2024",
    time: "3:45 PM",
    shippingAddress: "258 Spruce Ave, Boston, MA 02101",
  },
];

const statusConfig: Record<string, { label: string; color: "success" | "warning" | "error" | "brand" | "gray"; icon: React.ComponentType<{ className?: string }> }> = {
  pending: { label: "Pending", color: "warning", icon: Clock },
  processing: { label: "Processing", color: "brand", icon: RefreshCw01 },
  shipped: { label: "Shipped", color: "brand", icon: Truck01 },
  delivered: { label: "Delivered", color: "success", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "error", icon: XClose },
};

const paymentStatusConfig: Record<string, { label: string; color: "success" | "warning" | "error" | "gray" }> = {
  paid: { label: "Paid", color: "success" },
  pending: { label: "Pending", color: "warning" },
  failed: { label: "Failed", color: "error" },
  refunded: { label: "Refunded", color: "gray" },
};

const statusOptions = [
  { id: "all", label: "All Status" },
  { id: "pending", label: "Pending" },
  { id: "processing", label: "Processing" },
  { id: "shipped", label: "Shipped" },
  { id: "delivered", label: "Delivered" },
  { id: "cancelled", label: "Cancelled" },
];

const sortOptions = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "total_high", label: "Total: High to Low" },
  { id: "total_low", label: "Total: Low to High" },
];

const dateOptions = [
  { id: "all", label: "All Time" },
  { id: "today", label: "Today" },
  { id: "week", label: "This Week" },
  { id: "month", label: "This Month" },
  { id: "quarter", label: "This Quarter" },
];

export default function OrdersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedOrders, setSelectedOrders] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [dateFilter, setDateFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      order.customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedOrders.length === filteredOrders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(filteredOrders.map((o) => o.id));
    }
  };

  const toggleSelectOrder = (id: string) => {
    setSelectedOrders((prev) =>
      prev.includes(id) ? prev.filter((o) => o !== id) : [...prev, id]
    );
  };

  const stats = {
    total: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    shipped: orders.filter((o) => o.status === "shipped").length,
    delivered: orders.filter((o) => o.status === "delivered").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
    revenue: orders.filter((o) => o.paymentStatus === "paid").reduce((acc, o) => acc + o.total, 0),
  };

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-primary">Orders</h1>
          <p className="text-xs sm:text-sm text-tertiary">Manage and track your orders</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Button color="secondary" size="sm" iconLeading={RefreshCw01}>
            <span className="hidden sm:inline">Sync</span>
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 sm:grid-cols-3 sm:gap-3 lg:grid-cols-6">
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
              <ShoppingCart01 className="size-4 text-brand-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.total}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Total</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-warning-50 flex-shrink-0">
              <Clock className="size-4 text-warning-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.pending}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Pending</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
              <RefreshCw01 className="size-4 text-brand-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.processing}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Processing</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
              <Truck01 className="size-4 text-brand-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.shipped}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Shipped</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-success-50 flex-shrink-0">
              <CheckCircle className="size-4 text-success-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.delivered}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Delivered</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-error-50 flex-shrink-0">
              <XClose className="size-4 text-error-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.cancelled}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Cancelled</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2 sm:space-y-3">
        <Input
          icon={SearchLg}
          size="sm"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          placeholder="Search orders..."
        />
        <div className="flex gap-2 overflow-x-auto pb-1 -mb-1">
          <div className="flex-shrink-0 w-28 sm:w-32">
            <Select
              size="sm"
              placeholder="Status"
              items={statusOptions}
              selectedKey={statusFilter}
              onSelectionChange={(key) => setStatusFilter(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
          <div className="flex-shrink-0 w-28 sm:w-32">
            <Select
              size="sm"
              placeholder="Date"
              items={dateOptions}
              selectedKey={dateFilter}
              onSelectionChange={(key) => setDateFilter(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
          <div className="flex-shrink-0 w-28 sm:w-36">
            <Select
              size="sm"
              placeholder="Sort"
              items={sortOptions}
              selectedKey={sortBy}
              onSelectionChange={(key) => setSortBy(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-lg bg-brand-50 px-3 py-2 sm:py-3">
          <span className="text-xs sm:text-sm font-medium text-brand-700 flex-shrink-0">
            {selectedOrders.length} selected
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            <Button color="secondary" size="sm" iconLeading={Truck01} className="flex-shrink-0">
              <span className="hidden sm:inline">Ship</span>
            </Button>
            <Button color="secondary" size="sm" iconLeading={Mail01} className="flex-shrink-0">
              <span className="hidden sm:inline">Email</span>
            </Button>
            <Button color="secondary" size="sm" iconLeading={Download01} className="flex-shrink-0">
              <span className="hidden sm:inline">Export</span>
            </Button>
          </div>
        </div>
      )}

      {/* Orders Table - Desktop */}
      <div className="hidden md:block rounded-xl border border-secondary bg-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px]">
            <thead>
              <tr className="border-b border-secondary bg-secondary/50">
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox
                    isSelected={selectedOrders.length === filteredOrders.length && filteredOrders.length > 0}
                    isIndeterminate={selectedOrders.length > 0 && selectedOrders.length < filteredOrders.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary hidden lg:table-cell">
                  Products
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary hidden lg:table-cell">
                  Payment
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Total
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-tertiary w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filteredOrders.map((order) => {
                const StatusIcon = statusConfig[order.status].icon;
                return (
                  <tr key={order.id} className="hover:bg-secondary/30 transition-colors">
                    <td className="px-4 py-3">
                      <Checkbox
                        isSelected={selectedOrders.includes(order.id)}
                        onChange={() => toggleSelectOrder(order.id)}
                      />
                    </td>
                    <td className="px-4 py-3">
                      <div className="min-w-0">
                        <Link
                          href={`/seller/orders/${order.id}`}
                          className="text-sm font-medium text-primary hover:text-brand-600 transition-colors"
                        >
                          {order.id}
                        </Link>
                        <p className="text-xs text-tertiary">{order.date}</p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <div className="flex items-center gap-3">
                        <Avatar src={order.customer.avatar} alt={order.customer.name} size="sm" />
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-primary truncate">{order.customer.name}</p>
                          <p className="text-xs text-tertiary truncate">{order.customer.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <div className="min-w-0">
                        <p className="text-sm text-primary truncate">
                          {order.products[0].name}
                          {order.products.length > 1 && (
                            <span className="text-tertiary"> +{order.products.length - 1}</span>
                          )}
                        </p>
                        <p className="text-xs text-tertiary">
                          {order.products.reduce((acc, p) => acc + p.quantity, 0)} item(s)
                        </p>
                      </div>
                    </td>
                    <td className="px-4 py-3">
                      <Badge
                        type="pill-color"
                        size="sm"
                        color={statusConfig[order.status].color}
                      >
                        {statusConfig[order.status].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 hidden lg:table-cell">
                      <Badge
                        type="pill-color"
                        size="sm"
                        color={paymentStatusConfig[order.paymentStatus].color}
                      >
                        {paymentStatusConfig[order.paymentStatus].label}
                      </Badge>
                    </td>
                    <td className="px-4 py-3 whitespace-nowrap">
                      <span className="text-sm font-semibold text-primary">${order.total.toLocaleString()}</span>
                    </td>
                    <td className="px-4 py-3">
                      <div className="relative flex items-center justify-end gap-2">
                        <Link href={`/seller/orders/${order.id}`}>
                          <Button color="tertiary" size="sm" iconLeading={Eye}>
                            View
                          </Button>
                        </Link>
                        <button
                          onClick={() => setActiveMenu(activeMenu === order.id ? null : order.id)}
                          className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                        >
                          <DotsVertical className="size-4 text-tertiary" />
                        </button>
                        {activeMenu === order.id && (
                          <div className="absolute right-0 top-full z-10 mt-1 w-44 rounded-lg border border-secondary bg-primary py-1 shadow-lg">
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                              <Eye className="size-4" />
                              View Details
                            </button>
                            {order.status === "processing" && (
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                                <Truck01 className="size-4" />
                                Mark as Shipped
                              </button>
                            )}
                            {order.status === "shipped" && (
                              <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                                <CheckCircle className="size-4" />
                                Mark as Delivered
                              </button>
                            )}
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                              <Mail01 className="size-4" />
                              Email Customer
                            </button>
                            <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                              <Download01 className="size-4" />
                              Download Invoice
                            </button>
                            {order.status !== "cancelled" && order.status !== "delivered" && (
                              <>
                                <hr className="my-1 border-secondary" />
                                <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-secondary transition-colors">
                                  <XClose className="size-4" />
                                  Cancel Order
                                </button>
                              </>
                            )}
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredOrders.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <ShoppingCart01 className="size-12 text-tertiary mb-4" />
            <h3 className="text-lg font-medium text-primary">No orders found</h3>
            <p className="mt-1 text-sm text-tertiary">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Orders will appear here once customers place them"}
            </p>
          </div>
        )}
      </div>

      {/* Orders Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredOrders.map((order) => (
          <Link
            key={order.id}
            href={`/seller/orders/${order.id}`}
            className="block rounded-xl border border-secondary bg-primary p-3 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div onClick={(e) => e.preventDefault()}>
                <Checkbox
                  isSelected={selectedOrders.includes(order.id)}
                  onChange={() => toggleSelectOrder(order.id)}
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-2">
                  <div className="min-w-0">
                    <p className="text-sm font-medium text-primary">{order.id}</p>
                    <p className="text-xs text-tertiary">{order.date}</p>
                  </div>
                  <span className="text-sm font-semibold text-primary">${order.total.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <Avatar src={order.customer.avatar} alt={order.customer.name} size="xs" />
                  <span className="text-xs text-secondary truncate">{order.customer.name}</span>
                </div>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    type="pill-color"
                    size="sm"
                    color={statusConfig[order.status].color}
                  >
                    {statusConfig[order.status].label}
                  </Badge>
                  <Badge
                    type="pill-color"
                    size="sm"
                    color={paymentStatusConfig[order.paymentStatus].color}
                  >
                    {paymentStatusConfig[order.paymentStatus].label}
                  </Badge>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State - Mobile */}
        {filteredOrders.length === 0 && (
          <div className="rounded-xl border border-secondary bg-primary p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <ShoppingCart01 className="size-10 text-tertiary mb-3" />
              <h3 className="text-base font-medium text-primary">No orders found</h3>
              <p className="mt-1 text-sm text-tertiary">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Orders will appear here once customers place them"}
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredOrders.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-tertiary">
            Showing {filteredOrders.length} of {orders.length} orders
          </p>
          <div className="flex items-center gap-2">
            <Button color="secondary" size="sm" isDisabled>
              Previous
            </Button>
            <Button color="secondary" size="sm" isDisabled>
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
