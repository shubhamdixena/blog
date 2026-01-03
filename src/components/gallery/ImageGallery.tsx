
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, X, ZoomIn } from 'lucide-react';

export interface GalleryImage {
  url: string;
  caption?: string;
  alt?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  type?: 'grid' | 'masonry';
  columns?: number;
}

export const ImageGallery = ({ images, type = 'grid', columns = 3 }: ImageGalleryProps) => {
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openLightbox = (index: number) => {
    setSelectedImageIndex(index);
    setIsModalOpen(true);
  };

  const navigateImage = (direction: 'prev' | 'next') => {
    if (selectedImageIndex === null) return;
    
    if (direction === 'prev') {
      setSelectedImageIndex(selectedImageIndex > 0 ? selectedImageIndex - 1 : images.length - 1);
    } else {
      setSelectedImageIndex(selectedImageIndex < images.length - 1 ? selectedImageIndex + 1 : 0);
    }
  };

  const gridClass = type === 'masonry' 
    ? 'columns-1 md:columns-2 lg:columns-3 gap-4 space-y-4'
    : `grid gap-4 grid-cols-1 md:grid-cols-2 lg:grid-cols-${columns}`;

  return (
    <div className="my-8">
      <div className={gridClass}>
        {images.map((image, index) => (
          <div
            key={index}
            className="relative group cursor-pointer overflow-hidden rounded-lg bg-muted"
            onClick={() => openLightbox(index)}
          >
            <img
              src={image.url}
              alt={image.alt || image.caption || `Gallery image ${index + 1}`}
              className="w-full h-auto object-cover transition-transform duration-300 group-hover:scale-105"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center">
              <ZoomIn className="w-6 h-6 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            {image.caption && (
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4">
                <p className="text-white text-sm">{image.caption}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogContent className="max-w-6xl w-full h-[90vh] p-0 bg-black/95">
          <div className="relative w-full h-full flex items-center justify-center">
            <Button
              variant="ghost"
              size="icon"
              className="absolute top-4 right-4 z-10 text-white hover:bg-white/20"
              onClick={() => setIsModalOpen(false)}
            >
              <X className="w-6 h-6" />
            </Button>

            {selectedImageIndex !== null && (
              <>
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute left-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigateImage('prev')}
                  disabled={images.length <= 1}
                >
                  <ChevronLeft className="w-8 h-8" />
                </Button>

                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-4 top-1/2 -translate-y-1/2 z-10 text-white hover:bg-white/20"
                  onClick={() => navigateImage('next')}
                  disabled={images.length <= 1}
                >
                  <ChevronRight className="w-8 h-8" />
                </Button>

                <div className="w-full h-full flex items-center justify-center p-8">
                  <img
                    src={images[selectedImageIndex].url}
                    alt={images[selectedImageIndex].alt || images[selectedImageIndex].caption || 'Gallery image'}
                    className="max-w-full max-h-full object-contain"
                  />
                </div>

                {images[selectedImageIndex].caption && (
                  <div className="absolute bottom-4 left-4 right-4 text-center">
                    <p className="text-white text-lg bg-black/50 rounded-lg px-4 py-2 inline-block">
                      {images[selectedImageIndex].caption}
                    </p>
                  </div>
                )}

                <div className="absolute top-4 left-4 text-white bg-black/50 rounded-lg px-3 py-1">
                  {selectedImageIndex + 1} / {images.length}
                </div>
              </>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
