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
  Home05,
  Users01,
  Building07,
  ShoppingCart01,
  Package,
  BarChart01,
  Shield01,
  CreditCard01,
  MessageSquare01,
  File01,
  Tag01,
  Plus,
} from "@untitledui/icons";
import { useState, useEffect } from "react";
import { useAuth, UserButton } from "@clerk/nextjs";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const navLinks = [
  { label: "Dashboard", icon: Home05, href: "/admin" },
  { label: "Users", icon: Users01, href: "/admin/users", badge: "142" },
  { label: "Customers", icon: Building07, href: "/admin/customers" },
  { label: "Sellers", icon: Shield01, href: "/admin/sellers", badge: "23" },
  { label: "Orders", icon: ShoppingCart01, href: "/admin/orders", badge: "18" },
  { label: "Listings", icon: Package, href: "/admin/listings" },
  { label: "Transactions", icon: CreditCard01, href: "/admin/transactions" },
  { label: "Categories", icon: Tag01, href: "/admin/categories" },
  { label: "Analytics", icon: BarChart01, href: "/admin/analytics" },
  { label: "Reports", icon: File01, href: "/admin/reports" },
  { label: "Messages", icon: MessageSquare01, href: "/admin/messages", badge: "5" },
  { label: "Notifications", icon: Bell01, href: "/admin/notifications" },
  { label: "Settings", icon: Settings01, href: "/admin/settings" },
];

export function AdminHeader() {
  const { isSignedIn, isLoaded } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [mobileMenuOpen]);

  return (
    <header className="sticky top-0 z-50 border-b border-gray-200 bg-white">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Left - Logo & Admin Title */}
        <div className="flex items-center gap-4">
          <Link href="/admin" className="flex items-center gap-3">
            <Image
              src="/sitelogo.png"
              alt="Admin Dashboard"
              width={100}
              height={20}
              className="h-8 w-auto"
            />
            <div className="hidden sm:flex items-center gap-2">
              <div className="h-6 w-px bg-gray-300" />
              <Badge type="pill-color" size="sm" color="brand">
                Admin CRM
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
              placeholder="Search users, orders, listings..."
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-500/20"
            />
          </div>
        </div>

        {/* Right - Actions */}
        <div className="flex items-center gap-2 sm:gap-4">
          {/* Quick Links - Desktop */}
          <div className="hidden items-center gap-1 md:flex">
            <Link
              href="/admin/help"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <HelpCircle className="size-4" />
              <span className="hidden lg:inline">Help</span>
            </Link>
            <Link
              href="/admin/notifications"
              className="relative flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Bell01 className="size-5" />
              <span className="absolute -top-0.5 -right-0.5 flex size-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white">
                7
              </span>
            </Link>
            <Link
              href="/admin/settings"
              className="flex items-center justify-center rounded-lg p-2 text-gray-500 hover:bg-gray-100 hover:text-gray-900 transition-colors"
            >
              <Settings01 className="size-5" />
            </Link>
          </div>

          {/* Divider */}
          <div className="hidden h-8 w-px bg-gray-200 md:block" />

          {/* View Site Button */}
          <Link href="/" className="hidden sm:block">
            <Button color="secondary" size="sm">
              View Site
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

      {/* Full-Screen Mobile Menu */}
      {mobileMenuOpen && (
        <div className="fixed inset-0 top-16 bg-white lg:hidden flex flex-col z-50">
          {/* Mobile Search */}
          <div className="p-4 border-b border-gray-200">
            <div className="relative">
              <SearchLg className="absolute left-3 top-1/2 -translate-y-1/2 size-4 text-gray-500" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search users, orders, listings..."
                className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-10 pr-4 text-sm text-gray-900 placeholder:text-gray-500 focus:border-[#000080] focus:outline-none focus:ring-2 focus:ring-[#000080]/20"
              />
            </div>
          </div>

          {/* Navigation Links */}
          <div className="flex-1 overflow-y-auto p-4">
            <nav className="space-y-1">
              {navLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    className="flex items-center justify-between rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-[#000080]/5 hover:text-[#000080] transition-colors"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="flex items-center gap-3">
                      <Icon className="size-5 text-gray-500" />
                      {link.label}
                    </span>
                    {link.badge && (
                      <Badge type="pill-color" size="sm" color="brand">
                        {link.badge}
                      </Badge>
                    )}
                  </Link>
                );
              })}
            </nav>

            {/* Divider */}
            <div className="my-4 border-t border-gray-200" />

            {/* Quick Links */}
            <div className="space-y-1">
              <Link
                href="/admin/help"
                className="flex items-center gap-3 rounded-lg px-3 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 hover:text-gray-900 transition-colors"
                onClick={() => setMobileMenuOpen(false)}
              >
                <HelpCircle className="size-5 text-gray-500" />
                Help Center
              </Link>
            </div>
          </div>

          {/* Bottom Actions - Sticky */}
          <div className="sticky bottom-0 border-t border-gray-200 bg-white p-4 space-y-3">
            <Link href="/" className="block" onClick={() => setMobileMenuOpen(false)}>
              <Button color="secondary" size="md" className="w-full justify-center">
                View Site
              </Button>
            </Link>
            {isLoaded && !isSignedIn && (
              <Link href="/login" className="block" onClick={() => setMobileMenuOpen(false)}>
                <Button color="primary" size="md" className="w-full justify-center bg-[#000080] hover:bg-[#000080]/90">
                  Sign In
                </Button>
              </Link>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
