import { ExternalLink, Github, Calendar, Users, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CurrentProjects = () => {
  const projects = [
    {
      id: 1,
      title: "Southeast Asia Market Intelligence Platform",
      description: "Building an AI-powered platform that helps entrepreneurs understand emerging market dynamics across ASEAN countries.",
      status: "In Development",
      phase: "Beta Testing",
      progress: 75,
      startDate: "October 2024",
      expectedLaunch: "March 2025",
      team: 4,
      technologies: ["Next.js", "OpenAI", "Supabase", "Vercel"],
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=300&fit=crop&q=80",
      links: {
        github: "https://github.com/shubhamdixena/sea-market-intel",
        demo: "https://sea-intel.vercel.app"
      },
      insights: [
        "Cultural nuances significantly impact product adoption",
        "Payment preferences vary dramatically by country",
        "Regulatory frameworks are evolving rapidly"
      ]
    },
    {
      id: 2,
      title: "Nomad Productivity Research",
      description: "A longitudinal study tracking productivity patterns of digital nomads across different environments and cultures.",
      status: "Research Phase",
      phase: "Data Collection",
      progress: 45,
      startDate: "September 2024",
      expectedLaunch: "May 2025",
      team: 2,
      technologies: ["Python", "Jupyter", "Pandas", "Notion API"],
      image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop&q=80",
      links: {
        github: "https://github.com/shubhamdixena/nomad-productivity",
        demo: null
      },
      insights: [
        "Co-working spaces don't guarantee productivity",
        "Time zone challenges affect 89% of nomads",
        "Cultural integration impacts work satisfaction"
      ]
    },
    {
      id: 3,
      title: "Open Source Learning Journey",
      description: "Contributing to major open source projects while documenting the learning process for new developers.",
      status: "Active",
      phase: "Contributing",
      progress: 60,
      startDate: "August 2024",
      expectedLaunch: "Ongoing",
      team: 1,
      technologies: ["React", "TypeScript", "Rust", "Go"],
      image: "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?w=600&h=300&fit=crop&q=80",
      links: {
        github: "https://github.com/shubhamdixena/oss-journey",
        demo: "https://oss-journey.dev"
      },
      insights: [
        "Documentation is as important as code",
        "Community feedback accelerates learning",
        "Small contributions make big impacts"
      ]
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "In Development":
        return "bg-blue-100 text-blue-800";
      case "Research Phase":
        return "bg-purple-100 text-purple-800";
      case "Active":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getPhaseColor = (phase: string) => {
    switch (phase) {
      case "Beta Testing":
        return "bg-amber-100 text-amber-800";
      case "Data Collection":
        return "bg-indigo-100 text-indigo-800";
      case "Contributing":
        return "bg-emerald-100 text-emerald-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Current Projects
          </h2>
          <p className="text-xl text-slate-600 max-w-3xl mx-auto">
            Real-time insights into what I'm building, researching, and exploring. 
            These projects represent my current focus areas and ongoing experiments.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="space-y-12">
          {projects.map((project, index) => (
            <Card 
              key={project.id} 
              className="overflow-hidden bg-gradient-to-br from-slate-50 to-blue-50 border-0 shadow-xl hover:shadow-2xl transition-all duration-500"
            >
              <div className="grid lg:grid-cols-3 gap-0">
                {/* Image Section */}
                <div className="relative h-64 lg:h-full">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  
                  {/* Status Badges */}
                  <div className="absolute top-4 left-4 space-y-2">
                    <Badge className={getStatusColor(project.status)}>
                      {project.status}
                    </Badge>
                    <Badge className={getPhaseColor(project.phase)}>
                      {project.phase}
                    </Badge>
                  </div>

                  {/* Progress Circle */}
                  <div className="absolute bottom-4 right-4 w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg">
                    <div className="text-center">
                      <div className="text-lg font-bold text-slate-900">{project.progress}%</div>
                      <div className="text-xs text-slate-600">Complete</div>
                    </div>
                  </div>
                </div>

                {/* Content Section */}
                <CardContent className="lg:col-span-2 p-8 lg:p-12">
                  <div className="space-y-6">
                    {/* Project Header */}
                    <div>
                      <h3 className="text-2xl lg:text-3xl font-semibold text-slate-900 mb-3">
                        {project.title}
                      </h3>
                      <p className="text-lg text-slate-600 leading-relaxed">
                        {project.description}
                      </p>
                    </div>

                    {/* Project Meta */}
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Calendar className="w-4 h-4" />
                          <span>Started: {project.startDate}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <TrendingUp className="w-4 h-4" />
                          <span>Launch: {project.expectedLaunch}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm text-slate-600">
                          <Users className="w-4 h-4" />
                          <span>Team: {project.team} {project.team === 1 ? 'person' : 'people'}</span>
                        </div>
                      </div>

                      {/* Links */}
                      <div className="space-y-3">
                        <div className="flex gap-2">
                          {project.links.github && (
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <Github className="w-4 h-4" />
                              Code
                            </Button>
                          )}
                          {project.links.demo && (
                            <Button variant="outline" size="sm" className="flex items-center gap-2">
                              <ExternalLink className="w-4 h-4" />
                              Demo
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>

                    {/* Technologies */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Technologies</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.technologies.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    {/* Key Insights */}
                    <div>
                      <h4 className="font-medium text-slate-900 mb-3">Key Insights So Far</h4>
                      <ul className="space-y-2">
                        {project.insights.map((insight, insightIndex) => (
                          <li key={insightIndex} className="flex items-start gap-2 text-slate-600">
                            <div className="w-1.5 h-1.5 bg-blue-400 rounded-full mt-2 flex-shrink-0" />
                            {insight}
                          </li>
                        ))}
                      </ul>
                    </div>

                    {/* Progress Bar */}
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <span className="text-sm font-medium text-slate-700">Progress</span>
                        <span className="text-sm text-slate-600">{project.progress}%</span>
                      </div>
                      <div className="w-full bg-slate-200 rounded-full h-2">
                        <div 
                          className="bg-gradient-to-r from-blue-500 to-purple-600 h-2 rounded-full transition-all duration-500"
                          style={{ width: `${project.progress}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </div>
            </Card>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-16">
          <div className="bg-slate-50 rounded-2xl p-8 border border-slate-100">
            <h3 className="text-2xl font-semibold text-slate-900 mb-4">
              Follow Along
            </h3>
            <p className="text-slate-600 mb-6">
              Get updates on these projects and be the first to know when something launches.
            </p>
            <Button 
              size="lg"
              className="bg-slate-900 hover:bg-slate-800 text-white px-8 py-6 rounded-2xl text-lg font-medium"
            >
              Subscribe to Project Updates
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentProjects;
