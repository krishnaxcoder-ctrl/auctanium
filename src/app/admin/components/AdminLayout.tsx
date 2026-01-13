"use client";

import { ReactNode } from "react";
import { AdminProvider, useAdmin } from "./AdminContext";
import { AdminSidebar } from "./AdminSidebar";
import { AdminHeader } from "./AdminHeader";
import { AdminFooter } from "./AdminFooter";

function AdminLayoutInner({ children }: { children: ReactNode }) {
  const { isCollapsed } = useAdmin();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50 overflow-x-hidden">
      {/* Header */}
      <AdminHeader />

      {/* Main Content Area */}
      <div className="flex-1 min-w-0">
        <div className="flex h-full">
          {/* Sidebar - Fixed width */}
          <div className={`hidden lg:block sticky top-16 h-[calc(100vh-4rem)] p-0 transition-all duration-300 flex-shrink-0 ${isCollapsed ? "w-auto" : "w-72"}`}>
            <AdminSidebar />
          </div>

          {/* Main Content - Full width */}
          <div className="flex-1 min-w-0 p-3 sm:p-4 lg:p-6 overflow-x-hidden">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <AdminFooter />
    </div>
  );
}

export function AdminLayout({ children }: { children: ReactNode }) {
  return (
    <AdminProvider>
      <AdminLayoutInner>{children}</AdminLayoutInner>
    </AdminProvider>
  );
}
