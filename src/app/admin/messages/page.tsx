"use client";

import { useState } from "react";
import {
  MessageSquare01,
  SearchLg,
  FilterLines,
  Mail01,
  Mail02,
  CheckCircle,
  Clock,
  Trash01,
  Eye,
  Send01,
  Archive,
  Star01,
  ChevronLeft,
  ChevronRight,
  DotsVertical,
  AlertCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Mock messages data
const messagesData = [
  {
    id: "MSG-001",
    from: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
      role: "customer",
    },
    subject: "Issue with order delivery",
    preview: "Hi, I placed an order 3 days ago and haven't received any shipping updates. Can you please check...",
    status: "unread",
    priority: "high",
    category: "support",
    date: "Dec 19, 2024",
    time: "2:30 PM",
    starred: true,
  },
  {
    id: "MSG-002",
    from: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
      role: "seller",
    },
    subject: "Verification documents submitted",
    preview: "I have submitted all the required documents for seller verification. Please review and approve...",
    status: "read",
    priority: "medium",
    category: "verification",
    date: "Dec 19, 2024",
    time: "1:15 PM",
    starred: false,
  },
  {
    id: "MSG-003",
    from: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
      role: "customer",
    },
    subject: "Refund request for damaged item",
    preview: "The item I received was damaged during shipping. I would like to request a full refund...",
    status: "unread",
    priority: "high",
    category: "refund",
    date: "Dec 19, 2024",
    time: "11:45 AM",
    starred: true,
  },
  {
    id: "MSG-004",
    from: {
      name: "James Wilson",
      email: "j.wilson@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
      role: "seller",
    },
    subject: "Question about commission rates",
    preview: "I wanted to clarify the commission structure for electronics category. Is there a tiered system...",
    status: "replied",
    priority: "low",
    category: "inquiry",
    date: "Dec 18, 2024",
    time: "4:20 PM",
    starred: false,
  },
  {
    id: "MSG-005",
    from: {
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
      role: "customer",
    },
    subject: "Account suspension appeal",
    preview: "My account was suspended without any prior notice. I believe this was a mistake and would like...",
    status: "unread",
    priority: "high",
    category: "account",
    date: "Dec 18, 2024",
    time: "2:00 PM",
    starred: false,
  },
  {
    id: "MSG-006",
    from: {
      name: "Robert Brown",
      email: "r.brown@example.com",
      avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
      role: "seller",
    },
    subject: "Bulk listing upload issue",
    preview: "I'm trying to upload products in bulk using the CSV template but getting errors on rows 15-20...",
    status: "read",
    priority: "medium",
    category: "technical",
    date: "Dec 18, 2024",
    time: "10:30 AM",
    starred: false,
  },
  {
    id: "MSG-007",
    from: {
      name: "Jennifer Martinez",
      email: "j.martinez@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
      role: "customer",
    },
    subject: "Great experience - Thank you!",
    preview: "Just wanted to say thank you for the amazing customer service. My issue was resolved quickly...",
    status: "replied",
    priority: "low",
    category: "feedback",
    date: "Dec 17, 2024",
    time: "5:45 PM",
    starred: true,
  },
  {
    id: "MSG-008",
    from: {
      name: "David Kim",
      email: "d.kim@example.com",
      avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
      role: "seller",
    },
    subject: "Payment processing delay",
    preview: "My weekly payout hasn't been processed yet. It's been 5 days since the scheduled date...",
    status: "unread",
    priority: "high",
    category: "payment",
    date: "Dec 17, 2024",
    time: "3:15 PM",
    starred: false,
  },
];

const statusColors: Record<string, "success" | "warning" | "brand"> = {
  unread: "warning",
  read: "brand",
  replied: "success",
};

const priorityColors: Record<string, "error" | "warning" | "success"> = {
  high: "error",
  medium: "warning",
  low: "success",
};

const categoryColors: Record<string, "brand" | "warning" | "error" | "success"> = {
  support: "brand",
  verification: "warning",
  refund: "error",
  inquiry: "brand",
  account: "error",
  technical: "warning",
  feedback: "success",
  payment: "error",
};

export default function MessagesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [priorityFilter, setPriorityFilter] = useState<string>("all");
  const [selectedMessages, setSelectedMessages] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredMessages = messagesData.filter((message) => {
    const matchesSearch =
      message.from.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.from.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      message.preview.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || message.status === statusFilter;
    const matchesPriority = priorityFilter === "all" || message.priority === priorityFilter;
    return matchesSearch && matchesStatus && matchesPriority;
  });

  const toggleSelectAll = () => {
    if (selectedMessages.length === filteredMessages.length) {
      setSelectedMessages([]);
    } else {
      setSelectedMessages(filteredMessages.map((m) => m.id));
    }
  };

  const toggleSelectMessage = (messageId: string) => {
    if (selectedMessages.includes(messageId)) {
      setSelectedMessages(selectedMessages.filter((id) => id !== messageId));
    } else {
      setSelectedMessages([...selectedMessages, messageId]);
    }
  };

  const unreadCount = messagesData.filter((m) => m.status === "unread").length;
  const repliedCount = messagesData.filter((m) => m.status === "replied").length;
  const highPriorityCount = messagesData.filter((m) => m.priority === "high").length;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Messages</h1>
          <p className="text-sm text-gray-500">Manage support tickets and user communications.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Archive}>
            Archive
          </Button>
          <Button color="primary" size="sm" iconLeading={Send01} className="bg-brand-600 hover:bg-brand-700">
            Compose
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <MessageSquare01 className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{messagesData.length}</div>
              <div className="text-xs text-gray-500">Total Messages</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <Mail02 className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{unreadCount}</div>
              <div className="text-xs text-gray-500">Unread</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{repliedCount}</div>
              <div className="text-xs text-gray-500">Replied</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-50">
              <AlertCircle className="size-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">{highPriorityCount}</div>
              <div className="text-xs text-gray-500">High Priority</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Search */}
          <div className="relative flex-1 max-w-md">
            <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search messages..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                showFilters
                  ? "border-brand-500 bg-brand-50 text-brand-600"
                  : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FilterLines className="size-4" />
              Filters
            </button>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="unread">Unread</option>
              <option value="read">Read</option>
              <option value="replied">Replied</option>
            </select>
            <select
              value={priorityFilter}
              onChange={(e) => setPriorityFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Priority</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedMessages.length > 0 && (
          <div className="flex items-center gap-4 border-t border-gray-200 bg-brand-50 px-4 py-3">
            <span className="text-sm text-gray-600">
              {selectedMessages.length} message{selectedMessages.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <Button color="secondary" size="sm" iconLeading={Mail01}>
                Mark as Read
              </Button>
              <Button color="secondary" size="sm" iconLeading={Archive}>
                Archive
              </Button>
              <Button color="secondary" size="sm" iconLeading={Trash01} className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Messages List */}
        <div className="divide-y divide-gray-100">
          {/* Header Row */}
          <div className="flex items-center gap-4 bg-gray-50 px-4 py-3 border-t border-gray-200">
            <input
              type="checkbox"
              checked={selectedMessages.length === filteredMessages.length && filteredMessages.length > 0}
              onChange={toggleSelectAll}
              className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
            />
            <div className="flex-1 text-xs font-medium text-gray-500 uppercase tracking-wider">Message</div>
            <div className="w-24 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:block">Status</div>
            <div className="w-24 text-xs font-medium text-gray-500 uppercase tracking-wider hidden md:block">Priority</div>
            <div className="w-24 text-xs font-medium text-gray-500 uppercase tracking-wider hidden lg:block">Category</div>
            <div className="w-28 text-xs font-medium text-gray-500 uppercase tracking-wider hidden sm:block">Date</div>
            <div className="w-20 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</div>
          </div>

          {/* Message Rows */}
          {filteredMessages.map((message) => (
            <div
              key={message.id}
              className={`flex items-center gap-4 px-4 py-4 hover:bg-gray-50 transition-colors ${
                message.status === "unread" ? "bg-brand-50/30" : ""
              }`}
            >
              <input
                type="checkbox"
                checked={selectedMessages.includes(message.id)}
                onChange={() => toggleSelectMessage(message.id)}
                className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
              />

              {/* Message Content */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3">
                  <Avatar src={message.from.avatar} alt={message.from.name} size="sm" />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className={`text-sm ${message.status === "unread" ? "font-semibold text-gray-900" : "font-medium text-gray-700"}`}>
                        {message.from.name}
                      </span>
                      {message.starred && <Star01 className="size-4 text-amber-400 fill-amber-400" />}
                      <Badge type="pill-color" size="sm" color="gray">
                        {message.from.role}
                      </Badge>
                    </div>
                    <div className={`text-sm truncate ${message.status === "unread" ? "font-medium text-gray-900" : "text-gray-700"}`}>
                      {message.subject}
                    </div>
                    <div className="text-xs text-gray-500 truncate">{message.preview}</div>
                  </div>
                </div>
              </div>

              {/* Status */}
              <div className="w-24 hidden sm:block">
                <Badge type="pill-color" size="sm" color={statusColors[message.status]}>
                  {message.status}
                </Badge>
              </div>

              {/* Priority */}
              <div className="w-24 hidden md:block">
                <Badge type="pill-color" size="sm" color={priorityColors[message.priority]}>
                  {message.priority}
                </Badge>
              </div>

              {/* Category */}
              <div className="w-24 hidden lg:block">
                <Badge type="pill-color" size="sm" color={categoryColors[message.category]}>
                  {message.category}
                </Badge>
              </div>

              {/* Date */}
              <div className="w-28 hidden sm:block">
                <div className="text-sm text-gray-900">{message.date}</div>
                <div className="text-xs text-gray-500">{message.time}</div>
              </div>

              {/* Actions */}
              <div className="w-20 flex items-center justify-end gap-1">
                <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <Eye className="size-4" />
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                  <Send01 className="size-4" />
                </button>
                <button className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                  <Trash01 className="size-4" />
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredMessages.length}</span> of{" "}
            <span className="font-medium text-gray-900">248</span> messages
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50 disabled:opacity-50">
              <ChevronLeft className="size-4" />
              Previous
            </button>
            <div className="flex items-center gap-1">
              <button className="size-9 rounded-lg bg-brand-600 text-sm font-medium text-white">1</button>
              <button className="size-9 rounded-lg text-sm text-gray-600 hover:bg-gray-100">2</button>
              <button className="size-9 rounded-lg text-sm text-gray-600 hover:bg-gray-100">3</button>
              <span className="px-2 text-gray-400">...</span>
              <button className="size-9 rounded-lg text-sm text-gray-600 hover:bg-gray-100">25</button>
            </div>
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              Next
              <ChevronRight className="size-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
