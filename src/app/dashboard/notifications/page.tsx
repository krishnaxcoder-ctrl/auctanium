"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Bell01,
  Check,
  Trophy01,
  TrendUp01,
  Truck01,
  MessageSquare01,
  AlertCircle,
  Heart,
  Settings01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const notifications = [
  {
    id: "1",
    type: "outbid",
    title: "You've been outbid!",
    message: "Someone placed a higher bid on Apple MacBook Pro 16\" M3 Max. Current bid: $2,850",
    time: "2 hours ago",
    read: false,
    icon: TrendUp01,
    color: "error",
    actionUrl: "/listing/2",
  },
  {
    id: "2",
    type: "shipped",
    title: "Order Shipped",
    message: "Your order ORD-2024-002 has been shipped. Tracking: 1Z999AA10123456785",
    time: "5 hours ago",
    read: false,
    icon: Truck01,
    color: "brand",
    actionUrl: "/dashboard/orders",
  },
  {
    id: "3",
    type: "message",
    title: "New Message",
    message: "TechStore Premium sent you a message about your recent order.",
    time: "6 hours ago",
    read: false,
    icon: MessageSquare01,
    color: "brand",
    actionUrl: "/dashboard/messages",
  },
  {
    id: "4",
    type: "won",
    title: "Congratulations! You won!",
    message: "You've won the auction for Sony PlayStation 5 Console Bundle for $485",
    time: "2 days ago",
    read: true,
    icon: Trophy01,
    color: "success",
    actionUrl: "/listing/4",
  },
  {
    id: "5",
    type: "ending",
    title: "Auction Ending Soon",
    message: "An item in your watchlist 'Bose QuietComfort Ultra' is ending in 3 hours.",
    time: "3 days ago",
    read: true,
    icon: AlertCircle,
    color: "warning",
    actionUrl: "/listing/6",
  },
  {
    id: "6",
    type: "watchlist",
    title: "Price Drop Alert",
    message: "iPad Pro 12.9\" M2 in your watchlist has a new bid below your threshold.",
    time: "4 days ago",
    read: true,
    icon: Heart,
    color: "error",
    actionUrl: "/listing/7",
  },
  {
    id: "7",
    type: "system",
    title: "Account Verified",
    message: "Your account has been verified. You can now access premium auctions.",
    time: "5 days ago",
    read: true,
    icon: Check,
    color: "success",
    actionUrl: "/dashboard/settings",
  },
];

const getIconColor = (color: string) => {
  switch (color) {
    case "success":
      return "text-success-600 bg-success-50";
    case "error":
      return "text-error-600 bg-error-50";
    case "warning":
      return "text-warning-600 bg-warning-50";
    default:
      return "text-brand-600 bg-brand-50";
  }
};

export default function NotificationsPage() {
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const unreadCount = notifications.filter(n => !n.read).length;
  const filteredNotifications = filter === "all" ? notifications : notifications.filter(n => !n.read);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <Bell01 className="size-7 text-brand-600" />
            Notifications
            {unreadCount > 0 && (
              <Badge type="pill-color" size="sm" color="error">
                {unreadCount} new
              </Badge>
            )}
          </h1>
          <p className="mt-1 text-tertiary">
            Stay updated on your auctions and orders
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button color="secondary" size="sm" iconLeading={Check}>
            Mark all read
          </Button>
          <Link href="/dashboard/settings">
            <Button color="secondary" size="sm" iconLeading={Settings01}>
              Settings
            </Button>
          </Link>
        </div>
      </div>

      {/* Filter Tabs */}
      <div className="flex gap-2">
        <button
          onClick={() => setFilter("all")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === "all"
              ? "bg-brand-600 text-white"
              : "bg-primary border border-secondary text-secondary hover:text-primary"
          }`}
        >
          All
        </button>
        <button
          onClick={() => setFilter("unread")}
          className={`px-4 py-2 text-sm font-medium rounded-lg transition-colors ${
            filter === "unread"
              ? "bg-brand-600 text-white"
              : "bg-primary border border-secondary text-secondary hover:text-primary"
          }`}
        >
          Unread ({unreadCount})
        </button>
      </div>

      {/* Notifications List */}
      <div className="bg-primary border border-secondary rounded-xl overflow-hidden">
        <div className="divide-y divide-secondary">
          {filteredNotifications.map((notification) => (
            <Link
              key={notification.id}
              href={notification.actionUrl}
              className={`flex items-start gap-4 p-4 transition-colors hover:bg-secondary ${
                !notification.read ? "bg-brand-50/30" : ""
              }`}
            >
              <div className={`flex size-10 items-center justify-center rounded-lg ${getIconColor(notification.color)}`}>
                <notification.icon className="size-5" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2">
                  <h3 className={`text-sm ${!notification.read ? "font-semibold text-primary" : "font-medium text-secondary"}`}>
                    {notification.title}
                  </h3>
                  {!notification.read && (
                    <div className="size-2 rounded-full bg-brand-600" />
                  )}
                </div>
                <p className="text-sm text-tertiary mt-0.5">{notification.message}</p>
                <p className="text-xs text-tertiary mt-2">{notification.time}</p>
              </div>
            </Link>
          ))}
        </div>

        {filteredNotifications.length === 0 && (
          <div className="p-8 text-center">
            <Bell01 className="size-12 text-tertiary mx-auto mb-3" />
            <p className="text-sm text-tertiary">No notifications to show</p>
          </div>
        )}
      </div>
    </div>
  );
}
