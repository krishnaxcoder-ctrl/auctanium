"use client";

import { ReactNode } from "react";
import { DashboardProvider, useDashboard } from "./DashboardContext";
import { DashboardSidebar } from "./DashboardSidebar";

function DashboardLayoutInner({ children }: { children: ReactNode }) {
  const { isCollapsed } = useDashboard();

  return (
    <div className="min-h-screen bg-secondary overflow-x-hidden">
      <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
        <div className={`grid gap-6 lg:gap-8 transition-all duration-300 ${isCollapsed ? "lg:grid-cols-[auto_1fr]" : "lg:grid-cols-4"}`}>
          {/* Sidebar - Hidden on mobile, shown on lg */}
          <div className={`hidden lg:block ${isCollapsed ? "" : "lg:col-span-1"}`}>
            <DashboardSidebar />
          </div>

          {/* Main Content */}
          <div className={`min-w-0 ${isCollapsed ? "" : "lg:col-span-3"}`}>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}

export function DashboardLayout({ children }: { children: ReactNode }) {
  return (
    <DashboardProvider>
      <DashboardLayoutInner>{children}</DashboardLayoutInner>
    </DashboardProvider>
  );
}
