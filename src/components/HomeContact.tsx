import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { useMutation } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { submitContact } from "@/lib/contact.functions";

const SCALES = [
  { id: "recon", label: "Recon", drones: "≤ 250", price: "from $28k" },
  { id: "signature", label: "Signature", drones: "500 – 1,200", price: "from $85k" },
  { id: "flagship", label: "Flagship", drones: "1,500 – 3,000", price: "from $220k" },
  { id: "spectacle", label: "Spectacle", drones: "4,000+", price: "on request" },
] as const;

export function HomeContact() {
  const [scale, setScale] = useState<(typeof SCALES)[number]["id"]>("signature");
  const submitFn = useServerFn(submitContact);
  const mut = useMutation({ mutationFn: (v: any) => submitFn({ data: v }) });

  const chosen = SCALES.find((s) => s.id === scale)!;

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    mut.mutate({
      name: String(fd.get("name") || ""),
      company: String(fd.get("company") || ""),
      email: String(fd.get("email") || ""),
      phone: String(fd.get("phone") || ""),
      city: String(fd.get("city") || ""),
      event_date: String(fd.get("date") || ""),
      intent: `Quote · ${chosen.label} (${chosen.drones})`,
      callback: false,
      message: String(fd.get("message") || ""),
    });
  };

  return (
    <section id="quote" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-4 md:px-6 grid lg:grid-cols-12 gap-8 items-start">
        <div className="lg:col-span-5">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
            Quotation · Instant Estimate
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.02] text-grad">
            Price the sky<br />you're imagining.
          </h2>
          <p className="mt-6 text-sm md:text-base text-muted-foreground max-w-md leading-relaxed">
            Pick a program scale, drop a brief, and a producer will return a
            costed flight plan within 12 hours — with permits, choreography and
            capture bundled in.
          </p>

          <div className="mt-8 grid grid-cols-2 gap-2">
            {SCALES.map((s) => (
              <button
                key={s.id}
                onClick={() => setScale(s.id)}
                className={`text-left rounded-2xl p-4 ring-hairline transition-colors ${
                  scale === s.id
                    ? "bg-[color:var(--photonic-cyan)]/10 border border-[color:var(--photonic-cyan)]/40"
                    : "glass hover:bg-white/[0.03]"
                }`}
              >
                <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">
                  {s.label}
                </div>
                <div className="mt-1 font-mono text-sm text-foreground">{s.drones}</div>
                <div className="font-mono text-[11px] text-[color:var(--photonic-cyan)] mt-0.5">
                  {s.price}
                </div>
              </button>
            ))}
          </div>

          <div className="mt-8 flex flex-wrap gap-3 text-xs">
            <Link
              to="/auth"
              className="rounded-full glass px-4 py-2 tracking-[0.18em] uppercase hover:text-foreground text-muted-foreground"
            >
              Client sign in →
            </Link>
            <Link
              to="/auth"
              search={{ mode: "signup" } as any}
              className="rounded-full border border-[color:var(--photonic-cyan)]/40 text-[color:var(--photonic-cyan)] px-4 py-2 tracking-[0.18em] uppercase hover:bg-[color:var(--photonic-cyan)]/10"
            >
              Open client account
            </Link>
            <Link
              to="/admin"
              className="rounded-full glass px-4 py-2 tracking-[0.18em] uppercase text-muted-foreground/70 hover:text-foreground"
            >
              Ops console
            </Link>
          </div>
        </div>

        <div className="lg:col-span-7">
          <div className="glass-strong rounded-3xl ring-hairline p-5 md:p-8">
            <div className="flex items-center justify-between">
              <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
                Mission Brief
              </div>
              <div className="font-mono text-[10px] text-muted-foreground">
                {chosen.label.toUpperCase()} · {chosen.drones}
              </div>
            </div>

            {mut.isSuccess ? (
              <div className="mt-6 py-10 text-center">
                <div className="font-mono text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80 mb-2">
                  ACK · 200 · CLEARANCE RECEIVED
                </div>
                <div className="text-2xl font-display text-grad font-light">
                  Estimate incoming in 12h.
                </div>
                <div className="mt-3 text-sm text-muted-foreground">
                  Meanwhile,{" "}
                  <Link to="/auth" className="text-[color:var(--photonic-cyan)] underline">
                    open a client account
                  </Link>{" "}
                  to track it.
                </div>
              </div>
            ) : (
              <form onSubmit={onSubmit} className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-3">
                <input required name="name" placeholder="Your name" className="glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50" />
                <input name="company" placeholder="Company / Brand" className="glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50" />
                <input required type="email" name="email" placeholder="Email" className="glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50" />
                <input name="phone" inputMode="tel" placeholder="Phone (optional)" className="glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50" />
                <input name="city" placeholder="City / Airspace" className="glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50" />
                <input name="date" type="date" className="glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50 text-muted-foreground" />
                <textarea
                  name="message"
                  rows={4}
                  placeholder="What moment should the sky hold? Venue, audience, anchor beat…"
                  className="md:col-span-2 glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50 resize-none"
                />
                {mut.isError && (
                  <div className="md:col-span-2 text-xs text-red-400">
                    {(mut.error as any)?.message ?? "Submission failed. Try again."}
                  </div>
                )}
                <div className="md:col-span-2 flex items-center justify-between gap-3 pt-1">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground/70">
                    Estimate · {chosen.price}
                  </div>
                  <button
                    type="submit"
                    disabled={mut.isPending}
                    className="rounded-full bg-[color:var(--photonic-cyan)] px-6 py-3 text-xs md:text-sm text-[color:var(--primary-foreground)] glow-cyan hover:scale-[1.02] transition-transform disabled:opacity-60"
                  >
                    {mut.isPending ? "Filing…" : "Request quote →"}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
