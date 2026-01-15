"use client";

import { usePathname } from "next/navigation";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";

// Routes that should not show header/footer
const authRoutes = ["/login", "/signup", "/forgot-password", "/reset-password", "/verify-email", "/verify-otp", "/sso-callback", "/seller", "/admin", "/checkout", "/contact"];

interface LayoutWrapperProps {
    children: React.ReactNode;
}

export function LayoutWrapper({ children }: LayoutWrapperProps) {
    const pathname = usePathname();
    const isAuthPage = authRoutes.some((route) => pathname.startsWith(route));

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
