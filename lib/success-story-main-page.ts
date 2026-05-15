import type { PublicSuccessStory, SuccessStoryKind } from "@/lib/success-story-public";
import { isTrainingTrack, normalizeTrainingTrack, type TrainingTrack } from "@/lib/success-story-training-options";

/** Query value for `/api/public/success-stories?mainPage=…` */
export const SUCCESS_STORY_MAIN_PAGE_HUBS = [
  "destinations",
  "services",
  "test-prep",
  "training-technical",
  "training-non-technical",
] as const;

export type SuccessStoryMainPageHub = (typeof SUCCESS_STORY_MAIN_PAGE_HUBS)[number];

const HUB_SET = new Set<string>(SUCCESS_STORY_MAIN_PAGE_HUBS);

export function isSuccessStoryMainPageHub(v: string): v is SuccessStoryMainPageHub {
  return HUB_SET.has(v);
}

export function mainPageHubLabel(hub: SuccessStoryMainPageHub): string {
  switch (hub) {
    case "destinations":
      return "Destinations main page";
    case "services":
      return "Services main page";
    case "test-prep":
      return "Test preparation main page";
    case "training-technical":
      return "Technical trainings main page";
    case "training-non-technical":
      return "Non-technical trainings main page";
    default:
      return "main page";
  }
}

export function mainPageCheckboxLabel(kind: SuccessStoryKind, trainingTrack?: string): string | null {
  if (kind === "destination") return `Show on ${mainPageHubLabel("destinations")}`;
  if (kind === "service") return `Show on ${mainPageHubLabel("services")}`;
  if (kind === "test_prep") return `Show on ${mainPageHubLabel("test-prep")}`;
  if (kind === "training") {
    const track = normalizeTrainingTrack(trainingTrack);
    if (track === "technical") return `Show on ${mainPageHubLabel("training-technical")}`;
    if (track === "non_technical") return `Show on ${mainPageHubLabel("training-non-technical")}`;
    return null;
  }
  return null;
}

export function supportsShowOnMainPageCheckbox(
  kind: SuccessStoryKind,
  trainingTrack?: string
): boolean {
  return mainPageCheckboxLabel(kind, trainingTrack) !== null;
}

/** Mongo filter for hub stories (`showOnMainPage` + kind/track). */
export function mongoFilterForMainPageHub(hub: SuccessStoryMainPageHub): Record<string, unknown> {
  const flagged = { showOnMainPage: { $in: [true, "true", "1", 1] } };
  switch (hub) {
    case "destinations":
      return { ...flagged, kind: { $in: ["destination", "destinations"] } };
    case "services":
      return { ...flagged, kind: { $in: ["service", "services"] } };
    case "test-prep":
      return { ...flagged, kind: { $in: ["test_prep", "test-prep", "test preparation"] } };
    case "training-technical":
      return {
        ...flagged,
        kind: { $regex: /^training$/i },
        trainingTrack: { $regex: /^technical$/i },
      };
    case "training-non-technical":
      return {
        ...flagged,
        kind: { $regex: /^training$/i },
        trainingTrack: { $regex: /^non[-_\s]?technical$/i },
      };
    default:
      return flagged;
  }
}

export function storyMatchesMainPageHub(story: PublicSuccessStory, hub: SuccessStoryMainPageHub): boolean {
  if (!story.showOnMainPage) return false;
  switch (hub) {
    case "destinations":
      return story.kind === "destination";
    case "services":
      return story.kind === "service";
    case "test-prep":
      return story.kind === "test_prep";
    case "training-technical":
      return story.kind === "training" && normalizeTrainingTrack(story.trainingTrack) === "technical";
    case "training-non-technical":
      return story.kind === "training" && normalizeTrainingTrack(story.trainingTrack) === "non_technical";
    default:
      return false;
  }
}

export function hubForStoryType(kind: SuccessStoryKind, trainingTrack?: string): SuccessStoryMainPageHub | null {
  if (kind === "destination") return "destinations";
  if (kind === "service") return "services";
  if (kind === "test_prep") return "test-prep";
  if (kind === "training") {
    const track = normalizeTrainingTrack(trainingTrack);
    if (track === "technical") return "training-technical";
    if (track === "non_technical") return "training-non-technical";
  }
  return null;
}

export function mainPageCarouselSubtitle(hub: SuccessStoryMainPageHub): string {
  switch (hub) {
    case "destinations":
      return "Students who chose Stack Learn for study abroad destinations.";
    case "services":
      return "Students who trusted Stack Learn for our study abroad services.";
    case "test-prep":
      return "Students who achieved their goals with Stack Learn test preparation.";
    case "training-technical":
      return "Learners who advanced their tech careers with Stack Learn.";
    case "training-non-technical":
      return "Learners who grew with Stack Learn specialized training programs.";
    default:
      return "Success stories from Stack Learn.";
  }
}
