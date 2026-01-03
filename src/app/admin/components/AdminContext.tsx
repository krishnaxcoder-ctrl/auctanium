"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface AdminContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
  activePage: string;
  setActivePage: (value: string) => void;
}

const AdminContext = createContext<AdminContextType | undefined>(undefined);

export function AdminProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [activePage, setActivePage] = useState("dashboard");

  return (
    <AdminContext.Provider value={{ isCollapsed, setIsCollapsed, activePage, setActivePage }}>
      {children}
    </AdminContext.Provider>
  );
}

export function useAdmin() {
  const context = useContext(AdminContext);
  if (context === undefined) {
    throw new Error("useAdmin must be used within an AdminProvider");
  }
  return context;
}
