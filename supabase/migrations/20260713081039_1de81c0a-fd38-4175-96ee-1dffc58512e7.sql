
-- 1. client_profiles
CREATE TABLE public.client_profiles (
  user_id uuid PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  display_name text,
  company text,
  phone text,
  notification_email text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_profiles TO authenticated;
GRANT ALL ON public.client_profiles TO service_role;
ALTER TABLE public.client_profiles ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own profile read" ON public.client_profiles FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "own profile upsert" ON public.client_profiles FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own profile update" ON public.client_profiles FOR UPDATE TO authenticated
  USING (auth.uid() = user_id) WITH CHECK (auth.uid() = user_id);
CREATE TRIGGER trg_client_profiles_updated_at BEFORE UPDATE ON public.client_profiles
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();

-- 2. client_media_requests
CREATE TABLE public.client_media_requests (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id uuid NOT NULL REFERENCES auth.users(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  kind text NOT NULL DEFAULT 'asset',
  status text NOT NULL DEFAULT 'new',
  requested_delivery date,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);
GRANT SELECT, INSERT, UPDATE, DELETE ON public.client_media_requests TO authenticated;
GRANT ALL ON public.client_media_requests TO service_role;
ALTER TABLE public.client_media_requests ENABLE ROW LEVEL SECURITY;
CREATE POLICY "own requests read" ON public.client_media_requests FOR SELECT TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "own requests insert" ON public.client_media_requests FOR INSERT TO authenticated
  WITH CHECK (auth.uid() = user_id);
CREATE POLICY "own requests update" ON public.client_media_requests FOR UPDATE TO authenticated
  USING (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'))
  WITH CHECK (auth.uid() = user_id OR public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE POLICY "staff delete requests" ON public.client_media_requests FOR DELETE TO authenticated
  USING (public.has_role(auth.uid(), 'admin') OR public.has_role(auth.uid(), 'editor'));
CREATE TRIGGER trg_client_media_requests_updated_at BEFORE UPDATE ON public.client_media_requests
  FOR EACH ROW EXECUTE FUNCTION public.tg_set_updated_at();
CREATE INDEX idx_client_media_requests_user ON public.client_media_requests(user_id, created_at DESC);

-- 3. contact_submissions owner linkage
ALTER TABLE public.contact_submissions
  ADD COLUMN IF NOT EXISTS owner_user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;
CREATE INDEX IF NOT EXISTS idx_contact_submissions_owner ON public.contact_submissions(owner_user_id);
CREATE INDEX IF NOT EXISTS idx_contact_submissions_email ON public.contact_submissions(lower(email));

-- Allow clients to view submissions they own or that match their verified email
CREATE POLICY "own submissions read" ON public.contact_submissions FOR SELECT TO authenticated
  USING (
    owner_user_id = auth.uid()
    OR lower(email) = lower(coalesce((auth.jwt() ->> 'email'), ''))
  );

-- Auto-link inserts by the signed-in user (owner_user_id, on new rows only)
CREATE OR REPLACE FUNCTION public.tg_link_submission_owner()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
BEGIN
  IF NEW.owner_user_id IS NULL AND auth.uid() IS NOT NULL THEN
    NEW.owner_user_id := auth.uid();
  END IF;
  RETURN NEW;
END;
$$;
CREATE TRIGGER trg_contact_submissions_owner
  BEFORE INSERT ON public.contact_submissions
  FOR EACH ROW EXECUTE FUNCTION public.tg_link_submission_owner();
