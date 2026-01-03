"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "@untitledui/icons";
import { useRouter } from "next/navigation";

export const AuthMobileHeader = () => {
    const router = useRouter();

    return (
        <header className="lg:hidden fixed top-0 left-0 right-0 z-50 bg-white border-b border-gray-200">
            <div className="flex items-center justify-between px-4 h-14">
                <button
                    onClick={() => router.back()}
                    className="flex items-center justify-center size-10 -ml-2 text-gray-600 hover:text-gray-900"
                >
                    <ArrowLeft className="size-5" />
                </button>
                <Link href="/" className="flex items-center">
                    <Image
                        src="/sitelogo.png"
                        alt="Logo"
                        width={120}
                        height={32}
                        className="h-7 w-auto"
                    />
                </Link>
                <div className="size-10" /> {/* Spacer for centering */}
            </div>
        </header>
    );
};

export const AuthMobileFooter = () => {
    return (
        <footer className="lg:hidden fixed bottom-0 inset-x-0 z-50 bg-white border-t border-gray-200 pb-[env(safe-area-inset-bottom)]">
            <div className="flex items-center justify-center gap-4 px-4 py-3">
                <Link
                    href="/privacy"
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Privacy Policy
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                    href="/terms"
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Terms of Service
                </Link>
                <span className="text-gray-300">|</span>
                <Link
                    href="/contact"
                    className="text-xs text-gray-500 hover:text-gray-700"
                >
                    Help
                </Link>
            </div>
        </footer>
    );
};
