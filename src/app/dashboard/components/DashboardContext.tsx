"use client";

import { createContext, useContext, useState, ReactNode } from "react";

interface DashboardContextType {
  isCollapsed: boolean;
  setIsCollapsed: (value: boolean) => void;
}

const DashboardContext = createContext<DashboardContextType | undefined>(undefined);

export function DashboardProvider({ children }: { children: ReactNode }) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  return (
    <DashboardContext.Provider value={{ isCollapsed, setIsCollapsed }}>
      {children}
    </DashboardContext.Provider>
  );
}

export function useDashboard() {
  const context = useContext(DashboardContext);
  if (context === undefined) {
    throw new Error("useDashboard must be used within a DashboardProvider");
  }
  return context;
}
