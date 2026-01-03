
import React, { useState, useRef, useMemo } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Eye, Code } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { ImageUploadHandler } from './editor/ImageUploadHandler';
import { createQuillModules, quillFormats } from './editor/QuillToolbarConfig';
import { RichTextPreview } from './editor/RichTextPreview';
import { GalleryInsertion } from './editor/GalleryInsertion';
import { UploadIndicator } from './editor/UploadIndicator';

interface RichTextEditorProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
}

export const RichTextEditor = ({ value, onChange, placeholder }: RichTextEditorProps) => {
  const [activeTab, setActiveTab] = useState('editor');
  const [uploading, setUploading] = useState(false);
  const quillRef = useRef<ReactQuill>(null);
  const { toast } = useToast();

  const imageUploadHandler = useMemo(() => {
    return new ImageUploadHandler(
      () => setUploading(true),
      () => setUploading(false),
      (error) => {
        toast({
          title: "Upload Error",
          description: error,
          variant: "destructive",
        });
      }
    );
  }, [toast]);

  const handleGalleryInsert = (galleryHtml: string) => {
    console.log('Gallery HTML received:', galleryHtml);
    
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const range = quill.getSelection();
      const index = range?.index || quill.getLength();
      
      // Insert a line break before the gallery for better formatting
      quill.insertText(index, '\n');
      quill.clipboard.dangerouslyPasteHTML(index + 1, galleryHtml);
      quill.insertText(index + 1 + galleryHtml.length, '\n');
      
      // Set cursor position after the gallery - fix the TypeScript error
      const newPosition = index + 2 + galleryHtml.length;
      quill.setSelection(newPosition, 0);
      
      toast({
        title: "Gallery Inserted",
        description: "Gallery has been added to your content",
      });
    }
  };

  const modules = useMemo(() => {
    return createQuillModules(imageUploadHandler.createImageHandler(quillRef));
  }, [imageUploadHandler]);

  return (
    <div className="border border-border rounded-md overflow-hidden">
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="w-full justify-start rounded-none border-b h-9">
          <TabsTrigger value="editor" className="flex items-center gap-2">
            <Code className="w-4 h-4" />
            Rich Editor
          </TabsTrigger>
          <TabsTrigger value="preview" className="flex items-center gap-2">
            <Eye className="w-4 h-4" />
            Markdown Preview
          </TabsTrigger>
        </TabsList>

        <TabsContent value="editor" className="m-0">
          <div className="relative">
            <GalleryInsertion onInsert={handleGalleryInsert} />

            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={value}
              onChange={onChange}
              modules={modules}
              formats={quillFormats}
              placeholder={placeholder || "Start writing your post..."}
              style={{ minHeight: '280px' }}
            />
            
            <UploadIndicator uploading={uploading} />
          </div>
        </TabsContent>

        {activeTab === 'preview' && (
          <TabsContent value="preview" className="m-0">
            <RichTextPreview value={value} />
          </TabsContent>
        )}
      </Tabs>
    </div>
  );
};
