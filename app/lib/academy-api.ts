"use client";

import { doc, getDoc, setDoc } from "firebase/firestore";
import { auth, db } from "@/lib/firebase";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "https://api.upvelara.com";

export interface MiniQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
  answer: number;
}

export interface FinalQuizQuestion {
  id: string;
  prompt: string;
  options: string[];
}

export interface AcademyLesson {
  id: string;
  moduleId: string;
  title: string;
  type: "video" | "reading" | "exercise" | "project" | "workshop";
  order: number;
  locked: boolean;
  videoUrl: string | null;
  content: string | null;
  miniQuiz: MiniQuizQuestion[] | null;
  phase?: string | null;
  quote?: string | null;
  references?: { label: string; url: string }[] | null;
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
  finalQuiz: FinalQuizQuestion[] | null;
  finalQuizCount: number;
  finalQuizBankSize: number;
  finalQuizAttempts: number;
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
  progress?: { completedLessons: string[]; quizScore: number | null; completed?: boolean };
}

// ─── Catalog (public API) ────────────────────────────────────────────────────

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

async function apiGet<T>(path: string): Promise<T> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  if (auth?.currentUser) Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}${path}`, { headers });
  if (!res.ok) throw new Error(`API ${res.status}: ${path}`);
  return res.json() as Promise<T>;
}

export async function getCourses(): Promise<{ count: number; totalLessons: number; courses: CourseSummary[] }> {
  return apiGet("/academy/courses");
}

export async function getCourse(slug: string): Promise<AcademyCourse> {
  const data = await apiGet<{ course: AcademyCourse }>(`/academy/courses/${slug}`);
  return data.course;
}

// ─── User data (Firestore client SDK — same path the API reads) ───────────────

function enrollmentsRef(uid: string) {
  return doc(db!, "users", uid, "tools", "academy-enrollments");
}
function progressRef(uid: string) {
  return doc(db!, "users", uid, "tools", "academy-progress");
}

export async function getEnrollments(): Promise<Enrollment[]> {
  const user = auth?.currentUser;
  if (!user || !db) return [];
  const snap = await getDoc(enrollmentsRef(user.uid));
  if (!snap.exists()) return [];
  const data = snap.data() as { courses?: Enrollment[] };
  return Array.isArray(data.courses) ? data.courses : [];
}

export async function getProgress(): Promise<Record<string, any>> {
  const user = auth?.currentUser;
  if (!user || !db) return {};
  const snap = await getDoc(progressRef(user.uid));
  if (!snap.exists()) return {};
  const data = snap.data() as { progress?: Record<string, any> };
  return data.progress && typeof data.progress === "object" ? data.progress : {};
}

export async function enroll(
  courseId: string
): Promise<{ enrolled: boolean; requiresPayment?: boolean; message?: string }> {
  const user = auth?.currentUser;
  if (!user || !db) return { enrolled: false, message: "Inicia sesión para inscribirte." };

  const ref = enrollmentsRef(user.uid);
  const snap = await getDoc(ref);
  const existing: Enrollment[] = snap.exists() ? ((snap.data() as any).courses ?? []) : [];
  if (existing.some((e) => e.courseId === courseId)) return { enrolled: true, message: "Ya estás inscrito." };

  const { courses } = await getCourses();
  const course = courses.find((c) => c.id === courseId || c.slug === courseId);
  if (!course) return { enrolled: false, message: "Curso no encontrado." };
  if (course.price > 0) {
    return { enrolled: false, requiresPayment: true, message: "Este curso requiere pago." };
  }

  const entry: Enrollment = {
    courseId: course.id,
    slug: course.slug,
    status: "active",
    purchased: false,
    source: "free",
    enrolledAt: new Date().toISOString(),
  };
  await setDoc(ref, { courses: [...existing, entry], updatedAt: new Date().toISOString() });
  return { enrolled: true };
}

export async function updateCourseProgress(courseId: string, patch: Record<string, any>): Promise<void> {
  const user = auth?.currentUser;
  if (!user || !db) return;
  const ref = progressRef(user.uid);
  const snap = await getDoc(ref);
  const progress: Record<string, any> = snap.exists() ? ((snap.data() as any).progress ?? {}) : {};
  progress[courseId] = {
    ...(progress[courseId] ?? { completedLessons: [] }),
    ...patch,
    updatedAt: new Date().toISOString(),
  };
  await setDoc(ref, { progress, updatedAt: new Date().toISOString() });
}

export async function markLessonComplete(
  courseId: string,
  lessonId: string
): Promise<{ ok: boolean; completedLessons: string[]; courseCompleted: boolean }> {
  const user = auth?.currentUser;
  if (!user || !db) throw new Error("Inicia sesión para guardar progreso.");

  const ref = progressRef(user.uid);
  const snap = await getDoc(ref);
  const progress: Record<string, any> = snap.exists() ? ((snap.data() as any).progress ?? {}) : {};
  const current = progress[courseId] ?? { completedLessons: [] };
  const completed: string[] = Array.isArray(current.completedLessons) ? [...current.completedLessons] : [];
  if (!completed.includes(lessonId)) completed.push(lessonId);

  progress[courseId] = {
    ...current,
    completedLessons: completed,
    updatedAt: new Date().toISOString(),
  };
  await setDoc(ref, { progress, updatedAt: new Date().toISOString() });

  return { ok: true, completedLessons: completed, courseCompleted: false };
}

export async function getFinalQuizSet(courseId: string): Promise<{
  count: number;
  bankSize: number;
  threshold: number;
  attemptsAllowed: number;
  timeLimitMinutes: number;
  questions: FinalQuizQuestion[];
}> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}/academy/quiz/${courseId}`, { headers });
  if (!res.ok) throw new Error(`Quiz fetch failed: ${res.status}`);
  return res.json();
}

export async function submitFinalQuiz(
  courseId: string,
  questionIds: string[],
  answers: Record<string, string>
): Promise<{
  score: number;
  correct: number;
  total: number;
  threshold: number;
  passed: boolean;
  credential: string | null;
  certificateId: string | null;
  review: { id: string; correct: boolean; answerText: string; explanation: string | null }[];
}> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}/academy/quiz/${courseId}`, {
    method: "POST",
    headers,
    body: JSON.stringify({ questionIds, answers }),
  });
  if (!res.ok) throw new Error(`Quiz submit failed: ${res.status}`);
  return res.json();
}

export async function getCertificate(id: string): Promise<{
  valid: boolean;
  id: string;
  name: string;
  credential: string;
  courseTitle: string | null;
  score: number | null;
  issuedAt: string | null;
}> {
  const res = await fetch(`${API_BASE}/academy/certificate/${id}`);
  if (!res.ok) throw new Error(`Certificate fetch failed: ${res.status}`);
  return res.json();
}

export interface MyCertificate {
  courseId: string;
  certificateId: string;
  courseTitle?: string;
  credential?: string;
  issuedAt?: string;
}

export async function getMyCertificates(): Promise<MyCertificate[]> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}/academy/certificates`, { headers });
  if (!res.ok) return [];
  const data = await res.json();
  return (data.certificates ?? []).map((c: any) => ({
    courseId: c.courseId,
    certificateId: c.id,
    courseTitle: c.courseTitle,
    credential: c.credential,
    issuedAt: c.issuedAt,
  }));
}

export async function claimCertificate(courseId: string, clientPassed = false): Promise<string | null> {
  const headers: Record<string, string> = { "Content-Type": "application/json" };
  Object.assign(headers, await authHeader());
  const res = await fetch(`${API_BASE}/academy/certificate/claim`, {
    method: "POST",
    headers,
    body: JSON.stringify({ courseId, clientPassed }),
  });
  if (!res.ok) return null;
  const data = await res.json().catch(() => ({}));
  return data.certificateId ?? null;
}

export function trackLabel(track: "A" | "B" | "C"): string {
  return { A: "AI Fluency", B: "Agent Automation", C: "Governance & Escala" }[track] ?? track;
}

export function priceLabel(course: { price: number; currency: string }): string {
  if (course.price === 0) return "Gratis";
  return `$${course.price} ${course.currency}`;
}
