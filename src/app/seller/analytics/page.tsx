"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CurrencyDollar,
  TrendUp01,
  TrendDown01,
  ShoppingCart01,
  Users01,
  Eye,
  Clock,
  Target01,
  Globe01,
  Calendar,
  ChevronDown,
  ArrowUp,
  ArrowDown,
  Package,
  RefreshCw01,
  Download01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Time period options
const timePeriods = [
  { label: "Last 7 days", value: "7d" },
  { label: "Last 30 days", value: "30d" },
  { label: "Last 90 days", value: "90d" },
  { label: "This Year", value: "1y" },
];

// Key Metrics
const keyMetrics = [
  {
    label: "Total Revenue",
    value: "$127,854",
    change: "+18.2%",
    trend: "up",
    previousValue: "$108,234",
    icon: CurrencyDollar,
    color: "success",
  },
  {
    label: "Total Orders",
    value: "1,284",
    change: "+12.5%",
    trend: "up",
    previousValue: "1,141",
    icon: ShoppingCart01,
    color: "brand",
  },
  {
    label: "Unique Visitors",
    value: "45,231",
    change: "+24.8%",
    trend: "up",
    previousValue: "36,243",
    icon: Users01,
    color: "brand",
  },
  {
    label: "Conversion Rate",
    value: "2.84%",
    change: "-0.3%",
    trend: "down",
    previousValue: "3.14%",
    icon: Target01,
    color: "warning",
  },
];

// Revenue data for chart (last 12 months)
const revenueData = [
  { month: "Jan", revenue: 8500, orders: 95 },
  { month: "Feb", revenue: 9200, orders: 108 },
  { month: "Mar", revenue: 11500, orders: 124 },
  { month: "Apr", revenue: 10800, orders: 118 },
  { month: "May", revenue: 13200, orders: 142 },
  { month: "Jun", revenue: 12100, orders: 135 },
  { month: "Jul", revenue: 14500, orders: 156 },
  { month: "Aug", revenue: 13800, orders: 149 },
  { month: "Sep", revenue: 15200, orders: 168 },
  { month: "Oct", revenue: 16800, orders: 182 },
  { month: "Nov", revenue: 18500, orders: 198 },
  { month: "Dec", revenue: 21200, orders: 224 },
];

// Traffic sources
const trafficSources = [
  { source: "Organic Search", visitors: 18500, percentage: 41, color: "bg-brand-500" },
  { source: "Direct", visitors: 12300, percentage: 27, color: "bg-success-500" },
  { source: "Social Media", visitors: 8100, percentage: 18, color: "bg-warning-500" },
  { source: "Referral", visitors: 4200, percentage: 9, color: "bg-error-500" },
  { source: "Email", visitors: 2131, percentage: 5, color: "bg-purple-500" },
];

// Top performing products
const topProducts = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    category: "Laptops",
    views: 12450,
    sales: 124,
    revenue: 309876,
    conversionRate: 1.0,
    trend: "up",
    change: "+15.2%",
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max",
    category: "Smartphones",
    views: 28900,
    sales: 245,
    revenue: 293755,
    conversionRate: 0.85,
    trend: "up",
    change: "+22.8%",
  },
  {
    id: "3",
    name: "AirPods Pro 2nd Gen",
    category: "Audio",
    views: 19200,
    sales: 389,
    revenue: 96861,
    conversionRate: 2.03,
    trend: "up",
    change: "+8.5%",
  },
  {
    id: "4",
    name: "iPad Pro 12.9\"",
    category: "Tablets",
    views: 8900,
    sales: 78,
    revenue: 93462,
    conversionRate: 0.88,
    trend: "down",
    change: "-3.2%",
  },
  {
    id: "5",
    name: "Apple Watch Ultra 2",
    category: "Wearables",
    views: 15600,
    sales: 156,
    revenue: 124644,
    conversionRate: 1.0,
    trend: "up",
    change: "+18.9%",
  },
];

// Customer demographics
const customerDemographics = {
  ageGroups: [
    { group: "18-24", percentage: 15, count: 768 },
    { group: "25-34", percentage: 35, count: 1792 },
    { group: "35-44", percentage: 28, count: 1434 },
    { group: "45-54", percentage: 14, count: 717 },
    { group: "55+", percentage: 8, count: 410 },
  ],
  topLocations: [
    { location: "United States", visitors: 18500, orders: 520, revenue: 52340 },
    { location: "United Kingdom", visitors: 8200, orders: 234, revenue: 23450 },
    { location: "Canada", visitors: 6100, orders: 178, revenue: 18920 },
    { location: "Germany", visitors: 4800, orders: 142, revenue: 15680 },
    { location: "Australia", visitors: 3900, orders: 118, revenue: 12450 },
  ],
};

// Hourly traffic pattern
const hourlyTraffic = [
  15, 12, 8, 5, 4, 6, 12, 25, 45, 62, 78, 85,
  92, 88, 82, 75, 68, 72, 80, 75, 58, 42, 28, 18,
];

// Recent analytics events
const recentEvents = [
  { type: "peak", message: "Traffic peak detected", detail: "1,245 visitors/hour", time: "2 hours ago" },
  { type: "conversion", message: "High conversion rate", detail: "MacBook Pro page - 4.2%", time: "5 hours ago" },
  { type: "trend", message: "Trending product", detail: "AirPods Pro +45% views", time: "8 hours ago" },
  { type: "milestone", message: "Monthly milestone", detail: "1,000+ orders this month", time: "1 day ago" },
];

export default function SellerAnalytics() {
  const [selectedPeriod, setSelectedPeriod] = useState("30d");
  const [showPeriodDropdown, setShowPeriodDropdown] = useState(false);

  const maxRevenue = Math.max(...revenueData.map((d) => d.revenue));
  const maxHourlyTraffic = Math.max(...hourlyTraffic);

  return (
    <div className="space-y-6 p-4 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">Analytics</h1>
          <p className="text-sm text-tertiary">Track your store performance and insights</p>
        </div>
        <div className="flex items-center gap-3">
          {/* Period Selector */}
          <div className="relative">
            <Button
              color="secondary"
              size="sm"
              iconLeading={Calendar}
              iconTrailing={ChevronDown}
              onClick={() => setShowPeriodDropdown(!showPeriodDropdown)}
            >
              {timePeriods.find((p) => p.value === selectedPeriod)?.label}
            </Button>
            {showPeriodDropdown && (
              <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-secondary bg-primary py-1 shadow-lg">
                {timePeriods.map((period) => (
                  <button
                    key={period.value}
                    onClick={() => {
                      setSelectedPeriod(period.value);
                      setShowPeriodDropdown(false);
                    }}
                    className={`w-full px-3 py-2 text-left text-sm transition-colors ${
                      selectedPeriod === period.value
                        ? "bg-brand-50 text-brand-700"
                        : "text-secondary hover:bg-secondary hover:text-primary"
                    }`}
                  >
                    {period.label}
                  </button>
                ))}
              </div>
            )}
          </div>
          <Button color="secondary" size="sm" iconLeading={RefreshCw01}>
            Refresh
          </Button>
          <Button color="primary" size="sm" iconLeading={Download01}>
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-2 gap-4 lg:grid-cols-4">
        {keyMetrics.map((metric) => (
          <div
            key={metric.label}
            className="rounded-xl border border-secondary bg-primary p-4"
          >
            <div className="flex items-center justify-between">
              <div
                className={`flex size-10 items-center justify-center rounded-lg ${
                  metric.color === "success"
                    ? "bg-success-50"
                    : metric.color === "brand"
                    ? "bg-brand-50"
                    : "bg-warning-50"
                }`}
              >
                <metric.icon
                  className={`size-5 ${
                    metric.color === "success"
                      ? "text-success-600"
                      : metric.color === "brand"
                      ? "text-brand-600"
                      : "text-warning-600"
                  }`}
                />
              </div>
              <div
                className={`flex items-center gap-1 text-xs font-medium ${
                  metric.trend === "up" ? "text-success-600" : "text-error-600"
                }`}
              >
                {metric.trend === "up" ? (
                  <TrendUp01 className="size-3" />
                ) : (
                  <TrendDown01 className="size-3" />
                )}
                {metric.change}
              </div>
            </div>
            <div className="mt-3">
              <div className="text-2xl font-semibold text-primary">{metric.value}</div>
              <div className="text-xs text-tertiary">{metric.label}</div>
              <div className="mt-1 text-xs text-quaternary">
                vs. {metric.previousValue} previous period
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Main Charts Grid */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Revenue Chart - Takes 2 columns */}
        <div className="rounded-xl border border-secondary bg-primary lg:col-span-2">
          <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-primary">Revenue Overview</h2>
              <p className="text-xs text-tertiary">Monthly revenue and order trends</p>
            </div>
            <div className="flex items-center gap-4 text-xs">
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-brand-500" />
                <span className="text-tertiary">Revenue</span>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="size-2.5 rounded-full bg-success-500" />
                <span className="text-tertiary">Orders</span>
              </div>
            </div>
          </div>
          <div className="p-4">
            <div className="flex items-end justify-between gap-2" style={{ height: "200px" }}>
              {revenueData.map((data, i) => (
                <div key={i} className="flex flex-1 flex-col items-center gap-1">
                  <div className="relative flex w-full flex-col items-center gap-0.5" style={{ height: "180px" }}>
                    {/* Revenue bar */}
                    <div
                      className="absolute bottom-0 w-3/4 rounded-t bg-brand-500 transition-all hover:bg-brand-600"
                      style={{ height: `${(data.revenue / maxRevenue) * 100}%` }}
                      title={`Revenue: $${data.revenue.toLocaleString()}`}
                    />
                    {/* Orders indicator dot */}
                    <div
                      className="absolute left-1/2 size-2 -translate-x-1/2 rounded-full bg-success-500"
                      style={{ bottom: `${(data.orders / 250) * 100}%` }}
                      title={`Orders: ${data.orders}`}
                    />
                  </div>
                  <span className="text-xs text-tertiary">{data.month}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Traffic Sources */}
        <div className="rounded-xl border border-secondary bg-primary">
          <div className="border-b border-secondary px-4 py-3">
            <h2 className="text-sm font-semibold text-primary">Traffic Sources</h2>
            <p className="text-xs text-tertiary">Where your visitors come from</p>
          </div>
          <div className="p-4 space-y-4">
            {trafficSources.map((source) => (
              <div key={source.source} className="space-y-2">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-primary">{source.source}</span>
                  <span className="font-medium text-primary">{source.percentage}%</span>
                </div>
                <div className="h-2 w-full overflow-hidden rounded-full bg-secondary">
                  <div
                    className={`h-full rounded-full ${source.color} transition-all`}
                    style={{ width: `${source.percentage}%` }}
                  />
                </div>
                <div className="text-xs text-tertiary">{source.visitors.toLocaleString()} visitors</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Secondary Charts Row */}
      <div className="grid gap-6 lg:grid-cols-2">
        {/* Hourly Traffic Pattern */}
        <div className="rounded-xl border border-secondary bg-primary">
          <div className="border-b border-secondary px-4 py-3">
            <h2 className="text-sm font-semibold text-primary">Traffic by Hour</h2>
            <p className="text-xs text-tertiary">Average visitors per hour (today)</p>
          </div>
          <div className="p-4">
            <div className="flex items-end gap-1" style={{ height: "120px" }}>
              {hourlyTraffic.map((traffic, i) => (
                <div
                  key={i}
                  className="flex-1 rounded-t bg-brand-200 transition-all hover:bg-brand-400"
                  style={{ height: `${(traffic / maxHourlyTraffic) * 100}%` }}
                  title={`${i}:00 - ${traffic} visitors`}
                />
              ))}
            </div>
            <div className="mt-2 flex justify-between text-xs text-tertiary">
              <span>12am</span>
              <span>6am</span>
              <span>12pm</span>
              <span>6pm</span>
              <span>11pm</span>
            </div>
          </div>
        </div>

        {/* Customer Demographics - Age Groups */}
        <div className="rounded-xl border border-secondary bg-primary">
          <div className="border-b border-secondary px-4 py-3">
            <h2 className="text-sm font-semibold text-primary">Customer Demographics</h2>
            <p className="text-xs text-tertiary">Age distribution of your customers</p>
          </div>
          <div className="p-4">
            <div className="flex items-end justify-between gap-4" style={{ height: "120px" }}>
              {customerDemographics.ageGroups.map((group) => (
                <div key={group.group} className="flex flex-1 flex-col items-center gap-2">
                  <div
                    className="w-full rounded-t bg-success-500 transition-all hover:bg-success-600"
                    style={{ height: `${(group.percentage / 35) * 100}%` }}
                    title={`${group.count.toLocaleString()} customers`}
                  />
                  <div className="text-center">
                    <div className="text-xs font-medium text-primary">{group.percentage}%</div>
                    <div className="text-xs text-tertiary">{group.group}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Product Performance & Geographic Data */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Top Products Table */}
        <div className="rounded-xl border border-secondary bg-primary lg:col-span-2">
          <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
            <div>
              <h2 className="text-sm font-semibold text-primary">Product Performance</h2>
              <p className="text-xs text-tertiary">Your best selling products</p>
            </div>
            <Link href="/seller/products" className="text-xs font-medium text-brand-600 hover:underline">
              View all
            </Link>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full">
              <thead>
                <tr className="border-b border-secondary text-left text-xs text-tertiary">
                  <th className="px-4 py-3 font-medium">Product</th>
                  <th className="px-4 py-3 font-medium text-right">Views</th>
                  <th className="px-4 py-3 font-medium text-right">Sales</th>
                  <th className="px-4 py-3 font-medium text-right">Revenue</th>
                  <th className="px-4 py-3 font-medium text-right">Conv.</th>
                  <th className="px-4 py-3 font-medium text-right">Trend</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-secondary">
                {topProducts.map((product) => (
                  <tr key={product.id} className="hover:bg-secondary/50 transition-colors">
                    <td className="px-4 py-3">
                      <div>
                        <div className="text-sm font-medium text-primary">{product.name}</div>
                        <div className="text-xs text-tertiary">{product.category}</div>
                      </div>
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-primary">
                      {product.views.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-primary">{product.sales}</td>
                    <td className="px-4 py-3 text-right text-sm font-medium text-primary">
                      ${product.revenue.toLocaleString()}
                    </td>
                    <td className="px-4 py-3 text-right text-sm text-primary">
                      {product.conversionRate}%
                    </td>
                    <td className="px-4 py-3 text-right">
                      <div
                        className={`inline-flex items-center gap-1 text-xs font-medium ${
                          product.trend === "up" ? "text-success-600" : "text-error-600"
                        }`}
                      >
                        {product.trend === "up" ? (
                          <ArrowUp className="size-3" />
                        ) : (
                          <ArrowDown className="size-3" />
                        )}
                        {product.change}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Geographic Data */}
        <div className="rounded-xl border border-secondary bg-primary">
          <div className="border-b border-secondary px-4 py-3">
            <div className="flex items-center gap-2">
              <Globe01 className="size-4 text-tertiary" />
              <h2 className="text-sm font-semibold text-primary">Top Locations</h2>
            </div>
            <p className="text-xs text-tertiary mt-0.5">Sales by country</p>
          </div>
          <div className="divide-y divide-secondary">
            {customerDemographics.topLocations.map((location, index) => (
              <div key={location.location} className="flex items-center justify-between px-4 py-3">
                <div className="flex items-center gap-3">
                  <span className="flex size-6 items-center justify-center rounded-full bg-secondary text-xs font-medium text-primary">
                    {index + 1}
                  </span>
                  <div>
                    <div className="text-sm font-medium text-primary">{location.location}</div>
                    <div className="text-xs text-tertiary">{location.orders} orders</div>
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-sm font-medium text-primary">
                    ${location.revenue.toLocaleString()}
                  </div>
                  <div className="text-xs text-tertiary">{location.visitors.toLocaleString()} visitors</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Recent Analytics Events */}
      <div className="grid gap-6 lg:grid-cols-3">
        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4 lg:col-span-2">
          <div className="rounded-xl border border-secondary bg-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
                <Eye className="size-5 text-brand-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-primary">3.2</div>
                <div className="text-xs text-tertiary">Avg. Pages/Session</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-secondary bg-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-success-50">
                <Clock className="size-5 text-success-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-primary">4:32</div>
                <div className="text-xs text-tertiary">Avg. Session Duration</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-secondary bg-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-warning-50">
                <Package className="size-5 text-warning-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-primary">$99.52</div>
                <div className="text-xs text-tertiary">Avg. Order Value</div>
              </div>
            </div>
          </div>
          <div className="rounded-xl border border-secondary bg-primary p-4">
            <div className="flex items-center gap-3">
              <div className="flex size-10 items-center justify-center rounded-lg bg-error-50">
                <RefreshCw01 className="size-5 text-error-600" />
              </div>
              <div>
                <div className="text-2xl font-semibold text-primary">28.4%</div>
                <div className="text-xs text-tertiary">Return Customer Rate</div>
              </div>
            </div>
          </div>
        </div>

        {/* Analytics Events */}
        <div className="rounded-xl border border-secondary bg-primary">
          <div className="border-b border-secondary px-4 py-3">
            <h2 className="text-sm font-semibold text-primary">Recent Insights</h2>
          </div>
          <div className="divide-y divide-secondary max-h-64 overflow-y-auto">
            {recentEvents.map((event, index) => (
              <div key={index} className="flex items-start gap-3 px-4 py-3">
                <div
                  className={`mt-0.5 size-2 flex-shrink-0 rounded-full ${
                    event.type === "peak"
                      ? "bg-brand-500"
                      : event.type === "conversion"
                      ? "bg-success-500"
                      : event.type === "trend"
                      ? "bg-warning-500"
                      : "bg-purple-500"
                  }`}
                />
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-primary">
                    {event.message}
                  </p>
                  <p className="text-xs font-medium text-brand-600">{event.detail}</p>
                  <p className="text-xs text-tertiary mt-0.5">{event.time}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
