import { technicalCourses } from "@/lib/technical-courses-data";
import { nonTechnicalCourses } from "@/lib/non-technical-courses-data";

export const TRAINING_TRACK_OPTIONS = [
  { value: "technical", label: "Technical Trainings" },
  { value: "non_technical", label: "Non-Technical Trainings" },
  { value: "study_abroad", label: "Study Abroad Trainings" },
  { value: "corporate", label: "Corporate Trainings" },
] as const;

export type TrainingTrack = (typeof TRAINING_TRACK_OPTIONS)[number]["value"];

const TRACK_SET = new Set<string>(TRAINING_TRACK_OPTIONS.map((t) => t.value));

export function isTrainingTrack(v: string): v is TrainingTrack {
  return TRACK_SET.has(v);
}

export const ADMIN_TRAINING_TECHNICAL_COURSES = technicalCourses.map((c) => ({
  slug: c.slug,
  label: c.shortTitle || c.title,
}));

export const ADMIN_TRAINING_NON_TECHNICAL_COURSES = nonTechnicalCourses.map((c) => ({
  slug: c.slug,
  label: c.shortTitle || c.title,
}));

export function isValidTrainingCourseForTrack(track: TrainingTrack, courseSlug: string): boolean {
  const s = courseSlug.trim();
  if (!s) return false;
  if (track === "technical") return technicalCourses.some((c) => c.slug === s);
  if (track === "non_technical") return nonTechnicalCourses.some((c) => c.slug === s);
  return false;
}

/** Shown under the student name on cards/carousels; stored in Mongo for client-safe display. */
export function computeTrainingDisplayLabel(track: TrainingTrack, courseSlug: string): string {
  if (track === "study_abroad") return "Study Abroad Trainings";
  if (track === "corporate") return "Corporate Trainings";
  if (track === "technical") {
    const c = technicalCourses.find((x) => x.slug === courseSlug.trim());
    return c?.shortTitle || c?.title || courseSlug.trim();
  }
  if (track === "non_technical") {
    const c = nonTechnicalCourses.find((x) => x.slug === courseSlug.trim());
    return c?.shortTitle || c?.title || courseSlug.trim();
  }
  return "";
}
