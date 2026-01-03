import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Code, Palette, Calculator, Users, Stethoscope, Briefcase, Wrench, Globe } from "lucide-react";

export function CareerPathsSection() {
  const careerFields = [
    {
      icon: Code,
      title: "Technology & Engineering",
      description: "Software development, data science, cybersecurity, and emerging tech careers",
      careers: ["Software Engineer", "Data Scientist", "UX Designer", "DevOps Engineer"],
      color: "bg-blue-50 text-blue-600 border-blue-200",
      growth: "High Growth"
    },
    {
      icon: Stethoscope,
      title: "Healthcare & Medicine",
      description: "Medical practice, research, biotechnology, and healthcare administration",
      careers: ["Doctor", "Nurse", "Pharmacist", "Medical Researcher"],
      color: "bg-green-50 text-green-600 border-green-200",
      growth: "High Demand"
    },
    {
      icon: Briefcase,
      title: "Business & Finance",
      description: "Management, finance, consulting, entrepreneurship, and business strategy",
      careers: ["Business Analyst", "Financial Advisor", "Marketing Manager", "Consultant"],
      color: "bg-purple-50 text-purple-600 border-purple-200",
      growth: "Stable"
    },
    {
      icon: Palette,
      title: "Creative & Design",
      description: "Graphic design, content creation, media production, and creative writing",
      careers: ["Graphic Designer", "Content Creator", "Filmmaker", "Copywriter"],
      color: "bg-pink-50 text-pink-600 border-pink-200",
      growth: "Growing"
    },
    {
      icon: Calculator,
      title: "Science & Research",
      description: "Research, laboratory work, environmental science, and academic careers",
      careers: ["Research Scientist", "Lab Technician", "Environmental Scientist", "Professor"],
      color: "bg-orange-50 text-orange-600 border-orange-200",
      growth: "Steady"
    },
    {
      icon: Users,
      title: "Education & Social Work",
      description: "Teaching, counseling, social services, and community development",
      careers: ["Teacher", "Counselor", "Social Worker", "Community Manager"],
      color: "bg-teal-50 text-teal-600 border-teal-200",
      growth: "Essential"
    },
    {
      icon: Wrench,
      title: "Skilled Trades",
      description: "Technical skills, manufacturing, construction, and hands-on careers",
      careers: ["Electrician", "Plumber", "Mechanic", "Carpenter"],
      color: "bg-amber-50 text-amber-600 border-amber-200",
      growth: "High Demand"
    },
    {
      icon: Globe,
      title: "International & Government",
      description: "Public service, diplomacy, law enforcement, and policy making",
      careers: ["Diplomat", "Policy Analyst", "Lawyer", "Civil Servant"],
      color: "bg-indigo-50 text-indigo-600 border-indigo-200",
      growth: "Stable"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-light text-slate-900 mb-4">
            Explore Career Fields
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Discover different career paths and find what aligns with your interests and skills.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {careerFields.map((field, index) => {
            const IconComponent = field.icon;
            return (
              <Card key={index} className="group hover:shadow-lg transition-all duration-300 border-slate-200 hover:border-slate-300">
                <CardHeader className="pb-4">
                  <div className="flex items-center justify-between mb-3">
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center ${field.color}`}>
                      <IconComponent className="w-6 h-6" />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                      {field.growth}
                    </Badge>
                  </div>
                  <CardTitle className="text-lg font-medium text-slate-900 group-hover:text-slate-700">
                    {field.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-0">
                  <p className="text-sm text-slate-600 mb-4 leading-relaxed">
                    {field.description}
                  </p>
                  <div className="space-y-2 mb-4">
                    {field.careers.slice(0, 3).map((career, idx) => (
                      <div key={idx} className="text-xs text-slate-500">
                        • {career}
                      </div>
                    ))}
                  </div>
                  <Button 
                    variant="ghost" 
                    size="sm"
                    className="text-slate-600 hover:text-slate-900 p-0 h-auto group"
                  >
                    Learn More
                    <ArrowRight className="ml-1 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </CardContent>
              </Card>
            );
          })}
        </div>

        <div className="text-center mt-12">
          <Button 
            variant="outline"
            size="lg"
            className="border-slate-300 hover:border-slate-900 text-slate-900 px-8 py-3 rounded-full"
          >
            View All Career Paths
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
