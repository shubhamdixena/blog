import { useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { CareerHeroSection } from "@/components/career/CareerHeroSection";
import { CareerPathsSection } from "@/components/career/CareerPathsSection";
import { CareerFAQSection } from "@/components/career/CareerFAQSection";

const CareerGuidance = () => {
  useEffect(() => {
    // Scroll to top when component mounts (fixes auto-scrolling issue)
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <CareerHeroSection />
      <CareerPathsSection />
      <CareerFAQSection />
      <Footer />
    </div>
  );
};

export default CareerGuidance;
