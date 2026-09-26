import type { Metadata } from "next";
import CourseClient from "./CourseClient";

const COURSE_SLUGS = ["ai-fluency", "agent-automation", "governance-escala"];

export function generateStaticParams() {
  return COURSE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const titles: Record<string, string> = {
    "ai-fluency": "AI Fluency — VelaraLoop Academy",
    "agent-automation": "Agent Automation — VelaraLoop Academy",
    "governance-escala": "Governance & Escala — VelaraLoop Academy",
  };
  return { title: titles[slug] ?? "Curso — VelaraLoop Academy" };
}

export default async function CoursePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <CourseClient slug={slug} />;
}
