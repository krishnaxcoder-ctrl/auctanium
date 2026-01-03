"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
  Users01,
  ChevronRight,
  Home05,
  Gift01,
  Copy01,
  CheckCircle,
  Share07,
  CurrencyRupee,
  TrendUp01,
  Mail01,
  MessageCircle01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Input } from "@/components/base/input/input";
import { FeaturedIcon } from "@/components/foundations/featured-icon/featured-icon";

const rewards = [
  { friends: 1, reward: "₹500", bonus: null },
  { friends: 3, reward: "₹1,500", bonus: "Bonus ₹500" },
  { friends: 5, reward: "₹2,500", bonus: "Bonus ₹1,000" },
  { friends: 10, reward: "₹5,000", bonus: "Bonus ₹2,500" },
];

const howItWorks = [
  {
    step: 1,
    title: "Share Your Link",
    description: "Copy your unique referral link and share it with friends via email, SMS, or social media.",
    icon: Share07,
  },
  {
    step: 2,
    title: "Friend Signs Up",
    description: "When your friend creates an account and completes their first purchase using your link.",
    icon: Users01,
  },
  {
    step: 3,
    title: "Both Get Rewarded",
    description: "You get ₹500 credit and your friend gets ₹250 off their first purchase. Win-win!",
    icon: Gift01,
  },
];

const leaderboard = [
  { rank: 1, name: "Rahul S.", referrals: 156, earnings: "₹78,000", avatar: "https://randomuser.me/api/portraits/men/32.jpg" },
  { rank: 2, name: "Priya P.", referrals: 134, earnings: "₹67,000", avatar: "https://randomuser.me/api/portraits/women/44.jpg" },
  { rank: 3, name: "Amit V.", referrals: 98, earnings: "₹49,000", avatar: "https://randomuser.me/api/portraits/men/45.jpg" },
  { rank: 4, name: "Sneha R.", referrals: 87, earnings: "₹43,500", avatar: "https://randomuser.me/api/portraits/women/33.jpg" },
  { rank: 5, name: "Karthik N.", referrals: 76, earnings: "₹38,000", avatar: "https://randomuser.me/api/portraits/men/52.jpg" },
];

export default function ReferralPage() {
  const [copied, setCopied] = useState(false);
  const referralLink = "https://auctanium.com/ref/ABC123XYZ";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(referralLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-gradient-to-br from-brand-600 via-brand-700 to-purple-700">
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
            <span className="text-white">Referral Program</span>
          </nav>

          <div className="flex items-center gap-3 sm:gap-5">
            <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
              <Gift01 className="size-5 sm:size-7 text-white" />
            </div>
            <div>
              <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                Referral Program
              </h1>
              <p className="mt-2 hidden text-white/80 sm:block">
                Invite friends, earn rewards together
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        {/* Hero Banner */}
        <div className="mb-12 rounded-2xl bg-gradient-to-r from-success-50 to-brand-50 border border-success-200 p-8 sm:p-12 text-center">
          <Badge type="pill-color" color="success" size="lg" className="mb-4">
            <CurrencyRupee className="size-4 mr-1" />
            Earn Up to ₹10,000
          </Badge>
          <h2 className="text-2xl sm:text-3xl font-bold text-primary mb-3">
            Give ₹250, Get ₹500
          </h2>
          <p className="text-tertiary max-w-xl mx-auto mb-8">
            Share Auctanium with friends and family. When they make their first purchase,
            you both get rewarded!
          </p>

          {/* Referral Link */}
          <div className="max-w-lg mx-auto">
            <div className="flex gap-2">
              <Input
                value={referralLink}
                isReadOnly
                size="md"
                className="flex-1"
              />
              <Button
                color={copied ? "primary" : "secondary"}
                size="lg"
                onClick={copyToClipboard}
                iconLeading={copied ? CheckCircle : Copy01}
              >
                {copied ? "Copied!" : "Copy"}
              </Button>
            </div>
            <div className="flex flex-wrap justify-center gap-3 mt-4">
              <Button color="secondary" size="md" iconLeading={Mail01}>
                Email
              </Button>
              <Button color="secondary" size="md" iconLeading={MessageCircle01}>
                WhatsApp
              </Button>
              <Button color="secondary" size="md" iconLeading={Share07}>
                Share
              </Button>
            </div>
          </div>
        </div>

        {/* How It Works */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="brand" size="sm">How It Works</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              Easy as 1-2-3
            </h2>
          </div>

          <div className="grid gap-6 lg:grid-cols-3">
            {howItWorks.map((step, index) => (
              <div key={index} className="rounded-xl border border-secondary bg-primary p-6 text-center">
                <div className="flex size-12 items-center justify-center rounded-full bg-brand-600 text-white font-bold mx-auto mb-4">
                  {step.step}
                </div>
                <FeaturedIcon icon={step.icon} size="lg" color="brand" theme="light" className="mx-auto mb-4" />
                <h3 className="font-semibold text-primary">{step.title}</h3>
                <p className="mt-2 text-sm text-tertiary">{step.description}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Reward Tiers */}
        <div className="mb-12">
          <div className="text-center mb-8">
            <Badge type="pill-color" color="warning" size="sm">Reward Tiers</Badge>
            <h2 className="mt-4 text-2xl sm:text-3xl font-bold text-primary">
              The More You Refer, The More You Earn
            </h2>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {rewards.map((tier, index) => (
              <div
                key={index}
                className={`rounded-xl border p-6 text-center ${
                  index === rewards.length - 1
                    ? "border-brand-500 bg-brand-50 ring-1 ring-brand-500"
                    : "border-secondary bg-primary"
                }`}
              >
                <p className="text-sm text-tertiary">{tier.friends} Friend{tier.friends > 1 ? "s" : ""}</p>
                <p className="text-2xl font-bold text-brand-600 mt-1">{tier.reward}</p>
                {tier.bonus && (
                  <Badge type="pill-color" color="success" size="sm" className="mt-2">
                    {tier.bonus}
                  </Badge>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Your Stats & Leaderboard */}
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Your Stats */}
          <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
            <h2 className="text-xl font-semibold text-primary mb-6">Your Referral Stats</h2>
            <div className="grid grid-cols-2 gap-4">
              <div className="rounded-xl bg-secondary p-4 text-center">
                <p className="text-2xl font-bold text-brand-600">0</p>
                <p className="text-sm text-tertiary">Friends Invited</p>
              </div>
              <div className="rounded-xl bg-secondary p-4 text-center">
                <p className="text-2xl font-bold text-success-600">₹0</p>
                <p className="text-sm text-tertiary">Total Earned</p>
              </div>
              <div className="rounded-xl bg-secondary p-4 text-center">
                <p className="text-2xl font-bold text-warning-600">0</p>
                <p className="text-sm text-tertiary">Pending</p>
              </div>
              <div className="rounded-xl bg-secondary p-4 text-center">
                <p className="text-2xl font-bold text-tertiary">0</p>
                <p className="text-sm text-tertiary">Link Clicks</p>
              </div>
            </div>
            <p className="text-sm text-tertiary mt-4 text-center">
              Start sharing your link to see your stats here!
            </p>
          </div>

          {/* Leaderboard */}
          <div className="rounded-2xl border border-secondary bg-primary p-6 sm:p-8">
            <div className="flex items-center gap-2 mb-6">
              <TrendUp01 className="size-5 text-brand-600" />
              <h2 className="text-xl font-semibold text-primary">Top Referrers</h2>
            </div>
            <div className="space-y-3">
              {leaderboard.map((user) => (
                <div key={user.rank} className="flex items-center gap-3 p-3 rounded-lg bg-secondary">
                  <span className={`flex size-8 items-center justify-center rounded-full font-bold text-sm ${
                    user.rank === 1 ? "bg-yellow-500 text-white" :
                    user.rank === 2 ? "bg-gray-400 text-white" :
                    user.rank === 3 ? "bg-amber-600 text-white" :
                    "bg-tertiary text-primary"
                  }`}>
                    {user.rank}
                  </span>
                  <Image
                    src={user.avatar}
                    alt={user.name}
                    width={40}
                    height={40}
                    className="rounded-full"
                  />
                  <div className="flex-1">
                    <p className="font-medium text-primary">{user.name}</p>
                    <p className="text-xs text-tertiary">{user.referrals} referrals</p>
                  </div>
                  <p className="font-semibold text-success-600">{user.earnings}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Terms */}
        <div className="mt-12 p-6 rounded-xl bg-secondary">
          <h3 className="font-semibold text-primary mb-2">Terms & Conditions</h3>
          <ul className="text-sm text-tertiary space-y-1">
            <li>• Referral rewards are credited after your friend&apos;s first successful purchase of ₹1,000 or more.</li>
            <li>• Maximum earnings per account: ₹50,000. Additional referrals earn store credit.</li>
            <li>• Self-referrals and fraudulent activity will result in account suspension.</li>
            <li>• Auctanium reserves the right to modify or end the program at any time.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
