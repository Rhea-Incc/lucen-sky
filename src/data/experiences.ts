import jack from "@/assets/case-jack.jpg.asset.json";
import deadpool from "@/assets/case-deadpool.jpg.asset.json";
import rider from "@/assets/case-rider.png.asset.json";
import shanghai from "@/assets/case-shanghai.jpg.asset.json";
import tiger from "@/assets/case-tiger.jpg.asset.json";
import cloud from "@/assets/case-cloud.jpg.asset.json";
import johnny from "@/assets/media-johnny-walker.jpg.asset.json";
import cairo from "@/assets/media-cairo.png.asset.json";
import cloudSwarm from "@/assets/media-cloud-swarm.jpg.asset.json";
import fireworks from "@/assets/media-fireworks.jpg.asset.json";
import disney from "@/assets/media-disney.png.asset.json";
import redbull from "@/assets/media-redbull.png.asset.json";

export type Experience = {
  slug: string;
  title: string;
  client: string;
  tag: string;
  location: string;
  coords: string;
  eventType: string;
  footfall: string;
  drones: number;
  duration: string;
  year: string;
  img: string;
  hero: string;
  gallery: string[];
  summary: string;
  story: string[];
  stats: { k: string; v: string }[];
};

export const experiences: Experience[] = [
  {
    slug: "jack-daniels",
    title: "Jack Daniel's",
    client: "Brown-Forman",
    tag: "Brand Launch · Nashville",
    location: "Nashville, Tennessee",
    coords: "36.1627° N · 86.7816° W",
    eventType: "Brand Activation",
    footfall: "48,000 on-site · 18M streamed",
    drones: 800,
    duration: "9 min 40s",
    year: "2025",
    img: jack.url,
    hero: jack.url,
    gallery: [jack.url, johnny.url, fireworks.url],
    summary: "A bourbon-soaked sky portrait above the Cumberland River — the bottle silhouette rendered in 800 synchronized lights.",
    story: [
      "Jack Daniel's wanted a 160-year anniversary moment that bypassed traditional out-of-home and lived in the open sky above Nashville.",
      "Lucen Sky compiled the brand's serif wordmark into a 3D point cloud and choreographed a six-act sequence — barrel, label, signature, skyline.",
      "The show drew 48,000 spectators along the riverbank and trended #1 on US social platforms within 90 minutes of liftoff.",
    ],
    stats: [
      { k: "Drones", v: "800" },
      { k: "Earned reach", v: "212M" },
      { k: "Brand recall lift", v: "+74%" },
      { k: "Sentiment", v: "94% positive" },
    ],
  },
  {
    slug: "deadpool-wolverine",
    title: "Deadpool & Wolverine",
    client: "Marvel Studios",
    tag: "Premiere · San Diego",
    location: "San Diego, California",
    coords: "32.7157° N · 117.1611° W",
    eventType: "Film Premiere",
    footfall: "120,000 across Comic-Con",
    drones: 1200,
    duration: "12 min",
    year: "2024",
    img: deadpool.url,
    hero: deadpool.url,
    gallery: [deadpool.url, redbull.url, cloudSwarm.url],
    summary: "A katana-armed Wolverine and a Deadpool mask carved into the night above Petco Park during Comic-Con weekend.",
    story: [
      "Marvel briefed a non-traditional teaser that would saturate Comic-Con without a single banner.",
      "Our team modeled both characters as morphing volumetric forms, transitioning through eight signature poses synced to the score.",
      "The result became the most-clipped premiere moment of the year and added 38M trailer views in 72 hours.",
    ],
    stats: [
      { k: "Drones", v: "1,200" },
      { k: "Trailer lift", v: "+38M views" },
      { k: "Press pickups", v: "1,400+" },
      { k: "Hashtag impressions", v: "612M" },
    ],
  },
  {
    slug: "imperial-rider",
    title: "Imperial Rider",
    client: "City of Xi'an",
    tag: "Cultural Anthem · Xi'an",
    location: "Xi'an, China",
    coords: "34.3416° N · 108.9398° E",
    eventType: "Civic Spectacle",
    footfall: "260,000 on-site",
    drones: 3200,
    duration: "18 min",
    year: "2025",
    img: rider.url,
    hero: cairo.url,
    gallery: [rider.url, cairo.url, johnny.url],
    summary: "A galloping Tang-dynasty cavalryman rendered at 3,200 points above the ancient city walls.",
    story: [
      "Xi'an's tourism bureau wanted a recurring nightly anthem to anchor its cultural rebrand.",
      "We worked with local historians to derive nine authentic silhouettes — horseman, pagoda, calligraphy stroke — woven into a single moving narrative.",
      "The show now runs every weekend and has driven a 41% increase in evening tourism revenue.",
    ],
    stats: [
      { k: "Drones", v: "3,200" },
      { k: "Tourism revenue lift", v: "+41%" },
      { k: "Repeat performances", v: "84" },
      { k: "Average dwell", v: "47 min" },
    ],
  },
  {
    slug: "bund-spectacle",
    title: "Bund Spectacle",
    client: "Shanghai Municipal",
    tag: "Civic Show · Shanghai",
    location: "Shanghai, China",
    coords: "31.2304° N · 121.4737° E",
    eventType: "New Year Civic",
    footfall: "1.2M waterfront",
    drones: 2400,
    duration: "22 min",
    year: "2026",
    img: shanghai.url,
    hero: shanghai.url,
    gallery: [shanghai.url, cloudSwarm.url, disney.url],
    summary: "A choreographed dragon, phoenix and skyline sequence above the Huangpu River to open the lunar year.",
    story: [
      "Lucen Sky was commissioned to design Shanghai's centerpiece New Year moment with zero pyrotechnics.",
      "2,400 craft executed a 22-minute weather-resilient program, including a 90-second 3D dragon that orbited the Oriental Pearl Tower.",
      "Broadcast live to 380M households across CCTV and streaming partners.",
    ],
    stats: [
      { k: "Drones", v: "2,400" },
      { k: "Broadcast reach", v: "380M" },
      { k: "Zero-emission", v: "100%" },
      { k: "Show length", v: "22 min" },
    ],
  },
  {
    slug: "tiger-awakens",
    title: "Tiger Awakens",
    client: "Seoul Tourism Org.",
    tag: "Festival · Seoul",
    location: "Seoul, South Korea",
    coords: "37.5665° N · 126.9780° E",
    eventType: "Cultural Festival",
    footfall: "180,000 on-site",
    drones: 1800,
    duration: "11 min",
    year: "2025",
    img: tiger.url,
    hero: tiger.url,
    gallery: [tiger.url, fireworks.url, redbull.url],
    summary: "A leaping mountain tiger crossing the Han River — Seoul's autumn festival opener.",
    story: [
      "Seoul wanted a contemporary retelling of the white tiger legend without traditional fireworks.",
      "We rendered a full anatomical tiger that bounded across 800m of riverfront airspace in a single continuous motion.",
      "The moment became the festival's signature poster image and trended globally on launch night.",
    ],
    stats: [
      { k: "Drones", v: "1,800" },
      { k: "Festival uplift", v: "+62%" },
      { k: "Press pickups", v: "920" },
      { k: "Show length", v: "11 min" },
    ],
  },
  {
    slug: "aurora-cloud",
    title: "Aurora Cloud",
    client: "Royal Commission",
    tag: "Architectural · Riyadh",
    location: "Riyadh, Saudi Arabia",
    coords: "24.7136° N · 46.6753° E",
    eventType: "Architectural Reveal",
    footfall: "32,000 VIP",
    drones: 1600,
    duration: "8 min",
    year: "2026",
    img: cloud.url,
    hero: cloudSwarm.url,
    gallery: [cloud.url, cloudSwarm.url, disney.url],
    summary: "A volumetric aurora cloud unveiling a new district masterplan — colours derived from desert dawn.",
    story: [
      "The commission asked for a reveal moment that physically embodied the masterplan's gradient identity.",
      "1,600 drones formed a slowly-rotating 3D cloud, then dissolved into the district's silhouette at 240m altitude.",
      "Operated within strict desert wind tolerances with zero RTK drift across the full sequence.",
    ],
    stats: [
      { k: "Drones", v: "1,600" },
      { k: "Altitude", v: "240 m" },
      { k: "Wind tolerance", v: "11 m/s" },
      { k: "Drift", v: "± 1.8 cm" },
    ],
  },
  {
    slug: "disney-abu-dhabi",
    title: "Disney Abu Dhabi",
    client: "The Walt Disney Company",
    tag: "Park Reveal · Abu Dhabi",
    location: "Abu Dhabi, UAE",
    coords: "24.4539° N · 54.3773° E",
    eventType: "Theme Park Reveal",
    footfall: "42,000 on-site · live broadcast",
    drones: 2800,
    duration: "14 min",
    year: "2025",
    img: disney.url,
    hero: disney.url,
    gallery: [disney.url, fireworks.url, redbull.url],
    summary: "Cinderella's castle constructed in the night sky above Yas Bay — Disney's first Middle East park announcement.",
    story: [
      "Disney chose a single image to announce its first park in the Middle East: the castle, full-scale, above the water.",
      "We rendered the castle as a 2,800-point illuminated structure with synchronized fountains and orchestral score.",
      "The reveal received 1.1B impressions in 48 hours and became the most-shared Disney announcement ever.",
    ],
    stats: [
      { k: "Drones", v: "2,800" },
      { k: "Impressions", v: "1.1B / 48h" },
      { k: "Live broadcast", v: "12 countries" },
      { k: "Structure height", v: "180 m" },
    ],
  },
  {
    slug: "red-bull-tetris",
    title: "Red Bull Tetris",
    client: "Red Bull",
    tag: "Gamified Sky · Dubai",
    location: "Dubai, UAE",
    coords: "25.2048° N · 55.2708° E",
    eventType: "Interactive Activation",
    footfall: "120,000 on-site participation",
    drones: 1500,
    duration: "Live · 35 min interactive",
    year: "2025",
    img: redbull.url,
    hero: redbull.url,
    gallery: [redbull.url, johnny.url, fireworks.url],
    summary: "A playable Tetris board rendered against the Dubai Frame — the audience controlled the falling pieces via mobile.",
    story: [
      "The first fully interactive drone show: spectators played a shared game of Tetris using their phones as input.",
      "Lucen Sky's realtime swarm runtime translated input → drone position with sub-200ms latency across 1,500 craft.",
      "Two players reached level 14 before the show closed on a fireworks finale.",
    ],
    stats: [
      { k: "Drones", v: "1,500" },
      { k: "Input latency", v: "< 200ms" },
      { k: "Players", v: "12,400 active" },
      { k: "Press pickups", v: "1,800+" },
    ],
  },
];

export const getExperience = (slug: string) =>
  experiences.find((e) => e.slug === slug);
