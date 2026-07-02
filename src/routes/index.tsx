import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/Nav";
import { Hero } from "@/components/Hero";
import { Formation } from "@/components/Formation";
import { Gallery } from "@/components/Gallery";
import { SkyOS } from "@/components/SkyOS";
import { HomeContact } from "@/components/HomeContact";
import { Future } from "@/components/Future";
import { Footer } from "@/components/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lucen Sky — The Sky Is Becoming A New Medium" },
      { name: "description", content: "Lucen Sky orchestrates thousands of autonomous drones into living formations — atmospheric media for brands, cities, and culture." },
      { property: "og:title", content: "Lucen Sky — Atmospheric Media Platform" },
      { property: "og:description", content: "Programmable skies. Swarm intelligence. Aerospace-grade spectacle." },
      { property: "og:type", content: "website" },
    ],
    links: [
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      { rel: "stylesheet", href: "https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300;400;500;600&family=Inter:wght@300;400;500&family=JetBrains+Mono:wght@400;500&display=swap" },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Formation />
      <Gallery />
      <SkyOS />
      <HomeContact />
      <Future />
      <Footer />
    </main>
  );
}
