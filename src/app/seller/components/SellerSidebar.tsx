"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home05,
  Package,
  ShoppingCart01,
  Users01,
  BarChart01,
  MessageSquare01,
  Settings01,
  ChevronLeft,
  ChevronRight,
  Plus,
  HelpCircle,
  BookOpen02,
  Mail01,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { useSeller } from "./SellerContext";

const sidebarLinks = [
  { label: "Overview", icon: Home05, href: "/seller" },
  { label: "Products", icon: Package, href: "/seller/products" },
  { label: "Orders", icon: ShoppingCart01, href: "/seller/orders", badge: "5" },
  { label: "Customers", icon: Users01, href: "/seller/customers" },
  { label: "Analytics", icon: BarChart01, href: "/seller/analytics" },
  { label: "Messages", icon: MessageSquare01, href: "/seller/messages", badge: "3" },
  { label: "Settings", icon: Settings01, href: "/seller/settings" },
];

const resourceLinks = [
  { label: "Help Center", icon: HelpCircle, href: "/seller/help" },
  { label: "Seller Guide", icon: BookOpen02, href: "/seller/guide" },
  { label: "Community", icon: MessageSquare01, href: "/seller/community" },
  { label: "Contact Support", icon: Mail01, href: "/seller/support" },
];

export function SellerSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useSeller();

  return (
    <div className={`bg-white border border-gray-200 p-2 transition-all duration-300 h-fit ${isCollapsed ? "w-fit" : "w-full"}`}>
      {/* Add Product Button */}
      {!isCollapsed && (
        <div className="mb-3 px-1">
          <Link href="/seller/products/new">
            <Button color="primary" size="sm" iconLeading={Plus} className="w-full justify-center">
              Add Product
            </Button>
          </Link>
        </div>
      )}
      {isCollapsed && (
        <div className="mb-3 flex justify-center px-1">
          <Link href="/seller/products/new">
            <Button color="primary" size="sm" className="p-2">
              <Plus className="size-4" />
            </Button>
          </Link>
        </div>
      )}

      <nav className="space-y-1">
        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.href || (link.href !== "/seller" && pathname.startsWith(link.href));
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

      {/* Seller Resources Section */}
      <div className="mt-4 border-t border-gray-200 pt-4">
        {!isCollapsed && (
          <h4 className="px-3 mb-2 text-xs font-semibold uppercase tracking-wider text-gray-500">
            Seller Resources
          </h4>
        )}
        <nav className="space-y-1">
          {resourceLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link
                key={link.label}
                href={link.href}
                className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-600"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                }`}
              >
                <link.icon className={`size-5 flex-shrink-0 ${isActive ? "text-brand-600" : "text-gray-500"}`} />
                {!isCollapsed && <span>{link.label}</span>}
              </Link>
            );
          })}
        </nav>
      </div>

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
