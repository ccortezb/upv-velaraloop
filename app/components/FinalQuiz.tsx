"use client";

import { useState } from "react";
import { submitFinalQuiz, type FinalQuizQuestion } from "@/lib/academy-api";

interface QuizResult {
  score: number;
  correct: number;
  total: number;
  threshold: number;
  passed: boolean;
  credential: string | null;
  review: { id: string; correct: boolean; answer: number; explanation: string | null }[];
}

export default function FinalQuiz({
  courseId,
  questions,
}: {
  courseId: string;
  questions: FinalQuizQuestion[];
}) {
  const [answers, setAnswers] = useState<Record<string, number>>({});
  const [result, setResult] = useState<QuizResult | null>(null);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState<string | null>(null);

  if (!questions || questions.length === 0) return null;

  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const allAnswered = answered === questions.length;
  const reviewById = new Map((result?.review ?? []).map((r) => [r.id, r]));

  const submit = async () => {
    setBusy(true);
    setError(null);
    try {
      const res = await submitFinalQuiz(courseId, answers);
      setResult(res);
      window.scrollTo({ top: 0, behavior: "smooth" });
    } catch {
      setError("No se pudo enviar el quiz. Inicia sesión e intenta de nuevo.");
    } finally {
      setBusy(false);
    }
  };

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
        {result.passed ? (
          <p className="mt-2 text-sm text-[var(--text-secondary)]">
            Completaste AI Fluency.{" "}
            <a href="https://loop.upvelara.com/credential/?credential=ai-fluency" className="text-[var(--brand-primary)] hover:underline">
              Ver tu credential →
            </a>
          </p>
        ) : (
          <button
            onClick={() => {
              setResult(null);
              setAnswers({});
            }}
            className="btn-lift mt-4 rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)]"
          >
            Intentar de nuevo
          </button>
        )}

        <details className="mt-5">
          <summary className="cursor-pointer text-sm text-[var(--text-secondary)]">
            Ver revisión ({result.total} preguntas)
          </summary>
          <div className="mt-3 space-y-2">
            {questions.map((q, i) => {
              const r = reviewById.get(q.id);
              return (
                <div key={q.id} className="rounded-md border border-[var(--border-default)] bg-[var(--bg-surface)] p-3 text-sm">
                  <p className="text-[var(--text-primary)]">
                    {r?.correct ? "✓" : "✗"} {i + 1}. {q.prompt}
                  </p>
                  <p className="mt-1 text-xs text-[var(--text-secondary)]">
                    Respuesta correcta: {q.options[r?.answer ?? 0]}
                  </p>
                  {r?.explanation && (
                    <p className="mt-1 text-xs text-[var(--text-muted)]">{r.explanation}</p>
                  )}
                </div>
              );
            })}
          </div>
        </details>
      </div>
    );
  }

  return (
    <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <div className="mb-5 flex items-center justify-between">
        <div>
          <h3 className="text-[var(--text-primary)]">Quiz final</h3>
          <p className="text-xs text-[var(--text-muted)]">
            {questions.length} preguntas · aprueba con 80% para el credential
          </p>
        </div>
        <span className="text-xs text-[var(--text-muted)]">
          {answered}/{questions.length}
        </span>
      </div>

      <div className="space-y-5">
        {questions.map((q, qi) => (
          <div key={q.id}>
            <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">
              {qi + 1}. {q.prompt}
            </p>
            <div className="space-y-1.5">
              {q.options.map((opt, i) => {
                const isChosen = answers[q.id] === i;
                return (
                  <button
                    key={i}
                    onClick={() => setAnswers((a) => ({ ...a, [q.id]: i }))}
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

      {error && <p className="mt-4 text-sm text-red-400">{error}</p>}

      <button
        onClick={submit}
        disabled={!allAnswered || busy}
        className="btn-lift mt-6 w-full rounded-md bg-[var(--brand-primary)] px-4 py-3 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
      >
        {busy ? "Enviando…" : allAnswered ? "Enviar quiz final →" : `Responde las ${questions.length} preguntas`}
      </button>
    </div>
  );
}
