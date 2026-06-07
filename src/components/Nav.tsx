import logoAsset from "@/assets/logo-lucen.png.asset.json";
import { Link } from "@tanstack/react-router";

export function Nav() {
  const links = [
    { label: "Experiences", to: "/experiences" },
    { label: "Services", to: "/services" },
    { label: "Industries", to: "/industries" },
    { label: "Insights", to: "/insights" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-6 pt-5">
        <div className="glass rounded-full px-5 py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3">
            <img src={logoAsset.url} alt="Lucen Sky" className="h-5 w-auto invert opacity-90" />
          </Link>
          <nav className="hidden md:flex items-center gap-8 text-sm text-muted-foreground">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                className="hover:text-foreground transition-colors"
                activeProps={{ className: "text-foreground" }}
              >
                {l.label}
              </Link>
            ))}
          </nav>
          <Link
            to="/contact"
            className="rounded-full border border-[color:var(--photonic-cyan)]/40 text-[color:var(--photonic-cyan)] px-4 py-1.5 text-xs tracking-[0.18em] uppercase hover:bg-[color:var(--photonic-cyan)]/10 transition-colors"
          >
            Commission
          </Link>
        </div>
      </div>
    </header>
  );
}
