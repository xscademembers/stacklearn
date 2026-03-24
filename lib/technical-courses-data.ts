export interface TechnicalCourse {
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

export const technicalCourses: TechnicalCourse[] = [
  {
    slug: "azure-data-engineer",
    title: "Azure Data Engineering Course",
    shortTitle: "Azure Data Engineering",
    tagline: "Master cloud data pipelines, storage, and analytics on Microsoft Azure",
    duration: "25 Weeks",
    quizzes: 4,
    maxStudents: 18,
    heroImage:
      "https://images.pexels.com/photos/1181467/pexels-photo-1181467.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cardDescription:
      "Learn Azure Data Factory, Databricks, Synapse Analytics, and more. Build scalable data pipelines and earn an industry-recognized Azure certification.",
    overview: {
      aboutCourse: [
        "A data engineer is in charge of making the data integration, transformation and consolidation from different lines of business data and big data sources into one or more structured formats useful for creating predictive, actionable analytics solutions. Stack Learn has a bespoke Azure Data Engineering Course that will train you in the skills and knowledge you need to succeed in this role.",
        "Whether you are a beginner or already have experience in data engineering, this course covers the basics of the Azure data services and best practices. Enrolling in this course you will get certified with an internationally recognized certification path, ensuring your successful future.",
        "The Azure certification is a reflection of your skills and becomes proof that you are one of the best options for various data engineering roles. In this course, you will learn about data storage, processing, security, and the foundation — all you need to know to become an Azure Data Engineer.",
      ],
      whyItMatters: {
        heading: "Course Content and Structure",
        paragraphs: [
          "Stack Learn's Azure Data Engineering Course covers all the topics of Data Engineering on Azure comprehensively. We have a detailed curriculum with in-depth knowledge in Data Ingestion, Transformation, Storage, Security Networks, and more. Each module reinforces and adds new features that will increase in complexity as you learn.",
          "This course starts with detailed explanations for Data Ingestion Techniques covering the ways of importing data from different sources to Azure. You will get hands-on experience with Azure Data Factory, Azure Databricks, and Azure Stream Analytics to design data pipelines that provide seamless, fault-tolerant data flow.",
        ],
      },
      whatYouGain: {
        heading: "Data Processing and Transformation",
        paragraphs: [
          "The course moves to data processing and transformation using Azure Databricks and Azure Synapse Analytics. Whether it be writing intricate data processing scripts or making use of machine learning algorithms to extract meaning from data, the course provides practical, hands-on experience through carefully-sized labs and assignments that approximate real-world data engineering tasks.",
        ],
      },
      realWorldApplications: {
        heading: "Data Security and Compliance",
        paragraphs: [
          "Regardless of the nature of a data engineering role, data security is always a top concern. Stack Learn prepares you for Security Best Practices in Azure — from encrypting data and managing access controls to becoming industry compliant. These modules will ensure you know how to securely store and maintain the integrity of sensitive data.",
        ],
      },
      certification: {
        heading: "Certifications and Future Career",
        paragraphs: [
          "This course helps you pass the Microsoft Certified Azure Data Engineer Associate exam, an international certification validating your knowledge in Azure data engineering. The intensive training and hands-on exams ensure you are thoroughly prepared for the certification process.",
        ],
      },
      enrollCTA: {
        heading: "Why Choose Our Azure Data Engineering Online Training?",
        paragraphs: [
          "Stack Learn's Azure Data Engineering Course is an excellent investment for anyone looking to advance their career in data engineering. Our comprehensive curriculum, practical approach, and industry-recognized certification make it one of the best Azure data engineer courses available. Whether you are a beginner or an experienced professional, this course will equip you with the skills needed to excel in your role.",
        ],
      },
    },
    keyHighlights: [
      "200 Hrs. of Applied Learning",
      "Designed for Working Professionals & Freshers",
      "50+ Industry Projects & Case Studies",
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
      "Individuals with a bachelor's degree and a keen interest to learn AI and Data Science",
      "IT professionals looking for a career transition as Data Scientists and Artificial Intelligence Engineers",
      "Professionals aiming to move ahead in their IT career",
      "Artificial Intelligence and Business Intelligence professionals",
      "Developers and Project Managers",
      "Freshers who aspire to build their career in the field of AI and Data Science",
      "ETL Developers/Architects who want to excel their professional growth in cloud environments",
    ],
    careerRoles: [
      "Data Scientist",
      "Data Analyst",
      "Business Analyst",
      "Data Engineer",
      "AI Researcher",
      "Data Consultant",
    ],
    curriculum: [
      {
        module: "Introduction to Azure Data Engineering",
        topics: [
          "Overview of data engineering and Azure ecosystem",
          "Azure Portal navigation and resource management",
          "Understanding Azure data services landscape",
          "Setting up the development environment",
        ],
      },
      {
        module: "Data Ingestion with Azure Data Factory",
        topics: [
          "Creating and configuring Azure Data Factory pipelines",
          "Data movement activities and linked services",
          "Integration runtimes and triggers",
          "Parameterization and dynamic content",
          "Monitoring and troubleshooting pipelines",
        ],
      },
      {
        module: "Azure Data Lake Storage",
        topics: [
          "Hierarchical namespace and storage accounts",
          "Data Lake Gen2 configuration and access control",
          "File systems, directories, and files management",
          "Data lifecycle management policies",
        ],
      },
      {
        module: "Azure Databricks & Spark",
        topics: [
          "Databricks workspace setup and cluster management",
          "PySpark and Spark SQL fundamentals",
          "Data transformation and cleaning with Spark",
          "Delta Lake and lakehouse architecture",
          "Structured streaming for real-time data",
        ],
      },
      {
        module: "Azure Synapse Analytics",
        topics: [
          "Synapse workspace and SQL pools",
          "Serverless SQL queries on data lake",
          "Dedicated SQL pool design patterns",
          "Synapse pipelines and data flows",
          "Integration with Power BI for visualization",
        ],
      },
      {
        module: "Azure Stream Analytics",
        topics: [
          "Real-time data processing concepts",
          "Event Hubs and IoT Hub integration",
          "Stream Analytics queries and windowing",
          "Output sinks and alerting",
        ],
      },
      {
        module: "Data Security and Governance",
        topics: [
          "Azure Active Directory and RBAC",
          "Data encryption at rest and in transit",
          "Azure Purview for data governance",
          "Compliance frameworks and auditing",
        ],
      },
      {
        module: "Capstone Project & Certification Prep",
        topics: [
          "End-to-end data engineering project",
          "DP-203 certification exam preparation",
          "Practice tests and review sessions",
          "Resume building and interview preparation",
        ],
      },
    ],
    faqs: [
      {
        q: "What prerequisites are needed for this course?",
        a: "Basic knowledge of SQL and programming concepts is helpful. No prior Azure experience is required — we start from the fundamentals.",
      },
      {
        q: "Is this course fully online?",
        a: "Yes, the course is delivered through live online sessions. All sessions are recorded and available for replay.",
      },
      {
        q: "Will I receive a certification after completing the course?",
        a: "Yes, you will receive a Stack Learn completion certificate. The course also prepares you for the Microsoft DP-203 Azure Data Engineer Associate certification exam.",
      },
      {
        q: "What kind of placement support is provided?",
        a: "We offer resume building, LinkedIn profile optimization, mock interviews, and direct placement assistance with hiring partners.",
      },
      {
        q: "Can working professionals take this course?",
        a: "Absolutely. The schedule is designed for working professionals with live sessions conducted on weekends and recordings available for flexibility.",
      },
    ],
  },

  {
    slug: "data-science",
    title: "Data Science Course",
    shortTitle: "Data Science",
    tagline: "Build expertise in Python, Machine Learning, and Data Visualization",
    duration: "32 Weeks",
    quizzes: 24,
    maxStudents: 18,
    heroImage:
      "https://images.pexels.com/photos/590022/pexels-photo-590022.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cardDescription:
      "Master data analysis, machine learning, and visualization with Python. Work on 50+ real-world projects and case studies with expert mentorship.",
    overview: {
      aboutCourse: [
        "India is rapidly becoming a global leader in data science education, and Stack Learn's data science program is your gateway to this exciting field. Our data science training helps you build skills and advance your career in this field.",
        "The training provides an in-depth understanding of intuitive and analytical reasoning with exposure into the visualization and exploration of data, statistical concepts, and learning predictive modeling techniques.",
        "This full stack data science course majorly focuses on practical and real-life concepts helping you gain necessary hands-on skills needed to succeed in a data-dominated job industry.",
      ],
      whyItMatters: {
        heading: "Why Data Science Matters",
        paragraphs: [
          "Data science is very crucial in today's technology-driven world. Now data is a need of every business to make wise decisions. By taking Stack Learn's data science course, you are taking the first step towards becoming an expert where you will learn how to analyze data sets, develop machine learning models, and obtain powerful insights that are highly required across different types of industries.",
        ],
      },
      whatYouGain: {
        heading: "What You'll Gain from Stack Learn's Course",
        paragraphs: [
          "This course from Stack Learn is one of the best data science courses available. It covers all vital topics starting from basic and moving towards advanced concepts. It is a complete data science learning path that includes everything.",
          "With working on projects, we actually work upon real-life in-depth problems which make you job-ready and confident, hence significantly increasing your career prospects.",
        ],
      },
      realWorldApplications: {
        heading: "Real-World Applications and Projects",
        paragraphs: [
          "Stack Learn's full stack data science course places a strong emphasis on practical application. The course offers projects that simulate real-world scenarios, such as predictive modeling, data visualization, and machine learning tasks. These projects provide hands-on experience, preparing you for real-life challenges in your career.",
        ],
      },
      certification: {
        heading: "Data Scientist Certificate with Career Growth",
        paragraphs: [
          "After the course you will receive a certified data science course certificate from Stack Learn. This certification is valued by employers and will help improve your resume. You can expect excellent career support too, with job placement assistance, resume building, and interview preparation all being provided.",
        ],
      },
      enrollCTA: {
        heading: "Rising Demand for Data Scientists",
        paragraphs: [
          "Among some of the highest paid IT jobs, demand for data scientists has skyrocketed. Data scientists also enjoy growing levels of job security. The requirement for proficient data scientists is quickly increasing, and Stack Learn helps you master data analysis, deploying statistical computing, machine learning algorithms, and acquiring extensive knowledge in developing reports and building dashboards.",
        ],
      },
    },
    keyHighlights: [
      "200 Hrs. of Applied Learning",
      "Designed for Working Professionals & Freshers",
      "50+ Industry Projects & Case Studies",
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
      "Graduates or postgraduate students in fields such as computer science, mathematics, statistics, engineering, or related disciplines",
      "Professionals looking to transition or upskill in the field of Data Science, including those from technical backgrounds like software engineering or data analysis",
      "Data analysts who want to expand their skill set and develop more advanced techniques for data manipulation and analysis",
      "Business professionals who want to understand and leverage the power of data to make data-driven decisions and drive business growth",
      "Researchers or academics who wish to enhance their data analysis and machine learning capabilities",
      "Anyone with a strong analytical mindset and a passion for working with data, regardless of their educational or professional background",
    ],
    careerRoles: [
      "Data Analyst",
      "Data Engineer",
      "Database Administrator",
      "Machine Learning Engineer",
      "Data Scientist",
      "Data Architect",
      "Statistician",
      "Business Analyst",
      "Data and Analytics Manager",
    ],
    curriculum: [
      {
        module: "Fundamentals of Data Science",
        topics: [
          "Understanding Data Science and its applications",
          "Data wrangling and exploratory data analysis",
          "Descriptive statistics and probability",
          "Data types, distributions, and sampling techniques",
        ],
      },
      {
        module: "Python Programming for Data Science",
        topics: [
          "Python fundamentals and data structures",
          "NumPy for numerical computing",
          "Pandas for data manipulation and analysis",
          "Matplotlib and Seaborn for data visualization",
          "Working with APIs and web scraping",
        ],
      },
      {
        module: "Statistics and Probability",
        topics: [
          "Inferential statistics and hypothesis testing",
          "Correlation, regression, and ANOVA",
          "Bayesian statistics fundamentals",
          "A/B testing methodology",
        ],
      },
      {
        module: "Machine Learning",
        topics: [
          "Supervised learning: regression and classification",
          "Unsupervised learning: clustering and dimensionality reduction",
          "Ensemble methods: Random Forest, XGBoost, Gradient Boosting",
          "Model evaluation, cross-validation, and hyperparameter tuning",
          "Feature engineering and selection",
        ],
      },
      {
        module: "Data Visualization & BI Tools",
        topics: [
          "Advanced visualization with Plotly and Dash",
          "Tableau dashboard creation",
          "Power BI fundamentals",
          "Storytelling with data",
        ],
      },
      {
        module: "Deep Learning & Neural Networks",
        topics: [
          "Introduction to neural networks and TensorFlow",
          "Convolutional Neural Networks (CNNs)",
          "Recurrent Neural Networks (RNNs) and LSTMs",
          "Transfer learning and model deployment",
        ],
      },
      {
        module: "Big Data Technologies",
        topics: [
          "Introduction to Hadoop ecosystem",
          "Apache Spark for large-scale data processing",
          "SQL and NoSQL databases",
          "Cloud computing fundamentals for data science",
        ],
      },
      {
        module: "Capstone Projects & Career Prep",
        topics: [
          "End-to-end data science project",
          "Model deployment and productionization",
          "Portfolio building and GitHub showcase",
          "Resume preparation and mock interviews",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need prior programming experience?",
        a: "No, the course starts from Python basics and gradually progresses to advanced topics. A willingness to learn is all you need.",
      },
      {
        q: "How is this course delivered?",
        a: "Through live online sessions with industry mentors. All sessions are recorded and accessible for review.",
      },
      {
        q: "What tools and technologies will I learn?",
        a: "Python, Pandas, NumPy, Scikit-Learn, TensorFlow, Tableau, Power BI, SQL, Spark, and more.",
      },
      {
        q: "Is placement assistance provided?",
        a: "Yes, we offer comprehensive placement support including resume reviews, mock interviews, LinkedIn optimization, and connections with hiring partners.",
      },
      {
        q: "Can I take this course alongside a full-time job?",
        a: "Yes. The course is designed for working professionals with flexible scheduling and recorded sessions for catch-up.",
      },
    ],
  },

  {
    slug: "microsoft-power-bi",
    title: "Microsoft Power BI Course",
    shortTitle: "Microsoft Power BI",
    tagline: "Transform raw data into stunning interactive dashboards and reports",
    duration: "16 Weeks",
    quizzes: 12,
    maxStudents: 18,
    heroImage:
      "https://images.pexels.com/photos/669615/pexels-photo-669615.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cardDescription:
      "Learn to create powerful dashboards, master DAX formulas, and build end-to-end BI solutions with Microsoft Power BI.",
    overview: {
      aboutCourse: [
        "Microsoft Power BI is one of the most powerful and widely adopted business intelligence tools in the world. Stack Learn's Power BI course is designed to equip you with the skills to transform raw data into meaningful insights through interactive dashboards, reports, and data models.",
        "Whether you're a business analyst, data professional, or someone looking to transition into the BI domain, this course provides a comprehensive learning path from Power BI fundamentals to advanced DAX, data modeling, and Power BI Service administration.",
        "With hands-on projects and real-world case studies, you'll learn to connect to various data sources, clean and transform data using Power Query, create data models, and build visually compelling dashboards that drive business decisions.",
      ],
      whyItMatters: {
        heading: "Why Power BI Skills Matter",
        paragraphs: [
          "Organizations across every industry rely on data-driven decision making. Power BI enables professionals to create self-service analytics solutions that are easy to share and collaborate on. With Power BI skills, you become an invaluable asset to any data-driven organization.",
          "Power BI integrates seamlessly with Microsoft's ecosystem including Excel, Azure, and SharePoint — making it the preferred choice for enterprises worldwide. The demand for Power BI professionals continues to grow rapidly across industries.",
        ],
      },
      whatYouGain: {
        heading: "What You'll Learn",
        paragraphs: [
          "This course covers everything from connecting to data sources and transforming data with Power Query to creating advanced DAX measures and building enterprise-grade data models. You'll also learn Power BI Service features for publishing, sharing, and managing reports across your organization.",
          "By the end of the course, you'll be able to independently design and develop complete BI solutions from data ingestion to interactive dashboard delivery.",
        ],
      },
      realWorldApplications: {
        heading: "Real-World Projects",
        paragraphs: [
          "The course includes multiple hands-on projects covering sales analytics, HR dashboards, financial reporting, supply chain analysis, and customer segmentation. These projects mirror real business challenges and give you portfolio-ready work samples.",
        ],
      },
      certification: {
        heading: "Certification and Career Growth",
        paragraphs: [
          "Upon completion, you receive a Stack Learn certification. The course also prepares you for the Microsoft PL-300 Power BI Data Analyst certification exam, helping you validate your skills with an industry-recognized credential.",
        ],
      },
      enrollCTA: {
        heading: "Start Your Power BI Journey",
        paragraphs: [
          "Whether you want to enhance your current role with data visualization skills or transition into a full-time BI analyst position, Stack Learn's Power BI course gives you the practical skills and certification preparation to succeed.",
        ],
      },
    },
    keyHighlights: [
      "80 Hrs. of Applied Learning",
      "80 Hours Live Sessions across 4 Months",
      "Designed for Working Professionals & Freshers",
      "Industry Projects & Case Studies",
      "One-on-One with Industry Mentors",
      "Placement Assistance",
      "Resume Preparation",
      "LinkedIn Profile Review",
      "24×7 Support",
      "1:1 Mock Interview",
      "No Cost EMI Option",
    ],
    whoCanApply: [
      "Business analysts looking to enhance their reporting and visualization skills",
      "Data analysts wanting to add Power BI to their toolkit",
      "Excel power users seeking to move to enterprise-level BI tools",
      "IT professionals interested in business intelligence solutions",
      "Freshers aspiring to build a career in data analytics and BI",
      "Managers and decision-makers who want to create their own analytical dashboards",
    ],
    careerRoles: [
      "Power BI Developer",
      "Business Intelligence Analyst",
      "Data Analyst",
      "BI Consultant",
      "Dashboard Developer",
      "Reporting Analyst",
      "Data Visualization Specialist",
      "Business Analyst",
    ],
    curriculum: [
      {
        module: "Introduction to Power BI",
        topics: [
          "Overview of Business Intelligence concepts",
          "Power BI Desktop, Service, and Mobile overview",
          "Connecting to various data sources",
          "Power BI interface and navigation",
        ],
      },
      {
        module: "Data Transformation with Power Query",
        topics: [
          "Power Query Editor fundamentals",
          "Data cleaning and shaping techniques",
          "Merging and appending queries",
          "Custom columns and conditional logic",
          "M language basics",
        ],
      },
      {
        module: "Data Modeling",
        topics: [
          "Star schema and snowflake schema design",
          "Relationships and cardinality",
          "Role-playing dimensions and date tables",
          "Best practices for data model optimization",
        ],
      },
      {
        module: "DAX (Data Analysis Expressions)",
        topics: [
          "Calculated columns vs measures",
          "Filter context and row context",
          "CALCULATE, ALL, FILTER, and iterator functions",
          "Time intelligence functions",
          "Advanced DAX patterns and optimization",
        ],
      },
      {
        module: "Data Visualization & Reports",
        topics: [
          "Chart types and when to use them",
          "Conditional formatting and visual interactions",
          "Bookmarks, drill-through, and tooltips",
          "Custom themes and formatting",
          "Mobile-optimized report design",
        ],
      },
      {
        module: "Power BI Service & Administration",
        topics: [
          "Publishing and sharing reports",
          "Workspaces, apps, and dashboards",
          "Row-Level Security (RLS)",
          "Data refresh and gateway configuration",
          "Power BI embedded and API basics",
        ],
      },
      {
        module: "Advanced Topics",
        topics: [
          "Paginated reports with Report Builder",
          "Power BI with Azure Synapse and Dataflows",
          "AI visuals and Q&A natural language queries",
          "Performance optimization and best practices",
        ],
      },
      {
        module: "Capstone Project & Certification Prep",
        topics: [
          "End-to-end BI solution project",
          "PL-300 certification exam preparation",
          "Practice tests and review sessions",
          "Portfolio building and career preparation",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need programming knowledge for this course?",
        a: "No programming experience is required. The course covers DAX and M language from scratch. Basic Excel knowledge is helpful but not mandatory.",
      },
      {
        q: "Is Power BI free to use?",
        a: "Power BI Desktop is free to download and use. Power BI Pro and Premium licenses are needed for sharing and collaboration features in organizations.",
      },
      {
        q: "What certification does this course prepare me for?",
        a: "The course prepares you for the Microsoft PL-300 Power BI Data Analyst certification exam.",
      },
      {
        q: "Can I access the course recordings?",
        a: "Yes, all live sessions are recorded and available for replay throughout the course duration and beyond.",
      },
      {
        q: "Is placement support included?",
        a: "Yes, we provide comprehensive placement assistance including resume building, mock interviews, and connections with hiring partners.",
      },
    ],
  },

  {
    slug: "qa-automation",
    title: "QA Automation Course",
    shortTitle: "QA Automation",
    tagline: "Master Selenium, JUnit, Jenkins, and modern test automation frameworks",
    duration: "20 Weeks",
    quizzes: 15,
    maxStudents: 18,
    heroImage:
      "https://images.pexels.com/photos/3861969/pexels-photo-3861969.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cardDescription:
      "Learn end-to-end test automation with Selenium, JUnit, and Jenkins. Build a strong portfolio with real-world QA projects and earn industry certification.",
    overview: {
      aboutCourse: [
        "Stack Learn's comprehensive QA automation training course equips you with the skills to excel in this critical field. By mastering the latest tools and techniques, you will streamline testing processes, reduce manual efforts, and accelerate delivery cycles.",
        "This automation certification training will not only enhance your technical proficiency but also significantly boost your career prospects in the tech industry.",
        "Focusing on practical learning, the program includes hands-on projects simulating real-world scenarios, reinforcing theoretical knowledge and providing valuable experience in using industry-standard tools and frameworks.",
      ],
      whyItMatters: {
        heading: "Why QA Automation is Crucial",
        paragraphs: [
          "Automation in QA is pivotal for achieving higher efficiency and accuracy. Traditional manual testing methods are time-consuming and prone to human error. With test automation training, you can automate repetitive tasks, execute tests faster, and identify defects early in the development cycle.",
          "This ensures that products meet the highest standards of quality before reaching end-users. Consequently, companies are increasingly seeking professionals with strong automation skills, creating a surge in demand for certified QA automation experts.",
        ],
      },
      whatYouGain: {
        heading: "In-Depth Course Content",
        paragraphs: [
          "The curriculum covers essential topics for proficiency in automation testing. It begins with an introduction to software testing, explaining its importance in the development lifecycle and the types of testing — unit testing, integration testing, and system testing.",
          "You will learn automation tools like Selenium, JUnit, and Jenkins. Selenium is extensively covered due to its popularity and versatility in automating web applications. Jenkins is introduced to teach you how to automate the deployment and execution of tests, ensuring continuous integration and delivery.",
        ],
      },
      realWorldApplications: {
        heading: "Hands-On Projects and Real-World Applications",
        paragraphs: [
          "One of the standout features of Stack Learn's Automation Certification Course is its emphasis on hands-on learning. The course covers practical assignments and projects that mirror real-world testing scenarios. This approach ensures that you not only grasp the theoretical aspects of QA automation but also gain valuable experience in applying these concepts in real projects.",
          "By the end of the course, you will have a portfolio demonstrating your proficiency in automation testing.",
        ],
      },
      certification: {
        heading: "Certification and Career Advancement",
        paragraphs: [
          "Upon completing the automation testing certification course, you will receive a completion certificate from Stack Learn. This certificate is recognized by industry leaders and serves as a testament to your skills and knowledge in QA automation. It significantly enhances your resume, making you a more attractive candidate to potential employers.",
        ],
      },
      enrollCTA: {
        heading: "The Growing Demand for Automation Experts",
        paragraphs: [
          "The demand for skilled QA automation professionals is on the rise as organizations strive to improve their software development processes. Certified experts in QA automation are highly sought after for their ability to implement efficient testing strategies and ensure the quality of software products. By enrolling in Stack Learn's QA automation course, you position yourself at the forefront of this growing field.",
        ],
      },
    },
    keyHighlights: [
      "138 Hrs. of Applied Learning",
      "138 Hours Live Sessions across 5.5 Months",
      "Designed for Working Professionals & Freshers",
      "Industry Projects & Case Studies",
      "One-on-One with Industry Mentors",
      "Placement Assistance",
      "Resume Preparation",
      "LinkedIn Profile Review",
      "24×7 Support",
      "1:1 Mock Interview",
      "No Cost EMI Option",
    ],
    whoCanApply: [
      "Individuals already working in manual testing roles aiming to transition to automation testing",
      "Professionals looking to enhance their automation skills and advance in their careers",
      "Those interested in specializing in QA or adding testing skills to their repertoire",
      "Individuals aspiring to enter the software testing field",
      "Anyone keen on switching careers and entering the software testing domain",
    ],
    careerRoles: [
      "Automation Tester/Engineer",
      "QA Analyst",
      "Test Automation Architect",
      "SDET (Software Development Engineer in Test)",
      "Performance Test Engineer",
      "CI/CD Engineer",
      "Quality Assurance Manager",
      "Test Consultant",
    ],
    curriculum: [
      {
        module: "Fundamentals of Software Testing",
        topics: [
          "Software Development Life Cycle (SDLC) and testing",
          "Types of testing: unit, integration, system, acceptance",
          "Manual testing fundamentals and test case design",
          "Defect lifecycle and bug reporting",
        ],
      },
      {
        module: "Core Java for Automation",
        topics: [
          "Java fundamentals: variables, data types, operators",
          "Object-Oriented Programming concepts",
          "Collections, exception handling, and file I/O",
          "Java for test scripting",
        ],
      },
      {
        module: "Selenium WebDriver",
        topics: [
          "Selenium architecture and setup",
          "Locating elements: ID, XPath, CSS selectors",
          "Handling forms, dropdowns, alerts, and frames",
          "Waits: implicit, explicit, and fluent",
          "Cross-browser and parallel testing",
        ],
      },
      {
        module: "Testing Frameworks",
        topics: [
          "TestNG and JUnit frameworks",
          "Annotations, assertions, and test suites",
          "Data-driven testing with Excel and CSV",
          "Page Object Model (POM) design pattern",
          "BDD with Cucumber and Gherkin",
        ],
      },
      {
        module: "API Testing",
        topics: [
          "REST API fundamentals",
          "Postman for API testing",
          "Rest Assured library for API automation",
          "JSON and XML parsing",
        ],
      },
      {
        module: "CI/CD with Jenkins",
        topics: [
          "Jenkins setup and configuration",
          "Creating and managing build pipelines",
          "Integrating Selenium tests with Jenkins",
          "Automated test execution and reporting",
        ],
      },
      {
        module: "Performance Testing",
        topics: [
          "Introduction to performance testing concepts",
          "JMeter setup and test plan creation",
          "Load testing and stress testing",
          "Analyzing performance test results",
        ],
      },
      {
        module: "Capstone Project & Career Prep",
        topics: [
          "End-to-end automation testing project",
          "Test automation framework development",
          "Portfolio building and GitHub showcase",
          "Resume preparation and mock interviews",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need manual testing experience to join?",
        a: "No prior testing experience is required. The course covers manual testing fundamentals before moving to automation.",
      },
      {
        q: "Which programming language is used in this course?",
        a: "The course primarily uses Java for automation scripting with Selenium. Java fundamentals are covered from scratch.",
      },
      {
        q: "Will I learn API testing as well?",
        a: "Yes, the course includes comprehensive API testing with Postman and Rest Assured library.",
      },
      {
        q: "Is the course suitable for working professionals?",
        a: "Absolutely. Sessions are scheduled keeping working professionals in mind, with recorded sessions available for flexibility.",
      },
      {
        q: "What placement support is offered?",
        a: "We provide resume building, mock interviews, LinkedIn optimization, and direct placement assistance with hiring partners.",
      },
    ],
  },

  {
    slug: "rpa-uipath",
    title: "RPA UiPath Course",
    shortTitle: "RPA UiPath",
    tagline: "Automate business processes with UiPath Studio, Orchestrator, and ReFramework",
    duration: "20 Weeks",
    quizzes: 10,
    maxStudents: 18,
    heroImage:
      "https://images.pexels.com/photos/8386440/pexels-photo-8386440.jpeg?auto=compress&cs=tinysrgb&w=1600",
    cardDescription:
      "Master Robotic Process Automation with UiPath — from building bots to managing enterprise automation workflows and earning UiPath certification.",
    overview: {
      aboutCourse: [
        "Robotic Process Automation (RPA) is revolutionizing the IT industry, with major investments pouring into companies like UiPath. Stack Learn's RPA Training for UiPath is your ticket to this booming field.",
        "This isn't just a fleeting trend — 73% of companies now use intelligent automation, creating a huge demand for skilled professionals. In India alone, there are over 40,000 RPA jobs available, while the U.S. boasts more than 50,000 positions. Salaries range from ₹6 lakh to ₹37 lakh in India and $70,000 to $200,000 in the U.S.",
        "Our RPA training for UiPath is designed to help you seize these opportunities. You'll master user interface automation, programming activities, and debugging. The course prepares you for UiPath certification, giving you the competitive edge you need in the job market.",
      ],
      whyItMatters: {
        heading: "Top-Level Course Content",
        paragraphs: [
          "Our UiPath training program offers a deep dive into RPA concepts. It begins with an introduction to robotic process automation, covering its core principles and significance across various industries. As the course progresses, you'll explore advanced topics like creating and managing RPA bots using UiPath.",
          "Key areas covered include RPA Development Methodology, App Integration and Data Scraping, Workflow Files in UiPath, Data Manipulation and Automation, UI Automation Activities, Debugging and Error Handling, and much more. These areas provide a holistic understanding of how RPA works and how to leverage it to streamline business processes.",
        ],
      },
      whatYouGain: {
        heading: "Hands-On Learning with UiPath Robot",
        paragraphs: [
          "Our training gives you extensive practical experience with UiPath Robot, including UiPath Studio, UiPath Orchestrator, and UiPath ReFramework. These are crucial for developing and managing automation solutions.",
          "UiPath Studio features a user-friendly interface with drag-and-drop functionality, making it easy to build complex automation workflows without extensive coding knowledge. UiPath Orchestrator lets you deploy, monitor, and manage your automation workflows — scheduling tasks, managing robot resources, and ensuring smooth operation.",
        ],
      },
      realWorldApplications: {
        heading: "Real-World Automation Projects",
        paragraphs: [
          "The course includes practical exercises and real-world projects to help you apply what you've learned. You'll automate tasks like payroll processing, email management, data extraction, and enterprise application workflows. By the end, you'll have a portfolio of automation solutions demonstrating your proficiency.",
        ],
      },
      certification: {
        heading: "Certification and Career Advancement",
        paragraphs: [
          "After completing the course, you'll receive a UiPath certification, boosting your professional profile. Our RPA certification courses also offer job placement support, including interview preparation and connections with potential employers. We provide all the tools and resources you need to succeed in the job market.",
        ],
      },
      enrollCTA: {
        heading: "Build Your Career Foundation with RPA",
        paragraphs: [
          "Stack Learn's comprehensive RPA certification courses provide a practical, hands-on approach to learning RPA with UiPath. Join us today and master robotic process automation to advance your career in this exciting field.",
        ],
      },
    },
    keyHighlights: [
      "100 Hrs. of Applied Learning",
      "100 Hours Live Sessions across 3.5 Months",
      "Designed for Working Professionals & Freshers",
      "Industry Projects & Case Studies",
      "One-on-One with Industry Mentors",
      "Placement Assistance",
      "Resume Preparation",
      "LinkedIn Profile Review",
      "24×7 Support",
      "1:1 Mock Interview",
      "No Cost EMI Option",
    ],
    whoCanApply: [
      "Professionals looking to enhance their process automation skills and advance in their careers",
      "Those interested in specializing in RPA UiPath Automation",
      "Individuals aspiring to enter the RPA Automation field",
      "Anyone keen on switching careers and entering the RPA Automation field",
    ],
    careerRoles: [
      "RPA UiPath Automation Engineer",
      "RPA Developer",
      "RPA Engineer",
      "RPA Technical Lead",
      "RPA Solutions Senior Developer",
      "RPA Consultant",
      "RPA Administrator",
      "RPA Business Analyst",
      "RPA Support Engineer",
    ],
    curriculum: [
      {
        module: "Introduction to RPA",
        topics: [
          "What is Robotic Process Automation",
          "RPA vs traditional automation",
          "RPA use cases across industries",
          "UiPath ecosystem overview",
        ],
      },
      {
        module: "UiPath Studio Fundamentals",
        topics: [
          "UiPath Studio interface and project setup",
          "Variables, data types, and arguments",
          "Control flow: sequences, flowcharts, and state machines",
          "Recording and UI automation activities",
          "Selectors and dynamic selectors",
        ],
      },
      {
        module: "Data Manipulation & Automation",
        topics: [
          "String manipulation and RegEx",
          "DataTable operations",
          "Excel, PDF, Word, Text, and CSV automation",
          "Database automation activities",
          "Web scraping and data extraction",
        ],
      },
      {
        module: "Advanced UiPath Activities",
        topics: [
          "Email automation (SMTP, IMAP, Outlook)",
          "SAP automation",
          "API automation and HTTP requests",
          "Citrix and virtual machine automation",
          "Image and OCR-based automation",
        ],
      },
      {
        module: "Error Handling & Debugging",
        topics: [
          "Try-Catch and error handling strategies",
          "Debugging techniques and breakpoints",
          "Logging and activity tracing",
          "Exception management best practices",
        ],
      },
      {
        module: "UiPath Orchestrator",
        topics: [
          "Orchestrator setup and architecture",
          "Managing robots: attended and unattended",
          "Scheduling, queues, and assets",
          "Monitoring and reporting",
          "Robot license management",
        ],
      },
      {
        module: "UiPath Frameworks",
        topics: [
          "ReFramework (Robotic Enterprise Framework)",
          "Attended automation framework",
          "Test automation framework",
          "Version control with Git and Bitbucket",
        ],
      },
      {
        module: "Capstone Project & Certification Prep",
        topics: [
          "End-to-end enterprise automation project",
          "UiPath certification exam preparation",
          "Practice tests and review sessions",
          "Resume building and interview preparation",
        ],
      },
    ],
    faqs: [
      {
        q: "Do I need coding experience to learn RPA?",
        a: "No coding experience is required. UiPath Studio uses a visual drag-and-drop interface, and we cover any necessary programming concepts from scratch.",
      },
      {
        q: "What is the job market like for RPA professionals?",
        a: "The RPA market is growing rapidly with over 40,000 positions in India and 50,000+ in the U.S. Salaries range from ₹6L to ₹37L in India and $70K to $200K in the U.S.",
      },
      {
        q: "Will I get hands-on experience with UiPath Orchestrator?",
        a: "Yes, the course includes comprehensive training on UiPath Orchestrator including deployment, scheduling, monitoring, and robot management.",
      },
      {
        q: "Does this course prepare me for UiPath certification?",
        a: "Yes, the course curriculum aligns with UiPath certification requirements and includes dedicated exam preparation sessions.",
      },
      {
        q: "Is placement assistance provided?",
        a: "Yes, we provide resume building, mock interviews, LinkedIn optimization, and placement support with our hiring partner network.",
      },
    ],
  },
];

export function getTechnicalCourseBySlug(slug: string): TechnicalCourse | undefined {
  return technicalCourses.find((course) => course.slug === slug);
}
