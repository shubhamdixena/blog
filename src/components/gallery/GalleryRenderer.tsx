
import React from 'react';
import { ImageGallery, type GalleryImage } from './ImageGallery';
import { ImageCarousel } from './ImageCarousel';

interface GalleryRendererProps {
  type: 'grid' | 'carousel' | 'masonry';
  images: GalleryImage[];
  galleryId: string;
}

export const GalleryRenderer = ({ type, images, galleryId }: GalleryRendererProps) => {
  if (!images || images.length === 0) {
    return null;
  }

  switch (type) {
    case 'carousel':
      return <ImageCarousel images={images} />;
    case 'masonry':
      return <ImageGallery images={images} type="masonry" />;
    case 'grid':
    default:
      return <ImageGallery images={images} type="grid" />;
  }
};
