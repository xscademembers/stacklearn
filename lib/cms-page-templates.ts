import { HOME_JSON } from "@/lib/cms-home-content";
import { ABOUT_JSON, DEFAULT_ABOUT_INTRO } from "@/lib/cms-about-content";
import { SERVICES_CMS_JSON } from "@/lib/cms-services-content";

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
      {
        sectionKey: "howWeHelp",
        sectionLabel: "How We Help You",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "How", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "We Help You",
            type: "text",
          },
          {
            key: "intro1",
            label: "Intro paragraph 1",
            value:
              "Planning your future—whether it's studying abroad or building a successful career—can feel overwhelming. From choosing the right university or course to gaining practical skills and securing opportunities, the process requires the right guidance at every step.",
            type: "textarea",
          },
          {
            key: "intro2",
            label: "Intro paragraph 2",
            value:
              "At StackLearn, we provide structured, end-to-end support for both international education and job-oriented training, making your journey simple, clear, and result-driven.",
            type: "textarea",
          },
          {
            key: "tabStudyLabel",
            label: "Tab: Study abroad",
            value: "Study Abroad Support",
            type: "text",
          },
          {
            key: "tabTrainingLabel",
            label: "Tab: Training",
            value: "Training Support",
            type: "text",
          },
          {
            key: "studyAbroadPointsJson",
            label: "Study abroad points (JSON array of {title, body})",
            value: HOME_JSON.studyAbroadPoints,
            type: "textarea",
          },
          {
            key: "trainingPointsJson",
            label: "Training points (JSON array of {title, body})",
            value: HOME_JSON.trainingPoints,
            type: "textarea",
          },
          {
            key: "footer",
            label: "Closing line below grid",
            value:
              "From your first counselling session to your first day on campus, StackLearn stands as your trusted study abroad consultancy partner at every step.",
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "servicesOverview",
        sectionLabel: "Our Services (overview)",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "Our", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Services",
            type: "text",
          },
          {
            key: "intro",
            label: "Intro paragraph",
            value:
              "Complete education and career solutions designed to support you at every stage—from learning in-demand skills to achieving your study abroad goals.",
            type: "textarea",
          },
          {
            key: "tabStudyLabel",
            label: "Tab: Study abroad services",
            value: "Study Abroad Services",
            type: "text",
          },
          {
            key: "tabTrainingLabel",
            label: "Tab: Training services",
            value: "Training Services",
            type: "text",
          },
          {
            key: "studyAbroadServicesJson",
            label:
              "Study abroad service cards (JSON: icon FiUser|FiFileText|…, title, description, href)",
            value: HOME_JSON.studyAbroadServices,
            type: "textarea",
          },
          {
            key: "trainingServicesJson",
            label: "Training service cards (JSON, same shape)",
            value: HOME_JSON.trainingServices,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "whyChoose",
        sectionLabel: "Why Choose StackLearn",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "Why Choose", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "StackLearn",
            type: "text",
          },
          {
            key: "intro1",
            label: "Intro paragraph 1",
            value:
              "Choosing the right partner for your education and career journey can make all the difference. Whether you're planning to study abroad or build in-demand skills through training, the process can feel overwhelming, but you don't have to do it alone.",
            type: "textarea",
          },
          {
            key: "intro2",
            label: "Intro paragraph 2",
            value:
              "At StackLearn, we provide complete support for both international education and job-oriented training, helping students confidently achieve their academic and career goals.",
            type: "textarea",
          },
          {
            key: "provenHeading",
            label: "Subheading: Proven results",
            value: "Proven Results You Can Trust",
            type: "text",
          },
          {
            key: "provenResultsJson",
            label: "Proven results cards (JSON {heading, body}[])",
            value: HOME_JSON.provenResults,
            type: "textarea",
          },
          {
            key: "moreReasonsHeading",
            label: "Subheading: More reasons",
            value: "More Reasons Students Choose StackLearn",
            type: "text",
          },
          {
            key: "moreReasonsJson",
            label: "More reasons (JSON {strong, rest}[])",
            value: HOME_JSON.moreReasons,
            type: "textarea",
          },
          {
            key: "closing",
            label: "Closing paragraph",
            value:
              "From choosing the right path to achieving your final goal, StackLearn stands as your trusted partner in building a successful future.",
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "popularDestinations",
        sectionLabel: "Popular Destinations (carousel)",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "Popular", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Destinations",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value: "Explore top study destinations around the world",
            type: "textarea",
          },
          {
            key: "destinationsJson",
            label:
              "Cards (JSON: name, image, flag, highlights[], href)",
            value: HOME_JSON.destinations,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "popularTraining",
        sectionLabel: "Popular Training Programs",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "Popular", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Training Programs",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value: "Build in-demand skills with our job-oriented training programs.",
            type: "textarea",
          },
          {
            key: "programsJson",
            label: "Programs (JSON: title, description, href, image)",
            value: HOME_JSON.trainingPrograms,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "process",
        sectionLabel: "How It Works",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "How It", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Works",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value: "Simple steps to your study abroad journey",
            type: "textarea",
          },
          {
            key: "backgroundImage",
            label: "Background image URL",
            value:
              "https://images.pexels.com/photos/3184360/pexels-photo-3184360.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
          {
            key: "stepsJson",
            label: "Steps (JSON: icon FiUser|FiSearch|FiFileText, title, description)",
            value: HOME_JSON.processSteps,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "successStories",
        sectionLabel: "Success Stories",
        fields: [
          { key: "titleLead", label: "Heading (before gradient)", value: "Success", type: "text" },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Stories",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value: "Real students, real success stories",
            type: "text",
          },
          {
            key: "storiesJson",
            label:
              "Stories (JSON: name, destination, university, course, quote, image)",
            value: HOME_JSON.successStories,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "scholarshipPromo",
        sectionLabel: "Scholarship promotion band",
        fields: [
          {
            key: "headingPrefix",
            label: "Heading (before highlighted amount)",
            value: "Apply for Scholarships worth ",
            type: "text",
          },
          {
            key: "headingHighlight",
            label: "Highlighted amount (styled accent)",
            value: "₹10L+",
            type: "text",
          },
          {
            key: "description",
            label: "Description",
            value:
              "Find scholarships that match your profile and make your study abroad journey affordable.",
            type: "textarea",
          },
          {
            key: "ctaText",
            label: "Button label",
            value: "Check Eligibility",
            type: "text",
          },
          {
            key: "backgroundImage",
            label: "Background image URL",
            value:
              "https://images.pexels.com/photos/1205651/pexels-photo-1205651.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
        ],
      },
      {
        sectionKey: "blogHighlights",
        sectionLabel: "Blog highlights",
        fields: [
          {
            key: "titleLead",
            label: "Heading (before gradient)",
            value: "Latest Resources &",
            type: "text",
          },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Insights",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value: "Expert tips, student experiences, and global education updates",
            type: "text",
          },
          {
            key: "blogsJson",
            label: "Cards (JSON: title, excerpt, image, href)",
            value: HOME_JSON.blogs,
            type: "textarea",
          },
          {
            key: "viewAllLabel",
            label: "View all button",
            value: "View All Articles",
            type: "text",
          },
        ],
      },
      {
        sectionKey: "faq",
        sectionLabel: "FAQ",
        fields: [
          {
            key: "titleLead",
            label: "Heading (before gradient)",
            value: "Frequently Asked",
            type: "text",
          },
          {
            key: "titleGradient",
            label: "Heading (gradient part)",
            value: "Questions",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value:
              "Find answers to the most common queries students ask before studying abroad.",
            type: "textarea",
          },
          {
            key: "faqsJson",
            label: "FAQs (JSON {question, answer}[] — show up to 10, split on desktop)",
            value: HOME_JSON.faqs,
            type: "textarea",
          },
          {
            key: "notFoundPrompt",
            label: "Text above contact button",
            value: "Didn’t find your question?",
            type: "text",
          },
          {
            key: "counsellorCta",
            label: "Contact button label",
            value: "Talk to a Counsellor",
            type: "text",
          },
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
          {
            key: "description",
            label: "Description",
            value: "",
            type: "textarea",
          },
          {
            key: "fallbackIntro",
            label: "Fallback intro if description empty",
            value: DEFAULT_ABOUT_INTRO,
            type: "textarea",
          },
          { key: "heroImage", label: "Hero Image URL", value: "", type: "image" },
          {
            key: "ctaText",
            label: "Hero button text",
            value: "Start Your Journey",
            type: "text",
          },
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
      {
        sectionKey: "whatWeDo",
        sectionLabel: "What We Do",
        fields: [
          {
            key: "heading",
            label: "Heading",
            value: "What We Do",
            type: "text",
          },
          {
            key: "intro",
            label: "Intro paragraph",
            value:
              "We combine overseas education consultancy with practical technical training to help students not just study abroad — but actually thrive there. From choosing the right university to building job-ready skills, we support students through the complete journey, acting as one of the best study abroad consultants in India for tech-focused global careers.",
            type: "textarea",
          },
          {
            key: "card1",
            label: "Left card text",
            value:
              "We guide your overseas education decisions with clarity and transparency — so you pick what’s right for your long-term goals.",
            type: "textarea",
          },
          {
            key: "card2",
            label: "Right card text",
            value:
              "We prepare you for global opportunities with hands-on skills, real projects, and career-ready confidence.",
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "whyExists",
        sectionLabel: "Why StackLearn Exists",
        fields: [
          {
            key: "heading",
            label: "Heading",
            value: "Why StackLearn Exists",
            type: "text",
          },
          {
            key: "intro",
            label: "Intro paragraph",
            value:
              "Traditional consultancies focus on applications, documentation, and visas. But students often struggle after reaching their destination. We created StackLearn to solve this gap.",
            type: "textarea",
          },
          {
            key: "promiseKicker",
            label: "Sidebar small caps label",
            value: "Our Promise",
            type: "text",
          },
          {
            key: "promiseTitle",
            label: "Sidebar title",
            value: "We prepare you for what happens after you land.",
            type: "textarea",
          },
          {
            key: "promiseBody",
            label: "Sidebar body",
            value:
              "Your admission is a milestone — not the finish line. Our support is designed to help you thrive academically, build real skills, and become competitive in global job markets.",
            type: "textarea",
          },
          {
            key: "gapProblemsJson",
            label: "Gap list (JSON string[])",
            value: ABOUT_JSON.gapProblems,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "approach",
        sectionLabel: "Our Approach",
        fields: [
          { key: "heading", label: "Heading", value: "Our Approach", type: "text" },
          {
            key: "intro",
            label: "Intro line",
            value: "We don’t treat students as applications — we treat them as future professionals.",
            type: "textarea",
          },
          {
            key: "itemsJson",
            label: "Approach cards (JSON: title, body, bullets?[])",
            value: ABOUT_JSON.approach,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "whoWeWorkWith",
        sectionLabel: "Who We Work With",
        fields: [
          { key: "heading", label: "Heading", value: "Who We Work With", type: "text" },
          {
            key: "itemsJson",
            label: "Cards (JSON string[])",
            value: ABOUT_JSON.whoWeWorkWith,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "different",
        sectionLabel: "What Makes Us Different",
        fields: [
          {
            key: "heading",
            label: "Heading",
            value: "What Makes Us Different",
            type: "text",
          },
          {
            key: "para1",
            label: "Paragraph 1",
            value:
              "We don’t stop at admissions. We focus on what truly matters: what happens after you land in a new country.",
            type: "textarea",
          },
          {
            key: "para2",
            label: "Paragraph 2",
            value:
              "That’s why we combine education guidance, technical training, and career readiness into one single journey.",
            type: "textarea",
          },
          {
            key: "itemsJson",
            label: "Highlight cards (JSON {title, body}[])",
            value: ABOUT_JSON.makesUsDifferent,
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "goal",
        sectionLabel: "Our Goal",
        fields: [
          { key: "heading", label: "Heading", value: "Our Goal", type: "text" },
          {
            key: "body",
            label: "Body",
            value:
              "To help students not just go abroad — but succeed, grow, and build meaningful careers globally.",
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "cta",
        sectionLabel: "Bottom CTA",
        fields: [
          { key: "heading", label: "Heading", value: "Let's Get Started", type: "text" },
          {
            key: "body",
            label: "Body",
            value:
              "If you're serious about studying abroad and building a strong future, we're here to guide you. Start your journey with StackLearn.",
            type: "textarea",
          },
          {
            key: "buttonText",
            label: "Button",
            value: "Book Free Counselling",
            type: "text",
          },
          {
            key: "backgroundImage",
            label: "Background image",
            value:
              "https://images.pexels.com/photos/3184418/pexels-photo-3184418.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
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
          {
            key: "kicker",
            label: "Kicker",
            value: "Study Destinations",
            type: "text",
          },
          {
            key: "heading",
            label: "Page Heading",
            value: "",
            type: "text",
          },
          {
            key: "quote",
            label: "Quote block",
            value:
              "Our goal is to simplify the overseas education process and ensure that students are equipped with all the necessary tools and information to make informed decisions for their future.",
            type: "textarea",
          },
          {
            key: "heroImage",
            label: "Hero background image",
            value:
              "https://images.pexels.com/photos/346885/pexels-photo-346885.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
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
          {
            key: "kicker",
            label: "Kicker",
            value: "Study Abroad Services",
            type: "text",
          },
          { key: "heading", label: "Page Heading", value: "", type: "text" },
          { key: "paragraph1", label: "Hero paragraph 1", value: "", type: "textarea" },
          { key: "paragraph2", label: "Hero paragraph 2", value: "", type: "textarea" },
          {
            key: "heroImage",
            label: "Hero image URL",
            value:
              "https://images.pexels.com/photos/3184291/pexels-photo-3184291.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
          {
            key: "ctaText",
            label: "Primary button text",
            value: "Book Your Free Study Abroad Consultation",
            type: "text",
          },
        ],
      },
      {
        sectionKey: "body",
        sectionLabel: "Page body (JSON)",
        fields: [
          {
            key: "pageJson",
            label:
              "All sections below the hero (services grid, process, why list, FAQs). Edit JSON carefully.",
            value: SERVICES_CMS_JSON.fullPage,
            type: "textarea",
          },
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
          {
            key: "kicker",
            label: "Kicker",
            value: "Technical Training Programs",
            type: "text",
          },
          {
            key: "headingMain",
            label: "Heading (before accent span)",
            value: "Industry-Ready Technical",
            type: "text",
          },
          {
            key: "headingAccent",
            label: "Heading (accent color)",
            value: "Training Courses",
            type: "text",
          },
          {
            key: "description",
            label: "Description",
            value:
              "Gain in-demand tech skills with hands-on, mentor-led training programs designed for both freshers and working professionals. From cloud data engineering, Python Training and SQL Training to QA automation and RPA (UiPath) Training — build the career you envision.",
            type: "textarea",
          },
          {
            key: "heroImage",
            label: "Hero image URL",
            value:
              "https://images.pexels.com/photos/3861958/pexels-photo-3861958.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
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
          {
            key: "heading",
            label: "Page Heading",
            value: "Find Scholarships That Fit You",
            type: "text",
          },
          {
            key: "description",
            label: "Description",
            value:
              "Explore top global scholarships to make your study abroad journey affordable.",
            type: "textarea",
          },
          {
            key: "heroImage",
            label: "Hero image URL",
            value:
              "https://images.pexels.com/photos/7092614/pexels-photo-7092614.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
          {
            key: "ctaText",
            label: "Hero button text",
            value: "Check Eligibility",
            type: "text",
          },
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
          { key: "subheading", label: "Sub Heading", value: "", type: "textarea" },
          { key: "heroImage", label: "Hero Image URL", value: "", type: "image" },
        ],
      },
      {
        sectionKey: "cards",
        sectionLabel: "Contact cards (uses phone/email from Contact Details settings)",
        fields: [
          { key: "callTitle", label: "Call card title", value: "Call Us", type: "text" },
          { key: "callButton", label: "Call button", value: "Call Now", type: "text" },
          { key: "emailTitle", label: "Email card title", value: "Email", type: "text" },
          { key: "emailButton", label: "Email button", value: "Send Mail", type: "text" },
          { key: "officeTitle", label: "Office card title", value: "Our Office", type: "text" },
          { key: "mapButton", label: "Map button", value: "View on Map", type: "text" },
        ],
      },
      {
        sectionKey: "form",
        sectionLabel: "Form & office column",
        fields: [
          { key: "formHeading", label: "Form heading", value: "Send Us a Message", type: "text" },
          {
            key: "officeColumnHeading",
            label: "Office column heading",
            value: "Office Information",
            type: "text",
          },
          {
            key: "hoursPrefix",
            label: "Before office hours value",
            value: "Office Hours:",
            type: "text",
          },
          {
            key: "addressPrefix",
            label: "Before address",
            value: "Address:",
            type: "text",
          },
          {
            key: "whatsappLabel",
            label: "WhatsApp button label",
            value: "WhatsApp",
            type: "text",
          },
          {
            key: "mapsCta",
            label: "Map overlay button",
            value: "View on Google Maps",
            type: "text",
          },
          {
            key: "officePhotoUrl",
            label: "Office photo (right column)",
            value:
              "https://images.unsplash.com/photo-1524758631624-e2822e304c36?w=800",
            type: "image",
          },
          {
            key: "submitSuccessMessage",
            label: "Success alert after submit",
            value:
              "Thank you for contacting Stack Learn! Our counsellors will get in touch shortly.",
            type: "textarea",
          },
        ],
      },
      {
        sectionKey: "bottomCta",
        sectionLabel: "Bottom banner",
        fields: [
          {
            key: "heading",
            label: "Heading",
            value: "Need Help Choosing the Right Country or Course?",
            type: "text",
          },
          {
            key: "subheading",
            label: "Subheading",
            value: "Book a free session with our counsellors today.",
            type: "text",
          },
          {
            key: "buttonText",
            label: "Button",
            value: "Book Free Counselling",
            type: "text",
          },
          {
            key: "backgroundImage",
            label: "Background image",
            value:
              "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
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
          {
            key: "kicker",
            label: "Kicker",
            value: "Test Preparation for Study Abroad",
            type: "text",
          },
          {
            key: "heading",
            label: "Page Heading",
            value: "Test Preparation",
            type: "text",
          },
          {
            key: "tagline",
            label: "Tagline (below heading)",
            value:
              "IELTS, GRE, TOEFL & GMAT Coaching Tailored for Your Study Abroad Goals – including flexible IELTS coaching online options.",
            type: "textarea",
          },
          {
            key: "intro",
            label: "Intro paragraph 1",
            value:
              "A strong test score can open doors to top universities worldwide. Whether you are applying for undergraduate, postgraduate, or MBA programs, international universities rely on standardized test scores to assess your academic readiness and English proficiency — making structured IELTS, TOEFL, and GRE coaching especially important for study abroad success.",
            type: "textarea",
          },
          {
            key: "intro2",
            label: "Intro paragraph 2",
            value:
              "At StackLearn, we provide structured and result‑driven test preparation for IELTS, GRE, TOEFL, and GMAT. Our expert trainers, personalized learning plans, and real‑exam simulations help you achieve your target scores with confidence.",
            type: "textarea",
          },
          {
            key: "heroImage",
            label: "Hero image URL",
            value:
              "https://images.pexels.com/photos/4145190/pexels-photo-4145190.jpeg?auto=compress&cs=tinysrgb&w=1600",
            type: "image",
          },
        ],
      },
    ],
  },
];
