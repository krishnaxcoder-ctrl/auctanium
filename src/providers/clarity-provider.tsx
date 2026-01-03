"use client";

import { useEffect } from "react";
import Clarity from "@microsoft/clarity";

const projectId = "uq43te4t5g";

export function ClarityProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    Clarity.init(projectId);
  }, []);

  return <>{children}</>;
}
