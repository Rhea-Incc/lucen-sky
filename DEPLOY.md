# Deployment

Lucen Sky is a TanStack Start app. The Lovable preview runs on Cloudflare
Workers via the bundled Vite config, but the project ships with adapters so
the same source can be deployed to **Vercel**, **DigitalOcean**, **Fly.io**,
**Render**, or any Node-compatible container host.

The only switch needed is the `NITRO_PRESET` build-time environment variable,
which TanStack Start's Nitro layer reads automatically.

## Vercel

A `vercel.json` is included.

```bash
# in your Vercel project settings
NITRO_PRESET=vercel
```

Vercel auto-detects `bun run build` and serves the `.output/` bundle.

## DigitalOcean App Platform (or any container host)

The included `Dockerfile` builds a portable Node server (`.output/server/index.mjs`).

```bash
docker build -t lucen-sky .
docker run -p 3000:3000 lucen-sky
```

For DO App Platform, point it at the repo — the Dockerfile is detected
automatically. No Cloudflare-specific bindings are required at runtime.

## Fly.io / Render / Railway

Same Dockerfile works for all of them. Set the port to `3000` and ensure
your environment exposes the Supabase keys from `.env`:

- `VITE_SUPABASE_URL`
- `VITE_SUPABASE_PUBLISHABLE_KEY`
- `VITE_SUPABASE_PROJECT_ID`
- `SUPABASE_SERVICE_ROLE_KEY` (server-only)

## Notes

- Media (images, videos) live on Lovable's global CDN via `.asset.json`
  pointers, so they are absolute URLs that work from any host without
  re-uploading.
- The default Lovable preview build keeps the Cloudflare preset for
  in-editor preview parity; the presets above only take effect when
  `NITRO_PRESET` is set at build time by your host.
