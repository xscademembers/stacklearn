import type { CmsPageSection } from "@/lib/cms-page-templates";
import { getCmsField, parseCmsJson } from "@/lib/cms-merge-sections";
import {
  HOME_STUDY_ABROAD_POINTS,
  HOME_TRAINING_POINTS,
  HOME_STUDY_ABROAD_SERVICES,
  HOME_TRAINING_SERVICES,
  HOME_PROVEN_RESULTS,
  HOME_MORE_REASONS,
  HOME_DESTINATIONS,
  HOME_TRAINING_PROGRAMS,
  HOME_PROCESS_STEPS,
  HOME_SUCCESS_STORIES,
  HOME_FAQS,
  HOME_BLOGS,
  type TitleBody,
  type ServiceCard,
  type DestinationCard,
  type TrainingProgramCard,
  type ProcessStep,
  type SuccessStory,
  type FaqItem,
  type BlogCard,
  type ProvenResult,
  type MoreReason,
} from "@/lib/cms-home-content";

export function buildHomeCmsProps(sections: CmsPageSection[]) {
  return {
    howWeHelp: {
      titleLead: getCmsField(sections, "howWeHelp", "titleLead"),
      titleGradient: getCmsField(sections, "howWeHelp", "titleGradient"),
      intro1: getCmsField(sections, "howWeHelp", "intro1"),
      intro2: getCmsField(sections, "howWeHelp", "intro2"),
      tabStudyLabel: getCmsField(sections, "howWeHelp", "tabStudyLabel"),
      tabTrainingLabel: getCmsField(sections, "howWeHelp", "tabTrainingLabel"),
      footer: getCmsField(sections, "howWeHelp", "footer"),
      studyAbroadPoints: parseCmsJson<TitleBody[]>(
        getCmsField(sections, "howWeHelp", "studyAbroadPointsJson"),
        HOME_STUDY_ABROAD_POINTS
      ),
      trainingPoints: parseCmsJson<TitleBody[]>(
        getCmsField(sections, "howWeHelp", "trainingPointsJson"),
        HOME_TRAINING_POINTS
      ),
    },
    servicesOverview: {
      titleLead: getCmsField(sections, "servicesOverview", "titleLead"),
      titleGradient: getCmsField(sections, "servicesOverview", "titleGradient"),
      intro: getCmsField(sections, "servicesOverview", "intro"),
      tabStudyLabel: getCmsField(sections, "servicesOverview", "tabStudyLabel"),
      tabTrainingLabel: getCmsField(sections, "servicesOverview", "tabTrainingLabel"),
      studyAbroadServices: parseCmsJson<ServiceCard[]>(
        getCmsField(sections, "servicesOverview", "studyAbroadServicesJson"),
        HOME_STUDY_ABROAD_SERVICES
      ),
      trainingServices: parseCmsJson<ServiceCard[]>(
        getCmsField(sections, "servicesOverview", "trainingServicesJson"),
        HOME_TRAINING_SERVICES
      ),
    },
    whyChoose: {
      titleLead: getCmsField(sections, "whyChoose", "titleLead"),
      titleGradient: getCmsField(sections, "whyChoose", "titleGradient"),
      intro1: getCmsField(sections, "whyChoose", "intro1"),
      intro2: getCmsField(sections, "whyChoose", "intro2"),
      provenHeading: getCmsField(sections, "whyChoose", "provenHeading"),
      moreReasonsHeading: getCmsField(sections, "whyChoose", "moreReasonsHeading"),
      closing: getCmsField(sections, "whyChoose", "closing"),
      provenResults: parseCmsJson<ProvenResult[]>(
        getCmsField(sections, "whyChoose", "provenResultsJson"),
        HOME_PROVEN_RESULTS
      ),
      moreReasons: parseCmsJson<MoreReason[]>(
        getCmsField(sections, "whyChoose", "moreReasonsJson"),
        HOME_MORE_REASONS
      ),
    },
    popularDestinations: {
      titleLead: getCmsField(sections, "popularDestinations", "titleLead"),
      titleGradient: getCmsField(sections, "popularDestinations", "titleGradient"),
      subheading: getCmsField(sections, "popularDestinations", "subheading"),
      destinations: parseCmsJson<DestinationCard[]>(
        getCmsField(sections, "popularDestinations", "destinationsJson"),
        HOME_DESTINATIONS
      ),
    },
    popularTraining: {
      titleLead: getCmsField(sections, "popularTraining", "titleLead"),
      titleGradient: getCmsField(sections, "popularTraining", "titleGradient"),
      subheading: getCmsField(sections, "popularTraining", "subheading"),
      programs: parseCmsJson<TrainingProgramCard[]>(
        getCmsField(sections, "popularTraining", "programsJson"),
        HOME_TRAINING_PROGRAMS
      ),
    },
    process: {
      titleLead: getCmsField(sections, "process", "titleLead"),
      titleGradient: getCmsField(sections, "process", "titleGradient"),
      subheading: getCmsField(sections, "process", "subheading"),
      backgroundImage: getCmsField(sections, "process", "backgroundImage"),
      steps: parseCmsJson<ProcessStep[]>(
        getCmsField(sections, "process", "stepsJson"),
        HOME_PROCESS_STEPS
      ),
    },
    successStories: {
      titleLead: getCmsField(sections, "successStories", "titleLead"),
      titleGradient: getCmsField(sections, "successStories", "titleGradient"),
      subheading: getCmsField(sections, "successStories", "subheading"),
      stories: parseCmsJson<SuccessStory[]>(
        getCmsField(sections, "successStories", "storiesJson"),
        HOME_SUCCESS_STORIES
      ),
    },
    scholarshipPromo: {
      headingPrefix: getCmsField(sections, "scholarshipPromo", "headingPrefix"),
      headingHighlight: getCmsField(sections, "scholarshipPromo", "headingHighlight"),
      description: getCmsField(sections, "scholarshipPromo", "description"),
      ctaText: getCmsField(sections, "scholarshipPromo", "ctaText"),
      backgroundImage: getCmsField(sections, "scholarshipPromo", "backgroundImage"),
    },
    blogHighlights: {
      titleLead: getCmsField(sections, "blogHighlights", "titleLead"),
      titleGradient: getCmsField(sections, "blogHighlights", "titleGradient"),
      subheading: getCmsField(sections, "blogHighlights", "subheading"),
      viewAllLabel: getCmsField(sections, "blogHighlights", "viewAllLabel"),
      blogs: parseCmsJson<BlogCard[]>(
        getCmsField(sections, "blogHighlights", "blogsJson"),
        HOME_BLOGS
      ),
    },
    faq: {
      titleLead: getCmsField(sections, "faq", "titleLead"),
      titleGradient: getCmsField(sections, "faq", "titleGradient"),
      subheading: getCmsField(sections, "faq", "subheading"),
      notFoundPrompt: getCmsField(sections, "faq", "notFoundPrompt"),
      counsellorCta: getCmsField(sections, "faq", "counsellorCta"),
      faqs: parseCmsJson<FaqItem[]>(getCmsField(sections, "faq", "faqsJson"), HOME_FAQS),
    },
  };
}
