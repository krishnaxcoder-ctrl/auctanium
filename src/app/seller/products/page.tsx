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
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-xl font-semibold text-primary">Products</h1>
          <p className="text-sm text-tertiary">Manage your product inventory</p>
        </div>
        <div className="flex items-center gap-3">
          <Button color="secondary" size="sm" iconLeading={FilterLines}>
            Export
          </Button>
          <Link href="/seller/products/new">
            <Button color="primary" size="sm" iconLeading={Plus}>
              Add Product
            </Button>
          </Link>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-5">
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
              <Package className="size-5 text-brand-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.total}</div>
              <div className="text-xs text-tertiary">Total Products</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-success-50">
              <Package className="size-5 text-success-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.active}</div>
              <div className="text-xs text-tertiary">Active</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-gray-100">
              <Package className="size-5 text-gray-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.draft}</div>
              <div className="text-xs text-tertiary">Draft</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-warning-50">
              <AlertCircle className="size-5 text-warning-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.lowStock}</div>
              <div className="text-xs text-tertiary">Low Stock</div>
            </div>
          </div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-4">
          <div className="flex items-center gap-3">
            <div className="flex size-10 items-center justify-center rounded-lg bg-error-50">
              <Package className="size-5 text-error-600" />
            </div>
            <div>
              <div className="text-xl font-semibold text-primary">{stats.outOfStock}</div>
              <div className="text-xs text-tertiary">Out of Stock</div>
            </div>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-1 items-center gap-3">
          <div className="w-full max-w-sm">
            <Input
              icon={SearchLg}
              size="sm"
              value={searchQuery}
              onChange={(value) => setSearchQuery(value)}
              placeholder="Search products..."
            />
          </div>
          <div className="w-40">
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
      {selectedProducts.length > 0 && (
        <div className="flex items-center gap-4 rounded-lg bg-brand-50 px-4 py-3">
          <span className="text-sm font-medium text-brand-700">
            {selectedProducts.length} product{selectedProducts.length > 1 ? "s" : ""} selected
          </span>
          <div className="flex items-center gap-2">
            <Button color="secondary" size="sm">
              Edit
            </Button>
            <Button color="secondary" size="sm" iconLeading={Archive}>
              Archive
            </Button>
            <Button color="primary-destructive" size="sm" iconLeading={Trash01}>
              Delete
            </Button>
          </div>
        </div>
      )}

      {/* Products Table */}
      <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-secondary bg-secondary/50">
                <th className="px-4 py-3 text-left">
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
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Category
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Price
                </th>
                <th className="px-4 py-3 text-left text-xs font-medium uppercase tracking-wider text-tertiary">
                  Vendor
                </th>
                <th className="px-4 py-3 text-right text-xs font-medium uppercase tracking-wider text-tertiary">
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
                      <div className="relative size-12 overflow-hidden rounded-lg bg-secondary">
                        <Image
                          src={product.image}
                          alt={product.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div>
                        <Link
                          href={`/seller/products/${product.id}`}
                          className="text-sm font-medium text-primary hover:text-brand-600 transition-colors"
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
                  <td className="px-4 py-3">
                    <span className={`text-sm ${product.inventory <= 5 ? "text-error-600 font-medium" : "text-primary"}`}>
                      {product.inventory} in stock
                    </span>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-secondary">{product.category}</span>
                  </td>
                  <td className="px-4 py-3">
                    <div>
                      <span className="text-sm font-medium text-primary">${product.price}</span>
                      {product.comparePrice && (
                        <span className="ml-2 text-xs text-tertiary line-through">
                          ${product.comparePrice}
                        </span>
                      )}
                    </div>
                  </td>
                  <td className="px-4 py-3">
                    <span className="text-sm text-secondary">{product.vendor}</span>
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

      {/* Pagination */}
      {filteredProducts.length > 0 && (
        <div className="flex items-center justify-between">
          <p className="text-sm text-tertiary">
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
