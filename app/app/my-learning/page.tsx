"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import { getEnrollments, type Enrollment } from "@/lib/academy-api";

export default function MyLearningPage() {
  const { user, loading: authLoading } = useAuth();
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (authLoading) return;
    if (!user) {
      setLoading(false);
      return;
    }
    getEnrollments()
      .then(setEnrollments)
      .catch(() => setEnrollments([]))
      .finally(() => setLoading(false));
  }, [user, authLoading]);

  if (authLoading || loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="h-40 animate-pulse rounded-xl bg-[var(--bg-surface-hover)]" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-enter mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="mb-4">Mi aprendizaje</h1>
        <p className="mb-8 text-[var(--text-secondary)]">
          Inicia sesión para ver tus cursos, tu progreso y continuar donde lo dejaste.
        </p>
        <GoogleLoginButton className="mx-auto w-56" />
      </main>
    );
  }

  return (
    <main className="page-enter mx-auto max-w-4xl px-4 py-12">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
        VelaraLoop Academy
      </p>
      <h1 className="mb-8">Mi aprendizaje</h1>

      {enrollments.length === 0 ? (
        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-8 text-center">
          <p className="mb-4 text-[var(--text-secondary)]">
            Todavía no estás inscrito en ningún curso.
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
          {enrollments.map((e) => {
            const done = e.progress?.completedLessons?.length ?? 0;
            return (
              <Link
                key={e.courseId}
                href={`/courses/${e.slug}`}
                className="card-hover flex items-center justify-between gap-4 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5"
              >
                <div>
                  <h3 className="mb-0.5 text-[var(--text-primary)]">{e.slug.replace(/-/g, " ")}</h3>
                  <p className="text-xs text-[var(--text-muted)]">
                    {e.source === "free" ? "Gratis" : "Comprado"} · {done} lecciones completadas
                    {e.progress?.completed ? " · ✓ Curso completado" : ""}
                  </p>
                </div>
                <span className="text-[var(--brand-primary)]">Continuar →</span>
              </Link>
            );
          })}
        </div>
      )}
    </main>
  );
}
