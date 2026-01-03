import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const FeaturedJournalEntry = () => {
  const featuredEntry = {
    title: "Lessons from Building in Southeast Asia: When Technology Meets Culture",
    excerpt: "Three months across Vietnam, Singapore, and Indonesia taught me more about product-market fit than any textbook ever could.",
    date: "January 15, 2025",
    readTime: "8 min read",
  };

  return (
    <section className="py-16 bg-slate-50 border-t border-slate-100">
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Simple Section Label */}
        <div className="text-xs uppercase tracking-wider text-slate-500 mb-8 text-center">
          Featured Entry
        </div>

        {/* Content */}
        <article className="bg-white border border-slate-200 p-8 md:p-12">
          <div className="space-y-6">
            {/* Meta */}
            <div className="flex items-center gap-4 text-sm text-slate-500">
              <time>{featuredEntry.date}</time>
              <span>•</span>
              <span>{featuredEntry.readTime}</span>
            </div>

            {/* Title */}
            <h2 className="text-2xl md:text-3xl font-medium text-slate-900 leading-tight">
              {featuredEntry.title}
            </h2>

            {/* Excerpt */}
            <p className="text-lg text-slate-600 leading-relaxed">
              {featuredEntry.excerpt}
            </p>

            {/* Read More */}
            <Button 
              variant="ghost" 
              className="text-slate-900 hover:text-slate-700 p-0 h-auto font-medium group"
            >
              Read Full Entry
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </article>
      </div>
    </section>
  );
};

export default FeaturedJournalEntry;
