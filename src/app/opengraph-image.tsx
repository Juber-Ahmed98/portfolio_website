import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div style={{
        width: "100%", height: "100%", display: "flex", flexDirection: "column",
        justifyContent: "space-between", background: "#0b1418", color: "#f2f7f8",
        padding: "72px 80px", fontFamily: "sans-serif",
      }}>
        <div style={{ display: "flex", fontSize: 26, letterSpacing: 1, color: "#22c8e0" }}>
          juberahmed.dev
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Mohammed Juber Ahmed
          </div>
          <div style={{ fontSize: 34, color: "#b8c8cd" }}>
            Frontend developer who ships real products — Birmingham, UK
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#7e959c" }}>
          React · Next.js · TypeScript · Cloudflare Workers
        </div>
      </div>
    ),
    { ...size }
  );
}
