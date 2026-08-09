"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import { PHASES } from "@/lib/phases";

export default function Navbar() {
  const pathname = usePathname();
  const { user, loading, loginWithGoogle, logout } = useAuth();

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <header className="sticky top-0 z-40 border-b border-[var(--border-default)] bg-[var(--bg-base)]/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-3">
        <Link href="/" className="flex items-center gap-2 font-semibold">
          <span className="grid h-8 w-8 place-items-center rounded-lg bg-[var(--brand-primary-muted)] text-[var(--brand-primary)]">
            ⟳
          </span>
          <span>
            Velara<span className="text-[var(--brand-primary)]">Loop</span>
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex">
          {PHASES.map((phase) => (
            <Link
              key={phase.id}
              href={`/phases/${phase.id}`}
              className={`rounded-md px-2 py-1 text-xs font-medium ${
                isActive(`/phases/${phase.id}`)
                  ? "bg-[var(--brand-primary-muted)] text-[var(--brand-primary)]"
                  : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)] hover:text-[var(--text-primary)]"
              }`}
            >
              {phase.number}. {phase.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          {loading ? (
            <div className="h-8 w-24 animate-pulse rounded-md bg-[var(--bg-surface-hover)]" />
          ) : user ? (
            <>
              <Link
                href="/project"
                className={`rounded-md px-3 py-1.5 text-sm font-medium ${
                  isActive("/project")
                    ? "bg-[var(--brand-primary-muted)] text-[var(--brand-primary)]"
                    : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                }`}
              >
                My Project
              </Link>
              <button
                onClick={logout}
                className="rounded-md border border-[var(--border-default)] px-3 py-1.5 text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
              >
                Sign out
              </button>
            </>
          ) : (
            <button
              onClick={loginWithGoogle}
              className="btn-lift rounded-md bg-[var(--brand-primary)] px-4 py-1.5 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
            >
              Login with Google
            </button>
          )}
        </div>
      </div>
    </header>
  );
}
