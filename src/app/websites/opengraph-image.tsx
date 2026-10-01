import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Juber Ahmed: websites for Birmingham businesses";

/**
 * The share card for `/websites`, in the same palette as the root card but
 * written for a business owner: what I do and where, no stack.
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
          Juber Ahmed · Web developer
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div style={{ fontSize: 78, fontWeight: 800, lineHeight: 1.05, letterSpacing: -2 }}>
            Websites for Birmingham businesses
          </div>
          <div style={{ fontSize: 34, color: "#d3c4ad" }}>
            Built by hand, fast on phones, with forms that reach you
          </div>
        </div>
        <div style={{ display: "flex", gap: 16, fontSize: 24, color: "#a8967c" }}>
          UMMA BJJ · Yoosuf Zaman · Al-Ilm Martial Arts · Stratemize
        </div>
      </div>
    ),
    { ...size }
  );
}
