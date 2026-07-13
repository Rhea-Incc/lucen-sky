import { createFileRoute, useNavigate, Link, Outlet, useRouterState } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/Nav";
import { supabase } from "@/integrations/supabase/client";
import { getMyRole } from "@/lib/client-portal.functions";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Client Portal — Lucen Sky" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalLayout,
});

function PortalLayout() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const roleFn = useServerFn(getMyRole);
  const role = useQuery({
    queryKey: ["my-role"],
    queryFn: () => roleFn(),
    retry: 1,
    staleTime: 30_000,
  });

  const path = useRouterState({ select: (s) => s.location.pathname });
  const isIndex = path === "/portal" || path === "/portal/";

  const signOut = async () => {
    await qc.cancelQueries();
    qc.clear();
    await supabase.auth.signOut();
    navigate({ to: "/auth", replace: true });
  };

  return (
    <main className="relative min-h-screen">
      <Nav />
      <section className="pt-28 pb-16 px-4 md:px-8 mx-auto max-w-6xl">
        <header className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80">
              Client · Portal
            </div>
            <h1 className="font-display text-3xl md:text-5xl font-light text-grad mt-1">
              Your flight deck.
            </h1>
            <RoleBanner
              loading={role.isLoading}
              error={role.error as any}
              email={role.data?.email ?? null}
              isStaff={Boolean(role.data?.isStaff)}
              onRetry={() => role.refetch()}
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {role.data?.isStaff && (
              <Link
                to="/admin"
                className="rounded-full border border-[color:var(--photonic-cyan)]/40 text-[color:var(--photonic-cyan)] px-4 py-2 text-xs uppercase tracking-[0.2em] hover:bg-[color:var(--photonic-cyan)]/10"
              >
                Ops console →
              </Link>
            )}
            <button
              onClick={signOut}
              className="rounded-full glass px-4 py-2 text-xs uppercase tracking-[0.2em]"
            >
              Sign out
            </button>
          </div>
        </header>

        <nav className="flex flex-wrap gap-2 mb-8 text-[10px] uppercase tracking-[0.25em]">
          <PortalTab to="/portal" exact>Dashboard</PortalTab>
          <PortalTab to="/portal/media">Media requests</PortalTab>
          <PortalTab to="/portal/settings">Account</PortalTab>
        </nav>

        {role.isLoading ? (
          <div className="glass-strong rounded-3xl ring-hairline p-10 text-center text-sm text-muted-foreground">
            Verifying clearance…
          </div>
        ) : role.error ? null : isIndex ? (
          <PortalDashboard />
        ) : (
          <Outlet />
        )}
      </section>
    </main>
  );
}

function RoleBanner({
  loading, error, email, isStaff, onRetry,
}: { loading: boolean; error: any; email: string | null; isStaff: boolean; onRetry: () => void }) {
  if (loading) {
    return <div className="mt-2 text-xs text-muted-foreground font-mono">Loading role…</div>;
  }
  if (error) {
    return (
      <div className="mt-3 rounded-2xl border border-red-500/30 bg-red-500/5 px-4 py-3 text-xs">
        <div className="text-red-300 font-mono uppercase tracking-[0.2em]">Role unavailable</div>
        <div className="text-muted-foreground mt-1">
          Your session role could not be loaded. Sign in again if this persists.
        </div>
        <button onClick={onRetry} className="mt-2 rounded-full glass px-3 py-1 text-[10px] uppercase tracking-[0.2em]">
          Retry
        </button>
      </div>
    );
  }
  return (
    <div className="mt-2 text-xs text-muted-foreground">
      Signed in as <span className="text-[color:var(--photonic-cyan)] font-mono">{email || "—"}</span>
      {isStaff && <span className="ml-2 rounded-full bg-[color:var(--photonic-cyan)]/10 px-2 py-0.5 text-[10px] uppercase tracking-[0.2em] text-[color:var(--photonic-cyan)]">Staff</span>}
    </div>
  );
}

function PortalTab({ to, exact, children }: { to: string; exact?: boolean; children: React.ReactNode }) {
  return (
    <Link
      to={to}
      className="rounded-full glass px-4 py-2 text-muted-foreground hover:text-foreground data-[active]:bg-[color:var(--photonic-cyan)]/10 data-[active]:text-[color:var(--photonic-cyan)]"
      activeOptions={{ exact }}
      activeProps={{ "data-active": "" } as any}
    >
      {children}
    </Link>
  );
}

function PortalDashboard() {
  return (
    <div>
      <div className="grid md:grid-cols-3 gap-4 mb-8">
        <Link to="/portal/media" className="glass-strong rounded-2xl ring-hairline p-5 hover:bg-white/[0.03]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tool 01</div>
          <div className="mt-2 font-display text-xl">Media requests</div>
          <div className="text-xs text-muted-foreground mt-1">Ask for cutdowns, raw footage, and assets.</div>
        </Link>
        <Link to="/contact" className="glass-strong rounded-2xl ring-hairline p-5 hover:bg-white/[0.03]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tool 02</div>
          <div className="mt-2 font-display text-xl">New mission brief</div>
          <div className="text-xs text-muted-foreground mt-1">File a flight plan for a new sky.</div>
        </Link>
        <Link to="/portal/settings" className="glass-strong rounded-2xl ring-hairline p-5 hover:bg-white/[0.03]">
          <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tool 03</div>
          <div className="mt-2 font-display text-xl">Account settings</div>
          <div className="text-xs text-muted-foreground mt-1">Contact details & notification email.</div>
        </Link>
      </div>
      <SubmissionsPanel />
    </div>
  );
}

import { listMySubmissions } from "@/lib/client-portal.functions";

function SubmissionsPanel() {
  const fn = useServerFn(listMySubmissions);
  const q = useQuery({ queryKey: ["my-subs"], queryFn: () => fn() });
  return (
    <div className="glass-strong rounded-3xl ring-hairline overflow-hidden">
      <div className="p-5 border-b border-white/10">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
          Your Mission Briefs
        </div>
        <div className="text-xs text-muted-foreground mt-1">
          Every quote or brief you've filed with us.
        </div>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-xs md:text-sm">
          <thead className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
            <tr className="border-b border-white/10">
              <th className="text-left p-3">Filed</th>
              <th className="text-left p-3">Intent</th>
              <th className="text-left p-3 hidden md:table-cell">City</th>
              <th className="text-left p-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {q.isLoading && (
              <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
            )}
            {q.error && (
              <tr><td colSpan={4} className="p-6 text-center text-red-300">Failed to load briefs.</td></tr>
            )}
            {q.data?.length === 0 && (
              <tr>
                <td colSpan={4} className="p-6 text-center text-muted-foreground">
                  No briefs yet.{" "}
                  <Link to="/contact" className="text-[color:var(--photonic-cyan)] underline">
                    File your first one →
                  </Link>
                </td>
              </tr>
            )}
            {q.data?.map((s: any) => (
              <tr key={s.id} className="border-b border-white/5">
                <td className="p-3 font-mono text-[10px] text-muted-foreground">
                  {new Date(s.created_at).toLocaleString()}
                </td>
                <td className="p-3">{s.intent || "—"}</td>
                <td className="p-3 hidden md:table-cell text-muted-foreground">{s.city || "—"}</td>
                <td className="p-3">
                  <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] uppercase tracking-wider">
                    {s.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
