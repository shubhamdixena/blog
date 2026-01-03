
import React from 'react';
import { GalleryRenderer } from '@/components/gallery/GalleryRenderer';
import type { GalleryImage } from '@/components/gallery/ImageGallery';

export const processArticleContent = (htmlContent: string): React.ReactElement => {
  // Create a temporary div to parse the HTML
  const tempDiv = document.createElement('div');
  tempDiv.innerHTML = htmlContent;

  // Find all gallery elements
  const galleryElements = tempDiv.querySelectorAll('.article-gallery');
  
  // Replace gallery elements with placeholder markers
  galleryElements.forEach((galleryEl, index) => {
    const marker = document.createElement('div');
    marker.setAttribute('data-gallery-marker', index.toString());
    galleryEl.replaceWith(marker);
  });

  // Get the processed HTML
  const processedHtml = tempDiv.innerHTML;

  // Extract gallery data
  const galleries: Array<{
    type: 'grid' | 'carousel' | 'masonry';
    images: GalleryImage[];
    galleryId: string;
  }> = [];

  galleryElements.forEach((galleryEl) => {
    const type = galleryEl.getAttribute('data-type') as 'grid' | 'carousel' | 'masonry' || 'grid';
    const galleryId = galleryEl.getAttribute('data-gallery-id') || '';
    const imagesEl = galleryEl.querySelector('.gallery-images');
    const imagesData = imagesEl?.getAttribute('data-images');
    
    let images: GalleryImage[] = [];
    if (imagesData) {
      try {
        images = JSON.parse(imagesData);
      } catch (error) {
        console.error('Failed to parse gallery images:', error);
      }
    }

    galleries.push({ type, images, galleryId });
  });

  // Component to render the processed content
  const ProcessedContent = () => {
    const renderContent = () => {
      // Split content by gallery markers and render alternating content and galleries
      const parts = processedHtml.split(/(<div data-gallery-marker="\d+"><\/div>)/);
      const elements: React.ReactElement[] = [];

      parts.forEach((part, index) => {
        const markerMatch = part.match(/data-gallery-marker="(\d+)"/);
        
        if (markerMatch) {
          const galleryIndex = parseInt(markerMatch[1]);
          const gallery = galleries[galleryIndex];
          
          if (gallery) {
            elements.push(
              <GalleryRenderer
                key={`gallery-${gallery.galleryId}-${index}`}
                type={gallery.type}
                images={gallery.images}
                galleryId={gallery.galleryId}
              />
            );
          }
        } else if (part.trim()) {
          elements.push(
            <div
              key={`content-${index}`}
              dangerouslySetInnerHTML={{ __html: part }}
            />
          );
        }
      });

      return elements;
    };

    return <>{renderContent()}</>;
  };

  return <ProcessedContent />;
};
