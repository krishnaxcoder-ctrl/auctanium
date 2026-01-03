"use client";

import { useState } from "react";
import Link from "next/link";
import {
  HelpCircle,
  ChevronRight,
  Home05,
  ChevronDown,
  SearchLg,
  ShoppingCart01,
  CreditCard02,
  Truck01,
  Shield01,
  Users01,
  Settings01,
  MessageChatCircle,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { cx } from "@/utils/cx";

const faqCategories = [
  { id: "buying", label: "Buying", icon: ShoppingCart01 },
  { id: "selling", label: "Selling", icon: Users01 },
  { id: "payments", label: "Payments", icon: CreditCard02 },
  { id: "shipping", label: "Shipping", icon: Truck01 },
  { id: "security", label: "Security", icon: Shield01 },
  { id: "account", label: "Account", icon: Settings01 },
];

const faqs = [
  {
    category: "buying",
    questions: [
      {
        question: "How do I place a bid on an item?",
        answer: "To place a bid, simply navigate to the item you're interested in, enter your maximum bid amount, and click 'Place Bid'. Our system will automatically bid on your behalf up to your maximum amount. You'll be notified if you're outbid.",
      },
      {
        question: "What happens if I win an auction?",
        answer: "Congratulations! When you win an auction, you'll receive an email notification with payment instructions. You have 48 hours to complete the payment. Once paid, the seller will ship the item to your registered address.",
      },
      {
        question: "Can I retract my bid?",
        answer: "Bids are generally binding contracts. However, in exceptional circumstances (seller changes description, obvious typo in bid), you may request a bid retraction through our support team within 1 hour of placing the bid.",
      },
      {
        question: "How does Buy It Now work?",
        answer: "Buy It Now allows you to purchase an item immediately at a fixed price without waiting for the auction to end. This option is available on select listings and ends the auction instantly once used.",
      },
      {
        question: "What is proxy bidding?",
        answer: "Proxy bidding is our automatic bidding system. You enter your maximum bid, and our system bids the minimum amount needed to keep you as the highest bidder, up to your maximum. This saves you from constantly monitoring auctions.",
      },
    ],
  },
  {
    category: "selling",
    questions: [
      {
        question: "How do I start selling on Auctanium?",
        answer: "To start selling, create an account and complete seller verification. Once verified, you can list items by clicking 'Sell' in your dashboard. Provide detailed descriptions, quality photos, and set your starting price or reserve.",
      },
      {
        question: "What are the seller fees?",
        answer: "We charge a small listing fee and a final value fee (percentage of sale price) when your item sells. Premium listings and promotional features have additional costs. View our complete fee structure on the Seller Pricing page.",
      },
      {
        question: "How do I get paid after a sale?",
        answer: "Payments are processed through our secure payment system. Once the buyer confirms receipt or after the protection period ends, funds are released to your linked bank account within 2-3 business days.",
      },
      {
        question: "What items are prohibited?",
        answer: "We prohibit counterfeit goods, weapons, hazardous materials, stolen property, and items violating intellectual property rights. Review our complete prohibited items list in our Terms of Service.",
      },
      {
        question: "How can I become a verified seller?",
        answer: "Verified sellers complete identity verification, maintain high ratings (4.5+), and have a proven track record. Apply through your seller dashboard after 30 days of selling activity and 10+ completed sales.",
      },
    ],
  },
  {
    category: "payments",
    questions: [
      {
        question: "What payment methods are accepted?",
        answer: "We accept all major credit/debit cards (Visa, Mastercard, American Express), PayPal, bank transfers, and select digital wallets including Apple Pay and Google Pay. UPI payments are available for Indian users.",
      },
      {
        question: "Is my payment information secure?",
        answer: "Absolutely. We use bank-level 256-bit SSL encryption and are PCI DSS compliant. Your payment details are never stored on our servers and are processed through certified payment gateways.",
      },
      {
        question: "When am I charged for winning an auction?",
        answer: "You're not charged automatically. After winning, you have 48 hours to complete payment. You'll receive an invoice with secure payment options. Late payments may result in account restrictions.",
      },
      {
        question: "Can I pay in installments?",
        answer: "Yes! For purchases over ₹10,000, we offer EMI options through select partner banks. Interest rates and eligibility vary by bank. This option appears at checkout for eligible purchases.",
      },
      {
        question: "How do refunds work?",
        answer: "Refunds are processed to your original payment method within 5-7 business days after approval. For credit cards, it may take an additional billing cycle to reflect. Bank transfers are typically faster.",
      },
    ],
  },
  {
    category: "shipping",
    questions: [
      {
        question: "How is shipping calculated?",
        answer: "Shipping costs are calculated based on package dimensions, weight, destination, and selected carrier. Sellers can offer free shipping or calculated rates. You'll see the total cost before placing a bid.",
      },
      {
        question: "Do you ship internationally?",
        answer: "Many sellers offer international shipping. Look for the 'Ships Worldwide' badge on listings. International buyers are responsible for customs duties and import taxes which vary by country.",
      },
      {
        question: "How can I track my order?",
        answer: "Once shipped, you'll receive a tracking number via email. Track your package in real-time through your dashboard under 'My Orders'. We provide tracking for all major carriers.",
      },
      {
        question: "What if my item arrives damaged?",
        answer: "Document the damage with photos immediately and report within 48 hours through your order page. Our Buyer Protection covers damaged items. We'll work with you and the seller to resolve the issue.",
      },
      {
        question: "Can I change my shipping address after winning?",
        answer: "Contact the seller immediately if you need to change your address. Changes must be made before the item ships. Note that address changes may affect shipping costs.",
      },
    ],
  },
  {
    category: "security",
    questions: [
      {
        question: "How does Buyer Protection work?",
        answer: "Buyer Protection covers eligible purchases for 30 days. If an item doesn't arrive, is significantly different from the description, or is counterfeit, you're entitled to a full refund including shipping costs.",
      },
      {
        question: "How do you verify sellers?",
        answer: "Verified sellers complete identity verification, provide business documentation (if applicable), and maintain excellent performance metrics. We continuously monitor seller activity for suspicious behavior.",
      },
      {
        question: "What should I do if I suspect fraud?",
        answer: "Report suspicious activity immediately through our Trust & Safety center. Don't complete payment if something seems wrong. Our team investigates all reports within 24 hours.",
      },
      {
        question: "How do you authenticate items?",
        answer: "For high-value categories (watches, jewelry, art), we offer professional authentication services. Look for the 'Authenticated' badge. Third-party experts verify authenticity before items ship to buyers.",
      },
      {
        question: "Is my personal information protected?",
        answer: "Yes. We comply with GDPR and data protection regulations. Your data is encrypted, never sold to third parties, and you can request deletion at any time. See our Privacy Policy for details.",
      },
    ],
  },
  {
    category: "account",
    questions: [
      {
        question: "How do I create an account?",
        answer: "Click 'Sign Up' and enter your email address. You can also sign up using Google or Apple. Complete your profile with your name, address, and phone number to start bidding.",
      },
      {
        question: "I forgot my password. How do I reset it?",
        answer: "Click 'Forgot Password' on the login page and enter your email. You'll receive a reset link within minutes. Check your spam folder if you don't see it. Links expire after 24 hours.",
      },
      {
        question: "How do I change my email address?",
        answer: "Go to Settings > Account > Email. Enter your new email and verify it through the confirmation link. Your old email will receive a notification about this change for security purposes.",
      },
      {
        question: "Can I have multiple accounts?",
        answer: "No, each user is allowed one account only. Multiple accounts may be used to manipulate auctions and violate our terms. Detected duplicate accounts will be suspended.",
      },
      {
        question: "How do I delete my account?",
        answer: "Go to Settings > Account > Delete Account. Note that you must complete all pending transactions first. Account deletion is permanent and data cannot be recovered after 30 days.",
      },
    ],
  },
];

export default function FAQPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [activeCategory, setActiveCategory] = useState("buying");
  const [openQuestions, setOpenQuestions] = useState<string[]>([]);

  const toggleQuestion = (question: string) => {
    setOpenQuestions((prev) =>
      prev.includes(question)
        ? prev.filter((q) => q !== question)
        : [...prev, question]
    );
  };

  const filteredFaqs = faqs
    .map((category) => ({
      ...category,
      questions: category.questions.filter(
        (q) =>
          q.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
          q.answer.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    }))
    .filter((category) => category.questions.length > 0);

  const currentCategoryFaqs = searchQuery
    ? filteredFaqs
    : faqs.filter((f) => f.category === activeCategory);

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: "24px 24px",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">FAQ</span>
          </nav>

          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <HelpCircle className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Frequently Asked Questions
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  Find answers to common questions
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Search */}
        <div className="mx-auto max-w-2xl mb-8">
          <Input
            placeholder="Search for answers..."
            icon={SearchLg}
            size="md"
            value={searchQuery}
            onChange={(value) => setSearchQuery(value)}
          />
        </div>

        {/* Categories */}
        {!searchQuery && (
          <div className="flex flex-wrap justify-center gap-2 mb-8">
            {faqCategories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category.id)}
                className={cx(
                  "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all",
                  activeCategory === category.id
                    ? "bg-brand-600 text-white"
                    : "bg-secondary text-secondary hover:bg-brand-100 hover:text-brand-700"
                )}
              >
                <category.icon className="size-4" />
                {category.label}
              </button>
            ))}
          </div>
        )}

        {/* FAQ List */}
        <div className="mx-auto max-w-3xl">
          {currentCategoryFaqs.map((category) => (
            <div key={category.category} className="mb-8">
              {searchQuery && (
                <h2 className="text-lg font-semibold text-primary mb-4 capitalize">
                  {category.category}
                </h2>
              )}
              <div className="space-y-3">
                {category.questions.map((faq, index) => (
                  <div
                    key={index}
                    className="rounded-xl border border-secondary bg-primary overflow-hidden"
                  >
                    <button
                      onClick={() => toggleQuestion(faq.question)}
                      className="flex w-full items-center justify-between p-4 text-left hover:bg-secondary/50 transition-colors"
                    >
                      <span className="font-medium text-primary pr-4">
                        {faq.question}
                      </span>
                      <ChevronDown
                        className={cx(
                          "size-5 text-tertiary transition-transform flex-shrink-0",
                          openQuestions.includes(faq.question) && "rotate-180"
                        )}
                      />
                    </button>
                    {openQuestions.includes(faq.question) && (
                      <div className="px-4 pb-4">
                        <p className="text-tertiary leading-relaxed">
                          {faq.answer}
                        </p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 rounded-2xl border border-secondary bg-secondary/30 p-8 text-center">
          <MessageChatCircle className="size-12 text-brand-600 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-primary mb-2">
            Still have questions?
          </h2>
          <p className="text-tertiary mb-6 max-w-md mx-auto">
            Can&apos;t find the answer you&apos;re looking for? Our support team is here to help.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/contact">
              <Button color="primary" size="lg">
                Contact Support
              </Button>
            </Link>
            <Link href="/help-center">
              <Button color="secondary" size="lg">
                Visit Help Center
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
