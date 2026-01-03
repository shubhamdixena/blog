import { useEffect } from "react";
import Header from "@/components/Header";
import { MentorshipHero } from "@/components/mentorship/MentorshipHero";
import { ProcessSection } from "@/components/mentorship/ProcessSection";
import { AccessibilitySection } from "@/components/mentorship/AccessibilitySection";
import TestimonialsSection from "@/components/mentorship/TestimonialsSection";
import UniversityLogosSection from "@/components/mentorship/UniversityLogosSection";
import FAQSection from "@/components/mentorship/FAQSection";
import { GetStartedSection } from "@/components/mentorship/GetStartedSection";
import Footer from "@/components/Footer";

const Mentorship = () => {
  useEffect(() => {
    // Scroll to top when component mounts (fixes auto-scrolling issue)
    window.scrollTo(0, 0);
  }, []);
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MentorshipHero />
      <ProcessSection />
      <AccessibilitySection />
      <TestimonialsSection />
      <UniversityLogosSection />
      <FAQSection />
      <GetStartedSection />
      <Footer />
    </div>
  );
};

export default Mentorship;