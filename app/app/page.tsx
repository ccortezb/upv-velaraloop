import Link from "next/link";
import { PHASES } from "@/lib/phases";
import GoogleLoginButton from "@/components/GoogleLoginButton";

export default function Home() {
  return (
    <main className="page-enter">
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-[var(--border-default)]">
        <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(155,127,191,0.12),transparent_60%)]" />
        <div className="relative mx-auto max-w-6xl px-4 py-24 text-center">
          <p className="mb-4 inline-block rounded-full border border-[var(--brand-primary-border)] bg-[var(--brand-primary-muted)] px-3 py-1 text-xs font-medium text-[var(--brand-primary)]">
            loop.upvelara.com
          </p>
          <h1 className="mx-auto max-w-3xl text-4xl md:text-6xl">
            Ship real products with the{" "}
            <span className="text-[var(--brand-primary)]">VelaraLoop</span>
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg text-[var(--text-secondary)]">
            Not a course — a guided experience. Walk through 6 phases, fill in the exercises, and
            walk out with a real, shippable project plan powered by AI coding agents.
          </p>
          <div className="mt-10 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <GoogleLoginButton className="w-56">Try VelaraLoop →</GoogleLoginButton>
            <a
              href="#phases"
              className="w-56 rounded-md border border-[var(--border-default)] px-5 py-2.5 text-sm font-semibold text-[var(--text-secondary)] hover:border-[var(--border-hover)] sm:w-auto"
            >
              See the 6 phases
            </a>
          </div>
        </div>
      </section>

      {/* Loop visual */}
      <section id="phases" className="mx-auto max-w-6xl px-4 py-16">
        <h2 className="mb-2 text-center">The 6 Phases</h2>
        <p className="mb-10 text-center text-[var(--text-secondary)]">
          DISCOVER → DEFINE → BUILD → SHIP → GOVERN → LEARN — then the loop closes.
        </p>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {PHASES.map((phase) => (
            <Link
              key={phase.id}
              href={`/phases/${phase.id}`}
              className="card-hover block rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-6"
            >
              <div className="mb-3 flex items-center justify-between">
                <span className="text-2xl font-bold text-[var(--brand-primary)]">
                  {phase.number}
                </span>
                <span className="rounded-full bg-[var(--brand-primary-muted)] px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-[var(--brand-primary)]">
                  {phase.name}
                </span>
              </div>
              <h3 className="mb-2">{phase.tagline}</h3>
              <p className="text-sm leading-relaxed text-[var(--text-secondary)]">{phase.summary}</p>
              <p className="mt-4 text-sm font-medium text-[var(--brand-primary)]">
                Output: {phase.output}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* How it works */}
      <section className="border-t border-[var(--border-default)] bg-[var(--bg-surface)]">
        <div className="mx-auto grid max-w-6xl gap-10 px-4 py-16 md:grid-cols-2">
          <div>
            <h2 className="mb-4">How it works</h2>
            <ol className="space-y-3 text-[var(--text-secondary)]">
              <li>
                <span className="font-semibold text-[var(--text-primary)]">1.</span> Login with
                Gmail
              </li>
              <li>
                <span className="font-semibold text-[var(--text-primary)]">2.</span> Pick a project
                (real or practice)
              </li>
              <li>
                <span className="font-semibold text-[var(--text-primary)]">3.</span> Walk through
                the 6 phases, guided
              </li>
              <li>
                <span className="font-semibold text-[var(--text-primary)]">4.</span> Each phase
                produces a real deliverable
              </li>
              <li>
                <span className="font-semibold text-[var(--text-primary)]">5.</span> Finish with a
                shippable project plan + badge
              </li>
            </ol>
          </div>
          <div>
            <h2 className="mb-4">For</h2>
            <ul className="grid grid-cols-1 gap-2 text-[var(--text-secondary)] sm:grid-cols-2">
              <li className="rounded-md border border-[var(--border-default)] p-3">
                Product Owners
              </li>
              <li className="rounded-md border border-[var(--border-default)] p-3">
                Product Managers
              </li>
              <li className="rounded-md border border-[var(--border-default)] p-3">Founders</li>
              <li className="rounded-md border border-[var(--border-default)] p-3">
                Solo builders
              </li>
              <li className="rounded-md border border-[var(--border-default)] p-3">
                Consultants
              </li>
            </ul>
          </div>
        </div>
      </section>

      <footer className="border-t border-[var(--border-default)] py-8 text-center text-sm text-[var(--text-muted)]">
        VelaraLoop by <a href="https://upvelara.com" className="text-[var(--brand-primary)]">UpVelara</a> ·
        Learn the framework at{" "}
        <a href="https://upvelara.com/velaraloop" className="text-[var(--brand-primary)]">
          upvelara.com/velaraloop
        </a>
      </footer>
    </main>
  );
}
