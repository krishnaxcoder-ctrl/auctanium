"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Routes that should not show header/footer
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email", "/verify-otp", "/sso-callback", "/seller", "/admin", "/checkout", "/contact", "/community"];

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

    // Always render the same structure on server and initial client render
    // to avoid hydration mismatch, then update after mount
    if (!mounted) {
        return (
            <>
                <Header />
                <main className="min-h-screen">{children}</main>
                <Footer />
            </>
        );
    }

    if (isAuthPage) {
        return <main className="min-h-screen">{children}</main>;
    }

    return (
        <>
            <Header />
            <main className="min-h-screen">{children}</main>
            <Footer />
        </>
    );
}
