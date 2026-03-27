"use client";

import { useQuery } from "convex/react";
import { api } from "@/convex/_generated/api";
import type { Doc } from "@/convex/_generated/dataModel";

export default function DashboardPage() {
  const docs = useQuery(api.documents.listMine);

  return (
    <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col gap-8 px-4 py-10 sm:px-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
          Dashboard
        </h1>
        <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
          Upload context files and draft documentation in one place. Phase 1 covers auth,
          trials, and your data model—editor and retrieval come next.
        </p>
      </div>
      <section className="rounded-2xl border border-zinc-200 bg-white p-6 dark:border-zinc-800 dark:bg-zinc-900/50">
        <h2 className="text-sm font-semibold uppercase tracking-wide text-zinc-500 dark:text-zinc-400">
          Your documents
        </h2>
        {docs === undefined ? (
          <p className="mt-4 text-sm text-zinc-500">Loading…</p>
        ) : docs.length === 0 ? (
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            No documents yet. When the editor ships, you&apos;ll create them here.
          </p>
        ) : (
          <ul className="mt-4 divide-y divide-zinc-100 dark:divide-zinc-800">
            {docs.map((d: Doc<"documents">) => (
              <li key={d._id} className="py-3 text-sm">
                <span className="font-medium text-zinc-900 dark:text-zinc-50">{d.title}</span>
                <span className="ml-2 text-zinc-500">
                  updated {new Date(d.updatedAt).toLocaleDateString()}
                </span>
              </li>
            ))}
          </ul>
        )}
      </section>
    </div>
  );
}
