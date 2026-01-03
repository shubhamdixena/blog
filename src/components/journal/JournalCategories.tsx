import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const JournalCategories = () => {
  const categories = [
    {
      title: "Technology & Innovation",
      description: "Thoughts on emerging technologies, product development, and the future of digital experiences.",
      count: 73,
      recent: "The AI Paradox: More Automation, More Human Jobs"
    },
    {
      title: "Travel & Culture",
      description: "Observations from different markets, cultural insights, and how geography shapes innovation.",
      count: 47,
      recent: "Digital Nomad Lessons from Bali's Startup Scene"
    },
    {
      title: "Entrepreneurship",
      description: "Building companies, product-market fit, and the realities of startup life.",
      count: 62,
      recent: "Why My First Startup Failed (And What I'd Do Differently)"
    },
    {
      title: "Personal Development",
      description: "Learning frameworks, productivity systems, and reflections on continuous growth.",
      count: 38,
      recent: "Morning Routines That Actually Work (After 5 Years of Testing)"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Simple Header */}
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-3xl font-medium text-slate-900 mb-4">
            Writing Categories
          </h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Four main areas where I document experiences and share insights.
          </p>
        </div>

        {/* Categories List */}
        <div className="space-y-12">
          {categories.map((category, index) => (
            <article key={index} className="border-b border-slate-100 pb-12 last:border-b-0">
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-medium text-slate-900">
                      {category.title}
                    </h3>
                    <span className="text-sm text-slate-500">
                      ({category.count})
                    </span>
                  </div>
                  
                  <p className="text-slate-600 mb-4 leading-relaxed">
                    {category.description}
                  </p>
                  
                  <div className="text-sm text-slate-500">
                    <span className="font-medium">Latest:</span> {category.recent}
                  </div>
                </div>

                <Button 
                  variant="ghost" 
                  className="text-slate-900 hover:text-slate-700 md:flex-shrink-0 justify-start md:justify-center group"
                >
                  View All
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </Button>
              </div>
            </article>
          ))}
        </div>

        {/* All Articles Link */}
        <div className="text-center mt-16 pt-8 border-t border-slate-100">
          <Button 
            variant="outline"
            className="border border-slate-300 hover:border-slate-900 text-slate-900 px-6 py-2 rounded-none text-sm font-medium"
          >
            Browse All Articles
          </Button>
        </div>
      </div>
    </section>
  );
};

export default JournalCategories;
