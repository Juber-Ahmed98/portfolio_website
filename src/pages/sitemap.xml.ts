import type { APIRoute } from "astro";
import { caseStudyOrder } from "../content/site";

/** A static sitemap, written at build time. */
export const GET: APIRoute = ({ site }) => {
  const paths = ["/", "/websites/", ...caseStudyOrder.map((slug) => `/work/${slug}/`)];
  const today = new Date().toISOString().slice(0, 10);
  const urls = paths
    .map(
      (path) =>
        `  <url><loc>${new URL(path, site)}</loc><lastmod>${today}</lastmod><changefreq>monthly</changefreq><priority>${path === "/" ? "1.0" : "0.8"}</priority></url>`,
    )
    .join("\n");
  return new Response(
    `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls}\n</urlset>\n`,
    { headers: { "Content-Type": "application/xml" } },
  );
};
