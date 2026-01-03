import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Save } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface SiteSettings {
  id: string;
  value: any;
}

interface SiteSettingsManagerProps {
  activeTab: string;
}

export const SiteSettingsManager = ({ activeTab }: SiteSettingsManagerProps) => {
  const [settings, setSettings] = useState<SiteSettings | null>(null);
  const [formData, setFormData] = useState({
    site_title: "",
    site_description: "",
    site_keywords: "",
    default_og_image: "",
    google_analytics_id: "",
    twitter_handle: "",
    favicon_url: ""
  });
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchSettings = async () => {
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('*')
        .eq('id', 'global')
        .single();

      if (error && error.code !== 'PGRST116') throw error;

      if (data) {
        setSettings(data);
        const value = (data.value as any) || {};
        setFormData({
          site_title: value.site_title || "",
          site_description: value.site_description || "",
          site_keywords: value.site_keywords || "",
          default_og_image: value.default_og_image || "",
          google_analytics_id: value.google_analytics_id || "",
          twitter_handle: value.twitter_handle || "",
          favicon_url: value.favicon_url || ""
        });
      }
    } catch (error: any) {
      console.error('Error fetching settings:', error);
      toast({
        title: "Error",
        description: "Failed to fetch site settings",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activeTab === 'settings') {
      fetchSettings();
    }
  }, [activeTab]);

  const handleSave = async () => {
    try {
      const settingsData = {
        id: 'global',
        value: formData
      };

      if (settings) {
        const { error } = await supabase
          .from('site_settings')
          .update(settingsData)
          .eq('id', 'global');

        if (error) throw error;
      } else {
        const { error } = await supabase
          .from('site_settings')
          .insert([settingsData]);

        if (error) throw error;
      }

      toast({
        title: "Success",
        description: "Site settings updated successfully",
      });

      fetchSettings();
    } catch (error: any) {
      console.error('Error updating settings:', error);
      toast({
        title: "Error",
        description: "Failed to update site settings",
        variant: "destructive",
      });
    }
  };

  if (activeTab !== 'settings') return null;

  if (loading) {
    return <div>Loading settings...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-end">
        <Button onClick={handleSave} className="bg-blue-600 hover:bg-blue-700">
          <Save className="w-4 h-4 mr-2" />
          Save Settings
        </Button>
      </div>

      <div className="border border-slate-200 rounded-lg p-6 space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">General</h3>
            
            <div>
              <Label htmlFor="site_title" className="text-sm font-medium text-slate-700">Site Title</Label>
              <Input
                id="site_title"
                value={formData.site_title}
                onChange={(e) => setFormData(prev => ({ ...prev, site_title: e.target.value }))}
                placeholder="Your Site Title"
                className="mt-1"
              />
            </div>
            
            <div>
              <Label htmlFor="site_description" className="text-sm font-medium text-slate-700">Site Description</Label>
              <Textarea
                id="site_description"
                value={formData.site_description}
                onChange={(e) => setFormData(prev => ({ ...prev, site_description: e.target.value }))}
                placeholder="A brief description of your site"
                rows={3}
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="site_keywords" className="text-sm font-medium text-slate-700">Keywords</Label>
              <Input
                id="site_keywords"
                value={formData.site_keywords}
                onChange={(e) => setFormData(prev => ({ ...prev, site_keywords: e.target.value }))}
                placeholder="keyword1, keyword2, keyword3"
                className="mt-1"
              />
            </div>
          </div>

          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-900">SEO & Social</h3>
            
            <div>
              <Label htmlFor="default_og_image" className="text-sm font-medium text-slate-700">Default OG Image URL</Label>
              <Input
                id="default_og_image"
                value={formData.default_og_image}
                onChange={(e) => setFormData(prev => ({ ...prev, default_og_image: e.target.value }))}
                placeholder="https://example.com/og-image.jpg"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="twitter_handle" className="text-sm font-medium text-slate-700">Twitter Handle</Label>
              <Input
                id="twitter_handle"
                value={formData.twitter_handle}
                onChange={(e) => setFormData(prev => ({ ...prev, twitter_handle: e.target.value }))}
                placeholder="@yourusername"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="favicon_url" className="text-sm font-medium text-slate-700">Favicon URL</Label>
              <Input
                id="favicon_url"
                value={formData.favicon_url}
                onChange={(e) => setFormData(prev => ({ ...prev, favicon_url: e.target.value }))}
                placeholder="https://example.com/favicon.ico"
                className="mt-1"
              />
            </div>

            <div>
              <Label htmlFor="google_analytics_id" className="text-sm font-medium text-slate-700">Google Analytics ID</Label>
              <Input
                id="google_analytics_id"
                value={formData.google_analytics_id}
                onChange={(e) => setFormData(prev => ({ ...prev, google_analytics_id: e.target.value }))}
                placeholder="G-XXXXXXXXXX"
                className="mt-1"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};