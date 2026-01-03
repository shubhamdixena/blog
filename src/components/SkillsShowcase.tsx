
import { Code, Database, Monitor, Smartphone, Globe, Lightbulb } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const skills = [
  {
    category: "Frontend Development",
    icon: Monitor,
    skills: [
      { name: "React/Next.js", level: 95 },
      { name: "TypeScript", level: 90 },
      { name: "Tailwind CSS", level: 85 },
      { name: "Vue.js", level: 80 }
    ]
  },
  {
    category: "Backend & AI",
    icon: Database,
    skills: [
      { name: "Python", level: 90 },
      { name: "Machine Learning", level: 85 },
      { name: "Node.js", level: 80 },
      { name: "PostgreSQL", level: 85 }
    ]
  },
  {
    category: "Health Tech",
    icon: Lightbulb,
    skills: [
      { name: "Healthcare Systems", level: 80 },
      { name: "Data Analysis", level: 85 },
      { name: "Research", level: 90 },
      { name: "Product Strategy", level: 85 }
    ]
  }
];

export const SkillsShowcase = () => {
  return (
    <section className="py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-semibold mb-6">Skills & Expertise</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Combining technical expertise with domain knowledge in health, climate, and education
        </p>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {skills.map((category, index) => (
          <Card key={index} className="group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex items-center gap-4 mb-6">
                <category.icon className="w-8 h-8 text-primary" />
                <h3 className="text-xl font-serif font-semibold">{category.category}</h3>
              </div>
              
              <div className="space-y-4">
                {category.skills.map((skill, skillIndex) => (
                  <div key={skillIndex}>
                    <div className="flex justify-between items-center mb-2">
                      <span className="text-sm font-medium">{skill.name}</span>
                      <span className="text-xs text-muted-foreground">{skill.level}%</span>
                    </div>
                    <div className="w-full bg-secondary rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-1000 ease-out"
                        style={{ width: `${skill.level}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
