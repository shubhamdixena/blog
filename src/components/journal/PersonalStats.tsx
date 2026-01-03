import { TrendingUp, BookOpen, Users, Globe, Coffee, Clock } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const PersonalStats = () => {
  const stats = [
    {
      id: 1,
      title: "Articles Published",
      value: "247",
      change: "+23 this month",
      trend: "up",
      icon: BookOpen,
      color: "from-blue-500 to-cyan-500",
      bgColor: "bg-blue-50"
    },
    {
      id: 2,
      title: "Countries Visited",
      value: "34",
      change: "+3 this year",
      trend: "up",
      icon: Globe,
      color: "from-emerald-500 to-teal-500",
      bgColor: "bg-emerald-50"
    },
    {
      id: 3,
      title: "Newsletter Subscribers",
      value: "15.2K",
      change: "+1.4K this month",
      trend: "up",
      icon: Users,
      color: "from-purple-500 to-pink-500",
      bgColor: "bg-purple-50"
    },
    {
      id: 4,
      title: "Coffee Consumed",
      value: "2,847",
      change: "cups this year",
      trend: "up",
      icon: Coffee,
      color: "from-amber-500 to-orange-500",
      bgColor: "bg-amber-50"
    },
    {
      id: 5,
      title: "Hours Learning",
      value: "1,234",
      change: "this year",
      trend: "up",
      icon: Clock,
      color: "from-indigo-500 to-blue-500",
      bgColor: "bg-indigo-50"
    },
    {
      id: 6,
      title: "Growth Rate",
      value: "23.4%",
      change: "audience growth",
      trend: "up",
      icon: TrendingUp,
      color: "from-green-500 to-emerald-500",
      bgColor: "bg-green-50"
    }
  ];

  const milestones = [
    {
      date: "2024",
      title: "Hit 15K Newsletter Subscribers",
      description: "Crossed the 15,000 subscriber milestone with 98% open rate"
    },
    {
      date: "2024",
      title: "Spoke at 12 International Conferences",
      description: "Shared insights on entrepreneurship and innovation across 6 countries"
    },
    {
      date: "2023",
      title: "Published First Book",
      description: "Digital Nomad's Guide to Productivity - became Amazon bestseller"
    },
    {
      date: "2023",
      title: "Founded Current Startup",
      description: "Built and scaled to 10K+ users in first 6 months"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16">
          <Badge variant="outline" className="mb-4 px-4 py-2 text-sm font-medium">
            By The Numbers
          </Badge>
          <h2 className="text-4xl md:text-5xl font-light text-slate-900 mb-6 tracking-tight">
            Personal Metrics
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            A transparent look at my journey in numbers—from articles written to countries explored, 
            these metrics tell the story of continuous growth and exploration.
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-16">
          {stats.map((stat) => {
            const IconComponent = stat.icon;
            return (
              <Card 
                key={stat.id}
                className="group bg-white border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                <CardContent className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-12 h-12 rounded-2xl bg-gradient-to-r ${stat.color} flex items-center justify-center shadow-md`}>
                      <IconComponent className="w-6 h-6 text-white" />
                    </div>
                    <div className={`px-3 py-1 rounded-full text-xs font-medium ${stat.bgColor} text-slate-700`}>
                      Live
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <h3 className="text-sm font-medium text-slate-600">
                      {stat.title}
                    </h3>
                    <div className="text-3xl font-bold text-slate-900">
                      {stat.value}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-emerald-600">
                      <TrendingUp className="w-3 h-3" />
                      <span>{stat.change}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Milestones Section */}
        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Recent Milestones */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">Recent Milestones</h3>
            <div className="space-y-6">
              {milestones.map((milestone, index) => (
                <div key={index} className="flex gap-4">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <span className="text-white font-bold text-sm">{milestone.date}</span>
                  </div>
                  <div className="flex-1 min-w-0">
                    <h4 className="font-semibold text-slate-900 mb-1">
                      {milestone.title}
                    </h4>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {milestone.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Current Focus */}
          <div>
            <h3 className="text-2xl font-semibold text-slate-900 mb-8">Current Focus</h3>
            <Card className="bg-gradient-to-br from-emerald-50 to-teal-50 border-0 shadow-lg">
              <CardContent className="p-8">
                <div className="space-y-6">
                  <div className="w-16 h-16 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-2xl flex items-center justify-center shadow-lg">
                    <TrendingUp className="w-8 h-8 text-white" />
                  </div>
                  
                  <div>
                    <h4 className="text-xl font-semibold text-slate-900 mb-3">
                      2025 Goals
                    </h4>
                    <ul className="space-y-2 text-slate-600">
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Publish 100+ articles this year
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Visit 10 new countries for research
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Grow newsletter to 25K subscribers
                      </li>
                      <li className="flex items-center gap-2">
                        <div className="w-1.5 h-1.5 bg-emerald-500 rounded-full" />
                        Launch 2 major projects
                      </li>
                    </ul>
                  </div>

                  <div className="pt-4 border-t border-emerald-200">
                    <p className="text-sm text-slate-500">
                      Updated daily • Last sync: 2 hours ago
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>

        {/* Real-time Activity */}
        <div className="mt-16">
          <Card className="bg-white border-0 shadow-xl">
            <CardContent className="p-8">
              <div className="text-center mb-8">
                <h3 className="text-2xl font-semibold text-slate-900 mb-2">
                  Real-time Activity
                </h3>
                <p className="text-slate-600">
                  What I'm working on right now
                </p>
              </div>

              <div className="grid md:grid-cols-3 gap-6">
                <div className="text-center p-6 bg-blue-50 rounded-2xl">
                  <div className="w-3 h-3 bg-blue-500 rounded-full mx-auto mb-3 animate-pulse" />
                  <h4 className="font-medium text-slate-900 mb-1">Currently Writing</h4>
                  <p className="text-sm text-slate-600">Article about AI in emerging markets</p>
                </div>

                <div className="text-center p-6 bg-emerald-50 rounded-2xl">
                  <div className="w-3 h-3 bg-emerald-500 rounded-full mx-auto mb-3 animate-pulse" />
                  <h4 className="font-medium text-slate-900 mb-1">Reading</h4>
                  <p className="text-sm text-slate-600">"The Innovator's Dilemma" by Clayton Christensen</p>
                </div>

                <div className="text-center p-6 bg-purple-50 rounded-2xl">
                  <div className="w-3 h-3 bg-purple-500 rounded-full mx-auto mb-3 animate-pulse" />
                  <h4 className="font-medium text-slate-900 mb-1">Building</h4>
                  <p className="text-sm text-slate-600">Market intelligence platform beta</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default PersonalStats;
