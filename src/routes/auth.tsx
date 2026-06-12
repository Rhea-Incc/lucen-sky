import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Nav } from "@/components/Nav";
import { Starfield } from "@/components/Starfield";

export const Route = createFileRoute("/auth")({
  head: () => ({
    meta: [{ title: "Sign in — Lucen Sky Flight Deck" }, { name: "robots", content: "noindex" }],
  }),
  component: AuthPage,
});

function AuthPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [info, setInfo] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    supabase.auth.getUser().then(({ data }) => {
      if (data.user) navigate({ to: "/admin" });
    });
  }, [navigate]);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    setInfo(null);
    setLoading(true);
    try {
      if (mode === "signin") {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      } else {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
        if (data.session) {
          navigate({ to: "/admin" });
        } else {
          setInfo(
            `Clearance pending — we've dispatched a confirmation flight plan to ${email}. Open it to complete pre-flight checks, then return here to sign in.`,
          );
          setMode("signin");
          setPassword("");
        }
      }
    } catch (err: any) {
      setError(err.message ?? "Sign-in failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen">
      <Nav />
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <Starfield density={0.8} />
      </div>
      <section className="min-h-screen grid place-items-center px-6 pt-24">
        <div className="w-full max-w-md glass-strong rounded-3xl ring-hairline p-8">
          <div className="text-[10px] tracking-[0.4em] uppercase text-[color:var(--photonic-cyan)]/80 mb-2">
            Flight Deck · Restricted
          </div>
          <h1 className="font-display text-3xl text-grad font-light">
            {mode === "signin" ? "Clear for takeoff" : "Request clearance"}
          </h1>
          <p className="mt-2 text-sm text-muted-foreground">
            {mode === "signin"
              ? "Sign in to the Lucen Sky operations console."
              : "First operator becomes admin automatically."}
          </p>

          <form onSubmit={submit} className="mt-6 space-y-3">
            <input
              type="email"
              required
              autoComplete="email"
              placeholder="Operator email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50"
            />
            <input
              type="password"
              required
              minLength={8}
              autoComplete={mode === "signin" ? "current-password" : "new-password"}
              placeholder="Password (min 8)"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full glass rounded-2xl px-4 py-3 text-sm bg-transparent outline-none focus:ring-2 focus:ring-[color:var(--photonic-cyan)]/50"
            />
            {error && <div className="text-xs text-red-400">{error}</div>}
            {info && (
              <div className="text-xs text-[color:var(--photonic-cyan)] glass rounded-2xl px-3 py-2 ring-hairline">
                {info}
              </div>
            )}
            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-full bg-[color:var(--photonic-cyan)] px-7 py-3 text-sm text-[color:var(--primary-foreground)] glow-cyan disabled:opacity-50"
            >
              {loading ? "Engaging…" : mode === "signin" ? "Sign in" : "Create account"}
            </button>
          </form>

          <div className="mt-5 flex items-center justify-between text-xs">
            <button
              onClick={() => setMode(mode === "signin" ? "signup" : "signin")}
              className="text-muted-foreground hover:text-foreground"
            >
              {mode === "signin" ? "Need access? Request clearance →" : "Have access? Sign in →"}
            </button>
            <Link to="/" className="text-[color:var(--photonic-cyan)]">
              ← Home
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}
