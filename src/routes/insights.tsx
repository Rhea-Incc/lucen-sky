import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";
import bust from "@/assets/media-bust.jpg.asset.json";
import cairo from "@/assets/media-cairo.png.asset.json";
import cloudSwarm from "@/assets/media-cloud-swarm.jpg.asset.json";
import redbull from "@/assets/media-redbull.png.asset.json";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Lucen Sky" },
      { name: "description", content: "Field notes on swarm intelligence, atmospheric media, and the next layer of the city." },
      { property: "og:title", content: "Insights — Lucen Sky" },
      { property: "og:description", content: "Field notes from the programmable sky." },
    ],
  }),
  component: InsightsPage,
});

const articles = [
  {
    cat: "Field Note",
    title: "Why the sky is the last untouched media surface",
    excerpt: "Every flat surface in the city has been monetized. The volumetric airspace above the audience is the only canvas still measured in tens of thousands of people per square kilometer.",
    img: cloudSwarm.url,
    read: "8 min",
  },
  {
    cat: "Engineering",
    title: "Sub-200ms input → swarm latency, explained",
    excerpt: "How we route audience input through the show controller and into 1,500 simultaneous flight paths without breaking choreography.",
    img: redbull.url,
    read: "12 min",
  },
  {
    cat: "Case Diary",
    title: "Cairo, 4,800 drones, and the pyramid problem",
    excerpt: "Designing a multi-act spectacle against one of the most photographed skylines on earth — and the wind tunnel it creates after sunset.",
    img: cairo.url,
    read: "6 min",
  },
  {
    cat: "Research",
    title: "Volumetric brand recall vs traditional OOH",
    excerpt: "Six pilots, 180,000 surveyed attendees, and what the data says about three-dimensional advertising recall.",
    img: bust.url,
    read: "14 min",
  },
];

function InsightsPage() {
  return (
    <main className="relative">
      <Nav />
      <div className="absolute inset-0 pointer-events-none">
        <Starfield density={1.0} />
      </div>

      <section className="relative pt-40 pb-16 px-6 mx-auto max-w-7xl">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
          Insights · Field Notes
        </div>
        <h1 className="text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[0.98] text-grad max-w-4xl">
          Notes from<br />the programmable sky.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
          Engineering reports, post-show diaries and the data behind atmospheric media.
        </p>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-32 grid md:grid-cols-2 gap-6">
        {articles.map((a, i) => (
          <article
            key={a.title}
            className={`group relative overflow-hidden rounded-3xl glass-strong ring-hairline ${
              i === 0 ? "md:col-span-2" : ""
            }`}
          >
            <div className={`grid ${i === 0 ? "md:grid-cols-2" : ""}`}>
              <div className={`relative ${i === 0 ? "aspect-[16/10] md:aspect-auto md:min-h-[420px]" : "aspect-[16/9]"}`}>
                <img src={a.img} alt={a.title} className="absolute inset-0 h-full w-full object-cover transition-transform duration-1000 group-hover:scale-105" />
                <div className="absolute inset-0 bg-gradient-to-tr from-[color:var(--obsidian)]/60 to-transparent" />
              </div>
              <div className="p-8 md:p-10 flex flex-col justify-center">
                <div className="flex items-center gap-3 text-[10px] tracking-[0.3em] uppercase text-[color:var(--photonic-cyan)]">
                  <span>{a.cat}</span>
                  <span className="h-px w-6 bg-[color:var(--photonic-cyan)]/40" />
                  <span className="text-muted-foreground">{a.read}</span>
                </div>
                <h2 className="mt-4 font-display text-2xl md:text-3xl font-light leading-tight">{a.title}</h2>
                <p className="mt-4 text-muted-foreground leading-relaxed">{a.excerpt}</p>
                <Link to="/contact" className="mt-6 text-sm text-[color:var(--photonic-cyan)]">
                  Read field note →
                </Link>
              </div>
            </div>
          </article>
        ))}
      </section>
    </main>
  );
}
