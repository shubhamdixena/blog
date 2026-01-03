
import React from 'react';
import { Button } from '@/components/ui/button';
import { Images } from 'lucide-react';
import { GalleryInsertDialog } from '@/components/gallery/GalleryInsertDialog';

interface GalleryInsertionProps {
  onInsert: (galleryHtml: string) => void;
}

export const GalleryInsertion = ({ onInsert }: GalleryInsertionProps) => {
  return (
    <div className="absolute top-2 left-2 z-10">
      <GalleryInsertDialog onInsert={onInsert}>
        <Button variant="outline" size="sm" className="bg-background/90 backdrop-blur-sm">
          <Images className="w-4 h-4 mr-2" />
          Gallery
        </Button>
      </GalleryInsertDialog>
    </div>
  );
};
