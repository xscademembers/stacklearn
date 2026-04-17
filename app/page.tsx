import HeroSection from "@/components/home/HeroSection";
import StatisticsBar from "@/components/home/StatisticsBar";
import HowWeHelpSection from "@/components/home/HowWeHelpSection";
import ServicesOverview from "@/components/home/ServicesOverview";
import WhyChooseStackLearn from "@/components/home/WhyChooseStackLearn";
import PopularDestinations from "@/components/home/PopularDestinations";
import PopularTrainingPrograms from "@/components/home/PopularTrainingPrograms";
import ProcessSection from "@/components/home/ProcessSection";
import SuccessStories from "@/components/home/SuccessStories";
import ScholarshipPromotion from "@/components/home/ScholarshipPromotion";
import BlogHighlights from "@/components/home/BlogHighlights";
import FAQSection from "@/components/home/FAQSection";
import { getMergedPageContent } from "@/lib/get-merged-page-content";
import { buildHomeCmsProps } from "@/lib/build-home-cms";
import { getLatestPublishedBlogCards } from "@/lib/get-latest-blog-cards";

export const dynamic = "force-dynamic";

export default async function Home() {
  const homeContent = await getMergedPageContent("home");
  const cms = buildHomeCmsProps(homeContent);
  const latestBlogs = await getLatestPublishedBlogCards(3);
  const blogHighlights =
    latestBlogs.length > 0 ? { ...cms.blogHighlights, blogs: latestBlogs } : cms.blogHighlights;

  return (
    <div className="w-full">
      <HeroSection cmsSections={homeContent} />
      <StatisticsBar cmsSections={homeContent} />
      <HowWeHelpSection content={cms.howWeHelp} />
      <ServicesOverview content={cms.servicesOverview} />
      <WhyChooseStackLearn content={cms.whyChoose} />
      <PopularDestinations content={cms.popularDestinations} />
      <PopularTrainingPrograms content={cms.popularTraining} />
      <ProcessSection content={cms.process} />
      <SuccessStories content={cms.successStories} />
      <ScholarshipPromotion content={cms.scholarshipPromo} />
      <BlogHighlights content={blogHighlights} />
      <FAQSection content={cms.faq} />
    </div>
  );
}
