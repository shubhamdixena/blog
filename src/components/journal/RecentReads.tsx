import { FileText, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const RecentReads = () => {
  const articles = [
    {
      title: "How getting rejected by a top school taught me more than any textbook",
      image: "https://images.unsplash.com/photo-1523240795612-9a054b0db644?w=400&h=300&fit=crop&q=80",
      date: "March 15, 2024",
      readTime: "8 min read",
      category: "Personal Stories",
      tags: ["Rejection", "Learning", "Growth"]
    },
    {
      title: "What most students completely miss about statement of purpose",
      image: "https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=400&h=300&fit=crop&q=80",
      date: "March 8, 2024", 
      readTime: "6 min read",
      category: "Application Tips",
      tags: ["SOP", "Essays", "Applications"]
    },
    {
      title: "Small acts that changed the outcome for someone applying from a marginalized background",
      image: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?w=400&h=300&fit=crop&q=80",
      date: "March 2, 2024",
      readTime: "7 min read",
      category: "Social Impact",
      tags: ["Inclusion", "Support", "Community"]
    },
    {
      title: "Ground realities from my time running youth programs in small towns",
      image: "https://images.unsplash.com/photo-1529390079861-591de354faf5?w=400&h=300&fit=crop&q=80",
      date: "February 28, 2024",
      readTime: "10 min read",
      category: "Field Notes",
      tags: ["Rural India", "Youth", "Education"]
    }
  ];

  return (
    <section className="py-16 md:py-20 lg:py-24 bg-white border-t border-slate-100">
      <div className="max-w-6xl mx-auto px-6 md:px-8 lg:px-12">
        {/* Section Header */}
        <div className="mb-12 flex items-start justify-between">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <FileText className="w-5 h-5 text-slate-600" />
              <h2 className="text-3xl md:text-4xl font-semibold text-slate-900">
                Latest Journals and Stories
              </h2>
            </div>
            <p className="text-lg text-slate-600">
              Real experiences from mentoring, application journeys, and ground-level insights from working with students.
            </p>
          </div>
          
          {/* Read All Articles Button - Top Right */}
          <Button 
            variant="outline"
            className="px-6 py-2 text-slate-900 border-slate-300 hover:bg-slate-50 font-medium group"
          >
            Read All Articles
            <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </Button>
        </div>

        {/* Articles Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-12">
          {articles.slice(0, 3).map((article, index) => (
            <article key={index} className="group cursor-pointer h-full flex flex-col">
              {/* Article Image */}
              <div className="mb-4">
                <img
                  src={article.image}
                  alt={article.title}
                  className="w-full aspect-[4/3] object-cover transition-transform duration-300 group-hover:scale-105"
                />
              </div>

              {/* Content */}
              <div className="flex flex-col flex-1 space-y-3">
                {/* Category */}
                <div className="inline-block px-3 py-1 bg-slate-100 text-slate-700 text-xs font-medium rounded-full w-fit">
                  {article.category}
                </div>

                {/* Title - Fixed height with line clamping */}
                <h3 className="text-xl md:text-2xl font-semibold text-slate-900 mb-2 leading-tight group-hover:text-slate-700 transition-colors line-clamp-3 min-h-[4.5rem] md:min-h-[6rem]">
                  {article.title}
                </h3>

                {/* Spacer to push content to bottom */}
                <div className="flex-1"></div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag, tagIndex) => (
                    <span 
                      key={tagIndex}
                      className="px-2 py-1 bg-slate-50 text-slate-600 text-xs rounded border"
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Date & Read Time */}
                <div className="flex items-center gap-2 text-xs text-slate-500 pt-1 mt-auto">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </article>
          ))}
        </div>


      </div>
    </section>
  );
};

export default RecentReads;
