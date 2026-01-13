"use client";

import { useState } from "react";
import Link from "next/link";
import {
  SearchLg,
  HelpCircle,
  Package,
  ShoppingCart01,
  CreditCard01,
  Truck01,
  Settings01,
  ChevronRight,
  ChevronDown,
  Mail01,
  MessageSquare01,
  BookOpen02,
} from "@untitledui/icons";
import { Input } from "@/components/base/input/input";

const categories = [
  {
    title: "Getting Started",
    icon: HelpCircle,
    description: "Learn the basics of selling on our platform",
    articles: [
      { title: "How to create your seller account", href: "#" },
      { title: "Setting up your store profile", href: "#" },
      { title: "Understanding seller dashboard", href: "#" },
      { title: "Verification requirements", href: "#" },
    ],
  },
  {
    title: "Products & Listings",
    icon: Package,
    description: "Everything about listing and managing products",
    articles: [
      { title: "How to list a new product", href: "#" },
      { title: "Product photography guidelines", href: "#" },
      { title: "Writing effective descriptions", href: "#" },
      { title: "Managing inventory", href: "#" },
    ],
  },
  {
    title: "Orders & Fulfillment",
    icon: ShoppingCart01,
    description: "Processing orders and shipping",
    articles: [
      { title: "Processing incoming orders", href: "#" },
      { title: "Shipping best practices", href: "#" },
      { title: "Handling returns and refunds", href: "#" },
      { title: "Order cancellations", href: "#" },
    ],
  },
  {
    title: "Payments & Payouts",
    icon: CreditCard01,
    description: "Understanding payments and earnings",
    articles: [
      { title: "How payouts work", href: "#" },
      { title: "Setting up payment methods", href: "#" },
      { title: "Understanding fees", href: "#" },
      { title: "Tax information", href: "#" },
    ],
  },
  {
    title: "Shipping & Delivery",
    icon: Truck01,
    description: "Shipping options and delivery management",
    articles: [
      { title: "Shipping options overview", href: "#" },
      { title: "Creating shipping labels", href: "#" },
      { title: "International shipping", href: "#" },
      { title: "Tracking shipments", href: "#" },
    ],
  },
  {
    title: "Account & Settings",
    icon: Settings01,
    description: "Manage your account and preferences",
    articles: [
      { title: "Updating account information", href: "#" },
      { title: "Security settings", href: "#" },
      { title: "Notification preferences", href: "#" },
      { title: "Closing your seller account", href: "#" },
    ],
  },
];

const faqs = [
  {
    question: "How long does it take to get paid?",
    answer: "Payouts are processed within 3-5 business days after the order is marked as delivered. Funds are transferred to your linked bank account or payment method.",
  },
  {
    question: "What are the seller fees?",
    answer: "We charge a 10% commission on each sale, plus a small payment processing fee of 2.9% + $0.30. There are no listing fees or monthly subscription charges.",
  },
  {
    question: "How do I handle a return request?",
    answer: "When a buyer requests a return, you'll receive a notification. Review the request in your Orders section and approve or decline within 48 hours. If approved, provide return shipping instructions.",
  },
  {
    question: "Can I sell internationally?",
    answer: "Yes! You can enable international shipping in your store settings. Set your shipping rates and delivery times for each region you want to ship to.",
  },
  {
    question: "How do I improve my seller rating?",
    answer: "Focus on fast shipping, accurate product descriptions, responsive customer service, and quality packaging. Positive reviews from buyers will boost your rating.",
  },
];

const tabs = [
  { id: "articles", label: "Help Articles", icon: BookOpen02 },
  { id: "faqs", label: "FAQs", icon: HelpCircle },
];

export default function HelpCenterPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("articles");
  const [expandedFaq, setExpandedFaq] = useState<number | null>(null);

  return (
    <div className="space-y-6 p-4 overflow-x-hidden max-w-full">
      {/* Header */}
      <div className="text-center">
        <h1 className="text-2xl font-semibold text-primary">Help Center</h1>
        <p className="mt-2 text-sm text-tertiary">Find answers to your questions and learn how to sell effectively</p>
      </div>

      {/* Search */}
      <div className="mx-auto max-w-2xl">
        <Input
          icon={SearchLg}
          size="md"
          value={searchQuery}
          onChange={(value) => setSearchQuery(value)}
          placeholder="Search for help articles..."
        />
      </div>

      {/* Tabs */}
      <div className="flex items-center gap-2 border-b border-secondary">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors ${
              activeTab === tab.id
                ? "border-brand-600 text-brand-600"
                : "border-transparent text-tertiary hover:text-primary"
            }`}
          >
            <tab.icon className="size-4" />
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      {activeTab === "articles" && (
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {categories.map((category) => (
            <div
              key={category.title}
              className="rounded-xl border border-secondary bg-primary p-6 hover:border-brand-300 transition-colors"
            >
              <div className="flex items-center gap-3 mb-4">
                <div className="flex size-10 items-center justify-center rounded-lg bg-brand-50">
                  <category.icon className="size-5 text-brand-600" />
                </div>
                <div>
                  <h3 className="font-semibold text-primary">{category.title}</h3>
                  <p className="text-xs text-tertiary">{category.description}</p>
                </div>
              </div>
              <ul className="space-y-2">
                {category.articles.map((article) => (
                  <li key={article.title}>
                    <Link
                      href={article.href}
                      className="flex items-center justify-between text-sm text-secondary hover:text-primary transition-colors"
                    >
                      <span>{article.title}</span>
                      <ChevronRight className="size-4" />
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}

      {activeTab === "faqs" && (
        <div className="grid gap-4 sm:grid-cols-2">
          {faqs.map((faq, index) => (
            <div key={index} className="rounded-xl border border-secondary bg-primary p-4">
              <button
                onClick={() => setExpandedFaq(expandedFaq === index ? null : index)}
                className="flex w-full items-center justify-between text-left"
              >
                <span className="text-sm font-medium text-primary">{faq.question}</span>
                <ChevronDown
                  className={`size-4 text-tertiary transition-transform flex-shrink-0 ml-2 ${
                    expandedFaq === index ? "rotate-180" : ""
                  }`}
                />
              </button>
              {expandedFaq === index && (
                <p className="mt-2 text-xs text-tertiary">{faq.answer}</p>
              )}
            </div>
          ))}
        </div>
      )}

      {/* Contact Support */}
      <div className="rounded-xl border border-secondary bg-brand-50 p-6">
        <div className="text-center">
          <h2 className="text-lg font-semibold text-primary">Still need help?</h2>
          <p className="mt-1 text-sm text-tertiary">Our support team is here to assist you</p>
          <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:justify-center">
            <Link
              href="/seller/support"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-primary border border-secondary px-4 py-2.5 text-sm font-medium text-primary hover:bg-secondary transition-colors"
            >
              <Mail01 className="size-4" />
              Email Support
            </Link>
            <Link
              href="/seller/community"
              className="inline-flex items-center justify-center gap-2 rounded-lg bg-brand-600 px-4 py-2.5 text-sm font-medium text-white hover:bg-brand-700 transition-colors"
            >
              <MessageSquare01 className="size-4" />
              Join Community
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
