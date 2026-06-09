import { useEffect, useRef, useState } from "react";

type LogEntry = { t: string; msg: string; tone: "info" | "ok" | "warn" | "cue" };

const LOG_POOL: Omit<LogEntry, "t">[] = [
  { msg: "formation A → B  ok", tone: "ok" },
  { msg: "drift correction Δ 0.04m", tone: "info" },
  { msg: "cluster-7 link 5GHz stable", tone: "info" },
  { msg: "light cue #014  start", tone: "cue" },
  { msg: "battery 76% nominal", tone: "ok" },
  { msg: "wind shear -2°  stable", tone: "info" },
  { msg: "formation B → C  ok", tone: "ok" },
  { msg: "vertex 412 reassigned", tone: "info" },
  { msg: "swarm coherence 0.998", tone: "ok" },
  { msg: "light cue #015  start", tone: "cue" },
  { msg: "payload sync 1.2 MB", tone: "info" },
  { msg: "attention map +3.4%", tone: "info" },
  { msg: "gps lock 14 sats", tone: "ok" },
  { msg: "thermals nominal 42°C", tone: "info" },
  { msg: "geofence breach Δ 0.3m", tone: "warn" },
  { msg: "uplink latency 22ms", tone: "info" },
  { msg: "rotor health 99.1%", tone: "ok" },
  { msg: "light cue #016  start", tone: "cue" },
  { msg: "frame 4128 rendered", tone: "info" },
  { msg: "mesh handoff cluster-3", tone: "info" },
  { msg: "wind gust +1.4 m/s", tone: "warn" },
  { msg: "showtime sync ±2ms", tone: "ok" },
];

const fmt = (d: Date) =>
  `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}:${String(d.getSeconds()).padStart(2, "0")}`;

function Sparkline({ color, seed = 0 }: { color: string; seed?: number }) {
  const [pts, setPts] = useState<number[]>(() =>
    Array.from({ length: 28 }, (_, i) => 0.5 + Math.sin((i + seed) * 0.6) * 0.25)
  );
  useEffect(() => {
    const id = setInterval(() => {
      setPts((p) => {
        const next = p.slice(1);
        const last = next[next.length - 1] ?? 0.5;
        const v = Math.max(0.05, Math.min(0.95, last + (Math.random() - 0.5) * 0.22));
        next.push(v);
        return next;
      });
    }, 700);
    return () => clearInterval(id);
  }, []);
  const path = pts
    .map((v, i) => `${i === 0 ? "M" : "L"} ${(i / (pts.length - 1)) * 100} ${100 - v * 100}`)
    .join(" ");
  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-8">
      <path d={path} fill="none" stroke={color} strokeWidth="1.5" vectorEffect="non-scaling-stroke" />
      <path d={`${path} L 100 100 L 0 100 Z`} fill={color} opacity="0.12" />
    </svg>
  );
}

export function SkyOS() {
  // Start empty on SSR to avoid hydration mismatch; populate client-side.
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const logRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Seed initial logs on mount (client only)
    setLogs(
      LOG_POOL.slice(0, 12).map((l, i) => ({
        ...l,
        t: fmt(new Date(Date.now() - (12 - i) * 1500)),
      }))
    );
    const id = setInterval(() => {
      setLogs((prev) => {
        const next = [
          ...prev,
          { ...LOG_POOL[Math.floor(Math.random() * LOG_POOL.length)], t: fmt(new Date()) },
        ];
        return next.slice(-60);
      });
    }, 900);
    return () => clearInterval(id);
  }, []);

  useEffect(() => {
    if (logRef.current) logRef.current.scrollTop = logRef.current.scrollHeight;
  }, [logs]);

  const toneColor: Record<LogEntry["tone"], string> = {
    info: "text-muted-foreground",
    ok: "text-[color:var(--photonic-cyan)]",
    warn: "text-[color:var(--aurora-violet)]",
    cue: "text-[color:var(--holographic-white)]",
  };

  return (
    <section id="sky-os" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-20" />
      <div className="mx-auto max-w-7xl px-6">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
            Sky OS · 04
          </div>
          <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.05] text-grad">
            Mission control for the<br />programmable atmosphere.
          </h2>
        </div>

        <div className="glass-strong rounded-3xl p-4 md:p-6 ring-hairline">
          <div className="grid lg:grid-cols-12 gap-4">
            {/* Left: telemetry */}
            <div className="lg:col-span-3 space-y-3">
              {[
                { k: "Fleet Health", v: "98.4%", c: "var(--photonic-cyan)" },
                { k: "Wind", v: "6.2 m/s", c: "var(--aurora-violet)" },
                { k: "Show Time", v: "12:42", c: "var(--photonic-cyan)" },
                { k: "Battery Avg", v: "76%", c: "var(--photonic-cyan)" },
              ].map((m) => (
                <div key={m.k} className="glass rounded-xl p-4">
                  <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{m.k}</div>
                  <div className="font-mono text-lg mt-1" style={{ color: `oklch(0.86 0.16 220)` }}>
                    {m.v}
                  </div>
                  <div className="mt-2 h-1 rounded-full bg-white/5 overflow-hidden">
                    <div className="h-full w-2/3" style={{ background: `linear-gradient(90deg, ${m.c}, transparent)` }} />
                  </div>
                </div>
              ))}
            </div>

            {/* Center: radar/viewport */}
            <div className="lg:col-span-6 relative aspect-square rounded-2xl overflow-hidden bg-[color:var(--deep-space)] ring-hairline">
              {[0.95, 0.7, 0.45, 0.22].map((s) => (
                <div
                  key={s}
                  className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full border border-[color:var(--photonic-cyan)]/15"
                  style={{ width: `${s * 100}%`, height: `${s * 100}%` }}
                />
              ))}
              <div className="absolute inset-0">
                <div className="absolute top-1/2 inset-x-0 h-px bg-[color:var(--photonic-cyan)]/15" />
                <div className="absolute left-1/2 inset-y-0 w-px bg-[color:var(--photonic-cyan)]/15" />
              </div>
              <div className="absolute top-1/2 left-1/2 h-1/2 w-1/2 origin-top-left animate-orbit"
                   style={{ background: "conic-gradient(from 0deg, transparent 0deg, oklch(0.86 0.16 220 / 0.25) 30deg, transparent 60deg)" }} />
              {Array.from({ length: 60 }).map((_, i) => {
                const a = (i / 60) * Math.PI * 2 + i * 0.7;
                const r = 8 + (i % 8) * 5;
                const x = 50 + Math.cos(a) * r;
                const y = 50 + Math.sin(a) * r * 0.95;
                const violet = i % 7 === 0;
                return (
                  <span
                    key={i}
                    className="absolute h-1 w-1 rounded-full animate-pulse-glow"
                    style={{
                      left: `${x}%`, top: `${y}%`,
                      background: violet ? "oklch(0.66 0.22 290)" : "oklch(0.86 0.16 220)",
                      boxShadow: `0 0 8px ${violet ? "oklch(0.66 0.22 290)" : "oklch(0.86 0.16 220)"}`,
                      animationDelay: `${(i % 9) * 0.2}s`,
                    }}
                  />
                );
              })}
              <div className="absolute top-4 left-4 font-mono text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
                SKY-OS / RADAR
              </div>
              <div className="absolute bottom-4 right-4 font-mono text-[10px] text-muted-foreground">
                SECTOR-A · 1.2 km²
              </div>
            </div>

            {/* Right: telemetry stream */}
            <div className="lg:col-span-3 space-y-3">
              <div className="glass rounded-2xl p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
                    // telemetry stream
                  </span>
                  <span className="flex items-center gap-1.5 text-[10px] font-mono text-muted-foreground">
                    <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] animate-pulse-glow" />
                    LIVE
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 mb-3">
                  <div>
                    <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">Throughput</div>
                    <Sparkline color="oklch(0.86 0.16 220)" seed={1} />
                  </div>
                  <div>
                    <div className="text-[9px] tracking-[0.25em] uppercase text-muted-foreground">Coherence</div>
                    <Sparkline color="oklch(0.66 0.22 290)" seed={5} />
                  </div>
                </div>

                <div
                  ref={logRef}
                  className="font-mono text-[10.5px] leading-relaxed space-y-1 max-h-[260px] overflow-hidden mask-fade-t"
                >
                  {logs.map((l, i) => (
                    <div key={i} className="flex gap-2 animate-[fade-in_.35s_ease_forwards]">
                      <span className="text-muted-foreground/60 shrink-0">{l.t}</span>
                      <span className={toneColor[l.tone]}>{l.msg}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="glass rounded-2xl p-4 space-y-2.5">
                <div className="text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)] mb-1">
                  // signal
                </div>
                {[
                  { k: "Uplink", v: "22 ms", w: "92%" },
                  { k: "Mesh", v: "5.2 GHz", w: "78%" },
                  { k: "GPS Sats", v: "14", w: "88%" },
                  { k: "Packet Loss", v: "0.02%", w: "12%" },
                ].map((m) => (
                  <div key={m.k} className="space-y-1">
                    <div className="flex items-center justify-between text-[10px] font-mono">
                      <span className="text-muted-foreground tracking-wider uppercase">{m.k}</span>
                      <span className="text-[color:var(--photonic-cyan)]">{m.v}</span>
                    </div>
                    <div className="h-0.5 rounded-full bg-white/5 overflow-hidden">
                      <div
                        className="h-full"
                        style={{
                          width: m.w,
                          background: "linear-gradient(90deg, var(--photonic-cyan), var(--aurora-violet))",
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
