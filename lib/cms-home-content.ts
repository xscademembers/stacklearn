/** Default structured content for the home page CMS (parse fallbacks + template defaults). */

export type TitleBody = { title: string; body: string };
export type TitleBodyBullets = TitleBody & { bullets?: string[] };
export type ServiceCard = { icon: string; title: string; description: string; href: string };
export type DestinationCard = {
  name: string;
  image: string;
  flag: string;
  highlights: string[];
  href: string;
};
export type TrainingProgramCard = {
  title: string;
  description: string;
  href: string;
  image: string;
};
export type ProcessStep = { icon: string; title: string; description: string };
export type SuccessStory = {
  name: string;
  destination: string;
  university: string;
  course: string;
  quote: string;
  image: string;
};
export type FaqItem = { question: string; answer: string };
export type BlogCard = { title: string; excerpt: string; image: string; href: string };
export type ProvenResult = { heading: string; body: string };
export type MoreReason = { strong: string; rest: string };

export const HOME_STUDY_ABROAD_POINTS: TitleBody[] = [
  {
    title: "Personalized Profile Evaluation",
    body:
      "We carefully assess your academics, career goals, and budget to create a customized study abroad plan.",
  },
  {
    title: "Strategic University Shortlisting",
    body:
      "We help you select universities and courses that align with your long-term career objectives.",
  },
  {
    title: "Complete Application Support",
    body:
      "From SOP and LOR guidance to accurate documentation, we ensure your application stands out.",
  },
  {
    title: "Loan & Scholarship Guidance",
    body:
      "We assist you in exploring education loans and scholarships to make studying abroad affordable.",
  },
  {
    title: "Student Visa Assistance",
    body:
      "Our structured documentation process and visa preparation support improve your chances of approval.",
  },
  {
    title: "Pre Departure Support",
    body:
      "We guide you with travel planning, documentation checks, and everything you need before you fly.",
  },
  {
    title: "Accommodation Assistance",
    body:
      "We help you identify safe and suitable housing options close to your university campus.",
  },
  {
    title: "Post-Arrival Guidance",
    body:
      "Our support continues with basic settlement advice so you can start your academic journey confidently.",
  },
];

export const HOME_TRAINING_POINTS: TitleBody[] = [
  {
    title: "Personalized Career Guidance",
    body:
      "We understand your background and career goals to recommend the right course for your growth.",
  },
  {
    title: "Industry-Relevant Course Curriculum",
    body:
      "Our training programs are designed based on current market demand and job trends.",
  },
  {
    title: "Hands-on Practical Training",
    body:
      "We focus on real-time projects and practical learning to give you actual working experience.",
  },
  {
    title: "Expert Trainers & Mentorship",
    body:
      "Learn from experienced professionals who guide you with practical insights and continuous support.",
  },
  {
    title: "Flexible Learning Options",
    body:
      "We offer flexible schedules suitable for students, freshers, and working professionals.",
  },
  {
    title: "Certification Support",
    body:
      "Earn recognized certifications that strengthen your profile and improve job opportunities.",
  },
  {
    title: "Placement Assistance",
    body:
      "We provide job support, interview preparation, and career guidance to help you get placed.",
  },
  {
    title: "Resume & Interview Preparation",
    body:
      "We help you build strong resumes and prepare for real-world interview scenarios.",
  },
];

export const HOME_STUDY_ABROAD_SERVICES: ServiceCard[] = [
  {
    icon: "FiUser",
    title: "Profile Evaluation",
    description:
      "Detailed academic and career assessment to identify the best countries and universities for your profile.",
    href: "/services/profile-evaluation",
  },
  {
    icon: "FiFileText",
    title: "Admission Assistance",
    description:
      "Strategic university shortlisting, complete application submission, and offer letter tracking for top global universities.",
    href: "/services/admission-assistance",
  },
  {
    icon: "FiEdit",
    title: "SOP & LOR Writing",
    description:
      "Professionally structured Statement of Purpose and Letter of Recommendation assistance to strengthen your application.",
    href: "/services/sop-lor",
  },
  {
    icon: "FiShield",
    title: "Student Visa Assistance",
    description:
      "Complete student visa documentation support, financial guidance, and interview preparation.",
    href: "/services/visa-assistance",
  },
  {
    icon: "FiHome",
    title: "Accommodation Assistance",
    description:
      "Safe and affordable student accommodation guidance near your university campus.",
    href: "/services/accommodation",
  },
  {
    icon: "FiDollarSign",
    title: "Education Loan Assistance",
    description:
      "Guidance on secured and unsecured education loans to fund your study abroad dream.",
    href: "/services/education-loan",
  },
];

export const HOME_TRAINING_SERVICES: ServiceCard[] = [
  {
    icon: "FiCompass",
    title: "Career Guidance",
    description:
      "Personalized assessment of your background, interests, and career goals to help you choose the right training program.",
    href: "/trainings/technical",
  },
  {
    icon: "FiCpu",
    title: "IT Training Programs",
    description:
      "Industry-focused courses like RPA, Data Analytics, and Software Testing designed to match current job market demands.",
    href: "/trainings/technical",
  },
  {
    icon: "FiBookOpen",
    title: "Non-IT Training Programs",
    description:
      "Career-oriented programs for non-technical students to develop essential skills and explore new career opportunities.",
    href: "/trainings/non-technical",
  },
  {
    icon: "FiLayers",
    title: "Hands-on Practical Training",
    description:
      "Real-time projects and practical sessions to give you actual working experience beyond theoretical knowledge.",
    href: "/trainings/technical",
  },
  {
    icon: "FiAward",
    title: "Certification Support",
    description:
      "Guidance to earn recognized certifications that enhance your profile and improve employability.",
    href: "/certificates",
  },
  {
    icon: "FiBriefcase",
    title: "Placement Assistance",
    description:
      "Complete job support including resume building, interview preparation, and placement guidance.",
    href: "/contact",
  },
];

export const HOME_PROVEN_RESULTS: ProvenResult[] = [
  {
    heading: "98% Student Visa Success Rate",
    body:
      "Our structured documentation process and mock interview preparation significantly improve your chances of visa approval.",
  },
  {
    heading: "5000+ Students Successfully Guided",
    body:
      "From global university admissions to career-focused training, we have helped hundreds of students achieve their goals.",
  },
  {
    heading: "1000+ Students Trained",
    body:
      "We have successfully trained students in industry-relevant skills, helping them become job-ready and confident.",
  },
  {
    heading: "97% Admission and Career Success Rate",
    body:
      "With strategic guidance, strong applications, and practical training, our students achieve real results in both academics and professional careers.",
  },
];

export const HOME_MORE_REASONS: MoreReason[] = [
  {
    strong: "Complete support under one roof",
    rest:
      "From study abroad services to job-oriented training programs, we provide everything you need in one place.",
  },
  {
    strong: "Personalized guidance",
    rest:
      "Our approach is tailored based on your academic background, career goals, and interests.",
  },
  {
    strong: "Industry-relevant training programs",
    rest:
      "Our courses are designed based on current market demand to ensure better job opportunities.",
  },
  {
    strong: "End-to-end journey support",
    rest:
      "From your first counselling session to your final success, whether it is university admission or job placement, we support you at every step.",
  },
  {
    strong: "Experienced counsellors and expert trainers",
    rest:
      "Learn and get guided by professionals who understand both global education systems and industry requirements.",
  },
  {
    strong: "Proven track record",
    rest:
      "Trusted by hundreds of students who have successfully started their study abroad journey or built their careers through our training programs.",
  },
];

export const HOME_DESTINATIONS: DestinationCard[] = [
  {
    name: "United Kingdom",
    image:
      "https://images.pexels.com/photos/460672/pexels-photo-460672.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/gb.png",
    highlights: [
      "Post-study work visa up to 2 years",
      "Top-ranked universities globally",
      "One-year Master's programs",
    ],
    href: "/destinations/uk",
  },
  {
    name: "United States",
    image:
      "https://images.pexels.com/photos/290386/pexels-photo-290386.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/us.png",
    highlights: [
      "World-class research opportunities",
      "Diverse course options",
      "Strong career prospects",
    ],
    href: "/destinations/usa",
  },
  {
    name: "Canada",
    image:
      "https://images.pexels.com/photos/2335126/pexels-photo-2335126.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/ca.png",
    highlights: [
      "Post-graduation work permit",
      "Affordable education",
      "Immigration pathways",
    ],
    href: "/destinations/canada",
  },
  {
    name: "Australia",
    image:
      "https://images.pexels.com/photos/995764/pexels-photo-995764.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/au.png",
    highlights: [
      "Post-study work visa up to 4 years",
      "High quality of life",
      "Strong job market",
    ],
    href: "/destinations/australia",
  },
  {
    name: "Germany",
    image:
      "https://images.pexels.com/photos/109629/pexels-photo-109629.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/de.png",
    highlights: [
      "Tuition-free public universities",
      "Strong engineering & research",
      "Central European location",
    ],
    href: "/destinations/germany",
  },
  {
    name: "Ireland",
    image:
      "https://images.pexels.com/photos/2382681/pexels-photo-2382681.jpeg?auto=compress&cs=tinysrgb&w=1600",
    flag: "https://flagcdn.com/w40/ie.png",
    highlights: [
      "Europe's leading tech & pharma hub",
      "Two-year post-study work visa",
      "English-speaking EU country",
    ],
    href: "/destinations/ireland",
  },
];

export const HOME_TRAINING_PROGRAMS: TrainingProgramCard[] = [
  {
    title: "Data Science",
    description:
      "Learn data analysis, machine learning, and real-world problem solving.",
    href: "/trainings/technical/data-science",
    image:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Azure Data Engineering",
    description:
      "Master data pipelines, cloud storage, and Azure tools for big data roles.",
    href: "/trainings/technical/azure-data-engineer",
    image:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Microsoft Power BI",
    description:
      "Create interactive dashboards and gain business insights using Power BI.",
    href: "/trainings/technical/microsoft-power-bi",
    image:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "QA Automation",
    description:
      "Learn automation testing tools and frameworks for software quality roles.",
    href: "/trainings/technical/qa-automation",
    image:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "RPA UiPath",
    description:
      "Automate business processes using UiPath with hands-on projects.",
    href: "/trainings/technical/rpa-uipath",
    image:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "VLSI Design",
    description:
      "Build skills in chip design, embedded systems, and semiconductor technologies.",
    href: "/trainings/non-technical/vlsi-design-verification",
    image:
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
  {
    title: "Corporate Trainings",
    description:
      "Customized training programs for organizations to upskill their teams.",
    href: "/trainings/corporate",
    image:
      "https://images.pexels.com/photos/3184292/pexels-photo-3184292.jpeg?auto=compress&cs=tinysrgb&w=1600",
  },
];

export const HOME_PROCESS_STEPS: ProcessStep[] = [
  {
    icon: "FiUser",
    title: "Free Counselling",
    description: "Understanding your goals and academic history with expert guidance.",
  },
  {
    icon: "FiSearch",
    title: "Shortlisting Universities",
    description: "Matching courses and countries based on your profile and preferences.",
  },
  {
    icon: "FiFileText",
    title: "Visa & Departure Support",
    description: "Ensuring successful visa filing and smooth transition abroad.",
  },
];

export const HOME_SUCCESS_STORIES: SuccessStory[] = [
  {
    name: "Sai Kumar",
    destination: "UK",
    university: "University of Leeds",
    course: "MSc Computer Science",
    quote:
      "Stack Learn made my visa process completely stress-free — they took care of every document and step!",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200",
  },
  {
    name: "Priya Sharma",
    destination: "Canada",
    university: "University of Toronto",
    course: "MBA",
    quote:
      "The counselling team helped me find the perfect university match. Highly recommended!",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200",
  },
  {
    name: "Rahul Patel",
    destination: "Australia",
    university: "University of Melbourne",
    course: "MEng Mechanical",
    quote:
      "From application to visa approval, Stack Learn guided me through everything seamlessly.",
    image: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200",
  },
  {
    name: "Anjali Reddy",
    destination: "USA",
    university: "MIT",
    course: "MS Data Science",
    quote: "Their scholarship guidance helped me secure funding. Thank you Stack Learn!",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200",
  },
];

export const HOME_FAQS: FaqItem[] = [
  {
    question: "How can StackLearn help me choose the right university and course?",
    answer:
      "We provide personalized study abroad counselling to match your academic profile, career goals, budget, and preferred country. Our experts shortlist the right universities and courses to maximize your admission success.",
  },
  {
    question: "Does StackLearn assist with student visa applications and documentation?",
    answer:
      "Yes. We offer complete student visa assistance including documentation guidance, financial proof preparation, and interview support to improve your visa approval chances.",
  },
  {
    question: "What services does StackLearn provide for studying abroad?",
    answer:
      "We offer end to end study abroad services including profile evaluation, university shortlisting, SOP and LOR guidance, application submission, education loan assistance, visa processing, and pre departure support.",
  },
  {
    question: "Do you help with scholarships and education loans?",
    answer:
      "Yes. We guide students in identifying scholarship opportunities and securing suitable education loans to make international education financially manageable.",
  },
  {
    question: "When should I start planning my study abroad journey?",
    answer:
      "Ideally, start 8 to 12 months before your intake to allow time for test preparation, university applications, and student visa processing.",
  },
  {
    question: "What exams are required to study abroad?",
    answer:
      "Most universities require IELTS or TOEFL for English proficiency. Some programs may also require GRE or GMAT depending on the course and country.",
  },
  {
    question: "Which countries does StackLearn support?",
    answer:
      "We support students planning to study in top destinations including the UK, USA, Canada, Australia, Germany, Ireland, and other leading global education hubs.",
  },
  {
    question: "Do you provide accommodation and post arrival support?",
    answer:
      "Yes. We guide students with accommodation options, pre departure planning, and basic settlement support for a smooth transition abroad.",
  },
  {
    question: "Is counselling at StackLearn free?",
    answer:
      "We offer an initial free counselling session and profile evaluation to help you plan your study abroad journey confidently.",
  },
  {
    question: "How long does the student visa process take?",
    answer:
      "Student visa processing times vary by country, but with proper documentation and structured guidance, most visas are processed within a few weeks.",
  },
];

export const HOME_BLOGS: BlogCard[] = [
  {
    title: "Top 10 Universities in the UK for International Students",
    excerpt:
      "Discover the best universities in the UK and what makes them stand out for international students.",
    image: "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?w=400",
    href: "/blog/top-10-uk-universities",
  },
  {
    title: "Complete Guide to Student Visa Process",
    excerpt:
      "Everything you need to know about applying for a student visa, required documents, and tips for success.",
    image: "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?w=400",
    href: "/blog/student-visa-guide",
  },
  {
    title: "How to Write a Winning Statement of Purpose",
    excerpt:
      "Learn the secrets to crafting an impactful SOP that stands out to admission committees.",
    image: "https://images.unsplash.com/photo-1455390582262-044cdead277a?w=400",
    href: "/blog/sop-writing-guide",
  },
];

function j<T>(v: T): string {
  return JSON.stringify(v, null, 2);
}

export const HOME_JSON = {
  studyAbroadPoints: j(HOME_STUDY_ABROAD_POINTS),
  trainingPoints: j(HOME_TRAINING_POINTS),
  studyAbroadServices: j(HOME_STUDY_ABROAD_SERVICES),
  trainingServices: j(HOME_TRAINING_SERVICES),
  provenResults: j(HOME_PROVEN_RESULTS),
  moreReasons: j(HOME_MORE_REASONS),
  destinations: j(HOME_DESTINATIONS),
  trainingPrograms: j(HOME_TRAINING_PROGRAMS),
  processSteps: j(HOME_PROCESS_STEPS),
  successStories: j(HOME_SUCCESS_STORIES),
  faqs: j(HOME_FAQS),
  blogs: j(HOME_BLOGS),
} as const;
