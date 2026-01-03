"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Settings01,
  Building01,
  CreditCard01,
  Truck01,
  Bell01,
  File06,
  Receipt,
  User01,
  Camera01,
  Plus,
  Trash01,
  Edit02,
  Check,
  Globe02,
  Mail01,
  Phone01,
  MarkerPin01,
  Bank,
  Clock,
  Package,
  ChevronRight,
  AlertCircle,
  ShieldTick,
  CurrencyDollar,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Toggle } from "@/components/base/toggle/toggle";
import { Select } from "@/components/base/select/select";

const tabs = [
  { id: "store", label: "Store Profile", icon: Building01 },
  { id: "business", label: "Business Info", icon: File06 },
  { id: "payments", label: "Payments", icon: CreditCard01 },
  { id: "shipping", label: "Shipping", icon: Truck01 },
  { id: "notifications", label: "Notifications", icon: Bell01 },
  { id: "policies", label: "Policies", icon: File06 },
  { id: "billing", label: "Billing", icon: Receipt },
];

const currencies = [
  { id: "usd", label: "USD ($)" },
  { id: "eur", label: "EUR (€)" },
  { id: "gbp", label: "GBP (£)" },
  { id: "inr", label: "INR (₹)" },
];

const countries = [
  { id: "us", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "ca", label: "Canada" },
  { id: "au", label: "Australia" },
  { id: "in", label: "India" },
];

const timezones = [
  { id: "pst", label: "Pacific Time (PT)" },
  { id: "est", label: "Eastern Time (ET)" },
  { id: "cet", label: "Central European Time (CET)" },
  { id: "ist", label: "India Standard Time (IST)" },
  { id: "utc", label: "UTC" },
];

const shippingZones = [
  { id: 1, name: "Domestic", countries: "United States", rates: 3 },
  { id: 2, name: "Canada", countries: "Canada", rates: 2 },
  { id: 3, name: "International", countries: "Rest of World", rates: 5 },
];

const invoices = [
  { id: "INV-2024-012", date: "Dec 15, 2024", amount: 29.99, status: "paid" },
  { id: "INV-2024-011", date: "Nov 15, 2024", amount: 29.99, status: "paid" },
  { id: "INV-2024-010", date: "Oct 15, 2024", amount: 29.99, status: "paid" },
  { id: "INV-2024-009", date: "Sep 15, 2024", amount: 29.99, status: "paid" },
];

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("store");

  // Store Profile State
  const [storeName, setStoreName] = useState("My Awesome Store");
  const [storeDescription, setStoreDescription] = useState("We sell the best products at competitive prices.");
  const [storeEmail, setStoreEmail] = useState("store@example.com");
  const [storePhone, setStorePhone] = useState("+1 (555) 123-4567");
  const [storeCurrency, setStoreCurrency] = useState("usd");
  const [storeTimezone, setStoreTimezone] = useState("pst");

  // Business Info State
  const [businessName, setBusinessName] = useState("My Store LLC");
  const [businessType, setBusinessType] = useState("llc");
  const [taxId, setTaxId] = useState("XX-XXXXXXX");
  const [businessAddress, setBusinessAddress] = useState("123 Business St");
  const [businessCity, setBusinessCity] = useState("San Francisco");
  const [businessState, setBusinessState] = useState("California");
  const [businessZip, setBusinessZip] = useState("94102");
  const [businessCountry, setBusinessCountry] = useState("us");

  // Payment State
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");
  const [minimumPayout, setMinimumPayout] = useState("50");

  // Notification State
  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderShipped: true,
    lowStock: true,
    newReview: true,
    newMessage: true,
    payoutComplete: true,
    weeklyReport: false,
    marketingEmails: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl font-semibold text-primary flex items-center gap-2">
          <Settings01 className="size-6" />
          Settings
        </h1>
        <p className="mt-1 text-sm text-tertiary">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-secondary overflow-x-auto">
        <nav className="flex gap-1 min-w-max">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-tertiary hover:text-primary hover:border-gray-300"
              }`}
            >
              <tab.icon className="size-4" />
              {tab.label}
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-6">
          {/* Store Profile Tab */}
          {activeTab === "store" && (
            <>
              {/* Store Logo & Banner */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Store Branding</h2>

                <div className="space-y-6">
                  {/* Logo */}
                  <div className="flex items-start gap-4">
                    <div className="relative">
                      <div className="size-20 rounded-xl overflow-hidden bg-secondary border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Building01 className="size-8 text-tertiary" />
                      </div>
                      <button className="absolute -bottom-1 -right-1 flex size-7 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors">
                        <Camera01 className="size-3.5" />
                      </button>
                    </div>
                    <div>
                      <h3 className="text-sm font-medium text-primary">Store Logo</h3>
                      <p className="text-xs text-tertiary mt-0.5">Recommended: 400x400px, PNG or JPG</p>
                      <Button color="secondary" size="sm" className="mt-2">
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  {/* Banner */}
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Store Banner</h3>
                    <div className="relative h-32 rounded-xl overflow-hidden bg-secondary border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Camera01 className="size-8 text-tertiary mx-auto mb-2" />
                        <p className="text-xs text-tertiary">Recommended: 1200x300px</p>
                      </div>
                    </div>
                    <Button color="secondary" size="sm" className="mt-2">
                      Upload Banner
                    </Button>
                  </div>
                </div>
              </div>

              {/* Store Information */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Store Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Store Name</label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Store Description</label>
                    <textarea
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-tertiary mt-1">This will appear on your store page</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Contact Email</label>
                      <input
                        type="email"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Contact Phone</label>
                      <input
                        type="tel"
                        value={storePhone}
                        onChange={(e) => setStorePhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Currency</label>
                      <Select
                        size="sm"
                        items={currencies}
                        selectedKey={storeCurrency}
                        onSelectionChange={(key) => setStoreCurrency(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Timezone</label>
                      <Select
                        size="sm"
                        items={timezones}
                        selectedKey={storeTimezone}
                        onSelectionChange={(key) => setStoreTimezone(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Business Info Tab */}
          {activeTab === "business" && (
            <>
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-primary">Business Details</h2>
                  <Badge type="pill-color" size="sm" color="success">
                    <ShieldTick className="size-3 mr-1" />
                    Verified
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Legal Business Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Business Type</label>
                      <Select
                        size="sm"
                        items={[
                          { id: "individual", label: "Individual / Sole Proprietor" },
                          { id: "llc", label: "LLC" },
                          { id: "corporation", label: "Corporation" },
                          { id: "partnership", label: "Partnership" },
                        ]}
                        selectedKey={businessType}
                        onSelectionChange={(key) => setBusinessType(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Tax ID / EIN</label>
                    <input
                      type="text"
                      value={taxId}
                      onChange={(e) => setTaxId(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                    <p className="text-xs text-tertiary mt-1">Required for tax reporting purposes</p>
                  </div>
                </div>
              </div>

              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Business Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Street Address</label>
                    <input
                      type="text"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">City</label>
                      <input
                        type="text"
                        value={businessCity}
                        onChange={(e) => setBusinessCity(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">State / Province</label>
                      <input
                        type="text"
                        value={businessState}
                        onChange={(e) => setBusinessState(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">ZIP / Postal Code</label>
                      <input
                        type="text"
                        value={businessZip}
                        onChange={(e) => setBusinessZip(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Country</label>
                    <Select
                      size="sm"
                      items={countries}
                      selectedKey={businessCountry}
                      onSelectionChange={(key) => setBusinessCountry(key as string)}
                    >
                      {(item) => <Select.Item id={item.id} label={item.label} />}
                    </Select>
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <>
              {/* Payout Account */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Payout Account</h2>

                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl mb-4">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-100">
                      <Bank className="size-6 text-brand-600" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">Bank Account ••••4567</p>
                      <p className="text-xs text-tertiary">Chase Bank - Checking</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge type="pill-color" size="sm" color="success">Default</Badge>
                    <Button color="secondary" size="sm" iconLeading={Edit02}>
                      Edit
                    </Button>
                  </div>
                </div>

                <Button color="secondary" size="sm" iconLeading={Plus}>
                  Add Payment Method
                </Button>
              </div>

              {/* Payout Settings */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Payout Settings</h2>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Payout Schedule</label>
                      <Select
                        size="sm"
                        items={[
                          { id: "daily", label: "Daily" },
                          { id: "weekly", label: "Weekly" },
                          { id: "biweekly", label: "Every 2 weeks" },
                          { id: "monthly", label: "Monthly" },
                        ]}
                        selectedKey={payoutSchedule}
                        onSelectionChange={(key) => setPayoutSchedule(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Minimum Payout Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
                        <input
                          type="number"
                          value={minimumPayout}
                          onChange={(e) => setMinimumPayout(e.target.value)}
                          className="w-full pl-7 pr-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                      </div>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Current Balance</h2>

                <div className="grid gap-4 sm:grid-cols-3">
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Available</p>
                    <p className="text-2xl font-semibold text-primary">$1,234.56</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Pending</p>
                    <p className="text-2xl font-semibold text-primary">$567.89</p>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Next Payout</p>
                    <p className="text-2xl font-semibold text-primary">Dec 22</p>
                  </div>
                </div>

                <Button color="primary" size="sm" className="mt-4">
                  Request Payout
                </Button>
              </div>
            </>
          )}

          {/* Shipping Tab */}
          {activeTab === "shipping" && (
            <>
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-lg font-semibold text-primary">Shipping Zones</h2>
                  <Button color="primary" size="sm" iconLeading={Plus}>
                    Add Zone
                  </Button>
                </div>

                <div className="space-y-3">
                  {shippingZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="flex items-center justify-between p-4 border border-secondary rounded-xl hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-4">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
                          <Globe02 className="size-5 text-brand-600" />
                        </div>
                        <div>
                          <p className="text-sm font-medium text-primary">{zone.name}</p>
                          <p className="text-xs text-tertiary">{zone.countries}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-4">
                        <span className="text-xs text-tertiary">{zone.rates} rates</span>
                        <ChevronRight className="size-4 text-tertiary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Shipping Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-secondary">
                    <div>
                      <p className="text-sm font-medium text-primary">Free shipping threshold</p>
                      <p className="text-xs text-tertiary">Offer free shipping on orders over a certain amount</p>
                    </div>
                    <Toggle size="sm" isSelected={true} onChange={() => {}} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Minimum order for free shipping</label>
                    <div className="relative max-w-[200px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
                      <input
                        type="number"
                        defaultValue="50"
                        className="w-full pl-7 pr-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-secondary">
                    <div>
                      <p className="text-sm font-medium text-primary">Calculated shipping rates</p>
                      <p className="text-xs text-tertiary">Show carrier-calculated rates at checkout</p>
                    </div>
                    <Toggle size="sm" isSelected={false} onChange={() => {}} />
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-primary border border-secondary rounded-xl p-6">
              <h2 className="text-lg font-semibold text-primary mb-6">Email Notifications</h2>

              <div className="space-y-1">
                {[
                  { key: "newOrder", title: "New Orders", description: "Get notified when you receive a new order" },
                  { key: "orderShipped", title: "Order Shipped", description: "Confirmation when orders are shipped" },
                  { key: "lowStock", title: "Low Stock Alerts", description: "Alert when products are running low" },
                  { key: "newReview", title: "New Reviews", description: "Notification for new product reviews" },
                  { key: "newMessage", title: "Customer Messages", description: "Alert for new customer inquiries" },
                  { key: "payoutComplete", title: "Payout Complete", description: "Confirmation when payouts are processed" },
                  { key: "weeklyReport", title: "Weekly Report", description: "Summary of your weekly sales and performance" },
                  { key: "marketingEmails", title: "Marketing & Tips", description: "Tips to grow your business" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-4 border-b border-secondary last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-primary">{item.title}</p>
                      <p className="text-xs text-tertiary">{item.description}</p>
                    </div>
                    <Toggle
                      size="sm"
                      isSelected={notifications[item.key as keyof typeof notifications]}
                      onChange={() => toggleNotification(item.key as keyof typeof notifications)}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button color="primary" size="sm">Save Preferences</Button>
              </div>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === "policies" && (
            <>
              {[
                {
                  title: "Return Policy",
                  description: "Define your return and refund policy",
                  content: "We accept returns within 30 days of purchase. Items must be unused and in original packaging.",
                },
                {
                  title: "Shipping Policy",
                  description: "Explain your shipping terms and delivery times",
                  content: "Orders are processed within 1-2 business days. Standard shipping takes 5-7 business days.",
                },
                {
                  title: "Privacy Policy",
                  description: "How you handle customer data",
                  content: "We respect your privacy and protect your personal information. See our full privacy policy for details.",
                },
              ].map((policy, index) => (
                <div key={index} className="bg-primary border border-secondary rounded-xl p-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h2 className="text-lg font-semibold text-primary">{policy.title}</h2>
                      <p className="text-xs text-tertiary">{policy.description}</p>
                    </div>
                    <Button color="secondary" size="sm" iconLeading={Edit02}>
                      Edit
                    </Button>
                  </div>
                  <div className="p-4 bg-secondary/50 rounded-lg">
                    <p className="text-sm text-secondary">{policy.content}</p>
                  </div>
                </div>
              ))}
            </>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <>
              {/* Current Plan */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Current Plan</h2>

                <div className="flex items-center justify-between p-4 bg-brand-50 rounded-xl border border-brand-200">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-brand-100">
                      <CurrencyDollar className="size-6 text-brand-600" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="text-lg font-semibold text-primary">Professional Plan</p>
                        <Badge type="pill-color" size="sm" color="brand">Active</Badge>
                      </div>
                      <p className="text-sm text-tertiary">$29.99/month • Renews on Jan 15, 2025</p>
                    </div>
                  </div>
                  <Button color="secondary" size="sm">
                    Change Plan
                  </Button>
                </div>

                <div className="grid gap-4 sm:grid-cols-3 mt-6">
                  <div className="p-4 border border-secondary rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Products Listed</p>
                    <p className="text-xl font-semibold text-primary">48 / 500</p>
                  </div>
                  <div className="p-4 border border-secondary rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Commission Rate</p>
                    <p className="text-xl font-semibold text-primary">8%</p>
                  </div>
                  <div className="p-4 border border-secondary rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Support Level</p>
                    <p className="text-xl font-semibold text-primary">Priority</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Payment Method</h2>

                <div className="flex items-center justify-between p-4 bg-secondary/50 rounded-xl">
                  <div className="flex items-center gap-4">
                    <div className="flex size-12 items-center justify-center rounded-xl bg-primary border border-secondary">
                      <CreditCard01 className="size-6 text-tertiary" />
                    </div>
                    <div>
                      <p className="text-sm font-medium text-primary">Visa ending in 4242</p>
                      <p className="text-xs text-tertiary">Expires 12/2025</p>
                    </div>
                  </div>
                  <Button color="secondary" size="sm" iconLeading={Edit02}>
                    Update
                  </Button>
                </div>
              </div>

              {/* Billing History */}
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Billing History</h2>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Invoice</th>
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Date</th>
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Amount</th>
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Status</th>
                        <th className="pb-3 text-right text-xs font-medium uppercase text-tertiary"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="py-3 text-sm font-medium text-primary">{invoice.id}</td>
                          <td className="py-3 text-sm text-secondary">{invoice.date}</td>
                          <td className="py-3 text-sm text-secondary">${invoice.amount}</td>
                          <td className="py-3">
                            <Badge type="pill-color" size="sm" color="success">
                              Paid
                            </Badge>
                          </td>
                          <td className="py-3 text-right">
                            <Button color="tertiary" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
