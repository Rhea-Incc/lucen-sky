import type { Shape } from "@/components/SwarmCanvas";

export type Industry = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  stat: string;
  statNote: string;
  story: string[];
  shapes: Shape[];
  metrics: { k: string; v: string }[];
};

export const industries: Industry[] = [
  {
    slug: "retail-luxury",
    name: "Retail & Luxury",
    icon: "◆",
    tagline: "Drives in-store engagement and luxury brand affinity",
    stat: "+38%",
    statNote: "AVG. DWELL TIME",
    story: [
      "Luxury houses use the sky as their most expensive vitrine — visible from kilometers, owned for minutes.",
      "We translate brand silhouettes, monograms, and product reveals into atmospheric choreographies that pull foot traffic toward the flagship.",
      "Measurement is built in: dwell, heat-maps, and conversion uplift in the 48 hours following the show.",
    ],
    shapes: [
      { kind: "text", text: "LUX" },
      { kind: "heart" },
      { kind: "ring" },
      { kind: "text", text: "RETAIL" },
      { kind: "lemniscate" },
    ],
    metrics: [
      { k: "Dwell Uplift", v: "+38%" },
      { k: "Footfall Spike", v: "4.2×" },
      { k: "Earned Media", v: "$1.4M avg" },
    ],
  },
  {
    slug: "real-estate",
    name: "Real Estate",
    icon: "⬡",
    tagline: "Accelerates property sales and launches",
    stat: "−41%",
    statNote: "TIME TO DEPOSIT",
    story: [
      "Skyline reveals turn a launch night into a citywide event. The development isn't announced — it is unveiled in the sky above it.",
      "We map architectural elevations into formations that hover precisely above the site, giving prospects an aerial preview before a single foundation is poured.",
      "Sales centres report dramatic compression in the sales cycle when the sky becomes the brochure.",
    ],
    shapes: [
      { kind: "house" },
      { kind: "skyline" },
      { kind: "text", text: "ESTATE" },
      { kind: "grid" },
      { kind: "columns", n: 6 },
    ],
    metrics: [
      { k: "Time to Deposit", v: "−41%" },
      { k: "Launch Coverage", v: "92 outlets avg" },
      { k: "Showroom Visits", v: "+63%" },
    ],
  },
  {
    slug: "automotive",
    name: "Automotive",
    icon: "◎",
    tagline: "Reveals vehicles with cinematic gravity",
    stat: "+57%",
    statNote: "TEST-DRIVE BOOKINGS",
    story: [
      "A car reveal lives or dies on a single moment. We give it a stage the size of a city.",
      "Silhouettes form mid-air, wheels rotate at scale, badges resolve from particle clouds — synchronized to the curtain drop on the ground.",
      "The sky show becomes the lead asset for the next twelve months of campaign creative.",
    ],
    shapes: [
      { kind: "wheel" },
      { kind: "text", text: "DRIVE" },
      { kind: "arc" },
      { kind: "lemniscate" },
      { kind: "ring" },
    ],
    metrics: [
      { k: "Test-Drive Bookings", v: "+57%" },
      { k: "Reveal Recall", v: "89%" },
      { k: "Campaign Reuse", v: "12 mo" },
    ],
  },
  {
    slug: "universities",
    name: "Universities",
    icon: "◆",
    tagline: "Boosts student acquisition and alumni pride",
    stat: "+44%",
    statNote: "OPEN-DAY CAPTURE RATE",
    story: [
      "Open days, commencements, founder anniversaries — the institutional moments that decide where the next generation enrolls.",
      "We render crests, mottos, and constellations of alumni achievement above the campus.",
      "The result is the most photographed evening of the academic year and a measurable lift in applications.",
    ],
    shapes: [
      { kind: "text", text: "LEARN" },
      { kind: "columns", n: 5 },
      { kind: "spiral" },
      { kind: "plus" },
      { kind: "sphere" },
    ],
    metrics: [
      { k: "Open-Day Capture", v: "+44%" },
      { k: "Application Lift", v: "+18%" },
      { k: "Alumni Donations", v: "+22%" },
    ],
  },
  {
    slug: "telecom",
    name: "Telecom",
    icon: "◎",
    tagline: "Makes invisible networks visible",
    stat: "+33%",
    statNote: "PLAN UPGRADE INTENT",
    story: [
      "5G, fiber, satellite mesh — the products of telcos are invisible by definition. We make them legible.",
      "Mesh nodes pulse, signal waves expand outward, latency drops in real time above a stadium full of customers.",
      "The atmospheric demonstration becomes a single shareable proof of network superiority.",
    ],
    shapes: [
      { kind: "antenna" },
      { kind: "wave" },
      { kind: "sphere" },
      { kind: "text", text: "SIGNAL" },
      { kind: "grid" },
    ],
    metrics: [
      { k: "Upgrade Intent", v: "+33%" },
      { k: "Brand Trust", v: "+27pt" },
      { k: "Social Reach", v: "48M avg" },
    ],
  },
  {
    slug: "banking",
    name: "Banking",
    icon: "◆",
    tagline: "Turns institutional weight into spectacle",
    stat: "+29%",
    statNote: "PRODUCT CONSIDERATION",
    story: [
      "Banks compete on trust — a brand attribute that is hard to advertise and easy to perform.",
      "Architectural columns of light, stable formations holding for minutes, monumental wordmarks: the choreography itself communicates institutional permanence.",
      "We pair atmospheric shows with branch open-days to translate spectacle into appointments.",
    ],
    shapes: [
      { kind: "columns", n: 7 },
      { kind: "plus" },
      { kind: "ring" },
      { kind: "text", text: "TRUST" },
      { kind: "grid" },
    ],
    metrics: [
      { k: "Consideration Lift", v: "+29%" },
      { k: "Branch Appointments", v: "+34%" },
      { k: "Sentiment Score", v: "+19pt" },
    ],
  },
  {
    slug: "airports-malls",
    name: "Airports & Malls",
    icon: "⬡",
    tagline: "Monetizes the highest-footfall ground in any city",
    stat: "8.2×",
    statNote: "DWELL-TIME ROI",
    story: [
      "Airports and malls are the planet's most reliable attention markets. The sky above them is unsold inventory.",
      "We turn departure halls, rooftop plazas, and outdoor courts into recurring media venues for the brands inside.",
      "Revenue-share programs let operators monetize every flight delay and every weekend evening.",
    ],
    shapes: [
      { kind: "plane" },
      { kind: "arc" },
      { kind: "text", text: "TRANSIT" },
      { kind: "grid" },
      { kind: "wave" },
    ],
    metrics: [
      { k: "Dwell ROI", v: "8.2×" },
      { k: "Tenant Renewals", v: "+22%" },
      { k: "Ad Yield / m²", v: "+47%" },
    ],
  },
  {
    slug: "healthcare",
    name: "Healthcare",
    icon: "⬡",
    tagline: "Trains, signals, and celebrates clinical excellence",
    stat: "+24%",
    statNote: "RETENTION SCORES",
    story: [
      "Hospitals use atmospheric media for two missions: surgical simulation visible to whole teams, and public commemoration of clinical milestones.",
      "Three-dimensional anatomical models float above auditoriums; heartbeat waves mark transplant anniversaries above the hospital campus.",
      "It is the most human use of the medium and the one that surprises us most.",
    ],
    shapes: [
      { kind: "plus" },
      { kind: "heartbeat" },
      { kind: "heart" },
      { kind: "text", text: "VITALS" },
      { kind: "sphere" },
    ],
    metrics: [
      { k: "Training Retention", v: "+24%" },
      { k: "Public Engagement", v: "3.6× baseline" },
      { k: "Donor Pledges", v: "+31%" },
    ],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
