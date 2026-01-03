
import { useState, useEffect, useCallback, useMemo } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { CompactPostEditor } from "./CompactPostEditor";
import { Plus, Edit, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { Database } from "@/integrations/supabase/types";

type Post = Database['public']['Tables']['posts']['Row'];

interface PostsManagerProps {
  activeTab: string;
}

export const PostsManager = ({ activeTab }: PostsManagerProps) => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [showEditor, setShowEditor] = useState(false);
  const { toast } = useToast();

  const fetchPosts = useCallback(async () => {
    try {
      const { data, error } = await supabase
        .from('posts')
        .select('id, title, excerpt, status, created_at, published_at, slug')
        .order('created_at', { ascending: false })
        .limit(50); // Limit to 50 posts for better performance

      if (error) throw error;
      setPosts(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch posts",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  }, [toast]);

  useEffect(() => {
    if (activeTab === 'posts') {
      fetchPosts();
    }
  }, [activeTab, fetchPosts]);

  const handleDeletePost = useCallback(async (postId: string) => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      const { error } = await supabase
        .from('posts')
        .delete()
        .eq('id', postId);

      if (error) throw error;

      // Optimistically update the UI instead of refetching
      setPosts(prev => prev.filter(post => post.id !== postId));
      
      toast({
        title: "Success",
        description: "Post deleted successfully",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete post",
        variant: "destructive",
      });
      // Refetch on error to ensure consistency
      fetchPosts();
    }
  }, [toast, fetchPosts]);

  const handleEditPost = useCallback((post: Post) => {
    setEditingPost(post);
    setShowEditor(true);
  }, []);

  const handleCreatePost = useCallback(() => {
    setEditingPost(null);
    setShowEditor(true);
  }, []);

  const handleEditorClose = useCallback(() => {
    setShowEditor(false);
    setEditingPost(null);
    fetchPosts();
  }, [fetchPosts]);

  // Memoize the formatted dates to avoid recalculating on every render
  const postsWithFormattedDates = useMemo(() => 
    posts.map(post => ({
      ...post,
      formattedCreated: new Date(post.created_at).toLocaleDateString(),
      formattedPublished: post.published_at ? new Date(post.published_at).toLocaleDateString() : '-'
    })), [posts]
  );

  if (activeTab !== 'posts') return null;

  if (showEditor) {
    return <CompactPostEditor post={editingPost} onClose={handleEditorClose} />;
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-slate-500">Loading posts...</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-end">
        <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="w-4 h-4 mr-2" />
          New Post
        </Button>
      </div>

      {posts.length === 0 ? (
        <div className="text-center py-12 border border-slate-200 rounded-lg">
          <p className="text-slate-500 mb-4">No posts yet. Create your first post!</p>
          <Button onClick={handleCreatePost} className="bg-blue-600 hover:bg-blue-700">
            <Plus className="w-4 h-4 mr-2" />
            Create First Post
          </Button>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full table-fixed">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-2 px-4 font-medium text-slate-700 w-2/5">Title</th>
                <th className="text-left py-2 px-4 font-medium text-slate-700 w-1/6">Status</th>
                <th className="text-left py-2 px-4 font-medium text-slate-700 w-1/6">Created</th>
                <th className="text-left py-2 px-4 font-medium text-slate-700 w-1/6">Published</th>
                <th className="text-right py-2 px-4 font-medium text-slate-700 w-1/6">Actions</th>
              </tr>
            </thead>
            <tbody>
              {postsWithFormattedDates.map((post) => (
                <tr key={post.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-2 px-4">
                    <div>
                      <h3 className="font-medium text-slate-900 truncate">{post.title}</h3>
                      {post.excerpt && (
                        <p className="text-sm text-slate-500 mt-1 truncate">{post.excerpt}</p>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    <Badge 
                      variant={post.status === 'published' ? 'default' : 'secondary'}
                      className="text-xs"
                    >
                      {post.status}
                    </Badge>
                  </td>
                  <td className="py-2 px-4 text-sm text-slate-600">
                    {post.formattedCreated}
                  </td>
                  <td className="py-2 px-4 text-sm text-slate-600">
                    {post.formattedPublished}
                  </td>
                  <td className="py-2 px-4">
                    <div className="flex items-center justify-end gap-1">
                      {post.status === 'published' && (
                        <Button variant="ghost" size="sm" asChild>
                          <a href={`/article/${post.slug}`} target="_blank" rel="noopener noreferrer">
                            <Eye className="w-4 h-4" />
                          </a>
                        </Button>
                      )}
                      <Button variant="ghost" size="sm" onClick={() => handleEditPost(post)}>
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeletePost(post.id)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
