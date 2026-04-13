export type ServicesPageBodyCms = {
  ourServices: {
    headingMain: string;
    headingAccent: string;
    intro: string;
    footerNote: string;
    items: { title: string; body: string; href: string }[];
  };
  process: {
    headingMain: string;
    headingAccent: string;
    intro: string;
    steps: { num: string; title: string }[];
  };
  why: {
    headingMain: string;
    headingAccent: string;
    intro: string;
    points: string[];
    sidebarBody: string;
    stat1Value: string;
    stat1Label: string;
    stat2Value: string;
    stat2Label: string;
  };
  faq: {
    headingMain: string;
    headingAccent: string;
    items: { q: string; a: string }[];
  };
  bottomCta: {
    heading: string;
    body: string;
    buttonText: string;
    imageUrl: string;
  };
};

export const DEFAULT_SERVICES_PAGE_BODY: ServicesPageBodyCms = {
  ourServices: {
    headingMain: "Our Study Abroad",
    headingAccent: "Services",
    intro:
      "We offer comprehensive overseas education services designed to support students at every stage of their international education journey.",
    footerNote:
      "Our services are tailored for students planning to study in the UK, USA, Canada, Australia, Ireland, and Germany.",
    items: [
      {
        title: "Profile Evaluation",
        body: "Detailed academic and career assessment to identify the best countries and universities for your profile.",
        href: "/services/profile-evaluation",
      },
      {
        title: "University Admission Assistance",
        body: "Strategic university shortlisting, complete application submission, and offer letter tracking for top global universities.",
        href: "/services/admission-assistance",
      },
      {
        title: "SOP & LOR Writing Support",
        body: "Professionally structured Statement of Purpose and Letter of Recommendation assistance to strengthen your application.",
        href: "/services/sop-lor",
      },
      {
        title: "Student Visa Assistance",
        body: "Complete student visa documentation support, financial guidance, and interview preparation.",
        href: "/services/visa-assistance",
      },
      {
        title: "Accommodation Assistance",
        body: "Safe and affordable student accommodation guidance near your university campus.",
        href: "/services/accommodation",
      },
      {
        title: "Education Loan Assistance",
        body: "Guidance on secured and unsecured education loans to fund your study abroad dream.",
        href: "/services/education-loan",
      },
    ],
  },
  process: {
    headingMain: "How Our Study Abroad",
    headingAccent: "Process Works",
    intro:
      "As experienced overseas education consultants, we follow a structured and transparent process to ensure higher admission success rates and smoother visa approvals.",
    steps: [
      { num: "01", title: "Free Profile Evaluation & Career Discussion" },
      { num: "02", title: "University & Course Shortlisting" },
      { num: "03", title: "Application & Documentation Support" },
      { num: "04", title: "Student Visa & Financial Assistance" },
      { num: "05", title: "Pre-Departure & Accommodation Guidance" },
    ],
  },
  why: {
    headingMain: "Why Choose StackLearn as Your",
    headingAccent: "Study Abroad Consultants?",
    intro:
      "Choosing the right overseas education consultancy can significantly impact your admission and visa success.",
    points: [
      "Personalized study abroad guidance",
      "Strong knowledge of international admission processes",
      "Strategic university selection approach",
      "Transparent communication at every step",
      "Complete support from admission to visa",
    ],
    sidebarBody:
      "We don't just help you apply — we help you build a successful international academic pathway. From your first counselling session to your first day on campus, StackLearn stands as your trusted study abroad consultancy partner.",
    stat1Value: "98%",
    stat1Label: "Visa Success Rate",
    stat2Value: "500+",
    stat2Label: "Students Guided",
  },
  faq: {
    headingMain: "Study Abroad Services",
    headingAccent: "FAQs",
    items: [
      {
        q: "Which countries do you provide study abroad services for?",
        a: "We support students planning to study in the UK, USA, Canada, Australia, Germany, Ireland, and selected European countries.",
      },
      {
        q: "Do you provide complete admission and visa support?",
        a: "Yes, we offer end-to-end overseas education services including admission assistance and student visa guidance.",
      },
      {
        q: "Can I apply for education loans through StackLearn?",
        a: "We provide complete education loan assistance and guide you through the documentation process.",
      },
      {
        q: "When should I start my study abroad process?",
        a: "Ideally, students should begin 6–8 months before their intended intake to allow sufficient time for test prep, applications, and visa processing.",
      },
    ],
  },
  bottomCta: {
    heading: "Start Your Study Abroad Journey with Expert Guidance",
    body: "Take the first step toward studying abroad with a trusted overseas education consultancy. Talk to our study abroad experts today.",
    buttonText: "Schedule Your Free Study Abroad Consultation",
    imageUrl:
      "https://images.pexels.com/photos/3184338/pexels-photo-3184338.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
};

export const SERVICES_CMS_JSON = {
  fullPage: JSON.stringify(DEFAULT_SERVICES_PAGE_BODY, null, 2),
} as const;
