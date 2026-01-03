
import { Card, CardContent } from "@/components/ui/card";
import { Lightbulb } from "lucide-react";

const notes = [
  {
    id: 1,
    content: "The best interfaces disappear into the background, leaving only the intention and the outcome.",
    timestamp: "2 hours ago"
  },
  {
    id: 2,
    content: "Writing is thinking made visible. Every draft reveals something new about what I actually believe.",
    timestamp: "1 day ago"
  },
  {
    id: 3,
    content: "Perhaps the most radical act in our attention economy is simply being present.",
    timestamp: "3 days ago"
  },
  {
    id: 4,
    content: "Good design is like a good friend: reliable, honest, and never demanding more attention than necessary.",
    timestamp: "1 week ago"
  }
];

export const QuickNotes = () => {
  return (
    <section className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <Lightbulb className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-semibold">Quick Notes</h2>
        </div>
        <p className="text-muted-foreground">Fleeting thoughts worth capturing</p>
      </div>
      
      <div className="space-y-4">
        {notes.map((note) => (
          <Card key={note.id} className="group cursor-pointer transition-all duration-200 hover:shadow-md hover:bg-accent/30">
            <CardContent className="p-4">
              <p className="text-sm leading-relaxed mb-3 italic">
                "{note.content}"
              </p>
              <p className="text-xs text-muted-foreground">{note.timestamp}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
