"use client";

import { useState } from "react";
import Link from "next/link";
import {
  CreditCard01,
  Plus,
  Trash01,
  Check,
  Building07,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";

const paymentMethods = [
  {
    id: "1",
    type: "card",
    brand: "Visa",
    last4: "4242",
    expiry: "12/26",
    isDefault: true,
  },
  {
    id: "2",
    type: "card",
    brand: "Mastercard",
    last4: "5555",
    expiry: "08/25",
    isDefault: false,
  },
  {
    id: "3",
    type: "paypal",
    email: "user@example.com",
    isDefault: false,
  },
];

const transactions = [
  {
    id: "TXN-001",
    description: "Payment for Order ORD-2024-001",
    amount: 485,
    date: "Dec 15, 2024",
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN-002",
    description: "Payment for Order ORD-2024-002",
    amount: 2890,
    date: "Dec 12, 2024",
    status: "completed",
    method: "Visa •••• 4242",
  },
  {
    id: "TXN-003",
    description: "Payment for Order ORD-2024-003",
    amount: 420,
    date: "Dec 10, 2024",
    status: "completed",
    method: "PayPal",
  },
  {
    id: "TXN-004",
    description: "Refund for Order ORD-2024-000",
    amount: -150,
    date: "Dec 8, 2024",
    status: "refunded",
    method: "Visa •••• 4242",
  },
];

const getCardIcon = (brand: string) => {
  return (
    <div className="flex size-10 items-center justify-center rounded-lg bg-secondary">
      <CreditCard01 className="size-5 text-primary" />
    </div>
  );
};

export default function PaymentsPage() {
  const [showAddCard, setShowAddCard] = useState(false);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-semibold text-primary flex items-center gap-3">
            <CreditCard01 className="size-7 text-brand-600" />
            Payment Methods
          </h1>
          <p className="mt-1 text-tertiary">
            Manage your payment methods and view transactions
          </p>
        </div>
        <Button color="primary" size="sm" iconLeading={Plus} onClick={() => setShowAddCard(true)}>
          Add Payment Method
        </Button>
      </div>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Payment Methods */}
        <div>
          <h2 className="text-sm font-semibold text-primary mb-4">Saved Payment Methods</h2>
          <div className="space-y-3">
            {paymentMethods.map((method) => (
              <div
                key={method.id}
                className="flex items-center gap-4 p-4 bg-primary border border-secondary rounded-xl"
              >
                {method.type === "card" ? (
                  getCardIcon(method.brand!)
                ) : (
                  <div className="flex size-10 items-center justify-center rounded-lg bg-blue-50">
                    <span className="text-sm font-bold text-blue-600">PP</span>
                  </div>
                )}
                <div className="flex-1">
                  {method.type === "card" ? (
                    <>
                      <p className="text-sm font-medium text-primary">
                        {method.brand} •••• {method.last4}
                      </p>
                      <p className="text-xs text-tertiary">Expires {method.expiry}</p>
                    </>
                  ) : (
                    <>
                      <p className="text-sm font-medium text-primary">PayPal</p>
                      <p className="text-xs text-tertiary">{method.email}</p>
                    </>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  {method.isDefault && (
                    <Badge type="pill-color" size="sm" color="success">
                      Default
                    </Badge>
                  )}
                  <button className="p-2 text-tertiary hover:text-error-500 transition-colors">
                    <Trash01 className="size-4" />
                  </button>
                </div>
              </div>
            ))}

            {/* Add New Card Form */}
            {showAddCard && (
              <div className="p-4 bg-primary border border-brand-300 rounded-xl">
                <h3 className="text-sm font-semibold text-primary mb-4">Add New Card</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-xs font-medium text-tertiary mb-1">Card Number</label>
                    <input
                      type="text"
                      placeholder="1234 5678 9012 3456"
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-tertiary mb-1">Expiry Date</label>
                      <input
                        type="text"
                        placeholder="MM/YY"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-tertiary mb-1">CVC</label>
                      <input
                        type="text"
                        placeholder="123"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg focus:outline-none focus:border-brand-500"
                      />
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <Button color="primary" size="sm">Save Card</Button>
                    <Button color="secondary" size="sm" onClick={() => setShowAddCard(false)}>Cancel</Button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Transaction History */}
        <div>
          <h2 className="text-sm font-semibold text-primary mb-4">Recent Transactions</h2>
          <div className="bg-primary border border-secondary rounded-xl overflow-hidden">
            <div className="divide-y divide-secondary">
              {transactions.map((txn) => (
                <div key={txn.id} className="flex items-center justify-between p-4">
                  <div>
                    <p className="text-sm font-medium text-primary">{txn.description}</p>
                    <p className="text-xs text-tertiary mt-0.5">{txn.date} • {txn.method}</p>
                  </div>
                  <div className="text-right">
                    <p className={`text-sm font-semibold ${txn.amount < 0 ? "text-success-600" : "text-primary"}`}>
                      {txn.amount < 0 ? "+" : "-"}${Math.abs(txn.amount)}
                    </p>
                    <Badge
                      type="pill-color"
                      size="sm"
                      color={txn.status === "completed" ? "success" : "warning"}
                    >
                      {txn.status}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
