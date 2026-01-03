
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { BookOpen } from "lucide-react";

const books = [
  {
    id: 1,
    title: "The Art of Gathering",
    author: "Priya Parker",
    status: "reading",
    progress: 65,
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop"
  },
  {
    id: 2,
    title: "Digital Minimalism",
    author: "Cal Newport",
    status: "finished",
    cover: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?w=120&h=180&fit=crop"
  },
  {
    id: 3,
    title: "The Practice",
    author: "Seth Godin",
    status: "next",
    cover: "https://images.unsplash.com/photo-1481627834876-b7833e8f5570?w=120&h=180&fit=crop"
  }
];

export const ReadingShelf = () => {
  return (
    <section id="reading" className="animate-fade-in">
      <div className="mb-6">
        <div className="flex items-center gap-3 mb-3">
          <BookOpen className="w-6 h-6 text-primary" />
          <h2 className="text-2xl font-serif font-semibold">Reading Shelf</h2>
        </div>
        <p className="text-muted-foreground">Books shaping my thinking</p>
      </div>
      
      <div className="space-y-4">
        {books.map((book) => (
          <Card key={book.id} className="group cursor-pointer transition-all duration-200 hover:shadow-md">
            <CardContent className="p-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-16 rounded overflow-hidden flex-shrink-0">
                  <img 
                    src={book.cover} 
                    alt={book.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-medium text-sm mb-1 truncate">{book.title}</h3>
                  <p className="text-xs text-muted-foreground mb-2">{book.author}</p>
                  <div className="flex items-center gap-2">
                    <Badge 
                      variant={book.status === 'reading' ? 'default' : 'secondary'} 
                      className="text-xs"
                    >
                      {book.status}
                    </Badge>
                    {book.progress && (
                      <span className="text-xs text-muted-foreground">
                        {book.progress}%
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
