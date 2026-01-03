
import React from 'react';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Upload } from 'lucide-react';

interface UploadTabProps {
  uploading: boolean;
  onFileUpload: (files: FileList | null) => void;
}

export const UploadTab = ({ uploading, onFileUpload }: UploadTabProps) => {
  return (
    <div className="space-y-4">
      <div>
        <Label htmlFor="file-upload">Upload Images</Label>
        <Button
          variant="outline"
          className="w-full"
          disabled={uploading}
          onClick={() => document.getElementById('gallery-file-input')?.click()}
        >
          <Upload className="w-4 h-4 mr-2" />
          {uploading ? 'Uploading...' : 'Select Images'}
        </Button>
        <input
          id="gallery-file-input"
          type="file"
          multiple
          accept="image/*"
          onChange={(e) => onFileUpload(e.target.files)}
          className="hidden"
        />
      </div>
    </div>
  );
};
