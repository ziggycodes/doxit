import Link from "next/link";

export function MarketingHeader() {
  return (
    <header className="border-b border-zinc-200/80 bg-white/80 backdrop-blur-md dark:border-zinc-800 dark:bg-zinc-950/80">
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link
          href="/"
          className="text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          DOXIT
        </Link>
        <nav className="flex items-center gap-4 text-sm font-medium">
          <Link
            href="/login"
            className="text-zinc-600 transition-colors hover:text-zinc-900 dark:text-zinc-400 dark:hover:text-zinc-50"
          >
            Log in
          </Link>
          <Link
            href="/signup"
            className="rounded-full bg-emerald-600 px-4 py-2 text-white transition-colors hover:bg-emerald-700"
          >
            Start free trial
          </Link>
        </nav>
      </div>
    </header>
  );
}
