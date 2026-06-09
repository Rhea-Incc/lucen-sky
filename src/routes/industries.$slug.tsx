import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import { SwarmCanvas } from "@/components/SwarmCanvas";
import { industries, getIndustry, type Industry } from "@/data/industries";

export const Route = createFileRoute("/industries/$slug")({
  loader: ({ params }): Industry => {
    const ind = getIndustry(params.slug);
    if (!ind) throw notFound();
    return ind;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.name} — Lucen Sky` },
          { name: "description", content: loaderData.tagline },
          { property: "og:title", content: `${loaderData.name} — Lucen Sky` },
          { property: "og:description", content: loaderData.tagline },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center text-muted-foreground">
      Industry not found.{" "}
      <Link to="/industries" className="ml-2 text-[color:var(--photonic-cyan)]">
        Back to industries →
      </Link>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen grid place-items-center text-muted-foreground">{String(error)}</main>
  ),
  component: IndustryPage,
});

function IndustryPage() {
  const ind = Route.useLoaderData() as Industry;
  const others = industries.filter((i) => i.slug !== ind.slug).slice(0, 4);

  return (
    <main className="relative min-h-screen overflow-x-hidden">
      <Nav />
      <div className="absolute inset-0 pointer-events-none">
        <Starfield density={0.9} />
      </div>

      {/* HERO — 85vw × 85vh swarm canvas, responsive to orientation */}
      <section className="relative pt-32 pb-24">
        <div className="mx-auto max-w-7xl px-6 mb-8">
          <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
            Industries · {ind.icon} {ind.name}
          </div>
          <h1 className="text-[clamp(2.4rem,6vw,5.4rem)] font-light leading-[0.98] text-grad max-w-4xl">
            {ind.tagline}.
          </h1>
        </div>

        <div
          className="relative mx-auto w-[90vw] h-[80vh] md:w-[85vw] md:h-[85vh]"
        >
          <div className="absolute inset-0 glass-strong rounded-3xl ring-hairline overflow-hidden">
            <SwarmCanvas count={760} secondsPerKey={10} shapes={ind.shapes} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-4 left-4 md:top-5 md:left-5 text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
                SWARM · {ind.name.toUpperCase()}
              </div>
              <div className="absolute top-4 right-4 md:top-5 md:right-5 flex items-center gap-2 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] animate-pulse-glow" />
                LIVE FORMATION
              </div>
              <div className="absolute bottom-4 left-4 right-4 md:bottom-5 md:left-5 md:right-5 flex flex-wrap justify-between gap-3 font-mono text-[9px] md:text-[10px] text-muted-foreground">
                <span>KEYFRAMES · {ind.shapes.length}</span>
                <span>MORPH · 10s LINEAR</span>
                <span>COHERENCE · 0.998</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STATS strip */}
      <section className="relative mx-auto max-w-7xl px-6 -mt-6">
        <div className="grid sm:grid-cols-3 gap-4">
          {ind.metrics.map((m) => (
            <div key={m.k} className="glass-strong rounded-2xl ring-hairline p-6">
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{m.k}</div>
              <div className="mt-2 font-mono text-3xl text-[color:var(--photonic-cyan)]">{m.v}</div>
            </div>
          ))}
        </div>
      </section>

      {/* STORY */}
      <section className="relative mx-auto max-w-3xl px-6 py-28">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
          Field Note
        </div>
        {ind.story.map((p, i) => (
          <p key={i} className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
            {p}
          </p>
        ))}

        <div className="mt-10 glass-strong rounded-3xl ring-hairline p-8 text-center">
          <div className="text-xs tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80 mb-3">
            Pilot Program
          </div>
          <h2 className="text-2xl md:text-3xl font-display font-light text-grad">
            Test {ind.name.toLowerCase()} sky-media for 30 days.
          </h2>
          <Link
            to="/contact"
            className="mt-6 inline-flex items-center gap-3 rounded-full bg-[color:var(--photonic-cyan)] px-7 py-3 text-sm text-[color:var(--primary-foreground)] glow-cyan"
          >
            Start a pilot →
          </Link>
        </div>
      </section>

      {/* OTHER INDUSTRIES */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
          Other Industries
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/industries/$slug"
              params={{ slug: o.slug }}
              className="group glass rounded-2xl ring-hairline p-5 hover:-translate-y-1 transition-transform"
            >
              <div className="text-xl text-[color:var(--photonic-cyan)]">{o.icon}</div>
              <div className="mt-4 font-display text-lg">{o.name}</div>
              <div className="mt-1 text-xs text-muted-foreground">{o.tagline}</div>
              <div className="mt-4 text-xs text-[color:var(--photonic-cyan)]">Explore →</div>
            </Link>
          ))}
        </div>
      </section>
    </main>
  );
}
