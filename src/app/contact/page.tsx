"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail01, Phone, MarkerPin01, MessageChatCircle, User01, Send01, Clock, Star01, Zap, CheckCircle } from "@untitledui/icons";
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
    value: "auctanium@gmail.com",
    action: "mailto:auctanium@gmail.com",
  },
  {
    icon: Phone,
    title: "Phone",
    value: "+1 (555) 123-4567",
    action: "tel:+15551234567",
  },
  {
    icon: MarkerPin01,
    title: "Office",
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
    console.log("Form submitted:", result.data);
    setIsSubmitting(false);
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Brand Section */}
      <div className="relative hidden lg:flex lg:w-1/2 flex-col bg-gradient-to-br from-brand-700 via-brand-800 to-brand-900 p-10 xl:p-14 overflow-hidden">
        {/* Background Elements */}
        <div className="pointer-events-none absolute inset-0">
          {/* Gradient orbs */}
          <div className="absolute -top-40 -left-40 size-[500px] rounded-full bg-brand-500/30 blur-[120px]" />
          <div className="absolute -bottom-40 -right-40 size-[500px] rounded-full bg-brand-400/20 blur-[120px]" />
          <div className="absolute top-1/3 right-1/4 size-[300px] rounded-full bg-purple-500/10 blur-[100px]" />

          {/* Grid pattern */}
          <div
            className="absolute inset-0 opacity-[0.03]"
            style={{
              backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
              backgroundSize: '60px 60px',
            }}
          />

          {/* Floating shapes */}
          <div className="absolute top-20 right-20 size-3 rounded-full bg-white/20 animate-pulse" />
          <div className="absolute top-40 right-40 size-2 rounded-full bg-white/30 animate-pulse delay-300" />
          <div className="absolute bottom-32 left-20 size-4 rounded-full bg-white/10 animate-pulse delay-500" />
        </div>

        {/* Header */}
        <div className="relative z-10 flex items-center justify-between">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 text-white/80 backdrop-blur-sm transition-all hover:bg-white/20 hover:text-white"
          >
            <ArrowLeft className="size-4 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back</span>
          </Link>

          <div className="flex items-center gap-2 rounded-full bg-green-500/20 px-3 py-1.5 backdrop-blur-sm">
            <span className="relative flex size-2">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-green-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-green-500" />
            </span>
            <span className="text-xs font-medium text-green-300">Online Now</span>
          </div>
        </div>

        {/* Main Content */}
        <div className="relative z-10 flex flex-1 flex-col justify-center py-8">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm">
              <MessageChatCircle className="size-4 text-brand-300" />
              <span className="text-sm font-medium text-white/90">24/7 Support Available</span>
            </div>

            <h1 className="text-4xl xl:text-5xl 2xl:text-6xl font-bold tracking-tight text-white leading-[1.1]">
              We&apos;re here to
              <span className="block mt-2 bg-gradient-to-r from-brand-200 via-purple-300 to-pink-300 bg-clip-text text-transparent">
                help you succeed
              </span>
            </h1>

            <p className="text-base xl:text-lg text-white/60 max-w-md leading-relaxed">
              Got questions? We&apos;ve got answers. Our team is ready to assist you with anything you need.
            </p>
          </div>

          {/* Stats */}
          <div className="mt-10 grid grid-cols-3 gap-4">
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-brand-300 mb-2">
                <Clock className="size-4" />
              </div>
              <p className="text-2xl xl:text-3xl font-bold text-white">&lt;2h</p>
              <p className="text-xs text-white/50 mt-1">Avg. Response</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-yellow-400 mb-2">
                <Star01 className="size-4 fill-yellow-400" />
              </div>
              <p className="text-2xl xl:text-3xl font-bold text-white">4.9/5</p>
              <p className="text-xs text-white/50 mt-1">Satisfaction</p>
            </div>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4 backdrop-blur-sm">
              <div className="flex items-center gap-2 text-green-400 mb-2">
                <Zap className="size-4" />
              </div>
              <p className="text-2xl xl:text-3xl font-bold text-white">50K+</p>
              <p className="text-xs text-white/50 mt-1">Users Helped</p>
            </div>
          </div>

          {/* Testimonial Card */}
          <div className="mt-8 rounded-2xl border border-white/10 bg-gradient-to-br from-white/10 to-white/5 p-5 backdrop-blur-sm">
            <div className="flex gap-1 mb-3">
              {[...Array(5)].map((_, i) => (
                <Star01 key={i} className="size-4 fill-yellow-400 text-yellow-400" />
              ))}
            </div>
            <p className="text-sm text-white/80 leading-relaxed">
              &ldquo;The support team was incredibly helpful and responsive. They resolved my issue within minutes!&rdquo;
            </p>
            <div className="mt-4 flex items-center gap-3">
              <div className="size-10 rounded-full bg-gradient-to-br from-brand-400 to-purple-500 flex items-center justify-center text-white font-semibold text-sm">
                SK
              </div>
              <div>
                <p className="text-sm font-medium text-white">Sarah K.</p>
                <p className="text-xs text-white/50">Verified Customer</p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer - Contact Methods */}
        <div className="relative z-10 space-y-4">
          <div className="flex flex-wrap gap-3">
            {contactMethods.map((method, index) => (
              <a
                key={index}
                href={method.action}
                className="group inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-4 py-2 backdrop-blur-sm transition-all hover:bg-white/10 hover:border-white/20"
              >
                <method.icon className="size-4 text-white/70" />
                <span className="text-sm text-white/80 group-hover:text-white">{method.value}</span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-2 text-white/40">
            <CheckCircle className="size-4" />
            <span className="text-xs">Secure & encrypted communication</span>
          </div>
        </div>
      </div>

      {/* Right Panel - Form Section */}
      <div className="flex flex-1 flex-col bg-primary">
        {/* Mobile Header */}
        <div className="flex items-center justify-between p-4 lg:hidden">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-tertiary transition-colors hover:text-primary"
          >
            <ArrowLeft className="size-5 transition-transform group-hover:-translate-x-1" />
            <span className="text-sm font-medium">Back</span>
          </Link>
        </div>

        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-lg">
            {/* Mobile Title */}
            <div className="mb-8 lg:hidden">
              <div className="inline-flex items-center gap-2 rounded-full bg-brand-50 px-3 py-1.5 mb-4">
                <MessageChatCircle className="size-4 text-brand-600" />
                <span className="text-xs font-medium text-brand-600">Get in Touch</span>
              </div>
              <h1 className="text-2xl font-bold text-primary">Contact Us</h1>
              <p className="mt-2 text-tertiary">We&apos;d love to hear from you</p>
            </div>

            {/* Desktop Title */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-2xl xl:text-3xl font-bold text-primary">Send us a message</h2>
              <p className="mt-2 text-tertiary">Fill out the form below and we&apos;ll get back to you shortly.</p>
            </div>

            {/* Form */}
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
                placeholder="Tell us how we can help you..."
                rows={4}
                value={formData.message}
                onChange={(value) => handleChange("message", value)}
                isInvalid={!!errors.message}
                hint={errors.message}
              />

              <Button color="primary" size="lg" className="w-full gap-2" type="submit" isDisabled={isSubmitting}>
                {isSubmitting ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send01 className="size-5" />
                  </>
                )}
              </Button>
            </form>

            {/* Mobile Contact Info */}
            <div className="mt-8 pt-8 border-t border-secondary lg:hidden">
              <p className="text-sm text-tertiary mb-4">Or reach us directly:</p>
              <div className="flex flex-wrap gap-4">
                {contactMethods.map((method, index) => (
                  <a
                    key={index}
                    href={method.action}
                    className="inline-flex items-center gap-2 rounded-lg bg-secondary px-3 py-2 text-sm font-medium text-primary transition-colors hover:bg-tertiary"
                  >
                    <method.icon className="size-4 text-brand-600" />
                    {method.value}
                  </a>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
