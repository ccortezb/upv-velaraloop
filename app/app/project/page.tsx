"use client";

import { useState } from "react";
import Link from "next/link";
import { useAuth } from "@/lib/auth-context";
import { useLoopProject } from "@/lib/loop-project";
import { PHASE_ORDER, getPhase } from "@/lib/phases";
import LoopProgress from "@/components/LoopProgress";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function ProjectPage() {
  const { user } = useAuth();
  const { project, loading, saved, createProject, isComplete } = useLoopProject();
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleCreate = async () => {
    if (!name.trim()) return;
    await createProject(name.trim(), description.trim());
    setName("");
    setDescription("");
  };

  if (loading) {
    return (
      <main className="mx-auto max-w-4xl px-4 py-16">
        <div className="h-40 animate-pulse rounded-lg bg-[var(--bg-surface-hover)]" />
      </main>
    );
  }

  if (!user) {
    return (
      <main className="page-enter mx-auto max-w-xl px-4 py-24 text-center">
        <h1 className="mb-4">Your VelaraLoop Project</h1>
        <p className="mb-8 text-[var(--text-secondary)]">
          Login with Google to create a project, save deliverables for each phase, and track your
          progress around the loop.
        </p>
        <GoogleLoginButton className="mx-auto w-56" />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="page-enter mx-auto max-w-xl px-4 py-16">
        <h1 className="mb-2">Start your project</h1>
        <p className="mb-8 text-[var(--text-secondary)]">
          Give your project a name and a one-line description. Then walk the 6 phases — each one
          will ask you to fill in a real deliverable.
        </p>
        <div className="space-y-3 rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6">
          <input
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Project name (e.g. AI Expense Tracker)"
            className="w-full rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm placeholder-[var(--text-disabled)] focus:border-[var(--brand-primary)] focus:outline-none"
          />
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="One-line description"
            rows={2}
            className="w-full resize-none rounded-md border border-[var(--border-default)] bg-[var(--bg-base)] px-3 py-2 text-sm placeholder-[var(--text-disabled)] focus:border-[var(--brand-primary)] focus:outline-none"
          />
          <button
            onClick={handleCreate}
            disabled={!name.trim()}
            className="btn-lift w-full rounded-md bg-[var(--brand-primary)] px-4 py-2.5 text-sm font-semibold text-[var(--bg-base)] hover:bg-[var(--brand-primary-hover)] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Create project →
          </button>
        </div>
      </main>
    );
  }

  return (
    <main className="page-enter mx-auto max-w-4xl px-4 py-10">
      <div className="mb-8 flex flex-wrap items-start justify-between gap-4">
        <div>
          <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
            Project workspace
          </p>
          <h1>{project.name}</h1>
          {project.description && (
            <p className="mt-1 text-[var(--text-secondary)]">{project.description}</p>
          )}
        </div>
        <div className="w-full rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-4 sm:w-72">
          <LoopProgress completedPhases={project.completedPhases} />
        </div>
      </div>

      {isComplete && (
        <div className="scale-in mb-8 rounded-lg border border-[var(--accent-green)]/40 bg-[var(--accent-green-muted)] p-6 text-center">
          <h2 className="text-[var(--accent-green)]">🎉 You completed the VelaraLoop!</h2>
          <p className="mx-auto mt-2 max-w-xl text-sm text-[var(--text-secondary)]">
            You walked all 6 phases and produced a shippable project plan. You&apos;re now{" "}
            <span className="font-semibold text-[var(--text-primary)]">VelaraLoop Certified</span>.
            Share it on LinkedIn!
          </p>
        </div>
      )}

      <div className="grid gap-4 sm:grid-cols-2">
        {PHASE_ORDER.map((id) => {
          const phase = getPhase(id)!;
          const completedPhase = project.completedPhases.includes(id);
          const deliverable = project.deliverables[id];
          return (
            <Link
              key={id}
              href={`/phases/${id}`}
              className={`card-hover block rounded-lg border p-5 ${
                completedPhase
                  ? "border-[var(--accent-green)]/30 bg-[var(--bg-surface)]"
                  : "border-[var(--border-default)] bg-[var(--bg-surface)]"
              }`}
            >
              <div className="mb-2 flex items-center justify-between">
                <span className="font-semibold text-[var(--brand-primary)]">
                  {phase.number}. {phase.name}
                </span>
                {completedPhase ? (
                  <span className="text-[var(--accent-green)]">✓</span>
                ) : (
                  <span className="text-[var(--text-disabled)]">○</span>
                )}
              </div>
              <p className="text-xs text-[var(--text-secondary)]">{phase.tagline}</p>
              {deliverable ? (
                <p className="mt-3 line-clamp-2 text-sm text-[var(--text-secondary)]">
                  {deliverable}
                </p>
              ) : (
                <p className="mt-3 text-sm text-[var(--text-muted)]">
                  {completedPhase ? "" : "Not started yet — open this phase →"}
                </p>
              )}
            </Link>
          );
        })}
      </div>

      <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
        {saved ? "Saved ✓" : "Progress is saved automatically to your account."}
      </p>
    </main>
  );
}
