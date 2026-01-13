"use client";

import Link from "next/link";
import Image from "next/image";
import {
  Bell01,
  Settings01,
  HelpCircle,
  Menu01,
  X,
  SearchLg,
  Plus,
  Home01,
  Package,
  ShoppingCart01,
  Users01,
  BarChart01,
  MessageSquare01,
  BookOpen01,
  Users03,
  Phone01,
} from "@untitledui/icons";
import { useState, useEffect } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

export function SellerHeader() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Logo & Seller Title */}
        <div className="flex items-center gap-4">
          <Link href="/seller" className="flex items-center gap-3">
            <Image
              src="/sitelogo.png"
              alt="Seller Dashboard"
              width={100}
              height={20}
              className="h-8 w-auto"
            />
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-6 w-px bg-gray-300" />
              <Badge type="pill-color" size="sm" color="brand">
                Seller Center
              </Badge>
            </div>
          </Link>
        </div>

        {/* Center - Search (Desktop) */}
        <div className="hidden flex-1 max-w-xl mx-8 lg:block">
          <div className="relative">
            <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search orders, products, customers..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Links - Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/seller/help"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <HelpCircle className="size-4" />
              <span className="hidden lg:inline">Help</span>
            </Link>
            <Link
              href="/seller/notifications"
              className="relative flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Bell01 className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                3
              </span>
            </Link>
            <Link
              href="/seller/settings"
              className="flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Settings01 className="size-5" />
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 md:block" />

          {/* View Store Button */}
          <Link href="/" className="hidden sm:block">
            <Button color="secondary" size="sm">
              View Store
            </Button>
          </Link>

          {/* User */}
          {isLoaded && isSignedIn ? (
            <UserButton
              afterSignOutUrl="/"
              appearance={{
                elements: {
                  avatarBox: "w-9 h-9 rounded-full border-2 border-brand-500"
                }
              }}
            />
          ) : (
            <Link href="/login">
              <Button color="primary" size="sm">
                Sign In
              </Button>
            </Link>
          )}

          {/* Mobile Menu Button */}
          <button
            type="button"
            className="flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 md:hidden"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X className="size-5" /> : <Menu01 className="size-5" />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white md:hidden flex flex-col z-50">
          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 py-4">
            {/* Main Navigation */}
            <div className="space-y-1 mb-4">
              <Link
                href="/seller"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Home01 className="size-4" />
                Overview
              </Link>
              <Link
                href="/seller/products"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Package className="size-4" />
                Products
              </Link>
              <Link
                href="/seller/orders"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <ShoppingCart01 className="size-4" />
                  Orders
                </span>
                <Badge type="pill-color" size="sm" color="warning">5</Badge>
              </Link>
              <Link
                href="/seller/customers"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Users01 className="size-4" />
                Customers
              </Link>
              <Link
                href="/seller/analytics"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <BarChart01 className="size-4" />
                Analytics
              </Link>
              <Link
                href="/seller/messages"
                className="flex items-center justify-between rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <span className="flex items-center gap-3">
                  <MessageSquare01 className="size-4" />
                  Messages
                </span>
                <Badge type="pill-color" size="sm" color="error">3</Badge>
              </Link>
              <Link
                href="/seller/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                onClick={() => setMobileMenuOpen(false)}
              >
                <Settings01 className="size-4" />
                Settings
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4" />

            {/* Seller Resources */}
            <div className="mb-2">
              <p className="px-3 text-xs font-semibold text-gray-400 uppercase tracking-wider mb-2">
                Seller Resources
              </p>
              <div className="space-y-1">
                <Link
                  href="/seller/help"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <HelpCircle className="size-4" />
                  Help Center
                </Link>
                <Link
                  href="/seller/guide"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <BookOpen01 className="size-4" />
                  Seller Guide
                </Link>
                <Link
                  href="/seller/community"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Users03 className="size-4" />
                  Community
                </Link>
                <Link
                  href="/seller/support"
                  className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Phone01 className="size-4" />
                  Contact Support
                </Link>
              </div>
            </div>

          </div>

          {/* Sticky Bottom Buttons */}
          <div className="border-t border-gray-200 bg-white px-4 py-3 flex gap-3">
            <Link
              href="/"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl border border-gray-200 px-4 py-3 text-sm font-semibold text-gray-700 hover:bg-gray-50 transition-colors"
              onClick={() => setMobileMenuOpen(false)}
            >
              View Store
            </Link>
            <Link
              href="/seller/products/new"
              className="flex-1 flex items-center justify-center gap-2 rounded-xl bg-brand-600 px-4 py-3 text-sm font-semibold text-white hover:bg-brand-700 transition-colors shadow-sm"
              onClick={() => setMobileMenuOpen(false)}
            >
              <Plus className="size-4" />
              Add Product
            </Link>
          </div>
        </div>
      )}
    </header>
  );
}
