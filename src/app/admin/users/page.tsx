"use client";

import { useState } from "react";
import Link from "next/link";
import {
  Users01,
  SearchLg,
  FilterLines,
  Plus,
  ChevronDown,
  Edit02,
  Trash01,
  Eye,
  Mail01,
  DotsVertical,
  Download01,
  Upload01,
  CheckCircle,
  XCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Mock users data
const usersData = [
  {
    id: "USR-001",
    name: "Sarah Johnson",
    email: "sarah.j@example.com",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    role: "customer",
    status: "active",
    joined: "Dec 18, 2024",
    lastActive: "2 hours ago",
    orders: 12,
    totalSpent: 4520,
  },
  {
    id: "USR-002",
    name: "Michael Chen",
    email: "m.chen@example.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    role: "seller",
    status: "active",
    joined: "Dec 17, 2024",
    lastActive: "5 min ago",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "USR-003",
    name: "Emily Davis",
    email: "emily.d@example.com",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    role: "customer",
    status: "pending",
    joined: "Dec 17, 2024",
    lastActive: "1 day ago",
    orders: 3,
    totalSpent: 890,
  },
  {
    id: "USR-004",
    name: "James Wilson",
    email: "j.wilson@example.com",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    role: "seller",
    status: "active",
    joined: "Dec 16, 2024",
    lastActive: "30 min ago",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "USR-005",
    name: "Lisa Anderson",
    email: "lisa.a@example.com",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    role: "customer",
    status: "suspended",
    joined: "Dec 15, 2024",
    lastActive: "5 days ago",
    orders: 8,
    totalSpent: 2340,
  },
  {
    id: "USR-006",
    name: "Robert Brown",
    email: "r.brown@example.com",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    role: "admin",
    status: "active",
    joined: "Nov 10, 2024",
    lastActive: "Just now",
    orders: 0,
    totalSpent: 0,
  },
  {
    id: "USR-007",
    name: "Jennifer Martinez",
    email: "j.martinez@example.com",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    role: "customer",
    status: "active",
    joined: "Dec 14, 2024",
    lastActive: "3 hours ago",
    orders: 15,
    totalSpent: 6780,
  },
  {
    id: "USR-008",
    name: "David Kim",
    email: "d.kim@example.com",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    role: "seller",
    status: "pending",
    joined: "Dec 18, 2024",
    lastActive: "1 hour ago",
    orders: 0,
    totalSpent: 0,
  },
];

const roleColors: Record<string, "brand" | "warning" | "error"> = {
  customer: "brand",
  seller: "warning",
  admin: "error",
};

const statusColors: Record<string, "success" | "warning" | "error"> = {
  active: "success",
  pending: "warning",
  suspended: "error",
};

const statusIcons: Record<string, typeof CheckCircle> = {
  active: CheckCircle,
  pending: Clock,
  suspended: XCircle,
};

export default function UsersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [selectedUsers, setSelectedUsers] = useState<string[]>([]);
  const [showFilters, setShowFilters] = useState(false);

  const filteredUsers = usersData.filter((user) => {
    const matchesSearch = user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.id.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesRole = roleFilter === "all" || user.role === roleFilter;
    const matchesStatus = statusFilter === "all" || user.status === statusFilter;
    return matchesSearch && matchesRole && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedUsers.length === filteredUsers.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(filteredUsers.map((u) => u.id));
    }
  };

  const toggleSelectUser = (userId: string) => {
    if (selectedUsers.includes(userId)) {
      setSelectedUsers(selectedUsers.filter((id) => id !== userId));
    } else {
      setSelectedUsers([...selectedUsers, userId]);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Users</h1>
          <p className="text-sm text-gray-500">Manage all platform users, customers, and sellers.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
          <Button color="secondary" size="sm" iconLeading={Upload01}>
            Import
          </Button>
          <Button color="primary" size="sm" iconLeading={Plus} className="bg-brand-600 hover:bg-brand-700">
            Add User
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <Users01 className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">12,847</div>
              <div className="text-xs text-gray-500">Total Users</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <CheckCircle className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">11,234</div>
              <div className="text-xs text-gray-500">Active Users</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <Clock className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">892</div>
              <div className="text-xs text-gray-500">Pending</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-red-50">
              <XCircle className="size-5 text-red-600" />
            </div>
            <div>
              <div className="text-2xl font-bold text-gray-900">721</div>
              <div className="text-xs text-gray-500">Suspended</div>
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
              placeholder="Search by name, email, or ID..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>

          {/* Filter Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={() => setShowFilters(!showFilters)}
              className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm font-medium transition-colors ${
                showFilters ? "border-brand-500 bg-brand-50 text-brand-600" : "border-gray-200 text-gray-600 hover:bg-gray-50"
              }`}
            >
              <FilterLines className="size-4" />
              Filters
            </button>
            <select
              value={roleFilter}
              onChange={(e) => setRoleFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Roles</option>
              <option value="customer">Customer</option>
              <option value="seller">Seller</option>
              <option value="admin">Admin</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-brand-500 focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="suspended">Suspended</option>
            </select>
          </div>
        </div>

        {/* Bulk Actions */}
        {selectedUsers.length > 0 && (
          <div className="flex items-center gap-4 border-t border-gray-200 bg-brand-50 px-4 py-3">
            <span className="text-sm text-gray-600">
              {selectedUsers.length} user{selectedUsers.length > 1 ? "s" : ""} selected
            </span>
            <div className="flex items-center gap-2">
              <Button color="secondary" size="sm" iconLeading={Mail01}>
                Email
              </Button>
              <Button color="secondary" size="sm" iconLeading={CheckCircle}>
                Activate
              </Button>
              <Button color="secondary" size="sm" iconLeading={XCircle}>
                Suspend
              </Button>
              <Button color="secondary" size="sm" iconLeading={Trash01} className="text-red-600 hover:bg-red-50">
                Delete
              </Button>
            </div>
          </div>
        )}

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left">
                  <input
                    type="checkbox"
                    checked={selectedUsers.length === filteredUsers.length && filteredUsers.length > 0}
                    onChange={toggleSelectAll}
                    className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">User</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Role</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Joined</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Active</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Orders</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Spent</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredUsers.map((user) => {
                const StatusIcon = statusIcons[user.status];
                return (
                  <tr key={user.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <input
                        type="checkbox"
                        checked={selectedUsers.includes(user.id)}
                        onChange={() => toggleSelectUser(user.id)}
                        className="size-4 rounded border-gray-300 text-brand-600 focus:ring-brand-500"
                      />
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <Avatar src={user.avatar} alt={user.name} size="sm" />
                        <div>
                          <div className="text-sm font-medium text-gray-900">{user.name}</div>
                          <div className="text-xs text-gray-500">{user.email}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <Badge type="pill-color" size="sm" color={roleColors[user.role]}>
                        {user.role}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${
                          user.status === "active" ? "text-green-500" :
                          user.status === "pending" ? "text-amber-500" :
                          "text-red-500"
                        }`} />
                        <Badge type="pill-color" size="sm" color={statusColors[user.status]}>
                          {user.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-500">{user.joined}</td>
                    <td className="px-4 py-4 text-sm text-gray-500">{user.lastActive}</td>
                    <td className="px-4 py-4 text-sm text-gray-900">{user.orders}</td>
                    <td className="px-4 py-4 text-sm font-medium text-gray-900">
                      {user.totalSpent > 0 ? `$${user.totalSpent.toLocaleString()}` : "—"}
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Edit02 className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-gray-500 hover:bg-red-50 hover:text-red-600 transition-colors">
                          <Trash01 className="size-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
          <div className="text-sm text-gray-500">
            Showing <span className="font-medium text-gray-900">{filteredUsers.length}</span> of <span className="font-medium text-gray-900">12,847</span> users
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
              <button className="size-9 rounded-lg text-sm text-gray-600 hover:bg-gray-100">128</button>
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
