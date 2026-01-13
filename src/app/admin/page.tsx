"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Users01,
  Building07,
  Shield01,
  ShoppingCart01,
  Package,
  CurrencyDollar,
  TrendUp01,
  TrendDown01,
  ChevronRight,
  Plus,
  ArrowRight,
  Activity,
  Clock,
  AlertTriangle,
  CheckCircle,
  Eye,
  BarChart01,
  RefreshCw01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Platform Stats
const platformStats = [
  {
    label: "Total Revenue",
    value: "₹10,65,41,920",
    change: "+18.2%",
    trend: "up",
    icon: CurrencyDollar,
    color: "success",
    period: "vs last month",
  },
  {
    label: "Total Users",
    value: "12,847",
    change: "+324",
    trend: "up",
    icon: Users01,
    color: "brand",
    period: "this month",
  },
  {
    label: "Active Sellers",
    value: "1,234",
    change: "+56",
    trend: "up",
    icon: Shield01,
    color: "warning",
    period: "this month",
  },
  {
    label: "Total Orders",
    value: "8,492",
    change: "+12.5%",
    trend: "up",
    icon: ShoppingCart01,
    color: "brand",
    period: "vs last month",
  },
];

// Quick Stats
const quickStats = [
  { label: "Pending Orders", value: "156", icon: Clock, color: "warning" },
  { label: "Active Listings", value: "4,892", icon: Package, color: "brand" },
  { label: "New Users Today", value: "47", icon: Users01, color: "success" },
  { label: "Disputes", value: "12", icon: AlertTriangle, color: "error" },
];

// Recent Users
const recentUsers = [
  {
    id: "USR-001",
    name: "Priya Sharma",
    email: "priya.s@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "customer",
    status: "active",
    joined: "Dec 18, 2024",
  },
  {
    id: "USR-002",
    name: "Rahul Verma",
    email: "rahul.v@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "seller",
    status: "active",
    joined: "Dec 17, 2024",
  },
  {
    id: "USR-003",
    name: "Ananya Patel",
    email: "ananya.p@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "customer",
    status: "pending",
    joined: "Dec 17, 2024",
  },
  {
    id: "USR-004",
    name: "Vikram Singh",
    email: "vikram.s@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    role: "seller",
    status: "active",
    joined: "Dec 16, 2024",
  },
  {
    id: "USR-005",
    name: "Sneha Reddy",
    email: "sneha.r@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    role: "customer",
    status: "suspended",
    joined: "Dec 15, 2024",
  },
];

// Recent Orders
const recentOrders = [
  {
    id: "ORD-2024-001",
    customer: "Priya Sharma",
    seller: "Bharat Electronics",
    amount: 124999,
    status: "processing",
    date: "Dec 18, 2024",
  },
  {
    id: "ORD-2024-002",
    customer: "Rahul Verma",
    seller: "Gadget Bazaar",
    amount: 69999,
    status: "shipped",
    date: "Dec 17, 2024",
  },
  {
    id: "ORD-2024-003",
    customer: "Ananya Patel",
    seller: "ElectroMart",
    amount: 2999,
    status: "delivered",
    date: "Dec 16, 2024",
  },
  {
    id: "ORD-2024-004",
    customer: "Vikram Singh",
    seller: "Bharat Electronics",
    amount: 44999,
    status: "pending",
    date: "Dec 18, 2024",
  },
  {
    id: "ORD-2024-005",
    customer: "Sneha Reddy",
    seller: "Gadget Bazaar",
    amount: 34999,
    status: "disputed",
    date: "Dec 17, 2024",
  },
];

// Top Sellers
const topSellers = [
  {
    id: "1",
    name: "Bharat Electronics",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    revenue: 10409860,
    orders: 234,
    rating: 4.9,
  },
  {
    id: "2",
    name: "Gadget Bazaar",
    avatar: "https://images.unsplash.com/photo-1560250097-0b93528c311a?w=100&h=100&fit=crop",
    revenue: 8196250,
    orders: 189,
    rating: 4.8,
  },
  {
    id: "3",
    name: "ElectroMart",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=100&h=100&fit=crop",
    revenue: 7247560,
    orders: 156,
    rating: 4.7,
  },
  {
    id: "4",
    name: "Digital Dukaan",
    avatar: "https://images.unsplash.com/photo-1507591064344-4c6ce005b128?w=100&h=100&fit=crop",
    revenue: 6381870,
    orders: 134,
    rating: 4.6,
  },
];

// Recent Activity
const recentActivity = [
  { type: "user", message: "New user registered", detail: "priya.s@example.com", time: "2 min ago" },
  { type: "order", message: "Order completed", detail: "ORD-2024-001", time: "5 min ago" },
  { type: "seller", message: "New seller approved", detail: "Bharat Electronics", time: "15 min ago" },
  { type: "dispute", message: "Dispute opened", detail: "ORD-2024-005", time: "1 hour ago" },
  { type: "payment", message: "Payment processed", detail: "₹1,24,999", time: "2 hours ago" },
  { type: "listing", message: "New listing published", detail: "Samsung Galaxy S24 Ultra", time: "3 hours ago" },
];

// System Health
const systemHealth = [
  { service: "API Server", status: "operational", uptime: "99.99%" },
  { service: "Database", status: "operational", uptime: "99.97%" },
  { service: "Payment Gateway", status: "operational", uptime: "99.95%" },
  { service: "CDN", status: "degraded", uptime: "98.50%" },
];

const statusColors: Record<string, "success" | "brand" | "warning" | "error"> = {
  delivered: "success",
  shipped: "brand",
  processing: "warning",
  pending: "gray" as "warning",
  disputed: "error",
};

const roleColors: Record<string, "brand" | "warning"> = {
  customer: "brand",
  seller: "warning",
};

const userStatusColors: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  pending: "warning",
  suspended: "error",
};

export default function AdminDashboard() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>
          <p className="text-sm text-gray-500">Welcome back! Here's your platform overview.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={RefreshCw01}>
            Refresh
          </Button>
          <Button color="secondary" size="sm" iconLeading={BarChart01}>
            Reports
          </Button>
          <Button color="primary" size="sm" iconLeading={Plus}>
            Add User
          </Button>
        </div>
      </div>

      {/* Platform Stats */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {platformStats.map((stat) => (
          <div
            key={stat.label}
            className="rounded-xl border border-gray-200 bg-white p-5"
          >
            <div className="flex items-center justify-between">
              <div className={`flex size-12 items-center justify-center rounded-lg ${
                stat.color === "success" ? "bg-green-50" :
                stat.color === "brand" ? "bg-brand-50" :
                "bg-amber-50"
              }`}>
                <stat.icon className={`size-6 ${
                  stat.color === "success" ? "text-green-600" :
                  stat.color === "brand" ? "text-brand-600" :
                  "text-amber-600"
                }`} />
              </div>
              <div className={`flex items-center gap-1 text-xs font-medium ${
                stat.trend === "up" ? "text-green-600" : "text-red-600"
              }`}>
                {stat.trend === "up" ? (
                  <TrendUp01 className="size-3" />
                ) : (
                  <TrendDown01 className="size-3" />
                )}
                {stat.change}
              </div>
            </div>
            <div className="mt-4">
              <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-sm text-gray-500">{stat.label}</div>
              <div className="text-xs text-gray-500 mt-1">{stat.period}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        {quickStats.map((stat) => (
          <div
            key={stat.label}
            className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4"
          >
            <div className={`flex size-10 items-center justify-center rounded-lg ${
              stat.color === "success" ? "bg-green-50" :
              stat.color === "brand" ? "bg-brand-50" :
              stat.color === "warning" ? "bg-amber-50" :
              "bg-red-50"
            }`}>
              <stat.icon className={`size-5 ${
                stat.color === "success" ? "text-green-600" :
                stat.color === "brand" ? "text-brand-600" :
                stat.color === "warning" ? "text-amber-600" :
                "text-red-600"
              }`} />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{stat.value}</div>
              <div className="text-xs text-gray-500">{stat.label}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Content Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Left Column - Users & Orders */}
        <div className="space-y-6 lg:col-span-2">
          {/* Recent Users */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Users</h2>
              <Link href="/admin/users" className="text-sm font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="divide-y divide-gray-100">
              {recentUsers.map((user) => (
                <div key={user.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <Avatar src={user.avatar} alt={user.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-900">{user.name}</span>
                      <Badge type="pill-color" size="sm" color={roleColors[user.role]}>
                        {user.role}
                      </Badge>
                      <Badge type="pill-color" size="sm" color={userStatusColors[user.status]}>
                        {user.status}
                      </Badge>
                    </div>
                    <p className="text-xs text-gray-500 truncate">{user.email}</p>
                  </div>
                  <div className="text-right hidden sm:block">
                    <div className="text-xs text-gray-500">Joined</div>
                    <div className="text-sm text-gray-900">{user.joined}</div>
                  </div>
                  <ChevronRight className="size-4 text-gray-500" />
                </div>
              ))}
            </div>
          </div>

          {/* Recent Orders */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="flex items-center justify-between border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Orders</h2>
              <Link href="/admin/orders" className="text-sm font-medium text-brand-600 hover:underline">
                View all
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 bg-gray-50">
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Seller</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                    <th className="px-5 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-100">
                  {recentOrders.map((order) => (
                    <tr key={order.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-5 py-4 text-sm font-medium text-brand-600">{order.id}</td>
                      <td className="px-5 py-4 text-sm text-gray-900">{order.customer}</td>
                      <td className="px-5 py-4 text-sm text-gray-500">{order.seller}</td>
                      <td className="px-5 py-4 text-sm font-semibold text-gray-900">₹{order.amount.toLocaleString('en-IN')}</td>
                      <td className="px-5 py-4">
                        <Badge type="pill-color" size="sm" color={statusColors[order.status]}>
                          {order.status}
                        </Badge>
                      </td>
                      <td className="px-5 py-4 text-sm text-gray-500">{order.date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column - Sellers, Activity, System */}
        <div className="space-y-6">
          {/* Top Sellers */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">Top Sellers</h2>
            </div>
            <div className="divide-y divide-gray-100">
              {topSellers.map((seller, index) => (
                <div key={seller.id} className="flex items-center gap-4 px-5 py-4 hover:bg-gray-50 transition-colors">
                  <div className="flex size-8 items-center justify-center rounded-full bg-brand-50 text-sm font-bold text-brand-600">
                    {index + 1}
                  </div>
                  <Avatar src={seller.avatar} alt={seller.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-medium text-gray-900 truncate">{seller.name}</h3>
                    <p className="text-xs text-gray-500">{seller.orders} orders</p>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">₹{seller.revenue.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-amber-600">★ {seller.rating}</div>
                  </div>
                </div>
              ))}
            </div>
            <div className="border-t border-gray-200 px-5 py-3">
              <Link href="/admin/sellers" className="text-sm font-medium text-brand-600 hover:underline">
                View all sellers →
              </Link>
            </div>
          </div>

          {/* Recent Activity */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <h2 className="text-base font-semibold text-gray-900">Recent Activity</h2>
            </div>
            <div className="divide-y divide-gray-100 max-h-72 overflow-y-auto">
              {recentActivity.map((activity, index) => (
                <div key={index} className="flex items-start gap-3 px-5 py-3">
                  <div className={`mt-1 size-2 rounded-full flex-shrink-0 ${
                    activity.type === "user" ? "bg-brand-600" :
                    activity.type === "order" ? "bg-green-500" :
                    activity.type === "seller" ? "bg-amber-500" :
                    activity.type === "dispute" ? "bg-red-500" :
                    activity.type === "payment" ? "bg-emerald-500" :
                    "bg-gray-400"
                  }`} />
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-900">
                      {activity.message} <span className="font-medium text-brand-600">{activity.detail}</span>
                    </p>
                    <p className="text-xs text-gray-500">{activity.time}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* System Health */}
          <div className="rounded-xl border border-gray-200 bg-white">
            <div className="border-b border-gray-200 px-5 py-4">
              <div className="flex items-center justify-between">
                <h2 className="text-base font-semibold text-gray-900">System Health</h2>
                <Activity className="size-5 text-green-500" />
              </div>
            </div>
            <div className="divide-y divide-gray-100">
              {systemHealth.map((service) => (
                <div key={service.service} className="flex items-center justify-between px-5 py-3">
                  <div className="flex items-center gap-3">
                    <div className={`size-2 rounded-full ${
                      service.status === "operational" ? "bg-green-500" : "bg-amber-500"
                    }`} />
                    <span className="text-sm text-gray-900">{service.service}</span>
                  </div>
                  <div className="text-right">
                    <span className={`text-xs font-medium ${
                      service.status === "operational" ? "text-green-600" : "text-amber-600"
                    }`}>
                      {service.status}
                    </span>
                    <p className="text-xs text-gray-500">{service.uptime} uptime</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <Link
          href="/admin/users"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm"
        >
          <div className="flex size-12 items-center justify-center rounded-lg bg-brand-50">
            <Users01 className="size-6 text-brand-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Manage Users</h3>
            <p className="text-xs text-gray-500">12,847 total</p>
          </div>
        </Link>
        <Link
          href="/admin/sellers"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm"
        >
          <div className="flex size-12 items-center justify-center rounded-lg bg-amber-50">
            <Shield01 className="size-6 text-amber-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Manage Sellers</h3>
            <p className="text-xs text-gray-500">1,234 active</p>
          </div>
        </Link>
        <Link
          href="/admin/orders"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm"
        >
          <div className="flex size-12 items-center justify-center rounded-lg bg-green-50">
            <ShoppingCart01 className="size-6 text-green-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">View Orders</h3>
            <p className="text-xs text-gray-500">156 pending</p>
          </div>
        </Link>
        <Link
          href="/admin/analytics"
          className="flex items-center gap-4 rounded-xl border border-gray-200 bg-white p-4 transition-all hover:border-brand-300 hover:shadow-sm"
        >
          <div className="flex size-12 items-center justify-center rounded-lg bg-purple-50">
            <BarChart01 className="size-6 text-purple-600" />
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-900">Analytics</h3>
            <p className="text-xs text-gray-500">View reports</p>
          </div>
        </Link>
      </div>
    </div>
  );
}
