import Header from "@/components/Header";
import { MentorshipForm } from "@/components/mentorship/MentorshipForm";
import Footer from "@/components/Footer";

const MentorshipFormPage = () => {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <MentorshipForm />
      <Footer />
    </div>
  );
};

export default MentorshipFormPage;
