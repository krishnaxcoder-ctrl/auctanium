"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import { cx } from "@/utils/cx";

type ToastType = "success" | "error" | "info" | "wishlist-add" | "wishlist-remove";

interface Toast {
    id: string;
    message: string;
    type: ToastType;
}

interface ToastContextType {
    showToast: (message: string, type?: ToastType) => void;
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToast() {
    const context = useContext(ToastContext);
    if (!context) {
        throw new Error("useToast must be used within a ToastProvider");
    }
    return context;
}

// Inline SVG icons to avoid @untitledui/icons dependency issues
const CheckIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <polyline points="20 6 9 17 4 12" />
    </svg>
);

const AlertIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <line x1="12" y1="8" x2="12" y2="12" />
        <line x1="12" y1="16" x2="12.01" y2="16" />
    </svg>
);

const HeartIcon = ({ className, filled }: { className?: string; filled?: boolean }) => (
    <svg className={className} viewBox="0 0 24 24" fill={filled ? "currentColor" : "none"} stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
    </svg>
);

const CloseIcon = ({ className }: { className?: string }) => (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18" />
        <line x1="6" y1="6" x2="18" y2="18" />
    </svg>
);

const toastConfig: Record<ToastType, { bgColor: string }> = {
    success: { bgColor: "bg-green-600" },
    error: { bgColor: "bg-red-600" },
    info: { bgColor: "bg-blue-600" },
    "wishlist-add": { bgColor: "bg-brand-600" },
    "wishlist-remove": { bgColor: "bg-gray-700" },
};

function ToastItem({ toast, onClose }: { toast: Toast; onClose: () => void }) {
    const config = toastConfig[toast.type];

    const renderIcon = () => {
        switch (toast.type) {
            case "success":
                return <CheckIcon className="size-5 flex-shrink-0 text-white" />;
            case "error":
            case "info":
                return <AlertIcon className="size-5 flex-shrink-0 text-white" />;
            case "wishlist-add":
                return <HeartIcon className="size-5 flex-shrink-0 text-white" filled />;
            case "wishlist-remove":
                return <HeartIcon className="size-5 flex-shrink-0 text-white" />;
            default:
                return null;
        }
    };

    return (
        <div
            className={cx(
                "flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg text-white min-w-[280px] max-w-[400px]",
                "animate-in slide-in-from-bottom-5 fade-in duration-300",
                config.bgColor
            )}
        >
            {renderIcon()}
            <span className="flex-1 text-sm font-medium">{toast.message}</span>
            <button
                onClick={onClose}
                className="p-1 rounded-full hover:bg-white/20 transition-colors"
            >
                <CloseIcon className="size-4" />
            </button>
        </div>
    );
}

export function ToastProvider({ children }: { children: ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: ToastType = "success") => {
        const id = Math.random().toString(36).substring(2, 9);
        setToasts((prev) => [...prev, { id, message, type }]);

        // Auto-remove after 3 seconds
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3000);
    }, []);

    const removeToast = useCallback((id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    }, []);

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            {/* Toast container */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-[9999] flex flex-col gap-2">
                {toasts.map((toast) => (
                    <ToastItem key={toast.id} toast={toast} onClose={() => removeToast(toast.id)} />
                ))}
            </div>
        </ToastContext.Provider>
    );
}
