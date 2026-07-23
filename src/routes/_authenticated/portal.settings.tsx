import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useEffect, useState } from "react";
import { getMyProfile, upsertMyProfile } from "@/lib/client-portal.functions";

export const Route = createFileRoute("/_authenticated/portal/settings")({
  head: () => ({ meta: [{ title: "Account Settings — Lucen Sky" }, { name: "robots", content: "noindex" }] }),
  component: SettingsPage,
});

function SettingsPage() {
  const qc = useQueryClient();
  const getFn = useServerFn(getMyProfile);
  const saveFn = useServerFn(upsertMyProfile);

  const q = useQuery({ queryKey: ["my-profile"], queryFn: () => getFn() });
  const save = useMutation({
    mutationFn: (v: any) => saveFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-profile"] }),
  });

  const [form, setForm] = useState({ display_name: "", company: "", phone: "", notification_email: "" });

  useEffect(() => {
    if (q.data) {
      setForm({
        display_name: q.data.display_name ?? "",
        company: q.data.company ?? "",
        phone: q.data.phone ?? "",
        notification_email: q.data.notification_email ?? "",
      });
    }
  }, [q.data]);

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    save.mutate(form);
  };

  return (
    <div className="max-w-2xl">
      <form onSubmit={submit} className="glass-strong rounded-3xl ring-hairline p-6 space-y-4">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
          Account details
        </div>
        {q.isLoading ? (
          <div className="text-sm text-muted-foreground">Loading…</div>
        ) : q.error ? (
          <div className="text-sm text-red-300">Failed to load your profile.</div>
        ) : (
          <>
            <Field label="Display name">
              <input value={form.display_name} onChange={(e) => setForm({ ...form, display_name: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Company / Brand">
              <input value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} className={inputCls} />
            </Field>
            <Field label="Phone">
              <input value={form.phone} onChange={(e) => setForm({ ...form, phone: e.target.value })} inputMode="tel" className={inputCls} />
            </Field>
            <Field label="Notification email" hint="Where we send flight updates. Defaults to your sign-in email if blank.">
              <input type="email" value={form.notification_email} onChange={(e) => setForm({ ...form, notification_email: e.target.value })} className={inputCls} />
            </Field>
            {save.isError && (
              <div className="text-xs text-red-300">{(save.error as any)?.message ?? "Save failed."}</div>
            )}
            {save.isSuccess && <div className="text-xs text-[color:var(--photonic-cyan)]">Saved.</div>}
            <div className="pt-2">
              <button
                type="submit"
                disabled={save.isPending}
                className="rounded-full bg-[color:var(--photonic-cyan)] px-6 py-3 text-xs text-[color:var(--primary-foreground)] glow-cyan disabled:opacity-60"
              >
                {save.isPending ? "Saving…" : "Save changes"}
              </button>
            </div>
          </>
        )}
      </form>
    </div>
  );
}

const inputCls =
  "w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50";

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground mb-1">{label}</div>
      {children}
      {hint && <div className="mt-1 text-[10px] text-muted-foreground/70">{hint}</div>}
    </label>
  );
}
