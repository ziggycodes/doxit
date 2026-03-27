import type { Metadata } from "next";
import { SignUpForm } from "@/components/auth/sign-up-form";

export const metadata: Metadata = {
  title: "Sign up — DOXIT",
};

export default function SignUpPage() {
  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Create your account
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Your 3-day trial starts as soon as you sign up. No card required for Phase 1.
        </p>
      </div>
      <SignUpForm />
    </div>
  );
}
