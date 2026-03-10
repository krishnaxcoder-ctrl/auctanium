"use client";

import { useState, useEffect, Suspense } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { z } from "zod";
import {
    SearchLg,
    CreditCard01,
    Lock01,
    RefreshCw01,
    CheckCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select } from "@/components/base/select/select";
import { Checkbox } from "@/components/base/checkbox/checkbox";

// Zod validation schema
const checkoutSchema = z.object({
    email: z.string().min(1, "Email or phone is required"),
    lastName: z.string().min(1, "Last name is required"),
    address: z.string().min(1, "Address is required"),
    city: z.string().min(1, "City is required"),
    state: z.string().min(1, "State is required"),
    zipCode: z.string().min(1, "ZIP code is required"),
    cardNumber: z.string().min(1, "Card number is required"),
    cardExpiry: z.string().min(1, "Expiration date is required"),
    cardCvc: z.string().min(1, "Security code is required"),
    cardName: z.string().min(1, "Name on card is required"),
});

type FormErrors = { [key: string]: string | undefined };

interface CheckoutItem {
    productId: string;
    title: string;
    image: string;
    price: number;
    quantity: number;
}

interface CheckoutSummary {
    type: "cart" | "auction";
    items: CheckoutItem[];
    subtotal: number;
    shippingCost: number;
    buyerProtectionFee: number;
    tax: number;
    total: number;
}

function CheckoutFallback() {
    return (
        <div className="min-h-screen bg-primary flex items-center justify-center">
            <RefreshCw01 className="size-8 animate-spin text-brand-600" />
        </div>
    );
}

export default function CheckoutPage() {
    return (
        <Suspense fallback={<CheckoutFallback />}>
            <CheckoutContent />
        </Suspense>
    );
}

function CheckoutContent() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const auctionId = searchParams.get("auction");
    const checkoutType = auctionId ? "auction" : "cart";

    const [checkoutData, setCheckoutData] = useState<CheckoutSummary | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [orderIds, setOrderIds] = useState<string[]>([]);
    const [paymentMethod, setPaymentMethod] = useState("card");
    const [isProcessing, setIsProcessing] = useState(false);
    const [paymentComplete, setPaymentComplete] = useState(false);
    const [errors, setErrors] = useState<FormErrors>({});

    const [formData, setFormData] = useState({
        email: "",
        emailOffers: false,
        firstName: "",
        lastName: "",
        address: "",
        apartment: "",
        city: "",
        state: "",
        zipCode: "",
        country: "US",
        saveInfo: true,
        cardNumber: "",
        cardExpiry: "",
        cardCvc: "",
        cardName: "",
        useSameAddress: true,
    });

    // Fetch checkout data
    useEffect(() => {
        async function fetchCheckoutData() {
            try {
                let url = "/api/checkout?type=cart";
                if (auctionId) {
                    url = `/api/checkout?type=auction&auctionId=${auctionId}`;
                }

                const response = await fetch(url);
                if (!response.ok) {
                    throw new Error("Failed to fetch checkout data");
                }

                const data = await response.json();
                setCheckoutData(data);
            } catch (error) {
                console.error("Checkout fetch error:", error);
            } finally {
                setIsLoading(false);
            }
        }

        fetchCheckoutData();
    }, [auctionId]);

    const formatCurrency = (amount: number) => {
        return new Intl.NumberFormat("en-US", {
            style: "currency",
            currency: "USD",
        }).format(amount);
    };

    const clearError = (field: string) => {
        if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
    };

    const handlePayNow = async () => {
        setErrors({});

        // Validate form
        const dataToValidate =
            paymentMethod === "card"
                ? formData
                : {
                      ...formData,
                      cardNumber: "skip",
                      cardExpiry: "skip",
                      cardCvc: "skip",
                      cardName: "skip",
                  };

        const result = checkoutSchema.safeParse(dataToValidate);

        if (!result.success) {
            const newErrors: FormErrors = {};
            result.error.issues.forEach((err) => {
                newErrors[err.path[0] as string] = err.message;
            });
            setErrors(newErrors);
            return;
        }

        setIsProcessing(true);

        try {
            // Prepare shipping address
            const shippingAddress = {
                firstName: formData.firstName,
                lastName: formData.lastName,
                address: formData.address,
                apartment: formData.apartment,
                city: formData.city,
                state: formData.state,
                zipCode: formData.zipCode,
                country: formData.country,
            };

            // Create order(s)
            const orderResponse = await fetch("/api/orders", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderType: checkoutType === "auction" ? "auction-won" : "buy-now",
                    auctionId: auctionId || undefined,
                    shippingAddress,
                }),
            });

            if (!orderResponse.ok) {
                const errorData = await orderResponse.json();
                throw new Error(errorData.error || "Failed to create order");
            }

            const orderData = await orderResponse.json();
            const createdOrderIds =
                orderData.orders?.map((o: any) => o.id) || [orderData.order?.id];
            setOrderIds(createdOrderIds);

            // Process payment
            const paymentResponse = await fetch("/api/checkout", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    orderIds: createdOrderIds,
                    paymentMethod: paymentMethod,
                }),
            });

            if (!paymentResponse.ok) {
                const errorData = await paymentResponse.json();
                throw new Error(errorData.error || "Payment failed");
            }

            setPaymentComplete(true);

            // Redirect after success
            setTimeout(() => {
                router.push("/dashboard/orders");
            }, 3000);
        } catch (error: any) {
            console.error("Checkout error:", error);
            setErrors({ general: error.message || "Checkout failed" });
        } finally {
            setIsProcessing(false);
        }
    };

    if (isLoading) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <RefreshCw01 className="size-8 animate-spin text-brand-600" />
            </div>
        );
    }

    if (!checkoutData || checkoutData.items.length === 0) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold text-primary mb-2">No items to checkout</h1>
                    <Link href="/marketplace" className="text-brand-600 hover:underline">
                        Continue shopping
                    </Link>
                </div>
            </div>
        );
    }

    if (paymentComplete) {
        return (
            <div className="min-h-screen bg-primary flex items-center justify-center">
                <div className="text-center">
                    <CheckCircle className="size-16 text-success-600 mx-auto mb-4" />
                    <h1 className="text-2xl font-semibold text-primary mb-2">Payment Successful!</h1>
                    <p className="text-tertiary mb-4">
                        Your order has been confirmed. Redirecting to your orders...
                    </p>
                    <Link href="/dashboard/orders" className="text-brand-600 hover:underline">
                        View Orders
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-primary flex flex-col">
            {/* Header */}
            <header className="border-b border-secondary">
                <div className="mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between">
                        <Link href="/" className="flex items-center">
                            <Image
                                src="/sitelogo.png"
                                alt="Auctanium"
                                width={1000}
                                height={20}
                                className="h-8 w-auto"
                                priority
                            />
                        </Link>
                        <div className="flex items-center gap-2 text-sm text-tertiary">
                            <Lock01 className="size-4" />
                            <span>Secure Checkout</span>
                        </div>
                    </div>
                </div>
            </header>

            <div className="flex-1 mx-auto max-w-8xl px-4 pt-4 pb-8 sm:px-6 lg:px-8 w-full">
                {/* Auction Won Banner */}
                {checkoutType === "auction" && (
                    <div className="mb-6 rounded-lg bg-success-50 border border-success-200 p-4">
                        <div className="flex items-center gap-3">
                            <CheckCircle className="size-6 text-success-600" />
                            <div>
                                <h3 className="font-semibold text-success-700">Congratulations!</h3>
                                <p className="text-sm text-success-600">
                                    You won this auction. Complete your purchase to claim your item.
                                </p>
                            </div>
                        </div>
                    </div>
                )}

                {errors.general && (
                    <div className="mb-6 rounded-lg bg-error-50 border border-error-200 p-4 text-error-700">
                        {errors.general}
                    </div>
                )}

                <div className="grid gap-8 lg:grid-cols-2">
                    {/* Left Column - Form */}
                    <div className="order-2 lg:order-1 space-y-8">
                        {/* Contact */}
                        <div>
                            <h2 className="text-lg font-semibold text-primary mb-4">Contact</h2>
                            <Input
                                value={formData.email}
                                onChange={(value) => {
                                    setFormData((prev) => ({ ...prev, email: value }));
                                    clearError("email");
                                }}
                                placeholder="Email or mobile phone number"
                                size="md"
                                isInvalid={!!errors.email}
                                hint={errors.email}
                            />
                            <div className="mt-3">
                                <Checkbox
                                    isSelected={formData.emailOffers}
                                    onChange={(isSelected) =>
                                        setFormData((prev) => ({ ...prev, emailOffers: isSelected }))
                                    }
                                    label="Email me with news and offers"
                                />
                            </div>
                        </div>

                        {/* Delivery */}
                        <div>
                            <h2 className="text-lg font-semibold text-primary mb-4">Delivery</h2>
                            <div className="space-y-4">
                                <Select
                                    selectedKey={formData.country}
                                    onSelectionChange={(key) =>
                                        setFormData((prev) => ({ ...prev, country: key as string }))
                                    }
                                    placeholder="Country/Region"
                                    size="md"
                                    items={[
                                        { id: "US", label: "United States" },
                                        { id: "CA", label: "Canada" },
                                        { id: "UK", label: "United Kingdom" },
                                    ]}
                                >
                                    {(item) => <Select.Item id={item.id} label={item.label} />}
                                </Select>

                                <div className="grid grid-cols-2 gap-4">
                                    <Input
                                        value={formData.firstName}
                                        onChange={(value) =>
                                            setFormData((prev) => ({ ...prev, firstName: value }))
                                        }
                                        placeholder="First name (optional)"
                                        size="md"
                                    />
                                    <Input
                                        value={formData.lastName}
                                        onChange={(value) => {
                                            setFormData((prev) => ({ ...prev, lastName: value }));
                                            clearError("lastName");
                                        }}
                                        placeholder="Last name"
                                        size="md"
                                        isInvalid={!!errors.lastName}
                                        hint={errors.lastName}
                                    />
                                </div>

                                <Input
                                    value={formData.address}
                                    onChange={(value) => {
                                        setFormData((prev) => ({ ...prev, address: value }));
                                        clearError("address");
                                    }}
                                    placeholder="Address"
                                    size="md"
                                    icon={SearchLg}
                                    isInvalid={!!errors.address}
                                    hint={errors.address}
                                />

                                <Input
                                    value={formData.apartment}
                                    onChange={(value) =>
                                        setFormData((prev) => ({ ...prev, apartment: value }))
                                    }
                                    placeholder="Apartment, suite, etc. (optional)"
                                    size="md"
                                />

                                <div className="grid grid-cols-3 gap-4">
                                    <Input
                                        value={formData.city}
                                        onChange={(value) => {
                                            setFormData((prev) => ({ ...prev, city: value }));
                                            clearError("city");
                                        }}
                                        placeholder="City"
                                        size="md"
                                        isInvalid={!!errors.city}
                                        hint={errors.city}
                                    />
                                    <Select
                                        selectedKey={formData.state}
                                        onSelectionChange={(key) => {
                                            setFormData((prev) => ({ ...prev, state: key as string }));
                                            clearError("state");
                                        }}
                                        placeholder="State"
                                        size="md"
                                        isInvalid={!!errors.state}
                                        hint={errors.state}
                                        items={[
                                            { id: "CA", label: "California" },
                                            { id: "NY", label: "New York" },
                                            { id: "TX", label: "Texas" },
                                            { id: "FL", label: "Florida" },
                                            { id: "WA", label: "Washington" },
                                        ]}
                                    >
                                        {(item) => <Select.Item id={item.id} label={item.label} />}
                                    </Select>
                                    <Input
                                        value={formData.zipCode}
                                        onChange={(value) => {
                                            setFormData((prev) => ({ ...prev, zipCode: value }));
                                            clearError("zipCode");
                                        }}
                                        placeholder="ZIP code"
                                        size="md"
                                        isInvalid={!!errors.zipCode}
                                        hint={errors.zipCode}
                                    />
                                </div>

                                <Checkbox
                                    isSelected={formData.saveInfo}
                                    onChange={(isSelected) =>
                                        setFormData((prev) => ({ ...prev, saveInfo: isSelected }))
                                    }
                                    label="Save this information for next time"
                                />
                            </div>
                        </div>

                        {/* Payment */}
                        <div>
                            <h2 className="text-lg font-semibold text-primary mb-2">Payment</h2>
                            <p className="text-sm text-tertiary mb-4">
                                All transactions are secure and encrypted.
                            </p>

                            <div className="rounded-lg border border-secondary overflow-hidden">
                                <label
                                    className={`flex items-center gap-3 p-4 cursor-pointer border-b border-secondary ${
                                        paymentMethod === "card" ? "bg-brand-50" : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="card"
                                        checked={paymentMethod === "card"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="size-4 text-brand-600"
                                    />
                                    <CreditCard01 className="size-5 text-tertiary" />
                                    <span className="text-sm font-medium text-primary">
                                        Credit card
                                    </span>
                                    <div className="ml-auto flex items-center gap-1">
                                        {["Visa", "MC", "Amex"].map((card) => (
                                            <span
                                                key={card}
                                                className="text-xs border border-secondary px-1.5 py-0.5 rounded text-tertiary"
                                            >
                                                {card}
                                            </span>
                                        ))}
                                    </div>
                                </label>

                                {paymentMethod === "card" && (
                                    <div className="p-4 bg-secondary/30 space-y-4">
                                        <Input
                                            value={formData.cardNumber}
                                            onChange={(value) => {
                                                setFormData((prev) => ({ ...prev, cardNumber: value }));
                                                clearError("cardNumber");
                                            }}
                                            placeholder="Card number"
                                            size="md"
                                            isInvalid={!!errors.cardNumber}
                                            hint={errors.cardNumber}
                                        />
                                        <div className="grid grid-cols-2 gap-4">
                                            <Input
                                                value={formData.cardExpiry}
                                                onChange={(value) => {
                                                    setFormData((prev) => ({ ...prev, cardExpiry: value }));
                                                    clearError("cardExpiry");
                                                }}
                                                placeholder="Expiration date (MM / YY)"
                                                size="md"
                                                isInvalid={!!errors.cardExpiry}
                                                hint={errors.cardExpiry}
                                            />
                                            <Input
                                                value={formData.cardCvc}
                                                onChange={(value) => {
                                                    setFormData((prev) => ({ ...prev, cardCvc: value }));
                                                    clearError("cardCvc");
                                                }}
                                                placeholder="Security code"
                                                size="md"
                                                tooltip="3-digit code on back of card"
                                                isInvalid={!!errors.cardCvc}
                                                hint={errors.cardCvc}
                                            />
                                        </div>
                                        <Input
                                            value={formData.cardName}
                                            onChange={(value) => {
                                                setFormData((prev) => ({ ...prev, cardName: value }));
                                                clearError("cardName");
                                            }}
                                            placeholder="Name on card"
                                            size="md"
                                            isInvalid={!!errors.cardName}
                                            hint={errors.cardName}
                                        />
                                        <Checkbox
                                            isSelected={formData.useSameAddress}
                                            onChange={(isSelected) =>
                                                setFormData((prev) => ({
                                                    ...prev,
                                                    useSameAddress: isSelected,
                                                }))
                                            }
                                            label="Use shipping address as billing address"
                                        />
                                    </div>
                                )}

                                <label
                                    className={`flex items-center gap-3 p-4 cursor-pointer ${
                                        paymentMethod === "paypal" ? "bg-brand-50" : ""
                                    }`}
                                >
                                    <input
                                        type="radio"
                                        name="paymentMethod"
                                        value="paypal"
                                        checked={paymentMethod === "paypal"}
                                        onChange={(e) => setPaymentMethod(e.target.value)}
                                        className="size-4 text-brand-600"
                                    />
                                    <span className="text-sm font-medium text-primary">PayPal</span>
                                </label>
                            </div>
                        </div>

                        {/* Pay Button */}
                        <Button
                            color="primary"
                            size="lg"
                            onClick={handlePayNow}
                            isDisabled={isProcessing}
                            isLoading={isProcessing}
                            className="w-full"
                        >
                            Pay {formatCurrency(checkoutData.total)}
                        </Button>
                    </div>

                    {/* Right Column - Order Summary */}
                    <div className="order-1 lg:order-2">
                        <div className="sticky top-4 rounded-xl border border-secondary bg-secondary/30 p-6">
                            <div className="space-y-4 mb-6">
                                {checkoutData.items.map((item) => (
                                    <div key={item.productId} className="flex gap-4">
                                        <div className="relative shrink-0 overflow-visible">
                                            <div className="relative size-16 overflow-hidden rounded-lg border border-secondary bg-primary">
                                                {item.image ? (
                                                    <Image
                                                        src={item.image}
                                                        alt={item.title}
                                                        fill
                                                        className="object-cover"
                                                    />
                                                ) : (
                                                    <div className="flex items-center justify-center h-full text-tertiary text-xs">
                                                        No image
                                                    </div>
                                                )}
                                            </div>
                                            {item.quantity > 1 && (
                                                <span className="absolute -top-1 -right-1 z-10 flex size-5 items-center justify-center rounded-full bg-gray-500 text-[10px] font-medium text-white">
                                                    {item.quantity}
                                                </span>
                                            )}
                                        </div>
                                        <div className="flex-1 min-w-0">
                                            <h3 className="text-sm font-medium text-primary line-clamp-1">
                                                {item.title}
                                            </h3>
                                            {checkoutType === "auction" && (
                                                <p className="text-xs text-success-600">Winning Bid</p>
                                            )}
                                        </div>
                                        <div className="text-sm font-medium text-primary">
                                            {formatCurrency(item.price * item.quantity)}
                                        </div>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-3 text-sm border-t border-secondary pt-4">
                                <div className="flex items-center justify-between">
                                    <span className="text-tertiary">Subtotal</span>
                                    <span className="text-primary">
                                        {formatCurrency(checkoutData.subtotal)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-tertiary">Shipping</span>
                                    <span className="text-primary">
                                        {checkoutData.shippingCost === 0
                                            ? "FREE"
                                            : formatCurrency(checkoutData.shippingCost)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-tertiary">Buyer Protection</span>
                                    <span className="text-primary">
                                        {formatCurrency(checkoutData.buyerProtectionFee)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between">
                                    <span className="text-tertiary">Tax</span>
                                    <span className="text-primary">
                                        {formatCurrency(checkoutData.tax)}
                                    </span>
                                </div>
                                <div className="flex items-center justify-between pt-3 border-t border-secondary">
                                    <span className="text-base font-semibold text-primary">Total</span>
                                    <span className="text-xl font-semibold text-primary">
                                        {formatCurrency(checkoutData.total)}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <footer className="border-t border-secondary">
                <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
                    <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-tertiary">
                        <Link href="/refund-policy" className="hover:text-primary">
                            Refund policy
                        </Link>
                        <Link href="/shipping-policy" className="hover:text-primary">
                            Shipping policy
                        </Link>
                        <Link href="/privacy" className="hover:text-primary">
                            Privacy policy
                        </Link>
                        <Link href="/terms" className="hover:text-primary">
                            Terms of service
                        </Link>
                    </div>
                </div>
            </footer>
        </div>
    );
}
