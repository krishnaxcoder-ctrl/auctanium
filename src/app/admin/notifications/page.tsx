"use client";

import { useState } from "react";
import {
  Bell01,
  CheckCircle,
  AlertTriangle,
  AlertCircle,
  InfoCircle,
  Trash01,
  CheckDone01,
  Settings01,
  Users01,
  ShoppingCart01,
  CurrencyDollar,
  Clock,
  XClose,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Mock notifications data
const notificationsData = [
  {
    id: "NOT-001",
    type: "order",
    title: "New Order Received",
    message: "Order #ORD-2024-001 worth ₹1,24,999 has been placed by Priya Sharma.",
    time: "2 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: "NOT-002",
    type: "alert",
    title: "Low Stock Alert",
    message: "Samsung Galaxy S24 Ultra stock is running low (5 units remaining).",
    time: "15 minutes ago",
    read: false,
    priority: "high",
  },
  {
    id: "NOT-003",
    type: "user",
    title: "New Seller Registration",
    message: "Vikram Electronics has registered as a new seller and is awaiting approval.",
    time: "1 hour ago",
    read: false,
    priority: "medium",
  },
  {
    id: "NOT-004",
    type: "payment",
    title: "Payout Completed",
    message: "Weekly payout of ₹2,45,000 has been processed to Bharat Electronics.",
    time: "2 hours ago",
    read: true,
    priority: "low",
  },
  {
    id: "NOT-005",
    type: "warning",
    title: "Dispute Filed",
    message: "Customer Sneha Reddy has filed a dispute for order #ORD-2024-005.",
    time: "3 hours ago",
    read: true,
    priority: "high",
  },
  {
    id: "NOT-006",
    type: "info",
    title: "System Update",
    message: "Platform maintenance scheduled for Dec 20, 2024, 2:00 AM - 4:00 AM IST.",
    time: "5 hours ago",
    read: true,
    priority: "low",
  },
  {
    id: "NOT-007",
    type: "success",
    title: "Report Generated",
    message: "Monthly sales report for November 2024 is ready for download.",
    time: "1 day ago",
    read: true,
    priority: "low",
  },
  {
    id: "NOT-008",
    type: "user",
    title: "User Milestone",
    message: "Platform has reached 10,000 registered users! Congratulations!",
    time: "2 days ago",
    read: true,
    priority: "medium",
  },
];

const typeConfig: Record<string, { icon: typeof Bell01; color: string; bgColor: string }> = {
  order: { icon: ShoppingCart01, color: "text-[#000080]", bgColor: "bg-[#000080]/10" },
  alert: { icon: AlertTriangle, color: "text-amber-600", bgColor: "bg-amber-50" },
  user: { icon: Users01, color: "text-purple-600", bgColor: "bg-purple-50" },
  payment: { icon: CurrencyDollar, color: "text-green-600", bgColor: "bg-green-50" },
  warning: { icon: AlertCircle, color: "text-red-600", bgColor: "bg-red-50" },
  info: { icon: InfoCircle, color: "text-blue-600", bgColor: "bg-blue-50" },
  success: { icon: CheckCircle, color: "text-green-600", bgColor: "bg-green-50" },
};

const priorityColors: Record<string, "error" | "warning" | "gray"> = {
  high: "error",
  medium: "warning",
  low: "gray",
};

export default function NotificationsPage() {
  const [notifications, setNotifications] = useState(notificationsData);
  const [filter, setFilter] = useState<"all" | "unread">("all");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const unreadCount = notifications.filter(n => !n.read).length;

  const filteredNotifications = notifications.filter((notification) => {
    const matchesReadFilter = filter === "all" || !notification.read;
    const matchesTypeFilter = typeFilter === "all" || notification.type === typeFilter;
    return matchesReadFilter && matchesTypeFilter;
  });

  const markAsRead = (id: string) => {
    setNotifications(notifications.map(n =>
      n.id === id ? { ...n, read: true } : n
    ));
  };

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const clearAll = () => {
    setNotifications([]);
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Notifications</h1>
            {unreadCount > 0 && (
              <Badge type="pill-color" size="sm" color="error">
                {unreadCount} new
              </Badge>
            )}
          </div>
          <p className="text-sm text-[#898989]">Stay updated with platform activity.</p>
        </div>
        <div className="flex items-center gap-2 flex-shrink-0">
          <Button color="secondary" size="sm" iconLeading={CheckDone01} onClick={markAllAsRead}>
            <span className="hidden sm:inline">Mark all read</span>
            <span className="sm:hidden">Read all</span>
          </Button>
          <Button color="secondary" size="sm" iconLeading={Settings01}>
            <span className="hidden sm:inline">Settings</span>
          </Button>
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-[#000080]/10 flex-shrink-0">
              <Bell01 className="size-4 sm:size-5 text-[#000080]" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{notifications.length}</div>
              <div className="text-xs text-[#898989]">Total</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-red-50 flex-shrink-0">
              <Clock className="size-4 sm:size-5 text-red-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{unreadCount}</div>
              <div className="text-xs text-[#898989]">Unread</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-amber-50 flex-shrink-0">
              <AlertTriangle className="size-4 sm:size-5 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {notifications.filter(n => n.priority === "high").length}
              </div>
              <div className="text-xs text-[#898989]">High Priority</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-green-50 flex-shrink-0">
              <CheckCircle className="size-4 sm:size-5 text-green-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {notifications.filter(n => n.read).length}
              </div>
              <div className="text-xs text-[#898989]">Read</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex gap-2">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "all"
                  ? "bg-[#000080] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              All
            </button>
            <button
              onClick={() => setFilter("unread")}
              className={`px-3 sm:px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                filter === "unread"
                  ? "bg-[#000080] text-white"
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              Unread ({unreadCount})
            </button>
          </div>
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-[#000080] focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="order">Orders</option>
              <option value="user">Users</option>
              <option value="payment">Payments</option>
              <option value="alert">Alerts</option>
              <option value="warning">Warnings</option>
            </select>
            <button
              onClick={clearAll}
              className="text-sm text-red-600 hover:text-red-700 font-medium"
            >
              Clear all
            </button>
          </div>
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        {filteredNotifications.length === 0 ? (
          <div className="p-8 text-center">
            <div className="flex size-16 items-center justify-center rounded-full bg-gray-100 mx-auto">
              <Bell01 className="size-8 text-gray-400" />
            </div>
            <h3 className="mt-4 text-lg font-semibold text-gray-900">No notifications</h3>
            <p className="mt-1 text-sm text-[#898989]">You're all caught up!</p>
          </div>
        ) : (
          <div className="divide-y divide-gray-100">
            {filteredNotifications.map((notification) => {
              const typeInfo = typeConfig[notification.type];
              const Icon = typeInfo.icon;
              return (
                <div
                  key={notification.id}
                  className={`p-3 sm:p-4 transition-colors hover:bg-gray-50 ${
                    !notification.read ? "bg-[#000080]/5" : ""
                  }`}
                >
                  <div className="flex items-start gap-3">
                    <div className={`flex size-8 sm:size-10 items-center justify-center rounded-lg ${typeInfo.bgColor} flex-shrink-0`}>
                      <Icon className={`size-4 sm:size-5 ${typeInfo.color}`} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-2">
                        <div className="min-w-0">
                          <div className="flex items-center gap-2 flex-wrap">
                            <h3 className={`text-sm font-medium ${!notification.read ? "text-gray-900" : "text-gray-700"}`}>
                              {notification.title}
                            </h3>
                            {!notification.read && (
                              <span className="size-2 rounded-full bg-[#000080] flex-shrink-0" />
                            )}
                            <Badge type="pill-color" size="sm" color={priorityColors[notification.priority]}>
                              {notification.priority}
                            </Badge>
                          </div>
                          <p className="mt-1 text-sm text-[#898989] line-clamp-2">{notification.message}</p>
                          <p className="mt-1 text-xs text-gray-400">{notification.time}</p>
                        </div>
                        <div className="flex items-center gap-1 flex-shrink-0">
                          {!notification.read && (
                            <button
                              onClick={() => markAsRead(notification.id)}
                              className="p-1.5 sm:p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors"
                              title="Mark as read"
                            >
                              <CheckCircle className="size-4" />
                            </button>
                          )}
                          <button
                            onClick={() => deleteNotification(notification.id)}
                            className="p-1.5 sm:p-2 rounded-lg text-[#898989] hover:bg-red-50 hover:text-red-600 transition-colors"
                            title="Delete"
                          >
                            <XClose className="size-4" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
}
