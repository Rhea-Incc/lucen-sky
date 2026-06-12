import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import { SwarmCanvas } from "@/components/SwarmCanvas";
import { Footer } from "@/components/Footer";
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
    <main className="min-h-screen grid place-items-center text-muted-foreground p-6 text-center">
      Industry not found.{" "}
      <Link to="/industries" className="ml-2 text-[color:var(--photonic-cyan)]">
        Back to industries →
      </Link>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen grid place-items-center text-muted-foreground p-6">{String(error)}</main>
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

      {/* HERO */}
      <section className="relative pt-28 md:pt-32 pb-12 md:pb-24">
        <div className="mx-auto max-w-7xl px-4 md:px-6 mb-6 md:mb-8">
          <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-3 md:mb-4">
            Industries · {ind.icon} {ind.name}
          </div>
          <h1 className="text-[clamp(2rem,7vw,5.4rem)] font-light leading-[1.02] text-grad max-w-4xl">
            {ind.tagline}.
          </h1>
        </div>

        {/* 3-phase morph canvas — 80vh mobile / 85vh desktop */}
        <div className="relative mx-auto w-[92vw] h-[80vh] md:w-[85vw] md:h-[85vh]">
          <div className="absolute inset-0 glass-strong rounded-3xl ring-hairline overflow-hidden">
            <SwarmCanvas count={ind.particles ?? 760} secondsPerKey={ind.secondsPerKey ?? 12} shapes={ind.shapes} />
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute top-3 left-3 md:top-5 md:left-5 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80">
                SWARM · {ind.name.toUpperCase()}
              </div>
              <div className="absolute top-3 right-3 md:top-5 md:right-5 flex items-center gap-2 text-[9px] md:text-[10px] tracking-[0.3em] uppercase text-muted-foreground">
                <span className="h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] animate-pulse-glow" />
                LIVE
              </div>
              <div className="absolute bottom-3 left-3 right-3 md:bottom-5 md:left-5 md:right-5 grid grid-cols-3 gap-2 font-mono text-[9px] md:text-[10px] text-muted-foreground">
                {ind.telemetry.map((t, i) => (
                  <span key={i} className="truncate">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* STAT STRIP */}
      <section className="relative mx-auto max-w-7xl px-4 md:px-6 py-10 md:py-16 grid grid-cols-3 gap-3 md:gap-6">
        {ind.metrics.map((m) => (
          <div key={m.k} className="glass-strong rounded-2xl ring-hairline p-4 md:p-6 text-center">
            <div className="text-2xl md:text-4xl font-display font-light text-grad">{m.v}</div>
            <div className="mt-1 text-[9px] md:text-[10px] tracking-[0.25em] uppercase text-muted-foreground">{m.k}</div>
          </div>
        ))}
      </section>

      {/* INFOGRAPHIC */}
      <section className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-20">
        <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
          Sector Telemetry
        </div>
        <h2 className="font-display text-2xl md:text-4xl font-light text-grad max-w-3xl mb-8 md:mb-10">
          What atmospheric media moves in {ind.name.toLowerCase()}.
        </h2>
        <div className="glass-strong rounded-3xl ring-hairline p-5 md:p-10 space-y-5 md:space-y-6">
          {ind.infographic.map((b) => (
            <div key={b.label}>
              <div className="flex items-baseline justify-between mb-2">
                <span className="text-xs md:text-sm text-muted-foreground">{b.label}</span>
                <span className="font-mono text-base md:text-xl text-[color:var(--photonic-cyan)]">
                  {b.value}
                  {b.suffix ?? ""}
                </span>
              </div>
              <div className="h-1.5 md:h-2 w-full bg-white/5 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-[color:var(--photonic-cyan)] to-[color:var(--photonic-cyan)]/40 glow-cyan transition-[width] duration-1000"
                  style={{ width: `${Math.min(100, b.value)}%` }}
                />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* TAILORING + INSIGHTS */}
      <section className="relative mx-auto max-w-7xl px-4 md:px-6 py-12 md:py-16 grid md:grid-cols-2 gap-5 md:gap-6">
        <div className="glass-strong rounded-3xl ring-hairline p-6 md:p-8">
          <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
            Industry Tailoring
          </div>
          <h3 className="font-display text-xl md:text-2xl text-grad mb-5 font-light">
            How Sky-OS configures for {ind.name.toLowerCase()}.
          </h3>
          <ul className="space-y-3">
            {ind.tailoring.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] flex-none" />
                {t}
              </li>
            ))}
          </ul>
        </div>
        <div className="glass-strong rounded-3xl ring-hairline p-6 md:p-8">
          <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
            Field Insights
          </div>
          <h3 className="font-display text-xl md:text-2xl text-grad mb-5 font-light">
            What we've learned in flight.
          </h3>
          <ul className="space-y-3">
            {ind.insights.map((t, i) => (
              <li key={i} className="flex gap-3 text-sm text-muted-foreground leading-relaxed">
                <span className="mt-1 h-1.5 w-1.5 rounded-full bg-[color:var(--photonic-cyan)] flex-none" />
                {t}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* STORY */}
      <section className="relative mx-auto max-w-3xl px-4 md:px-6 py-12 md:py-20">
        {ind.story.map((p, i) => (
          <p key={i} className="text-base md:text-xl text-muted-foreground leading-relaxed mb-5 md:mb-6">
            {p}
          </p>
        ))}

        <div className="mt-8 md:mt-10 glass-strong rounded-3xl ring-hairline p-6 md:p-8 text-center">
          <div className="text-[10px] md:text-xs tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]/80 mb-3">
            Pilot Program
          </div>
          <h2 className="text-xl md:text-3xl font-display font-light text-grad">
            Test {ind.name.toLowerCase()} sky-media for 30 days.
          </h2>
          <Link
            to="/contact"
            className="mt-5 md:mt-6 inline-flex items-center gap-3 rounded-full bg-[color:var(--photonic-cyan)] px-6 md:px-7 py-3 text-sm text-[color:var(--primary-foreground)] glow-cyan"
          >
            Start a pilot →
          </Link>
        </div>
      </section>

      {/* OTHER INDUSTRIES */}
      <section className="relative mx-auto max-w-7xl px-4 md:px-6 pb-24 md:pb-32">
        <div className="text-[10px] md:text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4 md:mb-6">
          Other Industries
        </div>
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 md:gap-4">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/industries/$slug"
              params={{ slug: o.slug }}
              className="group glass rounded-2xl ring-hairline p-4 md:p-5 hover:-translate-y-1 transition-transform"
            >
              <div className="text-lg md:text-xl text-[color:var(--photonic-cyan)]">{o.icon}</div>
              <div className="mt-3 md:mt-4 font-display text-base md:text-lg">{o.name}</div>
              <div className="mt-1 text-[11px] md:text-xs text-muted-foreground">{o.tagline}</div>
              <div className="mt-3 md:mt-4 text-[11px] md:text-xs text-[color:var(--photonic-cyan)]">Explore →</div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
