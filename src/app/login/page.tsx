"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useSignIn, useAuth } from "@clerk/nextjs";
import { Mail01, Lock01, Eye, EyeOff } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";
import { SocialButton } from "@/components/base/buttons/social-button";
import { Checkbox } from "@/components/base/checkbox/checkbox";
import { AuthMobileHeader, AuthMobileFooter } from "@/components/layout/auth-mobile-nav";

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { isSignedIn } = useAuth();
  const { isLoaded, signIn, setActive } = useSignIn();

  // Get redirect URL from query params
  const redirectUrl = searchParams.get("redirect_url") || "/dashboard";

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      router.push(redirectUrl);
    }
  }, [isSignedIn, router, redirectUrl]);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded) return;

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.create({
        identifier: email,
        password,
      });

      if (result.status === "complete") {
        await setActive({ session: result.createdSessionId });
        router.push(redirectUrl);
      } else {
        // Handle other statuses like 2FA
        console.log("Sign in result:", result);
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Invalid email or password");
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    if (!isLoaded) return;

    try {
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/sso-callback",
        redirectUrlComplete: redirectUrl,
      });
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Failed to sign in with Google");
    }
  };

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
              Welcome back
            </h1>
            <p className="mt-1 sm:mt-2 text-sm sm:text-md text-gray-500">
              Please enter your details to sign in.
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
              onClick={handleGoogleSignIn}
            >
              Sign in with Google
            </SocialButton>
          </div>

          {/* Divider */}
          <div className="my-4 sm:my-6 flex items-center">
            <div className="flex-1 border-t border-gray-200" />
            <span className="px-4 text-sm text-gray-500">or</span>
            <div className="flex-1 border-t border-gray-200" />
          </div>

          {/* Login Form */}
          <form className="flex flex-col gap-4 sm:gap-5" onSubmit={handleSubmit}>
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
                placeholder="Enter your password"
                icon={Lock01}
                size="md"
                isRequired
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

            {/* Remember me & Forgot password */}
            <div className="flex items-center justify-between">
              <Checkbox label="Remember me" size="sm" />
              <Link
                href="/forgot-password"
                className="text-sm font-semibold text-brand-600 hover:text-brand-700"
              >
                Forgot password?
              </Link>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="w-full"
              isDisabled={isLoading || !isLoaded}
              isLoading={isLoading}
            >
              {isLoading ? "Signing in..." : "Sign in"}
            </Button>
          </form>

          {/* Sign up link */}
          <p className="mt-4 sm:mt-8 text-center text-sm text-gray-500">
            Don&apos;t have an account?{" "}
            <Link
              href="/signup"
              className="font-semibold text-brand-600 hover:text-brand-700"
            >
              Sign up
            </Link>
          </p>
        </div>
      </div>

      {/* Right side - Image */}
      <div className="relative hidden w-0 flex-1 lg:block">
        <Image
          src="/login_signup_bg.jpg"
          alt="Login"
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
