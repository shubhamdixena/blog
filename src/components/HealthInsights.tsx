
import { Calendar, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const healthArticles = [
  {
    id: 1,
    title: "Global Vaccine Equity: Lessons from the Pandemic",
    excerpt: "Examining how vaccine distribution inequalities affected global health outcomes and what we can do better for future health crises.",
    date: "March 22, 2024",
    readTime: "15 min",
    category: "Global Health",
    slug: "vaccine-equity-pandemic",
    image: "https://images.unsplash.com/photo-1576673442414-92e9c7502b7a?w=800&h=500&fit=crop",
  },
  {
    id: 2,
    title: "Mental Health in the Digital Age",
    excerpt: "How technology is reshaping mental healthcare delivery and creating new challenges for wellbeing.",
    date: "March 20, 2024",
    readTime: "12 min",
    category: "Mental Health",
    slug: "mental-health-digital-age",
    image: "https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=800&h=500&fit=crop",
  },
  {
    id: 3,
    title: "Precision Medicine Revolution",
    excerpt: "Personalized treatments based on genetic profiles are transforming patient care and treatment outcomes.",
    date: "March 18, 2024",
    readTime: "10 min",
    category: "Precision Medicine",
    slug: "precision-medicine-revolution",
    image: "https://images.unsplash.com/photo-1582750433449-648ed127bb54?w=800&h=500&fit=crop",
  }
];

export const HealthInsights = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Health & Society</h2>
          <p className="text-muted-foreground">
            Deep dives into global health challenges and solutions
          </p>
        </div>
        
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {healthArticles.map((article) => (
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
