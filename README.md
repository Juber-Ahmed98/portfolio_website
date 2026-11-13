# juberahmed.dev

Juber Ahmed's portfolio: a static site built with [Astro](https://astro.build), one
hand-written stylesheet and no client-side framework. Served from Cloudflare Workers
static assets.

- [`CLAUDE.md`](CLAUDE.md): what the site says and why, the content rules, how it is built.
- [`DESIGN.md`](DESIGN.md): the design contract (colour, type, layout, parts).
- `design-reference/v4/home.html`: the finished home page design the build matches.

## Run it

```bash
npm install
```

```bash
npm run dev
```

The dev server is at http://localhost:4321.

## Build

```bash
npm run build
```

This writes `dist/`, the folder `wrangler.jsonc` serves. Pushing to `main` deploys it
through `.github/workflows/deploy.yml`.

## Where things are

| Path | What |
|---|---|
| `src/content/site.ts` | Every word on the home page and the case studies |
| `src/content/websites.ts` | Every word on `/websites` |
| `src/pages/` | The pages: home, `/websites`, `/work/<slug>/`, 404, the sitemap |
| `src/styles/site.css` | The whole stylesheet |
| `public/` | Media, fonts, the CV, `_redirects`, favicons and share images |
