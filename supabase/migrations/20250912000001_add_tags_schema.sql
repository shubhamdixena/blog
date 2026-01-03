-- Add tags functionality to the blog schema

-- Create tags table
CREATE TABLE public.tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL UNIQUE,
  slug TEXT NOT NULL UNIQUE,
  color TEXT DEFAULT '#6B7280',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts_tags junction table
CREATE TABLE public.posts_tags (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  post_id UUID NOT NULL REFERENCES public.posts(id) ON DELETE CASCADE,
  tag_id UUID NOT NULL REFERENCES public.tags(id) ON DELETE CASCADE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(post_id, tag_id)
);

-- Enable RLS on tags tables
ALTER TABLE public.tags ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.posts_tags ENABLE ROW LEVEL SECURITY;

-- Tags policies (public read, authenticated write)
CREATE POLICY "Anyone can view tags" 
ON public.tags 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert tags" 
ON public.tags 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update tags" 
ON public.tags 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete tags" 
ON public.tags 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Posts_tags policies
CREATE POLICY "Anyone can view posts_tags" 
ON public.posts_tags 
FOR SELECT 
USING (true);

CREATE POLICY "Authenticated users can insert posts_tags" 
ON public.posts_tags 
FOR INSERT 
WITH CHECK (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can update posts_tags" 
ON public.posts_tags 
FOR UPDATE 
USING (auth.role() = 'authenticated');

CREATE POLICY "Authenticated users can delete posts_tags" 
ON public.posts_tags 
FOR DELETE 
USING (auth.role() = 'authenticated');

-- Add updated_at trigger for tags
CREATE TRIGGER update_tags_updated_at
  BEFORE UPDATE ON public.tags
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_updated_at();

-- Insert some default tags
INSERT INTO public.tags (name, slug, color) VALUES
  ('JavaScript', 'javascript', '#F7DF1E'),
  ('React', 'react', '#61DAFB'),
  ('TypeScript', 'typescript', '#3178C6'),
  ('Node.js', 'nodejs', '#339933'),
  ('Tutorial', 'tutorial', '#FF6B6B'),
  ('Opinion', 'opinion', '#4ECDC4'),
  ('Guide', 'guide', '#45B7D1'),
  ('Tips', 'tips', '#96CEB4'),
  ('Review', 'review', '#FFEAA7'),
  ('News', 'news', '#DDA0DD');
