"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SearchLg,
  FilterLines,
  DotsVertical,
  Users01,
  UserPlus01,
  Star01,
  Mail01,
  Phone,
  MarkerPin01,
  ShoppingCart01,
  CurrencyDollar,
  Calendar,
  Eye,
  MessageSquare01,
  ChevronRight,
  X,
  Download01,
  TrendUp01,
  Clock,
  Tag01,
} from "@untitledui/icons";
import { Avatar } from "@/components/base/avatar/avatar";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Select } from "@/components/base/select/select";

// Customer data
const customers = [
  {
    id: "1",
    name: "Sarah Mitchell",
    email: "sarah.mitchell@email.com",
    phone: "+1 (555) 123-4567",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    status: "active",
    totalOrders: 12,
    totalSpent: 4589.99,
    avgOrderValue: 382.50,
    lastOrderDate: "Dec 18, 2024",
    joinDate: "Mar 15, 2023",
    location: "New York, USA",
    tags: ["VIP", "Repeat Buyer"],
    recentOrders: [
      { id: "ORD-7829", date: "Dec 18, 2024", total: 299.99, status: "processing" },
      { id: "ORD-7654", date: "Nov 25, 2024", total: 549.00, status: "delivered" },
      { id: "ORD-7432", date: "Oct 12, 2024", total: 189.99, status: "delivered" },
    ],
  },
  {
    id: "2",
    name: "James Chen",
    email: "james.chen@email.com",
    phone: "+1 (555) 234-5678",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    status: "active",
    totalOrders: 8,
    totalSpent: 2890.00,
    avgOrderValue: 361.25,
    lastOrderDate: "Dec 15, 2024",
    joinDate: "Jun 22, 2023",
    location: "San Francisco, USA",
    tags: ["Repeat Buyer"],
    recentOrders: [
      { id: "ORD-7815", date: "Dec 15, 2024", total: 1199.00, status: "shipped" },
      { id: "ORD-7601", date: "Nov 8, 2024", total: 449.00, status: "delivered" },
    ],
  },
  {
    id: "3",
    name: "Emily Davis",
    email: "emily.davis@email.com",
    phone: "+1 (555) 345-6789",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    status: "active",
    totalOrders: 5,
    totalSpent: 1245.50,
    avgOrderValue: 249.10,
    lastOrderDate: "Dec 10, 2024",
    joinDate: "Aug 5, 2023",
    location: "Los Angeles, USA",
    tags: [],
    recentOrders: [
      { id: "ORD-7756", date: "Dec 10, 2024", total: 249.00, status: "delivered" },
    ],
  },
  {
    id: "4",
    name: "Michael Brown",
    email: "michael.brown@email.com",
    phone: "+1 (555) 456-7890",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    status: "inactive",
    totalOrders: 3,
    totalSpent: 789.00,
    avgOrderValue: 263.00,
    lastOrderDate: "Sep 20, 2024",
    joinDate: "Jan 10, 2024",
    location: "Chicago, USA",
    tags: [],
    recentOrders: [
      { id: "ORD-7234", date: "Sep 20, 2024", total: 299.00, status: "refunded" },
    ],
  },
  {
    id: "5",
    name: "Lisa Anderson",
    email: "lisa.anderson@email.com",
    phone: "+1 (555) 567-8901",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    status: "active",
    totalOrders: 15,
    totalSpent: 6234.75,
    avgOrderValue: 415.65,
    lastOrderDate: "Dec 17, 2024",
    joinDate: "Nov 28, 2022",
    location: "Miami, USA",
    tags: ["VIP", "Top Spender"],
    recentOrders: [
      { id: "ORD-7823", date: "Dec 17, 2024", total: 799.00, status: "processing" },
      { id: "ORD-7712", date: "Dec 5, 2024", total: 1299.00, status: "delivered" },
      { id: "ORD-7598", date: "Nov 18, 2024", total: 449.00, status: "delivered" },
    ],
  },
  {
    id: "6",
    name: "David Wilson",
    email: "david.wilson@email.com",
    phone: "+1 (555) 678-9012",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop",
    status: "active",
    totalOrders: 6,
    totalSpent: 1876.50,
    avgOrderValue: 312.75,
    lastOrderDate: "Dec 12, 2024",
    joinDate: "Apr 3, 2024",
    location: "Seattle, USA",
    tags: ["New"],
    recentOrders: [
      { id: "ORD-7789", date: "Dec 12, 2024", total: 399.00, status: "shipped" },
    ],
  },
  {
    id: "7",
    name: "Jennifer Taylor",
    email: "jennifer.taylor@email.com",
    phone: "+1 (555) 789-0123",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    status: "active",
    totalOrders: 9,
    totalSpent: 3456.00,
    avgOrderValue: 384.00,
    lastOrderDate: "Dec 16, 2024",
    joinDate: "Feb 14, 2023",
    location: "Boston, USA",
    tags: ["Repeat Buyer"],
    recentOrders: [
      { id: "ORD-7818", date: "Dec 16, 2024", total: 599.00, status: "processing" },
      { id: "ORD-7690", date: "Nov 28, 2024", total: 249.00, status: "delivered" },
    ],
  },
  {
    id: "8",
    name: "Robert Martinez",
    email: "robert.martinez@email.com",
    phone: "+1 (555) 890-1234",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=100&h=100&fit=crop",
    status: "inactive",
    totalOrders: 2,
    totalSpent: 498.00,
    avgOrderValue: 249.00,
    lastOrderDate: "Aug 5, 2024",
    joinDate: "Jul 20, 2024",
    location: "Denver, USA",
    tags: [],
    recentOrders: [
      { id: "ORD-7089", date: "Aug 5, 2024", total: 249.00, status: "delivered" },
    ],
  },
];

const statusConfig: Record<string, { label: string; color: "success" | "gray" }> = {
  active: { label: "Active", color: "success" },
  inactive: { label: "Inactive", color: "gray" },
};

const orderStatusConfig: Record<string, { label: string; color: "success" | "brand" | "warning" | "error" | "gray" }> = {
  delivered: { label: "Delivered", color: "success" },
  shipped: { label: "Shipped", color: "brand" },
  processing: { label: "Processing", color: "warning" },
  refunded: { label: "Refunded", color: "error" },
};

const statusOptions = [
  { id: "all", label: "All Status" },
  { id: "active", label: "Active" },
  { id: "inactive", label: "Inactive" },
];

const sortOptions = [
  { id: "newest", label: "Newest customers" },
  { id: "oldest", label: "Oldest customers" },
  { id: "name_asc", label: "Name A-Z" },
  { id: "name_desc", label: "Name Z-A" },
  { id: "orders_high", label: "Most orders" },
  { id: "orders_low", label: "Least orders" },
  { id: "spent_high", label: "Highest spent" },
  { id: "spent_low", label: "Lowest spent" },
];

const tagOptions = [
  { id: "all", label: "All Tags" },
  { id: "vip", label: "VIP" },
  { id: "repeat", label: "Repeat Buyer" },
  { id: "new", label: "New" },
  { id: "top_spender", label: "Top Spender" },
];

export default function CustomersPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCustomers, setSelectedCustomers] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [tagFilter, setTagFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [selectedCustomer, setSelectedCustomer] = useState<typeof customers[0] | null>(null);

  const filteredCustomers = customers.filter((customer) => {
    const matchesSearch =
      customer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      customer.email.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || customer.status === statusFilter;
    const matchesTag =
      tagFilter === "all" ||
      (tagFilter === "vip" && customer.tags.includes("VIP")) ||
      (tagFilter === "repeat" && customer.tags.includes("Repeat Buyer")) ||
      (tagFilter === "new" && customer.tags.includes("New")) ||
      (tagFilter === "top_spender" && customer.tags.includes("Top Spender"));
    return matchesSearch && matchesStatus && matchesTag;
  });

  const toggleSelectAll = () => {
    if (selectedCustomers.length === filteredCustomers.length) {
      setSelectedCustomers([]);
    } else {
      setSelectedCustomers(filteredCustomers.map((c) => c.id));
    }
  };

  const toggleSelectCustomer = (id: string) => {
    setSelectedCustomers((prev) =>
      prev.includes(id) ? prev.filter((c) => c !== id) : [...prev, id]
    );
  };

  const stats = {
    total: customers.length,
    active: customers.filter((c) => c.status === "active").length,
    newThisMonth: customers.filter((c) => c.tags.includes("New")).length,
    vip: customers.filter((c) => c.tags.includes("VIP")).length,
    totalRevenue: customers.reduce((sum, c) => sum + c.totalSpent, 0),
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">Customers</h1>
          <p className="text-sm text-tertiary">Manage and view your customer base</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
          <Button color="primary" size="sm" iconLeading={UserPlus01}>
            Add Customer
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <Users01 className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.total}</div>
              <div className="text-xs text-tertiary">Total Customers</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success-50">
              <Users01 className="size-5 text-success-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.active}</div>
              <div className="text-xs text-tertiary">Active</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-warning-50">
              <UserPlus01 className="size-5 text-warning-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.newThisMonth}</div>
              <div className="text-xs text-tertiary">New This Month</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50">
              <Star01 className="size-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.vip}</div>
              <div className="text-xs text-tertiary">VIP Customers</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success-50">
              <CurrencyDollar className="size-5 text-success-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">
                ${stats.totalRevenue.toLocaleString()}
              </div>
              <div className="text-xs text-tertiary">Total Revenue</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 flex-wrap items-center gap-3">
          <div className="w-full max-w-sm">
            <Input
              icon={SearchLg}
              size="sm"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              placeholder="Search customers..."
            />
          </div>
          <div className="w-36">
            <Select
              size="sm"
              placeholder="Status"
              items={statusOptions}
              selectedKey={statusFilter}
              onSelectionChange={(key) => setStatusFilter(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
          <div className="w-36">
            <Select
              size="sm"
              placeholder="Tags"
              items={tagOptions}
              selectedKey={tagFilter}
              onSelectionChange={(key) => setTagFilter(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
        </div>
        <div className="flex items-center gap-3">
          <div className="w-48">
            <Select
              size="sm"
              placeholder="Sort by"
              items={sortOptions}
              selectedKey={sortBy}
              onSelectionChange={(key) => setSortBy(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
        </div>
      </div>

      {/* Bulk Actions */}
      {selectedCustomers.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm font-medium text-brand-700">
            {selectedCustomers.length} customer{selectedCustomers.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button color="secondary" size="sm" iconLeading={Mail01}>
              Send Email
            </Button>
            <Button color="secondary" size="sm" iconLeading={Tag01}>
              Add Tag
            </Button>
            <Button color="secondary" size="sm" iconLeading={Download01}>
              Export
            </Button>
          </div>
        </div>
      )}

      {/* Customers Table */}
      <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary bg-secondary/50">
                <th className="px-4 py-3 text-left">
                  <Checkbox
                    isSelected={
                      selectedCustomers.length === filteredCustomers.length &&
                      filteredCustomers.length > 0
                    }
                    isIndeterminate={
                      selectedCustomers.length > 0 &&
                      selectedCustomers.length < filteredCustomers.length
                    }
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Customer
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Orders
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Total Spent
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Last Order
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Tags
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-tertiary">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filteredCustomers.map((customer) => (
                <tr
                  key={customer.id}
                  className="hover:bg-secondary/30 transition-colors cursor-pointer"
                  onClick={() => setSelectedCustomer(customer)}
                >
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <Checkbox
                      isSelected={selectedCustomers.includes(customer.id)}
                      onChange={() => toggleSelectCustomer(customer.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <Avatar src={customer.avatar} alt={customer.name} size="sm" />
                      <div>
                        <div className="text-sm font-medium text-primary">{customer.name}</div>
                        <div className="text-xs text-tertiary">{customer.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={statusConfig[customer.status].color}
                    >
                      {statusConfig[customer.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-primary">{customer.totalOrders}</span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm font-medium text-primary">
                      ${customer.totalSpent.toLocaleString()}
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-secondary">{customer.lastOrderDate}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-1">
                      {customer.tags.length > 0 ? (
                        customer.tags.map((tag) => (
                          <Badge
                            key={tag}
                            type="pill-color"
                            size="sm"
                            color={
                              tag === "VIP"
                                ? "brand"
                                : tag === "Top Spender"
                                ? "success"
                                : tag === "New"
                                ? "warning"
                                : "gray"
                            }
                          >
                            {tag}
                          </Badge>
                        ))
                      ) : (
                        <span className="text-xs text-tertiary">-</span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        color="tertiary"
                        size="sm"
                        iconLeading={Eye}
                        onClick={() => setSelectedCustomer(customer)}
                      >
                        View
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredCustomers.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Users01 className="size-12 text-tertiary mb-4" />
            <h3 className="text-lg font-medium text-primary">No customers found</h3>
            <p className="mt-1 text-sm text-tertiary">
              {searchQuery || statusFilter !== "all" || tagFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Customers will appear here once they make a purchase"}
            </p>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredCustomers.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-tertiary">
            Showing {filteredCustomers.length} of {customers.length} customers
          </p>
          <div className="flex items-center gap-2">
            <Button color="secondary" size="sm" isDisabled>
              Previous
            </Button>
            <Button color="secondary" size="sm" isDisabled>
              Next
            </Button>
          </div>
        </div>
      )}

      {/* Customer Detail Slideout */}
      {selectedCustomer && (
        <div className="fixed inset-0 z-50 flex justify-end">
          {/* Backdrop */}
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setSelectedCustomer(null)}
          />

          {/* Panel */}
          <div className="relative w-full max-w-lg bg-primary shadow-xl overflow-y-auto">
            {/* Header */}
            <div className="sticky top-0 z-10 flex items-center justify-between border-b border-secondary bg-primary px-6 py-4">
              <h2 className="text-lg font-semibold text-primary">Customer Details</h2>
              <button
                onClick={() => setSelectedCustomer(null)}
                className="rounded-lg p-2 hover:bg-secondary transition-colors"
              >
                <X className="size-5 text-tertiary" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Customer Info */}
              <div className="flex items-center gap-4">
                <Avatar src={selectedCustomer.avatar} alt={selectedCustomer.name} size="xl" />
                <div>
                  <h3 className="text-lg font-semibold text-primary">{selectedCustomer.name}</h3>
                  <p className="text-sm text-tertiary">Customer since {selectedCustomer.joinDate}</p>
                  <div className="flex items-center gap-2 mt-2">
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={statusConfig[selectedCustomer.status].color}
                    >
                      {statusConfig[selectedCustomer.status].label}
                    </Badge>
                    {selectedCustomer.tags.map((tag) => (
                      <Badge
                        key={tag}
                        type="pill-color"
                        size="sm"
                        color={
                          tag === "VIP"
                            ? "brand"
                            : tag === "Top Spender"
                            ? "success"
                            : tag === "New"
                            ? "warning"
                            : "gray"
                        }
                      >
                        {tag}
                      </Badge>
                    ))}
                  </div>
                </div>
              </div>

              {/* Contact Info */}
              <div className="rounded-xl border border-secondary p-4 space-y-3">
                <h4 className="text-sm font-semibold text-primary">Contact Information</h4>
                <div className="space-y-2">
                  <div className="flex items-center gap-3">
                    <Mail01 className="size-4 text-tertiary" />
                    <span className="text-sm text-primary">{selectedCustomer.email}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Phone className="size-4 text-tertiary" />
                    <span className="text-sm text-primary">{selectedCustomer.phone}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MarkerPin01 className="size-4 text-tertiary" />
                    <span className="text-sm text-primary">{selectedCustomer.location}</span>
                  </div>
                </div>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-2 gap-4">
                <div className="rounded-xl border border-secondary p-4">
                  <div className="flex items-center gap-2 text-tertiary">
                    <ShoppingCart01 className="size-4" />
                    <span className="text-xs">Total Orders</span>
                  </div>
                  <div className="mt-1 text-xl font-semibold text-primary">
                    {selectedCustomer.totalOrders}
                  </div>
                </div>
                <div className="rounded-xl border border-secondary p-4">
                  <div className="flex items-center gap-2 text-tertiary">
                    <CurrencyDollar className="size-4" />
                    <span className="text-xs">Total Spent</span>
                  </div>
                  <div className="mt-1 text-xl font-semibold text-primary">
                    ${selectedCustomer.totalSpent.toLocaleString()}
                  </div>
                </div>
                <div className="rounded-xl border border-secondary p-4">
                  <div className="flex items-center gap-2 text-tertiary">
                    <TrendUp01 className="size-4" />
                    <span className="text-xs">Avg. Order Value</span>
                  </div>
                  <div className="mt-1 text-xl font-semibold text-primary">
                    ${selectedCustomer.avgOrderValue.toFixed(2)}
                  </div>
                </div>
                <div className="rounded-xl border border-secondary p-4">
                  <div className="flex items-center gap-2 text-tertiary">
                    <Clock className="size-4" />
                    <span className="text-xs">Last Order</span>
                  </div>
                  <div className="mt-1 text-sm font-semibold text-primary">
                    {selectedCustomer.lastOrderDate}
                  </div>
                </div>
              </div>

              {/* Recent Orders */}
              <div className="rounded-xl border border-secondary overflow-hidden">
                <div className="flex items-center justify-between border-b border-secondary px-4 py-3">
                  <h4 className="text-sm font-semibold text-primary">Recent Orders</h4>
                  <Link
                    href="/seller/orders"
                    className="text-xs font-medium text-brand-600 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-secondary">
                  {selectedCustomer.recentOrders.map((order) => (
                    <div
                      key={order.id}
                      className="flex items-center justify-between px-4 py-3 hover:bg-secondary/50 transition-colors"
                    >
                      <div>
                        <div className="text-sm font-medium text-primary">{order.id}</div>
                        <div className="text-xs text-tertiary">{order.date}</div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge
                          type="pill-color"
                          size="sm"
                          color={orderStatusConfig[order.status].color}
                        >
                          {orderStatusConfig[order.status].label}
                        </Badge>
                        <span className="text-sm font-medium text-primary">
                          ${order.total.toFixed(2)}
                        </span>
                        <ChevronRight className="size-4 text-tertiary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center gap-3">
                <Button color="secondary" size="sm" iconLeading={Mail01} className="flex-1">
                  Send Email
                </Button>
                <Button color="secondary" size="sm" iconLeading={MessageSquare01} className="flex-1">
                  Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
