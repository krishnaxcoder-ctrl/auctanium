"use client";

import { useState } from "react";
import Image from "next/image";
import {
  Folder,
  Plus,
  Edit02,
  ChevronDown,
  ChevronRight,
  X,
  Upload01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

// Mock categories data
const categoriesData = [
  {
    id: "CAT-001",
    name: "Electronics",
    slug: "electronics",
    image: "",
    subcategories: [
      { id: "SUB-001", name: "Smartphones", slug: "smartphones", image: "" },
      { id: "SUB-002", name: "Laptops", slug: "laptops", image: "" },
      { id: "SUB-003", name: "Tablets", slug: "tablets", image: "" },
      { id: "SUB-004", name: "Audio", slug: "audio", image: "" },
      { id: "SUB-005", name: "Wearables", slug: "wearables", image: "" },
    ],
  },
  {
    id: "CAT-002",
    name: "Fashion",
    slug: "fashion",
    image: "",
    subcategories: [
      { id: "SUB-006", name: "Men's Wear", slug: "mens-wear", image: "" },
      { id: "SUB-007", name: "Women's Wear", slug: "womens-wear", image: "" },
      { id: "SUB-008", name: "Footwear", slug: "footwear", image: "" },
      { id: "SUB-009", name: "Accessories", slug: "accessories", image: "" },
    ],
  },
  {
    id: "CAT-003",
    name: "Home & Living",
    slug: "home-living",
    image: "",
    subcategories: [
      { id: "SUB-010", name: "Furniture", slug: "furniture", image: "" },
      { id: "SUB-011", name: "Decor", slug: "decor", image: "" },
      { id: "SUB-012", name: "Kitchen", slug: "kitchen", image: "" },
      { id: "SUB-013", name: "Bedding", slug: "bedding", image: "" },
    ],
  },
  {
    id: "CAT-004",
    name: "Sports & Fitness",
    slug: "sports-fitness",
    image: "",
    subcategories: [
      { id: "SUB-014", name: "Gym Equipment", slug: "gym-equipment", image: "" },
      { id: "SUB-015", name: "Sports Gear", slug: "sports-gear", image: "" },
      { id: "SUB-016", name: "Outdoor", slug: "outdoor", image: "" },
      { id: "SUB-017", name: "Nutrition", slug: "nutrition", image: "" },
    ],
  },
  {
    id: "CAT-005",
    name: "Books & Media",
    slug: "books-media",
    image: "",
    subcategories: [
      { id: "SUB-018", name: "Fiction", slug: "fiction", image: "" },
      { id: "SUB-019", name: "Non-Fiction", slug: "non-fiction", image: "" },
      { id: "SUB-020", name: "Academic", slug: "academic", image: "" },
      { id: "SUB-021", name: "Comics", slug: "comics", image: "" },
    ],
  },
  {
    id: "CAT-006",
    name: "Beauty & Personal Care",
    slug: "beauty-personal-care",
    image: "",
    subcategories: [
      { id: "SUB-022", name: "Skincare", slug: "skincare", image: "" },
      { id: "SUB-023", name: "Makeup", slug: "makeup", image: "" },
      { id: "SUB-024", name: "Hair Care", slug: "hair-care", image: "" },
      { id: "SUB-025", name: "Fragrances", slug: "fragrances", image: "" },
    ],
  },
  {
    id: "CAT-007",
    name: "Automotive",
    slug: "automotive",
    image: "",
    subcategories: [
      { id: "SUB-026", name: "Accessories", slug: "auto-accessories", image: "" },
      { id: "SUB-027", name: "Parts", slug: "parts", image: "" },
      { id: "SUB-028", name: "Tools", slug: "tools", image: "" },
      { id: "SUB-029", name: "Care Products", slug: "care-products", image: "" },
    ],
  },
];

type EditItem = {
  id: string;
  name: string;
  slug: string;
  image: string;
  type: "category" | "subcategory";
  parentId?: string;
} | null;

export default function CategoriesPage() {
  const [expandedCategory, setExpandedCategory] = useState<string | null>(null);
  const [editItem, setEditItem] = useState<EditItem>(null);
  const [formData, setFormData] = useState({ name: "", slug: "", image: "" });

  const toggleCategory = (id: string) => {
    setExpandedCategory(expandedCategory === id ? null : id);
  };

  const openEditModal = (item: EditItem) => {
    if (item) {
      setFormData({ name: item.name, slug: item.slug, image: item.image });
      setEditItem(item);
    }
  };

  const closeModal = () => {
    setEditItem(null);
    setFormData({ name: "", slug: "", image: "" });
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "");
  };

  const handleNameChange = (value: string) => {
    setFormData({
      ...formData,
      name: value,
      slug: generateSlug(value),
    });
  };

  const handleSave = () => {
    // Save logic here
    console.log("Saving:", formData);
    closeModal();
  };

  return (
    <div className="space-y-6 max-w-full overflow-x-hidden">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-xl sm:text-2xl font-semibold text-gray-900">Categories</h1>
          <p className="text-sm text-gray-500">Manage product categories</p>
        </div>
        <Button
          color="primary"
          size="sm"
          iconLeading={Plus}
          onClick={() =>
            openEditModal({
              id: "",
              name: "",
              slug: "",
              image: "",
              type: "category",
            })
          }
        >
          Add Category
        </Button>
      </div>

      {/* Categories List */}
      <div className="space-y-3">
        {categoriesData.map((category) => {
          const isExpanded = expandedCategory === category.id;
          return (
            <div
              key={category.id}
              className="rounded-xl border border-gray-200 bg-white overflow-hidden"
            >
              {/* Category Header */}
              <div
                className="flex items-center justify-between p-4 cursor-pointer hover:bg-gray-50 transition-colors"
                onClick={() => toggleCategory(category.id)}
              >
                <div className="flex items-center gap-3">
                  <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
                    <Folder className="size-5 text-brand-600" />
                  </div>
                  <div>
                    <div className="font-medium text-gray-900">{category.name}</div>
                    <div className="text-xs text-gray-500">{category.subcategories.length} subcategories</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal({
                        id: category.id,
                        name: category.name,
                        slug: category.slug,
                        image: category.image,
                        type: "category",
                      });
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                  >
                    <Edit02 className="size-4" />
                  </button>
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      openEditModal({
                        id: "",
                        name: "",
                        slug: "",
                        image: "",
                        type: "subcategory",
                        parentId: category.id,
                      });
                    }}
                    className="p-2 rounded-lg text-gray-400 hover:bg-brand-50 hover:text-brand-600 transition-colors"
                  >
                    <Plus className="size-4" />
                  </button>
                  <div className={`transition-transform duration-200 ${isExpanded ? "rotate-180" : ""}`}>
                    <ChevronDown className="size-5 text-gray-400" />
                  </div>
                </div>
              </div>

              {/* Subcategories */}
              {isExpanded && (
                <div className="border-t border-gray-100 bg-gray-50 p-3">
                  <div className="space-y-2">
                    {category.subcategories.map((sub) => (
                      <div
                        key={sub.id}
                        className="flex items-center justify-between rounded-lg bg-white px-4 py-3 border border-gray-200"
                      >
                        <div className="flex items-center gap-3">
                          <ChevronRight className="size-4 text-gray-400" />
                          <span className="text-sm text-gray-700">{sub.name}</span>
                        </div>
                        <button
                          onClick={() =>
                            openEditModal({
                              id: sub.id,
                              name: sub.name,
                              slug: sub.slug,
                              image: sub.image,
                              type: "subcategory",
                              parentId: category.id,
                            })
                          }
                          className="p-1.5 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
                        >
                          <Edit02 className="size-4" />
                        </button>
                      </div>
                    ))}
                    {/* Add Subcategory Button */}
                    <button
                      onClick={() =>
                        openEditModal({
                          id: "",
                          name: "",
                          slug: "",
                          image: "",
                          type: "subcategory",
                          parentId: category.id,
                        })
                      }
                      className="flex items-center gap-2 w-full rounded-lg border border-dashed border-gray-300 px-4 py-3 text-sm text-gray-500 hover:border-brand-500 hover:text-brand-600 hover:bg-brand-50/50 transition-colors"
                    >
                      <Plus className="size-4" />
                      Add Subcategory
                    </button>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Edit Modal */}
      {editItem && (
        <div className="fixed inset-0 z-50 sm:flex sm:items-center sm:justify-center">
          {/* Backdrop for desktop */}
          <div
            className="hidden sm:block absolute inset-0 bg-black/50"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="relative h-full w-full bg-white flex flex-col sm:h-auto sm:w-full sm:max-w-md sm:rounded-2xl sm:shadow-xl sm:max-h-[90vh]">
            {/* Modal Header */}
            <div className="flex items-center justify-between px-4 py-4 border-b border-gray-200">
              <h2 className="text-lg font-semibold text-gray-900">
                {editItem.id ? "Edit" : "Add"} {editItem.type === "category" ? "Category" : "Subcategory"}
              </h2>
              <button
                onClick={closeModal}
                className="p-2 rounded-lg text-gray-400 hover:bg-gray-100 hover:text-gray-700 transition-colors"
              >
                <X className="size-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6">
              <div className="space-y-6">
                {/* Image Upload */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Image</label>
                  <div className="relative">
                    {formData.image ? (
                      <div className="relative w-full h-40 rounded-xl overflow-hidden border border-gray-200">
                        <Image
                          src={formData.image}
                          alt="Category image"
                          fill
                          className="object-cover"
                        />
                        <button
                          onClick={() => setFormData({ ...formData, image: "" })}
                          className="absolute top-2 right-2 p-1.5 rounded-lg bg-white/90 text-gray-600 hover:bg-white hover:text-red-600 transition-colors"
                        >
                          <X className="size-4" />
                        </button>
                      </div>
                    ) : (
                      <label className="flex flex-col items-center justify-center w-full h-40 rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 cursor-pointer hover:border-brand-500 hover:bg-brand-50/50 transition-colors">
                        <Upload01 className="size-8 text-gray-400 mb-2" />
                        <span className="text-sm text-gray-500">Click to upload</span>
                        <span className="text-xs text-gray-400 mt-1">PNG, JPG up to 5MB</span>
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) => {
                            const file = e.target.files?.[0];
                            if (file) {
                              const url = URL.createObjectURL(file);
                              setFormData({ ...formData, image: url });
                            }
                          }}
                        />
                      </label>
                    )}
                  </div>
                </div>

                {/* Name */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => handleNameChange(e.target.value)}
                    placeholder="Enter category name"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                </div>

                {/* Slug */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Slug</label>
                  <input
                    type="text"
                    value={formData.slug}
                    onChange={(e) => setFormData({ ...formData, slug: e.target.value })}
                    placeholder="category-slug"
                    className="w-full rounded-lg border border-gray-300 bg-white px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-brand-500 focus:outline-none focus:ring-1 focus:ring-brand-500"
                  />
                  <p className="mt-1.5 text-xs text-gray-500">
                    URL: /category/{formData.slug || "slug"}
                  </p>
                </div>
              </div>
            </div>

            {/* Modal Footer */}
            <div className="flex items-center justify-end gap-3 px-4 py-4 border-t border-gray-200 bg-gray-50 sm:rounded-b-2xl">
              <Button color="secondary" size="md" onClick={closeModal}>
                Cancel
              </Button>
              <Button color="primary" size="md" onClick={handleSave}>
                {editItem.id ? "Save Changes" : "Create"}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
