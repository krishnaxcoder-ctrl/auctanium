"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail01, ChevronRight, Home05, Phone, MarkerPin01, Clock, MessageChatCircle, User01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { Select, SelectItemType } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { TextArea } from "@/components/base/textarea/textarea";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z.string().min(1, "First name is required").min(2, "First name must be at least 2 characters"),
  lastName: z.string().min(1, "Last name is required").min(2, "Last name must be at least 2 characters"),
  email: z.string().min(1, "Email is required").email("Please enter a valid email address"),
  subject: z.string().min(1, "Please select a subject"),
  message: z.string().min(1, "Message is required").min(10, "Message must be at least 10 characters"),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

const contactMethods = [
  {
    icon: Mail01,
    title: "Email",
    description: "Our team will respond within 24 hours",
    value: "auctanium@gmail.com",
    action: "mailto:auctanium@gmail.com",
  },
  {
    icon: MessageChatCircle,
    title: "Live Chat",
    description: "Available 24/7 for instant support",
    value: "Start a conversation",
    action: "#",
  },
  {
    icon: Phone,
    title: "Phone",
    description: "Mon-Fri from 8am to 6pm EST",
    value: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: MarkerPin01,
    title: "Office",
    description: "Visit us at our headquarters",
    value: "San Francisco, CA",
    action: "#",
  },
];

const subjectOptions: SelectItemType[] = [
  { id: "general", label: "General Inquiry" },
  { id: "support", label: "Technical Support" },
  { id: "billing", label: "Billing Question" },
  { id: "partnership", label: "Partnership" },
  { id: "feedback", label: "Feedback" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState<ContactFormData>({
    firstName: "",
    lastName: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof ContactFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof ContactFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: Partial<Record<keyof ContactFormData, string>> = {};
      result.error.issues.forEach((issue) => {
        const field = issue.path[0] as keyof ContactFormData;
        if (!fieldErrors[field]) {
          fieldErrors[field] = issue.message;
        }
      });
      setErrors(fieldErrors);
      return;
    }

    setIsSubmitting(true);
    // Handle form submission here
    console.log("Form submitted:", result.data);
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-primary">
      {/* Header */}
      <div className="relative overflow-hidden bg-brand-solid">
        {/* Background decorations */}
        <div className="pointer-events-none absolute inset-0">
          <div className="absolute -top-40 -right-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div className="absolute -bottom-40 -left-40 size-80 rounded-full bg-white/10 blur-3xl" />
          <div
            className="absolute inset-0 opacity-[0.07]"
            style={{
              backgroundImage: `url("data:image/svg+xml,%3Csvg width='24' height='24' viewBox='0 0 24 24' xmlns='http://www.w3.org/2000/svg'%3E%3Ccircle cx='3' cy='3' r='1.5' fill='%23ffffff'/%3E%3C/svg%3E")`,
              backgroundSize: '24px 24px',
            }}
          />
        </div>

        <div className="relative mx-auto max-w-8xl px-4 py-4 sm:px-6 lg:px-8 lg:py-6">
          {/* Breadcrumb */}
          <nav className="mb-4 flex items-center gap-1.5 sm:gap-2 text-xs sm:text-sm">
            <Link
              href="/"
              className="flex items-center gap-1 sm:gap-1.5 text-white/70 transition-colors hover:text-white"
            >
              <Home05 className="size-3 sm:size-4" />
              <span>Home</span>
            </Link>
            <ChevronRight className="size-3 sm:size-4 text-white/40" />
            <span className="text-white">Contact</span>
          </nav>

          {/* Header content */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3 sm:gap-5">
              <div className="flex size-10 sm:size-14 items-center justify-center rounded-xl bg-white/20 backdrop-blur-sm">
                <Mail01 className="size-5 sm:size-7 text-white" />
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight text-white">
                  Contact Us
                </h1>
                <p className="mt-2 hidden text-brand-200 sm:block">
                  We&apos;d love to hear from you
                </p>
              </div>
            </div>

            <Link
              href="/"
              className="group mt-3 hidden items-center justify-center gap-2 rounded-full bg-white/10 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition-all hover:bg-white/20 sm:flex"
            >
              <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
              Back to Home
            </Link>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="mx-auto max-w-8xl px-4 py-6 sm:py-12 sm:px-6 lg:px-8 lg:py-16">
        <div className="grid gap-8 lg:grid-cols-2">
          {/* Contact Form */}
          <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8 lg:p-10">
            <h2 className="text-lg sm:text-2xl font-semibold text-primary mb-2">Send us a message</h2>
            <p className="text-tertiary mb-6">Fill out the form below and we&apos;ll get back to you as soon as possible.</p>

            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-5 sm:grid-cols-2">
                <Input
                  label="First Name"
                  placeholder="John"
                  icon={User01}
                  size="md"
                  value={formData.firstName}
                  onChange={(value) => handleChange("firstName", value)}
                  isInvalid={!!errors.firstName}
                  hint={errors.firstName}
                />
                <Input
                  label="Last Name"
                  placeholder="Doe"
                  size="md"
                  value={formData.lastName}
                  onChange={(value) => handleChange("lastName", value)}
                  isInvalid={!!errors.lastName}
                  hint={errors.lastName}
                />
              </div>

              <Input
                label="Email"
                placeholder="john@example.com"
                type="email"
                icon={Mail01}
                size="md"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                isInvalid={!!errors.email}
                hint={errors.email}
              />

              <Select
                label="Subject"
                placeholder="Select a topic"
                items={subjectOptions}
                size="md"
                selectedKey={formData.subject || null}
                onSelectionChange={(key) => handleChange("subject", key as string)}
                isInvalid={!!errors.subject}
                hint={errors.subject}
              >
                {(item) => <SelectItem id={item.id} label={item.label} />}
              </Select>

              <TextArea
                label="Message"
                placeholder="How can we help you?"
                rows={5}
                value={formData.message}
                onChange={(value) => handleChange("message", value)}
                isInvalid={!!errors.message}
                hint={errors.message}
              />

              <Button color="primary" size="lg" className="w-full" type="submit" isDisabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </form>
          </div>

          {/* Contact Methods */}
          <div className="space-y-6">
            <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8">
              <h2 className="text-lg sm:text-2xl font-semibold text-primary mb-6">Other ways to reach us</h2>
              <div className="space-y-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="flex items-start gap-4 rounded-xl border border-secondary p-4 transition-all hover:border-brand-300 hover:bg-secondary"
                  >
                    <div className="flex size-12 shrink-0 items-center justify-center rounded-lg bg-brand-100">
                      <method.icon className="size-6 text-brand-600" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-primary">{method.title}</h3>
                      <p className="text-sm text-tertiary">{method.description}</p>
                      <p className="mt-1 text-sm font-medium text-brand-600">{method.value}</p>
                    </div>
                  </a>
                ))}
              </div>
            </div>

            {/* Business Hours */}
            <div className="rounded-2xl border border-secondary bg-primary p-6 shadow-sm sm:p-8">
              <div className="flex items-center gap-3 mb-4">
                <Clock className="size-5 text-brand-600" />
                <h3 className="font-semibold text-primary">Business Hours</h3>
              </div>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-tertiary">Monday - Friday</span>
                  <span className="text-primary font-medium">8:00 AM - 6:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Saturday</span>
                  <span className="text-primary font-medium">9:00 AM - 4:00 PM EST</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-tertiary">Sunday</span>
                  <span className="text-primary font-medium">Closed</span>
                </div>
              </div>
              <p className="mt-4 text-sm text-tertiary">
                Live chat support is available 24/7 for urgent inquiries.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
