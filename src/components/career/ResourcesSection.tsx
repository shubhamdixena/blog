import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, BookOpen, Video, Users, FileText, ExternalLink } from "lucide-react";

export function ResourcesSection() {
  const resources = [
    {
      icon: BookOpen,
      title: "Career Guides",
      description: "Comprehensive guides for different career paths and industries",
      items: ["Industry Overviews", "Job Market Trends", "Salary Information", "Growth Prospects"],
      type: "Guides",
      color: "bg-blue-50 text-blue-600 border-blue-200"
    },
    {
      icon: Video,
      title: "Video Tutorials",
      description: "Learn about careers through interviews and day-in-the-life videos",
      items: ["Professional Interviews", "Career Day Videos", "Skills Workshops", "Industry Insights"],
      type: "Videos",
      color: "bg-purple-50 text-purple-600 border-purple-200"
    },
    {
      icon: FileText,
      title: "Resume & CV Tools",
      description: "Templates and tools to build professional resumes and portfolios",
      items: ["Resume Templates", "Cover Letter Guides", "Portfolio Examples", "Interview Prep"],
      type: "Tools",
      color: "bg-green-50 text-green-600 border-green-200"
    },
    {
      icon: Users,
      title: "Mentorship Network",
      description: "Connect with professionals and get guidance from industry experts",
      items: ["Industry Mentors", "Peer Groups", "Q&A Sessions", "Career Advice"],
      type: "Network",
      color: "bg-orange-50 text-orange-600 border-orange-200"
    }
  ];

  const featuredResources = [
    {
      title: "Complete Career Planning Workbook",
      description: "A step-by-step guide to planning your career from high school to graduation",
      type: "PDF Guide",
      downloads: "2.3k",
      rating: 4.8
    },
    {
      title: "Skills Assessment Tool",
      description: "Interactive tool to discover your strengths and matching career paths",
      type: "Interactive",
      downloads: "5.1k",
      rating: 4.9
    },
    {
      title: "Interview Preparation Kit",
      description: "Common interview questions, answers, and tips for different industries",
      type: "Resource Kit",
      downloads: "1.8k",
      rating: 4.7
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Free Resources & Tools
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Access our library of career resources, guides, and tools to help you make informed decisions about your future.
          </p>
        </div>

        {/* Resource Categories */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {resources.map((resource, index) => {
            const IconComponent = resource.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${resource.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {resource.type}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium text-slate-900">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 mb-4">
                    {resource.description}
                  </p>
                  <div className="space-y-1 mb-4">
                    {resource.items.slice(0, 3).map((item, idx) => (
                      <div key={idx} className="text-xs text-slate-500 flex items-center gap-2">
                        <div className="w-1 h-1 bg-slate-400 rounded-full"></div>
                        {item}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 p-0 h-auto group"
                  >
                    Explore
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Featured Resources */}
        <div className="bg-slate-50 rounded-2xl p-8">
          <h3 className="text-2xl font-medium text-slate-900 mb-6">Featured Resources</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredResources.map((resource, index) => (
              <Card key={index} className="border-slate-200 bg-white">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-2">
                    <Badge variant="outline" className="text-xs">
                      {resource.type}
                    </Badge>
                    <div className="flex items-center gap-1 text-xs text-slate-500">
                      <span>⭐ {resource.rating}</span>
                    </div>
                  </div>
                  <CardTitle className="text-lg font-medium text-slate-900">
                    {resource.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 mb-4">
                    {resource.description}
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-slate-500">
                      {resource.downloads} downloads
                    </span>
                    <Button 
                      size="sm"
                      variant="outline"
                      className="text-xs px-3 py-1 h-7"
                    >
                      Download
                      <ExternalLink className="ml-1 w-3 h-3" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="border-slate-300 hover:border-slate-900 text-slate-900 px-8 py-3 rounded-full"
          >
            Browse All Resources
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
