"use client";

import { useState } from "react";
import {
  File01,
  Download01,
  Calendar,
  Clock,
  CheckCircle,
  AlertCircle,
  RefreshCw01,
  Plus,
  Eye,
  Trash01,
  BarChart01,
  Users01,
  ShoppingCart01,
  CurrencyDollar,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Mock reports data
const reportsData = [
  {
    id: "RPT-001",
    name: "Monthly Sales Report",
    description: "Complete sales analysis for December 2024",
    type: "sales",
    status: "completed",
    generatedAt: "Dec 18, 2024 10:30 AM",
    size: "2.4 MB",
    format: "PDF",
    period: "Dec 2024",
  },
  {
    id: "RPT-002",
    name: "User Growth Analytics",
    description: "User registration and activity trends",
    type: "users",
    status: "completed",
    generatedAt: "Dec 17, 2024 09:15 AM",
    size: "1.8 MB",
    format: "PDF",
    period: "Q4 2024",
  },
  {
    id: "RPT-003",
    name: "Revenue Breakdown",
    description: "Category-wise revenue analysis",
    type: "revenue",
    status: "processing",
    generatedAt: "Dec 18, 2024 11:00 AM",
    size: "-",
    format: "Excel",
    period: "Nov 2024",
  },
  {
    id: "RPT-004",
    name: "Seller Performance Report",
    description: "Top sellers and performance metrics",
    type: "sellers",
    status: "completed",
    generatedAt: "Dec 15, 2024 03:45 PM",
    size: "3.1 MB",
    format: "PDF",
    period: "Nov 2024",
  },
  {
    id: "RPT-005",
    name: "Order Fulfillment Report",
    description: "Order processing and delivery times",
    type: "orders",
    status: "failed",
    generatedAt: "Dec 16, 2024 02:30 PM",
    size: "-",
    format: "PDF",
    period: "Dec 2024",
  },
  {
    id: "RPT-006",
    name: "Inventory Status Report",
    description: "Stock levels and inventory alerts",
    type: "inventory",
    status: "completed",
    generatedAt: "Dec 14, 2024 08:00 AM",
    size: "1.2 MB",
    format: "Excel",
    period: "Dec 2024",
  },
];

const reportTemplates = [
  { id: "1", name: "Sales Report", icon: BarChart01, description: "Revenue and sales metrics" },
  { id: "2", name: "User Analytics", icon: Users01, description: "User growth and engagement" },
  { id: "3", name: "Order Report", icon: ShoppingCart01, description: "Order processing data" },
  { id: "4", name: "Financial Report", icon: CurrencyDollar, description: "Revenue and payouts" },
];

const statusConfig: Record<string, { color: "success" | "warning" | "error"; icon: typeof CheckCircle; label: string }> = {
  completed: { color: "success", icon: CheckCircle, label: "Completed" },
  processing: { color: "warning", icon: RefreshCw01, label: "Processing" },
  failed: { color: "error", icon: AlertCircle, label: "Failed" },
};

export default function ReportsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState<string>("all");

  const filteredReports = reportsData.filter((report) => {
    const matchesSearch = report.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "all" || report.type === typeFilter;
    return matchesSearch && matchesType;
  });

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="min-w-0">
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Reports</h1>
          <p className="text-sm text-[#898989]">Generate and download platform reports.</p>
        </div>
        <Button color="primary" size="sm" iconLeading={Plus} className="bg-[#000080] hover:bg-[#000080]/90 flex-shrink-0 self-start sm:self-auto">
          Generate Report
        </Button>
      </div>

      {/* Quick Report Templates */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        {reportTemplates.map((template) => (
          <button
            key={template.id}
            className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4 text-left hover:border-[#000080] hover:shadow-sm transition-all"
          >
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-[#000080]/10 flex-shrink-0">
                <template.icon className="size-4 sm:size-5 text-[#000080]" />
              </div>
              <div className="min-w-0">
                <div className="text-sm font-medium text-gray-900 truncate">{template.name}</div>
                <div className="text-xs text-[#898989] hidden sm:block">{template.description}</div>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-3 sm:gap-4 lg:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-[#000080]/10 flex-shrink-0">
              <File01 className="size-4 sm:size-5 text-[#000080]" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">{reportsData.length}</div>
              <div className="text-xs text-[#898989]">Total Reports</div>
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
                {reportsData.filter(r => r.status === "completed").length}
              </div>
              <div className="text-xs text-[#898989]">Completed</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-amber-50 flex-shrink-0">
              <Clock className="size-4 sm:size-5 text-amber-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {reportsData.filter(r => r.status === "processing").length}
              </div>
              <div className="text-xs text-[#898989]">Processing</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-3 sm:p-4">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-10 items-center justify-center rounded-lg bg-red-50 flex-shrink-0">
              <AlertCircle className="size-4 sm:size-5 text-red-600" />
            </div>
            <div className="min-w-0">
              <div className="text-lg sm:text-xl font-bold text-gray-900">
                {reportsData.filter(r => r.status === "failed").length}
              </div>
              <div className="text-xs text-[#898989]">Failed</div>
            </div>
          </div>
        </div>
      </div>

      {/* Reports List */}
      <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
        <div className="flex flex-col gap-3 p-3 sm:p-4 sm:flex-row sm:items-center sm:justify-between border-b border-gray-200">
          <div className="relative flex-1 max-w-md">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search reports..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 px-3 text-sm text-gray-900 placeholder:text-[#898989] focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </div>
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-[#000080] focus:outline-none"
          >
            <option value="all">All Types</option>
            <option value="sales">Sales</option>
            <option value="users">Users</option>
            <option value="revenue">Revenue</option>
            <option value="orders">Orders</option>
          </select>
        </div>

        {/* Mobile Cards View */}
        <div className="divide-y divide-gray-100 sm:hidden">
          {filteredReports.map((report) => {
            const statusInfo = statusConfig[report.status];
            return (
              <div key={report.id} className="p-4 space-y-3">
                <div className="flex items-start justify-between">
                  <div className="min-w-0 flex-1">
                    <div className="text-sm font-medium text-gray-900">{report.name}</div>
                    <div className="text-xs text-[#898989] mt-1">{report.description}</div>
                  </div>
                  <Badge type="pill-color" size="sm" color={statusInfo.color}>
                    {statusInfo.label}
                  </Badge>
                </div>
                <div className="flex items-center justify-between text-xs text-[#898989]">
                  <span>{report.period}</span>
                  <span>{report.format} • {report.size}</span>
                </div>
                <div className="flex items-center gap-2">
                  {report.status === "completed" && (
                    <Button color="secondary" size="sm" iconLeading={Download01} className="flex-1">
                      Download
                    </Button>
                  )}
                  {report.status === "failed" && (
                    <Button color="secondary" size="sm" iconLeading={RefreshCw01} className="flex-1">
                      Retry
                    </Button>
                  )}
                  <button className="p-2 rounded-lg text-[#898989] hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-200">
                    <Trash01 className="size-4" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Desktop Table View */}
        <div className="hidden sm:block overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-200">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Report</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Period</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Generated</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Size</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#898989] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredReports.map((report) => {
                const statusInfo = statusConfig[report.status];
                const StatusIcon = statusInfo.icon;
                return (
                  <tr key={report.id} className="hover:bg-gray-50 transition-colors">
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-3">
                        <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
                          <File01 className="size-5 text-gray-600" />
                        </div>
                        <div>
                          <div className="text-sm font-medium text-gray-900">{report.name}</div>
                          <div className="text-xs text-[#898989]">{report.description}</div>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-4 text-sm text-gray-900">{report.period}</td>
                    <td className="px-4 py-4 text-sm text-[#898989]">{report.generatedAt}</td>
                    <td className="px-4 py-4">
                      <div className="flex items-center gap-2">
                        <StatusIcon className={`size-4 ${
                          report.status === "completed" ? "text-green-500" :
                          report.status === "processing" ? "text-amber-500 animate-spin" :
                          "text-red-500"
                        }`} />
                        <Badge type="pill-color" size="sm" color={statusInfo.color}>
                          {statusInfo.label}
                        </Badge>
                      </div>
                    </td>
                    <td className="px-4 py-4">
                      <span className="text-sm text-gray-900">{report.size}</span>
                      <span className="text-xs text-[#898989] ml-1">({report.format})</span>
                    </td>
                    <td className="px-4 py-4">
                      <div className="flex items-center justify-end gap-1">
                        {report.status === "completed" && (
                          <button className="p-2 rounded-lg text-[#898989] hover:bg-[#000080]/10 hover:text-[#000080] transition-colors">
                            <Download01 className="size-4" />
                          </button>
                        )}
                        {report.status === "failed" && (
                          <button className="p-2 rounded-lg text-[#898989] hover:bg-amber-50 hover:text-amber-600 transition-colors">
                            <RefreshCw01 className="size-4" />
                          </button>
                        )}
                        <button className="p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors">
                          <Eye className="size-4" />
                        </button>
                        <button className="p-2 rounded-lg text-[#898989] hover:bg-red-50 hover:text-red-600 transition-colors">
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
      </div>
    </div>
  );
}
