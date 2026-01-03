
import { Card, CardContent } from "@/components/ui/card";

const mediaMentions = [
  {
    id: 1,
    publication: "TechCrunch",
    logo: "TC",
    url: "#"
  },
  {
    id: 2,
    publication: "Forbes",
    logo: "F",
    url: "#"
  },
  {
    id: 3,
    publication: "Wired",
    logo: "W",
    url: "#"
  },
  {
    id: 4,
    publication: "BBC News",
    logo: "BBC",
    url: "#"
  },
  {
    id: 5,
    publication: "The Guardian",
    logo: "G",
    url: "#"
  },
  {
    id: 6,
    publication: "Reuters",
    logo: "R",
    url: "#"
  }
];

const getLogoStyle = (publication: string) => {
  const styles = {
    "TechCrunch": "bg-green-600 text-white",
    "Forbes": "bg-blue-600 text-white",
    "Wired": "bg-black text-white",
    "BBC News": "bg-red-600 text-white",
    "The Guardian": "bg-blue-800 text-white",
    "Reuters": "bg-orange-600 text-white"
  };
  return styles[publication as keyof typeof styles] || "bg-gray-600 text-white";
};

export const MediaMentions = () => {
  return (
    <section className="mb-16">
      <div className="mb-8">
        <h2 className="text-2xl font-light mb-3">Media Mentions</h2>
        <p className="text-muted-foreground">
          Featured in major publications
        </p>
      </div>
      
      <div className="grid grid-cols-3 md:grid-cols-6 gap-4">
        {mediaMentions.map((mention) => (
          <a
            key={mention.id}
            href={mention.url}
            className="group"
          >
            <Card className="h-20 hover:shadow-md transition-all duration-200 border-border/50">
              <CardContent className="p-0 h-full flex items-center justify-center">
                <div className={`w-12 h-12 rounded-lg text-sm font-bold flex items-center justify-center ${getLogoStyle(mention.publication)} group-hover:scale-105 transition-transform`}>
                  {mention.logo}
                </div>
              </CardContent>
            </Card>
          </a>
        ))}
      </div>
    </section>
  );
};
