"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { getCourses, trackLabel, priceLabel, type CourseSummary } from "@/lib/academy-api";

export default function CoursesPage() {
  const [courses, setCourses] = useState<CourseSummary[]>([]);
  const [totalLessons, setTotalLessons] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    getCourses()
      .then((data) => {
        setCourses(data.courses);
        setTotalLessons(data.totalLessons);
      })
      .catch(() => setError("No se pudo cargar el catálogo. Intenta de nuevo."))
      .finally(() => setLoading(false));
  }, []);

  return (
    <main className="page-enter mx-auto max-w-5xl px-4 py-12">
      <p className="mb-1 text-xs font-semibold uppercase tracking-widest text-[var(--brand-primary)]">
        VelaraLoop Academy
      </p>
      <h1 className="mb-2">Cursos on-demand</h1>
      <p className="mb-10 max-w-2xl text-[var(--text-secondary)]">
        Entiende la AI y domina los coding agents para automatizar tu trabajo. Sin codear. Sin miedo.{" "}
        <span className="text-[var(--text-primary)]">“No necesitas programar. Necesitas especificar.”</span>
      </p>

      {loading && (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {[0, 1, 2].map((i) => (
            <div key={i} className="h-52 animate-pulse rounded-xl bg-[var(--bg-surface-hover)]" />
          ))}
        </div>
      )}

      {error && (
        <div className="rounded-lg border border-[var(--border-default)] bg-[var(--bg-surface)] p-5 text-sm text-[var(--text-secondary)]">
          {error}
        </div>
      )}

      {!loading && !error && (
        <>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.slug}`}
                className="card-hover flex flex-col rounded-xl border border-[var(--border-default)] bg-[var(--bg-surface)] p-5"
              >
                <div className="mb-3 flex items-center justify-between">
                  <span className="rounded-md bg-[var(--brand-primary-muted)] px-2 py-0.5 text-xs font-medium text-[var(--brand-primary)]">
                    Track {course.track}
                  </span>
                  <span
                    className={`text-sm font-semibold ${
                      course.price === 0 ? "text-[var(--accent-green)]" : "text-[var(--text-primary)]"
                    }`}
                  >
                    {priceLabel(course)}
                  </span>
                </div>
                <h3 className="mb-1 text-[var(--text-primary)]">{course.title}</h3>
                <p className="mb-4 flex-1 text-sm text-[var(--text-secondary)]">{course.tagline}</p>
                <div className="flex items-center justify-between text-xs text-[var(--text-muted)]">
                  <span>{course.lessonCount} lecciones</span>
                  {course.credential && <span>🏅 Credential</span>}
                </div>
              </Link>
            ))}
          </div>

          <p className="mt-8 text-center text-xs text-[var(--text-muted)]">
            {courses.length} cursos · {totalLessons} lecciones · Track A gratis
          </p>
        </>
      )}
    </main>
  );
}
