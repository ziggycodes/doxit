import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import type { MutationCtx, QueryCtx } from "../_generated/server";

const TRIAL_MS = 3 * 24 * 60 * 60 * 1000;

export function trialDurationMs(): number {
  return TRIAL_MS;
}

type DbCtx = QueryCtx | MutationCtx;

export async function requireUserId(ctx: DbCtx) {
  const userId = await getAuthUserId(ctx);
  if (userId === null) {
    throw new ConvexError("Unauthorized");
  }
  return userId;
}

export async function requireActiveTrial(ctx: DbCtx) {
  const userId = await requireUserId(ctx);
  const profile = await ctx.db
    .query("userProfiles")
    .withIndex("by_userId", (q) => q.eq("userId", userId))
    .unique();
  if (!profile) {
    throw new ConvexError("Complete setup: profile missing");
  }
  if (Date.now() > profile.trialEndsAt) {
    throw new ConvexError("trial_expired");
  }
  return { userId, profile };
}
