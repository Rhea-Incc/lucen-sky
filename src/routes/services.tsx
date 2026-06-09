import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Footer } from "@/components/Footer";
import { Starfield } from "@/components/Starfield";
import johnny from "@/assets/media-johnny-walker.jpg.asset.json";
import cairo from "@/assets/media-cairo.png.asset.json";
import cloudSwarm from "@/assets/media-cloud-swarm.jpg.asset.json";
import fireworks from "@/assets/media-fireworks.jpg.asset.json";
import redbull from "@/assets/media-redbull.png.asset.json";
import bust from "@/assets/media-bust.jpg.asset.json";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Lucen Sky" },
      { name: "description", content: "Drone formations, hybrid pyro-swarm, interactive sky games, architectural reveals, and broadcast-ready sky productions." },
      { property: "og:title", content: "Services — Lucen Sky" },
      { property: "og:description", content: "Six service lines, one programmable sky." },
    ],
  }),
  component: ServicesPage,
});

const services = [
  {
    n: "01",
    title: "Brand Sky Productions",
    desc: "Full-scale brand activations. Wordmark, mascot, hero product — rendered at city scale with broadcast deliverables.",
    img: johnny.url,
    points: ["1,000–4,000 drones", "Custom 3D modelling", "Broadcast capture crew", "Earned-media kit"],
  },
  {
    n: "02",
    title: "Cultural & Civic Spectacles",
    desc: "Recurring or one-off civic anthems. Built with local historians, choreographers and orchestras.",
    img: cairo.url,
    points: ["Multi-act narratives", "Live orchestral sync", "Tourism analytics", "Civic permitting"],
  },
  {
    n: "03",
    title: "Hybrid Pyro & Swarm",
    desc: "Where drones meet fireworks, lasers and waterworks — coordinated to the millisecond.",
    img: fireworks.url,
    points: ["Pyro safety zoning", "Cross-medium choreography", "Show control integration", "Insurance-grade ops"],
  },
  {
    n: "04",
    title: "Interactive Sky Games",
    desc: "The audience controls the swarm in real time. Phones, sensors or stage input become flight commands.",
    img: redbull.url,
    points: ["< 200ms latency", "Mobile input layer", "Custom game logic", "Failsafe choreography"],
  },
  {
    n: "05",
    title: "Architectural Reveals",
    desc: "Volumetric structures in the sky for masterplan launches, building openings and brand campuses.",
    img: cloudSwarm.url,
    points: ["3D structural rendering", "Site-specific design", "Sub-cm RTK precision", "Daylight variants"],
  },
  {
    n: "06",
    title: "Atmospheric R&D",
    desc: "For studios, agencies and governments exploring the next frontier — particle systems, formations, simulations.",
    img: bust.url,
    points: ["Simulation sandbox", "Prototype flights", "Co-developed IP", "Long-form partnership"],
  },
];

function ServicesPage() {
  return (
    <main className="relative">
      <Nav />
      <div className="absolute inset-0 pointer-events-none">
        <Starfield density={1.0} />
      </div>

      <section className="relative pt-40 pb-20 px-6 mx-auto max-w-7xl">
        <div className="text-xs tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-6">
          Services · Six Disciplines
        </div>
        <h1 className="text-[clamp(2.6rem,6vw,5.4rem)] font-light leading-[0.98] text-grad max-w-4xl">
          One studio.<br />Every layer of the sky.
        </h1>
        <p className="mt-8 max-w-xl text-muted-foreground leading-relaxed">
          From a 200-drone brand teaser to a 4,000-drone civic anthem with live orchestra — every commission is
          engineered end-to-end by the same team.
        </p>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-32 space-y-6">
        {services.map((s, i) => (
          <article
            key={s.n}
            className={`relative grid md:grid-cols-12 gap-6 items-stretch glass-strong rounded-3xl overflow-hidden ring-hairline ${
              i % 2 === 1 ? "md:[direction:rtl]" : ""
            }`}
          >
            <div className="md:col-span-7 relative aspect-[16/10] md:aspect-auto md:min-h-[420px] [direction:ltr]">
              <img src={s.img} alt={s.title} className="absolute inset-0 h-full w-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-r from-[color:var(--obsidian)]/80 via-transparent to-transparent" />
              <div className="absolute top-5 left-5 font-mono text-xs tracking-[0.3em] text-[color:var(--photonic-cyan)]">
                {s.n}
              </div>
            </div>
            <div className="md:col-span-5 p-8 md:p-10 flex flex-col justify-center [direction:ltr]">
              <h2 className="font-display text-3xl md:text-4xl font-light text-grad">{s.title}</h2>
              <p className="mt-4 text-muted-foreground leading-relaxed">{s.desc}</p>
              <ul className="mt-6 space-y-2">
                {s.points.map((p) => (
                  <li key={p} className="flex items-center gap-3 text-sm text-foreground/80">
                    <span className="h-1 w-1 rounded-full bg-[color:var(--photonic-cyan)]" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </article>
        ))}

        <div className="text-center pt-16">
          <Link
            to="/contact"
            className="inline-flex items-center gap-3 rounded-full bg-[color:var(--photonic-cyan)] px-7 py-3 text-sm text-[color:var(--primary-foreground)] glow-cyan"
          >
            Commission a service →
          </Link>
        </div>
      </section>
      <Footer />
    </main>
  );
}
