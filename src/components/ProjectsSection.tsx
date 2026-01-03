import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Project = Database['public']['Tables']['posts']['Row'];

const getStatusColor = (status: string) => {
  switch (status) {
    case "Live":
      return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
    case "In Development":
      return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
    case "Prototype":
      return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
    case "Research Phase":
      return "bg-purple-100 text-purple-800 dark:bg-purple-900 dark:text-purple-300";
    default:
      return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
  }
};

const ProjectsSection = () => {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchProjects();
  }, []);

  const fetchProjects = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('*')
        .eq('is_project', true)
        .eq('status', 'published')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setProjects(data || []);
    } catch (error) {
      console.error('Error fetching projects:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Projects & Current Work</h2>
          <p className="text-muted-foreground">Loading projects...</p>
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section>
        <div className="mb-8">
          <h2 className="text-2xl font-serif font-semibold mb-3">Projects & Current Work</h2>
          <p className="text-muted-foreground">
            No projects are currently featured. Check back soon for updates on my latest work.
          </p>
        </div>
      </section>
    );
  }

  return (
    <section>
      <div className="mb-8">
        <h2 className="text-2xl font-serif font-semibold mb-3">Projects & Current Work</h2>
        <p className="text-muted-foreground">
          Exploring innovative solutions at the intersection of technology and social impact
        </p>
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        {projects.map((project, index) => (
          <Card
            key={project.id}
            className="group hover-lift animate-fade-in"
            style={{ animationDelay: `${index * 100}ms`, opacity: 0, animationFillMode: "forwards" }}
          >
            <CardHeader>
              <div className="flex items-start justify-between mb-2">
                <Badge className={`text-xs ${getStatusColor(project.project_status || 'In Development')}`}>
                  {project.project_status || 'In Development'}
                </Badge>
                <div className="flex gap-2">
                  {project.github_url && (
                    <a
                      href={project.github_url}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <Github className="w-4 h-4" />
                    </a>
                  )}
                  {project.demo_url && (
                    <a
                      href={project.demo_url}
                      className="text-muted-foreground hover:text-foreground transition-colors"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}
                </div>
              </div>
              <CardTitle className="text-lg font-serif group-hover:text-primary transition-colors">
                {project.title}
              </CardTitle>
              <CardDescription className="leading-relaxed">
                {project.excerpt || 'No description available'}
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mb-4">
                {project.technologies?.map((tech, index) => (
                  <Badge key={index} variant="outline" className="text-xs">
                    {tech}
                  </Badge>
                ))}
              </div>
              <Link to={`/article/${project.slug}`} className="inline-flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors">
                Read detailed article
                <ArrowRight className="w-3 h-3" />
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
};

export default ProjectsSection;
