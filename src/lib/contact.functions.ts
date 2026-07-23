import { createServerFn } from "@tanstack/react-start";
import { z } from "zod";

const ContactSchema = z.object({
  name: z.string().trim().min(1).max(120),
  company: z.string().trim().max(160).optional().or(z.literal("")),
  email: z.string().trim().email().max(254),
  phone: z.string().trim().max(40).optional().or(z.literal("")),
  city: z.string().trim().max(120).optional().or(z.literal("")),
  event_date: z.string().trim().max(20).optional().or(z.literal("")),
  intent: z.string().trim().max(60).optional().or(z.literal("")),
  callback: z.boolean().default(false),
  message: z.string().trim().max(4000).optional().or(z.literal("")),
});

async function notifyOps(payload: {
  name: string;
  email: string;
  intent: string | null;
  city: string | null;
  message: string | null;
  event_date: string | null;
  company: string | null;
  phone: string | null;
}) {
  try {
    // Resolve ops recipient: env override > site_info.ops_email
    let opsEmail = process.env.OPS_NOTIFY_EMAIL || "";
    if (!opsEmail) {
      const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
      const { data } = await supabaseAdmin
        .from("site_info")
        .select("value")
        .eq("key", "ops_email")
        .maybeSingle();
      const v: any = data?.value;
      opsEmail = typeof v === "string" ? v : v?.email ?? "";
    }
    if (!opsEmail) {
      console.info("[submitContact] ops email not configured — skipping notification");
      return;
    }

    const lovableKey = process.env.LOVABLE_API_KEY;
    const resendKey = process.env.RESEND_API_KEY;
    if (!lovableKey || !resendKey) {
      console.info("[submitContact] Resend connector not linked — skipping email");
      return;
    }

    const subject = `New mission brief · ${payload.intent || "Contact"} · ${payload.name}`;
    const html = `
      <h2>New mission brief</h2>
      <p><strong>From:</strong> ${escapeHtml(payload.name)} &lt;${escapeHtml(payload.email)}&gt;</p>
      ${payload.company ? `<p><strong>Company:</strong> ${escapeHtml(payload.company)}</p>` : ""}
      ${payload.phone ? `<p><strong>Phone:</strong> ${escapeHtml(payload.phone)}</p>` : ""}
      ${payload.city ? `<p><strong>City:</strong> ${escapeHtml(payload.city)}</p>` : ""}
      ${payload.event_date ? `<p><strong>Event date:</strong> ${escapeHtml(payload.event_date)}</p>` : ""}
      ${payload.intent ? `<p><strong>Intent:</strong> ${escapeHtml(payload.intent)}</p>` : ""}
      ${payload.message ? `<p><strong>Message:</strong><br/>${escapeHtml(payload.message).replace(/\n/g, "<br/>")}</p>` : ""}
    `;

    const res = await fetch("https://connector-gateway.lovable.dev/resend/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${lovableKey}`,
        "X-Connection-Api-Key": resendKey,
      },
      body: JSON.stringify({
        from: "Lucen Sky Ops <onboarding@resend.dev>",
        to: [opsEmail],
        reply_to: payload.email,
        subject,
        html,
      }),
    });
    if (!res.ok) {
      const body = await res.text();
      console.error(`[submitContact] ops notify failed [${res.status}]: ${body}`);
    }
  } catch (e) {
    console.error("[submitContact] notify error", e);
  }
}

function escapeHtml(s: string) {
  return s.replace(/[&<>"']/g, (c) =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c] as string),
  );
}

export const submitContact = createServerFn({ method: "POST" })
  .inputValidator((data: unknown) => ContactSchema.parse(data))
  .handler(async ({ data }) => {
    const { supabaseAdmin } = await import("@/integrations/supabase/client.server");
    const row = {
      name: data.name,
      company: data.company || null,
      email: data.email,
      phone: data.phone || null,
      city: data.city || null,
      event_date: data.event_date || null,
      intent: data.intent || null,
      callback: data.callback,
      message: data.message || null,
      source: "web",
      status: "new" as const,
    };
    const { error } = await supabaseAdmin.from("contact_submissions").insert(row);
    if (error) {
      console.error("[submitContact] insert failed", error);
      throw new Error("Could not file your mission brief. Please try again.");
    }
    // Fire ops notification — never blocks the user; failure is logged.
    await notifyOps({
      name: row.name,
      email: row.email,
      intent: row.intent,
      city: row.city,
      message: row.message,
      event_date: row.event_date,
      company: row.company,
      phone: row.phone,
    });
    return { ok: true };
  });
