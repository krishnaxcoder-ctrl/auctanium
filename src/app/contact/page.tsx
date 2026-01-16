"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Star01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { TextArea } from "@/components/base/textarea/textarea";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { Select, SelectItemType } from "@/components/base/select/select";
import { SelectItem } from "@/components/base/select/select-item";
import { Label } from "@/components/base/input/label";
import { z } from "zod";

const contactFormSchema = z.object({
  firstName: z
    .string()
    .min(1, "First name is required")
    .min(2, "First name must be at least 2 characters")
    .max(50, "First name must be less than 50 characters"),
  lastName: z
    .string()
    .min(1, "Last name is required")
    .min(2, "Last name must be at least 2 characters")
    .max(50, "Last name must be less than 50 characters"),
  email: z
    .string()
    .min(1, "Email is required")
    .email("Please enter a valid email address"),
  phone: z
    .string()
    .min(1, "Phone number is required")
    .regex(/^[\d\s\-()]+$/, "Please enter a valid phone number")
    .min(10, "Phone number must be at least 10 digits"),
  countryCode: z.string().min(1, "Country code is required"),
  message: z
    .string()
    .min(1, "Message is required")
    .min(10, "Message must be at least 10 characters")
    .max(1000, "Message must be less than 1000 characters"),
  agreeToPrivacy: z.boolean().refine((val) => val === true, {
    message: "You must agree to the privacy policy",
  }),
});

type ContactFormData = z.infer<typeof contactFormSchema>;

type FormErrors = Partial<Record<keyof ContactFormData, string>>;

const countryOptions: SelectItemType[] = [
  { id: "IN", label: "IN +91" },
  { id: "US", label: "US +1" },
  { id: "GB", label: "GB +44" },
  { id: "AU", label: "AU +61" },
  { id: "DE", label: "DE +49" },
];

export default function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    countryCode: "IN",
    message: "",
    agreeToPrivacy: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (field: keyof typeof formData, value: string | boolean) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    // Clear error when user starts typing
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
    // Reset success state when form is modified
    if (isSuccess) {
      setIsSuccess(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});
    setIsSuccess(false);

    const result = contactFormSchema.safeParse(formData);

    if (!result.success) {
      const fieldErrors: FormErrors = {};
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

    // Simulate API call
    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));
      console.log("Form submitted:", result.data);
      setIsSuccess(true);
      // Reset form after successful submission
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        countryCode: "IN",
        message: "",
        agreeToPrivacy: false,
      });
    } catch (error) {
      console.error("Submission error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex min-h-screen">
      {/* Left Panel - Form Section (40%) */}
      <div className="flex w-full lg:w-2/5 flex-col bg-primary">
        {/* Form Container */}
        <div className="flex flex-1 items-center justify-center p-6 sm:p-8 lg:p-12">
          <div className="w-full max-w-md">
            {/* Title */}
            <div className="mb-8">
              <h1 className="text-3xl font-semibold text-primary">Get in touch</h1>
              <p className="mt-2 text-tertiary">Our friendly team would love to hear from you.</p>
            </div>

            {/* Success Message */}
            {isSuccess && (
              <div className="mb-6 rounded-lg bg-green-50 border border-green-200 p-4">
                <p className="text-sm font-medium text-green-800">
                  Thank you for reaching out! We&apos;ll get back to you shortly.
                </p>
              </div>
            )}

            {/* Form */}
            <form className="space-y-5" onSubmit={handleSubmit}>
              <div className="grid gap-2 sm:grid-cols-2">
                <Input
                  label="First name"
                  placeholder="First name"
                  size="md"
                  value={formData.firstName}
                  onChange={(value) => handleChange("firstName", value)}
                  isInvalid={!!errors.firstName}
                  hint={errors.firstName}
                  isRequired
                />
                <Input
                  label="Last name"
                  placeholder="Last name"
                  size="md"
                  value={formData.lastName}
                  onChange={(value) => handleChange("lastName", value)}
                  isInvalid={!!errors.lastName}
                  hint={errors.lastName}
                  isRequired
                />
              </div>

              <Input
                label="Email"
                placeholder="you@company.com"
                type="email"
                size="md"
                value={formData.email}
                onChange={(value) => handleChange("email", value)}
                isInvalid={!!errors.email}
                hint={errors.email}
                isRequired
              />

              {/* Phone Number with Country Code */}
              <div className="space-y-1.5">
                <Label isRequired>Phone number</Label>
                <div className="flex gap-2">
                  <Select
                    aria-label="Country code"
                    items={countryOptions}
                    selectedKey={formData.countryCode}
                    onSelectionChange={(key) => handleChange("countryCode", key as string)}
                    size="md"
                    className="w-32"
                    isInvalid={!!errors.countryCode}
                  >
                    {(item) => <SelectItem id={item.id} label={item.label} />}
                  </Select>
                  <Input
                    aria-label="Phone number"
                    placeholder="98765 43210"
                    type="tel"
                    size="md"
                    value={formData.phone}
                    onChange={(value) => handleChange("phone", value)}
                    isInvalid={!!errors.phone}
                    className="flex-1"
                  />
                </div>
                {errors.phone && (
                  <p className="text-sm text-red-500">{errors.phone}</p>
                )}
              </div>

              <TextArea
                label="Message"
                placeholder="Tell us how we can help you..."
                rows={4}
                value={formData.message}
                onChange={(value) => handleChange("message", value)}
                isInvalid={!!errors.message}
                hint={errors.message}
                isRequired
              />

              {/* Privacy Policy Checkbox */}
              <div className="flex items-start gap-2">
                <Checkbox
                  isSelected={formData.agreeToPrivacy}
                  onChange={(checked) => handleChange("agreeToPrivacy", checked)}
                />
                <label className="text-sm text-tertiary">
                  You agree to our friendly{" "}
                  <Link href="/privacy" className="text-primary underline hover:text-brand-600">
                    privacy policy
                  </Link>
                  .
                </label>
              </div>
              {errors.agreeToPrivacy && (
                <p className="text-sm text-red-500 -mt-3">{errors.agreeToPrivacy}</p>
              )}

              <Button color="primary" size="lg" className="w-full" type="submit" isDisabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Get in touch"}
              </Button>
            </form>
          </div>
        </div>
      </div>

      {/* Right Panel - Image & Testimonial (60%) */}
      <div className="relative hidden lg:flex lg:w-3/5 overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-200 to-gray-300">
          <Image
            src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=800&auto=format&fit=crop&q=80"
            alt="Customer testimonial"
            fill
            className="object-cover"
            priority
          />
        </div>

        {/* Testimonial Overlay */}
        <div className="absolute bottom-0 left-0 right-0 p-8 bg-gradient-to-t from-black/80 via-black/50 to-transparent">
          <div className="flex items-end justify-between gap-8">
            <div className="max-w-lg">
              <p className="text-xl lg:text-2xl font-medium text-white leading-relaxed">
                The Auctanium team responded within hours and helped us resolve our issue immediately. Their support is exceptional and truly customer-focused.
              </p>
              <div className="mt-6">
                <p className="text-white font-medium">&mdash; Priya Sharma</p>
                <p className="text-white/70 text-sm">CEO, TechStart India</p>
              </div>
            </div>
            <div className="flex gap-1 shrink-0">
              {[...Array(5)].map((_, i) => (
                <Star01 key={i} className="size-5 fill-white text-white" />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
