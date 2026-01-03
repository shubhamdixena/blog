
import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Users, FileText, Award, Globe } from "lucide-react";

const stats = [
  {
    icon: FileText,
    label: "Articles Published",
    value: 127,
    suffix: "+",
    description: "Deep-dive articles on tech and health"
  },
  {
    icon: Users,
    label: "Newsletter Subscribers",
    value: 12500,
    suffix: "+",
    description: "Growing community of readers"
  },
  {
    icon: Globe,
    label: "Countries Reached",
    value: 45,
    suffix: "",
    description: "Global impact across continents"
  },
  {
    icon: Award,
    label: "Speaking Events",
    value: 23,
    suffix: "",
    description: "Conferences and workshops"
  }
];

export const StatsMetrics = () => {
  const [animatedValues, setAnimatedValues] = useState(stats.map(() => 0));

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const steps = 60;
    const stepDuration = duration / steps;

    stats.forEach((stat, index) => {
      const increment = stat.value / steps;
      let currentStep = 0;

      const timer = setInterval(() => {
        currentStep++;
        setAnimatedValues(prev => {
          const newValues = [...prev];
          newValues[index] = Math.min(Math.round(increment * currentStep), stat.value);
          return newValues;
        });

        if (currentStep >= steps) {
          clearInterval(timer);
        }
      }, stepDuration);
    });
  }, []);

  return (
    <section className="py-20 bg-secondary/30 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-semibold mb-6">Impact & Reach</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Measuring the impact of ideas shared and communities built
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {stats.map((stat, index) => (
          <Card key={index} className="text-center group hover:shadow-lg transition-all duration-300">
            <CardContent className="p-8">
              <div className="flex justify-center mb-4">
                <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors duration-300">
                  <stat.icon className="w-8 h-8 text-primary" />
                </div>
              </div>
              
              <div className="text-4xl font-bold text-foreground mb-2">
                {animatedValues[index].toLocaleString()}{stat.suffix}
              </div>
              
              <h3 className="text-lg font-medium text-foreground mb-2">{stat.label}</h3>
              <p className="text-sm text-muted-foreground">{stat.description}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
