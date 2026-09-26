"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import {
  getCourse,
  getEnrollments,
  enroll,
  markLessonComplete,
  trackLabel,
  priceLabel,
  type AcademyCourse,
  type AcademyLesson,
} from "@/lib/academy-api";

export default function CourseClient({ slug }: { slug: string }) {
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<AcademyCourse | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [busy, setBusy] = useState(false);
  const [notice, setNotice] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    try {
      const data = await getCourse(slug);
      setCourse(data);
      setSelected((prev) => prev ?? data.lessons[0]?.id ?? null);

      if (user) {
        const enr = await getEnrollments();
        const mine = enr.find((e) => e.courseId === data.id);
        setEnrolled(!!mine);
        if (mine) setCompleted(mine.progress?.completedLessons ?? []);
      }
    } catch {
      setError("No se pudo cargar el curso.");
    } finally {
      setLoading(false);
    }
  }, [slug, user]);

  useEffect(() => {
    if (!authLoading) load();
  }, [authLoading, load]);

  const handleEnroll = async () => {
    if (!course) return;
    setBusy(true);
    setNotice(null);
    try {
      const res = await enroll(course.id);
      if (res.ok && res.data.enrolled) {
        setEnrolled(true);
        setNotice("¡Listo! Ya estás inscrito. Empieza con la primera lección.");
        await load();
      } else if (res.data.requiresPayment) {
        setNotice("Este curso requiere pago. Completa el checkout y tu acceso se activará.");
      }
    } finally {
      setBusy(false);
    }
  };

  const handleComplete = async () => {
    if (!course || !selected) return;
    setBusy(true);
    try {
      const res = await markLessonComplete(course.id, selected);
      if (res.ok) {
        setCompleted(res.data.completedLessons);
      }
    } finally {
      setBusy(false);
    }
  };

  if (loading || authLoading) {
    return (
      <main className="mx-auto max-w-5xl px-4 py-16">
        <div className="h-48 animate-pulse rounded-xl bg-[var(--bg-surface-hover)]" />
      </main>
    );
  }

  if (error || !course) {
    return (
      <main className="page-enter mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="mb-3">Curso no encontrado</h1>
        <p className="mb-6 text-[var(--text-secondary)]">{error ?? "Ese curso no existe."}</p>
        <Link href="/courses" className="text-[var(--brand-primary)] hover:underline">
          ← Volver al catálogo
        </Link>
      </main>
    );
  }

  const lesson: AcademyLesson | undefined = course.lessons.find((l) => l.id === selected) ?? course.lessons[0];
  const isLocked = course.locked;
  const progressPct = course.lessonCount > 0 ? Math.round((completed.length / course.lessonCount) * 100) : 0;
  const lessonDone = lesson ? completed.includes(lesson.id) : false;

  return (
    <main className="page-enter mx-auto max-w-5xl px-4 py-10">
      <div className="mb-6">
        <Link href="/courses" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
          ← Catálogo
        </Link>
      </div>

      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
            Track {course.track} · {trackLabel(course.track)}
          </p>
          <h1 className="text-3xl">{course.title}</h1>
          <p className="mt-1 text-[var(--text-secondary)]">{course.tagline}</p>
        </div>
        <div className="text-right">
          <div className={`text-lg font-semibold ${course.price === 0 ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]"}`}>
            {priceLabel(course)}
          </div>
          {course.credential && <p className="text-xs text-[var(--text-muted)]">🏅 Credential al completar</p>}
        </div>
      </div>

      {/* Progress bar */}
      <div className="mb-8">
        <div className="mb-1 flex justify-between text-xs text-[var(--text-muted)]">
          <span>
            {completed.length} / {course.lessonCount} lecciones
          </span>
          <span>{progressPct}%</span>
        </div>
        <div className="h-2 w-full overflow-hidden rounded-full bg-[var(--bg-surface-hover)]">
          <div
            className="h-full rounded-full bg-[var(--accent-green)] transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
      </div>

      {notice && (
        <div className="mb-6 rounded-lg border border-[var(--brand-primary-border)] bg-[var(--brand-primary-muted)] p-4 text-sm text-[var(--brand-primary)]">
          {notice}
        </div>
      )}

      {/* Gated / not enrolled */}
      {!enrolled && (
        <div className="mb-8 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-center">
          {!user ? (
            <>
              <p className="mb-4 text-[var(--text-secondary)]">
                Inicia sesión para inscribirte y guardar tu progreso.
              </p>
              <GoogleLoginButton className="mx-auto w-56" />
            </>
          ) : isLocked ? (
            <>
              <p className="mb-4 text-[var(--text-secondary)]">
                Este curso es de pago. Compra el acceso y se activará automáticamente.
              </p>
              <a
                href="https://ko-fi.com/upvelara"
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift inline-block rounded-md bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
              >
                Comprar acceso →
              </a>
            </>
          ) : (
            <button
              onClick={handleEnroll}
              disabled={busy}
              className="btn-lift rounded-md bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)] disabled:opacity-50"
            >
              {busy ? "Inscribiendo…" : "Empezar gratis →"}
            </button>
          )}
        </div>
      )}

      {/* LMS: sidebar + lesson */}
      <div className="grid gap-6 md:grid-cols-3">
        <aside className="md:col-span-1">
          <h3 className="mb-3 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            Lecciones
          </h3>
          <ol className="space-y-1.5">
            {course.lessons.map((l) => {
              const done = completed.includes(l.id);
              const isSel = lesson?.id === l.id;
              return (
                <li key={l.id}>
                  <button
                    onClick={() => !l.locked && setSelected(l.id)}
                    disabled={l.locked}
                    className={`flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                      isSel
                        ? "bg-[var(--brand-primary-muted)] text-[var(--brand-primary)]"
                        : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                    } ${l.locked ? "cursor-not-allowed opacity-50" : ""}`}
                  >
                    <span className="mt-0.5">{done ? "✓" : l.locked ? "🔒" : "○"}</span>
                    <span>
                      <span className="mr-1 text-xs text-[var(--text-muted)]">{l.moduleId}</span>
                      {l.title}
                    </span>
                  </button>
                </li>
              );
            })}
          </ol>
        </aside>

        <section className="md:col-span-2">
          {lesson ? (
            <article className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                {lesson.moduleId} · {lesson.type}
              </p>
              <h2 className="mb-4">{lesson.title}</h2>

              {lesson.videoUrl ? (
                <div className="mb-4 aspect-video w-full overflow-hidden rounded-md">
                  <iframe
                    src={lesson.videoUrl}
                    title={lesson.title}
                    className="h-full w-full"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : null}

              {lesson.content ? (
                <p className="whitespace-pre-line text-[var(--text-secondary)]">{lesson.content}</p>
              ) : (
                <p className="text-[var(--text-muted)]">
                  🔒 Contenido bloqueado. Inscríbete (o compra el acceso) para verlo.
                </p>
              )}

              {enrolled && lesson.content && (
                <div className="mt-6 border-t border-[var(--border-default)] pt-4">
                  <button
                    onClick={handleComplete}
                    disabled={busy || lessonDone}
                    className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                      lessonDone
                        ? "bg-[var(--accent-green-muted)] text-[var(--accent-green)]"
                        : "bg-[var(--brand-primary)] text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
                    } disabled:opacity-70`}
                  >
                    {lessonDone ? "✓ Completada" : busy ? "Guardando…" : "Marcar como completada"}
                  </button>
                </div>
              )}
            </article>
          ) : (
            <p className="text-[var(--text-muted)]">Selecciona una lección.</p>
          )}
        </section>
      </div>
    </main>
  );
}
