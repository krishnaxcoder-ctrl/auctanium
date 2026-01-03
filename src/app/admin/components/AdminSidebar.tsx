"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home05,
  Users01,
  Building07,
  ShoppingCart01,
  Package,
  BarChart01,
  Settings01,
  ChevronLeft,
  ChevronRight,
  Shield01,
  CreditCard01,
  MessageSquare01,
  Bell01,
  File01,
  Tag01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { useAdmin } from "./AdminContext";

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

export function AdminSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useAdmin();

  return (
    <div className={`bg-white border border-gray-200  p-2 transition-all duration-300 h-fit ${isCollapsed ? "w-fit" : "w-full"}`}>
      <nav className="space-y-1">
        {navLinks.map((link, index) => {
          const isActive = pathname === link.href || (link.href !== "/admin" && pathname.startsWith(link.href));
          const isFirst = index === 0;

          return (
            <div key={link.label} className="relative">
              <Link
                href={link.href}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon className={`size-5 flex-shrink-0 ${isActive ? "text-brand-600" : "text-gray-500"}`} />
                  {!isCollapsed && <span>{link.label}</span>}
                </div>
                {!isCollapsed && link.badge && (
                  <Badge type="pill-color" size="sm" color={isActive ? "brand" : "gray"}>
                    {link.badge}
                  </Badge>
                )}
              </Link>
              {isFirst && !isCollapsed && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCollapsed(!isCollapsed);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-gray-200 transition-colors text-gray-500 hover:text-gray-900"
                  title="Collapse sidebar"
                >
                  <ChevronLeft className="size-4" />
                </button>
              )}
            </div>
          );
        })}
      </nav>

      {/* Expand Button when collapsed */}
      {isCollapsed && (
        <div className="mt-3 flex justify-center border-t border-gray-200 pt-3">
          <button
            onClick={() => setIsCollapsed(false)}
            className="p-2 rounded-lg hover:bg-gray-100 transition-colors text-gray-500 hover:text-gray-900"
            title="Expand sidebar"
          >
            <ChevronRight className="size-4" />
          </button>
        </div>
      )}
    </div>
  );
}
