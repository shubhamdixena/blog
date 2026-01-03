
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Upload } from 'lucide-react';
import type { Database } from '@/integrations/supabase/types';

type Category = Database['public']['Tables']['categories']['Row'];

interface PostMetaSectionProps {
  featuredImageUrl: string;
  setFeaturedImageUrl: (url: string) => void;
  uploading: boolean;
  onImageUpload: (event: React.ChangeEvent<HTMLInputElement>) => void;
  categories: Category[];
  selectedCategories: string[];
  toggleCategory: (categoryId: string) => void;
}

export const PostMetaSection = ({
  featuredImageUrl,
  setFeaturedImageUrl,
  uploading,
  onImageUpload,
  categories,
  selectedCategories,
  toggleCategory
}: PostMetaSectionProps) => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle>Featured Image</CardTitle>
          <CardDescription>Upload a featured image for your post</CardDescription>
        </CardHeader>
        <CardContent>
          {featuredImageUrl && (
            <div className="mb-4">
              <img
                src={featuredImageUrl}
                alt="Featured"
                className="w-full h-32 object-cover rounded-lg"
              />
            </div>
          )}
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              disabled={uploading}
              onClick={() => document.getElementById('featured-image')?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              {uploading ? 'Uploading...' : 'Upload Image'}
            </Button>
            <input
              id="featured-image"
              type="file"
              accept="image/*"
              onChange={onImageUpload}
              className="hidden"
            />
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Categories</CardTitle>
          <CardDescription>Select categories for your post</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {categories.map((category) => (
              <div
                key={category.id}
                onClick={() => toggleCategory(category.id)}
                className="cursor-pointer"
              >
                <Badge
                  variant={selectedCategories.includes(category.id) ? 'default' : 'outline'}
                  style={{
                    borderColor: category.color || '#3b82f6',
                    color: selectedCategories.includes(category.id) ? 'white' : category.color,
                    backgroundColor: selectedCategories.includes(category.id) ? category.color : 'transparent'
                  }}
                >
                  {category.name}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
