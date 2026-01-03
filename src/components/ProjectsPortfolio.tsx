
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ExternalLink, Github, Filter } from "lucide-react";

const projects = [
  {
    id: 1,
    title: "HealthTech Analytics Platform",
    description: "AI-powered analytics platform for healthcare providers to optimize patient outcomes and resource allocation.",
    image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=300&fit=crop",
    tags: ["React", "Python", "ML", "Healthcare"],
    category: "Health",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Climate Data Visualization",
    description: "Interactive dashboard for visualizing climate change data and trends across different regions.",
    image: "https://images.unsplash.com/photo-1569163139394-de44cb09c2ba?w=600&h=300&fit=crop",
    tags: ["Vue.js", "D3.js", "API", "Climate"],
    category: "Climate",
    liveUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Educational Content CMS",
    description: "Content management system for educational institutions with AI-powered content recommendations.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=300&fit=crop",
    tags: ["Next.js", "TypeScript", "Supabase", "Education"],
    category: "Education",
    liveUrl: "#",
    githubUrl: "#"
  }
];

const categories = ["All", "Health", "Climate", "Education", "Technology"];

export const ProjectsPortfolio = () => {
  const [activeCategory, setActiveCategory] = useState("All");
  
  const filteredProjects = activeCategory === "All" 
    ? projects 
    : projects.filter(project => project.category === activeCategory);

  return (
    <section className="py-20 animate-fade-in">
      <div className="text-center mb-16">
        <h2 className="text-4xl font-serif font-semibold mb-6">Featured Projects</h2>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Building solutions that make a meaningful impact in health, climate, and education
        </p>
      </div>

      <div className="flex flex-wrap justify-center gap-4 mb-12">
        {categories.map((category) => (
          <Button
            key={category}
            variant={activeCategory === category ? "default" : "outline"}
            onClick={() => setActiveCategory(category)}
            className="rounded-full"
          >
            {category}
          </Button>
        ))}
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProjects.map((project) => (
          <Card key={project.id} className="group hover:shadow-xl transition-all duration-300 overflow-hidden">
            <div className="aspect-video overflow-hidden">
              <img
                src={project.image}
                alt={project.title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </div>
            <CardContent className="p-6">
              <h3 className="text-xl font-serif font-semibold mb-2">{project.title}</h3>
              <p className="text-muted-foreground mb-4 text-sm leading-relaxed">
                {project.description}
              </p>
              
              <div className="flex flex-wrap gap-2 mb-4">
                {project.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 bg-secondary text-xs rounded-full"
                  >
                    {tag}
                  </span>
                ))}
              </div>

              <div className="flex gap-3">
                <Button size="sm" variant="outline" className="flex-1">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Github className="w-4 h-4 mr-2" />
                  Code
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};
