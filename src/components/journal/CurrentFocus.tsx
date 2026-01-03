import { ArrowRight, Heart, Users, BookOpen, Globe, MessageCircle, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

const CurrentFocus = () => {
  const currentProjects = [
    {
      title: "Guiding future MBAs and scholars one Zoom call at a time",
      category: "Mentoring",
      description: "Personal mentorship for MBA applications, scholarship opportunities, and academic growth.",
      status: "Active",
      color: "bg-blue-50 border-blue-200 text-blue-800",
      icon: <BookOpen className="w-5 h-5" />
    },
    {
      title: "Running workshops for students dreaming of more",
      category: "Teaching",
      description: "Interactive sessions helping students explore possibilities and build concrete action plans.",
      status: "Ongoing",
      color: "bg-purple-50 border-purple-200 text-purple-800",
      icon: <Users className="w-5 h-5" />
    },
    {
      title: "On a mission to mentor at least two hundred people with disabilities toward global opportunities",
      category: "Impact",
      description: "Dedicated support for individuals with disabilities pursuing international education and career opportunities.",
      status: "In Progress",
      color: "bg-emerald-50 border-emerald-200 text-emerald-800",
      icon: <Heart className="w-5 h-5" />
    },
    {
      title: "Writing field notes on how I want to see India treat disability with dignity and respect",
      category: "Advocacy",
      description: "Documenting experiences and perspectives on disability rights and inclusive practices in India.",
      status: "Active",
      color: "bg-orange-50 border-orange-200 text-orange-800",
      icon: <MessageCircle className="w-5 h-5" />
    },
    {
      title: "Meeting people from different parts of the world, listening to their stories and exchanging resources",
      category: "Connecting",
      description: "Building a global network of mentees, peers, and collaborators across cultures and continents.",
      status: "Ongoing",
      color: "bg-indigo-50 border-indigo-200 text-indigo-800",
      icon: <Globe className="w-5 h-5" />
    },
    {
      title: "Cheering for every small win in a mentee's journey",
      category: "Celebrating",
      description: "Recognizing and celebrating the progress, milestones, and achievements of those I mentor.",
      status: "Always",
      color: "bg-yellow-50 border-yellow-200 text-yellow-800",
      icon: <Heart className="w-5 h-5" />
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-slate-50 border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full border border-slate-200 shadow-sm mb-4">
            <Zap className="w-4 h-4 text-slate-600" />
            <span className="text-sm font-medium text-slate-700">What I'm up to these days</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-semibold text-slate-900 mb-4">
            Current Missions
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            The meaningful work that drives me every day. Building connections, creating opportunities, and making a difference one person at a time.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {currentProjects.slice(0, 3).map((project, index) => (
            <div key={index} className="group">
              <div className="bg-white rounded-xl p-6 shadow-sm border border-slate-200 hover:shadow-lg hover:border-slate-300 transition-all duration-300 h-full">
                {/* Labels removed per request */}

                {/* Project Content */}
                <div className="space-y-3">
                  <h3 className="text-xl font-semibold text-slate-900 group-hover:text-slate-700 transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-slate-600 leading-relaxed">
                    {project.description}
                  </p>
                </div>

                {/* Learn More Link */}
                <div className="mt-6 pt-4 border-t border-slate-100">
                  <Button 
                    variant="ghost" 
                    className="text-slate-900 hover:text-slate-700 p-0 h-auto font-medium group text-sm"
                  >
                    Follow Progress
                    <ArrowRight className="ml-1 w-3 h-3 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* View More & CTA */}
        <div className="text-center space-y-6">
          <Button 
            variant="outline"
            className="border-slate-300 hover:border-slate-900 text-slate-900 px-6 py-3 rounded-full font-medium"
          >
            View More Activities
            <ArrowRight className="ml-2 w-4 h-4" />
          </Button>
          
          <div className="bg-white rounded-2xl p-8 shadow-sm border border-slate-200">
            <h3 className="text-xl font-semibold text-slate-900 mb-3">
              Ready to start your journey?
            </h3>
            <p className="text-slate-600 mb-6">
              Whether you're dreaming of an MBA, scholarship, or career growth, I'm here to help you navigate the path forward.
            </p>
            <Button 
              className="bg-slate-900 hover:bg-slate-800 text-white px-6 py-3 rounded-lg font-medium group shadow-lg hover:shadow-xl transition-all duration-200"
            >
              Apply for Mentorship
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CurrentFocus;
