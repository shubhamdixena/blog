import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, ArrowLeft, Share2 } from "lucide-react";
import { processArticleContent } from "@/utils/contentProcessor";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";
import { useReadingProgress } from "@/hooks/useReadingProgress";

type Post = Database['public']['Tables']['posts']['Row'] & {
  categories: { name: string; color: string; slug: string }[];
};

const Article = () => {
  const [article, setArticle] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const { slug } = useParams<{ slug: string }>();
  const { toast } = useToast();
  const readingProgress = useReadingProgress();

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
    // Scroll to top when component mounts (fixes mobile scroll issue)
    window.scrollTo(0, 0);
  }, [slug]);

  const fetchArticle = async () => {
    if (!slug) return;
    
    setLoading(true);
    setError(null);
    
    try {
      const { data, error: queryError } = await supabase
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
        .eq('slug', slug)
        .eq('status', 'published')
        .maybeSingle();

      if (queryError) {
        throw queryError;
      }

      if (data) {
        const postWithCategories = {
          ...data,
          categories: data.posts_categories?.map((pc: any) => pc.categories).filter(Boolean) || []
        } as Post;
        setArticle(postWithCategories);
      } else {
        setError('Article not found');
      }
    } catch (error: any) {
      console.error('Error fetching article:', error);
      setError('Failed to load article. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleShare = async () => {
    const url = window.location.href;
    const title = article?.title || 'Check out this article';
    
    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          url: url,
        });
      } catch (error) {
        console.log('Error sharing:', error);
        fallbackShare(url);
      }
    } else {
      fallbackShare(url);
    }
  };

  const fallbackShare = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast({
        title: "Link copied!",
        description: "Article link has been copied to your clipboard.",
      });
    }).catch(() => {
      toast({
        title: "Share",
        description: "Copy this link: " + url,
      });
    });
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
        <main className="container mx-auto px-6 py-16">
          <div className="animate-pulse">
            <div className="h-8 bg-muted rounded mb-4"></div>
            <div className="h-12 bg-muted rounded mb-6"></div>
            <div className="h-4 bg-muted rounded mb-2"></div>
            <div className="h-4 bg-muted rounded mb-8"></div>
            <div className="space-y-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="h-4 bg-muted rounded"></div>
              ))}
            </div>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  if (error || !article) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <main className="container mx-auto px-6 py-16">
          <div className="text-center">
            <h1 className="text-2xl font-medium mb-4">
              {error || 'Article Not Found'}
            </h1>
            <p className="text-muted-foreground mb-6">
              The article you're looking for doesn't exist or has been removed.
            </p>
            <Link to="/articles">
              <Button variant="outline">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Articles
              </Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background transition-colors duration-300">
      <Header />
      
      {/* Reading Progress Bar */}
      <div className="fixed top-0 left-0 right-0 h-1 bg-gray-200 z-50">
        <div 
          className="h-full bg-gradient-to-r from-blue-500 to-purple-500 transition-all duration-300"
          style={{ width: `${readingProgress}%` }}
        />
      </div>
      
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8 animate-fade-in">
            <Link to="/articles">
              <button className="group mb-6 flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors duration-200">
                <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
                <span>Back to Articles</span>
              </button>
            </Link>
            
            {article.categories.length > 0 && (
              <div className="flex gap-2 flex-wrap mb-6 animate-slide-up" style={{ animationDelay: '0.1s' }}>
                {article.categories.map((category, index) => (
                  <Link key={index} to={`/category/${category.slug}`}>
                    <span
                      className="inline-block px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 hover:scale-105 hover:shadow-md cursor-pointer"
                      style={{
                        backgroundColor: `${category.color}15`,
                        color: category.color,
                        border: `1px solid ${category.color}30`
                      }}
                    >
                      {category.name}
                    </span>
                  </Link>
                ))}
              </div>
            )}
            
            <h1 className="text-4xl md:text-6xl font-medium mb-8 leading-tight bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent animate-slide-up" style={{ animationDelay: '0.2s' }}>
              {article.title}
            </h1>
            
            <div className="flex items-center justify-between mb-12 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="flex items-center gap-8 text-muted-foreground">
                <div className="flex items-center gap-2 group">
                  <Calendar className="w-4 h-4 transition-colors group-hover:text-blue-500" />
                  <span className="transition-colors group-hover:text-foreground">
                    {formatDate(article.published_at || article.created_at)}
                  </span>
                </div>
                <div className="flex items-center gap-2 group">
                  <Clock className="w-4 h-4 transition-colors group-hover:text-blue-500" />
                  <span className="transition-colors group-hover:text-foreground">
                    {estimateReadingTime(article.content)}
                  </span>
                </div>
              </div>
              
              <button 
                onClick={handleShare}
                className="group flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-md"
              >
                <Share2 className="w-4 h-4 transition-transform group-hover:scale-110" />
                <span className="text-sm font-medium">Share</span>
              </button>
            </div>
          </div>

          {/* Article Content with Enhanced Styling */}
          <article className="animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <div className="prose prose-lg max-w-none">
              <div className="article-content space-y-6">
                {processArticleContent(article.content)}
              </div>
            </div>
          </article>

          {/* Floating Action Elements */}
          <div className="fixed right-6 bottom-6 flex flex-col gap-3 animate-scale-in" style={{ animationDelay: '0.6s' }}>
            <button 
              onClick={handleShare}
              className="group w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-50"
            >
              <Share2 className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors" />
            </button>
            <button 
              onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
              className="group w-12 h-12 bg-white shadow-lg hover:shadow-xl rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:bg-blue-50"
            >
              <ArrowLeft className="w-5 h-5 text-gray-600 group-hover:text-blue-600 transition-colors rotate-90" />
            </button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Article;
