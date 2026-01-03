
import { Link } from "react-router-dom";

export const FeaturedArticle = () => {
  const featuredArticle = {
    title: "The Future of Quantum Computing in Healthcare",
    excerpt: "How quantum computers will revolutionize drug discovery, personalized medicine, and medical imaging in the next decade. From molecular simulation to genetic analysis, we're on the cusp of a healthcare transformation.",
    date: "March 24, 2024",
    readTime: "12 min read",
    category: "Technology",
    slug: "quantum-computing-healthcare-future",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=800&h=400&fit=crop"
  };

  return (
    <section className="py-12 border-b border-gray-100">
      <Link to={`/article/${featuredArticle.slug}`} className="group block">
        <div className="grid md:grid-cols-2 gap-6 md:gap-8 items-center">
          <div className="order-2 md:order-1">
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-xs text-muted-foreground mb-3">
              <span>{featuredArticle.category}</span>
              <span>•</span>
              <span>{featuredArticle.date}</span>
              <span>•</span>
              <span>{featuredArticle.readTime}</span>
            </div>
            
            <h2 className="text-xl sm:text-2xl font-medium text-foreground mb-3 md:mb-4 leading-tight group-hover:text-primary transition-colors">
              {featuredArticle.title}
            </h2>
            
            <p className="text-sm sm:text-base text-muted-foreground leading-relaxed mb-4">
              {featuredArticle.excerpt}
            </p>
            
            <span className="text-sm font-medium text-primary group-hover:underline">
              Read article →
            </span>
          </div>
          
          <div className="order-1 md:order-2 aspect-video overflow-hidden rounded-sm">
            <img
              src={featuredArticle.image}
              alt={featuredArticle.title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />
          </div>
        </div>
      </Link>
    </section>
  );
};
