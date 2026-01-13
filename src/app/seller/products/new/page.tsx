"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  ArrowLeft,
  Plus,
  Trash01,
  ChevronDown,
  ChevronUp,
  Image01,
  Globe02,
  Package,
  Truck01,
  Eye,
  XClose,
  Bold01,
  Italic01,
  Underline01,
  Link01,
  Image03,
  AlignLeft,
  AlignCenter,
  List,
  Code01,
  Type01,
  FaceSmile,
  DotsHorizontal,
  SearchLg,
  Edit02,
  Upload01,
  File06,
  Stars01,
  ShoppingBag01,
  Building07,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Toggle } from "@/components/base/toggle/toggle";
import { Checkbox } from "@/components/base/checkbox/checkbox";

const categories = [
  { id: "", label: "Choose a product category" },
  { id: "electronics", label: "Electronics" },
  { id: "clothing", label: "Clothing & Apparel" },
  { id: "home", label: "Home & Garden" },
  { id: "beauty", label: "Beauty & Personal Care" },
  { id: "sports", label: "Sports & Outdoors" },
  { id: "toys", label: "Toys & Games" },
  { id: "books", label: "Books & Media" },
  { id: "food", label: "Food & Beverages" },
];

const packageOptions = [
  { id: "default", label: "Store default • Sample box - 22 × 13.7 × 4.2 cm, 0 kg" },
  { id: "small", label: "Small box - 15 × 10 × 5 cm" },
  { id: "medium", label: "Medium box - 30 × 20 × 15 cm" },
  { id: "large", label: "Large box - 50 × 40 × 30 cm" },
  { id: "custom", label: "Custom dimensions" },
];

const weightUnits = [
  { id: "kg", label: "kg" },
  { id: "g", label: "g" },
  { id: "lb", label: "lb" },
  { id: "oz", label: "oz" },
];

const countries = [
  { id: "", label: "Select" },
  { id: "us", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "ca", label: "Canada" },
  { id: "au", label: "Australia" },
  { id: "in", label: "India" },
  { id: "de", label: "Germany" },
  { id: "fr", label: "France" },
  { id: "jp", label: "Japan" },
  { id: "cn", label: "China" },
];

const themeTemplates = [
  { id: "default", label: "Default product" },
  { id: "featured", label: "Featured product" },
  { id: "minimal", label: "Minimal" },
  { id: "gallery", label: "Gallery" },
];

interface ProductImage {
  id: string;
  url: string;
  name: string;
}

interface Variant {
  id: string;
  name: string;
  values: string[];
}

export default function NewProductPage() {
  // Basic Info
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Media
  const [images, setImages] = useState<ProductImage[]>([]);

  // Category
  const [category, setCategory] = useState("");

  // Pricing
  const [price, setPrice] = useState("");
  const [showCompareAt, setShowCompareAt] = useState(false);
  const [compareAtPrice, setCompareAtPrice] = useState("");
  const [showUnitPrice, setShowUnitPrice] = useState(false);
  const [unitPrice, setUnitPrice] = useState("");
  const [chargeTax, setChargeTax] = useState(true);
  const [showCostPerItem, setShowCostPerItem] = useState(false);
  const [costPerItem, setCostPerItem] = useState("");

  // Inventory
  const [inventoryTracked, setInventoryTracked] = useState(true);
  const [quantity, setQuantity] = useState("0");
  const [sku, setSku] = useState("");
  const [barcode, setBarcode] = useState("");
  const [continueSellingWhenOutOfStock, setContinueSellingWhenOutOfStock] = useState(false);

  // Shipping
  const [isPhysicalProduct, setIsPhysicalProduct] = useState(true);
  const [packageType, setPackageType] = useState("default");
  const [weight, setWeight] = useState("");
  const [weightUnit, setWeightUnit] = useState("kg");
  const [countryOfOrigin, setCountryOfOrigin] = useState("");
  const [hsCode, setHsCode] = useState("");

  // Variants
  const [variants, setVariants] = useState<Variant[]>([]);

  // SEO
  const [seoTitle, setSeoTitle] = useState("");
  const [seoDescription, setSeoDescription] = useState("");

  // Organization (Sidebar)
  const [status, setStatus] = useState("active");
  const [publishOnlineStore, setPublishOnlineStore] = useState(true);
  const [publishPOS, setPublishPOS] = useState(false);
  const [productType, setProductType] = useState("");
  const [vendor, setVendor] = useState("");
  const [collections, setCollections] = useState("");
  const [tags, setTags] = useState("");
  const [themeTemplate, setThemeTemplate] = useState("default");

  // Collapsible Sections
  const [expandedSections, setExpandedSections] = useState({
    moreDetails: false,
    customs: false,
    seo: false,
  });

  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onload = (event) => {
        const newImage: ProductImage = {
          id: Math.random().toString(36).substr(2, 9),
          url: event.target?.result as string,
          name: file.name,
        };
        setImages((prev) => [...prev, newImage]);
      };
      reader.readAsDataURL(file);
    });
  };

  const removeImage = (id: string) => {
    setImages((prev) => prev.filter((img) => img.id !== id));
  };

  const addVariant = () => {
    const newVariant: Variant = {
      id: Math.random().toString(36).substr(2, 9),
      name: "",
      values: [""],
    };
    setVariants((prev) => [...prev, newVariant]);
  };

  const removeVariant = (id: string) => {
    setVariants((prev) => prev.filter((v) => v.id !== id));
  };

  const updateVariantName = (id: string, name: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, name } : v))
    );
  };

  const updateVariantValues = (id: string, values: string) => {
    setVariants((prev) =>
      prev.map((v) => (v.id === id ? { ...v, values: values.split(",").map((s) => s.trim()) } : v))
    );
  };

  return (
    <div className="pb-20 min-w-0">
      {/* Header */}
      <div className="flex items-center gap-2 sm:gap-3 mb-4 sm:mb-6">
        <Link
          href="/seller/products"
          className="text-tertiary hover:text-primary transition-colors flex-shrink-0"
        >
          <ArrowLeft className="size-5" />
        </Link>
        <h1 className="text-base sm:text-lg font-semibold text-primary">Add product</h1>
      </div>

      <div className="grid gap-4 sm:gap-6 lg:grid-cols-[1fr,280px] xl:grid-cols-[1fr,320px]">
        {/* Main Content */}
        <div className="space-y-4 min-w-0">
          {/* Title & Description */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4 space-y-4">
            {/* Title */}
            <div>
              <label className="text-sm font-medium text-primary mb-1.5 block">Title</label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Short sleeve t-shirt"
                className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Description with Rich Text Toolbar */}
            <div>
              <label className="text-sm font-medium text-primary mb-1.5 block">Description</label>
              {/* Toolbar */}
              <div className="flex items-center gap-0.5 sm:gap-1 p-1.5 sm:p-2 border border-secondary rounded-t-lg bg-secondary/30 overflow-x-auto">
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex items-center gap-0.5 text-sm text-tertiary flex-shrink-0">
                  <Stars01 className="size-4" />
                  <ChevronDown className="size-3" />
                </button>
                <div className="w-px h-5 bg-secondary mx-0.5 sm:mx-1 flex-shrink-0" />
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex items-center gap-0.5 text-xs sm:text-sm text-tertiary flex-shrink-0">
                  <span className="hidden sm:inline">Paragraph</span>
                  <span className="sm:hidden">P</span>
                  <ChevronDown className="size-3" />
                </button>
                <div className="w-px h-5 bg-secondary mx-0.5 sm:mx-1 flex-shrink-0" />
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0">
                  <Bold01 className="size-4 text-tertiary" />
                </button>
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0">
                  <Italic01 className="size-4 text-tertiary" />
                </button>
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0">
                  <Underline01 className="size-4 text-tertiary" />
                </button>
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex items-center flex-shrink-0 hidden sm:flex">
                  <Type01 className="size-4 text-tertiary" />
                  <ChevronDown className="size-3 text-tertiary" />
                </button>
                <div className="w-px h-5 bg-secondary mx-0.5 sm:mx-1 flex-shrink-0 hidden sm:block" />
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex items-center flex-shrink-0">
                  <AlignLeft className="size-4 text-tertiary" />
                  <ChevronDown className="size-3 text-tertiary" />
                </button>
                <div className="w-px h-5 bg-secondary mx-0.5 sm:mx-1 flex-shrink-0" />
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0">
                  <Link01 className="size-4 text-tertiary" />
                </button>
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0 hidden sm:flex">
                  <Image03 className="size-4 text-tertiary" />
                </button>
                <button className="p-1 sm:p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0">
                  <DotsHorizontal className="size-4 text-tertiary" />
                </button>
              </div>
              {/* Text Area */}
              <textarea
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                rows={6}
                className="w-full px-3 py-3 text-sm border border-t-0 border-secondary rounded-b-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y"
              />
            </div>
          </div>

          {/* Media */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-3 block">Media</label>
            <div className="border-2 border-dashed border-secondary rounded-lg p-4 sm:p-8 text-center">
              <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3">
                <label className="cursor-pointer w-full sm:w-auto">
                  <input
                    type="file"
                    accept="image/*,video/*"
                    multiple
                    onChange={handleFileUpload}
                    className="hidden"
                  />
                  <span className="inline-flex items-center justify-center gap-2 px-3 sm:px-4 py-2 text-sm font-medium text-primary bg-primary border border-secondary rounded-lg hover:bg-secondary transition-colors w-full sm:w-auto">
                    Upload new
                  </span>
                </label>
                <button className="px-3 sm:px-4 py-2 text-sm font-medium text-primary bg-primary border border-secondary rounded-lg hover:bg-secondary transition-colors w-full sm:w-auto">
                  Select existing
                </button>
              </div>
              <p className="mt-3 text-xs text-tertiary">Accepts images, videos, or 3D models</p>
            </div>

            {/* Uploaded Images */}
            {images.length > 0 && (
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-3 mt-4">
                {images.map((image) => (
                  <div key={image.id} className="relative group aspect-square rounded-lg overflow-hidden border border-secondary">
                    <Image src={image.url} alt={image.name} fill className="object-cover" />
                    <button
                      onClick={() => removeImage(image.id)}
                      className="absolute top-1 right-1 p-1 rounded-full bg-black/50 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                    >
                      <XClose className="size-3" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Category */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-1.5 block">Category</label>
            <Select
              size="sm"
              placeholder="Choose a product category"
              items={categories}
              selectedKey={category}
              onSelectionChange={(key) => setCategory(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
            <p className="mt-2 text-xs text-tertiary">
              Determines tax rates and adds metafields to improve search, filters, and cross-channel sales
            </p>
          </div>

          {/* Price */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-3 block">Price</label>
            <div className="relative max-w-[160px] sm:max-w-[200px]">
              <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
              <input
                type="number"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="0.00"
                className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
              />
            </div>

            {/* Price Options */}
            <div className="flex items-center gap-1.5 sm:gap-2 mt-4 flex-wrap">
              <button
                onClick={() => setShowCompareAt(!showCompareAt)}
                className={`px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  showCompareAt
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary border-secondary text-tertiary hover:bg-secondary"
                }`}
              >
                Compare at
              </button>
              <button
                onClick={() => setShowUnitPrice(!showUnitPrice)}
                className={`px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  showUnitPrice
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary border-secondary text-tertiary hover:bg-secondary"
                }`}
              >
                Unit price
              </button>
              <div className="flex items-center">
                <span className="px-2 sm:px-3 py-1.5 text-xs font-medium text-tertiary border border-r-0 border-secondary rounded-l-lg bg-primary">
                  Tax
                </span>
                <button
                  onClick={() => setChargeTax(!chargeTax)}
                  className={`px-2 sm:px-3 py-1.5 text-xs font-medium rounded-r-lg border transition-colors ${
                    chargeTax
                      ? "bg-secondary border-secondary text-primary"
                      : "bg-primary border-secondary text-tertiary"
                  }`}
                >
                  {chargeTax ? "Yes" : "No"}
                </button>
              </div>
              <button
                onClick={() => setShowCostPerItem(!showCostPerItem)}
                className={`px-2 sm:px-3 py-1.5 text-xs font-medium rounded-lg border transition-colors ${
                  showCostPerItem
                    ? "bg-secondary border-secondary text-primary"
                    : "bg-primary border-secondary text-tertiary hover:bg-secondary"
                }`}
              >
                Cost
              </button>
            </div>

            {/* Expanded Price Fields */}
            {(showCompareAt || showUnitPrice || showCostPerItem) && (
              <div className="grid gap-4 sm:grid-cols-3 mt-4 pt-4 border-t border-secondary">
                {showCompareAt && (
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Compare-at price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
                      <input
                        type="number"
                        value={compareAtPrice}
                        onChange={(e) => setCompareAtPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
                {showUnitPrice && (
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Unit price</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
                      <input
                        type="number"
                        value={unitPrice}
                        onChange={(e) => setUnitPrice(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
                {showCostPerItem && (
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Cost per item</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">$</span>
                      <input
                        type="number"
                        value={costPerItem}
                        onChange={(e) => setCostPerItem(e.target.value)}
                        placeholder="0.00"
                        className="w-full pl-7 pr-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Inventory */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <div className="flex items-center justify-between mb-4 gap-2">
              <label className="text-sm font-medium text-primary">Inventory</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-tertiary hidden sm:inline">Inventory tracked</span>
                <span className="text-xs text-tertiary sm:hidden">Tracked</span>
                <Toggle
                  size="sm"
                  isSelected={inventoryTracked}
                  onChange={setInventoryTracked}
                />
              </div>
            </div>

            {inventoryTracked && (
              <div className="border border-secondary rounded-lg overflow-hidden">
                <div className="grid grid-cols-2 bg-secondary/50 px-3 py-2 text-xs font-medium text-tertiary">
                  <span>Location</span>
                  <span className="text-right">Qty</span>
                </div>
                <div className="grid grid-cols-2 items-center px-3 py-3 border-t border-secondary">
                  <span className="text-sm text-primary truncate">Shop location</span>
                  <div className="flex justify-end">
                    <input
                      type="number"
                      value={quantity}
                      onChange={(e) => setQuantity(e.target.value)}
                      className="w-16 sm:w-20 px-2 sm:px-3 py-1.5 text-sm text-center rounded-lg border border-secondary bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* More details */}
          <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
            <button
              onClick={() => toggleSection("moreDetails")}
              className="flex w-full items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
            >
              <span className="text-sm font-medium text-primary">More details</span>
              {expandedSections.moreDetails ? (
                <ChevronUp className="size-4 text-tertiary" />
              ) : (
                <ChevronDown className="size-4 text-tertiary" />
              )}
            </button>
            {expandedSections.moreDetails && (
              <div className="px-4 pb-4 space-y-4 border-t border-secondary pt-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">SKU (Stock Keeping Unit)</label>
                    <input
                      type="text"
                      value={sku}
                      onChange={(e) => setSku(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Barcode (ISBN, UPC, GTIN, etc.)</label>
                    <input
                      type="text"
                      value={barcode}
                      onChange={(e) => setBarcode(e.target.value)}
                      className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>
                <Checkbox
                  isSelected={continueSellingWhenOutOfStock}
                  onChange={setContinueSellingWhenOutOfStock}
                >
                  <span className="text-sm text-secondary">Continue selling when out of stock</span>
                </Checkbox>
              </div>
            )}
          </div>

          {/* Shipping */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <div className="flex items-center justify-between mb-4 gap-2">
              <label className="text-sm font-medium text-primary">Shipping</label>
              <div className="flex items-center gap-2">
                <span className="text-xs text-tertiary hidden sm:inline">Physical product</span>
                <span className="text-xs text-tertiary sm:hidden">Physical</span>
                <Toggle
                  size="sm"
                  isSelected={isPhysicalProduct}
                  onChange={setIsPhysicalProduct}
                />
              </div>
            </div>

            {isPhysicalProduct && (
              <div className="space-y-4">
                <div className="grid gap-4 sm:grid-cols-2">
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Package</label>
                    <Select
                      size="sm"
                      items={packageOptions}
                      selectedKey={packageType}
                      onSelectionChange={(key) => setPackageType(key as string)}
                    >
                      {(item) => <Select.Item id={item.id} label={item.label} />}
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Product weight</label>
                    <div className="flex gap-2">
                      <input
                        type="number"
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="0.0"
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                      <Select
                        size="sm"
                        items={weightUnits}
                        selectedKey={weightUnit}
                        onSelectionChange={(key) => setWeightUnit(key as string)}
                        className="w-20"
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Customs information */}
          {isPhysicalProduct && (
            <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
              <button
                onClick={() => toggleSection("customs")}
                className="flex w-full items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
              >
                <span className="text-sm font-medium text-primary">Customs information</span>
                {expandedSections.customs ? (
                  <ChevronUp className="size-4 text-tertiary" />
                ) : (
                  <ChevronDown className="size-4 text-tertiary" />
                )}
              </button>
              {expandedSections.customs && (
                <div className="px-4 pb-4 space-y-4 border-t border-secondary pt-4">
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Country/Region of origin</label>
                    <Select
                      size="sm"
                      placeholder="Select"
                      items={countries}
                      selectedKey={countryOfOrigin}
                      onSelectionChange={(key) => setCountryOfOrigin(key as string)}
                    >
                      {(item) => <Select.Item id={item.id} label={item.label} />}
                    </Select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-tertiary mb-1.5 block">Harmonized System (HS) code</label>
                    <input
                      type="text"
                      value={hsCode}
                      onChange={(e) => setHsCode(e.target.value)}
                      placeholder="Enter a 6-digit code or search by keyword"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Variants */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-3 block">Variants</label>

            {variants.length === 0 ? (
              <button
                onClick={addVariant}
                className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors"
              >
                <Plus className="size-4" />
                Add options like size or color
              </button>
            ) : (
              <div className="space-y-4">
                {variants.map((variant, index) => (
                  <div key={variant.id} className="p-4 border border-secondary rounded-lg space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-tertiary">Option {index + 1}</span>
                      <button
                        onClick={() => removeVariant(variant.id)}
                        className="text-tertiary hover:text-error-600 transition-colors"
                      >
                        <Trash01 className="size-4" />
                      </button>
                    </div>
                    <input
                      type="text"
                      value={variant.name}
                      onChange={(e) => updateVariantName(variant.id, e.target.value)}
                      placeholder="Option name (e.g., Size, Color)"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                    <input
                      type="text"
                      value={variant.values.join(", ")}
                      onChange={(e) => updateVariantValues(variant.id, e.target.value)}
                      placeholder="Option values (comma separated)"
                      className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>
                ))}
                <button
                  onClick={addVariant}
                  className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition-colors"
                >
                  <Plus className="size-4" />
                  Add another option
                </button>
              </div>
            )}
          </div>

          {/* Search engine listing */}
          <div className="rounded-xl border border-secondary bg-primary overflow-hidden">
            <button
              onClick={() => toggleSection("seo")}
              className="flex w-full items-center justify-between p-4 hover:bg-secondary/30 transition-colors"
            >
              <div>
                <span className="text-sm font-medium text-primary block">Search engine listing</span>
                <span className="text-xs text-tertiary">Add a title and description to see how this product might appear in a search engine listing</span>
              </div>
              <Edit02 className="size-4 text-tertiary flex-shrink-0" />
            </button>
            {expandedSections.seo && (
              <div className="px-4 pb-4 space-y-4 border-t border-secondary pt-4">
                {/* SEO Preview */}
                <div className="p-3 bg-secondary/30 rounded-lg">
                  <p className="text-brand-600 text-base hover:underline cursor-pointer">
                    {seoTitle || title || "Page title"}
                  </p>
                  <p className="text-success-700 text-xs mt-0.5">
                    yourstore.com/products/{title?.toLowerCase().replace(/\s+/g, "-") || "product-url"}
                  </p>
                  <p className="text-xs text-tertiary mt-1 line-clamp-2">
                    {seoDescription || description || "Product description will appear here..."}
                  </p>
                </div>
                <div>
                  <label className="text-xs font-medium text-tertiary mb-1.5 block">Page title</label>
                  <input
                    type="text"
                    value={seoTitle}
                    onChange={(e) => setSeoTitle(e.target.value)}
                    placeholder={title || "Page title"}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                  <p className="mt-1 text-xs text-tertiary">{seoTitle.length}/70 characters</p>
                </div>
                <div>
                  <label className="text-xs font-medium text-tertiary mb-1.5 block">Meta description</label>
                  <textarea
                    value={seoDescription}
                    onChange={(e) => setSeoDescription(e.target.value)}
                    placeholder={description || "Description"}
                    rows={3}
                    className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-y"
                  />
                  <p className="mt-1 text-xs text-tertiary">{seoDescription.length}/160 characters</p>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-4 min-w-0">
          {/* Status */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-2 block">Status</label>
            <Select
              size="sm"
              items={[
                { id: "active", label: "Active" },
                { id: "draft", label: "Draft" },
              ]}
              selectedKey={status}
              onSelectionChange={(key) => setStatus(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>

          {/* Publishing */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-primary">Publishing</label>
              <button className="text-tertiary hover:text-primary transition-colors">
                <DotsHorizontal className="size-4" />
              </button>
            </div>
            <div className="space-y-2">
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  isSelected={publishOnlineStore}
                  onChange={setPublishOnlineStore}
                />
                <span className="flex items-center gap-1.5 text-sm text-secondary">
                  <Globe02 className="size-4" />
                  Online Store
                </span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <Checkbox
                  isSelected={publishPOS}
                  onChange={setPublishPOS}
                />
                <span className="flex items-center gap-1.5 text-sm text-secondary">
                  <ShoppingBag01 className="size-4" />
                  Point of Sale
                </span>
              </label>
            </div>
          </div>

          {/* Product organization */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-3 block">Product organization</label>
            <div className="space-y-4">
              <div>
                <label className="text-xs font-medium text-tertiary mb-1.5 block">Type</label>
                <input
                  type="text"
                  value={productType}
                  onChange={(e) => setProductType(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-tertiary mb-1.5 block">Vendor</label>
                <input
                  type="text"
                  value={vendor}
                  onChange={(e) => setVendor(e.target.value)}
                  className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-tertiary mb-1.5 block">Collections</label>
                <div className="relative">
                  <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-tertiary" />
                  <input
                    type="text"
                    value={collections}
                    onChange={(e) => setCollections(e.target.value)}
                    placeholder="Search collections"
                    className="w-full pl-9 pr-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                  />
                </div>
              </div>
              <div>
                <label className="text-xs font-medium text-tertiary mb-1.5 block">Tags</label>
                <input
                  type="text"
                  value={tags}
                  onChange={(e) => setTags(e.target.value)}
                  placeholder="Add tags"
                  className="w-full px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* Theme template */}
          <div className="rounded-xl border border-secondary bg-primary p-3 sm:p-4">
            <label className="text-sm font-medium text-primary mb-2 block">Theme template</label>
            <Select
              size="sm"
              items={themeTemplates}
              selectedKey={themeTemplate}
              onSelectionChange={(key) => setThemeTemplate(key as string)}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>
        </div>
      </div>

      {/* Save Button - Fixed Bottom */}
      <div className="fixed bottom-0 left-0 right-0 p-3 sm:p-4 bg-primary border-t border-secondary z-10">
        <div className="flex items-center justify-between sm:justify-end gap-2">
          <Link href="/seller/products" className="sm:hidden">
            <Button color="secondary" size="sm">
              Cancel
            </Button>
          </Link>
          <Button color="primary" size="sm">
            Save product
          </Button>
        </div>
      </div>
    </div>
  );
}
