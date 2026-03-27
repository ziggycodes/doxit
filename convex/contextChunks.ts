import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireActiveTrial, requireUserId } from "./lib/authz";

export const listForFile = query({
  args: { contextFileId: v.id("context_files") },
  handler: async (ctx, args) => {
    const userId = await requireUserId(ctx);
    const file = await ctx.db.get(args.contextFileId);
    if (!file || file.userId !== userId) {
      return [];
    }
    return await ctx.db
      .query("context_chunks")
      .withIndex("by_contextFileId", (q) =>
        q.eq("contextFileId", args.contextFileId),
      )
      .collect();
  },
});

export const addChunks = mutation({
  args: {
    contextFileId: v.id("context_files"),
    chunks: v.array(v.string()),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireActiveTrial(ctx);
    const file = await ctx.db.get(args.contextFileId);
    if (!file || file.userId !== userId) {
      throw new ConvexError("Not found");
    }
    const existing = await ctx.db
      .query("context_chunks")
      .withIndex("by_contextFileId", (q) =>
        q.eq("contextFileId", args.contextFileId),
      )
      .collect();
    for (const row of existing) {
      await ctx.db.delete(row._id);
    }
    let i = 0;
    for (const text of args.chunks) {
      await ctx.db.insert("context_chunks", {
        userId,
        contextFileId: args.contextFileId,
        chunkIndex: i++,
        text,
      });
    }
  },
});
