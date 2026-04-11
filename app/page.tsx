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

export const dynamic = "force-dynamic";

export default async function Home() {
  const homeContent = await getMergedPageContent("home");

  return (
    <div className="w-full">
      <HeroSection cmsSections={homeContent} />
      <StatisticsBar cmsSections={homeContent} />
      <HowWeHelpSection />
      <ServicesOverview />
      <WhyChooseStackLearn />
      <PopularDestinations />
      <PopularTrainingPrograms />
      <ProcessSection />
      <SuccessStories />
      <ScholarshipPromotion />
      <BlogHighlights />
      <FAQSection />
    </div>
  );
}
