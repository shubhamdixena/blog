
import { Link } from "react-router-dom";

export const RecentWriting = () => {
  const articles = [
    {
      id: 1,
      title: "Global Vaccine Equity: Lessons from the Pandemic",
      date: "March 22, 2024",
      readTime: "8 min",
      slug: "vaccine-equity-pandemic"
    },
    {
      id: 2,
      title: "Mental Health in the Digital Age",
      date: "March 20, 2024",
      readTime: "6 min",
      slug: "mental-health-digital"
    },
    {
      id: 3,
      title: "Blockchain Beyond Cryptocurrency",
      date: "March 18, 2024",
      readTime: "10 min",
      slug: "blockchain-beyond-crypto"
    },
    {
      id: 4,
      title: "The Ethics of AI in Healthcare",
      date: "March 15, 2024",
      readTime: "12 min",
      slug: "ai-ethics-healthcare"
    },
    {
      id: 5,
      title: "Climate Tech Innovations to Watch",
      date: "March 12, 2024",
      readTime: "7 min",
      slug: "climate-tech-innovations"
    }
  ];

  return (
    <section className="py-12 border-b border-gray-100">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-medium text-foreground">Recent Writing</h3>
        <Link 
          to="/articles" 
          className="text-sm text-muted-foreground hover:text-foreground transition-colors"
        >
          View all →
        </Link>
      </div>
      
      <div className="space-y-4">
        {articles.map((article) => (
          <Link 
            key={article.id} 
            to={`/article/${article.slug}`}
            className="group block py-2 border-b border-gray-50 last:border-b-0"
          >
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1">
                <h4 className="font-medium text-foreground group-hover:text-primary transition-colors leading-tight">
                  {article.title}
                </h4>
                <div className="flex items-center gap-3 mt-1 text-xs text-muted-foreground">
                  <span>{article.date}</span>
                  <span>•</span>
                  <span>{article.readTime}</span>
                </div>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};
