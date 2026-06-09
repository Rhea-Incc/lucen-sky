import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { experiences, getExperience } from "@/data/experiences";

export const Route = createFileRoute("/experiences/$slug")({
  loader: ({ params }) => {
    const exp = getExperience(params.slug);
    if (!exp) throw notFound();
    return exp;
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.title} — Lucen Sky` },
          { name: "description", content: loaderData.summary },
          { property: "og:title", content: `${loaderData.title} — Lucen Sky` },
          { property: "og:description", content: loaderData.summary },
          { property: "og:image", content: loaderData.hero },
        ]
      : [],
  }),
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center text-muted-foreground">
      Experience not found. <Link to="/experiences" className="ml-2 text-[color:var(--photonic-cyan)]">Back to atlas →</Link>
    </main>
  ),
  errorComponent: ({ error }) => (
    <main className="min-h-screen grid place-items-center text-muted-foreground">{String(error)}</main>
  ),
  component: ExperienceDetail,
});

function ExperienceDetail() {
  const exp = Route.useLoaderData();
  const others = experiences.filter((e) => e.slug !== exp.slug).slice(0, 3);

  return (
    <main className="relative">
      <Nav />

      {/* Hero */}
      <section className="relative min-h-[90svh] overflow-hidden">
        <img src={exp.hero} alt={exp.title} className="absolute inset-0 h-full w-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-b from-[color:var(--obsidian)]/40 via-[color:var(--obsidian)]/60 to-[color:var(--obsidian)]" />
        <div className="absolute inset-0">
          <Starfield density={0.6} />
        </div>

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-40 pb-24">
          <Link to="/experiences" className="text-xs tracking-[0.3em] uppercase text-muted-foreground hover:text-foreground">
            ← Atlas
          </Link>
          <div className="mt-8 flex items-center gap-3 text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80">
            <span className="h-px w-10 bg-[color:var(--photonic-cyan)]/60" />
            {exp.eventType} · {exp.year}
          </div>
          <h1 className="mt-6 font-display text-[clamp(2.6rem,8vw,7rem)] leading-[0.95] font-light text-grad">
            {exp.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg text-muted-foreground leading-relaxed">{exp.summary}</p>
        </div>
      </section>

      {/* Stats glass overlay */}
      <section className="relative -mt-20 z-20 mx-auto max-w-7xl px-6">
        <div className="glass-strong rounded-3xl p-6 md:p-10 ring-hairline grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { k: "Location", v: exp.location, sub: exp.coords },
            { k: "Event type", v: exp.eventType },
            { k: "Footfall", v: exp.footfall },
            { k: "Drones", v: exp.drones.toLocaleString() },
            { k: "Duration", v: exp.duration },
            { k: "Client", v: exp.client },
            { k: "Year", v: exp.year },
            { k: "Coordinates", v: exp.coords },
          ].map((s) => (
            <div key={s.k}>
              <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{s.k}</div>
              <div className="mt-2 font-display text-lg text-foreground">{s.v}</div>
              {s.sub && <div className="mt-1 font-mono text-[10px] text-muted-foreground">{s.sub}</div>}
            </div>
          ))}
        </div>
      </section>

      {/* Story + side stats */}
      <section className="relative mx-auto max-w-7xl px-6 py-32 grid lg:grid-cols-12 gap-12">
        <div className="lg:col-span-7 space-y-8">
          <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80">
            Case Study
          </div>
          <h2 className="text-[clamp(1.8rem,3.6vw,3rem)] font-light leading-[1.1] text-grad">
            The story behind the show.
          </h2>
          <div className="space-y-6 text-foreground/80 leading-relaxed text-lg">
            {exp.story.map((p: string, i: number) => (
              <p key={i} className="relative pl-6 border-l border-[color:var(--photonic-cyan)]/30">{p}</p>
            ))}
          </div>
        </div>
        <aside className="lg:col-span-5 space-y-3">
          {exp.stats.map((s: { k: string; v: string }) => (
            <div key={s.k} className="glass rounded-2xl p-5 flex items-baseline justify-between ring-hairline">
              <div className="text-xs tracking-[0.25em] uppercase text-muted-foreground">{s.k}</div>
              <div className="font-mono text-2xl text-[color:var(--photonic-cyan)]">{s.v}</div>
            </div>
          ))}
        </aside>
      </section>

      {/* Asymmetric gallery */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-8">
          From the show
        </div>
        <div className="grid grid-cols-12 auto-rows-[200px] gap-4">
          <div className="col-span-12 md:col-span-8 row-span-2 relative overflow-hidden rounded-3xl ring-hairline">
            <img src={exp.gallery[0]} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="col-span-6 md:col-span-4 row-span-1 relative overflow-hidden rounded-3xl ring-hairline">
            <img src={exp.gallery[1]} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
          <div className="col-span-6 md:col-span-4 row-span-1 relative overflow-hidden rounded-3xl ring-hairline">
            <img src={exp.gallery[2]} alt="" className="absolute inset-0 h-full w-full object-cover" />
          </div>
        </div>
      </section>

      {/* Next experiences */}
      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="flex items-end justify-between mb-8">
          <h3 className="text-2xl font-display font-light text-grad">More commissions</h3>
          <Link to="/experiences" className="text-xs tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
            See all →
          </Link>
        </div>
        <div className="grid md:grid-cols-3 gap-5">
          {others.map((o) => (
            <Link
              key={o.slug}
              to="/experiences/$slug"
              params={{ slug: o.slug }}
              className="group relative aspect-[4/5] overflow-hidden rounded-3xl glass-strong ring-hairline"
            >
              <img src={o.img} alt={o.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--obsidian)] to-transparent" />
              <div className="absolute bottom-0 p-5">
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{o.tag}</div>
                <h4 className="mt-2 text-xl font-display">{o.title}</h4>
                <div className="mt-2 text-xs text-[color:var(--photonic-cyan)]">Explore →</div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
