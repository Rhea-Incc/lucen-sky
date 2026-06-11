
-- Lock down SECURITY DEFINER functions: only callable internally / by trigger.
REVOKE EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) FROM PUBLIC, anon, authenticated;
GRANT  EXECUTE ON FUNCTION public.has_role(uuid, public.app_role) TO service_role;
-- RLS policies that reference has_role() will still work: policies run with
-- table owner privileges, not the caller's, so EXECUTE grants don't matter inside USING/CHECK.

REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;
-- trigger executes regardless of grants.

-- Tighten the open INSERT policy on contact_submissions with sane bounds.
DROP POLICY IF EXISTS "anyone can submit" ON public.contact_submissions;
CREATE POLICY "anyone can submit bounded" ON public.contact_submissions
  FOR INSERT TO anon, authenticated
  WITH CHECK (
    length(name)   BETWEEN 1 AND 120
    AND length(email) BETWEEN 3 AND 254
    AND email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
    AND (message IS NULL OR length(message) <= 4000)
    AND (company IS NULL OR length(company) <= 160)
    AND (phone   IS NULL OR length(phone)   <= 40)
    AND (city    IS NULL OR length(city)    <= 120)
    AND (intent  IS NULL OR length(intent)  <= 60)
    AND status = 'new'
  );
