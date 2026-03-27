import { ConvexError } from "convex/values";
import { v } from "convex/values";
import { mutation, query } from "./_generated/server";
import { requireActiveTrial, requireUserId } from "./lib/authz";

export const listMine = query({
  args: {},
  handler: async (ctx) => {
    const userId = await requireUserId(ctx);
    return await ctx.db
      .query("context_files")
      .withIndex("by_userId_createdAt", (q) => q.eq("userId", userId))
      .order("desc")
      .collect();
  },
});

export const createUpload = mutation({
  args: {
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    byteSize: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const { userId } = await requireActiveTrial(ctx);
    return await ctx.db.insert("context_files", {
      userId,
      storageId: args.storageId,
      filename: args.filename,
      mimeType: args.mimeType,
      byteSize: args.byteSize,
      status: "ready",
      createdAt: Date.now(),
    });
  },
});

export const generateUploadUrl = mutation({
  args: {},
  handler: async (ctx) => {
    await requireActiveTrial(ctx);
    return await ctx.storage.generateUploadUrl();
  },
});

export const remove = mutation({
  args: { id: v.id("context_files") },
  handler: async (ctx, args) => {
    const { userId } = await requireActiveTrial(ctx);
    const file = await ctx.db.get(args.id);
    if (!file || file.userId !== userId) {
      throw new ConvexError("Not found");
    }
    await ctx.storage.delete(file.storageId);
    const chunks = await ctx.db
      .query("context_chunks")
      .withIndex("by_contextFileId", (q) =>
        q.eq("contextFileId", args.id),
      )
      .collect();
    for (const chunk of chunks) {
      await ctx.db.delete(chunk._id);
    }
    await ctx.db.delete(args.id);
  },
});
