import { createFileRoute, Link } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";

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

const industries = [
  { icon: "◆", k: "Retail & Luxury", v: "Drives in-store engagement and sales", stat: "+38%", note: "AVG. DWELL TIME" },
  { icon: "⬡", k: "Real Estate", v: "Accelerates property sales", stat: "−41%", note: "TIME TO DEPOSIT" },
  { icon: "◎", k: "Automotive", v: "Enhances product discovery", stat: "+57%", note: "TEST-DRIVE BOOKINGS" },
  { icon: "◆", k: "Universities", v: "Boosts student acquisition", stat: "+44%", note: "OPEN-DAY CAPTURE RATE" },
  { icon: "◎", k: "Telecom", v: "Simplifies complex offerings", stat: "+33%", note: "PLAN UPGRADE INTENT" },
  { icon: "◆", k: "Banking", v: "Turns waiting into interaction", stat: "+29%", note: "PRODUCT CONSIDERATION" },
  { icon: "◆", k: "Airports & Malls", v: "Monetizes high footfall", stat: "8.2×", note: "DWELL-TIME ROI" },
  { icon: "⬡", k: "Healthcare", v: "Improves training precision", stat: "+24%", note: "RETENTION SCORES" },
];

function IndustriesPage() {
  return (
    <main className="relative">
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
          convert engagement into sales.
        </p>
      </section>

      <section className="relative mx-auto max-w-7xl px-6 pb-32">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {industries.map((it) => (
            <div
              key={it.k}
              className="group relative glass-strong rounded-3xl p-7 ring-hairline overflow-hidden hover:-translate-y-1 transition-transform duration-500"
            >
              <div className="absolute -top-10 -right-10 h-40 w-40 rounded-full bg-[color:var(--photonic-cyan)]/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="text-2xl text-[color:var(--photonic-cyan)]">{it.icon}</div>
              <h3 className="mt-6 font-display text-xl font-light">{it.k}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{it.v}</p>
              <div className="mt-8 font-mono text-3xl text-[color:var(--photonic-cyan)]">{it.stat}</div>
              <div className="mt-1 text-[10px] tracking-[0.3em] uppercase text-muted-foreground">{it.note}</div>
            </div>
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
