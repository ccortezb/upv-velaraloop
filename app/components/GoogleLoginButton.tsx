"use client";

import { useAuth } from "@/lib/auth-context";

export default function GoogleLoginButton({
  className = "",
  children,
}: {
  className?: string;
  children?: React.ReactNode;
}) {
  const { user, loading, loginWithGoogle } = useAuth();

  if (loading) {
    return (
      <div className={`h-11 w-48 animate-pulse rounded-md bg-[var(--bg-surface-hover)] ${className}`} />
    );
  }

  return (
    <button
      onClick={user ? undefined : loginWithGoogle}
      disabled={!!user}
      className={`btn-lift inline-flex items-center justify-center gap-2 rounded-md bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)] disabled:opacity-60 ${className}`}
    >
      {user ? "✓ Connected" : children ?? "Continue with Google"}
    </button>
  );
}
