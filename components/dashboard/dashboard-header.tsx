"use client";

import { useAuthActions } from "@convex-dev/auth/react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export function DashboardHeader() {
  const { signOut } = useAuthActions();
  const router = useRouter();

  return (
    <header className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto flex h-14 max-w-5xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/dashboard"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          DOXIT
        </Link>
        <button
          type="button"
          className="text-sm font-medium text-zinc-600 hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          onClick={() =>
            void signOut().then(() => {
              router.push("/");
            })
          }
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
