"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import { formatTrialBannerMessage, isTrialActive } from "@/lib/trial";

export function TrialBanner() {
  const profile = useQuery(api.users.getMyProfile);

  if (profile === undefined || profile === null) {
    return null;
  }

  const active = isTrialActive(profile.trialEndsAt);
  const message = formatTrialBannerMessage(profile.trialEndsAt);

  return (
    <div
      className={
        active
          ? "border-b border-emerald-200 bg-emerald-50 px-4 py-3 text-sm text-emerald-900 dark:border-emerald-900 dark:bg-emerald-950/60 dark:text-emerald-100"
          : "border-b border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-950 dark:border-amber-900 dark:bg-amber-950/50 dark:text-amber-100"
      }
      role="status"
    >
      <div className="mx-auto flex max-w-5xl items-center justify-between gap-4">
        <span>{message}</span>
        {!active ? (
          <span className="shrink-0 text-xs font-medium opacity-90">
            Writes are disabled until you subscribe.
          </span>
        ) : null}
      </div>
    </div>
  );
}
