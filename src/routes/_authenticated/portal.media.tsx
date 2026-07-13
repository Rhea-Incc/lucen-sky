import { createFileRoute } from "@tanstack/react-router";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { useState } from "react";
import { listMyMediaRequests, createMediaRequest } from "@/lib/client-portal.functions";

export const Route = createFileRoute("/_authenticated/portal/media")({
  head: () => ({ meta: [{ title: "Media Requests — Lucen Sky" }, { name: "robots", content: "noindex" }] }),
  component: MediaRequestsPage,
});

const KINDS = ["asset", "video", "photo", "raw_footage", "cutdown", "other"] as const;

function MediaRequestsPage() {
  const qc = useQueryClient();
  const listFn = useServerFn(listMyMediaRequests);
  const createFn = useServerFn(createMediaRequest);

  const list = useQuery({ queryKey: ["my-media-requests"], queryFn: () => listFn() });
  const create = useMutation({
    mutationFn: (v: any) => createFn({ data: v }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["my-media-requests"] }),
  });

  const [form, setForm] = useState({ title: "", description: "", kind: "asset" as (typeof KINDS)[number], requested_delivery: "" });

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    create.mutate(form, {
      onSuccess: () => setForm({ title: "", description: "", kind: "asset", requested_delivery: "" }),
    });
  };

  return (
    <div className="grid lg:grid-cols-5 gap-6">
      <form onSubmit={submit} className="lg:col-span-2 glass-strong rounded-3xl ring-hairline p-6 space-y-3">
        <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
          File a request
        </div>
        <input
          required
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          placeholder="Title (e.g. 30s vertical cutdown)"
          className="w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50"
        />
        <select
          value={form.kind}
          onChange={(e) => setForm({ ...form, kind: e.target.value as any })}
          className="w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50"
        >
          {KINDS.map((k) => (
            <option key={k} value={k} className="bg-[color:var(--obsidian)]">{k.replace("_", " ")}</option>
          ))}
        </select>
        <input
          type="date"
          value={form.requested_delivery}
          onChange={(e) => setForm({ ...form, requested_delivery: e.target.value })}
          className="w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50 text-muted-foreground"
        />
        <textarea
          value={form.description}
          onChange={(e) => setForm({ ...form, description: e.target.value })}
          rows={5}
          placeholder="Deliverable notes — aspect ratio, audio, brand cues…"
          className="w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50 resize-none"
        />
        {create.isError && (
          <div className="text-xs text-red-300">{(create.error as any)?.message ?? "Failed to file request."}</div>
        )}
        <button
          type="submit"
          disabled={create.isPending}
          className="rounded-full bg-[color:var(--photonic-cyan)] px-6 py-3 text-xs text-[color:var(--primary-foreground)] glow-cyan disabled:opacity-60"
        >
          {create.isPending ? "Filing…" : "Submit request →"}
        </button>
      </form>

      <div className="lg:col-span-3 glass-strong rounded-3xl ring-hairline overflow-hidden">
        <div className="p-5 border-b border-white/10">
          <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
            Your media requests
          </div>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-xs md:text-sm">
            <thead className="text-[10px] tracking-[0.2em] uppercase text-muted-foreground">
              <tr className="border-b border-white/10">
                <th className="text-left p-3">Filed</th>
                <th className="text-left p-3">Title</th>
                <th className="text-left p-3">Kind</th>
                <th className="text-left p-3">Status</th>
              </tr>
            </thead>
            <tbody>
              {list.isLoading && (
                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">Loading…</td></tr>
              )}
              {list.error && (
                <tr><td colSpan={4} className="p-6 text-center text-red-300">Failed to load requests.</td></tr>
              )}
              {list.data?.length === 0 && (
                <tr><td colSpan={4} className="p-6 text-center text-muted-foreground">No requests yet.</td></tr>
              )}
              {list.data?.map((r: any) => (
                <tr key={r.id} className="border-b border-white/5">
                  <td className="p-3 font-mono text-[10px] text-muted-foreground">
                    {new Date(r.created_at).toLocaleDateString()}
                  </td>
                  <td className="p-3">{r.title}</td>
                  <td className="p-3 text-muted-foreground">{r.kind}</td>
                  <td className="p-3">
                    <span className="px-2 py-0.5 rounded-full bg-white/5 text-[10px] uppercase tracking-wider">
                      {r.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
