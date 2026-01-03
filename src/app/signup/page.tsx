"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignUp, useAuth } from "@clerk/nextjs";
import { Mail01, Lock01, User01, Eye, EyeOff } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { AuthMobileHeader, AuthMobileFooter } from "@/components/layout/auth-mobile-nav";

export default function SignupPage() {
  const router = useRouter();
  const { isSignedIn } = useAuth();
  const { isLoaded, signUp, setActive } = useSignUp();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push("/");
    }
  }, [isSignedIn, router]);

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [agreedToTerms, setAgreedToTerms] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    if (!agreedToTerms) {
      setError("Please agree to the Terms of Service and Privacy Policy");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      // Split full name into first and last name
      const nameParts = firstName.trim().split(" ");
      const first = nameParts[0] || "";
      const last = nameParts.slice(1).join(" ") || "";

      await signUp.create({
        firstName: first,
        lastName: last,
        emailAddress: email,
        password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      setPendingVerification(true);
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Failed to create account");
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerification = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signUp) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      console.log("Verification result:", result.status, result);

      if (result.status === "complete") {
        if (result.createdSessionId) {
          await setActive({ session: result.createdSessionId });
          router.push("/");
          router.refresh();
        } else {
          // No session created yet, but verification complete
          // Try to create session
          router.push("/");
          router.refresh();
        }
      } else if (result.status === "missing_requirements") {
        // Check what's missing
        const missingFields = result.missingFields || [];
        const unverifiedFields = result.unverifiedFields || [];

        if (missingFields.length > 0) {
          setError(`Missing required fields: ${missingFields.join(", ")}`);
        } else if (unverifiedFields.length > 0) {
          setError(`Please verify: ${unverifiedFields.join(", ")}`);
        } else {
          // If email is verified but session not created, try redirecting
          router.push("/login");
        }
      } else {
        // For any other status, redirect to login
        router.push("/login");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string; code?: string }[] };
      const errorMessage = error.errors?.[0]?.message || "Invalid verification code";
      setError(errorMessage);
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignUp = async () => {
    if (!isLoaded) return;

    try {
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: "/",
      });
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Failed to sign up with Google");
    }
  };

  // Verification form
  if (pendingVerification) {
    return (
      <div className="flex min-h-screen bg-white">
        {/* Mobile Header */}
        <AuthMobileHeader />

        <div className="flex flex-1 flex-col justify-center px-4 pt-16 pb-16 sm:py-12 lg:pt-12 lg:pb-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
          <div className="mx-auto w-full max-w-sm lg:w-96">
            <div className="mb-4 sm:mb-8 text-center">
              <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
                Verify your email
              </h1>
              <p className="mt-1 sm:mt-2 text-sm sm:text-md text-gray-500">
                We sent a verification code to {email}
              </p>
            </div>

            {error && (
              <div className="mb-4 rounded-lg bg-error-50 p-3 text-sm text-error-600">
                {error}
              </div>
            )}

            <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleVerification}>
              <Input
                label="Verification Code"
                type="text"
                placeholder="Enter verification code"
                icon={Mail01}
                size="md"
                isRequired
                value={code}
                onChange={(value) => setCode(value)}
              />

              <Button
                type="submit"
                size="lg"
                color="primary"
                className="w-full"
                isDisabled={isLoading || !code}
                isLoading={isLoading}
              >
                {isLoading ? "Verifying..." : "Verify Email"}
              </Button>
            </form>

            <p className="mt-4 sm:mt-8 text-center text-sm text-gray-500">
              Didn&apos;t receive the code?{" "}
              <button
                onClick={() => signUp?.prepareEmailAddressVerification({ strategy: "email_code" })}
                className="font-semibold text-brand-600 hover:text-brand-700"
              >
                Resend
              </button>
            </p>
          </div>
        </div>

        <div className="relative hidden w-0 flex-1 lg:block">
          <Image
            src="/login_signup_bg.jpg"
            alt="Sign up"
            fill
            className="object-cover object-left"
            priority
          />
        </div>

        {/* Mobile Footer */}
        <AuthMobileFooter />
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-white">
      {/* Mobile Header */}
      <AuthMobileHeader />

      {/* Left side - Form */}
      <div className="flex flex-1 flex-col justify-center px-4 pt-16 pb-16 sm:py-12 lg:pt-12 lg:pb-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24">
        <div className="mx-auto w-full max-w-sm lg:w-96">
          {/* Header */}
          <div className="mb-4 sm:mb-8 text-center">
            <h1 className="text-2xl sm:text-3xl font-semibold text-gray-900">
              Create an account
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-md text-gray-500">
              Start your journey with AdView today.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-error-50 p-3 text-sm text-error-600">
              {error}
            </div>
          )}

          {/* Social Login Buttons */}
          <div className="flex flex-col gap-3">
            <SocialButton
              social="google"
              size="md"
              theme="color"
              className="w-full"
              onClick={handleGoogleSignUp}
            >
              Sign up with Google
            </SocialButton>
          </div>

          {/* Divider */}
          <div className="my-4 sm:my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Signup Form */}
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
            <Input
              label="Full Name"
              type="text"
              placeholder="Enter your name"
              icon={User01}
              size="md"
              isRequired
              value={firstName}
              onChange={(value) => setFirstName(value)}
            />

            <Input
              label="Email"
              type="email"
              placeholder="Enter your email"
              icon={Mail01}
              size="md"
              isRequired
              value={email}
              onChange={(value) => setEmail(value)}
            />

            <div className="relative">
              <Input
                label="Password"
                type={showPassword ? "text" : "password"}
                placeholder="Create a password"
                icon={Lock01}
                size="md"
                isRequired
                hint="Must be at least 8 characters."
                value={password}
                onChange={(value) => setPassword(value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-[38px] text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff className="size-5" /> : <Eye className="size-5" />}
              </button>
            </div>

            {/* Terms and Conditions */}
            <Checkbox
              size="sm"
              isSelected={agreedToTerms}
              onChange={(checked) => setAgreedToTerms(checked)}
              label={
                <span className="text-sm text-gray-500">
                  I agree to the{" "}
                  <Link href="/terms" className="text-brand-600 hover:text-brand-700 hover:underline">
                    Terms of Service
                  </Link>{" "}
                  and{" "}
                  <Link href="/privacy" className="text-brand-600 hover:text-brand-700 hover:underline">
                    Privacy Policy
                  </Link>
                </span>
              }
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="w-full"
              isDisabled={isLoading || !isLoaded}
              isLoading={isLoading}
            >
              {isLoading ? "Creating account..." : "Create account"}
            </Button>
          </form>

          {/* Sign in link */}
          <p className="mt-4 sm:mt-8 text-center text-sm text-gray-500">
            Already have an account?{" "}
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
          alt="Sign up"
          fill
          className="object-cover object-left"
          priority
        />
      </div>

      {/* Mobile Footer */}
      <AuthMobileFooter />
    </div>
  );
}
