/* eslint-disable */
/**
 * Generated `api` utility.
 *
 * THIS CODE IS AUTOMATICALLY GENERATED.
 *
 * To regenerate, run `npx convex dev`.
 * @module
 */

import type {
  ApiFromModules,
  FilterApi,
  FunctionReference,
} from "convex/server";
import type * as contextChunks from "../contextChunks.js";
import type * as contextFiles from "../contextFiles.js";
import type * as documents from "../documents.js";
import type * as users from "../users.js";

declare const fullApi: ApiFromModules<{
  contextChunks: typeof contextChunks;
  contextFiles: typeof contextFiles;
  documents: typeof documents;
  users: typeof users;
}>;
export declare const api: FilterApi<
  typeof fullApi,
  FunctionReference<any, "public">
>;
export declare const internal: FilterApi<
  typeof fullApi,
  FunctionReference<any, "internal">
>;
