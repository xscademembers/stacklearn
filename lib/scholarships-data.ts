export type ScholarshipCountry = "uk" | "usa" | "canada" | "australia" | "germany" | "ireland";

export interface ScholarshipItem {
  slug: string;
  name: string;
  details: string;
  expertise: string[];
}

export interface CountryScholarshipContent {
  country: ScholarshipCountry;
  countryLabel: string;
  heading: string;
  intro: string;
  closingNote: string;
  scholarships: ScholarshipItem[];
}

export const scholarshipsByCountry: CountryScholarshipContent[] = [
  {
    country: "uk",
    countryLabel: "United Kingdom",
    heading: "Scholarships to Study in the UK",
    intro:
      "Students planning to study in the United Kingdom can explore scholarship opportunities offered by the UK Government and universities. Awards range from partial tuition waivers to fully funded options in select research-focused programs.",
    closingNote:
      "Note: Scholarship availability, eligibility, and funding amounts may change annually. At Stack Learn, we assess your academic profile and guide you toward the most suitable scholarship opportunities to improve your chances of financial support.",
    scholarships: [
      {
        slug: "chevening-scholarship",
        name: "Chevening Scholarship",
        details:
          "The Chevening Scholarship is a prestigious fully funded scholarship supported by the UK Government for international students pursuing a one-year Master’s degree in the United Kingdom.",
        expertise: [
          "Citizenship from a Chevening-eligible country and a bachelor’s degree eligible for UK Master’s admission.",
          "Minimum 2 years (about 2,800 hours) of work experience including jobs, internships, or voluntary work.",
          "Apply to three UK universities and secure at least one unconditional offer.",
          "Commitment to return to home country for at least two years after completion.",
          "Covers tuition fees, monthly stipend, return airfare, and visa cost.",
          "May include arrival/departure allowance and travel grants for Chevening events.",
          "Selection focuses on leadership, networking potential, and career goals.",
          "Includes access to the global Chevening alumni and professional development network.",
        ],
      },
      {
        slug: "commonwealth-masters-scholarship",
        name: "Commonwealth Master’s Scholarship",
        details:
          "The Commonwealth Master’s Scholarship is a fully funded scholarship offered by the Commonwealth Scholarship Commission for students from Commonwealth countries such as India to pursue a Master’s degree in the United Kingdom.",
        expertise: [
          "Applicants must be citizens of a Commonwealth country with a degree equivalent to a UK upper second-class (2:1).",
          "Must demonstrate financial need and inability to study in the UK without support.",
          "Admission to an eligible UK Master’s program is required.",
          "Priority is given to study areas linked to sustainable development impact.",
          "Scholars are expected to return to their home country after studies.",
          "Covers full tuition, return airfare, and monthly living allowance.",
          "May include warm clothing, thesis, and study travel grants.",
          "Provides access to the global Commonwealth alumni and leadership network.",
        ],
      },
      {
        slug: "great-scholarships",
        name: "GREAT Scholarships",
        details:
          "The GREAT Scholarships are jointly funded by the British Council and participating UK universities to support international students, including applicants from India.",
        expertise: [
          "Citizens of eligible countries with an offer from a participating UK university can apply.",
          "Candidates must satisfy the academic and English requirements of the selected university.",
          "Available for one-year postgraduate (Master’s) programs.",
          "Strong academic performance and motivation are key selection factors.",
          "Scholars are expected to engage with GREAT scholarship and alumni communities.",
          "Typically provides GBP 10,000 toward tuition fees.",
          "Award amount is paid directly to the university as tuition reduction.",
          "Offered across multiple disciplines depending on yearly university participation.",
        ],
      },
      {
        slug: "coventry-vice-chancellors-international-scholarship",
        name: "Coventry University Vice-Chancellor’s International Scholarship",
        details:
          "The Vice-Chancellor’s International Scholarship supports outstanding international students pursuing postgraduate studies at Coventry University in the UK.",
        expertise: [
          "Applicants need an admission offer for a postgraduate course at Coventry University.",
          "Strong prior academic performance is required.",
          "Must meet English language requirements for the selected program.",
          "A clear personal statement on goals and achievements improves selection.",
          "Awarded based on academic excellence and overall profile strength.",
          "Typically offers tuition fee reduction between GBP 2,000 and GBP 5,000.",
          "Applied directly as a tuition fee discount.",
          "Helps reduce overall study cost in the UK for international students.",
        ],
      },
      {
        slug: "university-of-leicester-international-scholarships",
        name: "University of Leicester International Scholarships",
        details:
          "The University of Leicester International Scholarships are merit-based awards for high-achieving international students across undergraduate and postgraduate study levels.",
        expertise: [
          "Open to international applicants for undergraduate or postgraduate programs.",
          "Requires an admission offer from the University of Leicester.",
          "Strong academic performance is expected in prior studies.",
          "English language criteria for the selected course must be met.",
          "Selection is based on merit and application profile quality.",
          "Typically provides tuition fee discounts between GBP 3,000 and GBP 5,000.",
          "Award is directly adjusted in tuition fees.",
          "Designed to lower total study cost in the UK.",
        ],
      },
      {
        slug: "anglia-ruskin-international-merit-scholarship",
        name: "Anglia Ruskin International Merit Scholarship",
        details:
          "The Anglia Ruskin International Merit Scholarship supports international students joining eligible undergraduate and postgraduate programs at Anglia Ruskin University in the UK.",
        expertise: [
          "Open to international students applying to Anglia Ruskin University.",
          "Requires an offer for an eligible course.",
          "Strong prior academic record is expected.",
          "English language eligibility for the selected program is required.",
          "Award decisions are merit-based and profile-based.",
          "Typically offers tuition reduction between GBP 2,000 and GBP 4,000.",
          "Applied directly as tuition discount.",
          "Helps reduce total UK education cost for international students.",
        ],
      },
    ],
  },
  {
    country: "usa",
    countryLabel: "United States",
    heading: "Scholarships to Study in the USA",
    intro:
      "Scholarships for international students in the USA are offered by universities, private foundations, and government-backed programs to reduce tuition and living expenses. Top opportunities include both fully funded and merit-based awards.",
    closingNote:
      "Note: Scholarship availability, eligibility, and funding amounts may change annually. At Stack Learn, we assess your academic profile and guide you toward the most suitable scholarship opportunities to improve your chances of financial support.",
    scholarships: [
      {
        slug: "fulbright-nehru-masters-fellowship",
        name: "Fulbright-Nehru Master’s Fellowship",
        details:
          "The Fulbright-Nehru Master’s Fellowship is a prestigious program administered by USIEF with support from the U.S. Department of State for Indian students pursuing a Master’s degree in the USA.",
        expertise: [
          "Applicants must be Indian citizens with a strong academic record and recognized bachelor’s degree.",
          "At least three years of relevant professional experience is expected.",
          "Leadership and commitment to community or national development are required.",
          "Candidates must meet US university admission and English language criteria.",
          "Scholars are expected to return to India after completing the program.",
          "Typically covers tuition, living expenses, and health insurance.",
          "Also includes round-trip airfare and support for academic materials.",
          "Focuses on leadership development and India-US cultural exchange.",
        ],
      },
      {
        slug: "inlaks-shivdasani-foundation-scholarship",
        name: "Inlaks Shivdasani Foundation Scholarship",
        details:
          "The Inlaks Shivdasani Foundation Scholarship supports exceptional Indian students for postgraduate studies at leading universities in the USA and other top global destinations.",
        expertise: [
          "Indian citizenship and strong academic background are required.",
          "Excellent achievements with admission to a top overseas university are expected.",
          "Supports Master’s, MPhil, or doctoral studies in selected disciplines.",
          "Selection values talent, leadership potential, and profile strength.",
          "Candidates must satisfy admission and English requirements of chosen institution.",
          "Funding is typically available up to around USD 100,000.",
          "Can cover tuition, living expenses, and one-way travel costs.",
          "Designed to help talented Indian students gain global academic exposure.",
        ],
      },
      {
        slug: "tata-scholarship-cornell",
        name: "Tata Scholarship (for selected US universities)",
        details:
          "The Tata Scholarship is funded by the Tata Education and Development Trust to support talented Indian students pursuing undergraduate programs at Cornell University in the USA.",
        expertise: [
          "Applicants must be Indian citizens admitted to an undergraduate program at Cornell.",
          "Strong academics and exceptional potential are essential.",
          "Priority is given to applicants with demonstrated financial need.",
          "Admission and English language requirements at Cornell must be fulfilled.",
          "Awarded to a limited number of Indian students each year.",
          "Usually covers full or substantial tuition through the program duration.",
          "Significantly reduces financial burden at a top US university.",
          "Supports high-achieving Indian students with world-class opportunities.",
        ],
      },
      {
        slug: "aauw-international-fellowships",
        name: "AAUW International Fellowships",
        details:
          "AAUW International Fellowships are offered by the American Association of University Women to support women from countries like India pursuing graduate studies in the USA.",
        expertise: [
          "Applicants must be female international students with a bachelor’s degree or equivalent.",
          "Admission to an accredited US university for graduate study is required.",
          "Strong academics and research potential are key criteria.",
          "Commitment to improving lives of women and girls in home countries is expected.",
          "Applicants must meet admission and English requirements of the institution.",
          "Award range is typically USD 20,000 to USD 50,000.",
          "Funding may include tuition, living expenses, books, and education costs.",
          "Program supports women leaders and professionals in higher education.",
        ],
      },
      {
        slug: "joint-japan-world-bank-graduate-scholarship-program",
        name: "Joint Japan/World Bank Graduate Scholarship Program",
        details:
          "This program is funded by the World Bank and the Government of Japan to support students from developing countries such as India in development-related Master’s programs.",
        expertise: [
          "Applicants must belong to a World Bank member developing country and hold a bachelor’s degree.",
          "At least three years of relevant professional work experience is required.",
          "Admission to a participating development-related Master’s program is mandatory.",
          "Candidates should show commitment to home-country development impact.",
          "Academic and English language requirements of host universities must be met.",
          "Covers full tuition and round-trip international airfare.",
          "Also provides monthly living allowance and health insurance.",
          "Supports future development professionals studying at leading institutions.",
        ],
      },
      {
        slug: "university-merit-based-scholarships-usa",
        name: "University Merit-Based Scholarships",
        details:
          "Many US universities such as Arizona State University, Northeastern University, and Illinois Institute of Technology offer merit scholarships for international students.",
        expertise: [
          "Open to international students applying to eligible university programs.",
          "Admission offer from the participating university is required.",
          "Strong academic track record is expected.",
          "Some awards may consider GRE or GMAT scores when applicable.",
          "Selection is based on merit, achievements, and profile strength.",
          "Scholarship values generally range from USD 2,000 to USD 20,000 per year.",
          "Award is usually applied as tuition reduction.",
          "Helps lower overall cost of studying in the USA.",
        ],
      },
    ],
  },
  {
    country: "canada",
    countryLabel: "Canada",
    heading: "Scholarships to Study in Canada",
    intro:
      "Scholarships in Canada are available through universities, provincial programs, private organizations, and federal initiatives. International students can access merit awards and selected research or assistantship opportunities.",
    closingNote:
      "Note: Scholarship availability, eligibility, and funding amounts may change annually. At Stack Learn, we assess your academic profile and guide you toward the most suitable scholarship opportunities to improve your chances of financial support.",
    scholarships: [
      {
        slug: "vanier-canada-graduate-scholarships",
        name: "Vanier Canada Graduate Scholarships",
        details:
          "Vanier Canada Graduate Scholarships (Vanier CGS) are offered by the Government of Canada to attract outstanding doctoral students, including international candidates.",
        expertise: [
          "Applicants require nomination by a Canadian university with an eligible doctoral program.",
          "Exceptional academic achievement is expected.",
          "Strong research potential in chosen domain is essential.",
          "Leadership ability is considered alongside academic performance.",
          "Available for PhD fields across health, sciences, engineering, social sciences, and humanities.",
          "Provides CAD 50,000 per year for up to three years.",
          "Supports tuition, research expenses, and living costs.",
          "Aims to attract world-class doctoral talent to Canada.",
        ],
      },
      {
        slug: "ontario-graduate-scholarship",
        name: "Ontario Graduate Scholarship (OGS)",
        details:
          "The Ontario Graduate Scholarship is a merit-based award funded by the Government of Ontario and participating universities for graduate study in Canada.",
        expertise: [
          "Applicants must be admitted to eligible Master’s or doctoral programs at participating Ontario universities.",
          "Strong prior academic grades are generally required.",
          "International applicants need valid study permit and admission compliance.",
          "Candidates are usually nominated by departments or graduate faculties.",
          "Selection factors include merit, research potential, and profile quality.",
          "Typical award is CAD 10,000 for two academic terms.",
          "Up to CAD 15,000 may be available for three-term study.",
          "Funding supports tuition and living expenses during graduate studies.",
        ],
      },
      {
        slug: "university-of-regina-international-entrance-scholarship",
        name: "University of Regina International Entrance Scholarship",
        details:
          "This scholarship supports international students starting undergraduate studies at the University of Regina in Canada.",
        expertise: [
          "Open to international undergraduate applicants to the University of Regina.",
          "Requires admission offer in an eligible undergraduate course.",
          "Strong academic performance is expected.",
          "Applicants must meet English language and admission requirements.",
          "Selection is mainly merit-based and profile-based.",
          "Typical value is around CAD 3,000 as tuition support.",
          "Applied directly as tuition fee reduction.",
          "Helps reduce initial study cost in Canada.",
        ],
      },
      {
        slug: "lakehead-university-international-entrance-scholarships",
        name: "Lakehead University International Entrance Scholarships",
        details:
          "Lakehead University offers merit-based entrance scholarships for high-achieving international students enrolling in undergraduate programs in Canada.",
        expertise: [
          "Applicants must be international students for eligible undergraduate programs.",
          "Admission offer from Lakehead University is required.",
          "Excellent academic record is expected.",
          "English language and program admission criteria must be met.",
          "Selection is based on merit and application profile.",
          "Award values usually range from CAD 6,000 to CAD 40,000.",
          "Distribution may continue across program duration.",
          "Supports tuition affordability for international students in Canada.",
        ],
      },
      {
        slug: "ontario-tech-university-international-scholarships",
        name: "Ontario Tech University International Scholarships",
        details:
          "Ontario Tech University provides merit scholarships for outstanding international students joining undergraduate and postgraduate programs in Canada.",
        expertise: [
          "Open to international applicants to Ontario Tech University.",
          "Admission offer in an eligible undergraduate or postgraduate program is needed.",
          "Candidates should demonstrate strong academic performance.",
          "English language and admission requirements must be satisfied.",
          "Selection considers merit and full profile strength.",
          "Typical awards range from CAD 2,000 to CAD 10,000.",
          "Applied directly as tuition fee reduction.",
          "Helps reduce total cost of studying in Canada.",
        ],
      },
      {
        slug: "university-canada-west-entrance-awards",
        name: "University Canada West Entrance Awards",
        details:
          "University Canada West Entrance Awards support international students enrolling in undergraduate and postgraduate business programs in Canada.",
        expertise: [
          "Applicants must be international candidates applying to UCW programs.",
          "Requires offer of admission in eligible undergraduate or Master’s program.",
          "Strong previous academic performance is expected.",
          "Must meet admission and English language requirements.",
          "Selection is based on merit, personal statement, and profile strength.",
          "Typical awards range from CAD 5,000 to CAD 20,000.",
          "Applied as a direct tuition fee reduction.",
          "Reduces overall study cost for international students in Canada.",
        ],
      },
    ],
  },
  {
    country: "australia",
    countryLabel: "Australia",
    heading: "Scholarships to Study in Australia",
    intro:
      "Students planning to study in Australia can explore scholarships from the Australian Government and universities. Awards vary by institution and level, from partial waivers to full tuition and stipend support.",
    closingNote:
      "Note: Scholarship availability, eligibility, and funding amounts may change annually. At Stack Learn, we assess your academic profile and guide you toward the most suitable scholarship opportunities to improve your chances of financial support.",
    scholarships: [
      {
        slug: "australia-awards-scholarships",
        name: "Australia Awards Scholarships",
        details:
          "Australia Awards Scholarships are prestigious government-funded scholarships for students from developing countries, including India, to pursue higher education in Australia.",
        expertise: [
          "Applicants must be citizens of eligible developing countries and satisfy program criteria.",
          "Admission to a participating Australian institution is required.",
          "Strong academics and leadership potential are expected.",
          "Candidates should show commitment to home-country development impact.",
          "Admission and English language requirements must be met.",
          "Typically covers full tuition and return international airfare.",
          "May include monthly living allowance, health insurance, and establishment support.",
          "Designed to develop skilled professionals for social and economic growth.",
        ],
      },
      {
        slug: "australia-scholarship",
        name: "Australia Scholarship",
        details:
          "The Australia Scholarship supports international students from developing countries, including India, to pursue undergraduate and postgraduate education in Australia.",
        expertise: [
          "Applicants must be from eligible developing countries applying to Australian universities.",
          "An offer for an eligible program is required.",
          "Strong academics and leadership potential are important selection factors.",
          "Candidates should show commitment to development outcomes in home country.",
          "Must meet university admission and English language requirements.",
          "Typically covers full tuition and round-trip airfare.",
          "Usually includes monthly allowance, health insurance, and establishment support.",
          "Focuses on preparing skilled professionals for global development impact.",
        ],
      },
      {
        slug: "australian-government-research-training-program",
        name: "Australian Government Research Training Program (RTP)",
        details:
          "The Research Training Program (RTP) supports domestic and international students pursuing research-focused postgraduate degrees in Australia.",
        expertise: [
          "Applicants must apply for or be enrolled in research-based Master’s or PhD programs.",
          "Excellent academic performance and strong research potential are expected.",
          "Supervision from an approved research supervisor is usually required.",
          "Admission and English requirements of host institution must be met.",
          "Selection is based on merit, research background, and proposal quality.",
          "Typically covers full tuition for research degrees.",
          "Provides living stipend around AUD 32,000 to AUD 35,000 yearly.",
          "May include health insurance and research-related expense support.",
        ],
      },
      {
        slug: "uwa-global-excellence-scholarship",
        name: "University of Western Australia Global Excellence Scholarship",
        details:
          "The Global Excellence Scholarship supports high-achieving international students joining undergraduate and postgraduate programs at the University of Western Australia.",
        expertise: [
          "Open to international applicants to the University of Western Australia.",
          "Requires offer of admission in eligible undergraduate or postgraduate program.",
          "Excellent prior academic performance is expected.",
          "English language and admission requirements must be fulfilled.",
          "Selection is primarily merit-based.",
          "May provide tuition reductions up to AUD 12,000 to AUD 48,000 based on duration.",
          "Applied directly as tuition discount over the study period.",
          "Helps reduce total education expenses in Australia.",
        ],
      },
      {
        slug: "deakin-vice-chancellors-international-scholarship",
        name: "Deakin Vice-Chancellor’s International Scholarship",
        details:
          "Deakin University offers this scholarship to recognize outstanding international students enrolling in undergraduate and postgraduate programs.",
        expertise: [
          "Open to international applicants to Deakin University.",
          "Requires offer of admission in eligible course.",
          "Exceptional academic performance is expected.",
          "Applicants must meet English language and admission standards.",
          "Selection considers academics, leadership, and profile quality.",
          "May cover 50% to 100% of tuition fees based on merit.",
          "Applied as tuition reduction during the program.",
          "Supports high-achieving international students in Australia.",
        ],
      },
      {
        slug: "la-trobe-international-scholarship",
        name: "La Trobe International Scholarship",
        details:
          "La Trobe University offers this scholarship to support high-achieving international students in eligible undergraduate and postgraduate programs.",
        expertise: [
          "Open to international applicants to La Trobe University.",
          "Requires offer in eligible undergraduate or postgraduate study.",
          "Strong academic history is expected.",
          "English and admission criteria must be met.",
          "Selection is based on merit and overall profile.",
          "Typically offers tuition fee reductions from 15% to 25%.",
          "Applied directly as tuition discount.",
          "Reduces overall study cost in Australia for international students.",
        ],
      },
    ],
  },
  {
    country: "germany",
    countryLabel: "Germany",
    heading: "Scholarships to Study in Germany",
    intro:
      "Germany offers scholarship opportunities through government organizations, foundations, and universities. Depending on the award, students may receive stipends, tuition support, travel allowance, and health insurance.",
    closingNote:
      "Note: Scholarship availability, eligibility, and funding amounts may change annually. At Stack Learn, we assess your academic profile and guide you toward the most suitable scholarship opportunities to improve your chances of financial support.",
    scholarships: [
      {
        slug: "daad-scholarships",
        name: "DAAD Scholarships",
        details:
          "DAAD Scholarships are funded by the German Academic Exchange Service to support international students from countries such as India for higher education in Germany.",
        expertise: [
          "Applicants should hold a recognized bachelor’s degree and satisfy university admission criteria.",
          "Strong academic performance and relevant background are expected.",
          "Some programs may ask for work experience depending on course.",
          "Candidates must meet German or English language requirements.",
          "Selection is based on merit, motivation, and profile strength.",
          "Typically includes monthly stipend around EUR 934 for Master’s students.",
          "May also cover health insurance, travel allowance, and study expenses.",
          "Supports postgraduate students pursuing studies in Germany.",
        ],
      },
      {
        slug: "deutschlandstipendium",
        name: "Deutschlandstipendium (Germany Scholarship)",
        details:
          "The Deutschlandstipendium is a merit scholarship jointly backed by the German Federal Government and private sponsors for talented students at participating universities.",
        expertise: [
          "Applicants must be enrolled in or applying to a participating German university.",
          "Excellent academic achievement is expected.",
          "Selection may also include social commitment and leadership activities.",
          "International students, including Indian applicants, are eligible.",
          "Admission and language requirements of the university must be met.",
          "Provides EUR 300 per month to selected students.",
          "Funding is typically granted for one year and may be extended.",
          "Encourages academic excellence and supports talented students in Germany.",
        ],
      },
      {
        slug: "heinrich-boll-foundation-scholarship",
        name: "Heinrich Böll Foundation Scholarship",
        details:
          "This scholarship supports talented international students, including those from India, pursuing Master’s or doctoral studies in Germany.",
        expertise: [
          "Open to international students admitted to German universities for Master’s or doctoral degrees.",
          "Applicants should show excellent academics and intellectual ability.",
          "Commitment to social responsibility, democracy, and sustainability is expected.",
          "German or English language eligibility of chosen program is required.",
          "Selection is based on merit, social engagement, and leadership potential.",
          "Typically provides around EUR 934 monthly for Master’s students.",
          "May include health insurance, travel allowance, and research support.",
          "Supports students focused on social change and sustainable development.",
        ],
      },
      {
        slug: "konrad-adenauer-stiftung-kas-scholarship",
        name: "Konrad-Adenauer-Stiftung (KAS) Scholarship",
        details:
          "KAS Scholarship supports talented international students from countries such as India pursuing postgraduate studies in Germany.",
        expertise: [
          "Applicants must be admitted to Master’s or doctoral programs at German universities.",
          "Excellent prior academic performance is expected.",
          "Interest in social, political, or community engagement is valued.",
          "Leadership potential and commitment to democratic values are important.",
          "German or English language requirements must be satisfied.",
          "Typically provides monthly stipend around EUR 934 for Master’s level.",
          "May include health insurance, travel allowance, and study support.",
          "Designed for future leaders committed to social and political development.",
        ],
      },
      {
        slug: "erasmus-plus-scholarship-programme",
        name: "Erasmus+ Scholarship Programme",
        details:
          "The Erasmus+ Programme, funded by the European Union, supports international students from countries such as India for higher education across Europe, including Germany.",
        expertise: [
          "Applicants must be admitted to an Erasmus+ participating Master’s program.",
          "Strong academic record is expected.",
          "Admission and language requirements of selected program must be met.",
          "Selection is based on merit, motivation, and profile strength.",
          "Some programs may also evaluate relevant academic or professional experience.",
          "Typically covers full tuition for the Master’s degree.",
          "Provides monthly allowance and travel support.",
          "Promotes international mobility and academic collaboration across Europe.",
        ],
      },
      {
        slug: "university-merit-based-scholarships-germany",
        name: "University Merit-Based Scholarships",
        details:
          "Many private German universities offer merit scholarships to international students in undergraduate and postgraduate programs.",
        expertise: [
          "Open to international applicants to eligible programs at participating universities.",
          "Requires an admission offer from the university.",
          "Strong prior academic performance is expected.",
          "Applicants must satisfy admission and English language criteria.",
          "Selection is based on merit, motivation letter, and profile quality.",
          "Typically offers 10% to 50% tuition fee reductions.",
          "Applied directly as tuition fee discount.",
          "Helps reduce total study costs in Germany for international students.",
        ],
      },
    ],
  },
  {
    country: "ireland",
    countryLabel: "Ireland",
    heading: "Scholarships to Study in Ireland",
    intro:
      "Ireland provides scholarship options through government and universities. Awards differ by institution and program, with options for tuition support, stipends, and limited living cost assistance.",
    closingNote:
      "Note: Scholarship availability, eligibility, and funding amounts may change annually. At Stack Learn, we assess your academic profile and guide you toward the most suitable scholarship opportunities to improve your chances of financial support.",
    scholarships: [
      {
        slug: "government-of-ireland-international-education-scholarship",
        name: "Government of Ireland International Education Scholarship (GOI-IES)",
        details:
          "GOI-IES is funded by the Government of Ireland to support high-achieving international students, including Indian applicants, for postgraduate study in Ireland.",
        expertise: [
          "Applicants need an offer from an eligible Irish higher education institution.",
          "Excellent prior academic performance is expected.",
          "Candidates must meet English language and admission requirements.",
          "Motivation, leadership potential, and career clarity are considered.",
          "Selection is based on merit, statement quality, and profile strength.",
          "Provides EUR 10,000 stipend for one academic year.",
          "Also includes a full tuition fee waiver at participating institutions.",
          "Supports international students studying in leading Irish institutions.",
        ],
      },
      {
        slug: "centenary-scholarship-programme",
        name: "Centenary Scholarship Programme",
        details:
          "The Centenary Scholarship Programme by University College Dublin supports high-achieving international students in undergraduate and postgraduate study.",
        expertise: [
          "Open to international students applying to eligible UCD programs.",
          "Requires admission offer from UCD.",
          "Excellent academic performance is expected.",
          "English language and admission requirements for selected programs must be met.",
          "Selection is based on academic merit and profile strength.",
          "May provide partial or full tuition support based on category.",
          "Award is directly applied as tuition reduction.",
          "Reduces financial burden for international students in Ireland.",
        ],
      },
      {
        slug: "irish-research-council-scholarships",
        name: "Irish Research Council Scholarships",
        details:
          "These scholarships support outstanding postgraduate researchers pursuing Master’s by research or PhD programs at Irish universities.",
        expertise: [
          "Applicants must be admitted to an eligible research program at an Irish university.",
          "Excellent academics and research potential are required.",
          "A clear and quality research proposal is expected.",
          "Candidates must meet institution admission and English criteria.",
          "Selection considers academic merit, research quality, and impact potential.",
          "Provides stipend around EUR 22,000 per year.",
          "Includes contributions toward tuition and research expenses.",
          "Supports innovation and academic excellence in Ireland.",
        ],
      },
      {
        slug: "trinity-college-dublin-global-excellence-scholarships",
        name: "Trinity College Dublin Global Excellence Scholarships",
        details:
          "Trinity College Dublin offers Global Excellence Scholarships for high-achieving international students in undergraduate and postgraduate programs.",
        expertise: [
          "Open to international applicants to Trinity College Dublin.",
          "Requires admission offer in eligible undergraduate or postgraduate programs.",
          "Excellent prior academic performance is expected.",
          "English language and admission requirements must be satisfied.",
          "Selection is based on merit and profile quality.",
          "Typically offers tuition fee reductions around EUR 2,000 to EUR 5,000.",
          "Award is applied directly as tuition discount.",
          "Helps reduce study cost for international students in Ireland.",
        ],
      },
      {
        slug: "ucd-global-excellence-scholarships",
        name: "UCD Global Excellence Scholarships",
        details:
          "UCD Global Excellence Scholarships are merit-based awards for outstanding international students in undergraduate and postgraduate programs at University College Dublin.",
        expertise: [
          "Open to international applicants to University College Dublin.",
          "Requires offer for an eligible undergraduate or postgraduate program.",
          "Excellent prior academic record is expected.",
          "English language and admission requirements must be met.",
          "Selection is based on merit and overall application profile.",
          "May provide partial or full tuition support depending on award type.",
          "Applied directly as tuition reduction.",
          "Supports cost reduction for international students studying in Ireland.",
        ],
      },
      {
        slug: "university-of-limerick-international-scholarships",
        name: "University of Limerick International Scholarships",
        details:
          "University of Limerick offers merit scholarships for high-achieving international students in undergraduate and postgraduate programs.",
        expertise: [
          "Open to international applicants to the University of Limerick.",
          "Requires admission offer in eligible undergraduate or postgraduate programs.",
          "Strong academic track record is expected.",
          "English language and admission criteria must be satisfied.",
          "Selection is based on merit and profile strength.",
          "Typically provides tuition reduction around EUR 1,500 to EUR 4,000.",
          "Applied as direct tuition fee discount.",
          "Helps lower overall study cost in Ireland for international students.",
        ],
      },
    ],
  },
];

export const allScholarships = scholarshipsByCountry.flatMap((countryItem) =>
  countryItem.scholarships.map((scholarship) => ({
    ...scholarship,
    country: countryItem.country,
    countryLabel: countryItem.countryLabel,
    heading: countryItem.heading,
    intro: countryItem.intro,
    closingNote: countryItem.closingNote,
  })),
);

export function getScholarshipBySlug(slug: string) {
  return allScholarships.find((item) => item.slug === slug);
}
