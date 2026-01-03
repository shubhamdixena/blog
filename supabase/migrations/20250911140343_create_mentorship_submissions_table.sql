-- Create mentorship_submissions table
CREATE TABLE public.mentorship_submissions (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  first_name TEXT NOT NULL,
  last_name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  city TEXT,
  application_type TEXT NOT NULL,
  professional_status TEXT NOT NULL,
  institution TEXT,
  background_info TEXT[],
  has_accessibility_needs BOOLEAN DEFAULT FALSE,
  communication_preference TEXT,
  session_timing TEXT,
  accessibility_requirements TEXT,
  agree_to_terms BOOLEAN DEFAULT FALSE,
  files_uploaded TEXT[], -- Array of file names/paths
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Enable RLS on mentorship_submissions
ALTER TABLE public.mentorship_submissions ENABLE ROW LEVEL SECURITY;

-- Add basic policies for mentorship_submissions (simplified without profiles dependency)
CREATE POLICY "Anyone can insert mentorship submissions" 
ON public.mentorship_submissions 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Public can view mentorship submissions" 
ON public.mentorship_submissions 
FOR SELECT 
USING (true);

-- Create index on email for faster lookups
CREATE INDEX idx_mentorship_submissions_email ON public.mentorship_submissions(email);

-- Create index on created_at for ordering
CREATE INDEX idx_mentorship_submissions_created_at ON public.mentorship_submissions(created_at DESC);
