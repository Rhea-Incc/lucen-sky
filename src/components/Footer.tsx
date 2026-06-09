import { Link } from "@tanstack/react-router";
import logoAsset from "@/assets/logo-lucen.png.asset.json";
import mediaA from "@/assets/media-cloud-swarm.jpg.asset.json";
import mediaB from "@/assets/media-cairo.png.asset.json";
import mediaC from "@/assets/media-fireworks.jpg.asset.json";
import mediaD from "@/assets/media-johnny-walker.jpg.asset.json";
import mediaE from "@/assets/media-redbull.png.asset.json";
import mediaF from "@/assets/media-disney.png.asset.json";

const strip = [mediaA, mediaB, mediaC, mediaD, mediaE, mediaF];

export function Footer() {
  return (
    <footer className="relative mt-32 border-t border-white/5">
      {/* media strip */}
      <div className="grid grid-cols-3 md:grid-cols-6 gap-px bg-white/5">
        {strip.map((m, i) => (
          <div key={i} className="relative aspect-[4/3] overflow-hidden bg-[color:var(--obsidian)] group">
            <img
              src={m.url}
              alt=""
              loading="lazy"
              className="absolute inset-0 h-full w-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-110 transition-all duration-[1400ms]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--obsidian)] via-[color:var(--obsidian)]/30 to-transparent" />
          </div>
        ))}
      </div>

      <div className="relative">
        <div className="absolute inset-0 grid-lines opacity-10 pointer-events-none" />
        <div className="relative mx-auto max-w-7xl px-6 py-16 grid md:grid-cols-12 gap-10">
          <div className="md:col-span-5">
            <Link to="/" className="flex items-center gap-3">
              <img src={logoAsset.url} alt="Lucen Sky" className="h-6 w-auto invert opacity-90" />
            </Link>
            <p className="mt-5 text-sm text-muted-foreground leading-relaxed max-w-sm">
              An operating system for autonomous, coordinated drone systems —
              and the studio behind the world's most ambitious manual sky shows
              for events, brands and civic moments.
            </p>
            <div className="mt-6 flex items-center gap-2 text-[10px] font-mono tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] animate-pulse-glow" />
              Sky-OS · operational
            </div>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Platform</div>
            <ul className="space-y-2.5 text-sm">
              <li><Link to="/services" className="hover:text-foreground text-muted-foreground">Services</Link></li>
              <li><Link to="/industries" className="hover:text-foreground text-muted-foreground">Industries</Link></li>
              <li><Link to="/experiences" className="hover:text-foreground text-muted-foreground">Experiences</Link></li>
              <li><Link to="/insights" className="hover:text-foreground text-muted-foreground">Insights</Link></li>
            </ul>
          </div>

          <div className="md:col-span-2">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Capabilities</div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li>Autonomous swarms</li>
              <li>Manual light shows</li>
              <li>Hybrid pyro · swarm</li>
              <li>Sky-OS telemetry</li>
            </ul>
          </div>

          <div className="md:col-span-3">
            <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground mb-4">Commission</div>
            <p className="text-sm text-muted-foreground">
              Brief our studio. We respond within 48 hours with a pilot proposal.
            </p>
            <Link
              to="/contact"
              className="mt-4 inline-flex items-center gap-2 rounded-full border border-[color:var(--photonic-cyan)]/40 text-[color:var(--photonic-cyan)] px-4 py-2 text-xs tracking-[0.18em] uppercase hover:bg-[color:var(--photonic-cyan)]/10 transition-colors"
            >
              Start a project →
            </Link>
          </div>
        </div>

        <div className="relative mx-auto max-w-7xl px-6 pb-10 flex flex-wrap items-center justify-between gap-4 text-[10px] font-mono tracking-[0.25em] uppercase text-muted-foreground/60">
          <span>© Lucen Sky · Atmospheric Media Platform</span>
          <span>LAT 25.276 · LON 55.296 · ALT 120m</span>
          <span>v1.0 · Operational</span>
        </div>
      </div>
    </footer>
  );
}
