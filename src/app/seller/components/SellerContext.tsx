"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface SellerContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activePage: string;
  setActivePage: (value: string) => void;
}

const SellerContext = createContext<SellerContextType | undefined>(undefined);

export function SellerProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("overview");

  return (
    <SellerContext.Provider value={{ isCollapsed, setIsCollapsed, activePage, setActivePage }}>
      {children}
    </SellerContext.Provider>
  );
}

export function useSeller() {
  const context = useContext(SellerContext);
  if (context === undefined) {
    throw new Error("useSeller must be used within a SellerProvider");
  }
  return context;
}
