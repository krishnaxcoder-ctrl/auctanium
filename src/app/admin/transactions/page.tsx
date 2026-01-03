"use client";

import { useState } from "react";
import {
  CreditCard01,
  SearchLg,
  Download01,
  Eye,
  ChevronLeft,
  ChevronRight,
  CheckCircle,
  Clock,
  XCircle,
  RefreshCw01,
  ArrowUp,
  ArrowDown,
  AlertTriangle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Avatar } from "@/components/base/avatar/avatar";

// Mock transactions data
const transactionsData = [
  {
    id: "TXN-001",
    type: "payment",
    order: "ORD-2024-001",
    customer: {
      name: "Sarah Johnson",
      email: "sarah.j@example.com",
      avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
    },
    seller: "TechStore Pro",
    amount: 2499,
    fee: 249.90,
    net: 2249.10,
    status: "completed",
    method: "card",
    date: "Dec 18, 2024 10:30 AM",
  },
  {
    id: "TXN-002",
    type: "refund",
    order: "ORD-2024-005",
    customer: {
      name: "Lisa Anderson",
      email: "lisa.a@example.com",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=100&h=100&fit=crop",
    },
    seller: "GadgetWorld",
    amount: -799,
    fee: 0,
    net: -799,
    status: "completed",
    method: "card",
    date: "Dec 17, 2024 3:45 PM",
  },
  {
    id: "TXN-003",
    type: "payout",
    order: null,
    customer: null,
    seller: "TechStore Pro",
    amount: -15420,
    fee: 25,
    net: -15445,
    status: "completed",
    method: "bank_transfer",
    date: "Dec 16, 2024 9:00 AM",
  },
  {
    id: "TXN-004",
    type: "payment",
    order: "ORD-2024-002",
    customer: {
      name: "Michael Chen",
      email: "m.chen@example.com",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&h=100&fit=crop",
    },
    seller: "GadgetWorld",
    amount: 1249,
    fee: 124.90,
    net: 1124.10,
    status: "completed",
    method: "card",
    date: "Dec 17, 2024 2:15 PM",
  },
  {
    id: "TXN-005",
    type: "payment",
    order: "ORD-2024-004",
    customer: {
      name: "James Wilson",
      email: "j.wilson@example.com",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=100&h=100&fit=crop",
    },
    seller: "TechStore Pro",
    amount: 899,
    fee: 89.90,
    net: 809.10,
    status: "pending",
    method: "card",
    date: "Dec 18, 2024 11:00 AM",
  },
  {
    id: "TXN-006",
    type: "payment",
    order: "ORD-2024-007",
    customer: {
      name: "Jennifer Martinez",
      email: "j.martinez@example.com",
      avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&h=100&fit=crop",
    },
    seller: "PremiumTech",
    amount: 3450,
    fee: 345,
    net: 3105,
    status: "processing",
    method: "card",
    date: "Dec 18, 2024 12:30 PM",
  },
  {
    id: "TXN-007",
    type: "chargeback",
    order: "ORD-2024-003",
    customer: {
      name: "Emily Davis",
      email: "emily.d@example.com",
      avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop",
    },
    seller: "ElectroHub",
    amount: -249,
    fee: 15,
    net: -264,
    status: "disputed",
    method: "card",
    date: "Dec 15, 2024 4:00 PM",
  },
];

const statusConfig: Record<string, { color: "success" | "warning" | "error" | "brand" | "gray"; icon: typeof CheckCircle }> = {
  completed: { color: "success", icon: CheckCircle },
  pending: { color: "gray", icon: Clock },
  processing: { color: "brand", icon: RefreshCw01 },
  failed: { color: "error", icon: XCircle },
  disputed: { color: "error", icon: AlertTriangle },
};

const typeConfig: Record<string, { color: "success" | "error" | "warning" | "brand"; label: string }> = {
  payment: { color: "success", label: "Payment" },
  refund: { color: "warning", label: "Refund" },
  payout: { color: "brand", label: "Payout" },
  chargeback: { color: "error", label: "Chargeback" },
};

export default function TransactionsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredTransactions = transactionsData.filter((txn) => {
    const matchesSearch = txn.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      txn.seller.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (txn.order && txn.order.toLowerCase().includes(searchQuery.toLowerCase()));
    const matchesType = typeFilter === "all" || txn.type === typeFilter;
    const matchesStatus = statusFilter === "all" || txn.status === statusFilter;
    return matchesSearch && matchesType && matchesStatus;
  });

  const totalRevenue = transactionsData
    .filter((t) => t.type === "payment" && t.status === "completed")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalFees = transactionsData
    .filter((t) => t.status === "completed")
    .reduce((sum, t) => sum + Math.abs(t.fee), 0);

  const totalRefunds = transactionsData
    .filter((t) => t.type === "refund")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  const totalPayouts = transactionsData
    .filter((t) => t.type === "payout")
    .reduce((sum, t) => sum + Math.abs(t.amount), 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Transactions</h1>
          <p className="text-sm text-[#898989]">View all platform financial transactions.</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={Download01}>
            Export
          </Button>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <ArrowDown className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">${totalRevenue.toLocaleString()}</div>
              <div className="text-xs text-[#898989]">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#000080]/10">
              <CreditCard01 className="size-5 text-[#000080]" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">${totalFees.toLocaleString()}</div>
              <div className="text-xs text-[#898989]">Platform Fees</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <RefreshCw01 className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">${totalRefunds.toLocaleString()}</div>
              <div className="text-xs text-[#898989]">Total Refunds</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50">
              <ArrowUp className="size-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">${totalPayouts.toLocaleString()}</div>
              <div className="text-xs text-[#898989]">Total Payouts</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters and Table */}
      <div className="rounded-xl border border-gray-200 bg-white">
        <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#898989]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search transactions..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-[#898989] focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-[#000080] focus:outline-none"
            >
              <option value="all">All Types</option>
              <option value="payment">Payments</option>
              <option value="refund">Refunds</option>
              <option value="payout">Payouts</option>
              <option value="chargeback">Chargebacks</option>
            </select>
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-[#000080] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="pending">Pending</option>
              <option value="processing">Processing</option>
              <option value="failed">Failed</option>
              <option value="disputed">Disputed</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-t border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Transaction</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Type</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Customer/Seller</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Amount</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Fee</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Net</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Date</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#898989] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredTransactions.map((txn) => {
                const statusInfo = statusConfig[txn.status];
                const typeInfo = typeConfig[txn.type];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={txn.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="text-sm font-medium text-[#000080]">{txn.id}</div>
                      {txn.order && (
                        <div className="text-xs text-[#898989]">{txn.order}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <Badge type="pill-color" size="sm" color={typeInfo.color}>
                        {typeInfo.label}
                      </Badge>
                    </td>
                    <td className="px-4 py-4">
                      {txn.customer ? (
                        <div className="flex items-center gap-3">
                          <Avatar src={txn.customer.avatar} alt={txn.customer.name} size="sm" />
                          <div>
                            <div className="text-sm font-medium text-gray-900">{txn.customer.name}</div>
                            <div className="text-xs text-[#898989]">{txn.seller}</div>
                          </div>
                        </div>
                      ) : (
                        <div className="text-sm text-gray-900">{txn.seller}</div>
                      )}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${txn.amount >= 0 ? "text-green-600" : "text-red-600"}`}>
                        {txn.amount >= 0 ? "+" : ""}${Math.abs(txn.amount).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#898989]">
                      ${Math.abs(txn.fee).toLocaleString()}
                    </td>
                    <td className="px-4 py-4">
                      <span className={`text-sm font-semibold ${txn.net >= 0 ? "text-gray-900" : "text-red-600"}`}>
                        {txn.net >= 0 ? "+" : ""}${Math.abs(txn.net).toLocaleString()}
                      </span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${
                          txn.status === "completed" ? "text-green-500" :
                          txn.status === "processing" ? "text-blue-500" :
                          txn.status === "pending" ? "text-gray-400" :
                          "text-red-500"
                        }`} />
                        <Badge type="pill-color" size="sm" color={statusInfo.color}>
                          {txn.status}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-[#898989]">{txn.date}</td>
                    <td className="px-4 py-4">
                      <button className="p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Eye className="size-4" />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between border-t border-gray-200 px-4 py-4">
          <div className="text-sm text-[#898989]">
            Showing <span className="font-medium text-gray-900">{filteredTransactions.length}</span> of <span className="font-medium text-gray-900">12,456</span> transactions
          </div>
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-1 rounded-lg border border-gray-200 px-3 py-2 text-sm text-gray-600 hover:bg-gray-50">
              <ChevronLeft className="size-4" />
              Previous
            </button>
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
