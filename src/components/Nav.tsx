import logoAsset from "@/assets/logo-lucen-v2.png.asset.json";
import { Link } from "@tanstack/react-router";
import { useState } from "react";
import { src } from "@/lib/media";

export function Nav() {
  const [open, setOpen] = useState(false);
  const links = [
    { label: "Experiences", to: "/experiences" },
    { label: "Services", to: "/services" },
    { label: "Industries", to: "/industries" },
    { label: "Insights", to: "/insights" },
  ];
  return (
    <header className="fixed top-0 inset-x-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-6 pt-4 md:pt-5">
        <div className="glass rounded-full px-4 md:px-5 py-2.5 md:py-3 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-3" onClick={() => setOpen(false)}>
            <img src={src(logoAsset)} alt="Lucen Sky" className="h-5 w-auto invert opacity-90" />
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
          <div className="flex items-center gap-2">
            <Link
              to="/auth"
              className="hidden sm:inline-flex rounded-full glass px-3 md:px-4 py-1.5 text-[10px] md:text-xs tracking-[0.18em] uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              Sign in
            </Link>
            <Link
              to="/contact"
              className="rounded-full border border-[color:var(--photonic-cyan)]/40 text-[color:var(--photonic-cyan)] px-3 md:px-4 py-1.5 text-[10px] md:text-xs tracking-[0.18em] uppercase hover:bg-[color:var(--photonic-cyan)]/10 transition-colors"
            >
              Commission
            </Link>
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setOpen((v) => !v)}
              className="md:hidden h-8 w-8 grid place-items-center rounded-full glass"
            >
              <span className="block w-3.5 h-px bg-foreground/80 relative before:content-[''] before:absolute before:-top-1.5 before:left-0 before:right-0 before:h-px before:bg-foreground/80 after:content-[''] after:absolute after:top-1.5 after:left-0 after:right-0 after:h-px after:bg-foreground/80" />
            </button>
          </div>
        </div>
        {open && (
          <div className="md:hidden mt-2 glass-strong rounded-3xl ring-hairline p-4 flex flex-col gap-1">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="px-3 py-3 rounded-2xl text-sm text-muted-foreground hover:text-foreground hover:bg-white/5"
                activeProps={{ className: "text-foreground bg-white/5" }}
              >
                {l.label}
              </Link>
            ))}
          </div>
        )}
      </div>
    </header>
  );
}
