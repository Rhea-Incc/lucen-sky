import { useEffect, useRef } from "react";

// A particle swarm that morphs seamlessly between formations.
// Each keyframe lasts 6s with continuous interpolation (no static dwell).
export function SwarmCanvas({ className = "" }: { className?: string }) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0, raf = 0, t = 0, phase = 0; // phase in seconds (continuous)

    const COUNT = 560;
    const KEYFRAME_SECONDS = 6;
    type P = { x: number; y: number; vx: number; vy: number; hue: number };
    const parts: P[] = [];

    const targets: { x: number; y: number }[][] = [];

    const buildText = (text: string, weights: number[]) => {
      const off = document.createElement("canvas");
      off.width = Math.max(1, Math.floor(w));
      off.height = Math.max(1, Math.floor(h));
      const octx = off.getContext("2d");
      if (!octx) return Array.from({ length: COUNT }, () => ({ x: w / 2, y: h / 2 }));
      const cx = w / 2, cy = h / 2;
      const maxFont = Math.min(h * 0.62, (w / text.length) * 1.55);
      octx.textBaseline = "middle";
      const sizes = weights.map((wt) => maxFont * wt);
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
      const pts: { x: number; y: number }[] = [];
      const step = 2;
      for (let py = 0; py < off.height; py += step) {
        for (let px = 0; px < off.width; px += step) {
          if (data[(py * off.width + px) * 4 + 3] > 128) pts.push({ x: px, y: py });
        }
      }
      if (pts.length === 0) return Array.from({ length: COUNT }, () => ({ x: cx, y: cy }));
      return Array.from({ length: COUNT }, () => {
        const p = pts[Math.floor(Math.random() * pts.length)];
        return { x: p.x, y: p.y };
      });
    };

    const buildTargets = () => {
      targets.length = 0;
      const cx = w / 2, cy = h / 2;
      const R = Math.min(w, h) * 0.32;

      // 0 — ring
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const a = (i / COUNT) * Math.PI * 2;
        return { x: cx + Math.cos(a) * R, y: cy + Math.sin(a) * R * 0.55 };
      }));
      // 1 — grid
      const cols = Math.ceil(Math.sqrt(COUNT));
      const rows = Math.ceil(COUNT / cols);
      const gw = R * 2.2, gh = R * 1.3;
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const c = i % cols, r = Math.floor(i / cols);
        return { x: cx - gw / 2 + (c / (cols - 1)) * gw, y: cy - gh / 2 + (r / (rows - 1)) * gh };
      }));
      // 2 — spiral
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const a = i * 0.35;
        const rr = (i / COUNT) * R * 1.1;
        return { x: cx + Math.cos(a) * rr, y: cy + Math.sin(a) * rr * 0.6 };
      }));
      // 3 — wing / arc
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const u = i / COUNT;
        const a = (u - 0.5) * Math.PI * 1.4;
        return { x: cx + Math.sin(a) * R * 1.3, y: cy - Math.cos(a) * R * 0.9 + R * 0.2 };
      }));
      // 4 — lemniscate (infinity)
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const a = (i / COUNT) * Math.PI * 2;
        const k = R * 1.3;
        const d = 1 + Math.sin(a) * Math.sin(a);
        return { x: cx + (k * Math.cos(a)) / d, y: cy + (k * Math.sin(a) * Math.cos(a)) / d };
      }));
      // 5 — sphere (projected lat/long)
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const phi = Math.acos(1 - (2 * (i + 0.5)) / COUNT);
        const theta = Math.PI * (1 + Math.sqrt(5)) * i;
        const x3 = Math.sin(phi) * Math.cos(theta);
        const y3 = Math.cos(phi);
        return { x: cx + x3 * R * 1.05, y: cy + y3 * R * 0.95 };
      }));
      // 6 — wave field
      targets.push(Array.from({ length: COUNT }, (_, i) => {
        const u = i / COUNT;
        const x = cx - R * 1.4 + u * R * 2.8;
        const y = cy + Math.sin(u * Math.PI * 6) * R * 0.45 + Math.cos(u * Math.PI * 2) * R * 0.18;
        return { x, y };
      }));
      // 7 — LUCENSKY wordmark (tall on ends, shortest at middle E/N)
      const weights = [1.0, 0.85, 0.7, 0.55, 0.55, 0.7, 0.85, 1.0];
      targets.push(buildText("LUCENSKY", weights));
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

    // smooth ease for blending between keyframes
    const ease = (u: number) => u < 0.5 ? 2 * u * u : 1 - Math.pow(-2 * u + 2, 2) / 2;

    let last = performance.now();
    const loop = (now: number) => {
      const dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      t += dt; phase += dt;

      const totalDur = KEYFRAME_SECONDS * targets.length;
      const ph = ((phase % totalDur) + totalDur) % totalDur;
      const segIdx = Math.floor(ph / KEYFRAME_SECONDS);
      const u = (ph - segIdx * KEYFRAME_SECONDS) / KEYFRAME_SECONDS;
      const k = ease(u);
      const A = targets[segIdx];
      const B = targets[(segIdx + 1) % targets.length];

      ctx.fillStyle = "oklch(0.08 0.012 250 / 0.22)";
      ctx.fillRect(0, 0, w, h);

      for (let i = 0; i < COUNT; i++) {
        const p = parts[i];
        const tx = A[i].x + (B[i].x - A[i].x) * k;
        const ty = A[i].y + (B[i].y - A[i].y) * k;
        const dx = tx - p.x, dy = ty - p.y;
        p.vx = (p.vx + dx * 0.085) * 0.78;
        p.vy = (p.vy + dy * 0.085) * 0.78;
        p.x += p.vx; p.y += p.vy;
        const a = 0.7 + Math.sin(t * 2 + p.x * 0.01) * 0.3;
        ctx.fillStyle = `oklch(0.9 0.16 ${p.hue} / ${a})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, 1.5, 0, Math.PI * 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(loop);
    };
    raf = requestAnimationFrame(loop);

    return () => { cancelAnimationFrame(raf); ro.disconnect(); };
  }, []);

  return <canvas ref={ref} className={`block w-full h-full ${className}`} aria-hidden />;
}
