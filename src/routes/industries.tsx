import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import { SwarmCanvas } from "@/components/SwarmCanvas";
import { Footer } from "@/components/Footer";
import { industries } from "@/data/industries";

export const Route = createFileRoute("/industries")({
  head: () => ({
    meta: [
      { title: "Industries — Lucen Sky" },
      { name: "description", content: "Atmospheric media for retail, automotive, real estate, telecom, banking, healthcare, airports and universities." },
      { property: "og:title", content: "Industries — Lucen Sky" },
      { property: "og:description", content: "Where the sky moves the metric." },
    ],
  }),
  component: IndustriesPage,
});

function IndustriesPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Nav />
      <div className="absolute inset-0 pointer-events-none">
        <Starfield density={1.0} />
      </div>

      <section className="relative pt-40 pb-12 px-6 mx-auto max-w-7xl">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
          Industries · Where Sky Moves Metric
        </div>
        <h1 className="text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[0.98] text-grad max-w-4xl">
          We Turn Physical Attention<br />Into Measurable Revenue
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
          Lucen builds intelligent environments where light captures attention, data maps behavior, and systems
          convert engagement into sales. Each industry below has its own swarm vocabulary.
        </p>
      </section>

      {/* Atmospheric showcase — 85% viewport canvas cycling all industry signatures */}
      <section className="relative mx-auto" style={{ width: "85vw", height: "85vh" }}>
        <div className="absolute inset-0 glass-strong rounded-3xl ring-hairline overflow-hidden">
          <SwarmCanvas
            count={780}
            secondsPerKey={10}
            shapes={industries.flatMap((i) => [i.shapes[0]])}
          />
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-5 left-5 text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
              SWARM · ALL VERTICALS
            </div>
            <div className="absolute top-5 right-5 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
              <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] animate-pulse-glow" />
              {industries.length} FORMATIONS
            </div>
            <div className="absolute bottom-5 left-5 right-5 flex justify-between font-mono text-[10px] text-muted-foreground">
              <span>MORPH · 10s LINEAR</span>
              <span>NODES · 780</span>
              <span>COHERENCE · 0.998</span>
            </div>
          </div>
        </div>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 py-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((it) => (
            <Link
              key={it.slug}
              to="/industries/$slug"
              params={{ slug: it.slug }}
              className="group relative glass-strong rounded-3xl p-7 ring-hairline overflow-hidden hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[color:var(--photonic-cyan)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl text-[color:var(--photonic-cyan)]">{it.icon}</div>
              <h3 className="mt-6 font-display text-xl font-light">{it.name}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.tagline}</p>
              <div className="mt-8 font-mono text-3xl text-[color:var(--photonic-cyan)]">{it.stat}</div>
              <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{it.statNote}</div>
              <div className="mt-6 text-xs tracking-[0.2em] uppercase text-[color:var(--photonic-cyan)] opacity-0 group-hover:opacity-100 transition-opacity">
                Explore →
              </div>
            </Link>
          ))}
        </div>

        <div className="mt-16 glass-strong rounded-3xl p-10 ring-hairline text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
            Pilot Program
          </div>
          <h2 className="text-3xl md:text-4xl font-display font-light text-grad">
            Test the sky above your venue.
          </h2>
          <p className="mt-4 text-muted-foreground max-w-xl mx-auto">
            We run 30-day measurement pilots with retail, automotive, and real-estate partners. Performance
            data is yours either way.
          </p>
          <Link
            to="/contact"
            className="mt-8 inline-flex items-center gap-3 rounded-full bg-[color:var(--photonic-cyan)] px-7 py-3 text-sm text-[color:var(--primary-foreground)] glow-cyan"
          >
            Start a pilot →
          </Link>
        </div>
      </section>
    </main>
  );
}
