import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Separator } from '@/components/ui/separator';
import { TagsInput } from '@/components/ui/tags-input';
import { RichTextEditor } from './RichTextEditor';
import { 
  Save, 
  Upload, 
  Plus
} from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];
type Tag = Database['public']['Tables']['tags']['Row'];

interface CompactPostEditorProps {
  post?: Post | null;
  onClose: () => void;
}

export const CompactPostEditor = ({ post, onClose }: CompactPostEditorProps) => {
  // Form state
  const [title, setTitle] = useState(post?.title || '');
  const [slug, setSlug] = useState(post?.slug || '');
  const [content, setContent] = useState(post?.content || '');
  const [excerpt, setExcerpt] = useState(post?.excerpt || '');
  const [status, setStatus] = useState(post?.status || 'draft');
  const [featuredImageUrl, setFeaturedImageUrl] = useState(post?.featured_image_url || '');
  
  // SEO fields
  const [metaDescription, setMetaDescription] = useState(post?.meta_description || '');
  const [metaKeywords, setMetaKeywords] = useState<string[]>(post?.meta_keywords || []);
  const [ogTitle, setOgTitle] = useState(post?.og_title || '');
  const [ogDescription, setOgDescription] = useState(post?.og_description || '');
  const [ogImageUrl, setOgImageUrl] = useState(post?.og_image_url || '');
  const [canonicalUrl, setCanonicalUrl] = useState(post?.canonical_url || '');
  const [robotsMeta, setRobotsMeta] = useState(post?.robots_meta || 'index,follow');
  
  // Categories and tags
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [selectedTags, setSelectedTags] = useState<Tag[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [tags, setTags] = useState<Tag[]>([]);
  const [newCategoryName, setNewCategoryName] = useState('');
  
  // UI state
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [activeTab, setActiveTab] = useState('content');
  const [showCategoryForm, setShowCategoryForm] = useState(false);
  
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    fetchTags();
    if (post) {
      fetchPostCategories();
      fetchPostTags();
    }
  }, [post]);

  useEffect(() => {
    if (!title || post) return;
    const handle = setTimeout(() => {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }, 300);
    return () => clearTimeout(handle);
  }, [title, post]);

  const fetchCategories = async () => {
    try {
      const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setCategories(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch categories",
        variant: "destructive",
      });
    }
  };

  const fetchTags = async () => {
    try {
      const { data, error } = await supabase
        .from('tags')
        .select('*')
        .order('name');
      
      if (error) throw error;
      setTags(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch tags",
        variant: "destructive",
      });
    }
  };

  const fetchPostCategories = async () => {
    if (!post) return;
    
    try {
      const { data, error } = await supabase
        .from('posts_categories')
        .select('category_id')
        .eq('post_id', post.id);
      
      if (error) throw error;
      setSelectedCategories(data?.map(pc => pc.category_id) || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch post categories",
        variant: "destructive",
      });
    }
  };

  const fetchPostTags = async () => {
    if (!post) return;
    
    try {
      const { data, error } = await supabase
        .from('posts_tags')
        .select('tag_id, tags(*)')
        .eq('post_id', post.id);
      
      if (error) throw error;
      const postTags = data?.map(pt => pt.tags).filter(Boolean) as Tag[] || [];
      setSelectedTags(postTags);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch post tags",
        variant: "destructive",
      });
    }
  };

  const createTag = async (name: string): Promise<Tag | null> => {
    try {
      const slug = name.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      
      const { data, error } = await supabase
        .from('tags')
        .insert({
          name,
          slug,
          color: '#6B7280'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      // Update local tags list
      setTags(prev => [...prev, data]);
      
      toast({
        title: "Success",
        description: `Tag "${name}" created successfully`,
      });
      
      return data;
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
      return null;
    }
  };

  const createCategory = async () => {
    if (!newCategoryName.trim()) return;
    
    try {
      const slug = newCategoryName.toLowerCase().replace(/[^a-z0-9\s-]/g, '').replace(/\s+/g, '-');
      
      const { data, error } = await supabase
        .from('categories')
        .insert({
          name: newCategoryName.trim(),
          slug,
          color: '#3B82F6'
        })
        .select()
        .single();
      
      if (error) throw error;
      
      setCategories(prev => [...prev, data]);
      setSelectedCategories(prev => [...prev, data.id]);
      setNewCategoryName('');
      setShowCategoryForm(false);
      
      toast({
        title: "Success",
        description: `Category "${newCategoryName}" created successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    }
  };

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFeaturedImageUrl(data.publicUrl);
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleSave = async () => {
    if (!title.trim() || !content.trim()) {
      toast({
        title: "Error",
        description: "Title and content are required",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);
    try {
      const postData = {
        title: title.trim(),
        slug: slug.trim(),
        content: content.trim(),
        excerpt: excerpt.trim(),
        status,
        featured_image_url: featuredImageUrl || null,
        meta_description: metaDescription || null,
        meta_keywords: metaKeywords.length > 0 ? metaKeywords : null,
        og_title: ogTitle || null,
        og_description: ogDescription || null,
        og_image_url: ogImageUrl || null,
        canonical_url: canonicalUrl || null,
        robots_meta: robotsMeta,
        published_at: status === 'published' ? new Date().toISOString() : null,
      };

      let savedPost;
      if (post) {
        const { data, error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id)
          .select()
          .single();
        
        if (error) throw error;
        savedPost = data;
      } else {
        const { data, error } = await supabase
          .from('posts')
          .insert(postData)
          .select()
          .single();
        
        if (error) throw error;
        savedPost = data;
      }

      // Handle categories
      if (selectedCategories.length > 0) {
        // Delete existing categories
        await supabase
          .from('posts_categories')
          .delete()
          .eq('post_id', savedPost.id);

        // Insert new categories
        const categoryInserts = selectedCategories.map(categoryId => ({
          post_id: savedPost.id,
          category_id: categoryId,
        }));
        
        await supabase
          .from('posts_categories')
          .insert(categoryInserts);
      }

      // Handle tags
      if (selectedTags.length > 0) {
        // Delete existing tags
        await supabase
          .from('posts_tags')
          .delete()
          .eq('post_id', savedPost.id);

        // Insert new tags
        const tagInserts = selectedTags.map(tag => ({
          post_id: savedPost.id,
          tag_id: tag.id,
        }));
        
        await supabase
          .from('posts_tags')
          .insert(tagInserts);
      }

      toast({
        title: "Success",
        description: post ? "Post updated successfully" : "Post created successfully",
      });

      onClose();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const toggleCategory = (categoryId: string) => {
    setSelectedCategories(prev =>
      prev.includes(categoryId)
        ? prev.filter(id => id !== categoryId)
        : [...prev, categoryId]
    );
  };

  return (
    <div className="min-h-screen bg-white admin-compact text-[13px]">
      {/* Header Bar */}
      <div className="border-b bg-white sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <h1 className="text-xl font-semibold text-gray-900">
                {post ? 'Edit Post' : 'Add New Post'}
              </h1>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span>Status:</span>
                <Select value={status} onValueChange={setStatus}>
                  <SelectTrigger className="w-28 h-8">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="draft">Draft</SelectItem>
                    <SelectItem value="published">Published</SelectItem>
                    <SelectItem value="archived">Archived</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Button variant="outline" onClick={onClose} size="sm">
                Cancel
              </Button>
              <Button onClick={handleSave} disabled={loading} size="sm">
                <Save className="w-4 h-4 mr-2" />
                {loading ? 'Saving...' : 'Save'}
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-4 gap-0">
        {/* Main Content Area */}
        <div className="lg:col-span-3 p-3 space-y-3">
          {/* Title */}
          <div className="space-y-1.5">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Add title"
              className="text-xl font-bold border-0 p-0 shadow-none focus-visible:ring-0 placeholder:text-gray-400"
            />
            <div className="flex items-center gap-2 text-[13px] text-gray-500">
              <span>Permalink:</span>
              <span className="text-blue-600">/{slug || 'post-slug'}</span>
              <Button
                variant="link"
                size="sm"
                className="h-auto p-0 text-[12px]"
                onClick={() => {
                  const input = document.createElement('input');
                  input.value = slug;
                  input.className = 'text-xs border-b border-gray-300 bg-transparent outline-none';
                  input.onblur = (e) => {
                    const target = e.target as HTMLInputElement;
                    setSlug(target.value);
                    target.replaceWith(document.createTextNode(`/${target.value || 'post-slug'}`));
                  };
                  input.onkeydown = (e) => {
                    if (e.key === 'Enter') input.blur();
                  };
                  const permalink = document.querySelector('.text-blue-600');
                  if (permalink) {
                    permalink.replaceWith(input);
                    input.focus();
                  }
                }}
              >
                Edit
              </Button>
            </div>
          </div>

          {/* Content Editor */}
          <div>
            <RichTextEditor
              value={content}
              onChange={setContent}
              placeholder="Start writing your post..."
            />
          </div>

          {/* Excerpt */}
          <div className="space-y-1.5">
            <Label className="text-[13px] font-medium text-gray-700">Excerpt</Label>
            <Textarea
              value={excerpt}
              onChange={(e) => setExcerpt(e.target.value)}
              placeholder="Write an excerpt (optional)"
              rows={3}
              className="resize-none text-[13px]"
            />
            <p className="text-[12px] text-gray-500">
              Excerpts are optional hand-crafted summaries of your content.
            </p>
          </div>

        </div>

        {/* Right Sidebar */}
        <div className="lg:border-l p-3 space-y-3">
          {/* Publish Section */}
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Publish</h3>
            <div className="space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-gray-600">Status:</span>
                <span className="font-medium capitalize">{status}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-600">Visibility:</span>
                <span className="font-medium">Public</span>
              </div>
              {post && (
                <div className="flex justify-between">
                  <span className="text-gray-600">Created:</span>
                  <span className="font-medium">
                    {new Date(post.created_at).toLocaleDateString()}
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Featured Image */}
          <div className="sidebar-section">
            <h3 className="sidebar-heading">Featured Image</h3>
            {featuredImageUrl ? (
              <div className="space-y-2">
                <img
                  src={featuredImageUrl}
                  alt="Featured"
                  className="w-full h-24 object-cover rounded border"
                />
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => setFeaturedImageUrl('')}
                  className="w-full h-7 text-xs"
                >
                  Remove
                </Button>
              </div>
            ) : (
              <Button
                variant="outline"
                size="sm"
                disabled={uploading}
                onClick={() => document.getElementById('featured-image')?.click()}
                className="w-full h-7 text-xs"
              >
                <Upload className="w-3 h-3 mr-1" />
                {uploading ? 'Uploading...' : 'Set Image'}
              </Button>
            )}
            <input
              id="featured-image"
              type="file"
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />
          </div>

          {/* Categories & Tags Combined */}
          <div className="sidebar-section">
            <div className="space-y-3">
              {/* Categories */}
              <div>
                <div className="flex items-center justify-between mb-2">
                  <h3 className="sidebar-heading">Categories</h3>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowCategoryForm(!showCategoryForm)}
                    className="h-5 w-5 p-0"
                  >
                    <Plus className="w-3 h-3" />
                  </Button>
                </div>
                
                {showCategoryForm && (
                  <div className="mb-2 space-y-1">
                    <Input
                      value={newCategoryName}
                      onChange={(e) => setNewCategoryName(e.target.value)}
                      placeholder="New category"
                      className="h-7 text-xs"
                    />
                    <div className="flex gap-1">
                      <Button size="sm" onClick={createCategory} className="h-6 text-xs px-2">
                        Add
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setShowCategoryForm(false);
                          setNewCategoryName('');
                        }}
                        className="h-6 text-xs px-2"
                      >
                        Cancel
                      </Button>
                    </div>
                  </div>
                )}
                
                <div className="max-h-24 overflow-y-auto space-y-1">
                  {categories.map((category) => (
                    <label
                      key={category.id}
                      className="flex items-center space-x-2 cursor-pointer text-xs"
                    >
                      <input
                        type="checkbox"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => toggleCategory(category.id)}
                        className="rounded text-xs"
                      />
                      <span>{category.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Tags */}
              <div>
                <h3 className="sidebar-heading mb-2">Tags</h3>
                <TagsInput
                  selectedTags={selectedTags}
                  availableTags={tags}
                  onTagsChange={setSelectedTags}
                  onCreateTag={createTag}
                  placeholder="Add tags..."
                  className="text-xs"
                />
              </div>
            </div>
          </div>

          {/* SEO Settings */}
          <div className="sidebar-section">
            <h3 className="sidebar-heading mb-2">SEO</h3>
            <div className="space-y-3">
              {/* Meta Description */}
              <div>
                <Label className="text-[12px] text-gray-600">Meta Description</Label>
                <Textarea
                  value={metaDescription}
                  onChange={(e) => setMetaDescription(e.target.value)}
                  placeholder="Brief description for search engines"
                  rows={2}
                  className="text-xs resize-none"
                />
                <p className="text-xs text-gray-500 mt-1">
                  {metaDescription.length}/160 characters
                </p>
              </div>

              {/* Focus Keywords */}
              <div>
                <Label className="text-[12px] text-gray-600">Focus Keywords</Label>
                <Input
                  value={metaKeywords.join(', ')}
                  onChange={(e) => setMetaKeywords(e.target.value.split(',').map(k => k.trim()).filter(Boolean))}
                  placeholder="keyword1, keyword2, keyword3"
                  className="text-xs h-7"
                />
              </div>

              {/* OG Title */}
              <div>
                <Label className="text-[12px] text-gray-600">Social Title</Label>
                <Input
                  value={ogTitle}
                  onChange={(e) => setOgTitle(e.target.value)}
                  placeholder="Title for social media"
                  className="text-xs h-7"
                />
              </div>

              {/* OG Description */}
              <div>
                <Label className="text-[12px] text-gray-600">Social Description</Label>
                <Textarea
                  value={ogDescription}
                  onChange={(e) => setOgDescription(e.target.value)}
                  placeholder="Description for social media"
                  rows={2}
                  className="text-xs resize-none"
                />
              </div>

              {/* Canonical URL */}
              <div>
                <Label className="text-[12px] text-gray-600">Canonical URL</Label>
                <Input
                  value={canonicalUrl}
                  onChange={(e) => setCanonicalUrl(e.target.value)}
                  placeholder="https://example.com/post"
                  className="text-xs h-7"
                />
              </div>

              {/* Robots Meta */}
              <div>
                <Label className="text-[12px] text-gray-600">Robots</Label>
                <Select value={robotsMeta} onValueChange={setRobotsMeta}>
                  <SelectTrigger className="h-7 text-xs">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="index,follow">Index, Follow</SelectItem>
                    <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
                    <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
                    <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
