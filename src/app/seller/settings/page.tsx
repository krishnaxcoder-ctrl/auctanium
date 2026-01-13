"use client";

import { useState, useRef } from "react";
import Image from "next/image";
import {
  Settings01,
  Building01,
  CreditCard01,
  Truck01,
  Bell01,
  File06,
  Receipt,
  User01,
  Camera01,
  Plus,
  Trash01,
  Edit02,
  Check,
  Globe02,
  Mail01,
  Phone01,
  MarkerPin01,
  Bank,
  Clock,
  Package,
  ChevronRight,
  AlertCircle,
  ShieldTick,
  CurrencyDollar,
  Bold01,
  Italic01,
  Underline01,
  Link01,
  AlignLeft,
  AlignCenter,
  List,
  XClose,
  Eye,
  EyeOff,
  Copy01,
  RefreshCw01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Badge } from "@/components/base/badges/badges";
import { Toggle } from "@/components/base/toggle/toggle";
import { Select } from "@/components/base/select/select";

const tabs = [
  { id: "store", label: "Store Profile", icon: Building01 },
  { id: "business", label: "Business Info", icon: File06 },
  { id: "payments", label: "Payments", icon: CreditCard01 },
  { id: "shipping", label: "Shipping", icon: Truck01 },
  { id: "notifications", label: "Notifications", icon: Bell01 },
  { id: "policies", label: "Policies", icon: File06 },
  { id: "billing", label: "Billing", icon: Receipt },
];

const currencies = [
  { id: "inr", label: "INR (₹)" },
  { id: "usd", label: "USD ($)" },
  { id: "eur", label: "EUR (€)" },
  { id: "gbp", label: "GBP (£)" },
  { id: "aed", label: "AED (د.إ)" },
];

const countries = [
  { id: "in", label: "India" },
  { id: "us", label: "United States" },
  { id: "uk", label: "United Kingdom" },
  { id: "ae", label: "United Arab Emirates" },
  { id: "sg", label: "Singapore" },
  { id: "au", label: "Australia" },
];

const indianStates = [
  { id: "mh", label: "Maharashtra" },
  { id: "dl", label: "Delhi" },
  { id: "ka", label: "Karnataka" },
  { id: "tn", label: "Tamil Nadu" },
  { id: "gj", label: "Gujarat" },
  { id: "rj", label: "Rajasthan" },
  { id: "up", label: "Uttar Pradesh" },
  { id: "wb", label: "West Bengal" },
  { id: "ts", label: "Telangana" },
  { id: "kl", label: "Kerala" },
  { id: "pb", label: "Punjab" },
  { id: "hr", label: "Haryana" },
  { id: "mp", label: "Madhya Pradesh" },
  { id: "ap", label: "Andhra Pradesh" },
  { id: "br", label: "Bihar" },
];

const timezones = [
  { id: "ist", label: "India Standard Time (IST)" },
  { id: "utc", label: "UTC" },
  { id: "gst", label: "Gulf Standard Time (GST)" },
  { id: "sgt", label: "Singapore Time (SGT)" },
  { id: "pst", label: "Pacific Time (PT)" },
];

const shippingZones = [
  { id: 1, name: "Local", countries: "Within City", rates: 2 },
  { id: 2, name: "Metro Cities", countries: "Delhi, Mumbai, Bangalore, Chennai, Kolkata, Hyderabad", rates: 3 },
  { id: 3, name: "Rest of India", countries: "All other Indian states", rates: 4 },
  { id: 4, name: "International", countries: "UAE, Singapore, USA, UK", rates: 5 },
];

const invoices = [
  { id: "INV-2024-012", date: "15 Dec, 2024", amount: 2499, status: "paid" },
  { id: "INV-2024-011", date: "15 Nov, 2024", amount: 2499, status: "paid" },
  { id: "INV-2024-010", date: "15 Oct, 2024", amount: 2499, status: "paid" },
  { id: "INV-2024-009", date: "15 Sep, 2024", amount: 2499, status: "paid" },
];

const policyTemplates = {
  return: `<h3>Return Policy</h3>
<p>We want you to be completely satisfied with your purchase. If you're not happy with your order, we offer the following return options:</p>
<ul>
<li><strong>Return Window:</strong> 30 days from the date of delivery</li>
<li><strong>Condition:</strong> Items must be unused, unworn, and in original packaging with all tags attached</li>
<li><strong>Refund Method:</strong> Original payment method within 5-7 business days</li>
<li><strong>Return Shipping:</strong> Customer is responsible for return shipping costs unless the item is defective</li>
</ul>
<p>To initiate a return, please contact our customer service team with your order number.</p>`,
  shipping: `<h3>Shipping Policy</h3>
<p>We strive to deliver your orders as quickly as possible. Here's what you can expect:</p>
<ul>
<li><strong>Processing Time:</strong> 1-2 business days</li>
<li><strong>Standard Shipping:</strong> 5-7 business days</li>
<li><strong>Express Shipping:</strong> 2-3 business days</li>
<li><strong>International Shipping:</strong> 10-14 business days</li>
</ul>
<p>All orders include tracking information sent via email once shipped. Free shipping is available on orders over $50.</p>`,
  privacy: `<h3>Privacy Policy</h3>
<p>We are committed to protecting your privacy. This policy explains how we collect, use, and safeguard your information:</p>
<ul>
<li><strong>Information Collected:</strong> Name, email, shipping address, payment information</li>
<li><strong>Usage:</strong> To process orders, communicate updates, and improve our services</li>
<li><strong>Data Protection:</strong> We use industry-standard encryption and security measures</li>
<li><strong>Third Parties:</strong> We do not sell your personal information to third parties</li>
</ul>
<p>For questions about our privacy practices, please contact us.</p>`,
  terms: `<h3>Terms of Service</h3>
<p>By using our store, you agree to the following terms:</p>
<ul>
<li><strong>Account:</strong> You are responsible for maintaining the security of your account</li>
<li><strong>Orders:</strong> All orders are subject to availability and confirmation</li>
<li><strong>Pricing:</strong> Prices are subject to change without notice</li>
<li><strong>Intellectual Property:</strong> All content on this site is owned by us</li>
</ul>
<p>We reserve the right to refuse service or cancel orders at our discretion.</p>`,
  cancellation: `<h3>Cancellation Policy</h3>
<p>We understand that plans can change. Here's our cancellation policy:</p>
<ul>
<li><strong>Before Processing:</strong> Orders can be cancelled within 2 hours of placement for a full refund</li>
<li><strong>After Processing:</strong> Once an order has been processed, it cannot be cancelled</li>
<li><strong>Shipped Orders:</strong> Orders that have shipped must follow our return policy</li>
</ul>
<p>To cancel an order, please contact us immediately with your order number.</p>`,
};

interface Policy {
  id: string;
  title: string;
  description: string;
  content: string;
  isVisible: boolean;
  lastUpdated: string;
  isEditing: boolean;
}

const defaultPolicies: Policy[] = [
  {
    id: "return",
    title: "Return & Refund Policy",
    description: "Define your return and refund terms",
    content: policyTemplates.return,
    isVisible: true,
    lastUpdated: "Dec 10, 2024",
    isEditing: false,
  },
  {
    id: "shipping",
    title: "Shipping Policy",
    description: "Explain shipping terms and delivery times",
    content: policyTemplates.shipping,
    isVisible: true,
    lastUpdated: "Dec 8, 2024",
    isEditing: false,
  },
  {
    id: "privacy",
    title: "Privacy Policy",
    description: "How you handle customer data",
    content: policyTemplates.privacy,
    isVisible: true,
    lastUpdated: "Dec 5, 2024",
    isEditing: false,
  },
  {
    id: "terms",
    title: "Terms of Service",
    description: "Store terms and conditions",
    content: policyTemplates.terms,
    isVisible: true,
    lastUpdated: "Dec 1, 2024",
    isEditing: false,
  },
  {
    id: "cancellation",
    title: "Cancellation Policy",
    description: "Order cancellation rules",
    content: policyTemplates.cancellation,
    isVisible: false,
    lastUpdated: "Nov 28, 2024",
    isEditing: false,
  },
];

export default function SellerSettingsPage() {
  const [activeTab, setActiveTab] = useState("store");

  // Store Profile State
  const [storeName, setStoreName] = useState("Bharat Bazaar");
  const [storeDescription, setStoreDescription] = useState("Premium quality products at best prices. Fast delivery across India.");
  const [storeEmail, setStoreEmail] = useState("contact@bharatbazaar.in");
  const [storePhone, setStorePhone] = useState("+91 98765 43210");
  const [storeCurrency, setStoreCurrency] = useState("inr");
  const [storeTimezone, setStoreTimezone] = useState("ist");

  // Business Info State
  const [businessName, setBusinessName] = useState("Bharat Bazaar Pvt. Ltd.");
  const [businessType, setBusinessType] = useState("pvt_ltd");
  const [gstNumber, setGstNumber] = useState("27AABCU9603R1ZM");
  const [panNumber, setPanNumber] = useState("AABCU9603R");
  const [businessAddress, setBusinessAddress] = useState("42, Nehru Road, Andheri East");
  const [businessCity, setBusinessCity] = useState("Mumbai");
  const [businessState, setBusinessState] = useState("mh");
  const [businessPincode, setBusinessPincode] = useState("400069");
  const [businessCountry, setBusinessCountry] = useState("in");

  // Payment State
  const [payoutSchedule, setPayoutSchedule] = useState("weekly");
  const [minimumPayout, setMinimumPayout] = useState("50");

  // Notification State
  const [notifications, setNotifications] = useState({
    newOrder: true,
    orderShipped: true,
    lowStock: true,
    newReview: true,
    newMessage: true,
    payoutComplete: true,
    weeklyReport: false,
    marketingEmails: false,
  });

  const toggleNotification = (key: keyof typeof notifications) => {
    setNotifications((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  // Policies State
  const [policies, setPolicies] = useState<Policy[]>(defaultPolicies);
  const [addingNewPolicy, setAddingNewPolicy] = useState(false);
  const [newPolicyTitle, setNewPolicyTitle] = useState("");
  const editorRefs = useRef<{ [key: string]: HTMLDivElement | null }>({});

  const togglePolicyVisibility = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isVisible: !p.isVisible } : p))
    );
  };

  const togglePolicyEditing = (id: string) => {
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isEditing: !p.isEditing } : p))
    );
  };

  const savePolicyContent = (id: string) => {
    const editor = editorRefs.current[id];
    if (editor) {
      const today = new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      });
      setPolicies((prev) =>
        prev.map((p) =>
          p.id === id
            ? { ...p, content: editor.innerHTML, isEditing: false, lastUpdated: today }
            : p
        )
      );
    }
  };

  const cancelPolicyEditing = (id: string, originalContent: string) => {
    const editor = editorRefs.current[id];
    if (editor) {
      editor.innerHTML = originalContent;
    }
    setPolicies((prev) =>
      prev.map((p) => (p.id === id ? { ...p, isEditing: false } : p))
    );
  };

  const resetPolicyToTemplate = (id: string) => {
    const templateKey = id as keyof typeof policyTemplates;
    if (policyTemplates[templateKey]) {
      const editor = editorRefs.current[id];
      if (editor) {
        editor.innerHTML = policyTemplates[templateKey];
      }
    }
  };

  const deletePolicy = (id: string) => {
    if (confirm("Are you sure you want to delete this policy?")) {
      setPolicies((prev) => prev.filter((p) => p.id !== id));
    }
  };

  const addNewPolicy = () => {
    if (!newPolicyTitle.trim()) return;
    const newPolicy: Policy = {
      id: `custom-${Date.now()}`,
      title: newPolicyTitle,
      description: "Custom policy",
      content: "<p>Enter your policy content here...</p>",
      isVisible: true,
      lastUpdated: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      isEditing: true,
    };
    setPolicies((prev) => [...prev, newPolicy]);
    setNewPolicyTitle("");
    setAddingNewPolicy(false);
  };

  const execCommand = (command: string, value?: string) => {
    document.execCommand(command, false, value);
  };

  return (
    <div className="space-y-4 sm:space-y-6 overflow-x-hidden max-w-full">
      {/* Header */}
      <div>
        <h1 className="text-lg sm:text-xl font-semibold text-primary flex items-center gap-2">
          <Settings01 className="size-5 sm:size-6 flex-shrink-0" />
          Settings
        </h1>
        <p className="mt-1 text-sm text-tertiary">
          Manage your store settings and preferences
        </p>
      </div>

      {/* Horizontal Tabs */}
      <div className="border-b border-secondary overflow-x-auto">
        <nav className="flex gap-0.5 sm:gap-1">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-1 sm:gap-2 px-2 sm:px-4 py-2.5 sm:py-3 text-xs sm:text-sm font-medium border-b-2 transition-colors whitespace-nowrap ${
                activeTab === tab.id
                  ? "border-brand-600 text-brand-600"
                  : "border-transparent text-tertiary hover:text-primary hover:border-gray-300"
              }`}
            >
              <tab.icon className="size-4 flex-shrink-0" />
              <span className="hidden md:inline">{tab.label}</span>
            </button>
          ))}
        </nav>
      </div>

      {/* Content */}
      <div className="space-y-4 sm:space-y-6">
          {/* Store Profile Tab */}
          {activeTab === "store" && (
            <>
              {/* Store Logo & Banner */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Store Branding</h2>

                <div className="space-y-6">
                  {/* Logo */}
                  <div className="flex items-start gap-3 sm:gap-4">
                    <div className="relative flex-shrink-0">
                      <div className="size-16 sm:size-20 rounded-xl overflow-hidden bg-secondary border-2 border-dashed border-gray-300 flex items-center justify-center">
                        <Building01 className="size-6 sm:size-8 text-tertiary" />
                      </div>
                      <button className="absolute -bottom-1 -right-1 flex size-6 sm:size-7 items-center justify-center rounded-full bg-brand-600 text-white hover:bg-brand-700 transition-colors">
                        <Camera01 className="size-3 sm:size-3.5" />
                      </button>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-sm font-medium text-primary">Store Logo</h3>
                      <p className="text-xs text-tertiary mt-0.5">Recommended: 400x400px, PNG or JPG</p>
                      <Button color="secondary" size="sm" className="mt-2">
                        Upload Logo
                      </Button>
                    </div>
                  </div>

                  {/* Banner */}
                  <div>
                    <h3 className="text-sm font-medium text-primary mb-2">Store Banner</h3>
                    <div className="relative h-32 rounded-xl overflow-hidden bg-secondary border-2 border-dashed border-gray-300 flex items-center justify-center">
                      <div className="text-center">
                        <Camera01 className="size-8 text-tertiary mx-auto mb-2" />
                        <p className="text-xs text-tertiary">Recommended: 1200x300px</p>
                      </div>
                    </div>
                    <Button color="secondary" size="sm" className="mt-2">
                      Upload Banner
                    </Button>
                  </div>
                </div>
              </div>

              {/* Store Information */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Store Information</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Store Name</label>
                    <input
                      type="text"
                      value={storeName}
                      onChange={(e) => setStoreName(e.target.value)}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Store Description</label>
                    <textarea
                      value={storeDescription}
                      onChange={(e) => setStoreDescription(e.target.value)}
                      rows={3}
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent resize-none"
                    />
                    <p className="text-xs text-tertiary mt-1">This will appear on your store page</p>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Contact Email</label>
                      <input
                        type="email"
                        value={storeEmail}
                        onChange={(e) => setStoreEmail(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Contact Phone</label>
                      <input
                        type="tel"
                        value={storePhone}
                        onChange={(e) => setStorePhone(e.target.value)}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Currency</label>
                      <Select
                        size="sm"
                        items={currencies}
                        selectedKey={storeCurrency}
                        onSelectionChange={(key) => setStoreCurrency(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Timezone</label>
                      <Select
                        size="sm"
                        items={timezones}
                        selectedKey={storeTimezone}
                        onSelectionChange={(key) => setStoreTimezone(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Business Info Tab */}
          {activeTab === "business" && (
            <>
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <div className="flex items-center justify-between mb-4 sm:mb-6 gap-2">
                  <h2 className="text-base sm:text-lg font-semibold text-primary">Business Details</h2>
                  <Badge type="pill-color" size="sm" color="success" className="flex-shrink-0">
                    <ShieldTick className="size-3 mr-1" />
                    GST Verified
                  </Badge>
                </div>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Legal Business Name</label>
                      <input
                        type="text"
                        value={businessName}
                        onChange={(e) => setBusinessName(e.target.value)}
                        placeholder="As per GST registration"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Business Type</label>
                      <Select
                        size="sm"
                        items={[
                          { id: "individual", label: "Individual / Proprietorship" },
                          { id: "partnership", label: "Partnership Firm" },
                          { id: "pvt_ltd", label: "Private Limited Company" },
                          { id: "llp", label: "LLP" },
                          { id: "opc", label: "One Person Company" },
                          { id: "huf", label: "HUF" },
                        ]}
                        selectedKey={businessType}
                        onSelectionChange={(key) => setBusinessType(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">GSTIN</label>
                      <input
                        type="text"
                        value={gstNumber}
                        onChange={(e) => setGstNumber(e.target.value.toUpperCase())}
                        placeholder="22AAAAA0000A1Z5"
                        maxLength={15}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent uppercase"
                      />
                      <p className="text-xs text-tertiary mt-1">15-digit GST Identification Number</p>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">PAN Number</label>
                      <input
                        type="text"
                        value={panNumber}
                        onChange={(e) => setPanNumber(e.target.value.toUpperCase())}
                        placeholder="ABCDE1234F"
                        maxLength={10}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent uppercase"
                      />
                      <p className="text-xs text-tertiary mt-1">Permanent Account Number</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Registered Address</h2>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Address Line</label>
                    <input
                      type="text"
                      value={businessAddress}
                      onChange={(e) => setBusinessAddress(e.target.value)}
                      placeholder="Building, Street, Locality"
                      className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                    />
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">City</label>
                      <input
                        type="text"
                        value={businessCity}
                        onChange={(e) => setBusinessCity(e.target.value)}
                        placeholder="Mumbai"
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">PIN Code</label>
                      <input
                        type="text"
                        value={businessPincode}
                        onChange={(e) => setBusinessPincode(e.target.value.replace(/\D/g, "").slice(0, 6))}
                        placeholder="400001"
                        maxLength={6}
                        className="w-full px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">State</label>
                      <Select
                        size="sm"
                        items={indianStates}
                        selectedKey={businessState}
                        onSelectionChange={(key) => setBusinessState(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Country</label>
                      <Select
                        size="sm"
                        items={countries}
                        selectedKey={businessCountry}
                        onSelectionChange={(key) => setBusinessCountry(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Payments Tab */}
          {activeTab === "payments" && (
            <>
              {/* Payout Account */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Bank Account</h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-secondary/50 rounded-xl mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-brand-100 flex-shrink-0">
                      <Bank className="size-5 sm:size-6 text-brand-600" />
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-primary truncate">A/C ••••••4567</p>
                      <p className="text-xs text-tertiary">HDFC Bank - Savings Account</p>
                      <p className="text-xs text-tertiary">IFSC: HDFC0001234</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Badge type="pill-color" size="sm" color="success">Primary</Badge>
                    <Button color="secondary" size="sm" iconLeading={Edit02}>
                      Edit
                    </Button>
                  </div>
                </div>

                <Button color="secondary" size="sm" iconLeading={Plus}>
                  Add Bank Account
                </Button>
              </div>

              {/* UPI Details */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">UPI Details</h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-secondary/50 rounded-xl mb-4">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-green-100 flex-shrink-0">
                      <span className="text-lg font-bold text-green-600">₹</span>
                    </div>
                    <div className="min-w-0">
                      <p className="text-sm font-medium text-primary truncate">bharatbazaar@hdfcbank</p>
                      <p className="text-xs text-tertiary">UPI ID for instant payouts</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2 self-end sm:self-auto">
                    <Badge type="pill-color" size="sm" color="brand">Verified</Badge>
                    <Button color="secondary" size="sm" iconLeading={Edit02}>
                      Edit
                    </Button>
                  </div>
                </div>
              </div>

              {/* Payout Settings */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Payout Settings</h2>

                <div className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Payout Schedule</label>
                      <Select
                        size="sm"
                        items={[
                          { id: "instant", label: "Instant (via UPI)" },
                          { id: "daily", label: "Daily" },
                          { id: "weekly", label: "Weekly" },
                          { id: "biweekly", label: "Every 2 weeks" },
                          { id: "monthly", label: "Monthly" },
                        ]}
                        selectedKey={payoutSchedule}
                        onSelectionChange={(key) => setPayoutSchedule(key as string)}
                      >
                        {(item) => <Select.Item id={item.id} label={item.label} />}
                      </Select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-primary mb-1.5">Minimum Payout Amount</label>
                      <div className="relative">
                        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">₹</span>
                        <input
                          type="number"
                          value={minimumPayout}
                          onChange={(e) => setMinimumPayout(e.target.value)}
                          placeholder="500"
                          className="w-full pl-7 pr-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                        />
                      </div>
                      <p className="text-xs text-tertiary mt-1">Minimum ₹100 for bank transfer, ₹1 for UPI</p>
                    </div>
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>

              {/* Balance */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4">Current Balance</h2>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4">
                  <div className="p-3 sm:p-4 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Available</p>
                    <p className="text-lg sm:text-2xl font-semibold text-primary">₹1,02,456</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-secondary/50 rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Pending</p>
                    <p className="text-lg sm:text-2xl font-semibold text-primary">₹45,678</p>
                  </div>
                  <div className="p-3 sm:p-4 bg-secondary/50 rounded-xl col-span-2 sm:col-span-1">
                    <p className="text-xs text-tertiary mb-1">Next Payout</p>
                    <p className="text-lg sm:text-2xl font-semibold text-primary">22 Dec</p>
                  </div>
                </div>

                <div className="flex gap-2 mt-4">
                  <Button color="primary" size="sm">
                    Request Payout
                  </Button>
                  <Button color="secondary" size="sm">
                    View Statement
                  </Button>
                </div>
              </div>
            </>
          )}

          {/* Shipping Tab */}
          {activeTab === "shipping" && (
            <>
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 mb-4 sm:mb-6">
                  <h2 className="text-base sm:text-lg font-semibold text-primary">Shipping Zones</h2>
                  <Button color="primary" size="sm" iconLeading={Plus} className="self-start sm:self-auto">
                    Add Zone
                  </Button>
                </div>

                <div className="space-y-3">
                  {shippingZones.map((zone) => (
                    <div
                      key={zone.id}
                      className="flex items-center justify-between gap-3 p-3 sm:p-4 border border-secondary rounded-xl hover:bg-secondary/30 transition-colors"
                    >
                      <div className="flex items-center gap-3 sm:gap-4 min-w-0">
                        <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                          <Globe02 className="size-4 sm:size-5 text-brand-600" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-sm font-medium text-primary truncate">{zone.name}</p>
                          <p className="text-xs text-tertiary truncate">{zone.countries}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
                        <span className="text-xs text-tertiary">{zone.rates} rates</span>
                        <ChevronRight className="size-4 text-tertiary" />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Shipping Preferences</h2>

                <div className="space-y-4">
                  <div className="flex items-center justify-between py-3 border-b border-secondary">
                    <div>
                      <p className="text-sm font-medium text-primary">Free shipping threshold</p>
                      <p className="text-xs text-tertiary">Offer free shipping on orders over a certain amount</p>
                    </div>
                    <Toggle size="sm" isSelected={true} onChange={() => {}} />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-primary mb-1.5">Minimum order for free shipping</label>
                    <div className="relative max-w-[200px]">
                      <span className="absolute left-3 top-1/2 -translate-y-1/2 text-sm text-tertiary">₹</span>
                      <input
                        type="number"
                        defaultValue="499"
                        className="w-full pl-7 pr-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent"
                      />
                    </div>
                    <p className="text-xs text-tertiary mt-1">Free delivery on orders above this amount</p>
                  </div>

                  <div className="flex items-center justify-between py-3 border-b border-secondary">
                    <div>
                      <p className="text-sm font-medium text-primary">Calculated shipping rates</p>
                      <p className="text-xs text-tertiary">Show carrier-calculated rates at checkout</p>
                    </div>
                    <Toggle size="sm" isSelected={false} onChange={() => {}} />
                  </div>

                  <div className="pt-4">
                    <Button color="primary" size="sm">Save Changes</Button>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Notifications Tab */}
          {activeTab === "notifications" && (
            <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
              <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Email Notifications</h2>

              <div className="space-y-1">
                {[
                  { key: "newOrder", title: "New Orders", description: "Get notified when you receive a new order" },
                  { key: "orderShipped", title: "Order Shipped", description: "Confirmation when orders are shipped" },
                  { key: "lowStock", title: "Low Stock Alerts", description: "Alert when products are running low" },
                  { key: "newReview", title: "New Reviews", description: "Notification for new product reviews" },
                  { key: "newMessage", title: "Customer Messages", description: "Alert for new customer inquiries" },
                  { key: "payoutComplete", title: "Payout Complete", description: "Confirmation when payouts are processed" },
                  { key: "weeklyReport", title: "Weekly Report", description: "Summary of your weekly sales and performance" },
                  { key: "marketingEmails", title: "Marketing & Tips", description: "Tips to grow your business" },
                ].map((item) => (
                  <div
                    key={item.key}
                    className="flex items-center justify-between py-4 border-b border-secondary last:border-0"
                  >
                    <div>
                      <p className="text-sm font-medium text-primary">{item.title}</p>
                      <p className="text-xs text-tertiary">{item.description}</p>
                    </div>
                    <Toggle
                      size="sm"
                      isSelected={notifications[item.key as keyof typeof notifications]}
                      onChange={() => toggleNotification(item.key as keyof typeof notifications)}
                    />
                  </div>
                ))}
              </div>

              <div className="pt-6">
                <Button color="primary" size="sm">Save Preferences</Button>
              </div>
            </div>
          )}

          {/* Policies Tab */}
          {activeTab === "policies" && (
            <>
              {/* Header with Add Button */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 bg-primary border border-secondary rounded-xl p-3 sm:p-4">
                <div className="min-w-0">
                  <h2 className="text-sm sm:text-base font-semibold text-primary">Store Policies</h2>
                  <p className="text-xs text-tertiary">Manage your store policies displayed to customers</p>
                </div>
                <Button
                  color="primary"
                  size="sm"
                  iconLeading={Plus}
                  onClick={() => setAddingNewPolicy(true)}
                  className="self-start sm:self-auto flex-shrink-0"
                >
                  Add Policy
                </Button>
              </div>

              {/* Add New Policy Form */}
              {addingNewPolicy && (
                <div className="bg-primary border border-brand-200 rounded-xl p-3 sm:p-4">
                  <h3 className="text-sm font-medium text-primary mb-3">Add New Policy</h3>
                  <div className="flex flex-col sm:flex-row gap-2">
                    <input
                      type="text"
                      value={newPolicyTitle}
                      onChange={(e) => setNewPolicyTitle(e.target.value)}
                      placeholder="Policy title (e.g., Warranty Policy)"
                      className="flex-1 px-3 py-2 text-sm border border-secondary rounded-lg bg-primary text-primary placeholder:text-placeholder focus:outline-none focus:ring-2 focus:ring-brand-500"
                    />
                    <div className="flex gap-2">
                      <Button color="primary" size="sm" onClick={addNewPolicy}>
                        Add
                      </Button>
                      <Button color="secondary" size="sm" onClick={() => setAddingNewPolicy(false)}>
                        Cancel
                      </Button>
                    </div>
                  </div>
                </div>
              )}

              {/* Policy Cards */}
              {policies.map((policy) => (
                <div
                  key={policy.id}
                  className={`bg-primary border rounded-xl overflow-hidden ${
                    policy.isEditing ? "border-brand-300" : "border-secondary"
                  }`}
                >
                  {/* Policy Header */}
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 border-b border-secondary">
                    <div className="flex items-start sm:items-center gap-3 min-w-0">
                      <div className="flex size-9 sm:size-10 items-center justify-center rounded-lg bg-brand-50 flex-shrink-0">
                        <File06 className="size-4 sm:size-5 text-brand-600" />
                      </div>
                      <div className="min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <h3 className="text-sm sm:text-base font-semibold text-primary truncate">
                            {policy.title}
                          </h3>
                          {policy.isVisible ? (
                            <Badge type="pill-color" size="sm" color="success">Visible</Badge>
                          ) : (
                            <Badge type="pill-color" size="sm" color="gray">Hidden</Badge>
                          )}
                        </div>
                        <p className="text-xs text-tertiary">
                          Last updated: {policy.lastUpdated}
                        </p>
                      </div>
                    </div>
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-wrap sm:flex-nowrap">
                      <button
                        onClick={() => togglePolicyVisibility(policy.id)}
                        className="p-1.5 sm:p-2 rounded-lg hover:bg-secondary transition-colors"
                        title={policy.isVisible ? "Hide policy" : "Show policy"}
                      >
                        {policy.isVisible ? (
                          <Eye className="size-4 text-tertiary" />
                        ) : (
                          <EyeOff className="size-4 text-tertiary" />
                        )}
                      </button>
                      {!policy.isEditing ? (
                        <Button
                          color="secondary"
                          size="sm"
                          iconLeading={Edit02}
                          onClick={() => togglePolicyEditing(policy.id)}
                        >
                          <span className="hidden sm:inline">Edit</span>
                        </Button>
                      ) : (
                        <>
                          <Button
                            color="primary"
                            size="sm"
                            iconLeading={Check}
                            onClick={() => savePolicyContent(policy.id)}
                          >
                            <span className="hidden sm:inline">Save</span>
                          </Button>
                          <Button
                            color="secondary"
                            size="sm"
                            onClick={() => cancelPolicyEditing(policy.id, policy.content)}
                          >
                            <span className="hidden sm:inline">Cancel</span>
                            <XClose className="size-4 sm:hidden" />
                          </Button>
                        </>
                      )}
                      {policy.id.startsWith("custom-") && (
                        <button
                          onClick={() => deletePolicy(policy.id)}
                          className="p-1.5 sm:p-2 rounded-lg hover:bg-error-50 transition-colors"
                          title="Delete policy"
                        >
                          <Trash01 className="size-4 text-error-600" />
                        </button>
                      )}
                    </div>
                  </div>

                  {/* Rich Text Toolbar (only when editing) */}
                  {policy.isEditing && (
                    <div className="flex items-center gap-0.5 sm:gap-1 p-2 sm:p-3 bg-secondary/30 border-b border-secondary overflow-x-auto">
                      <button
                        type="button"
                        onClick={() => execCommand("bold")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Bold"
                      >
                        <Bold01 className="size-4 text-tertiary" />
                      </button>
                      <button
                        type="button"
                        onClick={() => execCommand("italic")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Italic"
                      >
                        <Italic01 className="size-4 text-tertiary" />
                      </button>
                      <button
                        type="button"
                        onClick={() => execCommand("underline")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Underline"
                      >
                        <Underline01 className="size-4 text-tertiary" />
                      </button>
                      <div className="w-px h-5 bg-secondary mx-1 flex-shrink-0" />
                      <button
                        type="button"
                        onClick={() => execCommand("justifyLeft")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Align Left"
                      >
                        <AlignLeft className="size-4 text-tertiary" />
                      </button>
                      <button
                        type="button"
                        onClick={() => execCommand("justifyCenter")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Align Center"
                      >
                        <AlignCenter className="size-4 text-tertiary" />
                      </button>
                      <div className="w-px h-5 bg-secondary mx-1 flex-shrink-0" />
                      <button
                        type="button"
                        onClick={() => execCommand("insertUnorderedList")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Bullet List"
                      >
                        <List className="size-4 text-tertiary" />
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          const url = prompt("Enter URL:");
                          if (url) execCommand("createLink", url);
                        }}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Insert Link"
                      >
                        <Link01 className="size-4 text-tertiary" />
                      </button>
                      <div className="w-px h-5 bg-secondary mx-1 flex-shrink-0" />
                      <button
                        type="button"
                        onClick={() => execCommand("removeFormat")}
                        className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0"
                        title="Clear Formatting"
                      >
                        <XClose className="size-4 text-tertiary" />
                      </button>
                      {!policy.id.startsWith("custom-") && (
                        <>
                          <div className="w-px h-5 bg-secondary mx-1 flex-shrink-0" />
                          <button
                            type="button"
                            onClick={() => resetPolicyToTemplate(policy.id)}
                            className="p-1.5 rounded hover:bg-secondary transition-colors flex-shrink-0 flex items-center gap-1"
                            title="Reset to template"
                          >
                            <RefreshCw01 className="size-4 text-tertiary" />
                            <span className="text-xs text-tertiary hidden sm:inline">Reset</span>
                          </button>
                        </>
                      )}
                    </div>
                  )}

                  {/* Policy Content */}
                  <div className="p-3 sm:p-4">
                    {policy.isEditing ? (
                      <div
                        ref={(el) => { editorRefs.current[policy.id] = el; }}
                        contentEditable
                        className="min-h-[150px] sm:min-h-[200px] p-3 sm:p-4 text-sm border border-secondary rounded-lg bg-primary text-primary focus:outline-none focus:ring-2 focus:ring-brand-500 overflow-y-auto prose prose-sm max-w-none"
                        style={{ maxHeight: "400px" }}
                        dangerouslySetInnerHTML={{ __html: policy.content }}
                        suppressContentEditableWarning
                      />
                    ) : (
                      <div
                        className="p-3 sm:p-4 bg-secondary/30 rounded-lg text-sm text-secondary prose prose-sm max-w-none overflow-hidden"
                        dangerouslySetInnerHTML={{ __html: policy.content }}
                      />
                    )}
                  </div>
                </div>
              ))}

              {/* Tips Card */}
              <div className="bg-brand-50 border border-brand-200 rounded-xl p-3 sm:p-4">
                <div className="flex items-start gap-3">
                  <AlertCircle className="size-5 text-brand-600 flex-shrink-0 mt-0.5" />
                  <div className="min-w-0">
                    <h3 className="text-sm font-medium text-primary">Tips for Store Policies</h3>
                    <ul className="mt-2 text-xs text-tertiary space-y-1">
                      <li>• Be clear and specific about your return window and conditions</li>
                      <li>• Include estimated shipping times for different regions</li>
                      <li>• Explain how you handle and protect customer data</li>
                      <li>• Keep policies updated to reflect current practices</li>
                    </ul>
                  </div>
                </div>
              </div>
            </>
          )}

          {/* Billing Tab */}
          {activeTab === "billing" && (
            <>
              {/* Current Plan */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Current Plan</h2>

                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-brand-50 rounded-xl border border-brand-200">
                  <div className="flex items-center gap-3 sm:gap-4">
                    <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-brand-100 flex-shrink-0">
                      <span className="text-lg sm:text-xl font-bold text-brand-600">₹</span>
                    </div>
                    <div className="min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <p className="text-sm sm:text-lg font-semibold text-primary">Professional Plan</p>
                        <Badge type="pill-color" size="sm" color="brand">Active</Badge>
                      </div>
                      <p className="text-xs sm:text-sm text-tertiary">₹2,499/month • Renews 15 Jan, 2025</p>
                    </div>
                  </div>
                  <Button color="secondary" size="sm" className="self-end sm:self-auto flex-shrink-0">
                    Change Plan
                  </Button>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 sm:gap-4 mt-4 sm:mt-6">
                  <div className="p-3 sm:p-4 border border-secondary rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Products Listed</p>
                    <p className="text-lg sm:text-xl font-semibold text-primary">48 / 500</p>
                  </div>
                  <div className="p-3 sm:p-4 border border-secondary rounded-xl">
                    <p className="text-xs text-tertiary mb-1">Commission Rate</p>
                    <p className="text-lg sm:text-xl font-semibold text-primary">5%</p>
                  </div>
                  <div className="p-3 sm:p-4 border border-secondary rounded-xl col-span-2 sm:col-span-1">
                    <p className="text-xs text-tertiary mb-1">Support Level</p>
                    <p className="text-lg sm:text-xl font-semibold text-primary">Priority</p>
                  </div>
                </div>
              </div>

              {/* Payment Method */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Payment Method</h2>

                <div className="space-y-3">
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-primary border border-secondary flex-shrink-0">
                        <CreditCard01 className="size-5 sm:size-6 text-tertiary" />
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-primary">HDFC Debit Card ••••8756</p>
                        <p className="text-xs text-tertiary">Expires 08/2027</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2 self-end sm:self-auto">
                      <Badge type="pill-color" size="sm" color="success">Default</Badge>
                      <Button color="secondary" size="sm" iconLeading={Edit02}>
                        Edit
                      </Button>
                    </div>
                  </div>

                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-3 sm:p-4 bg-secondary/50 rounded-xl">
                    <div className="flex items-center gap-3 sm:gap-4">
                      <div className="flex size-10 sm:size-12 items-center justify-center rounded-xl bg-green-100 flex-shrink-0">
                        <span className="text-lg font-bold text-green-600">₹</span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-primary">UPI Autopay</p>
                        <p className="text-xs text-tertiary">bharatbazaar@hdfcbank</p>
                      </div>
                    </div>
                    <Button color="secondary" size="sm" iconLeading={Edit02} className="self-end sm:self-auto">
                      Edit
                    </Button>
                  </div>
                </div>

                <Button color="secondary" size="sm" iconLeading={Plus} className="mt-4">
                  Add Payment Method
                </Button>
              </div>

              {/* Billing History */}
              <div className="bg-primary border border-secondary rounded-xl p-4 sm:p-6">
                <h2 className="text-base sm:text-lg font-semibold text-primary mb-4 sm:mb-6">Billing History</h2>

                {/* Desktop Table */}
                <div className="hidden sm:block overflow-x-auto">
                  <table className="w-full min-w-[500px]">
                    <thead>
                      <tr className="border-b border-secondary">
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Invoice</th>
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Date</th>
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Amount</th>
                        <th className="pb-3 text-left text-xs font-medium uppercase text-tertiary">Status</th>
                        <th className="pb-3 text-right text-xs font-medium uppercase text-tertiary"></th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-secondary">
                      {invoices.map((invoice) => (
                        <tr key={invoice.id}>
                          <td className="py-3 text-sm font-medium text-primary">{invoice.id}</td>
                          <td className="py-3 text-sm text-secondary">{invoice.date}</td>
                          <td className="py-3 text-sm text-secondary">₹{invoice.amount.toLocaleString('en-IN')}</td>
                          <td className="py-3">
                            <Badge type="pill-color" size="sm" color="success">
                              Paid
                            </Badge>
                          </td>
                          <td className="py-3 text-right">
                            <Button color="tertiary" size="sm">
                              Download
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* Mobile Cards */}
                <div className="sm:hidden space-y-3">
                  {invoices.map((invoice) => (
                    <div key={invoice.id} className="p-3 border border-secondary rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium text-primary">{invoice.id}</span>
                        <Badge type="pill-color" size="sm" color="success">Paid</Badge>
                      </div>
                      <div className="flex items-center justify-between text-xs text-tertiary">
                        <span>{invoice.date}</span>
                        <span className="font-medium text-primary">₹{invoice.amount.toLocaleString('en-IN')}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </>
          )}
      </div>
    </div>
  );
}
