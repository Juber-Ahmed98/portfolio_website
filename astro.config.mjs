import { defineConfig } from "astro/config";

// Static output only: `npm run build` writes `dist/`, which wrangler serves as
// Workers static assets (see wrangler.jsonc). No adapter, no server code.
export default defineConfig({
  site: "https://juberahmed.dev",
  // Every page is a folder with an index.html, so the v3 URLs
  // (/websites/, /work/jembatan/, …) stay exactly as they were.
  trailingSlash: "always",
  build: {
    format: "directory",
    // One small stylesheet, inlined: the first screen needs no second request.
    inlineStylesheets: "always",
  },
  server: { port: 4321, host: true },
  devToolbar: { enabled: false },
});
