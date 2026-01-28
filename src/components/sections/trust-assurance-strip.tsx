import { memo } from "react";
import {
    Shield01,
    CheckVerified01,
    CreditCard02,
    MessageChatCircle,
} from "@untitledui/icons";
import { cx } from "@/utils/cx";

// Best practice: rendering-hoist-jsx - define static data outside component
const trustItems = [
    {
        icon: Shield01,
        title: "Buyer Protection",
        description: "100% money-back guarantee",
    },
    {
        icon: CheckVerified01,
        title: "Verified Sellers",
        description: "All sellers are authenticated",
    },
    {
        icon: CreditCard02,
        title: "Secure Payments",
        description: "SSL encrypted transactions",
    },
    {
        icon: MessageChatCircle,
        title: "24/7 Support",
        description: "We're here to help anytime",
    },
] as const;

// Best practice: rerender-memo - memoize to prevent unnecessary re-renders
export const TrustAssuranceStrip = memo(function TrustAssuranceStrip() {
    return (
        <section className="bg-secondary border-y border-secondary">
            <div className="mx-auto max-w-8xl px-0 sm:px-6 lg:px-8">
                <div className="grid grid-cols-2 lg:grid-cols-4">
                    {trustItems.map((item, index) => (
                        <div
                            key={item.title}
                            className={cx(
                                "flex items-center gap-2 sm:gap-3 py-3 sm:py-4 px-2 sm:px-2",
                                "border-b sm:border-b-0 border-primary",
                                index % 2 === 0 ? "border-r border-primary" : "sm:border-r",
                                index < 2 && "lg:border-r"
                            )}
                        >
                            <div className="flex size-8 sm:size-10 shrink-0 items-center justify-center rounded-full bg-brand-50">
                                <item.icon className="size-4 sm:size-5 text-brand-600" />
                            </div>
                            <div className="min-w-0 flex-1">
                                <p className="text-xs sm:text-sm font-semibold text-primary leading-tight ">
                                    {item.title}
                                </p>
                                <p className="text-[10px] sm:text-xs text-tertiary leading-tight">
                                    {item.description}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
});
