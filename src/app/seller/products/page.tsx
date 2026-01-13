"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  SearchLg,
  Plus,
  FilterLines,
  DotsVertical,
  Edit02,
  Trash01,
  Copy01,
  Archive,
  Eye,
  ChevronDown,
  Package,
  AlertCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Badge } from "@/components/base/badges/badges";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Select } from "@/components/base/select/select";

const products = [
  {
    id: "1",
    name: "MacBook Pro 16\" M3 Max",
    image: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=200&h=200&fit=crop",
    status: "active",
    inventory: 12,
    category: "Electronics",
    price: 2499,
    comparePrice: 2799,
    sku: "MBP-16-M3",
    vendor: "Apple",
  },
  {
    id: "2",
    name: "iPhone 15 Pro Max 256GB",
    image: "https://images.unsplash.com/photo-1695048133142-1a20484d2569?w=200&h=200&fit=crop",
    status: "active",
    inventory: 28,
    category: "Electronics",
    price: 1199,
    comparePrice: null,
    sku: "IP15-PM-256",
    vendor: "Apple",
  },
  {
    id: "3",
    name: "AirPods Pro 2nd Generation",
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop",
    status: "active",
    inventory: 45,
    category: "Electronics",
    price: 249,
    comparePrice: 279,
    sku: "APP-2-GEN",
    vendor: "Apple",
  },
  {
    id: "4",
    name: "Apple Watch Ultra 2",
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
    status: "low_stock",
    inventory: 3,
    category: "Electronics",
    price: 799,
    comparePrice: null,
    sku: "AW-U2",
    vendor: "Apple",
  },
  {
    id: "5",
    name: "iPad Pro 12.9\" M2",
    image: "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=200&h=200&fit=crop",
    status: "active",
    inventory: 15,
    category: "Electronics",
    price: 1099,
    comparePrice: 1199,
    sku: "IPP-129-M2",
    vendor: "Apple",
  },
  {
    id: "6",
    name: "Sony WH-1000XM5 Headphones",
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=200&h=200&fit=crop",
    status: "draft",
    inventory: 0,
    category: "Audio",
    price: 399,
    comparePrice: null,
    sku: "SONY-XM5",
    vendor: "Sony",
  },
  {
    id: "7",
    name: "Samsung 49\" Odyssey G9",
    image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=200&h=200&fit=crop",
    status: "out_of_stock",
    inventory: 0,
    category: "Electronics",
    price: 1299,
    comparePrice: 1499,
    sku: "SAM-G9-49",
    vendor: "Samsung",
  },
  {
    id: "8",
    name: "Logitech MX Master 3S",
    image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=200&h=200&fit=crop",
    status: "active",
    inventory: 67,
    category: "Accessories",
    price: 99,
    comparePrice: null,
    sku: "LOG-MX3S",
    vendor: "Logitech",
  },
];

const statusConfig: Record<string, { label: string; color: "success" | "warning" | "error" | "gray" }> = {
  active: { label: "Active", color: "success" },
  draft: { label: "Draft", color: "gray" },
  low_stock: { label: "Low Stock", color: "warning" },
  out_of_stock: { label: "Out of Stock", color: "error" },
};

const statusOptions = [
  { id: "all", label: "All Status" },
  { id: "active", label: "Active" },
  { id: "draft", label: "Draft" },
  { id: "low_stock", label: "Low Stock" },
  { id: "out_of_stock", label: "Out of Stock" },
];

const sortOptions = [
  { id: "newest", label: "Newest first" },
  { id: "oldest", label: "Oldest first" },
  { id: "name_asc", label: "Name A-Z" },
  { id: "name_desc", label: "Name Z-A" },
  { id: "price_low", label: "Price: Low to High" },
  { id: "price_high", label: "Price: High to Low" },
  { id: "inventory_low", label: "Inventory: Low to High" },
  { id: "inventory_high", label: "Inventory: High to Low" },
];

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedProducts, setSelectedProducts] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState("all");
  const [sortBy, setSortBy] = useState("newest");
  const [activeMenu, setActiveMenu] = useState<string | null>(null);

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.sku.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus = statusFilter === "all" || product.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const toggleSelectAll = () => {
    if (selectedProducts.length === filteredProducts.length) {
      setSelectedProducts([]);
    } else {
      setSelectedProducts(filteredProducts.map((p) => p.id));
    }
  };

  const toggleSelectProduct = (id: string) => {
    setSelectedProducts((prev) =>
      prev.includes(id) ? prev.filter((p) => p !== id) : [...prev, id]
    );
  };

  const stats = {
    total: products.length,
    active: products.filter((p) => p.status === "active").length,
    draft: products.filter((p) => p.status === "draft").length,
    lowStock: products.filter((p) => p.status === "low_stock").length,
    outOfStock: products.filter((p) => p.status === "out_of_stock").length,
  };

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-primary">Products</h1>
          <p className="text-xs sm:text-sm text-tertiary">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-2 sm:gap-3">
          <Button color="secondary" size="sm" iconLeading={FilterLines}>
            <span className="hidden sm:inline">Export</span>
          </Button>
          <Link href="/seller/products/new">
            <Button color="primary" size="sm" iconLeading={Plus}>
              <span className="hidden sm:inline">Add Product</span>
              <span className="sm:hidden">Add</span>
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-2 sm:gap-3 sm:grid-cols-3 lg:grid-cols-5">
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
              <Package className="size-4 text-brand-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.total}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Total</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-success-50 flex-shrink-0">
              <Package className="size-4 text-success-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.active}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Active</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-gray-100 flex-shrink-0">
              <Package className="size-4 text-gray-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.draft}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Draft</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-warning-50 flex-shrink-0">
              <AlertCircle className="size-4 text-warning-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.lowStock}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Low Stock</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-2 sm:p-3 col-span-2 sm:col-span-1">
          <div className="flex items-center gap-2 sm:gap-3">
            <div className="flex size-8 sm:size-9 items-center justify-center rounded-lg bg-error-50 flex-shrink-0">
              <Package className="size-4 text-error-600" />
            </div>
            <div className="min-w-0">
              <div className="text-base sm:text-lg font-semibold text-primary">{stats.outOfStock}</div>
              <div className="text-[10px] sm:text-xs text-tertiary truncate">Out of Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="space-y-2 sm:space-y-3">
        <Input
          icon={SearchLg}
          size="sm"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          placeholder="Search products..."
        />
        <div className="flex gap-2 overflow-x-auto pb-1 -mb-1">
          <div className="flex-shrink-0 w-24 sm:w-28">
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
          <div className="flex-shrink-0 w-28 sm:w-36">
            <Select
              size="sm"
              placeholder="Sort"
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
      {selectedProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3 rounded-lg bg-brand-50 px-3 py-2 sm:py-3">
          <span className="text-xs sm:text-sm font-medium text-brand-700 flex-shrink-0">
            {selectedProducts.length} selected
          </span>
          <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto">
            <Button color="secondary" size="sm" iconLeading={Edit02} className="flex-shrink-0">
              <span className="hidden sm:inline">Edit</span>
            </Button>
            <Button color="secondary" size="sm" iconLeading={Archive} className="flex-shrink-0">
              <span className="hidden sm:inline">Archive</span>
            </Button>
            <Button color="primary-destructive" size="sm" iconLeading={Trash01} className="flex-shrink-0">
              <span className="hidden sm:inline">Delete</span>
            </Button>
          </div>
        </div>
      )}

      {/* Products Table - Desktop */}
      <div className="hidden md:block rounded-xl border border-secondary bg-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[800px]">
            <thead>
              <tr className="border-b border-secondary bg-secondary/50">
                <th className="px-4 py-3 text-left w-12">
                  <Checkbox
                    isSelected={selectedProducts.length === filteredProducts.length && filteredProducts.length > 0}
                    isIndeterminate={selectedProducts.length > 0 && selectedProducts.length < filteredProducts.length}
                    onChange={toggleSelectAll}
                  />
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Product
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Status
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Inventory
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary hidden lg:table-cell">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Price
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-tertiary w-28">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-secondary">
              {filteredProducts.map((product) => (
                <tr key={product.id} className="hover:bg-secondary/30 transition-colors">
                  <td className="px-4 py-3">
                    <Checkbox
                      isSelected={selectedProducts.includes(product.id)}
                      onChange={() => toggleSelectProduct(product.id)}
                    />
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative size-10 overflow-hidden rounded-lg bg-secondary flex-shrink-0">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="min-w-0">
                        <Link
                          href={`/seller/products/${product.id}`}
                          className="text-sm font-medium text-primary hover:text-brand-600 transition-colors truncate block"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-tertiary">{product.sku}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={statusConfig[product.status].color}
                    >
                      {statusConfig[product.status].label}
                    </Badge>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`text-sm ${product.inventory <= 5 ? "text-error-600 font-medium" : "text-primary"}`}>
                      {product.inventory} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3 hidden lg:table-cell">
                    <span className="text-sm text-secondary">{product.category}</span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div>
                      <span className="text-sm font-medium text-primary">${product.price}</span>
                      {product.comparePrice && (
                        <span className="ml-1 text-xs text-tertiary line-through">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <div className="relative flex items-center justify-end gap-2">
                      <Link href={`/seller/products/${product.id}`}>
                        <Button color="tertiary" size="sm" iconLeading={Edit02}>
                          Edit
                        </Button>
                      </Link>
                      <button
                        onClick={() => setActiveMenu(activeMenu === product.id ? null : product.id)}
                        className="p-1.5 rounded-lg hover:bg-secondary transition-colors"
                      >
                        <DotsVertical className="size-4 text-tertiary" />
                      </button>
                      {activeMenu === product.id && (
                        <div className="absolute right-0 top-full z-10 mt-1 w-40 rounded-lg border border-secondary bg-primary py-1 shadow-lg">
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                            <Eye className="size-4" />
                            View
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                            <Copy01 className="size-4" />
                            Duplicate
                          </button>
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-secondary hover:bg-secondary transition-colors">
                            <Archive className="size-4" />
                            Archive
                          </button>
                          <hr className="my-1 border-secondary" />
                          <button className="flex w-full items-center gap-2 px-3 py-2 text-sm text-error-600 hover:bg-secondary transition-colors">
                            <Trash01 className="size-4" />
                            Delete
                          </button>
                        </div>
                      )}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Empty State */}
        {filteredProducts.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <Package className="size-12 text-tertiary mb-4" />
            <h3 className="text-lg font-medium text-primary">No products found</h3>
            <p className="mt-1 text-sm text-tertiary">
              {searchQuery || statusFilter !== "all"
                ? "Try adjusting your search or filters"
                : "Get started by adding your first product"}
            </p>
            {!searchQuery && statusFilter === "all" && (
              <Link href="/seller/products/new" className="mt-4">
                <Button color="primary" size="sm" iconLeading={Plus}>
                  Add Product
                </Button>
              </Link>
            )}
          </div>
        )}
      </div>

      {/* Products Cards - Mobile */}
      <div className="md:hidden space-y-3">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/seller/products/${product.id}`}
            className="block rounded-xl border border-secondary bg-primary p-3 hover:bg-secondary/30 transition-colors"
          >
            <div className="flex items-start gap-3">
              <div onClick={(e) => e.preventDefault()}>
                <Checkbox
                  isSelected={selectedProducts.includes(product.id)}
                  onChange={() => toggleSelectProduct(product.id)}
                />
              </div>
              <div className="relative size-14 overflow-hidden rounded-lg bg-secondary flex-shrink-0">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-start justify-between gap-2 mb-1">
                  <p className="text-sm font-medium text-primary truncate">{product.name}</p>
                  <span className="text-sm font-semibold text-primary flex-shrink-0">${product.price}</span>
                </div>
                <p className="text-xs text-tertiary mb-2">{product.sku}</p>
                <div className="flex items-center gap-2 flex-wrap">
                  <Badge
                    type="pill-color"
                    size="sm"
                    color={statusConfig[product.status].color}
                  >
                    {statusConfig[product.status].label}
                  </Badge>
                  <span className={`text-xs ${product.inventory <= 5 ? "text-error-600 font-medium" : "text-tertiary"}`}>
                    {product.inventory} in stock
                  </span>
                </div>
              </div>
            </div>
          </Link>
        ))}

        {/* Empty State - Mobile */}
        {filteredProducts.length === 0 && (
          <div className="rounded-xl border border-secondary bg-primary p-8">
            <div className="flex flex-col items-center justify-center text-center">
              <Package className="size-10 text-tertiary mb-3" />
              <h3 className="text-base font-medium text-primary">No products found</h3>
              <p className="mt-1 text-sm text-tertiary">
                {searchQuery || statusFilter !== "all"
                  ? "Try adjusting your search or filters"
                  : "Get started by adding your first product"}
              </p>
              {!searchQuery && statusFilter === "all" && (
                <Link href="/seller/products/new" className="mt-4">
                  <Button color="primary" size="sm" iconLeading={Plus}>
                    Add Product
                  </Button>
                </Link>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-xs sm:text-sm text-tertiary">
            Showing {filteredProducts.length} of {products.length} products
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
    </div>
  );
}
