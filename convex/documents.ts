import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireActiveTrial, requireUserId } from "./lib/authz";

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    return await ctx.db
      .query("documents")
      .withIndex("by_userId_updatedAt", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const create = mutation({
  args: {
    title: v.string(),
    content: v.string(),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireActiveTrial(ctx);
    const now = Date.now();
    return await ctx.db.insert("documents", {
      userId,
      title: args.title,
      content: args.content,
      createdAt: now,
      updatedAt: now,
    });
  },
});

export const update = mutation({
  args: {
    id: v.id("documents"),
    title: v.optional(v.string()),
    content: v.optional(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireActiveTrial(ctx);
    const doc = await ctx.db.get(args.id);
    if (!doc || doc.userId !== userId) {
      throw new ConvexError("Not found");
    }
    const now = Date.now();
    await ctx.db.patch(args.id, {
      ...(args.title !== undefined ? { title: args.title } : {}),
      ...(args.content !== undefined ? { content: args.content } : {}),
      updatedAt: now,
    });
  },
});
