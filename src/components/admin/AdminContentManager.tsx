import { PostsManager } from "./PostsManager";
import { SiteSettingsManager } from "./SiteSettingsManager";
import { MentorshipSubmissionsManager } from "./MentorshipSubmissionsManager";
import AdminDashboardContent from "./AdminDashboardContent";

interface AdminContentManagerProps {
  activeTab?: string;
}

export const AdminContentManager = ({ activeTab = "dashboard" }: AdminContentManagerProps) => {
  switch (activeTab) {
    case "dashboard":
      return <AdminDashboardContent />;
    case "posts":
      return <PostsManager activeTab={activeTab} />;
    case "mentorship":
      return <MentorshipSubmissionsManager activeTab={activeTab} />;
    case "settings":
      return <SiteSettingsManager activeTab={activeTab} />;
    default:
      return <AdminDashboardContent />;
  }
};
