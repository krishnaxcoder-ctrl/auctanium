"use client";

import Link from "next/link";
import {
  CurrencyDollar,
  Check,
  HelpCircle,
  Calculator,
  ArrowRight,
} from "@untitledui/icons";
import { Badge } from "@/components/base/badges/badges";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { useState } from "react";

const feeStructure = [
  {
    category: "Commission Fees",
    description: "Charged on each successful sale",
    fees: [
      { name: "Standard Commission", rate: "10%", description: "Applied to the total sale price" },
      { name: "Premium Seller Commission", rate: "8%", description: "For sellers with 100+ sales and 4.8+ rating" },
      { name: "Enterprise Commission", rate: "Custom", description: "For high-volume sellers ($50k+/month)" },
    ],
  },
  {
    category: "Payment Processing",
    description: "Fees charged by payment providers",
    fees: [
      { name: "Credit/Debit Card", rate: "2.9% + $0.30", description: "Per transaction" },
      { name: "Bank Transfer", rate: "1%", description: "Minimum $0.25, maximum $5.00" },
      { name: "Digital Wallets", rate: "2.5%", description: "PayPal, Apple Pay, Google Pay" },
    ],
  },
  {
    category: "Optional Services",
    description: "Additional services to boost your sales",
    fees: [
      { name: "Featured Listing", rate: "$4.99", description: "7-day homepage promotion" },
      { name: "Promoted Products", rate: "$0.10/click", description: "Pay-per-click advertising" },
      { name: "Store Customization", rate: "$29.99/mo", description: "Advanced store branding tools" },
    ],
  },
];

const includedFeatures = [
  "Unlimited product listings",
  "Secure payment processing",
  "Seller dashboard & analytics",
  "Customer messaging system",
  "Basic store customization",
  "Mobile app access",
  "24/7 email support",
  "Seller protection program",
];

export default function FeeSchedulePage() {
  const [salePrice, setSalePrice] = useState<string>("100");

  const price = parseFloat(salePrice) || 0;
  const commission = price * 0.10;
  const processing = price * 0.029 + 0.30;
  const totalFees = commission + processing;
  const netEarnings = price - totalFees;

  return (
    <div className="space-y-8 p-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-primary">Fee Schedule</h1>
        <p className="mt-2 text-tertiary">Transparent pricing with no hidden fees. Only pay when you sell.</p>
      </div>

      {/* Highlights */}
      <div className="grid gap-4 sm:grid-cols-3">
        <div className="rounded-xl border border-secondary bg-primary p-6 text-center">
          <div className="text-3xl font-bold text-brand-600">$0</div>
          <div className="mt-1 text-sm text-tertiary">Listing fees</div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-6 text-center">
          <div className="text-3xl font-bold text-brand-600">$0</div>
          <div className="mt-1 text-sm text-tertiary">Monthly subscription</div>
        </div>
        <div className="rounded-xl border border-secondary bg-primary p-6 text-center">
          <div className="text-3xl font-bold text-brand-600">10%</div>
          <div className="mt-1 text-sm text-tertiary">Commission on sales</div>
        </div>
      </div>

      {/* Fee Calculator */}
      <div className="rounded-xl border border-brand-200 bg-brand-50 p-6">
        <div className="flex items-center gap-3 mb-4">
          <div className="flex size-10 items-center justify-center rounded-lg bg-brand-600">
            <Calculator className="size-5 text-white" />
          </div>
          <div>
            <h2 className="font-semibold text-primary">Fee Calculator</h2>
            <p className="text-sm text-tertiary">See how much you'll earn on each sale</p>
          </div>
        </div>

        <div className="grid gap-6 sm:grid-cols-2">
          <div>
            <Input
              label="Sale Price ($)"
              icon={CurrencyDollar}
              size="md"
              type="number"
              value={salePrice}
              onChange={(value) => setSalePrice(value)}
              inputClassName="text-lg font-semibold"
            />
          </div>

          <div className="space-y-3">
            <div className="flex justify-between text-sm">
              <span className="text-tertiary">Commission (10%)</span>
              <span className="text-primary">-${commission.toFixed(2)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-tertiary">Payment Processing</span>
              <span className="text-primary">-${processing.toFixed(2)}</span>
            </div>
            <div className="border-t border-secondary pt-3">
              <div className="flex justify-between">
                <span className="font-medium text-primary">Your Earnings</span>
                <span className="text-xl font-bold text-success-600">${netEarnings.toFixed(2)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Fee Structure */}
      <div className="space-y-6">
        {feeStructure.map((section) => (
          <div key={section.category} className="rounded-xl border border-secondary bg-primary overflow-hidden">
            <div className="border-b border-secondary bg-secondary/30 px-6 py-4">
              <h2 className="font-semibold text-primary">{section.category}</h2>
              <p className="text-sm text-tertiary">{section.description}</p>
            </div>
            <div className="divide-y divide-secondary">
              {section.fees.map((fee) => (
                <div key={fee.name} className="flex items-center justify-between px-6 py-4">
                  <div>
                    <div className="font-medium text-primary">{fee.name}</div>
                    <div className="text-sm text-tertiary">{fee.description}</div>
                  </div>
                  <div className="text-right">
                    <Badge type="pill-color" size="md" color="brand">
                      {fee.rate}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* What's Included */}
      <div className="rounded-xl border border-secondary bg-primary p-6">
        <h2 className="text-lg font-semibold text-primary mb-4">What's Included - Free</h2>
        <div className="grid gap-3 sm:grid-cols-2">
          {includedFeatures.map((feature) => (
            <div key={feature} className="flex items-center gap-2">
              <Check className="size-5 text-success-600" />
              <span className="text-sm text-primary">{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Premium Seller Program */}
      <div className="rounded-xl border border-brand-200 bg-gradient-to-r from-brand-50 to-brand-100 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <div className="flex items-center gap-2">
              <h2 className="text-lg font-semibold text-primary">Premium Seller Program</h2>
              <Badge type="pill-color" size="sm" color="brand">8% Commission</Badge>
            </div>
            <p className="mt-1 text-sm text-tertiary">
              Qualify with 100+ sales and 4.8+ rating. Enjoy lower fees and exclusive perks.
            </p>
          </div>
          <Button color="primary" size="sm" iconTrailing={ArrowRight}>
            Learn More
          </Button>
        </div>
      </div>

      {/* FAQs */}
      <div className="rounded-xl border border-secondary bg-primary">
        <div className="border-b border-secondary px-6 py-4">
          <h2 className="text-lg font-semibold text-primary">Frequently Asked Questions</h2>
        </div>
        <div className="divide-y divide-secondary">
          <div className="px-6 py-4">
            <h3 className="font-medium text-primary">When do I pay fees?</h3>
            <p className="mt-1 text-sm text-tertiary">
              Fees are automatically deducted from your sale amount. You only pay when you successfully sell an item.
            </p>
          </div>
          <div className="px-6 py-4">
            <h3 className="font-medium text-primary">Are there any hidden fees?</h3>
            <p className="mt-1 text-sm text-tertiary">
              No. The fees listed above are comprehensive. There are no listing fees, monthly fees, or setup costs.
            </p>
          </div>
          <div className="px-6 py-4">
            <h3 className="font-medium text-primary">What if I issue a refund?</h3>
            <p className="mt-1 text-sm text-tertiary">
              Commission fees are refunded for cancelled orders or refunds. Payment processing fees are non-refundable.
            </p>
          </div>
          <div className="px-6 py-4">
            <h3 className="font-medium text-primary">How do I qualify for lower commission rates?</h3>
            <p className="mt-1 text-sm text-tertiary">
              Maintain a seller rating of 4.8 or higher and complete at least 100 sales to qualify for Premium Seller status.
            </p>
          </div>
        </div>
      </div>

      {/* Contact */}
      <div className="flex items-center justify-between rounded-xl border border-secondary bg-secondary/30 p-4">
        <div className="flex items-center gap-3">
          <HelpCircle className="size-5 text-tertiary" />
          <span className="text-sm text-tertiary">Have questions about fees?</span>
        </div>
        <Link href="/seller/support" className="text-sm font-medium text-brand-600 hover:underline">
          Contact Support
        </Link>
      </div>
    </div>
  );
}
