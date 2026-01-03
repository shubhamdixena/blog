
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Upload, Trash2, Copy, Image as ImageIcon } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface MediaLibraryProps {
  activeTab: string;
}

interface MediaFile {
  name: string;
  id: string;
  updated_at: string;
  metadata: any;
}

export const MediaLibrary = ({ activeTab }: MediaLibraryProps) => {
  const [files, setFiles] = useState<MediaFile[]>([]);
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const { toast } = useToast();

  useEffect(() => {
    if (activeTab === 'media') {
      fetchFiles();
    }
  }, [activeTab]);

  const fetchFiles = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase.storage
        .from('blog-images')
        .list('', {
          limit: 100,
          offset: 0,
          sortBy: { column: 'updated_at', order: 'desc' }
        });

      if (error) throw error;
      setFiles(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to fetch media files",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    try {
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = fileName;

      const { error: uploadError } = await supabase.storage
        .from('blog-images')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      toast({
        title: "Success",
        description: "File uploaded successfully",
      });

      fetchFiles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to upload file",
        variant: "destructive",
      });
    } finally {
      setUploading(false);
    }
  };

  const handleDeleteFile = async (fileName: string) => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    try {
      const { error } = await supabase.storage
        .from('blog-images')
        .remove([fileName]);

      if (error) throw error;

      toast({
        title: "Success",
        description: "File deleted successfully",
      });

      fetchFiles();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete file",
        variant: "destructive",
      });
    }
  };

  const copyImageUrl = async (fileName: string) => {
    const { data } = supabase.storage
      .from('blog-images')
      .getPublicUrl(fileName);

    await navigator.clipboard.writeText(data.publicUrl);
    toast({
      title: "Success",
      description: "Image URL copied to clipboard",
    });
  };

  if (activeTab !== 'media') return null;

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end gap-4">
        <Input
          type="file"
          accept="image/*"
          onChange={handleFileUpload}
          disabled={uploading}
          className="max-w-xs"
        />
        {uploading && (
          <div className="flex items-center gap-2 text-sm text-slate-600">
            <Upload className="w-4 h-4 animate-pulse" />
            Uploading...
          </div>
        )}
      </div>

      {loading ? (
        <div className="text-center py-12">Loading files...</div>
      ) : files.length === 0 ? (
        <div className="text-center py-12 border border-slate-200 rounded-lg">
          <ImageIcon className="w-12 h-12 mx-auto text-slate-400 mb-4" />
          <p className="text-slate-500">No images uploaded yet</p>
        </div>
      ) : (
        <div className="border border-slate-200 rounded-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Preview</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Name</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Size</th>
                <th className="text-left py-3 px-4 font-medium text-slate-700">Uploaded</th>
                <th className="text-right py-3 px-4 font-medium text-slate-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {files.map((file) => (
                <tr key={file.id} className="border-b border-slate-200 hover:bg-slate-50">
                  <td className="py-3 px-4">
                    <div className="w-12 h-12 rounded-lg overflow-hidden bg-slate-100">
                      <img
                        src={supabase.storage.from('blog-images').getPublicUrl(file.name).data.publicUrl}
                        alt={file.name}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-900 truncate max-w-xs block">{file.name}</span>
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {file.metadata?.size ? `${Math.round(file.metadata.size / 1024)}KB` : '-'}
                  </td>
                  <td className="py-3 px-4 text-sm text-slate-600">
                    {new Date(file.updated_at).toLocaleDateString()}
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center justify-end gap-2">
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => copyImageUrl(file.name)}
                        className="text-blue-600 hover:text-blue-700 hover:bg-blue-50"
                      >
                        <Copy className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => handleDeleteFile(file.name)}
                        className="text-red-600 hover:text-red-700 hover:bg-red-50"
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};
