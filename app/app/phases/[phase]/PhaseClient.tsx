"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLoopProject } from "@/lib/loop-project";
import { Phase, PHASE_ORDER } from "@/lib/phases";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function PhaseClient({ phase }: { phase: Phase }) {
  const { user } = useAuth();
  const { project, loading, saved, markPhaseComplete } = useLoopProject();
  const [draft, setDraft] = useState("");

  const completed = project?.completedPhases.includes(phase.id) ?? false;
  const savedAnswer = project?.deliverables?.[phase.id] ?? "";
  const answer = draft !== "" ? draft : savedAnswer;

  const handleComplete = async () => {
    if (!answer.trim()) return;
    await markPhaseComplete(phase.id, answer.trim());
    setDraft(answer.trim());
  };

  const isLast = phase.id === PHASE_ORDER[PHASE_ORDER.length - 1];

  return (
    <section className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
      <div className="mb-4 flex items-center justify-between">
        <h2>Your exercise</h2>
        {completed && (
          <span className="rounded-full bg-[var(--accent-green-muted)] px-2 py-0.5 text-xs font-semibold text-[var(--accent-green)]">
            ✓ Complete
          </span>
        )}
      </div>

      <p className="mb-4 text-[var(--text-secondary)]">{phase.exercise.prompt}</p>

      {!user ? (
        <div className="rounded-md border border-[var(--border-default)] bg-[var(--bg-surface-hover)] p-5 text-center">
          <p className="mb-3 text-sm text-[var(--text-secondary)]">
            Login with Google to save your {phase.exercise.outputLabel} and track progress.
          </p>
          <GoogleLoginButton className="mx-auto w-56" />
        </div>
      ) : (
        <>
          <label className="mb-1 block text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
            {phase.exercise.outputLabel}
          </label>
          <textarea
            value={answer}
            onChange={(e) => setDraft(e.target.value)}
            placeholder={phase.exercise.placeholder}
            rows={8}
            className="w-full resize-y rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] p-3 text-sm text-[var(--text-primary)] placeholder-[var(--text-disabled)] focus:border-[var(--brand-primary)] focus:outline-none"
          />
          <div className="mt-4 flex items-center justify-between gap-3">
            <span className="text-xs text-[var(--text-muted)]">
              {saved ? "Saved ✓" : "Saves to your project workspace"}
            </span>
            <button
              onClick={handleComplete}
              disabled={!answer.trim() || completed}
              className="btn-lift rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
            >
              {completed
                ? "Completed"
                : isLast
                ? "Complete the loop ✓"
                : `Complete ${phase.name}`}
            </button>
          </div>
        </>
      )}

      {completed && (
        <div className="mt-4 border-t border-[var(--border-default)] pt-4">
          <Link
            href="/project"
            className="text-sm font-medium text-[var(--brand-primary)] hover:text-[var(--brand-primary-hover)]"
          >
            View all your deliverables →
          </Link>
        </div>
      )}
      {loading && <div className="h-24 animate-pulse rounded-md bg-[var(--bg-surface-hover)]" />}
    </section>
  );
}
