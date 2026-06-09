import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import { experiences } from "@/data/experiences";

export const Route = createFileRoute("/experiences")({
  head: () => ({
    meta: [
      { title: "Experiences — Lucen Sky Atmospheric Media" },
      { name: "description", content: "Every Lucen Sky commission: from Disney castle reveals to interactive Tetris boards across global skylines." },
      { property: "og:title", content: "Experiences — Lucen Sky" },
      { property: "og:description", content: "A catalogue of the most ambitious atmospheric media performances ever flown." },
    ],
  }),
  component: ExperiencesPage,
});

function ExperiencesPage() {
  return (
    <main className="relative min-h-screen">
      <Nav />
      <div className="absolute inset-0 pointer-events-none">
        <Starfield density={1.0} />
      </div>

      <section className="relative pt-40 pb-20 px-6 mx-auto max-w-7xl">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
          Atlas · All Commissions
        </div>
        <h1 className="text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[0.98] text-grad max-w-4xl">
          Every sky we've<br />ever programmed.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
          {experiences.length} commissions across {new Set(experiences.map(e => e.location.split(",").pop()?.trim())).size} countries.
          Each one a singular moment, engineered with sub-centimeter precision.
        </p>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5">
          {experiences.map((it, i) => (
            <Link
              key={it.slug}
              to="/experiences/$slug"
              params={{ slug: it.slug }}
              className="group relative aspect-[3/4] overflow-hidden rounded-3xl glass-strong ring-hairline"
            >
              <img
                src={it.img}
                alt={it.title}
                loading="lazy"
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--obsidian)] via-[color:var(--obsidian)]/30 to-transparent" />

              <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
                  {String(i + 1).padStart(2, "0")} · {it.year}
                </span>
                <span className="glass rounded-full px-3 py-1 font-mono text-[10px]">
                  {it.drones.toLocaleString()} drones
                </span>
              </div>

              <div className="absolute bottom-0 inset-x-0 p-6">
                <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{it.tag}</div>
                <h3 className="mt-2 text-2xl font-display font-light">{it.title}</h3>
                <p className="mt-2 text-xs text-foreground/60 line-clamp-2">{it.summary}</p>
                <div className="mt-3 flex items-center gap-2 text-xs text-[color:var(--photonic-cyan)]">
                  Explore
                  <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>
      <Footer />
    </main>
  );
}
