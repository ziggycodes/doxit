import Link from "next/link";

export default function LandingPage() {
  return (
    <div className="mx-auto flex max-w-6xl flex-1 flex-col justify-center gap-16 px-4 py-20 sm:px-6 lg:gap-24 lg:py-28">
      <section className="mx-auto max-w-3xl text-center">
        <p className="mb-4 text-sm font-medium uppercase tracking-wide text-emerald-600 dark:text-emerald-400">
          Documentation, grounded
        </p>
        <h1 className="text-balance text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-6xl">
          AI writing with your files as context
        </h1>
        <p className="mx-auto mt-6 max-w-2xl text-pretty text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
          DOXIT helps SaaS teams and agencies draft SOPs, onboarding guides, and client docs
          using the PDFs, notes, and specs you already trust—so output stays accurate, not generic.
        </p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="rounded-full bg-emerald-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Start 3-day free trial
          </Link>
          <Link
            href="/login"
            className="rounded-full border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-800 transition hover:border-zinc-400 hover:bg-zinc-50 dark:border-zinc-600 dark:text-zinc-100 dark:hover:bg-zinc-900"
          >
            Log in
          </Link>
        </div>
      </section>
      <section className="mx-auto grid max-w-5xl gap-8 sm:grid-cols-3">
        {[
          {
            title: "Upload context",
            body: "Bring policies, transcripts, and product notes into one workspace.",
          },
          {
            title: "Select sources",
            body: "Choose exactly which files inform each document—no noisy crawl.",
          },
          {
            title: "Draft with confidence",
            body: "Generate structure and copy that cites the context you picked.",
          },
        ].map((item) => (
          <div
            key={item.title}
            className="rounded-2xl border border-zinc-200 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40"
          >
            <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">
              {item.title}
            </h2>
            <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {item.body}
            </p>
          </div>
        ))}
      </section>
    </div>
  );
}
