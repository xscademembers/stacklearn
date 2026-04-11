export interface CmsSectionField {
  key: string;
  label: string;
  value: string;
  type: "text" | "textarea" | "image";
}

export interface CmsPageSection {
  sectionKey: string;
  sectionLabel: string;
  fields: CmsSectionField[];
}

export interface CmsPageTemplate {
  key: string;
  label: string;
  defaultSections: CmsPageSection[];
}

export const CMS_PAGE_TEMPLATES: CmsPageTemplate[] = [
  {
    key: "home",
    label: "Home Page",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Main Heading", value: "", type: "text" },
          { key: "subheading", label: "Sub Heading", value: "", type: "text" },
          { key: "description", label: "Description", value: "", type: "textarea" },
          { key: "ctaText", label: "Primary CTA (Book counselling)", value: "", type: "text" },
          { key: "heroImage", label: "Hero Background Image URL", value: "", type: "image" },
        ],
      },
      {
        sectionKey: "stats",
        sectionLabel: "Statistics Bar",
        fields: [
          { key: "stat1Label", label: "Stat 1 Label", value: "", type: "text" },
          { key: "stat1Value", label: "Stat 1 Value", value: "", type: "text" },
          { key: "stat2Label", label: "Stat 2 Label", value: "", type: "text" },
          { key: "stat2Value", label: "Stat 2 Value", value: "", type: "text" },
          { key: "stat3Label", label: "Stat 3 Label", value: "", type: "text" },
          { key: "stat3Value", label: "Stat 3 Value", value: "", type: "text" },
          { key: "stat4Label", label: "Stat 4 Label", value: "", type: "text" },
          { key: "stat4Value", label: "Stat 4 Value", value: "", type: "text" },
        ],
      },
    ],
  },
  {
    key: "about",
    label: "About Us",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "kicker", label: "Small label above title", value: "About Us", type: "text" },
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "description", label: "Description", value: "", type: "textarea" },
          { key: "heroImage", label: "Hero Image URL", value: "", type: "image" },
        ],
      },
      {
        sectionKey: "mission",
        sectionLabel: "Mission & Vision",
        fields: [
          { key: "mission", label: "Mission Statement", value: "", type: "textarea" },
          { key: "vision", label: "Vision Statement", value: "", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "destinations",
    label: "Destinations Page",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "subheading", label: "Sub Heading", value: "", type: "text" },
        ],
      },
    ],
  },
  {
    key: "services",
    label: "Services Page",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "description", label: "Description", value: "", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "trainings",
    label: "Trainings Page",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "description", label: "Description", value: "", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "scholarships",
    label: "Scholarships Page",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "description", label: "Description", value: "", type: "textarea" },
        ],
      },
    ],
  },
  {
    key: "contact",
    label: "Contact Page",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "subheading", label: "Sub Heading", value: "", type: "text" },
          { key: "heroImage", label: "Hero Image URL", value: "", type: "image" },
        ],
      },
    ],
  },
  {
    key: "test-prep",
    label: "Test Preparation",
    defaultSections: [
      {
        sectionKey: "hero",
        sectionLabel: "Hero Section",
        fields: [
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "description", label: "Description", value: "", type: "textarea" },
        ],
      },
    ],
  },
];
