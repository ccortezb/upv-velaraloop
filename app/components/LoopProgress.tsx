"use client";

import { PhaseId, PHASE_ORDER, getPhase } from "@/lib/phases";

export default function LoopProgress({ completedPhases }: { completedPhases: PhaseId[] }) {
  const pct = Math.round((completedPhases.length / PHASE_ORDER.length) * 100);

  return (
    <div>
      <div className="mb-2 flex items-center justify-between text-xs text-[var(--text-secondary)]">
        <span className="font-medium text-[var(--text-primary)]">
          {completedPhases.length}/{PHASE_ORDER.length} phases complete
        </span>
        <span>{pct}%</span>
      </div>
      <div className="flex gap-1">
        {PHASE_ORDER.map((id) => {
          const phase = getPhase(id)!;
          const done = completedPhases.includes(id);
          return (
            <div key={id} className="group relative flex-1">
              <div
                title={`${phase.number}. ${phase.name}`}
                className={`h-2 rounded-full transition-colors ${
                  done ? "bg-[var(--brand-primary)]" : "bg-[var(--bg-elevated)]"
                }`}
              />
              <div className="mt-1 text-center text-[10px] text-[var(--text-muted)]">
                {phase.number}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
