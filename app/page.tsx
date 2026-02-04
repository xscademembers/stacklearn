import HeroSection from "@/components/home/HeroSection";
import StatisticsBar from "@/components/home/StatisticsBar";
import ServicesOverview from "@/components/home/ServicesOverview";
import PopularDestinations from "@/components/home/PopularDestinations";
import ProcessSection from "@/components/home/ProcessSection";
import SuccessStories from "@/components/home/SuccessStories";
import ScholarshipPromotion from "@/components/home/ScholarshipPromotion";
import BlogHighlights from "@/components/home/BlogHighlights";
import FAQSection from "@/components/home/FAQSection";

export default function Home() {
  return (
    <div className="w-full">
      <HeroSection />
      <StatisticsBar />
      <ServicesOverview />
      <PopularDestinations />
      <ProcessSection />
      <SuccessStories />
      <ScholarshipPromotion />
      <BlogHighlights />
      <FAQSection />
    </div>
  );
}
