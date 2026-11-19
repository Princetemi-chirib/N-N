import Link from "next/link";

export function AppShell({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 text-white">
      <header className="border-b border-slate-700/80 bg-slate-950/60 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-4 py-4 sm:px-6">
          <Link href="/" className="text-xl font-semibold tracking-wide text-amber-200">
            L&L Africk
          </Link>
          <nav className="flex items-center gap-3 text-sm">
            <Link
              href="/"
              className="rounded-md px-3 py-1.5 text-slate-300 transition hover:bg-slate-800 hover:text-white"
            >
              Clients
            </Link>
            <Link
              href="/clients/new"
              className="rounded-md bg-emerald-600 px-3 py-1.5 font-medium text-white transition hover:bg-emerald-500"
            >
              + New Client
            </Link>
          </nav>
        </div>
      </header>
      <main className="mx-auto max-w-6xl px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
