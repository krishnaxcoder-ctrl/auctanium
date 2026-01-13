"use client";

import { useState } from "react";
import {
  Mail01,
  Phone,
  MessageSquare01,
  Clock,
  Send01,
} from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Select } from "@/components/base/select/select";
import { EmptyState } from "@/components/application/empty-state/empty-state";
import { FileUploadDropZone } from "@/components/application/file-upload/file-upload-base";

const supportOptions = [
  {
    title: "Email Support",
    description: "Get a response within 24 hours",
    icon: Mail01,
    contact: "seller-support@auctanium.com",
    action: "Send Email",
  },
  {
    title: "Live Chat",
    description: "Available Mon-Fri, 9am-6pm EST",
    icon: MessageSquare01,
    contact: "Start a conversation",
    action: "Start Chat",
  },
  {
    title: "Phone Support",
    description: "For urgent issues only",
    icon: Phone,
    contact: "+1 (800) 123-4567",
    action: "Call Now",
  },
];

const issueTypes = [
  { id: "account", label: "Account & Verification" },
  { id: "products", label: "Products & Listings" },
  { id: "orders", label: "Orders & Shipping" },
  { id: "payments", label: "Payments & Payouts" },
  { id: "technical", label: "Technical Issues" },
  { id: "policy", label: "Policy & Compliance" },
  { id: "other", label: "Other" },
];

const priorityLevels = [
  { id: "low", label: "Low - General inquiry" },
  { id: "medium", label: "Medium - Need help soon" },
  { id: "high", label: "High - Urgent issue" },
];

export default function ContactSupportPage() {
  const [issueType, setIssueType] = useState<string>("");
  const [priority, setPriority] = useState<string>("medium");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Support ticket submitted");
  };

  return (
    <div className="space-y-8 p-4 overflow-x-hidden max-w-full">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold text-primary">Contact Support</h1>
        <p className="mt-2 text-tertiary">We're here to help. Choose how you'd like to reach us.</p>
      </div>

      {/* Support Options */}
      <div className="grid gap-4 sm:grid-cols-3">
        {supportOptions.map((option) => (
          <div
            key={option.title}
            className="rounded-xl border border-secondary bg-primary p-6 text-center hover:border-brand-300 transition-colors"
          >
            <div className="mx-auto flex size-12 items-center justify-center rounded-full bg-brand-50">
              <option.icon className="size-6 text-brand-600" />
            </div>
            <h3 className="mt-4 font-semibold text-primary">{option.title}</h3>
            <p className="mt-1 text-sm text-tertiary">{option.description}</p>
            <p className="mt-2 text-sm font-medium text-brand-600">{option.contact}</p>
            <Button color="secondary" size="sm" className="mt-4 w-full justify-center">
              {option.action}
            </Button>
          </div>
        ))}
      </div>

      {/* Support Hours */}
      <div className="rounded-xl border border-secondary bg-brand-50 p-4">
        <div className="flex items-center gap-3">
          <Clock className="size-5 text-brand-600" />
          <div>
            <span className="font-medium text-primary">Support Hours: </span>
            <span className="text-tertiary">Monday - Friday, 9:00 AM - 6:00 PM EST</span>
          </div>
        </div>
      </div>

      {/* Contact Form */}
      <div className="rounded-xl border border-secondary bg-primary">
        <div className="border-b border-secondary px-6 py-4">
          <h2 className="text-lg font-semibold text-primary">Submit a Support Ticket</h2>
          <p className="text-sm text-tertiary">Fill out the form below and we'll get back to you as soon as possible</p>
        </div>

        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div className="grid gap-6 sm:grid-cols-2">
            {/* Issue Type */}
            <Select
              label="Issue Type"
              placeholder="Select an issue type"
              selectedKey={issueType}
              onSelectionChange={(key) => setIssueType(key as string)}
              items={issueTypes}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>

            {/* Priority */}
            <Select
              label="Priority Level"
              placeholder="Select priority"
              selectedKey={priority}
              onSelectionChange={(key) => setPriority(key as string)}
              items={priorityLevels}
            >
              {(item) => <Select.Item id={item.id} label={item.label} />}
            </Select>
          </div>

          {/* Subject */}
          <Input
            label="Subject"
            placeholder="Brief description of your issue"
            isRequired
          />

          {/* Message */}
          <TextArea
            label="Message"
            placeholder="Please provide as much detail as possible about your issue..."
            rows={6}
            isRequired
          />

          {/* Attachments */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Attachments (optional)
            </label>
            <FileUploadDropZone
              hint="PNG, JPG, PDF up to 10MB"
              accept=".png,.jpg,.jpeg,.pdf"
              maxSize={10 * 1024 * 1024}
              allowsMultiple
            />
          </div>

          {/* Submit */}
          <div className="flex justify-end">
            <Button type="submit" color="primary" size="md" iconTrailing={Send01}>
              Submit Ticket
            </Button>
          </div>
        </form>
      </div>

      {/* Previous Tickets - Empty State */}
      <div className="rounded-xl border border-secondary bg-primary">
        <div className="border-b border-secondary px-6 py-4">
          <h2 className="text-lg font-semibold text-primary">Your Recent Tickets</h2>
        </div>
        <div className="p-8">
          <EmptyState size="sm">
            <EmptyState.Header pattern="none">
              <EmptyState.FeaturedIcon icon={MessageSquare01} color="gray" theme="light" />
            </EmptyState.Header>
            <EmptyState.Content>
              <EmptyState.Title>No support tickets yet</EmptyState.Title>
              <EmptyState.Description>
                When you submit a ticket, it will appear here
              </EmptyState.Description>
            </EmptyState.Content>
          </EmptyState>
        </div>
      </div>
    </div>
  );
}
