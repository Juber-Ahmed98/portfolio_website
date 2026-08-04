import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * OG card in the Workshop palette (DESIGN.md, "Meta surfaces"): espresso field,
 * cream name, terracotta wordmark + accent bar. ImageResponse can't use the
 * site's web fonts without bundling font data, so type is system bold sans —
 * the palette carries the brand.
 */
export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", background: "#2b2016", color: "#f4ead9",
        padding: "72px 80px", fontFamily: "sans-serif",
        borderBottom: "16px solid #e08a5c",
      }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 1, color: "#e08a5c", fontWeight: 700 }}>
          juberahmed.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Mohammed Juber Ahmed
          </div>
          <div style={{ fontSize: 34, color: "#d3c4ad" }}>
            Frontend developer who ships real products — Birmingham, UK
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#a8967c" }}>
          React · Next.js · TypeScript · Cloudflare Workers
        </div>
      </div>
    ),
    { ...size }
  );
}
