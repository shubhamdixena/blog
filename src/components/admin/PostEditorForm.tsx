
import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { PostEditorHeader } from './PostEditorHeader';
import { PostContentSection } from './PostContentSection';
import { PostMetaSection } from './PostMetaSection';
import { SeoEditor } from './SeoEditor';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];
type Category = Database['public']['Tables']['categories']['Row'];

interface PostEditorFormProps {
  post?: Post | null;
  onClose: () => void;
}

export const PostEditorForm = ({ post, onClose }: PostEditorFormProps) => {
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
  
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    fetchCategories();
    if (post) {
      fetchPostCategories();
    }
  }, [post]);

  useEffect(() => {
    // Auto-generate slug from title
    if (title && !post) {
      const generatedSlug = title
        .toLowerCase()
        .replace(/[^a-z0-9\s-]/g, '')
        .replace(/\s+/g, '-')
        .trim();
      setSlug(generatedSlug);
    }
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

  const handleImageUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `featured-${Date.now()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      setFeaturedImageUrl(urlData.publicUrl);
      toast({
        title: "Success",
        description: "Image uploaded successfully",
      });
    } catch (error: any) {
      toast({
        title: "Upload Error",
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
        title: "Validation Error",
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
        excerpt: excerpt.trim() || null,
        status,
        featured_image_url: featuredImageUrl || null,
        meta_description: metaDescription.trim() || null,
        meta_keywords: metaKeywords.length > 0 ? metaKeywords : null,
        og_title: ogTitle.trim() || null,
        og_description: ogDescription.trim() || null,
        og_image_url: ogImageUrl.trim() || null,
        canonical_url: canonicalUrl.trim() || null,
        robots_meta: robotsMeta,
        published_at: status === 'published' ? new Date().toISOString() : null,
        author_id: (await supabase.auth.getUser()).data.user?.id
      };

      let postId: string;

      if (post) {
        // Update existing post
        const { error } = await supabase
          .from('posts')
          .update(postData)
          .eq('id', post.id);

        if (error) throw error;
        postId = post.id;
      } else {
        // Create new post
        const { data, error } = await supabase
          .from('posts')
          .insert([postData])
          .select()
          .single();

        if (error) throw error;
        postId = data.id;
      }

      // Update categories
      await supabase
        .from('posts_categories')
        .delete()
        .eq('post_id', postId);

      if (selectedCategories.length > 0) {
        const categoryInserts = selectedCategories.map(categoryId => ({
          post_id: postId,
          category_id: categoryId
        }));

        await supabase
          .from('posts_categories')
          .insert(categoryInserts);
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
    <div className="space-y-6">
      <PostEditorHeader
        isEditing={!!post}
        status={status}
        setStatus={setStatus}
        loading={loading}
        onSave={handleSave}
        onClose={onClose}
      />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          <PostContentSection
            title={title}
            setTitle={setTitle}
            slug={slug}
            setSlug={setSlug}
            excerpt={excerpt}
            setExcerpt={setExcerpt}
            content={content}
            setContent={setContent}
          />
        </div>

        <div className="space-y-6">
          <PostMetaSection
            featuredImageUrl={featuredImageUrl}
            setFeaturedImageUrl={setFeaturedImageUrl}
            uploading={uploading}
            onImageUpload={handleImageUpload}
            categories={categories}
            selectedCategories={selectedCategories}
            toggleCategory={toggleCategory}
          />

          <SeoEditor
            metaDescription={metaDescription}
            setMetaDescription={setMetaDescription}
            metaKeywords={metaKeywords}
            setMetaKeywords={setMetaKeywords}
            ogTitle={ogTitle}
            setOgTitle={setOgTitle}
            ogDescription={ogDescription}
            setOgDescription={setOgDescription}
            ogImageUrl={ogImageUrl}
            setOgImageUrl={setOgImageUrl}
            canonicalUrl={canonicalUrl}
            setCanonicalUrl={setCanonicalUrl}
            robotsMeta={robotsMeta}
            setRobotsMeta={setRobotsMeta}
            title={title}
            excerpt={excerpt}
          />
        </div>
      </div>
    </div>
  );
};
