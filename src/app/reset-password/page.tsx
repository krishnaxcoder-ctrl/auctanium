"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useSignIn } from "@clerk/nextjs";
import { ArrowLeft, Lock01 } from "@untitledui/icons";
import { Button } from "@/components/base/buttons/button";
import { Input } from "@/components/base/input/input";

export default function ResetPasswordPage() {
  const router = useRouter();
  const { isLoaded, signIn, setActive } = useSignIn();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!isLoaded || !signIn) return;

    // Validate passwords
    if (password.length < 8) {
      setError("Password must be at least 8 characters");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    setIsLoading(true);
    setError("");

    try {
      const result = await signIn.resetPassword({
        password,
        signOutOfOtherSessions: true,
      });

      if (result.status === "complete") {
        // Clear the stored email
        sessionStorage.removeItem("resetEmail");

        // Set the active session
        await setActive({ session: result.createdSessionId });

        // Redirect to home
        router.push("/");
        router.refresh();
      } else {
        setError("Password reset incomplete. Please try again.");
      }
    } catch (err: unknown) {
      const error = err as { errors?: { message: string }[] };
      setError(error.errors?.[0]?.message || "Failed to reset password. Please try again.");
    } finally {
      setIsLoading(false);
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

          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl font-semibold text-gray-900">
              Set new password
            </h1>
            <p className="mt-2 text-md text-gray-500">
              Your new password must be different from previously used passwords.
            </p>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mb-4 rounded-lg bg-error-50 p-3 text-sm text-error-600">
              {error}
            </div>
          )}

          {/* Reset Password Form */}
          <form className="flex flex-col gap-5" onSubmit={handleSubmit}>
            <Input
              label="New Password"
              type="password"
              placeholder="Enter new password"
              icon={Lock01}
              size="md"
              isRequired
              hint="Must be at least 8 characters."
              value={password}
              onChange={(value) => setPassword(value)}
            />

            <Input
              label="Confirm Password"
              type="password"
              placeholder="Confirm new password"
              icon={Lock01}
              size="md"
              isRequired
              value={confirmPassword}
              onChange={(value) => setConfirmPassword(value)}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              size="lg"
              color="primary"
              className="w-full"
              isDisabled={isLoading || !isLoaded || !password || !confirmPassword}
              isLoading={isLoading}
            >
              {isLoading ? "Resetting..." : "Reset password"}
            </Button>
          </form>

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
          alt="Reset Password"
          fill
          className="object-cover object-left"
          priority
        />
      </div>
    </div>
  );
}
