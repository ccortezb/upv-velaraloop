"use client";

import { useEffect, useState } from "react";
import type { MiniQuizQuestion } from "@/lib/academy-api";

export default function MiniQuiz({
  questions,
  onComplete,
}: {
  questions: MiniQuizQuestion[];
  onComplete?: (correct: number, total: number) => void;
}) {
  const [selected, setSelected] = useState<Record<string, number>>({});

  const answered = Object.keys(selected).length;
  const correct = questions?.filter((q) => selected[q.id] === q.answer).length ?? 0;
  const done = !!questions && questions.length > 0 && answered === questions.length;

  useEffect(() => {
    if (done && onComplete) onComplete(correct, questions.length);
  }, [done, correct, questions, onComplete]);

  if (!questions || questions.length === 0) return null;

  return (
    <div className="mt-8 rounded-lg border border-[var(--brand-primary-border)] bg-[var(--brand-primary-muted)] p-5">
      <div className="mb-4 flex items-center justify-between">
        <h4 className="text-sm font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
          Mini-quiz
        </h4>
        <span className="text-xs text-[var(--text-muted)]">
          {answered}/{questions.length}
        </span>
      </div>

      <div className="space-y-5">
        {questions.map((q, qi) => {
          const chosen = selected[q.id];
          const show = chosen !== undefined;
          return (
            <div key={q.id}>
              <p className="mb-2 text-sm font-medium text-[var(--text-primary)]">
                {qi + 1}. {q.prompt}
              </p>
              <div className="space-y-1.5">
                {q.options.map((opt, i) => {
                  const isAnswer = q.answer === i;
                  const isChosen = chosen === i;
                  let cls =
                    "border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-secondary)] hover:border-[var(--border-hover)]";
                  if (show && isAnswer) {
                    cls = "border-[var(--accent-green)]/50 bg-[var(--accent-green-muted)] text-[var(--accent-green)]";
                  } else if (show && isChosen && !isAnswer) {
                    cls = "border-red-500/50 bg-red-500/10 text-red-400";
                  } else if (show) {
                    cls = "border-[var(--border-default)] bg-[var(--bg-surface)] text-[var(--text-muted)]";
                  }
                  return (
                    <button
                      key={i}
                      disabled={show}
                      onClick={() => setSelected((s) => ({ ...s, [q.id]: i }))}
                      className={`block w-full rounded-md border px-3 py-2 text-left text-sm transition-colors ${cls} ${
                        show ? "cursor-default" : ""
                      }`}
                    >
                      {show && isAnswer ? "✓ " : show && isChosen ? "✗ " : ""}
                      {opt}
                    </button>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {done && (
        <p className="mt-4 text-sm font-semibold text-[var(--text-primary)]">
          Resultado: {correct}/{questions.length}{" "}
          {correct === questions.length ? "🎉 ¡Perfecto!" : "— repasa y sigue."}
        </p>
      )}
    </div>
  );
}
