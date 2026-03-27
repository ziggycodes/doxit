import { authTables } from "@convex-dev/auth/server";
import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
  ...authTables,

  userProfiles: defineTable({
    userId: v.id("users"),
    trialStartedAt: v.number(),
    trialEndsAt: v.number(),
    email: v.optional(v.string()),
    displayName: v.optional(v.string()),
  }).index("by_userId", ["userId"]),

  documents: defineTable({
    userId: v.id("users"),
    title: v.string(),
    content: v.string(),
    createdAt: v.number(),
    updatedAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_updatedAt", ["userId", "updatedAt"]),

  context_files: defineTable({
    userId: v.id("users"),
    storageId: v.id("_storage"),
    filename: v.string(),
    mimeType: v.string(),
    byteSize: v.optional(v.number()),
    status: v.union(
      v.literal("uploaded"),
      v.literal("processing"),
      v.literal("ready"),
      v.literal("failed"),
    ),
    createdAt: v.number(),
  })
    .index("by_userId", ["userId"])
    .index("by_userId_createdAt", ["userId", "createdAt"]),

  context_chunks: defineTable({
    userId: v.id("users"),
    contextFileId: v.id("context_files"),
    chunkIndex: v.number(),
    text: v.string(),
  })
    .index("by_contextFileId", ["contextFileId"])
    .index("by_userId_contextFileId", ["userId", "contextFileId"]),
});
