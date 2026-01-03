"use client";

import { useState } from "react";
import {
  Settings01,
  User01,
  Bell01,
  Shield01,
  CreditCard01,
  Mail01,
  Globe01,
  Palette,
  Key01,
  Building07,
  Percent01,
  Truck01,
  CheckCircle,
  AlertTriangle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const settingsTabs = [
  { id: "general", label: "General", icon: Settings01 },
  { id: "company", label: "Company", icon: Building07 },
  { id: "notifications", label: "Notifications", icon: Bell01 },
  { id: "security", label: "Security", icon: Shield01 },
  { id: "billing", label: "Billing", icon: CreditCard01 },
  { id: "api", label: "API Keys", icon: Key01 },
];

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("general");
  const [formData, setFormData] = useState({
    siteName: "Auctanium",
    siteUrl: "https://auctanium.com",
    adminEmail: "admin@auctanium.com",
    supportEmail: "support@auctanium.com",
    timezone: "America/New_York",
    currency: "USD",
    language: "en",
    maintenanceMode: false,
    sellerCommission: "10",
    minWithdrawal: "50",
    shippingEnabled: true,
  });

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Settings</h1>
          <p className="text-sm text-[#898989]">Manage your platform settings and configurations.</p>
        </div>
        <Button color="primary" size="sm" iconLeading={CheckCircle} className="bg-[#000080] hover:bg-[#000080]/90">
          Save Changes
        </Button>
      </div>

      <div className="flex flex-col gap-6 lg:flex-row">
        {/* Sidebar */}
        <div className="w-full lg:w-64 flex-shrink-0">
          <div className="rounded-xl border border-gray-200 bg-white p-2">
            <nav className="space-y-1">
              {settingsTabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-[#000080]/10 text-[#000080]"
                      : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  }`}
                >
                  <tab.icon className={`size-5 ${activeTab === tab.id ? "text-[#000080]" : "text-[#898989]"}`} />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {/* General Settings */}
          {activeTab === "general" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">General Settings</h2>
                  <p className="text-sm text-[#898989]">Basic platform configuration</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Site Name</label>
                      <input
                        type="text"
                        value={formData.siteName}
                        onChange={(e) => handleInputChange("siteName", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Site URL</label>
                      <input
                        type="url"
                        value={formData.siteUrl}
                        onChange={(e) => handleInputChange("siteUrl", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Admin Email</label>
                      <input
                        type="email"
                        value={formData.adminEmail}
                        onChange={(e) => handleInputChange("adminEmail", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Support Email</label>
                      <input
                        type="email"
                        value={formData.supportEmail}
                        onChange={(e) => handleInputChange("supportEmail", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Localization</h2>
                  <p className="text-sm text-[#898989]">Regional and language settings</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-3">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Timezone</label>
                      <select
                        value={formData.timezone}
                        onChange={(e) => handleInputChange("timezone", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none"
                      >
                        <option value="America/New_York">Eastern Time (ET)</option>
                        <option value="America/Chicago">Central Time (CT)</option>
                        <option value="America/Denver">Mountain Time (MT)</option>
                        <option value="America/Los_Angeles">Pacific Time (PT)</option>
                        <option value="UTC">UTC</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Currency</label>
                      <select
                        value={formData.currency}
                        onChange={(e) => handleInputChange("currency", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none"
                      >
                        <option value="USD">USD ($)</option>
                        <option value="EUR">EUR (€)</option>
                        <option value="GBP">GBP (£)</option>
                        <option value="CAD">CAD ($)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Language</label>
                      <select
                        value={formData.language}
                        onChange={(e) => handleInputChange("language", e.target.value)}
                        className="w-full rounded-lg border border-gray-200 px-4 py-2.5 text-sm text-gray-900 focus:border-[#000080] focus:outline-none"
                      >
                        <option value="en">English</option>
                        <option value="es">Spanish</option>
                        <option value="fr">French</option>
                        <option value="de">German</option>
                      </select>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Maintenance Mode</h2>
                  <p className="text-sm text-[#898989]">Control site availability</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">Enable Maintenance Mode</h3>
                      <p className="text-sm text-[#898989]">When enabled, only admins can access the site</p>
                    </div>
                    <button
                      onClick={() => handleInputChange("maintenanceMode", !formData.maintenanceMode)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.maintenanceMode ? "bg-[#000080]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                          formData.maintenanceMode ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Company Settings */}
          {activeTab === "company" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Commission Settings</h2>
                  <p className="text-sm text-[#898989]">Configure seller commissions and fees</p>
                </div>
                <div className="p-6 space-y-6">
                  <div className="grid gap-6 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Default Seller Commission (%)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.sellerCommission}
                          onChange={(e) => handleInputChange("sellerCommission", e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pr-12 text-sm text-gray-900 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
                        />
                        <Percent01 className="absolute right-4 top-1/2 -translate-y-1/2 size-4 text-[#898989]" />
                      </div>
                      <p className="mt-1 text-xs text-[#898989]">Platform fee charged on each sale</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-900 mb-2">Minimum Withdrawal ($)</label>
                      <div className="relative">
                        <input
                          type="number"
                          value={formData.minWithdrawal}
                          onChange={(e) => handleInputChange("minWithdrawal", e.target.value)}
                          className="w-full rounded-lg border border-gray-200 px-4 py-2.5 pl-8 text-sm text-gray-900 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
                        />
                        <span className="absolute left-4 top-1/2 -translate-y-1/2 text-[#898989]">$</span>
                      </div>
                      <p className="mt-1 text-xs text-[#898989]">Minimum amount for seller payouts</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Shipping Settings</h2>
                  <p className="text-sm text-[#898989]">Configure shipping options</p>
                </div>
                <div className="p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Truck01 className="size-5 text-[#898989]" />
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">Enable Shipping</h3>
                        <p className="text-sm text-[#898989]">Allow sellers to configure shipping options</p>
                      </div>
                    </div>
                    <button
                      onClick={() => handleInputChange("shippingEnabled", !formData.shippingEnabled)}
                      className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                        formData.shippingEnabled ? "bg-[#000080]" : "bg-gray-200"
                      }`}
                    >
                      <span
                        className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                          formData.shippingEnabled ? "translate-x-6" : "translate-x-1"
                        }`}
                      />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Notifications Settings */}
          {activeTab === "notifications" && (
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Email Notifications</h2>
                <p className="text-sm text-[#898989]">Configure which emails to receive</p>
              </div>
              <div className="divide-y divide-gray-100">
                {[
                  { label: "New user registrations", description: "Get notified when new users sign up" },
                  { label: "New seller applications", description: "Receive alerts for seller verification requests" },
                  { label: "Order updates", description: "Get notified about order status changes" },
                  { label: "Payment alerts", description: "Receive notifications for payment issues" },
                  { label: "Security alerts", description: "Get notified about suspicious activity" },
                  { label: "Weekly reports", description: "Receive weekly platform performance reports" },
                ].map((item, index) => (
                  <div key={index} className="flex items-center justify-between px-6 py-4">
                    <div>
                      <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                      <p className="text-sm text-[#898989]">{item.description}</p>
                    </div>
                    <button
                      className="relative inline-flex h-6 w-11 items-center rounded-full bg-[#000080] transition-colors"
                    >
                      <span className="inline-block size-4 transform rounded-full bg-white translate-x-6" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Security Settings */}
          {activeTab === "security" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <h2 className="text-lg font-semibold text-gray-900">Security Settings</h2>
                  <p className="text-sm text-[#898989]">Configure platform security options</p>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { label: "Two-Factor Authentication", description: "Require 2FA for admin accounts", enabled: true },
                    { label: "Session Timeout", description: "Auto logout after 30 minutes of inactivity", enabled: true },
                    { label: "IP Whitelisting", description: "Restrict admin access to specific IPs", enabled: false },
                    { label: "Audit Logging", description: "Log all admin actions for security review", enabled: true },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{item.label}</h3>
                        <p className="text-sm text-[#898989]">{item.description}</p>
                      </div>
                      <button
                        className={`relative inline-flex h-6 w-11 items-center rounded-full transition-colors ${
                          item.enabled ? "bg-[#000080]" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`inline-block size-4 transform rounded-full bg-white transition-transform ${
                            item.enabled ? "translate-x-6" : "translate-x-1"
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-amber-200 bg-amber-50 p-4">
                <div className="flex gap-3">
                  <AlertTriangle className="size-5 text-amber-600 flex-shrink-0" />
                  <div>
                    <h3 className="text-sm font-medium text-amber-800">Security Recommendation</h3>
                    <p className="text-sm text-amber-700 mt-1">
                      Enable IP Whitelisting to restrict admin panel access to trusted IP addresses only.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Billing Settings */}
          {activeTab === "billing" && (
            <div className="rounded-xl border border-gray-200 bg-white">
              <div className="border-b border-gray-200 px-6 py-4">
                <h2 className="text-lg font-semibold text-gray-900">Billing & Subscription</h2>
                <p className="text-sm text-[#898989]">Manage your plan and billing information</p>
              </div>
              <div className="p-6">
                <div className="rounded-lg border border-[#000080] bg-[#000080]/5 p-4 mb-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <Badge type="pill-color" size="sm" color="brand" className="bg-[#000080] text-white">
                        Enterprise Plan
                      </Badge>
                      <h3 className="text-lg font-semibold text-gray-900 mt-2">$499/month</h3>
                      <p className="text-sm text-[#898989]">Unlimited users, advanced analytics, priority support</p>
                    </div>
                    <Button color="secondary" size="sm">
                      Manage Plan
                    </Button>
                  </div>
                </div>
                <div className="space-y-4">
                  <h4 className="text-sm font-medium text-gray-900">Payment Method</h4>
                  <div className="flex items-center justify-between rounded-lg border border-gray-200 p-4">
                    <div className="flex items-center gap-3">
                      <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                        <CreditCard01 className="size-5 text-gray-600" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">•••• •••• •••• 4242</div>
                        <div className="text-xs text-[#898989]">Expires 12/26</div>
                      </div>
                    </div>
                    <Button color="secondary" size="sm">
                      Update
                    </Button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* API Keys Settings */}
          {activeTab === "api" && (
            <div className="space-y-6">
              <div className="rounded-xl border border-gray-200 bg-white">
                <div className="border-b border-gray-200 px-6 py-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-lg font-semibold text-gray-900">API Keys</h2>
                      <p className="text-sm text-[#898989]">Manage API keys for integrations</p>
                    </div>
                    <Button color="primary" size="sm" className="bg-[#000080] hover:bg-[#000080]/90">
                      Generate New Key
                    </Button>
                  </div>
                </div>
                <div className="divide-y divide-gray-100">
                  {[
                    { name: "Production API Key", key: "pk_live_****************************1234", created: "Dec 1, 2024", lastUsed: "2 hours ago" },
                    { name: "Test API Key", key: "pk_test_****************************5678", created: "Nov 15, 2024", lastUsed: "5 days ago" },
                  ].map((apiKey, index) => (
                    <div key={index} className="flex items-center justify-between px-6 py-4">
                      <div>
                        <h3 className="text-sm font-medium text-gray-900">{apiKey.name}</h3>
                        <p className="text-sm font-mono text-[#898989]">{apiKey.key}</p>
                        <p className="text-xs text-[#898989] mt-1">
                          Created {apiKey.created} • Last used {apiKey.lastUsed}
                        </p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button color="secondary" size="sm">
                          Copy
                        </Button>
                        <Button color="secondary" size="sm" className="text-red-600 hover:bg-red-50">
                          Revoke
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-xl border border-gray-200 bg-white p-6">
                <h3 className="text-sm font-medium text-gray-900 mb-4">API Documentation</h3>
                <p className="text-sm text-[#898989] mb-4">
                  Access our comprehensive API documentation to integrate with your applications.
                </p>
                <Button color="secondary" size="sm">
                  View Documentation
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
