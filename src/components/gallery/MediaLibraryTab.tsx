
import React from 'react';
import { Button } from '@/components/ui/button';
import { ImageIcon } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';

interface MediaFile {
  name: string;
  id: string;
  updated_at: string;
  metadata: any;
}

interface MediaLibraryTabProps {
  mediaFiles: MediaFile[];
  loadingMedia: boolean;
  selectedImages: Set<string>;
  onToggleImageSelection: (fileName: string) => void;
  onAddSelectedImages: () => void;
}

export const MediaLibraryTab = ({
  mediaFiles,
  loadingMedia,
  selectedImages,
  onToggleImageSelection,
  onAddSelectedImages
}: MediaLibraryTabProps) => {
  if (loadingMedia) {
    return <div className="text-center py-8">Loading media library...</div>;
  }

  if (mediaFiles.length === 0) {
    return (
      <div className="text-center py-8">
        <ImageIcon className="w-12 h-12 mx-auto text-muted-foreground mb-4" />
        <p className="text-muted-foreground">No images in media library</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-h-60 overflow-y-auto">
        {mediaFiles.map((file) => (
          <div
            key={file.name}
            className={`relative cursor-pointer rounded-lg overflow-hidden border-2 transition-colors ${
              selectedImages.has(file.name) ? 'border-primary' : 'border-transparent'
            }`}
            onClick={() => onToggleImageSelection(file.name)}
          >
            <div className="aspect-square">
              <img
                src={supabase.storage.from('blog-images').getPublicUrl(file.name).data.publicUrl}
                alt={file.name}
                className="w-full h-full object-cover"
              />
            </div>
            {selectedImages.has(file.name) && (
              <div className="absolute inset-0 bg-primary/20 flex items-center justify-center">
                <div className="w-6 h-6 bg-primary text-primary-foreground rounded-full flex items-center justify-center">
                  ✓
                </div>
              </div>
            )}
          </div>
        ))}
      </div>
      {selectedImages.size > 0 && (
        <Button onClick={onAddSelectedImages} className="w-full">
          Add {selectedImages.size} Selected Image{selectedImages.size > 1 ? 's' : ''} to Gallery
        </Button>
      )}
    </div>
  );
};
