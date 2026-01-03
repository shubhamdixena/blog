
import React from 'react';
import { PostEditorForm } from './PostEditorForm';
import type { Database } from '@/integrations/supabase/types';

type Post = Database['public']['Tables']['posts']['Row'];

interface PostEditorProps {
  post?: Post | null;
  onClose: () => void;
}

export const PostEditor = ({ post, onClose }: PostEditorProps) => {
  return <PostEditorForm post={post} onClose={onClose} />;
};
