
import React from 'react';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface GalleryTypeSelectorProps {
  value: 'grid' | 'carousel' | 'masonry';
  onChange: (value: 'grid' | 'carousel' | 'masonry') => void;
}

export const GalleryTypeSelector = ({ value, onChange }: GalleryTypeSelectorProps) => {
  return (
    <div>
      <Label htmlFor="gallery-type">Gallery Type</Label>
      <Select value={value} onValueChange={onChange}>
        <SelectTrigger className="w-full">
          <SelectValue />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="grid">Grid Gallery</SelectItem>
          <SelectItem value="carousel">Carousel</SelectItem>
          <SelectItem value="masonry">Masonry Layout</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};
