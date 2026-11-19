CREATE TABLE public.website_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  request_type text NOT NULL CHECK (request_type IN ('appointment', 'contact')),
  full_name text NOT NULL CHECK (char_length(full_name) BETWEEN 2 AND 120),
  phone text,
  email text,
  service text,
  preferred_date date,
  message text NOT NULL CHECK (char_length(message) BETWEEN 5 AND 2000),
  status text NOT NULL DEFAULT 'new' CHECK (status IN ('new', 'in_progress', 'resolved')),
  created_at timestamptz NOT NULL DEFAULT now()
);
GRANT INSERT ON public.website_requests TO anon, authenticated;
GRANT ALL ON public.website_requests TO service_role;
ALTER TABLE public.website_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Anyone can submit a website request"
ON public.website_requests
FOR INSERT
TO anon, authenticated
WITH CHECK (status = 'new');