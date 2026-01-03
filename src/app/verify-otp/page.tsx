"use client";

import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { ArrowLeft } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";

export default function VerifyOTPPage() {
  const router = useRouter();
  const { isLoaded, signIn } = useSignIn();

  const [otp, setOtp] = useState<string[]>(["", "", "", "", "", ""]);
  const [isResending, setIsResending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [error, setError] = useState("");
  const [countdown, setCountdown] = useState(60);
  const [email, setEmail] = useState("");
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  useEffect(() => {
    // Get email from sessionStorage
    const storedEmail = sessionStorage.getItem("resetEmail");
    if (storedEmail) {
      setEmail(storedEmail);
    } else {
      // Redirect to forgot-password if no email is stored
      router.push("/forgot-password");
    }

    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, [router]);

  useEffect(() => {
    // Countdown timer for resend
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [countdown]);

  const handleChange = (index: number, value: string) => {
    // Only allow numbers
    if (value && !/^\d+$/.test(value)) return;

    // Clear error when user starts typing
    if (error) setError("");

    const newOtp = [...otp];
    newOtp[index] = value.slice(-1); // Only take last character
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    // Handle backspace
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData("text").slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split("").forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or last input
    const lastIndex = Math.min(pastedData.length - 1, 5);
    inputRefs.current[lastIndex]?.focus();
  };

  const handleResend = async () => {
    if (!isLoaded || !signIn || !email) return;

    setIsResending(true);
    setError("");

    try {
      await signIn.create({
        strategy: "reset_password_email_code",
        identifier: email,
      });
      setCountdown(60);
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Failed to resend code");
    } finally {
      setIsResending(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const otpValue = otp.join("");

    if (otpValue.length !== 6) {
      setError("Please enter all 6 digits");
      return;
    }

    if (!isLoaded || !signIn) return;

    setIsVerifying(true);
    setError("");

    try {
      const result = await signIn.attemptFirstFactor({
        strategy: "reset_password_email_code",
        code: otpValue,
      });

      if (result.status === "needs_new_password") {
        // Code verified, redirect to reset password page
        router.push("/reset-password");
      } else if (result.status === "complete") {
        // Session created, redirect to home
        router.push("/");
      } else {
        setError("Verification incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Invalid verification code. Please try again.");
      setOtp(["", "", "", "", "", ""]);
      inputRefs.current[0]?.focus();
    } finally {
      setIsVerifying(false);
    }
  };

  const isComplete = otp.every((digit) => digit !== "");

  return (
    <div className="flex min-h-screen bg-white">
      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Back Link */}
          <Link
            href="/forgot-password"
            className="mb-8 inline-flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="size-4" />
            Back
          </Link>

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Check your email
            </h1>
            <p className="mt-2 text-md text-gray-500">
              We sent a verification code to {email || "your email"}. Enter the code below to continue.
            </p>
          </div>

          {/* OTP Form */}
          <form className="flex flex-col gap-6" onSubmit={handleSubmit}>
            {/* OTP Inputs */}
            <div>
              <div className="flex justify-between gap-3">
                {otp.map((digit, index) => (
                  <input
                    key={index}
                    ref={(el) => {
                      inputRefs.current[index] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleChange(index, e.target.value)}
                    onKeyDown={(e) => handleKeyDown(index, e)}
                    onPaste={handlePaste}
                    disabled={isVerifying}
                    className={`size-14 rounded-lg border text-center text-2xl font-semibold text-gray-900 outline-none transition-all disabled:opacity-50 disabled:cursor-not-allowed ${
                      error
                        ? "border-error-500 focus:border-error-500 focus:ring-2 focus:ring-error-100"
                        : "border-gray-300 focus:border-brand-500 focus:ring-2 focus:ring-brand-50"
                    }`}
                  />
                ))}
              </div>
              {error && (
                <p className="mt-2 text-sm text-error-500">{error}</p>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="w-full"
              isDisabled={!isComplete || isVerifying}
              isLoading={isVerifying}
            >
              {isVerifying ? "Verifying..." : "Verify code"}
            </Button>
          </form>

          {/* Resend Link */}
          <div className="mt-8 text-center">
            <p className="text-sm text-gray-500">
              Didn&apos;t receive the code?{" "}
              {countdown > 0 ? (
                <span className="text-gray-400">
                  Resend in {countdown}s
                </span>
              ) : (
                <button
                  onClick={handleResend}
                  disabled={isResending}
                  className="font-semibold text-brand-600 hover:text-brand-700 disabled:opacity-50"
                >
                  {isResending ? "Sending..." : "Click to resend"}
                </button>
              )}
            </p>
          </div>

          {/* Sign in link */}
          <p className="mt-8 text-center text-sm text-gray-500">
            Remember your password?{" "}
            <Link
              href="/login"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/login_signup_bg.jpg"
          alt="Verify OTP"
          fill
          className="object-cover object-left"
          priority
        />
      </div>
    </div>
  );
}
