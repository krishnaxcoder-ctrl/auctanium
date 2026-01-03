"use client";

import { useState } from "react";
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
  Clock,
  Star01,
  Eye,
  MessageSquare01,
  BarChart01,
  Plus,
  ArrowRight,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Primary Stats
const primaryStats = [
  {
    label: "Total Revenue",
    value: "$45,231",
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

// Secondary Stats
const secondaryStats = [
  { label: "Conversion Rate", value: "3.2%", icon: TrendUp01 },
  { label: "Avg. Order Value", value: "$289", icon: CurrencyDollar },
  { label: "Pending Orders", value: "5", icon: Clock },
  { label: "Unread Messages", value: "3", icon: MessageSquare01 },
];

// Recent Orders
const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: { name: "Sarah Johnson", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop" },
    products: "MacBook Pro 16\"",
    total: 2499,
    status: "processing",
    date: "Dec 18, 2024",
  },
  {
    id: "ORD-2024-002",
    customer: { name: "Michael Chen", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop" },
    products: "iPhone 15 Pro + Case",
    total: 1249,
    status: "shipped",
    date: "Dec 17, 2024",
  },
  {
    id: "ORD-2024-003",
    customer: { name: "Emily Davis", avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop" },
    products: "AirPods Pro 2",
    total: 249,
    status: "delivered",
    date: "Dec 16, 2024",
  },
  {
    id: "ORD-2024-004",
    customer: { name: "James Wilson", avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop" },
    products: "iPad Air + Keyboard",
    total: 899,
    status: "pending",
    date: "Dec 18, 2024",
  },
  {
    id: "ORD-2024-005",
    customer: { name: "Lisa Anderson", avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop" },
    products: "Apple Watch Ultra",
    total: 799,
    status: "processing",
    date: "Dec 17, 2024",
  },
];

// Top Products
const topProducts = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
    sales: 24,
    revenue: 59976,
    stock: 12,
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
    sales: 45,
    revenue: 53955,
    stock: 28,
  },
  {
    id: "3",
    name: "AirPods Pro 2nd Gen",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop",
    sales: 89,
    revenue: 22161,
    stock: 45,
  },
  {
    id: "4",
    name: "Apple Watch Ultra 2",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
    sales: 32,
    revenue: 25568,
    stock: 8,
  },
  {
    id: "5",
    name: "iPad Pro 12.9\"",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
    sales: 18,
    revenue: 21582,
    stock: 15,
  },
];

// Recent Activity
const recentActivity = [
  { type: "order", message: "New order received", detail: "ORD-2024-001", time: "2 min ago" },
  { type: "review", message: "New 5-star review", detail: "MacBook Pro 16\"", time: "15 min ago" },
  { type: "message", message: "New message from", detail: "Sarah Johnson", time: "1 hour ago" },
  { type: "view", message: "Product viewed 50 times", detail: "iPhone 15 Pro", time: "2 hours ago" },
  { type: "order", message: "Order shipped", detail: "ORD-2024-002", time: "3 hours ago" },
  { type: "review", message: "New 4-star review", detail: "AirPods Pro", time: "5 hours ago" },
];

// Customer Reviews Summary
const reviewsSummary = {
  average: 4.8,
  total: 234,
  recent: [
    { customer: "Sarah J.", rating: 5, comment: "Excellent product quality and fast shipping!", product: "MacBook Pro" },
    { customer: "Mike C.", rating: 5, comment: "Great seller, highly recommend!", product: "iPhone 15" },
    { customer: "Emily D.", rating: 4, comment: "Good product, minor delay in shipping.", product: "AirPods Pro" },
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
    <div className="space-y-6 p-4">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">Seller Dashboard</h1>
          <p className="text-sm text-tertiary">Welcome back! Here's your store overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={BarChart01}>
            View Analytics
          </Button>
          <Link href="/seller/products/new">
            <Button color="primary" size="sm" iconLeading={Plus}>
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Primary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {primaryStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-secondary bg-primary p-4"
          >
            <div className="flex items-center justify-between">
              <div className={`flex size-10 items-center justify-center rounded-lg ${
                stat.color === "success" ? "bg-success-50" :
                stat.color === "brand" ? "bg-brand-50" :
                "bg-warning-50"
              }`}>
                <stat.icon className={`size-5 ${
                  stat.color === "success" ? "text-success-600" :
                  stat.color === "brand" ? "text-brand-600" :
                  "text-warning-600"
                }`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-success-600" : "text-error-600"
              }`}>
                {stat.trend === "up" ? (
                  <TrendUp01 className="size-3" />
                ) : (
                  <TrendDown01 className="size-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-semibold text-primary">{stat.value}</div>
              <div className="text-xs text-tertiary">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Secondary Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {secondaryStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4"
          >
            <stat.icon className="size-5 text-tertiary" />
            <div>
              <div className="text-lg font-semibold text-primary">{stat.value}</div>
              <div className="text-xs text-tertiary">{stat.label}</div>
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
                <div key={order.id} className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <Avatar src={order.customer.avatar} alt={order.customer.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-primary">{order.id}</span>
                      <Badge type="pill-color" size="sm" color={statusColors[order.status]}>
                        {order.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-tertiary truncate">
                      {order.customer.name} - {order.products}
                    </p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary">${order.total}</div>
                    <div className="text-xs text-tertiary">{order.date}</div>
                  </div>
                  <ChevronRight className="size-4 text-tertiary" />
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
                <div key={product.id} className="flex items-center gap-4 px-4 py-3 hover:bg-secondary/50 transition-colors">
                  <div className="relative size-12 overflow-hidden rounded-lg bg-secondary">
                    <Image src={product.image} alt={product.name} fill className="object-cover" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-primary truncate">{product.name}</h3>
                    <p className="text-xs text-tertiary">{product.sales} sales</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-primary">${product.revenue.toLocaleString()}</div>
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
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Link
          href="/seller/products/new"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
            <Plus className="size-5 text-brand-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Add Product</h3>
            <p className="text-xs text-tertiary">List new item</p>
          </div>
        </Link>
        <Link
          href="/seller/orders"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-warning-50">
            <ShoppingCart01 className="size-5 text-warning-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Process Orders</h3>
            <p className="text-xs text-tertiary">5 pending</p>
          </div>
        </Link>
        <Link
          href="/seller/messages"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-error-50">
            <MessageSquare01 className="size-5 text-error-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Messages</h3>
            <p className="text-xs text-tertiary">3 unread</p>
          </div>
        </Link>
        <Link
          href="/seller/analytics"
          className="flex items-center gap-3 rounded-xl border border-secondary bg-primary p-4 transition-colors hover:border-brand-300"
        >
          <div className="flex size-10 items-center justify-center rounded-lg bg-success-50">
            <BarChart01 className="size-5 text-success-600" />
          </div>
          <div>
            <h3 className="text-sm font-medium text-primary">Analytics</h3>
            <p className="text-xs text-tertiary">View reports</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
