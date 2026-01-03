import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentJournalEntries = () => {
  const recentEntries = [
    {
      title: "Building in Public: The Good, Bad, and Ugly",
      excerpt: "Six months of sharing my startup journey on social media taught me unexpected lessons about vulnerability and community.",
      date: "January 20, 2025",
      readTime: "6 min",
      category: "Entrepreneurship"
    },
    {
      title: "Tokyo's Convenience Culture: Lessons in User Experience",
      excerpt: "How Japan's konbini revolutionized retail and what Western startups can learn from their obsession with customer convenience.",
      date: "January 18, 2025",
      readTime: "4 min",
      category: "Travel & Tech"
    },
    {
      title: "The AI Tool That Changed How I Write",
      excerpt: "After testing 27 different AI writing assistants, I found one that actually makes me a better thinker, not just a faster writer.",
      date: "January 16, 2025",
      readTime: "5 min",
      category: "Technology"
    },
    {
      title: "Why I Deleted LinkedIn (And What Happened Next)",
      excerpt: "A 90-day experiment in professional networking without social media led to surprising discoveries about authentic relationship building.",
      date: "January 14, 2025",
      readTime: "7 min",
      category: "Personal Growth"
    },
    {
      title: "The $50K Mistake That Taught Me Product Strategy",
      excerpt: "How burning through our entire seed funding on the wrong features led to our most valuable product insights.",
      date: "January 12, 2025",
      readTime: "8 min",
      category: "Entrepreneurship"
    }
  ];

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
            Recent Entries
          </h2>
          <p className="text-slate-600">
            Latest thoughts and observations from my ongoing journey.
          </p>
        </div>

        {/* Entries List */}
        <div className="space-y-8">
          {recentEntries.map((entry, index) => (
            <article key={index} className="bg-white border border-slate-200 p-6 md:p-8 hover:shadow-sm transition-shadow">
              <div className="space-y-4">
                {/* Meta */}
                <div className="flex items-center gap-3 text-sm text-slate-500">
                  <time>{entry.date}</time>
                  <span>•</span>
                  <span>{entry.readTime}</span>
                  <span>•</span>
                  <span>{entry.category}</span>
                </div>

                {/* Title */}
                <h3 className="text-xl font-medium text-slate-900 leading-tight hover:text-slate-700 transition-colors">
                  {entry.title}
                </h3>

                {/* Excerpt */}
                <p className="text-slate-600 leading-relaxed">
                  {entry.excerpt}
                </p>

                {/* Read More */}
                <Button 
                  variant="ghost" 
                  className="text-slate-900 hover:text-slate-700 p-0 h-auto font-medium group"
                >
                  Read More
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* Load More */}
        <div className="text-center mt-16">
          <Button 
            variant="outline"
            className="border border-slate-300 hover:border-slate-900 text-slate-900 px-6 py-2 rounded-none text-sm font-medium"
          >
            View All Entries
          </Button>
        </div>
      </div>
    </section>
  );
};

export default RecentJournalEntries;
