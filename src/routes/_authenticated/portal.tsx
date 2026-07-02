import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/Nav";
import { supabase } from "@/integrations/supabase/client";
import { getMyRole, listMySubmissions } from "@/lib/client-portal.functions";

export const Route = createFileRoute("/_authenticated/portal")({
  head: () => ({
    meta: [
      { title: "Client Portal — Lucen Sky" },
      { name: "robots", content: "noindex" },
    ],
  }),
  component: PortalPage,
});

function PortalPage() {
  const navigate = useNavigate();
  const qc = useQueryClient();
  const roleFn = useServerFn(getMyRole);
  const subsFn = useServerFn(listMySubmissions);

  const role = useQuery({ queryKey: ["my-role"], queryFn: () => roleFn() });
  const subs = useQuery({ queryKey: ["my-subs"], queryFn: () => subsFn() });

  const isStaff = (role.data?.roles ?? []).some((r) => r === "admin" || r === "editor");

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
          </div>
          <div className="flex gap-2">
            {isStaff && (
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

        <div className="grid md:grid-cols-3 gap-4 mb-8">
          <Link to="/contact" className="glass-strong rounded-2xl ring-hairline p-5 hover:bg-white/[0.03]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tool 01</div>
            <div className="mt-2 font-display text-xl">New mission brief</div>
            <div className="text-xs text-muted-foreground mt-1">File a flight plan for a new sky.</div>
          </Link>
          <Link to="/experiences" className="glass-strong rounded-2xl ring-hairline p-5 hover:bg-white/[0.03]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tool 02</div>
            <div className="mt-2 font-display text-xl">Case reference library</div>
            <div className="text-xs text-muted-foreground mt-1">Draw inspiration from past sorties.</div>
          </Link>
          <Link to="/services" className="glass-strong rounded-2xl ring-hairline p-5 hover:bg-white/[0.03]">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">Tool 03</div>
            <div className="mt-2 font-display text-xl">Service catalog</div>
            <div className="text-xs text-muted-foreground mt-1">Review disciplines & production tiers.</div>
          </Link>
        </div>

        <div className="glass-strong rounded-3xl ring-hairline overflow-hidden">
          <div className="p-5 border-b border-white/10 flex items-center justify-between">
            <div>
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
                Your Mission Briefs
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                Every quote or brief you've filed with us.
              </div>
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
                {subs.isLoading && (
                  <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
                )}
                {subs.data?.length === 0 && (
                  <tr>
                    <td colSpan={4} className="p-6 text-center text-muted-foreground">
                      No briefs yet.{" "}
                      <Link to="/contact" className="text-[color:var(--photonic-cyan)] underline">
                        File your first one →
                      </Link>
                    </td>
                  </tr>
                )}
                {subs.data?.map((s: any) => (
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
      </section>
    </main>
  );
}
