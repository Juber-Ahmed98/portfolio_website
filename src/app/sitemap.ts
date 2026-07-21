import type { MetadataRoute } from "next";

export const dynamic = "force-static";

const base = "https://juberahmed.dev";

export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/work/jembatan/", "/work/mission-to-abs/", "/work/ecommerce-store/"];
  return paths.map((path) => ({
    url: `${base}${path}`,
    lastModified: new Date(),
    changeFrequency: "monthly",
    priority: path === "/" ? 1 : 0.8,
  }));
}
