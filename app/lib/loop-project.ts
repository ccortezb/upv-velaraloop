"use client";

import { useEffect, useState, useCallback } from "react";
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useAuth } from "@/lib/auth-context";
import { PhaseId, PHASE_ORDER } from "@/lib/phases";

export interface LoopProject {
  id: string;
  name: string;
  description: string;
  createdAt: string;
  updatedAt: string;
  completedPhases: PhaseId[];
  deliverables: Record<string, string>;
}

export const FIRESTORE_KEY = "velaraloop-project";

export function useLoopProject() {
  const { user } = useAuth();
  const [project, setProject] = useState<LoopProject | null>(null);
  const [loading, setLoading] = useState(true);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    async function load() {
      if (user && db) {
        try {
          const docRef = doc(db, "users", user.uid, "tools", FIRESTORE_KEY);
          const snap = await getDoc(docRef);
          if (snap.exists()) {
            setProject(snap.data() as LoopProject);
          } else {
            const stored = localStorage.getItem(FIRESTORE_KEY);
            if (stored) setProject(JSON.parse(stored));
          }
        } catch (e) {
          console.log("Failed to load project:", e);
        }
      }
      setLoading(false);
    }
    load();
  }, [user]);

  const save = useCallback(
    async (next: LoopProject) => {
      setProject(next);
      setSaved(true);
      localStorage.setItem(FIRESTORE_KEY, JSON.stringify(next));
      if (user && db) {
        try {
          const docRef = doc(db, "users", user.uid, "tools", FIRESTORE_KEY);
          await setDoc(docRef, next);
        } catch (e) {
          console.log("Failed to save to Firestore:", e);
        }
      }
      setTimeout(() => setSaved(false), 1500);
    },
    [user]
  );

  const createProject = useCallback(
    async (name: string, description: string) => {
      const now = new Date().toISOString();
      const next: LoopProject = {
        id: `${user?.uid ?? "anon"}-${Date.now()}`,
        name,
        description,
        createdAt: now,
        updatedAt: now,
        completedPhases: [],
        deliverables: {},
      };
      await save(next);
    },
    [user, save]
  );

  const markPhaseComplete = useCallback(
    async (phase: PhaseId, deliverable: string) => {
      if (!project) return;
      const completedPhases = project.completedPhases.includes(phase)
        ? project.completedPhases
        : [...project.completedPhases, phase];
      await save({
        ...project,
        completedPhases,
        deliverables: { ...project.deliverables, [phase]: deliverable },
        updatedAt: new Date().toISOString(),
      });
    },
    [project, save]
  );

  const isComplete = project?.completedPhases.length === PHASE_ORDER.length;

  return { project, loading, saved, createProject, markPhaseComplete, isComplete };
}
