import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Future } from "@/components/Future";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Lucen Sky" },
      { name: "description", content: "Commission a sky. Get in touch with the Lucen Sky studio team." },
      { property: "og:title", content: "Contact — Lucen Sky" },
      { property: "og:description", content: "Commission a sky." },
    ],
  }),
  component: ContactPage,
});

function ContactPage() {
  return (
    <main className="relative">
      <Nav />
      <div className="pt-20">
        <Future />
      </div>
    </main>
  );
}
