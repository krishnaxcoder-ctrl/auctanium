"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Gift01,
  ChevronRight,
  Home05,
  Mail01,
  CreditCard02,
  CheckCircle,
  ArrowRight,
  Calendar,
  Wallet02,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { cx } from "@/utils/cx";

const giftCardDesigns = [
  { id: 1, name: "Classic", image: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?w=400&h=250&fit=crop" },
  { id: 2, name: "Birthday", image: "https://images.unsplash.com/photo-1558636508-e0db3814bd1d?w=400&h=250&fit=crop" },
  { id: 3, name: "Thank You", image: "https://images.unsplash.com/photo-1513885535751-8b9238bd345a?w=400&h=250&fit=crop" },
  { id: 4, name: "Celebration", image: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?w=400&h=250&fit=crop" },
];

const amounts = [1000, 2500, 5000, 10000, 25000, 50000];

const features = [
  { icon: Mail01, title: "Instant Delivery", description: "Sent directly to recipient's email" },
  { icon: Calendar, title: "Never Expires", description: "No expiration date on gift cards" },
  { icon: Wallet02, title: "Easy to Use", description: "Redeemable on any purchase" },
  { icon: CreditCard02, title: "Secure", description: "Protected by our payment security" },
];

export default function GiftCardsPage() {
  const [selectedDesign, setSelectedDesign] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState(5000);
  const [customAmount, setCustomAmount] = useState("");

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-pink-600 to-purple-700">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link href="/" className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white">
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Gift Cards</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Gift01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Gift Cards
              </h1>
              <p className="mt-2 hidden text-white/80 sm:block">
                The perfect gift for auction enthusiasts
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Gift Card Builder */}
          <div>
            <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-primary mb-6">Create Your Gift Card</h2>

              {/* Design Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-3">Choose a Design</label>
                <div className="grid grid-cols-2 gap-3">
                  {giftCardDesigns.map((design) => (
                    <button
                      key={design.id}
                      onClick={() => setSelectedDesign(design.id)}
                      className={cx(
                        "relative rounded-xl overflow-hidden aspect-[16/10] transition-all",
                        selectedDesign === design.id
                          ? "ring-2 ring-brand-600 ring-offset-2"
                          : "hover:opacity-80"
                      )}
                    >
                      <Image
                        src={design.image}
                        alt={design.name}
                        fill
                        className="object-cover"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                      <span className="absolute bottom-2 left-2 text-sm font-medium text-white">
                        {design.name}
                      </span>
                      {selectedDesign === design.id && (
                        <div className="absolute top-2 right-2 size-6 rounded-full bg-brand-600 flex items-center justify-center">
                          <CheckCircle className="size-4 text-white" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Amount Selection */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-3">Select Amount</label>
                <div className="grid grid-cols-3 gap-2 mb-3">
                  {amounts.map((amount) => (
                    <button
                      key={amount}
                      onClick={() => {
                        setSelectedAmount(amount);
                        setCustomAmount("");
                      }}
                      className={cx(
                        "py-3 rounded-lg text-sm font-medium transition-all",
                        selectedAmount === amount && !customAmount
                          ? "bg-brand-600 text-white"
                          : "bg-secondary text-secondary hover:bg-brand-100 hover:text-brand-700"
                      )}
                    >
                      ₹{amount.toLocaleString()}
                    </button>
                  ))}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-tertiary">Custom:</span>
                  <Input
                    placeholder="Enter amount"
                    type="number"
                    size="md"
                    value={customAmount}
                    onChange={(value) => {
                      setCustomAmount(value);
                      setSelectedAmount(0);
                    }}
                    className="flex-1"
                  />
                </div>
              </div>

              {/* Recipient Details */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-3">Recipient Details</label>
                <div className="space-y-3">
                  <Input
                    placeholder="Recipient's Name"
                    size="md"
                  />
                  <Input
                    placeholder="Recipient's Email"
                    type="email"
                    size="md"
                    icon={Mail01}
                  />
                </div>
              </div>

              {/* Personal Message */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-3">Personal Message (Optional)</label>
                <TextArea
                  placeholder="Add a personal message to your gift..."
                  rows={3}
                />
              </div>

              {/* Delivery Options */}
              <div className="mb-6">
                <label className="block text-sm font-medium text-primary mb-3">Delivery</label>
                <div className="flex gap-3">
                  <button className="flex-1 py-3 px-4 rounded-lg bg-brand-600 text-white text-sm font-medium">
                    Send Now
                  </button>
                  <button className="flex-1 py-3 px-4 rounded-lg bg-secondary text-secondary text-sm font-medium hover:bg-brand-100 hover:text-brand-700">
                    Schedule
                  </button>
                </div>
              </div>

              <Button color="primary" size="lg" className="w-full" iconTrailing={ArrowRight}>
                Purchase Gift Card - ₹{(customAmount ? parseInt(customAmount) : selectedAmount).toLocaleString() || 0}
              </Button>
            </div>
          </div>

          {/* Preview & Info */}
          <div className="space-y-6">
            {/* Preview */}
            <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-primary mb-4">Preview</h2>
              <div className="relative rounded-xl overflow-hidden aspect-[16/10] bg-gradient-to-br from-brand-600 to-purple-700">
                <Image
                  src={giftCardDesigns.find(d => d.id === selectedDesign)?.image || giftCardDesigns[0].image}
                  alt="Gift Card Preview"
                  fill
                  className="object-cover opacity-30"
                />
                <div className="absolute inset-0 p-6 flex flex-col justify-between">
                  <div className="flex justify-between items-start">
                    <div>
                      <p className="text-white/80 text-sm">Gift Card</p>
                      <p className="text-white font-bold text-2xl mt-1">AUCTANIUM</p>
                    </div>
                    <Gift01 className="size-8 text-white/80" />
                  </div>
                  <div>
                    <p className="text-white/80 text-sm">Amount</p>
                    <p className="text-white font-bold text-3xl">
                      ₹{(customAmount ? parseInt(customAmount) : selectedAmount).toLocaleString() || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Features */}
            <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-primary mb-6">Why Gift Cards?</h2>
              <div className="grid grid-cols-2 gap-4">
                {features.map((feature, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <div className="flex size-10 items-center justify-center rounded-lg bg-brand-100 flex-shrink-0">
                      <feature.icon className="size-5 text-brand-600" />
                    </div>
                    <div>
                      <p className="font-medium text-primary">{feature.title}</p>
                      <p className="text-xs text-tertiary">{feature.description}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Check Balance */}
            <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
              <h2 className="text-xl font-semibold text-primary mb-4">Already Have a Gift Card?</h2>
              <p className="text-sm text-tertiary mb-4">Enter your gift card code to check the balance or redeem it.</p>
              <div className="flex gap-2">
                <Input placeholder="Enter gift card code" size="md" className="flex-1" />
                <Button color="secondary" size="md">Check Balance</Button>
              </div>
            </div>
          </div>
        </div>

        {/* Corporate Gifting */}
        <div className="mt-12 rounded-2xl bg-gradient-to-br from-brand-600 to-brand-800 p-8 sm:p-12">
          <div className="flex flex-col lg:flex-row items-center justify-between gap-6">
            <div>
              <Badge type="pill-color" color="warning" size="md" className="mb-4">For Businesses</Badge>
              <h2 className="text-2xl font-bold text-white">Corporate & Bulk Orders</h2>
              <p className="mt-2 text-brand-100 max-w-xl">
                Need gift cards for your team or clients? We offer bulk discounts and custom branding options.
              </p>
            </div>
            <Link href="/contact">
              <Button color="secondary" size="lg" iconTrailing={ArrowRight}>
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
