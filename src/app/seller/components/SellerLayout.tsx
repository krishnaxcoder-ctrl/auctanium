"use client";

import { ReactNode } from "react";
import { SellerProvider, useSeller } from "./SellerContext";
import { SellerSidebar } from "./SellerSidebar";
import { SellerHeader } from "./SellerHeader";
import { SellerFooter } from "./SellerFooter";

function SellerLayoutInner({ children }: { children: ReactNode }) {
  const { isCollapsed } = useSeller();

  return (
    <div className="flex min-h-screen flex-col bg-gray-50">
      {/* Header */}
      <SellerHeader />

      {/* Main Content Area */}
      <div className="flex-1">
        <div className="flex h-full">
          {/* Sidebar - Fixed width */}
          <div className={`hidden lg:block sticky top-16 h-[calc(100vh-4rem)] p-0 transition-all duration-300 ${isCollapsed ? "w-auto" : "w-72"}`}>
            <SellerSidebar />
          </div>

          {/* Main Content - Full width */}
          <div className="flex-1 p-4">
            {children}
          </div>
        </div>
      </div>

      {/* Footer */}
      <SellerFooter />
    </div>
  );
}

export function SellerLayout({ children }: { children: ReactNode }) {
  return (
    <SellerProvider>
      <SellerLayoutInner>{children}</SellerLayoutInner>
    </SellerProvider>
  );
}
