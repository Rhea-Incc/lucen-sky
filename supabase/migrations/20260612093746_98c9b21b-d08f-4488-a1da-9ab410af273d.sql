
-- Lock down site_info: remove public read; only signed-in staff can read.
-- (App reads site_info exclusively through service-role server functions.)
DROP POLICY IF EXISTS "public read site_info" ON public.site_info;

CREATE POLICY "staff read site_info"
ON public.site_info
FOR SELECT
TO authenticated
USING (
  public.has_role(auth.uid(), 'admin'::public.app_role)
  OR public.has_role(auth.uid(), 'editor'::public.app_role)
);

-- Storage RLS for the private lucen-sky-media bucket.
-- Service role (admin server fns) bypasses RLS; these policies restrict any
-- direct client access to admins only.
DROP POLICY IF EXISTS "lucen_sky_media admin read"   ON storage.objects;
DROP POLICY IF EXISTS "lucen_sky_media admin insert" ON storage.objects;
DROP POLICY IF EXISTS "lucen_sky_media admin update" ON storage.objects;
DROP POLICY IF EXISTS "lucen_sky_media admin delete" ON storage.objects;

CREATE POLICY "lucen_sky_media admin read"
ON storage.objects FOR SELECT TO authenticated
USING (bucket_id = 'lucen-sky-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "lucen_sky_media admin insert"
ON storage.objects FOR INSERT TO authenticated
WITH CHECK (bucket_id = 'lucen-sky-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "lucen_sky_media admin update"
ON storage.objects FOR UPDATE TO authenticated
USING (bucket_id = 'lucen-sky-media' AND public.has_role(auth.uid(), 'admin'::public.app_role))
WITH CHECK (bucket_id = 'lucen-sky-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

CREATE POLICY "lucen_sky_media admin delete"
ON storage.objects FOR DELETE TO authenticated
USING (bucket_id = 'lucen-sky-media' AND public.has_role(auth.uid(), 'admin'::public.app_role));

-- Lock down SECURITY DEFINER trigger helper — only the trigger should invoke it.
REVOKE EXECUTE ON FUNCTION public.bootstrap_first_admin() FROM PUBLIC, anon, authenticated;
