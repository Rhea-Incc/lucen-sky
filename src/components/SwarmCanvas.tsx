import { useEffect, useRef } from "react";

// Declarative shape spec — each becomes a swarm keyframe.
export type Shape =
  | { kind: "ring"; squash?: number; scale?: number }
  | { kind: "grid"; aspect?: number }
  | { kind: "spiral" }
  | { kind: "arc" }
  | { kind: "lemniscate" }
  | { kind: "sphere" }
  | { kind: "wave" }
  | { kind: "heart" }
  | { kind: "plus" }
  | { kind: "columns"; n?: number }
  | { kind: "skyline" }
  | { kind: "heartbeat" }
  | { kind: "antenna" }
  | { kind: "wheel" }
  | { kind: "house" }
  | { kind: "plane" }
  | { kind: "text"; text: string; weights?: number[] };

const DEFAULT_SHAPES: Shape[] = [
  { kind: "ring" },
  { kind: "grid" },
  { kind: "spiral" },
  { kind: "arc" },
  { kind: "lemniscate" },
  { kind: "sphere" },
  { kind: "wave" },
  { kind: "text", text: "LUCENSKY", weights: [1.0, 0.85, 0.7, 0.55, 0.55, 0.7, 0.85, 1.0] },
];

type Pt = { x: number; y: number };

export function SwarmCanvas({
  className = "",
  shapes,
  count = 620,
  secondsPerKey = 10,
}: {
  className?: string;
  shapes?: Shape[];
  count?: number;
  secondsPerKey?: number;
}) {
  const ref = useRef<HTMLCanvasElement>(null);
  // keep stable copies so callers can pass inline arrays
  const shapesRef = useRef<Shape[]>(shapes && shapes.length ? shapes : DEFAULT_SHAPES);
  shapesRef.current = shapes && shapes.length ? shapes : DEFAULT_SHAPES;

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const COUNT = count;
    let w = 0, h = 0, raf = 0, t = 0, phase = 0;

    type P = { x: number; y: number; vx: number; vy: number; hue: number };
    const parts: P[] = [];
    let targets: Pt[][] = [];

    // ---------- shape builders ----------
    const sample = (fn: (t: number, i: number) => Pt): Pt[] =>
      Array.from({ length: COUNT }, (_, i) => fn(i / COUNT, i));

    const buildText = (text: string, weights?: number[]): Pt[] => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(w));
      off.height = Math.max(1, Math.floor(h));
      const octx = off.getContext("2d");
      const cx = w / 2, cy = h / 2;
      if (!octx) return sample(() => ({ x: cx, y: cy }));
      const wts = weights ?? Array(text.length).fill(1);
      const maxFont = Math.min(h * 0.72, (w / text.length) * 1.7);
      octx.textBaseline = "middle";
      const sizes = wts.map((wt) => maxFont * wt);
      const widths: number[] = [];
      let total = 0;
      for (let i = 0; i < text.length; i++) {
        octx.font = `700 ${sizes[i]}px "Space Grotesk", system-ui, sans-serif`;
        const wd = octx.measureText(text[i]).width;
        widths.push(wd);
        total += wd;
      }
      const gap = maxFont * 0.04;
      total += gap * (text.length - 1);
      let x = cx - total / 2;
      octx.fillStyle = "#fff";
      for (let i = 0; i < text.length; i++) {
        octx.font = `700 ${sizes[i]}px "Space Grotesk", system-ui, sans-serif`;
        octx.fillText(text[i], x, cy);
        x += widths[i] + gap;
      }
      const data = octx.getImageData(0, 0, off.width, off.height).data;
      const pts: Pt[] = [];
      const step = 2;
      for (let py = 0; py < off.height; py += step) {
        for (let px = 0; px < off.width; px += step) {
          if (data[(py * off.width + px) * 4 + 3] > 128) pts.push({ x: px, y: py });
        }
      }
      if (!pts.length) return sample(() => ({ x: cx, y: cy }));
      return sample(() => {
        const p = pts[Math.floor(Math.random() * pts.length)];
        return { x: p.x, y: p.y };
      });
    };

    const build = (s: Shape): Pt[] => {
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.42;
      switch (s.kind) {
        case "ring": {
          const squash = s.squash ?? 0.6;
          const k = s.scale ?? 1;
          return sample((t) => {
            const a = t * Math.PI * 2;
            return { x: cx + Math.cos(a) * R * k, y: cy + Math.sin(a) * R * squash * k };
          });
        }
        case "grid": {
          const aspect = s.aspect ?? 1.5;
          const cols = Math.ceil(Math.sqrt(COUNT * aspect));
          const rows = Math.ceil(COUNT / cols);
          const gw = R * 2.4, gh = R * 1.5;
          return sample((_, i) => {
            const c = i % cols, r = Math.floor(i / cols);
            return { x: cx - gw / 2 + (c / Math.max(1, cols - 1)) * gw, y: cy - gh / 2 + (r / Math.max(1, rows - 1)) * gh };
          });
        }
        case "spiral":
          return sample((u, i) => {
            const a = i * 0.32;
            const rr = u * R * 1.2;
            return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr * 0.7 };
          });
        case "arc":
          return sample((u) => {
            const a = (u - 0.5) * Math.PI * 1.4;
            return { x: cx + Math.sin(a) * R * 1.35, y: cy - Math.cos(a) * R * 0.95 + R * 0.2 };
          });
        case "lemniscate":
          return sample((u) => {
            const a = u * Math.PI * 2;
            const k = R * 1.35;
            const d = 1 + Math.sin(a) * Math.sin(a);
            return { x: cx + (k * Math.cos(a)) / d, y: cy + (k * Math.sin(a) * Math.cos(a)) / d };
          });
        case "sphere":
          return sample((_, i) => {
            const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
            const theta = Math.PI * (1 + Math.sqrt(5)) * i;
            return { x: cx + Math.sin(phi) * Math.cos(theta) * R * 1.1, y: cy + Math.cos(phi) * R };
          });
        case "wave":
          return sample((u) => {
            const x = cx - R * 1.5 + u * R * 3;
            const y = cy + Math.sin(u * Math.PI * 6) * R * 0.5 + Math.cos(u * Math.PI * 2) * R * 0.15;
            return { x, y };
          });
        case "heart":
          return sample((u) => {
            const a = u * Math.PI * 2;
            const x = 16 * Math.pow(Math.sin(a), 3);
            const y = -(13 * Math.cos(a) - 5 * Math.cos(2 * a) - 2 * Math.cos(3 * a) - Math.cos(4 * a));
            return { x: cx + (x / 17) * R * 1.2, y: cy + (y / 17) * R * 1.2 };
          });
        case "plus":
          return sample((_, i) => {
            const half = COUNT / 2;
            if (i < half) {
              const u = i / half - 0.5;
              const j = ((i * 9301) % 17) / 17 - 0.5;
              return { x: cx + u * R * 2.4, y: cy + j * R * 0.35 };
            }
            const u = (i - half) / half - 0.5;
            const j = ((i * 4373) % 17) / 17 - 0.5;
            return { x: cx + j * R * 0.35, y: cy + u * R * 2.4 };
          });
        case "columns": {
          const n = s.n ?? 5;
          const colW = (R * 2.4) / n;
          return sample((_, i) => {
            const c = i % n;
            const u = Math.floor(i / n) / Math.floor(COUNT / n) - 0.5;
            return { x: cx - R * 1.2 + c * colW + colW / 2, y: cy + u * R * 1.6 };
          });
        }
        case "skyline": {
          // city silhouette with varying heights
          const heights = [0.5, 0.85, 0.6, 0.95, 0.4, 0.75, 1.0, 0.55, 0.7, 0.45, 0.9, 0.6];
          const n = heights.length;
          const colW = (R * 2.6) / n;
          return sample((_, i) => {
            const c = i % n;
            const u = (Math.floor(i / n) / Math.floor(COUNT / n)) - 0.05;
            const top = cy + R * 0.9 - heights[c] * R * 1.5;
            return { x: cx - R * 1.3 + c * colW + colW * 0.5, y: top + u * (cy + R * 0.9 - top) };
          });
        }
        case "heartbeat":
          return sample((u) => {
            const x = cx - R * 1.5 + u * R * 3;
            let y = cy;
            const k = (u * 3) % 1;
            if (k > 0.42 && k < 0.58) {
              const z = (k - 0.5) / 0.08;
              y -= Math.exp(-z * z * 4) * R * 0.7 * Math.sign(0.5 - k);
            }
            return { x, y };
          });
        case "antenna":
          return sample((u, i) => {
            // half = vertical mast, half = radiating arcs
            if (i % 2 === 0) {
              return { x: cx + (Math.sin(i) * 0.05) * R, y: cy + (u - 0.5) * R * 2 };
            }
            const ring = Math.floor((i / 2) % 4) + 1;
            const a = u * Math.PI * 2;
            return { x: cx + Math.cos(a) * R * 0.3 * ring, y: cy - Math.sin(Math.abs(a - Math.PI)) * R * 0.25 * ring };
          });
        case "wheel": {
          const spokes = 8;
          return sample((u, i) => {
            if (i % 4 === 0) {
              const a = u * Math.PI * 2;
              return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R };
            }
            const sIdx = i % spokes;
            const a = (sIdx / spokes) * Math.PI * 2;
            const rr = u * R;
            return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr };
          });
        }
        case "house":
          return sample((u, i) => {
            // base square + triangular roof
            const phase = i % 3;
            if (phase === 0) {
              // base
              const j = (i * 13) % 100 / 100 - 0.5;
              return { x: cx + j * R * 1.8, y: cy + R * 0.7 + ((i * 7) % 30) / 30 * R * 0.5 };
            }
            if (phase === 1) {
              // walls
              const side = i % 2 === 0 ? -1 : 1;
              const v = ((i * 11) % 100) / 100;
              return { x: cx + side * R * 0.9, y: cy + R * 0.7 - v * R * 1.0 };
            }
            // roof
            const u2 = ((i * 17) % 100) / 100 - 0.5;
            return { x: cx + u2 * R * 2.0, y: cy - R * 0.3 - (1 - Math.abs(u2 * 2)) * R * 0.8 };
          });
        case "plane":
          return sample((u, i) => {
            const phase = i % 3;
            // fuselage (horizontal)
            if (phase === 0) {
              const v = u - 0.5;
              return { x: cx + v * R * 2.4, y: cy + Math.sin(u * Math.PI * 2) * R * 0.05 };
            }
            // wings (diagonal back-swept)
            if (phase === 1) {
              const v = ((i * 7) % 100) / 100;
              const side = i % 2 === 0 ? 1 : -1;
              return { x: cx - R * 0.1 + v * R * 0.6, y: cy + side * v * R * 0.9 };
            }
            // tail
            const v = ((i * 11) % 100) / 100;
            const side = i % 2 === 0 ? 1 : -1;
            return { x: cx + R * 0.9 + v * R * 0.25, y: cy + side * v * R * 0.4 };
          });
        case "text":
          return buildText(s.text, s.weights);
      }
    };

    const buildTargets = () => {
      targets = shapesRef.current.map(build);
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr; canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      buildTargets();
    };

    for (let i = 0; i < COUNT; i++) {
      parts.push({
        x: Math.random() * 800, y: Math.random() * 400,
        vx: 0, vy: 0,
        hue: Math.random() < 0.3 ? 290 : 220,
      });
    }

    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt; phase += dt;

      const segs = targets.length;
      const totalDur = secondsPerKey * segs;
      const ph = ((phase % totalDur) + totalDur) % totalDur;
      const segIdx = Math.floor(ph / secondsPerKey);
      // linear progress — no easing pauses at boundaries
      const u = (ph - segIdx * secondsPerKey) / secondsPerKey;
      const A = targets[segIdx];
      const B = targets[(segIdx + 1) % segs];

      ctx.fillStyle = "oklch(0.08 0.012 250 / 0.18)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < COUNT; i++) {
        const p = parts[i];
        const tx = A[i].x + (B[i].x - A[i].x) * u;
        const ty = A[i].y + (B[i].y - A[i].y) * u;
        const dx = tx - p.x, dy = ty - p.y;
        // continuous-pursuit: higher stiffness + damping for smooth tracking
        p.vx = (p.vx + dx * 0.16) * 0.80;
        p.vy = (p.vy + dy * 0.16) * 0.80;
        // tiny brownian noise so the swarm never feels frozen
        p.x += p.vx + (Math.random() - 0.5) * 0.18;
        p.y += p.vy + (Math.random() - 0.5) * 0.18;
        const a = 0.65 + Math.sin(t * 2 + p.x * 0.01) * 0.3;
        ctx.fillStyle = `oklch(0.9 0.16 ${p.hue} / ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, [count, secondsPerKey]);

  return <canvas ref={ref} className={`block w-full h-full ${className}`} aria-hidden />;
}
