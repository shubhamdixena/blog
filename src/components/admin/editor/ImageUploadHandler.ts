
import { supabase } from '@/integrations/supabase/client';

export class ImageUploadHandler {
  private onUploadStart: () => void;
  private onUploadEnd: () => void;
  private onError: (error: string) => void;

  constructor(
    onUploadStart: () => void,
    onUploadEnd: () => void,
    onError: (error: string) => void
  ) {
    this.onUploadStart = onUploadStart;
    this.onUploadEnd = onUploadEnd;
    this.onError = onError;
  }

  async uploadImage(file: File): Promise<string | null> {
    this.onUploadStart();
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { data, error } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (error) throw error;

      const { data: urlData } = supabase.storage
        .from('blog-images')
        .getPublicUrl(filePath);

      return urlData.publicUrl;
    } catch (error: any) {
      this.onError(error.message);
      return null;
    } finally {
      this.onUploadEnd();
    }
  }

  createImageHandler(quillRef: React.RefObject<any>) {
    return async () => {
      const input = document.createElement('input');
      input.setAttribute('type', 'file');
      input.setAttribute('accept', 'image/*');
      input.click();

      input.onchange = async () => {
        const file = input.files?.[0];
        if (file) {
          const imageUrl = await this.uploadImage(file);
          if (imageUrl && quillRef.current) {
            const quill = quillRef.current.getEditor();
            const range = quill.getSelection();
            quill.insertEmbed(range?.index || 0, 'image', imageUrl);
          }
        }
      };
    };
  }
}
