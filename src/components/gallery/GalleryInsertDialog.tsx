
import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger, DialogDescription } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';
import { Images } from 'lucide-react';
import type { GalleryImage } from './ImageGallery';
import { GalleryTypeSelector } from './GalleryTypeSelector';
import { UploadTab } from './UploadTab';
import { MediaLibraryTab } from './MediaLibraryTab';
import { GalleryImageList } from './GalleryImageList';

interface MediaFile {
  name: string;
  id: string;
  updated_at: string;
  metadata: any;
}

interface GalleryInsertDialogProps {
  onInsert: (galleryHtml: string) => void;
  children: React.ReactNode;
}

export const GalleryInsertDialog = ({ onInsert, children }: GalleryInsertDialogProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [images, setImages] = useState<GalleryImage[]>([]);
  const [galleryType, setGalleryType] = useState<'grid' | 'carousel' | 'masonry'>('grid');
  const [uploading, setUploading] = useState(false);
  const [mediaFiles, setMediaFiles] = useState<MediaFile[]>([]);
  const [loadingMedia, setLoadingMedia] = useState(false);
  const [selectedImages, setSelectedImages] = useState<Set<string>>(new Set());
  const { toast } = useToast();

  const fetchMediaFiles = async () => {
    setLoadingMedia(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'updated_at', order: 'desc' }
        });

      if (error) throw error;
      setMediaFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch media files",
        variant: "destructive",
      });
    } finally {
      setLoadingMedia(false);
    }
  };

  const handleDialogOpen = (open: boolean) => {
    setIsOpen(open);
    if (open) {
      fetchMediaFiles();
    }
  };

  const handleFileUpload = async (files: FileList | null) => {
    if (!files) return;

    setUploading(true);
    const uploadPromises = Array.from(files).map(async (file) => {
      const fileExt = file.name.split('.').pop();
      const fileName = `gallery-${Date.now()}-${Math.random()}.${fileExt}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(fileName, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(fileName);

      return {
        url: urlData.publicUrl,
        caption: '',
        alt: file.name.split('.')[0]
      };
    });

    try {
      const uploadedImages = await Promise.all(uploadPromises);
      setImages(prev => [...prev, ...uploadedImages]);
      toast({
        title: "Success",
        description: `${uploadedImages.length} image(s) uploaded successfully`,
      });
    } catch (error: any) {
      toast({
        title: "Upload Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const toggleImageSelection = (fileName: string) => {
    const newSelected = new Set(selectedImages);
    if (newSelected.has(fileName)) {
      newSelected.delete(fileName);
    } else {
      newSelected.add(fileName);
    }
    setSelectedImages(newSelected);
  };

  const addSelectedImagesToGallery = () => {
    const selectedFiles = mediaFiles.filter(file => selectedImages.has(file.name));
    const newImages = selectedFiles.map(file => ({
      url: supabase.storage.from('blog-images').getPublicUrl(file.name).data.publicUrl,
      caption: '',
      alt: file.name.split('.')[0]
    }));
    
    setImages(prev => [...prev, ...newImages]);
    setSelectedImages(new Set());
    
    toast({
      title: "Success",
      description: `${newImages.length} image(s) added to gallery`,
    });
  };

  const updateImageCaption = (index: number, caption: string) => {
    setImages(prev => prev.map((img, i) => i === index ? { ...img, caption } : img));
  };

  const removeImage = (index: number) => {
    setImages(prev => prev.filter((_, i) => i !== index));
  };

  const generateGalleryHtml = () => {
    const galleryId = `gallery-${Date.now()}`;
    const imagesData = JSON.stringify(images);
    
    return `<div class="article-gallery" data-type="${galleryType}" data-gallery-id="${galleryId}">
      <div class="gallery-images" data-images='${imagesData}'>
        <!-- Gallery will be rendered here -->
      </div>
    </div>`;
  };

  const handleInsert = () => {
    if (images.length === 0) {
      toast({
        title: "No Images",
        description: "Please upload at least one image",
        variant: "destructive",
      });
      return;
    }

    const galleryHtml = generateGalleryHtml();
    console.log('Inserting gallery HTML:', galleryHtml);
    onInsert(galleryHtml);
    
    // Reset state and close dialog
    setImages([]);
    setGalleryType('grid');
    setSelectedImages(new Set());
    setIsOpen(false);
    
    toast({
      title: "Success",
      description: "Gallery inserted successfully",
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleDialogOpen}>
      <DialogTrigger asChild>
        {children}
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <Images className="w-5 h-5" />
            Insert Image Gallery
          </DialogTitle>
          <DialogDescription>
            Create a gallery by uploading new images or selecting from your media library
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <GalleryTypeSelector value={galleryType} onChange={setGalleryType} />

          <Tabs defaultValue="upload" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="upload">Upload New</TabsTrigger>
              <TabsTrigger value="library">Media Library</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload" className="space-y-4">
              <UploadTab uploading={uploading} onFileUpload={handleFileUpload} />
            </TabsContent>
            
            <TabsContent value="library" className="space-y-4">
              <MediaLibraryTab
                mediaFiles={mediaFiles}
                loadingMedia={loadingMedia}
                selectedImages={selectedImages}
                onToggleImageSelection={toggleImageSelection}
                onAddSelectedImages={addSelectedImagesToGallery}
              />
            </TabsContent>
          </Tabs>

          <GalleryImageList
            images={images}
            onUpdateCaption={updateImageCaption}
            onRemoveImage={removeImage}
          />

          <div className="flex justify-end gap-2">
            <Button variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleInsert} disabled={images.length === 0}>
              Insert Gallery
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
