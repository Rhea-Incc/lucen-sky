import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { requireSupabaseAuth } from "@/integrations/supabase/auth-middleware";

// -------- Role --------
export const getMyRole = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", context.userId);
    if (error) throw error;
    const roles = (data ?? []).map((r: any) => r.role as string);
    const isStaff = roles.some((r) => r === "admin" || r === "editor");
    const email = (context.claims as any)?.email ?? null;
    return { roles, isStaff, userId: context.userId, email };
  });

// -------- Submissions (client sees own) --------
// Uses RLS: contact_submissions SELECT policy allows owner_user_id = auth.uid()
// OR lower(email) = auth.jwt().email. So context.supabase is enough.
export const listMySubmissions = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("contact_submissions")
      .select("id,created_at,intent,city,status,event_date")
      .order("created_at", { ascending: false })
      .limit(50);
    if (error) throw error;
    return data ?? [];
  });

// -------- Media requests (RLS: user_id = auth.uid()) --------
const MediaRequestSchema = z.object({
  title: z.string().trim().min(1).max(160),
  description: z.string().trim().max(4000).optional().or(z.literal("")),
  kind: z.enum(["asset", "video", "photo", "raw_footage", "cutdown", "other"]).default("asset"),
  requested_delivery: z.string().trim().max(20).optional().or(z.literal("")),
});

export const listMyMediaRequests = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("client_media_requests")
      .select("*")
      .eq("user_id", context.userId)
      .order("created_at", { ascending: false })
      .limit(100);
    if (error) throw error;
    return data ?? [];
  });

export const createMediaRequest = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => MediaRequestSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("client_media_requests").insert({
      user_id: context.userId,
      title: data.title,
      description: data.description || null,
      kind: data.kind,
      requested_delivery: data.requested_delivery || null,
    });
    if (error) throw error;
    return { ok: true };
  });

// -------- Profile (RLS: user_id = auth.uid()) --------
const ProfileSchema = z.object({
  display_name: z.string().trim().max(120).optional().or(z.literal("")),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  notification_email: z.string().trim().email().max(254).optional().or(z.literal("")),
});

export const getMyProfile = createServerFn({ method: "GET" })
  .middleware([requireSupabaseAuth])
  .handler(async ({ context }) => {
    const { data, error } = await context.supabase
      .from("client_profiles")
      .select("*")
      .eq("user_id", context.userId)
      .maybeSingle();
    if (error) throw error;
    return data;
  });

export const upsertMyProfile = createServerFn({ method: "POST" })
  .middleware([requireSupabaseAuth])
  .inputValidator((d: unknown) => ProfileSchema.parse(d))
  .handler(async ({ context, data }) => {
    const { error } = await context.supabase.from("client_profiles").upsert({
      user_id: context.userId,
      display_name: data.display_name || null,
      company: data.company || null,
      phone: data.phone || null,
      notification_email: data.notification_email || null,
    });
    if (error) throw error;
    return { ok: true };
  });
