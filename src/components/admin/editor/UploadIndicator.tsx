
import React from 'react';
import { Upload } from 'lucide-react';

interface UploadIndicatorProps {
  uploading: boolean;
}

export const UploadIndicator = ({ uploading }: UploadIndicatorProps) => {
  if (!uploading) return null;

  return (
    <div className="absolute top-2 right-2 bg-background border rounded p-2 flex items-center gap-2">
      <Upload className="w-4 h-4 animate-spin" />
      <span className="text-sm">Uploading...</span>
    </div>
  );
};
