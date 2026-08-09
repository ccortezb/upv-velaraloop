import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PHASES, getPhase, PHASE_ORDER } from "@/lib/phases";
import PhaseClient from "./PhaseClient";

export function generateStaticParams() {
  return PHASES.map((phase) => ({ phase: phase.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ phase: string }>;
}): Promise<Metadata> {
  const { phase } = await params;
  const data = getPhase(phase);
  if (!data) return {};
  return {
    title: `${data.name} — ${data.tagline} | VelaraLoop`,
  };
}

export default async function PhasePage({
  params,
}: {
  params: Promise<{ phase: string }>;
}) {
  const { phase: phaseId } = await params;
  const phase = getPhase(phaseId);
  if (!phase) notFound();

  const idx = phase.number - 1;
  const prev = idx > 0 ? PHASE_ORDER[idx - 1] : null;
  const next = idx < PHASE_ORDER.length - 1 ? PHASE_ORDER[idx + 1] : null;

  return (
    <main className="page-enter">
      <div className="border-b border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div className="mx-auto max-w-4xl px-4 py-8">
          <div className="mb-3 flex items-center gap-3">
            <Link
              href="/"
              className="text-sm text-[var(--text-secondary)] hover:text-[var(--text-primary)]"
            >
              ← VelaraLoop
            </Link>
            <span className="text-[var(--text-muted)]">/</span>
            <span className="text-sm font-medium text-[var(--brand-primary)]">
              Phase {phase.number}
            </span>
          </div>
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
                Phase {phase.number} of {PHASE_ORDER.length}
              </p>
              <h1 className="text-4xl">
                {phase.name}
                <span className="ml-3 text-lg font-normal text-[var(--text-secondary)]">
                  {phase.tagline}
                </span>
              </h1>
            </div>
          </div>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-10">
        <div className="grid gap-8 md:grid-cols-3">
          <div className="space-y-6 md:col-span-2">
            <section className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h2 className="mb-3 text-[var(--brand-primary)]">What you do</h2>
              <ul className="space-y-2 text-[var(--text-secondary)]">
                {phase.activities.map((a) => (
                  <li key={a} className="flex gap-2">
                    <span className="text-[var(--brand-primary)]">•</span>
                    {a}
                  </li>
                ))}
              </ul>
            </section>

            <section className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
              <h2 className="mb-2">AI assists you with</h2>
              <p className="text-[var(--text-secondary)]">{phase.aiAssists}</p>
            </section>

            <PhaseClient phase={phase} />
          </div>

          <aside className="space-y-4">
            <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Output
              </h3>
              <p className="text-sm text-[var(--text-primary)]">{phase.output}</p>
            </div>
            <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5">
              <h3 className="mb-2 text-xs font-semibold uppercase tracking-wide text-[var(--text-muted)]">
                Frameworks
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {phase.frameworks.map((f) => (
                  <span
                    key={f}
                    className="rounded-full bg-[var(--brand-primary-muted)] px-2 py-0.5 text-xs text-[var(--brand-primary)]"
                  >
                    {f}
                  </span>
                ))}
              </div>
            </div>
            {phase.exercise.toolUrl && (
              <a
                href={phase.exercise.toolUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="btn-lift block rounded-lg border border-[var(--brand-primary-border)] bg-[var(--brand-primary-muted)] p-5 text-sm font-medium text-[var(--brand-primary)]"
              >
                {phase.exercise.toolLabel}
              </a>
            )}
          </aside>
        </div>

        <div className="mt-10 flex items-center justify-between border-t border-[var(--border-default)] pt-6">
          {prev ? (
            <Link
              href={`/phases/${prev}`}
              className="rounded-md border border-[var(--border-default)] px-4 py-2 text-sm text-[var(--text-secondary)] hover:border-[var(--border-hover)]"
            >
              ← Phase {idx}: {getPhase(prev)?.name}
            </Link>
          ) : (
            <span />
          )}
          {next ? (
            <Link
              href={`/phases/${next}`}
              className="btn-lift rounded-md bg-[var(--brand-primary)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)]"
            >
              Phase {idx + 2}: {getPhase(next)?.name} →
            </Link>
          ) : (
            <Link
              href="/project"
              className="btn-lift rounded-md bg-[var(--accent-green)] px-4 py-2 text-sm font-semibold text-[var(--bg-base)]"
            >
              Finish → View my project
            </Link>
          )}
        </div>
      </div>
    </main>
  );
}
