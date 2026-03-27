import { getAuthUserId } from "@convex-dev/auth/server";
import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { trialDurationMs } from "./lib/authz";

export const ensureUserProfile = mutation({
  args: {
    email: v.optional(v.string()),
    displayName: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      throw new ConvexError("Unauthorized");
    }
    const existing = await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
    if (existing) {
      return existing._id;
    }
    const now = Date.now();
    return await ctx.db.insert("userProfiles", {
      userId,
      trialStartedAt: now,
      trialEndsAt: now + trialDurationMs(),
      email: args.email,
      displayName: args.displayName,
    });
  },
});

export const getMyProfile = query({
  args: {},
  handler: async (ctx) => {
    const userId = await getAuthUserId(ctx);
    if (userId === null) {
      return null;
    }
    return await ctx.db
      .query("userProfiles")
      .withIndex("by_userId", (q) => q.eq("userId", userId))
      .unique();
  },
});
