"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { z } from "zod";
import {
  SearchLg,
  CreditCard01,
  Lock01,
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
  zipCode: z.string().min(1, "PIN code is required"),
  cardNumber: z.string().min(1, "Card number is required"),
  cardExpiry: z.string().min(1, "Expiration date is required"),
  cardCvc: z.string().min(1, "Security code is required"),
  cardName: z.string().min(1, "Name on card is required"),
});

type FormErrors = { [key: string]: string | undefined };

const checkoutItems = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra",
    variant: "Titanium Black / 12GB / 512GB",
    price: 124999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
  },
  {
    id: "2",
    name: "boAt Airdopes 141",
    variant: "Black",
    price: 1499,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop",
  },
];

const shippingMethods = [
  { id: "standard", name: "Standard Shipping", price: 0, time: "5-7 business days" },
  { id: "express", name: "Express Shipping", price: 149, time: "2-3 business days" },
  { id: "overnight", name: "Same Day Delivery", price: 299, time: "Same day (Metro cities)" },
];

export default function CheckoutPage() {
  const [selectedShipping, setSelectedShipping] = useState("standard");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [isProcessing, setIsProcessing] = useState(false);
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
    country: "India",
    saveInfo: true,
    cardNumber: "",
    cardExpiry: "",
    cardCvc: "",
    cardName: "",
    useSameAddress: true,
  });

  const subtotal = checkoutItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const shipping = shippingMethods.find((m) => m.id === selectedShipping)?.price || 0;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const clearError = (field: string) => {
    if (errors[field]) setErrors((prev) => ({ ...prev, [field]: undefined }));
  };

  const handlePayNow = async () => {
    setErrors({});

    // Validate form
    const dataToValidate = paymentMethod === "card" ? formData : {
      ...formData,
      cardNumber: "skip",
      cardExpiry: "skip",
      cardCvc: "skip",
      cardName: "skip"
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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    window.location.href = "/dashboard/orders";
  };

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
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Left Column - Form */}
          <div className="order-2 lg:order-1 space-y-8">
            {/* Contact */}
            <div>
              <div className="mb-4">
                <h2 className="text-lg font-semibold text-primary">Contact</h2>
              </div>
              <Input
                value={formData.email}
                onChange={(value) => { setFormData((prev) => ({ ...prev, email: value })); clearError("email"); }}
                placeholder="Email or mobile phone number"
                size="md"
                isInvalid={!!errors.email}
                hint={errors.email}
              />
              <div className="mt-3">
                <Checkbox
                  isSelected={formData.emailOffers}
                  onChange={(isSelected) => setFormData((prev) => ({ ...prev, emailOffers: isSelected }))}
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
                  onSelectionChange={(key) => setFormData((prev) => ({ ...prev, country: key as string }))}
                  placeholder="Country/Region"
                  size="md"
                  items={[
                    { id: "India", label: "India" },
                  ]}
                >
                  {(item) => <Select.Item id={item.id} label={item.label} />}
                </Select>

                <div className="grid grid-cols-2 gap-4">
                  <Input
                    value={formData.firstName}
                    onChange={(value) => setFormData((prev) => ({ ...prev, firstName: value }))}
                    placeholder="First name (optional)"
                    size="md"
                  />
                  <Input
                    value={formData.lastName}
                    onChange={(value) => { setFormData((prev) => ({ ...prev, lastName: value })); clearError("lastName"); }}
                    placeholder="Last name"
                    size="md"
                    isInvalid={!!errors.lastName}
                    hint={errors.lastName}
                  />
                </div>

                <Input
                  value={formData.address}
                  onChange={(value) => { setFormData((prev) => ({ ...prev, address: value })); clearError("address"); }}
                  placeholder="Address"
                  size="md"
                  icon={SearchLg}
                  isInvalid={!!errors.address}
                  hint={errors.address}
                />

                <Input
                  value={formData.apartment}
                  onChange={(value) => setFormData((prev) => ({ ...prev, apartment: value }))}
                  placeholder="Apartment, suite, etc. (optional)"
                  size="md"
                />

                <div className="grid grid-cols-3 gap-4">
                  <Input
                    value={formData.city}
                    onChange={(value) => { setFormData((prev) => ({ ...prev, city: value })); clearError("city"); }}
                    placeholder="City"
                    size="md"
                    isInvalid={!!errors.city}
                    hint={errors.city}
                  />
                  <Select
                    selectedKey={formData.state}
                    onSelectionChange={(key) => { setFormData((prev) => ({ ...prev, state: key as string })); clearError("state"); }}
                    placeholder="State"
                    size="md"
                    isInvalid={!!errors.state}
                    hint={errors.state}
                    items={[
                      { id: "MH", label: "Maharashtra" },
                      { id: "DL", label: "Delhi" },
                      { id: "KA", label: "Karnataka" },
                      { id: "TN", label: "Tamil Nadu" },
                      { id: "TS", label: "Telangana" },
                      { id: "GJ", label: "Gujarat" },
                      { id: "UP", label: "Uttar Pradesh" },
                      { id: "WB", label: "West Bengal" },
                    ]}
                  >
                    {(item) => <Select.Item id={item.id} label={item.label} />}
                  </Select>
                  <Input
                    value={formData.zipCode}
                    onChange={(value) => { setFormData((prev) => ({ ...prev, zipCode: value })); clearError("zipCode"); }}
                    placeholder="PIN code"
                    size="md"
                    isInvalid={!!errors.zipCode}
                    hint={errors.zipCode}
                  />
                </div>

                <Checkbox
                  isSelected={formData.saveInfo}
                  onChange={(isSelected) => setFormData((prev) => ({ ...prev, saveInfo: isSelected }))}
                  label="Save this information for next time"
                />
              </div>
            </div>

            {/* Shipping Method */}
            <div>
              <h2 className="text-lg font-semibold text-primary mb-4">Shipping method</h2>
              <div className="rounded-lg border border-secondary divide-y divide-secondary">
                {shippingMethods.map((method) => (
                  <label
                    key={method.id}
                    className={`flex items-center justify-between p-4 cursor-pointer transition-colors ${
                      selectedShipping === method.id ? "bg-brand-50" : "hover:bg-secondary/50"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <input
                        type="radio"
                        name="shipping"
                        value={method.id}
                        checked={selectedShipping === method.id}
                        onChange={(e) => setSelectedShipping(e.target.value)}
                        className="size-4 text-brand-600 focus:ring-brand-500"
                      />
                      <div>
                        <div className="text-sm font-medium text-primary">{method.name}</div>
                        <div className="text-xs text-tertiary">{method.time}</div>
                      </div>
                    </div>
                    <span className="text-sm font-medium text-primary">
                      {method.price === 0 ? "FREE" : `₹${method.price}`}
                    </span>
                  </label>
                ))}
              </div>
            </div>

            {/* Payment */}
            <div>
              <h2 className="text-lg font-semibold text-primary mb-2">Payment</h2>
              <p className="text-sm text-tertiary mb-4">All transactions are secure and encrypted.</p>

              <div className="rounded-lg border border-secondary overflow-hidden">
                <label className={`flex items-center gap-3 p-4 cursor-pointer border-b border-secondary ${paymentMethod === "card" ? "bg-brand-50" : ""}`}>
                  <input type="radio" name="paymentMethod" value="card" checked={paymentMethod === "card"} onChange={(e) => setPaymentMethod(e.target.value)} className="size-4 text-brand-600" />
                  <CreditCard01 className="size-5 text-tertiary" />
                  <span className="text-sm font-medium text-primary">Credit card</span>
                  <div className="ml-auto flex items-center gap-1">
                    {["Visa", "MC", "Amex"].map((card) => (
                      <span key={card} className="text-xs border border-secondary px-1.5 py-0.5 rounded text-tertiary">{card}</span>
                    ))}
                  </div>
                </label>

                {paymentMethod === "card" && (
                  <div className="p-4 bg-secondary/30 space-y-4">
                    <Input
                      value={formData.cardNumber}
                      onChange={(value) => { setFormData((prev) => ({ ...prev, cardNumber: value })); clearError("cardNumber"); }}
                      placeholder="Card number"
                      size="md"
                      isInvalid={!!errors.cardNumber}
                      hint={errors.cardNumber}
                    />
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        value={formData.cardExpiry}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, cardExpiry: value })); clearError("cardExpiry"); }}
                        placeholder="Expiration date (MM / YY)"
                        size="md"
                        isInvalid={!!errors.cardExpiry}
                        hint={errors.cardExpiry}
                      />
                      <Input
                        value={formData.cardCvc}
                        onChange={(value) => { setFormData((prev) => ({ ...prev, cardCvc: value })); clearError("cardCvc"); }}
                        placeholder="Security code"
                        size="md"
                        tooltip="3-digit code on back of card"
                        isInvalid={!!errors.cardCvc}
                        hint={errors.cardCvc}
                      />
                    </div>
                    <Input
                      value={formData.cardName}
                      onChange={(value) => { setFormData((prev) => ({ ...prev, cardName: value })); clearError("cardName"); }}
                      placeholder="Name on card"
                      size="md"
                      isInvalid={!!errors.cardName}
                      hint={errors.cardName}
                    />
                    <Checkbox
                      isSelected={formData.useSameAddress}
                      onChange={(isSelected) => setFormData((prev) => ({ ...prev, useSameAddress: isSelected }))}
                      label="Use shipping address as billing address"
                    />
                  </div>
                )}

                <label className={`flex items-center gap-3 p-4 cursor-pointer ${paymentMethod === "paypal" ? "bg-brand-50" : ""}`}>
                  <input type="radio" name="paymentMethod" value="paypal" checked={paymentMethod === "paypal"} onChange={(e) => setPaymentMethod(e.target.value)} className="size-4 text-brand-600" />
                  <span className="text-sm font-medium text-primary">PayPal</span>
                </label>
              </div>
            </div>

            {/* Pay Button */}
            <Button color="primary" size="lg" onClick={handlePayNow} disabled={isProcessing} className="w-full">
              {isProcessing ? "Processing..." : `Pay now`}
            </Button>
          </div>

          {/* Right Column - Order Summary */}
          <div className="order-1 lg:order-2">
            <div className="sticky top-4 rounded-xl border border-secondary bg-secondary/30 p-6">
              <div className="space-y-4 mb-6">
                {checkoutItems.map((item) => (
                  <div key={item.id} className="flex gap-4">
                    <div className="relative shrink-0 overflow-visible">
                      <div className="relative size-16 overflow-hidden rounded-lg border border-secondary bg-primary">
                        <Image src={item.image} alt={item.name} fill className="object-cover" />
                      </div>
                      <span className="absolute -top-1 -right-1 z-10 flex size-5 items-center justify-center rounded-full bg-gray-500 text-[10px] font-medium text-white">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="text-sm font-medium text-primary line-clamp-1">{item.name}</h3>
                      <p className="text-xs text-tertiary">{item.variant}</p>
                    </div>
                    <div className="text-sm font-medium text-primary">₹{(item.price * item.quantity).toLocaleString('en-IN')}</div>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mb-6">
                <div className="flex-1">
                  <Input placeholder="Discount code" size="sm" />
                </div>
                <Button color="secondary" size="md">Apply</Button>
              </div>

              <div className="space-y-3 text-sm border-t border-secondary pt-4">
                <div className="flex items-center justify-between">
                  <span className="text-tertiary">Subtotal</span>
                  <span className="text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-tertiary">Shipping</span>
                  <span className="text-primary">{shipping === 0 ? "FREE" : `₹${shipping}`}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-tertiary">GST (18%)</span>
                  <span className="text-primary">₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                </div>
                <div className="flex items-center justify-between pt-3 border-t border-secondary">
                  <span className="text-base font-semibold text-primary">Total</span>
                  <span className="text-xl font-semibold text-primary">₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
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
            <Link href="/refund-policy" className="hover:text-primary">Refund policy</Link>
            <Link href="/shipping-policy" className="hover:text-primary">Shipping policy</Link>
            <Link href="/privacy" className="hover:text-primary">Privacy policy</Link>
            <Link href="/terms" className="hover:text-primary">Terms of service</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
