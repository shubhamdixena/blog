
import { GraduationCap, Briefcase, Award, Lightbulb } from "lucide-react";

const timelineEvents = [
  {
    id: 1,
    type: "work",
    icon: Briefcase,
    title: "Senior Product Manager",
    organization: "TechForGood Inc.",
    period: "2022 - Present",
    description: "Leading product strategy for AI-powered healthcare solutions, managing cross-functional teams of 15+ members.",
    achievements: ["Launched 3 major product features", "Increased user engagement by 40%", "Led $2M funding round"]
  },
  {
    id: 2,
    type: "education",
    icon: GraduationCap,
    title: "Master's in Computer Science",
    organization: "Stanford University",
    period: "2020 - 2022",
    description: "Specialized in AI/ML with focus on healthcare applications. Thesis on predictive models for patient outcomes.",
    achievements: ["GPA: 3.9/4.0", "Research published in top conferences", "Teaching Assistant for ML courses"]
  },
  {
    id: 3,
    type: "work",
    icon: Briefcase,
    title: "Software Engineer",
    organization: "Health Analytics Co.",
    period: "2018 - 2020",
    description: "Developed data pipelines and analytics tools for healthcare providers across 5 states.",
    achievements: ["Built scalable data infrastructure", "Reduced processing time by 60%", "Mentored 3 junior developers"]
  },
  {
    id: 4,
    type: "achievement",
    icon: Award,
    title: "Global Health Innovation Award",
    organization: "WHO Digital Health Initiative",
    period: "2021",
    description: "Recognized for innovative approach to digital health solutions in developing countries.",
    achievements: ["Featured in 10+ publications", "Keynote at 3 conferences", "Grant funding secured"]
  }
];

export const ProfessionalTimeline = () => {
  return (
    <section className="py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-semibold mb-6">Professional Journey</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          A path driven by curiosity, innovation, and the desire to create meaningful impact
        </p>
      </div>

      <div className="max-w-4xl mx-auto">
        <div className="relative">
          {/* Timeline line */}
          <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-0.5 bg-border transform md:-translate-x-0.5" />
          
          {timelineEvents.map((event, index) => (
            <div
              key={event.id}
              className={`relative flex items-center mb-12 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
              }`}
            >
              {/* Icon */}
              <div className="absolute left-8 md:left-1/2 w-16 h-16 bg-background border-4 border-primary rounded-full flex items-center justify-center transform md:-translate-x-8 z-10">
                <event.icon className="w-6 h-6 text-primary" />
              </div>

              {/* Content */}
              <div className={`flex-1 ml-24 md:ml-0 ${index % 2 === 0 ? 'md:pr-12' : 'md:pl-12'}`}>
                <div className="bg-card border rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-sm font-medium text-primary">{event.period}</span>
                    <span className="text-xs px-2 py-1 bg-secondary rounded-full">
                      {event.type}
                    </span>
                  </div>
                  
                  <h3 className="text-xl font-serif font-semibold mb-1">{event.title}</h3>
                  <p className="text-muted-foreground font-medium mb-3">{event.organization}</p>
                  <p className="text-sm leading-relaxed mb-4">{event.description}</p>
                  
                  <ul className="space-y-1">
                    {event.achievements.map((achievement, achievementIndex) => (
                      <li key={achievementIndex} className="text-xs text-muted-foreground flex items-center">
                        <span className="w-1 h-1 bg-primary rounded-full mr-2" />
                        {achievement}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
