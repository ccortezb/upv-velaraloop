"use client";

import { auth } from "@/lib/firebase";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.upvelara.com";

export interface AcademyLesson {
  id: string;
  moduleId: string;
  title: string;
  type: "video" | "reading" | "exercise";
  order: number;
  locked: boolean;
  videoUrl: string | null;
  content: string | null;
}

export interface AcademyCourse {
  id: string;
  slug: string;
  track: "A" | "B" | "C";
  title: string;
  tagline: string;
  level: "base" | "core" | "avanzado";
  price: number;
  currency: string;
  order: number;
  credential: string | null;
  locked: boolean;
  lessonCount: number;
  completedCount: number;
  lessons: AcademyLesson[];
}

export interface CourseSummary {
  id: string;
  slug: string;
  track: "A" | "B" | "C";
  title: string;
  tagline: string;
  level: string;
  price: number;
  currency: string;
  lessonCount: number;
  credential: string | null;
}

export interface Enrollment {
  courseId: string;
  slug: string;
  status: string;
  purchased: boolean;
  source: string;
  enrolledAt: string;
  progress: { completedLessons: string[]; quizScore: number | null; completed?: boolean };
}

async function authHeader(): Promise<Record<string, string>> {
  const user = auth?.currentUser;
  if (!user) return {};
  try {
    const token = await user.getIdToken();
    return { Authorization: `Bearer ${token}` };
  } catch {
    return {};
  }
}

async function apiGet<T>(path: string, authRequired = false): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (authRequired || auth?.currentUser) Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

async function apiPost<T>(path: string, body: unknown): Promise<{ ok: boolean; status: number; data: T }> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}${path}`, {
    method: "POST",
    headers,
    body: JSON.stringify(body),
  });
  const data = (await res.json().catch(() => ({}))) as T;
  return { ok: res.ok, status: res.status, data };
}

export async function getCourses(): Promise<{ count: number; totalLessons: number; courses: CourseSummary[] }> {
  return apiGet("/academy/courses");
}

export async function getCourse(slug: string): Promise<AcademyCourse> {
  const data = await apiGet<{ course: AcademyCourse }>(`/academy/courses/${slug}`);
  return data.course;
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const data = await apiGet<{ enrollments: Enrollment[] }>("/academy/enrollments", true);
  return data.enrollments;
}

export async function enroll(courseId: string) {
  return apiPost<{ enrolled: boolean; requiresPayment?: boolean; message?: string }>("/academy/enroll", {
    courseId,
  });
}

export async function markLessonComplete(courseId: string, lessonId: string) {
  return apiPost<{ ok: boolean; completedLessons: string[]; courseCompleted: boolean }>("/academy/progress", {
    courseId,
    lessonId,
  });
}

export function trackLabel(track: "A" | "B" | "C"): string {
  return { A: "AI Fluency", B: "Agent Automation", C: "Governance & Escala" }[track] ?? track;
}

export function priceLabel(course: { price: number; currency: string }): string {
  if (course.price === 0) return "Gratis";
  return `$${course.price} ${course.currency}`;
}
