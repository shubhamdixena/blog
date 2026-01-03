
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const timelineItems = [
  {
    year: "2024",
    count: 28,
    highlighted: "The Art of Slow Thinking",
    description: "Exploring mindfulness in decision-making"
  },
  {
    year: "2023",
    count: 45,
    highlighted: "Digital Sanctuary Series",
    description: "A deep dive into thoughtful technology"
  },
  {
    year: "2022",
    count: 32,
    highlighted: "Remote Work Reflections",
    description: "Lessons from distributed collaboration"
  },
  {
    year: "2021",
    count: 19,
    highlighted: "Beginning of the Journey",
    description: "First steps into public thinking"
  }
];

export const WritingTimeline = () => {
  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <h2 className="text-3xl font-serif font-semibold mb-3">Writing Timeline</h2>
        <p className="text-muted-foreground">A journey through ideas and growth</p>
      </div>
      
      <div className="space-y-6">
        {timelineItems.map((item, index) => (
          <div key={item.year} className="flex items-start gap-6 group">
            <div className="flex flex-col items-center">
              <div className="w-12 h-12 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-serif font-semibold text-sm">
                {item.year.slice(-2)}
              </div>
              {index < timelineItems.length - 1 && (
                <div className="w-px h-16 bg-border mt-4"></div>
              )}
            </div>
            
            <Card className="flex-1 group-hover:shadow-md transition-all duration-200">
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-serif font-medium">{item.year}</h3>
                  <Badge variant="secondary">{item.count} posts</Badge>
                </div>
                <h4 className="font-medium mb-2 text-primary">{item.highlighted}</h4>
                <p className="text-sm text-muted-foreground">{item.description}</p>
              </CardContent>
            </Card>
          </div>
        ))}
      </div>
    </section>
  );
};
