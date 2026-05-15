import {
  isSuccessStoryServiceSlug,
  serviceLabelForSlug,
} from "@/lib/success-story-service-options";
import {
  isSuccessStoryTestPrepSlug,
  testPrepLabelForSlug,
} from "@/lib/success-story-test-prep-options";

export type SuccessStoryKind =
  | "destination"
  | "service"
  | "test_prep"
  | "home"
  | "scholarships"
  | "training";

export type PublicSuccessStory = {
  _id: string;
  name: string;
  country: string;
  university: string;
  imageUrl: string;
  story: string;
  kind: SuccessStoryKind;
  serviceSlug: string;
  testPrepSlug: string;
  /** Sub-kind when `kind === "training"` (e.g. technical, study_abroad). */
  trainingTrack: string;
  trainingCourseSlug: string;
  /** Denormalized label for cards (set at save / serialize). */
  trainingDisplayLabel: string;
  /** When true, story appears on the hub/main listing page for its story type. */
  showOnMainPage: boolean;
  createdAt?: string;
  updatedAt?: string;
};

/** Subtitle line under the student name (carousel / cards). Safe for client bundles. */
export function successStoryMetaLine(story: PublicSuccessStory): string {
  if (story.kind === "service" && story.serviceSlug && isSuccessStoryServiceSlug(story.serviceSlug)) {
    const label = serviceLabelForSlug(story.serviceSlug);
    return [story.university, label].filter(Boolean).join(" · ") || label;
  }
  if (story.kind === "test_prep" && story.testPrepSlug && isSuccessStoryTestPrepSlug(story.testPrepSlug)) {
    const label = testPrepLabelForSlug(story.testPrepSlug);
    return label;
  }
  if (story.kind === "home") return "Home";
  if (story.kind === "scholarships") return "Scholarships";
  if (story.kind === "training") {
    return (story.trainingDisplayLabel || "").trim() || "Training";
  }
  return [story.university, story.country].filter(Boolean).join(" · ") || "—";
}
