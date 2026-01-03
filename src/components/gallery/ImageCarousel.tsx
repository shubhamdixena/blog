
import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from '@/components/ui/carousel';
import type { GalleryImage } from './ImageGallery';

interface ImageCarouselProps {
  images: GalleryImage[];
  autoplay?: boolean;
  showDots?: boolean;
}

export const ImageCarousel = ({ images, autoplay = false, showDots = true }: ImageCarouselProps) => {
  return (
    <div className="my-8">
      <Carousel className="w-full max-w-4xl mx-auto">
        <CarouselContent>
          {images.map((image, index) => (
            <CarouselItem key={index}>
              <div className="relative">
                <img
                  src={image.url}
                  alt={image.alt || image.caption || `Carousel image ${index + 1}`}
                  className="w-full h-auto max-h-[500px] object-cover rounded-lg"
                  loading="lazy"
                />
                {image.caption && (
                  <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-6">
                    <p className="text-white text-center">{image.caption}</p>
                  </div>
                )}
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="left-4" />
        <CarouselNext className="right-4" />
      </Carousel>
      
      {showDots && images.length > 1 && (
        <div className="flex justify-center mt-4 gap-2">
          {images.map((_, index) => (
            <div
              key={index}
              className="w-2 h-2 rounded-full bg-muted-foreground/30"
            />
          ))}
        </div>
      )}
    </div>
  );
};
