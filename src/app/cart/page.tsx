"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Trash01,
  Plus,
  Minus,
  ShoppingCart01,
  Lock01,
  Truck01,
  RefreshCw01,
  ChevronRight,
  Tag01,
  XClose,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

interface CartItem {
  id: string;
  name: string;
  variant: string;
  price: number;
  comparePrice?: number;
  quantity: number;
  image: string;
  inStock: boolean;
  maxQuantity: number;
}

const initialCartItems: CartItem[] = [
  {
    id: "1",
    name: "Samsung Galaxy S24 Ultra",
    variant: "Titanium Black / 12GB / 512GB",
    price: 124999,
    comparePrice: 139999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?w=200&h=200&fit=crop",
    inStock: true,
    maxQuantity: 5,
  },
  {
    id: "2",
    name: "boAt Airdopes 141",
    variant: "Black",
    price: 1499,
    quantity: 2,
    image: "https://images.unsplash.com/photo-1600294037681-c80b4cb5b434?w=200&h=200&fit=crop",
    inStock: true,
    maxQuantity: 10,
  },
  {
    id: "3",
    name: "Fire-Boltt Phoenix Ultra",
    variant: "Black / 49mm / Silicon Strap",
    price: 2999,
    quantity: 1,
    image: "https://images.unsplash.com/photo-1434493789847-2f02dc6ca35d?w=200&h=200&fit=crop",
    inStock: true,
    maxQuantity: 3,
  },
];

export default function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>(initialCartItems);
  const [promoCode, setPromoCode] = useState("");
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoDiscount, setPromoDiscount] = useState(0);

  const updateQuantity = (id: string, newQuantity: number) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, Math.min(newQuantity, item.maxQuantity)) }
          : item
      )
    );
  };

  const removeItem = (id: string) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const applyPromoCode = () => {
    if (promoCode.toLowerCase() === "save10") {
      setPromoApplied(true);
      setPromoDiscount(10);
    }
  };

  const removePromoCode = () => {
    setPromoApplied(false);
    setPromoDiscount(0);
    setPromoCode("");
  };

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const savings = cartItems.reduce(
    (sum, item) => sum + ((item.comparePrice || item.price) - item.price) * item.quantity,
    0
  );
  const promoDiscountAmount = promoApplied ? (subtotal * promoDiscount) / 100 : 0;
  const shipping = subtotal > 5000 ? 0 : 99; // Free shipping above ₹5000
  const tax = (subtotal - promoDiscountAmount) * 0.18; // 18% GST
  const total = subtotal - promoDiscountAmount + shipping + tax;

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-primary">
        <div className="mx-auto max-w-8xl px-4 py-16 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="mx-auto flex size-24 items-center justify-center rounded-full bg-secondary">
              <ShoppingCart01 className="size-12 text-tertiary" />
            </div>
            <h1 className="mt-6 text-2xl font-semibold text-primary">Your cart is empty</h1>
            <p className="mt-2 text-tertiary">
              Looks like you haven't added anything to your cart yet.
            </p>
            <Link href="/marketplace">
              <Button color="primary" size="lg" className="mt-8">
                Continue Shopping
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-secondary">
      {/* Header */}
      <div className="border-b border-secondary bg-primary">
        <div className="mx-auto max-w-8xl px-4 py-6 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-semibold text-primary">Shopping Cart</h1>
            <span className="text-sm text-tertiary">{cartItems.length} items</span>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-8xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="grid gap-8 lg:grid-cols-3">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            {/* Free Shipping Banner */}
            {subtotal < 5000 && (
              <div className="flex items-center gap-3 rounded-lg border border-brand-200 bg-brand-50 p-4">
                <Truck01 className="size-5 text-brand-600" />
                <p className="text-sm text-brand-700">
                  Add <span className="font-semibold">₹{(5000 - subtotal).toLocaleString('en-IN')}</span> more to
                  qualify for <span className="font-semibold">FREE shipping!</span>
                </p>
              </div>
            )}

            {/* Cart Items List */}
            <div className="rounded-xl border border-secondary bg-primary divide-y divide-secondary">
              {cartItems.map((item) => (
                <div key={item.id} className="p-4 sm:p-6">
                  <div className="flex gap-4">
                    {/* Product Image */}
                    <Link href={`/listing/${item.id}`} className="shrink-0">
                      <div className="relative size-24 sm:size-28 overflow-hidden rounded-lg border border-secondary bg-secondary">
                        <Image
                          src={item.image}
                          alt={item.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    </Link>

                    {/* Product Details */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <Link
                            href={`/listing/${item.id}`}
                            className="text-sm sm:text-base font-medium text-primary hover:text-brand-600 transition-colors line-clamp-2"
                          >
                            {item.name}
                          </Link>
                          <p className="mt-1 text-sm text-tertiary">{item.variant}</p>
                          {item.inStock ? (
                            <p className="mt-1 text-xs text-success-600">In stock</p>
                          ) : (
                            <p className="mt-1 text-xs text-error-600">Out of stock</p>
                          )}
                        </div>
                        <button
                          onClick={() => removeItem(item.id)}
                          className="text-tertiary hover:text-error-600 transition-colors p-1"
                        >
                          <Trash01 className="size-5" />
                        </button>
                      </div>

                      {/* Price & Quantity */}
                      <div className="mt-4 flex items-center justify-between">
                        {/* Quantity Controls */}
                        <div className="flex items-center gap-2">
                          <div className="flex items-center border border-secondary rounded-lg">
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              disabled={item.quantity <= 1}
                              className="p-2 text-tertiary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Minus className="size-4" />
                            </button>
                            <span className="w-10 text-center text-sm font-medium text-primary">
                              {item.quantity}
                            </span>
                            <button
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              disabled={item.quantity >= item.maxQuantity}
                              className="p-2 text-tertiary hover:text-primary disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                              <Plus className="size-4" />
                            </button>
                          </div>
                        </div>

                        {/* Price */}
                        <div className="text-right">
                          <div className="text-base sm:text-lg font-semibold text-primary">
                            ₹{(item.price * item.quantity).toLocaleString('en-IN')}
                          </div>
                          {item.comparePrice && (
                            <div className="text-sm text-tertiary line-through">
                              ₹{(item.comparePrice * item.quantity).toLocaleString('en-IN')}
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Continue Shopping */}
            <div className="flex items-center justify-between pt-4">
              <Link
                href="/marketplace"
                className="flex items-center gap-2 text-sm text-brand-600 hover:text-brand-700 transition-colors"
              >
                <ChevronRight className="size-4 rotate-180" />
                Continue Shopping
              </Link>
              <button
                onClick={() => setCartItems([])}
                className="text-sm text-tertiary hover:text-error-600 transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="sticky top-4 space-y-4">
              {/* Summary Card */}
              <div className="rounded-xl border border-secondary bg-primary p-6">
                <h2 className="text-lg font-semibold text-primary mb-4">Order Summary</h2>

                {/* Promo Code */}
                <div className="mb-6">
                  {promoApplied ? (
                    <div className="flex items-center justify-between p-3 rounded-lg bg-success-50 border border-success-200">
                      <div className="flex items-center gap-2">
                        <Tag01 className="size-4 text-success-600" />
                        <span className="text-sm font-medium text-success-700">
                          {promoCode.toUpperCase()} applied
                        </span>
                      </div>
                      <button
                        onClick={removePromoCode}
                        className="text-success-600 hover:text-success-700"
                      >
                        <XClose className="size-4" />
                      </button>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <input
                        type="text"
                        value={promoCode}
                        onChange={(e) => setPromoCode(e.target.value)}
                        placeholder="Promo code"
                        className="flex-1 px-3 py-2 text-sm rounded-lg border border-secondary bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                      <Button
                        color="secondary"
                        size="sm"
                        onClick={applyPromoCode}
                        disabled={!promoCode}
                      >
                        Apply
                      </Button>
                    </div>
                  )}
                </div>

                {/* Price Breakdown */}
                <div className="space-y-3 text-sm">
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Subtotal</span>
                    <span className="text-primary">₹{subtotal.toLocaleString('en-IN')}</span>
                  </div>
                  {savings > 0 && (
                    <div className="flex items-center justify-between text-success-600">
                      <span>Savings</span>
                      <span>-₹{savings.toLocaleString('en-IN')}</span>
                    </div>
                  )}
                  {promoApplied && (
                    <div className="flex items-center justify-between text-success-600">
                      <span>Promo discount ({promoDiscount}%)</span>
                      <span>-₹{promoDiscountAmount.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                    </div>
                  )}
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">Shipping</span>
                    <span className="text-primary">
                      {shipping === 0 ? (
                        <span className="text-success-600">FREE</span>
                      ) : (
                        `₹${shipping}`
                      )}
                    </span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-tertiary">GST (18%)</span>
                    <span className="text-primary">₹{tax.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</span>
                  </div>
                  <div className="border-t border-secondary pt-3 mt-3">
                    <div className="flex items-center justify-between">
                      <span className="text-base font-semibold text-primary">Total</span>
                      <span className="text-xl font-semibold text-primary">
                        ₹{total.toLocaleString('en-IN', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                      </span>
                    </div>
                  </div>
                </div>

                {/* Checkout Button */}
                <Link href="/checkout" className="block mt-6">
                  <Button color="primary" size="lg" className="w-full">
                    Proceed to Checkout
                  </Button>
                </Link>

                {/* Secure Checkout */}
                <div className="flex items-center justify-center gap-2 mt-4 text-xs text-tertiary">
                  <Lock01 className="size-3.5" />
                  <span>Secure checkout</span>
                </div>
              </div>

              {/* Trust Badges */}
              <div className="rounded-xl border border-secondary bg-primary p-4">
                <div className="grid grid-cols-3 gap-4 text-center">
                  <div>
                    <Truck01 className="size-6 mx-auto text-tertiary" />
                    <p className="mt-2 text-xs text-tertiary">Free Shipping</p>
                    <p className="text-xs text-quaternary">Orders ₹5,000+</p>
                  </div>
                  <div>
                    <RefreshCw01 className="size-6 mx-auto text-tertiary" />
                    <p className="mt-2 text-xs text-tertiary">Easy Returns</p>
                    <p className="text-xs text-quaternary">7-day policy</p>
                  </div>
                  <div>
                    <Lock01 className="size-6 mx-auto text-tertiary" />
                    <p className="mt-2 text-xs text-tertiary">Secure Pay</p>
                    <p className="text-xs text-quaternary">100% Protected</p>
                  </div>
                </div>
              </div>

              {/* Payment Methods */}
              <div className="text-center">
                <p className="text-xs text-tertiary mb-2">We accept</p>
                <div className="flex items-center justify-center gap-2 flex-wrap">
                  {["UPI", "Cards", "Net Banking", "Paytm", "PhonePe"].map((method) => (
                    <span
                      key={method}
                      className="text-xs border border-secondary px-2 py-1 text-tertiary rounded"
                    >
                      {method}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
