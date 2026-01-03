
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Calendar, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'] & {
  categories: { name: string; color: string }[];
};

export const RecentArticles = () => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchRecentPosts();
  }, []);

  const fetchRecentPosts = async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          posts_categories (
            categories (
              name,
              color
            )
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false })
        .limit(6);

      if (error) throw error;

      const postsWithCategories = data?.map(post => ({
        ...post,
        categories: post.posts_categories?.map(pc => pc.categories).filter(Boolean) || []
      })) || [];

      setPosts(postsWithCategories);
    } catch (error) {
      console.error('Error fetching recent posts:', error);
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
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-foreground mb-2">Recent Articles</h2>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="mainline-card animate-pulse">
                <div className="aspect-video bg-muted rounded mb-4"></div>
                <div className="h-4 bg-muted rounded w-3/4 mb-2"></div>
                <div className="h-3 bg-muted rounded w-full mb-1"></div>
                <div className="h-3 bg-muted rounded w-2/3"></div>
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="py-16">
      <div className="container">
        <div className="mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-2">Recent Articles</h2>
          <p className="text-muted-foreground">
            Latest insights and perspectives from our collection
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
          {posts.map((post) => (
            <Link key={post.id} to={`/article/${post.slug}`} className="group h-full flex">
              <article className="mainline-card group-hover:shadow-lg transition-all duration-200 flex flex-col h-full w-full">
                {post.featured_image_url && (
                  <div className="aspect-video overflow-hidden rounded-lg mb-4">
                    <img
                      src={post.featured_image_url}
                      alt={post.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-200"
                    />
                  </div>
                )}
                
                <div className="flex items-center gap-2 text-xs text-muted-foreground mb-3">
                  <Calendar className="h-3 w-3" />
                  {formatDate(post.published_at || post.created_at)}
                </div>

                {post.categories.length > 0 && (
                  <div className="mb-3">
                    <span className="mainline-badge">
                      {post.categories[0].name}
                    </span>
                  </div>
                )}

                <h3 className="font-semibold text-foreground mb-2 leading-tight group-hover:text-primary transition-colors line-clamp-3 min-h-[4.5rem]">
                  {post.title}
                </h3>

                {/* Spacer to push excerpt to bottom */}
                <div className="flex-1"></div>

                <p className="text-sm text-muted-foreground leading-relaxed mt-auto">
                  {post.excerpt || stripHtml(post.content).substring(0, 120) + '...'}
                </p>
              </article>
            </Link>
          ))}
        </div>

        <div className="text-center">
          <Link to="/articles">
            <Button className="mainline-button group">
              View All Articles
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};
