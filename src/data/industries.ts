import type { Shape } from "@/components/SwarmCanvas";

export type InfographicBar = { label: string; value: number; suffix?: string; note?: string };
export type Insight = { k: string; v: string };

export type Industry = {
  slug: string;
  name: string;
  icon: string;
  tagline: string;
  stat: string;
  statNote: string;
  story: string[];
  /** Exactly three keyframes — the signature 3-phase morph, tailored per industry. */
  shapes: [Shape, Shape, Shape];
  /** Per-industry morph cadence — seconds per keyframe. Defaults to 12s. */
  secondsPerKey?: number;
  /** Per-industry particle density override. */
  particles?: number;
  metrics: Insight[];
  /** Sector-tailored stats for the infographic bar chart. */
  infographic: InfographicBar[];
  /** Sky-OS playbook items rendered as a "industry tailoring" block. */
  tailoring: string[];
  /** Field insights / takeaways. */
  insights: string[];
  /** Telemetry feed snippets shown in the corner HUD. */
  telemetry: string[];
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
      "Luxury houses use the sky as their most expensive vitrine — visible from kilometres, owned for minutes.",
      "We translate brand silhouettes, monograms, and product reveals into atmospheric choreographies that pull foot traffic toward the flagship.",
      "Measurement is built in: dwell, heat-maps, and conversion uplift in the 48 hours following the show.",
    ],
    shapes: [{ kind: "text", text: "LUX" }, { kind: "starburst", rays: 16 }, { kind: "heart" }],
    metrics: [
      { k: "Dwell Uplift", v: "+38%" },
      { k: "Footfall Spike", v: "4.2×" },
      { k: "Earned Media", v: "$1.4M avg" },
    ],
    infographic: [
      { label: "Dwell time uplift", value: 38, suffix: "%" },
      { label: "Footfall spike", value: 76, suffix: "%" },
      { label: "Social mentions", value: 92, suffix: "%" },
      { label: "Sales attribution", value: 54, suffix: "%" },
    ],
    tailoring: [
      "Monogram & wordmark formations resolved at flagship-store altitude",
      "Pre-show airspace coordination with municipal aviation authorities",
      "Heat-mapped footfall capture in the 48h window post-reveal",
    ],
    insights: [
      "Average reveal generates 18M earned-media impressions inside 72 hours",
      "Best ROI corridor: 19:30–20:15 local time on dry, low-wind evenings",
      "Pair atmospheric reveal with in-store VIP capsule for 4.2× conversion",
    ],
    telemetry: ["FORMATION · LUX MONOGRAM", "WIND · 04kt", "DWELL · +38%"],
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
    shapes: [{ kind: "apartment", floors: 9 }, { kind: "skyline" }, { kind: "house" }],
    metrics: [
      { k: "Time to Deposit", v: "−41%" },
      { k: "Launch Coverage", v: "92 outlets" },
      { k: "Showroom Visits", v: "+63%" },
    ],
    infographic: [
      { label: "Sales cycle compression", value: 41, suffix: "%" },
      { label: "Showroom visits", value: 63, suffix: "%" },
      { label: "Launch-night deposits", value: 28, suffix: "%" },
      { label: "Press coverage", value: 88, suffix: "%" },
    ],
    tailoring: [
      "1:1 silhouette mapping of the tower's elevation, hovering over the plot",
      "GPS-anchored holding patterns above the actual site footprint",
      "Sales-centre kiosk fed live from the same Sky-OS telemetry",
    ],
    insights: [
      "Developments revealed in-sky close at +63% showroom-conversion baseline",
      "Average citywide press pickup: 92 outlets within 24h",
      "Deposit pull-forward by 41% versus traditional billboard launch",
    ],
    telemetry: ["FORMATION · TOWER", "ALT · 240m", "HOLD · 90s"],
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
      "Silhouettes form mid-air, wheels rotate at scale, badges resolve from particle clouds — synchronised to the curtain drop on the ground.",
      "The sky show becomes the lead asset for the next twelve months of campaign creative.",
    ],
    shapes: [{ kind: "sportscar" }, { kind: "wheel" }, { kind: "text", text: "DRIVE" }],
    metrics: [
      { k: "Test-Drive Bookings", v: "+57%" },
      { k: "Reveal Recall", v: "89%" },
      { k: "Campaign Reuse", v: "12 mo" },
    ],
    infographic: [
      { label: "Test-drive bookings", value: 57, suffix: "%" },
      { label: "Reveal recall", value: 89, suffix: "%" },
      { label: "Configurator visits", value: 71, suffix: "%" },
      { label: "Year-1 campaign reuse", value: 96, suffix: "%" },
    ],
    tailoring: [
      "Vehicle silhouette extracted from CAD, formation-mapped to 1:30 scale",
      "Wheel-spin and badge resolves choreographed to the curtain drop",
      "Sky-OS replays archived as 8K capture for 12-month campaign runway",
    ],
    insights: [
      "89% unaided recall of the vehicle's silhouette 72h post-reveal",
      "Configurator traffic spikes 71% in the city of the reveal",
      "Drone-reveal footage outperforms traditional reveal film by 3.4× on social",
    ],
    telemetry: ["FORMATION · COUPE", "RPM · 6,400", "TQ · 510Nm"],
  },
  {
    slug: "universities",
    name: "Universities",
    icon: "◆",
    tagline: "Boosts student acquisition and alumni pride",
    stat: "+44%",
    statNote: "OPEN-DAY CAPTURE RATE",
    story: [
      "Open days, commencements, founder anniversaries — the institutional moments that decide where the next generation enrols.",
      "We render crests, mottos, and constellations of alumni achievement above the campus.",
      "The result is the most photographed evening of the academic year and a measurable lift in applications.",
    ],
    shapes: [{ kind: "constellation" }, { kind: "columns", n: 5 }, { kind: "text", text: "LEARN" }],
    metrics: [
      { k: "Open-Day Capture", v: "+44%" },
      { k: "Application Lift", v: "+18%" },
      { k: "Alumni Donations", v: "+22%" },
    ],
    infographic: [
      { label: "Open-day capture rate", value: 44, suffix: "%" },
      { label: "Application lift", value: 18, suffix: "%" },
      { label: "Alumni donations", value: 22, suffix: "%" },
      { label: "Sentiment score", value: 82, suffix: "%" },
    ],
    tailoring: [
      "Crest-accurate emblem formations resolved over the quad at dusk",
      "Constellation of named alumni achievements rendered overhead",
      "Tied to admissions funnel — capture forms triggered by show ID",
    ],
    insights: [
      "Universities running 2+ atmospheric events / year see +18% applications",
      "Best-performing show: founder anniversary tied to admissions deadline",
      "Donor pledges spike +22% in the post-show 14-day window",
    ],
    telemetry: ["FORMATION · CREST", "STARS · 92", "ALT · 110m"],
  },
  {
    slug: "telecom",
    name: "Telecom",
    icon: "◎",
    tagline: "Makes invisible networks visible",
    stat: "+33%",
    statNote: "PLAN UPGRADE INTENT",
    story: [
      "5G, fibre, satellite mesh — the products of telcos are invisible by definition. We make them legible.",
      "Mesh nodes pulse, signal waves expand outward, latency drops in real time above a stadium full of customers.",
      "The atmospheric demonstration becomes a single shareable proof of network superiority.",
    ],
    shapes: [{ kind: "antenna" }, { kind: "wave" }, { kind: "starburst", rays: 10 }],
    metrics: [
      { k: "Upgrade Intent", v: "+33%" },
      { k: "Brand Trust", v: "+27pt" },
      { k: "Social Reach", v: "48M avg" },
    ],
    infographic: [
      { label: "Upgrade intent lift", value: 33, suffix: "%" },
      { label: "Brand trust delta", value: 67, suffix: "%" },
      { label: "Social reach", value: 90, suffix: "%" },
      { label: "Latency reduction story-recall", value: 74, suffix: "%" },
    ],
    tailoring: [
      "Live mesh-node animation driven by real network telemetry feeds",
      "Latency drops visualised as wave-front collapse in formation",
      "Branded mesh logo resolves as the show finale",
    ],
    insights: [
      "Average reach: 48M impressions across owned + earned channels per show",
      "Stadium-based shows lift plan-upgrade intent by +33% in attendees",
      "Network-status formations cut explanatory ad-spend by ~22%",
    ],
    telemetry: ["FORMATION · MESH", "LATENCY · 11ms", "NODES · 1,540"],
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
    shapes: [{ kind: "dome" }, { kind: "columns", n: 7 }, { kind: "text", text: "TRUST" }],
    metrics: [
      { k: "Consideration Lift", v: "+29%" },
      { k: "Branch Appointments", v: "+34%" },
      { k: "Sentiment Score", v: "+19pt" },
    ],
    infographic: [
      { label: "Product consideration", value: 29, suffix: "%" },
      { label: "Branch appointments", value: 34, suffix: "%" },
      { label: "Sentiment score", value: 56, suffix: "%" },
      { label: "App downloads (city)", value: 47, suffix: "%" },
    ],
    tailoring: [
      "Hold-stable architectural formations (columns, dome) signalling permanence",
      "Wordmark formations tied to financial-product launch windows",
      "Branch-network animation tracing actual branch coordinates",
    ],
    insights: [
      "Consideration lifts +29% with anniversary / founding-date shows",
      "Branch-appointments jump +34% in 7 days post-show",
      "Highest-trust formations are slow, symmetrical, and hold for ≥45 seconds",
    ],
    telemetry: ["FORMATION · COLUMNS", "HOLD · 60s", "DRIFT · 0.4m"],
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
      "Revenue-share programs let operators monetise every flight delay and every weekend evening.",
    ],
    shapes: [{ kind: "plane" }, { kind: "arc" }, { kind: "grid" }],
    metrics: [
      { k: "Dwell ROI", v: "8.2×" },
      { k: "Tenant Renewals", v: "+22%" },
      { k: "Ad Yield / m²", v: "+47%" },
    ],
    infographic: [
      { label: "Dwell ROI multiple", value: 82, suffix: "×10⁻¹" },
      { label: "Tenant renewals", value: 22, suffix: "%" },
      { label: "Ad yield per m²", value: 47, suffix: "%" },
      { label: "Repeat visitation", value: 51, suffix: "%" },
    ],
    tailoring: [
      "Airspace-cleared recurring slots negotiated with the airport authority",
      "Tenant-rotation programme — each brand owns one window per quarter",
      "Revenue share with the operator — atmospheric inventory as new SKU",
    ],
    insights: [
      "Best yield: Thursday–Sunday 19:00–22:00 in courtyard / rooftop venues",
      "Tenant renewals climb +22% when atmospheric programme is offered",
      "Per-m² ad yield comparable to prime indoor banner inventory at 1/3 cost",
    ],
    telemetry: ["FORMATION · DEPARTURE", "ROTATION · 12 brands", "ALT · 95m"],
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
    shapes: [{ kind: "plus" }, { kind: "heartbeat" }, { kind: "pill" }],
    metrics: [
      { k: "Training Retention", v: "+24%" },
      { k: "Public Engagement", v: "3.6× baseline" },
      { k: "Donor Pledges", v: "+31%" },
    ],
    infographic: [
      { label: "Training retention", value: 24, suffix: "%" },
      { label: "Public engagement", value: 72, suffix: "%" },
      { label: "Donor pledges", value: 31, suffix: "%" },
      { label: "Recruitment interest", value: 38, suffix: "%" },
    ],
    tailoring: [
      "Volumetric anatomical models for clinical-team training auditoriums",
      "Heartbeat / EKG formations for transplant-anniversary commemorations",
      "Pharma-launch formations tied to regulatory-approval announcements",
    ],
    insights: [
      "Clinical training retention up +24% with volumetric vs flat visuals",
      "Public commemorative shows drive +31% donor pledges in 7 days",
      "Recruitment interest in showcased hospitals up +38%",
    ],
    telemetry: ["FORMATION · EKG", "BPM · 72", "AMPL · 1.2"],
  },
];

export const getIndustry = (slug: string) => industries.find((i) => i.slug === slug);
