
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const techArticles = [
  {
    id: 1,
    title: "The Future of Quantum Computing",
    excerpt: "How quantum computers will revolutionize everything from drug discovery to cryptography in the next decade.",
    date: "March 20, 2024",
    readTime: "12 min",
    category: "Technology",
    slug: "quantum-computing-future",
    image: "https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=600&h=400&fit=crop"
  },
  {
    id: 2,
    title: "AI Ethics in Healthcare",
    excerpt: "Navigating the complex ethical landscape of artificial intelligence in medical diagnosis and treatment.",
    date: "March 18, 2024",
    readTime: "8 min",
    category: "Technology",
    slug: "ai-ethics-healthcare",
    image: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop"
  },
  {
    id: 3,
    title: "Blockchain Beyond Cryptocurrency",
    excerpt: "Exploring real-world applications of blockchain technology in supply chain, voting, and digital identity.",
    date: "March 15, 2024",
    readTime: "10 min",
    category: "Technology",
    slug: "blockchain-beyond-crypto",
    image: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?w=600&h=400&fit=crop"
  }
];

export const TechSpotlight = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Technology Spotlight</h2>
          <p className="text-muted-foreground">
            Latest insights on emerging technologies and their impact
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {techArticles.map((article) => (
            <Link key={article.id} to={`/article/${article.slug}`} className="group">
              <article className="mainline-card group-hover:shadow-lg transition-all duration-200">
                <div className="aspect-video overflow-hidden rounded-lg mb-4">
                  <img
                    src={article.image}
                    alt={article.title}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                  />
                </div>
                
                <div className="flex items-center gap-4 text-xs text-muted-foreground mb-3">
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    {article.date}
                  </div>
                  <div className="flex items-center gap-1">
                    <Clock className="h-3 w-3" />
                    {article.readTime}
                  </div>
                </div>
                
                <span className="mainline-badge mb-3">
                  {article.category}
                </span>
                
                <h3 className="font-semibold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors">
                  {article.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {article.excerpt}
                </p>
              </article>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
