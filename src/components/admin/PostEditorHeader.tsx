
import React from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { ArrowLeft, Save } from 'lucide-react';

interface PostEditorHeaderProps {
  isEditing: boolean;
  status: string;
  setStatus: (status: string) => void;
  loading: boolean;
  onSave: () => void;
  onClose: () => void;
}

export const PostEditorHeader = ({
  isEditing,
  status,
  setStatus,
  loading,
  onSave,
  onClose
}: PostEditorHeaderProps) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Button variant="ghost" onClick={onClose}>
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Posts
        </Button>
        <h2 className="text-2xl font-serif font-semibold">
          {isEditing ? 'Edit Post' : 'Create New Post'}
        </h2>
      </div>
      <div className="flex items-center gap-2">
        <Select value={status} onValueChange={setStatus}>
          <SelectTrigger className="w-32">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="draft">Draft</SelectItem>
            <SelectItem value="published">Published</SelectItem>
          </SelectContent>
        </Select>
        <Button onClick={onSave} disabled={loading}>
          <Save className="w-4 h-4 mr-2" />
          {loading ? 'Saving...' : 'Save Post'}
        </Button>
      </div>
    </div>
  );
};
