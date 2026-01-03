"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowLeft, Mail01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export default function VerifyEmailPage() {
  const [code, setCode] = useState(["", "", "", "", "", ""]);

  const handleCodeChange = (index: number, value: string) => {
    if (value.length > 1) return;

    const newCode = [...code];
    newCode[index] = value;
    setCode(newCode);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`code-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      const prevInput = document.getElementById(`code-${index - 1}`);
      prevInput?.focus();
    }
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Back Link */}
          <Link
            href="/login"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back to login
          </Link>

          {/* Icon */}
          <div className="mb-6 flex size-14 items-center justify-center rounded-full bg-brand-100">
            <Mail01 className="size-7 text-brand-600" />
          </div>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Check your email
            </h1>
            <p className="mt-2 text-md text-gray-500">
              We sent a verification code to your email. Enter the code below to verify.
            </p>
          </div>

          {/* Verification Code Form */}
          <form className="flex flex-col gap-6">
            {/* Code Input */}
            <div className="flex justify-between gap-2">
              {code.map((digit, index) => (
                <input
                  key={index}
                  id={`code-${index}`}
                  type="text"
                  inputMode="numeric"
                  maxLength={1}
                  value={digit}
                  onChange={(e) => handleCodeChange(index, e.target.value)}
                  onKeyDown={(e) => handleKeyDown(index, e)}
                  className="size-12 rounded-lg border border-gray-300 bg-white text-center text-xl font-semibold text-gray-900 outline-none transition-all focus:border-brand-500 focus:ring-2 focus:ring-brand-500/20 sm:size-14"
                />
              ))}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="w-full"
            >
              Verify email
            </Button>
          </form>

          {/* Resend link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Didn&apos;t receive the code?{" "}
            <button
              type="button"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Click to resend
            </button>
          </p>
        </div>
      </div>

      {/* Right side - Image/Branding */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <div className="absolute inset-0 bg-gradient-to-br from-brand-600 to-brand-800">
          <div className="flex h-full flex-col items-center justify-center px-12">
            <div className="max-w-md text-center">
              <h2 className="text-4xl font-bold text-white">
                AdView
              </h2>
              <p className="mt-4 text-lg text-white/80">
                Just one more step to start earning with AdView.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
