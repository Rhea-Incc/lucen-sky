import { createFileRoute, useNavigate, Navigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/Nav";
import { supabase } from "@/integrations/supabase/client";
import {
  listSubmissions,
  listOnboarding,
  updateSubmissionStatus,
  createOnboarding,
  updateOnboardingStage,
  getSiteInfo,
  updateSiteInfo,
  getMyRole,
} from "@/lib/admin.functions";

export const Route = createFileRoute("/_authenticated/admin")({
  head: () => ({ meta: [{ title: "Flight Ops Console — Lucen Sky" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

type Tab = "missions" | "pipeline" | "site";

function AdminPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const [tab, setTab] = useState<Tab>("missions");

  const submissionsFn = useServerFn(listSubmissions);
  const onboardingFn = useServerFn(listOnboarding);
  const siteFn = useServerFn(getSiteInfo);
  const roleFn = useServerFn(getMyRole);
  const statusFn = useServerFn(updateSubmissionStatus);
  const createOnFn = useServerFn(createOnboarding);
  const stageFn = useServerFn(updateOnboardingStage);
  const saveSiteFn = useServerFn(updateSiteInfo);

  const role = useQuery({ queryKey: ["my-role"], queryFn: () => roleFn() });
  const roles = role.data?.roles ?? [];
  const isStaff = roles.some((r) => r === "admin" || r === "editor");

  const submissions = useQuery({ queryKey: ["admin-submissions"], queryFn: () => submissionsFn(), enabled: isStaff });
  const onboarding = useQuery({ queryKey: ["admin-onboarding"], queryFn: () => onboardingFn(), enabled: isStaff });
  const site = useQuery({ queryKey: ["site-info"], queryFn: () => siteFn(), enabled: isStaff });

  const mutStatus = useMutation({
    mutationFn: (v: { id: string; status: any }) => statusFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-submissions"] }),
  });
  const mutCreate = useMutation({
    mutationFn: (v: any) => createOnFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-onboarding"] }),
  });
  const mutStage = useMutation({
    mutationFn: (v: { id: string; stage: any }) => stageFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-onboarding"] }),
  });
  const mutSite = useMutation({
    mutationFn: (v: { key: string; value: any }) => saveSiteFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["site-info"] }),
  });

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  // Explicit loading / error states before deciding staff vs client redirect.
  if (role.isLoading) {
    return (
      <main className="relative min-h-screen">
        <Nav />
        <div className="pt-40 text-center text-sm text-muted-foreground">Verifying clearance…</div>
      </main>
    );
  }
  if (role.error) {
    return (
      <main className="relative min-h-screen">
        <Nav />
        <div className="pt-40 mx-auto max-w-md text-center">
          <div className="text-[10px] tracking-[0.3em] uppercase text-red-300 mb-2">Role unavailable</div>
          <p className="text-sm text-muted-foreground mb-4">
            We couldn't confirm your ops clearance. Your session may be stale.
          </p>
          <div className="flex gap-2 justify-center">
            <button onClick={() => role.refetch()} className="rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em]">Retry</button>
            <button onClick={signOut} className="rounded-full border border-[color:var(--photonic-cyan)]/40 text-[color:var(--photonic-cyan)] px-4 py-2 text-xs uppercase tracking-[0.2em]">Sign out</button>
          </div>
        </div>
      </main>
    );
  }
  // Client accounts get redirected to their portal — admin console is staff-only.
  if (!isStaff) {
    return <Navigate to="/portal" replace />;
  }


  return (
    <main className="relative min-h-screen">
      <Nav />
      <section className="pt-28 pb-16 px-4 md:px-8 mx-auto max-w-7xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-6">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80">
              Flight Ops · Console
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-light text-grad mt-1">Mission Control</h1>
            <div className="mt-2 text-xs text-muted-foreground">
              Roles: <span className="text-[color:var(--photonic-cyan)] font-mono">{(role.data?.roles ?? []).join(", ") || "—"}</span>
            </div>
          </div>
          <button onClick={signOut} className="rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em]">
            Sign out
          </button>
        </header>

        <div className="flex flex-wrap gap-2 mb-6">
          {(["missions", "pipeline", "site"] as Tab[]).map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 rounded-full text-xs uppercase tracking-[0.2em] transition-colors ${
                tab === t
                  ? "bg-[color:var(--photonic-cyan)] text-[color:var(--primary-foreground)] glow-cyan"
                  : "glass text-muted-foreground hover:text-foreground"
              }`}
            >
              {t === "missions" ? "Mission briefs" : t === "pipeline" ? "Client pipeline" : "Site info"}
            </button>
          ))}
        </div>

        {tab === "missions" && (
          <div className="glass-strong rounded-3xl ring-hairline overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full text-xs md:text-sm">
                <thead className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
                  <tr className="border-b border-white/10">
                    <th className="text-left p-3">When</th>
                    <th className="text-left p-3">Name</th>
                    <th className="text-left p-3 hidden md:table-cell">Company</th>
                    <th className="text-left p-3">Email</th>
                    <th className="text-left p-3 hidden md:table-cell">Intent</th>
                    <th className="text-left p-3">Status</th>
                    <th className="text-left p-3">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {submissions.isLoading && (
                    <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">Receiving telemetry…</td></tr>
                  )}
                  {submissions.data?.length === 0 && (
                    <tr><td colSpan={7} className="p-6 text-center text-muted-foreground">No briefs yet.</td></tr>
                  )}
                  {submissions.data?.map((s: any) => (
                    <tr key={s.id} className="border-b border-white/5 hover:bg-white/[0.02]">
                      <td className="p-3 font-mono text-[10px] text-muted-foreground">
                        {new Date(s.created_at).toLocaleString()}
                      </td>
                      <td className="p-3">{s.name}</td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{s.company || "—"}</td>
                      <td className="p-3 text-[color:var(--photonic-cyan)] break-all">{s.email}</td>
                      <td className="p-3 hidden md:table-cell text-muted-foreground">{s.intent || "—"}</td>
                      <td className="p-3">
                        <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] uppercase tracking-wider">{s.status}</span>
                      </td>
                      <td className="p-3">
                        <select
                          value={s.status}
                          onChange={(e) => mutStatus.mutate({ id: s.id, status: e.target.value })}
                          className="bg-transparent border border-white/10 rounded px-2 py-1 text-xs"
                        >
                          {["new", "in_review", "won", "lost", "archived"].map((x) => (
                            <option key={x} value={x} className="bg-[color:var(--obsidian)]">{x}</option>
                          ))}
                        </select>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {tab === "pipeline" && <PipelinePanel data={onboarding.data ?? []} onCreate={mutCreate.mutate} onStage={mutStage.mutate} />}

        {tab === "site" && <SitePanel value={site.data ?? {}} onSave={mutSite.mutate} />}
      </section>
    </main>
  );
}

function PipelinePanel({ data, onCreate, onStage }: { data: any[]; onCreate: (v: any) => void; onStage: (v: any) => void }) {
  const [form, setForm] = useState({ client_name: "", stage: "lead", estimated_value: "", notes: "" });
  return (
    <div className="grid lg:grid-cols-3 gap-6">
      <form
        onSubmit={(e) => {
          e.preventDefault();
          onCreate({
            client_name: form.client_name,
            stage: form.stage,
            estimated_value: form.estimated_value ? Number(form.estimated_value) : null,
            notes: form.notes || null,
          });
          setForm({ client_name: "", stage: "lead", estimated_value: "", notes: "" });
        }}
        className="glass-strong rounded-3xl ring-hairline p-6 space-y-3 h-fit"
      >
        <div className="text-[10px] uppercase tracking-[0.3em] text-[color:var(--photonic-cyan)]/80">Add client</div>
        <input required placeholder="Client name" value={form.client_name} onChange={(e) => setForm({ ...form, client_name: e.target.value })} className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent" />
        <select value={form.stage} onChange={(e) => setForm({ ...form, stage: e.target.value })} className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent">
          {["lead", "qualified", "proposal", "contract", "live", "delivered"].map((s) => <option key={s} value={s} className="bg-[color:var(--obsidian)]">{s}</option>)}
        </select>
        <input placeholder="Estimated value (USD)" type="number" value={form.estimated_value} onChange={(e) => setForm({ ...form, estimated_value: e.target.value })} className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent" />
        <textarea placeholder="Notes" rows={3} value={form.notes} onChange={(e) => setForm({ ...form, notes: e.target.value })} className="w-full glass rounded-xl px-3 py-2 text-sm bg-transparent" />
        <button className="w-full rounded-full bg-[color:var(--photonic-cyan)] px-4 py-2 text-xs text-[color:var(--primary-foreground)] uppercase tracking-[0.2em]">Add to pipeline</button>
      </form>

      <div className="lg:col-span-2 space-y-2">
        {data.length === 0 && <div className="text-sm text-muted-foreground p-6 glass rounded-2xl">No clients in pipeline.</div>}
        {data.map((c) => (
          <div key={c.id} className="glass-strong rounded-2xl ring-hairline p-4 flex flex-wrap items-center justify-between gap-3">
            <div>
              <div className="font-display text-lg">{c.client_name}</div>
              <div className="text-xs text-muted-foreground">
                {c.estimated_value ? `$${Number(c.estimated_value).toLocaleString()} · ` : ""}
                {new Date(c.created_at).toLocaleDateString()}
              </div>
              {c.notes && <div className="text-xs text-muted-foreground mt-1 max-w-xl">{c.notes}</div>}
            </div>
            <select value={c.stage} onChange={(e) => onStage({ id: c.id, stage: e.target.value })} className="bg-transparent border border-white/10 rounded px-3 py-1.5 text-xs">
              {["lead", "qualified", "proposal", "contract", "live", "delivered", "lost"].map((s) => <option key={s} value={s} className="bg-[color:var(--obsidian)]">{s}</option>)}
            </select>
          </div>
        ))}
      </div>
    </div>
  );
}

function SitePanel({ value, onSave }: { value: Record<string, any>; onSave: (v: { key: string; value: any }) => void }) {
  const [drafts, setDrafts] = useState<Record<string, string>>({});
  useEffect(() => {
    const initial: Record<string, string> = {};
    for (const k of Object.keys(value)) initial[k] = JSON.stringify(value[k], null, 2);
    setDrafts(initial);
  }, [value]);
  const keys = Object.keys(drafts);

  return (
    <div className="space-y-4">
      <div className="text-xs text-muted-foreground">Editable site info (JSON). Used across pages for headlines, contact details, etc.</div>
      {keys.length === 0 && <div className="text-sm text-muted-foreground p-6 glass rounded-2xl">Loading…</div>}
      {keys.map((k) => (
        <div key={k} className="glass-strong rounded-2xl ring-hairline p-4">
          <div className="flex items-center justify-between mb-2">
            <div className="font-mono text-xs text-[color:var(--photonic-cyan)]">{k}</div>
            <button
              onClick={() => {
                try {
                  const parsed = JSON.parse(drafts[k]);
                  onSave({ key: k, value: parsed });
                } catch {
                  alert("Invalid JSON");
                }
              }}
              className="rounded-full bg-[color:var(--photonic-cyan)] px-3 py-1 text-[10px] uppercase tracking-[0.2em] text-[color:var(--primary-foreground)]"
            >
              Save
            </button>
          </div>
          <textarea
            value={drafts[k]}
            onChange={(e) => setDrafts({ ...drafts, [k]: e.target.value })}
            rows={6}
            className="w-full glass rounded-xl px-3 py-2 text-xs font-mono bg-transparent"
          />
        </div>
      ))}
    </div>
  );
}
