"use client";

import { useState } from "react";
import {
  BarChart01,
  TrendUp01,
  TrendDown01,
  CurrencyDollar,
  Users01,
  ShoppingCart01,
  Package,
  Calendar,
  Download01,
  RefreshCw01,
  Eye,
  Star01,
  ArrowRight,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Time period options
const timePeriods = [
  { label: "Today", value: "today" },
  { label: "Last 7 Days", value: "7d" },
  { label: "Last 30 Days", value: "30d" },
  { label: "Last 90 Days", value: "90d" },
  { label: "This Year", value: "year" },
];

// Revenue data for chart (in INR - lakhs)
const revenueData = [
  { month: "Jan", revenue: 3735000, orders: 234 },
  { month: "Feb", revenue: 4316000, orders: 287 },
  { month: "Mar", revenue: 3984000, orders: 256 },
  { month: "Apr", revenue: 5063000, orders: 312 },
  { month: "May", revenue: 4565000, orders: 289 },
  { month: "Jun", revenue: 5561000, orders: 345 },
  { month: "Jul", revenue: 5976000, orders: 378 },
  { month: "Aug", revenue: 5727000, orders: 356 },
  { month: "Sep", revenue: 6474000, orders: 402 },
  { month: "Oct", revenue: 6806000, orders: 423 },
  { month: "Nov", revenue: 7553000, orders: 467 },
  { month: "Dec", revenue: 8134000, orders: 512 },
];

// Top categories
const topCategories = [
  { name: "Electronics", sales: 3456, revenue: 74073350, percentage: 35 },
  { name: "Smartphones", sales: 2890, revenue: 56348700, percentage: 27 },
  { name: "Laptops", sales: 1234, revenue: 37912740, percentage: 18 },
  { name: "Audio", sales: 987, revenue: 19468480, percentage: 12 },
  { name: "Wearables", sales: 654, revenue: 15724350, percentage: 8 },
];

// Top performing sellers
const topSellers = [
  { name: "Bharat Electronics", revenue: 10409860, orders: 234, growth: 18.5 },
  { name: "Gadget Bazaar", revenue: 8196250, orders: 189, growth: 12.3 },
  { name: "ElectroMart", revenue: 7247560, orders: 156, growth: -2.4 },
  { name: "Digital Dukaan", revenue: 6381870, orders: 134, growth: 8.7 },
  { name: "Tech India", revenue: 5430690, orders: 112, growth: 15.2 },
];

// Traffic sources
const trafficSources = [
  { source: "Direct", visits: 45678, percentage: 38 },
  { source: "Organic Search", visits: 34567, percentage: 29 },
  { source: "Social Media", visits: 18934, percentage: 16 },
  { source: "Referral", visits: 12456, percentage: 10 },
  { source: "Email", visits: 8234, percentage: 7 },
];

export default function AnalyticsPage() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Analytics</h1>
          <p className="text-sm text-[#898989]">Platform performance metrics and insights.</p>
        </div>
        <div className="flex items-center gap-3">
          <select
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-600 focus:outline-none"
          >
            {timePeriods.map((period) => (
              <option key={period.value} value={period.value}>
                {period.label}
              </option>
            ))}
          </select>
          <Button color="secondary" size="sm" iconLeading={RefreshCw01}>
            Refresh
          </Button>
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-green-50">
              <CurrencyDollar className="size-6 text-green-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <TrendUp01 className="size-4" />
              +18.2%
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">₹10.6Cr</div>
            <div className="text-sm text-[#898989]">Total Revenue</div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-brand-600/10">
              <ShoppingCart01 className="size-6 text-brand-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <TrendUp01 className="size-4" />
              +12.5%
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">8,492</div>
            <div className="text-sm text-[#898989]">Total Orders</div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-purple-50">
              <Users01 className="size-6 text-purple-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <TrendUp01 className="size-4" />
              +324
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">12,847</div>
            <div className="text-sm text-[#898989]">Total Users</div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="flex items-center justify-between">
            <div className="flex size-12 items-center justify-center rounded-lg bg-amber-50">
              <Eye className="size-6 text-amber-600" />
            </div>
            <div className="flex items-center gap-1 text-sm font-medium text-red-600">
              <TrendDown01 className="size-4" />
              -2.3%
            </div>
          </div>
          <div className="mt-4">
            <div className="text-3xl font-bold text-gray-900">3.2%</div>
            <div className="text-sm text-[#898989]">Conversion Rate</div>
          </div>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="rounded-xl border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h2 className="text-lg font-semibold text-gray-900">Revenue Overview</h2>
            <p className="text-sm text-[#898989]">Monthly revenue for the current year</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-brand-600" />
              <span className="text-sm text-[#898989]">Revenue</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="size-3 rounded bg-green-500" />
              <span className="text-sm text-[#898989]">Orders</span>
            </div>
          </div>
        </div>
        <div className="flex items-end gap-2 h-64">
          {revenueData.map((data, index) => (
            <div key={data.month} className="flex-1 flex flex-col items-center gap-2">
              <div className="w-full flex items-end gap-1 h-48">
                <div
                  className="flex-1 bg-brand-600 rounded-t transition-all hover:bg-brand-600/80"
                  style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                  title={`₹${data.revenue.toLocaleString('en-IN')}`}
                />
                <div
                  className="flex-1 bg-green-500 rounded-t transition-all hover:bg-green-400"
                  style={{ height: `${(data.orders / 512) * 100}%` }}
                  title={`${data.orders} orders`}
                />
              </div>
              <span className="text-xs text-[#898989]">{data.month}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Two Column Layout */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Top Categories */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Categories</h2>
            <p className="text-sm text-[#898989]">Best performing product categories</p>
          </div>
          <div className="p-6 space-y-4">
            {topCategories.map((category, index) => (
              <div key={category.name} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="flex size-6 items-center justify-center rounded-full bg-brand-600/10 text-xs font-bold text-brand-600">
                      {index + 1}
                    </span>
                    <span className="text-sm font-medium text-gray-900">{category.name}</span>
                  </div>
                  <div className="text-right">
                    <div className="text-sm font-semibold text-gray-900">₹{category.revenue.toLocaleString('en-IN')}</div>
                    <div className="text-xs text-[#898989]">{category.sales.toLocaleString()} sales</div>
                  </div>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-100 overflow-hidden">
                  <div
                    className="h-full bg-brand-600 rounded-full transition-all"
                    style={{ width: `${category.percentage}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Top Sellers */}
        <div className="rounded-xl border border-gray-200 bg-white">
          <div className="border-b border-gray-200 px-6 py-4">
            <h2 className="text-lg font-semibold text-gray-900">Top Sellers</h2>
            <p className="text-sm text-[#898989]">Best performing sellers this period</p>
          </div>
          <div className="divide-y divide-gray-100">
            {topSellers.map((seller, index) => (
              <div key={seller.name} className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-3">
                  <span className="flex size-8 items-center justify-center rounded-full bg-brand-600/10 text-sm font-bold text-brand-600">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-gray-900">{seller.name}</div>
                    <div className="text-xs text-[#898989]">{seller.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-semibold text-gray-900">₹{seller.revenue.toLocaleString('en-IN')}</div>
                  <div className={`flex items-center gap-1 text-xs ${seller.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                    {seller.growth >= 0 ? <TrendUp01 className="size-3" /> : <TrendDown01 className="size-3" />}
                    {seller.growth >= 0 ? "+" : ""}{seller.growth}%
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Traffic Sources */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="border-b border-gray-200 px-6 py-4">
          <h2 className="text-lg font-semibold text-gray-900">Traffic Sources</h2>
          <p className="text-sm text-[#898989]">Where your visitors come from</p>
        </div>
        <div className="p-6">
          <div className="grid gap-4 sm:grid-cols-5">
            {trafficSources.map((source) => (
              <div key={source.source} className="rounded-xl border border-gray-200 p-4 text-center">
                <div className="text-2xl font-bold text-gray-900">{source.percentage}%</div>
                <div className="text-sm font-medium text-gray-900 mt-1">{source.source}</div>
                <div className="text-xs text-[#898989]">{source.visits.toLocaleString()} visits</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Stats Grid */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-[#898989] mb-2">Avg. Order Value</div>
          <div className="text-2xl font-bold text-gray-900">₹12,525</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
            <TrendUp01 className="size-3" />
            +5.2% vs last period
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-[#898989] mb-2">Customer Lifetime Value</div>
          <div className="text-2xl font-bold text-gray-900">₹45,750</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
            <TrendUp01 className="size-3" />
            +8.7% vs last period
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-[#898989] mb-2">Repeat Customer Rate</div>
          <div className="text-2xl font-bold text-gray-900">42%</div>
          <div className="flex items-center gap-1 text-xs text-green-600 mt-2">
            <TrendUp01 className="size-3" />
            +3.1% vs last period
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-5">
          <div className="text-sm text-[#898989] mb-2">Cart Abandonment Rate</div>
          <div className="text-2xl font-bold text-gray-900">28%</div>
          <div className="flex items-center gap-1 text-xs text-red-600 mt-2">
            <TrendUp01 className="size-3" />
            +1.5% vs last period
          </div>
        </div>
      </div>
    </div>
  );
}
