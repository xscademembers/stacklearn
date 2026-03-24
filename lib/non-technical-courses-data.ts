export interface NonTechnicalCourse {
  slug: string;
  title: string;
  shortTitle: string;
  tagline: string;
  duration: string;
  quizzes: number;
  maxStudents: number;
  heroImage: string;
  cardDescription: string;
  overview: {
    aboutCourse: string[];
    whyItMatters: { heading: string; paragraphs: string[] };
    whatYouGain: { heading: string; paragraphs: string[] };
    realWorldApplications: { heading: string; paragraphs: string[] };
    certification: { heading: string; paragraphs: string[] };
    enrollCTA: { heading: string; paragraphs: string[] };
  };
  keyHighlights: string[];
  whoCanApply: string[];
  careerRoles: string[];
  curriculum: { module: string; topics: string[] }[];
  faqs: { q: string; a: string }[];
}

export const nonTechnicalCourses: NonTechnicalCourse[] = [
  {
    slug: "vlsi-design-verification",
    title: "VLSI Design Verification Course",
    shortTitle: "VLSI Design Verification",
    tagline:
      "Master functional verification methodologies, SystemVerilog, and UVM frameworks",
    duration: "18 Weeks",
    quizzes: 10,
    maxStudents: 10,
    heroImage:
      "https://images.pexels.com/photos/2582937/pexels-photo-2582937.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cardDescription:
      "Learn SystemVerilog, UVM methodology, and functional verification techniques. Build class-based verification environments and advance as a proficient verification expert.",
    overview: {
      aboutCourse: [
        "If you want to understand VLSI Design verification, this course is for you. The VLSI Design Verification Course will introduce you to functional verification methods and the SystemVerilog language. You'll learn how to build a class-based verification environment using SystemVerilog HDVL.",
        "This course includes training on creating test benches with Object-Oriented Programming, running constraint random simulations, and achieving verification sign-off through functional coverage.",
        "With a solid foundation in RTL design using Verilog HDL, any electronics engineer can master verification methodologies and SystemVerilog language concepts through this course and advance as a proficient verification expert.",
      ],
      whyItMatters: {
        heading: "What is VLSI Design Verification?",
        paragraphs: [
          "The VLSI Design Verification Course initiates with a thorough overview of functional verification methodologies and SystemVerilog language. It then proceeds to elaborate on the fundamentals of establishing a class-based verification environment using SystemVerilog HDVL.",
          "In the SystemVerilog for Verification section, it extensively educates on creating test benches through OOP, constraint random simulation, and verification sign-off with functional coverage. Lastly, it provides insights into UVM methodology concepts and emphasizes the necessity of utilizing IEEE standard methodologies like UVM for developing SystemVerilog-based test benches.",
        ],
      },
      whatYouGain: {
        heading: "Why Join This Course?",
        paragraphs: [
          "This course offers a unique approach compared to traditional textbooks and training programs on the market. It is centered around a standard testbench architecture for creating SystemVerilog test benches that can seamlessly transition to the UVM framework.",
          "The course utilizes two primary examples to illustrate methodology and language concepts: a small dual port RAM RTL design for detailed language concept explanation, particularly in testbench implementation, and a complex SOC design to showcase the application of specific SystemVerilog language features and the challenges of migrating IP-level test benches to SOC-level test benches.",
        ],
      },
      realWorldApplications: {
        heading: "Hands-On Verification Projects",
        paragraphs: [
          "The course provides extensive practical experience through real-world verification scenarios. You will work with RTL designs of varying complexity, build complete testbench environments, and apply industry-standard verification methodologies.",
          "By the end of the course, you will have hands-on experience with functional coverage analysis, constraint random verification, and UVM-based testbench development — skills directly applicable to semiconductor industry roles.",
        ],
      },
      certification: {
        heading: "Certification and Career Path",
        paragraphs: [
          "Upon completing the course, you will receive a Stack Learn certification validating your VLSI design verification skills. This certification, combined with the practical experience gained through projects, positions you strongly for roles in the semiconductor and VLSI design industry.",
        ],
      },
      enrollCTA: {
        heading: "Start Your VLSI Verification Journey",
        paragraphs: [
          "The semiconductor industry continues to grow with increasing demand for skilled verification engineers. Stack Learn's VLSI Design Verification Course gives you the foundational and advanced skills needed to enter and excel in this high-demand field. Enroll today and take the first step towards a rewarding career in chip design verification.",
        ],
      },
    },
    keyHighlights: [
      "200 Hrs. of Applied Learning",
      "Designed for Working Professionals & Freshers",
      "Placement Assistance",
      "LinkedIn Profile Review",
      "1:1 Mock Interview",
      "100+ Live Sessions across 7 Months",
      "One-on-One with Industry Mentors",
      "Resume Preparation",
      "24×7 Support",
      "No Cost EMI Option",
    ],
    whoCanApply: [
      "Graduates and postgraduates in ECE and EEE",
      "Professionals looking to enhance their skills and advance in their careers",
      "Individuals aspiring to enter the VLSI field",
    ],
    careerRoles: [
      "Design Verification Engineer",
      "Silicon Design Engineer",
      "DV Technical Lead",
      "GLS Engineer",
    ],
    curriculum: [
      {
        module: "Introduction to VLSI Verification",
        topics: [
          "Overview of VLSI design flow",
          "Role of verification in chip design",
          "Verification methodologies overview",
          "Introduction to SystemVerilog",
        ],
      },
      {
        module: "SystemVerilog Fundamentals",
        topics: [
          "Data types, arrays, and structures",
          "Interfaces and modports",
          "Tasks and functions",
          "Assertions and properties",
          "SystemVerilog scheduling semantics",
        ],
      },
      {
        module: "Object-Oriented Programming in SystemVerilog",
        topics: [
          "Classes, objects, and constructors",
          "Inheritance and polymorphism",
          "Virtual methods and abstract classes",
          "Parameterized classes",
          "Packages and scope resolution",
        ],
      },
      {
        module: "Building Testbench Environments",
        topics: [
          "Testbench architecture and components",
          "Drivers, monitors, and scoreboards",
          "Stimulus generation techniques",
          "Transaction-level modeling",
          "Dual port RAM testbench implementation",
        ],
      },
      {
        module: "Constraint Random Verification",
        topics: [
          "Constrained random stimulus generation",
          "Constraint blocks and distributions",
          "Randomization methods and inline constraints",
          "Coverage-driven verification strategies",
        ],
      },
      {
        module: "Functional Coverage",
        topics: [
          "Covergroups and coverpoints",
          "Cross coverage and bins",
          "Coverage analysis and reporting",
          "Verification sign-off criteria",
        ],
      },
      {
        module: "UVM Methodology",
        topics: [
          "UVM architecture and components",
          "UVM sequences and sequencers",
          "UVM factory and configuration database",
          "UVM phases and objection mechanism",
          "Building UVM-based testbenches",
        ],
      },
      {
        module: "SOC-Level Verification & Capstone",
        topics: [
          "IP-level to SOC-level testbench migration",
          "Complex SOC design verification challenges",
          "End-to-end verification project",
          "Resume preparation and mock interviews",
        ],
      },
    ],
    faqs: [
      {
        q: "What background do I need for this course?",
        a: "A basic understanding of digital electronics and Verilog HDL is recommended. Graduates in ECE or EEE are well-suited for this course.",
      },
      {
        q: "Is this course delivered online?",
        a: "Yes, the course is conducted through live online sessions with industry mentors. All sessions are recorded for later review.",
      },
      {
        q: "What tools will I work with?",
        a: "You will work with SystemVerilog, UVM frameworks, and industry-standard EDA simulation tools throughout the course.",
      },
      {
        q: "How is this different from an RTL design course?",
        a: "This course focuses specifically on verification — building testbenches, writing assertions, and validating RTL designs rather than creating them.",
      },
      {
        q: "Is placement assistance provided?",
        a: "Yes, we provide comprehensive placement support including resume building, mock interviews, LinkedIn optimization, and connections with semiconductor hiring partners.",
      },
      {
        q: "Can working professionals take this course?",
        a: "Absolutely. The schedule is designed for working professionals with flexible timing and recorded sessions available for catch-up.",
      },
    ],
  },
];

export function getNonTechnicalCourseBySlug(
  slug: string
): NonTechnicalCourse | undefined {
  return nonTechnicalCourses.find((course) => course.slug === slug);
}
