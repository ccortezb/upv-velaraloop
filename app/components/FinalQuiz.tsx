"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { getFinalQuizSet, submitFinalQuiz, type FinalQuizQuestion } from "@/lib/academy-api";

interface QuizResult {
  score: number;
  correct: number;
  total: number;
  threshold: number;
  passed: boolean;
  credential: string | null;
  certificateId: string | null;
  review: { id: string; correct: boolean; answerText: string; explanation: string | null }[];
}

export default function FinalQuiz({
  courseId,
  unlocked,
  attemptsUsed,
  maxAttempts,
  passed,
  onFinish,
}: {
  courseId: string;
  unlocked: boolean;
  attemptsUsed: number;
  maxAttempts: number;
  passed: boolean;
  onFinish?: (passed: boolean, score: number, certificateId: string | null) => void;
}) {
  const [questions, setQuestions] = useState<FinalQuizQuestion[]>([]);
  const [threshold, setThreshold] = useState(80);
  const [bankSize, setBankSize] = useState(0);
  const [answers, setAnswers] = useState<Record<string, string>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [secondsLeft, setSecondsLeft] = useState<number | null>(null);
  const submittedRef = useRef(false);

  const attemptsLeft = Math.max(0, maxAttempts - attemptsUsed);
  const canStart = unlocked && !passed && attemptsLeft > 0;
  const active = canStart && !result;

  const load = useCallback(async () => {
    setLoading(true);
    setError(null);
    submittedRef.current = false;
    try {
      const set = await getFinalQuizSet(courseId);
      setQuestions(set.questions);
      setThreshold(set.threshold);
      setBankSize(set.bankSize);
      setAnswers({});
      setResult(null);
      setSecondsLeft((set.timeLimitMinutes || 30) * 60);
    } catch {
      setError("No se pudo cargar el quiz final. Inicia sesión e intenta de nuevo.");
    } finally {
      setLoading(false);
    }
  }, [courseId]);

  useEffect(() => {
    if (canStart && questions.length === 0 && !loading && !error) load();
  }, [canStart, questions.length, loading, error, load]);

  const doSubmit = useCallback(async () => {
    if (submittedRef.current || questions.length === 0) return;
    submittedRef.current = true;
    setBusy(true);
    setError(null);
    try {
      const res = await submitFinalQuiz(courseId, questions.map((q) => q.id), answers);
      setResult(res);
      setSecondsLeft(null);
      onFinish?.(res.passed, res.score, res.certificateId);
    } catch {
      setError("No se pudo enviar el quiz. Intenta de nuevo.");
      submittedRef.current = false;
    } finally {
      setBusy(false);
    }
  }, [courseId, questions, answers, onFinish]);

  // Countdown timer
  useEffect(() => {
    if (!active || secondsLeft === null) return;
    if (secondsLeft <= 0) {
      doSubmit();
      return;
    }
    const t = setTimeout(() => setSecondsLeft((s) => (s === null ? null : s - 1)), 1000);
    return () => clearTimeout(t);
  }, [active, secondsLeft, doSubmit]);

  const mmss = (s: number) => `${String(Math.floor(s / 60)).padStart(2, "0")}:${String(s % 60).padStart(2, "0")}`;
  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = questions.length > 0 && answered === questions.length;
  const reviewById = new Map((result?.review ?? []).map((r) => [r.id, r]));

  // ── Locked ──
  if (!unlocked) {
    return (
      <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6 text-center">
        <p className="text-2xl">🔒</p>
        <h3 className="mt-2 text-[var(--text-primary)]">Quiz final bloqueado</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Completa todas las lecciones para desbloquear la evaluación final.
        </p>
      </div>
    );
  }

  // ── Passed ──
  if (passed) {
    const certId = result?.certificateId;
    return (
      <div className="rounded-lg border border-[var(--accent-green)]/40 bg-[var(--accent-green-muted)] p-6">
        <h3 className="mb-1 text-[var(--accent-green)]">🎉 ¡Aprobado!</h3>
        <p className="text-sm text-[var(--text-secondary)]">
          Completaste AI Fluency.
          {certId ? (
            <>
              {" "}
              <a
                href={`https://loop.upvelara.com/credential/?id=${certId}`}
                className="text-[var(--brand-primary)] hover:underline"
              >
                Ver tu certificado ({certId}) →
              </a>
            </>
          ) : null}
        </p>
      </div>
    );
  }

  // ── Attempts exhausted ──
  if (attemptsLeft === 0 && !result) {
    return (
      <div className="rounded-lg border border-red-500/40 bg-red-500/10 p-6 text-center">
        <h3 className="text-[var(--text-primary)]">Sin intentos disponibles</h3>
        <p className="mt-1 text-sm text-[var(--text-secondary)]">
          Usaste tus {maxAttempts} intentos. Escríbenos a sandra@upvelara.com para una revisión manual.
        </p>
      </div>
    );
  }

  // ── Result ──
  if (result) {
    return (
      <div
        className={`rounded-lg border p-6 ${
          result.passed
            ? "border-[var(--accent-green)]/40 bg-[var(--accent-green-muted)]"
            : "border-red-500/40 bg-red-500/10"
        }`}
      >
        <h3 className="mb-2 text-[var(--text-primary)]">
          {result.passed ? "🎉 ¡Aprobado!" : "Aún no apruebas"}
        </h3>
        <p className="mb-1 text-2xl font-bold text-[var(--text-primary)]">
          {result.score}%{" "}
          <span className="text-sm font-normal text-[var(--text-secondary)]">
            ({result.correct}/{result.total}) · umbral {result.threshold}%
          </span>
        </p>
        <p className="text-xs text-[var(--text-muted)]">
          Intentos usados: {attemptsUsed + 1}/{maxAttempts}
        </p>
        {result.passed && result.certificateId && (
          <p className="mt-3 text-sm">
            <a
              href={`https://loop.upvelara.com/credential/?id=${result.certificateId}`}
              className="text-[var(--brand-primary)] hover:underline"
            >
              Ver tu certificado ({result.certificateId}) →
            </a>
          </p>
        )}
        {!result.passed && attemptsLeft > 0 && (
          <button
            onClick={load}
            className="btn-lift mt-4 rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)]"
          >
            Usar otro intento ({attemptsLeft} restante{attemptsLeft === 1 ? "" : "s"})
          </button>
        )}
        <details className="mt-5">
          <summary className="cursor-pointer text-sm text-[var(--text-secondary)]">Ver revisión</summary>
          <div className="mt-3 space-y-2">
            {questions.map((q, i) => {
              const r = reviewById.get(q.id);
              return (
                <div key={q.id} className="rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 text-sm">
                  <p className="text-[var(--text-primary)]">
                    {r?.correct ? "✓" : "✗"} {i + 1}. {q.prompt}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">Correcta: {r?.answerText}</p>
                  {r?.explanation && <p className="mt-1 text-xs text-[var(--text-muted)]">{r.explanation}</p>}
                </div>
              );
            })}
          </div>
        </details>
      </div>
    );
  }

  // ── Active ──
  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <div className="mb-5 flex items-center justify-between gap-3">
        <div>
          <h3 className="text-[var(--text-primary)]">Quiz final</h3>
          <p className="text-xs text-[var(--text-muted)]">
            {questions.length} de {bankSize} preguntas · umbral {threshold}% · intento {attemptsUsed + 1}/{maxAttempts}
          </p>
        </div>
        {secondsLeft !== null && (
          <span
            className={`rounded-md px-3 py-1.5 font-mono text-sm font-semibold ${
              secondsLeft <= 120 ? "bg-red-500/15 text-red-400" : "bg-[var(--bg-base)] text-[var(--text-secondary)]"
            }`}
          >
            ⏱ {mmss(secondsLeft)}
          </span>
        )}
      </div>

      {loading && <div className="h-40 animate-pulse rounded-md bg-[var(--bg-surface-hover)]" />}
      {error && <p className="text-sm text-red-400">{error}</p>}

      <div className="space-y-5">
        {questions.map((q, qi) => (
          <div key={q.id}>
            <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">
              {qi + 1}. {q.prompt}
            </p>
            <div className="space-y-1.5">
              {q.options.map((opt) => {
                const isChosen = answers[q.id] === opt;
                return (
                  <button
                    key={opt}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: opt }))}
                    className={`block w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${
                      isChosen
                        ? "border-[var(--brand-primary)] bg-[var(--brand-primary-muted)] text-[var(--brand-primary)]"
                        : "border-[var(--border-default)] bg-[var(--bg-base)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
                    }`}
                  >
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      {!loading && questions.length > 0 && (
        <button
          onClick={doSubmit}
          disabled={busy}
          className="btn-lift mt-6 w-full rounded-md bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
        >
          {busy
            ? "Enviando…"
            : allAnswered
            ? "Enviar quiz final →"
            : `Enviar (${answered}/${questions.length} respondidas)`}
        </button>
      )}
    </div>
  );
}
