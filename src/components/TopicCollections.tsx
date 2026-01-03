
import { Link } from "react-router-dom";

const collections = [
  {
    id: 1,
    title: "Technology",
    description: "Innovation, AI, and the future of computing",
    count: 24,
    slug: "technology"
  },
  {
    id: 2,
    title: "Global Health",
    description: "Healthcare innovations and public health insights",
    count: 18,
    slug: "global-health"
  },
  {
    id: 3,
    title: "Climate",
    description: "Environmental challenges and clean energy solutions",
    count: 15,
    slug: "climate"
  },
  {
    id: 4,
    title: "Education",
    description: "Learning, literacy, and educational technology",
    count: 12,
    slug: "education"
  }
];

export const TopicCollections = () => {
  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Explore by Topic</h2>
          <p className="text-muted-foreground">Browse articles by subject area</p>
        </div>
        
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {collections.map((collection) => (
            <Link key={collection.id} to={`/category/${collection.slug}`} className="group">
              <div className="mainline-card group-hover:shadow-lg transition-all duration-200">
                <div className="mb-3">
                  <span className="mainline-badge">
                    {collection.count} articles
                  </span>
                </div>
                <h3 className="font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
                  {collection.title}
                </h3>
                <p className="text-sm text-muted-foreground">
                  {collection.description}
                </p>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
