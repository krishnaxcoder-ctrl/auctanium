"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Home05,
  TrendUp01,
  Trophy01,
  Heart,
  Package,
  MessageSquare01,
  Bell01,
  CreditCard01,
  Settings01,
  ChevronLeft,
  ChevronRight,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { useDashboard } from "./DashboardContext";

const sidebarLinks = [
  { label: "Overview", icon: Home05, href: "/dashboard" },
  { label: "My Bids", icon: TrendUp01, href: "/dashboard/bids" },
  { label: "Won Auctions", icon: Trophy01, href: "/dashboard/won" },
  { label: "Watchlist", icon: Heart, href: "/dashboard/watchlist" },
  { label: "My Orders", icon: Package, href: "/dashboard/orders" },
  { label: "Messages", icon: MessageSquare01, href: "/dashboard/messages", badge: "2" },
  { label: "Notifications", icon: Bell01, href: "/dashboard/notifications", badge: "3" },
  { label: "Payment Methods", icon: CreditCard01, href: "/dashboard/payments" },
  { label: "Account Settings", icon: Settings01, href: "/dashboard/settings" },
];

export function DashboardSidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useDashboard();

  return (
    <div className={`bg-primary border border-secondary rounded-xl p-2 transition-all duration-300 ${isCollapsed ? "w-fit" : ""}`}>
      <nav className="space-y-1">
        {sidebarLinks.map((link, index) => {
          const isActive = pathname === link.href;
          const isOverview = index === 0;

          return (
            <div key={link.label} className="relative">
              <Link
                href={link.href}
                className={`flex items-center justify-between gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors ${
                  isActive
                    ? "bg-brand-50 text-brand-700"
                    : "text-secondary hover:bg-secondary hover:text-primary"
                }`}
              >
                <div className="flex items-center gap-3">
                  <link.icon className="size-5 flex-shrink-0" />
                  {!isCollapsed && <span>{link.label}</span>}
                </div>
                {!isCollapsed && link.badge && (
                  <Badge type="pill-color" size="sm" color="error">
                    {link.badge}
                  </Badge>
                )}
              </Link>
              {isOverview && (
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    setIsCollapsed(!isCollapsed);
                  }}
                  className="absolute right-2 top-1/2 -translate-y-1/2 p-1 rounded hover:bg-secondary transition-colors text-tertiary hover:text-primary"
                  title={isCollapsed ? "Expand sidebar" : "Collapse sidebar"}
                >
                  {isCollapsed ? (
                    <ChevronRight className="size-4" />
                  ) : (
                    <ChevronLeft className="size-4" />
                  )}
                </button>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
