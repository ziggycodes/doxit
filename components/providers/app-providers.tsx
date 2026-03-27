"use client";

import { ConvexAuthNextjsProvider } from "@convex-dev/auth/nextjs";
import { ConvexReactClient } from "convex/react";
import { type ReactNode, useMemo } from "react";

export function AppProviders({ children }: { children: ReactNode }) {
  const convex = useMemo(
    () =>
      new ConvexReactClient(process.env.NEXT_PUBLIC_CONVEX_URL ?? "", {
        unsavedChangesWarning: false,
      }),
    [],
  );

  return <ConvexAuthNextjsProvider client={convex}>{children}</ConvexAuthNextjsProvider>;
}
