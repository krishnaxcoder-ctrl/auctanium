"use client";

import Link from "next/link";
import Image from "next/image";
import {
  CurrencyDollar,
  ShoppingCart01,
  Package,
  Users01,
  TrendUp01,
  TrendDown01,
  ChevronRight,
  Star01,
  MessageSquare01,
  BarChart01,
  Plus,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Primary Stats
const primaryStats = [
  {
    label: "Total Revenue",
    value: "₹3,75,231",
    change: "+12.5%",
    trend: "up",
    icon: CurrencyDollar,
    color: "success",
  },
  {
    label: "Total Orders",
    value: "156",
    change: "+8.2%",
    trend: "up",
    icon: ShoppingCart01,
    color: "brand",
  },
  {
    label: "Active Products",
    value: "48",
    change: "-2",
    trend: "down",
    icon: Package,
    color: "warning",
  },
  {
    label: "Total Customers",
    value: "512",
    change: "+24",
    trend: "up",
    icon: Users01,
    color: "brand",
  },
];

// Recent Orders
const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: { name: "Priya Sharma", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    products: "Samsung Galaxy S24 Ultra",
    total: 124999,
    status: "processing",
    date: "18 Dec, 2024",
  },
  {
    id: "ORD-2024-002",
    customer: { name: "Rahul Verma", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    products: "OnePlus 12 + Cover",
    total: 69999,
    status: "shipped",
    date: "17 Dec, 2024",
  },
  {
    id: "ORD-2024-003",
    customer: { name: "Ananya Patel", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    products: "boAt Airdopes 141",
    total: 1499,
    status: "delivered",
    date: "16 Dec, 2024",
  },
  {
    id: "ORD-2024-004",
    customer: { name: "Vikram Singh", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    products: "iPad Air + Keyboard",
    total: 74999,
    status: "pending",
    date: "18 Dec, 2024",
  },
  {
    id: "ORD-2024-005",
    customer: { name: "Sneha Reddy", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    products: "Fire-Boltt Phoenix Watch",
    total: 2999,
    status: "processing",
    date: "17 Dec, 2024",
  },
];

// Top Products
const topProducts = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra",
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
    sales: 24,
    revenue: 2999976,
    stock: 12,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
    sales: 45,
    revenue: 5849955,
    stock: 28,
  },
  {
    id: "3",
    name: "boAt Rockerz 450",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    sales: 189,
    revenue: 283311,
    stock: 145,
  },
  {
    id: "4",
    name: "Noise ColorFit Pro 4",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
    sales: 132,
    revenue: 395868,
    stock: 58,
  },
  {
    id: "5",
    name: "OnePlus Nord CE 3",
    image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=200&h=200&fit=crop",
    sales: 67,
    revenue: 1675933,
    stock: 35,
  },
];

// Recent Activity
const recentActivity = [
  { type: "order", message: "New order received", detail: "ORD-2024-001", time: "2 min ago" },
  { type: "review", message: "New 5-star review", detail: "Samsung Galaxy S24", time: "15 min ago" },
  { type: "message", message: "New message from", detail: "Priya Sharma", time: "1 hour ago" },
  { type: "view", message: "Product viewed 50 times", detail: "iPhone 15 Pro", time: "2 hours ago" },
  { type: "order", message: "Order shipped", detail: "ORD-2024-002", time: "3 hours ago" },
  { type: "review", message: "New 4-star review", detail: "boAt Airdopes", time: "5 hours ago" },
];

// Customer Reviews Summary
const reviewsSummary = {
  average: 4.8,
  total: 234,
  recent: [
    { customer: "Priya S.", rating: 5, comment: "Excellent product quality and fast shipping!", product: "Samsung S24" },
    { customer: "Rahul V.", rating: 5, comment: "Great seller, highly recommend!", product: "iPhone 15" },
    { customer: "Ananya P.", rating: 4, comment: "Good product, minor delay in shipping.", product: "boAt Airdopes" },
  ],
};

const statusColors: Record<string, "success" | "brand" | "warning" | "error"> = {
  delivered: "success",
  shipped: "brand",
  processing: "warning",
  pending: "error",
};

export default function SellerDashboard() {
  return (
    <div className="space-y-6 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-lg sm:text-xl font-semibold text-primary">Seller Dashboard</h1>
          <p className="text-xs sm:text-sm text-tertiary">Welcome back! Here's your store overview.</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3 flex-shrink-0">
          <Button color="secondary" size="sm" iconLeading={BarChart01} className="text-xs sm:text-sm">
            Analytics
          </Button>
          <Link href="/seller/products/new">
            <Button color="primary" size="sm" iconLeading={Plus} className="text-xs sm:text-sm">
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        {primaryStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-secondary bg-primary p-3 sm:p-4"
          >
            <div className="flex items-center justify-between">
              <div className={`flex size-8 sm:size-10 items-center justify-center rounded-lg ${
                stat.color === "success" ? "bg-success-50" :
                stat.color === "brand" ? "bg-brand-50" :
                "bg-warning-50"
              }`}>
                <stat.icon className={`size-4 sm:size-5 ${
                  stat.color === "success" ? "text-success-600" :
                  stat.color === "brand" ? "text-brand-600" :
                  "text-warning-600"
                }`} />
              </div>
              <div className={`flex items-center gap-0.5 sm:gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-success-600" : "text-error-600"
              }`}>
                {stat.trend === "up" ? (
                  <TrendUp01 className="size-3" />
                ) : (
                  <TrendDown01 className="size-3" />
                )}
                <span className="text-[10px] sm:text-xs">{stat.change}</span>
              </div>
            </div>
            <div className="mt-2 sm:mt-3">
              <div className="text-lg sm:text-2xl font-semibold text-primary">{stat.value}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Recent Orders & Top Products */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Orders */}
          <div className="rounded-xl border border-secondary bg-primary">
            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
              <h2 className="text-sm font-semibold text-primary">Recent Orders</h2>
              <Link href="/seller/orders" className="text-xs font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="divide-y divide-secondary">
              {recentOrders.map((order) => (
                <div key={order.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <Avatar src={order.customer.avatar} alt={order.customer.name} size="sm" className="flex-shrink-0" />
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="text-sm font-medium text-primary">{order.id}</span>
                      <Badge type="pill-color" size="sm" color={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-tertiary truncate">
                      {order.customer.name} - {order.products}
                    </p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-primary">₹{order.total.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-tertiary">{order.date}</div>
                  </div>
                  <ChevronRight className="size-4 text-tertiary flex-shrink-0 hidden sm:block" />
                </div>
              ))}
            </div>
          </div>

          {/* Top Products */}
          <div className="rounded-xl border border-secondary bg-primary">
            <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
              <h2 className="text-sm font-semibold text-primary">Top Products</h2>
              <Link href="/seller/products" className="text-xs font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="divide-y divide-secondary">
              {topProducts.map((product) => (
                <div key={product.id} className="flex items-center gap-3 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <div className="relative size-12 overflow-hidden rounded-lg bg-secondary flex-shrink-0">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0 overflow-hidden">
                    <h3 className="text-sm font-medium text-primary truncate">{product.name}</h3>
                    <p className="text-xs text-tertiary">{product.sales} sales</p>
                  </div>
                  <div className="text-right flex-shrink-0">
                    <div className="text-sm font-semibold text-primary">₹{product.revenue.toLocaleString('en-IN')}</div>
                    <div className={`text-xs ${product.stock <= 10 ? "text-error-600" : "text-tertiary"}`}>
                      {product.stock} in stock
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Column - Activity, Reviews, Quick Actions */}
        <div className="space-y-6">
          {/* Revenue Chart Placeholder */}
          <div className="rounded-xl border border-secondary bg-primary p-4">
            <h2 className="text-sm font-semibold text-primary mb-4">Revenue Overview</h2>
            <div className="flex items-end justify-between gap-2 h-32">
              {[65, 45, 80, 55, 90, 70, 85].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-1">
                  <div
                    className="w-full rounded-t bg-brand-500 transition-all hover:bg-brand-600"
                    style={{ height: `${height}%` }}
                  />
                  <span className="text-xs text-tertiary">
                    {["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"][i]}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-secondary bg-primary">
            <div className="border-b border-secondary px-4 py-3">
              <h2 className="text-sm font-semibold text-primary">Recent Activity</h2>
            </div>
            <div className="divide-y divide-secondary max-h-64 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 px-4 py-3">
                  <div className={`mt-0.5 size-2 rounded-full flex-shrink-0 ${
                    activity.type === "order" ? "bg-brand-500" :
                    activity.type === "review" ? "bg-success-500" :
                    activity.type === "message" ? "bg-warning-500" :
                    "bg-tertiary"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-primary">
                      {activity.message} <span className="font-medium">{activity.detail}</span>
                    </p>
                    <p className="text-xs text-tertiary">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Customer Reviews */}
          <div className="rounded-xl border border-secondary bg-primary">
            <div className="border-b border-secondary px-4 py-3">
              <div className="flex items-center justify-between">
                <h2 className="text-sm font-semibold text-primary">Customer Reviews</h2>
                <div className="flex items-center gap-1">
                  <Star01 className="size-4 text-warning-500 fill-warning-500" />
                  <span className="text-sm font-semibold text-primary">{reviewsSummary.average}</span>
                  <span className="text-xs text-tertiary">({reviewsSummary.total})</span>
                </div>
              </div>
            </div>
            <div className="divide-y divide-secondary">
              {reviewsSummary.recent.map((review, index) => (
                <div key={index} className="px-4 py-3">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="text-sm font-medium text-primary">{review.customer}</span>
                    <div className="flex items-center gap-0.5">
                      {Array.from({ length: review.rating }).map((_, i) => (
                        <Star01 key={i} className="size-3 text-warning-500 fill-warning-500" />
                      ))}
                    </div>
                  </div>
                  <p className="text-xs text-tertiary">{review.comment}</p>
                  <p className="text-xs text-brand-600 mt-1">{review.product}</p>
                </div>
              ))}
            </div>
            <div className="border-t border-secondary px-4 py-3">
              <Link href="/seller/reviews" className="text-xs font-medium text-brand-600 hover:underline">
                View all reviews
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 sm:grid-cols-4">
        <Link
          href="/seller/products/new"
          className="flex items-center gap-2 sm:gap-3 rounded-xl border border-secondary bg-primary p-3 sm:p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
            <Plus className="size-4 sm:size-5 text-brand-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-primary truncate">Add Product</h3>
            <p className="text-xs text-tertiary hidden sm:block">List new item</p>
          </div>
        </Link>
        <Link
          href="/seller/orders"
          className="flex items-center gap-2 sm:gap-3 rounded-xl border border-secondary bg-primary p-3 sm:p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-warning-50 flex-shrink-0">
            <ShoppingCart01 className="size-4 sm:size-5 text-warning-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-primary truncate">Orders</h3>
            <p className="text-xs text-tertiary hidden sm:block">5 pending</p>
          </div>
        </Link>
        <Link
          href="/seller/messages"
          className="flex items-center gap-2 sm:gap-3 rounded-xl border border-secondary bg-primary p-3 sm:p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-error-50 flex-shrink-0">
            <MessageSquare01 className="size-4 sm:size-5 text-error-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-primary truncate">Messages</h3>
            <p className="text-xs text-tertiary hidden sm:block">3 unread</p>
          </div>
        </Link>
        <Link
          href="/seller/analytics"
          className="flex items-center gap-2 sm:gap-3 rounded-xl border border-secondary bg-primary p-3 sm:p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-success-50 flex-shrink-0">
            <BarChart01 className="size-4 sm:size-5 text-success-600" />
          </div>
          <div className="min-w-0">
            <h3 className="text-xs sm:text-sm font-medium text-primary truncate">Analytics</h3>
            <p className="text-xs text-tertiary hidden sm:block">View reports</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
