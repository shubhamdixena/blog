-- Add whatsapp column to mentorship_submissions table
ALTER TABLE public.mentorship_submissions 
ADD COLUMN whatsapp TEXT;

-- Add index on whatsapp for faster lookups (optional)
CREATE INDEX idx_mentorship_submissions_whatsapp ON public.mentorship_submissions(whatsapp) WHERE whatsapp IS NOT NULL;
