import videoAsset from "@/assets/hero-drones.mp4.asset.json";
import ambientAsset from "@/assets/ambient-skyline.mp4.asset.json";
import { Starfield } from "./Starfield";

export function Hero() {
  return (
    <section className="relative min-h-[100svh] w-full overflow-hidden">
      {/* Layered video backgrounds */}
      <video
        src={videoAsset.url}
        autoPlay muted loop playsInline
        className="absolute inset-0 h-full w-full object-cover opacity-50"
      />
      <video
        src={ambientAsset.url}
        autoPlay muted loop playsInline
        className="absolute inset-0 h-full w-full object-cover mix-blend-screen opacity-30"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--obsidian)]/70 via-[color:var(--obsidian)]/40 to-[color:var(--obsidian)]" />
      <div className="absolute inset-0">
        <Starfield density={1.4} />
      </div>

      {/* Orbits */}
      <div className="pointer-events-none absolute -right-40 top-1/4 h-[800px] w-[800px] rounded-full border border-white/5 animate-orbit">
        <div className="absolute -top-1.5 left-1/2 h-3 w-3 -translate-x-1/2 rounded-full bg-[color:var(--photonic-cyan)] glow-cyan" />
      </div>
      <div className="pointer-events-none absolute -left-60 bottom-10 h-[600px] w-[600px] rounded-full border border-white/5 animate-orbit" style={{ animationDirection: "reverse", animationDuration: "60s" }}>
        <div className="absolute top-1/2 -right-1.5 h-2 w-2 -translate-y-1/2 rounded-full bg-[color:var(--aurora-violet)] glow-violet" />
      </div>

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-7xl flex-col px-6 pt-32 pb-16">
        <div className="flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80">
          <span className="h-px w-10 bg-[color:var(--photonic-cyan)]/60" />
          Lucen Sky · Atmospheric Media
        </div>

        <div className="max-w-4xl mt-auto">
          <h1 className="font-display text-[clamp(2.6rem,7vw,6.4rem)] leading-[0.95] font-light text-grad">
            The sky is becoming<br />
            <span className="italic font-extralight">a new medium.</span>
          </h1>
          <p className="mt-8 max-w-xl text-base md:text-lg text-muted-foreground leading-relaxed">
            We orchestrate thousands of autonomous lights into living formations —
            transforming the atmosphere above your audience into a programmable,
            measurable canvas.
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#experience"
              className="group relative rounded-full bg-[color:var(--photonic-cyan)] px-7 py-3 text-sm font-medium text-[color:var(--primary-foreground)] transition-transform hover:scale-[1.02] glow-cyan"
            >
              Enter the Sky
            </a>
            <a
              href="#gallery"
              className="rounded-full glass px-7 py-3 text-sm text-foreground/90 hover:text-foreground transition-colors"
            >
              View formations
            </a>
          </div>
        </div>

        {/* Spacer pushes HUD to bottom with breathing room */}
        <div className="mt-24 md:mt-32 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
          {[
            { k: "Drones in fleet", v: "12,400" },
            { k: "Active sky-cells", v: "38" },
            { k: "Max formation", v: "4,096 pts" },
            { k: "Uptime", v: "99.992%" },
          ].map((s) => (
            <div key={s.k} className="glass rounded-2xl px-5 py-4">
              <div className="text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{s.k}</div>
              <div className="mt-1 font-mono text-xl text-[color:var(--photonic-cyan)]">{s.v}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
