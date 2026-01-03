
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Upload, X } from 'lucide-react';

interface SeoEditorProps {
  metaDescription: string;
  setMetaDescription: (value: string) => void;
  metaKeywords: string[];
  setMetaKeywords: (value: string[]) => void;
  ogTitle: string;
  setOgTitle: (value: string) => void;
  ogDescription: string;
  setOgDescription: (value: string) => void;
  ogImageUrl: string;
  setOgImageUrl: (value: string) => void;
  canonicalUrl: string;
  setCanonicalUrl: (value: string) => void;
  robotsMeta: string;
  setRobotsMeta: (value: string) => void;
  title: string;
  excerpt: string;
}

export const SeoEditor = ({
  metaDescription,
  setMetaDescription,
  metaKeywords,
  setMetaKeywords,
  ogTitle,
  setOgTitle,
  ogDescription,
  setOgDescription,
  ogImageUrl,
  setOgImageUrl,
  canonicalUrl,
  setCanonicalUrl,
  robotsMeta,
  setRobotsMeta,
  title,
  excerpt
}: SeoEditorProps) => {
  const [keywordInput, setKeywordInput] = useState('');

  const addKeyword = () => {
    if (keywordInput.trim() && !metaKeywords.includes(keywordInput.trim())) {
      setMetaKeywords([...metaKeywords, keywordInput.trim()]);
      setKeywordInput('');
    }
  };

  const removeKeyword = (keyword: string) => {
    setMetaKeywords(metaKeywords.filter(k => k !== keyword));
  };

  const handleKeywordKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addKeyword();
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO & Social Media</CardTitle>
        <CardDescription>Optimize your post for search engines and social sharing</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <Label htmlFor="meta-description">Meta Description</Label>
          <Textarea
            id="meta-description"
            value={metaDescription}
            onChange={(e) => setMetaDescription(e.target.value)}
            placeholder={excerpt || "Brief description for search engines..."}
            className="min-h-[80px]"
            maxLength={160}
          />
          <div className="text-sm text-muted-foreground mt-1">
            {metaDescription.length}/160 characters
          </div>
        </div>

        <div>
          <Label htmlFor="keywords">Keywords</Label>
          <div className="flex gap-2 mb-2">
            <Input
              id="keywords"
              value={keywordInput}
              onChange={(e) => setKeywordInput(e.target.value)}
              onKeyPress={handleKeywordKeyPress}
              placeholder="Add a keyword and press Enter"
            />
            <Button type="button" onClick={addKeyword} size="sm">Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {metaKeywords.map((keyword) => (
              <Badge key={keyword} variant="secondary" className="flex items-center gap-1">
                {keyword}
                <X 
                  className="w-3 h-3 cursor-pointer" 
                  onClick={() => removeKeyword(keyword)}
                />
              </Badge>
            ))}
          </div>
        </div>

        <div>
          <Label htmlFor="og-title">Open Graph Title</Label>
          <Input
            id="og-title"
            value={ogTitle}
            onChange={(e) => setOgTitle(e.target.value)}
            placeholder={title || "Custom title for social media"}
          />
        </div>

        <div>
          <Label htmlFor="og-description">Open Graph Description</Label>
          <Textarea
            id="og-description"
            value={ogDescription}
            onChange={(e) => setOgDescription(e.target.value)}
            placeholder={metaDescription || excerpt || "Description for social media"}
            className="min-h-[60px]"
          />
        </div>

        <div>
          <Label htmlFor="og-image">Open Graph Image URL</Label>
          <Input
            id="og-image"
            value={ogImageUrl}
            onChange={(e) => setOgImageUrl(e.target.value)}
            placeholder="URL for social media image"
          />
        </div>

        <div>
          <Label htmlFor="canonical-url">Canonical URL</Label>
          <Input
            id="canonical-url"
            value={canonicalUrl}
            onChange={(e) => setCanonicalUrl(e.target.value)}
            placeholder="https://example.com/canonical-url"
          />
        </div>

        <div>
          <Label htmlFor="robots-meta">Robots Meta</Label>
          <Select value={robotsMeta} onValueChange={setRobotsMeta}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="index,follow">Index, Follow</SelectItem>
              <SelectItem value="noindex,follow">No Index, Follow</SelectItem>
              <SelectItem value="index,nofollow">Index, No Follow</SelectItem>
              <SelectItem value="noindex,nofollow">No Index, No Follow</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
    </Card>
  );
};
