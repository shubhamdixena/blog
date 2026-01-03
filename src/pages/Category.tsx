import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft } from "lucide-react";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'] & {
  categories: { name: string; color: string }[];
};

type Category = Database['public']['Tables']['categories']['Row'];

const Category = () => {
  const [articles, setArticles] = useState<Post[]>([]);
  const [category, setCategory] = useState<Category | null>(null);
  const [loading, setLoading] = useState(true);
  const { slug } = useParams<{ slug: string }>();

  useEffect(() => {
    // Scroll to top when component mounts (fixes auto-scrolling issue)
    window.scrollTo(0, 0);
    
    if (slug) {
      fetchCategoryAndArticles();
    }
  }, [slug]);

  const fetchCategoryAndArticles = async () => {
    if (!slug) return;
    
    setLoading(true);
    
    try {
      // First, get the category
      const { data: categoryData, error: categoryError } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

      if (categoryError) throw categoryError;
      setCategory(categoryData);

      // Then, get articles for this category
      const { data: articlesData, error: articlesError } = await supabase
        .from('posts')
        .select(`
          *,
          posts_categories!inner (
            categories!inner (
              name,
              color,
              slug
            )
          )
        `)
        .eq('status', 'published')
        .eq('posts_categories.categories.slug', slug)
        .order('published_at', { ascending: false });

      if (articlesError) throw articlesError;

      const postsWithCategories = articlesData?.map(post => ({
        ...post,
        categories: post.posts_categories?.map(pc => pc.categories).filter(Boolean) || []
      })) as Post[] || [];

      setArticles(postsWithCategories);
    } catch (error) {
      console.error('Error fetching category and articles:', error);
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

  const estimateReadingTime = (content: string) => {
    const wordsPerMinute = 200;
    const div = document.createElement('div');
    div.innerHTML = content;
    const text = div.textContent || div.innerText || '';
    const wordCount = text.split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / wordsPerMinute);
    return `${readingTime} min read`;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="max-w-4xl mx-auto px-4 py-12">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-4 bg-muted rounded mb-8"></div>
            <div className="space-y-6">
              {[1, 2, 3].map((i) => (
                <div key={i} className="border-b border-border/30 pb-6">
                  <div className="h-6 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded mb-2"></div>
                  <div className="h-4 bg-muted rounded w-3/4"></div>
                </div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-12">
        <div className="mb-8">
          <Link to="/articles">
            <Button variant="ghost" className="mb-6">
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Articles
            </Button>
          </Link>
          
          {category && (
            <div className="mb-6">
              <Badge
                variant="outline"
                className="mb-4 text-lg px-4 py-2"
                style={{
                  borderColor: category.color,
                  color: category.color,
                  backgroundColor: `${category.color}10`
                }}
              >
                {category.name}
              </Badge>
              {category.description && (
                <p className="text-muted-foreground text-lg">{category.description}</p>
              )}
            </div>
          )}
          
          <h1 className="text-4xl md:text-5xl font-serif font-semibold mb-4">
            {category?.name} Articles
          </h1>
          <p className="text-muted-foreground">
            {articles.length} article{articles.length !== 1 ? 's' : ''} found
          </p>
        </div>

        {articles.length > 0 ? (
          <div className="space-y-8">
            {articles.map((article) => (
              <Link key={article.id} to={`/article/${article.slug}`}>
                <article className="group border-b border-border/30 pb-8 hover:bg-muted/20 transition-colors duration-200 rounded-lg p-4 -m-4">
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                      <span className="font-medium">Editor</span>
                      <span>•</span>
                      <span>{formatDate(article.published_at || article.created_at)}</span>
                      <span>•</span>
                      <span>{estimateReadingTime(article.content)}</span>
                    </div>
                    
                    <h2 className="text-xl md:text-2xl font-serif font-semibold group-hover:text-primary transition-colors leading-tight">
                      {article.title}
                    </h2>
                    
                    <p className="text-muted-foreground leading-relaxed text-base">
                      {article.excerpt || article.content.substring(0, 200) + '...'}
                    </p>
                    
                    {article.categories.length > 0 && (
                      <div className="flex gap-2 flex-wrap">
                        {article.categories.map((cat, index) => (
                          <Badge
                            key={index}
                            variant="outline"
                            className="text-xs"
                            style={{
                              borderColor: cat.color,
                              color: cat.color,
                              backgroundColor: `${cat.color}10`
                            }}
                          >
                            {cat.name}
                          </Badge>
                        ))}
                      </div>
                    )}
                  </div>
                </article>
              </Link>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-muted-foreground mb-4">No articles found in this category.</p>
            <Link to="/articles">
              <Button variant="outline">Browse All Articles</Button>
            </Link>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Category;
