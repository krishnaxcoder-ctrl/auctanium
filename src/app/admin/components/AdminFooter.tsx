"use client";

import Link from "next/link";
import {
  BookOpen02,
  MessageSquare01,
  Mail01,
  Activity,
} from "@untitledui/icons";

const footerLinks = [
  { label: "Documentation", href: "/admin/docs", icon: BookOpen02 },
  { label: "API Reference", href: "/admin/api", icon: Activity },
  { label: "Support Tickets", href: "/admin/support", icon: MessageSquare01 },
  { label: "Contact", href: "/admin/contact", icon: Mail01 },
];

const quickLinks = [
  { label: "System Status", href: "/admin/status" },
  { label: "Audit Logs", href: "/admin/audit" },
  { label: "Backup", href: "/admin/backup" },
  { label: "API Keys", href: "/admin/api-keys" },
];

export function AdminFooter() {
  return (
    <footer className="border-t border-secondary bg-primary">
      {/* Main Footer */}
      <div className="px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          {/* Left - Resources */}
          <h3 className="text-sm font-semibold text-primary">Admin Resources</h3>
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {footerLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="flex items-center gap-2 text-sm text-tertiary hover:text-primary transition-colors"
              >
                <link.icon className="size-4" />
                {link.label}
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-secondary px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          {/* Copyright */}
          <p className="text-sm text-tertiary">
            © 2025 Auctanium Admin CRM. All rights reserved.
          </p>

          {/* Quick Links */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2">
            {quickLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="text-sm text-tertiary hover:text-primary transition-colors"
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
