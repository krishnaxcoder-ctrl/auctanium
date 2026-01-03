"use client";

import Link from "next/link";
import {
  BookOpen02,
  MessageSquare01,
  Mail01,
  Activity,
} from "@untitledui/icons";

const footerLinks = [
  { label: "Seller Guide", href: "/seller/guide", icon: BookOpen02 },
  { label: "Analytics", href: "/seller/analytics", icon: Activity },
  { label: "Community", href: "/seller/community", icon: MessageSquare01 },
  { label: "Support", href: "/seller/support", icon: Mail01 },
];

const quickLinks = [
  { label: "Terms of Service", href: "/terms" },
  { label: "Privacy Policy", href: "/privacy" },
  { label: "Seller Agreement", href: "/seller/agreement" },
  { label: "Fee Schedule", href: "/seller/fees" },
];

export function SellerFooter() {
  return (
    <footer className="border-t border-gray-200 bg-white">
      {/* Main Footer */}
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Left - Resources */}
          <h3 className="text-sm font-semibold text-gray-900">Seller Resources</h3>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-sm text-gray-500">
            © 2025 Auctanium Seller Center. All rights reserved.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-gray-500 hover:text-gray-900 transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}
