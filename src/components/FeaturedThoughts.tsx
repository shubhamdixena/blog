
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'] & {
  categories: { name: string; color: string; slug: string }[];
};

export const FeaturedThoughts = () => {
  const [featuredPost, setFeaturedPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchFeaturedPost();
  }, []);

  const fetchFeaturedPost = async () => {
    try {
      const { data, error } = await supabase
        .from('featured_posts')
        .select(`
          posts (
            *,
            posts_categories (
              categories (
                name,
                color,
                slug
              )
            )
          )
        `)
        .eq('active', true)
        .order('featured_at', { ascending: false })
        .limit(1)
        .single();

      if (error) throw error;

      if (data?.posts) {
        const post = {
          ...data.posts,
          categories: data.posts.posts_categories?.map(pc => pc.categories).filter(Boolean) || []
        } as Post;
        setFeaturedPost(post);
      }
    } catch (error) {
      console.error('Error fetching featured post:', error);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const stripHtml = (html: string) => {
    const div = document.createElement('div');
    div.innerHTML = html;
    return div.textContent || div.innerText || '';
  };

  if (loading) {
    return (
      <section className="py-16">
        <div className="container">
          <div className="mainline-card animate-pulse">
            <div className="h-8 bg-muted rounded w-1/3 mb-6"></div>
            <div className="h-64 bg-muted rounded-lg"></div>
          </div>
        </div>
      </section>
    );
  }

  if (!featuredPost) {
    return null;
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mainline-card">
          <div className="grid lg:grid-cols-2 gap-8 items-center">
            <div>
              <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4">
                <Calendar className="h-4 w-4" />
                {formatDate(featuredPost.published_at || featuredPost.created_at)}
              </div>

              {featuredPost.categories.length > 0 && (
                <div className="mb-4">
                  <span className="mainline-badge">
                    {featuredPost.categories[0].name}
                  </span>
                </div>
              )}

              <h2 className="text-3xl font-bold text-foreground mb-4 leading-tight">
                {featuredPost.title}
              </h2>

              <p className="text-muted-foreground mb-6 leading-relaxed">
                {featuredPost.excerpt || stripHtml(featuredPost.content).substring(0, 200) + '...'}
              </p>

              <Link to={`/article/${featuredPost.slug}`}>
                <Button className="mainline-button group">
                  Read Article
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </Link>
            </div>

            {featuredPost.featured_image_url && (
              <div className="order-first lg:order-last">
                <img
                  src={featuredPost.featured_image_url}
                  alt={featuredPost.title}
                  className="w-full h-64 lg:h-80 object-cover rounded-lg"
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
