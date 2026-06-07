import { Link } from "@tanstack/react-router";
import { experiences } from "@/data/experiences";

export function Gallery() {
  const items = experiences.slice(0, 5);
  return (
    <section id="gallery" className="relative py-32 overflow-hidden">
      <div className="absolute inset-0 grid-lines opacity-10 mask-fade-b pointer-events-none" />
      <div className="mx-auto max-w-7xl px-6 mb-16">
        <div className="flex items-end justify-between flex-wrap gap-6">
          <div>
            <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-4">
              Experience Gallery · 03
            </div>
            <h2 className="text-[clamp(2rem,4vw,3.6rem)] font-light leading-[1.05] text-grad max-w-2xl">
              Moments engineered<br />into memory.
            </h2>
          </div>
          <Link
            to="/experiences"
            className="rounded-full glass px-5 py-2.5 text-sm text-foreground/90 hover:text-foreground transition-colors"
          >
            All experiences →
          </Link>
        </div>
      </div>

      {/* Asymmetric mosaic — no horizontal scroll */}
      <div className="mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-12 auto-rows-[180px] gap-4 md:gap-5">
          {items.map((it, i) => {
            const spans = [
              "col-span-12 md:col-span-7 row-span-3",
              "col-span-12 md:col-span-5 row-span-2",
              "col-span-6 md:col-span-5 row-span-2",
              "col-span-6 md:col-span-4 row-span-2",
              "col-span-12 md:col-span-3 row-span-2",
            ];
            return (
              <Link
                key={it.slug}
                to="/experiences/$slug"
                params={{ slug: it.slug }}
                className={`group relative overflow-hidden rounded-3xl glass-strong ring-hairline ${spans[i]}`}
              >
                <img
                  src={it.img}
                  alt={it.title}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1400ms] group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[color:var(--obsidian)] via-[color:var(--obsidian)]/20 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-br from-[color:var(--photonic-cyan)]/0 to-[color:var(--aurora-violet)]/0 group-hover:from-[color:var(--photonic-cyan)]/10 group-hover:to-[color:var(--aurora-violet)]/15 transition-colors duration-700" />

                <div className="absolute top-4 left-4 right-4 flex items-center justify-between">
                  <span className="font-mono text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
                    Case · 0{i + 1}
                  </span>
                  <span className="glass rounded-full px-3 py-1 font-mono text-[10px] text-foreground/80">
                    {it.drones.toLocaleString()} drones
                  </span>
                </div>

                <div className="absolute bottom-0 inset-x-0 p-6">
                  <div className="text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{it.tag}</div>
                  <h3 className="mt-2 text-2xl md:text-3xl font-display font-light">{it.title}</h3>
                  <div className="mt-3 flex items-center gap-2 text-xs text-[color:var(--photonic-cyan)] opacity-70 group-hover:opacity-100 transition-opacity">
                    Explore
                    <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
}
