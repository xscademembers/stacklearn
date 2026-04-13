/** Default structured content for the About page CMS. */

export const DEFAULT_ABOUT_INTRO =
  "At StackLearn, we started with a simple observation: many students go abroad with big dreams — but without the right preparation to succeed once they get there. Getting into a university is only the first step. Building a career in a competitive global environment is the real challenge. That's where we come in.";

export const DEFAULT_ABOUT_FALLBACK_HEADING = `More Than Just Study Abroad — We Build Global Careers`;

export const ABOUT_GAP_PROBLEMS: string[] = [
  "Lack of practical skills",
  "No real project experience",
  "Difficulty competing in job markets",
];

export type AboutApproachItem = {
  title: string;
  body: string;
  bullets?: string[];
};

export const ABOUT_APPROACH: AboutApproachItem[] = [
  {
    title: "Clarity First",
    body: "We help you choose the right country, course, and path based on your goals — not trends.",
  },
  {
    title: "End-to-End Guidance",
    body: "From applications and SOPs to visa support, we guide you through every step.",
  },
  {
    title: "Skill Before You Go",
    body: "We train you in real-world, in-demand technologies so you’re ready before you land abroad.",
    bullets: ["Data Science", "AI & Machine Learning", "Software Development"],
  },
  {
    title: "Career-Focused Preparation",
    body: "We help you build projects, portfolios, and confidence so you’re ready for opportunities abroad.",
  },
];

export const ABOUT_WHO_WE_WORK_WITH: string[] = [
  "Students planning to study abroad",
  "Graduates who want to strengthen their profile",
  "Individuals aiming for global tech careers",
];

export type AboutDiffItem = { title: string; body: string };

export const ABOUT_MAKES_US_DIFFERENT: AboutDiffItem[] = [
  {
    title: "Education guidance",
    body: "Right country, course, and university — with honest counselling.",
  },
  {
    title: "Technical training",
    body: "In-demand skills and real project experience before you go.",
  },
  {
    title: "Career readiness",
    body: "Portfolios, interview confidence, and a path to global opportunities.",
  },
];

function j<T>(v: T): string {
  return JSON.stringify(v, null, 2);
}

export const ABOUT_JSON = {
  gapProblems: j(ABOUT_GAP_PROBLEMS),
  approach: j(ABOUT_APPROACH),
  whoWeWorkWith: j(ABOUT_WHO_WE_WORK_WITH),
  makesUsDifferent: j(ABOUT_MAKES_US_DIFFERENT),
} as const;
