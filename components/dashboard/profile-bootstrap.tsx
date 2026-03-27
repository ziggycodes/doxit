"use client";

import { useMutation, useQuery, useConvexAuth } from "convex/react";
import { useEffect, useRef } from "react";
import { api } from "@/convex/_generated/api";

/**
 * Ensures a userProfiles row exists after OAuth/password signup edge cases.
 */
export function ProfileBootstrap() {
  const { isAuthenticated, isLoading } = useConvexAuth();
  const profile = useQuery(api.users.getMyProfile);
  const ensureUserProfile = useMutation(api.users.ensureUserProfile);
  const ran = useRef(false);

  useEffect(() => {
    if (!isAuthenticated || isLoading || profile === undefined) return;
    if (profile !== null || ran.current) return;
    ran.current = true;
    void ensureUserProfile({});
  }, [isAuthenticated, isLoading, profile, ensureUserProfile]);

  return null;
}
