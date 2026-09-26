"use client";

import { useEffect, useState, useCallback } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import GoogleLoginButton from "@/components/GoogleLoginButton";
import Markdown from "@/components/Markdown";
import MiniQuiz from "@/components/MiniQuiz";
import FinalQuiz from "@/components/FinalQuiz";
import {
  getCourse,
  getEnrollments,
  getProgress,
  enroll,
  markLessonComplete,
  updateCourseProgress,
  claimCertificate,
  trackLabel,
  priceLabel,
  type AcademyCourse,
  type AcademyLesson,
} from "@/lib/academy-api";

const TYPE_LABEL: Record<string, string> = {
  reading: "Lectura",
  video: "Video",
  exercise: "Ejercicio",
  project: "Proyecto",
  workshop: "Workshop",
};

const TYPE_ICON: Record<string, string> = {
  reading: "📖",
  video: "🎬",
  exercise: "🛠️",
  project: "🚀",
  workshop: "🎓",
};

export default function CourseClient({ slug }: { slug: string }) {
  const { user, loading: authLoading } = useAuth();
  const [course, setCourse] = useState<AcademyCourse | null>(null);
  const [enrolled, setEnrolled] = useState(false);
  const [completed, setCompleted] = useState<string[]>([]);
  const [progress, setProgress] = useState<Record<string, any>>({});
  const [selected, setSelected] = useState<string | null>(null);
  const [quizOpen, setQuizOpen] = useState<Set<string>>(new Set());
  const [quizDone, setQuizDone] = useState<Set<string>>(new Set());
  const [sidebarOpen, setSidebarOpen] = useState(true);
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
        const [enr, prog] = await Promise.all([getEnrollments(), getProgress()]);
        const mine = enr.find((e) => e.courseId === data.id);
        setEnrolled(!!mine);
        const cp = prog[data.id] ?? {};
        setProgress(cp);
        const done = Array.isArray(cp.completedLessons) ? cp.completedLessons : [];
        setCompleted(done);
        setQuizDone(new Set(done));

        // Backfill: if the user already passed but has no certificate, claim one.
        if (cp.quizPassed && !cp.certificateId) {
          claimCertificate(data.id, true)
            .then(async (certId) => {
              if (certId) {
                setProgress((p) => ({ ...p, certificateId: certId }));
                await updateCourseProgress(data.id, { certificateId: certId });
              }
            })
            .catch(() => {});
        }
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
      if (res.enrolled) {
        setEnrolled(true);
        setNotice("¡Listo! Ya estás inscrito. Empieza con la lección 1.");
        await load();
      } else if (res.requiresPayment) {
        setNotice("Este curso requiere pago. Completa el checkout y tu acceso se activará.");
      } else if (res.message) {
        setNotice(res.message);
      }
    } catch {
      setNotice("No se pudo inscribir. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  };

  const handleComplete = async (lesson: AcademyLesson) => {
    if (!course) return;
    setBusy(true);
    try {
      const res = await markLessonComplete(course.id, lesson.id);
      if (res.ok) {
        setCompleted(res.completedLessons);
        setQuizDone((s) => new Set(s).add(lesson.id));
        const lessons = course.lessons;
        const idx = lessons.findIndex((l) => l.id === lesson.id);
        if (idx >= 0 && idx < lessons.length - 1) setSelected(lessons[idx + 1].id);
      }
    } catch {
      setNotice("No se pudo guardar el progreso. Intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  };

  const handleQuizFinish = async (passed: boolean, score: number, certificateId: string | null) => {
    if (!course) return;
    const attempts = (progress.quizAttempts ?? 0) + 1;
    const patch = {
      quizAttempts: attempts,
      quizScore: score,
      quizPassed: passed || progress.quizPassed,
      certificateId: certificateId ?? progress.certificateId ?? null,
    };
    setProgress((p) => ({ ...p, ...patch }));
    try {
      await updateCourseProgress(course.id, patch);
    } catch {
      /* best-effort */
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

  const lessons = course.lessons;
  const completedSet = new Set(completed);
  const currentIdx = Math.max(0, lessons.findIndex((l) => l.id === selected));
  const lesson = lessons[currentIdx] ?? lessons[0];
  const next = currentIdx < lessons.length - 1 ? lessons[currentIdx + 1] : null;
  const isUnlocked = (i: number) => i === 0 || completedSet.has(lessons[i - 1].id);
  const miniQuizDone = (l: AcademyLesson) => quizDone.has(l.id) || completedSet.has(l.id);
  const canComplete = !lesson?.miniQuiz || miniQuizDone(lesson);
  const lessonDone = lesson ? completedSet.has(lesson.id) : false;
  const progressPct = lessons.length > 0 ? Math.round((completed.length / lessons.length) * 100) : 0;
  const allLessonsDone = completed.length >= lessons.length;
  const quizPassed = progress.quizPassed === true;
  const attemptsUsed = progress.quizAttempts ?? 0;

  const selectLesson = (l: AcademyLesson, i: number) => {
    if (!isUnlocked(i)) {
      setNotice(`🔒 Completa "${lessons[i - 1].title}" para desbloquear esta lección.`);
      return;
    }
    setSelected(l.id);
    setSidebarOpen(false);
  };

  return (
    <main className="page-enter">
      {/* Top bar */}
      <div className="sticky top-0 z-30 border-b border-[var(--border-default)] bg-[var(--bg-base)]/90 backdrop-blur">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <button
            onClick={() => setSidebarOpen((s) => !s)}
            aria-label="Toggle lessons"
            className="rounded-md border border-[var(--border-default)] p-2 text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
          <Link href="/courses" className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]">
            ← Catálogo
          </Link>
          <span className="hidden truncate text-sm font-medium text-[var(--text-primary)] sm:block">
            {course.title}
          </span>
          <div className="ml-auto flex items-center gap-3">
            <span className="text-xs text-[var(--text-muted)]">{progressPct}%</span>
            <div className="h-1.5 w-24 overflow-hidden rounded-full bg-[var(--bg-surface-hover)]">
              <div className="h-full rounded-full bg-[var(--accent-green)] transition-all" style={{ width: `${progressPct}%` }} />
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-6xl px-4 py-6">
        <div className="mb-6">
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
            Track {course.track} · {trackLabel(course.track)}
          </p>
          <h1 className="text-2xl md:text-3xl">{course.title}</h1>
          <p className="mt-1 text-sm text-[var(--text-secondary)]">{course.tagline}</p>
        </div>

        {notice && (
          <div className="mb-6 rounded-lg border border-[var(--brand-primary-border)] bg-[var(--brand-primary-muted)] p-4 text-sm text-[var(--brand-primary)]">
            {notice}
          </div>
        )}

        {!enrolled && (
          <div className="mb-6 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-center">
            {!user ? (
              <>
                <p className="mb-4 text-[var(--text-secondary)]">Inicia sesión para inscribirte y guardar tu progreso.</p>
                <GoogleLoginButton className="mx-auto w-56" />
              </>
            ) : course.locked ? (
              <>
                <p className="mb-4 text-[var(--text-secondary)]">Este curso es de pago. Compra el acceso y se activará automáticamente.</p>
                <a href="https://ko-fi.com/upvelara" target="_blank" rel="noopener noreferrer" className="btn-lift inline-block rounded-md bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-base)]">
                  Comprar acceso →
                </a>
              </>
            ) : (
              <button onClick={handleEnroll} disabled={busy} className="btn-lift rounded-md bg-[var(--brand-primary)] px-5 py-2.5 text-sm font-semibold text-[var(--bg-base)] disabled:opacity-50">
                {busy ? "Inscribiendo…" : "Empezar gratis →"}
              </button>
            )}
          </div>
        )}

        <div className="flex gap-6">
          {/* Sidebar */}
          <aside
            className={`${
              sidebarOpen ? "block" : "hidden"
            } fixed inset-y-0 left-0 z-40 w-72 overflow-y-auto border-r border-[var(--border-default)] bg-[var(--bg-base)] p-4 md:sticky md:top-16 md:z-0 md:block md:h-[calc(100vh-4rem)] md:w-64 md:shrink-0 md:rounded-lg md:border md:bg-[var(--bg-surface)]`}
          >
            <div className="mb-3 flex items-center justify-between">
              <h3 className="text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Lecciones ({lessons.length})
              </h3>
              <button onClick={() => setSidebarOpen(false)} className="text-xs text-[var(--text-muted)] md:hidden">
                ✕
              </button>
            </div>
            <ol className="space-y-1">
              {lessons.map((l, i) => {
                const unlocked = isUnlocked(i);
                const done = completedSet.has(l.id);
                const isSel = lesson?.id === l.id;
                return (
                  <li key={l.id}>
                    <button
                      onClick={() => selectLesson(l, i)}
                      className={`flex w-full items-start gap-2 rounded-md px-3 py-2 text-left text-sm transition-colors ${
                        isSel ? "bg-[var(--brand-primary-muted)] text-[var(--brand-primary)]" : "text-[var(--text-secondary)] hover:bg-[var(--bg-surface-hover)]"
                      } ${!unlocked ? "opacity-50" : ""}`}
                    >
                      <span className="mt-0.5">{done ? "✓" : !unlocked ? "🔒" : TYPE_ICON[l.type] ?? "○"}</span>
                      <span>
                        <span className="mr-1 text-xs text-[var(--text-muted)]">{l.moduleId}</span>
                        {l.title}
                      </span>
                    </button>
                  </li>
                );
              })}
            </ol>
            <div className="mt-4 border-t border-[var(--border-default)] pt-3">
              <div className={`flex items-center gap-2 px-3 py-2 text-sm ${allLessonsDone ? "text-[var(--brand-primary)]" : "text-[var(--text-muted)]"}`}>
                <span>{quizPassed ? "🏅" : allLessonsDone ? "🎯" : "🔒"}</span>
                Quiz final {quizPassed ? "(aprobado)" : allLessonsDone ? "(desbloqueado)" : ""}
              </div>
            </div>
          </aside>

          {/* Backdrop (mobile) */}
          {sidebarOpen && (
            <div className="fixed inset-0 z-30 bg-black/50 md:hidden" onClick={() => setSidebarOpen(false)} />
          )}

          {/* Lesson content */}
          <section className="min-w-0 flex-1">
            {lesson ? (
              <article className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
                <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                  {lesson.moduleId} · {TYPE_LABEL[lesson.type] ?? lesson.type} · Lección {currentIdx + 1} de {lessons.length}
                </p>
                <h2 className="mb-3">{lesson.title}</h2>

                {lesson.phase && (
                  <div className="mb-4 flex items-start gap-3 rounded-md border border-[var(--brand-primary-border)] bg-[var(--brand-primary-muted)] px-4 py-3">
                    <span className="text-lg">🌀</span>
                    <div>
                      <p className="text-xs font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                        Fase VelaraLoop: {lesson.phase}
                      </p>
                      {lesson.quote && (
                        <p className="mt-0.5 text-sm italic text-[var(--text-secondary)]">
                          “{lesson.quote}”
                        </p>
                      )}
                    </div>
                  </div>
                )}

                {lesson.videoUrl ? (
                  <div className="mb-4 aspect-video w-full overflow-hidden rounded-md">
                    <iframe src={lesson.videoUrl} title={lesson.title} className="h-full w-full" allowFullScreen />
                  </div>
                ) : lesson.type === "video" ? (
                  <div className="mb-4 grid aspect-video w-full place-items-center rounded-md border border-dashed border-[var(--border-default)] text-sm text-[var(--text-muted)]">
                    🎬 Video próximamente
                  </div>
                ) : null}

                {lesson.content ? (
                  <Markdown content={lesson.content} />
                ) : (
                  <p className="text-[var(--text-muted)]">🔒 Contenido bloqueado. Inscríbete (o compra el acceso) para verlo.</p>
                )}

                {lesson.references && lesson.references.length > 0 && (
                  <div className="mt-6 rounded-lg border border-[var(--border-default)] bg-[var(--bg-base)] p-4">
                    <h4 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                      📚 Referencias
                    </h4>
                    <ul className="space-y-1.5">
                      {lesson.references.map((r) => (
                        <li key={r.url}>
                          <a
                            href={r.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-sm text-[var(--brand-primary)] hover:underline"
                          >
                            {r.label} ↗
                          </a>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}

                {/* Mini-quiz behind a CTA */}
                {enrolled && lesson.miniQuiz && lesson.miniQuiz.length > 0 && (
                  <div className="mt-8">
                    {!miniQuizDone(lesson) && !quizOpen.has(lesson.id) ? (
                      <button
                        onClick={() => setQuizOpen((s) => new Set(s).add(lesson.id))}
                        className="btn-lift w-full rounded-md border-2 border-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-[var(--brand-primary)] hover:bg-[var(--brand-primary-muted)]"
                      >
                        📝 Hacer el mini-quiz ({lesson.miniQuiz.length} preguntas) para continuar
                      </button>
                    ) : (
                      <MiniQuiz questions={lesson.miniQuiz} onComplete={() => setQuizDone((s) => new Set(s).add(lesson.id))} />
                    )}
                  </div>
                )}

                {/* Complete + next */}
                {enrolled && lesson.content && (
                  <div className="mt-6 flex flex-wrap items-center justify-between gap-3 border-t border-[var(--border-default)] pt-4">
                    <button
                      onClick={() => handleComplete(lesson)}
                      disabled={busy || lessonDone || !canComplete}
                      className={`rounded-md px-4 py-2 text-sm font-semibold transition-colors ${
                        lessonDone
                          ? "bg-[var(--accent-green-muted)] text-[var(--accent-green)]"
                          : "bg-[var(--brand-primary)] text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
                      } disabled:opacity-50`}
                    >
                      {lessonDone ? "✓ Completada" : busy ? "Guardando…" : canComplete ? "Marcar como completada" : "Completa el mini-quiz primero"}
                    </button>
                    {next && (
                      <button
                        onClick={() => selectLesson(next, currentIdx + 1)}
                        disabled={!lessonDone}
                        className="rounded-md border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)] disabled:opacity-40"
                      >
                        Siguiente: {next.title} →
                      </button>
                    )}
                  </div>
                )}
              </article>
            ) : (
              <p className="text-[var(--text-muted)]">Selecciona una lección.</p>
            )}
          </section>
        </div>

        {/* Final quiz */}
        {enrolled && course.finalQuizCount > 0 && (
          <div className="mt-12">
            <h2 className="mb-1">Evaluación final</h2>
            <p className="mb-5 text-sm text-[var(--text-secondary)]">
              {course.finalQuizCount} preguntas (de un banco de {course.finalQuizBankSize}) · aprueba con 80% · {course.finalQuizAttempts} intentos.
            </p>
            <FinalQuiz
              courseId={course.id}
              unlocked={allLessonsDone}
              attemptsUsed={attemptsUsed}
              maxAttempts={course.finalQuizAttempts}
              passed={quizPassed}
              onFinish={handleQuizFinish}
            />
          </div>
        )}
      </div>
    </main>
  );
}
