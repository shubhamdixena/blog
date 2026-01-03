
import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { GripVertical, X } from 'lucide-react';
import type { GalleryImage } from './ImageGallery';

interface GalleryImageListProps {
  images: GalleryImage[];
  onUpdateCaption: (index: number, caption: string) => void;
  onRemoveImage: (index: number) => void;
}

export const GalleryImageList = ({ images, onUpdateCaption, onRemoveImage }: GalleryImageListProps) => {
  if (images.length === 0) return null;

  return (
    <div className="space-y-4">
      <h3 className="font-medium">Gallery Images ({images.length})</h3>
      <div className="space-y-3 max-h-60 overflow-y-auto">
        {images.map((image, index) => (
          <div key={index} className="flex items-center gap-3 p-3 border rounded-lg">
            <GripVertical className="w-4 h-4 text-muted-foreground cursor-move" />
            <img
              src={image.url}
              alt={image.alt}
              className="w-16 h-16 object-cover rounded"
            />
            <div className="flex-1">
              <Input
                placeholder="Add caption (optional)"
                value={image.caption}
                onChange={(e) => onUpdateCaption(index, e.target.value)}
              />
            </div>
            <Button
              variant="ghost"
              size="icon"
              onClick={() => onRemoveImage(index)}
            >
              <X className="w-4 h-4" />
            </Button>
          </div>
        ))}
      </div>
    </div>
  );
};
