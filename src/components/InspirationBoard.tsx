
import { Card, CardContent } from "@/components/ui/card";
import { Quote } from "lucide-react";

const inspirations = [
  {
    id: 1,
    quote: "The best way to find out if you can trust somebody is to trust them.",
    author: "Ernest Hemingway",
    category: "Trust"
  },
  {
    id: 2,
    quote: "Simplicity is the ultimate sophistication.",
    author: "Leonardo da Vinci",
    category: "Design"
  },
  {
    id: 3,
    quote: "The quieter you become, the more you are able to hear.",
    author: "Rumi",
    category: "Mindfulness"
  },
  {
    id: 4,
    quote: "What we think, we become.",
    author: "Buddha",
    category: "Philosophy"
  }
];

export const InspirationBoard = () => {
  return (
    <section className="animate-fade-in">
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-3">
          <Quote className="w-6 h-6 text-primary" />
          <h2 className="text-3xl font-semibold">Inspiration Board</h2>
        </div>
        <p className="text-muted-foreground">Quotes and ideas that spark new thinking</p>
      </div>
      
      <div className="grid sm:grid-cols-2 gap-6">
        {inspirations.map((item) => (
          <Card key={item.id} className="group cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1">
            <CardContent className="p-6">
              <Quote className="w-8 h-8 text-accent mb-4 opacity-60" />
              <blockquote className="text-lg italic mb-4 leading-relaxed">
                "{item.quote}"
              </blockquote>
              <div className="flex items-center justify-between">
                <cite className="text-sm text-muted-foreground not-italic">
                  — {item.author}
                </cite>
                <span className="text-xs text-muted-foreground bg-accent/30 px-2 py-1 rounded">
                  {item.category}
                </span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
