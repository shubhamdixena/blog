import { useState, useEffect } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, Clock, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'] & {
  categories: { name: string; color: string; slug: string }[] | null;
};

const Articles = () => {
  const [allArticles, setAllArticles] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  useEffect(() => {
    window.scrollTo(0, 0);
    fetchArticles();
  }, []);

  const fetchArticles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from('posts')
        .select(`
          *,
          posts_categories (
            categories (
              name,
              color,
              slug
            )
          )
        `)
        .eq('status', 'published')
        .order('published_at', { ascending: false });

      if (error) throw error;

      const postsWithCategories = data?.map(post => ({
        ...post,
        categories: post.posts_categories.map((pc: any) => pc.categories).filter(Boolean)
      })) || [];

      setAllArticles(postsWithCategories as Post[]);
    } catch (error) {
      console.error("Failed to fetch articles:", error);
    } finally {
      setLoading(false);
    }
  };

  const categories = ["All", "Technology", "Global Health", "Climate", "Education", "Personal", "Career", "Programming", "Life"];

  const filteredArticles = allArticles.filter(article => {
    const matchesSearch = article.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (article.excerpt && article.excerpt.toLowerCase().includes(searchTerm.toLowerCase()));
    
    const articleCategories = article.categories?.map(c => c.name) || [];
    const matchesCategory = selectedCategory === "All" || articleCategories.includes(selectedCategory);
    
    return matchesSearch && matchesCategory;
  });

  const formatDate = (dateString: string | null) => {
    if (!dateString) return '';
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

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      <main className="container mx-auto px-6 py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-medium mb-4">All Articles</h1>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Explore all my thoughts and insights on technology, health, climate, and education
          </p>
        </div>

        {/* Search and Filter */}
        <div className="mb-12 space-y-6">
          <div className="relative max-w-md mx-auto">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
            <Input
              placeholder="Search articles..."
              className="pl-10"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          
          <div className="flex justify-center flex-wrap gap-2">
            {categories.map((category) => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                size="sm"
                onClick={() => setSelectedCategory(category)}
              >
                {category}
              </Button>
            ))}
          </div>
        </div>

        {/* Articles List */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-muted-foreground">Loading articles...</p>
          </div>
        ) : (
          <div className="space-y-8">
            {filteredArticles.map((article) => (
              <Link key={article.id} to={`/article/${article.slug}`}>
                <article className="group border-b border-border/30 pb-8 hover:bg-muted/20 transition-colors duration-200 rounded-lg p-4 -m-4">
                  <div className="grid md:grid-cols-3 gap-6 items-start">
                    <div className="md:col-span-2 space-y-3">
                      <div className="flex items-center gap-3 text-sm text-muted-foreground">
                        <span className="font-medium">Shubham Dixena</span>
                        <span>•</span>
                        <span>{formatDate(article.published_at)}</span>
                        <span>•</span>
                        <span>{estimateReadingTime(article.content)}</span>
                      </div>
                      
                      <h2 className="text-xl md:text-2xl font-medium group-hover:text-primary transition-colors leading-tight">
                        {article.title}
                      </h2>
                      
                      <p className="text-muted-foreground leading-relaxed text-base">
                        {article.excerpt}
                      </p>
                    </div>
                    
                    <div className="flex items-start justify-between md:justify-end">
                      {article.categories && article.categories.length > 0 && (
                        <Badge variant="outline" className="text-xs">
                          {article.categories[0].name}
                        </Badge>
                      )}
                    </div>
                  </div>
                </article>
              </Link>
            ))}
          </div>
        )}

        {!loading && filteredArticles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No articles found matching your search criteria.</p>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Articles;
