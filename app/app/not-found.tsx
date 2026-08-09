import Link from "next/link";

export default function NotFound() {
  return (
    <main className="page-enter mx-auto max-w-xl px-4 py-24 text-center">
      <h1 className="mb-3">Phase not found</h1>
      <p className="mb-6 text-[var(--text-secondary)]">
        That phase doesn&apos;t exist in the VelaraLoop.
      </p>
      <Link
        href="/"
        className="btn-lift inline-block rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)]"
      >
        ← Back to VelaraLoop
      </Link>
    </main>
  );
}
