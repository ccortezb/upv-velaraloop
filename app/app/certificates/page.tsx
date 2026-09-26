"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { getMyCertificates, getCourses, getProgress, claimCertificate, type CourseSummary } from "@/lib/academy-api";

export default function CertificatesPage() {
  const { user, loading: authLoading } = useAuth();
  const [certs, setCerts] = useState<{ courseId: string; certificateId: string; courseTitle?: string }[]>([]);
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    Promise.all([getMyCertificates(), getCourses().catch(() => ({ courses: [] }))])
      .then(async ([c, co]) => {
        setCourses(co.courses ?? []);
        if (c.length === 0) {
          // Backfill: courses the user passed but with no certificate yet
          try {
            const prog = await getProgress();
            const pending = Object.entries(prog).filter(
              ([, v]) => v && typeof v === "object" && (v as any).quizPassed && !(v as any).certificateId
            );
            if (pending.length > 0) {
              await Promise.all(pending.map(([courseId]) => claimCertificate(courseId, true).catch(() => null)));
              const fresh = await getMyCertificates();
              setCerts(fresh);
              return;
            }
          } catch {
            /* ignore */
          }
        }
        setCerts(c);
      })
      .catch(() => setCerts([]))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  const titleFor = (courseId: string, fallback?: string) =>
    fallback || courses.find((c) => c.id === courseId || c.slug === courseId)?.title || courseId.replace(/-/g, " ");

  if (authLoading || loading) {
    return (
      <main className="mx-auto max-w-3xl px-4 py-16">
        <div className="h-40 animate-pulse rounded-xl bg-[var(--bg-surface-hover)]" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-enter mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="mb-4">Mis certificados</h1>
        <p className="mb-8 text-[var(--text-secondary)]">
          Inicia sesión para ver y compartir tus certificados de VelaraLoop Academy.
        </p>
        <GoogleLoginButton className="mx-auto w-56" />
      </main>
    );
  }

  return (
    <main className="page-enter mx-auto max-w-3xl px-4 py-12">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
        VelaraLoop Academy
      </p>
      <h1 className="mb-8">Mis certificados</h1>

      {certs.length === 0 ? (
        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center">
          <p className="mb-4 text-[var(--text-secondary)]">
            Todavía no tienes certificados. Completa un curso y aprueba el quiz final para obtener el tuyo.
          </p>
          <Link
            href="/courses"
            className="btn-lift inline-block rounded-md bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
          >
            Ver cursos →
          </Link>
        </div>
      ) : (
        <div className="space-y-3">
          {certs.map((c) => (
            <div
              key={c.certificateId}
              className="card-hover flex flex-wrap items-center justify-between gap-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5"
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🏅</span>
                <div>
                  <h3 className="text-[var(--text-primary)]">{titleFor(c.courseId, c.courseTitle)}</h3>
                  <p className="text-xs text-[var(--text-muted)]">ID {c.certificateId}</p>
                </div>
              </div>
              <div className="flex gap-2">
                <a
                  href={`https://loop.upvelara.com/credential/?id=${c.certificateId}`}
                  className="rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
                >
                  Ver certificado →
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </main>
  );
}
