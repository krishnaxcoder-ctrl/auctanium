"use client";

import { useState } from "react";
import Image from "next/image";
import {
  FolderOpen,
  SearchLg,
  Plus,
  Edit02,
  Trash01,
  ChevronRight,
  Package,
  Eye,
  TrendUp01,
  TrendDown01,
  GridDots,
  List,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

// Mock categories data
const categoriesData = [
  {
    id: "CAT-001",
    name: "Electronics",
    slug: "electronics",
    image: "https://images.unsplash.com/photo-1498049794561-7780e7231661?w=200&h=200&fit=crop",
    description: "Gadgets, devices, and electronic accessories",
    products: 1245,
    revenue: 7407335,
    growth: 18.5,
    status: "active",
    subcategories: ["Smartphones", "Laptops", "Tablets", "Audio", "Wearables"],
    created: "Jan 15, 2024",
  },
  {
    id: "CAT-002",
    name: "Fashion",
    slug: "fashion",
    image: "https://images.unsplash.com/photo-1445205170230-053b83016050?w=200&h=200&fit=crop",
    description: "Clothing, footwear, and fashion accessories",
    products: 2890,
    revenue: 5634870,
    growth: 12.3,
    status: "active",
    subcategories: ["Men's Wear", "Women's Wear", "Footwear", "Accessories"],
    created: "Jan 15, 2024",
  },
  {
    id: "CAT-003",
    name: "Home & Living",
    slug: "home-living",
    image: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=200&h=200&fit=crop",
    description: "Furniture, decor, and home essentials",
    products: 1567,
    revenue: 3791274,
    growth: -2.4,
    status: "active",
    subcategories: ["Furniture", "Decor", "Kitchen", "Bedding"],
    created: "Jan 15, 2024",
  },
  {
    id: "CAT-004",
    name: "Sports & Fitness",
    slug: "sports-fitness",
    image: "https://images.unsplash.com/photo-1461896836934- voices?w=200&h=200&fit=crop",
    description: "Sports equipment and fitness gear",
    products: 876,
    revenue: 1946848,
    growth: 8.7,
    status: "active",
    subcategories: ["Gym Equipment", "Sports Gear", "Outdoor", "Nutrition"],
    created: "Feb 20, 2024",
  },
  {
    id: "CAT-005",
    name: "Books & Media",
    slug: "books-media",
    image: "https://images.unsplash.com/photo-1512820790803-83ca734da794?w=200&h=200&fit=crop",
    description: "Books, eBooks, and digital media",
    products: 3456,
    revenue: 1572435,
    growth: 15.2,
    status: "active",
    subcategories: ["Fiction", "Non-Fiction", "Academic", "Comics"],
    created: "Mar 10, 2024",
  },
  {
    id: "CAT-006",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image: "https://images.unsplash.com/photo-1596462502278-27bfdc403348?w=200&h=200&fit=crop",
    description: "Skincare, makeup, and personal care products",
    products: 1234,
    revenue: 2845690,
    growth: 22.8,
    status: "active",
    subcategories: ["Skincare", "Makeup", "Hair Care", "Fragrances"],
    created: "Apr 5, 2024",
  },
  {
    id: "CAT-007",
    name: "Automotive",
    slug: "automotive",
    image: "https://images.unsplash.com/photo-1489824904134-891ab64532f1?w=200&h=200&fit=crop",
    description: "Car accessories and automotive parts",
    products: 654,
    revenue: 1245780,
    growth: 5.4,
    status: "inactive",
    subcategories: ["Accessories", "Parts", "Tools", "Care Products"],
    created: "May 1, 2024",
  },
];

export default function CategoriesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [statusFilter, setStatusFilter] = useState<string>("all");

  const filteredCategories = categoriesData.filter((category) => {
    const matchesSearch = category.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      category.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || category.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const totalProducts = categoriesData.reduce((sum, cat) => sum + cat.products, 0);
  const totalRevenue = categoriesData.reduce((sum, cat) => sum + cat.revenue, 0);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="text-sm text-[#898989]">Manage product categories and subcategories.</p>
        </div>
        <Button color="primary" size="sm" iconLeading={Plus} className="bg-[#000080] hover:bg-[#000080]/90">
          Add Category
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-[#000080]/10">
              <FolderOpen className="size-5 text-[#000080]" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{categoriesData.length}</div>
              <div className="text-xs text-[#898989]">Total Categories</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-green-50">
              <Package className="size-5 text-green-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">{totalProducts.toLocaleString()}</div>
              <div className="text-xs text-[#898989]">Total Products</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-amber-50">
              <TrendUp01 className="size-5 text-amber-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">₹{(totalRevenue / 10000000).toFixed(1)}Cr</div>
              <div className="text-xs text-[#898989]">Total Revenue</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-gray-200 bg-white p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-purple-50">
              <FolderOpen className="size-5 text-purple-600" />
            </div>
            <div>
              <div className="text-xl font-bold text-gray-900">28</div>
              <div className="text-xs text-[#898989]">Subcategories</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="rounded-xl border border-gray-200 bg-white p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-[#898989]" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search categories..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-[#898989] focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
            />
          </div>
          <div className="flex items-center gap-2">
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="rounded-lg border border-gray-200 bg-white px-3 py-2 text-sm text-gray-600 focus:border-[#000080] focus:outline-none"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
            <div className="flex rounded-lg border border-gray-200 p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={`p-2 rounded ${viewMode === "grid" ? "bg-[#000080] text-white" : "text-gray-500 hover:text-gray-900"}`}
              >
                <GridDots className="size-4" />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={`p-2 rounded ${viewMode === "list" ? "bg-[#000080] text-white" : "text-gray-500 hover:text-gray-900"}`}
              >
                <List className="size-4" />
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Categories Grid/List */}
      {viewMode === "grid" ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {filteredCategories.map((category) => (
            <div key={category.id} className="rounded-xl border border-gray-200 bg-white overflow-hidden hover:shadow-md transition-shadow">
              <div className="relative h-32 bg-gray-100">
                <Image src={category.image} alt={category.name} fill className="object-cover" />
                <div className="absolute top-3 right-3">
                  <Badge type="pill-color" size="sm" color={category.status === "active" ? "success" : "gray"}>
                    {category.status}
                  </Badge>
                </div>
              </div>
              <div className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900">{category.name}</h3>
                    <p className="text-sm text-[#898989] line-clamp-1">{category.description}</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 mt-4 pt-4 border-t border-gray-100">
                  <div>
                    <div className="text-sm font-semibold text-gray-900">{category.products.toLocaleString()}</div>
                    <div className="text-xs text-[#898989]">Products</div>
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-gray-900">₹{(category.revenue / 100000).toFixed(1)}L</div>
                    <div className="text-xs text-[#898989]">Revenue</div>
                  </div>
                  <div>
                    <div className={`flex items-center gap-1 text-sm font-semibold ${category.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {category.growth >= 0 ? <TrendUp01 className="size-3" /> : <TrendDown01 className="size-3" />}
                      {category.growth >= 0 ? "+" : ""}{category.growth}%
                    </div>
                    <div className="text-xs text-[#898989]">Growth</div>
                  </div>
                </div>
                <div className="flex items-center gap-2 mt-4">
                  <Button color="secondary" size="sm" className="flex-1" iconLeading={Edit02}>
                    Edit
                  </Button>
                  <button className="p-2 rounded-lg text-[#898989] hover:bg-red-50 hover:text-red-600 transition-colors border border-gray-200">
                    <Trash01 className="size-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="rounded-xl border border-gray-200 bg-white overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-200 bg-gray-50">
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Category</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Products</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Revenue</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Growth</th>
                <th className="px-4 py-3 text-left text-xs font-medium text-[#898989] uppercase tracking-wider">Status</th>
                <th className="px-4 py-3 text-right text-xs font-medium text-[#898989] uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100">
              {filteredCategories.map((category) => (
                <tr key={category.id} className="hover:bg-gray-50 transition-colors">
                  <td className="px-4 py-4">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 overflow-hidden rounded-lg bg-gray-100">
                        <Image src={category.image} alt={category.name} fill className="object-cover" />
                      </div>
                      <div>
                        <div className="text-sm font-medium text-gray-900">{category.name}</div>
                        <div className="text-xs text-[#898989]">{category.subcategories.length} subcategories</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-4 text-sm text-gray-900">{category.products.toLocaleString()}</td>
                  <td className="px-4 py-4 text-sm font-semibold text-gray-900">₹{category.revenue.toLocaleString('en-IN')}</td>
                  <td className="px-4 py-4">
                    <div className={`flex items-center gap-1 text-sm ${category.growth >= 0 ? "text-green-600" : "text-red-600"}`}>
                      {category.growth >= 0 ? <TrendUp01 className="size-3" /> : <TrendDown01 className="size-3" />}
                      {category.growth >= 0 ? "+" : ""}{category.growth}%
                    </div>
                  </td>
                  <td className="px-4 py-4">
                    <Badge type="pill-color" size="sm" color={category.status === "active" ? "success" : "gray"}>
                      {category.status}
                    </Badge>
                  </td>
                  <td className="px-4 py-4">
                    <div className="flex items-center justify-end gap-1">
                      <button className="p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Eye className="size-4" />
                      </button>
                      <button className="p-2 rounded-lg text-[#898989] hover:bg-gray-100 hover:text-gray-900 transition-colors">
                        <Edit02 className="size-4" />
                      </button>
                      <button className="p-2 rounded-lg text-[#898989] hover:bg-red-50 hover:text-red-600 transition-colors">
                        <Trash01 className="size-4" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
