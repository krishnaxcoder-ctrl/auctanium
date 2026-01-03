"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useUser } from "@clerk/nextjs";
import {
  Settings01,
  User01,
  Mail01,
  Lock01,
  Bell01,
  Shield01,
  Globe01,
  Camera01,
  Check,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

export default function SettingsPage() {
  const { user, isLoaded } = useUser();
  const [activeTab, setActiveTab] = useState<"profile" | "security" | "notifications" | "preferences">("profile");

  const tabs = [
    { id: "profile", label: "Profile", icon: User01 },
    { id: "security", label: "Security", icon: Lock01 },
    { id: "notifications", label: "Notifications", icon: Bell01 },
    { id: "preferences", label: "Preferences", icon: Settings01 },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
          <Settings01 className="size-7 text-brand-600" />
          Account Settings
        </h1>
        <p className="mt-1 text-tertiary">
          Manage your account settings and preferences
        </p>
      </div>

      <div className="grid gap-8 lg:grid-cols-4">
        {/* Sidebar Tabs */}
        <div className="lg:col-span-1">
          <div className="bg-primary border border-secondary rounded-xl p-2">
            <nav className="space-y-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={`w-full flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? "bg-brand-50 text-brand-700"
                      : "text-secondary hover:bg-secondary hover:text-primary"
                  }`}
                >
                  <tab.icon className="size-5" />
                  {tab.label}
                </button>
              ))}
            </nav>
          </div>
        </div>

        {/* Content */}
        <div className="lg:col-span-3">
            {/* Profile Tab */}
            {activeTab === "profile" && (
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Profile Information</h2>

                {/* Avatar */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="relative">
                    <div className="size-20 rounded-full overflow-hidden bg-brand-100">
                      {isLoaded && user?.imageUrl ? (
                        <Image src={user.imageUrl} alt="Profile" fill className="object-cover" />
                      ) : (
                        <div className="flex size-full items-center justify-center">
                          <User01 className="size-8 text-brand-600" />
                        </div>
                      )}
                    </div>
                    <button className="absolute bottom-0 right-0 flex size-8 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors">
                      <Camera01 className="size-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-primary">Profile Photo</h3>
                    <p className="text-xs text-tertiary">JPG, PNG or GIF. Max 2MB</p>
                  </div>
                </div>

                {/* Form */}
                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">First Name</label>
                      <input
                        type="text"
                        defaultValue={isLoaded ? user?.firstName || "" : ""}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Last Name</label>
                      <input
                        type="text"
                        defaultValue={isLoaded ? user?.lastName || "" : ""}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Email</label>
                    <input
                      type="email"
                      defaultValue={isLoaded ? user?.emailAddresses[0]?.emailAddress || "" : ""}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      disabled
                    />
                    <p className="text-xs text-tertiary mt-1">Contact support to change your email</p>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Phone Number</label>
                    <input
                      type="tel"
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1">Bio</label>
                    <textarea
                      rows={3}
                      placeholder="Tell us about yourself..."
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500 resize-none"
                    />
                  </div>
                  <div className="pt-4">
                    <Button color="primary" size="md">Save Changes</Button>
                  </div>
                </div>
              </div>
            )}

            {/* Security Tab */}
            {activeTab === "security" && (
              <div className="space-y-6">
                <div className="bg-primary border border-secondary rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-primary mb-6">Password</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Current Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">New Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <Button color="primary" size="md">Update Password</Button>
                  </div>
                </div>

                <div className="bg-primary border border-secondary rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-primary mb-4">Two-Factor Authentication</h2>
                  <p className="text-sm text-tertiary mb-4">Add an extra layer of security to your account</p>
                  <div className="flex items-center justify-between p-4 bg-secondary rounded-lg">
                    <div className="flex items-center gap-3">
                      <Shield01 className="size-5 text-success-600" />
                      <div>
                        <p className="text-sm font-medium text-primary">2FA Enabled</p>
                        <p className="text-xs text-tertiary">Using authenticator app</p>
                      </div>
                    </div>
                    <Badge type="pill-color" size="sm" color="success">Active</Badge>
                  </div>
                </div>
              </div>
            )}

            {/* Notifications Tab */}
            {activeTab === "notifications" && (
              <div className="bg-primary border border-secondary rounded-xl p-6">
                <h2 className="text-lg font-semibold text-primary mb-6">Notification Preferences</h2>
                <div className="space-y-4">
                  {[
                    { title: "Outbid Alerts", description: "Get notified when someone outbids you", enabled: true },
                    { title: "Auction Ending Soon", description: "Reminder when watched auctions are ending", enabled: true },
                    { title: "Won Auctions", description: "Notification when you win an auction", enabled: true },
                    { title: "Order Updates", description: "Shipping and delivery notifications", enabled: true },
                    { title: "New Messages", description: "Alert for new messages from sellers", enabled: true },
                    { title: "Price Drop Alerts", description: "When items in watchlist drop in price", enabled: false },
                    { title: "Newsletter", description: "Weekly deals and auction highlights", enabled: false },
                  ].map((item, index) => (
                    <div key={index} className="flex items-center justify-between py-3 border-b border-secondary last:border-0">
                      <div>
                        <p className="text-sm font-medium text-primary">{item.title}</p>
                        <p className="text-xs text-tertiary">{item.description}</p>
                      </div>
                      <button
                        className={`relative w-11 h-6 rounded-full transition-colors ${
                          item.enabled ? "bg-brand-600" : "bg-secondary"
                        }`}
                      >
                        <span
                          className={`absolute top-1 left-1 size-4 rounded-full bg-white transition-transform ${
                            item.enabled ? "translate-x-5" : ""
                          }`}
                        />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Preferences Tab */}
            {activeTab === "preferences" && (
              <div className="space-y-6">
                <div className="bg-primary border border-secondary rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-primary mb-6">Regional Settings</h2>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Language</label>
                      <select className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500">
                        <option>English (US)</option>
                        <option>Spanish</option>
                        <option>French</option>
                        <option>German</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Currency</label>
                      <select className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500">
                        <option>USD ($)</option>
                        <option>EUR (€)</option>
                        <option>GBP (£)</option>
                        <option>CAD (C$)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1">Timezone</label>
                      <select className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500">
                        <option>Pacific Time (PT)</option>
                        <option>Eastern Time (ET)</option>
                        <option>Central European Time (CET)</option>
                        <option>UTC</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="bg-primary border border-secondary rounded-xl p-6">
                  <h2 className="text-lg font-semibold text-primary mb-4">Danger Zone</h2>
                  <p className="text-sm text-tertiary mb-4">Permanently delete your account and all data</p>
                  <Button color="primary-destructive" size="md">Delete Account</Button>
                </div>
              </div>
            )}
        </div>
      </div>
    </div>
  );
}
